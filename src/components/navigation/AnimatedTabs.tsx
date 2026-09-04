// Pack: Navigation (original) / Source: Original / License: MIT

import { useState } from "react";
import { motion } from "motion/react";

const tabs = [
  { id: "overview", label: "Overview", content: "Spring-based animations drive every transition. The runtime interpolates values using configurable stiffness, damping, and mass." },
  { id: "motion", label: "Motion", content: "Motion values flow through the component tree without re-renders. Transforms, opacity, and layout properties animate on the GPU." },
  { id: "gestures", label: "Gestures", content: "Drag, pan, tap, and hover gestures map directly to animation values. Velocity is preserved across gesture handoffs." },
  { id: "layout", label: "Layout", content: "Layout animations use FLIP to animate between measured DOM positions. Shared layoutId enables cross-component transitions." },
];

export function AnimatedTabs() {
  const [active, setActive] = useState(tabs[0].id);

  return (
    <div className="max-w-md mx-auto">
      <div className="flex gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800 relative">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className="relative flex-1 px-3 py-2 text-sm font-medium rounded-lg z-10 transition-colors"
            style={{ color: active === tab.id ? "#fafafa" : "#71717a" }}
          >
            {active === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 bg-zinc-800 rounded-lg border border-zinc-700"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        className="mt-4 p-5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-400 leading-relaxed"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {tabs.find((t) => t.id === active)?.content}
      </motion.div>
    </div>
  );
}
