/* eslint-disable react/prop-types */
import React, {
  useContext, createContext, useState, useMemo,
} from 'react';

const CreateAnArticleContext = createContext();

export const CreateAnArticleProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const fetchCreateArticle = async (articleData) => {
    const url = 'https://blog.kata.academy/api/articles';
    let token;
    try {
      const storage = localStorage.getItem('accessToken');
      if (storage) {
        token = JSON.parse(storage).user.token;
      }
    } catch (e) {
      console.error('Error parsing accessToken from localStorage', e);
      setError('Failed to retrieve access token.');
      return;
    }
    if (!token) {
      setError('No access token found.');
      return;
    }
    const requestBody = {
      article: {
        title: articleData.title,
        description: articleData.description,
        body: articleData.body,
        tagList: articleData.tags,
      },
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.error('Error creating article', e);
      setError(`Failed to create article: ${e.message}`);
    }
  };

  const value = useMemo(() => ({
    fetchCreateArticle,
    error,
  }), [error, fetchCreateArticle]);

  return (
    <CreateAnArticleContext.Provider value={value}>
      {children}
    </CreateAnArticleContext.Provider>
  );
};

export const useCreate = () => useContext(CreateAnArticleContext);
