import React from "react";
import { Typography } from "@material-tailwind/react";
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/bac.jpeg";

function EventDetails() {
  const event = {
    name: "Conférence Tech 2024",
    description:
      "Une conférence dédiée aux dernières tendances en technologie, avec des conférenciers renommés et des ateliers interactifs.",
    date: "2024-11-15",
    location: "Palais des Congrès, Paris",
    budget: 1500,
    image: logo, // Remplace par l'URL de l'image réelle
  };
  const navigate = useNavigate();
  return (
    <header className="bg-white p-8">
      <button onClick={() => navigate(-1)} className="text-blue-500 mb-4">
        &larr; Back
      </button>
      <div className="container mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2">
        {/* Texte de l'événement */}
        <div className="row-start-2 lg:row-auto">
          {/* Nom de l'événement */}
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-6 text-black text-7xl font-bold leading-tight"
          >
            {event.name}
          </Typography>

          {/* Description de l'événement */}
          <Typography
            variant="lead"
            className="mb-6 text-gray-700 md:pr-16 xl:pr-28 text-lg font-light tracking-wider"
          >
            {event.description}
          </Typography>

          {/* Détails de l'événement */}
          <div className="mt-4 space-y-4">
            <p className="text-gray-500 flex items-center">
              <FaCalendarAlt className="mr-2 text-indigo-600" />
              <span>
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
              </span>
            </p>
            <p className="text-gray-500 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-green-600" />
              <span>
                <strong>Lieu:</strong> {event.location}
              </span>
            </p>
            <p className="text-gray-500 flex items-center">
              <FaDollarSign className="mr-2 text-yellow-600" />
              <span>
                <strong>Budget:</strong> ${event.budget}
              </span>
            </p>
          </div>
        </div>

        {/* Image de l'événement */}
        <img
          src={event.image}
          alt="Event"
          className="h-[36rem] w-full rounded-xl object-cover"
        />
      </div>
    </header>
  );
}

export default EventDetails;
