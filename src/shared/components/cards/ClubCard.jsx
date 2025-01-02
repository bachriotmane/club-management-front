import React, { useState } from 'react';
import { FaInstagram, FaCalendarAlt, FaLock, FaLockOpen } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../../../auth/axios';
import SecureComponent from '../utili/SecureComponenet';

const ClubCard = ({ item, size = "petit", onStatusChange }) => {
    const navigate = useNavigate();
    const [isBlocked, setIsBlocked] = useState(item.isBlocked);
    const [loading, setLoading] = useState(false); // To show a loading state during the request

    const cardHeight = "h-[400px]";
    const widthClass = size === "petit" ? "max-w-xs" : "max-w-md";

    const handleNavigation = () => {
        navigate(`/club/${item.uuid}`);
    };

    const toggleBlockStatus = async () => {
        setLoading(true);
        try {
            await axiosInstance.patch(`clubs/blockClub/${item.uuid}`);
            setIsBlocked((prevState) => !prevState);
            if (onStatusChange) onStatusChange(item.uuid, !isBlocked); // Notify parent component
        } catch (error) {
            console.error("Error updating club status:", error);
            toast.error("Erreur lors de la mise à jour du statut du club");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`relative bg-white cursor-pointer shadow-lg rounded-lg p-6 mb-6 ${widthClass} w-full mx-auto hover:shadow-2xl transition-shadow duration-300 ease-in-out ${cardHeight}`}>
            {/* Lock Icon */}
            <ToastContainer/>
            <SecureComponent role="ROLE_ADMIN" >
            <div
                className={`absolute top-3 right-3 p-2 rounded-full ${isBlocked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
                title={isBlocked ? "Club is blocked" : "Club is active"}
                onClick={toggleBlockStatus} // Click handler
                style={{ cursor: loading ? "not-allowed" : "pointer" }} // Disable clicks when loading
            >
                {loading ? (
                    <span className="loader"></span> // Add a loading spinner if needed
                ) : isBlocked ? (
                    <FaLock size={20} />
                ) : (
                    <FaLockOpen size={20} />
                )}
            </div>
            </SecureComponent>

            {/* Club Logo */}
            <img 
                src={item.logo || "default-image.jpg"}      
                alt={`${item.nom} logo`} 
                className="w-full h-48 object-contain rounded-md mb-4"
                onClick={handleNavigation}
            />
            
            {/* Club Name */}
            <h3 
                className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 text-center hover:text-blue-600 transition-colors duration-200 truncate" 
                onClick={handleNavigation}
            >
                {item.nom}
            </h3>

            {/* Club Description */}
            <div className="relative mt-3 h-18 overflow-hidden">
                <p className="text-gray-600 text-xs sm:text-sm md:text-base ">
                    {item.description || ""}
                </p>
            </div>

            {/* Footer */}
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
