import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the path according to your context file location

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Assumes you have user info in your AuthContext

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
