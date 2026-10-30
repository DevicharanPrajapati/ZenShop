"use client";

import Link from "next/link";
import { Heart, ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";

export default function WishlistPage() {
  const { wishlist } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center space-x-1.5 text-xs font-mono text-neutral-400 hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="flex items-baseline space-x-3 mb-8 border-b border-neutral-900 pb-4">
        <h1 className="text-2xl sm:text-3xl font-mono font-bold uppercase text-white tracking-tight">
          SAVED PIECES ({wishlistedProducts.length})
        </h1>
        <span className="text-xs font-mono text-neutral-500">
          Curated Wishlist
        </span>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-12 text-center max-w-md mx-auto my-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-mono font-bold text-white uppercase">
            No Saved Garments
          </h2>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            Click the heart icon on any drop piece to save it to your personal vault for later.
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-blue-900/30"
            >
              <span>Explore Garments</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
