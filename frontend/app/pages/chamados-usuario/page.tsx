'use client';
import { Sidebar } from "@/components/Sidebar";
import { FaClipboardList } from "react-icons/fa";

export default function MeusChamados() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 flex flex-col gap-6">
                <header className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)] flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-[rgb(var(--roxo-claro))]/20 text-[rgb(var(--roxo-claro))]"><FaClipboardList size={28} /></div>
                        <h1 className="text-2xl font-bold">Meus Chamados</h1>
                    </div>
                </header>

                <div className="liquid-glass rounded-[40px] border border-[var(--glass-border)] overflow-hidden">
                    <div className="p-6 border-b border-white/5 bg-white/5 font-bold text-xs uppercase opacity-50 grid grid-cols-4">
                        <span>Chamado</span>
                        <span>Categoria</span>
                        <span>Status</span>
                        <span className="text-right">Data</span>
                    </div>
                    <div className="divide-y divide-white/5">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="p-6 grid grid-cols-4 items-center hover:bg-white/5 transition-all cursor-pointer">
                                <div className="flex flex-col">
                                    <span className="font-bold text-[rgb(var(--roxo-claro))]">#002{i}</span>
                                    <span className="text-sm opacity-80">Erro na VPN Corporativa</span>
                                </div>
                                <span className="text-sm">Infraestrutura</span>
                                <div><span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-[10px] font-bold border border-yellow-500/30">EM ANDAMENTO</span></div>
                                <span className="text-right text-xs opacity-50">28/01/2026</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}