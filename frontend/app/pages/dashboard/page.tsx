'use client';
import {Sidebar} from "@/components/Sidebar";
import {
    IoStatsChart, IoArchive, IoCheckmarkDoneCircle,
    IoAlertCircle, IoPlayCircle, IoFlash, IoChatbubbles
} from "react-icons/io5";
import {useEffect, useState} from "react";
import {DashboardService} from "@/services/DashboardService";
import {ChamadoService} from "@/services/ChamadoService";
import {DashboardData, ChamadoResumo} from "@/types/interfaces";

export default function SupportDashboard() {
    const [loading, setLoading] = useState(false);
    const [listaChamados, setListaChamados] = useState<ChamadoResumo[]>([]);
    const [stats, setStats] = useState<DashboardData | null>(null);

    const carregarDados = async () => {
        setLoading(true);
        try {
            const listaChamados = await ChamadoService.resumo();
            const dados = await DashboardService.getStats();
            setListaChamados(listaChamados);
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
                    <StatCard icon={<IoAlertCircle/>} label="Aguardando" value={stats?.chamadosAbertos}
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
                    <section className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <h2 className="font-bold flex items-center gap-2 text-lg">
                                <IoFlash className="text-yellow-400"/> Fila de Chamados
                            </h2>
                        </div>

                        <div
                            className="liquid-glass rounded-[32px] border border-[var(--glass-border)] overflow-hidden">
                            <div className="divide-y divide-white/5">
                                {listaChamados.map(i => (
                                    <div
                                        className="p-5 flex items-center justify-between hover:bg-white/5 transition-all">
                                        <div className="flex gap-4 items-center">
                                            <div
                                                className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 font-bold text-xs">
                                                {i.id}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-sm">{i.titulo}</h3>
                                                <p className="text-xs opacity-50">Solicitado por: {i.nomeCliente} •
                                                    Há {i.dataCriacao} min</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${getPrioridadeEstilo(i.prioridade)}`}>{i.prioridade}</span>
                                            <button
                                                className="bg-[rgb(var(--roxo-claro))] hover:bg-[rgb(var(--roxo-claro))]/80 text-white text-xs font-bold py-2 px-4 rounded-xl transition-all shadow-lg active:scale-95">
                                                Ver Detalhes
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
                            <IoChatbubbles className="text-[rgb(var(--roxo-claro))]"/> Interações Recentes
                        </h2>
                        <div className="liquid-glass rounded-[32px] p-6 border border-[var(--glass-border)] space-y-6">
                            {[1, 2].map(i => (
                                <div key={i}
                                     className="relative pl-6 border-l-2 border-[rgb(var(--roxo-claro))]/30 space-y-1">
                                    <div
                                        className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-[rgb(var(--roxo-claro))] shadow-[0_0_8px_rgb(var(--roxo-claro))]"/>
                                    <p className="text-xs font-bold text-[rgb(var(--roxo-claro))] uppercase">Chamado
                                        #882</p>
                                    <p className="text-sm italic">"Pode verificar o log do servidor agora?"</p>
                                    <p className="text-[10px] opacity-40 italic">Enviado por Técnico João • 14:20</p>
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
const getPrioridadeEstilo = (prioridade: string) => {
    switch (prioridade.toUpperCase()) {
        case 'URGENTE':
            return "bg-red-500/10 text-red-400 border-red-500/20";
        case 'ALTA':
            return "bg-orange-500/10 text-orange-400 border-orange-500/20";
        case 'MEDIA':
            return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
        case 'BAIXA':
            return "bg-green-500/10 text-green-600 border-green-500/20";
        default:
            return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
};

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