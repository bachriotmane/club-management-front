import React, { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import ClubCard from "../../shared/components/cards/ClubCard";
import { getClubs } from "../../repositories/clubs.repository";
import noFindImage from "../../assets/not-items-found.png";
import LoadingSpinner from "../../shared/components/utili/LoadingCompnent.jsx";

const ClubsListingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [clubs, setClubs] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);

  const fetchClubs = useCallback(async (page, size, nomClub = "", idUser = "") => {
    setLoading(true);
    try {
      const data = await getClubs({ page, size, nomClub, idUser });
      setClubs((prevClubs) => [...prevClubs, ...data.data]);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.id || "";
      } catch (error) {
        console.error("Invalid token format", error);
      }
    }
    return "";
  };

  useEffect(() => {
    const idUser = activeView === "all" ? "" : getUserIdFromToken();
    setClubs([]);
    setCurrentPage(0);
    fetchClubs(0, 3, searchQuery, idUser);
  }, [activeView, searchQuery, fetchClubs]);

  useEffect(() => {
    if (currentPage > 0) {
      const idUser = activeView === "all" ? "" : getUserIdFromToken();
      fetchClubs(currentPage, 3, searchQuery, idUser);
    }
  }, [currentPage, fetchClubs, searchQuery, activeView]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setClubs([]);
    setCurrentPage(0);
  };

  const handleViewChange = (view) => {
    if (view === activeView) return;
    setActiveView(view);
    setClubs([]);
    setCurrentPage(0);
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
            className={`px-4 py-2 rounded-full font-semibold ${activeView === "all" ? "bg-orange-500 text-white shadow-md" : "bg-orange-100 text-black shadow-md"}`}
          >
            Tous les clubs
          </button>
          <button
            onClick={() => handleViewChange("myClubs")}
            className={`px-4 py-2 rounded-full font-semibold ${activeView === "myClubs" ? "bg-orange-500 text-white shadow-md" : "bg-orange-100 text-black shadow-md"}`}
          >
            Mes Clubs
          </button>
        </div>

        <input
          type="text"
          placeholder="Rechercher un club..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-3 border border-gray-300 rounded-full w-1/3"
        />
      </div>

      {clubs.length === 0 && !loading ? (
        <div className="flex flex-col items-center mt-6">
          <img src={noFindImage} alt="Aucun résultat trouvé" className="w-80 h-auto" />
          <span className="mt-4 text-xl font-semibold">Aucun club trouvé pour votre recherche</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club, index) => (
          <ClubCard key={`${club.uuid}-${index}`} item={club} />
        ))}
      </div>
      
      )}

      {loading && (
        <div className="flex justify-center mt-6">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default ClubsListingPage;
