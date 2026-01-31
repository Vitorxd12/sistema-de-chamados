'use client';
import {Sidebar} from "@/components/Sidebar";
import {
    IoStatsChart, IoArchive, IoCheckmarkDoneCircle,
    IoAlertCircle, IoPlayCircle, IoFlash, IoChatbubbles
} from "react-icons/io5";
import {useEffect, useState} from "react";
import {DashboardData, ChamadoResumo} from "@/types/interfaces";
import Fila from "@/app/pages/dashboard/fila";
import {useRouter} from "next/navigation";
import {ChamadoService} from "@/services/ChamadoService";
import {DashboardService} from "@/services/DashboardService";

export default function SupportDashboard() {
    const [stats, setStats] = useState<DashboardData | null>(null);

        const router = useRouter();
        const [loading, setLoading] = useState(false);


        const carregarDados = async () => {
            setLoading(true);
            try {
                const dados = await DashboardService.getStats();
                setStats(dados);
            } catch (err) {
                console.error("Erro ao carregar dados do dashboard:", err);
            } finally {
                setLoading(false);
            }
        }

        useEffect(() => {
            carregarDados()
        }, []);


        return (
            <div className="flex min-h-screen text-[rgb(var(--texto))] h-screen">
                <Sidebar/>

                <main className="flex-1 p-8 space-y-6 overflow-y-auto custom-scrollbar ">

                    {/* Header Operacional */}
                    <header
                        className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)] shadow-2xl flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div
                                className="p-3 rounded-2xl bg-[rgb(var(--roxo-claro))]/20 text-[rgb(var(--roxo-claro))] shadow-[0_0_15px_rgba(var(--roxo-claro),0.2)]">
                                <IoStatsChart size={32}/>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">Painel do Técnico</h1>
                                <p className="text-sm opacity-60">Olá, Analista. Aqui está o status da sua fila.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="">
                                <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">SLA Médio</p>
                                <p className="text-2xl font-black text-[rgb(var(--roxo-claro))]">{stats?.tempoMedioResolucao || "0h0m"}</p>
                            </div>
                            <span
                                className="px-4 py-2 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> Sistema Online
                        </span>
                        </div>
                    </header>

                    {/* Grid de Métricas Rápidas */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <StatCard icon={<IoAlertCircle/>} label="Aguardando" value={stats?.chamadosAbertos || 0}
                                  color="text-red-400"/>
                        <StatCard icon={<IoPlayCircle/>} label="Em Atendimento" value={stats?.chamadosEmAndamento || 0}
                                  color="text-blue-400"/>
                        <StatCard icon={<IoCheckmarkDoneCircle/>} label="Finalizados (Hoje)"
                                  value={stats?.chamadosResolvidos || 0} color="text-green-400"/>
                        <StatCard icon={<IoArchive/>} label="Fechados" value={stats?.chamadosFechados || 0}
                                  color="text-gray-400"/>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Coluna da Esquerda: Fila de Chamados (RF: Assumir Chamado) */}
                        <Fila/>

                        {/* Coluna da Direita: Atividades Recentes (RF: Comentários e Histórico) */}
                        <section className="space-y-4">
                            <h2 className="font-bold flex items-center gap-2 text-lg px-2">
                                <IoChatbubbles className="text-[rgb(var(--roxo-claro))]"/> Interações Recentes
                            </h2>
                            <div
                                className="liquid-glass rounded-[32px] p-6 border border-[var(--glass-border)] space-y-6">
                                {[1, 2].map(i => (
                                    <div key={i}
                                         className="relative pl-6 border-l-2 border-[rgb(var(--roxo-claro))]/30 space-y-1">
                                        <div
                                            className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-[rgb(var(--roxo-claro))] shadow-[0_0_8px_rgb(var(--roxo-claro))]"/>
                                        <p className="text-xs font-bold text-[rgb(var(--roxo-claro))] uppercase">Chamado
                                            #882</p>
                                        <p className="text-sm italic">"Pode verificar o log do servidor agora?"</p>
                                        <p className="text-[10px] opacity-40 italic">Enviado por Técnico João •
                                            14:20</p>
                                    </div>
                                ))}
                                <button
                                    className="w-full py-3 rounded-2xl bg-white/5 border border-[var(--glass-border)] text-xs font-bold opacity-60 hover:opacity-100 transition-all">
                                    Ver todas as notificações
                                </button>
                            </div>
                        </section>

                    </div>
                </main>
            </div>
        );
    }


    function StatCard({icon, label, value, color}: any) {
        return (
            <div
                className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)] flex items-center gap-4 transition-all hover:border-[rgb(var(--roxo-claro))]/50 group">
                <div className={`text-3xl ${color} transition-transform group-hover:scale-110`}>{icon}</div>
                <div>
                    <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">{label}</p>
                    <p className="text-3xl font-black">{value}</p>
                </div>
            </div>
        );
    }
