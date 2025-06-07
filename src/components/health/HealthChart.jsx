import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const HealthChart = ({ title, data, unit }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h4 className="text-md font-semibold mb-2">{title}</h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit={unit} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#0EA5E9" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthChart;
