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
export const getClubMembers = async ({ uuid, page, size, studentName ="" }) => {
  try {
    console.log("studentName="+studentName);
    const response = await axiosInstance.get(
      `${apiUrl}/club/${uuid}/members`,
      {
        params: {
          page: page, 
          size: size, 
          studentName: studentName 
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getClubsForUser = async (user) => {
  try {
    const response = await axiosInstance.get(
        `${apiUrl}/${user}/admin`,
        {
          params: { page : 0,size : 40 },
        }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

