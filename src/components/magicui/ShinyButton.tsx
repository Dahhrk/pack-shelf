// Pack: Magic UI — Shiny Button
// Source: https://magicui.design/docs/components/shiny-button
// GitHub: https://github.com/magicuidesign/magicui
// License: MIT

import { motion } from "motion/react";
import { cn } from "../../lib/utils";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 } as Record<string, string | number>,
  animate: { "--x": "-100%", scale: 1 } as Record<string, string | number>,
  whileTap: { scale: 0.95 } as Record<string, number>,
  transition: {
    repeat: Infinity,
    repeatType: "loop" as const,
    repeatDelay: 1,
    type: "spring" as const,
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: { type: "spring", stiffness: 200, damping: 5, mass: 0.5 },
  },
};

interface ShinyButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function ShinyButton({ children, className }: ShinyButtonProps) {
  return (
    <motion.button
      {...animationProps}
      className={cn(
        "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow bg-white border border-[#14161a]/10",
        className,
      )}
    >
      <span
        className="relative block size-full text-sm uppercase tracking-wide text-[rgb(0,0,0,65%)]"
        style={{
          maskImage:
            "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
      />
    </motion.button>
  );
}
