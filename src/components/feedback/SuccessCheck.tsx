// Pack: Feedback (original) / Source: Original / License: MIT

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function SuccessCheck() {
  const [active, setActive] = useState(false);

  function trigger() {
    setActive(false);
    requestAnimationFrame(() => setActive(true));
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-32 h-32 flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key="check"
              className="flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
            >
              <motion.div
                className="w-28 h-28 rounded-full bg-emerald-500 absolute"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              />
              <motion.div
                className="w-28 h-28 rounded-full border-2 border-emerald-400 absolute"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <svg
                className="w-14 h-14 relative z-10"
                viewBox="0 0 24 24"
                fill="none"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  stroke="white"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                    delay: 0.25,
                  }}
                />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              className="w-28 h-28 rounded-full border-2 border-dashed border-zinc-700 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <span className="text-zinc-600 text-sm font-mono">idle</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex gap-3">
        <button
          onClick={trigger}
          className="px-5 py-2.5 text-sm rounded-lg bg-emerald-600 hover:bg-emerald-500 font-medium transition-colors"
        >
          Trigger
        </button>
        <button
          onClick={() => setActive(false)}
          className="px-5 py-2.5 text-sm rounded-lg bg-zinc-800 border border-zinc-700 hover:border-zinc-500 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
