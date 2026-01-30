import { api } from './api';
import { DashboardData } from "@/types/interfaces";

export const DashboardService = {
    getStats: async (): Promise<DashboardData> => {
        const response = await api.get<DashboardData>('/dashboard');
        return response.data;
    }
}