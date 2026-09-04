import { AnimatedTabs } from "../components/navigation/AnimatedTabs";
import { BreadcrumbTrail } from "../components/navigation/BreadcrumbTrail";
import { SidebarCollapse } from "../components/navigation/SidebarCollapse";

export function NavigationSection() {
  return (
    <section id="navigation" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-violet-400 font-mono">
        08 — Navigation
      </h2>
      <p className="text-zinc-400 mb-12 max-w-xl">
        Tabs, breadcrumbs, and sidebars with layout-animated indicators,
        staggered enters, and smooth collapse transitions.
      </p>

      <div className="space-y-16">
        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Animated Tabs
          </h3>
          <AnimatedTabs />
        </div>

        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Breadcrumb Trail
          </h3>
          <BreadcrumbTrail />
        </div>

        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Sidebar Collapse
          </h3>
          <SidebarCollapse />
        </div>
      </div>
    </section>
  );
}
