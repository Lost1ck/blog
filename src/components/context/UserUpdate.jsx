/* eslint-disable react/prop-types */
import React, {
  useContext, createContext, useState, useMemo,
} from 'react';
import { message, Spin } from 'antd';

const UpdateUserDataContext = createContext();

export const UpdateUserDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewUserInfo = async (userData) => {
    setIsLoading(true);
    try {
      const { token } = JSON.parse(localStorage.getItem('accessToken')).user;
      const response = await fetch('https://blog.kata.academy/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ user: userData }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.errors);
      localStorage.setItem('accessToken', JSON.stringify({ user: data.user }));
      message.success('User data updated successfully');
      return data;
    } catch (error) {
      message.error(error.toString());
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserNewInfo = useMemo(() => ({
    fetchNewUserInfo,
  }), []);

  return (
    <UpdateUserDataContext.Provider value={fetchUserNewInfo}>
      {isLoading ? <Spin /> : children}
    </UpdateUserDataContext.Provider>
  );
};

export const useUpdateUserData = () => useContext(UpdateUserDataContext);
