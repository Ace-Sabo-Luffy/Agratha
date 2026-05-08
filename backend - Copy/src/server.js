import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import 'express-async-errors'

import admin from './config/firebase.js'
import usersRouter from './routes/users.js'
import eventsRouter from './routes/events.js'
import registrationsRouter from './routes/registrations.js'
import announcementsRouter from './routes/announcements.js'
import leaderboardRouter from './routes/leaderboard.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err)
    process.exit(1)
  })

// Routes
app.use('/api/users', usersRouter)
app.use('/api/events', eventsRouter)
app.use('/api/registrations', registrationsRouter)
app.use('/api/announcements', announcementsRouter)
app.use('/api/leaderboard', leaderboardRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running', timestamp: new Date() })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack)
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📝 Health check: http://localhost:${PORT}/api/health`)
})
