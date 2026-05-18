"use client";

import { useEffect } from "react";
import { useAudio } from "@/src/context/AudioContext";

interface AudioAyah {
    number: number;
    numberInSurah: number;
    audioUrl: string;
}

interface Props {
    ayahs: AudioAyah[];
    surahName: string;
}

export default function AyahsInitializer({ ayahs, surahName }: Props) {
    const { setAyahs } = useAudio();

    useEffect(() => {
        setAyahs(ayahs, surahName);
    }, [surahName]);

    return null;
}