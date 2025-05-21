import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('PrivateRoute mounted');
    const token = localStorage.getItem('token');
    console.log('Token in PrivateRoute:', token);

    if (token === 'demo-token') {
      console.log('Demo mode detected');
      setIsAuthenticated(true);
      setIsLoading(false);
    } else if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/login');
    } else {
      // Vérification du token en production
      console.log('Checking token validity');
      // ... existing token validation code ...
    }
  }, [navigate]);

  if (isLoading) {
    console.log('PrivateRoute is loading');
    return <LoadingSpinner />;
  }

  console.log('PrivateRoute rendering, isAuthenticated:', isAuthenticated);
  return isAuthenticated ? <Outlet /> : null;
};

export default PrivateRoute; 