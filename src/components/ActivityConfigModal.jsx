import React, { useState } from 'react';

const ActivityConfigModal = ({ onClose, onSave }) => {
  const [typeChien, setTypeChien] = useState('');
  const [profil, setProfil] = useState('');
  const [useCollar, setUseCollar] = useState(false);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!typeChien || !profil) {
      setError("Veuillez sélectionner un type de chien et un profil.");
      return;
    }

    onSave({ typeChien, profil, useCollar });
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">🎯 Paramètres d’activité</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Type de chien</label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring focus:ring-violet-200"
          value={typeChien}
          onChange={(e) => setTypeChien(e.target.value)}
        >
          <option value="">-- Choisir un type --</option>
          <option value="compagnie">Chien de compagnie</option>
          <option value="travail">Chien de travail</option>
          <option value="sportif">Chien sportif</option>
          <option value="senior">Chien senior</option>
        </select>

        <label className="block mb-2 text-sm font-medium text-gray-700">Profil d’activité</label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring focus:ring-violet-200"
          value={profil}
          onChange={(e) => setProfil(e.target.value)}
        >
          <option value="">-- Choisir un profil --</option>
          <option value="normal">Normal</option>
          <option value="eleve">Élevé</option>
          <option value="tres_eleve">Très élevé</option>
          <option value="elite">Elite</option>
        </select>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="collar"
            checked={useCollar}
            onChange={(e) => setUseCollar(e.target.checked)}
            className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
          />
          <label htmlFor="collar" className="ml-2 text-sm text-gray-700">Utiliser un collier connecté</label>
        </div>

        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="bg-violet-600 text-white px-5 py-2 rounded-lg hover:bg-violet-700 transition"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityConfigModal;

