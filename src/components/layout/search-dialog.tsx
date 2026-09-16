"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";

import { scrollToSection } from "@/components/providers/smooth-scroll";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { categories, products } from "@/lib/content";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

type Entry = { label: string; group: string; href: string };

/** Everything on the page that is worth jumping to. */
const INDEX: Entry[] = [
  ...navigation.map((n) => ({ label: n.label, group: "Pages", href: n.href })),
  ...categories.map((c) => ({
    label: c.title,
    group: "Categories",
    href: "#products",
  })),
  ...products.map((p) => ({
    label: p.name,
    group: "Products",
    href: "#showcase",
  })),
];

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return INDEX.slice(0, 7);
    return INDEX.filter((entry) =>
      entry.label.toLowerCase().includes(q),
    ).slice(0, 8);
  }, [query]);

  function select(href: string) {
    onOpenChange(false);
    setQuery("");
    window.setTimeout(() => scrollToSection(href), 180);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="top-[12vh] max-w-xl -translate-y-0 gap-0 overflow-hidden rounded-md border border-ink/10 bg-carbon-900/95 p-0 ring-0 backdrop-blur-2xl sm:max-w-xl"
      >
        <DialogTitle className="sr-only">Search SM Auto House</DialogTitle>
        <DialogDescription className="sr-only">
          Find products, categories and sections of the site.
        </DialogDescription>

        <div className="flex items-center gap-3 border-b border-ink/[0.08] px-5">
          <Search className="size-4 shrink-0 text-signal" strokeWidth={1.8} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results[0]) select(results[0].href);
            }}
            placeholder="Search parts, oils, categories…"
            className="h-14 w-full bg-transparent font-body text-sm text-ink placeholder:text-carbon-400 focus:outline-none"
          />
          <kbd className="hidden shrink-0 rounded border border-ink/10 px-1.5 py-0.5 font-tech text-[0.5625rem] uppercase tracking-widest text-carbon-400 sm:block">
            Esc
          </kbd>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          {results.length ? (
            <ul>
              {results.map((entry, i) => (
                <li key={`${entry.group}-${entry.label}-${i}`}>
                  <button
                    type="button"
                    onClick={() => select(entry.href)}
                    className={cn(
                      "group flex w-full items-center justify-between gap-4 rounded-sm px-3 py-3 text-left transition-colors",
                      "hover:bg-ink/[0.05] focus-visible:bg-ink/[0.05] focus-visible:outline-none",
                    )}
                  >
                    <span className="flex min-w-0 items-baseline gap-3">
                      <span className="truncate text-sm text-carbon-100 group-hover:text-ink">
                        {entry.label}
                      </span>
                      <span className="shrink-0 font-tech text-[0.5625rem] uppercase tracking-[0.13em] text-carbon-500">
                        {entry.group}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-carbon-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
                      strokeWidth={1.6}
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-8 text-center text-sm text-carbon-400">
              No matches for “{query}”. Try “brake”, “oil” or “filter”.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
