import axiosInstance from "../auth/axios.js";
const apiUrl = "/publications"
export const getPublications = async ({page , size = 3})=>{
    try {
        console.log(page, "s", size);
        const resp = await axiosInstance.get(`${apiUrl}?page=${page}&size=${size}`);
        return resp.data;
    } catch (error) {
        throw error;
    }
}