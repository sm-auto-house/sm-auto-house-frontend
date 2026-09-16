export type Theme = "dark" | "light";

/** The theme the server renders, and the fallback if nothing else resolves. */
export const DEFAULT_THEME: Theme = "dark";

/** localStorage key holding an explicit choice. Absent means "follow the OS". */
export const THEME_STORAGE_KEY = "sm-theme";

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

/** Reads the OS preference. Dark is the house default, so only an explicit
 *  light preference moves us off it. */
export function systemTheme(): Theme {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function storedTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    // Private mode, blocked site data: fall through to the OS preference.
    return null;
  }
}

/** The theme that should be on screen right now. */
export function resolveTheme(): Theme {
  return storedTheme() ?? systemTheme();
}

/** The single place that writes the theme to the DOM. Kept in one function so
 *  the toggle, the system-preference listener and the dev remount fix cannot
 *  drift apart. */
export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

/**
 * Runs synchronously in <head>, while the browser is still parsing the HTML,
 * so the correct theme is on <html> before the first paint. Anything here must
 * be plain ES5 and must never throw, because it blocks rendering.
 *
 * It mirrors resolveTheme() + applyTheme() above; keep the two in step.
 */
export const THEME_SCRIPT = `(function(){try{var d=document.documentElement,t=null;try{t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})}catch(e){}if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.classList.remove("dark","light");d.classList.add(t);d.style.colorScheme=t}catch(e){}})()`;
