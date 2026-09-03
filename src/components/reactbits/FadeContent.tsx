// Pack: React Bits — Fade Content
// Source: https://reactbits.dev/ts/animations/fade-content
// License: MIT

import { motion } from "motion/react";

interface FadeContentProps {
  children: React.ReactNode;
  className?: string;
  blur?: boolean;
  duration?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function FadeContent({
  children,
  className,
  blur = true,
  duration = 0.5,
  delay = 0,
  direction = "up",
}: FadeContentProps) {
  const offsets = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: -24 },
    right: { x: 24 },
  };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        filter: blur ? "blur(10px)" : "blur(0px)",
        ...offsets[direction],
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        x: 0,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
