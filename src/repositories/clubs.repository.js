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


export const editClub = async ({ clubId, clubEditRequest }) => {
  try {

    const response = await axiosInstance.patch(
      `${apiUrl}/club/${clubId}`, 
      clubEditRequest
    );

    return response.data.data;  
  } catch (error) {
    throw error;
  }
};

export const deleteClub = async (id) => {
  try {
    const response = await axiosInstance.delete(`${apiUrl}/club/delete/${id}`);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const getMemberRoles = async () => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/member-roles`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching member roles:", error);
    throw error;
  }
};

export const getClubs_v2 = async () => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/clubs-name`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

