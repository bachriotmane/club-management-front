import React from 'react';
import { FaInstagram, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const ClubCard = ({ item, size = "grand" }) => {
    const navigate = useNavigate();
    const cardHeight = "h-[400px]"; 
    const widthClass = size === "petit" ? "max-w-xs" : "max-w-md"; 

    const handleNavigation = () => {
        navigate(`/club/${item.uuid}`);
    };

    return (
        <div className={`relative bg-white cursor-pointer shadow-lg rounded-lg p-6 mb-6 ${widthClass} w-full mx-auto hover:shadow-2xl transition-shadow duration-300 ease-in-out ${cardHeight}`}>
            <img 
                src={item.logo || "default-image.jpg"}      
                alt={`${item.nom} logo`} 
                className="w-full h-48 object-cover rounded-md mb-4"
                onClick={handleNavigation}
            />
            
            <h3 
                className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 text-center hover:text-blue-600 transition-colors duration-200 truncate" 
                onClick={handleNavigation}
            >
                {item.nom}
            </h3>

            <div className="relative mt-3 h-18 overflow-hidden">
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                    {item.description || ""}
                </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white shadow-inner flex items-center justify-between mt-4">
                <p className="text-gray-500 flex items-center text-xs sm:text-sm md:text-base">
                    <FaCalendarAlt className="mr-2 text-indigo-600 text-xs sm:text-sm md:text-base" /> 
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                        <strong>Créé le:</strong> {new Date(item.createdAt).toLocaleDateString()}
                    </span>
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
