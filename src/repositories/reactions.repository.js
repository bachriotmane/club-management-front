import axiosInstance from "../auth/axios.js";
const apiUrl = "/Reactions";

export const addReaction = async (reactionRequest) => {
    try {
        const response = await axiosInstance.post(
            `${apiUrl}`,
            reactionRequest
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteReaction = async (publicationId) => {
    try {
        const response = await axiosInstance.delete(
            `${apiUrl}/${publicationId}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getReactionsStatus = async (publicationId) => {
    try {
        const response = await axiosInstance.get(`${apiUrl}/count/${publicationId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}