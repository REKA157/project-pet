import React from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaCalendarAlt, FaUserMd, FaGraduationCap, FaExternalLinkAlt, FaHeart, FaArrowRight, FaUsers } from 'react-icons/fa';
import { MdPets, MdForum, MdHealthAndSafety, MdSecurity } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ExternalLink from '../components/ExternalLink';
import AIFeatures from '../components/AIFeatures';
import { useNavigate } from 'react-router-dom';

function Home() {
  const services = [
    { 
      icon: <FaVideo className="w-8 h-8" />, 
      title: 'Téléconsultation', 
      description: 'Consultez un vétérinaire en ligne',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      icon: <FaCalendarAlt className="w-8 h-8" />, 
      title: 'Rendez-vous', 
      description: 'Planifiez vos visites',
      color: 'from-green-500 to-green-600'
    },
    { 
      icon: <MdPets className="w-8 h-8" />, 
      title: 'Dossier médical', 
      description: 'Accédez au dossier de votre animal',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      icon: <FaHeart className="w-8 h-8" />, 
      title: 'PetMeet', 
      description: 'Rencontres pour animaux de compagnie',
      color: 'from-rose-500 to-rose-600'
    }
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-nature-700 via-nature-800 to-nature-900 text-white py-40 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-10 bg-cover bg-center animate-subtle-zoom"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-nature-900/50 to-nature-900/80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-primary">
              Un animal heureux, un animal compris.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              VetCare vous aide à suivre la santé de votre compagnon, comprendre ses émotions avec PetSense et lui faire rencontrer des amis compatibles grâce à PetMeet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={() => navigate('/app/petsense')}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Lancer PetSense
              </button>
              <button
                onClick={() => navigate('/app/petmeet')}
                className="px-8 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors"
              >
                Explorer PetMeet
              </button>
              <button
                onClick={() => navigate('/app/veterinaires')}
                className="px-8 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
              >
                Trouver un vétérinaire
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-40 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-block mb-6"
            >
              <span className="bg-nature-50 text-nature-700 px-6 py-3 rounded-full text-sm font-medium tracking-wide uppercase">
                Nos Services
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-5xl font-bold text-gray-900 mb-6 tracking-tight"
            >
              Solutions adaptées à vos besoins
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="text-2xl text-gray-600 max-w-3xl mx-auto font-light"
            >
              Une gamme complète de services pour prendre soin de votre animal
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="group relative bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className={`text-5xl mb-8 bg-gradient-to-r ${service.color} text-transparent bg-clip-text transform group-hover:scale-110 transition-transform duration-500`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Features Section */}
      <div className="py-40 bg-gradient-to-b from-gray-50 to-white">
        <AIFeatures />
      </div>

      {/* PetMeet Promo Section */}
      <div className="py-40 bg-gradient-to-br from-rose-50 via-rose-100 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-block"
              >
                <span className="bg-rose-100 text-rose-700 px-6 py-3 rounded-full text-sm font-medium tracking-wide uppercase">
                  PetMeet
                </span>
              </motion.div>
              <h2 className="text-6xl font-bold text-rose-900 leading-tight tracking-tight">
                Découvrez une nouvelle façon de connecter les animaux
              </h2>
              <p className="text-2xl text-rose-700 leading-relaxed font-light">
                Une plateforme innovante qui permet à votre animal de trouver le compagnon idéal 
                et de créer des liens uniques grâce à notre technologie de communication avancée.
              </p>
              <ul className="space-y-8">
                <motion.li 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="flex items-center text-rose-800 text-xl"
                >
                  <div className="bg-rose-100 p-4 rounded-full mr-6 transform group-hover:scale-110 transition-transform duration-500">
                    <FaHeart className="w-8 h-8 text-rose-500" />
                  </div>
                  <span>Matchmaking intelligent</span>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="flex items-center text-rose-800 text-xl"
                >
                  <div className="bg-rose-100 p-4 rounded-full mr-6 transform group-hover:scale-110 transition-transform duration-500">
                    <MdPets className="w-8 h-8 text-rose-500" />
                  </div>
                  <span>Communication par sons</span>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  className="flex items-center text-rose-800 text-xl"
                >
                  <div className="bg-rose-100 p-4 rounded-full mr-6 transform group-hover:scale-110 transition-transform duration-500">
                    <MdSecurity className="w-8 h-8 text-rose-500" />
                  </div>
                  <span>Rencontres sécurisées</span>
                </motion.li>
              </ul>
              <Link to="/pet-sound-chat">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-white px-10 py-5 rounded-full font-semibold hover:from-rose-600 hover:via-rose-700 hover:to-rose-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3 text-lg"
                >
                  <span>Essayer PetMeet</span>
                  <FaArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
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
    </div>
  );
}

export default Home;