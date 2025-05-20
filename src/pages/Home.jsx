import React from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaCalendarAlt, FaUserMd, FaGraduationCap, FaExternalLinkAlt, FaHeart } from 'react-icons/fa';
import { MdPets, MdForum } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ExternalLink from '../components/ExternalLink';
import AIFeatures from '../components/AIFeatures';

function Home() {
  const services = [
    { icon: <FaVideo className="w-8 h-8" />, title: 'Téléconsultation', description: 'Consultez un vétérinaire en ligne' },
    { icon: <FaCalendarAlt className="w-8 h-8" />, title: 'Rendez-vous', description: 'Planifiez vos visites' },
    { icon: <MdPets className="w-8 h-8" />, title: 'Dossier médical', description: 'Accédez au dossier de votre animal' },
    { icon: <FaHeart className="w-8 h-8" />, title: 'PetMeet', description: 'Rencontres pour animaux de compagnie' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-nature-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-4"
            >
              Des soins vétérinaires innovants pour votre animal
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-nature-200 mb-8"
            >
              Accédez à des services vétérinaires de qualité, en présentiel ou à distance
            </motion.p>
            <div className="flex justify-center space-x-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-nature-700 px-8 py-3 rounded-full font-semibold hover:bg-nature-50 transition-colors"
              >
                Commencer
              </motion.button>
              <Link to="/pet-sound-chat">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-600 transition-colors flex items-center space-x-2"
                >
                  <FaHeart className="w-5 h-5" />
                  <span>Découvrir PetMeet</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Nos Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="text-nature-600 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Features Section */}
      <AIFeatures />

      {/* PetMeet Promo Section */}
      <div className="bg-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-rose-900">
                Découvrez PetMeet
              </h2>
              <p className="text-lg text-rose-700">
                Une nouvelle façon de connecter les animaux de compagnie. Trouvez le compagnon idéal pour votre animal et créez des liens uniques grâce à notre technologie de communication innovante.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-rose-800">
                  <FaHeart className="w-5 h-5 mr-2 text-rose-500" />
                  Matchmaking intelligent
                </li>
                <li className="flex items-center text-rose-800">
                  <MdPets className="w-5 h-5 mr-2 text-rose-500" />
                  Communication par sons
                </li>
                <li className="flex items-center text-rose-800">
                  <MdForum className="w-5 h-5 mr-2 text-rose-500" />
                  Rencontres sécurisées
                </li>
              </ul>
              <Link to="/pet-sound-chat">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-600 transition-colors mt-4"
                >
                  Essayer PetMeet
                </motion.button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt="Animaux jouant ensemble"
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Pourquoi choisir VetCare ?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h3 className="text-xl font-semibold mb-3">Accès 24/7</h3>
              <p className="text-gray-600">
                Une équipe de vétérinaires disponible à tout moment pour répondre à vos besoins
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h3 className="text-xl font-semibold mb-3">Suivi personnalisé</h3>
              <p className="text-gray-600">
                Un dossier médical complet et des rappels pour les vaccins et traitements
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h3 className="text-xl font-semibold mb-3">Communauté active</h3>
              <p className="text-gray-600">
                Échangez avec d'autres propriétaires et partagez vos expériences
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;