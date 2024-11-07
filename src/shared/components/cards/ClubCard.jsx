import React from 'react';
import { FaInstagram, FaCalendarAlt } from 'react-icons/fa';

/**
 * Card de club : Affiche les informations d'un club.
 * 
 * Ce composant prend un objet `club` en tant que prop et affiche les informations suivantes :
 * - Logo du club
 * - Nom du club
 * - Description du club (limitée à 3 lignes si elle est trop longue)
 * - Date de création du club
 * - Lien vers Instagram du club
 */

const ClubCard = ({ item, size = "grand" }) => {
  
  const cardHeight = "h-[400px]"; 
  
  const widthClass = size === "petit" ? "w-60" : "w-full";

  return (
    <div className={`relative bg-white shadow-lg rounded-lg p-6 mb-6 ${widthClass} mx-auto hover:shadow-2xl transition-shadow duration-300 ease-in-out ${cardHeight}`}>
      <img 
        src={item.logo || "default-image.jpg"}      
        alt={`${item.nom} logo`} 
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      
      <h3 className="text-2xl font-semibold text-gray-800 text-center hover:text-blue-600 transition-colors duration-200 truncate">
        {item.nom}
      </h3>
      
      <div className="relative mt-3 h-16 overflow-hidden">
        <p className="text-gray-600 text-center line-clamp-3">
          {item.description || "Aucune description disponible"}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-gray-500 flex items-center">
          <FaCalendarAlt className="mr-2 text-indigo-600" /> 
          <span><strong>Créé le:</strong> {new Date(item.createdAt).toLocaleDateString()}</span>
        </p>

        <a 
          href={`https://instagram.com/${item.instagramme}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-pink-600 hover:text-pink-700 transition-colors duration-200"
        >
          <FaInstagram size={24} />
        </a>
      </div>
    </div>
  );
};

export default ClubCard;
