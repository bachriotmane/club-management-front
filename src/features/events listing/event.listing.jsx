import React from "react";
import EventCard from "../../shared/components/cards/EventCard";

// Exemple de données pour les événements
const events = [
  {
    id: 1,
    image: "https://example.com/image1.jpg",
    nom: "Festival de Musique",
    description:
      "Un festival de musique avec de nombreux artistes locaux et internationaux.",
    date: "2024-12-05",
    location: "Casablanca, Maroc",
    budget: 5000,
  },
  {
    id: 2,
    image: "https://example.com/image2.jpg",
    nom: "Conférence Tech",
    description:
      "Une conférence pour les passionnés de technologie et les développeurs.",
    date: "2024-11-20",
    location: "Marrakech, Maroc",
    budget: 2000,
  },
  {
    id: 3,
    image: "https://example.com/image3.jpg",
    nom: "Salon de l'Art",
    description:
      "Un salon dédié aux amateurs d'art, avec des expositions de divers artistes.",
    date: "2025-01-15",
    location: "Rabat, Maroc",
    budget: 3000,
  },
];

const EventsListing = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Liste des Événements
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsListing;
