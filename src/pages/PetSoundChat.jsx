import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaMicrophone, FaPaw, FaComments, FaHeart, FaTimesCircle, FaUserCircle } from 'react-icons/fa';

function PetSoundChat() {
  const [selectedSound, setSelectedSound] = useState(null);
  const [recording, setRecording] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(0);

  const petProfiles = [
    {
      id: 1,
      name: 'Max',
      type: 'Chien',
      race: 'Golden Retriever',
      age: '3 ans',
      description: 'Joueur et énergique',
      interests: ['Balles', 'Parc', 'Natation'],
      photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Chat',
      race: 'Siamois',
      age: '2 ans',
      description: 'Calme et affectueuse',
      interests: ['Laser', 'Siestes', 'Câlins'],
      photo: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      name: 'Rocky',
      type: 'Chien',
      race: 'Berger Allemand',
      age: '4 ans',
      description: 'Sportif et protecteur',
      interests: ['Course', 'Dressage', 'Jeux'],
      photo: 'https://images.unsplash.com/photo-1553882809-a4f57e59501d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  const animalSounds = [
    { id: 1, name: 'Aboiement amical', category: 'Chien', description: 'Son joyeux et accueillant' },
    { id: 2, name: 'Miaulement doux', category: 'Chat', description: 'Expression de contentement' },
    { id: 3, name: 'Ronronnement', category: 'Chat', description: 'Signe de bien-être' },
    { id: 4, name: 'Jappement joueur', category: 'Chien', description: 'Invitation au jeu' }
  ];

  const handlePlaySound = (sound) => {
    setSelectedSound(sound);
  };

  const handleStartRecording = () => {
    setRecording(!recording);
  };

  const handleLike = () => {
    // Simulation d'un match
    if (Math.random() > 0.5) {
      alert("C'est un match ! 🎉");
    }
    setCurrentProfile((prev) => (prev + 1) % petProfiles.length);
  };

  const handlePass = () => {
    setCurrentProfile((prev) => (prev + 1) % petProfiles.length);
  };

  return (
    <div className="py-12 bg-nature-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-nature-800 mb-4">
            PetMeet - Rencontres Animales
          </h1>
          <p className="text-xl text-nature-600">
            Trouvez le compagnon idéal pour votre animal
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profils */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative">
              <img 
                src={petProfiles[currentProfile].photo} 
                alt={petProfiles[currentProfile].name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <h2 className="text-3xl font-bold mb-2">
                  {petProfiles[currentProfile].name}, {petProfiles[currentProfile].age}
                </h2>
                <p className="text-lg">{petProfiles[currentProfile].race}</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-nature-800 mb-4">{petProfiles[currentProfile].description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {petProfiles[currentProfile].interests.map((interest, index) => (
                  <span 
                    key={index}
                    className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePass}
                  className="p-4 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
                >
                  <FaTimesCircle className="w-8 h-8" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLike}
                  className="p-4 bg-rose-500 rounded-full text-white hover:bg-rose-600"
                >
                  <FaHeart className="w-8 h-8" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Communication */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Enregistrement */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <FaMicrophone className="text-2xl text-nature-600 mr-2" />
                <h2 className="text-2xl font-semibold text-nature-800">Envoyer un Message Vocal</h2>
              </div>
              <div className="text-center py-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartRecording}
                  className={`p-8 rounded-full ${
                    recording ? 'bg-rose-500' : 'bg-nature-600'
                  } text-white shadow-lg hover:shadow-xl transition-all`}
                >
                  <FaMicrophone className="text-4xl" />
                </motion.button>
                <p className="mt-4 text-nature-600">
                  {recording ? 'Enregistrement en cours...' : 'Enregistrez un message pour ' + petProfiles[currentProfile].name}
                </p>
              </div>
            </div>

            {/* Sons Prédéfinis */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <FaPaw className="text-2xl text-nature-600 mr-2" />
                <h2 className="text-2xl font-semibold text-nature-800">Sons Expressifs</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {animalSounds
                  .filter(sound => sound.category === petProfiles[currentProfile].type)
                  .map((sound) => (
                    <motion.button
                      key={sound.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 border border-nature-200 rounded-lg hover:border-nature-500 transition-colors text-left"
                      onClick={() => handlePlaySound(sound)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-nature-800">{sound.name}</span>
                        <FaPlay className="text-nature-600" />
                      </div>
                      <p className="text-sm text-nature-600 mt-1">{sound.description}</p>
                    </motion.button>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section Premium */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 bg-gradient-to-r from-nature-600 to-rose-600 rounded-xl shadow-lg p-8 text-white"
        >
          <h2 className="text-2xl font-semibold mb-4">PetMeet Premium</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-medium mb-2">Matchs Illimités</h3>
              <p className="text-sm opacity-90">Plus de limites pour trouver l'âme sœur</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-medium mb-2">Messages Vocaux HD</h3>
              <p className="text-sm opacity-90">Qualité sonore optimale pour les échanges</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-medium mb-2">Traduction Avancée</h3>
              <p className="text-sm opacity-90">Comprenez tous les sons de votre animal</p>
            </div>
          </div>
          <button className="mt-6 bg-white text-nature-600 px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors">
            Passer en Premium
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default PetSoundChat;