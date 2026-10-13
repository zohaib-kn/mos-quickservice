import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MOS Quick Services - Appliances and Plumbing Installation | GTA",
  description:
    "Professional home installation and handyman repair services across the GTA. Simple, reliable and hassle-free.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#151A23]">
        <Navbar />
        <main className="flex flex-col flex-1">{children}</main>
      </body>
    </html>
  );
}

