import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  eventID: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  joinCode: String,
  maxMembers: Number,
})

export default mongoose.model('Team', teamSchema)
