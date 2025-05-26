import React from 'react';

const AiPredictions = () => (
  <div className="bg-white border rounded-xl p-6 shadow-sm">
    <h3 className="text-xl font-bold text-gray-900 mb-4">🤖 Prédictions IA</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-lg font-medium text-gray-900 mb-2">Santé</h4>
        <p className="text-gray-600">Prédictions basées sur les données de santé</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-lg font-medium text-gray-900 mb-2">Comportement</h4>
        <p className="text-gray-600">Prédictions basées sur le comportement</p>
      </div>
    </div>
  </div>
);

export default AiPredictions; 