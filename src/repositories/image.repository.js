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

export const deleteImage = async (id) => {
  try {
    const response = await axiosInstance.delete(`${apiUrl}/image/delete/${id}`);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const editImage = async (dto, file) => {
  const formData = new FormData();
  formData.append("uuidImage", dto.uuidImage);  
  formData.append("typeObjet", dto.typeObjet);  
  formData.append("uuidObjet", dto.uuidObjet);  
  formData.append("file", file);                 

  try {
    const response = await axiosInstance.put(`${apiUrl}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: 'arraybuffer',  
    });
    const blob = new Blob([response.data], { type: response.headers['content-type'] });  
     
    return URL.createObjectURL(blob);; 
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image", error);

    throw error;
  }
};


