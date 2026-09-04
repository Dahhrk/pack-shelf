// Pack: Templates (original) / Source: Original / License: MIT

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useEffect } from "react";

const spring = { type: "spring" as const, stiffness: 200, damping: 24 };
const gentleSpring = { type: "spring" as const, stiffness: 120, damping: 20 };

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [motionValue, isInView, value]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent =
            Math.round(latest).toLocaleString() + suffix;
        }
      }),
    [springValue, suffix],
  );

  return <span ref={ref} />;
}

function ScrollReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...gentleSpring, delay }}
    >
      {children}
    </motion.div>
  );
}

const features = [
  {
    icon: "\u26A1",
    title: "Instant Deploy",
    desc: "Push to main and your changes go live in under 3 seconds. No build queues.",
  },
  {
    icon: "\uD83D\uDD12",
    title: "Built-in Auth",
    desc: "Session management, OAuth providers, and role-based access out of the box.",
  },
  {
    icon: "\uD83D\uDCCA",
    title: "Live Analytics",
    desc: "Real-time dashboards with custom events, funnels, and retention curves.",
  },
  {
    icon: "\uD83C\uDF0D",
    title: "Edge Functions",
    desc: "Run server logic at the edge \u2014 50ms latency worldwide, zero cold starts.",
  },
];

const metrics = [
  { value: 99.9, suffix: "%", label: "Uptime SLA" },
  { value: 12000, suffix: "+", label: "Teams shipping" },
  { value: 4, suffix: "ms", label: "Avg response" },
  { value: 50, suffix: "+", label: "Integrations" },
];

export function LandingTemplate() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <div
      className="min-h-screen bg-[#fafafa] text-zinc-900 overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Floating gradient bg */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ y: bgY, opacity: bgOpacity }}
      >
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-amber-200/40 blur-[120px]" />
        <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-teal-200/30 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[40%] w-[400px] h-[400px] rounded-full bg-rose-200/25 blur-[100px]" />
      </motion.div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <motion.span
          className="text-lg font-bold tracking-tight"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring}
        >
          Launchpad
        </motion.span>
        <motion.div
          className="flex gap-6 text-sm text-zinc-500"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring}
        >
          {["Features", "Pricing", "Docs"].map((t) => (
            <span
              key={t}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </nav>

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative z-10 pt-24 pb-32 px-6 max-w-4xl mx-auto text-center"
      >
        {["Ship faster.", "Scale easier.", "Sleep better."].map((line, i) => (
          <motion.h1
            key={line}
            className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...gentleSpring, delay: i * 0.15 }}
          >
            {line}
          </motion.h1>
        ))}

        <motion.p
          className="mt-8 text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          The developer platform that gets out of your way. Build, deploy, and
          iterate without the infrastructure headaches.
        </motion.p>

        <motion.div
          className="mt-10 flex gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, ...spring }}
        >
          <motion.button
            className="px-7 py-3 bg-zinc-900 text-white rounded-lg text-sm font-medium"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={spring}
          >
            Start building \u2014 free
          </motion.button>
          <motion.button
            className="px-7 py-3 border border-zinc-300 rounded-lg text-sm font-medium text-zinc-600"
            whileHover={{ scale: 1.04, borderColor: "#a1a1aa" }}
            whileTap={{ scale: 0.97 }}
            transition={spring}
          >
            View demo
          </motion.button>
        </motion.div>
      </section>

      {/* Feature grid */}
      <section className="relative z-10 py-24 px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center mb-4">
            Everything you need
          </h2>
          <p className="text-zinc-500 text-center mb-16 max-w-lg mx-auto">
            Stop stitching services together. One platform, every capability.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.08}>
              <motion.div
                className="p-6 rounded-2xl border border-zinc-200 bg-white/80 backdrop-blur-sm cursor-default"
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
                }}
                transition={spring}
              >
                <span className="text-2xl">{f.icon}</span>
                <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-zinc-500 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="relative z-10 py-24 px-6 bg-zinc-900 text-white">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-16">
              Trusted at scale
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {metrics.map((m, i) => (
              <ScrollReveal key={m.label} delay={i * 0.1}>
                <div className="text-4xl sm:text-5xl font-bold tabular-nums">
                  <AnimatedCounter value={m.value} suffix={m.suffix} />
                </div>
                <div className="mt-2 text-sm text-zinc-400">{m.label}</div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 py-32 px-6 text-center">
        <ScrollReveal>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Ready to launch?
          </h2>
          <p className="mt-4 text-zinc-500 max-w-md mx-auto">
            Join 12,000+ teams already shipping with Launchpad.
          </p>
          <motion.button
            className="mt-10 px-8 py-3.5 bg-zinc-900 text-white rounded-lg text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={spring}
          >
            Get started for free
          </motion.button>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-zinc-200 text-center text-xs text-zinc-400">
        \u00A9 2026 Launchpad Inc. \u2014 Template from Pack Shelf
      </footer>
    </div>
  );
}
