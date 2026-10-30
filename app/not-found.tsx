import Link from "next/link";
import { ArrowLeft, ArrowRight, Compass, Search } from "lucide-react";

export default function NotFound() {
  const quickLinks = [
    { name: "Heavyweight Tees (280 GSM)", href: "/products?category=T-Shirts" },
    { name: "Architectural Hoodies (380 GSM)", href: "/products?category=Hoodies+%26+Fleeces" },
    { name: "Tactical Cargo Bottoms", href: "/products?category=Pants+%26+Cargos" },
    { name: "Modular Street Accessories", href: "/products?category=Accessories" },
  ];

  return (
    <div className="min-h-[75vh] w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-neutral-800 bg-neutral-950 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-blue-500/50 blur-lg" />

        {/* 404 Stamp */}
        <div className="inline-flex items-center space-x-2 rounded-full border border-neutral-800 bg-neutral-900 px-3.5 py-1 text-xs font-mono text-neutral-400 mb-6">
          <Compass className="w-3.5 h-3.5 text-blue-500" />
          <span>404 ERROR // ROUTE UNMAPPED</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-mono font-black text-white uppercase tracking-tighter leading-none">
          SILHOUETTE NOT FOUND
        </h1>

        <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed max-w-md mx-auto">
          The piece or capsule collection you are looking for does not exist or has been archived from our current drop.
        </p>

        {/* Primary CTA */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase font-bold px-8 py-4 rounded-xl transition shadow-lg shadow-blue-900/30 group"
          >
            <span>Explore Active Drop 01</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Quick Route Shortcuts */}
        <div className="mt-10 pt-8 border-t border-neutral-900 text-left">
          <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-3 text-center sm:text-left">
            POPULAR CAPSULE SHORTCUTS
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center justify-between text-xs font-mono text-neutral-400 hover:text-white bg-neutral-900/40 hover:bg-neutral-900 border border-neutral-850 p-2.5 rounded-lg transition"
              >
                <span className="truncate">{link.name}</span>
                <ArrowRight className="w-3 h-3 text-neutral-600 shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
