import axiosInstance from './axios';

export const login = async (email, password, rememberMe) => {
    try {
        const response = await axiosInstance.post('/auth/authenticate', { email, password });
        const {jwttoken } = response.data;

        if (rememberMe) {
            localStorage.setItem('token', jwttoken);
        } else {
            sessionStorage.setItem('token', jwttoken);
        }
        return response.data;
    } catch (error) {
        console.error('Login error', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
};

export const getToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export const getUser = () => {
    const token = getToken();

    if (!token) {
        return null;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
}