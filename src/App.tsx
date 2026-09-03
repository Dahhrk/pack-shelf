import { useReducedMotion } from "./hooks/useReducedMotion";
import { motion } from "motion/react";
import { MotionSection } from "./sections/MotionSection";
import { MagicUiSection } from "./sections/MagicUiSection";
import { AceternitySection } from "./sections/AceternitySection";
import { ReactBitsSection } from "./sections/ReactBitsSection";
import { RawSection } from "./sections/RawSection";
import { FloatingNav } from "./components/aceternity/FloatingNav";

const navItems = [
  { name: "Motion", link: "#motion" },
  { name: "Magic UI", link: "#magic-ui" },
  { name: "Aceternity", link: "#aceternity" },
  { name: "React Bits", link: "#react-bits" },
  { name: "Raw", link: "#raw" },
];

export default function App() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#eef0ec] text-[#14161a]">
      <FloatingNav navItems={navItems} />

      {/* Hero */}
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
          className="mt-4 text-lg text-[#14161a]/60 max-w-lg mx-auto"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReduced ? { duration: 0 } : { delay: 0.3 }}
        >
          Freelancer pack lab — browsable gallery of animated components
          from Motion, Magic UI, Aceternity UI, React Bits, and raw craft.
        </motion.p>

        <motion.nav
          className="mt-10 flex justify-center gap-3 flex-wrap"
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0 } : { delay: 0.5 }}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="px-4 py-2 text-sm rounded-full border border-[#14161a]/15 hover:border-[#14161a]/30 bg-white/50 hover:bg-white/80 transition-colors"
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
      <RawSection />

      {/* Footer */}
      <footer className="py-16 px-6 text-center border-t border-[#14161a]/10">
        <p className="text-[#14161a]/50 text-sm">
          Pack Shelf — freelancer animation lab.{" "}
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
