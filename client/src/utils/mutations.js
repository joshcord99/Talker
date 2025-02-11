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

export const UPDATE_USER_EMOTION = gql`
  mutation UpdateUserEmotion($userId: ID!, $userEmotion: String!) {
    updateUserEmotion(userId: $userId, userEmotion: $userEmotion) {
      _id
      userEmotion
    }
  }
`;

export const CREATE_DAILY_LOG = gql`
  mutation CreateDailyLog($userId: ID!, $emotion: String!, $notes: String) {
    createDailyLog(userId: $userId, emotion: $emotion, notes: $notes) {
      _id
      emotion
      logDate
      notes
    }
  }
`;

export const HAS_LOGGED_TODAY = gql`
  query HasLoggedToday($userId: ID!) {
    hasLoggedToday(userId: $userId)
  }
`;

export const GET_DAILY_LOGS = gql`
  query GetDailyLogs($userId: ID!) {
    getDailyLogs(userId: $userId) {
      _id
      emotion
      logDate
      notes
    }
  }
`;
