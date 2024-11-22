import React, { useState, useEffect } from "react";
import { getPublicationsHome } from "../../repositories/publications.repository"; // Assurez-vous d'importer correctement la fonction d'API
import Carousel from "../home/components/Carousel"; // Assurez-vous que Carousel est bien importé
import PublicationCard from "../../shared/components/cards/PublicationCard"; // Assurez-vous que PublicationCard est bien importé
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx"; 

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
  }, []); 

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <LoadingSpinner />
      </div>
    );
  }  if (error) return <div></div>;

  return (
    <div className="space-y-10">
      
      <Carousel 
      items={publications} 
      CardComponent={PublicationCard} 
      title="Publications récentes" 
      redirectUrl="/publications" 
    />

    </div>
  );
};

export default HomePublicationListing;
