// Pack: Data Viz (original) / Source: Original / License: MIT

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

function generatePath(points: number[], width: number, height: number): string {
  if (points.length < 2) return "";
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);

  return points
    .map((p, i) => {
      const x = i * step;
      const y = height - ((p - min) / range) * (height * 0.7) - height * 0.15;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function CountingNumber({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });

  useEffect(() => {
    motionVal.set(target);
  }, [target, motionVal]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent =
          prefix +
          Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }).format(Number(v.toFixed(decimals))) +
          suffix;
      }
    });
  }, [spring, prefix, suffix, decimals]);

  return <span ref={ref} className={className} />;
}

interface MetricCardData {
  label: string;
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
  change: number;
  sparkline: number[];
  color: string;
}

const METRICS: MetricCardData[] = [
  {
    label: "Monthly Revenue",
    value: 48250,
    prefix: "$",
    suffix: "",
    decimals: 0,
    change: 12.4,
    sparkline: [30, 35, 32, 40, 38, 45, 42, 48],
    color: "#34d399",
  },
  {
    label: "Active Users",
    value: 8431,
    prefix: "",
    suffix: "",
    decimals: 0,
    change: -3.2,
    sparkline: [90, 85, 88, 82, 80, 84, 81, 84],
    color: "#fbbf24",
  },
  {
    label: "Conversion Rate",
    value: 3.82,
    prefix: "",
    suffix: "%",
    decimals: 2,
    change: 0.8,
    sparkline: [3.1, 3.3, 3.2, 3.5, 3.4, 3.6, 3.7, 3.8],
    color: "#60a5fa",
  },
];

function MetricCard({ metric, index }: { metric: MetricCardData; index: number }) {
  const path = generatePath(metric.sparkline, 100, 32);
  const isPositive = metric.change >= 0;

  return (
    <motion.div
      className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 flex flex-col gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.15,
      }}
    >
      <span className="text-xs font-mono text-zinc-500 uppercase tracking-wide">
        {metric.label}
      </span>

      <div className="flex items-end justify-between gap-4">
        <CountingNumber
          target={metric.value}
          prefix={metric.prefix}
          suffix={metric.suffix}
          decimals={metric.decimals}
          className="text-3xl font-bold text-zinc-100 font-mono tabular-nums"
        />

        <svg
          width={100}
          height={32}
          viewBox="0 0 100 32"
          fill="none"
          className="shrink-0 opacity-60"
        >
          <motion.path
            d={path}
            stroke={metric.color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              type: "spring",
              stiffness: 30,
              damping: 20,
              delay: index * 0.15 + 0.3,
            }}
          />
        </svg>
      </div>

      <motion.div
        className={`inline-flex items-center gap-1 self-start px-2 py-0.5 rounded-full text-xs font-mono ${
          isPositive
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-rose-500/10 text-rose-400"
        }`}
        initial={{ opacity: 0, scale: 0.5, x: -10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: index * 0.15 + 0.5,
        }}
      >
        <span>{isPositive ? "↑" : "↓"}</span>
        <span>{Math.abs(metric.change)}%</span>
      </motion.div>
    </motion.div>
  );
}

export function AnimatedMetricCard() {
  const [key, setKey] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400 font-mono">Metric cards with counting numbers</p>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="px-3 py-1.5 text-xs font-mono rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-colors"
        >
          Re-animate
        </button>
      </div>

      <div key={key} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {METRICS.map((m, i) => (
          <MetricCard key={m.label} metric={m} index={i} />
        ))}
      </div>
    </div>
  );
}
