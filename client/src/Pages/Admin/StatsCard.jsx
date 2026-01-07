import React from "react";

export const StatsCard = ({ title, count }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow text-center">
      <h3 className="font-bold">{title}</h3>
      <p className="text-2xl">{count}</p>
    </div>
  );
};
