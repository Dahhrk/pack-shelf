// Raw lane — Auth specimen
// Vanilla CSS transitions + plain JS DOM manipulation. No animation library.
// Idea: the form treats you as a stranger until proven otherwise;
// it reacts to what you're doing, not just to submit.

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const ACCENT = "#3b82f6";
const EYE_RADIUS = 5;
const PUPIL_RADIUS = 2.4;
const MAX_PUPIL_OFFSET = 2.2;

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export function AuthForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const setup = useCallback(
    (container: HTMLDivElement) => {
      const indicator = container.querySelector<SVGSVGElement>(".auth-indicator")!;
      const leftPupil = container.querySelector<SVGCircleElement>("#left-pupil")!;
      const rightPupil = container.querySelector<SVGCircleElement>("#right-pupil")!;
      const leftLid = container.querySelector<SVGPathElement>("#left-lid")!;
      const rightLid = container.querySelector<SVGPathElement>("#right-lid")!;
      const body = container.querySelector<SVGRectElement>("#indicator-body")!;
      const emailInput = container.querySelector<HTMLInputElement>("#auth-email")!;
      const passInput = container.querySelector<HTMLInputElement>("#auth-password")!;
      const revealBtn = container.querySelector<HTMLButtonElement>("#auth-reveal")!;

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
          const ox = clamp((dx / dist) * MAX_PUPIL_OFFSET, -MAX_PUPIL_OFFSET, MAX_PUPIL_OFFSET);
          const oy = clamp((dy / dist) * MAX_PUPIL_OFFSET, -MAX_PUPIL_OFFSET, MAX_PUPIL_OFFSET);
          pupil.setAttribute("cx", String(center.cx + ox));
          pupil.setAttribute("cy", String(center.cy + oy));
        });
      }

      function riseUp() {
        if (reducedMotion) {
          body.setAttribute("y", "10");
          return;
        }
        body.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
        body.style.transform = "translateY(-6px)";
      }

      function settleDown() {
        if (reducedMotion) {
          body.setAttribute("y", "16");
          return;
        }
        body.style.transition = "transform 0.3s cubic-bezier(0.34, 1.0, 0.64, 1)";
        body.style.transform = "translateY(0px)";
      }

      function openLids() {
        if (reducedMotion) return;
        leftLid.style.transition = "d 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)";
        rightLid.style.transition = "d 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)";
        leftLid.setAttribute("d", lidPath(leftEyeCenter, false));
        rightLid.setAttribute("d", lidPath(rightEyeCenter, false));
      }

      function closeLids() {
        if (reducedMotion) return;
        leftLid.style.transition = "d 0.25s cubic-bezier(0.34, 1.0, 0.64, 1)";
        rightLid.style.transition = "d 0.25s cubic-bezier(0.34, 1.0, 0.64, 1)";
        leftLid.setAttribute("d", lidPath(leftEyeCenter, true));
        rightLid.setAttribute("d", lidPath(rightEyeCenter, true));
      }

      function peekLids() {
        if (reducedMotion) return;
        leftLid.style.transition = "d 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
        rightLid.style.transition = "d 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
        leftLid.setAttribute("d", lidPath(leftEyeCenter, false, true));
        rightLid.setAttribute("d", lidPath(rightEyeCenter, false, true));
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

      function onMouseMoveGlobal(e: MouseEvent) {
        movePupilsToward(e.clientX, e.clientY);
      }

      function onEmailInput() {
        const rect = emailInput.getBoundingClientRect();
        const caretFraction = emailInput.selectionStart
          ? emailInput.selectionStart / Math.max(emailInput.value.length, 1)
          : 0.5;
        const caretX = rect.left + rect.width * clamp(caretFraction, 0.1, 0.9);
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

      document.addEventListener("mousemove", onMouseMoveGlobal);
      emailInput.addEventListener("input", onEmailInput);
      emailInput.addEventListener("focus", onEmailFocus);
      emailInput.addEventListener("blur", onEmailBlur);
      emailInput.addEventListener("keyup", onEmailInput);
      passInput.addEventListener("focus", onPassFocus);
      passInput.addEventListener("blur", onPassBlur);
      revealBtn.addEventListener("click", onRevealToggle);

      return () => {
        document.removeEventListener("mousemove", onMouseMoveGlobal);
        emailInput.removeEventListener("input", onEmailInput);
        emailInput.removeEventListener("focus", onEmailFocus);
        emailInput.removeEventListener("blur", onEmailBlur);
        emailInput.removeEventListener("keyup", onEmailInput);
        passInput.removeEventListener("focus", onPassFocus);
        passInput.removeEventListener("blur", onPassBlur);
        revealBtn.removeEventListener("click", onRevealToggle);
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
      {/* Indicator SVG — the attentive presence */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
        <svg
          className="auth-indicator"
          viewBox="0 0 80 50"
          width={120}
          height={75}
          aria-hidden="true"
          style={{ overflow: "visible" }}
        >
          {/* Body */}
          <rect
            id="indicator-body"
            x="15"
            y="16"
            width="50"
            height="30"
            rx="12"
            fill={ACCENT}
            style={{ transformOrigin: "center bottom" }}
          />
          {/* Left eye white */}
          <circle cx={30} cy={28} r={EYE_RADIUS} fill="#fff" />
          {/* Right eye white */}
          <circle cx={50} cy={28} r={EYE_RADIUS} fill="#fff" />
          {/* Left pupil */}
          <circle
            id="left-pupil"
            cx={30}
            cy={28}
            r={PUPIL_RADIUS}
            fill="#14161a"
          />
          {/* Right pupil */}
          <circle
            id="right-pupil"
            cx={50}
            cy={28}
            r={PUPIL_RADIUS}
            fill="#14161a"
          />
          {/* Left eyelid */}
          <path
            id="left-lid"
            d={`M ${30 - EYE_RADIUS} 28 Q 30 ${28 - EYE_RADIUS} ${30 + EYE_RADIUS} 28`}
            fill="none"
            stroke={ACCENT}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Right eyelid */}
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

      {/* Form — rigid container, does not animate (law 4) */}
      <div
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
            outline: "none",
            marginBottom: 16,
            boxSizing: "border-box",
            transition: "border-color 0.15s",
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
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.15s",
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
          type="button"
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

        <p
          style={{
            textAlign: "center",
            marginTop: 16,
            fontSize: 13,
            color: "rgba(20,22,26,0.45)",
          }}
        >
          No account?{" "}
          <span
            style={{
              color: ACCENT,
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
