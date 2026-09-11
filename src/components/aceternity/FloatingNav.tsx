// Pack: Aceternity UI — Floating Navbar
// Source: https://ui.aceternity.com/components/floating-navbar
// GitHub: https://github.com/aceternity/aceternity-ui
// License: MIT

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "../../lib/utils";

export function FloatingNav({
  navItems,
  className,
}: {
  navItems: { name: string; link: string }[];
  className?: string;
}) {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const previous = scrollYProgress.getPrevious();
    if (typeof current === "number" && typeof previous === "number") {
      const direction = current - previous;
      if (current < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-stone-700 rounded-full bg-stone-900/80 backdrop-blur-md shadow-lg z-[5000] px-8 py-3 items-center justify-center space-x-4",
          className,
        )}
      >
        {navItems.map((item, idx) => (
          <a
            key={`nav-${idx}`}
            href={item.link}
            className="relative text-stone-400 hover:text-stone-100 text-sm transition-colors"
          >
            {item.name}
          </a>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
