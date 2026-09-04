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
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <FloatingNav navItems={navItems} />

      <header className="pt-32 pb-16 px-6 max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-5xl sm:text-7xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          Pack{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400 bg-clip-text text-transparent">
            Shelf
          </span>
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Freelancer animation lab — {navItems.length} sections, 50+
          components, 3 site templates, and a live playground. All MIT.
        </motion.p>

        <motion.nav
          className="mt-10 flex justify-center gap-2 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="px-3 py-1.5 text-sm rounded-full border border-zinc-800 hover:border-zinc-600 bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </motion.nav>
      </header>

      <div className="border-t border-zinc-800/50" />
      <MotionSection />

      <div className="border-t border-zinc-800/50" />
      <MagicUiSection />

      <div className="border-t border-zinc-800/50" />
      <AceternitySection />

      <div className="border-t border-zinc-800/50" />
      <ReactBitsSection />

      <div className="border-t border-zinc-800/50" />
      <BackgroundsSection />

      <div className="border-t border-zinc-800/50" />
      <GesturesSection />

      <div className="border-t border-zinc-800/50" />
      <FeedbackSection />

      <div className="border-t border-zinc-800/50" />
      <NavigationSection />

      <div className="border-t border-zinc-800/50" />
      <DataVizSection />

      <div className="border-t border-zinc-800/50" />
      <TransitionsSection />

      <div className="border-t border-zinc-800/50" />
      <PlaygroundSection />

      <div className="border-t border-zinc-800/50" />
      <TemplatesSection />

      <footer className="py-16 px-6 text-center border-t border-zinc-800/50">
        <p className="text-zinc-500 text-sm">
          Pack Shelf — freelancer animation lab. {navItems.length} sections,
          50+ components.{" "}
          <a
            href="https://github.com/Dahhrk/pack-shelf"
            className="text-zinc-400 underline"
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
