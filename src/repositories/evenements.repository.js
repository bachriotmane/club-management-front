import axiosInstance from "../auth/axios.js";
const apiUrl = "/events";

export const getEvents = async ({ page, size = 3, search = "", fromDate = "", toDate = ""}) => {
    try {
        const resp = await axiosInstance.get(
            `${apiUrl}?page=${page}&size=${size}&keyword=${search}&fromDate=${fromDate}&toDate=${toDate}`,
        );
        console.log(resp)
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
