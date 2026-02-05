'use client';

import {FaHeadset} from "react-icons/fa";

import {useState} from "react";

import Register from './register'

export default function RegisterPage() {
    const [userRole, setUserRole] = useState('USER');
    const handleUserRole = (role: string) => {
        setUserRole(role);
        localStorage.setItem('userRole', role);
    }
    return (
        <div
            className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[rgb(var(--roxo-claro),0.15)] via-transparent to-transparent overflow-hidden">
            {/* Elemento Geométrico de Fundo */}
            <div
                className="fixed inset-y-0 left-0 w-1/2 bg-[rgb(var(--roxo-claro))] opacity-10 z-0"
                style={{clipPath: 'polygon(0 0, 74% 0, 55% 100%, 0% 100%)'}}
            >
            </div>
            {/* Conteúdo Principal */}
            <div className="relative z-10 flex flex-col min-lg:flex-row min-lg:gap-30 items-center gap-10">

                {/* Card do Logo */}
                <div className="liquid-glass p-8 rounded-[40px] border border-[var(--glass-border)] shadow-2xl text-center">
                    <div className="flex flex-col gap-3">
                        <div className="w-20 h-20 bg-[rgb(var(--roxo-claro))] rounded-3xl mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(var(--roxo-claro),0.4)]">
                            <FaHeadset className="text-white text-4xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[rgb(var(--texto))]">HelpDesk</h1>
                            <h3 className="text-m opacity-30">Sistema de chamados</h3>
                        </div>
                    </div>
                </div>
                    <Register />
            </div>
        </div>
    );
}