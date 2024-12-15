
import React, {useEffect, useState} from "react";
import {
  FaRegHeart,
  FaComment,
  FaShareAlt,
  FaRegClock,
  FaCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../utili/LoadingCompnent.jsx";
import {getImage} from "../../../repositories/image.repository.js";

const getFormattedTime = (date) => {
  const time = new Date(date);
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const PublicationCard = ({ item, image }) => {
  const navigate = useNavigate();
  
  const handleNavigation = () => {
    navigate(`/publication/${item.id}`);
  };

  return (
    <div
      className={`relative bg-white cursor-pointer shadow-lg rounded-lg p-6 mb-6 max-w-md w-full mx-auto hover:shadow-2xl transition-shadow duration-300 ease-in-out h-[400px]`}
      onClick={handleNavigation}
    >
      {/* Image */}
      <img
        src={image || "default-image.jpg"}
        alt={item.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />

      {/* Titre */}
      <h3
        className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 text-center hover:text-blue-600 transition-colors duration-200 truncate"
        onClick={handleNavigation}
      >
        {item.title}
      </h3>

      {/* Description */}
      <div className="relative mt-3 h-18 overflow-hidden">
        <p className="text-gray-600 text-xs sm:text-sm md:text-base line-clamp-3">
          {item.description || ""}
        </p>
      </div>

      {/* Informations en bas */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white shadow-inner flex flex-col justify-start items-start mt-4 space-y-2">
        {/* Date */}
        <div className="flex items-center text-gray-500 text-xs sm:text-sm md:text-base">
          <FaCalendarAlt className="mr-2 text-indigo-600 text-xs sm:text-sm md:text-base" />
          <span>
            <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}
          </span>
        </div>

        {/* Publié à */}
        <div className="flex items-center text-gray-500 text-xs sm:text-sm md:text-base">
          <FaRegClock className="mr-2 text-yellow-500 text-xs sm:text-sm md:text-base" />
          <span>Publié à : {new Date(item.date).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;
