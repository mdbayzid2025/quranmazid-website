import CompleteSurah from "../components/pages/CompleteSurah";

export const dynamic = "force-dynamic"; // ✅

async function getSurahById(id: string) {
    const res = await fetch(
        `https://quranmazid-backend-nine.vercel.app/api/v1/surahs/${id}`,
        { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch search results");

    const data = await res.json();
    return data.data || data;
}

export default async function Home({ searchParams }: { searchParams: Promise<{ id: string }> }) {
    const { id } = await searchParams;
    const surahData = await getSurahById(id || "1");

    return (
        <div>
            <CompleteSurah surahData={surahData} />
        </div>
    );
}