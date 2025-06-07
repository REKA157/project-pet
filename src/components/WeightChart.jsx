import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const WeightChart = ({ data }) => {
  const chartData = {
    labels: data ? data.map(d => d.date) : [],
    datasets: [
      {
        label: 'Poids (kg)',
        data: data ? data.map(d => d.value) : [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h4 className="text-lg font-bold mb-2">📉 Suivi du poids</h4>
      <Line data={chartData} />
    </div>
  );
};

export default WeightChart;
