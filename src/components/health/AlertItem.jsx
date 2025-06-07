import React from "react";

const severityColor = {
  high: "text-red-600",
  medium: "text-yellow-500",
  low: "text-green-600",
};

const AlertItem = ({ message, severity }) => {
  return (
    <li className={`text-sm font-medium ${severityColor[severity] || "text-gray-600"}`}>
      • {message}
    </li>
  );
};

export default AlertItem;
