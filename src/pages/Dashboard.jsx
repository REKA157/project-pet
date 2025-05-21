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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation principale */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Project PET</h1>
            <div className="flex space-x-4">
              {mainTabs.map((tab) => {
                const Icon = tab.icon;
                const colors = colorConfig[tab.id];
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveMainTab(tab.id)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                      activeMainTab === tab.id
                        ? `${colors.primary} text-white`
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeMainTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Contenu de la vue d'ensemble */}
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

              {/* Nouvelle section : Évolution de la santé */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Évolution de la santé</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-nature-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Poids</h4>
                    <div className="h-32">
                      <svg className="w-full h-full" viewBox="0 0 100 50">
                        <path
                          d="M0,50 L20,40 L40,45 L60,35 L80,30 L100,25"
                          fill="none"
                          stroke="#4F46E5"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>Jan</span>
                      <span>Fév</span>
                      <span>Mar</span>
                      <span>Avr</span>
                      <span>Mai</span>
                      <span>Juin</span>
                    </div>
                  </div>
                  <div className="bg-nature-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Activité</h4>
                    <div className="h-32">
                      <svg className="w-full h-full" viewBox="0 0 100 50">
                        <path
                          d="M0,30 L20,35 L40,25 L60,20 L80,15 L100,10"
                          fill="none"
                          stroke="#4F46E5"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>Jan</span>
                      <span>Fév</span>
                      <span>Mar</span>
                      <span>Avr</span>
                      <span>Mai</span>
                      <span>Juin</span>
                    </div>
                  </div>
                  <div className="bg-nature-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Qualité du sommeil</h4>
                    <div className="h-32">
                      <svg className="w-full h-full" viewBox="0 0 100 50">
                        <path
                          d="M0,20 L20,25 L40,15 L60,10 L80,5 L100,0"
                          fill="none"
                          stroke="#4F46E5"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>Jan</span>
                      <span>Fév</span>
                      <span>Mar</span>
                      <span>Avr</span>
                      <span>Mai</span>
                      <span>Juin</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nouvelle section : Historique des consultations */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Historique des consultations</h3>
                <div className="space-y-4">
                  <div className="bg-nature-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">Consultation de routine</h4>
                        <p className="text-sm text-gray-600">Dr. Martin - 15 Février 2024</p>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-600">• Vaccination à jour</p>
                          <p className="text-sm text-gray-600">• Poids stable</p>
                          <p className="text-sm text-gray-600">• Recommandation : Augmenter l'activité physique</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Terminé</span>
                    </div>
                  </div>
                  <div className="bg-nature-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">Contrôle dentaire</h4>
                        <p className="text-sm text-gray-600">Dr. Dubois - 10 Janvier 2024</p>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-600">• Nettoyage dentaire effectué</p>
                          <p className="text-sm text-gray-600">• Pas de carie détectée</p>
                          <p className="text-sm text-gray-600">• Recommandation : Brossage quotidien</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Terminé</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nouvelle section : Recommandations basées sur l'historique */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recommandations personnalisées</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-nature-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <FaChartLine className="w-6 h-6 text-nature-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900">Activité physique</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Basé sur votre historique, nous recommandons d'augmenter l'activité physique de 15 minutes par jour.
                        </p>
                        <div className="mt-2 flex items-center space-x-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Priorité haute</span>
                          <span className="text-sm text-gray-600">Progression : +25%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-nature-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <FaAppleAlt className="w-6 h-6 text-nature-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900">Nutrition</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Ajustement recommandé des portions de nourriture pour maintenir un poids optimal.
                        </p>
                        <div className="mt-2 flex items-center space-x-2">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Priorité moyenne</span>
                          <span className="text-sm text-gray-600">Impact : Modéré</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nouvelle section : Notes personnelles */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Notes personnelles</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Toutes</button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Important</button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Positif</button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">À surveiller</button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-nature-600 text-white rounded-lg text-sm"
                    >
                      Ajouter une note
                    </motion.button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-nature-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">Comportement alimentaire</h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Important</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Diminution de l'appétit observée depuis 2 jours</p>
                        <p className="text-xs text-gray-500 mt-2">Ajouté le 15 Mars 2024</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-nature-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">Activité physique</h4>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Positif</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Bonne réaction aux nouveaux exercices</p>
                        <p className="text-xs text-gray-500 mt-2">Ajouté le 14 Mars 2024</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nouvelle section : Alertes de tendances */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Alertes de tendances</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="flex items-start space-x-3">
                        <FaExclamationTriangle className="w-6 h-6 text-red-500 mt-1" />
                        <div>
                          <h4 className="font-medium text-gray-900">Diminution de l'activité</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            L'activité physique a diminué de 25% cette semaine par rapport à la moyenne mensuelle.
                          </p>
                          <div className="mt-2 flex items-center space-x-2">
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Urgent</span>
                            <span className="text-sm text-gray-600">Détecté il y a 2 jours</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-start space-x-3">
                        <FaBell className="w-6 h-6 text-yellow-500 mt-1" />
                        <div>
                          <h4 className="font-medium text-gray-900">Variation du poids</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Fluctuation de poids de 0.5kg détectée sur les 7 derniers jours.
                          </p>
                          <div className="mt-2 flex items-center space-x-2">
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">À surveiller</span>
                            <span className="text-sm text-gray-600">Détecté aujourd'hui</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-nature-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Évolution sur 30 jours</h4>
                    <div className="h-64">
                      <svg className="w-full h-full" viewBox="0 0 100 50">
                        {/* Graphique d'activité */}
                        <path
                          d="M0,40 L10,35 L20,38 L30,32 L40,30 L50,25 L60,20 L70,15 L80,10 L90,5 L100,0"
                          fill="none"
                          stroke="#EF4444"
                          strokeWidth="2"
                        />
                        {/* Ligne de moyenne */}
                        <path
                          d="M0,25 L100,25"
                          fill="none"
                          stroke="#9CA3AF"
                          strokeWidth="1"
                          strokeDasharray="4"
                        />
                      </svg>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>J-30</span>
                      <span>J-20</span>
                      <span>J-10</span>
                      <span>Aujourd'hui</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nouvelle section : Suivi des médicaments */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Suivi des médicaments</h3>
                  <div className="flex items-center space-x-4">
                    <select className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm">
                      <option>Tous les médicaments</option>
                      <option>Antiparasitaire</option>
                      <option>Complément vitaminique</option>
                    </select>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-nature-600 text-white rounded-lg text-sm"
                    >
                      Ajouter un médicament
                    </motion.button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    {/* Liste des médicaments existante */}
                    <div className="bg-nature-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">Antiparasitaire</h4>
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Prochaine prise</span>
                              <span className="text-sm font-medium text-nature-600">Dans 3 jours</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Dernière prise</span>
                              <span className="text-sm text-gray-600">15 Mars 2024</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Fréquence</span>
                              <span className="text-sm text-gray-600">Mensuelle</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <FaBell className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-nature-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">Complément vitaminique</h4>
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Prochaine prise</span>
                              <span className="text-sm font-medium text-nature-600">Aujourd'hui</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Dernière prise</span>
                              <span className="text-sm text-gray-600">Hier</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Fréquence</span>
                              <span className="text-sm text-gray-600">Quotidienne</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <FaBell className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {/* Statistiques de conformité */}
                    <div className="bg-nature-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Statistiques de conformité</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Conformité globale</span>
                            <span className="text-sm font-medium text-nature-600">92%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-nature-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Pris à l'heure</span>
                            <span className="text-sm font-medium text-nature-600">85%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-nature-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Retards</span>
                            <span className="text-sm font-medium text-nature-600">8%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '8%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section réorganisée des effets secondaires */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Suivi des effets secondaires</h3>
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Rechercher..."
                              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-nature-500 focus:border-transparent"
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                          </div>
                          <select className="px-3 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm">
                            <option>Tous les médicaments</option>
                            <option>Antiparasitaire</option>
                            <option>Complément vitaminique</option>
                          </select>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-nature-600 text-white rounded-lg text-sm"
                          >
                            Signaler un effet secondaire
                          </motion.button>
                        </div>
                      </div>

                      {/* Filtres avancés */}
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium text-gray-900">Filtres avancés</h4>
                          <button className="text-sm text-nature-600 hover:text-nature-700">
                            Réinitialiser les filtres
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Période</label>
                            <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm">
                              <option>Tous les temps</option>
                              <option>7 derniers jours</option>
                              <option>30 derniers jours</option>
                              <option>3 derniers mois</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Type d'effet</label>
                            <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm">
                              <option>Tous les types</option>
                              <option>Comportemental</option>
                              <option>Physique</option>
                              <option>Alimentaire</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Sévérité</label>
                            <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm">
                              <option>Toutes les sévérités</option>
                              <option>Léger</option>
                              <option>Modéré</option>
                              <option>Sévère</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Tri par</label>
                            <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm">
                              <option>Date (récent → ancien)</option>
                              <option>Date (ancien → récent)</option>
                              <option>Sévérité (croissant)</option>
                              <option>Sévérité (décroissant)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Navigation par onglets */}
                      <div className="border-b border-gray-200 mb-6">
                        <nav className="flex space-x-8">
                          {['Vue d\'ensemble', 'Historique', 'Statistiques', 'Alertes'].map((tab) => (
                            <button
                              key={tab}
                              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                                tab === 'Vue d\'ensemble'
                                  ? 'border-nature-500 text-nature-600'
                                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                              }`}
                            >
                              {tab}
                            </button>
                          ))}
                        </nav>
                      </div>

                      {/* Contenu principal */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Colonne de gauche : Liste des effets secondaires */}
                        <div className="lg:col-span-2 space-y-6">
                          {/* Filtres rapides */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <button className="px-3 py-1 bg-nature-100 text-nature-800 rounded-full text-sm">Tous</button>
                            <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Légers</button>
                            <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Modérés</button>
                            <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Sévères</button>
                            <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Comportemental</button>
                            <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Physique</button>
                            <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Alimentaire</button>
                          </div>

                          {/* Liste des effets secondaires */}
                          <div className="space-y-4">
                            <div className="bg-nature-50 p-4 rounded-lg">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <h4 className="font-medium text-gray-900">Somnolence</h4>
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Modéré</span>
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1">Antiparasitaire - 15 Mars 2024</p>
                                  <div className="mt-2 p-3 bg-white rounded-lg">
                                    <p className="text-sm text-gray-600">
                                      "L'animal a montré des signes de somnolence accrue dans les 2 heures suivant la prise. 
                                      Durée : environ 3 heures. Comportement normal le reste de la journée."
                                    </p>
                                    <div className="mt-2 flex items-center space-x-4">
                                      <span className="text-xs text-gray-500">Durée : 3h</span>
                                      <span className="text-xs text-gray-500">Intensité : 6/10</span>
                                      <span className="text-xs text-gray-500">Médicament : Antiparasitaire</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex space-x-2 ml-4">
                                  <button className="text-gray-400 hover:text-gray-600">
                                    <FaEdit className="w-4 h-4" />
                                  </button>
                                  <button className="text-gray-400 hover:text-gray-600">
                                    <FaTrash className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="bg-nature-50 p-4 rounded-lg">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <h4 className="font-medium text-gray-900">Augmentation de l'appétit</h4>
                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Léger</span>
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1">Complément vitaminique - 14 Mars 2024</p>
                                  <div className="mt-2 p-3 bg-white rounded-lg">
                                    <p className="text-sm text-gray-600">
                                      "Augmentation modérée de l'appétit observée. L'animal a terminé sa gamelle plus rapidement que d'habitude."
                                    </p>
                                    <div className="mt-2 flex items-center space-x-4">
                                      <span className="text-xs text-gray-500">Durée : 1j</span>
                                      <span className="text-xs text-gray-500">Intensité : 3/10</span>
                                      <span className="text-xs text-gray-500">Médicament : Complément vitaminique</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex space-x-2 ml-4">
                                  <button className="text-gray-400 hover:text-gray-600">
                                    <FaEdit className="w-4 h-4" />
                                  </button>
                                  <button className="text-gray-400 hover:text-gray-600">
                                    <FaTrash className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Pagination */}
                          <div className="flex justify-between items-center mt-6">
                            <div className="text-sm text-gray-600">
                              Affichage de 1 à 10 sur 25 résultats
                            </div>
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                                Précédent
                              </button>
                              <button className="px-3 py-1 bg-nature-600 text-white rounded-lg text-sm">1</button>
                              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">2</button>
                              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">3</button>
                              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                                Suivant
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Colonne de droite : Statistiques et alertes */}
                        <div className="space-y-6">
                          {/* Graphique d'évolution */}
                          <div className="bg-nature-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Évolution sur 30 jours</h4>
                            <div className="h-48">
                              <svg className="w-full h-full" viewBox="0 0 100 50">
                                <path
                                  d="M0,40 L20,35 L40,30 L60,25 L80,20 L100,15"
                                  fill="none"
                                  stroke="#F59E0B"
                                  strokeWidth="2"
                                />
                                <path
                                  d="M0,30 L20,25 L40,20 L60,15 L80,10 L100,5"
                                  fill="none"
                                  stroke="#10B981"
                                  strokeWidth="2"
                                />
                              </svg>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 mt-2">
                              <span>J-30</span>
                              <span>J-20</span>
                              <span>J-10</span>
                              <span>Aujourd'hui</span>
                            </div>
                          </div>

                          {/* Alertes actives */}
                          <div className="bg-nature-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Alertes actives</h4>
                            <div className="space-y-3">
                              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                                <div className="flex items-start space-x-3">
                                  <FaExclamationTriangle className="w-5 h-5 text-red-500 mt-1" />
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">Somnolence persistante</p>
                                    <p className="text-xs text-gray-600 mt-1">
                                      Consulter le vétérinaire si l'effet persiste
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                <div className="flex items-start space-x-3">
                                  <FaBell className="w-5 h-5 text-yellow-500 mt-1" />
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">Surveillance de l'appétit</p>
                                    <p className="text-xs text-gray-600 mt-1">
                                      Continuer à noter les changements
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Statistiques */}
                          <div className="bg-nature-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Statistiques</h4>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm text-gray-600">Effets légers</span>
                                  <span className="text-sm font-medium text-nature-600">65%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm text-gray-600">Effets modérés</span>
                                  <span className="text-sm font-medium text-nature-600">30%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm text-gray-600">Effets sévères</span>
                                  <span className="text-sm font-medium text-nature-600">5%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Boutons d'action rapide */}
                          <div className="bg-nature-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Actions rapides</h4>
                            <div className="space-y-3">
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-4 py-2 bg-white border border-nature-200 text-nature-600 rounded-lg text-sm flex items-center justify-center space-x-2"
                              >
                                <FaPrint className="w-4 h-4" />
                                <span>Imprimer le rapport</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-4 py-2 bg-white border border-nature-200 text-nature-600 rounded-lg text-sm flex items-center justify-center space-x-2"
                              >
                                <FaDownload className="w-4 h-4" />
                                <span>Exporter en PDF</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-4 py-2 bg-white border border-nature-200 text-nature-600 rounded-lg text-sm flex items-center justify-center space-x-2"
                              >
                                <FaShare className="w-4 h-4" />
                                <span>Partager avec le vétérinaire</span>
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nouvelle section : Alertes personnalisées */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Alertes personnalisées</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-nature-600 text-white rounded-lg text-sm"
                  >
                    Configurer les alertes
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-nature-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <FaBell className="w-6 h-6 text-nature-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900">Rappels de médicaments</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Notifications 30 minutes avant chaque prise
                        </p>
                        <div className="mt-2">
                          <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox text-nature-600" checked />
                            <span className="ml-2 text-sm text-gray-600">Activer</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-nature-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <FaExclamationTriangle className="w-6 h-6 text-nature-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900">Alertes de santé</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Notifications pour les changements significatifs
                        </p>
                        <div className="mt-2">
                          <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox text-nature-600" checked />
                            <span className="ml-2 text-sm text-gray-600">Activer</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-nature-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <FaChartLine className="w-6 h-6 text-nature-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900">Rapports hebdomadaires</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Résumé hebdomadaire de la santé
                        </p>
                        <div className="mt-2">
                          <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox text-nature-600" checked />
                            <span className="ml-2 text-sm text-gray-600">Activer</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeMainTab === 'petmeet' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Sous-navigation PetMeet */}
              <div className="flex space-x-4 mb-8">
                {[
                  { id: 'overview', label: 'Vue d\'ensemble', icon: FaUserFriends },
                  { id: 'matches', label: 'Matches', icon: FaHeart },
                  { id: 'meetings', label: 'Rendez-vous', icon: FaCalendarAlt },
                  { id: 'chat', label: 'Chat', icon: FaComments },
                  { id: 'favorites', label: 'Favoris', icon: FaStar }
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`px-6 py-3 rounded-xl flex items-center ${
                      activeSubTab === tab.id
                        ? `${colorConfig.petmeet.primary} text-white`
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </motion.button>
                ))}
              </div>

              {/* Contenu des sous-onglets PetMeet */}
              <div className={`bg-white rounded-2xl shadow-lg p-6 ${colorConfig.petmeet.border} border-2`}>
                {activeSubTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-pink-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Statistiques des rencontres</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Matches totaux</span>
                            <span className="text-pink-600 font-bold">24</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Rendez-vous planifiés</span>
                            <span className="text-pink-600 font-bold">3</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Messages non lus</span>
                            <span className="text-pink-600 font-bold">5</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-pink-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Activité récente</h3>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <FaHeart className="w-5 h-5 text-pink-600" />
                            <span className="text-gray-600">Nouveau match avec Rex</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FaCalendarAlt className="w-5 h-5 text-pink-600" />
                            <span className="text-gray-600">Rendez-vous demain avec Luna</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FaComments className="w-5 h-5 text-pink-600" />
                            <span className="text-gray-600">Nouveau message de Max</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSubTab === 'matches' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Liste des matches */}
                      <div className="md:col-span-2 space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Vos matches</h3>
                        {/* Contenu des matches */}
                      </div>
                      <div className="bg-pink-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Suggestions</h3>
                        {/* Suggestions de matches */}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSubTab === 'meetings' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-pink-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Rendez-vous à venir</h3>
                        {/* Liste des rendez-vous */}
                      </div>
                      <div className="bg-pink-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Historique</h3>
                        {/* Historique des rendez-vous */}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSubTab === 'chat' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1 bg-pink-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Conversations</h3>
                        {/* Liste des conversations */}
                      </div>
                      <div className="md:col-span-2 bg-white p-6 rounded-xl border border-pink-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Messages</h3>
                        {/* Zone de chat */}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSubTab === 'favorites' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Vos favoris</h3>
                        {/* Liste des favoris */}
                      </div>
                      <div className="bg-pink-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Statistiques</h3>
                        {/* Statistiques des favoris */}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {activeMainTab === 'location' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Sous-navigation Localisation */}
              <div className="flex space-x-4 mb-8">
                {['overview', 'map', 'history', 'favorites'].map((tab) => (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSubTab(tab)}
                    className={`px-6 py-3 rounded-xl flex items-center ${
                      activeSubTab === tab
                        ? `${colorConfig.location.primary} text-white`
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.button>
                ))}
              </div>

              {/* Contenu des sous-onglets Localisation */}
              <div className={`bg-white rounded-2xl shadow-lg p-6 ${colorConfig.location.border} border-2`}>
                {/* Contenu spécifique à la Localisation */}
              </div>
            </motion.div>
          )}

          {activeMainTab === 'translator' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Sous-navigation Traducteur */}
              <div className="flex space-x-4 mb-8">
                {[
                  { id: 'overview', label: 'Vue d\'ensemble', icon: FaLanguage },
                  { id: 'audio', label: 'Audio', icon: FaMicrophone },
                  { id: 'text', label: 'Texte', icon: FaFont },
                  { id: 'history', label: 'Historique', icon: FaHistory }
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`px-6 py-3 rounded-xl flex items-center ${
                      activeSubTab === tab.id
                        ? `${colorConfig.translator.primary} text-white`
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </motion.button>
                ))}
              </div>

              {/* Contenu des sous-onglets Traducteur */}
              <div className={`bg-white rounded-2xl shadow-lg p-6 ${colorConfig.translator.border} border-2`}>
                {activeSubTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-indigo-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Statistiques de traduction</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Traductions audio</span>
                            <span className="text-indigo-600 font-bold">42</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Traductions texte</span>
                            <span className="text-indigo-600 font-bold">156</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Précision moyenne</span>
                            <span className="text-indigo-600 font-bold">92%</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-indigo-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Catégories populaires</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <FaHeart className="w-4 h-4 text-red-500" />
                              <span className="text-gray-600">Émotions</span>
                            </div>
                            <span className="text-indigo-600 font-bold">35%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <FaUtensils className="w-4 h-4 text-orange-500" />
                              <span className="text-gray-600">Nourriture</span>
                            </div>
                            <span className="text-indigo-600 font-bold">28%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <FaPaw className="w-4 h-4 text-blue-500" />
                              <span className="text-gray-600">Activité</span>
                            </div>
                            <span className="text-indigo-600 font-bold">22%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-indigo-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Traductions favorites</h3>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-gray-800">"Je veux jouer"</p>
                                <p className="text-sm text-gray-500">Utilisé 15 fois</p>
                              </div>
                              <FaStar className="w-5 h-5 text-yellow-400" />
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-gray-800">"J'ai faim"</p>
                                <p className="text-sm text-gray-500">Utilisé 12 fois</p>
                              </div>
                              <FaStar className="w-5 h-5 text-yellow-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-indigo-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Tendances</h3>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-gray-800">Matin</p>
                                <p className="text-sm text-gray-500">Demandes de nourriture</p>
                              </div>
                              <span className="text-indigo-600">↑ 25%</span>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-gray-800">Soir</p>
                                <p className="text-sm text-gray-500">Demandes de jeu</p>
                              </div>
                              <span className="text-indigo-600">↑ 18%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-indigo-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Précision par catégorie</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Aboiements</span>
                            <div className="flex items-center">
                              <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                                <div className="w-20 h-2 bg-green-500 rounded-full"></div>
                              </div>
                              <span className="text-indigo-600">95%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Miaulements</span>
                            <div className="flex items-center">
                              <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                                <div className="w-16 h-2 bg-green-500 rounded-full"></div>
                              </div>
                              <span className="text-indigo-600">85%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Comportements</span>
                            <div className="flex items-center">
                              <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                                <div className="w-14 h-2 bg-green-500 rounded-full"></div>
                              </div>
                              <span className="text-indigo-600">78%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSubTab === 'audio' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2 bg-indigo-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Enregistrement audio</h3>
                        <div className="space-y-4">
                          <div className="flex justify-center">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center"
                            >
                              <FaMicrophone className="w-8 h-8" />
                            </motion.button>
                          </div>
                          <div className="text-center text-gray-600">
                            Cliquez pour enregistrer
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Catégorisation automatique</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Émotion</span>
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Demande</span>
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Alimentation</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-indigo-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Traduction en direct</h3>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-gray-800">"Je veux jouer avec toi !"</p>
                              <FaStar className="w-5 h-5 text-gray-300 hover:text-yellow-400 cursor-pointer" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Émotion</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Demande</span>
                              </div>
                              <p className="text-sm text-gray-500">Confiance : 95%</p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-gray-800">"J'ai faim"</p>
                              <FaStar className="w-5 h-5 text-yellow-400 cursor-pointer" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Alimentation</span>
                              </div>
                              <p className="text-sm text-gray-500">Confiance : 88%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSubTab === 'text' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-indigo-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Saisie de texte</h3>
                        <div className="space-y-4">
                          <textarea
                            className="w-full h-32 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Décrivez le comportement ou le son de votre animal..."
                          />
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg"
                          >
                            Traduire
                          </motion.button>
                        </div>
                      </div>
                      <div className="bg-indigo-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Résultat de la traduction</h3>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-gray-800">"Je suis content de te voir !"</p>
                            <p className="text-sm text-gray-500 mt-2">Confiance : 92%</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-gray-800">"J'ai besoin d'attention"</p>
                            <p className="text-sm text-gray-500 mt-2">Confiance : 85%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSubTab === 'history' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 bg-indigo-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Historique des traductions</h3>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-gray-800">"Je veux sortir"</p>
                                <p className="text-sm text-gray-500">Type : Audio</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Aujourd'hui, 14:30</p>
                                <p className="text-sm text-indigo-600">Confiance : 94%</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-gray-800">"J'ai besoin d'eau"</p>
                                <p className="text-sm text-gray-500">Type : Texte</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Aujourd'hui, 13:15</p>
                                <p className="text-sm text-indigo-600">Confiance : 89%</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard; 