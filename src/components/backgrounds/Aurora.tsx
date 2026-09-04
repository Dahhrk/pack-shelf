// Pack: Backgrounds (original) / Source: Original / License: MIT

import { motion } from "motion/react";
import { cn } from "../../lib/utils";

interface AuroraProps {
  className?: string;
}

const bands = [
  {
    colors: "from-emerald-500/30 via-teal-500/20 to-transparent",
    x: ["-20%", "30%", "-10%"],
    y: ["10%", "-20%", "10%"],
    rotate: [0, 15, -5, 0],
    duration: 18,
  },
  {
    colors: "from-teal-400/25 via-blue-500/20 to-transparent",
    x: ["20%", "-30%", "20%"],
    y: ["-10%", "20%", "-10%"],
    rotate: [0, -20, 10, 0],
    duration: 22,
  },
  {
    colors: "from-blue-500/25 via-violet-500/20 to-transparent",
    x: ["0%", "20%", "-20%", "0%"],
    y: ["20%", "-10%", "10%", "20%"],
    rotate: [0, 10, -15, 0],
    duration: 25,
  },
  {
    colors: "from-violet-500/20 via-emerald-400/15 to-transparent",
    x: ["-10%", "25%", "-15%", "-10%"],
    y: ["-15%", "15%", "-5%", "-15%"],
    rotate: [0, -10, 20, 0],
    duration: 20,
  },
];

export function Aurora({ className }: AuroraProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-zinc-950",
        className,
      )}
    >
      {bands.map((band, i) => (
        <motion.div
          key={i}
          className={cn(
            "absolute inset-0 bg-gradient-to-br blur-3xl",
            band.colors,
          )}
          style={{
            width: "140%",
            height: "140%",
            top: "-20%",
            left: "-20%",
          }}
          animate={{
            x: band.x,
            y: band.y,
            rotate: band.rotate,
          }}
          transition={{
            duration: band.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-zinc-950/40" />
    </div>
  );
}
