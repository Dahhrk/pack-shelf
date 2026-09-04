import { SwipeCards } from "../components/gestures/SwipeCards";
import { DragReorder } from "../components/gestures/DragReorder";
import { PullToRefresh } from "../components/gestures/PullToRefresh";
import { PinchZoom } from "../components/gestures/PinchZoom";

export function GesturesSection() {
  return (
    <section id="gestures" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-amber-400 font-mono">
        06 — Gestures
      </h2>
      <p className="text-zinc-400 mb-12 max-w-xl">
        Touch-driven interaction primitives — drag, swipe, pull, and pinch with
        spring physics and velocity-aware handoffs.
      </p>

      <div className="space-y-16">
        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Swipe Cards
          </h3>
          <div className="flex items-center justify-center py-4">
            <SwipeCards />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Drag Reorder
          </h3>
          <DragReorder />
        </div>

        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Pull to Refresh
          </h3>
          <PullToRefresh />
        </div>

        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Pinch Zoom
          </h3>
          <div className="flex items-center justify-center">
            <PinchZoom />
          </div>
        </div>
      </div>
    </section>
  );
}
