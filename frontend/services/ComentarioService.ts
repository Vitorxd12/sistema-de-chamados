import { api } from './api';
import { ComentarioResponse, CriarComentario } from '@/types/interfaces';

export const ComentarioService = {
    listar: async (chamadoId: number): Promise<ComentarioResponse[]> => {
        const response = await api.get<ComentarioResponse[]>(`/comentarios/${chamadoId}`);
        return response.data;
    },
    criar: async (data: CriarComentario): Promise<ComentarioResponse> => {
        const response = await api.post<ComentarioResponse>('/comentarios', data);
        return response.data;
    },
    recentes: async (): Promise<ComentarioResponse[]> => {
        const response = await api.get<ComentarioResponse[]>('/comentarios/recentes');
        return response.data;
    }
}
