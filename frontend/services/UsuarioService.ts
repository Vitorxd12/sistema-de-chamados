import { api } from './api';
import { UsuarioCreate, UsuarioResponse } from "@/types/interfaces";

export const UsuarioService = {
    create: async (data: UsuarioCreate): Promise<UsuarioResponse> => {
        const response = await api.post<UsuarioResponse>('/usuarios', data);
        return response.data;
    },
    response: async (): Promise<UsuarioResponse[]> => {
        const response = await api.get<UsuarioResponse[]>('/usuarios');
        return response.data;
    },
    desativar: async (id: number): Promise<String> => {
        const response = await api.patch(`/usuarios/desativar/${id}`);
        return response.data;
    }

}