import React, { useState, useEffect, useCallback } from "react";
import {jwtDecode} from "jwt-decode"; 
import ClubCard from "../../shared/components/cards/ClubCard";
import { getClubs } from "../../repositories/clubs.repository";

const ClubsListingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [clubs, setClubs] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);

  const fetchClubs = useCallback(async (page, size, nomClub = "", idUser = 0) => {
    setLoading(true);
    try {
      console.log("userid is   ",idUser);
      const data = await getClubs({ page, size, nomClub, idUser });
      setClubs((prevClubs) => [...prevClubs, ...data.data]);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching clubs", error);
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
        return decodedToken.id || 0; 
      } catch (error) {
        console.error("Invalid token format", error);
      }
    }
    return 0;
  };

  useEffect(() => {
    const idUser = activeView === "all" ? 0 : getUserIdFromToken();
    fetchClubs(currentPage, 3, searchQuery, idUser);
  }, [currentPage, searchQuery, fetchClubs, activeView]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setClubs([]);
    setCurrentPage(0);
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    setClubs([]);
    setCurrentPage(0);
  };

 
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
      {clubs.length === 0 ?
                <span className="flex justify-center font-bold text-2xl">Oops pas de clubs!</span>  :
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <ClubCard key={club.uuid} item={club} />
        ))}
      </div>
}

      {loading && (
        <div className="flex justify-center mt-6">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ClubsListingPage;
