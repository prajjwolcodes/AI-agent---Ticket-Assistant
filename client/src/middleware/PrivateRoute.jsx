import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

const PrivateRoute = ({children }) => {
    const {isAuthenticated} = useAuth();

     return isAuthenticated ? children : <Navigate to="/auth/login" />;
}

export default PrivateRoute