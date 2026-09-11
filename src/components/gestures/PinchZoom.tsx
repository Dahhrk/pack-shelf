// Pack: Gestures (original) / Source: Original / License: MIT

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function PinchZoom() {
  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 300, damping: 25 });
  const containerRef = useRef<HTMLDivElement>(null);

  function handleWheel(e: React.WheelEvent) {
    e.stopPropagation();
    const delta = e.deltaY * -0.003;
    const next = Math.min(3, Math.max(0.5, scale.get() + delta));
    scale.set(next);
  }

  function resetZoom() {
    scale.set(1);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={containerRef}
        className="w-72 h-52 rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden flex items-center justify-center relative"
        onWheel={handleWheel}
      >
        <motion.div
          className="w-56 h-40 rounded-xl bg-gradient-to-br from-sky-600 to-cyan-500 flex flex-col items-center justify-center gap-2 select-none"
          style={{ scale: springScale }}
          whileHover={{ boxShadow: "0 0 30px rgba(56,189,248,0.2)" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <svg className="w-8 h-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M21 21l-5.2-5.2m0 0A7.5 7.5 0 1010 17.5a7.5 7.5 0 005.8-1.3zM10 7v6m3-3H7" />
          </svg>
          <span className="text-sm font-medium text-white/90">Zoom Me</span>
        </motion.div>

        <motion.div
          className="absolute bottom-2 right-2 text-[10px] font-mono text-zinc-500 bg-zinc-900/80 px-2 py-0.5 rounded"
          style={{
            opacity: springScale,
          }}
        >
          <motion.span>{springScale}</motion.span>
        </motion.div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => scale.set(Math.min(3, scale.get() + 0.3))}
          className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-zinc-500 transition-colors"
        >
          Zoom +
        </button>
        <button
          onClick={resetZoom}
          className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-zinc-500 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={() => scale.set(Math.max(0.5, scale.get() - 0.3))}
          className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-zinc-500 transition-colors"
        >
          Zoom −
        </button>
      </div>

      <p className="text-[10px] text-zinc-600 font-mono">
        scroll wheel to zoom · buttons to adjust
      </p>
    </div>
  );
}
