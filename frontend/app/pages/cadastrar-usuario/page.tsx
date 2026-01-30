'use client';
import { useState } from 'react';
import { Sidebar } from "@/components/Sidebar";
import { IoPersonAdd, IoSave, IoPerson, IoHeadset } from "react-icons/io5";
import { UsuarioService } from "@/services/UsuarioService"; // Importe seu serviço
import { useRouter } from "next/navigation";

export default function NovoUsuario() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);


    // 1. Estado para os campos do formulário
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        perfil: 'USER' as 'USER' | 'SUPPORT' // Alinhado com seu Enum Java
    });

    // 2. Função para atualizar os campos
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. Função de envio para o Backend
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await UsuarioService.create(formData);
            alert("Usuário cadastrado com sucesso!");
            router.push('/pages/usuarios'); // Redireciona para a listagem
        } catch (error: any) {
            console.error("Erro ao cadastrar:", error);
            alert(error.response?.data?.message || "Erro ao conectar com o servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 flex flex-col items-center">
                <div className="w-full max-w-3xl space-y-6">
                    <header className="liquid-glass rounded-3xl p-6 border border-[var(--glass-border)] shadow-2xl flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-[rgb(var(--roxo-claro))]/20 text-[rgb(var(--roxo-claro))] shadow-[0_0_15px_rgba(var(--roxo-claro),0.2)]">
                            <IoPersonAdd size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Registrar Novo Usuário</h1>
                            <p className="text-sm opacity-60">Adicione um novo colaborador ao sistema.</p>
                        </div>
                    </header>

                    <section className="liquid-glass rounded-[40px] p-10 border border-[var(--glass-border)] shadow-2xl">
                        {/* 4. Adicione o onSubmit no form */}
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Nome Completo"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                placeholder="Ex: João Silva"
                                required
                            />
                            <InputField
                                label="E-mail"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="joao@empresa.com"
                                required
                            />

                            <div className="md:col-span-1 flex flex-col gap-3">
                                <label className="text-[10px] font-bold uppercase opacity-50 ml-1 tracking-wider">Perfil de Acesso</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({...formData, perfil: 'USER'})}
                                        className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                                            formData.perfil === 'USER'
                                                ? 'bg-[rgb(var(--roxo-claro))]/20 border-[rgb(var(--roxo-claro))] text-[rgb(var(--roxo-claro))] shadow-[0_0_20px_rgba(var(--roxo-claro),0.15)]'
                                                : 'bg-white/5 border-[var(--glass-border)] text-[rgb(var(--texto))]/50 hover:bg-white/10'
                                        }`}
                                    >
                                        <IoPerson size={20} />
                                        <span className="font-bold">Usuário</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setFormData({...formData, perfil: 'SUPPORT'})}
                                        className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                                            formData.perfil === 'SUPPORT'
                                                ? 'bg-[rgb(var(--roxo-claro))]/20 border-[rgb(var(--roxo-claro))] text-[rgb(var(--roxo-claro))] shadow-[0_0_20px_rgba(var(--roxo-claro),0.15)]'
                                                : 'bg-white/5 border-[var(--glass-border)] text-[rgb(var(--texto))]/50 hover:bg-white/10'
                                        }`}
                                    >
                                        <IoHeadset size={20} />
                                        <span className="font-bold">Suporte</span>
                                    </button>
                                </div>
                            </div>

                            <InputField
                                label="Senha Inicial"
                                name="senha"
                                type="password"
                                value={formData.senha}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                            />

                            <div className="hidden md:block" />

                            <button
                                type="submit"
                                disabled={loading}
                                className="md:col-span-2 mt-4 bg-[rgb(var(--roxo-claro))] py-5 rounded-2xl font-bold text-white flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(var(--roxo-claro),0.4)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Cadastrando..." : <><IoSave size={20} /> Finalizar Cadastro</>}
                            </button>
                        </form>
                    </section>
                </div>
            </main>
        </div>
    );
}

function InputField({ label, ...props }: any) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase opacity-50 ml-1 tracking-wider">{label}</label>
            <input {...props} className="bg-white/5 border border-[var(--glass-border)] rounded-2xl p-4 outline-none focus:border-[rgb(var(--roxo-claro))]/50 transition-all text-[rgb(var(--texto))]" />
        </div>
    );
}