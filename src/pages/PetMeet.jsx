import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaMapMarkerAlt, FaCalendarAlt, FaFilter, FaSearch, FaMap } from 'react-icons/fa';
import { MdPets, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
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
    { id: 'all', label: 'Tous' },
    { id: 'dogs', label: 'Chiens' },
    { id: 'cats', label: 'Chats' },
    { id: 'nearby', label: 'À proximité' }
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
      interests: ['Jeux', 'Promenades', 'Socialisation']
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
      interests: ['Câlins', 'Jeux d\'intérieur', 'Repos']
    }
  ];

  const handleContact = (pet) => {
    setSelectedPet(pet);
    setIsChatOpen(true);
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
                  <FaFilter className="w-4 h-4 mr-2" />
                  {filter.label}
                </motion.button>
              ))}
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
            </div>
          </div>
        </div>

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
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg"
                  >
                    <MdFavoriteBorder className="w-6 h-6 text-nature-600" />
                  </motion.button>
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