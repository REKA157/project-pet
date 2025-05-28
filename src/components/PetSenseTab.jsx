import React from 'react';

const PetSenseTab = ({ petSenseScore = 85 }) => {
  return (
    <div className="space-y-6">
      {/* PetSense Pro banner */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1">PetSense Pro</h2>
            <p className="text-white/90">Accédez à des fonctionnalités avancées pour une meilleure expérience avec votre animal de compagnie.</p>
          </div>
          <button className="bg-white text-pink-600 font-bold px-4 py-2 rounded-xl hover:bg-pink-100 transition">
            4,99€/mois - S'abonner
          </button>
        </div>
      </div>

      {/* Fonctionnalités PetSense */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-purple-600 mb-1">Alertes intelligentes</h3>
          <p className="text-sm text-gray-600 mb-2">Recevez des alertes personnalisées en fonction des besoins de votre animal.</p>
          <div className="flex flex-col gap-2">
            <button className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg">Alertes de santé</button>
            <button className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg">Alertes de comportement</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-pink-600 mb-1">Rapports vétérinaires</h3>
          <p className="text-sm text-gray-600 mb-4">Téléchargez les rapports vétérinaires détaillés.</p>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg">Télécharger</button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-blue-600 mb-1">Suivi croisé</h3>
          <p className="text-sm text-gray-600 mb-4">Comparez les progrès de votre animal avec d'autres utilisateurs.</p>
          <div className="h-24 bg-blue-200 rounded-lg animate-pulse" />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-green-600 mb-1">Collier connecté</h3>
          <p className="text-sm text-gray-600 mb-2">Restez connecté avec votre animal où que vous soyez.</p>
          <p className="text-sm text-gray-500 mb-2">Activité d’aujourd’hui : <span className="font-bold text-green-600">{petSenseScore}%</span></p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${petSenseScore}%` }} />
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Roadmap</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
          <li><span className="font-bold text-green-600">Version 1.0 :</span> Fonctionnalités de base</li>
          <li><span className="font-bold text-blue-600">Version 2.0 :</span> Améliorations et nouvelles fonctionnalités</li>
        </ul>
      </div>
    </div>
  );
};

export default PetSenseTab;
