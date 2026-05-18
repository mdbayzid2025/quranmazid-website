"use client";

import { useState, Suspense } from "react"; // ✅ Suspense import
import { X } from "lucide-react";
import Sidebar from "./Sidebar";
import { AudioProvider } from "@/src/context/AudioContext";
import type { SurahItem } from "@/src/types";
import { FontSettingsProvider } from "@/src/context/FontSettingContext";
import { ThemeProvider } from "@/src/context/ThemeContext";
import MobileNavbar from "./Navbar/MobileNavbar";
import Navbar from "./Navbar/Navbar";
import MobileFontSettingsBar from "./Mobilefontsettingsbar";
import IconSidebar from "./IconSidebar";

export default function DashboardLayout({ children, surahs }: { children: React.ReactNode; surahs: SurahItem[] }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mobileFontSettingsOpen, setMobileFontSettingsOpen] = useState(false);

    return (
        <ThemeProvider>
            <FontSettingsProvider>
                <AudioProvider>
                    <div className="flex h-screen overflow-hidden bg-white dark:bg-zinc-950 text-[#111827] dark:text-zinc-100 transition-colors duration-200">
                        <IconSidebar />
                        <div className="">
                            <Navbar />
                            <MobileNavbar onMenuOpen={() => setSidebarOpen(true)} openSetting={() => setMobileFontSettingsOpen(true)} />
                            <div className="flex overflow-hidden">

                                {/* ✅ Desktop Sidebar */}
                                <div className="hidden lg:block shrink-0">
                                    <Suspense fallback={null}>
                                        <Sidebar surahs={surahs} />
                                    </Suspense>
                                </div>

                                <div className="flex flex-1 overflow-hidden">
                                    {children}
                                </div>

                                {/* ✅ Mobile Sidebar */}
                                {sidebarOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
                                        <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
                                            <div className="relative h-full">
                                                <button
                                                    onClick={() => setSidebarOpen(false)}
                                                    className="absolute top-4 right-5 z-10 bg-white rounded-full p-1.5 shadow-lg text-[#6b7280] hover:text-[#111827] cursor-pointer"
                                                >
                                                    <X size={18} />
                                                </button>
                                                <Suspense fallback={null}>
                                                    <Sidebar surahs={surahs} onSelectSurah={() => setSidebarOpen(false)} />
                                                </Suspense>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {mobileFontSettingsOpen && (
                                    <MobileFontSettingsBar open={mobileFontSettingsOpen} setOpen={setMobileFontSettingsOpen} />
                                )}
                            </div>
                        </div>
                    </div>
                </AudioProvider>
            </FontSettingsProvider>
        </ThemeProvider>
    );
}