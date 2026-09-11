// Pack: Backgrounds (original) / Source: Original / License: MIT

import { cn } from "../../lib/utils";

interface GradientMeshProps {
  className?: string;
}

const meshLayers = [
  {
    gradient:
      "radial-gradient(ellipse 50% 60% at 20% 30%, rgba(16, 185, 129, 0.25) 0%, transparent 70%)",
    animation: "meshDrift1 16s ease-in-out infinite alternate",
  },
  {
    gradient:
      "radial-gradient(ellipse 40% 50% at 70% 60%, rgba(45, 212, 191, 0.2) 0%, transparent 70%)",
    animation: "meshDrift2 20s ease-in-out infinite alternate",
  },
  {
    gradient:
      "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
    animation: "meshDrift3 24s ease-in-out infinite alternate",
  },
  {
    gradient:
      "radial-gradient(ellipse 45% 55% at 80% 20%, rgba(139, 92, 246, 0.18) 0%, transparent 70%)",
    animation: "meshDrift4 18s ease-in-out infinite alternate",
  },
  {
    gradient:
      "radial-gradient(ellipse 35% 65% at 30% 80%, rgba(20, 184, 166, 0.15) 0%, transparent 70%)",
    animation: "meshDrift5 22s ease-in-out infinite alternate",
  },
];

const keyframes = `
  @keyframes meshDrift1 {
    0% { transform: translate(0%, 0%) scale(1); }
    100% { transform: translate(15%, -10%) scale(1.15); }
  }
  @keyframes meshDrift2 {
    0% { transform: translate(0%, 0%) scale(1.1); }
    100% { transform: translate(-20%, 15%) scale(0.9); }
  }
  @keyframes meshDrift3 {
    0% { transform: translate(0%, 0%) scale(1); }
    100% { transform: translate(10%, 20%) scale(1.2); }
  }
  @keyframes meshDrift4 {
    0% { transform: translate(0%, 0%) scale(1.05); }
    100% { transform: translate(-15%, 10%) scale(1.1); }
  }
  @keyframes meshDrift5 {
    0% { transform: translate(0%, 0%) scale(1); }
    100% { transform: translate(20%, -15%) scale(1.15); }
  }
`;

export function GradientMesh({ className }: GradientMeshProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-zinc-950",
        className,
      )}
    >
      <style>{keyframes}</style>
      {meshLayers.map((layer, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            backgroundImage: layer.gradient,
            animation: layer.animation,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
