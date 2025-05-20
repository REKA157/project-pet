import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [dogMood, setDogMood] = useState('joueur');
  const [position, setPosition] = useState(null);
  const [nearestDog, setNearestDog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulation de l'humeur du chien
  useEffect(() => {
    const moods = ['joueur', 'calme', 'énergique', 'fatigué', 'excitée'];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    setDogMood(randomMood);
  }, []);

  // Récupération de la position
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
        }
      );
    }
  }, []);

  // Récupération du chien le plus proche
  useEffect(() => {
    const fetchNearestDog = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/dogs/nearby');
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setNearestDog(data.data[0]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des chiens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNearestDog();
  }, []);

  const navigationCards = [
    { path: '/profile', label: 'Profil du chien', emoji: '🐶' },
    { path: '/radar', label: 'Radar', emoji: '📍' },
    { path: '/meet', label: 'Rencontres', emoji: '❤️' },
    { path: '/upload-audio', label: 'Analyse audio', emoji: '🎤' },
    { path: '/health', label: 'Suivi santé', emoji: '🩺' },
    { path: '/assistant', label: 'Assistant vocal', emoji: '🗣️' }
  ];

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bienvenue sur Project PET
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <p className="text-xl text-gray-600 mb-4">
            Rex est {dogMood} aujourd'hui
          </p>
          {position && (
            <p className="text-gray-600">
              Dernière position : {position.latitude.toFixed(4)}, {position.longitude.toFixed(4)}
            </p>
          )}
          {loading ? (
            <p className="text-gray-500">Chargement des chiens à proximité...</p>
          ) : nearestDog ? (
            <p className="text-gray-600 mt-2">
              {nearestDog.name} est à {nearestDog.distance} de vous
            </p>
          ) : (
            <p className="text-gray-500">Aucun chien à proximité</p>
          )}
        </div>
      </div>

      {/* Grille de navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navigationCards.map((card) => (
          <Link
            key={card.path}
            to={card.path}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{card.emoji}</span>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {card.label}
                </h2>
                <p className="text-gray-500">
                  Cliquez pour accéder à {card.label.toLowerCase()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 