import React, { useState, useEffect } from 'react';
import { getIntegrationDemandesCountByEtudiant } from '../../repositories/Demandes.repository.js'; 
import { getUser } from '../../auth/auth'; // Récupérer l'utilisateur actuel
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx"; 

const IntegrationDemandesCount = () => {
    const [integrationDemandesCount, setIntegrationDemandesCount] = useState(null);  
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null);  

    const userId = getUser().id;  
    useEffect(() => {
        const fetchIntegrationDemandesCount = async () => {
            try {
                const count = await getIntegrationDemandesCountByEtudiant(userId);  // Récupérer le nombre de demandes d'intégration
                setIntegrationDemandesCount(count);  
                setIsLoading(false);  
            } catch (err) {
                setError('?');
                setIsLoading(false);  
            }
        };

        fetchIntegrationDemandesCount();  
    }, [userId]);  

    if (isLoading) {
        return <LoadingSpinner />;  
    }

    if (error) {
        return <div>{error}</div>;  
    }

    return (
        <div>
            <p>{integrationDemandesCount}</p>  
        </div>
    );
};

export default IntegrationDemandesCount;
