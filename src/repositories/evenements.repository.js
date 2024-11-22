import axiosInstance from "../auth/axios.js";
const apiUrl = "/events";
const apiUrl1 = "/events/home-events";

export const getEvents = async ({ page, size = 3, search = "", fromDate = "", toDate = ""}) => {
    try {
        const resp = await axiosInstance.get(
            `${apiUrl}?page=${page}&size=${size}&keyword=${search}&fromDate=${fromDate}&toDate=${toDate}`,
        );
        return resp.data;
    } catch (error) {
        throw error;
    }
};

export const getEventById = async (userId) => {
    try {
        const resp = await axiosInstance.get(
            `${apiUrl}/${userId}`,
        );
        return resp;
    } catch (error) {
        throw error;
    }
};

export const getEventsHome = async ({ limit = 7 }) => {
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
