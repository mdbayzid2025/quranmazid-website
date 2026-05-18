"use client";

import {
    Bookmark,
    Compass,
    Grid2X2,
    Home,
    LayoutGrid
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function IconSidebar() {
    // Manage which icon is currently clicked/active
    const [activeTab, setActiveTab] = useState<string>("home");

    const navItems = [
        { id: "home", icon: Home, label: "Home" },
        { id: "grid", icon: Grid2X2, label: "Categories" },
        { id: "explore", icon: Compass, label: "Explore" },
        { id: "bookmark", icon: Bookmark, label: "Saved" },
        { id: "dashboard", icon: LayoutGrid, label: "Dashboard" },
    ];

    return (
        <aside className="w-20 h-screen flex flex-col items-center py-5 bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-zinc-800 shrink-0 hidden sm:flex justify-between transition-colors duration-200">

            {/* Top Section: App Brand Logo Wrapper */}
            <div className="flex flex-col items-center w-full">
                <Image height={50} width={50} src="/logo.png" alt="" className="hidden md:block" />
            </div>

            {/* Middle Section: Floating Navigation Icons Link Matrix */}
            <div className="flex flex-col gap-7 items-center w-full">
                {navItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            aria-label={item.label}
                            className="relative group p-2 rounded-xl transition-all duration-200 outline-none"
                        >
                            <IconComponent
                                className={`w-6 h-6 transition-colors duration-200 ${isActive
                                    ? "text-[#4E8D4F] dark:text-emerald-400 stroke-[2.5]"
                                    : "text-[#8E9AA0] dark:text-zinc-500 hover:text-[#4E8D4F] dark:hover:text-emerald-400 stroke-[1.8]"
                                    }`}
                            />

                            <span className="absolute left-16 bg-gray-800 text-white dark:bg-zinc-800 dark:text-zinc-200 text-xs px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-md">
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
            <div className="w-6 h-6" />

        </aside>
    );
}

