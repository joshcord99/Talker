import { OpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
let model = null;

if (apiKey) {
  model = new OpenAI({
    temperature: 0,
    openAIApiKey: apiKey,
    modelName: 'gpt-3.5-turbo',
  });
} else {
  console.error('OPENAI_API_KEY is not configured.');
}
const promptTemplate = new PromptTemplate({
  template:
    'You are an empathetic and skilled virtual therapist specializing in emotional well-being. Your role is to help individuals navigate and manage their emotional challenges with compassion, understanding, and practical advice. You listen attentively, validate feelings, and provide evidence-based strategies for coping, self-awareness, and emotional growth.',
  inputVariables: ['text'],
});

export const fetchTherapyResponse = async (userText) => {
  if (!model) {
    throw new Error('OpenAI API key is not configured.');
  }
  try {
    const formattedPrompt = await promptTemplate.format({ text: userText });
    const response = await model.invoke(formattedPrompt);
    return response;
  } catch (error) {
    console.error('Error fetching therapy response:', error);
    throw new Error('Unable to fetch therapy response');
  }
};

export default fetchTherapyResponse;
