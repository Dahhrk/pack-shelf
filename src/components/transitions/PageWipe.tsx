// Pack: Transitions (original) / Source: Original / License: MIT

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const PAGES: { key: string; color: string; wipeColor: string; title: string; body: string }[] = [
  {
    key: "one",
    color: "bg-zinc-900",
    wipeColor: "bg-emerald-500",
    title: "First View",
    body: "This is the starting page. Press the button to see a full-width color wipe reveal the next page underneath.",
  },
  {
    key: "two",
    color: "bg-zinc-900",
    wipeColor: "bg-amber-500",
    title: "Second View",
    body: "The colored wipe sweeps across, then exits to reveal this content. Press again to go back.",
  },
];

export function PageWipe() {
  const [index, setIndex] = useState(0);
  const [wiping, setWiping] = useState(false);
  const page = PAGES[index];
  const nextPage = PAGES[(index + 1) % PAGES.length];

  const triggerWipe = () => {
    if (wiping) return;
    setWiping(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400 font-mono">Color-wipe page transition</p>
        <button
          onClick={triggerWipe}
          className="px-3 py-1.5 text-xs font-mono rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-colors"
        >
          Wipe transition
        </button>
      </div>

      <div className="relative rounded-xl border border-zinc-800 overflow-hidden min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={page.key}
            className={`${page.color} p-8`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <h3 className="text-xl font-bold text-zinc-100 mb-2">{page.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-md">{page.body}</p>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence
          onExitComplete={() => {
            setWiping(false);
          }}
        >
          {wiping && (
            <motion.div
              className={`absolute inset-0 ${nextPage.wipeColor} z-10`}
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
              }}
              onAnimationComplete={(def: { x?: string }) => {
                if (def.x === "0%") {
                  setIndex((i) => (i + 1) % PAGES.length);
                }
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
