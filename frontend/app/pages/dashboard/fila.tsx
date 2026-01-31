import { IoFlash } from "react-icons/io5";
import { ChamadoService } from "@/services/ChamadoService";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChamadoResumo } from "@/types/interfaces";

export default function Fila() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [listaChamados, setListaChamados] = useState<ChamadoResumo[]>([]);

    // Memoizing the function prevents unnecessary re-renders
    const carregarDados = useCallback(async () => {
        setLoading(true);
        try {
            const data = await ChamadoService.resumo();
            setListaChamados(data);
        } catch (err) {
            console.error("Erro ao carregar dados do dashboard:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        carregarDados();
    }, [carregarDados]);

    return (
        <section className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between px-2">
                <h2 className="font-bold flex items-center gap-2 text-lg">
                    <IoFlash className="text-yellow-400" /> Fila de Chamados
                </h2>
            </div>

            <div className="liquid-glass rounded-[32px] border border-[var(--glass-border)] overflow-hidden">
                <div className="divide-y divide-white/5">
                    {listaChamados.map((i) => (
                        // FIXED: Unique key prop added here
                        <div
                            key={i.id}
                            className="p-5 flex items-center justify-between hover:bg-white/5 transition-all"
                        >
                            <div className="flex gap-4 items-center">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 font-bold text-xs">
                                    {i.id}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">{i.titulo}</h3>
                                    <p className="text-xs opacity-50">
                                        Solicitado por: {i.nomeCliente} • Há {i.dataCriacao} min
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span
                                    className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${getPrioridadeEstilo(i.prioridade)}`}
                                >
                                    {i.prioridade}
                                </span>
                                <button
                                    onClick={() => router.push('/pages/chamado/' + i.id)}
                                    className="bg-[rgb(var(--roxo-claro))] hover:bg-[rgb(var(--roxo-claro))]/80 text-white text-xs font-bold py-2 px-4 rounded-xl transition-all shadow-lg active:scale-95"
                                >
                                    Ver Detalhes
                                </button>
                            </div>
                        </div>
                    ))}

                    {!loading && listaChamados.length === 0 && (
                        <div className="p-10 text-center opacity-50 text-sm">
                            Nenhum chamado na fila.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

const getPrioridadeEstilo = (prioridade: string) => {
    // Added safety check for undefined/null
    const p = prioridade?.toUpperCase() || 'PADRAO';

    switch (p) {
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