/* eslint-disable react/prop-types */
import React, {
  createContext, useState, useEffect, useMemo,
} from 'react';
import { message } from 'antd';
import Spin from '../app/spin/Spin';
import { useGlobal } from './GlobalContext';

const LoginningContext = createContext();

export function LoginProvider({ children }) {
  const url = 'https://blog.kata.academy/api/users/login';
  const { setLoggedIn } = useGlobal();
  const [storedData, setStoredData] = useState('');
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('accessToken');
    if (storedUserData) {
      setStoredData(JSON.parse(storedUserData));
      setLoggedIn(true);
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
        localStorage.setItem('accessToken', JSON.stringify(data));
        // setStoredData(data);
        setLoggedIn(true);
      } else {
        message.error('Invalid data received');
      }
    } catch (err) {
      message.error('Login error');
    } finally {
      setLogin(false);
    }
  };

  const value = useMemo(() => ({
    fetchLoggining,
    storedData,
    setStoredData,
    updateStoredData,
  }), [fetchLoggining, storedData, setStoredData, updateStoredData]);

  return (
    <LoginningContext.Provider value={value}>
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
