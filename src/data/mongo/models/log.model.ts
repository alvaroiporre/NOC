import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  origin: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

export const LogModel = mongoose.model('Log', logSchema);