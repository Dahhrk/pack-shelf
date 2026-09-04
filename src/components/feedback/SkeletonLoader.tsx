// Pack: Feedback (original) / Source: Original / License: MIT

import { motion } from "motion/react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-zinc-800 ${className ?? ""}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      />
    </div>
  );
}

export function SkeletonLoader() {
  return (
    <div className="max-w-sm mx-auto space-y-4">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: i * 0.1,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Shimmer className="w-10 h-10 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Shimmer className="h-3 w-24" />
              <Shimmer className="h-2.5 w-16" />
            </div>
          </div>
          <div className="space-y-2.5">
            <Shimmer className="h-3 w-full" />
            <Shimmer className="h-3 w-4/5" />
            <Shimmer className="h-3 w-3/5" />
          </div>
          <div className="flex gap-3 mt-4">
            <Shimmer className="h-8 w-20 rounded-lg" />
            <Shimmer className="h-8 w-20 rounded-lg" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
