import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  title: "NorthPeak Digital — Growth Marketing",
  description: "NorthPeak Digital — Growth Marketing for High-Stakes Brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <div className="grid-lines" aria-hidden="true">
          <div className="grid-line"></div>
          <div className="grid-line hide-mobile"></div>
          <div className="grid-line hide-mobile"></div>
          <div className="grid-line"></div>
          <div className="grid-line"></div>
        </div>
        <div className="bg-ambience" aria-hidden="true"></div>
        
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
