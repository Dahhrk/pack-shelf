import { DashboardShell } from "../components/appui/DashboardShell";
import { DataTable } from "../components/appui/DataTable";
import { CommandPalette } from "../components/appui/CommandPalette";
import { SettingsForm } from "../components/appui/SettingsForm";
import { EmptyStates } from "../components/appui/EmptyStates";
import { Overlays } from "../components/appui/Overlays";
import { Onboarding } from "../components/appui/Onboarding";
import {
  SharedLayoutTransition,
  DragReorderList,
  SkeletonSwap,
  ScrollLinkedSection,
} from "../components/appui/InteractionPatterns";

export function AppUiSection() {
  return (
    <section id="app-ui" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-cyan-400 font-mono">
        05 — App / Product UI
      </h2>
      <p className="text-zinc-400 mb-12 max-w-xl">
        Interactive app-UI specimens: dashboard shell, data table, command
        palette, settings, empty states, overlays, onboarding, and cross-cutting
        interaction patterns — all animated with Motion.
      </p>

      <div className="space-y-16">
        {/* Dashboard Shell */}
        <div id="specimen-dashboard">
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Dashboard Shell
          </h3>
          <p className="text-xs text-zinc-600 mb-4">
            Sidebar navigation, breadcrumb, animated content swap. Responsive drawer at mobile widths.
          </p>
          <DashboardShell />
        </div>

        {/* Data Table */}
        <div id="specimen-data-table">
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Data Table
          </h3>
          <p className="text-xs text-zinc-600 mb-4">
            600 virtualized rows, column sort, column resize, row selection. Click a row for optimistic update feedback.
          </p>
          <DataTable />
        </div>

        {/* Command Palette */}
        <div id="specimen-command-palette">
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Command Palette
          </h3>
          <p className="text-xs text-zinc-600 mb-4">
            Press <kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-mono">⌘K</kbd> or click to open. Fuzzy search, arrow navigation, escape to close.
          </p>
          <CommandPalette />
        </div>

        {/* Settings Form */}
        <div id="specimen-settings">
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Settings Form
          </h3>
          <p className="text-xs text-zinc-600 mb-4">
            Sectioned form with dirty-state tracking. Modified fields are highlighted; save/undo bar slides in.
          </p>
          <SettingsForm />
        </div>

        {/* Empty States */}
        <div id="specimen-empty-states">
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Empty States
          </h3>
          <p className="text-xs text-zinc-600 mb-4">
            Four distinct empty states: first-run welcome, no search results, error, and permission denied.
          </p>
          <EmptyStates />
        </div>

        {/* Overlays */}
        <div id="specimen-overlays">
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Overlays
          </h3>
          <p className="text-xs text-zinc-600 mb-4">
            Modal (focus trap + escape), drawer (gesture dismiss), popover, toast, and tooltip. All keyboard-accessible.
          </p>
          <Overlays />
        </div>

        {/* Onboarding */}
        <div id="specimen-onboarding">
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Onboarding Flow
          </h3>
          <p className="text-xs text-zinc-600 mb-4">
            3-step wizard with progress bar, back navigation, and dismissable coach-mark tooltips.
          </p>
          <Onboarding />
        </div>

        {/* ── Interaction Patterns ── */}
        <div className="border-t border-zinc-800 pt-16">
          <h3 className="text-lg font-bold text-zinc-300 mb-8">
            Cross-Cutting Interaction Patterns
          </h3>
        </div>

        {/* Shared Layout Transition */}
        <div id="specimen-layout-transition">
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Shared Layout Transition
          </h3>
          <p className="text-xs text-zinc-600 mb-4">
            Tab indicator animates between tabs using Motion <code className="text-zinc-400">layoutId</code>.
          </p>
          <SharedLayoutTransition />
        </div>

        {/* Drag Reorder */}
        <div id="specimen-drag-reorder">
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            List Reorder with Drag
          </h3>
          <p className="text-xs text-zinc-600 mb-4">
            Drag tasks to reorder. Uses Motion <code className="text-zinc-400">Reorder</code> group with spring layout animations.
          </p>
          <DragReorderList />
        </div>

        {/* Skeleton Swap */}
        <div id="specimen-skeleton-swap">
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Skeleton to Content Swap
          </h3>
          <p className="text-xs text-zinc-600 mb-4">
            Loading skeletons that cross-fade to real content. Click &ldquo;Reload&rdquo; to replay.
          </p>
          <SkeletonSwap />
        </div>

        {/* Scroll-Linked Progress */}
        <div id="specimen-scroll-progress">
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Scroll-Linked Progress
          </h3>
          <p className="text-xs text-zinc-600 mb-4">
            Progress bar driven by container scroll position via Motion <code className="text-zinc-400">useScroll</code>.
          </p>
          <ScrollLinkedSection />
        </div>
      </div>
    </section>
  );
}
