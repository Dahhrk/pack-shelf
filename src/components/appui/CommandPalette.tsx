// Specimen: Command Palette
// Libraries: cmdk (MIT), Motion (MIT), Lucide React (ISC), Fuse.js (Apache-2.0)
// Source: Original — built for pack-shelf app-UI specimens
// License: MIT (this file)

import { useState, useEffect, useCallback, useRef } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import Fuse from "fuse.js";
import {
  Search,
  FileText,
  Users,
  Settings,
  BarChart3,
  LayoutDashboard,
  CreditCard,
  Mail,
  Calendar,
  FolderOpen,
  Palette,
  Globe,
  Zap,
  BookOpen,
  Shield,
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  group: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
}

const commands: CommandItem[] = [
  { id: "dashboard", label: "Go to Dashboard", group: "Navigation", icon: LayoutDashboard, shortcut: "G D" },
  { id: "analytics", label: "View Analytics", group: "Navigation", icon: BarChart3, shortcut: "G A" },
  { id: "clients", label: "Client Directory", group: "Navigation", icon: Users },
  { id: "invoices", label: "Invoices", group: "Navigation", icon: CreditCard },
  { id: "settings", label: "Settings", group: "Navigation", icon: Settings, shortcut: "G S" },
  { id: "new-project", label: "Create New Project", group: "Actions", icon: FolderOpen },
  { id: "new-invoice", label: "Create Invoice", group: "Actions", icon: FileText },
  { id: "send-email", label: "Send Email to Client", group: "Actions", icon: Mail },
  { id: "schedule", label: "Schedule Meeting", group: "Actions", icon: Calendar },
  { id: "export", label: "Export Report", group: "Actions", icon: BarChart3 },
  { id: "theme", label: "Change Theme", group: "Preferences", icon: Palette },
  { id: "language", label: "Change Language", group: "Preferences", icon: Globe },
  { id: "shortcuts", label: "Keyboard Shortcuts", group: "Preferences", icon: Zap },
  { id: "docs", label: "Documentation", group: "Help", icon: BookOpen },
  { id: "privacy", label: "Privacy Settings", group: "Help", icon: Shield },
];

const fuse = new Fuse(commands, {
  keys: ["label", "group"],
  threshold: 0.4,
  includeScore: true,
});

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [lastAction, setLastAction] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);

  const toggle = useCallback(() => {
    setOpen((prev) => {
      if (!prev) setSearch("");
      return !prev;
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [toggle]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const filtered = search.trim()
    ? fuse.search(search).map((r) => r.item)
    : commands;

  const groups = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  const handleSelect = useCallback((id: string) => {
    const cmd = commands.find((c) => c.id === id);
    if (cmd) {
      setLastAction(cmd.label);
      setOpen(false);
      setTimeout(() => setLastAction(null), 2000);
    }
  }, []);

  const anim = reduced ? { duration: 0 } : undefined;

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={toggle}
        className="focus-ring flex items-center gap-3 w-full max-w-md mx-auto px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-800/50 text-zinc-400 text-sm hover:border-zinc-600 hover:bg-zinc-800 transition-colors"
        aria-label="Open command palette"
      >
        <Search className="w-4 h-4" />
        <span className="flex-1 text-left">Search commands…</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Palette */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={anim}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed left-1/2 top-[20%] -translate-x-1/2 w-[90vw] max-w-lg z-50"
              initial={reduced ? false : { opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -8 }}
              transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }}
            >
              <Command
                className="rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl overflow-hidden"
                loop
                label="Command palette"
              >
                <div className="flex items-center gap-3 px-4 border-b border-zinc-800">
                  <Search className="w-4 h-4 text-zinc-500 shrink-0" />
                  <Command.Input
                    ref={inputRef}
                    value={search}
                    onValueChange={setSearch}
                    placeholder="Type a command or search…"
                    className="focus-ring flex-1 bg-transparent py-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none"
                  />
                  <kbd
                    className="text-[10px] font-mono text-zinc-600 border border-zinc-700 rounded px-1 py-0.5 cursor-pointer hover:text-zinc-400"
                    onClick={() => setOpen(false)}
                  >
                    ESC
                  </kbd>
                </div>
                <Command.List className="max-h-[320px] overflow-auto p-2">
                  <Command.Empty className="py-8 text-center text-sm text-zinc-500">
                    No results found.
                  </Command.Empty>
                  {Object.entries(groups).map(([group, items]) => (
                    <Command.Group key={group} heading={group} className="mb-2">
                      <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest px-2 py-1.5">
                        {group}
                      </div>
                      {items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Command.Item
                            key={item.id}
                            value={item.label}
                            onSelect={() => handleSelect(item.id)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 cursor-pointer data-[selected=true]:bg-zinc-800 data-[selected=true]:text-zinc-100 transition-colors"
                          >
                            <Icon className="w-4 h-4 text-zinc-500 shrink-0" />
                            <span className="flex-1">{item.label}</span>
                            {item.shortcut && (
                              <kbd className="text-[10px] font-mono text-zinc-600">
                                {item.shortcut}
                              </kbd>
                            )}
                          </Command.Item>
                        );
                      })}
                    </Command.Group>
                  ))}
                </Command.List>
              </Command>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Action feedback */}
      <AnimatePresence>
        {lastAction && (
          <motion.div
            className="mt-4 text-center text-sm text-emerald-400"
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Executed: {lastAction}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
