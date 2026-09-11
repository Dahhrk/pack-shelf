// Pack: Data Viz (original) / Source: Original / License: MIT

import { useEffect, useState } from "react";
import { motion } from "motion/react";

function generatePath(points: number[], width: number, height: number): string {
  if (points.length < 2) return "";
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);

  return points
    .map((p, i) => {
      const x = i * step;
      const y = height - ((p - min) / range) * (height * 0.8) - height * 0.1;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

const SPARKLINE_SETS: { label: string; data: number[]; color: string }[] = [
  {
    label: "Revenue",
    data: [4, 6, 5, 8, 12, 10, 14, 18, 16, 20, 22, 25],
    color: "#34d399",
  },
  {
    label: "Users",
    data: [20, 18, 22, 19, 24, 28, 26, 30, 32, 29, 35, 38],
    color: "#fbbf24",
  },
  {
    label: "Latency",
    data: [50, 48, 55, 60, 45, 42, 38, 40, 35, 32, 30, 28],
    color: "#f87171",
  },
  {
    label: "Uptime",
    data: [99.2, 99.5, 99.8, 99.1, 99.9, 99.7, 99.6, 99.9, 99.8, 99.5, 99.9, 99.9],
    color: "#60a5fa",
  },
];

function Sparkline({
  data,
  color,
  width = 120,
  height = 32,
}: {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  const [drawn, setDrawn] = useState(false);
  const path = generatePath(data, width, height);

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className="overflow-visible"
    >
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={drawn ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 30, damping: 20, duration: 1.5 }}
      />
    </svg>
  );
}

export function SparklineChart() {
  const [key, setKey] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400 font-mono">Inline sparklines</p>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="px-3 py-1.5 text-xs font-mono rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-colors"
        >
          Re-draw
        </button>
      </div>

      <div key={key} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SPARKLINE_SETS.map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wide">
                {s.label}
              </span>
              <span className="text-lg font-mono text-zinc-200">
                {s.data[s.data.length - 1]}
              </span>
            </div>
            <Sparkline data={s.data} color={s.color} />
          </div>
        ))}
      </div>
    </div>
  );
}
