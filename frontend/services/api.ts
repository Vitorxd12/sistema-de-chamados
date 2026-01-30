import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080/api', // URL do seu Spring Boot
});