import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:9247/api',
    headers: {
        "Content-Type": "application/json",
    }
});
api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
            localStorage.removeItem("token");
            localStorage.removeItem("userRole");
            window.location.href = "/welcome/login";
        }
        return Promise.reject(error);
    }
);