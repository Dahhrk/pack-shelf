// Pack: Data Viz (original) / Source: Original / License: MIT

import { useState, useCallback } from "react";
import { motion } from "motion/react";

interface Segment {
  label: string;
  value: number;
  color: string;
}

const INITIAL_DATA: Segment[] = [
  { label: "React", value: 42, color: "#34d399" },
  { label: "Vue", value: 24, color: "#fbbf24" },
  { label: "Svelte", value: 18, color: "#f87171" },
  { label: "Angular", value: 16, color: "#60a5fa" },
];

function randomSegments(): Segment[] {
  const raw = INITIAL_DATA.map((s) => ({
    ...s,
    value: Math.round(Math.random() * 40 + 5),
  }));
  const total = raw.reduce((s, r) => s + r.value, 0);
  return raw.map((r) => ({ ...r, value: Math.round((r.value / total) * 100) }));
}

function normalizeData(data: Segment[]): Segment[] {
  const total = data.reduce((s, d) => s + d.value, 0);
  return data.map((d) => ({ ...d, value: Math.round((d.value / total) * 100) }));
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const gap = 0.02;
  const sa = startAngle + gap;
  const ea = endAngle - gap;
  if (ea <= sa) return "";

  const start = polarToCartesian(cx, cy, r, ea);
  const end = polarToCartesian(cx, cy, r, sa);
  const largeArc = ea - sa > Math.PI ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

export function DonutChart() {
  const [data, setData] = useState<Segment[]>(() => normalizeData(INITIAL_DATA));
  const [key, setKey] = useState(0);

  const randomize = useCallback(() => {
    setData(randomSegments());
    setKey((k) => k + 1);
  }, []);

  const total = data.reduce((s, d) => s + d.value, 0);
  const cx = 100;
  const cy = 100;
  const r = 70;
  const strokeWidth = 22;

  let cumulative = -Math.PI / 2;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400 font-mono">Donut chart segments</p>
        <button
          onClick={randomize}
          className="px-3 py-1.5 text-xs font-mono rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-colors"
        >
          Randomize
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="relative" key={key}>
          <svg width={200} height={200} viewBox="0 0 200 200">
            {data.map((segment) => {
              const angle = (segment.value / total) * Math.PI * 2;
              const startAngle = cumulative;
              cumulative += angle;
              const path = describeArc(cx, cy, r, startAngle, startAngle + angle);
              if (!path) return null;

              const pathLen = r * angle;

              return (
                <motion.path
                  key={segment.label}
                  d={path}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 15,
                    delay: data.indexOf(segment) * 0.12,
                  }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-zinc-100 font-mono">{total}%</span>
            <span className="text-xs text-zinc-500 font-mono">Total</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {data.map((segment) => (
            <div key={segment.label} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-sm text-zinc-300 font-mono w-16">{segment.label}</span>
              <span className="text-sm text-zinc-500 font-mono">{segment.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
