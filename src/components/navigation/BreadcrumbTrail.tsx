// Pack: Navigation (original) / Source: Original / License: MIT

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const hierarchy = [
  "Home",
  "Components",
  "Navigation",
  "Breadcrumb",
  "Trail",
];

export function BreadcrumbTrail() {
  const [depth, setDepth] = useState(1);
  const crumbs = hierarchy.slice(0, depth);

  function goDeeper() {
    setDepth((d) => Math.min(hierarchy.length, d + 1));
  }

  function goTo(index: number) {
    setDepth(index + 1);
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-1 flex-wrap min-h-[2.5rem] px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
        <AnimatePresence mode="popLayout">
          {crumbs.map((crumb, i) => (
            <motion.div
              key={`${crumb}-${i}`}
              className="flex items-center gap-1"
              initial={{ opacity: 0, x: -12, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 12, filter: "blur(4px)" }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 25,
                delay: i * 0.05,
              }}
              layout
            >
              {i > 0 && (
                <svg
                  className="w-3.5 h-3.5 text-zinc-600 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              )}
              <button
                onClick={() => goTo(i)}
                className={`text-sm font-medium whitespace-nowrap transition-colors ${
                  i === crumbs.length - 1
                    ? "text-zinc-200"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {crumb}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3 mt-4 justify-center">
        <button
          onClick={() => goTo(0)}
          disabled={depth <= 1}
          className="px-4 py-2 text-sm rounded-lg bg-zinc-800 border border-zinc-700 hover:border-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Home
        </button>
        <button
          onClick={goDeeper}
          disabled={depth >= hierarchy.length}
          className="px-4 py-2 text-sm rounded-lg bg-zinc-800 border border-zinc-700 hover:border-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Go Deeper
        </button>
        <span className="text-xs text-zinc-600 font-mono">
          depth {depth}/{hierarchy.length}
        </span>
      </div>
    </div>
  );
}
