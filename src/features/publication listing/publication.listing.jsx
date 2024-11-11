import React from "react";
import {
  FaRegHeart,
  FaComment,
  FaShareAlt,
  FaRegClock,
  FaCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PublicationCard from "../../shared/components/cards/PublicationCard";

const publications = [
  {
    id: 1,
    titre: "Club de Photographie",
    description:
      "Découvrez le monde à travers l'objectif avec notre club de photographie.",
    date: "2024-11-11T09:30:00",
    image: "bac.jpeg",
    isPublic: true,
  },
  {
    id: 2,
    titre: "Club de Robotique",
    description: "Apprenez à construire et à programmer des robots avec nous !",
    date: "2024-11-12T14:00:00",
    image: "bac.jpeg",
    isPublic: true,
  },
  {
    id: 3,
    titre: "Club de Cuisine",
    description:
      "Partagez des recettes et apprenez des techniques de cuisine avec les meilleurs.",
    date: "2024-11-13T10:00:00",
    image: "bac.jpeg",
    isPublic: false,
  },
  {
    id: 4,
    titre: "Club de Lecture",
    description:
      "Rejoignez-nous pour discuter de vos livres préférés et découvrir de nouvelles lectures.",
    date: "2024-11-14T16:30:00",
    image: "bac.jpeg",
    isPublic: true,
  },
  {
    id: 5,
    titre: "Club de Musique",
    description:
      "Explorez différents styles de musique et développez vos compétences musicales.",
    date: "2024-11-15T18:00:00",
    image: "bac.jpeg",
    isPublic: true,
  },
  {
    id: 6,
    titre: "Club de Théâtre",
    description:
      "Développez votre expression et apprenez les bases de l'art dramatique.",
    date: "2024-11-16T19:00:00",
    image: "bac.jpeg",
    isPublic: false,
  },
];

const PublicationsList = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Nos Clubs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {publications.map((item) => (
          <PublicationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PublicationsList;
