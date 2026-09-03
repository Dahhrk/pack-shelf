// Pack: Magic UI — Ripple
// Source: https://magicui.design/docs/components/ripple
// GitHub: https://github.com/magicuidesign/magicui
// License: MIT

import { cn } from "../../lib/utils";

interface RippleProps {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  className?: string;
}

export function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
}: RippleProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-zinc-950/5 [mask-image:linear-gradient(to_bottom,white,transparent)]",
        className,
      )}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === 0 ? "solid" : "dashed";
        const borderOpacity = 5 + i * 5;

        return (
          <div
            key={i}
            className="absolute animate-ripple rounded-full border bg-emerald-400/25"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              borderStyle,
              borderWidth: "1px",
              borderColor: `hsl(160, 60%, 45%, ${borderOpacity / 100})`,
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
            }}
          />
        );
      })}
    </div>
  );
}
