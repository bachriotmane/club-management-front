import axiosInstance from "../auth/axios.js";
const apiUrl = "/publications";
const apiUrl1 = "/publications/home";

export const getPublications = async ({ page, size = 3, search = "", fromDate = "", toDate = "" , isPublic = true, userId = null}) => {
    try {
        const resp = await axiosInstance.get(
            `${apiUrl}?page=${page}&size=${size}&keyword=${search}&fromDate=${fromDate}&toDate=${toDate}&userId=${userId}&isPublic=${isPublic}`,
        );
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const getPublicationById = async (userId) => {
    try {
        const resp = await axiosInstance.get(
            `${apiUrl}/${userId}`,
        );
        return resp;
    } catch (error) {
        throw error;
    }
};

export const createNewPublication = async (publication) => {
    try {
        const resp = await axiosInstance.post(
            `${apiUrl}`,
            publication
        );
        return resp;
    } catch (error) {
        throw error;
    }
};

export const getPublicationsHome = async ({ limit = 7 }) => {
    try {

        const response = await axiosInstance.get(apiUrl1, {
            params: {
                limit: limit,
            },
        });


        return response.data.content;
    } catch (error) {

        throw error;
    }
};

export const deletePublication = async (id) => {
    try {
        const response = await axiosInstance.delete(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updatePublication = async (id, updatedPublication)=>{
    try {
        console.log("UPDATED : ", updatedPublication);
        const response = await axiosInstance.put(`${apiUrl}/${id}`, updatedPublication);
        return response.data;
    } catch (error) {
        throw error;
    }
}