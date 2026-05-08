import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  collegeID: { type: String, default: 'main' },
  role: { type: String, enum: ['participant', 'admin'], default: 'participant' },
  phone: String,
  registeredAt: { type: Date, default: Date.now },
  avatar: String,
})

export default mongoose.model('User', userSchema)
