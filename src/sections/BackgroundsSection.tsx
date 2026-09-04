import { Aurora } from "../components/backgrounds/Aurora";
import { ParticleField } from "../components/backgrounds/ParticleField";
import { GradientMesh } from "../components/backgrounds/GradientMesh";
import { DotGrid } from "../components/backgrounds/DotGrid";
import { GridPattern } from "../components/backgrounds/GridPattern";
import { Spotlight } from "../components/backgrounds/Spotlight";

const backgrounds = [
  {
    name: "Aurora",
    description:
      "Flowing color bands that drift and blend — emerald, teal, blue, violet.",
    component: <Aurora />,
  },
  {
    name: "Particle Field",
    description:
      "Canvas particles that drift, connect, and scatter from the cursor.",
    component: <ParticleField />,
  },
  {
    name: "Gradient Mesh",
    description:
      "Layered radial gradients that slowly morph and travel. Pure CSS.",
    component: <GradientMesh />,
  },
  {
    name: "Dot Grid",
    description:
      "Dots grow and brighten near the cursor. Mouse-tracked CSS grid.",
    component: <DotGrid />,
  },
  {
    name: "Grid Pattern",
    description: "Dashed grid with a radial fade mask and a gentle pulse.",
    component: <GridPattern />,
  },
  {
    name: "Spotlight",
    description:
      "Radial spotlight that follows the cursor across a dark field.",
    component: <Spotlight />,
  },
];

export function BackgroundsSection() {
  return (
    <section id="backgrounds" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-teal-400 font-mono">
        05 — Backgrounds
      </h2>
      <p className="text-zinc-400 mb-12 max-w-xl">
        Original animated background components. Self-contained, dark-mode
        native, interactive where it counts.
      </p>

      <div className="space-y-16">
        {backgrounds.map((bg) => (
          <div key={bg.name}>
            <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-1">
              {bg.name}
            </h3>
            <p className="text-xs text-zinc-600 mb-4">{bg.description}</p>
            <div className="relative h-80 w-full rounded-xl border border-zinc-800 overflow-hidden">
              {bg.component}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
