"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, Type, ChevronRight } from "lucide-react";
import { useFontSettings } from "@/src/context/FontSettingContext";

export default function FontSettingsPanel() {
  const { arabicFont, arabicSize, translationSize, fonts, setArabicFont, setArabicSize, setTranslationSize } = useFontSettings();
  const [readingOpen, setReadingOpen] = useState(false);
  const [fontOpen, setFontOpen] = useState(true);
  const [fontPickerOpen, setFontPickerOpen] = useState(false);

  return (
    <aside className="hidden lg:flex flex-col w-70 shrink-0 border-l border-[#e5e7eb] dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-y-auto h-full transition-colors duration-200">

      <button
        onClick={() => setReadingOpen(p => !p)}
        className="flex items-center justify-between px-5 py-4 hover:bg-[#f9fafb] dark:hover:bg-zinc-800/50 transition-colors cursor-pointer border-b border-[#e5e7eb] dark:border-zinc-800"
      >
        <div className="flex items-center gap-3">
          <BookOpen size={18} className="text-[#6b7280] dark:text-zinc-400" />
          <span className="text-sm font-medium text-[#111827] dark:text-zinc-200">Reading Settings</span>
        </div>
        {readingOpen ? <ChevronUp size={16} className="text-[#6b7280] dark:text-zinc-400" /> : <ChevronDown size={16} className="text-[#6b7280] dark:text-zinc-400" />}
      </button>

      {readingOpen && (
        <div className="px-5 py-4 border-b border-[#e5e7eb] dark:border-zinc-800 text-sm text-[#6b7280] dark:text-zinc-400">
          Reading settings coming soon.
        </div>
      )}

      <button
        onClick={() => setFontOpen(p => !p)}
        className="flex items-center justify-between px-5 py-4 hover:bg-[#f9fafb] dark:hover:bg-zinc-800/50 transition-colors cursor-pointer border-b border-[#e5e7eb] dark:border-zinc-800"
      >
        <div className="flex items-center gap-3">
          <Type size={18} className="text-[#2d6a4f] dark:text-emerald-400" />
          <span className="text-sm font-semibold text-[#2d6a4f] dark:text-emerald-400">Font Settings</span>
        </div>
        {fontOpen ? <ChevronUp size={16} className="text-[#2d6a4f] dark:text-emerald-400" /> : <ChevronDown size={16} className="text-[#6b7280] dark:text-zinc-400" />}
      </button>

      {fontOpen && (
        <div className="px-5 py-5 space-y-6 border-b border-[#e5e7eb] dark:border-zinc-800">
          <Slider label="Arabic Font Size" value={arabicSize} min={20} max={60} onChange={setArabicSize} />
          <Slider label="Translation Font Size" value={translationSize} min={12} max={28} onChange={setTranslationSize} />

          <div>
            <p className="text-sm font-medium text-[#111827] dark:text-zinc-200 mb-2">Arabic Font Face</p>
            <div className="relative">
              <button
                onClick={() => setFontPickerOpen(p => !p)}
                className="w-full flex items-center justify-between px-4 py-3 border border-[#e5e7eb] dark:border-zinc-700 rounded-lg text-sm text-[#111827] dark:text-zinc-200 hover:border-[#2d6a4f] dark:hover:border-emerald-400 transition-colors cursor-pointer bg-white dark:bg-zinc-800"
              >
                <span>{fonts.find(f => f.value === arabicFont)?.label}</span>
                <ChevronRight size={16} className="text-[#6b7280] dark:text-zinc-400" />
              </button>
              {fontPickerOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-800 border border-[#e5e7eb] dark:border-zinc-700 rounded-lg shadow-lg z-10 overflow-hidden">
                  {fonts.map(f => (
                    <button
                      key={f.value}
                      onClick={() => { setArabicFont(f.value); setFontPickerOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-[#f0fdf4] dark:hover:bg-zinc-700/50 transition-colors cursor-pointer ${arabicFont === f.value ? "text-[#2d6a4f] dark:text-emerald-400 font-semibold bg-[#f0fdf4] dark:bg-emerald-950/20" : "text-[#374151] dark:text-zinc-300"}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mx-4 my-5 p-4 bg-[#f0fdf4] dark:bg-zinc-850 rounded-xl border border-[#bbf7d0] dark:border-zinc-800">
        <p className="text-sm font-semibold text-[#111827] dark:text-zinc-900 mb-1">Help spread the knowledge of Islam</p>
        <p className="text-xs text-[#6b7280] dark:text-zinc-400 leading-relaxed mb-4">
          Your regular support helps us reach our religious brothers and sisters with the message of Islam. Join our mission and be part of the big change.
        </p>
        <button className="w-full bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors cursor-pointer">
          Support Us 🕌
        </button>
      </div>
    </aside>
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
