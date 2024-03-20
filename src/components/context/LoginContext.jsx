/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React, { createContext } from 'react';

const LoginningContext = createContext();

export function LoginProvider({ children }) {
  const url = 'https://api.realworld.io/api/users/login';

  const fetchLoggining = async function sendUserToServer(userData) {
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
      // if (data) {
      //   window.location.href = '/signin';
      // }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoginningContext.Provider value={{ fetchLoggining }}>
      {children}
    </LoginningContext.Provider>
  );
}

export const userLogin = () => React.useContext(LoginningContext);
