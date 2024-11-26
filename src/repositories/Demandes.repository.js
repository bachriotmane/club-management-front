import axiosInstance from "../auth/axios.js";

// Récupérer toutes les demandes
// Récupérer toutes les demandes avec pagination
export const getDemandes = async ({ page, size, type }) => {
  let url = `http://localhost:8080/demandes?page=${page}&size=${size}`;

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
export const updateDemandeStatus = async (id, statutDemande, agent) => {
  try {
    const response = await axiosInstance.put(
      `http://localhost:8080/demandes/${id}/status`,
        {
          statutDemande : statutDemande ,
          agent : agent
        },
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

export const getDemandeById = async (id) => {
  try {
    const response = await axiosInstance.get(`/demandes/${id}`);
    return response.data; // Les données sont déjà extraites
  } catch (error) {
    throw new Error("Erreur lors de la récupération de la demande");
  }
};
export const getDemandeById2 = async (id) => {
  try {
    const response = await axiosInstance.get(`/demandes/demande/${id}`);
    return response.data; // Les données sont déjà extraites
  } catch (error) {
    throw new Error("Erreur lors de la récupération de la demande");
  }
};

export const getDemandesByDemandeurId = async (demandeurId) => {
  try {
    // Effectuer une requête GET à l'API
    const response = await axiosInstance.get(
      `/demandes/demandeur/${demandeurId}`
    );
    return response.data; // Retourne les données extraites de la réponse
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des demandes par ID du demandeur :",
      error
    );
    throw new Error("Erreur lors de la récupération des demandes.");
  }
};
export const getDemandes_v2 = async ({ page, size = 5,type ="ALL" ,nom = "", isMyDemandes = false,uuidClub= "" }) => {
  try {
    console.log("ismydomandes  est : "+isMyDemandes);
    const response = await axiosInstance.get("/demandes/filter", {
      params: {
        page: page,
        size: size,
        nom: nom,
        type : type,
        isMyDemandes: isMyDemandes,
        uuidClub : uuidClub
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

