import { FadeSlide } from "../components/transitions/FadeSlide";
import { MorphingLayout } from "../components/transitions/MorphingLayout";
import { SharedElement } from "../components/transitions/SharedElement";
import { PageWipe } from "../components/transitions/PageWipe";
import { StaggeredReveal } from "../components/transitions/StaggeredReveal";

export function TransitionsSection() {
  return (
    <section id="transitions" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-amber-400 font-mono">
        10 — Page Transitions
      </h2>
      <p className="text-zinc-400 mb-12 max-w-xl">
        Enter/exit animations, shared-element transitions, layout morphing, color
        wipes, and staggered reveals — all powered by spring physics.
      </p>

      <div className="space-y-16">
        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Fade + Slide
          </h3>
          <FadeSlide />
        </div>

        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Morphing Layout
          </h3>
          <MorphingLayout />
        </div>

        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Shared Element
          </h3>
          <SharedElement />
        </div>

        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Page Wipe
          </h3>
          <PageWipe />
        </div>

        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Staggered Reveal
          </h3>
          <StaggeredReveal />
        </div>
      </div>
    </section>
  );
}
