import express from 'express'
import Result from '../models/Result.js'
import User from '../models/User.js'
import Team from '../models/Team.js'

const router = express.Router()

// GET /api/leaderboard/:eventId - Get rankings for event
router.get('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params

    // Get all results for the event
    const results = await Result.find({ eventID: eventId })
      .populate('participantID', 'name')
      .populate('teamID', 'name')
      .sort({ score: -1, submittedAt: 1 })
      .lean()

    // Format leaderboard data
    const leaderboard = results.map((result, index) => {
      const participantName = result.participantID?.name || 'Unknown'
      const teamName = result.teamID?.name || 'Solo'

      return {
        rank: index + 1,
        participantName: result.teamID ? null : participantName,
        teamName: result.teamID ? teamName : null,
        score: result.score,
        submittedAt: result.submittedAt,
        _id: result._id,
      }
    })

    res.json(leaderboard)
  } catch (error) {
    console.error('Get leaderboard error:', error)
    res.status(500).json({ error: 'Failed to fetch leaderboard' })
  }
})

export default router
