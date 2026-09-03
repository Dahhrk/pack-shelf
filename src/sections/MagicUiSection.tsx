import { Marquee } from "../components/magicui/Marquee";
import { BorderBeam } from "../components/magicui/BorderBeam";
import { BlurFade } from "../components/magicui/BlurFade";
import { NumberTicker } from "../components/magicui/NumberTicker";
import { ShinyButton } from "../components/magicui/ShinyButton";
import { Ripple } from "../components/magicui/Ripple";
import { OrbitingCircles } from "../components/magicui/OrbitingCircles";

const marqueeItems = [
  "Marquee", "Border Beam", "Blur Fade", "Number Ticker",
  "Shiny Button", "Ripple", "Orbiting Circles", "Magic UI",
];

export function MagicUiSection() {
  return (
    <section id="magic-ui" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-amber-400 font-mono">
        02 — Magic UI
      </h2>
      <p className="text-zinc-400 mb-12 max-w-xl">
        Free / MIT components from{" "}
        <a href="https://magicui.design" className="underline text-zinc-300" target="_blank" rel="noopener noreferrer">
          magicui.design
        </a>. Copy-paste animated building blocks.
      </p>

      <div className="space-y-16">
        {/* Text: Marquee */}
        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Marquee
          </h3>
          <Marquee pauseOnHover className="[--duration:20s]">
            {marqueeItems.map((item) => (
              <div
                key={item}
                className="mx-4 flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm"
              >
                <span className="text-amber-400">✦</span>
                <span>{item}</span>
              </div>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:25s] mt-2">
            {marqueeItems.map((item) => (
              <div
                key={item}
                className="mx-4 flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm"
              >
                <span className="text-amber-400">◆</span>
                <span>{item}</span>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Card: Border Beam */}
        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Border Beam
          </h3>
          <div className="relative rounded-xl bg-zinc-900 border border-zinc-800 p-8 max-w-md">
            <h4 className="text-lg font-semibold mb-2">Animated Border</h4>
            <p className="text-zinc-400 text-sm">
              A glowing beam animates around the card border using CSS offset-path.
            </p>
            <BorderBeam size={250} duration={12} delay={3} />
          </div>
        </div>

        {/* Text: Blur Fade */}
        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Blur Fade
          </h3>
          <div className="space-y-4">
            {["Blur into view", "Stagger each line", "Smooth reveal"].map(
              (text, i) => (
                <BlurFade key={text} delay={0.15 * i}>
                  <p className="text-2xl font-semibold">{text}</p>
                </BlurFade>
              ),
            )}
          </div>
        </div>

        {/* Numbers: Number Ticker */}
        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Number Ticker
          </h3>
          <div className="flex gap-12 items-end">
            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-wider">Components</span>
              <div className="text-5xl font-bold">
                <NumberTicker value={142} />
              </div>
            </div>
            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-wider">Downloads</span>
              <div className="text-5xl font-bold">
                <NumberTicker value={89430} />
              </div>
            </div>
            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-wider">Stars</span>
              <div className="text-5xl font-bold">
                <NumberTicker value={5200} />
              </div>
            </div>
          </div>
        </div>

        {/* Button: Shiny */}
        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Shiny Button
          </h3>
          <div className="flex gap-4">
            <ShinyButton>Get Started</ShinyButton>
            <ShinyButton>Learn More</ShinyButton>
          </div>
        </div>

        {/* Loader / background: Ripple */}
        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Ripple
          </h3>
          <div className="relative h-48 w-full rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
            <Ripple />
          </div>
        </div>

        {/* Orbit: Orbiting Circles */}
        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Orbiting Circles
          </h3>
          <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-zinc-100 to-zinc-400 bg-clip-text text-center text-5xl font-semibold leading-none text-transparent">
              Orbit
            </span>
            <OrbitingCircles radius={80} duration={20}>
              <span className="text-2xl">⚛️</span>
            </OrbitingCircles>
            <OrbitingCircles radius={80} duration={20} delay={10}>
              <span className="text-2xl">🎨</span>
            </OrbitingCircles>
            <OrbitingCircles radius={140} duration={30} reverse>
              <span className="text-2xl">✨</span>
            </OrbitingCircles>
            <OrbitingCircles radius={140} duration={30} delay={15} reverse>
              <span className="text-2xl">🚀</span>
            </OrbitingCircles>
            <OrbitingCircles radius={200} duration={40}>
              <span className="text-2xl">📦</span>
            </OrbitingCircles>
            <OrbitingCircles radius={200} duration={40} delay={20}>
              <span className="text-2xl">⚡</span>
            </OrbitingCircles>
          </div>
        </div>
      </div>
    </section>
  );
}
