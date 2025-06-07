import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ActivityChart = ({ data }) => {
  const chartData = {
    labels: data ? data.map(d => d.date) : [],
    datasets: [
      {
        label: 'Activité (%)',
        data: data ? data.map(d => d.value) : [],
        borderColor: 'rgb(34,197,94)',
        backgroundColor: 'rgba(34,197,94, 0.2)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h4 className="text-lg font-bold mb-2">🏃 Suivi de l’activité</h4>
      <Line data={chartData} />
    </div>
  );
};

export default ActivityChart;
