'use client';

import React, {useCallback, useEffect, useState} from 'react';
import { Sidebar } from "@/components/Sidebar";
import {
    IoChatbubbleEllipses, IoTime, IoCheckmarkDone,
    IoPerson, IoInformationCircle, IoSend, IoArrowBack
} from "react-icons/io5";
import Link from 'next/link';
import {useParams} from "next/navigation";
import {ChamadoService} from "@/services/ChamadoService";
import {ChamadoDetalhado, DashboardData} from "@/types/interfaces";

export default function DetalhesChamado() {
    const params = useParams();
    const id = params.id;

    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState<ChamadoDetalhado | null>(null);

    const carregarDados = useCallback(async () => {
        if (!id) return;

        setLoading(true);
        try {
            // id pode vir como string ou string[], tratamos para string
            const idString = Array.isArray(id) ? id[0] : id;
            const dadosChamado = await ChamadoService.detalhado(idString);
            setDados(dadosChamado);
        } catch (err) {
            console.error("Erro ao carregar dados do chamado:", err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        carregarDados();
    }, [carregarDados]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[rgb(var(--roxo-claro))]"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen h-screen text-[rgb(var(--texto))]">
            <Sidebar />

            <main className="flex-1 h-screen p-8 flex flex-col gap-6 overflow-y-auto custom-scrollbar">

                {/* Header com Ações Rápidas */}
                <header className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/pages/dashboard" className="p-2 rounded-xl hover:bg-white/10 transition-all opacity-50 hover:opacity-100">
                            <IoArrowBack size={24} />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[rgb(var(--roxo-claro))]/20 text-[rgb(var(--roxo-claro))] border border-[rgb(var(--roxo-claro))]/30">#{dados?.id}</span>
                                <h1 className="text-2xl font-bold tracking-tight">{dados?.titulo || "Título"}</h1>
                            </div>
                            <p className="text-sm opacity-50 italic">Aberto em {dados?.dataCriacao || "../../.."} por {dados?.nomeCliente || "Nome"}</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold text-sm hover:bg-blue-500 hover:text-white transition-all">
                            <IoPerson size={18} /> Assumir Chamado
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500/20 text-green-600 border border-green-500/30 font-bold text-sm hover:bg-green-500 hover:text-white transition-all">
                            <IoCheckmarkDone size={18} /> Concluir
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">

                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <section className="liquid-glass rounded-3xl p-8 border border-[var(--glass-border)]">
                            <h2 className="text-xs font-bold uppercase opacity-40 mb-4 flex items-center gap-2">
                                <IoInformationCircle /> Descrição do Chamado
                            </h2>
                            <p className="leading-relaxed opacity-90">
                                {dados?.descricao || "Descrição do chamado não disponível."}
                            </p>
                        </section>

                        {/* Área de Chat (RF: Comentários) */}
                        <section className="liquid-glass rounded-3xl border border-[var(--glass-border)] flex-1 flex flex-col overflow-hidden min-h-[400px]">
                            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center gap-2">
                                <IoChatbubbleEllipses className="text-[rgb(var(--roxo-claro))]" />
                                <span className="font-bold text-sm">Mensagens e Atualizações</span>
                            </div>

                            {/* Mensagens */}
                            <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar">
                                <Message bubble="left" user="Técnico João" time="14:30" text="Olá Mariana, já estou analisando suas permissões no servidor." />
                                <Message bubble="right" user="Você" time="14:35" text="Obrigada João! Fico no aguardo." />
                                <Message bubble="left" user="Técnico João" time="14:40" text="Pode testar agora? Acabei de atualizar o grupo de acesso." />
                            </div>

                            {/* Input de Mensagem */}
                            <div className="p-4 bg-white/5 border-t border-white/5 flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Escreva um comentário ou solução..."
                                    className="flex-1 bg-white/5 border border-[var(--glass-border)] rounded-2xl px-4 py-3 outline-none focus:border-[rgb(var(--roxo-claro))]/50 transition-all"
                                />
                                <button className="p-4 rounded-2xl bg-[rgb(var(--roxo-claro))] text-white hover:shadow-[0_0_20px_rgba(var(--roxo-claro),0.4)] transition-all active:scale-95">
                                    <IoSend />
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Coluna Direita: Status e Timeline */}
                    <aside className="space-y-6">
                        {/* Detalhes Técnicos */}
                        <div className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)] space-y-4">
                            <h3 className="text-xs font-bold uppercase opacity-40">Informações Técnicas</h3>

                            <InfoRow
                                label="Status"
                                value={dados?.status}
                                color={getStatusStyle(dados?.status)}
                            />

                            <InfoRow
                                label="Prioridade"
                                value={dados?.prioridade}
                                color={getPrioridadeStyle(dados?.prioridade)}
                            />


                            <InfoRow label="Categoria" value={dados?.categoria} color="text-blue-400" />

                            <InfoRow label="Técnico" value={dados?.nomeTecnico || "Pendente"} />
                        </div>

                        {/* Histórico (RF: HistoricoStatus) */}
                        <div className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)]">
                            <h3 className="text-xs font-bold uppercase opacity-40 mb-6 flex items-center gap-2">
                                <IoTime /> Histórico de Status
                            </h3>
                            <div className="space-y-6">
                                <TimelineStep status="Aberto" date="28/01 - 10:00" active />
                                <TimelineStep status="Em Andamento" date="28/01 - 14:25" active />
                                <TimelineStep status="Concluído" date="--" />
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

// Componentes Auxiliares
function Message({ bubble, user, time, text }: any) {
    return (
        <div className={`flex flex-col ${bubble === 'right' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-3xl text-sm ${bubble === 'right' ? 'bg-[rgb(var(--roxo-claro))] text-white rounded-tr-none' : 'bg-white/10 border border-[var(--glass-border)] rounded-tl-none'}`}>
                <p className="text-[10px] font-bold opacity-50 mb-1 uppercase">{user} • {time}</p>
                <p>{text}</p>
            </div>
        </div>
    );
}

function InfoRow({ label, value, color = "text-inherit" }: any) {
    return (
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-xs opacity-50">{label}</span>
            <span className={`text-sm font-bold ${color}`}>{value}</span>
        </div>
    );
}

function TimelineStep({ status, date, active = false }: any) {
    return (
        <div className="relative pl-6 border-l-2 border-white/10">
            <div className={`absolute -left-[7px] top-0 w-3 h-3 rounded-full ${active ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-white/20'}`} />
            <p className={`text-sm font-bold ${active ? 'opacity-100' : 'opacity-30'}`}>{status}</p>
            <p className="text-[10px] opacity-40 italic">{date}</p>
        </div>
    );
}
const getPrioridadeStyle = (prioridade?: string) => {
    switch (prioridade) {
        case 'URGENTE': return "text-red-500 bg-red-500/10 border-red-500/20";
        case 'ALTA':    return "text-orange-500 bg-orange-500/10 border-orange-500/20";
        case 'MEDIA':   return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
        case 'BAIXA':   return "text-green-500 bg-green-500/10 border-green-500/20";
        default:        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
};
const getStatusStyle = (status?: string) => {
    switch (status?.toUpperCase()) {
        case 'ABERTO':
            return "text-red-400";
        case 'EM_ATENDIENTO':
            return "text-blue-400";
        case 'RESOLVIDO':
            return "text-green-600";
        case 'FECHADO':
            return "text-red-400";
        default:
            return "text-gray-400";
    }
};

