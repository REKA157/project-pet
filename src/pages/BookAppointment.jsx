import React, { useState } from 'react';

const VETS_BY_CITY = {
  Paris: [
    { name: 'Dr. Martin', slots: ['Lundi 14h', 'Mardi 9h30', 'Mercredi 16h'] },
    { name: 'Dr. Legrand', slots: ['Lundi 10h', 'Jeudi 15h', 'Vendredi 11h'] },
  ],
  Lyon: [
    { name: 'Dr. Dupont', slots: ['Mardi 11h', 'Jeudi 9h', 'Vendredi 14h'] },
    { name: 'Dr. Bernard', slots: ['Lundi 15h', 'Mercredi 10h', 'Vendredi 16h'] },
  ],
  Marseille: [
    { name: 'Dr. Garcia', slots: ['Mardi 14h', 'Jeudi 11h', 'Samedi 10h'] },
    { name: 'Dr. Moreau', slots: ['Lundi 9h', 'Mercredi 15h', 'Vendredi 13h'] },
  ],
};

const cities = Object.keys(VETS_BY_CITY);

const BookAppointment = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedVet, setSelectedVet] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const vets = selectedCity ? VETS_BY_CITY[selectedCity] : [];

  const handleConfirm = () => {
    setConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Prendre rendez-vous vétérinaire</h1>
        {/* Sélection de la ville */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Ville</label>
          <select
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCity}
            onChange={e => {
              setSelectedCity(e.target.value);
              setSelectedVet(null);
              setSelectedSlot('');
              setConfirmed(false);
            }}
          >
            <option value="">Sélectionnez une ville</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Liste des vétérinaires */}
        {selectedCity && (
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Vétérinaire</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {vets.map(vet => (
                <button
                  key={vet.name}
                  className={`p-3 rounded-lg border text-left font-medium transition-colors duration-200 ${selectedVet && selectedVet.name === vet.name ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 hover:bg-blue-50 border-gray-300 text-gray-900'}`}
                  onClick={() => {
                    setSelectedVet(vet);
                    setSelectedSlot('');
                    setConfirmed(false);
                  }}
                >
                  {vet.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Créneaux disponibles */}
        {selectedVet && (
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Créneaux disponibles</label>
            <div className="flex flex-wrap gap-3">
              {selectedVet.slots.map(slot => (
                <button
                  key={slot}
                  className={`px-4 py-2 rounded-full border font-medium transition-colors duration-200 ${selectedSlot === slot ? 'bg-green-600 text-white border-green-600' : 'bg-gray-100 hover:bg-green-50 border-gray-300 text-gray-900'}`}
                  onClick={() => {
                    setSelectedSlot(slot);
                    setConfirmed(false);
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bouton de confirmation */}
        {selectedSlot && !confirmed && (
          <div className="mb-4 text-center">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow"
              onClick={handleConfirm}
            >
              Confirmer ce rendez-vous
            </button>
          </div>
        )}

        {/* Message de confirmation */}
        {confirmed && (
          <div className="mt-4 text-center">
            <div className="text-green-600 font-bold text-lg mb-2">Rendez-vous confirmé !</div>
            <div className="text-gray-700">{selectedVet.name} - {selectedCity} <br /> {selectedSlot}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment; 