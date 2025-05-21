import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaPaw, FaEdit, FaCamera, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('info');
  const userEmail = localStorage.getItem('userEmail');

  const pets = [
    {
      id: 1,
      name: 'Max',
      type: 'Chien',
      breed: 'Labrador',
      age: 3,
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Chat',
      breed: 'Siamois',
      age: 2,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* En-tête du profil */}
          <div className="relative h-48 bg-nature-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-0 right-0 bg-nature-600 text-white p-2 rounded-full shadow-lg"
                >
                  <FaCamera className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Informations du profil */}
          <div className="pt-20 pb-8 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Jean Dupont</h1>
                <p className="text-gray-600 mt-1">{userEmail}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-nature-600 text-white rounded-lg hover:bg-nature-700 transition-colors"
              >
                <FaEdit className="w-5 h-5 mr-2" />
                Modifier le profil
              </motion.button>
            </div>

            {/* Onglets */}
            <div className="mt-8 border-b border-gray-200">
              <nav className="flex space-x-8">
                {['info', 'pets', 'appointments'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-nature-600 text-nature-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab === 'info' && <FaUser className="inline-block mr-2" />}
                    {tab === 'pets' && <MdPets className="inline-block mr-2" />}
                    {tab === 'appointments' && <FaCalendarAlt className="inline-block mr-2" />}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contenu des onglets */}
            <div className="mt-8">
              {activeTab === 'info' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="w-5 h-5 text-nature-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Adresse</p>
                        <p className="text-gray-900">123 Rue des Animaux, Paris</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="w-5 h-5 text-nature-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Téléphone</p>
                        <p className="text-gray-900">+33 6 12 34 56 78</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="w-5 h-5 text-nature-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-900">{userEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pets' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pets.map((pet) => (
                    <motion.div
                      key={pet.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={pet.image}
                          alt={pet.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
                            <p className="text-gray-600">{pet.breed}</p>
                          </div>
                          <FaPaw className="w-6 h-6 text-nature-600" />
                        </div>
                        <div className="mt-4 space-y-2">
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Type:</span> {pet.type}
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Âge:</span> {pet.age} ans
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-4 w-full bg-nature-600 text-white py-2 rounded-lg hover:bg-nature-700 transition-colors"
                        >
                          Voir le profil
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'appointments' && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Aucun rendez-vous à venir</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile; 