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
const FILL_DURATION = 0.4;
const DRAIN_DURATION = 0.35;
const DROPLET_DURATION = 0.2;
const MERGE_DURATION = 0.5;
const GAP = 10;

export function OtpForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const fillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const boxesRef = useRef<(HTMLInputElement | null)[]>([]);
  const dropletsRef = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mergedRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const [digits, setDigits] = useState<string[]>(Array(BOX_COUNT).fill(""));

  // ROW 2: tracked tweens — every GSAP tween and timeout stored for kill
  const mergeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mergeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const fillTweensRef = useRef<gsap.core.Tween[]>([]);
  const dropletTweensRef = useRef<gsap.core.Tween[]>([]);

  const setCellRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      cellsRef.current[idx] = el;
    },
    [],
  );

  const setFillRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      fillsRef.current[idx] = el;
    },
    [],
  );

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

  function killAllTweens() {
    if (mergeTimeoutRef.current !== null) {
      clearTimeout(mergeTimeoutRef.current);
      mergeTimeoutRef.current = null;
    }
    if (mergeTimelineRef.current) {
      mergeTimelineRef.current.kill();
      mergeTimelineRef.current = null;
    }
    fillTweensRef.current.forEach((tw) => tw.kill());
    fillTweensRef.current = [];
    dropletTweensRef.current.forEach((tw) => tw.kill());
    dropletTweensRef.current = [];
  }

  // ROW 1: liquid fill — same elastic material on raise AND drain
  const animateLiquidFill = useCallback(
    (idx: number) => {
      const fill = fillsRef.current[idx];
      if (!fill) return;
      if (reducedMotion) {
        fill.style.height = "100%";
        return;
      }
      const tw = gsap.to(fill, {
        height: "100%",
        duration: FILL_DURATION,
        ease: "elastic.out(1.2, 0.4)",
      });
      fillTweensRef.current.push(tw);
    },
    [reducedMotion],
  );

  // ROW 1: drain — same elastic liquid material as raise
  const animateLiquidDrain = useCallback(
    (idx: number) => {
      const fill = fillsRef.current[idx];
      if (!fill) return;
      if (reducedMotion) {
        fill.style.height = "0%";
        return;
      }
      const tw = gsap.to(fill, {
        height: "0%",
        duration: DRAIN_DURATION,
        ease: "elastic.out(1.2, 0.4)",
      });
      fillTweensRef.current.push(tw);
    },
    [reducedMotion],
  );

  const animateDroplet = useCallback(
    (fromIdx: number) => {
      if (reducedMotion) return;
      const droplet = dropletsRef.current[fromIdx];
      if (!droplet) return;
      const fromCell = cellsRef.current[fromIdx];
      const toCell = cellsRef.current[fromIdx + 1];
      if (!fromCell || !toCell) return;

      const fromRect = fromCell.getBoundingClientRect();
      const toRect = toCell.getBoundingClientRect();
      const wrapperRect = wrapperRef.current?.getBoundingClientRect();
      if (!wrapperRect) return;

      const startX = fromRect.right - wrapperRect.left;
      const endX = toRect.left - wrapperRect.left;
      const y = fromRect.top - wrapperRect.top + fromRect.height / 2;

      gsap.set(droplet, { x: startX, y: y, opacity: 1, scale: 1 });
      const tw1 = gsap.to(droplet, {
        x: endX,
        duration: DROPLET_DURATION,
        ease: "power2.out",
        onComplete: () => {
          const tw2 = gsap.to(droplet, {
            opacity: 0,
            scale: 0.3,
            duration: 0.1,
          });
          dropletTweensRef.current.push(tw2);
        },
      });
      dropletTweensRef.current.push(tw1);
    },
    [reducedMotion],
  );

  const animateMerge = useCallback(() => {
    if (mergedRef.current) return;
    mergedRef.current = true;

    const cells = cellsRef.current.filter(Boolean) as HTMLDivElement[];
    const fills = fillsRef.current.filter(Boolean) as HTMLDivElement[];
    const inputs = boxesRef.current.filter(Boolean) as HTMLInputElement[];
    const wrapper = wrapperRef.current;
    if (!wrapper || cells.length < BOX_COUNT) return;

    if (reducedMotion) {
      wrapper.style.gap = "0px";
      cells.forEach((cell, i) => {
        cell.style.backgroundColor = ACCENT;
        cell.style.borderColor = "transparent";
        if (i === 0) cell.style.borderRadius = "28px 0 0 28px";
        else if (i === BOX_COUNT - 1)
          cell.style.borderRadius = "0 28px 28px 0";
        else cell.style.borderRadius = "0";
      });
      fills.forEach((f) => (f.style.opacity = "0"));
      inputs.forEach((inp) => (inp.style.color = "#fff"));
      return;
    }

    const wrapperRect = wrapper.getBoundingClientRect();
    const cellWidth = cells[0].getBoundingClientRect().width;
    const mergedWidth = cellWidth * BOX_COUNT;
    const mergedLeft = (wrapperRect.width - mergedWidth) / 2;

    const tl = gsap.timeline();
    mergeTimelineRef.current = tl;

    cells.forEach((cell, i) => {
      const cellRect = cell.getBoundingClientRect();
      const currentLeft = cellRect.left - wrapperRect.left;
      const targetLeft = mergedLeft + i * cellWidth;
      const moveX = targetLeft - currentLeft;

      tl.to(
        cell,
        {
          x: moveX,
          duration: MERGE_DURATION,
          ease: "elastic.out(1.0, 0.6)",
        },
        0,
      );
    });

    tl.to(fills, { opacity: 0, duration: 0.15 }, MERGE_DURATION * 0.5);

    cells.forEach((cell, i) => {
      const pillProps: gsap.TweenVars = {
        backgroundColor: ACCENT,
        borderColor: "transparent",
        duration: 0.2,
      };
      if (i === 0) pillProps.borderRadius = "28px 0 0 28px";
      else if (i === BOX_COUNT - 1)
        pillProps.borderRadius = "0 28px 28px 0";
      else pillProps.borderRadius = "0";

      tl.to(cell, pillProps, MERGE_DURATION * 0.55);
    });

    tl.to(inputs, { color: "#fff", duration: 0.2 }, MERGE_DURATION * 0.55);
  }, [reducedMotion]);

  const scheduleMerge = useCallback(() => {
    if (reducedMotion) {
      animateMerge();
    } else {
      mergeTimeoutRef.current = setTimeout(() => {
        mergeTimeoutRef.current = null;
        animateMerge();
      }, 200);
    }
  }, [animateMerge, reducedMotion]);

  const handleInput = useCallback(
    (idx: number, value: string) => {
      const digit = value.replace(/\D/g, "").slice(-1);
      setDigits((prev) => {
        const next = [...prev];
        const hadDigit = !!prev[idx];
        next[idx] = digit;

        if (digit) {
          // ROW 1: overwrite re-plays fill (drain from current then raise)
          if (hadDigit) {
            animateLiquidDrain(idx);
            const fill = fillsRef.current[idx];
            if (fill && !reducedMotion) {
              const tw = gsap.to(fill, {
                height: "100%",
                duration: FILL_DURATION,
                ease: "elastic.out(1.2, 0.4)",
                delay: DRAIN_DURATION * 0.3,
              });
              fillTweensRef.current.push(tw);
            } else if (fill && reducedMotion) {
              fill.style.height = "100%";
            }
          } else {
            animateLiquidFill(idx);
          }

          if (idx < BOX_COUNT - 1) {
            animateDroplet(idx);
            requestAnimationFrame(() => {
              boxesRef.current[idx + 1]?.focus();
            });
          }

          const allFilled = next.every((d) => d !== "");
          if (allFilled) {
            scheduleMerge();
          }
        } else {
          // ROW 1: digit cleared — drain fill
          animateLiquidDrain(idx);
        }

        return next;
      });
    },
    [
      animateLiquidFill,
      animateLiquidDrain,
      animateDroplet,
      scheduleMerge,
      reducedMotion,
    ],
  );

  const handleKeyDown = useCallback(
    (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (!digits[idx] && idx > 0) {
          boxesRef.current[idx - 1]?.focus();
        } else if (digits[idx]) {
          // ROW 1: drain the fill for this cell
          animateLiquidDrain(idx);
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
    [digits, animateLiquidDrain],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, BOX_COUNT);
      if (!pasted) return;
      const newDigits = [...digits];
      for (let i = 0; i < BOX_COUNT; i++) {
        if (i < pasted.length) {
          newDigits[i] = pasted[i];
          animateLiquidFill(i);
          if (i < pasted.length - 1) animateDroplet(i);
        } else if (newDigits[i]) {
          // ROW 1: cells beyond paste length drain
          newDigits[i] = "";
          animateLiquidDrain(i);
        }
      }
      setDigits(newDigits);
      const nextEmpty = newDigits.findIndex((d) => !d);
      const focusIdx = nextEmpty === -1 ? BOX_COUNT - 1 : nextEmpty;
      boxesRef.current[focusIdx]?.focus();

      if (newDigits.every((d) => d !== "")) {
        scheduleMerge();
      }
    },
    [
      digits,
      animateLiquidFill,
      animateLiquidDrain,
      animateDroplet,
      scheduleMerge,
    ],
  );

  // ROW 2: reset kills everything, restores six empty cells, safe to call twice
  const reset = useCallback(() => {
    killAllTweens();
    mergedRef.current = false;
    setDigits(Array(BOX_COUNT).fill(""));

    const wrapper = wrapperRef.current;
    const cells = cellsRef.current.filter(Boolean) as HTMLDivElement[];
    const fills = fillsRef.current.filter(Boolean) as HTMLDivElement[];
    const inputs = boxesRef.current.filter(Boolean) as HTMLInputElement[];
    const droplets = dropletsRef.current.filter(Boolean) as HTMLDivElement[];

    if (wrapper) wrapper.style.gap = `${GAP}px`;

    cells.forEach((cell) => {
      gsap.set(cell, { x: 0, clearProps: "all" });
      cell.style.backgroundColor = "#fff";
      cell.style.borderColor = "rgba(20,22,26,0.15)";
      cell.style.borderRadius = "12px";
    });

    fills.forEach((fill) => {
      gsap.set(fill, { clearProps: "all" });
      fill.style.height = "0%";
      fill.style.opacity = "1";
    });

    inputs.forEach((inp) => {
      inp.style.color = "#14161a";
      inp.value = "";
    });

    droplets.forEach((d) => {
      gsap.set(d, { opacity: 0 });
    });

    boxesRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    const fills = fillsRef.current.filter(Boolean) as HTMLDivElement[];
    fills.forEach((f) => (f.style.height = "0%"));
  }, []);

  return (
    <div
      ref={containerRef}
      className="otp-form-container"
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
            gap: GAP,
            marginBottom: 24,
          }}
          onPaste={handlePaste}
        >
          {Array.from({ length: BOX_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={setCellRef(i)}
              style={{
                position: "relative",
                width: 48,
                height: 56,
                borderRadius: 12,
                border: "2px solid rgba(20,22,26,0.15)",
                boxSizing: "border-box",
                overflow: "hidden",
                backgroundColor: "#fff",
                transition: "border-color 0.15s",
              }}
            >
              <div
                ref={setFillRef(i)}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "0%",
                  background: `${ACCENT}20`,
                  borderRadius: "4px 4px 0 0",
                  pointerEvents: "none",
                }}
              />
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
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  fontSize: 24,
                  fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                  border: "none",
                  background: "transparent",
                  color: "#14161a",
                  boxSizing: "border-box",
                }}
                onFocus={() => {
                  const cell = cellsRef.current[i];
                  if (cell && !mergedRef.current)
                    cell.style.borderColor = ACCENT;
                }}
                onBlur={() => {
                  const cell = cellsRef.current[i];
                  if (cell && !mergedRef.current && !digits[i])
                    cell.style.borderColor = "rgba(20,22,26,0.15)";
                }}
              />
            </div>
          ))}

          {Array.from({ length: BOX_COUNT - 1 }).map((_, i) => (
            <div
              key={`droplet-${i}`}
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
          ))}
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
