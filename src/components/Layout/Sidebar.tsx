
"use client";

import { useState } from "react";

import { calligraphy } from "@/src/constant";
import { SurahItem } from "@/src/types";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface QuranSidebarProps {
    surahs: SurahItem[];
    currentSelectedId?: number;
    onSelectSurah?: (surah: SurahItem) => void | Promise<void>;
}


export default function Sidebar({
    surahs,
    currentSelectedId = 1,
    onSelectSurah,
}: QuranSidebarProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const searchParams = useSearchParams();
    const query = searchParams.get('id');

    return (
        <div className="flex h-screen text-gray-800 dark:text-zinc-200 font-sans border-r border-gray-200 dark:border-zinc-800 transition-colors duration-200">
            <aside className="w-full sm:w-70 flex flex-col h-full bg-white dark:bg-zinc-900 shadow-sm transition-colors duration-200">

                <div className="px-3 py-3">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search Surah..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700/80 rounded-xl text-sm text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder-gray-400 dark:placeholder-zinc-500"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 gap-3" >
                    {surahs.filter(surah =>
                        surah.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        surah.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        surah.id.toString() === searchQuery
                    ).map((surah) => {
                        const isSelected = query === surah.id.toString();
                        return (
                            <Link href={`/?id=${surah.id}`} className="mb-2 block" key={surah.id}>
                                <button
                                    onClick={() => onSelectSurah && onSelectSurah(surah)} // Reusable trigger
                                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left group ${isSelected
                                        ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500/30 dark:border-emerald-500/20 shadow-sm"
                                        : "border-gray-100 dark:border-zinc-800 hover:border-gray-200 dark:hover:border-zinc-700 hover:bg-gray-50/50 dark:hover:bg-zinc-800/30"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
                                            <div className={`absolute inset-0 rotate-45 rounded-lg border transition-all ${isSelected
                                                ? "bg-primary border-primary"
                                                : "bg-gray-50 dark:bg-zinc-800 border-gray-200/80 dark:border-zinc-700 group-hover:bg-white dark:group-hover:bg-zinc-700/50"
                                                }`} />
                                            <span className={`relative text-xs font-bold ${isSelected ? "text-white" : "text-gray-600 dark:text-zinc-400"}`}>
                                                {surah.id}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-zinc-100 text-lg leading-tight">{surah.transliteration}</h4>
                                            <p className="text-md text-gray-500 dark:text-zinc-400 mt-0.5 leading-none">{surah.translation}</p>
                                        </div>
                                    </div>
                                    <div className="text-right pl-2">
                                        <span className={`font-semibold ${isSelected ? "text-primary dark:text-emerald-400" : "text-gray-800 dark:text-zinc-200"} text-lg tracking-wide block ${calligraphy.className}`}>{surah.name}</span>
                                    </div>
                                </button>
                            </Link>
                        );
                    })}
                </div>
            </aside>
        </div>
    );
}