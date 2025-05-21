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
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Humeur actuelle :</span>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
              {dogMood}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <div className="bg-white rounded-lg shadow">
        <nav className="flex space-x-4 p-4">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMainTab(tab.id)}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                activeMainTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {activeMainTab === 'overview' && (
            <div className="space-y-6">
              {/* Données de santé */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Données de santé</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600">Dernier check-up</div>
                    <div className="text-lg font-semibold">{healthData.lastCheckup}</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600">Prochain vaccin</div>
                    <div className="text-lg font-semibold">{healthData.nextVaccination}</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="text-sm text-gray-600">Poids</div>
                    <div className="text-lg font-semibold">{healthData.weight} kg</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-sm text-gray-600">Niveau d'activité</div>
                    <div className="text-lg font-semibold">{healthData.activityLevel}</div>
                  </div>
                </div>
              </div>

              {/* Prédictions IA */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Prédictions IA</h2>
                <div className="space-y-4">
                  {aiPredictions.healthRisks.map((risk) => (
                    <div key={risk.id} className="p-4 bg-red-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{risk.type}</h3>
                          <p className="text-sm text-gray-600">Probabilité: {risk.probability}%</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-red-200 text-red-800">
                          {risk.severity}
                        </span>
                      </div>
                      <ul className="mt-2 space-y-1">
                        {risk.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-600">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeMainTab === 'health' && (
            <div className="space-y-6">
              {/* Sous-onglets de santé */}
              <div className="bg-white rounded-lg shadow p-4">
                <nav className="flex space-x-4">
                  <button
                    onClick={() => setActiveSubTab('overview')}
                    className={`px-4 py-2 rounded-md ${
                      activeSubTab === 'overview'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Vue d'ensemble
                  </button>
                  <button
                    onClick={() => setActiveSubTab('history')}
                    className={`px-4 py-2 rounded-md ${
                      activeSubTab === 'history'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Historique
                  </button>
                  <button
                    onClick={() => setActiveSubTab('medications')}
                    className={`px-4 py-2 rounded-md ${
                      activeSubTab === 'medications'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Médicaments
                  </button>
                </nav>
              </div>

              {/* Contenu des sous-onglets de santé */}
              {activeSubTab === 'overview' && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Vue d'ensemble de la santé</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold mb-2">État général</h3>
                      <p className="text-sm text-gray-600">Excellent</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Dernier examen</h3>
                      <p className="text-sm text-gray-600">{healthData.lastCheckup}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'history' && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Historique médical</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold">Vaccination</h3>
                      <p className="text-sm text-gray-600">Date: {healthData.nextVaccination}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold">Check-up</h3>
                      <p className="text-sm text-gray-600">Date: {healthData.lastCheckup}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'medications' && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Médicaments</h2>
                  <div className="space-y-4">
                    {healthReminders
                      .filter(reminder => reminder.type === 'Médicament')
                      .map(reminder => (
                        <div key={reminder.id} className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-semibold">{reminder.description}</h3>
                          <p className="text-sm text-gray-600">Heure: {reminder.time}</p>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            reminder.status === 'completed'
                              ? 'bg-green-200 text-green-800'
                              : 'bg-yellow-200 text-yellow-800'
                          }`}>
                            {reminder.status === 'completed' ? 'Terminé' : 'En attente'}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeMainTab === 'petmeet' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">PetMeet</h2>
              <div className="space-y-4">
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h3 className="font-semibold">Chiens à proximité</h3>
                  <p className="text-sm text-gray-600">
                    {nearestDog ? '1 chien trouvé' : 'Aucun chien à proximité'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeMainTab === 'location' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Localisation</h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold">Position actuelle</h3>
                  <p className="text-sm text-gray-600">
                    {position
                      ? `Latitude: ${position.latitude}, Longitude: ${position.longitude}`
                      : 'Position non disponible'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeMainTab === 'chat' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Chat</h2>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold">Messages récents</h3>
                  <p className="text-sm text-gray-600">Aucun message non lu</p>
                </div>
              </div>
            </div>
          )}

          {activeMainTab === 'translator' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Traducteur</h2>
              <div className="space-y-4">
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h3 className="font-semibold">Traduction en temps réel</h3>
                  <p className="text-sm text-gray-600">En attente d'activation du microphone</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Barre latérale */}
        <div className="space-y-6">
          {/* Rappels */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Rappels</h2>
            <div className="space-y-4">
              {healthReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold">{reminder.type}</div>
                    <div className="text-sm text-gray-600">{reminder.description}</div>
                    <div className="text-xs text-gray-500">{reminder.time}</div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full ${
                      reminder.status === 'completed'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {reminder.status === 'completed' ? 'Terminé' : 'En attente'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Nutrition</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600">Calories quotidiennes</div>
                <div className="text-lg font-semibold">
                  {nutritionData.dailyCalories} / {nutritionData.recommendedCalories} kcal
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600">Consommation d'eau</div>
                <div className="text-lg font-semibold">
                  {nutritionData.waterIntake} / {nutritionData.recommendedWater} ml
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