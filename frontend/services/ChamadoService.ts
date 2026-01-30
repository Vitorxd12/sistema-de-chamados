import { api } from './api';
import {ChamadoCreate} from '@/types/interfaces';

export const ChamadoService = {
    create: async (data: ChamadoCreate): Promise<ChamadoCreate> => {
        const response = await api.post<ChamadoCreate>('/chamados', data);
        return response.data;
    }
}