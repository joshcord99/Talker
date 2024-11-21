import React from 'react';
import { OpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import dotenv from 'dotenv';

dotenv.config();

// Get the OpenAI API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;
let model;

if (apiKey) {
  // Initialize the OpenAI model if the API key is provided
  model = new OpenAI({ temperature: 0, openAIApiKey: apiKey, modelName: 'gpt-3.5-turbo' });
} else {
  console.error('OPENAI_API_KEY is not configured.');
}

// Create a new prompt template for formatting prompts
const promptTemplate = new PromptTemplate({
  template: "You are an empathetic and skilled virtual therapist specializing in emotional well-being. Your role is to help individuals navigate and manage their emotional challenges with compassion, understanding, and practical advice. You listen attentively, validate feelings, and provide evidence-based strategies for coping, self-awareness, and emotional growth.",
  inputVariables: ["text"]
});

// Format the prompt using the prompt template with the user's text
const formatPrompt = async (text) => {
  return await promptTemplate.format({ text });
};

// Call the OpenAI API to get a response to the formatted prompt
const promptFunc = async (input) => {
  try {
    if (model) {
      return await model.invoke(input);
    }
    return `No OpenAI API key provided. Unable to provide a response.`;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// React component to handle the POST request and render translations
export const GetTranslations = ({ userText }) => {
  const [response, setResponse] = React.useState(null);

  const handleTranslation = async () => {
    if (!userText) {
      setResponse('Please provide text to translate.');
      return;
    }

    try {
      const formattedPrompt = await formatPrompt(userText);
      const result = await promptFunc(formattedPrompt);
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Internal Server Error');
    }
  };

  React.useEffect(() => {
    handleTranslation();
  }, [userText]);

  return (
    <div>
      <h1>Translation Service</h1>
      <p>Input: {userText}</p>
      <p>Response: {response}</p>
    </div>
  );
};
