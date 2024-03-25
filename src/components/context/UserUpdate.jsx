/* eslint-disable react/prop-types */
import React, {
  useContext, createContext, useState, useMemo,
} from 'react';
import { message, Spin } from 'antd';

const UpdateUserDataContext = createContext();

export const UpdateUserDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async (article, loggedIn, setArticles) => {
    if (!loggedIn) {
      alert('Please log in to like articles.');
      return;
    }
    const { slug, favorited } = article;
    const endpoint = `https://blog.kata.academy/api/articles/${slug}/favorite`;
    const method = favorited ? 'DELETE' : 'POST';
    console.log(favorited);
    console.log(slug);
    try {
      const { token } = JSON.parse(localStorage.getItem('accessToken')).user;
      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const { article: updatedArticle } = await response.json();
      if (!response.ok) {
        throw new Error('Failed to update the favorite status of the article');
      }
      console.log(response);
      setArticles((prevArticles) => prevArticles.map((currentArticle) => (
        currentArticle.slug === slug ? { ...currentArticle, ...updatedArticle } : currentArticle
      )));
    } catch (e) {
      console.error('Error updating favorite status:', e);
      alert('There was an error updating the favorite status.');
    }
  };

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
    fetchNewUserInfo, handleLike,
  }), []);

  return (
    <UpdateUserDataContext.Provider value={fetchUserNewInfo}>
      {isLoading ? <Spin /> : children}
    </UpdateUserDataContext.Provider>
  );
};

export const useUpdateUserData = () => useContext(UpdateUserDataContext);
