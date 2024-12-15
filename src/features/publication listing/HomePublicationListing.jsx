import React, { useState, useEffect } from "react";
import { getPublicationsHome } from "../../repositories/publications.repository"; 
import Carousel from "../home/components/Carousel"; 
import PublicationCard from "../../shared/components/cards/PublicationCard"; 
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx"; 
import { getImage } from "../../repositories/image.repository.js";

const HomePublicationListing = () => {
  const [publications, setPublications] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  
    setImages(fetchedImages);
  };
  

  useEffect(() => {
    const fetchPublicationsData = async () => {
      setLoading(true);
      try {
        console.log("Fetching publications with limit 7...");
        const data = await getPublicationsHome({ limit: 7 }); 

        setPublications(data);
        await fetchImages(data); 
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
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-600">
        {error}
      </div>
    );
  }

  console.log("Rendering publications with images:", publications.map((pub) => ({
    ...pub,
    image: images[pub.imageId],
  })));

  return (
    <div className="space-y-10">
      <Carousel 
        items={publications.map((pub) => ({
          ...pub,
          image: images[pub.imageId], 
        }))}
        CardComponent={PublicationCard}
        title="Publications récentes"
        redirectUrl="/publications"
      />
    </div>
  );
};

export default HomePublicationListing;
