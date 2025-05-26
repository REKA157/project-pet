import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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
    { id: 'overview', label: 'Aperçu', icon: (props) => <FaPaw className="w-5 h-5" style={{ color: '#475569' }} /> },
    { id: 'health', label: 'Santé', icon: (props) => <FaHeartbeat className="w-5 h-5" style={{ color: '#475569' }} /> },
    { id: 'petmeet', label: 'PetMeet', icon: (props) => (
      <img 
        src="/images/icon_animals_placeholder.svg" 
        alt="PetMeet" 
        className="w-6 h-6" 
        style={{ display: 'inline-block', verticalAlign: 'middle', color: props.color, fill: props.color }} 
      />
    )},
    { id: 'location', label: 'Localisation', icon: (props) => <FaMapMarkerAlt className="w-5 h-5" style={{ color: '#475569' }} /> },
    { id: 'petsense', label: 'PetSense', icon: (props) => <FaBrain className="w-5 h-5" style={{ color: '#475569' }} /> },
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
        <h3 className="text-xl font-bold text-gray-900">Analyse émotionnelle</h3>
        <button className="text-sm text-pink-600 hover:text-pink-700 flex items-center space-x-1">
          <FaFilePdf className="w-4 h-4" />
          <span>Exporter</span>
        </button>
      </div>

      {/* Score PetSense */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-white text-lg font-semibold mb-1">Score PetSense</h4>
            <p className="text-white/80 text-sm">Évaluation globale de l'état émotionnel</p>
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
        <h4 className="font-semibold text-gray-900 mb-4">Historique émotionnel</h4>
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
                    Confiance : {entry.confidence}%
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
        <h4 className="font-semibold text-gray-900 mb-2">Feedback utilisateur</h4>
        <p className="text-sm text-gray-600 mb-4">
          Aidez-nous à améliorer l'analyse émotionnelle en fournissant un feedback
        </p>
        <div className="flex space-x-2">
          <button className="flex-1 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center justify-center space-x-2">
            <FaThumbsUp className="w-4 h-4" />
            <span>Précis</span>
          </button>
          <button 
            className="flex-1 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center justify-center space-x-2"
            onClick={() => setShowEmotionSelector(true)}
          >
            <FaTimes className="w-4 h-4" />
            <span>Imprécis</span>
          </button>
        </div>

        {showEmotionSelector && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            <p className="text-sm font-semibold text-gray-700">Sélectionnez l'émotion correcte</p>
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
      <h3 className="text-xl font-bold text-gray-900 mb-4">Aperçu de la santé</h3>

      {/* Alertes */}
      {healthData.alerts.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <FaExclamationTriangle className="w-5 h-5 text-red-500" />
            <h4 className="font-semibold text-gray-900">Alertes</h4>
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
            <h4 className="font-semibold text-gray-900">Suivi du poids</h4>
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
            <h4 className="font-semibold text-gray-900">Suivi de l'activité</h4>
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
          <h4 className="font-semibold text-gray-900">Vaccinations</h4>
        </div>
        <div className="space-y-3">
          {healthData.vaccinations.map((vaccine, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{vaccine.name}</p>
                <p className="text-sm text-gray-600">
                  Prochaine échéance : {new Date(vaccine.nextDue).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Dernière vaccination : {new Date(vaccine.date).toLocaleDateString()}
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
          <h1 className="text-2xl font-bold text-gray-900">Aperçu</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Mood :</span>
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
          {mainTabs.map((tab) => {
            const isActive = activeMainTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveMainTab(tab.id)}
                className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                  isActive ? 'bg-blue-600' : ''
                }`}
                style={{ color: isActive ? '#fff' : '#475569' }}
              >
                {typeof tab.icon === 'function'
                  ? tab.icon({ active: isActive, color: isActive ? '#fff' : '#475569' })
                  : <tab.icon className="w-5 h-5" style={{ color: isActive ? '#fff' : '#475569' }} />}
                <span style={{ color: isActive ? '#fff' : '#475569' }}>{tab.label}</span>
              </button>
            );
          })}
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Santé de Rex</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-nature-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Dernier examen</p>
                        <p className="text-lg font-semibold text-gray-900">15 Mars 2024</p>
                      </div>
                      <MdHealthAndSafety className="w-8 h-8 text-nature-600" />
                    </div>
                  </div>
                  <div className="bg-nature-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Prochaine vaccination</p>
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
                  <button 
                    className="bg-nature-600 text-white px-4 py-2 rounded-lg hover:bg-nature-700 transition-colors"
                    onClick={() => navigate('/app/book-appointment')}
                  >
                    Nouveau rendez-vous
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Vaccination annuelle</p>
                        <p className="text-sm text-gray-600">Dr. Martin - Clinique vétérinaire</p>
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
                        <p className="text-sm text-gray-600">Dr. Dubois - Cabinet dentaire</p>
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
                  <button 
                    className="bg-nature-600 text-white px-4 py-2 rounded-lg hover:bg-nature-700 transition-colors"
                    onClick={() => navigate('/app/teleconsultation')}
                  >
                    Demander une téléconsultation
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
                        <p className="text-sm text-gray-600">Disponible dans 30 minutes</p>
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
                    Télécharger
                  </button>
                </div>

                {/* Section téléchargement de médias */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Médias</h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <FaCamera className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="text-gray-600 mb-2">Glissez-déposez ou</p>
                      <p className="text-sm text-gray-500 mb-4">ou</p>
                      <label className="bg-nature-600 text-white px-4 py-2 rounded-lg hover:bg-nature-700 transition-colors cursor-pointer">
                        Parcourir
                        <input type="file" className="hidden" accept="image/*,video/*" multiple />
                      </label>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Formats acceptés : JPG, PNG, MP4</p>
                </div>

                {/* Médias récemment téléchargés */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Médias récemment téléchargés</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="relative group">
                      <img 
                        src="https://images.unsplash.com/photo-1543466835-00a7907e9de1" 
                        alt="Photo de Rex" 
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
                        alt="Photo de Rex" 
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
                        <p className="text-sm text-gray-600">Dernière mise à jour : 15 Mars 2024</p>
                      </div>
                      <button className="text-nature-600 hover:text-nature-700">
                        <FaDownload className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Analyses de sang</p>
                        <p className="text-sm text-gray-600">Dernière mise à jour : 1 Mars 2024</p>
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
                        <p className="text-sm text-gray-600">Dernière mise à jour : 20 Février 2024</p>
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
                    <p className="text-gray-600">Prédictions basées sur les données de santé</p>
                  </div>
                  <div className="bg-nature-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Comportement</h4>
                    <p className="text-gray-600">Prédictions basées sur le comportement</p>
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
                    <span className="text-sm text-gray-600">Matchs récents :</span>
                    <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-800">3</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Profils vus aujourd'hui</p>
                        <p className="text-lg font-semibold text-gray-900">12</p>
                      </div>
                      <img src="/images/icon_animals_placeholder.svg" alt="PetMeet" className="w-10 h-10 text-pink-600" />
                    </div>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Nombre de matchs</p>
                        <p className="text-lg font-semibold text-gray-900">8</p>
                      </div>
                      <FaHeart className="w-8 h-8 text-pink-600" />
                    </div>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Rendez-vous à venir</p>
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
                      <p className="text-gray-600 text-sm mb-4">Luna est une chienne joyeuse et énergique qui adore jouer avec ses amis à quatre pattes. Elle est également très calme et affectionnée.</p>
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
                      <p className="text-gray-600 text-sm mb-4">Max est un chien actif et intelligent qui aime les défis. Il est très loyal envers ses maîtres et adore les activités en plein air.</p>
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
                      <p className="text-gray-600 text-sm mb-4">Bella est une chienne intelligente et agile qui aime les défis. Elle est très attachée à ses maîtres et adore les activités en plein air.</p>
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
                        <p className="text-sm text-gray-600">Il y a 2 heures</p>
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
                        <p className="text-sm text-gray-600">Il y a 5 heures</p>
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
                        <p className="text-sm text-gray-600">Il y a 1 jour</p>
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
                          <p className="text-sm text-gray-600">Parc pour chiens</p>
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
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800">{`${nearestDog ? nearestDog.count : 0} dans un rayon de ${nearestDog ? nearestDog.distance : 'inconnu'}`}</span>
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
                        <p className="text-sm text-gray-600">Golden Retriever, 250m</p>
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
                        <p className="text-sm text-gray-600">Labrador, 450m</p>
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
                        <p className="text-sm text-gray-600">Border Collie, 750m</p>
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
                    <h2 className="text-2xl font-bold mb-2">PetSense Pro</h2>
                    <p className="text-white/90">Accédez à des fonctionnalités avancées pour une meilleure expérience avec votre animal de compagnie.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">4,99€<span className="text-sm font-normal">/mois</span></p>
                    <button className="mt-2 bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-white/90 transition-colors">
                      S'abonner
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
                      <h3 className="text-lg font-semibold text-gray-900">Alertes intelligentes</h3>
                      <p className="text-sm text-gray-600">Recevez des alertes personnalisées en fonction des besoins de votre animal de compagnie.</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-800">Alertes de santé</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-800">Alertes de comportement</p>
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
                      <h3 className="text-lg font-semibold text-gray-900">Rapports vétérinaires</h3>
                      <p className="text-sm text-gray-600">Téléchargez des rapports vétérinaires détaillés pour votre animal de compagnie.</p>
                    </div>
                  </div>
                  <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors">
                    Télécharger
                  </button>
                </div>

                {/* Suivi croisé */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaChartLine className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Suivi croisé</h3>
                      <p className="text-sm text-gray-600">Suivez les progrès de votre animal de compagnie et comparez-les avec d'autres utilisateurs.</p>
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
                      <h3 className="text-lg font-semibold text-gray-900">Collier connecté</h3>
                      <p className="text-sm text-gray-600">Restez connecté avec votre animal de compagnie où que vous soyez.</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Activité d'aujourd'hui</span>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Roadmap</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Version 1.0</h4>
                      <p className="text-sm text-gray-600">Fonctionnalités de base</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaStar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Version 2.0</h4>
                      <p className="text-sm text-gray-600">Améliorations et nouvelles fonctionnalités</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <FaRobot className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Version 3.0</h4>
                      <p className="text-sm text-gray-600">Intégration avancée avec l'IA</p>
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