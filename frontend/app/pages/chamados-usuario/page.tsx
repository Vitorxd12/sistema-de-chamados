'use client';
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { FaClipboardList } from "react-icons/fa";
import { ChamadoResumo } from "@/types/interfaces";
import { ChamadoService } from "@/services/ChamadoService";
import { useRouter } from "next/navigation";

export default function MeusChamados() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [chamados, setChamados] = useState<ChamadoResumo[]>([]);

    useEffect(() => {
        setLoading(true);
        ChamadoService.meusChamados()
            .then(setChamados)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="flex h-screen min-h-screen text-[rgb(var(--texto))]">
            <Sidebar />
            <main className="flex-1 p-8 flex flex-col gap-6">
                <header className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)] flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-[rgb(var(--roxo-claro))]/20 text-[rgb(var(--roxo-claro))]"><FaClipboardList size={28} /></div>
                        <h1 className="text-2xl font-bold">Meus Chamados</h1>
                    </div>
                    <span className="text-xs opacity-50">{chamados.length} chamado(s)</span>
                </header>

                <div className="liquid-glass rounded-[40px] border border-[var(--glass-border)] overflow-hidden">
                    <div className="p-6 border-b border-white/5 bg-white/5 font-bold text-xs uppercase opacity-50 grid grid-cols-4">
                        <span>Chamado</span>
                        <span>Categoria</span>
                        <span>Status</span>
                        <span className="text-right">Data</span>
                    </div>
                    <div className="divide-y divide-white/5">
                        {loading && (
                            <p className="p-8 text-center opacity-50 italic text-sm">Carregando...</p>
                        )}
                        {!loading && chamados.length === 0 && (
                            <p className="p-8 text-center opacity-50 italic text-sm">Nenhum chamado encontrado.</p>
                        )}
                        {chamados.map(c => (
                            <div
                                key={c.id}
                                onClick={() => router.push(`/pages/chamado/${c.id}`)}
                                className="p-6 grid grid-cols-4 items-center hover:bg-white/5 transition-all cursor-pointer"
                            >
                                <div className="flex flex-col">
                                    <span className="font-bold text-[rgb(var(--roxo-claro))]">#{c.id}</span>
                                    <span className="text-sm opacity-80">{c.titulo}</span>
                                </div>
                                <span className="text-sm opacity-70">—</span>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusEstilo(c.status)}`}>
                                        {c.status.replace('_', ' ')}
                                    </span>
                                </div>
                                <span className="text-right text-xs opacity-50">
                                    {new Date(c.dataCriacao).toLocaleDateString('pt-BR')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

function getStatusEstilo(status: string) {
    switch (status) {
        case 'ABERTO':       return "bg-red-500/20 text-red-400 border-red-500/30";
        case 'EM_ANDAMENTO': return "bg-blue-500/20 text-blue-400 border-blue-500/30";
        case 'RESOLVIDO':    return "bg-green-500/20 text-green-400 border-green-500/30";
        case 'FECHADO':      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        default:             return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    }
}
