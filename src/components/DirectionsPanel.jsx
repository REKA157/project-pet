import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDirections, FaWalking, FaCar, FaBicycle, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const DirectionsPanel = ({ userLocation, destination, onClose }) => {
  const [transportMode, setTransportMode] = useState('driving');
  const [directions, setDirections] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const transportModes = [
    { id: 'driving', label: 'Voiture', icon: FaCar },
    { id: 'walking', label: 'À pied', icon: FaWalking },
    { id: 'bicycling', label: 'Vélo', icon: FaBicycle }
  ];

  const getDirections = async () => {
    setIsLoading(true);
    try {
      const directionsService = new window.google.maps.DirectionsService();
      const result = await directionsService.route({
        origin: userLocation,
        destination: destination.coordinates,
        travelMode: window.google.maps.TravelMode[transportMode.toUpperCase()]
      });
      setDirections(result);
    } catch (error) {
      console.error('Erreur lors de la recherche d\'itinéraire:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Itinéraire</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </motion.button>
      </div>

      <div className="space-y-4">
        {/* Mode de transport */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mode de transport
          </label>
          <div className="flex gap-2">
            {transportModes.map((mode) => (
              <motion.button
                key={mode.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTransportMode(mode.id)}
                className={`px-3 py-2 rounded-lg flex items-center text-sm ${
                  transportMode === mode.id
                    ? 'bg-nature-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <mode.icon className="w-4 h-4 mr-2" />
                {mode.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Détails de l'itinéraire */}
        {directions && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <FaClock className="w-4 h-4 mr-2" />
                <span>{directions.routes[0].legs[0].duration.text}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                <span>{directions.routes[0].legs[0].distance.text}</span>
              </div>
            </div>

            <div className="space-y-2">
              {directions.routes[0].legs[0].steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-nature-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-nature-600 font-medium">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-gray-900">{step.instructions}</p>
                    <p className="text-gray-500">{step.distance.text} - {step.duration.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bouton de recherche */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={getDirections}
          disabled={isLoading}
          className={`w-full py-3 rounded-lg flex items-center justify-center ${
            isLoading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-nature-600 text-white hover:bg-nature-700'
          }`}
        >
          <FaDirections className="w-5 h-5 mr-2" />
          {isLoading ? 'Recherche en cours...' : 'Rechercher l\'itinéraire'}
        </motion.button>
      </div>
    </div>
  );
};

export default DirectionsPanel; 