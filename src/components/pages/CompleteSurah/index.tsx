import { SurahDetail, Verse } from "@/src/types";
import AudioPlayer from "./Audioplayer";
import AyahCard from "./AyahCard";
import AyahsInitializer from "./Ayahsinitializer";
import SurahHeader from "./SurahHeader";
import FontSettingsPanel from "@/src/components/Layout/FontSettingsPanel";

export default function CompleteSurah({ surahData }: { surahData: SurahDetail }) {

  const audioAyahs = surahData.verses.map((v: Verse) => ({
    number: v.id,
    numberInSurah: v.id,
    audioUrl: v.audio,
  }));

  return (
    <div className="flex flex-1 h-screen dark:bg-zinc-900 overflow-hidden">
      <div className="flex flex-col flex-1">
        <div className="flex-1 overflow-y-auto">

          <SurahHeader meta={{ totalVarses: surahData?.total_verses.toString(), englishName: surahData?.transliteration, type: surahData?.type }} />

          <AyahsInitializer ayahs={audioAyahs} surahName={surahData.transliteration} />

          {surahData.verses.map((verse: Verse) => (
            <AyahCard
              key={verse.id}
              verse={verse}
              surahId={surahData.id}
              surahName={surahData.transliteration}
              surahNumber={surahData.id}
            />
          ))}
        </div>

        <AudioPlayer />
      </div>

      <FontSettingsPanel />
    </div>
  );
}