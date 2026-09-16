import { cn } from "@/lib/utils";

/**
 * SM Auto House identity: an angled "chevron" badge carrying the SM monogram,
 * set against a two-line wordmark. The slant reads as forward motion.
 */
export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative block shrink-0">
        <svg
          viewBox="0 0 44 44"
          className="h-9 w-9 sm:h-10 sm:w-10"
          role="img"
          aria-label="SM Auto House"
        >
          <defs>
            <linearGradient id="sm-badge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8c44b8" />
              <stop offset="100%" stopColor="#4f0e70" />
            </linearGradient>
          </defs>
          {/* Angled badge */}
          <path
            d="M9.4 3h28.2c1.4 0 2.3 1.5 1.7 2.7L27.9 38.9A3 3 0 0 1 25.1 41H6.9c-1.4 0-2.3-1.5-1.7-2.7L6.6 5.1A3 3 0 0 1 9.4 3Z"
            fill="url(#sm-badge)"
          />
          {/* Speed cuts */}
          <path d="M31.5 12h9l-1.6 4.4h-9L31.5 12Z" fill="currentColor" opacity="0.55" />
          <path d="M28.6 20h9L36 24.4h-9L28.6 20Z" fill="currentColor" opacity="0.32" />
          <text
            x="15.5"
            y="28.5"
            textAnchor="middle"
            className="font-display"
            fontSize="17"
            fontWeight="800"
            letterSpacing="-0.5"
            fill="#ffffff"
          >
            SM
          </text>
        </svg>
      </span>

      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[0.95rem] font-extrabold uppercase tracking-[0.12em] text-ink sm:text-base">
            SM Auto House
          </span>
          <span className="mt-1 font-tech text-[0.5rem] uppercase tracking-[0.3em] text-carbon-400 sm:text-[0.5625rem]">
            Automotive Solutions
          </span>
        </span>
      ) : null}
    </span>
  );
}
