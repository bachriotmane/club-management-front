import React, { useState, useEffect } from 'react';
import { getEvenementDemandesCountEnCours } from '../../repositories/Demandes.repository.js';
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx";

const EvenementDemandesCount = () => {
    const [evenementDemandesCount, setEvenementDemandesCount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvenementDemandesCount = async () => {
            try {
                const count = await getEvenementDemandesCountEnCours();
                setEvenementDemandesCount(count);
                setIsLoading(false);
            } catch (err) {
                setError('?');
                setIsLoading(false);
            }
        };

        fetchEvenementDemandesCount();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <p>{evenementDemandesCount}</p>
        </div>
    );
};

export default EvenementDemandesCount;
