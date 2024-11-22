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
    <div className="flex justify-center gap-11 mt-8 w-full px-4">
        <SecureComponenet role='ROLE_USER' requiredClubRole="ADMIN">
            <StatCard
                title="Demandes d'intégration"
                number="120"
                color="orange"
                onClick={() => handleCardClick('#')} //
            />
        </SecureComponenet>
        <SecureComponenet role='ROLE_USER'>
            <StatCard
                title="Mes demandes"
                number="45"
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
