'use client'
import {useRouter} from "next/navigation";
import {useState} from "react";
import {UsuarioService} from "@/services/UsuarioService";
import {IoHeadset, IoPerson, IoSave} from "react-icons/io5";
import Link from "next/link";

export default function Register (){
    const router = useRouter();
    const [loading, setLoading] = useState(false);


    // 1. Estado para os campos do formulário
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        perfil: 'USER' as 'USER' | 'SUPPORT' | 'ADMIN'
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
            router.push('/welcome/login'); // Redireciona para a listagem
        } catch (error: any) {
            console.error("Erro ao cadastrar:", error);
            alert(error.response?.data?.message || "Erro ao conectar com o servidor.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="liquid-glass rounded-[40px] p-10 border border-[var(--glass-border)] shadow-2xl max-w-200">
            <h4 className={"opacity-60 font-bold mb-2"}>Crie uma nova conta</h4>

            {/* Substituído 'grid grid-cols-1 md:grid-cols-2' por:
               'flex flex-wrap' e '-m-3' (o margin negativo compensa o padding dos itens para manter o alinhamento)
            */}
            <form onSubmit={handleSubmit} className="flex flex-wrap -m-3">

                {/* Cada InputField agora precisa de um container flex que defina sua largura.
                   w-full (mobile) | md:w-1/2 (desktop)
                */}
                <div className="p-3 w-full md:w-1/2">
                    <InputField
                        label="Nome Completo"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Ex: João Silva"
                        required
                    />
                </div>

                <div className="p-3 w-full md:w-1/2">
                    <InputField
                        label="E-mail"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="joao@empresa.com"
                        required
                    />
                </div>

                <div className="p-3 w-full md:w-1/2 flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase opacity-50 ml-1 tracking-wider">Perfil de Acesso</label>
                    {/* Botões internos também convertidos para flex */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setFormData({...formData, perfil: 'USER'})}
                            className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
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
                            className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
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

                <div className="p-3 w-full md:w-1/2">
                    <InputField
                        label="Senha"
                        name="senha"
                        type="password"
                        value={formData.senha}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                    />
                </div>

                {/* Botão de envio ocupando 100% (equivale ao col-span-2) */}
                <div className="p-3 w-full">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 bg-[rgb(var(--roxo-claro))] py-5 rounded-2xl font-bold text-white flex items-center justify-center gap-3 hover:shadow-[0_0_30_rgba(var(--roxo-claro),0.4)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Cadastrando..." : <><IoSave size={20} /> Finalizar Cadastro</>}
                    </button>
                </div>
            </form>
            <p className="text-center text-sm opacity-60 mt-4">
                Já tem uma conta?{" "}
                <Link href="../welcome/login" className="text-[rgb(var(--roxo-claro))] font-bold hover:underline">
                    Login
                </Link>
            </p>
        </section>
    )
}
function InputField({ label, ...props }: any) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase opacity-50 ml-1 tracking-wider">{label}</label>
            <input {...props} className="bg-white/5 border border-[var(--glass-border)] rounded-2xl p-4 outline-none focus:border-[rgb(var(--roxo-claro))]/50 transition-all text-[rgb(var(--texto))]" />
        </div>
    );
}