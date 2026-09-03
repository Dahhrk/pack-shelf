// Specimen: Overlays (modal, drawer, popover, toast, tooltip)
// Libraries: Radix UI (MIT), Motion (MIT), Sonner (MIT), Vaul (MIT), Lucide React (ISC)
// Source: Original — built for pack-shelf app-UI specimens
// License: MIT (this file)

import { useState, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { Drawer } from "vaul";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { X, Info, Bell, Check } from "lucide-react";

function FocusTrapModal() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="focus-ring px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-sm hover:bg-zinc-700 transition-colors">
          Open Modal
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/60 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={reduced ? { duration: 0 } : undefined}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md rounded-xl border border-zinc-700 bg-zinc-900 p-6 z-50 shadow-2xl"
                initial={reduced ? false : { opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -10 }}
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-lg font-semibold">
                    Confirm Action
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="focus-ring p-1 rounded text-zinc-400 hover:text-zinc-200" aria-label="Close">
                      <X className="w-4 h-4" />
                    </button>
                  </Dialog.Close>
                </div>
                <Dialog.Description className="text-sm text-zinc-400 mb-6">
                  This will archive the project &ldquo;Website Redesign&rdquo; and move all associated tasks to the completed folder. You can restore it within 30 days.
                </Dialog.Description>
                <div className="flex justify-end gap-3">
                  <Dialog.Close asChild>
                    <button className="focus-ring px-4 py-2 rounded-lg border border-zinc-700 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors">
                      Cancel
                    </button>
                  </Dialog.Close>
                  <button
                    onClick={() => setOpen(false)}
                    className="focus-ring px-4 py-2 rounded-lg bg-emerald-600 text-sm text-white hover:bg-emerald-500 transition-colors"
                  >
                    Archive Project
                  </button>
                </div>
                <input className="sr-only" tabIndex={0} aria-hidden="true" />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function OverlayDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <button className="focus-ring px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-sm hover:bg-zinc-700 transition-colors">
          Open Drawer
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-zinc-700 bg-zinc-900">
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-zinc-700" />
          <div className="p-6 max-h-[60vh] overflow-auto">
            <Drawer.Title className="text-lg font-semibold mb-2">
              Project Details
            </Drawer.Title>
            <Drawer.Description className="text-sm text-zinc-400 mb-4">
              Review the project timeline and milestones before submitting to the client.
            </Drawer.Description>
            <div className="space-y-3">
              {["Discovery & Research", "Wireframes", "Visual Design", "Development", "QA & Launch"].map((milestone, i) => (
                <div key={milestone} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-800">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    i < 3 ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-700 text-zinc-500"
                  }`}>
                    {i < 3 ? <Check className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                  <span className={`text-sm ${i < 3 ? "text-zinc-300" : "text-zinc-500"}`}>{milestone}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Drawer.Close asChild>
                <button className="focus-ring px-4 py-2 rounded-lg bg-emerald-600 text-sm text-white hover:bg-emerald-500 transition-colors">
                  Done
                </button>
              </Drawer.Close>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function OverlayPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="focus-ring px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-sm hover:bg-zinc-700 transition-colors">
          Open Popover
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-72 rounded-xl border border-zinc-700 bg-zinc-900 p-4 shadow-xl z-50"
          sideOffset={8}
        >
          <div className="flex items-start gap-3 mb-3">
            <Bell className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">3 new notifications</p>
              <p className="text-xs text-zinc-400 mt-0.5">2 project updates, 1 invoice paid</p>
            </div>
          </div>
          <div className="space-y-2">
            {["Invoice #1042 paid — $2,400", "Brand assets uploaded by Dana", "Sprint review scheduled for Friday"].map((msg) => (
              <div key={msg} className="text-xs text-zinc-400 py-1.5 border-t border-zinc-800">
                {msg}
              </div>
            ))}
          </div>
          <Popover.Arrow className="fill-zinc-700" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function ToastDemo() {
  const handleToast = useCallback(() => {
    toast.success("Invoice sent to client", {
      description: "Invoice #1043 was emailed to alex@globex.dev",
      duration: 4000,
    });
  }, []);

  return (
    <button
      onClick={handleToast}
      className="focus-ring px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-sm hover:bg-zinc-700 transition-colors"
    >
      Fire Toast
    </button>
  );
}

function TooltipDemo() {
  return (
    <RadixTooltip.Provider delayDuration={200}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          <button className="focus-ring px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-sm hover:bg-zinc-700 transition-colors">
            Hover for Tooltip
          </button>
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-zinc-300 shadow-lg z-50"
            sideOffset={6}
          >
            <div className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-zinc-500" />
              Keyboard shortcut: <kbd className="font-mono text-zinc-500">Ctrl+S</kbd>
            </div>
            <RadixTooltip.Arrow className="fill-zinc-700" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

export function Overlays() {
  return (
    <div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "!bg-zinc-800 !border-zinc-700 !text-zinc-100",
          descriptionClassName: "!text-zinc-400",
        }}
      />
      <div className="flex flex-wrap gap-3">
        <FocusTrapModal />
        <OverlayDrawer />
        <OverlayPopover />
        <ToastDemo />
        <TooltipDemo />
      </div>
    </div>
  );
}
