import { useState, useCallback, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Control descriptor types                                          */
/* ------------------------------------------------------------------ */

interface RangeControl {
  key: string;
  label?: string;
  type: "range";
  min: number;
  max: number;
  step?: number;
  default: number;
}

interface ToggleControl {
  key: string;
  label?: string;
  type: "toggle";
  default: boolean;
}

interface ColorControl {
  key: string;
  label?: string;
  type: "color";
  default: string;
}

interface SelectControl {
  key: string;
  label?: string;
  type: "select";
  options: string[];
  default: string;
}

export type ControlDescriptor =
  | RangeControl
  | ToggleControl
  | ColorControl
  | SelectControl;

export type ControlValues = Record<string, number | boolean | string>;

/* ------------------------------------------------------------------ */
/*  Defaults helper                                                   */
/* ------------------------------------------------------------------ */

function buildDefaults(controls: ControlDescriptor[]): ControlValues {
  const out: ControlValues = {};
  for (const c of controls) out[c.key] = c.default;
  return out;
}

/* ------------------------------------------------------------------ */
/*  Individual control renderers                                      */
/* ------------------------------------------------------------------ */

function RangeInput({
  ctrl,
  value,
  onChange,
}: {
  ctrl: RangeControl;
  value: number;
  onChange: (v: number) => void;
}) {
  const step = ctrl.step ?? (ctrl.max - ctrl.min <= 2 ? 0.01 : 1);
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-zinc-400">
        {ctrl.label ?? ctrl.key}{" "}
        <span className="font-mono text-zinc-500">
          {typeof value === "number" && value % 1 !== 0
            ? value.toFixed(2)
            : value}
        </span>
      </span>
      <input
        type="range"
        min={ctrl.min}
        max={ctrl.max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-emerald-400 h-1.5 bg-zinc-700 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400
          [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(52,211,153,0.5)]
          [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5
          [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-emerald-400
          [&::-moz-range-thumb]:border-0"
      />
    </label>
  );
}

function ToggleInput({
  ctrl,
  value,
  onChange,
}: {
  ctrl: ToggleControl;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span className="text-xs text-zinc-400">{ctrl.label ?? ctrl.key}</span>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
          value ? "bg-emerald-500" : "bg-zinc-700"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform mt-0.5 ${
            value ? "translate-x-[18px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}

function ColorInput({
  ctrl,
  value,
  onChange,
}: {
  ctrl: ColorControl;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span className="text-xs text-zinc-400">{ctrl.label ?? ctrl.key}</span>
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded-md border border-zinc-700 bg-transparent cursor-pointer p-0"
        />
      </div>
    </label>
  );
}

function SelectInput({
  ctrl,
  value,
  onChange,
}: {
  ctrl: SelectControl;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-zinc-400">{ctrl.label ?? ctrl.key}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-zinc-800 border border-zinc-700 rounded-md px-2.5 py-1.5 text-xs text-zinc-200 font-mono cursor-pointer focus:outline-none focus:border-emerald-500/50"
      >
        {ctrl.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  Playground component                                              */
/* ------------------------------------------------------------------ */

export interface PlaygroundProps {
  title: string;
  controls: ControlDescriptor[];
  render: (values: ControlValues, replay: number) => ReactNode;
}

export function Playground({ title, controls, render }: PlaygroundProps) {
  const [values, setValues] = useState<ControlValues>(() =>
    buildDefaults(controls),
  );
  const [replayKey, setReplayKey] = useState(0);

  const set = useCallback(
    (key: string, v: number | boolean | string) =>
      setValues((prev) => ({ ...prev, [key]: v })),
    [],
  );

  const reset = useCallback(() => {
    setValues(buildDefaults(controls));
    setReplayKey((k) => k + 1);
  }, [controls]);

  const replay = useCallback(() => setReplayKey((k) => k + 1), []);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800">
        <h3 className="text-sm font-mono font-semibold text-zinc-300 tracking-wide">
          {title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={replay}
            className="px-3 py-1 text-[11px] font-mono rounded-md bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
          >
            Replay
          </button>
          <button
            onClick={reset}
            className="px-3 py-1 text-[11px] font-mono rounded-md bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Body: preview + controls */}
      <div className="flex flex-col md:flex-row">
        {/* Preview */}
        <div
          className="flex-1 flex items-center justify-center min-h-[200px] p-8 bg-zinc-950/50"
          key={replayKey}
        >
          {render(values, replayKey)}
        </div>

        {/* Controls panel */}
        <div className="w-full md:w-64 lg:w-72 shrink-0 border-t md:border-t-0 md:border-l border-zinc-800 bg-zinc-900 p-5 space-y-4">
          {controls.map((ctrl) => {
            switch (ctrl.type) {
              case "range":
                return (
                  <RangeInput
                    key={ctrl.key}
                    ctrl={ctrl}
                    value={values[ctrl.key] as number}
                    onChange={(v) => set(ctrl.key, v)}
                  />
                );
              case "toggle":
                return (
                  <ToggleInput
                    key={ctrl.key}
                    ctrl={ctrl}
                    value={values[ctrl.key] as boolean}
                    onChange={(v) => set(ctrl.key, v)}
                  />
                );
              case "color":
                return (
                  <ColorInput
                    key={ctrl.key}
                    ctrl={ctrl}
                    value={values[ctrl.key] as string}
                    onChange={(v) => set(ctrl.key, v)}
                  />
                );
              case "select":
                return (
                  <SelectInput
                    key={ctrl.key}
                    ctrl={ctrl}
                    value={values[ctrl.key] as string}
                    onChange={(v) => set(ctrl.key, v)}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}
