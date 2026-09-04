import { motion, AnimatePresence } from "motion/react";
import {
  Playground,
  type ControlDescriptor,
  type ControlValues,
} from "../components/playground/Playground";

/* ------------------------------------------------------------------ */
/*  1. Spring Ball                                                    */
/* ------------------------------------------------------------------ */

const springBallControls: ControlDescriptor[] = [
  { key: "stiffness", label: "Stiffness", type: "range", min: 10, max: 500, default: 200 },
  { key: "damping", label: "Damping", type: "range", min: 1, max: 50, default: 10 },
  { key: "mass", label: "Mass", type: "range", min: 0.1, max: 10, step: 0.1, default: 1 },
];

function SpringBall({ stiffness, damping, mass }: { stiffness: number; damping: number; mass: number }) {
  return (
    <motion.div
      className="w-16 h-16 rounded-full bg-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.4)]"
      animate={{ y: [0, 120, 0] }}
      transition={{
        type: "spring",
        stiffness,
        damping,
        mass,
        repeat: Infinity,
        repeatDelay: 0.3,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  2. Stagger Text                                                   */
/* ------------------------------------------------------------------ */

const staggerWords = ["Staggered", "Text", "Animation"];

const staggerControls: ControlDescriptor[] = [
  { key: "delay", label: "Delay / item", type: "range", min: 0, max: 0.5, step: 0.01, default: 0.12 },
  { key: "stiffness", label: "Stiffness", type: "range", min: 10, max: 500, default: 120 },
  { key: "direction", label: "Direction", type: "select", options: ["forward", "reverse"], default: "forward" },
];

function StaggerText({
  delay,
  stiffness,
  direction,
}: {
  delay: number;
  stiffness: number;
  direction: string;
}) {
  const ordered = direction === "reverse" ? [...staggerWords].reverse() : staggerWords;
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {ordered.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * delay, type: "spring", stiffness }}
          className="text-3xl font-bold tracking-tight text-zinc-100"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Card Hover                                                     */
/* ------------------------------------------------------------------ */

const cardHoverControls: ControlDescriptor[] = [
  { key: "initialScale", label: "Initial scale", type: "range", min: 0, max: 2, step: 0.01, default: 1 },
  { key: "hoverScale", label: "Hover scale", type: "range", min: 0.5, max: 2, step: 0.01, default: 1.08 },
  { key: "tapScale", label: "Tap scale", type: "range", min: 0.5, max: 1.5, step: 0.01, default: 0.95 },
];

function HoverCard({
  initialScale,
  hoverScale,
  tapScale,
}: {
  initialScale: number;
  hoverScale: number;
  tapScale: number;
}) {
  return (
    <motion.div
      className="w-48 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 p-6 cursor-pointer select-none"
      initial={{ scale: initialScale }}
      animate={{ scale: initialScale }}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <p className="text-sm font-semibold text-white">Hover me</p>
      <p className="text-xs text-white/60 mt-1">or tap on mobile</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Fade In                                                        */
/* ------------------------------------------------------------------ */

const fadeControls: ControlDescriptor[] = [
  { key: "yOffset", label: "Y offset", type: "range", min: -100, max: 100, default: 40 },
  { key: "opacity", label: "Initial opacity", type: "range", min: 0, max: 1, step: 0.01, default: 0 },
  { key: "duration", label: "Duration (s)", type: "range", min: 0.1, max: 3, step: 0.05, default: 0.6 },
];

function FadeBlock({
  yOffset,
  opacity,
  duration,
}: {
  yOffset: number;
  opacity: number;
  duration: number;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="w-56 rounded-xl bg-zinc-800 border border-zinc-700 p-6"
        initial={{ opacity, y: yOffset }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration, ease: "easeOut" }}
      >
        <div className="h-2 w-20 rounded bg-emerald-400/60 mb-3" />
        <div className="h-2 w-32 rounded bg-zinc-600 mb-2" />
        <div className="h-2 w-28 rounded bg-zinc-700" />
      </motion.div>
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

export function PlaygroundSection() {
  return (
    <section id="playground" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-emerald-400 font-mono">
        11 — Playground
      </h2>
      <p className="text-zinc-400 mb-12 max-w-xl">
        Tweak animation parameters in real time. Drag sliders, flip toggles, and
        hit <span className="text-zinc-300 font-mono text-sm">Replay</span> to
        re-trigger.
      </p>

      <div className="space-y-10">
        <Playground
          title="Spring Ball"
          controls={springBallControls}
          render={(v: ControlValues) => (
            <SpringBall
              stiffness={v.stiffness as number}
              damping={v.damping as number}
              mass={v.mass as number}
            />
          )}
        />

        <Playground
          title="Stagger Text"
          controls={staggerControls}
          render={(v: ControlValues) => (
            <StaggerText
              delay={v.delay as number}
              stiffness={v.stiffness as number}
              direction={v.direction as string}
            />
          )}
        />

        <Playground
          title="Card Hover"
          controls={cardHoverControls}
          render={(v: ControlValues) => (
            <HoverCard
              initialScale={v.initialScale as number}
              hoverScale={v.hoverScale as number}
              tapScale={v.tapScale as number}
            />
          )}
        />

        <Playground
          title="Fade In"
          controls={fadeControls}
          render={(v: ControlValues) => (
            <FadeBlock
              yOffset={v.yOffset as number}
              opacity={v.opacity as number}
              duration={v.duration as number}
            />
          )}
        />
      </div>
    </section>
  );
}
