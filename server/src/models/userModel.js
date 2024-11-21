import { Schema } from 'mongoose';

const userDataSchema = new Schema({
  age: {
    type: Number, 
    required: true,
  },
  gender: {
    type: String, 
    required: true,
  },
  DOB: {
    type: Date, 
    required: true,
  },
  username: {
    type: String, 
    required: true,
  },
  password: {
    type: String, 
    required: true,
  },
  Conversations: [
    {
      type: Schema.Types.ObjectId, 
      ref: 'openAiResponseSchema',
    },
  ],
  date: {
    type: Date,
    default: Date.now, 
  },
  userEmotion: {
    type: String,
    default: "neutral", 
  },
});

export default userDataSchema;
