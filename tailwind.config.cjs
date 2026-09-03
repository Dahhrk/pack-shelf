/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      animation: {
        // Marquee: continuous scroll is the defining behaviour of a marquee strip.
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        // Border beam: decorative shimmer — plays 3 times then stops.
        // No state communicated; looping is not earned.
        "border-beam": "border-beam calc(var(--duration)*1s) 3 linear",
        // Ripple: ambient breathing loader — infinite because it indicates
        // an ongoing background process / idle state.
        ripple: "ripple var(--duration,2s) ease calc(var(--i,0)*.2s) infinite",
        // Orbit: planetary orbits do not stop. The demo visualises continuous motion.
        orbit: "orbit calc(var(--duration)*1s) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        ripple: {
          "0%, 100%": { transform: "translate(-50%,-50%) scale(1)", opacity: "1" },
          "50%": { transform: "translate(-50%,-50%) scale(0.9)", opacity: "0.3" },
        },
        orbit: {
          "0%": {
            transform: "rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
