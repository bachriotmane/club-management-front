import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import de SweetAlert2
import SecureComponenet from "../../shared/components/utili/SecureComponenet.jsx"; 

import {
  getDemandeById2,
  getDemandes,
  updateDemandeStatus,
  getDemandesByDemandeurId,
  getDemandes_v2,
} from "../../repositories/Demandes.repository"; // Import de la fonction
import axiosInstance from "../../auth/axios.js";
import { getUser } from "../../auth/auth.js";
import {FaPlusCircle} from "react-icons/fa";
import { getClubs_v2 } from "../../repositories/clubs.repository.js";

const DemandesListing = () => {
  const [demandes, setDemandes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [filterType, setFilterType] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMyDemandes, setIsMyDemandes] = useState(false);
  const handleSearch = (e) => setSearchQuery(e.target.value);
  const [clubs, setClubs] = useState([]); 
  const [selectedClub, setSelectedClub] = useState(""); 


  const { id } = useParams();
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getUserId = id || getUser()?.id;
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

 // useEffect(() => {
    const user = getUser();
  //   const fetchUser = async () => {
  //     if (!getUserId) return; // Si aucun ID, pas besoin de faire l'appel API

  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const response = await axiosInstance.get(`/user/${getUserId}`);
  //       const fetchedUser = response.data;
  //       setUser(fetchedUser); // Assurez-vous que `user` est bien mis à jour avant d'utiliser
  //       console.log("user ::::::::::::::::: ", fetchedUser);
  //     } catch (err) {
  //       console.error("Error fetching user data: ", err);
  //       setError("Failed to fetch user data");
  //     } finally {
  //       setLoading(false); // Arrête le loader après l'appel
  //     }
  //   };

  //   fetchUser();
  // }, [getUserId]);




  const fetchDemandes = useCallback(async () => {
    try {
      const response = await getDemandes_v2({
        page: currentPage - 1, 
        size: 10, 
        type: filterType, 
        nom: searchQuery, 
        isMyDemandes: isMyDemandes,
        uuidClub: selectedClub,
      });
     console.log("response",response.content);
      setDemandes(response.content);
      setTotalPages(response.totalPages); 
      console.log("demandes",demandes);

    } catch (error) {
      console.error("Error fetching demandes:", error);
    }
  }, [currentPage, filterType, searchQuery, isMyDemandes,selectedClub]);

  useEffect(() => {
    fetchDemandes();
  }, [fetchDemandes]);
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const clubList = await getClubs_v2();
        console.log(clubList)
        setClubs(clubList); 
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

  const handleStatusChange = async (demandeId, newStatus, event) => {
    event.stopPropagation();
    const result = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: `Voulez-vous vraiment ${
        newStatus === "ACCEPTE" ? "accepter" : "refuser"
      } cette demande ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) {
      try {
        const demande = await getDemandeById2(demandeId);

        await updateDemandeStatus(demandeId, newStatus, user.fullName);

        const updatedDemandes = demandes.map((demande) =>
          demande.id === demandeId
            ? { ...demande, statutDemande: newStatus }
            : demande
        );
        setDemandes(updatedDemandes);

        Swal.fire(
          "Succès!",
          `La demande a été ${
            newStatus === "ACCEPTE" ? "acceptée" : "refusée"
          } avec succès.`,
          "success"
        );
      } catch (error) {
        console.error("Erreur lors du traitement de la demande :", error);
        Swal.fire("Erreur!", "Une erreur est survenue.", "error");
      }
    }
  };


 

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <button
            onClick={() => navigate("deposer")}
            className="absolute right-14 flex items-center bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-orange-700"
        >
          <FaPlusCircle className="mr-2"/>
          Déposer Demande
        </button>
        <h1 className="my-2 text-2xl">Demandes</h1>
        <div className="mb-4">
  <label className="mr-2 text-orange-600">Filtrer par type:</label>
  <select
    value={filterType}
    onChange={(e) => {
      setFilterType(e.target.value);
      setCurrentPage(1); 
    }}
    className="px-3 py-2 border rounded-lg bg-white text-gray-800 hover:border-orange-500 transition-all duration-300"
  >
    <option value="ALL">Tous</option>
    <option value="CREATION_CLUB">Création de club</option>
    <option value="INTEGRATION_CLUB">Intégration de club</option>
    <option value="EVENEMENT">Événements</option>
  </select>

  <label className="ml-4 mr-2 text-orange-600">Sélectionner un club:</label>
  <select
    value={selectedClub}
    onChange={(e) => setSelectedClub(e.target.value)}
    className="px-3 py-2 border rounded-lg bg-white text-gray-800 hover:border-orange-500 transition-all duration-300"
  >
    <option value="">Tous les clubs</option>
    {clubs.map((club) => (
      <option key={club.uuid} value={club.uuid}>
        {club.nom}
      </option>
    ))}
  </select>
</div>

        <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setIsMyDemandes(false);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full font-semibold ${!isMyDemandes ? "bg-orange-500 text-white" : "bg-orange-100 text-black"}`}
          >
            Demandes reçues
          </button>
          <SecureComponenet role="ROLE_USER">
            <button
              onClick={() => {
                setIsMyDemandes(true);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full font-semibold ${isMyDemandes ? "bg-orange-500 text-white" : "bg-orange-100 text-black"}`}
            >
              Mes demandes
            </button>
          </SecureComponenet>
        </div>
        <input
          type="text"
          placeholder="Rechercher un club..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-3 border border-gray-300 rounded-full w-1/3"
        />
      </div>
        {/* Tableau des demandes */}
        <table className="min-w-full border">
          <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">CNE</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Action</th>
            <th className="px-4 py-2 border">Historiques</th>
          </tr>
          </thead>
          
          <tbody>
          {demandes.map((demande) => (
              <tr
                  key={demande.id}
                  className="cursor-pointer hover:bg-gray-100"
              >
                <td className="px-4 py-2 border text-center hover:underline" onClick={() => navigate(`/demandes/${demande.id}`)}>#{demande.id}</td>
                <td className="px-4 py-2 border text-center">
                  {demande.cne || "Non spécifié"}
                </td>
                <td className="px-4 py-2 border text-center">
                  {new Date(demande.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border text-center">
                <span
                    className={`${
                        demande.statutDemande === "EN_COURS"
                            ? "bg-orange-500 text-white"
                            : demande.statutDemande === "ACCEPTE"
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                    } py-1 px-2 rounded-full font-semibold`}
                >
                  {demande.statutDemande === "EN_COURS"
                      ? "En cours"
                      : demande.statutDemande === "ACCEPTE"
                          ? "Acceptée"
                          : "Refusée"}
                </span>
                </td>
                <td className="px-4 py-2 border text-center">
                  <div>
                    {demande.statutDemande === "EN_COURS" && (
                        <div>
                          <button
                              onClick={(event) =>
                                  handleStatusChange(demande.id, "ACCEPTE", event)
                              }
                              className="text-green-500 hover:text-green-700 mx-1"
                          >
                        <span role="img" aria-label="check">
                          &#10004;
                        </span>
                          </button>
                          <button
                              onClick={(event) =>
                                  handleStatusChange(demande.id, "REFUSE", event)
                              }
                              className="text-red-500 hover:text-red-700 mx-1"
                          >
                        <span role="img" aria-label="cross">
                          &#10006;
                        </span>
                          </button>
                        </div>
                    )}
                    {demande.statutDemande !== "EN_COURS" && (
                        <span className="text-gray-500">Action terminée</span>
                    )}
                  </div>
                </td>
                <td className="text-center">
                  <button
                      onClick={() => navigate(`/demandes/historique/${demande.id}`)}
                      className="bg-orange-500 p-2 text-white font-bold rounded-xl"
                  >
                    historique
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>


      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 disabled:bg-gray-400"
        >
          Précédent
        </button>
        <span className="text-lg">{`Page ${currentPage} sur ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 disabled:bg-gray-400"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default DemandesListing;