import axios from "axios";

// Récupérer toutes les demandes
// Récupérer toutes les demandes avec pagination
export const getDemandes = async ({ page, size, type }) => {
  let url = `http://localhost:8080/demandes?page=${page}&size=${size}`;

  // Si le type est spécifié, on ajoute le paramètre de filtrage
  if (type && type !== "ALL") {
    url = `http://localhost:8080/demandes/filter?type=${type}&page=${page}&size=${size}`;
  }

  // Effectuer la requête

  const response = await axios.get(url);
  return response.data;
};

// Mettre à jour le statut d'une demande
export const updateDemandeStatus = async (id, statutDemande) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/demandes/${id}/status`,
      JSON.stringify(statutDemande), // Statut envoyé comme une chaîne JSON
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur dans updateDemandeStatus :", error);
    throw error;
  }
};
