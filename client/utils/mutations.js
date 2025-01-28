import {gql} from "@apollo/client"

export const aiResponseText = gql `
mutation Mutation($userText: String!) {
    getTherapyResponse(userText: $userText) {
      aiResponse
    }
  }
`
  