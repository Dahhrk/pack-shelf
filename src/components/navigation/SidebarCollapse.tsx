// Pack: Navigation (original) / Source: Original / License: MIT

import { useState } from "react";
import { motion } from "motion/react";

const navItems = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
      </svg>
    ),
    label: "Dashboard",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    label: "Components",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Previews",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Settings",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Help",
  },
];

export function SidebarCollapse() {
  const [expanded, setExpanded] = useState(true);
  const [active, setActive] = useState(0);

  return (
    <div className="flex items-start gap-4 max-w-lg mx-auto">
      <motion.nav
        className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden flex flex-col shrink-0"
        animate={{ width: expanded ? 200 : 56 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      >
        {/* Toggle */}
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
        >
          <motion.svg
            className="w-5 h-5 text-zinc-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            animate={{ rotate: expanded ? 0 : 180 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </motion.svg>
          <motion.span
            className="text-sm font-medium text-zinc-400 whitespace-nowrap overflow-hidden"
            animate={{ opacity: expanded ? 1 : 0, width: expanded ? "auto" : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            Collapse
          </motion.span>
        </button>

        {/* Items */}
        <div className="py-1">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => setActive(i)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors relative ${
                active === i ? "text-emerald-400" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {active === i && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-x-1 inset-y-0.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="shrink-0 relative z-10">{item.icon}</span>
              <motion.span
                className="text-sm font-medium whitespace-nowrap overflow-hidden relative z-10"
                animate={{
                  opacity: expanded ? 1 : 0,
                  width: expanded ? "auto" : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {item.label}
              </motion.span>
            </button>
          ))}
        </div>
      </motion.nav>

      <div className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <h4 className="text-sm font-semibold text-zinc-200 mb-1">
            {navItems[active].label}
          </h4>
          <p className="text-xs text-zinc-500">
            Active section content for {navItems[active].label.toLowerCase()}.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
