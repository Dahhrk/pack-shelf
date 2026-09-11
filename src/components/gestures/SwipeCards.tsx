// Pack: Gestures (original) / Source: Original / License: MIT

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const initialCards = [
  { id: 1, title: "Spring Physics", desc: "Natural motion curves", color: "from-violet-600 to-indigo-500" },
  { id: 2, title: "Drag Gesture", desc: "Touch-driven interaction", color: "from-emerald-600 to-teal-500" },
  { id: 3, title: "Layout Animate", desc: "Shared element transitions", color: "from-amber-600 to-orange-500" },
  { id: 4, title: "Presence", desc: "Enter & exit animations", color: "from-rose-600 to-pink-500" },
  { id: 5, title: "Scroll Link", desc: "Progress-driven transforms", color: "from-sky-600 to-cyan-500" },
];

export function SwipeCards() {
  const [cards, setCards] = useState(initialCards);

  function removeTop(direction: number) {
    setCards((prev) => prev.slice(1));
  }

  function reset() {
    setCards(initialCards);
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-72 h-44">
        <AnimatePresence>
          {cards.map((card, i) => (
            <SwipeCard
              key={card.id}
              card={card}
              index={i}
              total={cards.length}
              onSwipe={removeTop}
            />
          ))}
        </AnimatePresence>

        {cards.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-sm">
            Stack empty
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-zinc-500 font-mono">{cards.length} remaining</span>
        {cards.length < initialCards.length && (
          <button
            onClick={reset}
            className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-zinc-500 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

function SwipeCard({
  card,
  index,
  total,
  onSwipe,
}: {
  card: (typeof initialCards)[number];
  index: number;
  total: number;
  onSwipe: (dir: number) => void;
}) {
  const isTop = index === total - 1;

  return (
    <motion.div
      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} p-6 flex flex-col justify-end cursor-grab active:cursor-grabbing select-none`}
      style={{
        zIndex: index,
        transformOrigin: "bottom center",
      }}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{
        scale: 1 - (total - 1 - index) * 0.05,
        y: -(total - 1 - index) * 8,
        opacity: 1,
      }}
      exit={isTop ? {
        x: 300,
        opacity: 0,
        rotate: 20,
        transition: { type: "spring" as const, stiffness: 200, damping: 20 },
      } : { opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={(_e, info) => {
        if (Math.abs(info.offset.x) > 100) {
          onSwipe(info.offset.x > 0 ? 1 : -1);
        }
      }}
      whileDrag={{ rotate: 0 }}
    >
      <h4 className="text-xl font-bold text-white">{card.title}</h4>
      <p className="text-sm text-white/70 mt-1">{card.desc}</p>
      {isTop && (
        <p className="text-[10px] text-white/40 mt-3 font-mono">← swipe to dismiss →</p>
      )}
    </motion.div>
  );
}
