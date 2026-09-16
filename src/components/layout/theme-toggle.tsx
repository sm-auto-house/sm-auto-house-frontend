"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

/**
 * The icon pair and the button's accessible name are both swapped by CSS,
 * keyed on the `.dark` / `.light` class the inline head script sets, not by
 * React state. So the control is correct at first paint, before hydration,
 * with no flash and nothing for React to reconcile. Each label is in its own
 * `display: none` span, which keeps it out of the accessibility tree too, so
 * only the active one names the button.
 */
function ThemeLabel() {
  return (
    <span className="sr-only">
      <span className="hidden dark:inline">Switch to light theme</span>
      <span className="hidden light:inline">Switch to dark theme</span>
    </span>
  );
}

function ThemeIcons({ className }: { className?: string }) {
  return (
    <span className={cn("relative block", className)}>
      {/* Shown while dark: the destination is light */}
      <Sun
        aria-hidden
        strokeWidth={1.6}
        className="absolute inset-0 size-full rotate-90 scale-0 opacity-0 transition-all duration-500 ease-premium dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
      {/* Shown while light: the destination is dark */}
      <Moon
        aria-hidden
        strokeWidth={1.6}
        className="absolute inset-0 size-full -rotate-90 scale-0 opacity-0 transition-all duration-500 ease-premium light:rotate-0 light:scale-100 light:opacity-100"
      />
    </span>
  );
}

/** Icon-only switch, sized to match the other controls in the nav cluster. */
export function ThemeToggle({ className }: { className?: string }) {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "flex size-10 items-center justify-center rounded-full",
        "text-carbon-200 transition-colors duration-300",
        "hover:bg-ink/[0.07] hover:text-ink",
        "focus-visible:ring-2 focus-visible:ring-signal/70 focus-visible:outline-none",
        className,
      )}
    >
      <ThemeIcons className="size-[1.1rem]" />
      <ThemeLabel />
    </button>
  );
}

/**
 * The same control drawn as a labelled row, for the mobile overlay where a
 * bare icon has no surrounding context to explain it.
 */
export function ThemeToggleRow({ className }: { className?: string }) {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "flex items-center gap-3 font-tech text-xs uppercase tracking-[0.12em]",
        "text-carbon-300 transition-colors hover:text-ink",
        "focus-visible:ring-2 focus-visible:ring-signal/70 focus-visible:outline-none",
        className,
      )}
    >
      <ThemeIcons className="size-4 shrink-0 text-signal" />
      <span aria-hidden>
        <span className="hidden dark:inline">Light Mode</span>
        <span className="hidden light:inline">Dark Mode</span>
      </span>
      <ThemeLabel />
    </button>
  );
}
