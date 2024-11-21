import React, { useState, useEffect } from "react";
import { getClubsHome } from "../../repositories/clubs.repository"; // Importation de la fonction API
import Carousel from "../home/components/Carousel"; // Assure-toi que Carousel est bien importé
import ClubCard from "../../shared/components/cards/ClubCard"; // Assure-toi que ClubCard est bien importé

const HomeClubListing = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubsData = async () => {
      setLoading(true);
      try {
        const data = await getClubsHome({ limit: 7 });
        setClubs(data.data); 
      } catch (error) {
        setError("Erreur lors du chargement des clubs");
      } finally {
        setLoading(false);
      }
    };

    fetchClubsData();
  }, []); 

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-10">
     
      <Carousel items={clubs} CardComponent={ClubCard} title="Liste des Clubs" />
    </div>
  );
};

export default HomeClubListing;
