import bcrypt from "bcrypt";
import fetchTherapyResponse from "../utils/api/responseFromAPI.js";
import OpenAiResponse from "../models/openAIModel.js";
import userData from "../models/userModel.js";
import DailyLog from "../models/dailyLogModel.js";
import { signToken } from "../utils/api/auth.js";

const resolvers = {
  Query: {
    hasLoggedToday: async (_parent, { userId }) => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const log = await DailyLog.findOne({
          userId,
          logDate: {
            $gte: today,
            $lt: tomorrow,
          },
        });

        return !!log;
      } catch (error) {
        console.error("Error checking daily log:", error);
        return false;
      }
    },

    getDailyLogs: async (_parent, { userId }) => {
      try {
        const logs = await DailyLog.find({ userId })
          .sort({ logDate: -1 })
          .limit(30); // Get last 30 days

        return logs;
      } catch (error) {
        console.error("Error fetching daily logs:", error);
        return [];
      }
    },
  },
  userData: {
    dob: (parent) => {
      if (parent.dob) {
        return parent.dob.toISOString().split("T")[0];
      }
      return null;
    },
    date: (parent) => {
      if (parent.date) {
        return parent.date.toISOString();
      }
      return null;
    },
  },
  Mutation: {
    createUser: async (_parent, { input }) => {
      console.log(input);
      const profile = await userData.create({ ...input });
      const token = signToken(profile.username, profile._id);
      return { token, profile };
    },

    loginUser: async (_parent, { username, password }) => {
      try {
        const user = await userData.findOne({ username });
        if (!user) {
          throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }
        const token = signToken(user.username, user._id);
        return { token, user };
      } catch (err) {
        console.error("Error during login:", err);
        throw new Error("Failed to log in user");
      }
    },

    updateUserEmotion: async (_parent, { userId, userEmotion }) => {
      try {
        const user = await userData.findByIdAndUpdate(
          userId,
          { userEmotion },
          { new: true }
        );
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        console.error("Error updating user emotion:", error);
        throw new Error("Failed to update user emotion");
      }
    },

    createDailyLog: async (_parent, { userId, emotion, notes = "" }) => {
      try {
        // Update user's current emotion
        const user = await userData.findByIdAndUpdate(
          userId,
          { userEmotion: emotion },
          { new: true }
        );

        if (!user) {
          throw new Error("User not found");
        }

        // Create or update daily log
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dailyLog = await DailyLog.findOneAndUpdate(
          { userId, logDate: { $gte: today } },
          { emotion, notes, logDate: new Date() },
          { upsert: true, new: true }
        );

        return dailyLog;
      } catch (error) {
        console.error("Error creating daily log:", error);
        throw new Error("Failed to create daily log");
      }
    },

    //get response from api
    getTherapyResponse: async (_parent, { userText }, context) => {
      try {
        if (!userText) {
          throw new Error("User text is required");
        }
        ("");
        const aiResponseText = await fetchTherapyResponse(userText);
        const savedResponse = await OpenAiResponse.create({
          userText,
          aiResponse: aiResponseText,
        });
        const user = await userData.findById(context.user._id);
        if (!user) {
          throw new Error("User not found");
        }
        user.conversations.push(savedResponse._id);
        await user.save();
        return savedResponse;
      } catch (error) {
        console.error("Error in getTherapyResponse mutation:", error);
        throw new Error("Failed to fetch and save therapy response");
      }
    },
  },
};

export default resolvers;
