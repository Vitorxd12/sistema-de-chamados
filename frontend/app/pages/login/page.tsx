'use client';
import { FaHeadset, FaUser } from "react-icons/fa";
import Link from "next/link";
export const userRole = "SUPPORT";
export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[rgb(var(--roxo-claro),0.15)] via-transparent to-transparent">
            <div className="w-full max-w-md liquid-glass p-10 rounded-[40px] border border-[var(--glass-border)] shadow-2xl text-center">
                <div className="mb-8">
                    <div className="w-20 h-20 bg-[rgb(var(--roxo-claro))] rounded-3xl mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(var(--roxo-claro),0.4)] mb-4">
                        <FaHeadset className="text-white text-4xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-[rgb(var(--texto))]">HelpDesk</h1>
                    <p className="text-[rgb(var(--texto))] opacity-60 mt-2">Escolha seu perfil de acesso</p>
                </div>

                <div className="space-y-4">
                    <Link href="/pages/dashboard">

                        <button className="w-full flex m-2 items-center justify-center gap-4 bg-[rgb(var(--roxo-claro))] hover:bg-[rgb(var(--roxo-claro))]/90 text-white font-bold py-5 rounded-2xl transition-all active:scale-95 shadow-lg group">
                            <FaHeadset size={22} className="group-hover:animate-bounce" />
                            Entrar como Suporte
                        </button>
                    </Link>

                    <Link href="/pages/dashboard">

                        <button className="w-full flex m-2 items-center justify-center gap-4 bg-white/5 hover:bg-white/10 border border-[var(--glass-border)] text-[rgb(var(--texto))] font-bold py-5 rounded-2xl transition-all active:scale-95">
                            <FaUser size={20} className="opacity-70" />
                            Entrar como Usuário
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}