import { AuthForm } from "../components/raw/AuthForm";
import { OtpForm } from "../components/raw/OtpForm";

export function RawSection() {
  return (
    <section id="raw" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-[#14161a]">
        05 — Raw, no dependency
      </h2>
      <p className="text-[#14161a]/60 mb-12 max-w-xl">
        Interaction craft with no animation-library dependency (Auth) or
        GSAP timelines (OTP). Vanilla CSS/JS and deliberate timeline math
        — proving the motion grammar without React abstractions.
      </p>

      <div className="space-y-16">
        <div>
          <h3 className="text-sm text-[#14161a]/40 uppercase tracking-widest mb-4">
            Auth — Attentive Form
          </h3>
          <AuthForm />
        </div>

        <div>
          <h3 className="text-sm text-[#14161a]/40 uppercase tracking-widest mb-4">
            OTP — Converging Digits
          </h3>
          <OtpForm />
        </div>
      </div>
    </section>
  );
}
