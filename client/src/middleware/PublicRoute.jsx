import React from 'react'
import { useAuth } from './authContext';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({children}) => {
    const {isAuthenticated} = useAuth();
  return (
    isAuthenticated ? <Navigate to="/create" /> : children
  )
}

export default PublicRoute