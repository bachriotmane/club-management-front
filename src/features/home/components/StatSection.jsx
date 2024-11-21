import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../../shared/components/cards/StatCard';

const StatSection = () => {
  const navigate = useNavigate();

  const handleCardClick = (page) => {
    navigate(`/demandes/${page}`); // Redirige vers la page des demandes avec le type
  };

  return (
    <div className="flex justify-center gap-11 mt-8 w-full px-4">
      <StatCard
        title="Demandes d'intégration"
        number="120"
        color="orange"
        onClick={() => handleCardClick('#')} // 
      />
      <StatCard
        title="Mes demandes"
        number="45"
        color="blue"
        onClick={() => handleCardClick('mes-demandes')} // 
      />
      <StatCard
        title="Demandes d'événements"
        number="78"
        color="green"
        onClick={() => handleCardClick('#')} // 
      />
    </div>
  );
};

export default StatSection;
