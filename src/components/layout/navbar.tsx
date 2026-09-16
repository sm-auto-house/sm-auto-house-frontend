"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowRight, Menu, Phone, Search, X } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Magnetic } from "@/components/motion/magnetic";
import { scrollToSection } from "@/components/providers/smooth-scroll";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SearchDialog } from "@/components/layout/search-dialog";
import {
  ThemeToggle,
  ThemeToggleRow,
} from "@/components/layout/theme-toggle";
import { navigation, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [active, setActive] = useState("home");

  useMotionValueEvent(scrollY, "change", (latest) => {
    setSolid(latest > 24);
  });

  // Highlight whichever section currently owns the upper third of the viewport.
  useEffect(() => {
    const ids = navigation.map((item) => item.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // A body-scroll lock is unnecessary for the sheet, but the mobile menu is a
  // full overlay, so hold the page still while it is open.
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", menuOpen);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [menuOpen]);

  function go(href: string) {
    setMenuOpen(false);
    // Let the overlay finish closing before the scroll begins.
    window.setTimeout(() => scrollToSection(href), menuOpen ? 240 : 0);
  }

  return (
    <>
      <header
        /* While transparent the bar floats over the hero photograph, which
           stays dark in both themes, so it borrows the dark palette. Once it
           goes solid it is a page surface again and follows the theme. */
        data-surface={solid ? undefined : "media"}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
          solid
            ? "border-b border-ink/[0.07] bg-carbon-950/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        {/* Thin scroll progress rail */}
        <ScrollRail />

        <Container>
          <nav
            className={cn(
              "flex items-center justify-between transition-[height] duration-500",
              solid ? "h-[68px] lg:h-[76px]" : "h-[80px] lg:h-[96px]",
            )}
            aria-label="Primary"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                go("#home");
              }}
              className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-signal/70"
            >
              <Logo />
            </a>

            {/* Desktop navigation */}
            <ul className="hidden items-center gap-1 xl:flex">
              {navigation.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = active === id;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        go(item.href);
                      }}
                      className={cn(
                        "group relative block px-4 py-2 font-tech text-[0.6875rem] uppercase tracking-[0.12em] transition-colors duration-300",
                        isActive
                          ? "text-ink"
                          : "text-carbon-300 hover:text-ink",
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "absolute inset-x-4 bottom-0.5 h-px origin-left bg-signal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Right cluster */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search products"
                className="flex size-10 items-center justify-center rounded-full text-carbon-200 transition-colors duration-300 hover:bg-ink/[0.07] hover:text-ink focus-visible:ring-2 focus-visible:ring-signal/70 focus-visible:outline-none"
              >
                <Search className="size-[1.1rem]" strokeWidth={1.6} />
              </button>

              <ThemeToggle />

              <Magnetic className="hidden xl:inline-flex" strength={0.2}>
                <Button
                  size="cta"
                  variant="signal"
                  onClick={() => go("#contact")}
                  className="group/cta"
                >
                  Contact Us
                  <ArrowRight className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-1" />
                </Button>
              </Magnetic>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="flex size-10 items-center justify-center rounded-full text-carbon-100 transition-colors duration-300 hover:bg-ink/[0.07] hover:text-ink focus-visible:ring-2 focus-visible:ring-signal/70 focus-visible:outline-none xl:hidden"
              >
                <Menu className="size-5" strokeWidth={1.6} />
              </button>
            </div>
          </nav>
        </Container>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={go}
        active={active}
      />

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function ScrollRail() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="absolute inset-x-0 bottom-0 h-px origin-left bg-signal/80"
    />
  );
}

/* ------------------------------------------------------------------ */

function MobileMenu({
  open,
  onClose,
  onNavigate,
  active,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
  active: string;
}) {
  // Close on Escape: the overlay is a plain element, not a native dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <motion.div
            className="absolute inset-0 grain bg-carbon-950"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="relative flex h-full flex-col overflow-y-auto">
            <Container>
              <div className="flex h-[80px] items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="flex size-10 items-center justify-center rounded-full text-carbon-100 transition-colors hover:bg-ink/[0.07] hover:text-ink"
                >
                  <X className="size-5" strokeWidth={1.6} />
                </button>
              </div>
            </Container>

            <Container className="flex flex-1 flex-col justify-between pb-12">
              <ul className="mt-6 flex flex-col">
                {navigation.map((item, i) => {
                  const id = item.href.replace("#", "");
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.16 + i * 0.055,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="border-b border-ink/[0.07]"
                    >
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(item.href);
                        }}
                        className="flex items-baseline gap-4 py-4 sm:py-5"
                      >
                        <span className="font-tech text-[0.625rem] text-signal">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-display text-[clamp(1.75rem,8vw,2.5rem)] font-extrabold uppercase display-tight transition-colors",
                            active === id ? "text-signal" : "text-ink",
                          )}
                        >
                          {item.label}
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-10 flex flex-col gap-4"
              >
                <Button
                  size="cta-lg"
                  variant="signal"
                  className="w-full"
                  onClick={() => onNavigate("#contact")}
                >
                  Contact Us
                  <ArrowRight />
                </Button>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={site.contact.phoneHref}
                    className="flex items-center gap-3 font-tech text-xs uppercase tracking-[0.12em] text-carbon-300 transition-colors hover:text-ink"
                  >
                    <Phone className="size-4 text-signal" strokeWidth={1.6} />
                    {site.contact.phone}
                  </a>
                  <ThemeToggleRow />
                </div>
              </motion.div>
            </Container>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
