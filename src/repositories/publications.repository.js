import axiosInstance from "../auth/axios.js";
const apiUrl = "/publications";

export const getPublications = async ({ page, size = 3, search = "", fromDate = "", toDate = "" , isPublic = true, userId = null}) => {
    try {
        const resp = await axiosInstance.get(
            `${apiUrl}?page=${page}&size=${size}&keyword=${search}&fromDate=${fromDate}&toDate=${toDate}&userId=${userId}&isPublic=${isPublic}`,
        );
        console.log(resp)
        return resp.data;
    } catch (error) {
        throw error;
    }
};
