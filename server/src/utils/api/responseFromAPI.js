import dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI();

export const fetchTherapyResponse = async (userText) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
          { role: "system", content:  "You are an empathetic and skilled virtual therapist specializing in emotional well-being. Your role is to help individuals navigate and manage their emotional challenges with compassion, understanding, and practical advice. You listen attentively, validate feelings, and provide evidence-based strategies for coping, self-awareness, and emotional growth." },
          {
              role: "user",
              content: userText,
          },
      ],
  });
  return (completion.choices[0].message.content)
  } catch (error) {
    console.error('Error fetching therapy response:', error);
    throw new Error('Unable to fetch therapy response');
  }
};

export default fetchTherapyResponse;
