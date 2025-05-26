import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPECIALTIES = [
  'Généraliste',
  'Nutrition',
  'Comportement',
];

const VETS_BY_SPECIALTY = {
  Généraliste: [
    {
      name: 'Dr. Martin',
      specialty: 'Généraliste',
      duration: '20 min',
      price: '35€',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      slots: ['Mardi 10h', 'Mercredi 15h', 'Jeudi 9h'],
    },
    {
      name: 'Dr. Legrand',
      specialty: 'Généraliste',
      duration: '20 min',
      price: '38€',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      slots: ['Lundi 14h', 'Vendredi 11h'],
    },
  ],
  Nutrition: [
    {
      name: 'Dr. Bernard',
      specialty: 'Nutrition',
      duration: '30 min',
      price: '45€',
      photo: 'https://randomuser.me/api/portraits/men/45.jpg',
      slots: ['Mardi 11h', 'Jeudi 16h'],
    },
    {
      name: 'Dr. Garcia',
      specialty: 'Nutrition',
      duration: '30 min',
      price: '42€',
      photo: 'https://randomuser.me/api/portraits/women/55.jpg',
      slots: ['Mercredi 10h', 'Vendredi 15h'],
    },
  ],
  Comportement: [
    {
      name: 'Dr. Moreau',
      specialty: 'Comportement',
      duration: '40 min',
      price: '55€',
      photo: 'https://randomuser.me/api/portraits/men/60.jpg',
      slots: ['Lundi 9h', 'Jeudi 14h'],
    },
    {
      name: 'Dr. Dupont',
      specialty: 'Comportement',
      duration: '40 min',
      price: '50€',
      photo: 'https://randomuser.me/api/portraits/women/61.jpg',
      slots: ['Mardi 15h', 'Vendredi 10h'],
    },
  ],
};

const Teleconsultation = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedVet, setSelectedVet] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const navigate = useNavigate();

  const vets = selectedSpecialty ? VETS_BY_SPECIALTY[selectedSpecialty] : [];

  const handleConfirm = () => {
    if (selectedVet && selectedSlot) {
      navigate(`/app/teleconsultation/confirm?vet=${encodeURIComponent(selectedVet.name)}&time=${encodeURIComponent(selectedSlot)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Prendre une téléconsultation vétérinaire</h1>
        {/* Sélection de la spécialité */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Spécialité</label>
          <select
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSpecialty}
            onChange={e => {
              setSelectedSpecialty(e.target.value);
              setSelectedVet(null);
              setSelectedSlot('');
            }}
          >
            <option value="">Sélectionnez une spécialité</option>
            {SPECIALTIES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Liste des vétérinaires */}
        {selectedSpecialty && (
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Vétérinaires disponibles</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vets.map(vet => (
                <div
                  key={vet.name}
                  className={`border rounded-xl p-4 flex flex-col items-center transition-colors duration-200 cursor-pointer ${selectedVet && selectedVet.name === vet.name ? 'bg-blue-50 border-blue-600' : 'bg-gray-50 hover:bg-blue-100 border-gray-200'}`}
                  onClick={() => {
                    setSelectedVet(vet);
                    setSelectedSlot('');
                  }}
                >
                  {vet.photo && (
                    <img src={vet.photo} alt={vet.name} className="w-16 h-16 rounded-full mb-2 object-cover" />
                  )}
                  <div className="font-bold text-gray-900 text-lg mb-1">{vet.name}</div>
                  <div className="text-sm text-gray-600 mb-1">{vet.specialty}</div>
                  <div className="text-sm text-gray-500 mb-1">Durée : {vet.duration}</div>
                  <div className="text-sm text-gray-500 mb-2">Tarif : {vet.price}</div>
                  {selectedVet && selectedVet.name === vet.name && (
                    <div className="w-full mt-2">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {vet.slots.map(slot => (
                          <button
                            key={slot}
                            className={`px-3 py-1 rounded-full border font-medium text-sm transition-colors duration-200 ${selectedSlot === slot ? 'bg-green-600 text-white border-green-600' : 'bg-white hover:bg-green-50 border-gray-300 text-gray-900'}`}
                            onClick={e => {
                              e.stopPropagation();
                              setSelectedSlot(slot);
                            }}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bouton de confirmation */}
        {selectedVet && selectedSlot && (
          <div className="mb-4 text-center">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow"
              onClick={handleConfirm}
            >
              Confirmer cette téléconsultation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teleconsultation; 