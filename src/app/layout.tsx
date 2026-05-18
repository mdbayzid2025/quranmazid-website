import type { Metadata } from "next";
import "./globals.css";
import DashboardLayoutServer from "../components/Layout/DashboardLayoutServer";
import { calligraphy, kfgq, bricolage, playfair } from "@/src/constant";

export const metadata: Metadata = {
  title: "Quran Mazid App",
  description: " Quran Companion",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html
      lang="en"
      className={`${calligraphy.variable} ${kfgq.variable} ${bricolage.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><DashboardLayoutServer>{children}</DashboardLayoutServer></body>
    </html>
  );
}
