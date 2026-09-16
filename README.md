# SM Auto House

Marketing site for **SM Auto House** — an automotive spare parts, lubricants and
vehicle products distributor based in Colombo, Sri Lanka.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui,
Framer Motion and Lucide icons.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Design system

The whole site is permanently dark. Tokens live in
[`src/app/globals.css`](src/app/globals.css):

| Token group | Notes |
| --- | --- |
| `--color-carbon-*` | The charcoal chassis, `950` (deepest) → `100` (near-white text). Section backgrounds alternate between `925`, `900` and `950`. |
| `--color-signal*` | The automotive accent, `#ff3d17`. Used for CTAs, active states and hover transitions — never for large fills. |
| `--font-display` | Archivo. Oversized uppercase headlines, paired with the `display-tight` utility (tight tracking, 0.88 leading). |
| `--font-body` | Inter. All running copy. |
| `--font-tech` | JetBrains Mono. Eyebrows, labels, metadata — anything that should read as instrumentation. Use the `eyebrow` utility. |

The shadcn CSS variables (`--background`, `--primary`, …) are mapped onto this
palette in the same file, so shadcn components inherit the brand automatically.
`--primary` is the signal colour, so a default shadcn `<Button>` is already
on-brand.

Custom utilities: `display-tight`, `eyebrow`, `grain`, `rule-fade`,
`hide-scrollbar`, `mask-rail`, `link-underline`.

## Structure

```
src/
  app/                    layout (fonts, metadata), page composition, globals.css
  components/
    brand/                logo, partner wordmarks, social glyphs
    layout/               navbar, mobile menu, search dialog, footer
    motion/               Reveal, TextReveal, CountUp, Magnetic, ParallaxImage
    providers/            SmoothScroll (Lenis) + scrollToSection helper
    sections/             one file per page section
    ui/                   shadcn primitives + Container, SectionHeading, EyebrowLabel
  lib/
    site.ts               company details, navigation, social links
    content.ts            categories, products, stats, features, testimonials, news, services
    images.ts             verified photo ids + the `img()` crop helper
```

Page order is composed in [`src/app/page.tsx`](src/app/page.tsx).

## Motion

All motion is centralised in `src/components/motion/` and every primitive
respects `prefers-reduced-motion`.

- **`Reveal` / `RevealGroup` / `RevealItem`** — scroll-triggered fade + slide, with stagger.
- **`TextReveal`** — masked line-by-line headline reveal. It watches the *clip
  wrapper*, not the sliding span: at rest each span sits fully outside its own
  `overflow-hidden` box, so an observer on the span itself would measure zero
  intersection and the line could never reveal.
- **`CountUp`** — statistics tween on first view.
- **`Magnetic`** — CTA buttons drift toward the cursor (mouse pointers only).
- **`ParallaxImage`** — over-scaled plate that drifts as the section passes.
- **Smooth scrolling** — Lenis drives real window scrolling, so `position: sticky`,
  IntersectionObserver and `useScroll` all keep working. Use
  `scrollToSection('#id')` for in-page anchors rather than a bare `href`, and
  keep `scroll-mt-24` on any section you want to anchor to — Lenis honours
  scroll-margin, so no extra offset is needed.

## Swapping in real assets

Everything below is placeholder content, structured so it can be replaced
without touching component code.

- **Photography** — `src/lib/images.ts` holds Unsplash photo ids; `img(id, {w,h})`
  builds the URL. Point these at your own CDN and update
  `images.remotePatterns` in [`next.config.ts`](next.config.ts).
  Next 16 requires any non-default `quality` to be listed in `images.qualities`.
- **Partner logos** — `brands` in `src/lib/content.ts` are invented names rendered
  as type by `src/components/brand/brand-wordmark.tsx`. Replace that component
  with real SVGs, and remove the "placeholder marks" note in `BrandGrid`.
- **Company details** — `src/lib/site.ts` (phone, email, address, maps link, hours).
- **Copy** — `src/lib/content.ts`.
- **Logo** — `src/components/brand/logo.tsx` is an inline SVG monogram.

## Notes

- Sections are anchored by id: `#home`, `#products`, `#about`, `#showcase`,
  `#brands`, `#why-us`, `#services`, `#news`, `#contact`.
- The product rail sets `scroll-pl-*` to match its own padding. Without it the
  snapport starts at the padding box edge and the browser scrolls the first card
  flush against the viewport.
- `body` uses `overflow-x: clip` as a backstop, but layout is verified free of
  horizontal overflow from 360px to 1600px.
- Card, article and product links currently point at in-page anchors; wire them
  to real routes when the catalogue exists.
