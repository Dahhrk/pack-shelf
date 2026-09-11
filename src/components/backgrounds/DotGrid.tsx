// Pack: Backgrounds (original) / Source: Original / License: MIT

import { useRef, useState, useCallback } from "react";
import { cn } from "../../lib/utils";

interface DotGridProps {
  className?: string;
  gap?: number;
  dotSize?: number;
  effectRadius?: number;
}

export function DotGrid({
  className,
  gap = 28,
  dotSize = 2,
  effectRadius = 120,
}: DotGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: -1000, y: -1000 });
  }, []);

  const cols = 32;
  const rows = 12;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full overflow-hidden bg-zinc-950",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${gap}px)`,
            gridTemplateRows: `repeat(${rows}, ${gap}px)`,
          }}
        >
          {Array.from({ length: cols * rows }, (_, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const dotX = col * gap + gap / 2;
            const dotY = row * gap + gap / 2;

            const offsetX = (cols * gap) / 2;
            const offsetY = (rows * gap) / 2;

            const containerEl = containerRef.current;
            let mx = mouse.x;
            let my = mouse.y;
            if (containerEl) {
              const rect = containerEl.getBoundingClientRect();
              mx = mouse.x - (rect.width / 2 - offsetX);
              my = mouse.y - (rect.height / 2 - offsetY);
            }

            const dx = dotX - mx;
            const dy = dotY - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const proximity = Math.max(0, 1 - dist / effectRadius);
            const scale = 1 + proximity * 2.5;
            const opacity = 0.15 + proximity * 0.85;

            return (
              <div
                key={i}
                className="flex items-center justify-center"
                style={{ width: gap, height: gap }}
              >
                <div
                  className="rounded-full bg-zinc-400"
                  style={{
                    width: dotSize * scale,
                    height: dotSize * scale,
                    opacity,
                    transition: "width 0.15s, height 0.15s, opacity 0.15s",
                    willChange: "width, height, opacity",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
