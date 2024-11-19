import React, { useState, useEffect } from "react";
import { getEventsHome } from "../../repositories/evenements.repository"; 
import Carousel from "../home/components/Carousel"; 
import EventCard from "../../shared/components/cards/EventCard"; 

const HomeEventsListing = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventsData = async () => {
      setLoading(true);
      try {
        const data = await getEventsHome({ limit: 7 }); 
        setEvents(data); 
      } catch (error) {
        setError("Erreur lors du chargement des événements");
      } finally {
        setLoading(false);
      }
    };

    fetchEventsData();
  }, []); 

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-10">
      
      <Carousel items={events} CardComponent={EventCard} title="Liste des Événements" />
    </div>
  );
};

export default HomeEventsListing;
