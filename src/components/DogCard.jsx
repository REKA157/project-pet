import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaDog, FaMapMarkerAlt, FaHeart, FaInfoCircle } from 'react-icons/fa';

const DogCard = ({ name, race, humeur, lat, lon }) => {
  // Validation des coordonnées
  const isValidCoordinate = (coord) => !isNaN(coord) && coord >= -90 && coord <= 90;
  const displayLat = isValidCoordinate(lat) ? lat.toFixed(4) : 'N/A';
  const displayLon = isValidCoordinate(lon) ? lon.toFixed(4) : 'N/A';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-4 hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FaDog className="h-8 w-8 text-nature-600" />
          </motion.div>
          <h3 className="ml-3 text-2xl font-bold text-gray-800">{name}</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-nature-600 hover:text-nature-700"
        >
          <FaInfoCircle className="h-6 w-6" />
        </motion.button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <FaDog className="h-5 w-5 text-nature-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Race</p>
            <p className="text-gray-800 font-medium">{race}</p>
          </div>
        </div>

        <div className="flex items-center">
          <FaHeart className="h-5 w-5 text-red-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Humeur</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              {humeur}
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <FaMapMarkerAlt className="h-5 w-5 text-blue-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Position</p>
            <p className="text-gray-800 font-medium">
              {displayLat}, {displayLon}
            </p>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 w-full bg-nature-600 text-white py-2 rounded-lg hover:bg-nature-700 transition-colors flex items-center justify-center"
      >
        <FaHeart className="mr-2" />
        Voir le profil
      </motion.button>
    </motion.div>
  );
};

DogCard.propTypes = {
  name: PropTypes.string.isRequired,
  race: PropTypes.string.isRequired,
  humeur: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};

export default DogCard; 