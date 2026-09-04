// Pack: Backgrounds (original) / Source: Original / License: MIT

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

interface SpotlightProps {
  className?: string;
  size?: number;
}

export function Spotlight({ className, size = 300 }: SpotlightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    [],
  );

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-zinc-950",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          x: position.x - size / 2,
          y: position.y - size / 2,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
          opacity: { duration: 0.3 },
        }}
        style={{
          width: size,
          height: size,
          background:
            "radial-gradient(circle, rgba(161, 161, 170, 0.12) 0%, rgba(161, 161, 170, 0.05) 35%, transparent 70%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <p className="text-sm text-zinc-600 select-none">
          {isHovered ? "" : "Hover to reveal"}
        </p>
      </div>

      <motion.div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: position.x - size * 0.15,
          y: position.y - size * 0.15,
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 25,
          opacity: { duration: 0.4 },
        }}
        style={{
          width: size * 0.3,
          height: size * 0.3,
          background:
            "radial-gradient(circle, rgba(200, 200, 210, 0.15) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}
