import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaVideo, FaHospital, FaStethoscope, FaPhone } from 'react-icons/fa';
import { MdHealthAndSafety, MdEmergency } from 'react-icons/md';

const Health = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'teleconsultation',
      title: 'Téléconsultation',
      icon: <FaVideo className="w-8 h-8" />,
      description: 'Consultation vétérinaire en ligne',
      price: '45€',
      duration: '30 min',
      features: [
        'Consultation vidéo en direct',
        'Diagnostic préliminaire',
        'Conseils personnalisés',
        'Ordonnance électronique'
      ]
    },
    {
      id: 'consultation',
      title: 'Consultation en clinique',
      icon: <FaHospital className="w-8 h-8" />,
      description: 'Rendez-vous en cabinet vétérinaire',
      price: '65€',
      duration: '45 min',
      features: [
        'Examen physique complet',
        'Vaccinations',
        'Analyses de base',
        'Conseils nutritionnels'
      ]
    },
    {
      id: 'suivi',
      title: 'Suivi régulier',
      icon: <FaStethoscope className="w-8 h-8" />,
      description: 'Programme de suivi personnalisé',
      price: '35€',
      duration: '20 min',
      features: [
        'Suivi de l\'état de santé',
        'Contrôle des constantes',
        'Ajustement du traitement',
        'Conseils de prévention'
      ]
    },
    {
      id: 'urgence',
      title: 'Service d\'urgence',
      icon: <MdEmergency className="w-8 h-8" />,
      description: 'Assistance vétérinaire 24/7',
      price: 'Sur devis',
      duration: 'Immédiat',
      features: [
        'Disponible 24h/24',
        'Intervention rapide',
        'Équipe d\'urgence',
        'Transport si nécessaire'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Services Vétérinaires</h1>
          <p className="text-xl text-gray-600">Des soins professionnels pour vos animaux</p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-nature-100 rounded-lg text-nature-600">
                    {service.icon}
                  </div>
                  <span className="text-2xl font-bold text-nature-600">{service.price}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <MdHealthAndSafety className="w-4 h-4 text-nature-600 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedService(service)}
                  className="mt-6 w-full bg-nature-600 text-white py-2 rounded-lg hover:bg-nature-700 transition-colors flex items-center justify-center"
                >
                  <FaCalendarAlt className="w-5 h-5 mr-2" />
                  Prendre rendez-vous
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section d'urgence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-red-50 rounded-2xl p-8 border border-red-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-red-900 mb-2">Urgence Vétérinaire ?</h2>
              <p className="text-red-700">Notre équipe est disponible 24h/24 pour vous aider</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <FaPhone className="w-5 h-5 mr-2" />
              Appeler maintenant
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Health; 