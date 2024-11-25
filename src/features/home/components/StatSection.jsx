import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../../shared/components/cards/StatCard';
import SecureComponenet from "../../../shared/components/utili/SecureComponenet.jsx";
import DemandesCount from '../../demande numbers/mesDemandesCount.jsx';
import IntegrationDemandesCount from '../../demande numbers/mesDemandes Integraation.jsx';

const StatSection = () => {
  const navigate = useNavigate();

  const handleCardClick = (page) => {
    navigate(`/demandes/${page}`); // Redirige vers la page des demandes avec le type
  };

  return (
    <div className="flex justify-center gap-11 mt-8 w-full px-4">
        <SecureComponenet role='ROLE_USER' requiredClubRole="ADMIN">
            <StatCard
                title="Demandes d'intégration"
                number={<IntegrationDemandesCount />}
                color="orange"
                onClick={() => handleCardClick('mes-demandes?type=integration')} //
            />
        </SecureComponenet>
        <SecureComponenet role='ROLE_USER'>
            <StatCard
                title="Mes demandes"
                number={<DemandesCount />}
                color="blue"
                onClick={() => handleCardClick('mes-demandes')} //
            />
        </SecureComponenet>
        <SecureComponenet role='ROLE_ADMIN'>
            <StatCard
                title="Demandes d'événements"
                number="78"
                color="green"
                onClick={() => handleCardClick('#')} //
            />
        </SecureComponenet>
    </div>
  );
};

export default StatSection;
