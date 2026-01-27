"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";

// React Icons
import {MdDashboard, MdLightMode, MdDarkMode} from "react-icons/md";
import {FaUsers, FaClipboardList, FaHeadset} from "react-icons/fa";
import {IoSettingsSharp, IoLogOutOutline, IoTicket} from "react-icons/io5";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

type IconType = React.ComponentType<{ className?: string }>;

function SidebarItem({href, icon: Icon, label, collapsed}: {
    href: string;
    icon: IconType;
    label: string;
    collapsed: boolean;
}) {
    const pathname = usePathname();
    const active = pathname === href || pathname.startsWith(`${href}/`);

    return (
        <Link
            href={href}
            className={[
                "group flex items-center rounded-xl py-2.5 transition-all duration-300",
                collapsed ? "justify-center px-2" : "gap-3 px-4",
                active
                    ? "bg-[rgb(var(--roxo-claro))]/20 text-[rgb(var(--roxo-claro))] shadow-inner border border-[rgb(var(--roxo-claro))]/30"
                    : "text-[rgb(var(--texto))]/70 hover:bg-[rgb(var(--roxo-claro))]/10 hover:text-[rgb(var(--roxo-claro))]"
            ].join(" ")}
        >
            <Icon className={collapsed ? "h-6 w-6" : "h-5 w-5"}/>
            {!collapsed && <span className="truncate font-medium">{label}</span>}
            {!collapsed && active && (
                <span
                    className="ml-auto h-5 w-1 rounded-full bg-[rgb(var(--roxo-claro))] shadow-[0_0_8px_rgb(var(--roxo-claro))]"/>
            )}
        </Link>
    );
}

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState("dark");
    const userRole = "Admin";

    // Lógica de Toggle de Tema
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);
        if (savedTheme === "light") document.body.classList.add("lightmode");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.body.classList.toggle("lightmode");
    };

    return (
        <aside className={`flex flex-col m-4  rounded-3xl  liquid-glass transition-[width] duration-500 h-[calc(100vh-2rem)] 
 ${collapsed ? "w-20" : "w-88"}`}>

            {/* Header com Logo e Toggle */}
            <div className="px-4 py-6 border-b border-white/5">
                {collapsed && (
                    <div
                        className="relative h-10 w-10 overflow-hidden rounded-xl bg-[rgb(var(--roxo-escuro))]/20 roxo-claro p-1">
                        <FaHeadset className={'h-full w-full p-1'}/>
                    </div>
                )}
                <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
                    {!collapsed && (
                        <div
                            className="relative h-10 w-10 overflow-hidden rounded-xl bg-[rgb(var(--roxo-escuro))]/20 roxo-claro p-1">
                            <FaHeadset className={'h-full w-full p-1'}/>
                        </div>
                    )}
                    {!collapsed && (
                        <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-bold text-[rgb(var(--texto))] uppercase">HelpDesk
                            </div>
                            <div className="text-[10px] text-[rgb(var(--roxo-claro))] font-bold">{userRole}</div>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="mx-auto my-2 p-2 rounded-full hover:bg-white/10 text-[rgb(var(--texto))]/40"
                    >
                        {collapsed ? <FiChevronRight size={20}/> : <FiChevronLeft size={20}/>}
                    </button>

                </div>
            </div>

            {/* Itens do Menu (Todos restaurados) */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar">
                {userRole === "Admin" && (
                    <div>
                        <SidebarItem href="/dashboard" icon={MdDashboard} label="Dashboard" collapsed={collapsed}/>
                        <SidebarItem href="/usuarios" icon={FaUsers} label="Usuários" collapsed={collapsed}/>
                        <SidebarItem href="/configuracoes" icon={IoSettingsSharp} label="Configurações"
                                     collapsed={collapsed}/>
                        <div className="my-4 h-px bg-white/5 mx-2"/>
                    </div>
                )}
                <SidebarItem href="/novo-chamado" icon={IoTicket} label="Novo Chamado" collapsed={collapsed}/>
                <SidebarItem href="/chamados-usuario" icon={FaClipboardList} label="Meus Chamados"
                             collapsed={collapsed}/>
            </div>


            {/* Footer */}
            <div className="border-t border-white/5 p-4 mt-auto">
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--roxo-claro))]/20 border border-[rgb(var(--roxo-claro))]/30 font-bold text-[rgb(var(--roxo-claro))]">
                        A
                    </div>
                    {!collapsed && (
                        <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-semibold">Admin Teste</div>
                            <div className="text-[10px] opacity-40 uppercase">Suporte Nível 3</div>
                        </div>
                    )}
                    {!collapsed && (
                        <div>
                            <button onClick={toggleTheme}
                                    className="p-1.5 rounded-lg hover:opacity-50 text-[rgb(var(--texto))]/60 transition-all">
                                {theme === "dark" ? <MdLightMode size={20}/> : <MdDarkMode size={20}/>}
                            </button>
                            <button className="text-[rgb(var(--texto))]/40 hover:text-red-400 p-2"><IoLogOutOutline
                                size={20}/></button>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}