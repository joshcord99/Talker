import { gql } from "@apollo/client";

export const aiResponseText = gql`
  mutation Mutation($userText: String!) {
    getTherapyResponse(userText: $userText) {
      aiResponse
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: ProfileInput!) {
    createUser(input: $input) {
      token
      profile {
        _id
        username
        firstName
        lastName
        email
        age
        gender
        dob
        userEmotion
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        _id
        username
        firstName
        lastName
        email
        age
        gender
        dob
        userEmotion
      }
    }
  }
`;
