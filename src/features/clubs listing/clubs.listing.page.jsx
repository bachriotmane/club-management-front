import React from "react";
import ClubCard from "../../shared/components/cards/ClubCard";
import logo from "../../assets/bac.jpeg";

// Exemple de données pour les clubs
const clubs = [
  {
    id: 1,
    logo: logo,
    nom: "Club de Photographie",
    description: "Un club pour les amateurs de photographie.",
    createdAt: "2022-01-15",
    instagramme: "club_photo",
  },
  {
    id: 2,
    logo: logo,
    nom: "Club de Programmation",
    description: "Un club pour les passionnés de programmation.",
    createdAt: "2021-09-10",
    instagramme: "club_programmation",
  },
  // Ajoutez plus de clubs ici...
];

const ClubsListingPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Liste des Clubs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <ClubCard key={club.id} item={club} />
        ))}
      </div>
    </div>
  );
};

export default ClubsListingPage;
