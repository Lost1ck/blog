/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from 'react';
import { message } from 'antd';
import Spin from '../app/spin/Spin';

const LoginningContext = createContext();

export function LoginProvider({ children }) {
  const url = 'https://api.realworld.io/api/users/login';
  const [storedData, setStoredData] = useState(null);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('accessToken');
    if (storedUserData) {
      setStoredData(JSON.parse(storedUserData));
    }
  }, []);

  const updateStoredData = (data) => {
    setStoredData(data);
  };

  const fetchLoggining = async function sendUserToServer(userData) {
    setLogin(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData }),
      });
      if (!response.ok) {
        throw new Error('Logining troubles');
      }
      const data = await response.json();

      if (data && Object.prototype.hasOwnProperty.call(data, 'user')) {
        console.log(Object(data));
        localStorage.setItem('accessToken', JSON.stringify(data));
        setStoredData(data);
        window.location.href = '/';
      } else {
        message.error('Invalid data received');
      }
    } catch (err) {
      message.error('Login error');
    } finally {
      setLogin(false);
    }
  };

  return (
    <LoginningContext.Provider value={{
      fetchLoggining, storedData, setStoredData, updateStoredData,
    }}
    >
      {isLogin ? (
        <Spin />
      ) : (
        <div>
          { children }
        </div>
      )}
    </LoginningContext.Provider>
  );
}

export const userLogin = () => React.useContext(LoginningContext);
