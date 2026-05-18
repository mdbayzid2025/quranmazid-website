"use client";

import { createContext, useContext, useRef, useState } from "react";

export interface AudioTrack {
    ayahNumber: number;
    numberInSurah: number;
    surahName: string;
    audioUrl: string;
}

interface AudioCtx {
    track: AudioTrack | null;
    play: (t: AudioTrack) => void;
    close: () => void;
    prev: () => void;
    next: () => void;
    isActive: (n: number) => boolean;
    setAyahs: (ayahs: { number: number; numberInSurah: number; audioUrl: string }[], surahName: string) => void;
}

const AudioContext = createContext<AudioCtx | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [track, setTrack] = useState<AudioTrack | null>(null);
    const ayahsRef = useRef<{ number: number; numberInSurah: number; audioUrl: string }[]>([]);
    const surahNameRef = useRef("");

    const setAyahs = (ayahs: typeof ayahsRef.current, surahName: string) => {
        ayahsRef.current = ayahs;
        surahNameRef.current = surahName;
    };

    const play = (t: AudioTrack) => {
        if (track?.ayahNumber === t.ayahNumber) { close(); return; }
        setTrack(t);
    };

    const close = () => setTrack(null);

    const jump = (dir: 1 | -1) => {
        if (!track) return;
        const idx = ayahsRef.current.findIndex(a => a.number === track.ayahNumber);
        const next = ayahsRef.current[idx + dir];
        if (next) setTrack({ ayahNumber: next.number, numberInSurah: next.numberInSurah, surahName: surahNameRef.current, audioUrl: next.audioUrl });
    };

    return (
        <AudioContext.Provider value={{ track, play, close, prev: () => jump(-1), next: () => jump(1), isActive: (n) => track?.ayahNumber === n, setAyahs }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const ctx = useContext(AudioContext);
    if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
    return ctx;
}