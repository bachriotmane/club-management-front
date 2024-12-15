import React from 'react';
import { FaInstagram, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const EventCard = ({ item, size = "grand" , image}) => {
  const navigate = useNavigate();
  console.log("Image",image)
  
  const cardHeight = "h-[400px]"; 
  const widthClass = size === "petit" ? "max-w-xs" : "max-w-md"; 

  const handleNavigation = () => {
    navigate(`/event/${item.id}`);
  };

  return (
    <div
      className={`relative bg-white cursor-pointer shadow-lg rounded-lg p-6 mb-6 ${widthClass} w-full mx-auto hover:shadow-2xl transition-shadow duration-300 ease-in-out ${cardHeight}`}
      onClick={handleNavigation}
    >
      <img
        src={image || "default-image.jpg"}
        alt={item.nom}
        className="w-full h-48 object-contain rounded-md mb-4"
      />

      <h3
        className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 text-center hover:text-blue-600 transition-colors duration-200 truncate"
        onClick={handleNavigation}
      >
        {item.nom}
      </h3>

      <div className="relative mt-3 h-18 overflow-hidden">
        <p className="text-gray-600 text-xs sm:text-sm md:text-base line-clamp-3">
          {item.description || ""}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white shadow-inner flex items-center justify-between mt-4">
        <p className="text-gray-500 flex items-center text-xs sm:text-sm md:text-base">
          <FaCalendarAlt className="mr-2 text-indigo-600 text-xs sm:text-sm md:text-base" />
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}
          </span>
        </p>

        {item.instagram && (
          <a
            href={`https://instagram.com/${item.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-700 transition-colors duration-200"
          >
            <FaInstagram size={24} />
          </a>
        )}
      </div>
    </div>
  );
};

export default EventCard;
