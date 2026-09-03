// Pack: React Bits — Count Up
// Source: https://reactbits.dev/ts/text-animations/count-up
// License: MIT

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

interface CountUpProps {
  to: number;
  from?: number;
  className?: string;
  duration?: number;
}

export function CountUp({ to, from = 0, className, duration }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const damping = duration ? 80 / (duration / 1000) : 40;
  const springValue = useSpring(motionValue, { damping, stiffness: 100 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(to);
    }
  }, [motionValue, isInView, to]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Math.round(latest).toLocaleString();
        }
      }),
    [springValue],
  );

  return <span ref={ref} className={className} />;
}
