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

export const GET_NOTES = gql`
  query GetNotes {
    getNotes {
      id
      title
      content
      owner {
        id
        firstName
        lastName
      }
      sharedUsers {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_NOTE_USERS = gql`
  query GetNoteUsers($id: String!) {
    getNoteUsers(id: $id) {
      id
      firstName
      lastName
    }
  }
`

export const GET_NOTE_BY_ID = gql`
  query GetNoteById($id: String!) {
    getNoteById(id: $id) {
      id
      title
      content
      owner {
        id
        firstName
        lastName
      }
      sharedUsers {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_NOTE_BY_USER = gql`
  query GetNoteByUser {
    getNoteByUser {
      id
      title
      content
      owner {
        id
        firstName
        lastName
      }
      sharedUsers {
        id
        firstName
        lastName
      }
    }
  }
`;

export const ADD_NOTE = gql`
  mutation AddNote($input: addNoteInput!) {
    addNote(input: $input) {
      id
      title
      content
      owner {
        id
        firstName
        lastName
      }
      sharedUsers {
        id
        firstName
        lastName
      }
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote($id: String!, $input: updateNoteInput!) {
    updateNote(id: $id, input: $input) {
      id
      title
      content
      owner {
        id
        firstName
        lastName
      }
      sharedUsers {
        id
        firstName
        lastName
      }
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: String!) {
    deleteNote(id: $id) {
      id
      title
      content
      owner {
        id
        firstName
        lastName
      }
      sharedUsers {
        id
        firstName
        lastName
      }
    }
  }
`;

export const SHARE_NOTE = gql`
  mutation ShareNote($input: shareNoteInput!) {
    shareNote(input: $input) {
      id
      title
      content
      owner {
        id
        firstName
        lastName
      }
      sharedUsers {
        id
        firstName
        lastName
      }
    }
  }
`;

export const UNSHARE_NOTE = gql`
  mutation UnshareNote($input: unshareNoteInput!) {
    unshareNote(input: $input) {
      id
      title
      content
      owner {
        id
        firstName
        lastName
      }
      sharedUsers {
        id
        firstName
        lastName
      }
    }
  }
`;

export const ADD_USER_TO_NOTE = gql`
  mutation AddUserToNote($input: addUserToNoteInput!) {
    addUserToNote(input: $input) {
      id
      title
      content
      owner {
        id
        firstName
        lastName
      }
      sharedUsers {
        id
        firstName
        lastName
      }
    }
  }
`;



export const saveToken = async (token) => {
  try {
    const saved = await AsyncStorage.setItem('token', token);
    console.log("saved token", saved)
  } catch (error) {
    console.error('Failed to save the token to storage', error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error('Failed to get the token from storage', error);
  }
}

export const clearAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error('Error clearing token:', error);
    throw error;
  }
};
