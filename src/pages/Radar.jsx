import React, { useState, useEffect } from 'react';
import DogCard from '../components/DogCard';

const API_URL = 'http://localhost:8000';

const Radar = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch(`${API_URL}/dogs/nearby`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des chiens');
        }
        const data = await response.json();
        setDogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(fetchDogs, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div role="status" className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Chiens à proximité</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            name={dog.name}
            race={dog.race}
            humeur={dog.humeur}
            lat={dog.latitude}
            lon={dog.longitude}
          />
        ))}
      </div>
    </div>
  );
};

export default Radar; 