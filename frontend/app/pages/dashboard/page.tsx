'use client';
import { Sidebar } from "@/components/Sidebar";
import {
    IoStatsChart, IoTimeOutline, IoCheckmarkDoneCircle,
    IoAlertCircle, IoPlayCircle, IoFlash, IoChatbubbles
} from "react-icons/io5";
import {useEffect, useState} from "react";
import { DashboardService } from "@/services/DashboardService";
import { DashboardData } from "@/";

export default function SupportDashboard() {
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState<DashboardData | null>(null);

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
        <div className="flex min-h-screen text-[rgb(var(--texto))]">
            <Sidebar />

            <main className="flex-1 p-8 space-y-6 overflow-y-auto custom-scrollbar">

                {/* Header Operacional */}
                <header className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)] shadow-2xl flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-[rgb(var(--roxo-claro))]/20 text-[rgb(var(--roxo-claro))] shadow-[0_0_15px_rgba(var(--roxo-claro),0.2)]">
                            <IoStatsChart size={32} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Painel do Técnico</h1>
                            <p className="text-sm opacity-60">Olá, Analista. Aqui está o status da sua fila.</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <span className="px-4 py-2 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Sistema Online
                        </span>
                    </div>
                </header>

                {/* Grid de Métricas Rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatCard icon={<IoAlertCircle />} label="Aguardando" value="05" color="text-red-400" />
                    <StatCard icon={<IoPlayCircle />} label="Em Atendimento" value="03" color="text-blue-400" />
                    <StatCard icon={<IoCheckmarkDoneCircle />} label="Finalizados (Hoje)" value="12" color="text-green-400" />
                    <div className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)] flex flex-col justify-center">
                        <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">SLA Médio</p>
                        <p className="text-2xl font-black text-[rgb(var(--roxo-claro))]">{stats?.tempoMedioResolucao || "0h0m"}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Coluna da Esquerda: Fila de Chamados (RF: Assumir Chamado) */}
                    <section className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <h2 className="font-bold flex items-center gap-2 text-lg">
                                <IoFlash className="text-yellow-400" /> Chamados Disponíveis
                            </h2>
                            <button className="text-xs text-[rgb(var(--roxo-claro))] font-bold hover:underline">Ver fila completa</button>
                        </div>

                        <div className="liquid-glass rounded-[32px] border border-[var(--glass-border)] overflow-hidden">
                            <div className="divide-y divide-white/5">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="p-5 flex items-center justify-between hover:bg-white/5 transition-all">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 font-bold text-xs">
                                                #{i}42
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-sm">Problema com acesso ao SAP</h3>
                                                <p className="text-xs opacity-50">Solicitado por: Mariana Souza • Há 15 min</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 text-[10px] font-bold border border-red-500/20">ALTA</span>
                                            <button className="bg-[rgb(var(--roxo-claro))] hover:bg-[rgb(var(--roxo-claro))]/80 text-white text-xs font-bold py-2 px-4 rounded-xl transition-all shadow-lg active:scale-95">
                                                Assumir
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Coluna da Direita: Atividades Recentes (RF: Comentários e Histórico) */}
                    <section className="space-y-4">
                        <h2 className="font-bold flex items-center gap-2 text-lg px-2">
                            <IoChatbubbles className="text-[rgb(var(--roxo-claro))]" /> Interações Recentes
                        </h2>
                        <div className="liquid-glass rounded-[32px] p-6 border border-[var(--glass-border)] space-y-6">
                            {[1, 2].map(i => (
                                <div key={i} className="relative pl-6 border-l-2 border-[rgb(var(--roxo-claro))]/30 space-y-1">
                                    <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-[rgb(var(--roxo-claro))] shadow-[0_0_8px_rgb(var(--roxo-claro))]" />
                                    <p className="text-xs font-bold text-[rgb(var(--roxo-claro))] uppercase">Chamado #882</p>
                                    <p className="text-sm italic">"Pode verificar o log do servidor agora?"</p>
                                    <p className="text-[10px] opacity-40 italic">Enviado por Técnico João • 14:20</p>
                                </div>
                            ))}
                            <button className="w-full py-3 rounded-2xl bg-white/5 border border-[var(--glass-border)] text-xs font-bold opacity-60 hover:opacity-100 transition-all">
                                Ver todas as notificações
                            </button>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}

function StatCard({ icon, label, value, color }: any) {
    return (
        <div className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)] flex items-center gap-4 transition-all hover:border-[rgb(var(--roxo-claro))]/50 group">
            <div className={`text-3xl ${color} transition-transform group-hover:scale-110`}>{icon}</div>
            <div>
                <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">{label}</p>
                <p className="text-3xl font-black">{value}</p>
            </div>
        </div>
    );
}