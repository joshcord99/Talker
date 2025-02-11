import mongoose, { Schema } from "mongoose";

const dailyLogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "UserData",
    required: true,
  },
  emotion: {
    type: String,
    required: true,
  },
  logDate: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    default: "",
  },
});

// Create a compound index to ensure one log per user per day
dailyLogSchema.index({ userId: 1, logDate: 1 }, { unique: true });

const DailyLog = mongoose.model("DailyLog", dailyLogSchema);

export default DailyLog;
