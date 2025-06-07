import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeartbeat, FaRobot, FaAppleAlt, FaBell, FaExclamationTriangle, FaCheckCircle, FaWeight, FaUtensils, FaVial, FaChartLine, FaPaw, FaMapMarkerAlt, FaComments, FaUserFriends, FaHeart, FaCalendarAlt, FaStar, FaLanguage, FaMicrophone, FaFont, FaHistory, FaEdit, FaTrash, FaSearch, FaPrint, FaDownload, FaShare, FaTimes, FaCamera, FaVideo, FaBrain, FaFilePdf, FaSmile, FaSadTear, FaAngry, FaSurprise, FaSyringe, FaNotesMedical, FaThumbsUp, FaCog, FaPlus } from 'react-icons/fa';
import { MdHealthAndSafety, MdLocalHospital, MdVaccines, MdDownload, MdPets, MdFavorite, MdFavoriteBorder, MdAccessTime, MdEvent, MdPerson, MdLocationOn, MdTrendingUp, MdPhotoLibrary } from 'react-icons/md';
import ChatModal from '../components/ChatModal';
import MapComponent from '../components/MapComponent';
import { useTranslation } from 'react-i18next';
import Reminders from '../components/Reminders';
import NutritionPanel from '../components/NutritionPanel';
import HealthMetrics from '../components/HealthMetrics';
import AiPredictions from '../components/AiPredictions';
import BookAppointment from './BookAppointment';
import Teleconsultation from './Teleconsultation';
import PetSenseTab from '../components/PetSenseTab';
import config from '../config'; // Importing the config file
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import DogSwipe from './DogSwipe';
import 'leaflet/dist/leaflet.css';
import WeightChart from '../components/WeightChart';
import ActivityChart from '../components/ActivityChart';
import { detectAlerts } from '../utils/alerts';
import HealthOverview from '../components/health/HealthOverview';
import sampleData from '../components/health/sampleData';
import VaccineInfoModal from '../components/VaccineInfoModal';
import MedicalRecords from '../components/MedicalRecords'; // Import MedicalRecords component


const Dashboard = () => {
  console.log('Dashboard component rendering');
  
  const [activeMainTab, setActiveMainTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [dogMood, setDogMood] = useState('joueur');
  const [position, setPosition] = useState(null);
  const [nearestDog, setNearestDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEmotionSelector, setShowEmotionSelector] = useState(false);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [showNutritionForm, setShowNutritionForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showTeleconsultationForm, setShowTeleconsultationForm] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [medicalFiles, setMedicalFiles] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null); // État pour le prochain rendez-vous
  const [predictionResult, setPredictionResult] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [range, setRange] = useState(7);
  const [showHealthDetails, setShowHealthDetails] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  
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

  useEffect(() => {
    fetch(`${config.API_BASE_URL}/health-data?petId=rex123`)
      .then(res => res.json())
      .then(data => { console.log("API Response:", data); setHealthData(data); });
  }, []);

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
    { id: 'overview', label: 'Aperçu', icon: (props) => <FaPaw className="w-5 h-5" style={{ color: '#22c55e' }} /> },
    { id: 'health', label: 'Santé', icon: (props) => <FaHeartbeat className="w-5 h-5" style={{ color: '#f97316' }} /> },
    { id: 'petmeet', label: 'PetMeet', icon: (props) => (
      <img 
        src="/images/icon_petmeet.png" 
        alt="PetMeet" 
        className="w-6 h-6 inline-block align-middle" 
        style={{ display: 'inline-block', verticalAlign: 'middle' }} 
        loading="lazy"
        onError={e => { 
          console.error('Error loading PetMeet logo:', e.target.src); 
          e.target.style.display = 'none'; 
        }}
      />
    )},
    { id: 'location', label: 'Localisation', icon: (props) => <FaMapMarkerAlt className="w-5 h-5" style={{ color: '#22c55e' }} /> },
    { id: 'petsense', label: 'PetSense', icon: (props) => <FaBrain className="w-5 h-5" style={{ color: '#7c3aed' }} /> },
  ];

  useEffect(() => {
    console.log('Active tab changed:', activeMainTab);
  }, [activeMainTab]);

  // Set the default tab to 'health' for testing purposes
  useEffect(() => {
    setActiveMainTab('health');
  }, []);

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

  // Conserving existing sections for "Aperçu de la santé"
  const renderHealthOverview = () => {
    const fallbackData = {
        activityData: [
            { date: "Lun", value: 3 },
            { date: "Mar", value: 2 },
            { date: "Mer", value: 1 },
            { date: "Jeu", value: 4 },
            { date: "Ven", value: 2.5 },
            { date: "Sam", value: 3 },
            { date: "Dim", value: 2 }
        ],
        weightData: [
            { date: "Lun", value: 20.5 },
            { date: "Dim", value: 19.2 }
        ],
        sleepData: [
            { date: "Lun", value: 8 },
            { date: "Dim", value: 4 }
        ],
        alerts: [
            { message: "Sommeil insuffisant", severity: "medium" },
            { message: "Perte de poids détectée", severity: "high" }
        ]
    };

    const dataToUse = healthData && healthData.activityData ? healthData : fallbackData;

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Aperçu de la santé</h3>
                <button
                    onClick={() => setShowHealthDetails(prev => !prev)}
                    className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
                >
                    {showHealthDetails ? "Masquer les graphiques" : "Afficher les graphiques"}
                </button>
            </div>

            {/* Résumé synthétique */}
            <div className="mb-2 text-sm text-gray-600">
                {dataToUse.alerts.length} alerte(s) détectée(s) - Dernière mise à jour hebdomadaire
            </div>

            {/* Section détaillée animée */}
            <AnimatePresence initial={false}>
                {showHealthDetails && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <HealthOverview data={dataToUse} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    // Mock filtering logic for veterinarians based on city
  };

  const handleSpecialtyChange = (e) => {
    setSelectedSpecialty(e.target.value);
    // Mock filtering logic for veterinarians based on specialty
  };

  const toggleAppointmentForm = () => {
    setShowAppointmentForm((prev) => !prev);
  };

  const toggleTeleconsultationForm = () => {
    setShowTeleconsultationForm((prev) => !prev);
  };

  const handleFileUpload = (files) => {
    setMedicalFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleUploadFiles = (newFiles) => {
    const filesWithDownload = newFiles.map((file) => ({
      name: file.name,
      download: () => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
      },
    }));
    setMedicalFiles((prev) => [...prev, ...filesWithDownload]);
  };

  const handleDownloadAll = () => {
    medicalFiles.forEach((file) => file.download());
  };

  const veterinarians = [
    { name: "Dr. Martin", clinic: "Clinique ABC", distance: "2,3 km", slots: ["9:00", "10:00"] },
    { name: "Dr. Dubois", clinic: "Clinique XYZ", distance: "3,1 km", slots: ["11:00", "12:00"] }
  ];

  const renderVeterinarians = () => (
    veterinarians.map((vet, index) => (
      <div key={index} className="p-4 bg-gray-50 rounded-lg">
        <p className="font-medium text-gray-900">{vet.name}</p>
        <p className="text-sm text-gray-600">{vet.clinic} - {vet.distance}</p>
        <div className="flex space-x-2 mt-2">
          {vet.slots.map((slot, idx) => (
            <button
              key={idx}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    ))
  );

  const renderAppointmentSection = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Rendez-vous médicaux</h3>
        <button
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
          onClick={toggleAppointmentForm}
        >
          <FaPlus className="w-4 h-4" />
          <span>Nouveau rendez-vous</span>
        </button>
      </div>

      {showAppointmentForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 space-y-4"
        >
          <div className="flex justify-between items-center">
            <select
              className="border rounded-lg p-2 text-sm w-2/3"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Choisir une ville</option>
              <option value="Paris">Paris</option>
              <option value="Lyon">Lyon</option>
              <option value="Marseille">Marseille</option>
            </select>
          </div>

          <div className="space-y-4">
            {veterinarians.map((vet, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">{vet.name}</p>
                <p className="text-sm text-gray-600">{vet.clinic} - {vet.distance}</p>
                <div className="flex space-x-2 mt-2">
                  {vet.slots.map((slot, idx) => (
                    <button
                      key={idx}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderTeleconsultationSection = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Téléconsultation</h3>
        <select
          className="border rounded-lg p-2 text-sm w-2/3"
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
        >
          <option value="">Choisir une spécialité</option>
          <option value="Généraliste">Généraliste</option>
          <option value="Dentiste">Dentiste</option>
          <option value="Nutritionniste">Nutritionniste</option>
        </select>
      </div>

      <div className="space-y-4">
        {/*
          Mocked list of veterinarians for teleconsultation
          Replace with real data fetching logic as needed
        */}
        {/*
          {veterinarians.map((vet, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900">{vet.name}</p>
              <p className="text-sm text-gray-600">{vet.status}</p>
            </div>
          ))}
        */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-medium text-gray-900">Dr. Martin</p>
          <p className="text-sm text-gray-600">Disponible maintenant</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-medium text-gray-900">Dr. Dubois</p>
          <p className="text-sm text-gray-600">Disponible dans 10 minutes</p>
        </div>
      </div>
    </div>
  );

  const renderMedicalRecordsSection = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Dossier médical</h3>
      <div className="border rounded-lg p-4 bg-gray-50">
        <p className="text-sm text-gray-600 mb-2">Glissez-déposez ou Parcourir pour ajouter des fichiers médicaux</p>
        <input
          type="file"
          multiple
          className="border rounded-lg p-2 w-full"
          onChange={(e) => handleFileUpload(Array.from(e.target.files))}
        />
      </div>

      <div className="mt-4 space-y-2">
        {medicalFiles.map((file, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
            <p className="text-sm text-gray-900">{file.name}</p>
            <button className="text-sm text-blue-600 hover:text-blue-700">Télécharger</button>
          </div>
        ))}
      </div>
    </div>
  );

  // Implementing "Rappels & Nutrition" section
  const renderRemindersAndNutrition = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 col-span-1 md:col-span-2 lg:col-span-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Rappels & Nutrition</h3>
        <button
          className="text-sm text-green-600 hover:text-green-700 flex items-center space-x-1"
          onClick={() => setShowReminderForm((prev) => !prev)}
        >
          <FaPlus className="w-4 h-4" />
          <span>Ajouter un rappel</span>
        </button>
        <button
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
          onClick={() => setShowNutritionForm((prev) => !prev)}
        >
          <FaPlus className="w-4 h-4" />
          <span>Ajouter un objectif nutritionnel</span>
        </button>
      </div>

      {/* Formulaire de rappel */}
      <motion.div
        initial={{ maxHeight: 0, opacity: 0 }}
        animate={{ maxHeight: showReminderForm ? "500px" : 0, opacity: showReminderForm ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {showReminderForm && (
          <form className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Type de rappel"
              className="border rounded-lg p-2 w-full"
            />
            <input
              type="time"
              className="border rounded-lg p-2 w-full"
            />
            <textarea
              placeholder="Description"
              className="border rounded-lg p-2 w-full"
            ></textarea>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Enregistrer
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                onClick={() => setShowReminderForm(false)}
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </motion.div>

      {/* Formulaire d'objectif nutritionnel */}
      <motion.div
        initial={{ maxHeight: 0, opacity: 0 }}
        animate={{ maxHeight: showNutritionForm ? "500px" : 0, opacity: showNutritionForm ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {showNutritionForm && (
          <form className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Objectif nutritionnel"
              className="border rounded-lg p-2 w-full"
            />
            <input
              type="number"
              placeholder="Calories"
              className="border rounded-lg p-2 w-full"
            />
            <textarea
              placeholder="Description"
              className="border rounded-lg p-2 w-full"
            ></textarea>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Enregistrer
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                onClick={() => setShowNutritionForm(false)}
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );

  const renderRemindersSection = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Rappels</h3>
        <button
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
          onClick={toggleReminderForm}
        >
          <FaPlus className="w-4 h-4" />
          <span>Ajouter un rappel</span>
        </button>
      </div>

      {showReminderForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 space-y-4"
        >
          <input
            type="text"
            placeholder="Titre du rappel"
            className="border rounded-lg p-2 text-sm w-full"
          />
          <input
            type="datetime-local"
            className="border rounded-lg p-2 text-sm w-full"
          />
          <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Enregistrer
          </button>
        </motion.div>
      )}

      <div className="space-y-4">
        {healthReminders.map((reminder, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900">{reminder.description}</p>
            <p className="text-sm text-gray-600">{reminder.time}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMatchingAndChat = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Matching & Chat</h3>
      <DogSwipe
        onMatch={(matchedDog) => {
          console.log('Matched with:', matchedDog);
          navigate(`/chat/${matchedDog.id}`);
        }}
      />
    </div>
  );

  // Fetch real data for health, dog profiles, and geolocation
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const [healthResponse, dogResponse, locationResponse] = await Promise.all([
          fetch(`${config.API_BASE_URL}/api/health`, { headers }),
          fetch(`${config.API_BASE_URL}/api/dogs/profile`, { headers }),
          fetch(`${config.API_BASE_URL}/api/location`, { headers }),
        ]);

        const healthData = await healthResponse.json();
        const dogData = await dogResponse.json();
        const locationData = await locationResponse.json();

        setHealthData(healthData);
        setNearestDog(dogData);
        setPosition(locationData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Fetching detailed information about the dog, next appointment, and dog status
  useEffect(() => {
    const fetchDashboardDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const [dogProfileResponse, nextAppointmentResponse, dogStatusResponse] = await Promise.all([
          fetch(`${config.API_BASE_URL}/api/dogs/me`, { headers }),
          fetch(`${config.API_BASE_URL}/api/appointments/next`, { headers }),
          fetch(`${config.API_BASE_URL}/api/dogs/status`, { headers }),
        ]);

        const dogProfile = await dogProfileResponse.json();
        const nextAppointment = await nextAppointmentResponse.json();
        const dogStatus = await dogStatusResponse.json();

        setDogMood(dogStatus.mood);
        setNearestDog(dogProfile);
        setNextAppointment(nextAppointment);
      } catch (error) {
        console.error('Error fetching dashboard details:', error);
      }
    };

    fetchDashboardDetails();
  }, []);

  const renderRadarMap = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Radar GPS</h3>
      <MapContainer
        center={[48.8566, 2.3522]} // Paris coordinates as default
        zoom={13}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {position && (
          <Marker position={[position.latitude, position.longitude]}>
            <Popup>Votre position actuelle</Popup>
          </Marker>
        )}
        {nearestDog && (
          <Marker position={[nearestDog.latitude, nearestDog.longitude]}>
            <Popup>
              {nearestDog.name} ({nearestDog.breed}) à {nearestDog.distance}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );

  const renderDynamicVisualization = (data) => {
    return data.map((entry, index) => (
      <div key={index} className="flex items-center space-x-2">
        <span className={`text-sm ${entry.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {entry.trend === 'up' ? '↗' : '↘'}
        </span>
        <span>{entry.value}</span>
      </div>
    ));
  };

  // Filter healthData based on selected range
  const filteredData = healthData ? healthData.filter(item => {
    const today = new Date();
    const itemDate = new Date(item.date);
    return (today - itemDate) / (1000 * 60 * 60 * 24) <= range;
  }) : [];

  // Vaccination state management
  const [vaccinations, setVaccinations] = useState([
    { id: 1, name: 'Rage', date: '2025-05-01', status: 'Completed' },
    { id: 2, name: 'Leptospirose', date: '2025-06-15', status: 'Pending' }
  ]);

  const handleAddVaccine = (newVaccine) => {
    setVaccinations((prevVaccinations) => [...prevVaccinations, newVaccine]);
  };

  const VaccinationSection = () => (
    <div className="vaccination-section">
      <h2>{t('vaccinations.title')}</h2>
      <ul>
        {vaccinations.map((vaccine) => (
          <li key={vaccine.id}>
            <span>{vaccine.name}</span> - <span>{vaccine.date}</span> - <span>{vaccine.status}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          const newVaccine = {
            id: vaccinations.length + 1,
            name: prompt('Nom de la vaccination :'),
            date: prompt('Date de la vaccination :'),
            status: 'Pending',
          };
          handleAddVaccine(newVaccine);
        }}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition"
      >
        <FaPlus className="mr-2" />
        Ajouter une vaccination
      </button>
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
        {/* Colonne principale (2/3) */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          {activeMainTab === 'overview' && (
            <div className="space-y-6">
              {renderEmotionalAnalysis()}
              {renderHealthOverview()}
            </div>
          )}

          {activeMainTab === 'health' && (
            <div className="space-y-6">
              {renderAppointmentSection()}
              {renderTeleconsultationSection()}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Dossier médical</h2>
                <MedicalRecords
                  files={medicalFiles}
                  onUpload={handleUploadFiles}
                  onDownloadAll={handleDownloadAll}
                />
              </div>

              {/* Vaccination Section */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Vaccinations</h3>
                <div className="space-y-4">
                  {vaccinations.map((vaccine) => (
                    <div key={vaccine.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{vaccine.name}</p>
                        <p className="text-sm text-gray-600">{vaccine.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${vaccine.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {vaccine.status}
                      </span>
                      <button
                        className="ml-4 text-sm text-blue-600 hover:underline"
                        onClick={() => setSelectedVaccine(vaccine)}
                      >
                        Détails
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    const newVaccine = {
                      id: vaccinations.length + 1,
                      name: prompt('Nom de la vaccination :'),
                      date: prompt('Date de la vaccination :'),
                      status: 'Pending',
                    };
                    handleAddVaccine(newVaccine);
                  }}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition"
                >
                  <FaPlus className="mr-2" />
                  Ajouter une vaccination
                </button>
              </div>
            </div>
          )}
          {activeMainTab === 'location' && (
            <div>
              {/* Location tab content */}
            </div>
          )}
          {activeMainTab === 'petsense' && <PetSenseTab petSenseScore={petSenseScore} />}
          {activeMainTab === 'petmeet' && (
            <div className="space-y-6">
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
                  {[{
                    name: 'Luna',
                    breed: 'Golden Retriever, 2 ans',
                    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
                    tags: ['Joueur', 'Calme'],
                    description: "Luna est une chienne joyeuse et énergique qui adore jouer avec ses amis à quatre pattes. Elle est également très calme et affectionnée."
                  }, {
                    name: 'Max',
                    breed: 'Labrador, 3 ans',
                    image: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8',
                    tags: ['Énergique', 'Intelligent'],
                    description: "Max est un labrador intelligent et plein d'énergie. Il adore les longues promenades et apprendre de nouveaux tours."
                  }, {
                    name: 'Bella',
                    breed: 'Border Collie, 1 an',
                    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a',
                    tags: ['Joueur', 'Affectueux'],
                    description: "Bella est une jeune Border Collie affectueuse et joueuse. Elle aime courir et jouer à la balle."
                  }].map((profile, index) => (
                    <div key={index} className="bg-white border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-64 bg-gray-200">
                        <img 
                          src={profile.image} 
                          alt={profile.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <h4 className="text-white text-xl font-bold">{profile.name}</h4>
                          <p className="text-white/90">{profile.breed}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          {profile.tags.map((tag, idx) => (
                            <span key={idx} className={`px-2 py-1 bg-${tag === 'Joueur' ? 'pink' : 'blue'}-100 text-${tag === 'Joueur' ? 'pink' : 'blue'}-800 rounded-full text-sm`}>{tag}</span>
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{profile.description}</p>
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
                  ))}
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
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Sidebar toujours visible à droite */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Rappels</h2>
              <button
                onClick={() => setShowReminderForm(!showReminderForm)}
                className="text-green-600 hover:text-green-700"
              >
                <FaPlus />
              </button>
            </div>
            {/* Rappels */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Rappels</h2>
                <button
                  className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => setShowReminderForm(!showReminderForm)}
                >
                  <FaPlus />
                </button>
              </div>

              {/* Liste des rappels existants */}
              <div className="space-y-3 mb-4">
                {healthReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between bg-yellow-50 rounded-lg px-4 py-3"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">{reminder.type}</div>
                      <div className="text-xs text-gray-500">{reminder.description}</div>
                      <div className="text-xs text-gray-400">{reminder.time}</div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-yellow-200 text-yellow-800 text-xs font-medium">
                      {reminder.status === 'pending' ? 'En attente' : 'Terminé'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Formulaire d'ajout de rappel */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: showReminderForm ? 1 : 0, height: showReminderForm ? 'auto' : 0 }}
                transition={{ duration: 0.5 }}
              >
                {showReminderForm && (
                  <form className="space-y-4">
                    <select className="w-full px-2 py-1 border rounded">
                      <option value="">Type</option>
                      <option value="Médicament">Médicament</option>
                      <option value="Activité">Activité</option>
                      <option value="Nourriture">Nourriture</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Description"
                      className="w-full px-2 py-1 border rounded"
                    />
                    <input
                      type="time"
                      className="w-full px-2 py-1 border rounded"
                    />
                    <div className="flex space-x-2">
                      <button type="submit" className="px-3 py-1 bg-green-500 text-white rounded">Ajouter</button>
                      <button
                        type="button"
                        className="px-3 py-1 bg-gray-300 rounded"
                        onClick={() => setShowReminderForm(false)}
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>

          {/* Nutrition */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Nutrition</h2>
                  <button
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => setShowNutritionForm(!showNutritionForm)}
                  >
                    <FaPlus />
                  </button>
                </div>

                {/* Affichage des données nutritionnelles actuelles */}
                <div className="space-y-3 mb-4">
                  <div className="bg-blue-50 rounded-lg px-4 py-3 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">Calories quotidiennes</div>
                      <div className="text-xs text-gray-500">{nutritionData.dailyCalories} / {nutritionData.recommendedCalories} kcal</div>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg px-4 py-3 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">Consommation d'eau</div>
                      <div className="text-xs text-gray-500">{nutritionData.waterIntake} / {nutritionData.recommendedWater} ml</div>
                    </div>
                  </div>
                </div>

                {/* Formulaire d'ajout d'aliment */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: showNutritionForm ? 1 : 0, height: showNutritionForm ? 'auto' : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {showNutritionForm && (
                    <form className="space-y-4">
                      <input
                        type="text"
                        placeholder="Nom de l'aliment"
                        className="w-full px-2 py-1 border rounded"
                      />
                      <input
                        type="number"
                        placeholder="Calories"
                        className="w-full px-2 py-1 border rounded"
                      />
                      <div className="flex space-x-2">
                        <button type="submit" className="px-3 py-1 bg-green-500 text-white rounded">Ajouter</button>
                        <button
                          type="button"
                          className="px-3 py-1 bg-gray-300 rounded"
                          onClick={() => setShowNutritionForm(false)}
                        >
                          Annuler
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Données de santé</h2>
                <HealthMetrics />
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Prédictions de santé IA</h2>
                <AiPredictions />
              </div>
            </div>
          </div>
        </div>
      {/* Section for AI Predictions */}
      {selectedVaccine && (
        <VaccineInfoModal
          vaccine={selectedVaccine}
          onClose={() => setSelectedVaccine(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;