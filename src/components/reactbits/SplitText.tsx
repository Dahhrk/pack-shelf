// Pack: React Bits — Split Text
// Source: https://reactbits.dev/ts/text-animations/split-text
// License: MIT

import { useMemo } from "react";
import { motion } from "motion/react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitText({ text, className, delay = 0.02 }: SplitTextProps) {
  const chars = useMemo(() => text.split(""), [text]);

  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: delay * i,
            type: "spring",
            damping: 12,
            stiffness: 200,
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
