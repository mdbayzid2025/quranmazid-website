"use client";

import { Menu, Search, Settings, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/src/context/ThemeContext";

interface MobileNavbarProps {
    onMenuOpen: () => void;
    openSetting: () => void;
}

export default function MobileNavbar({ onMenuOpen, openSetting }: MobileNavbarProps) {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-900 border-b border-[#e5e7eb] dark:border-zinc-800 sticky top-0 z-30 transition-colors duration-200">
            <div className="flex items-center gap-3">
                <button onClick={onMenuOpen} className="text-[#2d6a4f] dark:text-emerald-400 cursor-pointer">
                    <Menu size={22} />
                </button>

                <Image height={30} width={30} src="/logo.png" alt="logo" />
                <span className="text-base font-bold text-[#111827] dark:text-zinc-100">Quran Mazid</span>
            </div>
            <div className="flex items-center gap-3 text-[#6b7280] dark:text-zinc-400">
                <button className="cursor-pointer hover:text-[#2d6a4f] dark:hover:text-emerald-400 transition-colors">
                    <Search size={19} />
                </button>
                <button onClick={toggleTheme} className="cursor-pointer hover:text-[#2d6a4f] dark:hover:text-emerald-400 transition-colors" title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                    {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
                </button>
                <button onClick={openSetting} className="cursor-pointer hover:text-[#2d6a4f] dark:hover:text-emerald-400 transition-colors">
                    <Settings size={19} />
                </button>
            </div>
        </header>
    );
}