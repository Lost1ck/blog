/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = React.useState(0);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [isOnline]);

  const fetchArticles = async (page = 1) => {
    setLoading(true);
    setError(null);
    const limit = 5;
    const offset = (page - 1) * limit;
    try {
      const response = await fetch(`https://api.realworld.io/api/articles?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      setArticles(data.articles);
      setTotalPages(Math.ceil(data.articlesCount / limit));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalContext.Provider value={{
      isOnline, articles, loading, error, fetchArticles, totalPages, setLoggedIn, loggedIn,
    }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => React.useContext(GlobalContext);
