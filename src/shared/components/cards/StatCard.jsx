import React from 'react';

const StatCard = ({ title, number, color, onClick }) => {
  let bgColor = '';
  switch (color) {
    case 'orange':
      bgColor = 'bg-orange-600';
      break;
    case 'blue':
      bgColor = 'bg-blue-600';
      break;
    case 'green':
      bgColor = 'bg-green-600';
      break;
    default:
      bgColor = 'bg-gray-600';
  }

  return (
    
    <div
      className={`${bgColor} text-white rounded-2xl p-6 flex flex-col justify-between items-start w-full sm:w-96 md:w-96 shadow-lg cursor-pointer`}
      onClick={onClick} 
    >
      <h3 className="text-xs sm:text-sm md:text-base font-semibold text-left">{title}</h3>
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 text-left">
        {number}
      </div>
    </div>
  );
};

export default StatCard;
