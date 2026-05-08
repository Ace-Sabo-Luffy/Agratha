import express from 'express'
import User from '../models/User.js'
import { verifyToken, requireAuth } from '../middleware/auth.js'
import { validateEmail, validateRequired } from '../utils/validation.js'

const router = express.Router()

// POST /api/users/register - Create user after Firebase signup
router.post('/register', async (req, res) => {
  try {
    const { firebaseUID, email, name, role } = req.body

    const errors = validateRequired({ firebaseUID, email, name, role })
    if (errors) return res.status(400).json({ errors })

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    if (!['participant', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Role must be participant or admin' })
    }

    const existingUser = await User.findOne({ $or: [{ email }, { firebaseUID }] })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = new User({
      firebaseUID,
      email,
      name,
      role,
      registeredAt: new Date(),
    })

    await user.save()

    res.status(201).json({
      _id: user._id,
      firebaseUID: user.firebaseUID,
      email: user.email,
      name: user.name,
      role: user.role,
      registeredAt: user.registeredAt,
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})

// GET /api/users/profile - Get logged-in user profile
router.get('/profile', verifyToken, requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-__v')

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    console.error('Profile fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
})

// PUT /api/users/{id} - Update user profile
router.put('/:id', verifyToken, requireAuth, async (req, res) => {
  try {
    const { id } = req.params
    const { name, phone, avatar } = req.body

    // Users can only update their own profile
    if (req.user._id.toString() !== id) {
      return res.status(403).json({ error: 'Cannot update other user profiles' })
    }

    const user = await User.findByIdAndUpdate(
      id,
      { name, phone, avatar },
      { new: true, runValidators: true }
    )

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ error: 'Failed to update profile' })
  }
})

// GET /api/users/{id} - Get user by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name email avatar role')

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

export default router
