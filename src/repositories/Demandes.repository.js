import axios from "axios";
import axiosInstance from "../auth/axios";
const apiUrl = "/demandes";

// Récupérer toutes les demandes
// Récupérer toutes les demandes avec pagination
export const getDemandes = async ({ page, size, type }) => {
  let url = `http://localhost:8088/demandes?page=${page}&size=${size}`;

  // Si le type est spécifié, on ajoute le paramètre de filtrage
  if (type && type !== "ALL") {
    url = `http://localhost:8088/demandes/filter?type=${type}&page=${page}&size=${size}`;
  }

  // Effectuer la requête

  const response = await axiosInstance.get(url);
  return response.data;
};

// Mettre à jour le statut d'une demande
export const updateDemandeStatus = async (id, statutDemande) => {
  try {
    const response = await axiosInstance.put(
      `http://localhost:8088/demandes/${id}/status`,
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

export const getDemandesCountByEtudiant = async (etudiantId) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/count?etudiantId=${etudiantId}`);
    console.log(etudiantId);
    console.log('oussamaRéponse de l\'API pour le nombre de demandes:', response.data);
    return response.data;  // Retourne le nombre de demandes pour l'étudiant
  } catch (error) {
    console.error("Erreur lors de la récupération du nombre de demandes:", error);
    throw error;
  }
};

export const getIntegrationDemandesCountByEtudiant = async (etudiantId) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/count/integration?etudiantId=${etudiantId}`);
    console.log('Réponse de l\'API pour le nombre de demandes pour integratio :', response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching integration demandes count:", error);
    throw error;
  }
};

