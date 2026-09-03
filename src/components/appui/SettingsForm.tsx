// Specimen: Settings Form (dirty state tracking, save/undo bar)
// Libraries: Motion (MIT), Radix UI (MIT), Lucide React (ISC)
// Source: Original — built for pack-shelf app-UI specimens
// License: MIT (this file)

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { Save, Undo2, Check } from "lucide-react";

interface FormValues {
  displayName: string;
  email: string;
  timezone: string;
  weeklyDigest: boolean;
  projectUpdates: boolean;
  invoiceReminders: boolean;
  currency: string;
  taxRate: string;
  paymentTerms: string;
}

const defaults: FormValues = {
  displayName: "Alex Morgan",
  email: "alex@acme.co",
  timezone: "America/New_York",
  weeklyDigest: true,
  projectUpdates: true,
  invoiceReminders: false,
  currency: "USD",
  taxRate: "8.25",
  paymentTerms: "net-30",
};

type Section = { title: string; fields: { key: keyof FormValues; label: string; type: "text" | "select" | "toggle"; options?: string[] }[] };

const sections: Section[] = [
  {
    title: "Profile",
    fields: [
      { key: "displayName", label: "Display Name", type: "text" },
      { key: "email", label: "Email Address", type: "text" },
      { key: "timezone", label: "Timezone", type: "select", options: ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "Europe/London", "Europe/Berlin", "Asia/Tokyo"] },
    ],
  },
  {
    title: "Notifications",
    fields: [
      { key: "weeklyDigest", label: "Weekly Digest", type: "toggle" },
      { key: "projectUpdates", label: "Project Updates", type: "toggle" },
      { key: "invoiceReminders", label: "Invoice Reminders", type: "toggle" },
    ],
  },
  {
    title: "Billing",
    fields: [
      { key: "currency", label: "Currency", type: "select", options: ["USD", "EUR", "GBP", "CAD", "AUD"] },
      { key: "taxRate", label: "Tax Rate (%)", type: "text" },
      { key: "paymentTerms", label: "Payment Terms", type: "select", options: ["net-15", "net-30", "net-45", "net-60", "due-on-receipt"] },
    ],
  },
];

export function SettingsForm() {
  const reduced = useReducedMotion();
  const [values, setValues] = useState<FormValues>({ ...defaults });
  const [saved, setSaved] = useState(false);

  const isDirty = useMemo(() => {
    return (Object.keys(defaults) as (keyof FormValues)[]).some(
      (k) => values[k] !== defaults[k],
    );
  }, [values]);

  const dirtyFields = useMemo(() => {
    const fields = new Set<keyof FormValues>();
    (Object.keys(defaults) as (keyof FormValues)[]).forEach((k) => {
      if (values[k] !== defaults[k]) fields.add(k);
    });
    return fields;
  }, [values]);

  const handleChange = useCallback((key: keyof FormValues, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }, []);

  const handleUndo = useCallback(() => {
    setValues({ ...defaults });
    setSaved(false);
  }, []);

  const handleSave = useCallback(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, []);

  const anim = reduced
    ? { initial: false as const, animate: {}, exit: {}, transition: { duration: 0 } }
    : {};

  return (
    <div className="relative">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 divide-y divide-zinc-800">
        {sections.map((section) => (
          <div key={section.title} className="p-6">
            <h4 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
              {section.title}
            </h4>
            <div className="space-y-4">
              {section.fields.map((field) => {
                const dirty = dirtyFields.has(field.key);
                return (
                  <div key={field.key} className="flex items-center gap-4">
                    <label
                      htmlFor={`settings-${field.key}`}
                      className={`text-sm w-40 shrink-0 ${dirty ? "text-amber-400" : "text-zinc-400"}`}
                    >
                      {field.label}
                      {dirty && <span className="ml-1 text-amber-400">*</span>}
                    </label>
                    {field.type === "text" && (
                      <input
                        id={`settings-${field.key}`}
                        type="text"
                        value={values[field.key] as string}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="focus-ring flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-emerald-500 transition-colors"
                      />
                    )}
                    {field.type === "select" && (
                      <select
                        id={`settings-${field.key}`}
                        value={values[field.key] as string}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="focus-ring flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-emerald-500 transition-colors"
                      >
                        {field.options!.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}
                    {field.type === "toggle" && (
                      <button
                        id={`settings-${field.key}`}
                        role="switch"
                        aria-checked={values[field.key] as boolean}
                        onClick={() => handleChange(field.key, !(values[field.key] as boolean))}
                        className={`focus-ring relative w-10 h-6 rounded-full transition-colors ${
                          values[field.key] ? "bg-emerald-500" : "bg-zinc-700"
                        }`}
                      >
                        <motion.div
                          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
                          animate={{ left: values[field.key] ? 20 : 4 }}
                          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Save/Undo bar */}
      <AnimatePresence>
        {(isDirty || saved) && (
          <motion.div
            className="mt-4 flex items-center justify-between rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 25 }}
          >
            {saved ? (
              <span className="flex items-center gap-2 text-sm text-emerald-400">
                <Check className="w-4 h-4" /> Settings saved
              </span>
            ) : (
              <>
                <span className="text-sm text-amber-400">
                  {dirtyFields.size} unsaved {dirtyFields.size === 1 ? "change" : "changes"}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleUndo}
                    className="focus-ring flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-600 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
                  >
                    <Undo2 className="w-3.5 h-3.5" /> Undo
                  </button>
                  <button
                    onClick={handleSave}
                    className="focus-ring flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-sm text-white hover:bg-emerald-500 transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" /> Save
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
