import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../../shared/components/cards/StatCard';
import SecureComponenet from "../../../shared/components/utili/SecureComponenet.jsx";

const StatSection = () => {
    const navigate = useNavigate();

    const handleCardClick = (page) => {
        navigate(`/demandes/${page}`); // Redirige vers la page des demandes avec le type
    };

    return (
        <div className="flex flex-wrap gap-4 mt-8 w-full px-4">
            <SecureComponenet role='ROLE_USER' requiredClubRole="ADMIN">
                <div className="flex-1 min-w-[calc(33.33%-1rem)] md:min-w-[calc(25%-1rem)] flex-grow">
                    <StatCard
                        title="Demandes d'intégration"
                        number="120"
                        color="orange"
                        onClick={() => handleCardClick('#')}
                    />
                </div>
            </SecureComponenet>
            <SecureComponenet role='ROLE_USER'>
                <div className="flex-1 min-w-[calc(33.33%-1rem)] md:min-w-[calc(25%-1rem)] flex-grow">
                    <StatCard
                        title="Mes demandes"
                        number="45"
                        color="blue"
                        onClick={() => handleCardClick('mes-demandes')}
                    />
                </div>
            </SecureComponenet>
            <SecureComponenet role='ROLE_ADMIN'>
                <div className="flex-1 min-w-[calc(33.33%-1rem)] md:min-w-[calc(25%-1rem)] flex-grow">
                    <StatCard
                        title="Demandes d'événements"
                        number="78"
                        color="green"
                        onClick={() => handleCardClick('#')}
                    />
                </div>
            </SecureComponenet>
        </div>
    );
};

export default StatSection;
