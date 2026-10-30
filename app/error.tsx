"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, ArrowLeft, ShieldAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for telemetry
    console.error("Studio runtime error captured:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-neutral-800 bg-neutral-950 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-2 bg-red-500/50 blur-lg" />

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-red-950/40 border border-red-500/30 flex items-center justify-center mx-auto text-red-400 mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* Header */}
        <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
          RUNTIME INTERRUPTION
        </span>

        <h1 className="text-2xl sm:text-3xl font-mono font-black text-white uppercase tracking-tight mt-2">
          SOMETHING WENT WRONG
        </h1>

        <p className="mt-3 text-xs text-neutral-400 font-sans leading-relaxed max-w-sm mx-auto">
          An unexpected interruption occurred while fetching or rendering this garment view.
        </p>

        {/* Technical Digest */}
        {error?.digest && (
          <div className="mt-4 inline-block rounded bg-neutral-900 border border-neutral-800 px-3 py-1 text-[10px] font-mono text-neutral-500">
            Digest Code: {error.digest}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase font-bold px-6 py-3.5 rounded-xl transition shadow-lg shadow-blue-900/30 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white font-mono text-xs uppercase font-bold px-6 py-3.5 rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
