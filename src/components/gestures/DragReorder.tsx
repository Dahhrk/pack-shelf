// Pack: Gestures (original) / Source: Original / License: MIT

import { useState, useRef } from "react";
import { motion } from "motion/react";

const initialItems = [
  { id: "a", label: "Spring Physics", icon: "⚡" },
  { id: "b", label: "Drag Gesture", icon: "👆" },
  { id: "c", label: "Layout Animate", icon: "📐" },
  { id: "d", label: "Scroll Link", icon: "🔗" },
  { id: "e", label: "Exit Presence", icon: "👋" },
];

export function DragReorder() {
  const [items, setItems] = useState(initialItems);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  function handleDragStart(index: number) {
    dragItem.current = index;
  }

  function handleDragOver(index: number) {
    if (dragOverItem.current === index) return;
    dragOverItem.current = index;

    const from = dragItem.current;
    if (from === null || from === index) return;

    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(index, 0, moved);
      return next;
    });
    dragItem.current = index;
  }

  function handleDragEnd() {
    dragItem.current = null;
    dragOverItem.current = null;
  }

  return (
    <div className="max-w-sm mx-auto space-y-2">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 cursor-grab active:cursor-grabbing select-none group"
          draggable
          onDragStart={() => handleDragStart(i)}
          onDragOver={(e) => {
            e.preventDefault();
            handleDragOver(i);
          }}
          onDragEnd={handleDragEnd}
          whileHover={{ scale: 1.02, borderColor: "rgba(113,113,122,0.5)" }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-lg shrink-0">{item.icon}</span>
          <span className="text-sm font-medium flex-1">{item.label}</span>
          <svg
            className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M4 8h16M4 16h16" />
          </svg>
        </motion.div>
      ))}
      <p className="text-[10px] text-zinc-600 text-center pt-2 font-mono">
        drag items to reorder
      </p>
    </div>
  );
}
