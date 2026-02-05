import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080/api', // URL do seu Spring Boot
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