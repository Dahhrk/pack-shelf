// Pack: Feedback (original) / Source: Original / License: MIT

import { useState } from "react";
import { motion } from "motion/react";

const steps = [
  { label: "Account", icon: "①" },
  { label: "Profile", icon: "②" },
  { label: "Settings", icon: "③" },
  { label: "Complete", icon: "④" },
];

export function ProgressSteps() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center flex-1 last:flex-none">
            <button
              onClick={() => setCurrent(i)}
              className="relative flex flex-col items-center gap-2 group"
            >
              <motion.div
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center relative overflow-hidden"
                animate={{
                  borderColor: i <= current ? "#34d399" : "#3f3f46",
                  backgroundColor: i < current ? "#34d399" : "transparent",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {i < current ? (
                  <motion.svg
                    className="w-5 h-5 text-zinc-950"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        delay: 0.1,
                      }}
                    />
                  </motion.svg>
                ) : (
                  <motion.span
                    className="text-sm font-mono"
                    animate={{
                      color: i === current ? "#34d399" : "#71717a",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    {i + 1}
                  </motion.span>
                )}

                {i === current && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-emerald-400"
                    initial={{ scale: 1.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </motion.div>

              <motion.span
                className="text-xs font-medium"
                animate={{
                  color: i <= current ? "#d4d4d8" : "#52525b",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {step.label}
              </motion.span>
            </button>

            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-zinc-800 mx-2 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-400 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: i < current ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setCurrent((p) => Math.max(0, p - 1))}
          disabled={current === 0}
          className="px-4 py-2 text-sm rounded-lg bg-zinc-800 border border-zinc-700 hover:border-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => setCurrent((p) => Math.min(steps.length - 1, p + 1))}
          disabled={current === steps.length - 1}
          className="px-4 py-2 text-sm rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
