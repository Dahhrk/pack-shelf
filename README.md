# pack-shelf

Freelancer pack shelf: Motion + copy-paste animated kits, then mixed Framer-style sites. Lab, not product.

## SHELF — Animation Gallery

A browsable Vite + React + TypeScript + Tailwind gallery showcasing 50+ animated components across 12 sections, plus 3 full-page site templates and a live interactive playground — all running on the **Motion** (`motion/react`) runtime.

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
| Marquee | Text | [magicui.design](https://magicui.design/docs/components/marquee) | ✅ MIT |
| Border Beam | Card | [magicui.design](https://magicui.design/docs/components/border-beam) | ✅ MIT |
| Blur Fade | Text | [magicui.design](https://magicui.design/docs/components/blur-fade) | ✅ MIT |
| Number Ticker | Text | [magicui.design](https://magicui.design/docs/components/number-ticker) | ✅ MIT |
| Shiny Button | Button | [magicui.design](https://magicui.design/docs/components/shiny-button) | ✅ MIT |
| Ripple | Loader | [magicui.design](https://magicui.design/docs/components/ripple) | ✅ MIT |
| Orbiting Circles | Loader | [magicui.design](https://magicui.design/docs/components/orbiting-circles) | ✅ MIT |

**GitHub:** [magicuidesign/magicui](https://github.com/magicuidesign/magicui)
**License:** MIT.

---

### 03 — Aceternity UI

| Component | Type | Source | Free? |
|---|---|---|---|
| Background Beams | Scroll | [ui.aceternity.com](https://ui.aceternity.com/components/background-beams) | ✅ Free |
| Card Hover Effect | Card | [ui.aceternity.com](https://ui.aceternity.com/components/card-hover-effect) | ✅ Free |
| Typewriter Effect | Text | [ui.aceternity.com](https://ui.aceternity.com/components/typewriter-effect) | ✅ Free |
| Moving Border | Button | [ui.aceternity.com](https://ui.aceternity.com/components/moving-border) | ✅ Free |
| Floating Navbar | Menu | [ui.aceternity.com](https://ui.aceternity.com/components/floating-navbar) | ✅ Free |
| Bento Grid | Card | [ui.aceternity.com](https://ui.aceternity.com/components/bento-grid) | ✅ Free |

**GitHub:** [aceternity/aceternity-ui](https://github.com/aceternity/aceternity-ui)
**License:** MIT.

---

### 04 — React Bits

| Component | Type | Source | Free? |
|---|---|---|---|
| Split Text | Text | [reactbits.dev](https://reactbits.dev/ts/text-animations/split-text) | ✅ Free |
| Blur Text | Text | [reactbits.dev](https://reactbits.dev/ts/text-animations/blur-text) | ✅ Free |
| Click Spark | Interactive | [reactbits.dev](https://reactbits.dev/ts/animations/click-spark) | ✅ Free |
| Magnet | Interactive | [reactbits.dev](https://reactbits.dev/ts/animations/magnet) | ✅ Free |
| Count Up | Text | [reactbits.dev](https://reactbits.dev/ts/text-animations/count-up) | ✅ Free |
| Fade Content | Scroll | [reactbits.dev](https://reactbits.dev/ts/animations/fade-content) | ✅ Free |
| Animated List | Card | [reactbits.dev](https://reactbits.dev/ts/animations/animated-list) | ✅ Free |

**Source:** [reactbits.dev](https://reactbits.dev)
**License:** MIT.

---

### 05 — Backgrounds (original)

| Component | Type | Description |
|---|---|---|
| Aurora | Gradient | Flowing aurora/northern-lights gradient with emerald, teal, blue, violet bands |
| Particle Field | Canvas | Floating particles that drift, connect with lines, and scatter from cursor |
| Gradient Mesh | CSS | Multi-layer radial gradients that slowly morph and travel |
| Dot Grid | Interactive | Grid of dots that grow and brighten based on cursor proximity |
| Grid Pattern | SVG | Dashed grid with radial gradient mask and gentle pulse |
| Spotlight | Interactive | Cursor-following radial gradient spotlight effect |

**Source:** Original.
**License:** MIT (this repo).

---

### 06 — Gestures (original)

| Component | Type | Description |
|---|---|---|
| Swipe Cards | Drag | Card stack with left/right swipe-to-dismiss, spring physics fling |
| Drag Reorder | Drag | Vertical list with drag-to-reorder and layout animation |
| Pull to Refresh | Drag | Pull-down gesture with spring refresh indicator |
| Pinch Zoom | Gesture | Scroll-wheel zoom with spring physics, accessibility buttons |

**Source:** Original.
**License:** MIT (this repo).

---

### 07 — Feedback (original)

| Component | Type | Description |
|---|---|---|
| Skeleton Loader | Loading | Shimmer sweep skeleton placeholders with stagger entrance |
| Progress Steps | Stepper | 4-step stepper with spring fill, check-mark path animation |
| Toast Stack | Notification | Spring-animated toast notifications with auto-dismiss |
| Success Check | Animation | Circle fill + check-mark path draw animation |

**Source:** Original.
**License:** MIT (this repo).

---

### 08 — Navigation (original)

| Component | Type | Description |
|---|---|---|
| Animated Tabs | Tabs | Sliding layoutId indicator between tabs |
| Breadcrumb Trail | Breadcrumb | Stagger-animated breadcrumbs with blur enter |
| Sidebar Collapse | Sidebar | Spring width animation, labels fade, icons persist |

**Source:** Original.
**License:** MIT (this repo).

---

### 09 — Data Viz (original)

| Component | Type | Description |
|---|---|---|
| Animated Bar Chart | Chart | Horizontal bars with staggered spring growth, randomize button |
| Sparkline Chart | Chart | SVG sparklines with pathLength draw animation |
| Live Counter | Counter | Odometer-style rolling digits with spring transitions |
| Donut Chart | Chart | Ring segments with pathLength spring animation |
| Animated Metric Card | Card | Counting numbers + sparkline + change badge |

**Source:** Original.
**License:** MIT (this repo).

---

### 10 — Page Transitions (original)

| Component | Type | Description |
|---|---|---|
| Fade Slide | Transition | Spring fade+slide page toggle with AnimatePresence |
| Morphing Layout | Layout | Grid/list toggle with layoutId morph |
| Shared Element | Modal | Thumbnail-to-modal expand with shared element transition |
| Page Wipe | Transition | Full-width color sweep between pages |
| Staggered Reveal | Reveal | Heading → subheading → cards staggered entrance |

**Source:** Original.
**License:** MIT (this repo).

---

### 11 — Playground

Interactive live playground with sliders, toggles, and selects to tune animation parameters in real-time. Includes 4 pre-built instances:

| Instance | Controls | Animation |
|---|---|---|
| Spring Ball | stiffness, damping, mass | Bouncing ball with configurable spring |
| Stagger Text | delay/item, stiffness, direction | Words entering with tunable stagger |
| Card Hover | initial/hover/tap scale | Card with configurable interaction |
| Fade In | Y offset, opacity, duration | Block with tunable fade+slide |

---

### 12 — Site Templates

Full-page site templates composing shelf components into real layouts:

| Template | Type | Highlights |
|---|---|---|
| Landing | SaaS/Product | Staggered hero, floating gradients, feature grid, animated counters, CTA |
| Dashboard | App | Collapsible sidebar, layoutId tabs, metric cards, bar chart, activity feed |
| Portfolio | Creative | Per-character text reveal, shared-element gallery, progress bars, scroll-linked bar |

Click "Preview" in the gallery to open each template in a full-screen overlay.

---

## Skipped (paid / paywalled)

No paid components are included. All components listed above were verified as free/MIT at the time of copy.

---

## Stack

- [Vite](https://vite.dev) — build tool
- [React 19](https://react.dev) — UI framework
- [TypeScript](https://www.typescriptlang.org) — type safety
- [Tailwind CSS 3](https://tailwindcss.com) — utility styles
- [Motion](https://motion.dev) (Framer Motion) — animation runtime
- [Space Mono](https://fonts.google.com/specimen/Space+Mono) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — typography

## License

Components sourced from third-party packs retain their original MIT licenses (see file headers). Original code in this repo is MIT.
