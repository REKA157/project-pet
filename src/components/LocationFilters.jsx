import React from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaDog, FaParking, FaWater, FaUmbrellaBeach, FaShower } from 'react-icons/fa';

const LocationFilters = ({ activeFilters, onFilterChange }) => {
  const filterOptions = [
    { id: 'all', label: 'Tous', icon: FaFilter },
    { id: 'dog_park', label: 'Parcs canins', icon: FaDog },
    { id: 'park', label: 'Parcs publics', icon: FaParking },
    { id: 'water', label: 'Point d\'eau', icon: FaWater },
    { id: 'shade', label: 'Zone ombragée', icon: FaUmbrellaBeach },
    { id: 'shower', label: 'Douche', icon: FaShower }
  ];

  const ratingOptions = [
    { id: 'all', label: 'Toutes les notes' },
    { id: '4+', label: '4★ et plus' },
    { id: '3+', label: '3★ et plus' },
    { id: '2+', label: '2★ et plus' }
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-lg mb-4">
      <div className="space-y-4">
        {/* Filtres de type */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Type de lieu</h3>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onFilterChange('type', filter.id)}
                className={`px-3 py-2 rounded-lg flex items-center text-sm ${
                  activeFilters.type === filter.id
                    ? 'bg-nature-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <filter.icon className="w-4 h-4 mr-2" />
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Filtres de note */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Note minimale</h3>
          <div className="flex flex-wrap gap-2">
            {ratingOptions.map((rating) => (
              <motion.button
                key={rating.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onFilterChange('rating', rating.id)}
                className={`px-3 py-2 rounded-lg text-sm ${
                  activeFilters.rating === rating.id
                    ? 'bg-nature-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {rating.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Filtres de distance */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Distance maximale</h3>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="10"
              value={activeFilters.distance}
              onChange={(e) => onFilterChange('distance', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-gray-600">{activeFilters.distance} km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationFilters; 