import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaStethoscope, FaCalendarAlt, FaHospital, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

function Services() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      icon: <FaVideo />,
      title: 'Téléconsultation',
      description: 'Consultez un vétérinaire en ligne depuis le confort de votre maison',
      price: 'À partir de 45€',
      details: {
        duration: '30 minutes',
        availability: '7j/7, 8h-22h',
        included: [
          'Consultation vidéo HD',
          'Ordonnance électronique',
          'Suivi post-consultation',
          'Accès au dossier médical'
        ]
      }
    },
    {
      icon: <FaStethoscope />,
      title: 'Consultation en clinique',
      description: 'Rendez-vous en personne avec nos vétérinaires expérimentés',
      price: 'À partir de 55€',
      details: {
        duration: '45 minutes',
        availability: 'Lun-Sam, 9h-19h',
        included: [
          'Examen complet',
          'Vaccinations',
          'Prescriptions',
          'Conseils personnalisés'
        ]
      }
    },
    {
      icon: <FaCalendarAlt />,
      title: 'Suivi régulier',
      description: 'Programme de suivi personnalisé pour votre animal',
      price: 'À partir de 35€/mois',
      details: {
        duration: 'Mensuel',
        availability: 'Sur rendez-vous',
        included: [
          'Bilans de santé',
          'Rappels vaccins',
          'Conseils nutrition',
          'Support prioritaire'
        ]
      }
    },
    {
      icon: <FaHospital />,
      title: 'Urgences',
      description: 'Service d\'urgence disponible 24/7',
      price: 'Sur devis',
      details: {
        duration: 'Variable',
        availability: '24h/24, 7j/7',
        included: [
          'Prise en charge immédiate',
          'Équipement spécialisé',
          'Surveillance continue',
          'Transport médicalisé'
        ]
      }
    }
  ];

  const ServiceModal = ({ service, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl max-w-lg w-full p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center text-gray-600">
            <FaClock className="w-5 h-5 mr-2" />
            <span>Durée : {service.details.duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="w-5 h-5 mr-2" />
            <span>Disponibilité : {service.details.availability}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-semibold mb-2">Ce service inclut :</h4>
            <ul className="space-y-2">
              {service.details.included.map((item, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-gray-900">{service.price}</span>
              <button className="bg-nature-600 text-white px-6 py-2 rounded-full hover:bg-nature-700 transition-colors">
                Réserver
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Nos Services Vétérinaires
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Des solutions adaptées à tous vos besoins
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="text-nature-600 text-3xl mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-nature-600 font-semibold">{service.price}</p>
              <button className="mt-4 w-full bg-nature-600 text-white py-2 rounded-md hover:bg-nature-700 transition-colors">
                En savoir plus
              </button>
            </motion.div>
          ))}
        </div>

        {selectedService && (
          <ServiceModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </div>
    </div>
  );
}

export default Services;