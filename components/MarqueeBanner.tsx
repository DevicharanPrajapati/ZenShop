"use client";

import Link from "next/link";
import { Sparkles, Truck, ShieldCheck, Flame } from "lucide-react";

export default function MarqueeBanner() {
  const items = [
    { text: "DROP 01: MONOLITH IS LIVE", icon: Flame },
    { text: "FREE EXPRESS SHIPPING ACROSS INDIA OVER ₹1,999", icon: Truck },
    { text: "HEAVYWEIGHT 280-380 GSM COMBED COTTON", icon: Sparkles },
    { text: "CASH ON DELIVERY & INSTANT UPI AVAILABLE", icon: ShieldCheck },
    { text: "LIMITED RUNS • NEVER RESTOCKED", icon: Flame },
  ];

  return (
    <div className="relative overflow-hidden bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 text-[11px] font-mono tracking-widest text-neutral-800 dark:text-neutral-300 uppercase py-2 select-none">
      <div className="animate-marquee flex items-center space-x-8">
        {/* Render twice for seamless loop */}
        {[...items, ...items].map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center space-x-3 whitespace-nowrap">
              <Icon className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
              <span>{item.text}</span>
              <span className="text-neutral-400 dark:text-neutral-700">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
