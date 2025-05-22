import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaMapMarkerAlt, FaCalendarAlt, FaFilter, FaSearch, FaMap, FaStar, FaUserFriends, FaDog, FaCat, FaInfoCircle, FaBell, FaComments, FaClock, FaChartBar, FaMapMarkedAlt, FaBellRing, FaCamera, FaShare, FaThumbsUp, FaRegThumbsUp, FaImage, FaMagic, FaRobot, FaHistory, FaCheck, FaTimes, FaPaw, FaSmile, FaSadTear, FaAngry, FaSurprise } from 'react-icons/fa';
import { MdPets, MdFavorite, MdFavoriteBorder, MdAccessTime, MdEvent, MdPerson, MdLocationOn, MdTrendingUp, MdPhotoLibrary } from 'react-icons/md';
import ChatModal from '../components/ChatModal';
import MapComponent from '../components/MapComponent';

const PetMeet = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    ageRange: [0, 15],
    distance: 10,
    compatibility: 70,
    activityLevel: 'all',
    size: 'all',
    vaccinated: false,
    sterilized: false,
    behavior: 'all'
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showUpcomingMeets, setShowUpcomingMeets] = useState(false);
  const [upcomingMeets, setUpcomingMeets] = useState([
    {
      id: 1,
      pet: 'Max',
      owner: 'Jean D.',
      date: '2024-03-20',
      time: '15:00',
      location: 'Parc des Buttes-Chaumont',
      status: 'confirmed'
    },
    {
      id: 2,
      pet: 'Luna',
      owner: 'Marie L.',
      date: '2024-03-22',
      time: '16:30',
      location: 'Jardin du Luxembourg',
      status: 'pending'
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'message',
      content: 'Nouveau message de Jean D.',
      time: '5 min'
    },
    {
      id: 2,
      type: 'meet',
      content: 'Rencontre confirmée avec Luna',
      time: '1h'
    }
  ]);
  const [showStats, setShowStats] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [meetStats, setMeetStats] = useState({
    totalMeets: 12,
    successfulMeets: 8,
    averageRating: 4.7,
    favoriteLocations: [
      { name: 'Parc des Buttes-Chaumont', count: 5 },
      { name: 'Jardin du Luxembourg', count: 3 },
      { name: 'Parc Monceau', count: 2 }
    ],
    monthlyTrend: [3, 5, 4, 6, 4, 7]
  });
  const [locationSuggestions, setLocationSuggestions] = useState([
    {
      id: 1,
      name: 'Parc des Buttes-Chaumont',
      rating: 4.8,
      distance: 1.2,
      features: ['Espace clos', 'Zone ombragée', 'Point d\'eau'],
      popularity: 'Élevée',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: 'Jardin du Luxembourg',
      rating: 4.6,
      distance: 0.8,
      features: ['Grand espace', 'Zone de jeux', 'Café à proximité'],
      popularity: 'Moyenne',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ]);
  const [reminders, setReminders] = useState([
    {
      id: 1,
      meetId: 1,
      time: '14:30',
      message: 'Rencontre avec Max dans 30 minutes',
      type: 'upcoming'
    },
    {
      id: 2,
      meetId: 2,
      time: '16:00',
      message: 'Préparer les jouets pour Luna',
      type: 'preparation'
    }
  ]);
  const [showLocationReview, setShowLocationReview] = useState(false);
  const [locationReview, setLocationReview] = useState({
    rating: 0,
    comment: '',
    photos: []
  });

  const [petPreferences, setPetPreferences] = useState({
    activityLevel: 'high',
    socialBehavior: 'friendly',
    favoriteActivities: ['Jeux', 'Promenades'],
    preferredEnvironments: ['Parcs', 'Espaces ouverts']
  });

  const [meetPhotos, setMeetPhotos] = useState([
    {
      id: 1,
      meetId: 1,
      url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      caption: 'Max et Luna jouent ensemble',
      likes: 12,
      comments: 3,
      timestamp: '2024-03-15 15:30'
    }
  ]);

  const [showPhotoGallery, setShowPhotoGallery] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);

  const [showMatchmaking, setShowMatchmaking] = useState(false);
  const [matchmakingStats, setMatchmakingStats] = useState({
    totalMatches: 15,
    successfulMatches: 12,
    averageCompatibility: 85,
    matchHistory: [
      {
        id: 1,
        pet: 'Max',
        compatibility: 92,
        factors: ['Même niveau d\'énergie', 'Intérêts similaires', 'Comportement compatible'],
        date: '2024-03-15',
        status: 'successful'
      },
      {
        id: 2,
        pet: 'Luna',
        compatibility: 78,
        factors: ['Personnalités complémentaires', 'Activités compatibles'],
        date: '2024-03-10',
        status: 'pending'
      }
    ]
  });

  const [aiSuggestions, setAiSuggestions] = useState([
    {
      id: 1,
      pet: 'Rocky',
      compatibility: 95,
      reasons: [
        'Même niveau d\'énergie élevé',
        'Intérêts similaires en jeux',
        'Comportement social compatible'
      ],
      matchScore: 95,
      personalityMatch: 'Parfait',
      activityMatch: 'Excellent',
      socialMatch: 'Très bon'
    },
    {
      id: 2,
      pet: 'Bella',
      compatibility: 88,
      reasons: [
        'Personnalités complémentaires',
        'Activités compatibles',
        'Environnements préférés similaires'
      ],
      matchScore: 88,
      personalityMatch: 'Très bon',
      activityMatch: 'Bon',
      socialMatch: 'Excellent'
    }
  ]);

  const [showEmotionAnalysis, setShowEmotionAnalysis] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [showCompatibilityDetails, setShowCompatibilityDetails] = useState(false);

  useEffect(() => {
    // Simuler la géolocalisation de l'utilisateur
    setUserLocation({
      lat: 48.8566,
      lng: 2.3522
    });
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowMap(false);
  };

  const filters = [
    { id: 'all', label: 'Tous', icon: <MdPets /> },
    { id: 'dogs', label: 'Chiens', icon: <FaDog /> },
    { id: 'cats', label: 'Chats', icon: <FaCat /> },
    { id: 'nearby', label: 'À proximité', icon: <FaMapMarkerAlt /> },
    { id: 'compatible', label: 'Compatibles', icon: <FaUserFriends /> }
  ];

  const pets = [
    {
      id: 1,
      name: 'Max',
      type: 'dog',
      breed: 'Labrador',
      age: 3,
      distance: 0.5,
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      owner: 'Jean D.',
      description: 'Joueur et sociable, adore les longues promenades',
      interests: ['Jeux', 'Promenades', 'Socialisation'],
      rating: 4.8,
      reviews: 24,
      compatibility: 92,
      activityLevel: 'high',
      size: 'large',
      vaccinated: true,
      sterilized: true,
      lastActive: '2h'
    },
    {
      id: 2,
      name: 'Luna',
      type: 'cat',
      breed: 'Siamois',
      age: 2,
      distance: 1.2,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      owner: 'Marie L.',
      description: 'Calme et câline, aime les endroits tranquilles',
      interests: ['Câlins', 'Jeux d\'intérieur', 'Repos'],
      rating: 4.5,
      reviews: 18,
      compatibility: 85,
      activityLevel: 'low',
      size: 'small',
      vaccinated: true,
      sterilized: true,
      lastActive: '5h'
    }
  ];

  const handleContact = (pet) => {
    setSelectedPet(pet);
    setIsChatOpen(true);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const emotions = [
    { type: 'joy', icon: <FaSmile className="w-6 h-6 text-yellow-400" />, label: 'Joie' },
    { type: 'sadness', icon: <FaSadTear className="w-6 h-6 text-blue-400" />, label: 'Tristesse' },
    { type: 'anger', icon: <FaAngry className="w-6 h-6 text-red-400" />, label: 'Colère' },
    { type: 'surprise', icon: <FaSurprise className="w-6 h-6 text-purple-400" />, label: 'Surprise' }
  ];

  const analyzeEmotion = () => {
    // Simulation d'analyse d'émotion
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
    
    setCurrentEmotion({
      ...randomEmotion,
      confidence,
      timestamp: new Date().toISOString()
    });

    setEmotionHistory(prev => [{
      ...randomEmotion,
      confidence,
      timestamp: new Date().toISOString()
    }, ...prev]);
  };

  const renderEmotionAnalysis = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Analyse des émotions</h3>
      
      {currentEmotion ? (
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            {currentEmotion.icon}
            <div>
              <h4 className="font-semibold text-gray-900">{currentEmotion.label}</h4>
              <p className="text-sm text-gray-600">Confiance : {currentEmotion.confidence}%</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentEmotion(null)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Nouvelle analyse
            </button>
            <button 
              onClick={() => {/* Fonction de feedback */}}
              className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200"
            >
              Donner mon avis
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={analyzeEmotion}
          className="w-full py-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 flex items-center justify-center space-x-2"
        >
          <FaRobot className="w-5 h-5" />
          <span>Analyser les émotions</span>
        </button>
      )}

      {emotionHistory.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Historique des analyses</h4>
          <div className="space-y-2">
            {emotionHistory.slice(0, 5).map((emotion, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  {emotion.icon}
                  <span className="text-sm text-gray-700">{emotion.label}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(emotion.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderCompatibilityDetails = (pet) => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Analyse de compatibilité</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-pink-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Comportement</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Niveau d'énergie</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div className="w-3/4 h-full bg-pink-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Sociabilité</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div className="w-4/5 h-full bg-pink-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Préférences</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Activités</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div className="w-2/3 h-full bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Environnement</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div className="w-4/5 h-full bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Score de compatibilité</h4>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-green-600">85%</div>
          <div className="text-sm text-gray-600">
            Basé sur l'analyse comportementale et les préférences
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête PetMeet */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
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
              <MdPets className="w-8 h-8 text-pink-600" />
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

      {/* Navigation par onglets */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('discover')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeTab === 'discover'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaPaw className="w-5 h-5" />
            <span>Découvrir</span>
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeTab === 'matches'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaHeart className="w-5 h-5" />
            <span>Matchs</span>
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeTab === 'appointments'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaCalendarAlt className="w-5 h-5" />
            <span>Rendez-vous</span>
          </button>
        </div>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'discover' && (
        <div className="space-y-6">
          {renderEmotionAnalysis()}
          
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
      )}

      {activeTab === 'matches' && (
        <div className="space-y-6">
          {selectedPet && renderCompatibilityDetails(selectedPet)}
          
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
                  <button className="mt-2 text-sm text-pink-600 hover:text-pink-700 flex items-center space-x-1">
                    <FaComments className="w-4 h-4" />
                    <span>Envoyer un message</span>
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
                  <button className="mt-2 text-sm text-pink-600 hover:text-pink-700 flex items-center space-x-1">
                    <FaComments className="w-4 h-4" />
                    <span>Envoyer un message</span>
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
                  <button className="mt-2 text-sm text-pink-600 hover:text-pink-700 flex items-center space-x-1">
                    <FaComments className="w-4 h-4" />
                    <span>Envoyer un message</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'appointments' && (
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
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    <span>Parc Central</span>
                  </div>
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
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    <span>Parc des Chiens</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Samedi</p>
                <p className="text-sm text-gray-600">10:00</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {selectedPet && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          pet={selectedPet.name}
          owner={selectedPet.owner}
        />
      )}
    </div>
  );
};

export default PetMeet; 