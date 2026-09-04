// Pack: Transitions (original) / Source: Original / License: MIT

import { useState } from "react";
import { motion } from "motion/react";

const CARDS = [
  { title: "Spring Physics", desc: "Physically-modeled spring dynamics with configurable stiffness and damping." },
  { title: "Layout Animations", desc: "Smooth morphing between different layout states using shared layout IDs." },
  { title: "Gesture System", desc: "Drag, hover, tap, and focus gesture handlers with animation integration." },
  { title: "Scroll Tracking", desc: "Viewport-aware animations that respond to scroll position in real-time." },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.6,
    },
  },
};

const headingVariant = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
};

const subVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 18, delay: 0.25 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 150, damping: 20 },
  },
};

export function StaggeredReveal() {
  const [key, setKey] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400 font-mono">Staggered content reveal</p>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="px-3 py-1.5 text-xs font-mono rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-colors"
        >
          Re-trigger
        </button>
      </div>

      <motion.div
        key={key}
        className="rounded-xl bg-zinc-900 border border-zinc-800 p-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h3
          variants={headingVariant}
          className="text-2xl font-bold text-zinc-100 mb-2"
        >
          Staggered Section
        </motion.h3>

        <motion.p
          variants={subVariant}
          className="text-sm text-zinc-400 mb-6 max-w-md"
        >
          Heading appears first, then subheading, followed by cards one after another — each with spring physics.
        </motion.p>

        <motion.div
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {CARDS.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariant}
              className="rounded-lg bg-zinc-800/60 border border-zinc-700/50 p-4"
            >
              <h4 className="text-sm font-bold text-zinc-200 mb-1">{card.title}</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
