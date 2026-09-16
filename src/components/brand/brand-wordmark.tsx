import { cn } from "@/lib/utils";

/**
 * Placeholder partner wordmarks. These are invented names rendered as type —
 * swap this component for real SVG assets when the brand pack arrives.
 */

const GLYPHS: Record<string, React.ReactNode> = {
  // A small mark sits left of each wordmark so the wall does not read as a word list.
  circle: <circle cx="9" cy="9" r="6.5" strokeWidth="2" />,
  ring: (
    <>
      <circle cx="9" cy="9" r="7" strokeWidth="1.6" />
      <circle cx="9" cy="9" r="2.4" strokeWidth="1.6" />
    </>
  ),
  chevron: <path d="M3 14.5 9 3.5l6 11" strokeWidth="2" strokeLinejoin="round" />,
  square: <rect x="2.8" y="2.8" width="12.4" height="12.4" rx="2" strokeWidth="1.8" />,
  hex: (
    <path
      d="M9 2.4 15 6v6l-6 3.6L3 12V6l6-3.6Z"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  ),
  bolt: <path d="M10.5 2.5 4.5 10h4l-1 7.5L15 9h-4l-.5-6.5Z" strokeWidth="1.5" />,
};

const GLYPH_KEYS = Object.keys(GLYPHS);

export function BrandWordmark({
  name,
  index,
  className,
}: {
  name: string;
  index: number;
  className?: string;
}) {
  const glyph = GLYPH_KEYS[index % GLYPH_KEYS.length];

  return (
    <span
      className={cn("inline-flex items-center gap-2.5 sm:gap-3", className)}
      aria-label={name}
    >
      <svg
        viewBox="0 0 18 18"
        className="h-4 w-4 shrink-0 sm:h-[1.125rem] sm:w-[1.125rem]"
        fill="none"
        stroke="currentColor"
        aria-hidden
      >
        {GLYPHS[glyph]}
      </svg>
      <span className="font-display text-sm font-bold uppercase tracking-[0.16em] sm:text-[0.9375rem]">
        {name}
      </span>
    </span>
  );
}
