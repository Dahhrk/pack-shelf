// Pack: Templates (original) / Source: Original / License: MIT

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
} from "motion/react";

const spring = { type: "spring" as const, stiffness: 200, damping: 24 };
const gentleSpring = { type: "spring" as const, stiffness: 120, damping: 20 };

const projects = [
  {
    id: "meridian",
    title: "Meridian",
    category: "Brand Identity",
    year: "2026",
    color: "#1a1a2e",
    desc: "Complete brand system for a climate-tech startup — wordmark, palette, guidelines, and collateral. Built around the idea of navigational clarity in a noisy market.",
    role: "Lead Designer",
    tools: "Figma, Illustrator, After Effects",
  },
  {
    id: "tinderbox",
    title: "Tinderbox",
    category: "Web App",
    year: "2025",
    color: "#2d1b00",
    desc: "Dashboard and editor for a content ops team managing 200+ articles a week. Drag-and-drop calendar, real-time collaboration, and a publishing pipeline.",
    role: "Design & Frontend",
    tools: "React, TypeScript, Figma",
  },
  {
    id: "halftone",
    title: "Halftone",
    category: "Editorial Design",
    year: "2025",
    color: "#0d1b2a",
    desc: "Visual identity and web presence for an independent music magazine. Typography-forward layouts, custom illustrations, and an archive spanning 12 years.",
    role: "Art Direction",
    tools: "InDesign, Figma, CSS",
  },
  {
    id: "solis",
    title: "Solis",
    category: "Mobile App",
    year: "2024",
    color: "#1b2e1b",
    desc: "Wellness tracking app with a focus on sleep and recovery. Calm, data-rich interface that avoids the clinical feel of fitness dashboards.",
    role: "Product Design",
    tools: "Figma, Principle, SwiftUI",
  },
];

const skills = [
  { name: "Design Systems", pct: 95 },
  { name: "React / TypeScript", pct: 88 },
  { name: "Motion Design", pct: 82 },
  { name: "Brand Identity", pct: 90 },
  { name: "User Research", pct: 75 },
];

function ProgressBar({ pct, delay }: { pct: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="h-2 bg-zinc-200 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-zinc-800 rounded-full"
        initial={{ width: 0 }}
        animate={isInView ? { width: `${pct}%` } : { width: 0 }}
        transition={{ ...gentleSpring, delay }}
      />
    </div>
  );
}

function AnimatedCounter({ value }: { value: number }) {
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
          ref.current.textContent = Math.round(latest).toString();
        }
      }),
    [springValue],
  );

  return <span ref={ref} className="tabular-nums" />;
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
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...gentleSpring, delay }}
    >
      {children}
    </motion.div>
  );
}

export function PortfolioTemplate() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const project = projects.find((p) => p.id === selectedProject);

  const nameLetters = "Alex Mercer".split("");

  return (
    <div
      className="min-h-screen bg-[#fafafa] text-zinc-900"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-zinc-800 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col justify-center px-8 max-w-5xl mx-auto pt-16">
        <div className="flex flex-wrap">
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              className="text-6xl sm:text-8xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 60, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                ...gentleSpring,
                delay: i * 0.04,
              }}
              style={{ display: "inline-block" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="mt-6 text-xl text-zinc-500 max-w-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Design engineer building interfaces that feel considered.
          Currently based in Brooklyn, open to remote work.
        </motion.p>

        <motion.div
          className="mt-8 flex gap-5 text-sm text-zinc-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {["LinkedIn", "Dribbble", "GitHub"].map((link) => (
            <span
              key={link}
              className="hover:text-zinc-900 transition-colors cursor-pointer underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-500"
            >
              {link}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 flex gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {[
            { n: 8, label: "Years experience" },
            { n: 40, label: "Projects shipped" },
            { n: 12, label: "Happy clients" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold">
                <AnimatedCounter value={stat.n} />+
              </div>
              <div className="text-xs text-zinc-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Projects grid */}
      <section className="py-24 px-8 max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-400 mb-8">
            Selected Work
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.08}>
              <motion.div
                layoutId={`project-card-${p.id}`}
                className="rounded-2xl overflow-hidden cursor-pointer border border-zinc-200 bg-white"
                onClick={() => setSelectedProject(p.id)}
                whileHover={{ y: -6 }}
                transition={spring}
              >
                <motion.div
                  layoutId={`project-bg-${p.id}`}
                  className="h-48 flex items-end p-5"
                  style={{ backgroundColor: p.color }}
                >
                  <motion.span
                    layoutId={`project-title-${p.id}`}
                    className="text-white text-xl font-bold"
                  >
                    {p.title}
                  </motion.span>
                </motion.div>
                <div className="p-5 flex justify-between items-center">
                  <span className="text-sm text-zinc-500">{p.category}</span>
                  <span className="text-xs text-zinc-400">{p.year}</span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Project detail overlay */}
      <AnimatePresence>
        {selectedProject && project && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSelectedProject(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              layoutId={`project-card-${project.id}`}
              className="relative z-10 bg-white rounded-2xl max-w-2xl w-full overflow-hidden border border-zinc-200"
            >
              <motion.div
                layoutId={`project-bg-${project.id}`}
                className="h-56 flex items-end p-8"
                style={{ backgroundColor: project.color }}
              >
                <div>
                  <motion.span
                    layoutId={`project-title-${project.id}`}
                    className="text-white text-3xl font-bold block"
                  >
                    {project.title}
                  </motion.span>
                  <motion.span
                    className="text-white/60 text-sm mt-1 block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.category} · {project.year}
                  </motion.span>
                </div>
              </motion.div>

              <motion.div
                className="p-8 space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <p className="text-zinc-600 leading-relaxed">{project.desc}</p>
                <div className="flex gap-8 text-sm">
                  <div>
                    <span className="text-zinc-400 block text-xs uppercase tracking-wider">
                      Role
                    </span>
                    <span className="font-medium">{project.role}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-xs uppercase tracking-wider">
                      Tools
                    </span>
                    <span className="font-medium">{project.tools}</span>
                  </div>
                </div>
              </motion.div>

              <motion.button
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center text-sm"
                onClick={() => setSelectedProject(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skills */}
      <section className="py-24 px-8 max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-400 mb-10">
            Capabilities
          </h2>
        </ScrollReveal>

        <div className="space-y-6 max-w-xl">
          {skills.map((s, i) => (
            <ScrollReveal key={s.name} delay={i * 0.06}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{s.name}</span>
                <span className="text-xs text-zinc-400 tabular-nums">
                  {s.pct}%
                </span>
              </div>
              <ProgressBar pct={s.pct} delay={i * 0.06} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 px-8 max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-400 mb-10">
            Get in Touch
          </h2>
        </ScrollReveal>

        <div className="max-w-md space-y-4">
          {[
            { label: "Name", type: "text" },
            { label: "Email", type: "email" },
          ].map((field, i) => (
            <ScrollReveal key={field.label} delay={i * 0.08}>
              <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-1.5">
                {field.label}
              </label>
              <motion.input
                type={field.type}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm outline-none"
                placeholder={`Your ${field.label.toLowerCase()}`}
                whileFocus={{
                  scale: 1.02,
                  borderColor: "#18181b",
                }}
                transition={spring}
              />
            </ScrollReveal>
          ))}
          <ScrollReveal delay={0.16}>
            <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-1.5">
              Message
            </label>
            <motion.textarea
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm outline-none resize-none h-28"
              placeholder="Tell me about your project"
              whileFocus={{
                scale: 1.02,
                borderColor: "#18181b",
              }}
              transition={spring}
            />
          </ScrollReveal>
          <ScrollReveal delay={0.24}>
            <motion.button
              className="px-7 py-3 bg-zinc-900 text-white rounded-xl text-sm font-medium"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              Send message
            </motion.button>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-zinc-200 text-center text-xs text-zinc-400">
        © 2026 Alex Mercer — Template from Pack Shelf
      </footer>
    </div>
  );
}
