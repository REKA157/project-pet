import React from 'react';
import { motion } from 'framer-motion';

function ExternalLink({ url, children }) {
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors flex items-center space-x-2"
    >
      {children}
    </motion.button>
  );
}

export default ExternalLink;