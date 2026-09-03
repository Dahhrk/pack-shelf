import { DashboardShell } from "../components/appui/DashboardShell";
import { DataTable } from "../components/appui/DataTable";

export function MobileSection() {
  return (
    <section id="mobile" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-pink-400 font-mono">
        06 — Mobile / Responsive
      </h2>
      <p className="text-stone-400 mb-4 max-w-xl">
        The <strong>same</strong> Dashboard Shell and Data Table components rendered inside
        a 390px viewport constraint. No duplicate implementation — these are the identical
        components from section 05 with responsive behavior built in.
      </p>
      <p className="text-xs text-stone-500 mb-12">
        The dashboard switches to a gesture-dismissable drawer nav; the table
        becomes horizontally scrollable with compact rows.
      </p>

      <div className="space-y-16">
        {/* Mobile Dashboard */}
        <div>
          <h3 className="text-sm font-mono text-stone-500 uppercase tracking-widest mb-4">
            Dashboard at 390px
          </h3>
          <div
            className="mx-auto border border-stone-700 rounded-2xl overflow-hidden bg-stone-950"
            style={{ maxWidth: 390 }}
          >
            <div className="px-3 py-1.5 flex items-center justify-between bg-stone-900 border-b border-stone-800">
              <span className="text-[10px] text-stone-500 font-mono">390 × auto</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-stone-700" />
                <div className="w-2 h-2 rounded-full bg-stone-700" />
                <div className="w-2 h-2 rounded-full bg-stone-700" />
              </div>
            </div>
            <div className="overflow-hidden">
              <DashboardShell />
            </div>
          </div>
        </div>

        {/* Mobile Table */}
        <div>
          <h3 className="text-sm font-mono text-stone-500 uppercase tracking-widest mb-4">
            Data Table at 390px
          </h3>
          <div
            className="mx-auto border border-stone-700 rounded-2xl overflow-hidden bg-stone-950"
            style={{ maxWidth: 390 }}
          >
            <div className="px-3 py-1.5 flex items-center justify-between bg-stone-900 border-b border-stone-800">
              <span className="text-[10px] text-stone-500 font-mono">390 × auto</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-stone-700" />
                <div className="w-2 h-2 rounded-full bg-stone-700" />
                <div className="w-2 h-2 rounded-full bg-stone-700" />
              </div>
            </div>
            <div className="overflow-hidden">
              <DataTable />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
