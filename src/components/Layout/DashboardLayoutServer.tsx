import React from 'react'
import DashboardLayout from './DashboardLayout';

async function getSurahs() {
    const res = await fetch("https://quranmazid-backend-nine.vercel.app/api/v1/surahs/all-chapters");
    if (!res.ok) throw new Error("Failed to fetch Quran data");

    const data = await res.json();
    return data.data || data;
}



const DashboardLayoutServer = async ({ children }: { children: React.ReactNode }) => {
    const surahs = await getSurahs();
    return (
        <main className="flex h-full w-full text-white overflow-hidden">
            <DashboardLayout surahs={surahs}>
                {children}
            </DashboardLayout>
        </main>
    )
}

export default DashboardLayoutServer