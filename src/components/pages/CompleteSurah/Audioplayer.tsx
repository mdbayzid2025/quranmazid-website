"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, X, MoreHorizontal } from "lucide-react";
import { useAudio } from "@/src/context/AudioContext";

function fmt(s: number) {
    if (isNaN(s)) return "00:00";
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export default function AudioPlayer() {
    const { track, close, prev, next } = useAudio();
    const [playing, setPlaying] = useState(false);
    const [current, setCurrent] = useState(0);
    const [duration, setDuration] = useState(0);
    const audio = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!track) return;
        audio.current?.pause();
        const a = new Audio(track.audioUrl);
        audio.current = a;
        a.ontimeupdate = () => setCurrent(a.currentTime);
        a.onloadedmetadata = () => setDuration(a.duration);
        a.onended = () => { setPlaying(false); next(); };
        a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
        return () => a.pause();
    }, [track?.ayahNumber]);

    const toggle = () => {
        if (!audio.current) return;
        if (playing) { audio.current.pause(); setPlaying(false); }
        else { audio.current.play(); setPlaying(true); }
    };

    const handleClose = () => {
        audio.current?.pause();
        setPlaying(false);
        setCurrent(0);
        close();
    };

    const seek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audio.current || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        audio.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
    };

    if (!track) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-t border-[#e5e7eb] dark:border-zinc-800 shadow-[0_-4px_20px_rgba(0,0,0,0.07)] transition-colors duration-200">
            <div className="h-1 bg-[#e5e7eb] dark:bg-zinc-800 cursor-pointer group relative" onClick={seek}>
                <div className="h-full bg-[#2d6a4f] dark:bg-emerald-500 relative" style={{ width: `${duration > 0 ? (current / duration) * 100 : 0}%` }}>
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#2d6a4f] dark:bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity shadow" />
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-5 px-4 md:px-8 h-14">
                <span className="text-sm font-semibold text-[#111827] dark:text-zinc-200 truncate max-w-[110px] md:max-w-xs shrink-0">
                    {track.surahName} : {track.numberInSurah}
                </span>
                <div className="flex-1" />
                <span className="text-xs tabular-nums text-[#6b7280] dark:text-zinc-400 shrink-0">{fmt(current)}</span>
                <button className="text-[#9ca3af] dark:text-zinc-550 hover:text-[#374151] dark:hover:text-zinc-300 transition-colors cursor-pointer shrink-0">
                    <MoreHorizontal size={17} />
                </button>
                <button onClick={prev} className="text-[#6b7280] dark:text-zinc-400 hover:text-[#2d6a4f] dark:hover:text-emerald-400 transition-colors cursor-pointer shrink-0">
                    <SkipBack size={18} />
                </button>
                <button onClick={toggle} className="w-9 h-9 rounded-full bg-[#2d6a4f] dark:bg-emerald-600 hover:bg-[#1b4332] dark:hover:bg-emerald-700 text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm shrink-0">
                    {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </button>
                <button onClick={next} className="text-[#6b7280] dark:text-zinc-400 hover:text-[#2d6a4f] dark:hover:text-emerald-400 transition-colors cursor-pointer shrink-0">
                    <SkipForward size={18} />
                </button>
                <button onClick={handleClose} className="text-[#9ca3af] dark:text-zinc-550 hover:text-[#ef4444] dark:hover:text-red-400 transition-colors cursor-pointer shrink-0">
                    <X size={17} />
                </button>
                <span className="text-xs tabular-nums text-[#6b7280] dark:text-zinc-400 shrink-0">{fmt(duration)}</span>
            </div>
        </div>
    );
}