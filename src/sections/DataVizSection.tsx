import { AnimatedBarChart } from "../components/dataviz/AnimatedBarChart";
import { SparklineChart } from "../components/dataviz/SparklineChart";
import { LiveCounter } from "../components/dataviz/LiveCounter";
import { DonutChart } from "../components/dataviz/DonutChart";
import { AnimatedMetricCard } from "../components/dataviz/AnimatedMetricCard";

export function DataVizSection() {
  return (
    <section id="data-viz" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-emerald-400 font-mono">
        09 — Data Viz
      </h2>
      <p className="text-zinc-400 mb-12 max-w-xl">
        Animated data visualization components — bar charts, sparklines,
        counters, donuts, and metric cards with spring physics.
      </p>

      <div className="space-y-16">
        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Animated Bar Chart
          </h3>
          <AnimatedBarChart />
        </div>

        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Sparkline Chart
          </h3>
          <SparklineChart />
        </div>

        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Live Counter
          </h3>
          <LiveCounter />
        </div>

        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Donut Chart
          </h3>
          <DonutChart />
        </div>

        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Animated Metric Cards
          </h3>
          <AnimatedMetricCard />
        </div>
      </div>
    </section>
  );
}
