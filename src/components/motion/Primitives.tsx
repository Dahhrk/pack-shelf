// Pack: Motion (hand-written engine primitives)
// Source: Original — uses motion/react runtime
// License: MIT (this file)

import { motion, useScroll, useTransform, useSpring } from "motion/react";

const words = ["Staggered", "Text", "Animation", "With", "Motion"];

export function StaggeredText() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {words.map((word, i) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, type: "spring", stiffness: 120 }}
          className="text-4xl font-bold tracking-tight"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-emerald-400 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

export function SpringLoader() {
  const dots = [0, 1, 2];
  return (
    <div className="flex gap-3 items-center justify-center py-4">
      {dots.map((i) => (
        <motion.div
          key={i}
          className="w-4 h-4 rounded-full bg-emerald-400"
          animate={{ y: [0, -18, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.6,
            delay: i * 0.15,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        />
      ))}
    </div>
  );
}

const cards = [
  { id: "alpha", title: "Spring Physics", color: "from-violet-600 to-indigo-600" },
  { id: "beta", title: "Layout Animations", color: "from-emerald-600 to-teal-600" },
  { id: "gamma", title: "Gesture Handlers", color: "from-amber-600 to-orange-600" },
];

export function LayoutCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          layoutId={card.id}
          className={`bg-gradient-to-br ${card.color} rounded-xl p-6 cursor-pointer`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <h3 className="text-lg font-semibold text-white">{card.title}</h3>
          <p className="text-sm text-white/70 mt-1">layoutId: {card.id}</p>
        </motion.div>
      ))}
    </div>
  );
}

import { useState } from "react";
import { AnimatePresence } from "motion/react";

const menuItems = ["Dashboard", "Projects", "Components", "Settings"];

export function AnimatePresenceMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        className="px-5 py-2.5 bg-white rounded-lg font-medium border border-[#14161a]/15 hover:border-[#14161a]/30 transition-colors"
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.95 }}
      >
        {open ? "Close Menu" : "Open Menu"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mt-3 bg-white/90 backdrop-blur rounded-xl border border-[#14161a]/10 overflow-hidden"
          >
            {menuItems.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
                className="px-5 py-3 hover:bg-[#14161a]/5 cursor-pointer border-b border-[#14161a]/5 last:border-0 transition-colors"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ScrollLinkedCard() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  return (
    <motion.div
      className="w-28 h-28 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 mx-auto"
      style={{ rotate, scale }}
    />
  );
}
