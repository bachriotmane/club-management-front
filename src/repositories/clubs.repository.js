import axiosInstance from "../auth/axios.js";

const apiUrl = "/clubs";

export const getClubs = async ({ page, size = 3, nomClub = "", idUser = "" }) => {
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


export const getClubById = async (uuid) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/club/${uuid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getClubMembers = async ({ uuidClub, page, size, studentName }) => {
  try {
    const response = await axiosInstance.get(
      `${apiUrl}/${uuidClub}/members`,
      {
        params: { page, size, studentName },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};