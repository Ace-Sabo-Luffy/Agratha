import admin from '../config/firebase.js'
import User from '../models/User.js'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1]

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decodedToken = await admin.auth().verifyIdToken(token)
    const user = await User.findOne({ firebaseUID: decodedToken.uid })

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    req.user = user
    req.firebaseUID = decodedToken.uid
    next()
  } catch (error) {
    console.error('Token verification error:', error)
    res.status(401).json({ error: 'Invalid token' })
  }
}

export const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' })
  }
  next()
}

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' })
  }
  next()
}
