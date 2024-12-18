import axiosInstance from "../auth/axios.js";

const apiUrl = "/Students";

export const downloadStudentsCsv = async () => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/csv`, {
        responseType: 'arraybuffer', 
      });
      return response.data; 
    } catch (error) {
      if (error.response) {
        const errorText = new TextDecoder().decode(error.response.data);
  
        const errorDetails = JSON.parse(errorText);
        throw new Error(errorDetails.errorMessage || "Une erreur est survenue.");
      } else {
        throw new Error("Erreur réseau ou serveur, impossible de récupérer les données.");
      }
    }
  };
  
  export const uploadStudentsCsv = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await axiosInstance.post(`${apiUrl}/csv`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
  
      return response.data; 
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.errorMessage || "Une erreur est survenue lors de l'upload.";
        throw new Error(errorMessage);
      } else {
        throw new Error("Erreur réseau ou serveur, impossible de télécharger le fichier.");
      }
    }
  };
  

  export const getUsers = async ({ page, size = 10, userName = "", role = "", cin = "", cne = "" }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/users/`, {
        params: {
          page: page,
          size: size,
          userName: userName,
          role: role,
          cin: cin, 
          cne: cne  
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      throw error;
    }
  };

  export const editUser = async (userId, userEditRequest) => {
    try {
      const response = await axiosInstance.put(`${apiUrl}/users/${userId}`, userEditRequest);
      return response.data;  
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.errorMessage || "Une erreur est survenue lors de la modification.";
        throw new Error(errorMessage);
      } else {
        throw new Error("Erreur réseau ou serveur, impossible de modifier l'utilisateur.");
      }
    }
  };
  

