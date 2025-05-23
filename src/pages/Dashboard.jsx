import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeartbeat, FaRobot, FaAppleAlt, FaBell, FaExclamationTriangle, FaCheckCircle, FaWeight, FaUtensils, FaVial, FaChartLine, FaPaw, FaMapMarkerAlt, FaComments, FaUserFriends, FaHeart, FaCalendarAlt, FaStar, FaLanguage, FaMicrophone, FaFont, FaHistory, FaEdit, FaTrash, FaSearch, FaPrint, FaDownload, FaShare, FaTimes, FaCamera, FaVideo, FaBrain, FaFilePdf, FaSmile, FaSadTear, FaAngry, FaSurprise, FaSyringe, FaNotesMedical, FaThumbsUp } from 'react-icons/fa';
import { MdHealthAndSafety, MdLocalHospital, MdVaccines, MdDownload, MdPets, MdFavorite, MdFavoriteBorder, MdAccessTime, MdEvent, MdPerson, MdLocationOn, MdTrendingUp, MdPhotoLibrary } from 'react-icons/md';
import ChatModal from '../components/ChatModal';
import MapComponent from '../components/MapComponent';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  console.log('Dashboard component rendering');
  
  const [activeMainTab, setActiveMainTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [dogMood, setDogMood] = useState('joueur');
  const [position, setPosition] = useState(null);
  const [nearestDog, setNearestDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEmotionSelector, setShowEmotionSelector] = useState(false);

  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.log('Dashboard mounted');
    console.log('Current route:', window.location.pathname);
    console.log('Token:', localStorage.getItem('token'));

    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveMainTab(tab);
    }
  }, [location.search]);

  // Données de santé simulées
  const [healthData, setHealthData] = useState({
    weight: [
      { date: '2024-03-01', value: 12.5 },
      { date: '2024-03-08', value: 12.8 },
      { date: '2024-03-15', value: 13.0 }
    ],
    activity: [
      { date: '2024-03-15', value: 85 },
      { date: '2024-03-14', value: 75 },
      { date: '2024-03-13', value: 90 }
    ],
    vaccinations: [
      { name: 'Rage', date: '2024-03-15', nextDue: '2025-03-15' },
      { name: 'CHPL', date: '2024-02-01', nextDue: '2024-08-01' }
    ],
    alerts: [
      { type: 'stress', message: '3 jours consécutifs de stress détecté', severity: 'high' },
      { type: 'weight', message: 'Prise de poids rapide détectée', severity: 'medium' }
    ]
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

  const [petSenseScore, setPetSenseScore] = useState(85);
  const [emotionHistory, setEmotionHistory] = useState([
    { date: '2024-03-15', emotion: 'joy', confidence: 82, healthEvent: 'Vaccination' },
    { date: '2024-03-14', emotion: 'stress', confidence: 75, healthEvent: null },
    { date: '2024-03-13', emotion: 'joy', confidence: 88, healthEvent: null },
    { date: '2024-03-12', emotion: 'sadness', confidence: 65, healthEvent: 'Visite vétérinaire' }
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
    { id: 'overview', label: t('dashboard.tabs.overview'), icon: FaPaw },
    { id: 'health', label: t('dashboard.tabs.health'), icon: FaHeartbeat },
    { id: 'petmeet', label: t('dashboard.tabs.petmeet'), icon: FaUserFriends },
    { id: 'location', label: t('dashboard.tabs.location'), icon: FaMapMarkerAlt },
    { id: 'petsense', label: t('dashboard.tabs.petsense'), icon: FaBrain }
  ];

  useEffect(() => {
    console.log('Active tab changed:', activeMainTab);
  }, [activeMainTab]);

  const getCurrentColorConfig = () => {
    return colorConfig[activeMainTab] || colorConfig.overview;
  };

  const renderEmotionalAnalysis = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">{t('dashboard.emotional_analysis.title')}</h3>
        <button className="text-sm text-pink-600 hover:text-pink-700 flex items-center space-x-1">
          <FaFilePdf className="w-4 h-4" />
          <span>{t('dashboard.emotional_analysis.export_button')}</span>
        </button>
      </div>

      {/* Score PetSense */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-white text-lg font-semibold mb-1">{t('dashboard.emotional_analysis.score.title')}</h4>
            <p className="text-white/80 text-sm">{t('dashboard.emotional_analysis.score.description')}</p>
          </div>
          <div className="text-4xl font-bold text-white">{petSenseScore}</div>
        </div>
        <div className="mt-4 w-full h-2 bg-white/20 rounded-full">
          <div 
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${petSenseScore}%` }}
          ></div>
        </div>
      </div>

      {/* Historique émotionnel */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">{t('dashboard.emotional_analysis.history.title')}</h4>
        <div className="space-y-4">
          {emotionHistory.map((entry, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                {entry.emotion === 'joy' && <FaSmile className="w-6 h-6 text-yellow-400" />}
                {entry.emotion === 'sadness' && <FaSadTear className="w-6 h-6 text-blue-400" />}
                {entry.emotion === 'stress' && <FaAngry className="w-6 h-6 text-red-400" />}
                <div>
                  <p className="font-medium text-gray-900">
                    {t(`emotions.${entry.emotion}`) || entry.emotion}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t('dashboard.emotional_analysis.history.confidence_label')} : {entry.confidence}%
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {new Date(entry.date).toLocaleDateString()}
                </p>
                {entry.healthEvent && (
                  <p className="text-sm text-pink-600">
                    {entry.healthEvent}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback utilisateur */}
      <div className="bg-pink-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">{t('dashboard.emotional_analysis.feedback.title')}</h4>
        <p className="text-sm text-gray-600 mb-4">
          {t('dashboard.emotional_analysis.feedback.description')}
        </p>
        <div className="flex space-x-2">
          <button className="flex-1 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center justify-center space-x-2">
            <FaThumbsUp className="w-4 h-4" />
            <span>{t('dashboard.emotional_analysis.feedback.precise_button')}</span>
          </button>
          <button 
            className="flex-1 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center justify-center space-x-2"
            onClick={() => setShowEmotionSelector(true)}
          >
            <FaTimes className="w-4 h-4" />
            <span>{t('dashboard.emotional_analysis.feedback.imprecise_button')}</span>
          </button>
        </div>

        {showEmotionSelector && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            <p className="text-sm font-semibold text-gray-700">{t('dashboard.emotional_analysis.feedback.select_correct_emotion')}</p>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200" onClick={() => handleEmotionFeedback('joy')}>{t('emotions.joy')}</button>
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200" onClick={() => handleEmotionFeedback('sadness')}>{t('emotions.sadness')}</button>
              <button className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full hover:bg-red-200" onClick={() => handleEmotionFeedback('stress')}>{t('emotions.stress')}</button>
              {/* Add other possible emotions as needed */}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  const renderHealthOverview = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{t('dashboard.health_overview.title')}</h3>

      {/* Alertes */}
      {healthData.alerts.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <FaExclamationTriangle className="w-5 h-5 text-red-500" />
            <h4 className="font-semibold text-gray-900">{t('dashboard.health_overview.alerts.title')}</h4>
          </div>
          <div className="space-y-2">
            {healthData.alerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg ${
                alert.severity === 'high' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
              }`}>
                <p className="text-sm">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Graphiques de suivi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <FaWeight className="w-5 h-5 text-blue-500" />
            <h4 className="font-semibold text-gray-900">{t('dashboard.health_overview.weight_chart.title')}</h4>
          </div>
          <div className="h-32 bg-white rounded-lg p-2">
            <div className="h-full flex items-end space-x-1">
              {healthData.weight.map((entry, index) => (
                <div 
                  key={index}
                  className="flex-1 bg-blue-500 rounded-t"
                  style={{ height: `${(entry.value / 15) * 100}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <FaChartLine className="w-5 h-5 text-green-500" />
            <h4 className="font-semibold text-gray-900">{t('dashboard.health_overview.activity_chart.title')}</h4>
          </div>
          <div className="h-32 bg-white rounded-lg p-2">
            <div className="h-full flex items-end space-x-1">
              {healthData.activity.map((entry, index) => (
                <div 
                  key={index}
                  className="flex-1 bg-green-500 rounded-t"
                  style={{ height: `${entry.value}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vaccinations */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <FaSyringe className="w-5 h-5 text-purple-500" />
          <h4 className="font-semibold text-gray-900">{t('dashboard.health_overview.vaccinations.title')}</h4>
        </div>
        <div className="space-y-3">
          {healthData.vaccinations.map((vaccine, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{vaccine.name}</p>
                <p className="text-sm text-gray-600">
                  {t('dashboard.health_overview.vaccinations.next_due_label')} : {new Date(vaccine.nextDue).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {t('dashboard.health_overview.vaccinations.done_label')} {new Date(vaccine.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6" data-testid="dashboard-container">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{t('dashboard.mood_label')} :</span>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
              {t(`moods.${dogMood}`) || dogMood}
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
              {renderEmotionalAnalysis()}
              {renderHealthOverview()}
            </div>
          )}

          {activeMainTab === 'health' && (
            <div className="space-y-6">
              {/* En-tête de l'onglet Santé */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('dashboard.health_tab.title', { petName: 'Rex' })}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-nature-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{t('dashboard.health_tab.last_checkup_label')}</p>
                        <p className="text-lg font-semibold text-gray-900">15 Mars 2024</p>
                      </div>
                      <MdHealthAndSafety className="w-8 h-8 text-nature-600" />
                    </div>
                  </div>
                  <div className="bg-nature-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{t('dashboard.health_tab.next_vaccine_label')}</p>
                        <p className="text-lg font-semibold text-gray-900">15 Avril 2024</p>
                      </div>
                      <MdVaccines className="w-8 h-8 text-nature-600" />
                    </div>
                  </div>
                  <div className="bg-nature-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{t('dashboard.health_tab.general_state_label')}</p>
                        <p className="text-lg font-semibold text-gray-900">{t('dashboard.health_tab.general_state_value')}</p>
                      </div>
                      <MdLocalHospital className="w-8 h-8 text-nature-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rendez-vous médicaux */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{t('dashboard.health_tab.appointments.title')}</h3>
                  <button 
                    className="bg-nature-600 text-white px-4 py-2 rounded-lg hover:bg-nature-700 transition-colors"
                    onClick={() => alert('Fonctionnalité de prise de rendez-vous à implémenter')}
                  >
                    {t('dashboard.health_tab.appointments.new_button')}
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">{t('dashboard.health_tab.appointments.annual_vaccination.title')}</p>
                        <p className="text-sm text-gray-600">Dr. Martin - {t('dashboard.health_tab.appointments.clinic_name')}</p>
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
                        <p className="font-semibold text-gray-900">{t('dashboard.health_tab.appointments.dental_checkup.title')}</p>
                        <p className="text-sm text-gray-600">Dr. Dubois - {t('dashboard.health_tab.appointments.dental_practice_name')}</p>
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
                  <h3 className="text-xl font-semibold text-gray-900">{t('dashboard.health_tab.teleconsultation.title')}</h3>
                  <button 
                    className="bg-nature-600 text-white px-4 py-2 rounded-lg hover:bg-nature-700 transition-colors"
                    onClick={() => alert('Fonctionnalité de téléconsultation à implémenter')}
                  >
                    {t('dashboard.health_tab.teleconsultation.request_button')}
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
                        <p className="text-sm text-gray-600">{t('dashboard.health_tab.teleconsultation.available_now')}</p>
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
                        <p className="text-sm text-gray-600">{t('dashboard.health_tab.teleconsultation.available_in_30min')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dossier médical */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{t('dashboard.health_tab.medical_record.title')}</h3>
                  <button className="bg-nature-600 text-white px-4 py-2 rounded-lg hover:bg-nature-700 transition-colors">
                    {t('dashboard.health_tab.medical_record.download_button')}
                  </button>
                </div>

                {/* Section téléchargement de médias */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">{t('dashboard.health_tab.medical_record.media.title')}</h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <FaCamera className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="text-gray-600 mb-2">{t('dashboard.health_tab.medical_record.media.drag_drop_text')}</p>
                      <p className="text-sm text-gray-500 mb-4">{t('general.or')}</p>
                      <label className="bg-nature-600 text-white px-4 py-2 rounded-lg hover:bg-nature-700 transition-colors cursor-pointer">
                        {t('dashboard.health_tab.medical_record.media.browse_button')}
                        <input type="file" className="hidden" accept="image/*,video/*" multiple />
                      </label>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{t('dashboard.health_tab.medical_record.media.formats_accepted')}</p>
                </div>

                {/* Médias récemment téléchargés */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">{t('dashboard.health_tab.medical_record.recent_media.title')}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="relative group">
                      <img 
                        src="https://images.unsplash.com/photo-1543466835-00a7907e9de1" 
                        alt={t('dashboard.health_tab.medical_record.recent_media.photo_alt')} 
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
                        alt={t('dashboard.health_tab.medical_record.recent_media.photo_alt')} 
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
                        <p className="font-semibold text-gray-900">{t('dashboard.health_tab.medical_record.vaccinations.title')}</p>
                        <p className="text-sm text-gray-600">{t('dashboard.health_tab.medical_record.last_updated')}: 15 Mars 2024</p>
                      </div>
                      <button className="text-nature-600 hover:text-nature-700">
                        <FaDownload className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">{t('dashboard.health_tab.medical_record.blood_tests.title')}</p>
                        <p className="text-sm text-gray-600">{t('dashboard.health_tab.medical_record.last_updated')}: 1 Mars 2024</p>
                      </div>
                      <button className="text-nature-600 hover:text-nature-700">
                        <FaDownload className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">{t('dashboard.health_tab.medical_record.radiographs.title')}</p>
                        <p className="text-sm text-gray-600">{t('dashboard.health_tab.medical_record.last_updated')}: 20 Février 2024</p>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.health_tab.health_data.title')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">{t('dashboard.health_tab.health_data.vitality.title')}</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">{t('dashboard.health_tab.health_data.vitality.energy_level')}</span>
                          <span className="text-sm font-medium text-gray-900">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-nature-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">{t('dashboard.health_tab.health_data.vitality.sleep_quality')}</span>
                          <span className="text-sm font-medium text-gray-900">90%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-nature-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">{t('dashboard.health_tab.health_data.physical_activity.title')}</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">{t('dashboard.health_tab.health_data.physical_activity.daily_exercise')}</span>
                          <span className="text-sm font-medium text-gray-900">75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-nature-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">{t('dashboard.health_tab.health_data.physical_activity.games_activities')}</span>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.health_tab.ai_predictions.title')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-nature-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{t('dashboard.health_tab.ai_predictions.health_title')}</h4>
                    <p className="text-gray-600">{t('dashboard.health_tab.ai_predictions.health_description')}</p>
                  </div>
                  <div className="bg-nature-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{t('dashboard.health_tab.ai_predictions.behavior_title')}</h4>
                    <p className="text-gray-600">{t('dashboard.health_tab.ai_predictions.behavior_description')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMainTab === 'petmeet' && (
            <div className="space-y-6">
              {console.log('Rendering PetMeet tab')}
              {/* En-tête PetMeet */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">PetMeet</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{t('dashboard.petmeet_tab.recent_matches_label')} :</span>
                    <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-800">{t('dashboard.petmeet_tab.recent_matches_count', { count: 3 })}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{t('dashboard.petmeet_tab.profiles_seen_today')}</p>
                        <p className="text-lg font-semibold text-gray-900">12</p>
                      </div>
                      <FaUserFriends className="w-8 h-8 text-pink-600" />
                    </div>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{t('dashboard.petmeet_tab.matches_count_label')}</p>
                        <p className="text-lg font-semibold text-gray-900">8</p>
                      </div>
                      <FaHeart className="w-8 h-8 text-pink-600" />
                    </div>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{t('dashboard.petmeet_tab.upcoming_appointments_count_label')}</p>
                        <p className="text-lg font-semibold text-gray-900">2</p>
                      </div>
                      <FaCalendarAlt className="w-8 h-8 text-pink-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Profils à découvrir */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.petmeet_tab.discover_profiles.title')}</h3>
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
                        <p className="text-white/90">Golden Retriever, {t('general.age', { count: 2 })}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">{t('emotions.joueur')}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{t('emotions.calme')}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{t('dashboard.petmeet_tab.discover_profiles.luna_description')}</p>
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
                        <p className="text-white/90">Labrador, {t('general.age', { count: 3 })}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">{t('emotions.énergique')}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{t('dashboard.petmeet_tab.discover_profiles.intelligent')}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{t('dashboard.petmeet_tab.discover_profiles.max_description')}</p>
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
                        <p className="text-white/90">Border Collie, {t('general.age', { count: 1 })}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">{t('dashboard.petmeet_tab.discover_profiles.intelligent')}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{t('dashboard.petmeet_tab.discover_profiles.agile')}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{t('dashboard.petmeet_tab.discover_profiles.bella_description')}</p>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.petmeet_tab.recent_matches.title')}</h3>
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
                        <p className="text-sm text-gray-600">{t('dashboard.petmeet_tab.recent_matches.match_time', { time: '2 heures' })}</p>
                        <button className="mt-2 text-sm text-pink-600 hover:text-pink-700">
                          {t('dashboard.petmeet_tab.recent_matches.send_message_button')}
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
                        <p className="text-sm text-gray-600">{t('dashboard.petmeet_tab.recent_matches.match_time', { time: '5 heures' })}</p>
                        <button className="mt-2 text-sm text-pink-600 hover:text-pink-700">
                          {t('dashboard.petmeet_tab.recent_matches.send_message_button')}
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
                        <p className="text-sm text-gray-600">{t('dashboard.petmeet_tab.recent_matches.match_time', { time: '1 jour' })}</p>
                        <button className="mt-2 text-sm text-pink-600 hover:text-pink-700">
                          {t('dashboard.petmeet_tab.recent_matches.send_message_button')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prochains rendez-vous */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.petmeet_tab.upcoming_appointments.title')}</h3>
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
                          <h4 className="font-semibold text-gray-900">{t('dashboard.petmeet_tab.upcoming_appointments.appointment_with', { petName: 'Luna' })}</h4>
                          <p className="text-sm text-gray-600">{t('dashboard.petmeet_tab.upcoming_appointments.central_park')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{t('general.tomorrow')}</p>
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
                          <h4 className="font-semibold text-gray-900">{t('dashboard.petmeet_tab.upcoming_appointments.appointment_with', { petName: 'Max' })}</h4>
                          <p className="text-sm text-gray-600">{t('dashboard.petmeet_tab.upcoming_appointments.dog_park')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{t('general.saturday')}</p>
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
                  <h2 className="text-2xl font-bold text-gray-900">{t('dashboard.location_tab.title')}</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{t('dashboard.location_tab.nearby_dogs_label')} :</span>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800">{t('dashboard.location_tab.nearby_dogs_count', { count: 3, distance: '1km' })}</span>
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
                    <span className="text-sm text-gray-600">{t('dashboard.location_tab.legend.your_position')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-pink-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">{t('dashboard.location_tab.legend.nearby_dogs')}</span>
                  </div>
                </div>
              </div>

              {/* Liste des chiens à proximité */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.location_tab.nearby_dogs_list.title')}</h3>
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
                        <p className="text-sm text-gray-600">{t('dashboard.location_tab.nearby_dogs_list.dog_details', { breed: 'Golden Retriever', distance: '250m' })}</p>
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
                        <p className="text-sm text-gray-600">{t('dashboard.location_tab.nearby_dogs_list.dog_details', { breed: 'Labrador', distance: '450m' })}</p>
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
                        <p className="text-sm text-gray-600">{t('dashboard.location_tab.nearby_dogs_list.dog_details', { breed: 'Border Collie', distance: '750m' })}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMainTab === 'petsense' && (
            <div className="space-y-6">
              {/* Bannière PetSense Pro */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{t('dashboard.petsense_tab.pro_banner.title')}</h2>
                    <p className="text-white/90">{t('dashboard.petsense_tab.pro_banner.description')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">4,99€<span className="text-sm font-normal">{t('general.per_month')}</span></p>
                    <button className="mt-2 bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-white/90 transition-colors">
                      {t('dashboard.petsense_tab.pro_banner.subscribe_button')}
                    </button>
                  </div>
                </div>
              </div>

              {/* Fonctionnalités Premium */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Alertes intelligentes */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <FaBell className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.petsense_tab.features.smart_alerts.title')}</h3>
                      <p className="text-sm text-gray-600">{t('dashboard.petsense_tab.features.smart_alerts.description')}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-800">{t('dashboard.petsense_tab.features.smart_alerts.alert1')}</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-800">{t('dashboard.petsense_tab.features.smart_alerts.alert2')}</p>
                    </div>
                  </div>
                </div>

                {/* Export PDF */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                      <FaFilePdf className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.petsense_tab.features.veterinary_reports.title')}</h3>
                      <p className="text-sm text-gray-600">{t('dashboard.petsense_tab.features.veterinary_reports.description')}</p>
                    </div>
                  </div>
                  <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors">
                    {t('dashboard.petsense_tab.features.veterinary_reports.button')}
                  </button>
                </div>

                {/* Suivi croisé */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaChartLine className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.petsense_tab.features.cross_tracking.title')}</h3>
                      <p className="text-sm text-gray-600">{t('dashboard.petsense_tab.features.cross_tracking.description')}</p>
                    </div>
                  </div>
                  <div className="h-32 bg-gray-50 rounded-lg p-4">
                    <div className="h-full flex items-end space-x-2">
                      {[65, 75, 82, 78, 85, 88, 90].map((value, index) => (
                        <div 
                          key={index}
                          className="flex-1 bg-blue-500 rounded-t"
                          style={{ height: `${value}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Collier connecté */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FaPaw className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.petsense_tab.features.connected_collar.title')}</h3>
                      <p className="text-sm text-gray-600">{t('dashboard.petsense_tab.features.connected_collar.description')}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{t('dashboard.petsense_tab.features.connected_collar.activity_today')}</span>
                      <span className="text-sm font-medium text-gray-900">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Roadmap */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.petsense_tab.roadmap.title')}</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{t('dashboard.petsense_tab.roadmap.version1_title')}</h4>
                      <p className="text-sm text-gray-600">{t('dashboard.petsense_tab.roadmap.version1_description')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaStar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{t('dashboard.petsense_tab.roadmap.version2_title')}</h4>
                      <p className="text-sm text-gray-600">{t('dashboard.petsense_tab.roadmap.version2_description')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <FaRobot className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{t('dashboard.petsense_tab.roadmap.version3_title')}</h4>
                      <p className="text-sm text-gray-600">{t('dashboard.petsense_tab.roadmap.version3_description')}</p>
                    </div>
                  </div>
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