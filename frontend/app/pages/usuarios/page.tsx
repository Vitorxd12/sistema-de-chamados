'use client';

import React, { useState } from 'react';
import { Sidebar } from "@/components/Sidebar";
import { IoPeople, IoPersonAdd, IoShieldCheckmark, IoCloseCircle, IoCheckmarkCircle } from "react-icons/io5";
import { UsuarioResponse, PerfilUsuario} from "@/types/interfaces";
import Link from "next/link";

const MOCK_USUARIOS: UsuarioResponse[] = [
    { id: 1, nome: "Ana Silva", email: "ana@empresa.com", perfil: "SUPPORT", ativo: true },
    { id: 2, nome: "Carlos Lima", email: "carlos@cliente.com", perfil: "USER", ativo: false },
];

export default function GerenciamentoUsuarios() {
    const [usuarios, setUsuarios] = useState<UsuarioResponse[]>(MOCK_USUARIOS);

    const getPerfilStyle = (perfil: PerfilUsuario) => {
        switch (perfil) {
            case 'SUPPORT': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-green-500/20 text-green-400 border-green-500/30';
        }
    };

    return (
        <div className="flex min-h-screen text-[rgb(var(--texto))] ">
            <Sidebar />

            <main className="flex-1 p-8 flex justify-center ">
                <div className="w-full max-w-6xl space-y-6">

                    {/* Card do Header */}
                    <header className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)] shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-[rgb(var(--roxo-claro))]/20 text-[rgb(var(--roxo-claro))] shadow-[0_0_15px_rgba(var(--roxo-claro),0.2)]">
                                <IoPeople size={32} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Usuários</h1>
                                <p className="text-sm opacity-60">Administre os acessos e permissões da plataforma.</p>
                            </div>
                        </div>

                        <Link href="/pages/cadastrar-usuario">
                            <button className="flex items-center justify-center gap-2 bg-[rgb(var(--roxo-claro))] hover:bg-[rgb(var(--roxo-claro))]/90 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95 shadow-lg">
                                <IoPersonAdd size={20} />
                                Novo Usuário
                            </button>
                        </Link>
                    </header>

                    {/* Card da Tabela (Corpo Principal) */}
                    <section className="liquid-glass rounded-3xl overflow-hidden border border-[var(--glass-border)] shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-white/5 border-b border-[var(--glass-border)] text-xs font-bold uppercase tracking-wider opacity-60">
                            <tr>
                                <th className="px-6 py-4">Usuário</th>
                                <th className="px-6 py-4">Perfil</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Ações</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--glass-border)]">
                            {usuarios.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-lg">{user.nome}</span>
                                            <span className="text-sm opacity-50">{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPerfilStyle(user.perfil)}`}>
                                                {user.perfil}
                                            </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            {user.ativo ? (
                                                <><IoCheckmarkCircle className="text-green-500" /> <span className="text-sm italic opacity-80 text-green-400">Ativo</span></>
                                            ) : (
                                                <><IoCloseCircle className="text-red-500" /> <span className="text-sm italic opacity-80 text-red-300">Inativo</span></>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        {user.ativo ? (
                                            <button title="Desativar Usuário" className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                                                <IoCloseCircle size={20} />
                                            </button>
                                        ) : (
                                            <button title="Reativar Usuário" className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white transition-all">
                                                <IoShieldCheckmark size={20} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <p className={'p-4 pl-10 opacity-60 text-xs italic'}>Total de {usuarios.length} usuários registrados no sistema</p>
                    </section>


                </div>
            </main>
        </div>
    );
}