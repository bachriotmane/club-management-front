import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
/**
 * Carte d'événement : Affiche les informations d'un événement.
 * 
 * Ce composant prend un objet `event` en tant que prop et affiche les informations suivantes :
 * - Image de l'événement
 * - Nom de l'événement
 * - Description de l'événement (limitée à 3 lignes)
 * - Date de l'événement
 * - Lieu de l'événement
 * - Budget de l'événement
 */
const EventCard = ({ event }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 max-w-xs mx-auto hover:shadow-xl transition-shadow duration-300 ease-in-out w-full h-auto">
      <img 
        src={event.image} 
        alt={event.nom} 
        className="w-full h-64 object-cover rounded-md mb-4" 
      />

      <h3 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-200">{event.nom}</h3>

      <p className="text-gray-600 mt-2 line-clamp-3">{event.description}</p>

      <div className="mt-4">
        <p className="text-gray-500 flex items-center">
          <FaCalendarAlt className="mr-2 text-indigo-600" /> 
          <span><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</span>
        </p>
        <p className="text-gray-500 flex items-center mt-2">
          <FaMapMarkerAlt className="mr-2 text-green-600" /> 
          <span><strong>Location:</strong> {event.location}</span>
        </p>
        <p className="text-gray-500 flex items-center mt-2">
          <FaDollarSign className="mr-2 text-yellow-600" /> 
          <span><strong>Budget:</strong> ${event.budget}</span>
        </p>
      </div>
    </div>
  );
};

export default EventCard;
