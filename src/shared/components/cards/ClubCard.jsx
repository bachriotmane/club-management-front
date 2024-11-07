import React from 'react';
import { FaInstagram, FaCalendarAlt } from 'react-icons/fa';
/**
 * Card de club : Affiche les informations d'un club.
 * 
 * Ce composant prend un objet `club` en tant que prop et affiche les informations suivantes :
 * - Logo du club
 * - Nom du club
 * - Description du club (limitée à 3 lignes)
 * - Date de création du club
 * - Lien vers Instagram du club
 */

const ClubCard = ({ club }) => {
  return (
    <div className="relative bg-white shadow-lg rounded-lg p-6 mb-6 max-w-sm mx-auto hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <img 
        src={club.logo} 
        alt={`${club.nom} logo`} 
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      
      <h3 className="text-2xl font-semibold text-gray-800 text-center hover:text-blue-600 transition-colors duration-200">
        {club.nom}
      </h3>
      
      <p className="text-gray-600 mt-3 text-center line-clamp-3">{club.description}</p>

      <div className="flex items-center justify-between mt-4">
        <p className="text-gray-500 flex items-center">
          <FaCalendarAlt className="mr-2 text-indigo-600" /> 
          <span><strong>Créé le:</strong> {new Date(club.createdAt).toLocaleDateString()}</span>
        </p>

        <a 
          href={`https://instagram.com/${club.instagramme}`} 
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
