/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    avatarUrl: '',
    isActiveChecked: false,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
