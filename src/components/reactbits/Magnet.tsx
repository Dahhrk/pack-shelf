// Pack: React Bits — Magnet
// Source: https://reactbits.dev/ts/animations/magnet
// License: MIT

import { useRef, useState, useCallback } from "react";
import { motion } from "motion/react";

interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  padding?: number;
  disabled?: boolean;
}

export function Magnet({
  children,
  className,
  padding = 60,
  disabled = false,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !ref.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } =
        ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
    },
    [disabled],
  );

  const reset = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ padding }}
    >
      {children}
    </motion.div>
  );
}
