/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

const RegistrationContext = createContext();

export function RegistrationProvider({ children }) {
  const [userReg, setUserReg] = useState({
    username: '',
    email: '',
    password: '',
  });
  const url = 'https://api.realworld.io/api/users';

  const fetchRegistration = async function sendUserToServer(userData) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData }),
      });
      if (!response) {
        throw new Error('Registration troubles');
      }
      const data = await response.json();
      if (data) {
        window.location.href = '/signin';
      }
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RegistrationContext.Provider value={{ userReg, setUserReg, fetchRegistration }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export const useRegistration = () => React.useContext(RegistrationContext);
