// Pack: Templates (original) / Source: Original / License: MIT

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LandingTemplate } from "../templates/LandingTemplate";
import { DashboardTemplate } from "../templates/DashboardTemplate";
import { PortfolioTemplate } from "../templates/PortfolioTemplate";

const spring = { type: "spring" as const, stiffness: 200, damping: 24 };

const templates = [
  {
    id: "landing",
    title: "SaaS Landing Page",
    desc: "Product hero with staggered heading, feature grid, animated metrics, and floating gradient background.",
    Component: LandingTemplate,
  },
  {
    id: "dashboard",
    title: "App Dashboard",
    desc: "Collapsible sidebar, tab indicator with layoutId, animated bar chart, ticker cards, and activity feed.",
    Component: DashboardTemplate,
  },
  {
    id: "portfolio",
    title: "Creative Portfolio",
    desc: "Staggered name reveal, shared-element project grid, skill bars, scroll progress, and spring form fields.",
    Component: PortfolioTemplate,
  },
] as const;

export function TemplatesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = templates.find((t) => t.id === activeId);

  return (
    <section id="templates" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-rose-400 font-mono">
        12 — Site Templates
      </h2>
      <p className="text-zinc-400 mb-12 max-w-xl">
        Full-page templates that compose the shelf's components into real
        sites. Click preview to open each one full-screen.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {templates.map((t) => (
          <motion.div
            key={t.id}
            layoutId={`template-card-${t.id}`}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col cursor-default"
          >
            <h3 className="text-lg font-semibold mb-2">{t.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed flex-1">
              {t.desc}
            </p>
            <motion.button
              className="mt-5 self-start px-5 py-2 text-sm font-medium rounded-lg bg-zinc-800 border border-zinc-700 hover:border-zinc-500 transition-colors"
              onClick={() => setActiveId(t.id)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              Preview
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {activeId && active && (
          <motion.div
            key={activeId}
            className="fixed inset-0 z-[100] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Container */}
            <motion.div
              layoutId={`template-card-${activeId}`}
              className="relative z-10 flex-1 flex flex-col overflow-hidden"
              initial={{ scale: 0.92, borderRadius: 16 }}
              animate={{ scale: 1, borderRadius: 0 }}
              exit={{ scale: 0.92, borderRadius: 16 }}
              transition={spring}
            >
              {/* Close button */}
              <motion.button
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-zinc-900/80 backdrop-blur text-white flex items-center justify-center text-sm font-medium border border-zinc-700 hover:border-zinc-500 transition-colors"
                onClick={() => setActiveId(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                ✕
              </motion.button>

              {/* Template content */}
              <div className="flex-1 overflow-y-auto">
                <active.Component />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
