import { api } from './api';
import { UsuarioCreate, UsuarioResponse } from "@/types/interfaces";

export const UsuarioService = {
    create: async (data: UsuarioCreate): Promise<UsuarioResponse> => {
        const response = await api.post<UsuarioResponse>('/usuarios', data);
        return response.data;
    }
}