"use client";

import { useState } from "react";
import { X, Ruler, CheckCircle } from "lucide-react";

type SizeGuideModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category: string;
};

export default function SizeGuideModal({ isOpen, onClose, category }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<"inches" | "cm">("inches");

  if (!isOpen) return null;

  // Chart data in inches
  const measurementsInches = [
    { size: "S", chest: '42"', length: '28"', shoulder: '21"' },
    { size: "M", chest: '44"', length: '29"', shoulder: '22"' },
    { size: "L", chest: '46"', length: '30"', shoulder: '23"' },
    { size: "XL", chest: '48"', length: '31"', shoulder: '24"' },
    { size: "XXL", chest: '50"', length: '32"', shoulder: '25"' },
  ];

  // Chart data in cm
  const measurementsCm = [
    { size: "S", chest: "107 cm", length: "71 cm", shoulder: "53 cm" },
    { size: "M", chest: "112 cm", length: "74 cm", shoulder: "56 cm" },
    { size: "L", chest: "117 cm", length: "76 cm", shoulder: "58 cm" },
    { size: "XL", chest: "122 cm", length: "79 cm", shoulder: "61 cm" },
    { size: "XXL", chest: "127 cm", length: "81 cm", shoulder: "63 cm" },
  ];

  const currentChart = unit === "inches" ? measurementsInches : measurementsCm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl rounded-2xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 shadow-2xl text-white">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <Ruler className="w-5 h-5 text-blue-500" />
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider font-bold">
                Size & Fit Guide
              </h3>
              <p className="text-xs text-neutral-400">
                Architectural Oversized & Boxy Cuts ({category})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-neutral-400 font-mono">
            Switch measurements:
          </span>
          <div className="flex bg-neutral-900 p-1 rounded-lg border border-neutral-800 text-xs font-mono">
            <button
              onClick={() => setUnit("inches")}
              className={`px-3 py-1 rounded-md transition ${
                unit === "inches"
                  ? "bg-blue-600 text-white font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit("cm")}
              className={`px-3 py-1 rounded-md transition ${
                unit === "cm"
                  ? "bg-blue-600 text-white font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-neutral-900 text-neutral-400 border-b border-neutral-800">
              <tr>
                <th className="py-2.5 px-4 font-bold text-white">SIZE</th>
                <th className="py-2.5 px-4">CHEST</th>
                <th className="py-2.5 px-4">LENGTH</th>
                <th className="py-2.5 px-4">SHOULDER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {currentChart.map((row) => (
                <tr key={row.size} className="hover:bg-neutral-900/60 transition">
                  <td className="py-2.5 px-4 font-bold text-blue-400">{row.size}</td>
                  <td className="py-2.5 px-4 text-neutral-300">{row.chest}</td>
                  <td className="py-2.5 px-4 text-neutral-300">{row.length}</td>
                  <td className="py-2.5 px-4 text-neutral-300">{row.shoulder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit Recommendation Note */}
        <div className="mt-5 rounded-xl bg-blue-950/20 border border-blue-900/40 p-4 space-y-2 text-xs text-neutral-300 font-sans">
          <div className="flex items-center space-x-2 font-mono text-blue-400 font-bold uppercase text-[11px]">
            <CheckCircle className="w-4 h-4" />
            <span>How to choose your fit</span>
          </div>
          <p className="leading-relaxed">
            • <strong>For Signature Boxy Drape</strong>: Pick your true standard T-shirt size. Our garments are intentionally tailored with a wider chest and dropped shoulders.
          </p>
          <p className="leading-relaxed">
            • <strong>For Regular Slim/Standard Fit</strong>: Size down by one size.
          </p>
          <p className="text-[11px] text-neutral-500 font-mono">
            Model in pictures is 6&apos;1&quot; (185 cm) wearing size Large.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-neutral-800 hover:bg-neutral-700 text-white font-mono uppercase text-xs font-bold py-3 rounded-xl transition"
        >
          Got It
        </button>
      </div>
    </div>
  );
}
