// services/auth.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserFromStorage = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error retrieving user from AsyncStorage:', error);
    throw error;
  }
};
