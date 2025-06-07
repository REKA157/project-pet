import React from 'react';

const VaccineInfoModal = ({ vaccine, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-violet-700">
          📘 Détails du vaccin : {vaccine.name}
        </h2>
        <p className="text-gray-800 text-sm mb-2">
          <strong>Nom :</strong> {vaccine.name}
        </p>
        <p className="text-gray-800 text-sm mb-2">
          <strong>Description :</strong> {vaccine.description || 'Non disponible'}
        </p>
        <p className="text-gray-800 text-sm mb-2">
          <strong>Espèces concernées :</strong> {vaccine.species?.join(', ') || 'Non spécifié'}
        </p>
        <p className="text-gray-800 text-sm mb-2">
          <strong>Fréquence :</strong> {vaccine.frequency || 'Annuel'}
        </p>
        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="text-gray-600 hover:underline">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default VaccineInfoModal;
