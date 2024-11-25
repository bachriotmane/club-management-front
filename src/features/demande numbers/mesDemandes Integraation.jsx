import React, { useState, useEffect } from 'react';
import { getIntegrationDemandesCountByEtudiant } from '../../repositories/Demandes.repository.js'; // Importer la fonction pour les demandes d'intégration
import { getUser } from '../../auth/auth'; // Récupérer l'utilisateur actuel
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx"; // Optionnel, si tu veux afficher un loader

const IntegrationDemandesCount = () => {
    const [integrationDemandesCount, setIntegrationDemandesCount] = useState(null);  // Stocke le nombre de demandes d'intégration
    const [isLoading, setIsLoading] = useState(true);  // Indicateur de chargement
    const [error, setError] = useState(null);  // Pour gérer les erreurs

    const userId = getUser().id;  // Récupérer l'ID utilisateur actuel

    useEffect(() => {
        const fetchIntegrationDemandesCount = async () => {
            try {
                const count = await getIntegrationDemandesCountByEtudiant(userId);  // Récupérer le nombre de demandes d'intégration
                setIntegrationDemandesCount(count);  // Mettre à jour le state
                setIsLoading(false);  // Fin du chargement
            } catch (err) {
                setError('Erreur lors de la récupération des demandes d\'intégration.');
                setIsLoading(false);  // Fin du chargement même en cas d'erreur
            }
        };

        fetchIntegrationDemandesCount();  // Lancer le fetch
    }, [userId]);  // Effectue le fetch chaque fois que l'ID utilisateur change

    if (isLoading) {
        return <LoadingSpinner />;  // Affiche un spinner pendant le chargement
    }

    if (error) {
        return <div>{error}</div>;  // Affiche un message d'erreur si un problème survient
    }

    return (
        <div>
            <p>{integrationDemandesCount}</p>  
        </div>
    );
};

export default IntegrationDemandesCount;
