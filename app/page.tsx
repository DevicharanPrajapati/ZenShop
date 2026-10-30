import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, Shield, Sparkles, Layers, Box, ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, CATEGORIES } from "@/lib/products";

export default function Home() {
  const featuredProducts = products.filter((p) => p.isNewDrop || p.isBestSeller).slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-neutral-900 bg-neutral-950">
        {/* Background Visual Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop"
            alt="Zen Studio Streetwear Editorial"
            fill
            priority
            className="object-cover object-center opacity-30 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] opacity-80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 rounded-full border border-neutral-800 bg-neutral-900/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-neutral-300 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping" />
            <span className="text-white font-bold tracking-wider">DROP 01: MONOLITH</span>
            <span className="text-neutral-500">|</span>
            <span className="text-blue-400 font-medium">LIMITED CAPSULE</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-mono tracking-tighter text-white uppercase max-w-5xl leading-none">
            ARCHITECTURAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-950 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-300 dark:to-neutral-500">STREETWEAR</span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-neutral-400 font-sans font-normal leading-relaxed">
            Crafted for the modern Indian youth. Heavyweight 280–380 GSM combed textiles, boxy drop-shoulder draping, and utilitarian finishing.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/products"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase font-bold px-8 py-4 rounded-xl transition shadow-lg shadow-blue-900/30 group"
            >
              <span>Explore Drop 01</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/products?category=T-Shirts"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 hover:text-white font-mono text-xs uppercase font-bold px-8 py-4 rounded-xl transition"
            >
              <span>Heavyweight Tees</span>
            </Link>
          </div>

          {/* Micro Spec Pills */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left w-full max-w-3xl border-t border-neutral-900 pt-8">
            <div className="space-y-1">
              <p className="text-[10px] font-mono uppercase text-neutral-500">Weight</p>
              <p className="text-xs font-mono font-bold text-white">280–380 GSM</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-mono uppercase text-neutral-500">Origin</p>
              <p className="text-xs font-mono font-bold text-white">Tiruppur, India</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-mono uppercase text-neutral-500">Fit</p>
              <p className="text-xs font-mono font-bold text-white">Boxy &amp; Oversized</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-mono uppercase text-neutral-500">Delivery</p>
              <p className="text-xs font-mono font-bold text-blue-400">Free Over ₹1,999</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Drop 01 Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-neutral-900">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-blue-500 uppercase tracking-widest mb-1.5">
              <Flame className="w-4 h-4" />
              <span>Current Release</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-mono font-bold uppercase tracking-tight text-white">
              Drop 01: Monolith
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Dual-angle garments engineered with mineral washes and raw boxy silhouettes.
            </p>
          </div>

          <Link
            href="/products"
            className="mt-4 md:mt-0 flex items-center space-x-1.5 text-xs font-mono uppercase text-neutral-400 hover:text-white transition group"
          >
            <span>View All Garments ({products.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Explorer ("The Vault") */}
      <section className="bg-neutral-950 border-y border-neutral-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-500">
              Categorized Silhouettes
            </span>
            <h2 className="text-2xl sm:text-3xl font-mono font-bold uppercase tracking-tight text-white mt-1">
              Curated Wardrobe Categories
            </h2>
            <p className="text-xs text-neutral-400 mt-2 font-sans">
              Strictly apparel and tactile accessories. No clutter, only essential wardrobe staples.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Boxy Tees */}
            <Link
              href="/products?category=T-Shirts"
              className="group relative h-80 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900"
            >
              <Image
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop"
                alt="Boxy Heavyweight Tees"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div data-keep-white="true" className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400">
                    280 GSM Cotton
                  </span>
                  <h3 className="text-xl font-mono font-bold text-white uppercase mt-0.5">
                    Heavyweight Tees
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white group-hover:bg-blue-600 transition">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Hoodies & Fleeces */}
            <Link
              href="/products?category=Hoodies+%26+Fleeces"
              className="group relative h-80 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900"
            >
              <Image
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop"
                alt="Architectural Hoodies"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div data-keep-white="true" className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400">
                    380 GSM Loopback
                  </span>
                  <h3 className="text-xl font-mono font-bold text-white uppercase mt-0.5">
                    Structured Hoodies
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white group-hover:bg-blue-600 transition">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Cargo Pants & Accessories */}
            <Link
              href="/products?category=Pants+%26+Cargos"
              className="group relative h-80 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900"
            >
              <Image
                src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop"
                alt="Tactical Bottoms"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div data-keep-white="true" className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400">
                    Utility Ripstop
                  </span>
                  <h3 className="text-xl font-mono font-bold text-white uppercase mt-0.5">
                    Tactical Cargos
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white group-hover:bg-blue-600 transition">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Streetwear Manifesto / Philosophy */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-500">
              The Indian Streetwear Manifesto
            </span>
            <h2 className="text-3xl sm:text-4xl font-mono font-bold uppercase tracking-tight text-white leading-tight">
              WHY WE REJECT FAST-FASHION POLYESTERS.
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed font-sans">
              Mainstream commercial fast-fashion is flooded with flimsy 160 GSM synthetic blends that shrink after a single wash. We take inspiration from brutalist architecture and Indian textile heritage.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed font-sans">
              Every drop is cut from custom-milled heavyweight combed Indian cotton in Tiruppur, washed with mineral stone dyes, and sewn with double-needle hems to preserve its boxy silhouette for years.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-900">
              <div className="flex items-start space-x-3">
                <Box className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase">
                    Heavy Density
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Substantial 280–380 GSM weights that hold their structured drape.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Layers className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase">
                    Pre-Shrunk Milled
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Zero post-wash distortion or neckline puckering.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
            <Image
              src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop"
              alt="Zen Studio Fabric Craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-block bg-neutral-950/80 backdrop-blur-md border border-neutral-800 px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-300">
                <span>📍 Milled &amp; Crafted in Tiruppur, Tamil Nadu</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drop Alert Banner CTA */}
      <section className="bg-gradient-to-r from-blue-950/40 via-neutral-900 to-neutral-950 border-t border-neutral-800 py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
            ⚡ Drop 02 In Development
          </span>
          <h2 className="text-2xl sm:text-3xl font-mono font-bold uppercase text-white">
            WANT EARLY ACCESS BEFORE PUBLIC RELEASE?
          </h2>
          <p className="text-xs text-neutral-400 font-sans max-w-md mx-auto">
            Our capsule drops are limited to 150 pieces per silhouette and do not restock.
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold uppercase px-6 py-3.5 rounded-xl transition"
            >
              <span>Explore Current Available Pieces</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
