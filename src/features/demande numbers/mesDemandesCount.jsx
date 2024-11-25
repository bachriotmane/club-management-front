import React, { useState, useEffect } from 'react';
import { getDemandesCountByEtudiant } from '../../repositories/Demandes.repository.js'; // Importer la fonction pour récupérer le nombre de demandes
import { getUser } from '../../auth/auth'; // Importer la méthode pour récupérer l'ID utilisateur
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx"; // Optionnel, si tu veux afficher un loader

const DemandesCount = () => {
    const [demandesCount, setDemandesCount] = useState(null);  // Stocke le nombre de demandes
    const [isLoading, setIsLoading] = useState(true);  // Indicateur de chargement
    const [error, setError] = useState(null);  // Pour gérer les erreurs

    const userId = getUser().id; console.log(getUser()); // Récupérer l'ID utilisateur actuel

    useEffect(() => {
        const fetchDemandesCount = async () => {
            try {
                const count = await getDemandesCountByEtudiant(userId);  // Récupérer le nombre de demandes pour l'utilisateur
                setDemandesCount(count);  // Mettre à jour le state
                setIsLoading(false);  // Fin du chargement
            } catch (err) {
                setError('Erreur lors de la récupération du nombre de demandes.');
                setIsLoading(false);  // Fin du chargement même en cas d'erreur
            }
        };

        fetchDemandesCount();  // Lancer le fetch
    }, [userId]);  // Effectue le fetch chaque fois que l'ID utilisateur change

    if (isLoading) {
        return <LoadingSpinner />;  // Affiche un spinner pendant le chargement
    }

    if (error) {
        return <div>{error}</div>;  // Affiche un message d'erreur si un problème survient
    }

    return ( 
        <div>
            <p> {demandesCount}</p>  {/* Affiche le nombre de demandes */}
        </div>
    );
};

export default DemandesCount;
