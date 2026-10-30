"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, X, Search, RotateCcw } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, CATEGORIES, FITS, SIZES, type ProductCategory, type ProductFit } from "@/lib/products";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialSearch = searchParams.get("search") || "";

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "All");
  const [selectedFit, setSelectedFit] = useState<string>("All");
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== "All" && p.category !== selectedCategory) {
        return false;
      }
      // Fit filter
      if (selectedFit !== "All" && p.fit !== selectedFit) {
        return false;
      }
      // Size filter
      if (selectedSize !== "All" && !p.sizes.includes(selectedSize)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "newest") return (b.isNewDrop ? 1 : 0) - (a.isNewDrop ? 1 : 0);
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedCategory, selectedFit, selectedSize, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedFit("All");
    setSelectedSize("All");
    setSearchQuery("");
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedFit !== "All" ||
    selectedSize !== "All" ||
    searchQuery !== "";

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Page Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 dark:border-neutral-900 pb-6 mb-8 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">
            ARCHITECTURAL CAPSULE ARCHIVE
          </span>
          <h1 className="text-3xl sm:text-4xl font-mono font-black uppercase text-neutral-950 dark:text-white tracking-tight mt-1">
            ALL STREETWEAR PIECES
          </h1>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 font-sans">
            Milled 280-380 GSM combed cottons, boxy drapes, and tactical utility goods.
          </p>
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-3.5 py-2 rounded-xl text-xs font-mono text-neutral-900 dark:text-white"
          >
            <Filter className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Filters {hasActiveFilters && "•"}</span>
          </button>

          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="text-neutral-500 hidden sm:inline font-medium">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-blue-500"
            >
              <option value="featured">Featured Drops</option>
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside
          className={`md:col-span-3 space-y-6 md:block ${
            showMobileFilters ? "block" : "hidden"
          } bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-850 shadow-sm dark:shadow-none`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-900">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-950 dark:text-white">
                FILTERS
              </h2>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center space-x-1 text-[11px] font-mono text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-neutral-700 dark:text-neutral-400 font-medium block">
              Search Garments
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tees, hoodies, cargos..."
                className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-neutral-700 dark:text-neutral-400 font-medium block">
              Category
            </label>
            <div className="flex flex-col space-y-1">
              {["All", ...CATEGORIES].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-left text-xs font-mono py-1.5 px-2.5 rounded-lg transition flex items-center justify-between ${
                    selectedCategory === category
                      ? "bg-blue-100 text-blue-900 font-bold border border-blue-300 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-900/50"
                      : "text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900"
                  }`}
                >
                  <span>{category}</span>
                  {category === "All" && (
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-600 font-normal">
                      {products.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Fit Selector */}
          <div className="space-y-2 border-t border-neutral-200 dark:border-neutral-900 pt-4">
            <label className="text-xs font-mono uppercase text-neutral-700 dark:text-neutral-400 font-medium block">
              Silhouettes &amp; Fits
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["All", ...FITS].map((fit) => (
                <button
                  key={fit}
                  onClick={() => setSelectedFit(fit)}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition ${
                    selectedFit === fit
                      ? "bg-blue-600 text-white font-bold border-blue-500"
                      : "bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-700 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>

          {/* Size Pills */}
          <div className="space-y-2 border-t border-neutral-200 dark:border-neutral-900 pt-4">
            <label className="text-xs font-mono uppercase text-neutral-700 dark:text-neutral-400 font-medium block">
              Sizes
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["All", ...SIZES].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-xs font-mono px-3 py-1 rounded-lg border transition ${
                    selectedSize === size
                      ? "bg-neutral-950 text-white dark:bg-white dark:text-black font-bold border-neutral-950 dark:border-white shadow-sm"
                      : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-400 border-neutral-300 dark:border-neutral-800 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Cards Grid Area */}
        <main className="md:col-span-9 space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <span>
              Showing <strong className="text-neutral-950 dark:text-white">{filteredProducts.length}</strong> garments
            </span>
            {hasActiveFilters && (
              <span className="text-blue-400">Filtered view active</span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-12 text-center space-y-3">
              <p className="text-base font-mono font-bold text-white uppercase">
                No matching garments found
              </p>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto font-sans">
                Try loosening your filters, changing categories, or clearing your search term.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-mono text-xs uppercase px-4 py-2.5 rounded-xl transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-20 text-center font-mono text-neutral-400">
          Loading Capsule Catalog...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
