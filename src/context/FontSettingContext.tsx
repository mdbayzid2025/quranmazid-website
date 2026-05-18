"use client";

import { createContext, useContext, useState } from "react";

const FONTS = [
    { label: "KFGQ", value: "var(--font-kfgq), serif" },
    { label: "Calligraphy", value: "var(--font-calligraphy), serif" },
];

interface FontSettings {
    arabicFont: string;
    arabicSize: number;
    translationSize: number;
    fonts: typeof FONTS;
    setArabicFont: (v: string) => void;
    setArabicSize: (v: number) => void;
    setTranslationSize: (v: number) => void;
}

const FontSettingsContext = createContext<FontSettings | null>(null);

export function FontSettingsProvider({ children }: { children: React.ReactNode }) {
    const [arabicFont, setArabicFont] = useState(FONTS[0].value);
    const [arabicSize, setArabicSize] = useState(38);
    const [translationSize, setTranslationSize] = useState(20);

    return (
        <FontSettingsContext.Provider value={{ arabicFont, arabicSize, translationSize, fonts: FONTS, setArabicFont, setArabicSize, setTranslationSize }}>
            {children}
        </FontSettingsContext.Provider>
    );
}

export function useFontSettings() {
    const ctx = useContext(FontSettingsContext);
    if (!ctx) throw new Error("useFontSettings must be used inside FontSettingsProvider");
    return ctx;
}