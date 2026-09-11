import { useReducedMotion } from "./hooks/useReducedMotion";
import { motion } from "motion/react";
import { MotionSection } from "./sections/MotionSection";
import { MagicUiSection } from "./sections/MagicUiSection";
import { AceternitySection } from "./sections/AceternitySection";
import { ReactBitsSection } from "./sections/ReactBitsSection";
import { BackgroundsSection } from "./sections/BackgroundsSection";
import { GesturesSection } from "./sections/GesturesSection";
import { FeedbackSection } from "./sections/FeedbackSection";
import { NavigationSection } from "./sections/NavigationSection";
import { DataVizSection } from "./sections/DataVizSection";
import { TransitionsSection } from "./sections/TransitionsSection";
import { PlaygroundSection } from "./sections/PlaygroundSection";
import { TemplatesSection } from "./sections/TemplatesSection";
import { FloatingNav } from "./components/aceternity/FloatingNav";

const navItems = [
  { name: "Motion", link: "#motion" },
  { name: "Magic UI", link: "#magic-ui" },
  { name: "Aceternity", link: "#aceternity" },
  { name: "React Bits", link: "#react-bits" },
  { name: "Backgrounds", link: "#backgrounds" },
  { name: "Gestures", link: "#gestures" },
  { name: "Feedback", link: "#feedback" },
  { name: "Navigation", link: "#navigation" },
  { name: "Data Viz", link: "#data-viz" },
  { name: "Transitions", link: "#transitions" },
  { name: "Playground", link: "#playground" },
  { name: "Templates", link: "#templates" },
];

export default function App() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#eef0ec] text-[#14161a]">
      <FloatingNav navItems={navItems} />

      <header className="pt-32 pb-16 px-6 max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-5xl sm:text-7xl font-bold tracking-tight text-[#14161a]"
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 80, damping: 20 }
          }
        >
          Pack Shelf
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-[#14161a]/60 max-w-2xl mx-auto"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReduced ? { duration: 0 } : { delay: 0.3 }}
        >
          Freelancer animation lab — {navItems.length} sections, 50+
          components, 3 site templates, and a live playground. All MIT.
        </motion.p>

        <motion.nav
          className="mt-10 flex justify-center gap-2 flex-wrap"
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0 } : { delay: 0.5 }}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="px-3 py-1.5 text-sm rounded-full border border-[#14161a]/15 hover:border-[#14161a]/30 bg-white/50 hover:bg-white/80 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </motion.nav>
      </header>

      <div className="border-t border-[#14161a]/10" />
      <MotionSection />

      <div className="border-t border-[#14161a]/10" />
      <MagicUiSection />

      <div className="border-t border-[#14161a]/10" />
      <AceternitySection />

      <div className="border-t border-[#14161a]/10" />
      <ReactBitsSection />

      <div className="border-t border-[#14161a]/10" />
      <BackgroundsSection />

      <div className="border-t border-[#14161a]/10" />
      <GesturesSection />

      <div className="border-t border-[#14161a]/10" />
      <FeedbackSection />

      <div className="border-t border-[#14161a]/10" />
      <NavigationSection />

      <div className="border-t border-[#14161a]/10" />
      <DataVizSection />

      <div className="border-t border-[#14161a]/10" />
      <TransitionsSection />

      <div className="border-t border-[#14161a]/10" />
      <PlaygroundSection />

      <div className="border-t border-[#14161a]/10" />
      <TemplatesSection />

      <footer className="py-16 px-6 text-center border-t border-[#14161a]/10">
        <p className="text-[#14161a]/50 text-sm">
          Pack Shelf — freelancer animation lab. {navItems.length} sections,
          50+ components.{" "}
          <a
            href="https://github.com/Dahhrk/pack-shelf"
            className="text-[#14161a]/70 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        </p>
      </footer>
    </div>
  );
}
