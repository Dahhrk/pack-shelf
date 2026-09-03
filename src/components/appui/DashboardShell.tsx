// Specimen: Dashboard Shell
// Libraries: Motion (MIT), Radix UI (MIT), Lucide React (ISC)
// Source: Original — built for pack-shelf app-UI specimens
// License: MIT (this file)

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  BarChart3,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "clients", label: "Clients", icon: Users },
  { id: "invoices", label: "Invoices", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

type PageId = (typeof sidebarItems)[number]["id"];

const pageContent: Record<PageId, { title: string; description: string; stats: { label: string; value: string }[] }> = {
  overview: {
    title: "Project Overview",
    description: "Track active projects, deadlines, and deliverables across all client engagements.",
    stats: [
      { label: "Active Projects", value: "12" },
      { label: "Pending Invoices", value: "4" },
      { label: "This Month Revenue", value: "$18,240" },
      { label: "Hours Logged", value: "164" },
    ],
  },
  analytics: {
    title: "Analytics",
    description: "Revenue trends, utilization rate, and project completion metrics.",
    stats: [
      { label: "Avg. Project Value", value: "$3,800" },
      { label: "Utilization Rate", value: "78%" },
      { label: "Repeat Clients", value: "63%" },
      { label: "On-Time Delivery", value: "94%" },
    ],
  },
  clients: {
    title: "Client Directory",
    description: "Manage contacts, project history, and communication preferences.",
    stats: [
      { label: "Total Clients", value: "34" },
      { label: "Active", value: "8" },
      { label: "Lifetime Value", value: "$142K" },
      { label: "Avg. Engagement", value: "4.2 mo" },
    ],
  },
  invoices: {
    title: "Invoices",
    description: "Create, send, and track payment status for all invoices.",
    stats: [
      { label: "Outstanding", value: "$7,200" },
      { label: "Paid This Month", value: "$11,040" },
      { label: "Overdue", value: "1" },
      { label: "Draft", value: "2" },
    ],
  },
  settings: {
    title: "Settings",
    description: "Configure workspace preferences, integrations, and billing details.",
    stats: [
      { label: "Team Members", value: "1" },
      { label: "Integrations", value: "3" },
      { label: "Storage Used", value: "2.1 GB" },
      { label: "Plan", value: "Pro" },
    ],
  },
};

function Breadcrumb({ page }: { page: PageId }) {
  const item = sidebarItems.find((i) => i.id === page)!;
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-zinc-400 mb-6">
      <span>Workspace</span>
      <ChevronRight className="w-3.5 h-3.5" />
      <span className="text-zinc-200">{item.label}</span>
    </nav>
  );
}

export function DashboardShell() {
  const [activePage, setActivePage] = useState<PageId>("overview");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const navigate = useCallback((page: PageId) => {
    setActivePage(page);
    setDrawerOpen(false);
  }, []);

  const content = pageContent[activePage];
  const anim = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 300, damping: 30 };

  const sidebarContent = (
    <ul className="space-y-1" role="navigation" aria-label="Main navigation">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const active = activePage === item.id;
        return (
          <li key={item.id}>
            <button
              onClick={() => navigate(item.id)}
              className={`focus-ring w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="flex min-h-[480px]">
        {/* Desktop sidebar */}
        {!isMobile && (
          <aside className="w-56 border-r border-zinc-800 p-4 shrink-0 hidden sm:block">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
              Navigation
            </div>
            {sidebarContent}
          </aside>
        )}

        {/* Mobile drawer */}
        <AnimatePresence>
          {isMobile && drawerOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/60 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDrawerOpen(false)}
              />
              <motion.aside
                className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-900 border-r border-zinc-800 p-4 z-50"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={anim}
                drag="x"
                dragConstraints={{ left: -264, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) setDrawerOpen(false);
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    Navigation
                  </span>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="focus-ring p-1 rounded text-zinc-400 hover:text-zinc-200"
                    aria-label="Close navigation"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {sidebarContent}
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 p-6">
          {isMobile && (
            <button
              onClick={() => setDrawerOpen(true)}
              className="focus-ring mb-4 p-2 rounded-lg border border-zinc-700 text-zinc-400 hover:text-zinc-200 sm:hidden"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <Breadcrumb page={activePage} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -12 }}
              transition={anim}
            >
              <h3 className="text-2xl font-bold mb-1">{content.title}</h3>
              <p className="text-zinc-400 text-sm mb-8">{content.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {content.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="rounded-lg border border-zinc-800 bg-zinc-950 p-4"
                    initial={reduced ? false : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={reduced ? { duration: 0 } : { delay: i * 0.06 }}
                  >
                    <div className="text-xs text-zinc-500 mb-1">{stat.label}</div>
                    <div className="text-xl font-bold">{stat.value}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
