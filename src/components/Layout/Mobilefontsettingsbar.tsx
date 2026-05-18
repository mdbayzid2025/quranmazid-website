"use client";

import { Type, X, ChevronRight } from "lucide-react";
import { useFontSettings } from "@/src/context/FontSettingContext";
import { useState } from "react";

export default function MobileFontSettingsBar({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    const { arabicFont, arabicSize, translationSize, fonts, setArabicFont, setArabicSize, setTranslationSize } = useFontSettings();
    const [fontPickerOpen, setFontPickerOpen] = useState(false);

    // if (!open) return;
    return (
        <>
            <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setOpen(false)} />
            <div className={`fixed w-4/5! transition-all w-full inset-y-0 right-0 z-50 bg-white dark:bg-zinc-900 shadow-2xl lg:hidden transition-colors duration-200 ${open ? "translate-y-0" : "translate-y-full"}`}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e7eb] dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                        <Type size={17} className="text-[#2d6a4f] dark:text-emerald-400" />
                        <span className="text-sm font-semibold text-[#2d6a4f] dark:text-emerald-400">Font Settings</span>
                    </div>
                    <button onClick={() => setOpen(false)} className="text-[#6b7280] dark:text-zinc-400 hover:text-[#111827] dark:hover:text-zinc-200 transition-colors cursor-pointer">
                        <X size={18} />
                    </button>
                </div>

                <div className="px-5 py-5 space-y-6">
                    <Slider label="Arabic Font Size" value={arabicSize} min={20} max={60} onChange={setArabicSize} />
                    <Slider label="Translation Font Size" value={translationSize} min={12} max={28} onChange={setTranslationSize} />

                    <div>
                        <p className="text-sm font-medium text-[#111827] dark:text-zinc-200 mb-2">Arabic Font Face</p>
                        <div className="relative">
                            <button
                                onClick={() => setFontPickerOpen(p => !p)}
                                className="w-full flex items-center justify-between px-4 py-3 border border-[#e5e7eb] dark:border-zinc-700 rounded-lg text-sm text-[#111827] dark:text-zinc-200 hover:border-[#2d6a4f] dark:hover:border-emerald-400 transition-colors cursor-pointer bg-white dark:bg-zinc-800"
                            >
                                <span>{fonts.find((f: any) => f.value === arabicFont)?.label}</span>
                                <ChevronRight size={16} className="text-[#6b7280] dark:text-zinc-400" />
                            </button>
                            {fontPickerOpen && (
                                <div className="absolute bottom-full left-0 right-0 mb-1 bg-white dark:bg-zinc-800 border border-[#e5e7eb] dark:border-zinc-700 rounded-lg shadow-lg z-10 overflow-hidden">
                                    {fonts.map((f: any) => (
                                        <button
                                            key={f.value}
                                            onClick={() => { setArabicFont(f.value); setFontPickerOpen(false); }}
                                            className={`w-full text-left px-4 py-3 text-sm hover:bg-[#f0fdf4] dark:hover:bg-zinc-700/50 transition-colors cursor-pointer ${arabicFont === f.value ? "text-[#2d6a4f] dark:text-emerald-400 font-semibold bg-[#f0fdf4] dark:bg-emerald-950/20" : "text-[#374151] dark:text-zinc-350"}`}
                                        >
                                            {f.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="h-6" />
            </div>
        </>
    );
}

function Slider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-[#111827] dark:text-zinc-200">{label}</p>
                <span className="text-sm font-semibold text-[#2d6a4f] dark:text-emerald-400">{value}</span>
            </div>
            <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} className="w-full accent-[#2d6a4f] dark:accent-emerald-500 cursor-pointer bg-gray-200 dark:bg-zinc-700" />
        </div>
    );
}