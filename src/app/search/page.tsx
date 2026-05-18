import SearchPage from '@/src/components/pages/SearchPage';

export const dynamic = "force-dynamic"; // ✅

async function getSearchResponse(query: string) {
    if (!query) return [];

    const res = await fetch(
        `https://quranmazid-backend-nine.vercel.app/api/v1/surahs/search?q=${encodeURIComponent(query)}`,
        { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch search results");

    const data = await res.json();
    return data.data || data;
}

const page = async ({ searchParams }: { searchParams: Promise<{ q: string }> }) => {
    const { q } = await searchParams;
    const ayahsData = await getSearchResponse(q);

    return (
        <div>
            <SearchPage ayahsData={ayahsData} query={q} />
        </div>
    );
};

export default page;