// Pack: Gestures (original) / Source: Original / License: MIT

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "motion/react";

const feedItems = [
  { id: 1, text: "Spring physics landed", time: "2m ago" },
  { id: 2, text: "Gesture system updated", time: "5m ago" },
  { id: 3, text: "Layout animations v2", time: "12m ago" },
  { id: 4, text: "Scroll-linked transforms", time: "1h ago" },
];

export function PullToRefresh() {
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState(feedItems);
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const indicatorOpacity = useTransform(springY, [0, 60], [0, 1]);
  const indicatorRotate = useTransform(springY, [0, 80], [0, 360]);
  const threshold = 70;

  function handleDragEnd() {
    if (y.get() > threshold && !refreshing) {
      setRefreshing(true);
      setTimeout(() => {
        setItems((prev) => [
          {
            id: Date.now(),
            text: "New update arrived!",
            time: "just now",
          },
          ...prev.slice(0, 3),
        ]);
        setRefreshing(false);
      }, 1200);
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden relative">
        {/* Refresh indicator */}
        <motion.div
          className="flex items-center justify-center py-3"
          style={{ opacity: indicatorOpacity }}
        >
          {refreshing ? (
            <motion.div
              className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
            />
          ) : (
            <motion.div style={{ rotate: indicatorRotate }}>
              <svg
                className="w-5 h-5 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M4 4v5h5M20 20v-5h-5" />
                <path d="M20.49 9A9 9 0 005.64 5.64L4 4m16 16l-1.64-1.64A9 9 0 019 20.49" />
              </svg>
            </motion.div>
          )}
        </motion.div>

        {/* Draggable content */}
        <motion.div
          className="cursor-grab active:cursor-grabbing"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.5}
          style={{ y: springY }}
          onDrag={(_e, info) => y.set(Math.max(0, info.offset.y))}
          onDragEnd={() => {
            handleDragEnd();
            y.set(0);
          }}
        >
          <div className="divide-y divide-zinc-800">
            {items.map((item) => (
              <div key={item.id} className="px-4 py-3 flex items-center justify-between">
                <span className="text-sm">{item.text}</span>
                <span className="text-xs text-zinc-500 shrink-0 ml-3">{item.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <p className="text-[10px] text-zinc-600 text-center mt-3 font-mono">
        pull down to refresh
      </p>
    </div>
  );
}
