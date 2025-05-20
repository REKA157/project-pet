import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaBrain, FaChartLine, FaShieldAlt, FaComments, FaPaw } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function AIFeatures() {
  const aiFeatures = [
    {
      icon: <FaComments />,
      title: 'Traduction Animal-Humain',
      description: 'Notre IA analyse les sons et comportements de votre animal pour faciliter la communication',
      examples: [
        'Détection des émotions',
        'Analyse des vocalisations',
        'Interprétation comportementale'
      ],
      link: '/pet-sound-chat'
    },
    {
      icon: <FaChartLine />,
      title: 'Analyse Prédictive de Santé',
      description: 'Prévention et détection précoce des problèmes de santé grâce à l\'IA',
      examples: [
        'Prédiction des risques de santé',
        'Rappels de soins personnalisés',
        'Suivi nutritionnel intelligent'
      ],
      link: '/services'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Modération Automatique',
      description: 'Protection de la communauté par IA pour des échanges sûrs et pertinents',
      examples: [
        'Filtrage du contenu inapproprié',
        'Détection des spams',
        'Validation des conseils médicaux'
      ],
      link: '/community'
    },
    {
      icon: <FaPaw />,
      title: 'Matchmaking Intelligent',
      description: 'Algorithme d\'IA pour des rencontres optimales entre animaux',
      examples: [
        'Analyse de compatibilité',
        'Suggestions personnalisées',
        'Optimisation des rencontres'
      ],
      link: '/pet-sound-chat'
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center bg-nature-100 text-nature-800 px-4 py-1 rounded-full mb-4"
          >
            <FaRobot className="mr-2" />
            <span>Propulsé par l'IA</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Intelligence Artificielle au Service des Animaux
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600"
          >
            Des solutions innovantes pour améliorer le bien-être de vos compagnons
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="text-nature-600 text-3xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.examples.map((example, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-500">
                    <FaBrain className="text-nature-500 mr-2" />
                    {example}
                  </li>
                ))}
              </ul>
              <Link to={feature.link}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 w-full bg-nature-600 text-white py-2 rounded-md hover:bg-nature-700 transition-colors"
                >
                  En savoir plus
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-nature-600 to-rose-600 rounded-xl shadow-lg p-8 text-white"
        >
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">
              Découvrez la Puissance de l'IA
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Notre technologie d'IA s'améliore continuellement pour offrir une expérience toujours plus personnalisée
            </p>
            <Link to="/services">
              <button className="bg-white text-nature-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
                Essayer Maintenant
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AIFeatures;