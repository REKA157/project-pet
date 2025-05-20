import React from 'react';
import { FaUserMd } from 'react-icons/fa';
import { motion } from 'framer-motion';

function EmergencyButton() {
  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
      onClick={() => alert('Service d\'urgence - Fonctionnalité à venir')}
    >
      <FaUserMd className="w-5 h-5" />
      <span>Urgence</span>
    </motion.button>
  );
}

export default EmergencyButton;