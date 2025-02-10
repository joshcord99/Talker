// Application configuration
export const config = {
  // API Configuration
  api: {
    graphqlUrl:
      import.meta.env.VITE_GRAPHQL_URL || "http://localhost:3001/graphql",
  },

  // User Defaults
  userDefaults: {
    age: 25,
    gender: "Not specified",
    defaultEmotion: "Neutral",
  },

  // Creator Information
  creator: {
    name: "Joshua Cordial",
    email: "joshcord99@gmail.com",
    github: "https://github.com/joshcord99",
  },

  // Application Settings
  app: {
    name: "Talker - AI Mental Health Companion",
    version: "1.0.0",
  },
};
