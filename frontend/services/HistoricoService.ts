import { api } from './api';
import { HistoricoStatusDTO } from '@/types/interfaces';

export const HistoricoService = {
    listar: async (chamadoId: number): Promise<HistoricoStatusDTO[]> => {
        const response = await api.get<HistoricoStatusDTO[]>(`/historico-status/${chamadoId}`);
        return response.data;
    }
}
