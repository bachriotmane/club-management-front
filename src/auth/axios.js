import axios from 'axios';
import { logout } from './auth';

const API_URL = import.meta.env.VITE_API_URL|| 'http://localhost:8086';
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const currentUrl = window.location.pathname + window.location.search;
            logout();
            window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
