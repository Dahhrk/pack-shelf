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

### 05 — App / Product UI Specimens

Live interactive app-UI specimens built with Motion, Radix UI, TanStack Table, cmdk, Sonner, and Vaul.

| Specimen | Description | Key Libraries |
|---|---|---|
| Dashboard Shell | Sidebar nav, breadcrumb, animated content swap; drawer nav at mobile | Motion, Lucide |
| Data Table | 600 virtualized rows, column sort, column resize, row select, optimistic update | TanStack Table, TanStack Virtual, Motion |
| Command Palette | `⌘K` open, fuzzy filter (Fuse.js), arrow nav, escape close | cmdk, Fuse.js, Motion |
| Settings Form | Sectioned form, dirty-state tracking, animated save/undo bar | Motion |
| Empty States | First-run, no-results, error, permission — 4 distinct variants | Motion, Lucide |
| Overlays | Modal (focus trap), drawer (gesture dismiss), popover, toast, tooltip | Radix Dialog, Vaul, Radix Popover, Sonner, Radix Tooltip, Motion |
| Onboarding | 3-step wizard with progress bar, back nav, coach-mark tooltips | Motion |

**Interaction Patterns Demonstrated:**

| Pattern | Where |
|---|---|
| Shared layout transitions (`layoutId`) | Tab indicator in Shared Layout Transition |
| List reorder with drag | Drag Reorder List (Motion `Reorder`) |
| Optimistic row update | Data Table row click feedback |
| Skeleton to content swap | Skeleton Swap demo |
| Scroll-linked progress | Section-scoped scroll progress bar |
| Gesture drawer dismiss | Dashboard Shell mobile drawer + Vaul drawer |
| Keyboard focus rings | All interactive elements (`.focus-ring` utility) |

**Source:** Original — built for pack-shelf app-UI specimens on `motion/react`.
**License:** MIT (this repo).

---

### 06 — Mobile / Responsive

The **same** Dashboard Shell and Data Table components from section 05 rendered inside a 390px viewport constraint. No duplicate implementation.

- Dashboard: switches to gesture-dismissable drawer navigation
- Table: horizontally scrollable with compact layout

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
- [Motion](https://motion.dev) (Framer Motion) — animation runtime — MIT
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — typography

### App UI Libraries

| Library | Version | License | Use |
|---|---|---|---|
| [Radix UI](https://www.radix-ui.com/) | various | MIT | Dialog, Popover, Tooltip, Switch, Select primitives |
| [TanStack Table](https://tanstack.com/table) | 8.x | MIT | Data table core |
| [TanStack Virtual](https://tanstack.com/virtual) | 3.x | MIT | Row virtualization |
| [cmdk](https://cmdk.paco.me/) | latest | MIT | Command palette |
| [Sonner](https://sonner.emilkowal.ski/) | latest | MIT | Toast notifications |
| [Vaul](https://vaul.emilkowal.ski/) | latest | MIT | Drawer overlay |
| [Fuse.js](https://www.fusejs.io/) | latest | Apache-2.0 | Fuzzy search for command palette |
| [Lucide React](https://lucide.dev/) | latest | ISC | Icon set |
| [class-variance-authority](https://cva.style/) | latest | Apache-2.0 | Variant utility |

## Accessibility

- `prefers-reduced-motion: reduce` is honoured globally and per-component
- All interactive elements have visible `:focus-visible` rings (`.focus-ring` CSS utility)
- Keyboard reachable throughout: tab, arrow, escape, enter
- Overlays trap focus and close on Escape
- ARIA attributes on interactive widgets (tabs, switches, navigation)

## Screenshots

Proof screenshots are in the `/screenshots` directory:

- `screenshots/01-dashboard-shell.png` — Dashboard specimen at ~1440px
- `screenshots/02-data-table.png` — Data table at ~1440px
- `screenshots/03-command-palette.png` — Command palette open at ~1440px
- `screenshots/04-settings-form.png` — Settings with dirty state at ~1440px
- `screenshots/05-empty-states.png` — Empty states at ~1440px
- `screenshots/06-overlays.png` — Overlay specimens at ~1440px
- `screenshots/07-onboarding.png` — Onboarding flow at ~1440px
- `screenshots/08-interactions.png` — Interaction patterns at ~1440px
- `screenshots/09-mobile-390px.png` — Mobile responsive at 390px

## License

Components sourced from third-party packs retain their original MIT licenses (see file headers). Original code in this repo is MIT.
