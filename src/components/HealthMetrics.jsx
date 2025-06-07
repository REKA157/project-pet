import React, { useState, useEffect } from 'react';
import { computeHealthData, computeVitality } from '../utils/health';
import ActivityConfigModal from './ActivityConfigModal';
import EnergyConfigModal from './EnergyConfigModal';
import SleepConfigModal from './SleepConfigModal';
import RegularityConfigModal from './RegularityConfigModal';
import VitalityConfigModal from './VitalityConfigModal';

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

const HealthMetrics = ({ data = todayData }) => {
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showEnergyModal, setShowEnergyModal] = useState(false);
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [showRegularityModal, setShowRegularityModal] = useState(false);
  const [showVitalityModal, setShowVitalityModal] = useState(false);

  const [activityParams, setActivityParams] = useState(() => {
    const saved = localStorage.getItem('activityParams');
    return saved ? JSON.parse(saved) : { typeChien: 'compagnie', profil: 'normal' };
  });

  const [energyData, setEnergyData] = useState(() => {
    const saved = localStorage.getItem('energyData');
    return saved ? JSON.parse(saved) : todayData.nutrition;
  });

  const [sleepData, setSleepData] = useState(() => {
    const saved = localStorage.getItem('sleepData');
    return saved ? JSON.parse(saved) : {
      sleepHours: 8,
      bedtime: "22:00",
      waketime: "06:00",
      wakeEvents: 0,
      useCollar: false
    };
  });

  const [reminderList, setReminderList] = useState(todayData.reminders);

  // 🔁 Synchronisation localStorage
  useEffect(() => {
    localStorage.setItem('activityParams', JSON.stringify(activityParams));
  }, [activityParams]);

  useEffect(() => {
    localStorage.setItem('energyData', JSON.stringify(energyData));
  }, [energyData]);

  useEffect(() => {
    localStorage.setItem('sleepData', JSON.stringify(sleepData));
  }, [sleepData]);

  // ✅ Calcul des scores
  const scores = computeHealthData(
    {
      ...data,
      nutrition: energyData,
      sleepHours: sleepData.sleepHours,
      reminders: reminderList
    },
    activityParams.typeChien,
    activityParams.profil
  );

  const vitality = computeVitality(scores);

  const colorScore = (value) => {
    if (value < 40) return 'bg-red-500';
    if (value < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const metrics = [
    {
      label: (
        <span
          onClick={() => setShowActivityModal(true)}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Activité physique
        </span>
      ),
      value: scores.activite_physique,
      color: colorScore(scores.activite_physique)
    },
    {
      label: (
        <span
          onClick={() => setShowEnergyModal(true)}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Niveau d'énergie
        </span>
      ),
      value: scores.energie,
      color: colorScore(scores.energie)
    },
    {
      label: (
        <span
          onClick={() => setShowSleepModal(true)}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Qualité du sommeil
        </span>
      ),
      value: scores.sommeil,
      color: colorScore(scores.sommeil)
    },
    {
      label: (
        <span
          onClick={() => setShowRegularityModal(true)}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Régularité
        </span>
      ),
      value: scores.regularite,
      color: colorScore(scores.regularite)
    },
    {
      label: (
        <span
          onClick={() => setShowVitalityModal(true)}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Vitalité
        </span>
      ),
      value: vitality,
      color: colorScore(vitality)
    }
  ];

  const handleSaveActivityParams = (params) => {
    console.log("Paramètres activité enregistrés:", params);
    setActivityParams(params);
    setShowActivityModal(false);
  };

  const handleSaveEnergyParams = (data) => {
    console.log("🔋 Données énergie enregistrées :", data);
    setEnergyData(data);
    setShowEnergyModal(false);
  };

  const handleSaveSleepParams = (params) => {
    console.log("💤 Données sommeil enregistrées :", params);
    setSleepData(params); // 🔄 met à jour les scores automatiquement
    setShowSleepModal(false);
  };

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-4">🧬 Données de santé</h3>
      <div className="space-y-5">
        {metrics.map((m, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-700 font-medium">{m.label}</span>
              <span className="font-bold text-gray-900">{m.value}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`${m.color} h-3 rounded-full transition-all`}
                style={{ width: `${m.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {showActivityModal && (
        <ActivityConfigModal
          onClose={() => setShowActivityModal(false)}
          onSave={handleSaveActivityParams}
        />
      )}

      {showEnergyModal && (
        <EnergyConfigModal
          onClose={() => setShowEnergyModal(false)}
          onSave={handleSaveEnergyParams}
        />
      )}

      {showSleepModal && (
        <SleepConfigModal
          onClose={() => setShowSleepModal(false)}
          onSave={handleSaveSleepParams}
        />
      )}

      {showRegularityModal && (
        <RegularityConfigModal
          reminders={reminderList}
          onSave={(updated) => {
            setReminderList(updated);
            setShowRegularityModal(false);
          }}
          onClose={() => setShowRegularityModal(false)}
        />
      )}

      {showVitalityModal && (
        <VitalityConfigModal
          onClose={() => setShowVitalityModal(false)}
          score={vitality}
        />
      )}
    </div>
  );
};

export default HealthMetrics;
