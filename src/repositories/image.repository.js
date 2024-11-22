import axiosInstance from "../auth/axios.js";

const apiUrl = "/images";

export const getImage = async (id) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/${id}`, {
      responseType: 'arraybuffer', 
    });
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'image", error);
    throw error;
  }
};

export const saveImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post(`${apiUrl}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image", error);
    throw error; 
  }
};
