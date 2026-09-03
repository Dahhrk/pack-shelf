// Specimen: Interaction Patterns
// Demonstrates: shared layout transitions, list reorder with drag,
// skeleton-to-content swap, scroll-linked progress, keyboard focus rings
// Libraries: Motion (MIT), Lucide React (ISC)
// Source: Original — built for pack-shelf app-UI specimens
// License: MIT (this file)

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, Reorder, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { GripVertical, Loader2 } from "lucide-react";

/* ── Shared Layout Transition ── */

const layoutItems = [
  { id: "inbox", label: "Inbox", count: 12 },
  { id: "sent", label: "Sent", count: 48 },
  { id: "drafts", label: "Drafts", count: 3 },
];

export function SharedLayoutTransition() {
  const [activeTab, setActiveTab] = useState("inbox");
  const reduced = useReducedMotion();

  return (
    <div>
      <div className="flex gap-1 p-1 rounded-lg bg-stone-800 w-fit" role="tablist">
        {layoutItems.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
            className="focus-ring relative px-4 py-2 rounded-md text-sm transition-colors z-10"
          >
            {activeTab === item.id && (
              <motion.div
                layoutId="active-tab-bg"
                className="absolute inset-0 bg-stone-700 rounded-md"
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }}
                style={{ zIndex: -1 }}
              />
            )}
            <span className={activeTab === item.id ? "text-stone-100" : "text-stone-400"}>
              {item.label}
            </span>
            <span className={`ml-2 text-xs ${activeTab === item.id ? "text-amber-400" : "text-stone-600"}`}>
              {item.count}
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="mt-4 p-4 rounded-lg border border-stone-800 bg-stone-900 text-sm text-stone-400"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {activeTab === "inbox" && "12 unread messages from 5 clients — newest from Dana Chen about the Q3 proposal."}
          {activeTab === "sent" && "48 messages sent this month. Last message to Globex Corp regarding milestone payment."}
          {activeTab === "drafts" && "3 draft messages: follow-up on website feedback, invoice reminder, project kickoff."}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── List Reorder with Drag ── */

const initialTasks = [
  { id: "task-1", text: "Review brand guidelines from client", priority: "high" },
  { id: "task-2", text: "Set up staging environment", priority: "medium" },
  { id: "task-3", text: "Design mobile navigation prototype", priority: "high" },
  { id: "task-4", text: "Write project retrospective", priority: "low" },
  { id: "task-5", text: "Update invoice template", priority: "medium" },
];

const priorityColor: Record<string, string> = {
  high: "bg-rose-500",
  medium: "bg-amber-500",
  low: "bg-stone-600",
};

export function DragReorderList() {
  const [items, setItems] = useState(initialTasks);
  const reduced = useReducedMotion();

  return (
    <div>
      <p className="text-xs text-stone-500 mb-3">Drag to reorder tasks</p>
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        className="space-y-2"
      >
        {items.map((item) => (
          <Reorder.Item
            key={item.id}
            value={item}
            className="flex items-center gap-3 p-3 rounded-lg bg-stone-800 border border-stone-800 cursor-grab active:cursor-grabbing select-none"
            whileDrag={{ scale: 1.02, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
            layout={!reduced ? "position" : undefined}
          >
            <GripVertical className="w-4 h-4 text-stone-600 shrink-0" />
            <span className={`w-2 h-2 rounded-full ${priorityColor[item.priority]} shrink-0`} />
            <span className="text-sm text-stone-300 flex-1">{item.text}</span>
            <span className="text-[10px] text-stone-600 capitalize font-mono">{item.priority}</span>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}

/* ── Skeleton to Content Swap ── */

function SkeletonLine({ w }: { w: string }) {
  return <div className={`h-3 rounded bg-stone-800 animate-pulse ${w}`} />;
}

interface CardData {
  name: string;
  role: string;
  revenue: string;
}

const cardData: CardData[] = [
  { name: "Acme Corp", role: "Brand identity", revenue: "$12,400" },
  { name: "Globex Inc", role: "Web development", revenue: "$28,600" },
  { name: "Initech", role: "UI/UX consulting", revenue: "$8,200" },
];

export function SkeletonSwap() {
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();

  const handleToggle = useCallback(() => {
    setLoaded(false);
    setTimeout(() => setLoaded(true), 1500);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <button
        onClick={handleToggle}
        className="focus-ring mb-4 flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-700 text-xs text-stone-400 hover:text-stone-200 transition-colors"
      >
        <Loader2 className={`w-3.5 h-3.5 ${!loaded ? "animate-spin" : ""}`} />
        {loaded ? "Reload" : "Loading…"}
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(loaded ? cardData : Array(3).fill(null)).map((card, i) => (
          <motion.div
            key={loaded ? card!.name : `skeleton-${i}`}
            className="p-4 rounded-lg border border-stone-800 bg-stone-900"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: loaded ? i * 0.1 : 0 }}
          >
            {card ? (
              <>
                <div className="text-sm font-semibold text-stone-200">{card.name}</div>
                <div className="text-xs text-stone-500 mt-0.5">{card.role}</div>
                <div className="text-lg font-bold text-amber-400 mt-2">{card.revenue}</div>
              </>
            ) : (
              <div className="space-y-2.5">
                <SkeletonLine w="w-3/4" />
                <SkeletonLine w="w-1/2" />
                <SkeletonLine w="w-1/3" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Scroll-Linked Progress (section-scoped) ── */

export function ScrollLinkedSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div>
      <p className="text-xs text-stone-500 mb-3">Scroll the container below</p>
      <div className="rounded-xl border border-stone-800 bg-stone-900 overflow-hidden">
        <div className="h-1 bg-stone-800 relative">
          <motion.div className="h-full bg-amber-500 absolute left-0 top-0" style={{ width }} />
        </div>
        <div ref={containerRef} className="max-h-[200px] overflow-auto p-4 space-y-4">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="p-3 rounded-lg bg-stone-800 border border-stone-800">
              <div className="text-sm text-stone-300">Task #{i + 1}: {[
                "Set up project repository",
                "Define color tokens",
                "Build navigation component",
                "Implement auth flow",
                "Design email templates",
                "Configure CI pipeline",
                "Write API documentation",
                "Create onboarding screens",
                "Add analytics events",
                "Performance audit",
                "Accessibility review",
                "Ship to production",
              ][i]}</div>
              <div className="text-xs text-stone-600 mt-1">Estimated: {(i + 1) * 2}h</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
