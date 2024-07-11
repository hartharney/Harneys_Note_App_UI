// graphqlQueries.js
import { gql } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GET_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      firstName
      lastName
      email
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($input: registerUserInput!) {
    registerUser(input: $input) {
      id
      firstName
      lastName
      email
      verified
      imageUrl
      googleId
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName
        imageUrl
        verified
      }
    }
  }
`;

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Failed to save the token to storage', error);
  }
};
