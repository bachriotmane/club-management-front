import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import de SweetAlert2
import {getDemandes, updateDemandeStatus,} from "../../repositories/Demandes.repository"; // Import de la fonction
import SecureComponenet from "../../shared/components/utili/SecureComponenet.jsx"; // Import de la fonction} from "../../repositories/Demandes.repository"; // Import de la fonction
import { AiOutlinePlus } from "react-icons/ai";


const DemandesListing = () => {
  const [demandes, setDemandes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [filterType, setFilterType] = useState("ALL");
  const navigate = useNavigate();

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
        await updateDemandeStatus(demandeId, newStatus);
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
        console.error(
          "Erreur lors de la mise à jour du statut de la demande :",
          error
        );
        Swal.fire(
          "Erreur!",
          "Une erreur est survenue lors de la mise à jour.",
          "error"
        );
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
      <h1 className="my-2 text-2xl">Demandes</h1>

      <div className="mb-4">
        <label className="mr-2">Filtrer par type:</label>
        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setCurrentPage(1);
          }}
          className="px-2 py-1 border rounded"
        >
          <option value="ALL">Tous</option>
          <option value="CREATION_CLUB">Création de club</option>
          <option value="INTEGRATION_CLUB">Intégration de club</option>
          <option value="EVENEMENT">Événements</option>
        </select>
      </div>

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
              onClick={() => navigate(`/demandes/${demande.id}`)}
            >
              <td className="px-4 py-2 border text-center">#{demande.id}</td>
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
                <button onClick={()=>navigate(`/historiques/${demande.id}`)} className="bg-orange-500 p-2 text-white font-bold rounded-xl">historique</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Précédent
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default DemandesListing;
