"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import styles from "./Footer.module.css";

const STORAGE_KEY = "theme";

// Renders "light" on the server (and on first client paint, to avoid a
// hydration mismatch), then syncs to the real stored/system preference
// once mounted — the blocking script in layout.tsx's <head> is what
// actually prevents a visible flash of the wrong theme on reload.
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      // One-time read of browser-only state on mount, to sync away from
      // the SSR default ("light") without a hydration mismatch — not an
      // update loop, so the cascading-render concern this rule guards
      // against doesn't apply here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(stored);
      return;
    }
    setTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <button
      type="button"
      className={`${styles.iconButton} ${styles.themeToggle}`}
      onClick={toggle}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
    >
      {/* Same cross-fade approach as FooterCopyButton, with a slight
          rotation added — a small day/night flip rather than a flat swap. */}
      <span className={styles.iconSwap} data-state={theme}>
        <Moon className={styles.iconMoon} size={24} aria-hidden="true" />
        <Sun className={styles.iconSun} size={24} aria-hidden="true" />
      </span>
    </button>
  );
}
