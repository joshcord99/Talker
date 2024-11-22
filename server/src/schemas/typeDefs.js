const typeDefs = `
  type Query {
  _: Boolean
}

type userData {
  _id: ID!
  age: Int
  gender: String!
  dob: String!
  username: String!
  password: String!
  conversations: [OpenAiResponse!]
  date: String!
  userEmotion: String!
}
  
  input ProfileInput {
  username: String! 
  password: String! 
  age: Int!
  gender: String!
  dob: String! 
  userEmotion: String!
  }

   type Auth {
    token: String
    user: userData
  }

type OpenAiResponse {
  _id: ID!
  userText: String!
  aiResponse: String!
  createdAt: String!
}

type Mutation {
  createUser(input: ProfileInput!): Auth
  loginUser(username: String!, password: String!): Auth
  getTherapyResponse(userText: String!): OpenAiResponse
}
`;

export default typeDefs;
