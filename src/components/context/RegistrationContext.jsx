/* eslint-disable react/prop-types */
import React, { createContext, useState, useMemo } from 'react';
import Spin from '../app/spin/Spin';
import { useGlobal } from './GlobalContext';

const RegistrationContext = createContext();

export function RegistrationProvider({ children }) {
  const { setLoggedIn } = useGlobal();
  const [local, setLocal] = useState();
  const [isLoging, setLoging] = useState(false);
  const [userReg, setUserReg] = useState({
    username: '',
    email: '',
    password: '',
  });

  const url = 'https://blog.kata.academy/api/users';

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
      const data = await response.json();
      try {
        localStorage.setItem('accessToken', JSON.stringify(data));
        setLocal(localStorage);
        setLoggedIn(true);
        // window.location.href = '/';
      } catch (e) {
        throw new Error(`Error, ${e.message}`);
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoging(false);
    }
  };

  const value = useMemo(() => ({
    userReg, setUserReg, fetchRegistration, setLocal, local,
  }));

  return (
    <RegistrationContext.Provider value={value}>
      {isLoging ? (
        <Spin />
      ) : (
        <div>{ children }</div>
      )}
    </RegistrationContext.Provider>
  );
}

export const useRegistration = () => React.useContext(RegistrationContext);
