import axiosInstance from "../auth/axios.js";

const apiUrl = "/clubs";
const apiUrl1 = "/clubs/home-clubs";

export const getClubs = async ({ page, size = 3, nomClub = "", isMyClubs = false }) => {
  try {
    const response = await axiosInstance.get(apiUrl, {
      params: {
        page: page,
        size: size,
        nomClub: nomClub,
        isMyClubs: isMyClubs,
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
};


export const getClubsHome = async ({ limit = 7 }) => {
  try {
    // Effectue la requête HTTP avec axios
    const response = await axiosInstance.get(apiUrl1, {
      params: {
        limit: limit,
      },
    });


    return response.data;
  } catch (error) {

    throw error;
  }
};