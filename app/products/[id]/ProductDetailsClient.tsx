"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Star,
  Check,
  ChevronDown,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import type { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import SizeGuideModal from "@/components/SizeGuideModal";
import { useStore } from "@/lib/store";

type Props = {
  product: Product;
  relatedProducts: Product[];
};

export default function ProductDetailsClient({ product, relatedProducts }: Props) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "L");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("fabric");
  const [justAdded, setJustAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const currentStock = product.stock[selectedSize] ?? 5;
  const isOutOfStock = currentStock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Breadcrumb / Back button */}
      <div className="mb-6 flex items-center justify-between text-xs font-mono text-neutral-400">
        <Link
          href="/products"
          className="inline-flex items-center space-x-1.5 hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Drops</span>
        </Link>
        <span className="hidden sm:inline-block text-neutral-600">
          {product.category} / {product.name}
        </span>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Left: Gallery (Thumbnails + Main Image) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Vertical Thumbnail Strip */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto shrink-0 pb-2 sm:pb-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-20 sm:w-20 sm:h-26 rounded-xl overflow-hidden border-2 transition ${
                  activeImageIndex === idx
                    ? "border-blue-500 ring-2 ring-blue-500/30"
                    : "border-neutral-800 hover:border-neutral-700 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} angle ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>

          {/* Active Big Image */}
          <div className="relative aspect-[3/4] flex-1 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover transition-all duration-300"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.dropName && (
                <span className="bg-neutral-950/80 backdrop-blur-md text-white font-mono text-[10px] tracking-wider uppercase font-bold px-2.5 py-1 rounded-md border border-neutral-800">
                  {product.dropName}
                </span>
              )}
              {product.gsm && (
                <span className="bg-blue-600/90 backdrop-blur-md text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-md shadow">
                  {product.gsm} GSM
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition ${
                isWishlisted
                  ? "bg-red-500 text-white"
                  : "bg-neutral-950/70 text-neutral-300 hover:text-white hover:bg-neutral-900"
              }`}
              aria-label="Wishlist toggle"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-white" : ""}`} />
            </button>
          </div>
        </div>

        {/* Right: Garment Purchasing Details */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
              <span className="text-blue-400 font-bold uppercase">{product.category}</span>
              <span>•</span>
              <span>{product.fit}</span>
            </div>

            <h1 className="mt-2 text-2xl sm:text-3xl font-mono font-bold uppercase text-neutral-950 dark:text-white tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Price & Rating */}
            <div className="mt-4 flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl font-mono font-black text-neutral-950 dark:text-white">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base font-mono text-neutral-500 line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/80 dark:border-emerald-800 dark:text-emerald-400 text-xs font-mono font-bold px-2 py-0.5 rounded">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Star Rating */}
              <div className="flex items-center space-x-1.5 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-neutral-950 dark:text-white font-bold">{product.rating}</span>
                <span>({product.reviewCount})</span>
              </div>
            </div>
            <p className="text-[11px] font-mono text-neutral-500 mt-1">
              Inclusive of all taxes. Free express shipping on orders over ₹1,999.
            </p>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-400">COLOR:</span>
              <span className="text-white font-bold">{selectedColor.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`relative p-1 rounded-full border-2 transition ${
                    selectedColor.name === color.name
                      ? "border-blue-500 scale-110"
                      : "border-neutral-800 hover:border-neutral-600"
                  }`}
                  title={color.name}
                >
                  <span
                    className="w-6 h-6 rounded-full block border border-neutral-700"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection & Sizing Guide */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-400">
                SELECT SIZE: <strong className="text-white">{selectedSize}</strong>
              </span>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 underline transition"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size &amp; Fit Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => {
                const stock = product.stock[size] ?? 5;
                const isSoldOut = stock <= 0;
                return (
                  <button
                    key={size}
                    disabled={isSoldOut}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-xl font-mono text-xs font-bold transition flex flex-col items-center justify-center border ${
                      isSoldOut
                        ? "bg-neutral-900/50 text-neutral-600 border-neutral-900 cursor-not-allowed line-through"
                        : selectedSize === size
                        ? "bg-white text-black border-white shadow-lg"
                        : "bg-neutral-900 text-neutral-200 border-neutral-800 hover:border-neutral-700 hover:text-white"
                    }`}
                  >
                    <span>{size}</span>
                  </button>
                );
              })}
            </div>

            {/* Low stock alert */}
            {currentStock > 0 && currentStock <= 3 && (
              <p className="text-[11px] font-mono text-amber-400 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Only {currentStock} pieces left in {selectedSize}!</span>
              </p>
            )}
          </div>

          {/* Add to Bag Action */}
          <div className="pt-2 space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full flex items-center justify-center space-x-2 py-4 rounded-xl text-xs font-mono uppercase font-bold transition shadow-xl cursor-pointer ${
                isOutOfStock
                  ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                  : justAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Shopping Bag</span>
                </>
              ) : isOutOfStock ? (
                <span>Sold Out in this Size</span>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • ₹{product.price.toLocaleString("en-IN")}</span>
                </>
              )}
            </button>
          </div>

          {/* Value Props Strip */}
          <div className="rounded-xl border border-neutral-850 bg-neutral-900/40 p-4 space-y-2.5 text-xs font-mono text-neutral-400">
            <div className="flex items-center space-x-2.5">
              <Truck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Complimentary Pan-India Express shipping on ₹1,999+</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <RotateCcw className="w-4 h-4 text-blue-400 shrink-0" />
              <span>7-Day doorstep size exchange &amp; easy return window</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Milled in Tiruppur • 100% genuine heavyweight cotton</span>
            </div>
          </div>

          {/* Accordion Tabs */}
          <div className="border-t border-neutral-800 divide-y divide-neutral-850 text-xs font-mono">
            {/* Fabric & Specs */}
            <div>
              <button
                onClick={() =>
                  setActiveAccordion(activeAccordion === "fabric" ? null : "fabric")
                }
                className="w-full py-4 flex items-center justify-between text-white uppercase font-bold hover:text-blue-400 transition"
              >
                <span>Fabric Specifications &amp; Features</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeAccordion === "fabric" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeAccordion === "fabric" && (
                <div className="pb-4 space-y-2 text-neutral-400 font-sans leading-relaxed">
                  <p>{product.description}</p>
                  <ul className="list-disc list-inside space-y-1 pt-2 font-mono text-[11px] text-neutral-300">
                    {product.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Wash & Care */}
            <div>
              <button
                onClick={() => setActiveAccordion(activeAccordion === "care" ? null : "care")}
                className="w-full py-4 flex items-center justify-between text-white uppercase font-bold hover:text-blue-400 transition"
              >
                <span>Wash &amp; Garment Care</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeAccordion === "care" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeAccordion === "care" && (
                <div className="pb-4 space-y-1.5 text-neutral-400 text-[11px]">
                  <p>• Machine wash cold inside out with like colors.</p>
                  <p>• Use mild detergent; do not bleach or tumble dry.</p>
                  <p>• Flat air dry in shade to maintain heavy cotton drape.</p>
                  <p>• Warm iron inside out; never iron directly on graphics.</p>
                </div>
              )}
            </div>

            {/* Delivery Timeline */}
            <div>
              <button
                onClick={() =>
                  setActiveAccordion(activeAccordion === "shipping" ? null : "shipping")
                }
                className="w-full py-4 flex items-center justify-between text-white uppercase font-bold hover:text-blue-400 transition"
              >
                <span>Pan-India Shipping &amp; Transit</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeAccordion === "shipping" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeAccordion === "shipping" && (
                <div className="pb-4 space-y-1.5 text-neutral-400 text-[11px]">
                  <p>• <strong>Metro Cities (Delhi, Mumbai, Bangalore)</strong>: 2–3 business days.</p>
                  <p>• <strong>Rest of India</strong>: 3–5 business days via Bluedart / Delhivery Air.</p>
                  <p>• Tracking link provided via SMS &amp; Email upon dispatch.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="mt-20 border-t border-neutral-900 pt-12">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-4 border-b border-neutral-900">
          <div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold uppercase text-white">
              VERIFIED DROP REVIEWS
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Feedback from verified Indian streetwear patrons.
            </p>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center space-x-2 text-xs font-mono">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-bold text-white">{product.rating} OUT OF 5</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl border border-neutral-850 bg-neutral-950 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-white">{rev.author}</span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      ({rev.city})
                    </span>
                  </div>
                  {rev.verified && (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-900 px-2 py-0.5 rounded">
                      Verified Buyer
                    </span>
                  )}
                </div>
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>
                <p className="text-[10px] font-mono text-neutral-600">{rev.date}</p>
              </div>
            ))
          ) : (
            <div className="col-span-2 p-8 rounded-2xl border border-neutral-850 bg-neutral-950 text-center space-y-2">
              <p className="text-xs font-mono text-neutral-300">
                Be the first to review this new drop garment.
              </p>
              <p className="text-[11px] text-neutral-500">
                All purchasers receive a review link post-delivery.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* "Complete the Look" / Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-neutral-900 pt-12">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-500">
              Coordinated Pieces
            </span>
            <h2 className="text-xl sm:text-2xl font-mono font-bold uppercase text-white mt-1">
              Complete the Streetwear Fit
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        category={product.category}
      />

      {/* Mobile Sticky Quick Add Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] font-mono text-neutral-400 block uppercase">
            Size: {selectedSize}
          </span>
          <span className="text-sm font-mono font-bold text-white">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`flex-1 flex items-center justify-center space-x-1.5 py-3 rounded-xl text-xs font-mono uppercase font-bold transition shadow-lg cursor-pointer ${
            isOutOfStock
              ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
              : justAdded
              ? "bg-emerald-600 text-white"
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added to Bag</span>
            </>
          ) : isOutOfStock ? (
            <span>Sold Out</span>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
