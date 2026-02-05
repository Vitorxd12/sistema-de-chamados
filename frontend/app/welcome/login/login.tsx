'use client'
import
{ useRouter } from "next/navigation";
import { useState } from "react";
import { LoginService } from "@/services/LoginService"; // Supondo que você tenha um serviço de Auth
import { IoLogIn, IoLockClosed, IoMail } from "react-icons/io5";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        senha: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Lógica de login (Ex: salvar token no localStorage/cookies)
            const response = await LoginService.login(formData);
            router.push('/pages/novo-chamado');
        } catch (error: any) {
            console.error("Erro ao entrar:", error);
            alert(error.response?.data?.message || "Credenciais inválidas.");
        } finally {
            setLoading(false);
        }

    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)] w-200">
            <section className="liquid-glass rounded-[40px] p-10 border border-[var(--glass-border)] shadow-2xl w-full max-w-[450px]">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[rgb(var(--texto))]">Bem-vindo de volta</h2>
                    <p className="opacity-60 text-sm mt-2">Acesse sua conta para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <InputField
                        label="E-mail"
                        name="email"
                        type="email"
                        icon={<IoMail className="opacity-30" />}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        required
                    />

                    <InputField
                        label="Senha"
                        name="senha"
                        type="password"
                        icon={<IoLockClosed className="opacity-30" />}
                        value={formData.senha}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                    />


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-[rgb(var(--roxo-claro))] py-5 rounded-2xl font-bold text-white flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(var(--roxo-claro),0.4)] transition-all active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "Autenticando..." : <><IoLogIn size={22} /> Entrar</>}
                    </button>

                    <p className="text-center text-sm opacity-60 mt-4">
                        Não tem uma conta?{" "}
                        <Link href="/welcome/register" className="text-[rgb(var(--roxo-claro))] font-bold hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
            </section>
        </main>
    );
}

// InputField levemente aprimorado com suporte a ícone
function InputField({ label, icon, ...props }: any) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase opacity-50 ml-1 tracking-wider">{label}</label>
            <div className="relative flex items-center">
                {icon && <div className="absolute left-4 text-xl">{icon}</div>}
                <input
                    {...props}
                    className={`w-full bg-white/5 border border-[var(--glass-border)] rounded-2xl p-4 outline-none focus:border-[rgb(var(--roxo-claro))]/50 transition-all text-[rgb(var(--texto))] ${icon ? 'pl-12' : ''}`}
                />
            </div>
        </div>
    );
}