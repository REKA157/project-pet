import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeartbeat, FaRobot, FaAppleAlt, FaBell, FaExclamationTriangle, FaCheckCircle, FaWeight, FaUtensils, FaVial, FaChartLine, FaPaw, FaMapMarkerAlt, FaComments, FaUserFriends, FaHeart, FaCalendarAlt, FaStar, FaLanguage, FaMicrophone, FaFont, FaHistory, FaEdit, FaTrash, FaSearch, FaPrint, FaDownload, FaShare } from 'react-icons/fa';
import { MdHealthAndSafety, MdLocalHospital, MdVaccines } from 'react-icons/md';

const Dashboard = () => {
  const [activeMainTab, setActiveMainTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [dogMood, setDogMood] = useState('joueur');
  const [position, setPosition] = useState(null);
  const [nearestDog, setNearestDog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Données de santé simulées
  const [healthData, setHealthData] = useState({
    lastCheckup: '2024-02-15',
    nextVaccination: '2024-04-15',
    weight: 12.5,
    activityLevel: 'Modéré',
    dietStatus: 'Équilibré',
    hydrationLevel: 'Bon',
    sleepQuality: 'Excellent',
    stressLevel: 'Faible'
  });

  // Données de prédiction IA
  const [aiPredictions, setAiPredictions] = useState({
    healthRisks: [
      {
        id: 1,
        type: 'Obésité',
        probability: 15,
        severity: 'Faible',
        recommendations: [
          'Augmenter l\'activité physique',
          'Ajuster la portion de nourriture',
          'Surveiller les friandises'
        ]
      },
      {
        id: 2,
        type: 'Problèmes dentaires',
        probability: 25,
        severity: 'Modéré',
        recommendations: [
          'Brossage régulier des dents',
          'Contrôle vétérinaire',
          'Jouets dentaires'
        ]
      }
    ],
    preventiveMeasures: [
      {
        id: 1,
        type: 'Vaccination',
        dueDate: '2024-04-15',
        importance: 'Haute',
        description: 'Rappel annuel des vaccins'
      },
      {
        id: 2,
        type: 'Vermifuge',
        dueDate: '2024-03-30',
        importance: 'Moyenne',
        description: 'Traitement préventif'
      }
    ]
  });

  // Données de suivi nutritionnel
  const [nutritionData, setNutritionData] = useState({
    dailyCalories: 850,
    recommendedCalories: 900,
    waterIntake: 500,
    recommendedWater: 600,
    mealSchedule: [
      {
        time: '08:00',
        type: 'Petit-déjeuner',
        food: 'Croquettes premium',
        amount: '150g'
      },
      {
        time: '12:00',
        type: 'Déjeuner',
        food: 'Nourriture humide',
        amount: '100g'
      },
      {
        time: '18:00',
        type: 'Dîner',
        food: 'Croquettes premium',
        amount: '150g'
      }
    ],
    nutritionalAnalysis: {
      proteins: 85,
      carbohydrates: 65,
      fats: 70,
      vitamins: 90,
      minerals: 80
    }
  });

  // Rappels personnalisés
  const [healthReminders, setHealthReminders] = useState([
    {
      id: 1,
      type: 'Médicament',
      time: '08:00',
      description: 'Antiparasitaire',
      status: 'pending'
    },
    {
      id: 2,
      type: 'Activité',
      time: '17:00',
      description: 'Séance de jeu',
      status: 'completed'
    },
    {
      id: 3,
      type: 'Nourriture',
      time: '12:00',
      description: 'Repas spécial',
      status: 'pending'
    }
  ]);

  // Configuration des couleurs pour chaque service
  const colorConfig = {
    health: {
      primary: 'bg-blue-600',
      secondary: 'bg-blue-50',
      text: 'text-blue-600',
      hover: 'hover:bg-blue-700',
      border: 'border-blue-200'
    },
    petmeet: {
      primary: 'bg-pink-600',
      secondary: 'bg-pink-50',
      text: 'text-pink-600',
      hover: 'hover:bg-pink-700',
      border: 'border-pink-200'
    },
    location: {
      primary: 'bg-green-600',
      secondary: 'bg-green-50',
      text: 'text-green-600',
      hover: 'hover:bg-green-700',
      border: 'border-green-200'
    },
    chat: {
      primary: 'bg-purple-600',
      secondary: 'bg-purple-50',
      text: 'text-purple-600',
      hover: 'hover:bg-purple-700',
      border: 'border-purple-200'
    },
    overview: {
      primary: 'bg-nature-600',
      secondary: 'bg-nature-50',
      text: 'text-nature-600',
      hover: 'hover:bg-nature-700',
      border: 'border-nature-200'
    },
    translator: {
      primary: 'bg-indigo-600',
      secondary: 'bg-indigo-50',
      text: 'text-indigo-600',
      hover: 'hover:bg-indigo-700',
      border: 'border-indigo-200'
    }
  };

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

  const mainTabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: FaPaw },
    { id: 'health', label: 'Santé', icon: FaHeartbeat },
    { id: 'petmeet', label: 'PetMeet', icon: FaUserFriends },
    { id: 'location', label: 'Localisation', icon: FaMapMarkerAlt },
    { id: 'translator', label: 'Traducteur', icon: FaLanguage }
  ];

  const getCurrentColorConfig = () => {
    return colorConfig[activeMainTab] || colorConfig.overview;
  };

  return (
    <div className="space-y-6">
      {/* En-tête du Dashboard */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Tableau de bord</h1>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <p className="text-gray-600">Bienvenue sur votre espace personnel</p>
            <p className="text-sm text-gray-500">Dernière mise à jour: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Humeur actuelle:</span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {dogMood}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveMainTab('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeMainTab === 'overview'
                ? 'bg-nature-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Vue d'ensemble
          </button>
          <button
            onClick={() => setActiveMainTab('health')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeMainTab === 'health'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Santé
          </button>
          <button
            onClick={() => setActiveMainTab('petmeet')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeMainTab === 'petmeet'
                ? 'bg-pink-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            PetMeet
          </button>
          <button
            onClick={() => setActiveMainTab('location')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeMainTab === 'location'
                ? 'bg-green-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Localisation
          </button>
          <button
            onClick={() => setActiveMainTab('chat')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeMainTab === 'chat'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveMainTab('translator')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeMainTab === 'translator'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Traducteur
          </button>
        </nav>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vue d'ensemble */}
          {activeMainTab === 'overview' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Vue d'ensemble</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800">Santé</h3>
                  <p className="text-sm text-blue-600">Prochain rendez-vous: {healthData.nextVaccination}</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="font-medium text-pink-800">PetMeet</h3>
                  <p className="text-sm text-pink-600">Chiens à proximité: {nearestDog ? '1' : '0'}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800">Localisation</h3>
                  <p className="text-sm text-green-600">
                    {position ? 'Position actuelle disponible' : 'Position non disponible'}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-800">Chat</h3>
                  <p className="text-sm text-purple-600">Messages non lus: 0</p>
                </div>
              </div>
            </div>
          )}

          {/* Santé */}
          {activeMainTab === 'health' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Santé</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800">Dernier check-up</h3>
                    <p className="text-sm text-blue-600">{healthData.lastCheckup}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800">Poids</h3>
                    <p className="text-sm text-blue-600">{healthData.weight} kg</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800">Risques de santé</h3>
                  <div className="space-y-2">
                    {aiPredictions.healthRisks.map((risk) => (
                      <div key={risk.id} className="bg-white p-3 rounded">
                        <p className="font-medium">{risk.type}</p>
                        <p className="text-sm text-gray-600">Probabilité: {risk.probability}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Autres onglets... */}
        </div>

        {/* Colonne latérale */}
        <div className="space-y-6">
          {/* Rappels */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Rappels</h2>
            <div className="space-y-4">
              {healthReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={`p-4 rounded-lg ${
                    reminder.status === 'completed' ? 'bg-green-50' : 'bg-yellow-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{reminder.description}</p>
                      <p className="text-sm text-gray-600">{reminder.time}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        reminder.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {reminder.status === 'completed' ? 'Terminé' : 'En attente'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Nutrition</h2>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800">Calories</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600">
                    {nutritionData.dailyCalories} / {nutritionData.recommendedCalories} kcal
                  </span>
                  <div className="w-24 h-2 bg-green-200 rounded-full">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{
                        width: `${(nutritionData.dailyCalories / nutritionData.recommendedCalories) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800">Eau</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600">
                    {nutritionData.waterIntake} / {nutritionData.recommendedWater} ml
                  </span>
                  <div className="w-24 h-2 bg-blue-200 rounded-full">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{
                        width: `${(nutritionData.waterIntake / nutritionData.recommendedWater) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 