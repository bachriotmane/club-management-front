import React, { useState, useEffect, useCallback } from "react";
import ClubCard from "../../shared/components/cards/ClubCard.jsx";
import { getClubs } from "../../repositories/clubs.repository.js";
import noFindImage from "../../assets/not-items-found.png";
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx";
import SecureComponenet from "../../shared/components/utili/SecureComponenet.jsx";
import { getImage } from "../../repositories/image.repository.js";

const ClubsListingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [clubs, setClubs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);

  const fetchClubs = useCallback(
    async (page, size, nomClub = "", isMyClubs = false) => {
      try {
        const data = await getClubs({ page, size, nomClub, isMyClubs });

        const clubsWithLogos = await Promise.all(
          data.data.map(async (club) => {
            try {
              const logoUrl = club.logo
                ? await getImage(club.logo)
                : "/default-image.jpg";
              return { ...club, logo: logoUrl };
            } catch (error) {
              console.error(`Erreur lors du chargement de l'image pour ${club.nom}:`, error);
              return { ...club, logo: "/default-image.jpg" };
            }
          })
        );

        setClubs((prevClubs) => {
          const newClubs = clubsWithLogos.filter(
            (newClub) => !prevClubs.some((club) => club.uuid === newClub.uuid)
          );
          return [...prevClubs, ...newClubs];
        });

        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        //setLoading(false);
      }
    },
    []
  );

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 10;
    if (bottom  && currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const isMyClubs = activeView === "all" ? false : true;
    setClubs([]);
    setCurrentPage(0);
    fetchClubs(0, 3, searchQuery, isMyClubs);
  }, [activeView, searchQuery, fetchClubs]);

  useEffect(() => {
    if (currentPage > 0) {
      const isMyClubs = activeView === "all" ? false : true;
      fetchClubs(currentPage, 3, searchQuery, isMyClubs);
    }
  }, [currentPage, fetchClubs, searchQuery, activeView]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewChange = (view) => {
    if (view !== activeView) {
      setActiveView(view);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-20 bg-red-200 rounded-lg mt-20">
        <div className="text-center text-black font-bold text-2xl">
          Oops! Something went wrong: {error}
        </div>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto p-6"
      onScroll={handleScroll}
      style={{ height: "80vh", overflowY: "auto" }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => handleViewChange("all")}
            className={`px-4 py-2 rounded-full font-semibold ${
              activeView === "all"
                ? "bg-orange-500 text-white shadow-md"
                : "bg-orange-100 text-black shadow-md"
            }`}
          >
            Tous les clubs
          </button>
          <SecureComponenet role="ROLE_USER">
            <button
              onClick={() => handleViewChange("myClubs")}
              className={`px-4 py-2 rounded-full font-semibold ${
                activeView === "myClubs"
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-orange-100 text-black shadow-md"
              }`}
            >
              Mes Clubs
            </button>
          </SecureComponenet>
        </div>
        <input
           type="text"
           placeholder="Rechercher un club..."
           value={searchQuery}
           onChange={handleSearch}
           className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
       />

      </div>

      {clubs.length === 0  ? (
        <div className="flex flex-col items-center mt-6">
          <img src={noFindImage} alt="Aucun résultat trouvé" className="w-80 h-auto" />
          <span className="mt-4 text-xl font-semibold">
            Aucun club trouvé pour votre recherche
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <ClubCard key={club.uuid} item={club} />
          ))}
        </div>
      )}

      {/*loading && (
        <div className="flex justify-center mt-6">
          <LoadingSpinner />
        </div>
      )*/}
    </div>
  );
};

export default ClubsListingPage;
