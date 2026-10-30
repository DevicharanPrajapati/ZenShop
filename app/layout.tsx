import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarqueeBanner from "@/components/MarqueeBanner";
import CartDrawer from "@/components/CartDrawer";
import { StoreProvider } from "@/lib/store";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ZEN / STUDIO | Indian Contemporary Streetwear",
    template: "%s | ZEN / STUDIO",
  },
  description:
    "Architectural Indian streetwear. Heavyweight boxy tees, oversized terry hoodies, tactical cargos, and utilitarian accessories. Milled and crafted in India.",
  keywords: [
    "Indian streetwear",
    "Bluorng style",
    "heavyweight tees",
    "oversized hoodie",
    "tactical cargos",
    "D2C fashion India",
    "Zen Studio",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0d0d0f] text-[#f4f4f5] selection:bg-blue-600 selection:text-white">
        <StoreProvider>
          <MarqueeBanner />
          <Navbar />
          <CartDrawer />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
