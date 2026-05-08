import express from 'express'
import Event from '../models/Event.js'
import { verifyToken, requireAuth, requireAdmin } from '../middleware/auth.js'
import { validateEventData } from '../utils/validation.js'

const router = express.Router()

// GET /api/events - List all published events with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, status } = req.query
    const filter = { status: status || 'published' }

    if (category) {
      if (!['technical', 'cultural', 'sports'].includes(category)) {
        return res.status(400).json({ error: 'Invalid category' })
      }
      filter.category = category
    }

    const events = await Event.find(filter)
      .populate('createdBy', 'name email')
      .sort({ startDate: 1 })
      .lean()

    res.json(events)
  } catch (error) {
    console.error('Get events error:', error)
    res.status(500).json({ error: 'Failed to fetch events' })
  }
})

// POST /api/events - Create event (admin only)
router.post('/', verifyToken, requireAuth, requireAdmin, async (req, res) => {
  try {
    const { name, description, category, startDate, endDate, rules, maxParticipants, minTeamSize, maxTeamSize } = req.body

    const errors = validateEventData(req.body)
    if (errors) return res.status(400).json({ errors })

    const event = new Event({
      name,
      description,
      category,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      rules,
      maxParticipants,
      minTeamSize: minTeamSize || 1,
      maxTeamSize: maxTeamSize || 1,
      createdBy: req.user._id,
      status: 'draft',
    })

    await event.save()
    await event.populate('createdBy', 'name email')

    res.status(201).json(event)
  } catch (error) {
    console.error('Create event error:', error)
    res.status(500).json({ error: 'Failed to create event' })
  }
})

// GET /api/events/:id - Get event details
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name email')

    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    res.json(event)
  } catch (error) {
    console.error('Get event error:', error)
    res.status(500).json({ error: 'Failed to fetch event' })
  }
})

// PUT /api/events/:id - Update event (admin only, creator only)
router.put('/:id', verifyToken, requireAuth, requireAdmin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Only creator can update this event' })
    }

    const { name, description, category, startDate, endDate, rules, maxParticipants, minTeamSize, maxTeamSize, status } = req.body

    if (name) event.name = name
    if (description) event.description = description
    if (category) event.category = category
    if (startDate) event.startDate = new Date(startDate)
    if (endDate) event.endDate = new Date(endDate)
    if (rules) event.rules = rules
    if (maxParticipants) event.maxParticipants = maxParticipants
    if (minTeamSize) event.minTeamSize = minTeamSize
    if (maxTeamSize) event.maxTeamSize = maxTeamSize
    if (status) event.status = status

    event.updatedAt = new Date()
    await event.save()
    await event.populate('createdBy', 'name email')

    res.json(event)
  } catch (error) {
    console.error('Update event error:', error)
    res.status(500).json({ error: 'Failed to update event' })
  }
})

// DELETE /api/events/:id - Delete event (admin only, creator only)
router.delete('/:id', verifyToken, requireAuth, requireAdmin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Only creator can delete this event' })
    }

    await Event.findByIdAndDelete(req.params.id)

    res.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Delete event error:', error)
    res.status(500).json({ error: 'Failed to delete event' })
  }
})

export default router
