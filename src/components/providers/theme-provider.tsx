"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import {
  applyTheme,
  DEFAULT_THEME,
  resolveTheme,
  storedTheme,
  systemTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

type ThemeContextValue = {
  /** The theme currently painted. On the server this is DEFAULT_THEME; on the
   *  client it is seeded from the same source as the inline script, so it is
   *  right from the first render. */
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Marks the document for the length of one swap so the base stylesheet can
 *  cross-fade colours. Kept off the document at rest — a standing transition
 *  on every element is a cost nothing else here needs to pay. */
const CROSS_FADE_MS = 320;
let crossFadeTimer: number | undefined;

function crossFade() {
  const root = document.documentElement;
  root.setAttribute("data-theme-switching", "");
  window.clearTimeout(crossFadeTimer);
  crossFadeTimer = window.setTimeout(
    () => root.removeAttribute("data-theme-switching"),
    CROSS_FADE_MS,
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // The inline script in <head> has already put the right class on <html>.
  // Seed state from the same source so React agrees with the DOM.
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window === "undefined" ? DEFAULT_THEME : resolveTheme(),
  );

  useLayoutEffect(() => {
    // React resets <html>'s attributes on the dev Strict Mode remount, which
    // drops what the inline script set. Re-apply before paint; a no-op in
    // production. State needs no correction here — the initializer above read
    // the same source the script did.
    applyTheme(resolveTheme());
  }, []);

  // With no explicit choice stored, keep following the OS.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      if (storedTheme()) return;
      const next = systemTheme();
      crossFade();
      applyTheme(next);
      setThemeState(next);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // A choice made in another tab should land here too.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== THEME_STORAGE_KEY) return;
      const next = resolveTheme();
      applyTheme(next);
      setThemeState(next);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    crossFade();
    applyTheme(next);
    setThemeState(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable — the choice holds for this page view only.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolveTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return context;
}
