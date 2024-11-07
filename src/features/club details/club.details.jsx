import React from "react";
import { Typography } from "@material-tailwind/react";
import { AiOutlineInstagram } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import logo from "../../assets/bac.jpeg";

const ClubDetails = () => {
  // Objet de données pour le club
  const club = {
    name: "Club de Photographie",
    description:
      "Le Club de Photographie offre une opportunité unique de capturer des moments spéciaux et de développer vos compétences en photographie. Que vous soyez débutant ou expert, rejoignez-nous pour des sorties, des ateliers et des concours passionnants !",
    instagram: "https://instagram.com/club_photo",
    image: logo,
  };

  return (
    <header className="bg-white p-8">
      <div className="container mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2">
        {/* Texte du Club */}
        <div className="row-start-2 lg:row-auto">
          {/* Titre du club */}
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-6 text-black text-7xl font-bold leading-tight"
          >
            {club.name}
          </Typography>

          {/* Description du club */}
          <Typography
            variant="lead"
            className="mb-6 text-gray-700 md:pr-16 xl:pr-28 text-lg font-light tracking-wider"
          >
            {club.description}
          </Typography>

          {/* Icônes du Club */}
          <div className="flex items-center space-x-4">
            <a
              href={club.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              <AiOutlineInstagram size={30} />
            </a>
            <button className="text-gray-600 hover:text-gray-800">
              <BiEditAlt size={24} />
            </button>
            <button className="text-red-600 hover:text-red-800">
              <RiDeleteBinLine size={24} />
            </button>
          </div>
        </div>

        {/* Image du Club */}
        <img
          src={club.image}
          alt="Club"
          className="h-[36rem] w-full rounded-xl object-cover"
        />
      </div>
    </header>
  );
};

export default ClubDetails;
