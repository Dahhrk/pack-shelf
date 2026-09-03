// Pack: Aceternity UI — Card Hover Effect
// Source: https://ui.aceternity.com/components/card-hover-effect
// GitHub: https://github.com/aceternity/aceternity-ui
// License: MIT

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

export function HoverEffect({
  items,
  className,
}: {
  items: { title: string; description: string; link?: string }[];
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4", className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-emerald-600/[0.08] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div className="rounded-2xl h-full w-full p-4 overflow-hidden bg-zinc-900 border border-zinc-800 group-hover:border-zinc-600 relative z-20 transition-colors">
            <div className="relative z-50">
              <h4 className="text-zinc-100 font-bold tracking-wide">{item.title}</h4>
              <p className="mt-2 text-zinc-400 tracking-wide leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
