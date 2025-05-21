import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaDirections, FaStar, FaDog, FaParking, FaFilter, FaShare } from 'react-icons/fa';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';
import LocationFilters from './LocationFilters';
import LocationReviews from './LocationReviews';
import ShareLocation from './ShareLocation';
import DirectionsPanel from './DirectionsPanel';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1rem'
};

const defaultCenter = {
  lat: 48.8566,
  lng: 2.3522
};

const MapComponent = ({ userLocation, nearbyPets, onSelectLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [directions, setDirections] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    type: 'all',
    rating: 'all',
    distance: 5
  });
  const [suggestedLocations] = useState([
    {
      id: 1,
      name: 'Parc des Animaux',
      type: 'park',
      address: '123 Avenue des Animaux, Paris',
      rating: 4.5,
      distance: 0.8,
      coordinates: { lat: 48.8566, lng: 2.3522 },
      amenities: ['Parking', 'Eau potable', 'Zone ombragée'],
      photos: ['https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
      reviews: []
    },
    {
      id: 2,
      name: 'Jardin Canin',
      type: 'dog_park',
      address: '45 Rue des Chiens, Paris',
      rating: 4.8,
      distance: 1.2,
      coordinates: { lat: 48.8584, lng: 2.3522 },
      amenities: ['Clôture', 'Agility', 'Douche'],
      photos: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
      reviews: []
    }
  ]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    onSelectLocation(location);
    if (map) {
      map.panTo(location.coordinates);
      map.setZoom(15);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAddReview = (review) => {
    if (selectedLocation) {
      const updatedLocation = {
        ...selectedLocation,
        reviews: [...selectedLocation.reviews, review]
      };
      setSelectedLocation(updatedLocation);
    }
  };

  const getMarkerIcon = (type) => {
    return {
      url: type === 'park' ? '/park-icon.png' : '/dog-park-icon.png',
      scaledSize: new window.google.maps.Size(40, 40)
    };
  };

  const filteredLocations = suggestedLocations.filter(location => {
    if (activeFilters.type !== 'all' && location.type !== activeFilters.type) return false;
    if (activeFilters.rating !== 'all') {
      const minRating = parseInt(activeFilters.rating);
      if (location.rating < minRating) return false;
    }
    if (location.distance > activeFilters.distance) return false;
    return true;
  });

  const handleShare = (shareData) => {
    console.log('Partage de position:', shareData);
    // Implémenter la logique de partage ici
  };

  const handleDirections = (directionsResult) => {
    setDirections(directionsResult);
  };

  if (!isLoaded) {
    return (
      <div className="bg-gray-100 rounded-xl h-full flex items-center justify-center">
        <p className="text-gray-500">Chargement de la carte...</p>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || defaultCenter}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          disableDefaultUI: true,
          zoomControl: true
        }}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: '/user-location-icon.png',
              scaledSize: new window.google.maps.Size(40, 40)
            }}
          />
        )}
        
        {filteredLocations.map((location) => (
          <Marker
            key={location.id}
            position={location.coordinates}
            icon={getMarkerIcon(location.type)}
            onClick={() => handleLocationSelect(location)}
          />
        ))}

        {selectedLocation && (
          <InfoWindow
            position={selectedLocation.coordinates}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-semibold text-gray-900">{selectedLocation.name}</h3>
              <p className="text-sm text-gray-600">{selectedLocation.address}</p>
              <div className="flex items-center mt-1">
                <FaStar className="text-yellow-400 w-4 h-4" />
                <span className="text-sm text-gray-600 ml-1">{selectedLocation.rating}</span>
              </div>
            </div>
          </InfoWindow>
        )}

        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      {/* Boutons d'action */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className="bg-white p-3 rounded-full shadow-lg"
        >
          <FaFilter className="w-5 h-5 text-nature-600" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowShare(!showShare)}
          className="bg-white p-3 rounded-full shadow-lg"
        >
          <FaShare className="w-5 h-5 text-nature-600" />
        </motion.button>
      </div>

      {/* Panneau des filtres */}
      {showFilters && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="absolute top-4 right-4 w-80"
        >
          <LocationFilters
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
        </motion.div>
      )}

      {/* Panneau de partage */}
      {showShare && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="absolute top-4 right-4 w-80"
        >
          <ShareLocation
            userLocation={userLocation}
            onShare={handleShare}
          />
        </motion.div>
      )}

      {/* Panneau des directions */}
      {showDirections && selectedLocation && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="absolute top-4 right-4 w-80"
        >
          <DirectionsPanel
            userLocation={userLocation}
            destination={selectedLocation}
            onClose={() => setShowDirections(false)}
          />
        </motion.div>
      )}

      {/* Liste des lieux suggérés */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lieux de rencontre suggérés</h3>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {filteredLocations.map((location) => (
            <motion.div
              key={location.id}
              whileHover={{ scale: 1.02 }}
              className={`p-3 rounded-xl border ${
                selectedLocation?.id === location.id
                  ? 'border-nature-600 bg-nature-50'
                  : 'border-gray-200 hover:border-nature-300'
              }`}
              onClick={() => handleLocationSelect(location)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{location.name}</h4>
                  <p className="text-sm text-gray-500">{location.address}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                  <span>{location.distance} km</span>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-nature-600">
                    ★ {location.rating}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">
                    ({location.type === 'park' ? 'Parc public' : 'Parc canin'})
                  </span>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDirections(true);
                    }}
                    className="text-nature-600 hover:text-nature-700"
                  >
                    <FaDirections className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {location.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Panneau des avis */}
      {selectedLocation && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          className="absolute top-0 left-0 right-0 h-1/2 bg-white rounded-b-2xl shadow-lg overflow-y-auto"
        >
          <LocationReviews
            location={selectedLocation}
            onAddReview={handleAddReview}
          />
        </motion.div>
      )}
    </div>
  );
};

export default MapComponent; 