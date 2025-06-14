import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaDog, FaCat, FaInfoCircle } from 'react-icons/fa';
import { MdMyLocation } from 'react-icons/md';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Correction des icônes Leaflet par défaut
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const Radar = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyPets, setNearbyPets] = useState([
    {
      id: 1,
      name: 'Max',
      type: 'dog',
      breed: 'Labrador',
      distance: 0.5,
      lat: 48.8566,
      lng: 2.3522,
      lastSeen: '2024-03-20T10:30:00'
    },
    {
      id: 2,
      name: 'Luna',
      type: 'cat',
      breed: 'Siamois',
      distance: 1.2,
      lat: 48.8584,
      lng: 2.3522,
      lastSeen: '2024-03-20T11:15:00'
    }
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error('Erreur de géolocalisation:', error);
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* En-tête */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Radar des Animaux</h1>
                <p className="text-gray-600 mt-1">Localisez les animaux à proximité</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-nature-600 text-white rounded-lg hover:bg-nature-700 transition-colors"
                onClick={() => {
                  navigator.geolocation.getCurrentPosition((position) => {
                    setUserLocation({
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                    });
                  });
                }}
              >
                <MdMyLocation className="w-5 h-5 mr-2" />
                Ma position
              </motion.button>
            </div>
          </div>

          {/* Carte + Liste */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Carte */}
            <div className="lg:col-span-2 bg-gray-100 rounded-xl h-[600px] relative">
              {userLocation ? (
                <MapContainer
                  center={[userLocation.lat, userLocation.lng]}
                  zoom={13}
                  scrollWheelZoom={true}
                  className="w-full h-full rounded-xl z-0"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[userLocation.lat, userLocation.lng]}>
                    <Popup>Votre position</Popup>
                  </Marker>
                  {nearbyPets.map((pet) => (
                    <Marker key={pet.id} position={[pet.lat, pet.lng]}>
                      <Popup>
                        <strong>{pet.name}</strong><br />
                        {pet.breed} — {pet.distance} km
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500">Chargement de la carte...</p>
                </div>
              )}
            </div>

            {/* Liste animaux */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Animaux à proximité</h2>
              {nearbyPets.map((pet) => (
                <motion.div
                  key={pet.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      {pet.type === 'dog' ? (
                        <FaDog className="w-8 h-8 text-nature-600 mr-3" />
                      ) : (
                        <FaCat className="w-8 h-8 text-nature-600 mr-3" />
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{pet.name}</h3>
                        <p className="text-sm text-gray-600">{pet.breed}</p>
                      </div>
                    </div>
                    <FaInfoCircle className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                    <span>{pet.distance} km</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    Dernière vue: {new Date(pet.lastSeen).toLocaleTimeString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Radar;
