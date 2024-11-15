import axiosInstance from "../auth/axios.js";

const apiUrl = "/clubs";

export const getClubs = async ({ page, size = 3, nomClub = "", idUser = 0 }) => {
  try {
    const response = await axiosInstance.get(apiUrl, {
      params: {
        page: page,
        size: size,
        nomClub: nomClub,
        idUser: idUser,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
