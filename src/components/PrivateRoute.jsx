import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';

export default function PrivateRoute({ children }) {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Mode démo : accès autorisé si un token est présent
    const token = localStorage.getItem('token');
    setIsValid(!!token);
    setIsValidating(false);
  }, []);

  if (isValidating) {
    return <LoadingSpinner />;
  }

  if (!isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
} 