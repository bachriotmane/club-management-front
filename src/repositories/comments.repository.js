import axiosInstance from "../auth/axios.js";
const apiUrl = "/Comments";

export const addComment = async (commentRequest) => {
    try {
        const response = await axiosInstance.post(
            `${apiUrl}`,
            commentRequest
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteComment = async (commentId) => {
    try {
        const response = await axiosInstance.delete(
            `${apiUrl}/${commentId}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCommentsByPublication = async (publicationId) => {
    try {
        const response = await axiosInstance.get(
            `${apiUrl}/publication/${publicationId}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};
