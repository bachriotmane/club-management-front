import React, { useState, useEffect } from 'react';
import { getDemandesCountByEtudiant } from '../../repositories/Demandes.repository.js'; 
import { getUser } from '../../auth/auth'; 
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx"; 

const DemandesCount = () => {
    const [demandesCount, setDemandesCount] = useState(null);  
    const [isLoading, setIsLoading] = useState(true);  
    const [error, setError] = useState(null);  

    const userId = getUser().id; console.log(getUser()); 

    useEffect(() => {
        const fetchDemandesCount = async () => {
            try {
                const count = await getDemandesCountByEtudiant(userId);  
                setDemandesCount(count);  
                setIsLoading(false);  
            } catch (err) {
                setError('?');
                setIsLoading(false);  
            }
        };

        fetchDemandesCount();  
    }, [userId]);  

    if (isLoading) {
        return <LoadingSpinner />; 
    }

    if (error) {
        return <div>{error}</div>;  
    }

    return ( 
        <div>
            <p> {demandesCount}</p>  
        </div>
    );
};

export default DemandesCount;
