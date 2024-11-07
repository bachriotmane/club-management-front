import React from 'react';
import StatCard from '../../../shared/components/cards/StatCard';

const StatSection = () => {
  return (
    <div className="flex justify-center gap-28 mt-8 ">
      <StatCard title="Demandes d'intégration" number="120" color="orange" />
      <StatCard title="Mes demandes" number="45" color="blue" />
      <StatCard title="Demandes d'événements" number="78" color="green" />
    </div>
  );
};

export default StatSection;
