import React, { useState, useEffect } from "react";
import { getPublicationsHome } from "../../repositories/publications.repository"; 
import { getImage } from "../../repositories/image.repository.js"; 
import Carousel from "../home/components/Carousel"; 
import PublicationCard from "../../shared/components/cards/PublicationCard"; 
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx"; 

const HomePublicationListing = () => {
  const [publications, setPublications] = useState([]); // Liste des publications
  const [images, setImages] = useState({}); // Dictionnaire des images par ID
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  /**
   * Récupère les images associées aux publications.
   * Si aucune image n'est disponible, une image par défaut est utilisée.
   */
  const fetchImages = async (publications) => {
    const defaultImage = "default-image.jpg"; 
    const fetchedImages = {};
  
    for (const pub of publications) {
      if (pub.imageId) {
        try {
          console.log(`Fetching image for publication ID: ${pub.id}, image ID: ${pub.imageId}`);
          const image = await getImage(pub.imageId);
          fetchedImages[pub.imageId] = image;
        } catch (error) {
          console.error(`Error fetching image for image ID ${pub.imageId}:`, error);
          fetchedImages[pub.imageId] = defaultImage; 
        }
      } else {
        fetchedImages[pub.imageId] = defaultImage; 
      }
    }
    setImages(fetchedImages); // Mise à jour des images
  };

  /**
   * Récupère les données des publications et leurs images au montage du composant.
   */
  useEffect(() => {
    const fetchPublicationsData = async () => {
      setLoading(true);
      try {
        console.log("Fetching publications with limit 7...");
        const data = await getPublicationsHome({ limit: 7 }); 
        setPublications(data); 
        await fetchImages(data); 
      } catch (error) {
        console.error("Erreur lors du chargement des publications:", error);
        setError("Erreur lors du chargement des publications");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicationsData();
  }, []); // Exécuté uniquement au montage du composant

  // Gestion du chargement et des erreurs
  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center mt-20 text-red-600">
        {error}
      </div>
    );
  }

  // Journalisation pour le débogage
  console.log("Rendering publications with images:", publications.map((pub) => ({
    ...pub,
    image: images[pub.imageId], // Associe chaque publication à son image
  })));

  return (
    <div className="space-y-10">
      <Carousel 
        items={publications.map((pub) => ({
          ...pub,
          image: images[pub.imageId], // Ajoute l'image à chaque publication
        }))}
        CardComponent={PublicationCard}
        title="Publications récentes"
        redirectUrl="/publications"
      />
    </div>
  );
};

export default HomePublicationListing;
