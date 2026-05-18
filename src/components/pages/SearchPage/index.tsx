import FontSettingsPanel from "@/src/components/Layout/FontSettingsPanel";
import AudioPlayer from "../CompleteSurah/Audioplayer";
import AyahsInitializer from "../CompleteSurah/Ayahsinitializer";
import SearchAyahCard from "./SearchAyahCard";

interface SearchVerse {
    globalId: number;
    numberInSurah: number;
    text: string;
    translation: string;
    transliteration: string;
    audio: string;
}

interface SearchSurah {
    surahNumber: number;
    surahEngName: string;
    surahNameArabic: string;
    totalVerses: number;
    verses: SearchVerse[];
}

interface SearchPageProps {
    ayahsData: SearchSurah[];
    query: string;
}

interface FlatAyah extends SearchVerse {
    surahNumber: number;
    surahEngName: string;
    surahNameArabic: string;
}

function flattenResults(ayahsData: SearchSurah[]): FlatAyah[] {
    return ayahsData.flatMap((surah) =>
        surah.verses.map((verse) => ({
            ...verse,
            surahNumber: surah.surahNumber,
            surahEngName: surah.surahEngName,
            surahNameArabic: surah.surahNameArabic,
        }))
    );
}

export default function SearchPage({ ayahsData, query }: SearchPageProps) {
    const flatAyahs = flattenResults(ayahsData);
    const totalFound = flatAyahs.length;
    const surahLabel = ayahsData.length === 1 ? ayahsData[0].surahEngName : "Search Results";

    const audioAyahs = flatAyahs.map((a) => ({
        number: a.globalId,
        numberInSurah: a.numberInSurah,
        audioUrl: a.audio,
    }));

    return (
        <div className="flex flex-1 h-screen overflow-hidden bg-white dark:bg-zinc-950 text-gray-800 dark:text-zinc-200 transition-colors duration-200">
            <div className="flex flex-col flex-1 overflow-hidden">
                <div className="flex-1 overflow-y-auto!">
                    <div className="py-4">
                        <h1 className="text-2xl font-bold text-center text-black dark:text-zinc-100">
                            Search Results — Translation{" "}
                            <span className="text-primary dark:text-emerald-400">({query})</span>
                        </h1>
                        <p className="text-center text-sm text-gray-500 dark:text-zinc-400 mt-1">
                            {totalFound} verse{totalFound !== 1 ? "s" : ""} found
                        </p>
                    </div>

                    <AyahsInitializer ayahs={audioAyahs} surahName={surahLabel} />

                    {flatAyahs.length > 0 ? (
                        flatAyahs.map((ayah) => (
                            <SearchAyahCard
                                key={`${ayah.surahNumber}-${ayah.globalId}`}
                                ayah={ayah}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-400 dark:text-zinc-500 mt-16">
                            No results found for &quot;{query}&quot;
                        </p>
                    )}
                </div>

                <AudioPlayer />
            </div>

            <FontSettingsPanel />
        </div>
    );
}