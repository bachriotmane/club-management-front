import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apiAymen"; // Import de l'instance Axios

const DemandesListing = () => {
  const [demandes, setDemandes] = useState([]); // État pour stocker les demandes
  const navigate = useNavigate();

  // Fonction pour récupérer les demandes depuis le backend
  const fetchDemandes = async () => {
    try {
      const response = await api.get("/"); // Appel à l'API GET /demandes
      setDemandes(response.data); // Mise à jour de l'état avec les données
    } catch (error) {
      console.error("Erreur lors de la récupération des demandes :", error);
    }
  };
  console.log(demandes);

  // Appeler fetchDemandes au chargement du composant
  useEffect(() => {
    fetchDemandes();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="my-2 text-2xl">Demandes</h1>
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Demandeur</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((demande) => (
            <tr
              key={demande.id}
              onClick={() => navigate(`/demandes/${demande.id}`)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="px-4 py-2 border text-center">#{demande.id}</td>
              <td className="px-4 py-2 border flex items-center space-x-2">
                <span className=" hover:underline hover:text-blue-700">
                  {demande.etudiantDemandeur?.name || "Inconnu"}
                </span>
              </td>
              <td className="px-4 py-2 border text-center">
                {new Date(demande.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border text-center">
                <span
                  className={`px-3 py-1 rounded-full text-white ${getStatusClass(
                    demande.statutDemande
                  )}`}
                >
                  {demande.statutDemande}
                </span>
              </td>
              <td className="px-4 py-2 border text-center">
                <button className="text-green-500 hover:text-green-700 mx-1">
                  &#10004;
                </button>
                <button className="text-red-500 hover:text-red-700 mx-1">
                  &#10006;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center space-x-2 mt-4">
        <button className="px-2 py-1 rounded bg-gray-200">1</button>
        <button className="px-2 py-1 rounded bg-gray-200">2</button>
        <span className="px-2 py-1">...</span>
        <button className="px-2 py-1 rounded bg-gray-200">10</button>
      </div>
    </div>
  );
};

// Fonction pour déterminer la classe CSS selon le statut
const getStatusClass = (status) => {
  switch (status) {
    case "ACCEPTE":
      return "bg-green-400";
    case "EN_COURS":
      return "bg-yellow-400";
    case "REJETE":
      return "bg-red-400";
    default:
      return "bg-gray-200";
  }
};

export default DemandesListing;
