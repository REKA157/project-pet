import React from 'react';

export function computeHealthData({ nutrition, water, distance, reminders }) {
  const activite_physique = Math.min(100, Math.round((distance / 3) * 100));
  let energie = Math.round((nutrition.calories_current / nutrition.calories_target) * 100);
  const waterPercent = (water.current / water.target) * 100;
  if (waterPercent > 80) energie = Math.min(100, energie + 10);
  if (waterPercent < 50) energie = Math.max(0, energie - 10);
  let sommeil = 50;
  if (activite_physique > 70 && waterPercent > 80) sommeil = 90;
  else if (activite_physique > 70 && waterPercent <= 80) sommeil = 70;
  const totalReminders = reminders.length;
  const doneReminders = reminders.filter(r => r.status === "Terminé").length;
  const regularite = totalReminders === 0 ? 0 : Math.round((doneReminders / totalReminders) * 100);
  return {
    activite_physique,
    energie,
    sommeil,
    regularite
  };
}

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
  const scores = computeHealthData(data);
  const metrics = [
    { label: "Activité physique", value: scores.activite_physique, color: "bg-green-500" },
    { label: "Niveau d'énergie", value: scores.energie, color: "bg-blue-500" },
    { label: "Qualité du sommeil", value: scores.sommeil, color: "bg-purple-500" },
    { label: "Régularité", value: scores.regularite, color: "bg-yellow-500" }
  ];
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-4">🧬 Données de santé</h3>
      <div className="space-y-5">
        {metrics.map((m) => (
          <div key={m.label}>
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
    </div>
  );
};

const computeVitality = (averageActivity, dailyCalories, recommendedCalories, sleepHours) => {
  const activityScore = averageActivity > 2 ? 1 : 0.5;
  const energyScore = dailyCalories / recommendedCalories >= 0.9 ? 1 : 0.5;
  const sleepScore = sleepHours >= 6 ? 1 : 0.5;

  return ((activityScore + energyScore + sleepScore) / 3) * 100;
};

export { computeVitality };
export default HealthMetrics;