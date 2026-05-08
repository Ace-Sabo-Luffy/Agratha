import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: String, enum: ['technical', 'cultural', 'sports'], required: true },
  startDate: Date,
  endDate: Date,
  rules: String,
  maxParticipants: Number,
  minTeamSize: { type: Number, default: 1 },
  maxTeamSize: { type: Number, default: 1 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['draft', 'published', 'live', 'completed'], default: 'draft' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model('Event', eventSchema)
