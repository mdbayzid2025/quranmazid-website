"use client";

import { useState } from "react";
import { Play, Pause, Bookmark, BookmarkCheck, MoreHorizontal } from "lucide-react";
import { useAudio } from "@/src/context/AudioContext";
import { useFontSettings } from "@/src/context/FontSettingContext";

interface FlatAyah {
    globalId: number;
    numberInSurah: number;
    text: string;
    translation: string;
    transliteration: string;
    audio: string;
    surahEngName: string;
    SurahNameArabic: string;
}

interface Props {
    ayah: FlatAyah;
}

export default function SearchAyahCard({ ayah }: Props) {
    const { arabicFont, arabicSize, translationSize } = useFontSettings();
    const { play, isActive } = useAudio();
    const [bookmarked, setBookmarked] = useState(false);

    const active = isActive(ayah.globalId);

    const handlePlay = () => {
        play({
            ayahNumber: ayah.globalId,
            numberInSurah: ayah.numberInSurah,
            surahName: ayah.surahEngName,
            audioUrl: ayah.audio,  // ✅ direct from API response
        });
    };

    return (
        <div className="flex gap-3 py-8 border-b border-[#e8e8e8] dark:border-zinc-800 hover:bg-gray-50/50 dark:hover:bg-zinc-800/30 transition-colors duration-200 px-4 md:px-6">

            <div className="flex flex-col items-center gap-3 pt-1 shrink-0">
                {/* Surah name + ayah id badge */}
                <div className="text-center">
                    <p className="text-[#2d6a4f] dark:text-emerald-400 font-semibold text-xs leading-tight">
                        {ayah.surahEngName}
                    </p>
                    <p className="text-[#2d6a4f] dark:text-emerald-400 font-semibold text-sm">
                        #{ayah.globalId}
                    </p>
                </div>

                <button
                    onClick={handlePlay}
                    className={`transition-colors cursor-pointer ${active
                            ? "text-[#2d6a4f] dark:text-emerald-400"
                            : "text-[#9ca3af] hover:text-[#2d6a4f] dark:hover:text-emerald-400"
                        }`}
                >
                    {active ? <Pause size={17} /> : <Play size={17} />}
                </button>

                <button
                    onClick={() => setBookmarked((p) => !p)}
                    className={`transition-colors cursor-pointer ${bookmarked
                            ? "text-[#2d6a4f] dark:text-emerald-400"
                            : "text-[#9ca3af] hover:text-[#2d6a4f] dark:hover:text-emerald-400"
                        }`}
                >
                    {bookmarked ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
                </button>

                <button className="text-[#9ca3af] hover:text-[#2d6a4f] dark:hover:text-emerald-400 transition-colors cursor-pointer">
                    <MoreHorizontal size={17} />
                </button>
            </div>

            <div className="flex-1 min-w-0">
                {/* Arabic */}
                <p
                    dir="rtl"
                    lang="ar"
                    className="text-right text-[#1a1a1a] dark:text-zinc-100 mb-5"
                    style={{
                        fontFamily: arabicFont,
                        fontSize: `${arabicSize}px`,
                        lineHeight: `${arabicSize * 1.9}px`,
                    }}
                >
                    {ayah.text}
                </p>

                <p className="text-md font-semibold tracking-[0.12em] text-[#6b7280] dark:text-zinc-400 uppercase mb-2">
                    Saheeh International
                </p>

                <p
                    className="text-[#374151] dark:text-zinc-300 leading-relaxed"
                    style={{ fontSize: `${translationSize}px` }}
                >
                    {ayah.translation}
                </p>
            </div>
        </div>
    );
}