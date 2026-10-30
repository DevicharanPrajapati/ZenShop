"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, Menu, X, Shield, ArrowRight, User } from "lucide-react";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, openCart, wishlist } = useStore();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { name: "ALL DROPS", href: "/products" },
    { name: "TEES", href: "/products?category=T-Shirts" },
    { name: "HOODIES", href: "/products?category=Hoodies+%26+Fleeces" },
    { name: "PANTS", href: "/products?category=Pants+%26+Cargos" },
    { name: "ACCESSORIES", href: "/products?category=Accessories" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-neutral-950/85 border-b border-neutral-800 transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-18">
        {/* Left: Mobile Menu Toggle & Brand */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-neutral-300 hover:text-white p-2 rounded-lg transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/" className="group flex items-baseline space-x-2">
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-white font-mono uppercase group-hover:text-neutral-200 transition">
              ZEN<span className="text-blue-500">/</span>STUDIO
            </span>
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest font-mono text-neutral-400 border border-neutral-800 px-1.5 py-0.5 rounded">
              IND
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-mono tracking-widest uppercase transition-colors relative py-1 ${
                  isActive
                    ? "text-blue-400 font-semibold"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-lg transition"
            aria-label="Search garments"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative p-2 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-lg transition"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-bold text-neutral-950">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Supabase User Account / Login */}
          <Link
            href="/login"
            className={`flex items-center space-x-1.5 rounded-lg transition ${
              user
                ? "bg-blue-950/60 border border-blue-800 text-blue-300 px-2.5 py-1.5 text-xs font-mono"
                : "p-2 text-neutral-300 hover:text-white hover:bg-neutral-900"
            }`}
            title={user ? `Signed in as ${user.email}` : "Sign in to Studio"}
            aria-label="Account Login"
          >
            <User className="w-4 h-4" />
            {user && (
              <span className="hidden sm:inline-block max-w-[70px] truncate font-bold">
                {user.fullName || "Patron"}
              </span>
            )}
          </Link>

          {/* Cart Bag Trigger */}
          <button
            onClick={openCart}
            className="relative flex items-center space-x-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/60 px-3 py-2 rounded-lg text-white transition group"
            aria-label="Open shopping bag"
          >
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-mono tracking-wider font-semibold">BAG</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
              {cartCount}
            </span>
          </button>

          {/* Admin Link (Resume Showcase) */}
          <Link
            href="/admin"
            className="hidden lg:flex items-center space-x-1.5 text-[11px] font-mono tracking-wider text-neutral-400 hover:text-neutral-200 border border-dashed border-neutral-700 px-2.5 py-1.5 rounded hover:border-neutral-500 transition"
            title="Admin Portal"
          >
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>ADMIN</span>
          </Link>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {searchOpen && (
        <div className="border-t border-neutral-800 bg-neutral-900/95 px-4 py-3 sm:px-8 animate-fadeIn">
          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto flex max-w-3xl items-center relative"
          >
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search heavyweight tees, cargos, hoodies, accessories..."
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg py-2.5 pl-10 pr-24 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 font-sans"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono uppercase px-3 py-1.5 rounded transition"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-mono tracking-widest text-neutral-200 hover:text-white py-2 border-b border-neutral-900"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-neutral-600" />
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-900 flex justify-between items-center text-xs font-mono text-neutral-400">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-1.5 text-blue-400 hover:underline"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Management</span>
            </Link>
            <Link
              href="/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:underline"
            >
              Track Order
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
