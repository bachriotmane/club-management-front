import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../../shared/components/cards/StatCard';
import SecureComponenet from "../../../shared/components/utili/SecureComponenet.jsx";
import DemandesCount from '../../demande numbers/mesDemandesCount.jsx';
import IntegrationDemandesCount from '../../demande numbers/mesDemandes Integraation.jsx';
import EvenementDemandesCount from '../../demande numbers/EvenementDemandesCount.jsx';
import CreationClubDemandesCount from '../../demande numbers/CreationClubDemandesCount.jsx';


const StatSection = () => {
    const navigate = useNavigate();

    const handleCardClick = (page) => {
        navigate(`/demandes/${page}`); // Redirige vers la page des demandes avec le type
    };

    return (
        <div className="flex flex-wrap gap-4 mt-8 w-full px-4">
            <SecureComponenet role='ROLE_USER'>
                <div className="flex-1 min-w-[calc(33.33%-1rem)] md:min-w-[calc(25%-1rem)] flex-grow">
                    <StatCard
                        title="Demandes d'intégration"
                        number={<IntegrationDemandesCount />}
                        color="orange"
                        onClick={() => handleCardClick('#')}
                    />
                </div>
            </SecureComponenet>
            <SecureComponenet role='ROLE_USER'>
                <div className="flex-1 min-w-[calc(33.33%-1rem)] md:min-w-[calc(25%-1rem)] flex-grow">
                    <StatCard
                        title="Mes demandes"
                        number={<DemandesCount />}
                        color="blue"
                        onClick={() => handleCardClick('#')}
                    />
                </div>
            </SecureComponenet>
            <SecureComponenet role='ROLE_ADMIN'>
                <div className="flex-1 min-w-[calc(33.33%-1rem)] md:min-w-[calc(25%-1rem)] flex-grow">
                    <StatCard
                        title="Demandes de création club"
                        number={<CreationClubDemandesCount />}
                        color="blue"
                        onClick={() => handleCardClick('#')}
                    />
                </div>
            </SecureComponenet>
            <SecureComponenet role='ROLE_ADMIN'>
                <div className="flex-1 min-w-[calc(33.33%-1rem)] md:min-w-[calc(25%-1rem)] flex-grow">
                    <StatCard
                        title="Demandes d'événements"
                        number={<EvenementDemandesCount />}
                        color="green"
                        onClick={() => handleCardClick('#')}
                    />
                </div>
            </SecureComponenet>
        </div>
    );
};

export default StatSection;
