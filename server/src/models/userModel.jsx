import { Schema, Types, model, type Document } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserInfo = new Schema<IUserInfo>({
  date: { type: Date, required: true },
  calories: { type: Number, required: true },
  foodItems: { type: [String], required: true }
}, { _id: false });

const UserInfoSchema = new Schema<IUserInfo>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userConvserations: [{
    type: Types.ObjectId,
    ref: 'userConversations',
  }],
});

// set up pre-save middleware to create password
UserInfoSchema.pre<IUserInfo>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
UserInfoSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const UserInfo = model<IUserInfo>('UserInfo', UserInfoSchema);
export default UserInfo; 
