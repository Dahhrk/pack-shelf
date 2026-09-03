// Pack: React Bits — Click Spark
// Source: https://reactbits.dev/ts/animations/click-spark
// License: MIT

import { useCallback, useRef, useEffect } from "react";

interface ClickSparkProps {
  children: React.ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkCount?: number;
  duration?: number;
}

export function ClickSpark({
  children,
  sparkColor = "#34d399",
  sparkSize = 10,
  sparkCount = 8,
  duration = 400,
}: ClickSparkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const spark = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const cx = x - rect.left;
      const cy = y - rect.top;

      const sparks = Array.from({ length: sparkCount }, () => ({
        x: cx,
        y: cy,
        angle: Math.random() * Math.PI * 2,
        velocity: Math.random() * 2 + 1,
        life: 1,
      }));

      let startTime: number | null = null;

      const draw = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const s of sparks) {
          const currentLife = 1 - progress;
          const dist = s.velocity * sparkSize * progress;

          ctx.beginPath();
          ctx.arc(
            s.x + Math.cos(s.angle) * dist,
            s.y + Math.sin(s.angle) * dist,
            Math.max(0, 2 * currentLife),
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = sparkColor;
          ctx.globalAlpha = currentLife;
          ctx.fill();
        }

        ctx.globalAlpha = 1;

        if (progress < 1) {
          requestAnimationFrame(draw);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      };

      requestAnimationFrame(draw);
    },
    [sparkColor, sparkSize, sparkCount, duration],
  );

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resizeCanvas();

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    spark(e.clientX, e.clientY);
  };

  return (
    <div ref={containerRef} onClick={handleClick} className="relative">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-50"
      />
      {children}
    </div>
  );
}
