import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeartbeat, FaNotesMedical, FaCalendarAlt, FaChartLine, FaBell, FaRobot, FaAppleAlt, FaExclamationTriangle, FaCheckCircle, FaWeight, FaUtensils, FaVial, FaClipboardList } from 'react-icons/fa';
import { MdHealthAndSafety, MdLocalHospital, MdVaccines, MdPets } from 'react-icons/md';

const Health = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHealthAI, setShowHealthAI] = useState(false);

  // Données de santé simulées
  const [healthData, setHealthData] = useState({
    lastCheckup: '2024-02-15',
    nextVaccination: '2024-04-15',
    weight: 12.5,
    activityLevel: 'Modéré',
    dietStatus: 'Équilibré',
    hydrationLevel: 'Bon',
    sleepQuality: 'Excellent',
    stressLevel: 'Faible',
    sleepHours: 6 // Ajouté pour le suivi du sommeil
  });

  // Données de prédiction IA
  const [aiPredictions, setAiPredictions] = useState({
    healthRisks: [
      {
        id: 1,
        type: 'Obésité',
        probability: 15,
        severity: 'Faible',
        recommendations: [
          'Augmenter l\'activité physique',
          'Ajuster la portion de nourriture',
          'Surveiller les friandises'
        ]
      },
      {
        id: 2,
        type: 'Problèmes dentaires',
        probability: 25,
        severity: 'Modéré',
        recommendations: [
          'Brossage régulier des dents',
          'Contrôle vétérinaire',
          'Jouets dentaires'
        ]
      }
    ],
    preventiveMeasures: [
      {
        id: 1,
        type: 'Vaccination',
        dueDate: '2024-04-15',
        importance: 'Haute',
        description: 'Rappel annuel des vaccins'
      },
      {
        id: 2,
        type: 'Vermifuge',
        dueDate: '2024-03-30',
        importance: 'Moyenne',
        description: 'Traitement préventif'
      }
    ]
  });

  // Données de suivi nutritionnel
  const [nutritionData, setNutritionData] = useState({
    dailyCalories: 850,
    recommendedCalories: 900,
    waterIntake: 500,
    recommendedWater: 600,
    mealSchedule: [
      {
        time: '08:00',
        type: 'Petit-déjeuner',
        food: 'Croquettes premium',
        amount: '150g'
      },
      {
        time: '12:00',
        type: 'Déjeuner',
        food: 'Nourriture humide',
        amount: '100g'
      },
      {
        time: '18:00',
        type: 'Dîner',
        food: 'Croquettes premium',
        amount: '150g'
      }
    ],
    nutritionalAnalysis: {
      proteins: 85,
      carbohydrates: 65,
      fats: 70,
      vitamins: 90,
      minerals: 80
    }
  });

  // Rappels personnalisés
  const [healthReminders, setHealthReminders] = useState([
    {
      id: 1,
      type: 'Médicament',
      time: '08:00',
      description: 'Antiparasitaire',
      status: 'pending'
    },
    {
      id: 2,
      type: 'Activité',
      time: '17:00',
      description: 'Séance de jeu',
      status: 'completed'
    },
    {
      id: 3,
      type: 'Nourriture',
      time: '12:00',
      description: 'Repas spécial',
      status: 'pending'
    }
  ]);

  const handleAnalyzeNow = () => {
    const prediction = generatePredictions({
      activity: average(activity),
      energy: nutritionData.dailyCalories / nutritionData.recommendedCalories,
      sleep: healthData.sleepHours || 5.5 // Simulé ou réel
    });
    setAiPredictions(prediction);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Santé de votre animal</h1>
          <p className="text-xl text-gray-600">Suivi intelligent de la santé et bien-être</p>
        </motion.div>

        {/* Navigation par onglets */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-xl flex items-center ${
                activeTab === 'overview'
                  ? 'bg-nature-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaHeartbeat className="w-5 h-5 mr-2" />
              Vue d'ensemble
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('ai')}
              className={`px-6 py-3 rounded-xl flex items-center ${
                activeTab === 'ai'
                  ? 'bg-nature-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaRobot className="w-5 h-5 mr-2" />
              IA Santé
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('nutrition')}
              className={`px-6 py-3 rounded-xl flex items-center ${
                activeTab === 'nutrition'
                  ? 'bg-nature-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaAppleAlt className="w-5 h-5 mr-2" />
              Nutrition
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('reminders')}
              className={`px-6 py-3 rounded-xl flex items-center ${
                activeTab === 'reminders'
                  ? 'bg-nature-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaBell className="w-5 h-5 mr-2" />
              Rappels
            </motion.button>
          </div>
        </div>

        {/* Contenu des onglets */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-nature-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Dernier check-up</h3>
                    <MdHealthAndSafety className="w-6 h-6 text-nature-600" />
                  </div>
                  <p className="text-2xl font-bold text-nature-600">{healthData.lastCheckup}</p>
                </div>
                <div className="bg-nature-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Prochain vaccin</h3>
                    <MdVaccines className="w-6 h-6 text-nature-600" />
                  </div>
                  <p className="text-2xl font-bold text-nature-600">{healthData.nextVaccination}</p>
                </div>
                <div className="bg-nature-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Poids</h3>
                    <FaWeight className="w-6 h-6 text-nature-600" />
                  </div>
                  <p className="text-2xl font-bold text-nature-600">{healthData.weight} kg</p>
                </div>
                <div className="bg-nature-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Niveau d'activité</h3>
                    <FaChartLine className="w-6 h-6 text-nature-600" />
                  </div>
                  <p className="text-2xl font-bold text-nature-600">{healthData.activityLevel}</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'ai' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Prédictions de santé IA</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aiPredictions.healthRisks.map((risk) => (
                    <div key={risk.id} className="bg-nature-50 p-6 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">{risk.type}</h3>
                        <FaExclamationTriangle className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Probabilité</span>
                          <span className="text-sm font-medium text-nature-600">{risk.probability}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-nature-600 h-2 rounded-full"
                            style={{ width: `${risk.probability}%` }}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-600">Sévérité: </span>
                        <span className="text-sm font-medium text-nature-600">{risk.severity}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Recommandations</h4>
                        <ul className="space-y-2">
                          {risk.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <FaCheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Mesures préventives</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aiPredictions.preventiveMeasures.map((measure) => (
                    <div key={measure.id} className="bg-nature-50 p-6 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">{measure.type}</h3>
                        <MdLocalHospital className="w-6 h-6 text-nature-600" />
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Date prévue: {measure.dueDate}</p>
                        <p className="text-sm text-gray-600 mb-2">Importance: {measure.importance}</p>
                        <p className="text-sm text-gray-600">{measure.description}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-2 bg-nature-600 text-white rounded-lg"
                      >
                        Planifier
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAnalyzeNow}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Analyser maintenant
              </button>
            </motion.div>
          )}

          {activeTab === 'nutrition' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Suivi nutritionnel</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-nature-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Calories quotidiennes</h3>
                      <FaUtensils className="w-6 h-6 text-nature-600" />
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Consommées</span>
                        <span className="text-sm font-medium text-nature-600">{nutritionData.dailyCalories} kcal</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-nature-600 h-2 rounded-full"
                          style={{ width: `${(nutritionData.dailyCalories / nutritionData.recommendedCalories) * 100}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Recommandé: {nutritionData.recommendedCalories} kcal
                      </p>
                    </div>
                  </div>
                  <div className="bg-nature-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Hydratation</h3>
                      <FaVial className="w-6 h-6 text-nature-600" />
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Consommé</span>
                        <span className="text-sm font-medium text-nature-600">{nutritionData.waterIntake} ml</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-nature-600 h-2 rounded-full"
                          style={{ width: `${(nutritionData.waterIntake / nutritionData.recommendedWater) * 100}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Recommandé: {nutritionData.recommendedWater} ml
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Planning des repas</h2>
                <div className="space-y-4">
                  {nutritionData.mealSchedule.map((meal, index) => (
                    <div key={index} className="bg-nature-50 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{meal.type}</h3>
                          <p className="text-sm text-gray-600">{meal.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-nature-600">{meal.food}</p>
                          <p className="text-sm text-gray-600">{meal.amount}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyse nutritionnelle</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(nutritionData.nutritionalAnalysis).map(([nutrient, value]) => (
                    <div key={nutrient} className="bg-nature-50 p-4 rounded-xl text-center">
                      <h3 className="text-sm font-medium text-gray-900 mb-2 capitalize">{nutrient}</h3>
                      <div className="relative">
                        <div className="w-16 h-16 mx-auto">
                          <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#E5E7EB"
                              strokeWidth="3"
                            />
                            <path
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#4F46E5"
                              strokeWidth="3"
                              strokeDasharray={`${value}, 100`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-medium text-nature-600">{value}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'reminders' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Rappels personnalisés</h2>
                <div className="space-y-4">
                  {healthReminders.map((reminder) => (
                    <div key={reminder.id} className="bg-nature-50 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            {reminder.type === 'Médicament' ? (
                              <MdVaccines className="w-6 h-6 text-nature-600" />
                            ) : reminder.type === 'Activité' ? (
                              <FaChartLine className="w-6 h-6 text-nature-600" />
                            ) : (
                              <FaUtensils className="w-6 h-6 text-nature-600" />
                            )}
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">{reminder.type}</h3>
                            <p className="text-sm text-gray-600">{reminder.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 mr-4">{reminder.time}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            reminder.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {reminder.status === 'completed' ? 'Terminé' : 'En attente'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ajouter un rappel</h2>
                <div className="bg-nature-50 p-6 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de rappel
                      </label>
                      <select className="w-full rounded-lg border-gray-300">
                        <option>Médicament</option>
                        <option>Activité</option>
                        <option>Nourriture</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heure
                      </label>
                      <input
                        type="time"
                        className="w-full rounded-lg border-gray-300"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border-gray-300"
                        placeholder="Description du rappel"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-nature-600 text-white rounded-lg"
                    >
                      Ajouter
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Health;