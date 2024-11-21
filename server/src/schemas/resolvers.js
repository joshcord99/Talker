import bcrypt from 'bcrypt';
import fetchTherapyResponse from '../utils/api/responseFromAPI.js';
import userDataSchema from '../models/userModel.js';
import OpenAiResponse from '../models/openAIModel.js';

const resolvers = {
  Mutation: {
  createUser: async (_parent, args) => {
    try {
      const hashedPassword = await bcrypt.hash(args.password, 10);
      const userLogin = await userDataSchema.create({ ...args, password: hashedPassword });
      return userLogin;
    } catch (err) {
      console.error('Error creating user:', err);
      throw new Error('Failed to create user');
    }
  },

  loginUser: async (_parent, { username, password }) => {
    try {
      const user = await userDataSchema.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }
      return user;
    } catch (err) {
      console.error('Error during login:', err);
      throw new Error('Failed to log in user');
    }
  },
//get response from api
  getTherapyResponse: async (_parent, { userText }) => {
    try {
      if (!userText) {
        throw new Error('User text is required');
      }
      const aiResponseText = await fetchTherapyResponse(userText);
      const savedResponse = await OpenAiResponse.create({
        userText,
        aiResponse: aiResponseText,
      });
      return savedResponse;
    } catch (error) {
      console.error('Error in getTherapyResponse mutation:', error);
      throw new Error('Failed to fetch and save therapy response');
    }
  },

  saveConversation: async (_parent, { userId, userText, aiResponseText }) => {
    try {
      const openAiResponse = await OpenAiResponse.create({
        userText,
        aiResponse: aiResponseText,
      });
      const user = await userDataSchema.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      user.conversations.push(openAiResponse._id); 
      await user.save();
      return openAiResponse;
    } catch (error) {
      console.error('Error saving conversation:', error);
      throw new Error('Failed to save conversation');
    }
  },
}
};

export default resolvers;
