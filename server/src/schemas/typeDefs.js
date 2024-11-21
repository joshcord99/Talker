const typeDefs = `

type User {
  id: ID!
  age: Int
  gender: String
  DOB: String
  username: String!
  password: String!
  conversations: [OpenAiResponse!]
  date: String!
  userEmotion: String!
}

type OpenAiResponse {
  id: ID!
  userText: String!
  aiResponse: String!
  createdAt: String!
}
  type Query {
  _: Boolean
}

type Mutation {
  createUser(username: String!, password: String!, age: Int, gender: String, DOB: String): User
  loginUser(username: String!, password: String!): User
  getTherapyResponse(userText: String!): OpenAiResponse
  saveConversation(userId: ID!, userText: String!, aiResponseText: String!): OpenAiResponse
}
`;

export default typeDefs;
