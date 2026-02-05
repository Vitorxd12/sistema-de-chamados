'use client';
import { useState } from 'react';
import { Sidebar } from "@/components/Sidebar";
import { IoPersonAdd, IoSave, IoPerson, IoHeadset } from "react-icons/io5";
import { UsuarioService } from "@/services/UsuarioService";
import { useRouter } from "next/navigation";
import NovoUsuario from "./novo-usuario"

export default function NovoUsuarioPage() {
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
                    <NovoUsuario />
                </div>
            </main>
        </div>
    );
}
