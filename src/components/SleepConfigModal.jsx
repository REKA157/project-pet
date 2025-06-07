import React, { useState } from 'react';

const SleepConfigModal = ({ onClose, onSave }) => {
  const [useCollar, setUseCollar] = useState(false);
  const [sleepHours, setSleepHours] = useState(8);
  const [bedtime, setBedtime] = useState("22:00");
  const [waketime, setWaketime] = useState("06:00");
  const [wakeEvents, setWakeEvents] = useState(0);

  const handleFetchCollarData = async () => {
    try {
      const res = await fetch('https://api.collier.dev/sleep');
      const data = await res.json();
      alert(`Collier connecté : ${data.sleepHours}h, ${data.wakeEvents} réveils.`);
      setSleepHours(data.sleepHours);
      setWakeEvents(data.wakeEvents);
    } catch (err) {
      alert("Erreur lors de la récupération des données du collier.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">🛌 Configurer la qualité du sommeil</h2>

        <label className="block mb-2 font-medium">Utiliser un collier connecté :</label>
        <input
          type="checkbox"
          checked={useCollar}
          onChange={(e) => setUseCollar(e.target.checked)}
          className="mb-4"
        />

        {useCollar ? (
          <button
            onClick={handleFetchCollarData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
          >
            Récupérer les données du collier
          </button>
        ) : (
          <>
            <label className="block mb-1">Durée totale de sommeil (heures) :</label>
            <input
              type="number"
              className="w-full mb-4 border px-2 py-1 rounded"
              value={sleepHours}
              onChange={(e) => setSleepHours(Number(e.target.value))}
            />

            <label className="block mb-1">Heure de coucher :</label>
            <input
              type="time"
              className="w-full mb-4 border px-2 py-1 rounded"
              value={bedtime}
              onChange={(e) => setBedtime(e.target.value)}
            />

            <label className="block mb-1">Heure de réveil :</label>
            <input
              type="time"
              className="w-full mb-4 border px-2 py-1 rounded"
              value={waketime}
              onChange={(e) => setWaketime(e.target.value)}
            />

            <label className="block mb-1">Nombre de réveils :</label>
            <input
              type="number"
              className="w-full mb-4 border px-2 py-1 rounded"
              value={wakeEvents}
              onChange={(e) => setWakeEvents(Number(e.target.value))}
            />
          </>
        )}

        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="text-gray-600">Annuler</button>
          <button
            onClick={() =>
              onSave({ sleepHours, bedtime, waketime, wakeEvents, useCollar })
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

export default SleepConfigModal;
