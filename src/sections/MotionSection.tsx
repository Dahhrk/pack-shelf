import {
  StaggeredText,
  ScrollProgress,
  SpringLoader,
  LayoutCards,
  AnimatePresenceMenu,
  ScrollLinkedCard,
} from "../components/motion/Primitives";

export function MotionSection() {
  return (
    <section id="motion" className="py-20 px-6 max-w-6xl mx-auto">
      <ScrollProgress />

      <h2 className="text-3xl font-bold mb-2 text-emerald-700 font-mono">
        01 — Motion
      </h2>
      <p className="text-[#14161a]/60 mb-12 max-w-xl">
        Hand-written engine primitives using <code className="font-mono text-[#14161a]/80">motion/react</code>.
        Springs, layout animations, scroll-linked transforms, and presence transitions.
      </p>

      <div className="space-y-16">
        {/* Text: Staggered */}
        <div>
          <h3 className="text-sm font-mono text-[#14161a]/40 uppercase tracking-widest mb-4">
            Staggered Text
          </h3>
          <StaggeredText />
        </div>

        {/* Cards: layoutId shared-element */}
        <div>
          <h3 className="text-sm font-mono text-[#14161a]/40 uppercase tracking-widest mb-4">
            LayoutId Shared-Element Cards
          </h3>
          <LayoutCards />
        </div>

        {/* Loader: Spring bounce */}
        <div>
          <h3 className="text-sm font-mono text-[#14161a]/40 uppercase tracking-widest mb-4">
            Spring Loader
          </h3>
          <SpringLoader />
        </div>

        {/* Scroll: linked card */}
        <div>
          <h3 className="text-sm font-mono text-[#14161a]/40 uppercase tracking-widest mb-4">
            Scroll-Linked Progress
          </h3>
          <div className="flex items-center justify-center">
            <ScrollLinkedCard />
          </div>
          <p className="text-xs text-[#14161a]/30 text-center mt-3">
            Scroll the page to rotate and scale
          </p>
        </div>

        {/* Menu: AnimatePresence */}
        <div>
          <h3 className="text-sm font-mono text-[#14161a]/40 uppercase tracking-widest mb-4">
            AnimatePresence Menu
          </h3>
          <AnimatePresenceMenu />
        </div>
      </div>
    </section>
  );
}
