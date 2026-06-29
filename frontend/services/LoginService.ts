import { api } from './api';

export const LoginService = {
    login: async (formData: any) => {
        const response = await api.post("/auth/login", formData);

        if (response.data.token && typeof window !== "undefined")  {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userEmail", formData.email);
            localStorage.setItem("userRole", response.data.perfil);
            localStorage.setItem("userId", String(response.data.id));
            localStorage.setItem("userName", response.data.nome);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        window.location.href = "/welcome/login";
    }
};