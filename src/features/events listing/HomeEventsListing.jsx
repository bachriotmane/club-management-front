import React, { useState, useEffect } from "react";
import { getEventsHome } from "../../repositories/evenements.repository";
import { getImage } from "../../repositories/image.repository";
import Carousel from "../home/components/Carousel";
import EventCard from "../../shared/components/cards/EventCard";
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx";

const HomeEventsListing = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState({}); // Stockage des images

  useEffect(() => {
    const fetchEventsData = async () => {
      setLoading(true);
      try {
        const data = await getEventsHome({ limit: 7 });

        setEvents(data); 
      } catch (error) {
        console.error("HomeEventsListing: Erreur lors du fetch des événements:", error);
        setError("Erreur lors du chargement des événements");
      } finally {
        setLoading(false);
      }
    };

    fetchEventsData();
  }, []); 

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = {};
      for (const event of events) {
        if (event?.imageId) {
          try {
            const image = await getImage(event.imageId);
            fetchedImages[event.imageId] = image;
          } catch (error) {
            console.error(`HomeEventsListing: Erreur lors du chargement de l'image pour ${event.nom}:`, error);
            fetchedImages[event.imageId] = "default-image.jpg"; // Image par défaut en cas d'erreur
          }
        } else {
          
          fetchedImages[event.imageId] = "default-image.jpg";
        }
      }
      setImages(fetchedImages);console.log("eventnsnsnsn",fetchedImages);
    }; 

    if (events.length > 0) {
      fetchImages();
    }
  }, [events]); 

  if (loading) {
    console.log("HomeEventsListing: Chargement en cours...");
    return (
      <div className="flex justify-center mt-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    console.error("HomeEventsListing: Une erreur s'est produite:", error);
    return (
      <div className="flex justify-center items-center w-full h-20 bg-red-200 rounded-lg mt-20">
        <div className="text-center text-black font-bold text-2xl">
          Oops! Something went wrong: {error}
        </div>
      </div>
    );
  }

  console.log("HomeEventsListing: Affichage des événements dans le carousel:", events);

  return (
    <div className="space-y-10">
      <Carousel 
        items={events.map(event => ({ 
          ...event, 
          image: images[event.imageId] || "default-image.jpg" 
        }))} 
        CardComponent={EventCard} 
        title="Événements populaires" 
        redirectUrl="/events" 
      />
    </div>
  );
};

export default HomeEventsListing;
