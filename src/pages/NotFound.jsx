import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">Page non trouvée</h2>
      <p className="text-gray-500 mb-8">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound; 