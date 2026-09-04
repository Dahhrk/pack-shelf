// Pack: Transitions (original) / Source: Original / License: MIT

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const pages: Record<string, { title: string; body: string; accent: string }> = {
  alpha: {
    title: "Alpha Page",
    body: "This is the first page. Content fades in with a gentle upward slide. Toggle to see the exit animation paired with the entrance of the next page.",
    accent: "text-emerald-400",
  },
  beta: {
    title: "Beta Page",
    body: "Welcome to the second page. Notice how the previous content fades and slides out before this appears. AnimatePresence coordinates both transitions.",
    accent: "text-amber-400",
  },
};

export function FadeSlide() {
  const [active, setActive] = useState<"alpha" | "beta">("alpha");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400 font-mono">Fade + slide with AnimatePresence</p>
        <button
          onClick={() => setActive((p) => (p === "alpha" ? "beta" : "alpha"))}
          className="px-3 py-1.5 text-xs font-mono rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-colors"
        >
          Toggle page
        </button>
      </div>

      <div className="relative rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="p-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <h3 className={`text-xl font-bold mb-2 ${pages[active].accent}`}>
              {pages[active].title}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
              {pages[active].body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
