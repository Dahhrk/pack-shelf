// Pack: Data Viz (original) / Source: Original / License: MIT

import { useState, useCallback } from "react";
import { motion } from "motion/react";

interface BarDatum {
  label: string;
  value: number;
  color: string;
}

const COLORS = [
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-sky-500",
  "bg-violet-500",
  "bg-teal-500",
  "bg-orange-500",
];

const LABELS = [
  "React",
  "Vue",
  "Svelte",
  "Angular",
  "Solid",
  "Qwik",
  "Astro",
];

function randomData(): BarDatum[] {
  return LABELS.map((label, i) => ({
    label,
    value: Math.round(Math.random() * 90 + 10),
    color: COLORS[i % COLORS.length],
  }));
}

export function AnimatedBarChart() {
  const [data, setData] = useState<BarDatum[]>(randomData);
  const [key, setKey] = useState(0);

  const randomize = useCallback(() => {
    setData(randomData());
    setKey((k) => k + 1);
  }, []);

  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400 font-mono">Framework popularity</p>
        <button
          onClick={randomize}
          className="px-3 py-1.5 text-xs font-mono rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-colors"
        >
          Randomize
        </button>
      </div>

      <div key={key} className="space-y-3">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-3">
            <span className="w-16 text-right text-xs font-mono text-zinc-500 shrink-0">
              {d.label}
            </span>
            <div className="flex-1 h-7 bg-zinc-800/50 rounded overflow-hidden relative">
              <motion.div
                className={`h-full rounded ${d.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${(d.value / max) * 100}%` }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 18,
                  delay: i * 0.08,
                }}
              />
              <motion.span
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.08 + 0.3 }}
              >
                {d.value}
              </motion.span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
