"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Truck, RefreshCw, Send, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 font-sans text-xs">
      {/* Brand Perks Strip */}
      <div className="border-b border-neutral-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center space-x-4 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-blue-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-mono text-white text-xs font-bold uppercase tracking-wider">
                Pan-India Express Delivery
              </h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Complimentary on orders above ₹1,999. Dispatched within 24 hours.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-blue-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-mono text-white text-xs font-bold uppercase tracking-wider">
                7-Day Hassle-Free Returns
              </h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Seamless size exchanges & store credits arranged right from your doorstep.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-mono text-white text-xs font-bold uppercase tracking-wider">
                100% Verified Authentic
              </h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Custom milled 280-380 GSM textiles crafted in Tiruppur &amp; Delhi NCR.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 dark:bg-neutral-900 border border-neutral-700/80 dark:border-neutral-700 flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 group-hover:border-blue-500 transition-all">
                <span className="font-mono font-black text-xs text-white">Z</span>
                <span className="text-blue-500 font-bold text-xs">/</span>
                <span className="font-mono font-black text-xs text-white">S</span>
              </div>
              <span className="text-xl font-black font-mono tracking-tighter text-neutral-950 dark:text-white uppercase">
                ZEN<span className="text-blue-500">/</span>STUDIO
              </span>
            </Link>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Contemporary Indian streetwear. Crafted with heavyweight cottons, architectural silhouettes, and utilitarian detailing. Limited capsule releases designed to transcend seasonal fast-fashion.
            </p>
            <div className="pt-2 font-mono text-[11px] text-neutral-400">
              <span>Milled &amp; Designed in India 🇮🇳</span>
            </div>
          </div>

          {/* Drops Navigation */}
          <div className="space-y-3 font-mono">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products" className="hover:text-white transition">
                  Drop 01: Monolith
                </Link>
              </li>
              <li>
                <Link href="/products?category=T-Shirts" className="hover:text-white transition">
                  Heavyweight Tees (280 GSM)
                </Link>
              </li>
              <li>
                <Link href="/products?category=Hoodies+%26+Fleeces" className="hover:text-white transition">
                  Architectural Hoodies
                </Link>
              </li>
              <li>
                <Link href="/products?category=Pants+%26+Cargos" className="hover:text-white transition">
                  Tactical Cargo Bottoms
                </Link>
              </li>
              <li>
                <Link href="/products?category=Accessories" className="hover:text-white transition">
                  Modular Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-3 font-mono">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/orders" className="hover:text-white transition flex items-center space-x-1">
                  <span>Track Your Order</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition">
                  Size &amp; Fit Guide
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition">
                  Studio Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-white font-mono text-xs font-bold uppercase tracking-widest">
              Drop Notifications
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Sign up for private drop alerts 1 hour before general release. Zero spam.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2.5 pl-3 pr-10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 font-mono"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] font-mono text-green-400">
                  You are on the VIP Drop list!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-400 gap-4">
          <p>© 2026 ZEN STUDIO. Crafted for Contemporary Streetwear.</p>
          <div className="flex space-x-6 text-neutral-400">
            <span className="hover:text-white cursor-pointer transition">Privacy</span>
            <span className="hover:text-white cursor-pointer transition">Terms</span>
            <span className="hover:text-white cursor-pointer transition">Shipping India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
