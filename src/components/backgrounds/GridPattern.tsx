// Pack: Backgrounds (original) / Source: Original / License: MIT

import { cn } from "../../lib/utils";

interface GridPatternProps {
  className?: string;
  cellSize?: number;
  strokeColor?: string;
}

const keyframes = `
  @keyframes gridPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
`;

export function GridPattern({
  className,
  cellSize = 40,
  strokeColor = "rgba(113, 113, 122, 0.25)",
}: GridPatternProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-zinc-950",
        className,
      )}
    >
      <style>{keyframes}</style>
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid-dashed"
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <line
              x1={cellSize}
              y1="0"
              x2={cellSize}
              y2={cellSize}
              stroke={strokeColor}
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
            <line
              x1="0"
              y1={cellSize}
              x2={cellSize}
              y2={cellSize}
              stroke={strokeColor}
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
          </pattern>
          <radialGradient id="grid-mask-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="grid-radial-mask">
            <rect width="100%" height="100%" fill="url(#grid-mask-grad)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#grid-dashed)"
          mask="url(#grid-radial-mask)"
          style={{ animation: "gridPulse 6s ease-in-out infinite" }}
        />
      </svg>
    </div>
  );
}
