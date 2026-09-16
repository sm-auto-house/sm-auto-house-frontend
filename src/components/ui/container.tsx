import { cn } from "@/lib/utils";

/** The single horizontal rhythm every section is measured against. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1480px] px-5 sm:px-8 lg:px-12 xl:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
}
