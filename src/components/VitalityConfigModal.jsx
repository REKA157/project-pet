import React from 'react';

const VitalityConfigModal = ({ onClose, score }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-violet-700">💖 Détail du score de vitalité</h2>

        <p className="mb-2 text-gray-700">
          La vitalité est calculée à partir de :
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
          <li>Activité physique</li>
          <li>Niveau d'énergie</li>
          <li>Qualité du sommeil</li>
          <li>Régularité des soins</li>
        </ul>

        <div className="text-center my-4">
          <span className="text-lg font-bold text-gray-900">Score actuel :</span>
          <p className="text-3xl font-bold text-green-600">{score}%</p>
        </div>

        {/* Version premium : historique */}
        <div className="mt-4 text-sm text-gray-500 italic">
          📈 Historique disponible dans la version premium
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button onClick={onClose} className="text-gray-600">Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default VitalityConfigModal;
