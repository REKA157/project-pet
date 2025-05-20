import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';

export default function PrivateRoute({ children }) {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsValidating(false);
          return;
        }

        // Vérification du token avec le backend
        const response = await fetch('/api/auth/validate', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Token invalide');
        }

        setIsValid(true);
      } catch (error) {
        console.error('Erreur de validation du token:', error);
        localStorage.removeItem('token');
        toast.error('Session expirée. Veuillez vous reconnecter.');
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, []);

  if (isValidating) {
    return <LoadingSpinner />;
  }

  if (!isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
} 