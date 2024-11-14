import React, { useState } from "react";
import ClubCard from "../../shared/components/cards/ClubCard";
import logo from "../../assets/bac.jpeg";

// Sample club data
const allClubs = [
  {
    id: 1,
    logo: logo,
    nom: "Club de Photographie",
    description: "Un club pour les amateurs de photographie. Un club pour les amateurs de photographieUn club pour les amateurs de photographie",
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
  {
    id: 3,
    logo: logo,
    nom: "Club de Programmation",
    description: "Un club pour les passionnés de programmation.",
    createdAt: "2021-09-10",
    instagramme: "club_programmation",
  },
  {
    id: 4,
    logo: logo,
    nom: "Club de Programmation",
    description: "Un club pour les passionnés de programmation.",
    createdAt: "2021-09-10",
    instagramme: "club_programmation",
  },
  {
    id: 5,
    logo: logo,
    nom: "Club de Programmation",
    description: "Un club pour les passionnés de programmation.",
    createdAt: "2021-09-10",
    instagramme: "club_programmation",
  },
  {
    id: 6,
    logo: logo,
    nom: "Club de Programmation",
    description: "Un club pour les passionnés de programmation.",
    createdAt: "2021-09-10",
    instagramme: "club_programmation",
  },
];

const ClubsListingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState("all"); // Track active button

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const filteredClubs = allClubs.filter((club) => {
    // Show all clubs or user's clubs based on `activeView`
    return activeView === "all" || club.isUserClub;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        {/* Toggle buttons for view selection */}
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveView("all")}
            className={`px-4 py-2 rounded-full font-semibold ${
              activeView === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Tous les clubs
          </button>
          <button
            onClick={() => setActiveView("myClubs")}
            className={`px-4 py-2 rounded-full font-semibold ${
              activeView === "myClubs" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Mes Clubs
          </button>
        </div>

        {/* Search box */}
        <input
          type="text"
          placeholder="Rechercher un club..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-3 border border-gray-300 rounded-full w-1/3"
        />
      </div>

      {/* Display filtered clubs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <ClubCard key={club.id} item={club} />
        ))}
      </div>
    </div>
  );
};

export default ClubsListingPage;
