import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userDataSchema = new Schema({
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
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
  userEmotion: {
    type: String,
    default: "neutral",
  },
  conversations: [
    {
      type: Schema.Types.ObjectId,
      ref: "openAiResponseSchema",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

userDataSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});


const userData = mongoose.model("UserData", userDataSchema);


export default userData;
