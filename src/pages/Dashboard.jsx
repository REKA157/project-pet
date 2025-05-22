import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeartbeat, FaRobot, FaAppleAlt, FaBell, FaExclamationTriangle, FaCheckCircle, FaWeight, FaUtensils, FaVial, FaChartLine, FaPaw, FaMapMarkerAlt, FaComments, FaUserFriends, FaHeart, FaCalendarAlt, FaStar, FaLanguage, FaMicrophone, FaFont, FaHistory, FaEdit, FaTrash, FaSearch, FaPrint, FaDownload, FaShare, FaTimes, FaCamera, FaVideo, FaBrain } from 'react-icons/fa';
import { MdHealthAndSafety, MdLocalHospital, MdVaccines, MdDownload } from 'react-icons/md';

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
          console.warn('Géolocalisation non disponible:', error.message);
          setPosition(null);
        },
        { timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      console.warn('La géolocalisation n\'est pas supportée par votre navigateur');
      setPosition(null);
    }
  }, []);

  // Récupération du chien le plus proche
  useEffect(() => {
    const fetchNearestDog = async () => {
      try {
        // En mode démo, on simule un chien proche
        if (localStorage.getItem('token') === 'demo-token') {
          setNearestDog({
            name: 'Max',
            breed: 'Labrador',
            distance: '500m'
          });
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:8000/api/dogs/nearby');
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setNearestDog(data.data[0]);
        }
      } catch (error) {
        console.warn('Mode démo : simulation des données de chien proche');
        setNearestDog({
          name: 'Max',
          breed: 'Labrador',
          distance: '500m'
        });
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
    { id: 'translator', label: 'PetSense', icon: FaBrain }
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
        {/* Version mobile */}
        <div className="lg:hidden">
          <select
            value={activeMainTab}
            onChange={(e) => setActiveMainTab(e.target.value)}
            className="w-full p-3 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {mainTabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>

        {/* Version desktop */}
        <nav className="hidden lg:flex space-x-4 p-4">
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
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h2 className="text-xl font-semibold mb-4">Données de santé</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600">Dernier check-up</div>
                    <div className="text-base sm:text-lg font-semibold">{healthData.lastCheckup}</div>
                  </div>
                  <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600">Prochain vaccin</div>
                    <div className="text-base sm:text-lg font-semibold">{healthData.nextVaccination}</div>
                  </div>
                  <div className="p-3 sm:p-4 bg-yellow-50 rounded-lg">
                    <div className="text-sm text-gray-600">Poids</div>
                    <div className="text-base sm:text-lg font-semibold">{healthData.weight} kg</div>
                  </div>
                  <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                    <div className="text-sm text-gray-600">Niveau d'activité</div>
                    <div className="text-base sm:text-lg font-semibold">{healthData.activityLevel}</div>
                  </div>
                </div>
              </div>

              {/* Prédictions IA */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Prédictions IA</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Mise à jour il y a 5 min
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* État de santé général */}
                  <div className="bg-nature-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-gray-900">État de santé</h4>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <FaHeartbeat className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Vitalité générale</span>
                          <span className="text-sm font-medium text-gray-900">92%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Niveau d'énergie</span>
                          <span className="text-sm font-medium text-gray-900">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comportement et bien-être */}
                  <div className="bg-nature-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-gray-900">Bien-être</h4>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaBrain className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Niveau de stress</span>
                          <span className="text-sm font-medium text-gray-900">15%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Qualité du sommeil</span>
                          <span className="text-sm font-medium text-gray-900">88%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alertes et recommandations */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Alertes et recommandations</h4>
                  
                  {/* Alerte principale */}
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <FaExclamationTriangle className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-yellow-800">Attention : Activité physique insuffisante</h5>
                        <p className="text-sm text-yellow-700 mt-1">
                          Votre chien n'a pas atteint son objectif d'activité quotidienne. Recommandation : 30 minutes de jeu supplémentaire aujourd'hui.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Recommandations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <FaAppleAlt className="w-5 h-5 text-green-600" />
                        </div>
                        <h5 className="font-medium text-gray-900">Nutrition</h5>
                      </div>
                      <p className="text-sm text-gray-600">
                        Augmenter légèrement la portion de nourriture de 10% pour compenser l'activité physique.
                      </p>
                    </div>

                    <div className="bg-white border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FaChartLine className="w-5 h-5 text-blue-600" />
                        </div>
                        <h5 className="font-medium text-gray-900">Activité</h5>
                      </div>
                      <p className="text-sm text-gray-600">
                        Planifier une séance de jeu plus longue ce soir pour atteindre l'objectif quotidien.
                      </p>
                    </div>
                  </div>

                  {/* Tendances */}
                  <div className="bg-white border rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-3">Tendances sur 7 jours</h5>
                    <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-sm text-gray-500">Graphique des tendances à venir</p>
                    </div>
                  </div>
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
                      <MdVaccines className="w-8 h-8 text-nature-600" />
                    </div>
                  </div>
                  <div className="bg-nature-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">État général</p>
                        <p className="text-lg font-semibold text-gray-900">Excellent</p>
                      </div>
                      <MdLocalHospital className="w-8 h-8 text-nature-600" />
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
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
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
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
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
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
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
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
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

                {/* Section téléchargement de médias */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Médias médicaux</h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <FaCamera className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="text-gray-600 mb-2">Glissez-déposez vos photos ou vidéos ici</p>
                      <p className="text-sm text-gray-500 mb-4">ou</p>
                      <label className="bg-nature-600 text-white px-4 py-2 rounded-lg hover:bg-nature-700 transition-colors cursor-pointer">
                        Parcourir les fichiers
                        <input type="file" className="hidden" accept="image/*,video/*" multiple />
                      </label>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Formats acceptés : JPG, PNG, MP4, MOV (max 10MB)</p>
                </div>

                {/* Médias récemment téléchargés */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Médias récents</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="relative group">
                      <img 
                        src="https://images.unsplash.com/photo-1543466835-00a7907e9de1" 
                        alt="Photo médicale" 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button className="text-white p-2 hover:text-nature-400">
                          <FaDownload className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="relative group">
                      <img 
                        src="https://images.unsplash.com/photo-1517849845537-4d257902454a" 
                        alt="Photo médicale" 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button className="text-white p-2 hover:text-nature-400">
                          <FaDownload className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="relative group">
                      <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FaVideo className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button className="text-white p-2 hover:text-nature-400">
                          <FaDownload className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Vaccinations</p>
                        <p className="text-sm text-gray-600">Dernière mise à jour: 15 Mars 2024</p>
                      </div>
                      <button className="text-nature-600 hover:text-nature-700">
                        <FaDownload className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Analyses sanguines</p>
                        <p className="text-sm text-gray-600">Dernière mise à jour: 1 Mars 2024</p>
                      </div>
                      <button className="text-nature-600 hover:text-nature-700">
                        <FaDownload className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Radiographies</p>
                        <p className="text-sm text-gray-600">Dernière mise à jour: 20 Février 2024</p>
                      </div>
                      <button className="text-nature-600 hover:text-nature-700">
                        <FaDownload className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Données de santé */}
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

              {/* Prédictions IA */}
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
            <div className="space-y-6">
              {/* En-tête PetMeet */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">PetMeet</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Matchs récents :</span>
                    <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-800">3 nouveaux</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Profils vus aujourd'hui</p>
                        <p className="text-lg font-semibold text-gray-900">12</p>
                      </div>
                      <FaUserFriends className="w-8 h-8 text-pink-600" />
                    </div>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Matchs</p>
                        <p className="text-lg font-semibold text-gray-900">8</p>
                      </div>
                      <FaHeart className="w-8 h-8 text-pink-600" />
                    </div>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Prochains rendez-vous</p>
                        <p className="text-lg font-semibold text-gray-900">2</p>
                      </div>
                      <FaCalendarAlt className="w-8 h-8 text-pink-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Profils à découvrir */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Profils à découvrir</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Carte de profil 1 */}
                  <div className="bg-white border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-64 bg-gray-200">
                      <img 
                        src="https://images.unsplash.com/photo-1543466835-00a7907e9de1" 
                        alt="Luna" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h4 className="text-white text-xl font-bold">Luna</h4>
                        <p className="text-white/90">Golden Retriever, 2 ans</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">Joueur</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Calme</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">Luna adore jouer dans le parc et faire de nouvelles rencontres. Elle est très sociable et s'entend bien avec les autres chiens.</p>
                      <div className="flex justify-between">
                        <button className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                          <FaTimes className="w-6 h-6" />
                        </button>
                        <button className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                          <FaHeart className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Carte de profil 2 */}
                  <div className="bg-white border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-64 bg-gray-200">
                      <img 
                        src="https://images.unsplash.com/photo-1517849845537-4d257902454a" 
                        alt="Max" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h4 className="text-white text-xl font-bold">Max</h4>
                        <p className="text-white/90">Labrador, 3 ans</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">Énergique</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Intelligent</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">Max est un chien très actif qui adore les longues promenades et les jeux de balle. Il est très bien éduqué et sociable.</p>
                      <div className="flex justify-between">
                        <button className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                          <FaTimes className="w-6 h-6" />
                        </button>
                        <button className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                          <FaHeart className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Carte de profil 3 */}
                  <div className="bg-white border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-64 bg-gray-200">
                      <img 
                        src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e" 
                        alt="Bella" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h4 className="text-white text-xl font-bold">Bella</h4>
                        <p className="text-white/90">Border Collie, 1 an</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">Intelligent</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Agile</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">Bella est une chienne très intelligente qui excelle dans les sports canins. Elle adore les défis et les jeux d'agilité.</p>
                      <div className="flex justify-between">
                        <button className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                          <FaTimes className="w-6 h-6" />
                        </button>
                        <button className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                          <FaHeart className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Matchs récents */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Matchs récents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1" 
                          alt="Luna" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Luna</h4>
                        <p className="text-sm text-gray-600">Match il y a 2 heures</p>
                        <button className="mt-2 text-sm text-pink-600 hover:text-pink-700">
                          Envoyer un message
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1517849845537-4d257902454a" 
                          alt="Max" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Max</h4>
                        <p className="text-sm text-gray-600">Match il y a 5 heures</p>
                        <button className="mt-2 text-sm text-pink-600 hover:text-pink-700">
                          Envoyer un message
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e" 
                          alt="Bella" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Bella</h4>
                        <p className="text-sm text-gray-600">Match il y a 1 jour</p>
                        <button className="mt-2 text-sm text-pink-600 hover:text-pink-700">
                          Envoyer un message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prochains rendez-vous */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Prochains rendez-vous</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1" 
                            alt="Luna" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Rendez-vous avec Luna</h4>
                          <p className="text-sm text-gray-600">Parc Central</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Demain</p>
                        <p className="text-sm text-gray-600">15:00</p>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1517849845537-4d257902454a" 
                            alt="Max" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Rendez-vous avec Max</h4>
                          <p className="text-sm text-gray-600">Parc des Chiens</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Samedi</p>
                        <p className="text-sm text-gray-600">10:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMainTab === 'location' && (
            <div className="space-y-6">
              {/* En-tête de localisation */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Localisation</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Chiens à proximité :</span>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800">3 dans un rayon de 1km</span>
                  </div>
                </div>
              </div>

              {/* Carte interactive */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="relative h-[400px] bg-gray-100 rounded-lg overflow-hidden">
                  {/* Carte de base */}
                  <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/2.3522,48.8566,13,0/600x400?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjMnBqMmpwMDAwMDAwMDAwMDAwMDAwMDAwIn0.2fY_9WxX9Z9Z9Z9Z9Z9Z9Z9Z')] bg-cover bg-center">
                    {/* Marqueur de position actuelle */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                          <FaMapMarkerAlt className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-blue-600"></div>
                      </div>
                    </div>

                    {/* Marqueurs des chiens à proximité */}
                    <div className="absolute top-1/3 left-1/3">
                      <div className="relative">
                        <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center shadow-lg">
                          <FaPaw className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-pink-600"></div>
                      </div>
                    </div>

                    <div className="absolute top-2/3 left-2/3">
                      <div className="relative">
                        <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center shadow-lg">
                          <FaPaw className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-pink-600"></div>
                      </div>
                    </div>

                    <div className="absolute top-1/4 left-3/4">
                      <div className="relative">
                        <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center shadow-lg">
                          <FaPaw className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-pink-600"></div>
                      </div>
                    </div>
                  </div>

                  {/* Contrôles de la carte */}
                  <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                    <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50">
                      <span className="text-xl">+</span>
                    </button>
                    <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50">
                      <span className="text-xl">-</span>
                    </button>
                    <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50">
                      <FaMapMarkerAlt className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Légende */}
                <div className="mt-4 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">Votre position</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-pink-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">Chiens à proximité</span>
                  </div>
                </div>
              </div>

              {/* Liste des chiens à proximité */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Chiens à proximité</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1" 
                          alt="Luna" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Luna</h4>
                        <p className="text-sm text-gray-600">Golden Retriever • 250m</p>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1517849845537-4d257902454a" 
                          alt="Max" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Max</h4>
                        <p className="text-sm text-gray-600">Labrador • 450m</p>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e" 
                          alt="Bella" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Bella</h4>
                        <p className="text-sm text-gray-600">Border Collie • 750m</p>
                      </div>
                    </div>
                  </div>
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
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">PetSense - IA d'Analyse Comportementale</h2>
                <p className="text-gray-600 mb-6">
                  Notre intelligence artificielle analyse les sons et comportements de votre animal pour faciliter la communication et la compréhension mutuelle.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-pink-50 rounded-lg p-6">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                      <FaHeart className="text-pink-500 text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Détection des émotions</h3>
                    <p className="text-gray-600">Analyse des signaux émotionnels et des expressions faciales de votre animal</p>
                  </div>
                  
                  <div className="bg-pink-50 rounded-lg p-6">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                      <FaMicrophone className="text-pink-500 text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Analyse des vocalisations</h3>
                    <p className="text-gray-600">Décodage des sons et des variations vocales pour comprendre les besoins</p>
                  </div>
                  
                  <div className="bg-pink-50 rounded-lg p-6">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                      <FaBrain className="text-pink-500 text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Interprétation comportementale</h3>
                    <p className="text-gray-600">Analyse des mouvements et postures pour décoder les intentions</p>
                  </div>
                </div>

                {/* Section d'enregistrement vocal */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Analyse vocale en temps réel</h3>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-200 transition-colors">
                      <FaMicrophone className="w-12 h-12 text-pink-500" />
                    </div>
                    <p className="text-gray-600 text-center">
                      Appuyez et maintenez pour enregistrer les sons de votre animal
                    </p>
                    <div className="w-full max-w-md">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-full bg-pink-500 rounded-full animate-pulse" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Analyse en temps réel</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                          <FaMicrophone className="text-pink-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Niveau sonore</p>
                          <p className="text-sm text-gray-500">Modéré</p>
                        </div>
                      </div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div className="w-1/2 h-full bg-pink-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                          <FaHeart className="text-pink-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">État émotionnel</p>
                          <p className="text-sm text-gray-500">Content</p>
                        </div>
                      </div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div className="w-3/4 h-full bg-pink-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                          <FaBrain className="text-pink-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Niveau d'activité</p>
                          <p className="text-sm text-gray-500">Élevé</p>
                        </div>
                      </div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div className="w-4/5 h-full bg-pink-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors">
                    Démarrer l'analyse
                  </button>
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