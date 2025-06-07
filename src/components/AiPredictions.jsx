import React, { useState } from 'react';
import { generatePredictions } from '../utils/predictions';
import { computeHealthData } from '../utils/health'; // Chemin corrigé vers computeHealthData

const AiPredictions = () => {
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [useCollar, setUseCollar] = useState(false);

  // Données simulées réalistes pour la démo
  const todayData = {
    nutrition: { calories_current: 820, calories_target: 900 },
    water: { current: 520, target: 600 },
    distance: 2.1,
    reminders: [
      { label: "Médicament", status: "Terminé" },
      { label: "Activité", status: "En attente" },
      { label: "Hydratation", status: "Terminé" }
    ]
  };

  const handleAnalyze = async () => {
    setLoading(true);

    const health = computeHealthData(todayData);
    let sleepHours = health.sommeil / 10; // Convertit score (ex. 70%) en heures simulées (7h)

    if (useCollar) {
      try {
        const res = await fetch('https://api.mock-collar.dev/sleep');
        const data = await res.json();
        sleepHours = data.sleepHours || sleepHours;
      } catch (err) {
        console.warn("Erreur collier – fallback", sleepHours, "heures");
      }
    }

    const result = generatePredictions({
      activity: health.activite_physique,
      energy: health.energie,
      sleep: sleepHours,
      regularity: health.regularite // Added regularity to predictions
    });

    setPredictionResult(result);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4 text-center">
      {/* Image IA Santé */}
      <img
        src="/images/ia_sante.png"
        alt="IA Santé"
        className="w-20 h-auto mx-auto mb-1"
      />

      {/* Case Collier connecté */}
      <div className="flex items-center justify-center text-sm text-gray-600 space-x-2 mb-2">
        <input
          type="checkbox"
          id="collar"
          checked={useCollar}
          onChange={(e) => setUseCollar(e.target.checked)}
        />
        <label htmlFor="collar">Collier connecté</label>
      </div>

      {/* Bouton */}
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className={`w-full px-6 py-2 text-white text-sm font-semibold rounded-lg transition 
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-700'}`}
      >
        {loading ? "Analyse en cours..." : "Analyse IA Santé"}
      </button>

      {/* Résultat */}
      {predictionResult && (
        <div className="mt-4 bg-gray-50 border rounded-lg p-4 shadow text-left">
          <h4 className="text-lg font-bold text-gray-900 mb-2">Résultat de l'analyse</h4>
          <p><strong>Prédiction :</strong> {predictionResult.prediction}</p>
          <p><strong>Confiance :</strong> {predictionResult.confidence}%</p>
          <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
            {predictionResult.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AiPredictions;
