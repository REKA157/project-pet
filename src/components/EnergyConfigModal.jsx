import React, { useState } from 'react';

const EnergyConfigModal = ({ onClose, onSave }) => {
  const [source, setSource] = useState('manuel'); // manuel | qr | objet
  const [caloriesCurrent, setCaloriesCurrent] = useState('');
  const [caloriesTarget, setCaloriesTarget] = useState(900);

  const handleScan = () => {
    // Simule un scan QR pour extraire des calories d’un aliment
    alert("📷 QR scanné : 120 kcal trouvés.");
    setCaloriesCurrent(120);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">⚡ Configurer le niveau d’énergie</h2>

        <label className="block mb-2 font-medium">Source de données :</label>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full mb-4 border px-2 py-1 rounded"
        >
          <option value="manuel">Saisie manuelle</option>
          <option value="qr">Scan QR aliment</option>
          <option value="objet">Objet connecté</option>
        </select>

        {source === "manuel" && (
          <>
            <label className="block mb-1">Calories consommées :</label>
            <input
              type="number"
              className="w-full mb-4 border px-2 py-1 rounded"
              value={caloriesCurrent}
              onChange={(e) => setCaloriesCurrent(Number(e.target.value))}
              placeholder="Ex: 820"
            />
          </>
        )}

        {source === "qr" && (
          <button
            onClick={handleScan}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
          >
            Scanner un aliment
          </button>
        )}

        {source === "objet" && (
          <p className="text-sm mb-4 text-gray-600">🔗 Connecté à une gamelle intelligente (données simulées).</p>
        )}

        <label className="block mb-1">Objectif quotidien :</label>
        <input
          type="number"
          className="w-full mb-4 border px-2 py-1 rounded"
          value={caloriesTarget}
          onChange={(e) => setCaloriesTarget(Number(e.target.value))}
        />

        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="text-gray-600">Annuler</button>
          <button
            onClick={() =>
              onSave({ calories_current: caloriesCurrent, calories_target: caloriesTarget })
            }
            className="bg-violet-600 text-white px-4 py-2 rounded-lg"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnergyConfigModal;
