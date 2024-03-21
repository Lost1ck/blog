/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';
import { message } from 'antd';
import Spin from '../app/spin/Spin';
import { LoginProvider } from './LoginContext';

const RegistrationContext = createContext();

export function RegistrationProvider({ children }) {
  const { setStoredData } = LoginProvider;
  const [isLoging, setLoging] = useState(false);
  const [userReg, setUserReg] = useState({
    username: '',
    email: '',
    password: '',
  });
  const url = 'https://api.realworld.io/api/users';

  const fetchRegistration = async function sendUserToServer(userData) {
    try {
      setLoging(true);
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
      if (data && Object.prototype.hasOwnProperty.call(data, 'user')) {
        localStorage.setItem('accessToken', JSON.stringify(data));
        setStoredData(data);
        window.location.href = '/';
      } else {
        message.error('Invalid data received');
      }
    } catch (err) {
      message.error('Registraion error');
    } finally {
      setLoging(false);
    }
  };

  return (
    <RegistrationContext.Provider value={{ userReg, setUserReg, fetchRegistration }}>
      {isLoging ? (
        <Spin />
      ) : (
        <div>{ children }</div>
      )}
    </RegistrationContext.Provider>
  );
}

export const useRegistration = () => React.useContext(RegistrationContext);
