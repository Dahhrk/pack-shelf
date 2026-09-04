// Pack: Transitions (original) / Source: Original / License: MIT

import { useState } from "react";
import { motion } from "motion/react";

interface Item {
  id: string;
  label: string;
  color: string;
  icon: string;
}

const ITEMS: Item[] = [
  { id: "react", label: "React", color: "bg-sky-500/20 border-sky-500/30", icon: "⚛" },
  { id: "vue", label: "Vue", color: "bg-emerald-500/20 border-emerald-500/30", icon: "🍃" },
  { id: "svelte", label: "Svelte", color: "bg-orange-500/20 border-orange-500/30", icon: "🔥" },
  { id: "angular", label: "Angular", color: "bg-rose-500/20 border-rose-500/30", icon: "🅰" },
  { id: "solid", label: "Solid", color: "bg-violet-500/20 border-violet-500/30", icon: "💎" },
  { id: "astro", label: "Astro", color: "bg-amber-500/20 border-amber-500/30", icon: "🚀" },
];

export function MorphingLayout() {
  const [isGrid, setIsGrid] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400 font-mono">Grid ↔ list layout morph</p>
        <button
          onClick={() => setIsGrid((g) => !g)}
          className="px-3 py-1.5 text-xs font-mono rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-colors"
        >
          {isGrid ? "Switch to List" : "Switch to Grid"}
        </button>
      </div>

      <motion.div
        layout
        className={
          isGrid
            ? "grid grid-cols-2 sm:grid-cols-3 gap-3"
            : "flex flex-col gap-2"
        }
      >
        {ITEMS.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`morph-${item.id}`}
            className={`rounded-lg border ${item.color} ${
              isGrid ? "p-6 flex flex-col items-center gap-2" : "p-3 flex items-center gap-3"
            }`}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.span
              layoutId={`morph-icon-${item.id}`}
              className={isGrid ? "text-2xl" : "text-lg"}
            >
              {item.icon}
            </motion.span>
            <motion.span
              layoutId={`morph-label-${item.id}`}
              className={`font-mono text-zinc-200 ${isGrid ? "text-sm" : "text-sm"}`}
            >
              {item.label}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
