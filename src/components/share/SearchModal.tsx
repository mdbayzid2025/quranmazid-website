import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchModal({ onClose }: { onClose: () => void }) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        inputRef.current?.focus();

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) return;
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
        onClose();
    };

    return (
        // ── Backdrop ──────────────────────────────────────────────────────────
        <div
            className="fixed inset-0 z-50 flex items-center justify-center pt-28 px-4 bg-black/60 backdrop-blur-md transition-all duration-200"
            onClick={onClose}
        >
            {/* ── Modal Box ─────────────────────────────────────────────────── */}
            <div
                className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-zinc-800 overflow-hidden transition-all transform scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ── Form Container ─────────────────────────────────────────── */}
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-4 px-5 py-4.5 border-b border-gray-100 dark:border-zinc-800 focus-within:ring-2 focus-within:ring-[#2d6a4f]/20 dark:focus-within:ring-emerald-500/20 transition-all"
                >
                    <Search size={22} className="text-[#2d6a4f] dark:text-emerald-400 shrink-0" />

                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search ayahs in English or Arabic..."
                        className="flex-1 bg-transparent text-base md:text-lg text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 outline-none w-full py-1"
                    />

                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery("")}
                            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 px-2 py-1 rounded bg-gray-100 dark:bg-zinc-800"
                        >
                            Clear
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all"
                        aria-label="Close modal"
                    >
                        <X size={18} />
                    </button>
                </form>

                {/* ── Hint Footer ─────────────────────────────────────────────── */}
                <div className="px-5 py-3 bg-gray-50/50 dark:bg-zinc-950 text-[11px] text-gray-400 dark:text-zinc-500 flex items-center justify-between font-medium tracking-wide">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                            <kbd className="shadow-sm px-1.5 py-0.5 rounded-md bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 font-mono text-[10px]">⏎ Enter</kbd> to search
                        </span>
                    </div>
                    <span className="flex items-center gap-1.5">
                        <kbd className="shadow-sm px-1.5 py-0.5 rounded-md bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 font-mono text-[10px]">ESC</kbd> to close
                    </span>
                </div>
            </div>
        </div>
    );
}