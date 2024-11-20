import React, { useState, useEffect } from "react";
import { getPublicationsHome } from "../../repositories/publications.repository"; // Assurez-vous d'importer correctement la fonction d'API
import Carousel from "../home/components/Carousel"; // Assurez-vous que Carousel est bien importé
import PublicationCard from "../../shared/components/cards/PublicationCard"; // Assurez-vous que PublicationCard est bien importé

const HomePublicationListing = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicationsData = async () => {
      setLoading(true);
      try {
        const data = await getPublicationsHome({ limit: 7 }); // Limite à 7 publications
        setPublications(data); // Stocke directement les publications (puisque data est déjà les publications)
      } catch (error) {
        setError("Erreur lors du chargement des publications");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicationsData();
  }, []); // Appel de l'API au montage du composant

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-10">
      {/* Affichage des publications dans un Carousel */}
      <Carousel items={publications} CardComponent={PublicationCard} title="Liste des Publications" />
    </div>
  );
};

export default HomePublicationListing;
