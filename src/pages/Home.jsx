import React from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaCalendarAlt, FaUserMd, FaGraduationCap, FaExternalLinkAlt, FaHeart, FaArrowRight, FaUsers } from 'react-icons/fa';
import { MdPets, MdForum, MdHealthAndSafety, MdSecurity } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ExternalLink from '../components/ExternalLink';
import AIFeatures from '../components/AIFeatures';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

function Home() {
  const navigate = useNavigate();

  const services = useMemo(() => [
    { 
      icon: <FaVideo className="w-8 h-8" />, 
      title: "Téléconsultation", 
      description: "Consultez un vétérinaire à distance pour des conseils rapides et pratiques.",
      color: 'from-blue-500 to-blue-600'
    },
    { 
      icon: <FaCalendarAlt className="w-8 h-8" />, 
      title: "Rendez-vous", 
      description: "Planifiez et gérez facilement tous les rendez-vous médicaux de votre animal.",
      color: 'from-green-500 to-green-600'
    },
    { 
      icon: <MdPets className="w-8 h-8" />, 
      title: "Dossier Médical", 
      description: "Accédez au dossier de santé complet de votre compagnon à tout moment.",
      color: 'from-purple-500 to-purple-600'
    },
    { 
      icon: <FaHeart className="w-8 h-8" />, 
      title: "PetMeet", 
      description: "Connectez avec d'autres propriétaires d'animaux près de chez vous.",
      color: 'from-rose-500 to-rose-600'
    }
  ], []);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-green-50 py-12 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left column - Cat Illustration */}
            <div className="flex-1 relative">
              <div className="w-full h-auto">
                <img 
                  src="/images/cat_illustration.png" 
                  alt="Illustration de chat" 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Center column - Text and buttons */}
            <div className="w-full max-w-xl mx-auto text-center space-y-4 px-2 md:w-1/2 lg:w-2/3 md:text-left md:space-y-6">
              <h1 className="text-3xl md:text-6xl font-bold text-primary leading-tight">
                Un animal heureux<br/>Un animal compris
              </h1>
              <p className="text-base md:text-xl text-black break-words whitespace-pre-line">
                Découvrez PetPulse, votre plateforme tout-en-un pour le bien-être de votre animal de compagnie.\nGérez sa santé, son bonheur et sa vie sociale en un seul endroit.
              </p>
              <div className="flex flex-col gap-3 md:gap-4 justify-center md:justify-start mt-6 w-full max-w-xl mx-auto">
                <motion.button
                  onClick={() => navigate('/app/dashboard?tab=translator')}
                  className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <span>PetSense</span>
                </motion.button>
                <motion.button
                  onClick={() => navigate('/app/dashboard?tab=petmeet')}
                  className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <span>Explorer PetMeet</span>
                </motion.button>
                <motion.button
                  onClick={() => navigate('/app/veterinaires')}
                  className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <span>Trouver un vétérinaire</span>
                </motion.button>
              </div>
            </div>
            
            {/* Right column - Dog Illustration */}
            <div className="flex-1 relative">
              <div className="w-full h-auto">
                <img 
                  src="/images/pets-illustration.png" 
                  alt="Illustration de chien et chat" 
                  className="w-full h-auto object-contain"
                />
              </div>
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
              Pourquoi choisir PetPulse ?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="text-2xl text-gray-600 max-w-3xl mx-auto font-light"
            >
              PetPulse offre une gamme complète de services pour prendre soin de votre compagnon à quatre pattes.
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
                  Découvrez PetMeet
                </span>
              </motion.div>
              <h2 className="text-6xl font-bold text-rose-900 leading-tight tracking-tight">
                Connectez avec d'autres passionnés d'animaux
              </h2>
              <p className="text-2xl text-rose-700 leading-relaxed font-light">
                PetMeet est la plateforme idéale pour rencontrer d'autres propriétaires, partager des expériences et organiser des rencontres pour vos compagnons.
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
                  <span>Rencontrez d'autres propriétaires d'animaux</span>
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
                  <span>Organisez des jeux et des promenades</span>
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
                  <span>Un environnement sûr et bienveillant</span>
                </motion.li>
              </ul>
              <Link to="/app/dashboard?tab=petmeet">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-white px-10 py-5 rounded-full font-semibold hover:from-rose-600 hover:via-rose-700 hover:to-rose-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3 text-lg"
                >
                  <span>Découvrir PetMeet</span>
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
                  src="xhttps://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
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