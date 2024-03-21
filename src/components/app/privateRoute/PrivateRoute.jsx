/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useGlobal();

  return loggedIn ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
