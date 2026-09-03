// Raw lane — Auth specimen
// Vanilla CSS transitions + plain JS DOM manipulation. No animation library.
// Idea: the form treats you as a stranger until proven otherwise;
// it reacts to what you're doing, not just to submit.

import { useEffect, useRef, useCallback, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const ACCENT = "#3b82f6";
const EYE_RADIUS = 5;
const PUPIL_RADIUS = 2.4;
const MAX_PUPIL_OFFSET = 2.2;

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function lidPath(
  center: { cx: number; cy: number },
  closed: boolean,
  peek = false,
): string {
  const r = EYE_RADIUS;
  const { cx, cy } = center;
  if (closed) {
    return `M ${cx - r} ${cy} Q ${cx} ${cy} ${cx + r} ${cy}`;
  }
  const lift = peek ? r * 0.45 : r;
  return `M ${cx - r} ${cy} Q ${cx} ${cy - lift} ${cx + r} ${cy}`;
}

export function AuthForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  const setup = useCallback(
    (container: HTMLDivElement) => {
      const indicatorWrapper = container.querySelector<HTMLDivElement>(
        ".auth-indicator-wrapper",
      )!;
      const indicator =
        container.querySelector<SVGSVGElement>(".auth-indicator")!;
      const leftPupil =
        container.querySelector<SVGCircleElement>("#left-pupil")!;
      const rightPupil =
        container.querySelector<SVGCircleElement>("#right-pupil")!;
      const leftLid = container.querySelector<SVGPathElement>("#left-lid")!;
      const rightLid = container.querySelector<SVGPathElement>("#right-lid")!;
      const emailInput =
        container.querySelector<HTMLInputElement>("#auth-email")!;
      const passInput =
        container.querySelector<HTMLInputElement>("#auth-password")!;
      const revealBtn =
        container.querySelector<HTMLButtonElement>("#auth-reveal")!;

      const leftEyeCenter = { cx: 30, cy: 28 };
      const rightEyeCenter = { cx: 50, cy: 28 };

      function movePupilsToward(targetX: number, targetY: number) {
        if (reducedMotion) return;
        [
          { pupil: leftPupil, center: leftEyeCenter },
          { pupil: rightPupil, center: rightEyeCenter },
        ].forEach(({ pupil, center }) => {
          const svgRect = indicator.getBoundingClientRect();
          const svgX = center.cx * (svgRect.width / 80);
          const svgY = center.cy * (svgRect.height / 50);
          const globalCX = svgRect.left + svgX;
          const globalCY = svgRect.top + svgY;
          const dx = targetX - globalCX;
          const dy = targetY - globalCY;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const ox = clamp(
            (dx / dist) * MAX_PUPIL_OFFSET,
            -MAX_PUPIL_OFFSET,
            MAX_PUPIL_OFFSET,
          );
          const oy = clamp(
            (dy / dist) * MAX_PUPIL_OFFSET,
            -MAX_PUPIL_OFFSET,
            MAX_PUPIL_OFFSET,
          );
          pupil.setAttribute("cx", String(center.cx + ox));
          pupil.setAttribute("cy", String(center.cy + oy));
        });
      }

      function riseUp() {
        if (reducedMotion) {
          indicatorWrapper.style.position = "relative";
          indicatorWrapper.style.top = "-6px";
          return;
        }
        indicatorWrapper.style.transition =
          "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
        indicatorWrapper.style.transform = "translateY(-6px)";
      }

      function settleDown() {
        if (reducedMotion) {
          indicatorWrapper.style.top = "0px";
          return;
        }
        indicatorWrapper.style.transition =
          "transform 0.3s cubic-bezier(0.34, 1.0, 0.64, 1)";
        indicatorWrapper.style.transform = "translateY(0px)";
      }

      function openLids() {
        const openLeft = lidPath(leftEyeCenter, false);
        const openRight = lidPath(rightEyeCenter, false);
        if (reducedMotion) {
          leftLid.setAttribute("d", openLeft);
          rightLid.setAttribute("d", openRight);
          return;
        }
        leftLid.style.transition =
          "d 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)";
        rightLid.style.transition =
          "d 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)";
        leftLid.setAttribute("d", openLeft);
        rightLid.setAttribute("d", openRight);
      }

      function closeLids() {
        const closedLeft = lidPath(leftEyeCenter, true);
        const closedRight = lidPath(rightEyeCenter, true);
        if (reducedMotion) {
          leftLid.setAttribute("d", closedLeft);
          rightLid.setAttribute("d", closedRight);
          return;
        }
        leftLid.style.transition =
          "d 0.25s cubic-bezier(0.34, 1.0, 0.64, 1)";
        rightLid.style.transition =
          "d 0.25s cubic-bezier(0.34, 1.0, 0.64, 1)";
        leftLid.setAttribute("d", closedLeft);
        rightLid.setAttribute("d", closedRight);
      }

      function peekLids() {
        const peekLeft = lidPath(leftEyeCenter, false, true);
        const peekRight = lidPath(rightEyeCenter, false, true);
        if (reducedMotion) {
          leftLid.setAttribute("d", peekLeft);
          rightLid.setAttribute("d", peekRight);
          return;
        }
        leftLid.style.transition =
          "d 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
        rightLid.style.transition =
          "d 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
        leftLid.setAttribute("d", peekLeft);
        rightLid.setAttribute("d", peekRight);
      }

      function onMouseMoveGlobal(e: MouseEvent) {
        movePupilsToward(e.clientX, e.clientY);
      }

      function onEmailInput() {
        const rect = emailInput.getBoundingClientRect();
        const caretFraction = emailInput.selectionStart
          ? emailInput.selectionStart / Math.max(emailInput.value.length, 1)
          : 0.5;
        const caretX =
          rect.left + rect.width * clamp(caretFraction, 0.1, 0.9);
        const caretY = rect.top + rect.height / 2;
        movePupilsToward(caretX, caretY);
      }

      function onEmailFocus() {
        riseUp();
        openLids();
        onEmailInput();
      }

      function onEmailBlur() {
        settleDown();
      }

      function onPassFocus() {
        riseUp();
        closeLids();
      }

      function onPassBlur() {
        settleDown();
        openLids();
      }

      function onRevealToggle() {
        const isPassword = passInput.type === "password";
        passInput.type = isPassword ? "text" : "password";
        revealBtn.textContent = isPassword ? "Hide" : "Show";
        if (isPassword) {
          peekLids();
        } else {
          if (document.activeElement === passInput) {
            closeLids();
          } else {
            openLids();
          }
        }
      }

      // ROW 3: submit handler wired via DOM — indicator acknowledges
      function onFormSubmit(e: Event) {
        e.preventDefault();
        closeLids();
        settleDown();
        setSubmitted(true);
      }

      const form = container.querySelector<HTMLFormElement>("#auth-form")!;

      document.addEventListener("mousemove", onMouseMoveGlobal);
      emailInput.addEventListener("input", onEmailInput);
      emailInput.addEventListener("focus", onEmailFocus);
      emailInput.addEventListener("blur", onEmailBlur);
      emailInput.addEventListener("keyup", onEmailInput);
      passInput.addEventListener("focus", onPassFocus);
      passInput.addEventListener("blur", onPassBlur);
      revealBtn.addEventListener("click", onRevealToggle);
      form.addEventListener("submit", onFormSubmit);

      return () => {
        document.removeEventListener("mousemove", onMouseMoveGlobal);
        emailInput.removeEventListener("input", onEmailInput);
        emailInput.removeEventListener("focus", onEmailFocus);
        emailInput.removeEventListener("blur", onEmailBlur);
        emailInput.removeEventListener("keyup", onEmailInput);
        passInput.removeEventListener("focus", onPassFocus);
        passInput.removeEventListener("blur", onPassBlur);
        revealBtn.removeEventListener("click", onRevealToggle);
        form.removeEventListener("submit", onFormSubmit);
      };
    },
    [reducedMotion],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    return setup(el);
  }, [setup]);

  return (
    <div
      ref={containerRef}
      className="auth-form-container"
      style={{
        maxWidth: 380,
        margin: "0 auto",
        fontFamily: "'Space Mono', monospace",
      }}
    >
      {/* Indicator wrapper — the ENTIRE attentive presence rises/settles as one object */}
      <div
        className="auth-indicator-wrapper"
        style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}
      >
        <svg
          className="auth-indicator"
          viewBox="0 0 80 50"
          width={120}
          height={75}
          aria-hidden="true"
          style={{ overflow: "visible" }}
        >
          <rect
            id="indicator-body"
            x="15"
            y="16"
            width="50"
            height="30"
            rx="12"
            fill={ACCENT}
          />
          <circle cx={30} cy={28} r={EYE_RADIUS} fill="#fff" />
          <circle cx={50} cy={28} r={EYE_RADIUS} fill="#fff" />
          <circle
            id="left-pupil"
            cx={30}
            cy={28}
            r={PUPIL_RADIUS}
            fill="#14161a"
          />
          <circle
            id="right-pupil"
            cx={50}
            cy={28}
            r={PUPIL_RADIUS}
            fill="#14161a"
          />
          <path
            id="left-lid"
            d={`M ${30 - EYE_RADIUS} 28 Q 30 ${28 - EYE_RADIUS} ${30 + EYE_RADIUS} 28`}
            fill="none"
            stroke={ACCENT}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            id="right-lid"
            d={`M ${50 - EYE_RADIUS} 28 Q 50 ${28 - EYE_RADIUS} ${50 + EYE_RADIUS} 28`}
            fill="none"
            stroke={ACCENT}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ROW 3: real <form> — password inside form, Enter submits */}
      <form
        id="auth-form"
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "32px 28px 28px",
          border: "1px solid rgba(20,22,26,0.1)",
        }}
      >
        <h3
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 24,
            color: "#14161a",
            textAlign: "center",
          }}
        >
          Welcome back
        </h3>

        <label
          htmlFor="auth-email"
          style={{
            display: "block",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(20,22,26,0.45)",
            marginBottom: 6,
          }}
        >
          Email
        </label>
        <input
          id="auth-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid rgba(20,22,26,0.15)",
            fontSize: 15,
            fontFamily: "'Space Mono', monospace",
            marginBottom: 16,
            boxSizing: "border-box",
            transition: "border-color 0.15s",
            background: "#fff",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = ACCENT)}
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "rgba(20,22,26,0.15)")
          }
        />

        <label
          htmlFor="auth-password"
          style={{
            display: "block",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(20,22,26,0.45)",
            marginBottom: 6,
          }}
        >
          Password
        </label>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <input
            id="auth-password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            style={{
              width: "100%",
              padding: "10px 60px 10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(20,22,26,0.15)",
              fontSize: 15,
              fontFamily: "'Space Mono', monospace",
              boxSizing: "border-box",
              transition: "border-color 0.15s",
              background: "#fff",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = ACCENT)}
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "rgba(20,22,26,0.15)")
            }
          />
          <button
            id="auth-reveal"
            type="button"
            style={{
              position: "absolute",
              right: 10,
              background: "none",
              border: "none",
              color: ACCENT,
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              padding: "4px 6px",
            }}
          >
            Show
          </button>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px 0",
            borderRadius: 10,
            border: "none",
            background: ACCENT,
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "'Space Mono', monospace",
            cursor: "pointer",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Sign in
        </button>

        {/* ROW 3: visible demo response after submit */}
        {submitted && (
          <p
            style={{
              textAlign: "center",
              marginTop: 12,
              fontSize: 12,
              color: "rgba(20,22,26,0.5)",
              fontStyle: "italic",
            }}
          >
            Signed in as a demo — no account was created.
          </p>
        )}

        <div
          style={{
            textAlign: "center",
            marginTop: submitted ? 8 : 16,
            fontSize: 13,
            color: "rgba(20,22,26,0.45)",
          }}
        >
          No account?{" "}
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              color: ACCENT,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 13,
              fontFamily: "'Space Mono', monospace",
              padding: 0,
            }}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
