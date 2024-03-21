/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { message, Spin } from 'antd';
import React, { useContext, createContext, useState } from 'react';

const UpdateUserDataContext = createContext();

export const UpdateUserDataProvider = ({ children }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchNewUserInfo = async (userData) => {
    setIsUpdating(true);
    try {
      const { token } = JSON.parse(localStorage.getItem('accessToken')).user;
      const response = await fetch('https://api.realworld.io/api/user', {
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
      setIsUpdating(false);
    }
  };

  return (
    <UpdateUserDataContext.Provider value={{ fetchNewUserInfo, isUpdating }}>
      {isUpdating ? <Spin /> : children}
    </UpdateUserDataContext.Provider>
  );
};

export const useUpdateUserData = () => useContext(UpdateUserDataContext);
