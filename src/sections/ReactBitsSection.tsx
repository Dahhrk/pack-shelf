import { useState, useEffect } from "react";
import { SplitText } from "../components/reactbits/SplitText";
import { BlurText } from "../components/reactbits/BlurText";
import { ClickSpark } from "../components/reactbits/ClickSpark";
import { Magnet } from "../components/reactbits/Magnet";
import { CountUp } from "../components/reactbits/CountUp";
import { FadeContent } from "../components/reactbits/FadeContent";
import { AnimatedList } from "../components/reactbits/AnimatedList";

const notifications = [
  "New component added: Magnet",
  "SplitText animation updated",
  "ClickSpark v2 released",
  "BlurText now supports RTL",
  "FadeContent direction prop added",
  "AnimatedList spring tuned",
  "CountUp decimal support",
];

export function ReactBitsSection() {
  const [listItems, setListItems] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setListItems((prev) => {
        if (prev.length >= notifications.length) return prev;
        return [...prev, notifications[prev.length]];
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="react-bits" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-rose-600">
        04 — React Bits
      </h2>
      <p className="text-[#14161a]/60 mb-12 max-w-xl">
        Free components from{" "}
        <a href="https://reactbits.dev" className="underline text-[#14161a]/80" target="_blank" rel="noopener noreferrer">
          reactbits.dev
        </a>. Micro-interactions and text animations.
      </p>

      <div className="space-y-16">
        {/* Text: Split Text */}
        <div>
          <h3 className="text-sm text-[#14161a]/40 uppercase tracking-widest mb-4">
            Split Text
          </h3>
          <SplitText
            text="Character-by-character spring reveal"
            className="text-3xl font-bold"
          />
        </div>

        {/* Text: Blur Text */}
        <div>
          <h3 className="text-sm text-[#14161a]/40 uppercase tracking-widest mb-4">
            Blur Text
          </h3>
          <BlurText
            text="Each word emerges from a gaussian blur into crisp focus"
            className="text-2xl font-semibold"
          />
        </div>

        {/* Interactive: Click Spark */}
        <div>
          <h3 className="text-sm text-[#14161a]/40 uppercase tracking-widest mb-4">
            Click Spark
          </h3>
          <ClickSpark sparkColor="#fb7185" sparkCount={10}>
            <div className="rounded-xl bg-white border border-[#14161a]/10 p-12 text-center cursor-pointer select-none">
              <p className="text-lg font-medium text-[#14161a]/80">
                Click anywhere in this area
              </p>
              <p className="text-sm text-[#14161a]/40 mt-1">Sparks fly on click</p>
            </div>
          </ClickSpark>
        </div>

        {/* Interactive: Magnet */}
        <div>
          <h3 className="text-sm text-[#14161a]/40 uppercase tracking-widest mb-4">
            Magnet
          </h3>
          <div className="flex gap-6 items-center justify-center py-8">
            <Magnet>
              <button className="px-6 py-3 bg-rose-600 rounded-xl font-medium text-white">
                Magnetic Button
              </button>
            </Magnet>
            <Magnet>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-xl">
                🧲
              </div>
            </Magnet>
            <Magnet>
              <button className="px-6 py-3 bg-[#14161a]/10 border border-[#14161a]/15 rounded-xl font-medium">
                Hover Me
              </button>
            </Magnet>
          </div>
        </div>

        {/* Numbers: Count Up — demo targets, not real metrics */}
        <div>
          <h3 className="text-sm text-[#14161a]/40 uppercase tracking-widest mb-4">
            Count Up
          </h3>
          <p className="text-xs text-[#14161a]/40 mb-3">
            Demo animation targets — not real metrics.
          </p>
          <div className="flex gap-12 items-end">
            <div>
              <span className="text-xs text-[#14161a]/40 uppercase tracking-wider">Value X</span>
              <div className="text-5xl font-bold">
                <CountUp to={3} />
              </div>
            </div>
            <div>
              <span className="text-xs text-[#14161a]/40 uppercase tracking-wider">Value Y</span>
              <div className="text-5xl font-bold">
                <CountUp to={12} />
              </div>
            </div>
            <div>
              <span className="text-xs text-[#14161a]/40 uppercase tracking-wider">Value Z</span>
              <div className="text-5xl font-bold">
                <CountUp to={8} />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll: Fade Content (multiple directions) */}
        <div>
          <h3 className="text-sm text-[#14161a]/40 uppercase tracking-widest mb-4">
            Fade Content
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <FadeContent direction="left" delay={0}>
              <div className="rounded-xl bg-white border border-[#14161a]/10 p-6">
                <p className="font-medium">Fade from left</p>
              </div>
            </FadeContent>
            <FadeContent direction="right" delay={0.1}>
              <div className="rounded-xl bg-white border border-[#14161a]/10 p-6">
                <p className="font-medium">Fade from right</p>
              </div>
            </FadeContent>
            <FadeContent direction="up" delay={0.2}>
              <div className="rounded-xl bg-white border border-[#14161a]/10 p-6">
                <p className="font-medium">Fade from below</p>
              </div>
            </FadeContent>
            <FadeContent direction="down" delay={0.3}>
              <div className="rounded-xl bg-white border border-[#14161a]/10 p-6">
                <p className="font-medium">Fade from above</p>
              </div>
            </FadeContent>
          </div>
        </div>

        {/* List: Animated List */}
        <div>
          <h3 className="text-sm text-[#14161a]/40 uppercase tracking-widest mb-4">
            Animated List
          </h3>
          <div className="max-w-md">
            <AnimatedList
              items={listItems.map((item, i) => (
                <div
                  key={i}
                  className="mb-2 rounded-lg bg-white border border-[#14161a]/10 px-4 py-3 text-sm flex items-center gap-3"
                >
                  <span className="text-rose-500 text-lg">●</span>
                  <span>{item}</span>
                </div>
              ))}
            />
            {listItems.length < notifications.length && (
              <p className="text-xs text-[#14161a]/30 mt-2">Adding items...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
