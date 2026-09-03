// Specimen: Onboarding (3-step flow with progress + coach marks)
// Libraries: Motion (MIT), Lucide React (ISC)
// Source: Original — built for pack-shelf app-UI specimens
// License: MIT (this file)

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import {
  User,
  Briefcase,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
} from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  fields: { label: string; placeholder: string; type: string }[];
}

const steps: Step[] = [
  {
    id: 1,
    title: "Set up your profile",
    description: "Tell us about yourself so clients see your details on invoices and proposals.",
    icon: User,
    fields: [
      { label: "Full Name", placeholder: "Alex Morgan", type: "text" },
      { label: "Email", placeholder: "alex@yoursite.com", type: "email" },
    ],
  },
  {
    id: 2,
    title: "Create your first project",
    description: "Projects organize tasks, time entries, and invoices for each client engagement.",
    icon: Briefcase,
    fields: [
      { label: "Project Name", placeholder: "Website Redesign", type: "text" },
      { label: "Client Name", placeholder: "Globex Corp", type: "text" },
    ],
  },
  {
    id: 3,
    title: "Set up billing",
    description: "Configure your default rate and payment preferences for faster invoicing.",
    icon: CreditCard,
    fields: [
      { label: "Hourly Rate", placeholder: "$120", type: "text" },
      { label: "Payment Terms", placeholder: "Net 30", type: "text" },
    ],
  },
];

function CoachMark({
  target,
  text,
  onDismiss,
  reduced,
}: {
  target: React.RefObject<HTMLElement | null>;
  text: string;
  onDismiss: () => void;
  reduced: boolean;
}) {
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null);

  useEffect(() => {
    if (!target.current) return;
    const rect = target.current.getBoundingClientRect();
    const container = target.current.closest("[data-onboarding-container]");
    const containerRect = container?.getBoundingClientRect() ?? { top: 0, left: 0 };
    setPos({
      top: rect.bottom - containerRect.top + 8,
      left: rect.left - containerRect.left,
      width: rect.width,
    });
  }, [target]);

  if (!pos) return null;

  return (
    <motion.div
      className="absolute z-20"
      style={{ top: pos.top, left: pos.left }}
      initial={reduced ? false : { opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-amber-600 text-white text-xs rounded-lg px-3 py-2 shadow-lg max-w-[220px] relative">
        <div className="absolute -top-1.5 left-6 w-3 h-3 bg-amber-600 rotate-45" />
        <div className="flex items-start gap-2">
          <span className="flex-1">{text}</span>
          <button
            onClick={onDismiss}
            className="focus-ring shrink-0 p-0.5 rounded hover:bg-amber-500"
            aria-label="Dismiss coach mark"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [coachMarkStep, setCoachMarkStep] = useState(0);
  const [showCoachMarks, setShowCoachMarks] = useState(false);
  const reduced = useReducedMotion();

  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLInputElement>(null);

  const coachMarks = [
    { ref: fieldRef, text: "Fill in your details here to get started" },
    { ref: progressRef, text: "Track your progress across all three steps" },
    { ref: nextBtnRef, text: "Continue to the next step when ready" },
  ];

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setCompleted(true);
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    setCurrentStep((s) => Math.max(0, s - 1));
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setCompleted(false);
    setShowCoachMarks(false);
    setCoachMarkStep(0);
  }, []);

  const handleToggleCoachMarks = useCallback(() => {
    setShowCoachMarks((prev) => !prev);
    setCoachMarkStep(0);
  }, []);

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  if (completed) {
    return (
      <motion.div
        className="rounded-xl border border-stone-800 bg-stone-900 p-8 text-center"
        initial={reduced ? false : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4"
          initial={reduced ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <Check className="w-8 h-8 text-amber-400" />
        </motion.div>
        <h4 className="text-xl font-bold mb-2">All set!</h4>
        <p className="text-sm text-stone-400 mb-6">Your workspace is configured and ready to use.</p>
        <button
          onClick={handleReset}
          className="focus-ring px-4 py-2 rounded-lg border border-stone-700 text-sm text-stone-300 hover:bg-stone-800 transition-colors"
        >
          Restart Demo
        </button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-900 overflow-hidden relative" data-onboarding-container>
      {/* Progress bar */}
      <div ref={progressRef} className="h-1 bg-stone-800">
        <motion.div
          className="h-full bg-amber-500"
          animate={{ width: `${progress}%` }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 25 }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-center gap-8 pt-6 pb-4">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors ${
                  done ? "bg-amber-500 text-white" : active ? "bg-stone-700 text-stone-200 ring-2 ring-amber-500" : "bg-stone-800 text-stone-500"
                }`}
              >
                {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <span className={`text-xs hidden sm:inline ${active ? "text-stone-200" : "text-stone-500"}`}>
                {s.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="px-6 pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={reduced ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: -20 }}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
          >
            <h4 className="text-lg font-bold mb-1">{step.title}</h4>
            <p className="text-sm text-stone-400 mb-6">{step.description}</p>
            <div className="space-y-4 max-w-sm">
              {step.fields.map((field, fi) => (
                <div key={field.label}>
                  <label className="text-xs text-stone-500 mb-1 block">{field.label}</label>
                  <input
                    ref={fi === 0 ? fieldRef : undefined}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="focus-ring w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-sm text-stone-200 placeholder:text-stone-600 outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="focus-ring flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-stone-400 hover:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleCoachMarks}
              className="focus-ring px-3 py-2 rounded-lg text-xs text-stone-500 hover:text-stone-300 border border-stone-800 hover:border-stone-700 transition-colors"
            >
              {showCoachMarks ? "Hide Tips" : "Show Tips"}
            </button>
            <button
              ref={nextBtnRef}
              onClick={handleNext}
              className="focus-ring flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 text-sm text-white hover:bg-amber-500 transition-colors"
            >
              {currentStep === steps.length - 1 ? "Finish" : "Continue"}{" "}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Coach marks */}
      <AnimatePresence>
        {showCoachMarks && coachMarkStep < coachMarks.length && (
          <CoachMark
            key={coachMarkStep}
            target={coachMarks[coachMarkStep].ref}
            text={coachMarks[coachMarkStep].text}
            reduced={reduced}
            onDismiss={() => {
              if (coachMarkStep < coachMarks.length - 1) {
                setCoachMarkStep((s) => s + 1);
              } else {
                setShowCoachMarks(false);
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
