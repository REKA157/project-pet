import React from 'react';
import PropTypes from 'prop-types';

const DogCard = ({ name, race, humeur, lat, lon }) => {
  // Validation des coordonnées
  const isValidCoordinate = (coord) => !isNaN(coord) && coord >= -90 && coord <= 90;
  const displayLat = isValidCoordinate(lat) ? lat.toFixed(4) : 'N/A';
  const displayLon = isValidCoordinate(lon) ? lon.toFixed(4) : 'N/A';

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
      <div className="space-y-2">
        <p className="text-gray-600">
          <span className="font-semibold">Race:</span> {race}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Humeur:</span>{' '}
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {humeur}
          </span>
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Position:</span>{' '}
          <span className="text-sm">
            {displayLat}, {displayLon}
          </span>
        </p>
      </div>
    </div>
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