// Pack: Aceternity UI — Moving Border
// Source: https://ui.aceternity.com/components/moving-border
// GitHub: https://github.com/aceternity/aceternity-ui
// License: MIT

import { useRef } from "react";
import { motion, useAnimationFrame } from "motion/react";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function MovingBorder({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  as: Component = "div",
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: React.ElementType;
}) {
  return (
    <Component
      className={cn(
        "relative h-16 w-48 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName,
      )}
      style={{ borderRadius: "999px" }}
    >
      <div className="absolute inset-0" style={{ borderRadius: "999px" }}>
        <MovingGradient duration={duration} borderClassName={borderClassName} />
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center bg-white text-sm antialiased backdrop-blur-xl",
          className,
        )}
        style={{ borderRadius: "999px" }}
      >
        {children}
      </div>
    </Component>
  );
}

function MovingGradient({
  duration = 2000,
  borderClassName,
}: {
  duration?: number;
  borderClassName?: string;
}) {
  const pathRef = useRef<SVGRectElement>(null);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="absolute h-full w-full"
      width="100%"
      height="100%"
    >
      <rect
        fill="none"
        width="100%"
        height="100%"
        rx="999"
        ry="999"
        ref={pathRef}
      />
    </svg>
  );
}

export function MovingBorderButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const angle = useRef(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  useAnimationFrame(() => {
    if (reduced) return;
    angle.current = (angle.current + 1) % 360;
    if (btnRef.current) {
      btnRef.current.style.background = `linear-gradient(${angle.current}deg, transparent 40%, rgba(139,92,246,0.2) 50%, transparent 60%), #ffffff`;
    }
  });

  return (
    <motion.button
      ref={btnRef}
      className={cn(
        "relative px-6 py-3 rounded-full text-sm font-medium text-violet-700 border border-violet-400/30",
        className,
      )}
      style={reduced ? { background: "#ffffff" } : undefined}
      whileHover={reduced ? undefined : { scale: 1.05 }}
      whileTap={reduced ? undefined : { scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
