// types/quran.ts
export interface SurahItem {
    id: number;
    name: string; // Arabic name
    transliteration: string; // English transliteration
    translation: string; // English meaning
    type: string;
    total_verses: number;
}

// types/quran.ts

export interface Verse {
    id: number;
    text: string;
    translation: string;
    transliteration: string;
    audio: string; 
}

export interface SurahDetail {
    id: number;
    name: string;            // The Arabic name script (e.g., "الفاتحة")
    transliteration: string; // The English phonetic name (e.g., "Al-Fatihah")
    translation: string;     // The English meaning (e.g., "The Opener")
    type: "meccan" | "medinan"; // Union type since Surahs are either Meccan or Medinan
    total_verses: number;
    verses: Verse[];         // Array containing the verse objects
}