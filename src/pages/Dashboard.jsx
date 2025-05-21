import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeartbeat, FaRobot, FaAppleAlt, FaBell, FaExclamationTriangle, FaCheckCircle, FaWeight, FaUtensils, FaVial, FaChartLine, FaPaw, FaMapMarkerAlt, FaComments, FaUserFriends, FaHeart, FaCalendarAlt, FaStar, FaLanguage, FaMicrophone, FaFont, FaHistory, FaEdit, FaTrash, FaSearch, FaPrint, FaDownload, FaShare } from 'react-icons/fa';
import { MdHealthAndSafety, MdLocalHospital, MdVaccines } from 'react-icons/md';

const Dashboard = () => {
  console.log('Dashboard component rendering');
  
  const [activeMainTab, setActiveMainTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [dogMood, setDogMood] = useState('joueur');
  const [position, setPosition] = useState(null);
  const [nearestDog, setNearestDog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Dashboard mounted');
    console.log('Current route:', window.location.pathname);
    console.log('Token:', localStorage.getItem('token'));
  }, []);

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
    <div className="space-y-6" data-testid="dashboard-container">
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
              {/* En-tête de l'onglet Santé */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Santé de Rex</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-nature-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Dernier check-up</p>
                        <p className="text-lg font-semibold text-gray-900">15 Mars 2024</p>
                      </div>
                      <MdHealthAndSafety className="w-8 h-8 text-nature-600" />
                    </div>
                  </div>
                  <div className="bg-nature-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Prochain vaccin</p>
                        <p className="text-lg font-semibold text-gray-900">15 Avril 2024</p>
                      </div>
                      <MdHealthAndSafety className="w-8 h-8 text-nature-600" />
                    </div>
                  </div>
                  <div className="bg-nature-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">État général</p>
                        <p className="text-lg font-semibold text-gray-900">Excellent</p>
                      </div>
                      <MdHealthAndSafety className="w-8 h-8 text-nature-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rendez-vous médicaux */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Rendez-vous médicaux</h3>
                  <button className="bg-nature-600 text-white px-4 py-2 rounded-lg hover:bg-nature-700 transition-colors">
                    Nouveau RDV
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Vaccination annuelle</p>
                        <p className="text-sm text-gray-600">Dr. Martin - Clinique Vétérinaire</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">15 Avril 2024</p>
                        <p className="text-sm text-gray-600">14:30</p>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Contrôle dentaire</p>
                        <p className="text-sm text-gray-600">Dr. Dubois - Cabinet Dentaire</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">20 Avril 2024</p>
                        <p className="text-sm text-gray-600">10:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Téléconsultation */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Téléconsultation</h3>
                  <button className="bg-nature-600 text-white px-4 py-2 rounded-lg hover:bg-nature-700 transition-colors">
                    Demander une consultation
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center">
                        <MdHealthAndSafety className="w-6 h-6 text-nature-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Dr. Martin</p>
                        <p className="text-sm text-gray-600">Disponible maintenant</p>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center">
                        <MdHealthAndSafety className="w-6 h-6 text-nature-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Dr. Dubois</p>
                        <p className="text-sm text-gray-600">Disponible dans 30 min</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dossier médical */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Dossier médical</h3>
                  <button className="bg-nature-600 text-white px-4 py-2 rounded-lg hover:bg-nature-700 transition-colors">
                    Télécharger le dossier
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Vaccinations</p>
                        <p className="text-sm text-gray-600">Dernière mise à jour: 15 Mars 2024</p>
                      </div>
                      <button className="text-nature-600 hover:text-nature-700">
                        <MdDownload className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Analyses sanguines</p>
                        <p className="text-sm text-gray-600">Dernière mise à jour: 1 Mars 2024</p>
                      </div>
                      <button className="text-nature-600 hover:text-nature-700">
                        <MdDownload className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Radiographies</p>
                        <p className="text-sm text-gray-600">Dernière mise à jour: 20 Février 2024</p>
                      </div>
                      <button className="text-nature-600 hover:text-nature-700">
                        <MdDownload className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Données de santé existantes */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Données de santé</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Vitalité</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Niveau d'énergie</span>
                          <span className="text-sm font-medium text-gray-900">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-nature-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Qualité du sommeil</span>
                          <span className="text-sm font-medium text-gray-900">90%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-nature-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Activité physique</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Exercice quotidien</span>
                          <span className="text-sm font-medium text-gray-900">75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-nature-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Jeux et activités</span>
                          <span className="text-sm font-medium text-gray-900">80%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-nature-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prédictions IA existantes */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Prédictions IA</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-nature-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Santé</h4>
                    <p className="text-gray-600">État de santé optimal, continuez les bonnes habitudes !</p>
                  </div>
                  <div className="bg-nature-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Comportement</h4>
                    <p className="text-gray-600">Niveau d'activité normal, pas de signes d'anxiété détectés.</p>
                  </div>
                </div>
              </div>
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