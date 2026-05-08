import express from 'express'
import Registration from '../models/Registration.js'
import Event from '../models/Event.js'
import { verifyToken, requireAuth, requireAdmin } from '../middleware/auth.js'
import { validateRegistrationData } from '../utils/validation.js'

const router = express.Router()

// GET /api/registrations - Get user's registrations
router.get('/', verifyToken, requireAuth, async (req, res) => {
  try {
    const registrations = await Registration.find({ participantID: req.user._id })
      .populate('eventID')
      .populate('teamID')
      .sort({ registeredAt: -1 })

    res.json(registrations)
  } catch (error) {
    console.error('Get registrations error:', error)
    res.status(500).json({ error: 'Failed to fetch registrations' })
  }
})

// POST /api/registrations - Register for event
router.post('/', verifyToken, requireAuth, async (req, res) => {
  try {
    const { eventID, teamID } = req.body

    const errors = validateRegistrationData(req.body)
    if (errors) return res.status(400).json({ errors })

    // Check if event exists
    const event = await Event.findById(eventID)
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    // Check if already registered
    const existingReg = await Registration.findOne({
      eventID,
      participantID: req.user._id,
    })
    if (existingReg) {
      return res.status(400).json({ error: 'Already registered for this event' })
    }

    // Check participant limit
    const registrationCount = await Registration.countDocuments({
      eventID,
      status: { $ne: 'cancelled' },
    })
    if (registrationCount >= event.maxParticipants) {
      return res.status(400).json({ error: 'Event is full' })
    }

    const registration = new Registration({
      eventID,
      participantID: req.user._id,
      teamID: teamID || null,
      registeredAt: new Date(),
      status: 'registered',
      ticketURL: `/tickets/${eventID}_${req.user._id}.pdf`,
    })

    await registration.save()
    await registration.populate('eventID')
    await registration.populate('teamID')

    res.status(201).json(registration)
  } catch (error) {
    console.error('Create registration error:', error)
    res.status(500).json({ error: 'Failed to register for event' })
  }
})

// GET /api/registrations/:eventId - Get all registrations for event (admin only)
router.get('/:eventId', verifyToken, requireAuth, requireAdmin, async (req, res) => {
  try {
    const registrations = await Registration.find({ eventID: req.params.eventId })
      .populate('participantID', 'name email')
      .populate('teamID', 'name')
      .sort({ registeredAt: -1 })

    res.json(registrations)
  } catch (error) {
    console.error('Get event registrations error:', error)
    res.status(500).json({ error: 'Failed to fetch registrations' })
  }
})

// PUT /api/registrations/:id - Cancel registration
router.put('/:id', verifyToken, requireAuth, async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' })
    }

    if (registration.participantID.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Cannot modify other registrations' })
    }

    registration.status = 'cancelled'
    await registration.save()

    res.json({ message: 'Registration cancelled' })
  } catch (error) {
    console.error('Update registration error:', error)
    res.status(500).json({ error: 'Failed to cancel registration' })
  }
})

export default router
