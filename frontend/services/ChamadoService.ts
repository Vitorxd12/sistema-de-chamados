import { api } from './api';
import {ChamadoCreate, ChamadoResumo} from '@/types/interfaces';

export const ChamadoService = {
    create: async (data: ChamadoCreate): Promise<ChamadoCreate> => {
        const response = await api.post<ChamadoCreate>('/chamados', data);
        return response.data;
    },
    resumo: async (): Promise<ChamadoResumo[]> => {
        const response = await api.get<ChamadoResumo[]>('/chamados');
        return response.data;
    }
}