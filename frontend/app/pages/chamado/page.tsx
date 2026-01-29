'use client';

import React from 'react';
import { Sidebar } from "@/components/Sidebar";
import {
    IoChatbubbleEllipses, IoTime, IoCheckmarkDone,
    IoPerson, IoInformationCircle, IoSend, IoArrowBack
} from "react-icons/io5";
import Link from 'next/link';

export default function DetalhesChamado() {
    return (
        <div className="flex min-h-screen text-[rgb(var(--texto))]">
            <Sidebar />

            <main className="flex-1 p-8 flex flex-col gap-6 overflow-y-auto custom-scrollbar">

                {/* Header com Ações Rápidas */}
                <header className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/pages/dashboard" className="p-2 rounded-xl hover:bg-white/10 transition-all opacity-50 hover:opacity-100">
                            <IoArrowBack size={24} />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[rgb(var(--roxo-claro))]/20 text-[rgb(var(--roxo-claro))] border border-[rgb(var(--roxo-claro))]/30">#00882</span>
                                <h1 className="text-2xl font-bold tracking-tight">Erro de Acesso ao SAP</h1>
                            </div>
                            <p className="text-sm opacity-50 italic">Aberto em 28/01/2026 por Mariana Souza</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold text-sm hover:bg-blue-500 hover:text-white transition-all">
                            <IoPerson size={18} /> Assumir Chamado
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500/20 text-green-400 border border-green-500/30 font-bold text-sm hover:bg-green-500 hover:text-white transition-all">
                            <IoCheckmarkDone size={18} /> Concluir
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">

                    {/* Coluna Central: Descrição e Chat */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* Descrição do Problema */}
                        <section className="liquid-glass rounded-3xl p-8 border border-[var(--glass-border)]">
                            <h2 className="text-xs font-bold uppercase opacity-40 mb-4 flex items-center gap-2">
                                <IoInformationCircle /> Descrição do Chamado
                            </h2>
                            <p className="leading-relaxed opacity-90">
                                Olá, não estou conseguindo realizar o login no módulo de faturamento do SAP.
                                O sistema exibe a mensagem "Erro 403: Acesso Negado" mesmo após eu resetar minha senha.
                                Preciso disso com urgência para fechar o relatório do mês.
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
                            <InfoRow label="Status" value="EM ANDAMENTO" color="text-blue-400" />
                            <InfoRow label="Prioridade" value="ALTA" color="text-red-400" />
                            <InfoRow label="Categoria" value="SOFTWARE" />
                            <InfoRow label="Técnico" value="João Ricardo" />
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