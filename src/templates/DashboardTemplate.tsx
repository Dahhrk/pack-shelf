// Pack: Templates (original) / Source: Original / License: MIT

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useMotionValue, useSpring } from "motion/react";

const spring = { type: "spring" as const, stiffness: 200, damping: 24 };

const navItems = [
  { icon: "◻", label: "Overview" },
  { icon: "◈", label: "Analytics" },
  { icon: "◇", label: "Projects" },
  { icon: "△", label: "Team" },
  { icon: "○", label: "Settings" },
];

const tabs = ["Overview", "Analytics", "Reports", "Settings"];

const metricCards = [
  { label: "Revenue", value: 48250, prefix: "$", change: "+12.5%" },
  { label: "Users", value: 3842, prefix: "", change: "+8.2%" },
  { label: "Orders", value: 1284, prefix: "", change: "+23.1%" },
  { label: "Conversion", value: 3.6, prefix: "", suffix: "%", change: "+1.2%" },
];

const barData = [
  { label: "Mon", value: 65 },
  { label: "Tue", value: 82 },
  { label: "Wed", value: 45 },
  { label: "Thu", value: 90 },
  { label: "Fri", value: 72 },
  { label: "Sat", value: 55 },
  { label: "Sun", value: 38 },
];

const activityItems = [
  { user: "Ava Chen", action: "deployed v2.4.1 to production", time: "2m ago", dot: "#10b981" },
  { user: "Marcus Li", action: "merged PR #247 — auth refactor", time: "18m ago", dot: "#f59e0b" },
  { user: "Sara Kim", action: "opened issue: dashboard latency", time: "1h ago", dot: "#ef4444" },
  { user: "Tomás Ruiz", action: "completed sprint review", time: "3h ago", dot: "#6366f1" },
  { user: "Nadia Patel", action: "updated billing integration", time: "5h ago", dot: "#10b981" },
];

function TickerValue({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 90 });

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          const isDecimal = value % 1 !== 0;
          const formatted = isDecimal
            ? latest.toFixed(1)
            : Math.round(latest).toLocaleString();
          ref.current.textContent = prefix + formatted + suffix;
        }
      }),
    [springValue, prefix, suffix, value],
  );

  return <span ref={ref} className="tabular-nums" />;
}

export function DashboardTemplate() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [showEmpty, setShowEmpty] = useState(false);

  return (
    <div
      className="min-h-screen bg-[#f5f5f4] text-zinc-900 flex"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Sidebar */}
      <motion.aside
        className="h-screen sticky top-0 bg-white border-r border-zinc-200 flex flex-col overflow-hidden"
        animate={{ width: collapsed ? 64 : 220 }}
        transition={spring}
      >
        <div className="p-4 flex items-center gap-3 border-b border-zinc-100">
          <motion.button
            className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0"
            whileTap={{ scale: 0.9 }}
            onClick={() => setCollapsed(!collapsed)}
          >
            L
          </motion.button>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="text-sm font-semibold whitespace-nowrap"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
              >
                Launchpad
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 py-3 space-y-0.5 px-2">
          {navItems.map((item) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 cursor-pointer transition-colors"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <span className="w-5 text-center flex-shrink-0 text-base">
                {item.icon}
              </span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    className="whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </nav>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-zinc-200 px-6 py-3 flex items-center justify-between">
          <div className="flex gap-1 relative">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-4 py-2 text-sm font-medium z-10"
                style={{
                  color: activeTab === tab ? "#18181b" : "#71717a",
                }}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="dashboard-tab-indicator"
                    className="absolute inset-0 bg-zinc-100 rounded-lg"
                    style={{ zIndex: -1 }}
                    transition={spring}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowEmpty(!showEmpty)}
            className="text-xs px-3 py-1.5 rounded-md border border-zinc-200 text-zinc-500 hover:border-zinc-400 transition-colors"
          >
            {showEmpty ? "Show data" : "Empty state"}
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Metric cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metricCards.map((card, i) => (
              <motion.div
                key={card.label}
                className="bg-white rounded-xl border border-zinc-200 p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: i * 0.06 }}
              >
                <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                  {card.label}
                </div>
                <div className="mt-2 text-2xl font-bold">
                  <AnimatePresence mode="wait">
                    {showEmpty ? (
                      <motion.span
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-zinc-300"
                      >
                        —
                      </motion.span>
                    ) : (
                      <motion.span
                        key="value"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <TickerValue
                          value={card.value}
                          prefix={card.prefix}
                          suffix={card.suffix}
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                {!showEmpty && (
                  <motion.div
                    className="mt-1 text-xs text-emerald-600 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.06 }}
                  >
                    {card.change}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Chart + Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Bar chart */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-zinc-200 p-5">
              <h3 className="text-sm font-semibold mb-6">Weekly traffic</h3>
              <AnimatePresence mode="wait">
                {showEmpty ? (
                  <motion.div
                    key="chart-empty"
                    className="h-48 flex items-center justify-center text-zinc-300 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    No data for this period
                  </motion.div>
                ) : (
                  <motion.div
                    key="chart-data"
                    className="flex items-end gap-3 h-48"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {barData.map((bar, i) => (
                      <div
                        key={bar.label}
                        className="flex-1 flex flex-col items-center gap-2"
                      >
                        <motion.div
                          className="w-full rounded-t-md bg-zinc-900"
                          initial={{ height: 0 }}
                          animate={{ height: `${(bar.value / 100) * 160}px` }}
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 16,
                            delay: i * 0.06,
                          }}
                        />
                        <span className="text-[10px] text-zinc-400">
                          {bar.label}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Activity feed */}
            <div className="bg-white rounded-xl border border-zinc-200 p-5">
              <h3 className="text-sm font-semibold mb-4">Activity</h3>
              <AnimatePresence mode="wait">
                {showEmpty ? (
                  <motion.div
                    key="activity-empty"
                    className="h-48 flex items-center justify-center text-zinc-300 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    No recent activity
                  </motion.div>
                ) : (
                  <motion.div
                    key="activity-data"
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {activityItems.map((item, i) => (
                      <motion.div
                        key={item.user + item.time}
                        className="flex gap-3 items-start"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                      >
                        <div
                          className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: item.dot }}
                        />
                        <div className="min-w-0">
                          <p className="text-xs leading-relaxed">
                            <span className="font-semibold">{item.user}</span>{" "}
                            <span className="text-zinc-500">{item.action}</span>
                          </p>
                          <p className="text-[10px] text-zinc-400 mt-0.5">
                            {item.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
