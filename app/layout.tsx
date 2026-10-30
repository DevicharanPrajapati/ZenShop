import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarqueeBanner from "@/components/MarqueeBanner";
import CartDrawer from "@/components/CartDrawer";
import { StoreProvider } from "@/lib/store";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0f" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
  ],
};

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
      suppressHydrationWarning
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('zen_theme');
                  if (saved === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-600 selection:text-white">
        <ThemeProvider>
          <AuthProvider>
            <StoreProvider>
              <MarqueeBanner />
              <Navbar />
              <CartDrawer />
              <main className="flex-1 flex flex-col">{children}</main>
              <Footer />
            </StoreProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
