// utils/fonts.ts
import { Bricolage_Grotesque, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";

const calligraphy = localFont({
    src: "../../public/font/calligraphy.woff2",
    display: "swap",
    variable: "--font-calligraphy",
});

const kfgq = localFont({
    src: "../../public/font/kfgq.ttf",
    display: "swap",
    variable: "--font-kfgq",
});

const bricolage = Bricolage_Grotesque({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-bricolage",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-playfair",
});

export { calligraphy, kfgq, bricolage, playfair };