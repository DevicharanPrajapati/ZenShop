"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickSizes, setShowQuickSizes] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Use first color by default for quick add
    addToCart(product, size, product.colors[0], 1);
    setJustAdded(true);
    setShowQuickSizes(false);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <article
      className="group relative flex flex-col bg-neutral-950 border border-neutral-850 hover:border-neutral-700 rounded-2xl overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizes(false);
      }}
    >
      {/* Image Container with Dual-Angle Switch */}
      <Link href={`/products/${product.id}`} className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 block">
        {/* Front Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-500 ${
            isHovered && product.images[1] ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Reverse Graphic Image on Hover */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            className={`object-cover transition-opacity duration-500 absolute inset-0 ${
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            } transition-transform duration-700`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNewDrop && (
            <span className="bg-blue-600 text-white text-[10px] font-mono tracking-wider uppercase font-bold px-2 py-0.5 rounded shadow">
              NEW DROP
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-neutral-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[10px] font-mono tracking-wider font-semibold px-2 py-0.5 rounded">
              {discountPercent}% OFF
            </span>
          )}
          {product.gsm && (
            <span className="bg-neutral-900/80 backdrop-blur-md text-neutral-300 text-[10px] font-mono px-2 py-0.5 rounded border border-neutral-800">
              {product.gsm} GSM
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition z-10 ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-neutral-950/70 text-neutral-300 hover:text-white hover:bg-neutral-900"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`} />
        </button>

        {/* Quick Add Size Overlay Bar */}
        <div
          className={`absolute inset-x-3 bottom-3 z-20 transition-all duration-300 ${
            showQuickSizes || isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {showQuickSizes ? (
            <div className="bg-neutral-950/95 backdrop-blur-md border border-neutral-700 p-2.5 rounded-xl shadow-2xl animate-fadeIn">
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1.5 px-1">
                <span>SELECT SIZE</span>
                <span className="text-blue-400">Boxy Fit</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((size) => {
                  const stock = product.stock[size] ?? 1;
                  const isOutOfStock = stock <= 0;
                  return (
                    <button
                      key={size}
                      disabled={isOutOfStock}
                      onClick={(e) => handleQuickAdd(size, e)}
                      className={`flex-1 min-w-[34px] py-1 text-xs font-mono font-bold rounded-lg transition ${
                        isOutOfStock
                          ? "bg-neutral-900 text-neutral-600 line-through cursor-not-allowed border border-neutral-850"
                          : "bg-neutral-900 hover:bg-blue-600 hover:text-white text-neutral-200 border border-neutral-700"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (product.sizes.length === 1) {
                  handleQuickAdd(product.sizes[0], e);
                } else {
                  setShowQuickSizes(true);
                }
              }}
              className="w-full flex items-center justify-center space-x-1.5 bg-neutral-950/90 hover:bg-blue-600 backdrop-blur-md text-white text-xs font-mono uppercase font-bold py-2.5 rounded-xl border border-neutral-700/80 transition-all shadow-lg"
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{product.sizes.length === 1 ? "Quick Add" : "Choose Size"}</span>
                </>
              )}
            </button>
          )}
        </div>
      </Link>

      {/* Info Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>{product.category}</span>
            <span className="text-neutral-500">{product.fit}</span>
          </div>

          <Link href={`/products/${product.id}`} className="block group/title mt-1">
            <h3 className="text-sm font-semibold text-neutral-100 group-hover/title:text-blue-400 transition line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Color swatches & Price */}
        <div className="flex items-center justify-between pt-1 border-t border-neutral-900">
          <div className="flex items-center space-x-1">
            {product.colors.map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="w-3 h-3 rounded-full border border-neutral-700"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>

          <div className="flex items-baseline space-x-1.5">
            <span className="text-sm font-mono font-bold text-white">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs font-mono text-neutral-500 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
