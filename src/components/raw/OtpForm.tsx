// Raw lane — OTP specimen
// GSAP timeline — deliberate stagger/duration math, not CSS transitions.
// Idea: the digits converge into one shape when complete;
// the six-box grid is temporary, not the point.
// Reference vocabulary: video 18 (liquid overshoot fill, droplet hand-off,
// boxes merge into pill). Law 2 material: liquid/soft → elastic overshoot.

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const ACCENT = "#10b981";
const BOX_COUNT = 6;
const DIGIT_FILL_DURATION = 0.4;
const DROPLET_DURATION = 0.2;
const MERGE_DURATION = 0.5;

export function OtpForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<(HTMLInputElement | null)[]>([]);
  const dropletsRef = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const mergedRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const [digits, setDigits] = useState<string[]>(Array(BOX_COUNT).fill(""));

  const setBoxRef = useCallback(
    (idx: number) => (el: HTMLInputElement | null) => {
      boxesRef.current[idx] = el;
    },
    [],
  );

  const setDropletRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      dropletsRef.current[idx] = el;
    },
    [],
  );

  const animateDigitFill = useCallback(
    (box: HTMLInputElement) => {
      if (reducedMotion) return;
      gsap.fromTo(
        box,
        { scale: 0.7, opacity: 0.3 },
        {
          scale: 1,
          opacity: 1,
          duration: DIGIT_FILL_DURATION,
          ease: "elastic.out(1.4, 0.4)",
        },
      );
    },
    [reducedMotion],
  );

  const animateDroplet = useCallback(
    (fromIdx: number) => {
      if (reducedMotion) return;
      const droplet = dropletsRef.current[fromIdx];
      if (!droplet) return;
      const fromBox = boxesRef.current[fromIdx];
      const toBox = boxesRef.current[fromIdx + 1];
      if (!fromBox || !toBox) return;

      const fromRect = fromBox.getBoundingClientRect();
      const toRect = toBox.getBoundingClientRect();
      const wrapperRect = wrapperRef.current?.getBoundingClientRect();
      if (!wrapperRect) return;

      const startX = fromRect.right - wrapperRect.left;
      const endX = toRect.left - wrapperRect.left;
      const y = fromRect.top - wrapperRect.top + fromRect.height / 2;

      gsap.set(droplet, {
        x: startX,
        y: y,
        opacity: 1,
        scale: 1,
      });
      gsap.to(droplet, {
        x: endX,
        duration: DROPLET_DURATION,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(droplet, { opacity: 0, scale: 0.3, duration: 0.1 });
        },
      });
    },
    [reducedMotion],
  );

  const animateMerge = useCallback(() => {
    if (mergedRef.current) return;
    mergedRef.current = true;

    const boxes = boxesRef.current.filter(Boolean) as HTMLInputElement[];
    const wrapper = wrapperRef.current;
    const pill = pillRef.current;
    if (!wrapper || !pill || boxes.length < BOX_COUNT) return;

    if (reducedMotion) {
      boxes.forEach((b) => (b.style.opacity = "0"));
      pill.style.opacity = "1";
      pill.style.display = "flex";
      return;
    }

    const tl = gsap.timeline();
    const wrapperRect = wrapper.getBoundingClientRect();
    const centerX = wrapperRect.width / 2;

    boxes.forEach((box, i) => {
      const boxRect = box.getBoundingClientRect();
      const boxCenterX = boxRect.left - wrapperRect.left + boxRect.width / 2;
      const moveX = centerX - boxCenterX;

      tl.to(
        box,
        {
          x: moveX,
          duration: MERGE_DURATION,
          ease: "elastic.out(1.0, 0.6)",
        },
        0,
      );
    });

    tl.to(
      boxes,
      {
        opacity: 0,
        duration: 0.15,
      },
      MERGE_DURATION * 0.7,
    );

    tl.fromTo(
      pill,
      {
        opacity: 0,
        scale: 0.6,
        display: "flex",
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1.2, 0.5)",
        display: "flex",
      },
      MERGE_DURATION * 0.6,
    );
  }, [reducedMotion]);

  const handleInput = useCallback(
    (idx: number, value: string) => {
      const digit = value.replace(/\D/g, "").slice(-1);
      setDigits((prev) => {
        const next = [...prev];
        next[idx] = digit;

        if (digit) {
          const box = boxesRef.current[idx];
          if (box) animateDigitFill(box);

          if (idx < BOX_COUNT - 1) {
            animateDroplet(idx);
            requestAnimationFrame(() => {
              boxesRef.current[idx + 1]?.focus();
            });
          }

          const allFilled = next.every((d) => d !== "");
          if (allFilled) {
            setTimeout(() => animateMerge(), 200);
          }
        }

        return next;
      });
    },
    [animateDigitFill, animateDroplet, animateMerge],
  );

  const handleKeyDown = useCallback(
    (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (!digits[idx] && idx > 0) {
          boxesRef.current[idx - 1]?.focus();
        }
        setDigits((prev) => {
          const next = [...prev];
          next[idx] = "";
          return next;
        });
      }
      if (e.key === "ArrowLeft" && idx > 0) {
        boxesRef.current[idx - 1]?.focus();
      }
      if (e.key === "ArrowRight" && idx < BOX_COUNT - 1) {
        boxesRef.current[idx + 1]?.focus();
      }
    },
    [digits],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, BOX_COUNT);
      if (!pasted) return;
      const newDigits = [...digits];
      for (let i = 0; i < pasted.length; i++) {
        newDigits[i] = pasted[i];
        const box = boxesRef.current[i];
        if (box) {
          box.value = pasted[i];
          animateDigitFill(box);
          if (i < pasted.length - 1) animateDroplet(i);
        }
      }
      setDigits(newDigits);
      const nextEmpty = newDigits.findIndex((d) => !d);
      const focusIdx = nextEmpty === -1 ? BOX_COUNT - 1 : nextEmpty;
      boxesRef.current[focusIdx]?.focus();

      if (newDigits.every((d) => d !== "")) {
        setTimeout(() => animateMerge(), 200);
      }
    },
    [digits, animateDigitFill, animateDroplet, animateMerge],
  );

  const reset = useCallback(() => {
    mergedRef.current = false;
    setDigits(Array(BOX_COUNT).fill(""));
    const boxes = boxesRef.current.filter(Boolean) as HTMLInputElement[];
    const pill = pillRef.current;

    boxes.forEach((box) => {
      gsap.set(box, { x: 0, opacity: 1, scale: 1 });
      box.value = "";
    });

    if (pill) {
      gsap.set(pill, { opacity: 0, scale: 0.6, display: "none" });
    }

    boxesRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    const pill = pillRef.current;
    if (pill) {
      gsap.set(pill, { display: "none", opacity: 0 });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        maxWidth: 420,
        margin: "0 auto",
        fontFamily: "'Space Mono', monospace",
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "32px 24px 28px",
          border: "1px solid rgba(20,22,26,0.1)",
        }}
      >
        <h3
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 8,
            color: "#14161a",
          }}
        >
          Enter verification code
        </h3>
        <p
          style={{
            fontSize: 13,
            color: "rgba(20,22,26,0.45)",
            marginBottom: 28,
          }}
        >
          We sent a 6-digit code to your email
        </p>

        <div
          ref={wrapperRef}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginBottom: 24,
          }}
          onPaste={handlePaste}
        >
          {Array.from({ length: BOX_COUNT }).map((_, i) => (
            <div key={i} style={{ position: "relative" }}>
              <input
                ref={setBoxRef(i)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                maxLength={1}
                aria-label={`Digit ${i + 1} of ${BOX_COUNT}`}
                value={digits[i]}
                onChange={(e) => handleInput(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                style={{
                  width: 48,
                  height: 56,
                  textAlign: "center",
                  fontSize: 24,
                  fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                  borderRadius: 12,
                  border: `2px solid ${digits[i] ? ACCENT : "rgba(20,22,26,0.15)"}`,
                  outline: "none",
                  color: "#14161a",
                  transition: "border-color 0.15s",
                  background: digits[i]
                    ? `${ACCENT}08`
                    : "#fff",
                }}
                onFocus={(e) => {
                  if (!digits[i])
                    e.currentTarget.style.borderColor = ACCENT;
                }}
                onBlur={(e) => {
                  if (!digits[i])
                    e.currentTarget.style.borderColor = "rgba(20,22,26,0.15)";
                }}
              />
              {i < BOX_COUNT - 1 && (
                <div
                  ref={setDropletRef(i)}
                  style={{
                    position: "absolute",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: ACCENT,
                    opacity: 0,
                    pointerEvents: "none",
                    top: 0,
                    left: 0,
                    zIndex: 10,
                  }}
                />
              )}
            </div>
          ))}

          {/* Merged pill — hidden until all digits filled */}
          <div
            ref={pillRef}
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              height: 56,
              padding: "0 28px",
              borderRadius: 28,
              background: ACCENT,
              color: "#fff",
              fontSize: 24,
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.15em",
              whiteSpace: "nowrap" as const,
            }}
          >
            {digits.join("")}
          </div>
        </div>

        <button
          type="button"
          onClick={reset}
          style={{
            background: "none",
            border: "none",
            color: ACCENT,
            cursor: "pointer",
            fontSize: 13,
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
            padding: "4px 8px",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
