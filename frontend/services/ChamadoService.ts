import { api } from './api';
import {ChamadoCreate, ChamadoDetalhado, ChamadoResumo} from '@/types/interfaces';
import {ParamValue} from "next/dist/server/request/params";

export const ChamadoService = {
    create: async (data: ChamadoCreate): Promise<ChamadoCreate> => {
        const response = await api.post<ChamadoCreate>('/chamados', data);
        return response.data;
    },
    resumo: async (): Promise<ChamadoResumo[]> => {
        const response = await api.get<ChamadoResumo[]>('/chamados');
        return response.data;
    },
    detalhado: async (id: ParamValue): Promise<ChamadoDetalhado> => {
        const response = await api.get<ChamadoDetalhado>(`/chamados/${id}`);
        return response.data;
    }
}