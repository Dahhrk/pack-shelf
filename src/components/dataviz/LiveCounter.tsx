// Pack: Data Viz (original) / Source: Original / License: MIT

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

function Digit({ value }: { value: string }) {
  return (
    <div className="relative w-[0.65em] h-[1.2em] overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="absolute inset-0 flex items-center justify-center font-mono"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function RollingNumber({ value }: { value: number }) {
  const formatted = value.toLocaleString("en-US");
  const chars = formatted.split("");

  return (
    <div className="flex items-center tabular-nums text-5xl font-bold text-zinc-100">
      {chars.map((char, i) => {
        if (char === ",") {
          return (
            <span key={`sep-${i}`} className="w-[0.3em] text-center text-zinc-500">
              ,
            </span>
          );
        }
        return <Digit key={`${i}-${formatted.length}`} value={char} />;
      })}
    </div>
  );
}

export function LiveCounter() {
  const [count, setCount] = useState(1247);

  const increment = useCallback((n: number) => {
    setCount((c) => Math.max(0, c + n));
  }, []);

  return (
    <div className="space-y-6">
      <p className="text-sm text-zinc-400 font-mono">Odometer-style rolling digits</p>

      <div className="flex flex-col items-center gap-6 py-6 rounded-xl bg-zinc-900 border border-zinc-800">
        <RollingNumber value={count} />

        <div className="flex gap-2">
          {[-100, -10, -1, 1, 10, 100].map((n) => (
            <button
              key={n}
              onClick={() => increment(n)}
              className="px-3 py-1.5 text-xs font-mono rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-colors"
            >
              {n > 0 ? `+${n}` : n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
