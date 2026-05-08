import express from 'express'
import Announcement from '../models/Announcement.js'
import { verifyToken, requireAuth, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// GET /api/announcements - Get all announcements (sorted by pinned, then date)
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate('createdBy', 'name')
      .sort({ isPinned: -1, createdAt: -1 })
      .lean()

    res.json(announcements)
  } catch (error) {
    console.error('Get announcements error:', error)
    res.status(500).json({ error: 'Failed to fetch announcements' })
  }
})

// POST /api/announcements - Create announcement (admin only)
router.post('/', verifyToken, requireAuth, requireAdmin, async (req, res) => {
  try {
    const { title, content, isPinned } = req.body

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' })
    }

    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Content is required' })
    }

    const announcement = new Announcement({
      title,
      content,
      createdBy: req.user._id,
      isPinned: isPinned || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await announcement.save()
    await announcement.populate('createdBy', 'name')

    res.status(201).json(announcement)
  } catch (error) {
    console.error('Create announcement error:', error)
    res.status(500).json({ error: 'Failed to create announcement' })
  }
})

// PUT /api/announcements/:id - Update announcement (admin only, creator only)
router.put('/:id', verifyToken, requireAuth, requireAdmin, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' })
    }

    if (announcement.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Only creator can update this announcement' })
    }

    const { title, content, isPinned } = req.body

    if (title) announcement.title = title
    if (content) announcement.content = content
    if (isPinned !== undefined) announcement.isPinned = isPinned

    announcement.updatedAt = new Date()
    await announcement.save()
    await announcement.populate('createdBy', 'name')

    res.json(announcement)
  } catch (error) {
    console.error('Update announcement error:', error)
    res.status(500).json({ error: 'Failed to update announcement' })
  }
})

// DELETE /api/announcements/:id - Delete announcement (admin only, creator only)
router.delete('/:id', verifyToken, requireAuth, requireAdmin, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' })
    }

    if (announcement.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Only creator can delete this announcement' })
    }

    await Announcement.findByIdAndDelete(req.params.id)

    res.json({ message: 'Announcement deleted successfully' })
  } catch (error) {
    console.error('Delete announcement error:', error)
    res.status(500).json({ error: 'Failed to delete announcement' })
  }
})

export default router
