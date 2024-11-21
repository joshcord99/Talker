import mongoose from 'mongoose';

const OpenAiResponse = new mongoose.Schema({
  userText: {
    type: String,
    required: true,
  },
  aiResponse: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('OpenAiResponse', OpenAiResponse);
