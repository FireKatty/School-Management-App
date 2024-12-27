import React from "react";

const Card = ({ title, children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {children}
    </div>
  );
};

export default Card;
