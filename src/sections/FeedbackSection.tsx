import { SkeletonLoader } from "../components/feedback/SkeletonLoader";
import { ProgressSteps } from "../components/feedback/ProgressSteps";
import { ToastStack } from "../components/feedback/ToastStack";
import { SuccessCheck } from "../components/feedback/SuccessCheck";

export function FeedbackSection() {
  return (
    <section id="feedback" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-cyan-400 font-mono">
        07 — Feedback
      </h2>
      <p className="text-zinc-400 mb-12 max-w-xl">
        Loading states, progress indicators, notifications, and success
        confirmations — all spring-animated for natural feel.
      </p>

      <div className="space-y-16">
        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Skeleton Loader
          </h3>
          <SkeletonLoader />
        </div>

        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Progress Steps
          </h3>
          <ProgressSteps />
        </div>

        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Toast Stack
          </h3>
          <ToastStack />
        </div>

        <div>
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Success Check
          </h3>
          <div className="flex items-center justify-center py-4">
            <SuccessCheck />
          </div>
        </div>
      </div>
    </section>
  );
}
