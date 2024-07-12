
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserFromStorage } from '../getUserFromStorage'; 

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await getUserFromStorage();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error('Error setting user from AsyncStorage:', error);
      }
    };

    fetchUser();
  }, []); 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
