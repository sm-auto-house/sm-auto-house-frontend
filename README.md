# SM Auto House

Marketing site for **SM Auto House**, an automotive spare parts, lubricants and
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

The site ships dark and light. Tokens live in
[`src/app/globals.css`](src/app/globals.css):

| Token group | Notes |
| --- | --- |
| `--color-brand-*` | Fixed ramp, hue-locked on `#631f89` (`brand-600`). Does not move with the theme. |
| `--color-carbon-*` | The surface scale, by role rather than by value: `950` is the deepest ground, `100` the brightest type. Dark supplies charcoals, light supplies paper. |
| `--color-ink` | Maximum-contrast foreground: white on dark, near-black on paper. Reach for this instead of a literal `white`. |
| `--color-signal` | The reading accent for type, icons and hairlines. Lifted to `brand-400` on the dark chassis so it clears AA. |
| `--color-signal-solid` | Filled surfaces that carry a white label, such as the primary CTA. |
| `--font-display` | Saira. Squared counters that pick up the geometry of the logo wordmark. Uppercase headlines, paired with `display-tight`. |
| `--font-body` | IBM Plex Sans. All running copy. |
| `--font-tech` | IBM Plex Mono. Eyebrows, labels, metadata. Same superfamily as the body face. Use the `eyebrow` utility. |

Because the carbon scale is defined by role, components need no `light:`
variants. The one exception is photography: `[data-surface="media"]` pins a
subtree to the dark palette permanently, so scrims stay scrims and type over
imagery stays legible in both themes. It is on the hero, the full-bleed banner,
every photo card, and the nav bar while it floats transparent over the hero.

The shadcn CSS variables (`--background`, `--primary`, …) are mapped onto this
palette in the same file, so shadcn components inherit the brand automatically.
`--primary` is `--signal-solid`, so a default shadcn `<Button>` is already
on-brand.

Custom utilities: `display-tight`, `eyebrow`, `grain`, `rule-fade`,
`hide-scrollbar`, `mask-rail`, `link-underline`.

### Theme switching

`src/lib/theme.ts` is the single source of truth. An inline script in
[`src/app/layout.tsx`](src/app/layout.tsx) runs during HTML parsing and puts
`dark` or `light` on `<html>` before the first paint, so there is no flash. It
follows the OS on a first visit and an explicit choice after that.
`ThemeProvider` owns persistence and the OS listener; `ThemeToggle` swaps its
icons and its accessible name with CSS, not React state, so the control is
correct before hydration.

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

- **`Reveal` / `RevealGroup` / `RevealItem`**: scroll-triggered fade and slide, with stagger.
- **`TextReveal`**: masked line-by-line headline reveal. It watches the *clip
  wrapper*, not the sliding span: at rest each span sits fully outside its own
  `overflow-hidden` box, so an observer on the span itself would measure zero
  intersection and the line could never reveal.
- **`CountUp`**: statistics tween on first view.
- **`Magnetic`**: CTA buttons drift toward the cursor (mouse pointers only).
- **`ParallaxImage`**: over-scaled plate that drifts as the section passes. It
  also carries `data-surface="media"`, since every instance is photography.
- **Smooth scrolling**: Lenis drives real window scrolling, so `position: sticky`,
  IntersectionObserver and `useScroll` all keep working. Use
  `scrollToSection('#id')` for in-page anchors rather than a bare `href`, and
  keep `scroll-mt-24` on any section you want to anchor to. Lenis honours
  scroll-margin, so no extra offset is needed.

## Swapping in real assets

Everything below is placeholder content, structured so it can be replaced
without touching component code.

- **Photography**: `src/lib/images.ts` holds Unsplash photo ids; `img(id, {w,h})`
  builds the URL. Point these at your own CDN and update
  `images.remotePatterns` in [`next.config.ts`](next.config.ts).
  Next 16 requires any non-default `quality` to be listed in `images.qualities`.
- **Partner logos**: `brands` in `src/lib/content.ts` are invented names rendered
  as type by `src/components/brand/brand-wordmark.tsx`. Replace that component
  with real SVGs, and remove the "placeholder marks" note in `BrandGrid`.
- **Company details**: `src/lib/site.ts` (phone, email, address, maps link, hours).
- **Copy**: `src/lib/content.ts`.

The logo is not placeholder. `src/components/brand/logo.tsx` holds the supplied
artwork traced to two paths: the car and SM monogram fill from
`--signal-solid`, and the AUTO HOUSE wordmark takes `currentColor`, so one
component covers both themes. `src/app/icon.svg` is the tab icon, cropped to
the monogram because the full lockup is too wide to read at 16px.

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
