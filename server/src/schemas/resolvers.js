import bcrypt from "bcrypt";
import fetchTherapyResponse from "../utils/api/responseFromAPI.js";
import OpenAiResponse from "../models/openAIModel.js";
import userData from "../models/userModel.js";
import { signToken } from "../utils/api/auth.js";

const resolvers = {
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
