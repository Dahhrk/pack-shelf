// Pack: Aceternity UI — Typewriter Effect
// Source: https://ui.aceternity.com/components/typewriter-effect
// GitHub: https://github.com/aceternity/aceternity-ui
// License: MIT

import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect } from "react";
import { cn } from "../../lib/utils";

export function TypewriterEffect({
  words,
  className,
  cursorClassName,
}: {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
}) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        { display: "inline-block", opacity: 1, width: "fit-content" },
        { duration: 0.3, delay: stagger(0.1), ease: "easeInOut" },
      );
    }
  }, [isInView, animate]);

  const renderWords = () => (
    <motion.div ref={scope} className="inline">
      {words.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-block">
          {word.text.split("").map((char, charIdx) => (
            <motion.span
              initial={{}}
              key={`char-${charIdx}`}
              className={cn(
                "dark:text-white text-black opacity-0 hidden",
                word.className,
              )}
            >
              {char}
            </motion.span>
          ))}
          &nbsp;
        </div>
      ))}
    </motion.div>
  );

  return (
    <div className={cn("text-center text-base sm:text-xl md:text-3xl lg:text-5xl font-bold", className)}>
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // Blinking cursor: infinite because a text cursor blinks until dismissed
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-amber-400",
          cursorClassName,
        )}
      />
    </div>
  );
}
