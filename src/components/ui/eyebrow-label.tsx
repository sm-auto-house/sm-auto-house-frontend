import { cn } from "@/lib/utils";

/** Small technical label with a signal-coloured tick before it. */
export function EyebrowLabel({
  children,
  className,
  tone = "signal",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "signal" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 eyebrow",
        tone === "signal" ? "text-signal" : "text-carbon-300",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-8",
          tone === "signal" ? "bg-signal" : "bg-carbon-500",
        )}
      />
      {children}
    </span>
  );
}
