import React from "react";
import HealthChart from "./HealthChart";
import AlertItem from "./AlertItem";

const HealthOverview = ({ data }) => {
  const { activityData, weightData, sleepData, alerts } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Colonne principale avec graphiques */}
      <div className="md:col-span-2 space-y-6">
        <HealthChart title="Activité physique" data={activityData} unit="km/j" />
        <HealthChart title="Poids" data={weightData} unit="kg" />
        <HealthChart title="Sommeil" data={sleepData} unit="h/nuit" />
      </div>

      {/* Colonne alertes */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-lg font-bold mb-4 text-red-600">Alertes</h3>
        <ul className="space-y-2">
          {alerts && alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <AlertItem key={index} message={alert.message} severity={alert.severity} />
            ))
          ) : (
            <p className="text-sm text-gray-500">Aucune alerte pour le moment.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HealthOverview;
