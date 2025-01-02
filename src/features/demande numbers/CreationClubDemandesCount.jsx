import React, { useState, useEffect } from 'react';
import { getCreationClubDemandesCount } from '../../repositories/Demandes.repository.js'; // Assurez-vous que l'API est bien définie
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx"; // Composant de chargement

const CreationClubDemandesCount = () => {
    const [creationClubDemandesCount, setCreationClubDemandesCount] = useState(null); // Nombre de demandes
    const [isLoading, setIsLoading] = useState(true); // État de chargement
    const [error, setError] = useState(null); // État d'erreur

    useEffect(() => {
        const fetchCreationClubDemandesCount = async () => {
            try {
                const count = await getCreationClubDemandesCount(); // Récupérer le nombre de demandes via l'API
                setCreationClubDemandesCount(count); // Mettre à jour l'état avec le nombre
                setIsLoading(false); 
            } catch (err) {
                setError('?'); 
                setIsLoading(false); 
            }
        };

        fetchCreationClubDemandesCount(); // Appeler la fonction pour récupérer les données
    }, []); 

    if (isLoading) {
        return <LoadingSpinner />; 

    }

    if (error) {
        return <div>{error}</div>; // Afficher un message en cas d'erreur
    }

    return (
        <div>
            <p>{creationClubDemandesCount}</p> 
        </div>
    );
};

export default CreationClubDemandesCount;
