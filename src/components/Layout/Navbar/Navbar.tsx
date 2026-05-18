"use client";

import { Search, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import SearchModal from "../../share/SearchModal";
import { useTheme } from "@/src/context/ThemeContext";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [searchOpen, setSearchOpen] = useState(false);

    // Close search on route change / back button
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setSearchOpen((prev) => !prev);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <>
            <header className="hidden lg:flex items-center justify-end gap-3 px-6 py-3 bg-white dark:bg-zinc-900 border-b border-[#e5e7eb] dark:border-zinc-800 transition-colors duration-200">
                {/* Search button — shows modal */}
                <button
                    onClick={() => setSearchOpen(true)}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-[#6b7280] dark:text-zinc-400 hover:text-[#2d6a4f] dark:hover:text-emerald-400 hover:bg-[#f0fdf4] dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    title="Search (Ctrl+K)"
                >
                    <Search size={18} />
                </button>

                {/* Theme toggle — changes icon dynamically */}
                <button
                    onClick={toggleTheme}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-[#6b7280] dark:text-zinc-400 hover:text-[#2d6a4f] dark:hover:text-emerald-400 hover:bg-[#f0fdf4] dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <button className="flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer">
                    Support Us 🕌
                </button>
            </header>

            {/* Search Modal */}
            {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
        </>
    );
}