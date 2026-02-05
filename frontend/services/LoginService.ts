import { api } from './api';
import {router} from "next/client";

export const LoginService = {
    login: async (formData: any) => {
        const response = await api.post("/auth/login", formData);

        if (response.data.token && typeof window !== "undefined")  {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userEmail", formData.email);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        window.location.href = "/welcome/login";
    }
};