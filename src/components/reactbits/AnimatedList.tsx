// Pack: React Bits — Animated List
// Source: https://reactbits.dev/ts/animations/animated-list
// License: MIT

import { AnimatePresence, motion } from "motion/react";

interface AnimatedListProps {
  items: React.ReactNode[];
  className?: string;
}

export function AnimatedList({ items, className }: AnimatedListProps) {
  return (
    <div className={className}>
      <AnimatePresence initial={false}>
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0, scale: 0.8 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 40,
              opacity: { duration: 0.2 },
            }}
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
