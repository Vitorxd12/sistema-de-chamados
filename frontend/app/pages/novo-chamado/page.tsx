'use client';

import React from 'react';
import { Sidebar } from "@/components/Sidebar";
import { IoTicket, IoSend } from "react-icons/io5";

export default function NovoChamado() {
    return (
        <div className="flex min-h-screen text-[rgb(var(--texto))]">
            <Sidebar />

            <main className="flex-1 flex flex-col items-center p-8">
                <div className="w-full max-w-2xl space-y-6">

                    {/* Header do Chamado em um Card Separado */}
                    <header className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)] shadow-2xl flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-[rgb(var(--roxo-claro))]/20 text-[rgb(var(--roxo-claro))] shadow-[0_0_15px_rgba(var(--roxo-claro),0.2)]">
                            <IoTicket size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-[rgb(var(--texto))]">Novo Chamado</h1>
                            <p className="text-sm opacity-60 text-[rgb(var(--texto))]">Preencha as informações abaixo para suporte técnico.</p>
                        </div>
                    </header>

                    {/* Card Principal do Formulário */}
                    <section className="liquid-glass rounded-3xl p-8 shadow-2xl border border-[var(--glass-border)] transition-all duration-500">
                        <form className="space-y-6">
                            {/* Grid para Título e Categoria */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-wider opacity-50 ml-1 text-[rgb(var(--texto))]">Título</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Erro no login"
                                        className="w-full bg-white/5 border border-[var(--glass-border)] rounded-xl p-3 outline-none
                                        hover:border-[rgb(var(--roxo-claro))]/30 hover:bg-white/10
                                        focus:border-[rgb(var(--roxo-claro))]/50 focus:bg-white/10 transition-all text-[rgb(var(--texto))]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-wider opacity-50 ml-1 text-[rgb(var(--texto))]">Categoria</label>
                                    <select
                                        className="w-full bg-white/5 border border-[var(--glass-border)] rounded-xl p-3 outline-none
                                        hover:border-[rgb(var(--roxo-claro))]/30 hover:bg-white/10
                                        focus:border-[rgb(var(--roxo-claro))]/50 focus:bg-white/10
                                        transition-all appearance-none cursor-pointer
                                        text-[rgb(var(--texto))] pr-10"
                                    >
                                        <option>Software</option>
                                        <option>Hardware</option>
                                        <option>Redes</option>
                                        <option>Acessos</option>
                                        <option>Telefonia</option>
                                        <option>Outros</option>
                                    </select>
                                </div>
                            </div>

                            {/* Descrição */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider opacity-50 ml-1 text-[rgb(var(--texto))]">Descrição Detalhada</label>
                                <textarea
                                    rows={4}
                                    placeholder="Descreva o que está acontecendo..."
                                    className="w-full bg-white/5 border border-[var(--glass-border)] rounded-xl p-3 outline-none
                                    hover:border-[rgb(var(--roxo-claro))]/30 hover:bg-white/10
                                    focus:border-[rgb(var(--roxo-claro))]/50 focus:bg-white/10 transition-all resize-none text-[rgb(var(--texto))]"
                                />
                            </div>

                            {/* Prioridade */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider opacity-50 ml-1 text-[rgb(var(--texto))]">Prioridade</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {['Baixa', 'Média', 'Alta', 'Urgente'].map((nivel) => (
                                        <label key={nivel} className="cursor-pointer group">
                                            <input type="radio" name="prioridade" className="peer hidden" />
                                            <div className="text-center p-2 rounded-lg border border-[var(--glass-border)] bg-white/5
                                            group-hover:bg-[rgb(var(--roxo-claro))]/10 group-hover:border-[rgb(var(--roxo-claro))]/40
                                            peer-checked:border-[rgb(var(--roxo-claro))] peer-checked:bg-[rgb(var(--roxo-claro))]/20 peer-checked:text-[rgb(var(--roxo-claro))] transition-all text-sm text-[rgb(var(--texto))]">
                                                {nivel}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Botão Enviar */}
                            <button className="w-full mt-4 flex items-center justify-center gap-2 bg-[rgb(var(--roxo-claro))] hover:bg-[rgb(var(--roxo-claro))]/90 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(var(--roxo-claro),0.3)] hover:shadow-[0_0_30px_rgba(var(--roxo-claro),0.5)] transition-all active:scale-95">
                                <IoSend className="rotate-[325deg]" />
                                Abrir Chamado
                            </button>
                        </form>
                    </section>
                </div>
            </main>
        </div>
    );
}