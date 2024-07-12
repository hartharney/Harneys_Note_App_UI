// services/contexts/isLoggedInContext.js
import React, { createContext, useState, useContext } from 'react';

const IsLoggedInContext = createContext();

export const IsLoggedInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </IsLoggedInContext.Provider>
  );
};

export const useIsLoggedIn = () => useContext(IsLoggedInContext);
