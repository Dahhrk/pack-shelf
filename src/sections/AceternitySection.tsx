import { BackgroundBeams } from "../components/aceternity/BackgroundBeams";
import { HoverEffect } from "../components/aceternity/CardHoverEffect";
import { TypewriterEffect } from "../components/aceternity/TypewriterEffect";
import { MovingBorderButton } from "../components/aceternity/MovingBorder";
import { BentoGrid, BentoGridItem } from "../components/aceternity/BentoGrid";

const hoverCards = [
  { title: "Spring Physics", description: "Physically-modeled spring animations with configurable stiffness, damping, and mass." },
  { title: "Layout Animations", description: "Shared-element transitions using layoutId for seamless morphing between states." },
  { title: "Scroll Tracking", description: "Scroll-linked transforms that respond to viewport position in real time." },
  { title: "Gesture System", description: "Drag, hover, tap, and focus gesture handlers with animation integration." },
  { title: "Presence Transitions", description: "AnimatePresence for enter/exit animations when components mount and unmount." },
  { title: "Variants", description: "Declarative animation states that propagate through component trees." },
];

const typewriterWords = [
  { text: "Build" },
  { text: "beautiful" },
  { text: "animated", className: "text-emerald-400" },
  { text: "interfaces." },
];

const bentoItems = [
  {
    title: "Motion Runtime",
    description: "Spring physics and layout animations in one engine.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-violet-900/50 to-indigo-900/50 border border-violet-500/20" />
    ),
    className: "md:col-span-2",
  },
  {
    title: "Copy-Paste Kits",
    description: "Drop in pre-built components, own the source.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border border-emerald-500/20" />
    ),
    className: "md:col-span-1",
  },
  {
    title: "Scroll Driven",
    description: "Viewport-aware animations that feel native.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-amber-900/50 to-orange-900/50 border border-amber-500/20" />
    ),
    className: "md:col-span-1",
  },
  {
    title: "Composable UI",
    description: "Mix and match packs across projects. No lock-in.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-pink-900/50 to-rose-900/50 border border-pink-500/20" />
    ),
    className: "md:col-span-2",
  },
];

export function AceternitySection() {
  return (
    <section id="aceternity" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-violet-400 font-mono">
        03 — Aceternity UI
      </h2>
      <p className="text-zinc-400 mb-12 max-w-xl">
        Free documented components from{" "}
        <a href="https://ui.aceternity.com" className="underline text-zinc-300" target="_blank" rel="noopener noreferrer">
          ui.aceternity.com
        </a>. Expressive animated blocks for dark interfaces.
      </p>

      <div className="space-y-16">
        {/* Background: Beams (contained) */}
        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Background Beams
          </h3>
          <div className="relative h-64 w-full rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center">
            <BackgroundBeams />
            <p className="relative z-10 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 to-zinc-400">
              Ambient beam trails
            </p>
          </div>
        </div>

        {/* Cards: Hover Effect */}
        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Card Hover Effect
          </h3>
          <HoverEffect items={hoverCards} />
        </div>

        {/* Text: Typewriter */}
        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Typewriter Effect
          </h3>
          <TypewriterEffect words={typewriterWords} />
        </div>

        {/* Grid: Bento */}
        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Bento Grid
          </h3>
          <BentoGrid>
            {bentoItems.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={item.className}
              />
            ))}
          </BentoGrid>
        </div>

        {/* Button: Moving Border */}
        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Moving Border
          </h3>
          <div className="flex gap-4 flex-wrap">
            <MovingBorderButton>Explore Packs</MovingBorderButton>
            <MovingBorderButton>View Source</MovingBorderButton>
          </div>
        </div>
      </div>
    </section>
  );
}
