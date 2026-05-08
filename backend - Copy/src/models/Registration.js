import mongoose from 'mongoose'

const registrationSchema = new mongoose.Schema({
  eventID: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  participantID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teamID: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
  registeredAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['registered', 'completed', 'cancelled'], default: 'registered' },
  ticketURL: String,
  confirmedAt: Date,
})

export default mongoose.model('Registration', registrationSchema)
