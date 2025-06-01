import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { generatePredictions } from '../utils/predictions';
import { FaRobot } from 'react-icons/fa';

const average = (arr) => arr && arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

const AiPredictions = ({ healthData, nutritionData }) => {
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [useCollar, setUseCollar] = useState(false);

  useEffect(() => {
    if (!healthData?.activity || !nutritionData?.dailyCalories || !nutritionData?.recommendedCalories) return;

    const prediction = generatePredictions({
      activity: average(healthData.activity.map((a) => a.value)),
      energy: nutritionData.dailyCalories / nutritionData.recommendedCalories,
      sleep: 5.5 // valeur simulée ou à connecter à healthData.sleep
    });

    setPredictionResult(prediction);
  }, [healthData, nutritionData]);

  const handleAnalyze = async () => {
    setLoading(true);

    let sleepHours = 5.5;

    if (useCollar) {
      try {
        const res = await fetch('https://api.mock-collar.dev/sleep');
        const data = await res.json();
        sleepHours = data.sleepHours || 5.5;
      } catch (err) {
        console.warn("Erreur avec le collier connecté, fallback vers valeur par défaut.");
        sleepHours = 5.5;
      }
    }

    const result = generatePredictions({
      activity: average(healthData.activity.map((a) => a.value)),
      energy: nutritionData.dailyCalories / nutritionData.recommendedCalories,
      sleep: sleepHours
    });

    setPredictionResult(result);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
          <FaRobot className="text-indigo-600" />
          <span>Analyse IA de la santé</span>
        </h3>

        <label className="text-sm text-gray-700 flex items-center space-x-2">
          <input
            type="checkbox"
            checked={useCollar}
            onChange={(e) => setUseCollar(e.target.checked)}
            className="rounded border-gray-300"
          />
          <span>Collier connecté</span>
        </label>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        {loading ? "Analyse en cours..." : "Analyse IA"}
      </button>

      {predictionResult && (
        <div className="mt-4 p-4 bg-gray-50 border-l-4 border-indigo-400 rounded">
          <h4 className="text-md font-semibold text-gray-800 mb-2">Résultat de l'analyse</h4>
          <p className="text-sm text-gray-700"><strong>Prédiction :</strong> {predictionResult.prediction}</p>
          <p className="text-sm text-gray-700"><strong>Confiance :</strong> {predictionResult.confidence}%</p>
          <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
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