import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
  const isLogged = !!localStorage.getItem('token');
  
  return isLogged ? element : <Navigate to="/login" />;
}

export default ProtectedRoute