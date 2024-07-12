import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../services/contexts/userContext';
import {
  GET_USERS,
  LOGIN_USER,
  REGISTER_USER,
  GET_NOTES,
  GET_NOTE_BY_ID,
  GET_NOTE_USERS,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  SHARE_NOTE,
  UNSHARE_NOTE,
  ADD_USER_TO_NOTE,
  saveToken,
  getSavedToken,
} from './graphqlQueries';

// User Registration Hook
export const useRegisterUser = () => {
  const [registerUserMutation, { data, loading, error }] = useMutation(REGISTER_USER);

  const handleRegisterUser = async (input, currentPath) => {
    try {
      const result = await registerUserMutation({ variables: { input }, context: { headers: { 'x-current-path': currentPath } } });
      return result.data.registerUser;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  return { handleRegisterUser, data, loading, error };
};

// User Login Hook

export const useLoginUser = () => {
  const [loginMutation, { data, loading, error }] = useMutation(LOGIN_USER);
  const { setUser } = useUser(); 

  const handleLoginUser = async ({ email, password }, currentPath) => {
    try {
      const result = await loginMutation({ variables: { email, password }, context: { headers: { 'x-current-path': currentPath } } });
      const { token, user: loggedInUser } = result.data.login;
      await saveToken(token);
      await saveUser(loggedInUser)
      
      return loggedInUser;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  };

  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', JSON.stringify(token));
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  const saveUser = async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  };


  return { handleLoginUser, data, loading, error };
};


// Get All Users Hook
export const useGetUsers = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  return { loading, error, data };
};

// Get All Notes Hook
export const useGetNotes = () => {
  const { loading, error, data } = useQuery(GET_NOTES);
  return { loading, error, data };
};

// Get Note By ID Hook
export const useGetNoteById = (id) => {
  const { loading, error, data } = useQuery(GET_NOTE_BY_ID, { variables: { id } });
  return { loading, error, data };
};

// Get Note Users Hook
export const useGetNoteUsers = (id) => {
  const { loading, error, data } = useQuery(GET_NOTE_USERS, { variables: { id } });
  return { loading, error, data };
};

// Add Note Hook
export const useAddNote = () => {
  const [addNoteMutation, { data, loading, error }] = useMutation(ADD_NOTE);

  const handleAddNote = async (input, currentPath) => {
    try {
      console.log("this input", input)
      const result = await addNoteMutation({ variables: { input }, context: { headers: { 'x-current-path': currentPath } } });
      return result.data.addNote;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  };

  return { handleAddNote, data, loading, error };
};

// Update Note Hook
export const useUpdateNote = () => {
  const [updateNoteMutation, { data, loading, error }] = useMutation(UPDATE_NOTE);

  const handleUpdateNote = async (id, input, currentPath) => {
    try {
      const result = await updateNoteMutation({ variables: { id, input }, context: { headers: { 'x-current-path': currentPath } } });
      return result.data.updateNote;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  };

  return { handleUpdateNote, data, loading, error };
};

// Delete Note Hook
export const useDeleteNote = () => {
  const [deleteNoteMutation, { data, loading, error }] = useMutation(DELETE_NOTE);

  const handleDeleteNote = async (id, currentPath) => {
    try {
      const result = await deleteNoteMutation({ variables: { id }, context: { headers: { 'x-current-path': currentPath } } });
      return result.data.deleteNote;
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  };

  return { handleDeleteNote, data, loading, error };
};

// Share Note Hook
export const useShareNote = () => {
  const [shareNoteMutation, { data, loading, error }] = useMutation(SHARE_NOTE);

  const handleShareNote = async (input, currentPath) => {
    try {
      const result = await shareNoteMutation({ variables: { input }, context: { headers: { 'x-current-path': currentPath } } });
      return result.data.shareNote;
    } catch (error) {
      console.error('Error sharing note:', error);
      throw error;
    }
  };

  return { handleShareNote, data, loading, error };
};

// Unshare Note Hook
export const useUnshareNote = () => {
  const [unshareNoteMutation, { data, loading, error }] = useMutation(UNSHARE_NOTE);

  const handleUnshareNote = async (input, currentPath) => {
    try {
      const result = await unshareNoteMutation({ variables: { input }, context: { headers: { 'x-current-path': currentPath } } });
      return result.data.unshareNote;
    } catch (error) {
      console.error('Error unsharing note:', error);
      throw error;
    }
  };

  return { handleUnshareNote, data, loading, error };
};


// Add user to Note Hook
export const useAddUserToNote = () => {
  const [addUserToNoteMutation, { data, loading, error }] = useMutation(ADD_USER_TO_NOTE);

  const handleAddUserToNote = async (input, currentPath) => {
    try {
      const result = await addUserToNoteMutation({ variables: { input }, context: { headers: { 'x-current-path': currentPath } } });
      return result.data.addUserToNote;
    } catch (error) {
      console.error('Error adding user to note:', error);
      throw error;
    }
  };

  return { handleAddUserToNote, data, loading, error };
};

export const useLogout = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Home'); 
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  return { handleLogout };
};
export const useToken = () => {
  const token = getSavedToken();
  return { token };
}
