import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDemandeById,
  updateDemandeStatus,
} from "../../repositories/Demandes.repository";

const DemandeDetails = () => {
  const { id } = useParams(); // ID récupéré depuis l'URL
  const navigate = useNavigate();

  const [demande, setDemande] = useState(null);
  const [error, setError] = useState(null);

  // Charger les détails de la demande
  useEffect(() => {
    const fetchDemande = async () => {
      try {
        const data = await getDemandeById(id); // Récupération via l'API ou méthode simulée
        setDemande(data);
      } catch (err) {
        setError("Erreur lors de la récupération de la demande.");
      }
    };

    fetchDemande();
  }, [id]);

  // Gestion de l'action Accepter ou Refuser
  const handleAction = async (status) => {
    try {
      await updateDemandeStatus(id, status); // Appel API pour mettre à jour le statut
      setDemande((prev) => ({ ...prev, statutDemande: status })); // Mettre à jour localement
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut.");
    }
  };

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!demande) {
    return <div className="p-6 text-center">Chargement...</div>;
  }

  return (
    <div className="w-full h-screen p-6 bg-gray-50">
      <button
        onClick={() => navigate("/demandes")}
        className="text-blue-500 mb-4"
      >
        &larr; Retour
      </button>
      <h2 className="text-2xl font-bold mb-4">Détails de la demande</h2>
      <div className="mb-6 p-2 rounded-2xl flex items-center space-x-4 bg-gray-200">
        <img
          src={demande.image || "https://via.placeholder.com/150"}
          alt="Demandeur"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p className="font-semibold">{demande.demandeur || "Anonyme"}</p>
        </div>
      </div>
      <div className="mb-6">
        <p>
          <span className="font-semibold">ID:</span> #{demande.id}
        </p>
        <p className="my-3">
          <span className="font-semibold">Date:</span>{" "}
          {new Date(demande.date).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold">Status:</span>
          <span
            className={`ml-2 px-3 py-1 rounded-full text-white ${getStatusClass(
              demande.statutDemande
            )}`}
          >
            {demande.statutDemande}
          </span>
        </p>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-lg">Description:</h3>
        <p>{demande.description || "Pas de description disponible."}</p>
      </div>

      {/* Affichage conditionnel en fonction du statut */}
      {demande.statutDemande === "EN_COURS" ? (
        // Afficher les boutons pour Accepter ou Refuser si le statut est "EN_COURS"
        <div className="flex space-x-4">
          <button
            onClick={() => handleAction("ACCEPTE")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Accepter
          </button>
          <button
            onClick={() => handleAction("REFUSE")}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Refuser
          </button>
        </div>
      ) : (
        // Afficher un message si la demande est déjà traitée
        <div className="p-4 bg-gray-100 text-center rounded">
          <p className="text-gray-700 font-semibold">
            {demande.statutDemande === "ACCEPTE"
              ? "La demande a déjà été acceptée."
              : "La demande a déjà été refusée."}
          </p>
        </div>
      )}
    </div>
  );
};

// Classe CSS pour le statut
const getStatusClass = (status) => {
  switch (status) {
    case "ACCEPTE":
      return "bg-green-400";
    case "EN_COURS":
      return "bg-yellow-400";
    case "REFUSE":
      return "bg-red-400";
    default:
      return "bg-gray-200";
  }
};

export default DemandeDetails;
