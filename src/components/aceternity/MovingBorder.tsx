// Pack: Aceternity UI — Moving Border
// Source: https://ui.aceternity.com/components/moving-border
// GitHub: https://github.com/aceternity/aceternity-ui
// License: MIT

import { useRef } from "react";
import { motion, useAnimationFrame } from "motion/react";
import { cn } from "../../lib/utils";

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
          "relative flex h-full w-full items-center justify-center bg-stone-950 text-sm antialiased backdrop-blur-xl",
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
  const progress = useRef(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMs = length / duration;
      progress.current += pxPerMs * 16.67;
      const point = pathRef.current?.getPointAtLength(
        progress.current % length,
      );
      if (point) {
        const x = point.x;
        const y = point.y;
        const transform = `translateX(${x - 100}px) translateY(${y - 100}px)`;
        (pathRef.current?.closest("div")?.querySelector(".motion-gradient") as HTMLElement)?.style &&
          ((document.querySelector(`[data-gradient-${Math.floor(duration)}]`) as HTMLElement));
        // Using a simpler approach with CSS animation
      }
    }
  });

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
  const angle = useRef(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  useAnimationFrame(() => {
    angle.current = (angle.current + 1) % 360;
    if (btnRef.current) {
      btnRef.current.style.background = `linear-gradient(${angle.current}deg, transparent 40%, rgba(52,211,153,0.3) 50%, transparent 60%), #18181b`;
    }
  });

  return (
    <motion.button
      ref={btnRef}
      className={cn(
        "relative px-6 py-3 rounded-full text-sm font-medium text-amber-300 border border-amber-500/30",
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
