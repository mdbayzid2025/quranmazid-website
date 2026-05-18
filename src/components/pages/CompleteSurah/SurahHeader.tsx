import Image from "next/image";


export default function SurahHeader({ meta }: { meta: { totalVarses: string, englishName: string, type: string } }) {
    return (
        <div className="grid md:grid-cols-3 grid-cols-1 px-6 py-10 items-center">
            <Image height={150} width={150} src="/makkah.avif" alt="" className="hidden md:block" />
            <div className="flex flex-col items-center ">
                <h1 className="text-2xl font-bold text-[#111827] dark:text-zinc-100 mb-1">Surah {meta.englishName}</h1>
                <p className="text-sm text-[#6b7280] dark:text-zinc-400">
                    Ayah-{meta.totalVarses}, <span className="capitalize"> {meta.type}</span>
                </p>
            </div>
        </div>
    );
}