// Specimen: Empty States (first-run, no-results, error, permission)
// Libraries: Motion (MIT), Lucide React (ISC)
// Source: Original — built for pack-shelf app-UI specimens
// License: MIT (this file)

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import {
  Rocket,
  SearchX,
  AlertTriangle,
  ShieldX,
  ArrowRight,
  RotateCcw,
  Mail,
} from "lucide-react";

type EmptyType = "first-run" | "no-results" | "error" | "permission";

const states: { id: EmptyType; label: string }[] = [
  { id: "first-run", label: "First Run" },
  { id: "no-results", label: "No Results" },
  { id: "error", label: "Error" },
  { id: "permission", label: "Permission" },
];

function FirstRun({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-center text-center py-12 px-6"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6"
        animate={reduced ? {} : { scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <Rocket className="w-8 h-8 text-emerald-400" />
      </motion.div>
      <h4 className="text-xl font-bold mb-2">Welcome to your workspace</h4>
      <p className="text-zinc-400 text-sm max-w-sm mb-6">
        Create your first project to start tracking time, managing clients, and sending invoices.
      </p>
      <button className="focus-ring flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-sm font-medium text-white hover:bg-emerald-500 transition-colors">
        Create First Project <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

function NoResults({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-center text-center py-12 px-6"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
        <SearchX className="w-8 h-8 text-amber-400" />
      </div>
      <h4 className="text-xl font-bold mb-2">No results found</h4>
      <p className="text-zinc-400 text-sm max-w-sm mb-6">
        We could not find any invoices matching &ldquo;quarterly retainer&rdquo;. Try adjusting your search or filters.
      </p>
      <button className="focus-ring flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors">
        <RotateCcw className="w-4 h-4" /> Clear Filters
      </button>
    </motion.div>
  );
}

function ErrorState({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-center text-center py-12 px-6"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-6"
        animate={reduced ? {} : { rotate: [0, -4, 4, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
      >
        <AlertTriangle className="w-8 h-8 text-rose-400" />
      </motion.div>
      <h4 className="text-xl font-bold mb-2">Something went wrong</h4>
      <p className="text-zinc-400 text-sm max-w-sm mb-6">
        We could not load your project data. This is usually temporary — try refreshing, or contact support if it persists.
      </p>
      <div className="flex gap-3">
        <button className="focus-ring flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors">
          <RotateCcw className="w-4 h-4" /> Retry
        </button>
        <button className="focus-ring flex items-center gap-2 px-5 py-2.5 rounded-lg bg-rose-600 text-sm text-white hover:bg-rose-500 transition-colors">
          <Mail className="w-4 h-4" /> Contact Support
        </button>
      </div>
    </motion.div>
  );
}

function PermissionState({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-center text-center py-12 px-6"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-6">
        <ShieldX className="w-8 h-8 text-violet-400" />
      </div>
      <h4 className="text-xl font-bold mb-2">Access restricted</h4>
      <p className="text-zinc-400 text-sm max-w-sm mb-6">
        You do not have permission to view billing settings. Ask a workspace admin to grant access, or switch to a workspace you own.
      </p>
      <button className="focus-ring flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors">
        <Mail className="w-4 h-4" /> Request Access
      </button>
    </motion.div>
  );
}

export function EmptyStates() {
  const [active, setActive] = useState<EmptyType>("first-run");
  const reduced = useReducedMotion();

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap" role="tablist" aria-label="Empty state variants">
        {states.map((state) => (
          <button
            key={state.id}
            role="tab"
            aria-selected={active === state.id}
            onClick={() => setActive(state.id)}
            className={`focus-ring px-3 py-1.5 rounded-lg text-sm transition-colors ${
              active === state.id
                ? "bg-zinc-800 text-zinc-100 border border-zinc-700"
                : "text-zinc-500 hover:text-zinc-300 border border-transparent"
            }`}
          >
            {state.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
        <AnimatePresence mode="wait">
          {active === "first-run" && <FirstRun key="first-run" reduced={reduced} />}
          {active === "no-results" && <NoResults key="no-results" reduced={reduced} />}
          {active === "error" && <ErrorState key="error" reduced={reduced} />}
          {active === "permission" && <PermissionState key="permission" reduced={reduced} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
