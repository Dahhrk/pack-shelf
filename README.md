# pack-shelf

Freelancer pack shelf: Motion + copy-paste animated kits, then mixed Framer-style sites. Lab, not product.

## SHELF — Animation Gallery (Unit 1)

A browsable Vite + React + TypeScript + Tailwind gallery showcasing animated components from four open-source packs, all running live on the **Motion** (`motion/react`) runtime.

### Run locally

```bash
npm install
npm run dev      # → http://localhost:5173
npm run build    # production build
```

---

## Sections & Components

### 01 — Motion (hand-written engine primitives)

| Component | Type | Description |
|---|---|---|
| Staggered Text | Text | Per-word spring-staggered reveal |
| LayoutId Cards | Card | Shared-element cards with layoutId transitions |
| Spring Loader | Loader | Bouncing dot loader with spring physics |
| Scroll-Linked Card | Scroll | Rotate + scale driven by scrollYProgress |
| Scroll Progress | Scroll | Fixed top bar tracking page scroll |
| AnimatePresence Menu | Menu | Mount/unmount menu with enter/exit animations |

**Source:** Original — written from scratch on `motion/react`.
**License:** MIT (this repo).

---

### 02 — Magic UI

| Component | Type | Source | Free? |
|---|---|---|---|
| Marquee | Text | [magicui.design/docs/components/marquee](https://magicui.design/docs/components/marquee) | ✅ MIT |
| Border Beam | Card | [magicui.design/docs/components/border-beam](https://magicui.design/docs/components/border-beam) | ✅ MIT |
| Blur Fade | Text | [magicui.design/docs/components/blur-fade](https://magicui.design/docs/components/blur-fade) | ✅ MIT |
| Number Ticker | Text | [magicui.design/docs/components/number-ticker](https://magicui.design/docs/components/number-ticker) | ✅ MIT |
| Shiny Button | Button | [magicui.design/docs/components/shiny-button](https://magicui.design/docs/components/shiny-button) | ✅ MIT |
| Ripple | Loader | [magicui.design/docs/components/ripple](https://magicui.design/docs/components/ripple) | ✅ MIT |
| Orbiting Circles | Loader | [magicui.design/docs/components/orbiting-circles](https://magicui.design/docs/components/orbiting-circles) | ✅ MIT |

**GitHub:** [magicuidesign/magicui](https://github.com/magicuidesign/magicui)
**License:** MIT.

---

### 03 — Aceternity UI

| Component | Type | Source | Free? |
|---|---|---|---|
| Background Beams | Scroll | [ui.aceternity.com/components/background-beams](https://ui.aceternity.com/components/background-beams) | ✅ Free |
| Card Hover Effect | Card | [ui.aceternity.com/components/card-hover-effect](https://ui.aceternity.com/components/card-hover-effect) | ✅ Free |
| Typewriter Effect | Text | [ui.aceternity.com/components/typewriter-effect](https://ui.aceternity.com/components/typewriter-effect) | ✅ Free |
| Moving Border | Button | [ui.aceternity.com/components/moving-border](https://ui.aceternity.com/components/moving-border) | ✅ Free |
| Floating Navbar | Menu | [ui.aceternity.com/components/floating-navbar](https://ui.aceternity.com/components/floating-navbar) | ✅ Free |
| Bento Grid | Card | [ui.aceternity.com/components/bento-grid](https://ui.aceternity.com/components/bento-grid) | ✅ Free |

**GitHub:** [aceternity/aceternity-ui](https://github.com/aceternity/aceternity-ui)
**License:** MIT.

---

### 04 — React Bits

| Component | Type | Source | Free? |
|---|---|---|---|
| Split Text | Text | [reactbits.dev — Split Text](https://reactbits.dev/ts/text-animations/split-text) | ✅ Free |
| Blur Text | Text | [reactbits.dev — Blur Text](https://reactbits.dev/ts/text-animations/blur-text) | ✅ Free |
| Click Spark | Interactive | [reactbits.dev — Click Spark](https://reactbits.dev/ts/animations/click-spark) | ✅ Free |
| Magnet | Interactive | [reactbits.dev — Magnet](https://reactbits.dev/ts/animations/magnet) | ✅ Free |
| Count Up | Text | [reactbits.dev — Count Up](https://reactbits.dev/ts/text-animations/count-up) | ✅ Free |
| Fade Content | Scroll | [reactbits.dev — Fade Content](https://reactbits.dev/ts/animations/fade-content) | ✅ Free |
| Animated List | Card | [reactbits.dev — Animated List](https://reactbits.dev/ts/animations/animated-list) | ✅ Free |

**Source:** [reactbits.dev](https://reactbits.dev)
**License:** MIT.

---

## Skipped (paid / paywalled)

No paid components are included. All components listed above were verified as free/MIT at the time of copy. Nothing from:

- Framer marketplace kits
- Motion-for-React paid kits
- React Bits Pro
- Aceternity all-access / paid bundles

---

## Stack

- [Vite](https://vite.dev) — build tool
- [React 19](https://react.dev) — UI framework
- [TypeScript](https://www.typescriptlang.org) — type safety
- [Tailwind CSS 3](https://tailwindcss.com) — utility styles
- [Motion](https://motion.dev) (Framer Motion) — animation runtime
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — typography

## License

Components sourced from third-party packs retain their original MIT licenses (see file headers). Original code in this repo is MIT.
