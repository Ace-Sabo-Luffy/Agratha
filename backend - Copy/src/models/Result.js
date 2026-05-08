import mongoose from 'mongoose'

const resultSchema = new mongoose.Schema({
  eventID: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  teamID: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
  participantID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  rank: Number,
  score: { type: Number, required: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  submittedAt: { type: Date, default: Date.now },
})

export default mongoose.model('Result', resultSchema)
