import React from "react";
import { FaRegHeart, FaComment, FaShareAlt, FaRegClock, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const getFormattedTime = (date) => {
  const time = new Date(date);
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const PublicationCard = ({ item, size = "grand" }) => {
  const navigate = useNavigate();

  const cardHeight = "h-[400px]"; 
  const widthClass = size === "petit" ? "max-w-xs" : "max-w-md"; 

  const handleNavigation = () => {
    navigate(`/publication/${item.id}`);
  };

  return (
    <>
      {item && (
        <div
          className={`relative bg-white cursor-pointer shadow-lg rounded-lg p-6 mb-6 ${widthClass} w-full mx-auto hover:shadow-2xl transition-shadow duration-300 ease-in-out ${cardHeight}`}
        >
          <div onClick={handleNavigation} className="aspect-w-16 aspect-h-9">
            <img
              src={item.image || "default-image.jpg"}
              alt={item.title}
              className="object-cover w-full h-full rounded-md"
            />
          </div>

          <h3
            className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 text-center hover:text-blue-600 transition-colors duration-200 truncate"
            onClick={handleNavigation}
          >
            {item.title}
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
                <strong>Publié le:</strong> {new Date(item.date).toLocaleDateString()}
              </span>
            </p>

            <div className="flex space-x-2 sm:space-x-4">
              <button className="text-gray-600 hover:text-red-600">
                <FaRegHeart className="text-sm sm:text-base md:text-lg text-pink-500 hover:text-pink-700" />
              </button>
              <button className="text-gray-600 hover:text-blue-500">
                <FaComment className="text-sm sm:text-base md:text-lg text-blue-500 hover:text-blue-700" />
              </button>
              <button className="text-gray-600 hover:text-green-500">
                <FaShareAlt className="text-sm sm:text-base md:text-lg text-green-500 hover:text-green-700" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PublicationCard;
