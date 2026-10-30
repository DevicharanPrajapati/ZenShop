export default function Loading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center px-4 py-16">
      <div className="flex flex-col items-center space-y-6 max-w-sm text-center">
        {/* Animated Brand Moniker */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-2xl relative overflow-hidden">
            <span className="text-sm font-black font-mono tracking-tighter text-white">
              ZEN<span className="text-blue-500">/</span>S
            </span>
            {/* Shimmer bar */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          </div>
          {/* Subtle outer glow ring */}
          <div className="absolute -inset-1 rounded-2xl bg-blue-500/20 blur-sm animate-pulse -z-10" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest text-white font-bold">
            LOADING CAPSULE
          </p>
          <p className="text-[11px] font-mono text-neutral-500">
            Fetching heavyweight textiles &amp; live drop telemetry...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-neutral-900 rounded-full overflow-hidden border border-neutral-850">
          <div className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 rounded-full animate-[marquee_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
