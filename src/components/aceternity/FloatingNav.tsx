// Pack: Aceternity UI — Floating Navbar
// Source: https://ui.aceternity.com/components/floating-navbar
// GitHub: https://github.com/aceternity/aceternity-ui
// License: MIT

import { useState, useEffect } from "react";
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
  const [activeHash, setActiveHash] = useState("");

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

  useEffect(() => {
    const onHash = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-[#14161a]/15 rounded-full bg-white/80 backdrop-blur-md shadow-sm z-[5000] px-8 py-3 items-center justify-center space-x-4",
          className,
        )}
      >
        {navItems.map((item, idx) => {
          const isActive = activeHash === item.link;
          return (
            <a
              key={`nav-${idx}`}
              href={item.link}
              className={cn(
                "relative text-sm transition-colors",
                isActive
                  ? "text-[#d9772e] font-bold"
                  : "text-[#14161a]/60 hover:text-[#d9772e]",
              )}
            >
              {item.name}
            </a>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}
