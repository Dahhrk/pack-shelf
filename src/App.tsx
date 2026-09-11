import { motion } from "motion/react";
import { MotionSection } from "./sections/MotionSection";
import { MagicUiSection } from "./sections/MagicUiSection";
import { AceternitySection } from "./sections/AceternitySection";
import { ReactBitsSection } from "./sections/ReactBitsSection";
import { AppUiSection } from "./sections/AppUiSection";
import { MobileSection } from "./sections/MobileSection";
import { FloatingNav } from "./components/aceternity/FloatingNav";
import { useReducedMotion } from "./hooks/useReducedMotion";

const navItems = [
  { name: "Motion", link: "#motion" },
  { name: "Magic UI", link: "#magic-ui" },
  { name: "Aceternity", link: "#aceternity" },
  { name: "React Bits", link: "#react-bits" },
  { name: "App UI", link: "#app-ui" },
  { name: "Mobile", link: "#mobile" },
];

export default function App() {
  const reduced = useReducedMotion();

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <FloatingNav navItems={navItems} />

      <header className="pt-32 pb-16 px-6 max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-5xl sm:text-7xl font-bold tracking-tight"
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 80, damping: 20 }}
        >
          Pack{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Shelf
          </span>
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-stone-400 max-w-lg mx-auto"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduced ? { duration: 0 } : { delay: 0.3 }}
        >
          Freelancer pack lab — browsable gallery of animated components
          from Motion, Magic UI, Aceternity UI, React Bits, and app-UI specimens.
        </motion.p>

        <motion.nav
          className="mt-10 flex justify-center gap-3 flex-wrap"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { delay: 0.5 }}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="focus-ring px-4 py-2 text-sm rounded-full border border-stone-800 hover:border-stone-600 bg-stone-900/50 hover:bg-stone-800/50 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </motion.nav>
      </header>

      <div className="border-t border-stone-800/50" />
      <MotionSection />

      <div className="border-t border-stone-800/50" />
      <MagicUiSection />

      <div className="border-t border-stone-800/50" />
      <AceternitySection />

      <div className="border-t border-stone-800/50" />
      <ReactBitsSection />

      <div className="border-t border-stone-800/50" />
      <AppUiSection />

      <div className="border-t border-stone-800/50" />
      <MobileSection />

      <footer className="py-16 px-6 text-center border-t border-stone-800/50">
        <p className="text-stone-500 text-sm">
          Pack Shelf — freelancer animation lab.{" "}
          <a
            href="https://github.com/Dahhrk/pack-shelf"
            className="text-stone-400 underline"
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
