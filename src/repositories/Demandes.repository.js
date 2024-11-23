import axiosInstance from "../auth/axios.js";

// Récupérer toutes les demandes
// Récupérer toutes les demandes avec pagination
export const getDemandes = async ({ page, size, type }) => {
  let url = `http://localhost:8080/demandes?page=${page}&size=${size}`;
  console.log;

  // Si le type est spécifié, on ajoute le paramètre de filtrage
  if (type && type !== "ALL") {
    url = `http://localhost:8080/demandes/filter?type=${type}&page=${page}&size=${size}`;
  }

  // Effectuer la requête
  console.log("url:", url);

  const response = await axiosInstance.get(url);
  return response.data;
};

// Mettre à jour le statut d'une demande
export const updateDemandeStatus = async (id, statutDemande) => {
  try {
    const response = await axiosInstance.put(
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
import axios from "axios";

export const getDemandeById = async (id) => {
  try {
    const response = await axiosInstance.get(`/demandes/${id}`);
    return response.data; // Les données sont déjà extraites
  } catch (error) {
    throw new Error("Erreur lors de la récupération de la demande");
  }
};
