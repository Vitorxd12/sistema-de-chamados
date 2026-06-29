'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Sidebar } from "@/components/Sidebar";
import {
    IoChatbubbleEllipses, IoTime, IoCheckmarkDone,
    IoPerson, IoInformationCircle, IoSend, IoArrowBack, IoClose
} from "react-icons/io5";
import Link from 'next/link';
import { useParams, useRouter } from "next/navigation";
import { ChamadoService } from "@/services/ChamadoService";
import { ComentarioService } from "@/services/ComentarioService";
import { HistoricoService } from "@/services/HistoricoService";
import { ChamadoDetalhado, ComentarioResponse, HistoricoStatusDTO } from "@/types/interfaces";

export default function DetalhesChamado() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    const chamadoId = Number(Array.isArray(id) ? id[0] : id);

    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState<ChamadoDetalhado | null>(null);
    const [comentarios, setComentarios] = useState<ComentarioResponse[]>([]);
    const [historico, setHistorico] = useState<HistoricoStatusDTO[]>([]);
    const [textoComentario, setTextoComentario] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [mostrarConcluir, setMostrarConcluir] = useState(false);
    const [parecerTecnico, setParecerTecnico] = useState('');
    const [userRole, setUserRole] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setUserRole(localStorage.getItem('userRole'));
        const id = localStorage.getItem('userId');
        if (id) setUserId(Number(id));
    }, []);

    const carregarDados = useCallback(async () => {
        if (!chamadoId) return;
        setLoading(true);
        try {
            const [dadosChamado, listaComentarios, listaHistorico] = await Promise.all([
                ChamadoService.detalhado(String(chamadoId)),
                ComentarioService.listar(chamadoId),
                HistoricoService.listar(chamadoId),
            ]);
            setDados(dadosChamado);
            setComentarios(listaComentarios);
            setHistorico(listaHistorico);
        } catch (err) {
            console.error("Erro ao carregar chamado:", err);
        } finally {
            setLoading(false);
        }
    }, [chamadoId]);

    useEffect(() => {
        carregarDados();
    }, [carregarDados]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [comentarios]);

    const handleEnviarComentario = async () => {
        if (!textoComentario.trim()) return;
        setEnviando(true);
        try {
            const novo = await ComentarioService.criar({ chamadoId, texto: textoComentario });
            setComentarios(prev => [...prev, novo]);
            setTextoComentario('');
        } catch (err: any) {
            alert(err.response?.data || "Erro ao enviar comentário.");
        } finally {
            setEnviando(false);
        }
    };

    const handleAssumirChamado = async () => {
        try {
            await ChamadoService.assumir({ idChamado: chamadoId });
            await carregarDados();
        } catch (err: any) {
            alert(err.response?.data || "Erro ao assumir chamado.");
        }
    };

    const handleConcluirChamado = async () => {
        if (!parecerTecnico.trim()) {
            alert("Informe o parecer técnico.");
            return;
        }
        try {
            await ChamadoService.concluir({ idChamado: chamadoId, parecerTecnico });
            setMostrarConcluir(false);
            await carregarDados();
        } catch (err: any) {
            alert(err.response?.data || "Erro ao concluir chamado.");
        }
    };

    const isTecnico = userRole === 'SUPPORT' || userRole === 'ADMIN';
    const podeAssumirOuConcluir = isTecnico && dados?.status !== 'RESOLVIDO' && dados?.status !== 'FECHADO';

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

                <header className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/pages/dashboard" className="p-2 rounded-xl hover:bg-white/10 transition-all opacity-50 hover:opacity-100">
                            <IoArrowBack size={24} />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[rgb(var(--roxo-claro))]/20 text-[rgb(var(--roxo-claro))] border border-[rgb(var(--roxo-claro))]/30">#{dados?.id}</span>
                                <h1 className="text-2xl font-bold tracking-tight">{dados?.titulo || "Carregando..."}</h1>
                            </div>
                            <p className="text-sm opacity-50 italic">
                                Aberto em {dados?.dataCriacao ? formatarData(dados.dataCriacao) : "..."} por {dados?.nomeCliente || "..."}
                            </p>
                        </div>
                    </div>

                    {podeAssumirOuConcluir && (
                        <div className="flex gap-3">
                            {dados?.status === 'ABERTO' && (
                                <button
                                    onClick={handleAssumirChamado}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold text-sm hover:bg-blue-500 hover:text-white transition-all"
                                >
                                    <IoPerson size={18} /> Assumir Chamado
                                </button>
                            )}
                            {dados?.status === 'EM_ANDAMENTO' && (
                                <button
                                    onClick={() => setMostrarConcluir(true)}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500/20 text-green-600 border border-green-500/30 font-bold text-sm hover:bg-green-500 hover:text-white transition-all"
                                >
                                    <IoCheckmarkDone size={18} /> Concluir
                                </button>
                            )}
                        </div>
                    )}
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">

                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <section className="liquid-glass rounded-3xl p-8 border border-[var(--glass-border)]">
                            <h2 className="text-xs font-bold uppercase opacity-40 mb-4 flex items-center gap-2">
                                <IoInformationCircle /> Descrição do Chamado
                            </h2>
                            <p className="leading-relaxed opacity-90">
                                {dados?.descricao || "Descrição não disponível."}
                            </p>
                            {dados?.parecerTecnico && (
                                <div className="mt-4 p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                                    <p className="text-xs font-bold uppercase text-green-400 mb-1">Parecer Técnico</p>
                                    <p className="text-sm">{dados.parecerTecnico}</p>
                                </div>
                            )}
                        </section>

                        <section className="liquid-glass rounded-3xl border border-[var(--glass-border)] flex-1 flex flex-col overflow-hidden min-h-[400px]">
                            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center gap-2">
                                <IoChatbubbleEllipses className="text-[rgb(var(--roxo-claro))]" />
                                <span className="font-bold text-sm">Mensagens e Atualizações</span>
                                <span className="ml-auto text-xs opacity-40">{comentarios.length} mensagem(ns)</span>
                            </div>

                            <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar">
                                {comentarios.length === 0 && (
                                    <p className="text-center opacity-40 text-sm italic">Nenhum comentário ainda.</p>
                                )}
                                {comentarios.map(c => (
                                    <Message
                                        key={c.id}
                                        isOwn={c.usuarioId === userId}
                                        user={c.nomeUsuario}
                                        time={formatarDataHora(c.dataEnvio)}
                                        text={c.texto}
                                    />
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            <div className="p-4 bg-white/5 border-t border-white/5 flex gap-2">
                                <input
                                    type="text"
                                    value={textoComentario}
                                    onChange={e => setTextoComentario(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleEnviarComentario()}
                                    placeholder="Escreva um comentário..."
                                    className="flex-1 bg-white/5 border border-[var(--glass-border)] rounded-2xl px-4 py-3 outline-none focus:border-[rgb(var(--roxo-claro))]/50 transition-all"
                                />
                                <button
                                    onClick={handleEnviarComentario}
                                    disabled={enviando}
                                    className="p-4 rounded-2xl bg-[rgb(var(--roxo-claro))] text-white hover:shadow-[0_0_20px_rgba(var(--roxo-claro),0.4)] transition-all active:scale-95 disabled:opacity-50"
                                >
                                    <IoSend />
                                </button>
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-6">
                        <div className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)] space-y-4">
                            <h3 className="text-xs font-bold uppercase opacity-40">Informações Técnicas</h3>
                            <InfoRow label="Status" value={dados?.status} color={getStatusStyle(dados?.status)} />
                            <InfoRow label="Prioridade" value={dados?.prioridade} color={getPrioridadeStyle(dados?.prioridade)} />
                            <InfoRow label="Categoria" value={dados?.categoria} color="text-blue-400" />
                            <InfoRow label="Técnico" value={dados?.nomeTecnico || "Pendente"} />
                            {dados?.dataFechamento && (
                                <InfoRow label="Fechado em" value={formatarData(dados.dataFechamento)} />
                            )}
                        </div>

                        <div className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)]">
                            <h3 className="text-xs font-bold uppercase opacity-40 mb-6 flex items-center gap-2">
                                <IoTime /> Histórico de Status
                            </h3>
                            <div className="space-y-6">
                                {historico.length === 0 && (
                                    <p className="text-xs opacity-40 italic">Nenhuma alteração registrada.</p>
                                )}
                                {historico.map((h, idx) => (
                                    <TimelineStep
                                        key={h.id}
                                        status={`${h.statusAnterior} → ${h.statusAtual}`}
                                        date={formatarDataHora(h.dataHora)}
                                        active={idx === 0}
                                    />
                                ))}
                                <TimelineStep status="Aberto" date={dados?.dataCriacao ? formatarDataHora(dados.dataCriacao) : "..."} active={historico.length === 0} />
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {mostrarConcluir && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="liquid-glass rounded-3xl p-8 border border-[var(--glass-border)] w-full max-w-md space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="font-bold text-lg">Concluir Chamado</h2>
                            <button onClick={() => setMostrarConcluir(false)} className="opacity-50 hover:opacity-100">
                                <IoClose size={24} />
                            </button>
                        </div>
                        <p className="text-sm opacity-60">Descreva o que foi feito para resolver o problema.</p>
                        <textarea
                            rows={5}
                            value={parecerTecnico}
                            onChange={e => setParecerTecnico(e.target.value)}
                            placeholder="Ex: Reinstalei o driver e atualizei o sistema..."
                            className="w-full bg-white/5 border border-[var(--glass-border)] rounded-2xl p-4 outline-none focus:border-[rgb(var(--roxo-claro))]/50 transition-all resize-none"
                        />
                        <button
                            onClick={handleConcluirChamado}
                            className="w-full py-3 rounded-2xl bg-green-500 text-white font-bold hover:bg-green-400 transition-all active:scale-95"
                        >
                            Confirmar Conclusão
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function Message({ isOwn, user, time, text }: { isOwn: boolean; user: string; time: string; text: string }) {
    return (
        <div className={`flex flex-col gap-1 ${isOwn ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[80%] p-4 text-sm ${
                isOwn
                    ? 'bg-[rgb(var(--roxo-claro))] text-white rounded-3xl rounded-tr-none'
                    : 'bg-white/10 border border-[var(--glass-border)] rounded-3xl rounded-tl-none'
            }`}>
                <p className="text-[11px] opacity-50 mb-1">{time}</p>
                <p>{text}</p>
            </div>
            <p className="text-[10px] opacity-40 px-1">{user}</p>
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

function formatarData(iso: string): string {
    return new Date(iso).toLocaleDateString('pt-BR');
}

function formatarDataHora(iso: string): string {
    return new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

const getPrioridadeStyle = (prioridade?: string) => {
    switch (prioridade) {
        case 'URGENTE': return "text-red-400";
        case 'ALTA':    return "text-orange-400";
        case 'MEDIA':   return "text-yellow-400";
        case 'BAIXA':   return "text-green-400";
        default:        return "text-gray-400";
    }
};

const getStatusStyle = (status?: string) => {
    switch (status) {
        case 'ABERTO':       return "text-red-400";
        case 'EM_ANDAMENTO': return "text-blue-400";
        case 'RESOLVIDO':    return "text-green-400";
        case 'FECHADO':      return "text-gray-400";
        default:             return "text-gray-400";
    }
};
