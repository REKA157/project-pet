import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaMapMarkerAlt, FaCalendarAlt, FaFilter, FaSearch, FaMap, FaStar, FaUserFriends, FaDog, FaCat, FaInfoCircle, FaBell, FaComments, FaClock, FaChartBar, FaMapMarkedAlt, FaBellRing, FaCamera, FaShare, FaThumbsUp, FaRegThumbsUp, FaImage, FaMagic, FaRobot, FaHistory, FaCheck } from 'react-icons/fa';
import { MdPets, MdFavorite, MdFavoriteBorder, MdAccessTime, MdEvent, MdPerson, MdLocationOn, MdTrendingUp, MdPhotoLibrary, MdRateReview, MdPsychology } from 'react-icons/md';
import ChatModal from '../components/ChatModal';
import MapComponent from '../components/MapComponent';

const PetMeet = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">PetMeet</h1>
          <p className="text-xl text-gray-600">Trouvez des compagnons de jeu pour votre animal</p>
        </motion.div>

        {/* Barre de recherche et filtres */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un animal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nature-500"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="flex gap-2">
              {filters.map((filter) => (
                <motion.button
                  key={filter.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-3 rounded-xl flex items-center ${
                    activeFilter === filter.id
                      ? 'bg-nature-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {filter.icon}
                  <span className="ml-2">{filter.label}</span>
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`px-4 py-3 rounded-xl flex items-center ${
                  showAdvancedFilters
                    ? 'bg-nature-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaFilter className="w-4 h-4 mr-2" />
                Filtres avancés
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMap(!showMap)}
                className={`px-4 py-3 rounded-xl flex items-center ${
                  showMap
                    ? 'bg-nature-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaMap className="w-4 h-4 mr-2" />
                Carte
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUpcomingMeets(!showUpcomingMeets)}
                className={`px-4 py-3 rounded-xl flex items-center ${
                  showUpcomingMeets
                    ? 'bg-nature-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MdEvent className="w-4 h-4 mr-2" />
                Rencontres
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative px-4 py-3 rounded-xl bg-white text-gray-600 hover:bg-gray-50"
              >
                <FaBell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowStats(!showStats)}
                className={`px-4 py-3 rounded-xl flex items-center ${
                  showStats
                    ? 'bg-nature-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaChartBar className="w-4 h-4 mr-2" />
                Statistiques
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLocationSuggestions(!showLocationSuggestions)}
                className={`px-4 py-3 rounded-xl flex items-center ${
                  showLocationSuggestions
                    ? 'bg-nature-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaMapMarkedAlt className="w-4 h-4 mr-2" />
                Lieux
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPhotoGallery(!showPhotoGallery)}
                className={`px-4 py-3 rounded-xl flex items-center ${
                  showPhotoGallery
                    ? 'bg-nature-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MdPhotoLibrary className="w-4 h-4 mr-2" />
                Photos
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMatchmaking(!showMatchmaking)}
                className={`px-4 py-3 rounded-xl flex items-center ${
                  showMatchmaking
                    ? 'bg-nature-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaMagic className="w-4 h-4 mr-2" />
                Matchmaking IA
              </motion.button>
            </div>
          </div>

          {/* Filtres avancés */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Âge (années)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="15"
                        value={advancedFilters.ageRange[1]}
                        onChange={(e) => setAdvancedFilters({
                          ...advancedFilters,
                          ageRange: [0, parseInt(e.target.value)]
                        })}
                        className="w-full"
                      />
                      <span className="text-sm text-gray-600">
                        {advancedFilters.ageRange[1]} ans
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Distance (km)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={advancedFilters.distance}
                        onChange={(e) => setAdvancedFilters({
                          ...advancedFilters,
                          distance: parseInt(e.target.value)
                        })}
                        className="w-full"
                      />
                      <span className="text-sm text-gray-600">
                        {advancedFilters.distance} km
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Compatibilité minimale
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={advancedFilters.compatibility}
                        onChange={(e) => setAdvancedFilters({
                          ...advancedFilters,
                          compatibility: parseInt(e.target.value)
                        })}
                        className="w-full"
                      />
                      <span className="text-sm text-gray-600">
                        {advancedFilters.compatibility}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comportement
                    </label>
                    <select
                      className="w-full rounded-lg border-gray-300"
                      value={advancedFilters.behavior}
                      onChange={(e) => setAdvancedFilters({
                        ...advancedFilters,
                        behavior: e.target.value
                      })}
                    >
                      <option value="all">Tous</option>
                      <option value="calm">Calme</option>
                      <option value="active">Actif</option>
                      <option value="playful">Joueur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taille
                    </label>
                    <select
                      className="w-full rounded-lg border-gray-300"
                      value={advancedFilters.size}
                      onChange={(e) => setAdvancedFilters({
                        ...advancedFilters,
                        size: e.target.value
                      })}
                    >
                      <option value="all">Toutes</option>
                      <option value="small">Petite</option>
                      <option value="medium">Moyenne</option>
                      <option value="large">Grande</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="vaccinated"
                      checked={advancedFilters.vaccinated}
                      onChange={(e) => setAdvancedFilters({
                        ...advancedFilters,
                        vaccinated: e.target.checked
                      })}
                      className="w-4 h-4 text-nature-600"
                    />
                    <label htmlFor="vaccinated" className="ml-2 text-sm text-gray-700">
                      Vacciné
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sterilized"
                      checked={advancedFilters.sterilized}
                      onChange={(e) => setAdvancedFilters({
                        ...advancedFilters,
                        sterilized: e.target.checked
                      })}
                      className="w-4 h-4 text-nature-600"
                    />
                    <label htmlFor="sterilized" className="ml-2 text-sm text-gray-700">
                      Stérilisé
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notifications */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute right-4 mt-2 w-80 bg-white rounded-xl shadow-lg z-50"
              >
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Notifications</h3>
                  <div className="space-y-2">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start p-2 hover:bg-gray-50 rounded-lg"
                      >
                        <div className="flex-shrink-0">
                          {notification.type === 'message' ? (
                            <FaComments className="w-5 h-5 text-nature-600" />
                          ) : (
                            <MdEvent className="w-5 h-5 text-nature-600" />
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-gray-900">{notification.content}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rencontres à venir */}
          <AnimatePresence>
            {showUpcomingMeets && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 bg-white rounded-xl p-4 shadow-lg"
              >
                <h3 className="font-medium text-gray-900 mb-4">Rencontres à venir</h3>
                <div className="space-y-4">
                  {upcomingMeets.map((meet) => (
                    <div
                      key={meet.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <MdPerson className="w-8 h-8 text-nature-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-900">
                            {meet.pet} avec {meet.owner}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {meet.date} à {meet.time}
                          </p>
                          <p className="text-sm text-gray-500">{meet.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          meet.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {meet.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Statistiques */}
          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 bg-white rounded-xl p-4 shadow-lg"
              >
                <h3 className="font-medium text-gray-900 mb-4">Statistiques de rencontres</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-nature-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-600">Total des rencontres</h4>
                    <p className="text-2xl font-bold text-nature-600">{meetStats.totalMeets}</p>
                  </div>
                  <div className="bg-nature-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-600">Rencontres réussies</h4>
                    <p className="text-2xl font-bold text-nature-600">{meetStats.successfulMeets}</p>
                  </div>
                  <div className="bg-nature-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-600">Note moyenne</h4>
                    <p className="text-2xl font-bold text-nature-600">{meetStats.averageRating}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Lieux préférés</h4>
                  <div className="space-y-2">
                    {meetStats.favoriteLocations.map((location, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-900">{location.name}</span>
                        <span className="text-sm text-nature-600">{location.count} rencontres</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Suggestions de lieux */}
          <AnimatePresence>
            {showLocationSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 bg-white rounded-xl p-4 shadow-lg"
              >
                <h3 className="font-medium text-gray-900 mb-4">Lieux recommandés</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {locationSuggestions.map((location) => (
                    <div key={location.id} className="bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={location.image}
                        alt={location.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{location.name}</h4>
                          <span className="text-sm text-nature-600">{location.distance} km</span>
                        </div>
                        <div className="flex items-center mb-2">
                          <FaStar className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600">{location.rating}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {location.features.map((feature, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-nature-100 text-nature-600 rounded-full text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Popularité: {location.popularity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-1 bg-nature-600 text-white rounded-lg text-sm"
                          >
                            Choisir
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rappels */}
          <AnimatePresence>
            {showUpcomingMeets && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900">Rencontres à venir</h3>
                  <div className="flex items-center gap-2">
                    <FaBellRing className="w-4 h-4 text-nature-600" />
                    <span className="text-sm text-gray-600">Rappels activés</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {upcomingMeets.map((meet) => (
                    <div key={meet.id}>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <MdPerson className="w-8 h-8 text-nature-600" />
                          </div>
                          <div className="ml-4">
                            <h4 className="text-sm font-medium text-gray-900">
                              {meet.pet} avec {meet.owner}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {meet.date} à {meet.time}
                            </p>
                            <p className="text-sm text-gray-500">{meet.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            meet.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {meet.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                          </span>
                        </div>
                      </div>
                      {reminders
                        .filter(reminder => reminder.meetId === meet.id)
                        .map(reminder => (
                          <div
                            key={reminder.id}
                            className="mt-2 ml-8 p-2 bg-nature-50 rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <FaClock className="w-4 h-4 text-nature-600" />
                              <span className="text-sm text-gray-900">{reminder.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 ml-6">{reminder.message}</p>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Galerie de photos */}
          <AnimatePresence>
            {showPhotoGallery && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900">Photos des rencontres</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPhotoUpload(true)}
                    className="px-4 py-2 bg-nature-600 text-white rounded-lg flex items-center"
                  >
                    <FaCamera className="w-4 h-4 mr-2" />
                    Ajouter
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {meetPhotos.map((photo) => (
                    <div key={photo.id} className="bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <p className="text-sm text-gray-900 mb-2">{photo.caption}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-gray-600">
                              <FaRegThumbsUp className="w-4 h-4" />
                              <span className="text-sm">{photo.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-600">
                              <FaComments className="w-4 h-4" />
                              <span className="text-sm">{photo.comments}</span>
                            </button>
                          </div>
                          <button className="text-gray-600">
                            <FaShare className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notation des lieux */}
          <AnimatePresence>
            {showLocationReview && selectedLocation && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 bg-white rounded-xl p-4 shadow-lg"
              >
                <h3 className="font-medium text-gray-900 mb-4">
                  Noter {selectedLocation.name}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Note
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setLocationReview({
                            ...locationReview,
                            rating: star
                          })}
                          className="text-2xl"
                        >
                          <FaStar
                            className={`w-6 h-6 ${
                              star <= locationReview.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Commentaire
                    </label>
                    <textarea
                      value={locationReview.comment}
                      onChange={(e) => setLocationReview({
                        ...locationReview,
                        comment: e.target.value
                      })}
                      className="w-full rounded-lg border-gray-300"
                      rows="3"
                      placeholder="Partagez votre expérience..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photos
                    </label>
                    <div className="flex gap-2">
                      {locationReview.photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={photo}
                            alt={`Photo ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => setLocationReview({
                              ...locationReview,
                              photos: locationReview.photos.filter((_, i) => i !== index)
                            })}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => setShowPhotoUpload(true)}
                        className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400"
                      >
                        <FaCamera className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowLocationReview(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => {
                        // Soumettre l'avis
                        setShowLocationReview(false);
                      }}
                      className="px-4 py-2 bg-nature-600 text-white rounded-lg"
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Suggestions personnalisées */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 bg-nature-50 rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Suggestions personnalisées</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Basé sur les préférences de votre animal
                    </p>
                  </div>
                  <button
                    onClick={() => setShowSuggestions(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Profil idéal</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Niveau d'activité</span>
                        <span className="text-sm font-medium text-nature-600">
                          {petPreferences.activityLevel === 'high' ? 'Élevé' : 'Modéré'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Comportement social</span>
                        <span className="text-sm font-medium text-nature-600">
                          {petPreferences.socialBehavior === 'friendly' ? 'Sociable' : 'Réservé'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Activités préférées</h4>
                    <div className="flex flex-wrap gap-2">
                      {petPreferences.favoriteActivities.map((activity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-nature-100 text-nature-600 rounded-full text-sm"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Matchmaking IA */}
          <AnimatePresence>
            {showMatchmaking && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-medium text-gray-900">Matchmaking Intelligent</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Suggestions basées sur l'IA et l'analyse comportementale
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      Compatibilité moyenne: {matchmakingStats.averageCompatibility}%
                    </span>
                    <FaRobot className="w-5 h-5 text-nature-600" />
                  </div>
                </div>

                {/* Suggestions IA */}
                <div className="mb-8">
                  <h4 className="font-medium text-gray-900 mb-4">Suggestions IA</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aiSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="bg-nature-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h5 className="font-medium text-gray-900">{suggestion.pet}</h5>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-2xl font-bold text-nature-600">
                                {suggestion.matchScore}%
                              </span>
                              <span className="text-sm text-gray-600">compatible</span>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-nature-600 text-white rounded-lg"
                          >
                            Voir profil
                          </motion.button>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Personnalité</span>
                            <span className="text-sm font-medium text-nature-600">
                              {suggestion.personalityMatch}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Activités</span>
                            <span className="text-sm font-medium text-nature-600">
                              {suggestion.activityMatch}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Social</span>
                            <span className="text-sm font-medium text-nature-600">
                              {suggestion.socialMatch}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h6 className="text-sm font-medium text-gray-900 mb-2">
                            Raisons de la compatibilité
                          </h6>
                          <ul className="space-y-1">
                            {suggestion.reasons.map((reason, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                <FaCheck className="w-4 h-4 text-green-500 mr-2" />
                                {reason}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Historique des matchs */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Historique des matchs</h4>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Total: </span>
                        <span className="font-medium text-nature-600">
                          {matchmakingStats.totalMatches}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Réussis: </span>
                        <span className="font-medium text-green-600">
                          {matchmakingStats.successfulMatches}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {matchmakingStats.matchHistory.map((match) => (
                      <div
                        key={match.id}
                        className="bg-gray-50 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-gray-900">{match.pet}</h5>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-medium text-nature-600">
                                {match.compatibility}% compatible
                              </span>
                              <span className="text-sm text-gray-500">
                                {match.date}
                              </span>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            match.status === 'successful'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {match.status === 'successful' ? 'Réussi' : 'En cours'}
                          </span>
                        </div>
                        <div className="mt-3">
                          <h6 className="text-sm font-medium text-gray-900 mb-2">
                            Facteurs de compatibilité
                          </h6>
                          <div className="flex flex-wrap gap-2">
                            {match.factors.map((factor, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-nature-100 text-nature-600 rounded-full text-xs"
                              >
                                {factor}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Suggestions IA */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 bg-nature-50 rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Suggestions IA</h3>
                <button
                  onClick={() => setShowSuggestions(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Basé sur vos préférences et l'historique de vos rencontres, nous vous suggérons ces profils compatibles.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Carte ou Grille des profils */}
        {showMap ? (
          <div className="h-[600px] mb-8">
            <MapComponent
              userLocation={userLocation}
              nearbyPets={pets}
              onSelectLocation={handleLocationSelect}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <motion.div
                key={pet.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white p-2 rounded-full shadow-lg"
                    >
                      <MdFavoriteBorder className="w-6 h-6 text-nature-600" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white p-2 rounded-full shadow-lg"
                    >
                      <FaInfoCircle className="w-6 h-6 text-nature-600" />
                    </motion.button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center gap-2 text-white">
                      <div className="flex">
                        {renderStars(pet.rating)}
                      </div>
                      <span className="text-sm">({pet.reviews})</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{pet.name}</h3>
                      <p className="text-gray-600">{pet.breed}</p>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                      <span>{pet.distance} km</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {pet.compatibility}% compatible
                    </span>
                    <span className="flex items-center text-gray-500 text-sm">
                      <MdAccessTime className="w-4 h-4 mr-1" />
                      {pet.lastActive}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{pet.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pet.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-nature-100 text-nature-600 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleContact(pet)}
                      className="flex-1 bg-nature-600 text-white py-3 rounded-xl hover:bg-nature-700 transition-colors flex items-center justify-center"
                    >
                      <FaHeart className="w-5 h-5 mr-2" />
                      Contacter
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowMap(true)}
                      className="flex-1 bg-white border border-nature-600 text-nature-600 py-3 rounded-xl hover:bg-nature-50 transition-colors flex items-center justify-center"
                    >
                      <FaCalendarAlt className="w-5 h-5 mr-2" />
                      Planifier
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
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
    </div>
  );
};

export default PetMeet; 