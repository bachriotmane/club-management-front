import React from "react";
import { FaRegHeart, FaComment, FaShareAlt, FaRegClock, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const getFormattedTime = (date) => {
  const time = new Date(date);
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const PublicationCard = ({ item }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/publication/${item.id}`);
  };

  return (
    <>
      {item && (
        <div
          className="relative bg-white cursor-pointer shadow-lg rounded-lg p-6 mb-6 max-w-md w-full mx-auto hover:shadow-2xl transition-shadow duration-300 ease-in-out h-[400px]"
        >
          {/* Image */}
          <img
            src={item.image || "default-image.jpg"}
            alt={item.title}
            className="w-full h-48 object-cover rounded-md mb-4"
            onClick={handleNavigation}
          />

          {/* Titre */}
          <h3
            className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 text-center hover:text-blue-600 transition-colors duration-200 truncate"
            onClick={handleNavigation}
          >
            {item.title}
          </h3>

          {/* Description (limitée) */}
          <div className="relative mt-3 h-[60px] overflow-hidden">
            <p className="text-gray-600 text-xs sm:text-sm md:text-base line-clamp-3">
              {item.description || ""}
            </p>
          </div>

          {/* Bas : Date et boutons d'actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white shadow-inner flex flex-col sm:flex-row items-start sm:items-center justify-between">
            {/* Informations (date et heure) */}
            <div>
              <div className="flex items-center mb-2 sm:mb-0">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                <span className="text-gray-500 text-xs sm:text-sm">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <FaRegClock className="mr-2 text-yellow-500" />
                <span className="text-gray-500 text-xs sm:text-sm">
                  Publié à: {getFormattedTime(item.date)}
                </span>
              </div>
            </div>

            {/* Boutons d'actions */}
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <button className="text-gray-600 hover:text-red-600">
                <FaRegHeart className="text-lg text-pink-500 hover:text-pink-700" />
              </button>
              <button className="text-gray-600 hover:text-blue-500">
                <FaComment className="text-lg text-blue-500 hover:text-blue-700" />
              </button>
              <button className="text-gray-600 hover:text-green-500">
                <FaShareAlt className="text-lg text-green-500 hover:text-green-700" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PublicationCard;
