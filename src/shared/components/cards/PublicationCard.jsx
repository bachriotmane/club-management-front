import React from "react";
import {
  FaRegHeart,
  FaComment,
  FaShareAlt,
  FaRegClock,
  FaCalendarAlt,
} from "react-icons/fa";
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
    <> {item && <div
        className="bg-white shadow-lg rounded-lg p-4 mb-6 mx-auto w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div onClick={handleNavigation} className="aspect-w-16 aspect-h-9">
        <img
            src={item.image || "default-image.jpg"}
            alt={item.title}
            className="object-cover w-full h-full rounded-md"
        />
      </div>

      <h3
          className="mt-4 text-sm sm:text-lg md:text-xl font-semibold text-gray-800 truncate cursor-pointer"
          onClick={handleNavigation}
      >
        {item.title}
      </h3>

      <div className="mt-2 overflow-hidden">
        <p className="text-gray-600 text-xs sm:text-sm md:text-base line-clamp-3">
          {item.description || ""}
        </p>
      </div>

      <div className="mt-4 space-y-2 text-gray-500">
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2 text-blue-500 hover:text-blue-700 text-xs sm:text-sm md:text-base"/>
          <span className="text-xs sm:text-sm">
            {new Date(item.date).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center">
          <FaRegClock className="mr-2 text-yellow-500 hover:text-yellow-700 text-xs sm:text-sm md:text-base"/>
          <span className="text-xs sm:text-sm">
            Publié à: {getFormattedTime(item.date)}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p
            className={`text-xs sm:text-sm ${
                item.isPublic ? "text-green-600" : "text-red-600"
            }`}
        >
          {item.isPublic ? "Public" : "Privé"}
        </p>
        <div className="flex space-x-2 sm:space-x-4">
          <button className="text-gray-600 hover:text-red-600">
            <FaRegHeart className="text-sm sm:text-base md:text-lg text-pink-500 hover:text-pink-700"/>
          </button>
          <button className="text-gray-600 hover:text-blue-500">
            <FaComment className="text-sm sm:text-base md:text-lg text-blue-500 hover:text-blue-700"/>
          </button>
          <button className="text-gray-600 hover:text-green-500">
            <FaShareAlt className="text-sm sm:text-base md:text-lg text-green-500 hover:text-green-700"/>
          </button>
        </div>
      </div>
    </div>}</>
  );
};

export default PublicationCard;
