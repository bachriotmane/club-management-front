import React from 'react';
import { FaRegHeart, FaComment, FaShareAlt, FaRegClock, FaCalendarAlt } from 'react-icons/fa';

/**
 * Carte publicitaire : Affiche les informations d'une publication.
 * 
 * Ce composant prend un objet `publication` en tant que prop et affiche les informations suivantes :
 * - Image de la publication
 * - Titre de la publication
 * - Description de la publication (limitée à 3 lignes)
 * - Date de publication
 * - Heure de publication
 * - Statut de la publication (Public ou Privé)
 * - Actions disponibles : Aimer, Commenter, Partager
 */
const getFormattedTime = (date) => {
  const time = new Date(date);
  const hours = time.getHours().toString().padStart(2, '0'); 
  const minutes = time.getMinutes().toString().padStart(2, '0'); 
  return `${hours}:${minutes}`; 
};

const PublicationCard = ({ item, size = "grand" }) => {
  const widthClass = size === "petit" ? "w-60" : "w-[300px]";
  const cardHeight = "h-[500px]"; 

  return (
    <div className={`relative bg-white shadow-lg rounded-lg cursor-pointer p-6 mb-4 max-w-xs mx-auto ${widthClass} hover:shadow-xl transition-shadow duration-300 ease-in-out ${cardHeight}`}>
      <img 
        src={item.image || "default-image.jpg"}
        alt={item.titre} 
        className="w-full h-56 object-cover rounded-md mb-4"
      />
      
      <h3 className="text-xl font-semibold text-gray-800 truncate">
        {item.titre}
      </h3>

      <div className="relative mt-2 h-18 overflow-hidden">
        <p className="text-gray-600 line-clamp-3">
          {item.description || ""}
        </p>
      </div>

      {/* Container pour la date, statut de la publication et actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 shadow-inner flex flex-col space-y-2">
        <div className="flex items-center text-gray-500">
          <FaCalendarAlt className="mr-2 text-blue-500 hover:text-blue-700" />
          <span>{new Date(item.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <FaRegClock className="mr-2 text-yellow-500 hover:text-yellow-700" />
          <span>Publié à: {getFormattedTime(item.date)}</span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className={`text-sm ${item.isPublic ? 'text-green-600' : 'text-red-600'}`}>
            {item.isPublic ? 'Public' : 'Privé'}
          </p>
          <div className="flex space-x-4">
            <button className="text-gray-600 hover:text-red-600">
              <FaRegHeart className="text-xl text-pink-500 hover:text-pink-700" />
            </button>
            <button className="text-gray-600 hover:text-blue-500">
              <FaComment className="text-xl text-blue-500 hover:text-blue-700" />
            </button>
            <button className="text-gray-600 hover:text-green-500">
              <FaShareAlt className="text-xl text-green-500 hover:text-green-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;
