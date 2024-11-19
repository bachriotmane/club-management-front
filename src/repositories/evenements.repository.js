import axiosInstance from "../auth/axios.js";
const apiUrl = "/events/home-events";

export const getEventsHome = async ({ limit = 7 }) => {
    try {
      
  
      // Effectue la requête HTTP avec axios
      const response = await axiosInstance.get(apiUrl, {
        params: {
          limit: limit, 
        },
      });
  
      
      return response.data;
    } catch (error) {
      
      throw error;
    }
  };
  