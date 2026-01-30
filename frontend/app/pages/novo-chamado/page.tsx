'use client';

import React, { useState } from 'react';
import { Sidebar } from "@/components/Sidebar";
import { IoTicket, IoSend } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { ChamadoService } from "@/services/ChamadoService";

export default function NovoChamado() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Estado simples e direto
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('BAIXA');
    const [categoria, setCategoria] = useState('OUTROS');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Criamos o objeto que o Java espera bem aqui
        const dadosParaEnviar = {
            titulo: titulo,
            descricao: descricao,
            prioridade: prioridade as any,
            categoria: categoria as any,
            idUsuario: 1
        };

        try {
            await ChamadoService.create(dadosParaEnviar);
            alert("Chamado aberto com sucesso!");
            router.push('/pages/chamados-usuario');
        } catch (error: any) {
            alert("Erro ao salvar: " + (error.response?.data?.message || "Servidor offline"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen min-h-screen text-[rgb(var(--texto))]">
            <Sidebar />
            <main className="flex-1 flex flex-col items-center p-8">
                <div className="w-full max-w-2xl space-y-6">

                    <header className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)] shadow-2xl flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-[rgb(var(--roxo-claro))]/20 text-[rgb(var(--roxo-claro))] shadow-[0_0_15px_rgba(var(--roxo-claro),0.2)]">
                            <IoTicket size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Novo Chamado</h1>
                            <p className="text-sm opacity-60">Preencha as informações abaixo para suporte técnico.</p>
                        </div>
                    </header>

                    <section className="liquid-glass rounded-3xl p-8 shadow-2xl border border-[var(--glass-border)]">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase opacity-50 ml-1">Título</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Erro no login"
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                        className="w-full bg-white/5 border border-[var(--glass-border)] rounded-xl p-3 outline-none focus:border-[rgb(var(--roxo-claro))]/50 transition-all text-[rgb(var(--texto))]"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase opacity-50 ml-1">Categoria</label>
                                    <select
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}
                                        className="w-full bg-white/5 border border-[var(--glass-border)] rounded-xl p-3 outline-none focus:border-[rgb(var(--roxo-claro))]/50 transition-all text-[rgb(var(--texto))]"
                                    >
                                        <option value="SOFTWARE">Software</option>
                                        <option value="HARDWARE">Hardware</option>
                                        <option value="REDE">Redes</option>
                                        <option value="ACESSO">Acessos</option>
                                        <option value="TELEFONIA">Telefonia</option>
                                        <option value="OUTROS">Outros</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase opacity-50 ml-1">Descrição Detalhada</label>
                                <textarea
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    rows={4}
                                    placeholder="Descreva o que está acontecendo..."
                                    className="w-full bg-white/5 border border-[var(--glass-border)] rounded-xl p-3 outline-none focus:border-[rgb(var(--roxo-claro))]/50 transition-all resize-none text-[rgb(var(--texto))]"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase opacity-50 ml-1">Prioridade</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">

                                    {/* Botão Baixa */}
                                    <button
                                        type="button"
                                        onClick={() => setPrioridade('BAIXA')}
                                        className={`p-2 rounded-lg border transition-all text-sm ${prioridade === 'BAIXA' ? 'border-[rgb(var(--roxo-claro))] bg-[rgb(var(--roxo-claro))]/20 text-[rgb(var(--roxo-claro))]' : 'border-[var(--glass-border)] bg-white/5'}`}
                                    >
                                        Baixa
                                    </button>

                                    {/* Botão Média */}
                                    <button
                                        type="button"
                                        onClick={() => setPrioridade('MEDIA')}
                                        className={`p-2 rounded-lg border transition-all text-sm ${prioridade === 'MEDIA' ? 'border-[rgb(var(--roxo-claro))] bg-[rgb(var(--roxo-claro))]/20 text-[rgb(var(--roxo-claro))]' : 'border-[var(--glass-border)] bg-white/5'}`}
                                    >
                                        Média
                                    </button>

                                    {/* Botão Alta */}
                                    <button
                                        type="button"
                                        onClick={() => setPrioridade('ALTA')}
                                        className={`p-2 rounded-lg border transition-all text-sm ${prioridade === 'ALTA' ? 'border-[rgb(var(--roxo-claro))] bg-[rgb(var(--roxo-claro))]/20 text-[rgb(var(--roxo-claro))]' : 'border-[var(--glass-border)] bg-white/5'}`}
                                    >
                                        Alta
                                    </button>

                                    {/* Botão Urgente */}
                                    <button
                                        type="button"
                                        onClick={() => setPrioridade('URGENTE')}
                                        className={`p-2 rounded-lg border transition-all text-sm ${prioridade === 'URGENTE' ? 'border-[rgb(var(--roxo-claro))] bg-[rgb(var(--roxo-claro))]/20 text-[rgb(var(--roxo-claro))]' : 'border-[var(--glass-border)] bg-white/5'}`}
                                    >
                                        Urgente
                                    </button>

                                </div>
                            </div>

                            <button
                                className="w-full mt-4 flex items-center justify-center gap-2 bg-[rgb(var(--roxo-claro))] text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
                                type="submit"
                                disabled={loading}>
                                <IoSend className="rotate-[325deg]" />
                                {loading ? "Enviando..." : "Abrir Chamado"}
                            </button>
                        </form>
                    </section>
                </div>
            </main>
        </div>
    );
}