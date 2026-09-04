// Pack: Feedback (original) / Source: Original / License: MIT

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

const typeStyles: Record<Toast["type"], { bg: string; icon: string }> = {
  success: { bg: "border-emerald-500/30 bg-emerald-500/10", icon: "✓" },
  error: { bg: "border-rose-500/30 bg-rose-500/10", icon: "✕" },
  info: { bg: "border-sky-500/30 bg-sky-500/10", icon: "i" },
};

const typeColors: Record<Toast["type"], string> = {
  success: "text-emerald-400",
  error: "text-rose-400",
  info: "text-sky-400",
};

const messages: { text: string; type: Toast["type"] }[] = [
  { text: "Component saved successfully", type: "success" },
  { text: "Animation bundle optimized", type: "info" },
  { text: "Failed to load spring config", type: "error" },
  { text: "New gesture pack available", type: "info" },
  { text: "Layout animation cached", type: "success" },
];

export function ToastStack() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counterRef = useRef(0);
  const msgIndex = useRef(0);

  const addToast = useCallback(() => {
    const msg = messages[msgIndex.current % messages.length];
    msgIndex.current++;
    const id = ++counterRef.current;
    setToasts((prev) => [...prev, { id, message: msg.text, type: msg.type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div className="relative">
      <button
        onClick={addToast}
        className="px-5 py-2.5 bg-zinc-800 rounded-lg font-medium border border-zinc-700 hover:border-zinc-500 transition-colors text-sm"
      >
        Fire Toast
      </button>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-2 items-end pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const style = typeStyles[toast.type];
            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border ${style.bg} backdrop-blur-sm shadow-lg shadow-black/20 min-w-[260px] max-w-xs`}
              >
                <span
                  className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${typeColors[toast.type]} border-current`}
                >
                  {style.icon}
                </span>
                <span className="text-sm flex-1">{toast.message}</span>
                <button
                  onClick={() => dismiss(toast.id)}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors text-xs shrink-0"
                >
                  ✕
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
