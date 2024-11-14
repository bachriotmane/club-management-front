import React from "react";
import { Typography } from "@material-tailwind/react";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/bac.jpeg";

function PublicationDetails() {
  const publication = {
    title: "Découverte des Étoiles",
    description:
      "Un article fascinant sur l'astronomie et les dernières découvertes sur les étoiles, leurs formations, et leurs cycles de vie.",
    date: "2024-11-10",
    author: "John Doe",
    image: logo, // Remplace par l'URL de l'image réelle
  };

  const navigate = useNavigate();

  return (
    <header className="bg-white p-8">
      <button onClick={() => navigate(-1)} className="text-blue-500 mb-4">
        &larr; Retour
      </button>
      <div className="container mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2">
        {/* Texte de la publication */}
        <div className="row-start-2 lg:row-auto">
          {/* Titre de la publication */}
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-6 text-black text-7xl font-bold leading-tight"
          >
            {publication.title}
          </Typography>

          {/* Description de la publication */}
          <Typography
            variant="lead"
            className="mb-6 text-gray-700 md:pr-16 xl:pr-28 text-lg font-light tracking-wider"
          >
            {publication.description}
          </Typography>

          {/* Détails de la publication */}
          <div className="mt-4 space-y-4">
            <p className="text-gray-500 flex items-center">
              <FaCalendarAlt className="mr-2 text-indigo-600" />
              <span>
                <strong>Date de publication:</strong>{" "}
                {new Date(publication.date).toLocaleDateString()}
              </span>
            </p>
            <p className="text-gray-500 flex items-center">
              <FaUser className="mr-2 text-blue-600" />
              <span>
                <strong>Auteur:</strong> {publication.author}
              </span>
            </p>
          </div>
        </div>

        {/* Image de la publication */}
        <img
          src={publication.image}
          alt="Publication"
          className="h-[36rem] w-full rounded-xl object-cover"
        />
      </div>
    </header>
  );
}

export default PublicationDetails;
