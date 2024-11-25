import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import de SweetAlert2
import {
  getDemandeById2,
  getDemandes,
  updateDemandeStatus,
  getDemandesByDemandeurId,
} from "../../repositories/Demandes.repository"; // Import de la fonction
import axiosInstance from "../../auth/axios.js";
import { getUser } from "../../auth/auth.js";
import {FaPlusCircle} from "react-icons/fa";

const DemandesListing = () => {
  const [demandes, setDemandes] = useState([]);
  const [myDemandes, setMyDemandes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [filterType, setFilterType] = useState("ALL");

  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getUserId = id || getUser()?.id;
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  useEffect(() => {
    const fetchUser = async () => {
      if (!getUserId) return; // Si aucun ID, pas besoin de faire l'appel API

      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`/user/${getUserId}`);
        const fetchedUser = response.data;
        setUser(fetchedUser); // Assurez-vous que `user` est bien mis à jour avant d'utiliser
        console.log("user ::::::::::::::::: ", fetchedUser);
      } catch (err) {
        console.error("Error fetching user data: ", err);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false); // Arrête le loader après l'appel
      }
    };

    fetchUser();
  }, [getUserId]);

  const fetchMyDemandes = useCallback(async () => {
    if (!getUserId) return;

    setLoading(true);
    try {
      const response = await getDemandesByDemandeurId(getUserId);
      setMyDemandes(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [getUserId]);

  // Fonction pour récupérer les demandes depuis le backend avec pagination
  const fetchDemandes = async (page = 1) => {
    try {
      const size = 10;
      const response = await getDemandes({
        page: page - 1,
        size,
        type: filterType,
      });
      setDemandes(response.content);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalElements);
    } catch (error) {
      console.error("Erreur lors de la récupération des demandes :", error);
    }
  };

  useEffect(() => {
    fetchDemandes(currentPage);
    fetchMyDemandes();
  }, [currentPage, filterType]);

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
        // Récupérer les informations de la demande
        const demande = await getDemandeById2(demandeId);

        // Mettre à jour le statut de la demande après acceptation ou refus
        await updateDemandeStatus(demandeId, newStatus, user.firstName + user.lastName);

        // Mise à jour de l'état des demandes affichées
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

  const acceptIntegration = async (id) => {
    try {
      const response = await axiosInstance.put(
        `http://localhost:8080/integrations/${id}/accepter`,
        { isValid: true } // Mise à jour du champ `isValid`
      );
      console.log(
        "Intégration acceptée et mise à jour avec succès:",
        response.data
      );
    } catch (error) {
      console.error("Erreur lors de l'acceptation de l'intégration:", error);
    }
  };

  // Fonction pour accepter le club (met à jour le `isValid` en true)
  const acceptClub = async (clubId) => {
    try {
      const response = await axiosInstance.put(
        `http://localhost:8080/clubs/${clubId}/accepter`,
        { isValid: true } // Mise à jour du champ `isValid`
      );
      console.log("Club accepté et mis à jour avec succès:", response.data);
    } catch (error) {
      console.error("Erreur lors de l'acceptation du club:", error);
    }
  };

  // Fonction pour accepter l'événement (met à jour le `isValid` en true)
  const acceptEvenement = async (eventId) => {
    try {
      const response = await axiosInstance.put(
        `http://localhost:8080/events/${eventId}/accepter`,
        { isValid: true } // Mise à jour du champ `isValid`
      );
      console.log(
        "Événement accepté et mis à jour avec succès:",
        response.data
      );
    } catch (error) {
      console.error("Erreur lors de l'acceptation de l'événement:", error);
    }
  };

  const deleteIntegration = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `http://localhost:8080/integrations/${id}`
      );
      console.log("Suppression réussie:", response.data);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  // Fonction pour supprimer le club
  const deleteClub = async (clubId) => {
    try {
      await axiosInstance.delete(`http://localhost:8080/clubs/${clubId}`);
    } catch (error) {
      console.error("Erreur lors de la suppression du club:", error);
      throw error;
    }
  };

  // Fonction pour supprimer l'événement
  const deleteEvenement = async (eventId) => {
    try {
      await axiosInstance.delete(`http://localhost:8080/events/${eventId}`);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'événement:", error);
      throw error;
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
          <label className="mr-2">Filtrer par type:</label>
          <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1); // Remettre la page actuelle à 1 lorsque le type est changé
              }}
              className="px-2 py-1 border rounded"
          >
            <option value="ALL">Tous</option>
            <option value="CREATION_CLUB">Création de club</option>
            <option value="INTEGRATION_CLUB">Intégration de club</option>
            <option value="EVENEMENT">Événements</option>
          </select>
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

        {/* Nouveau tableau pour afficher uniquement les demandes de l'utilisateur */}
        <h2 className="my-2 text-2xl">Mes Demandes</h2>
        <table className="min-w-full border">
          <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Description</th>
          </tr>
          </thead>
          <tbody>
          {myDemandes.map((demande) => (
              <tr key={demande.id}>
                <td className="px-4 py-2 border text-center">#{demande.id}</td>
                <td className="px-4 py-2 border text-center">
                  {demande.description}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default DemandesListing;
