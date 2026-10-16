"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { themeStorageKey } from "../lib/theme";

export default function ThemeToggle() {
  useEffect(() => {
    const system = window.matchMedia("(prefers-color-scheme: dark)");
    let override: string | null = null;
    const sync = () => {
      try { override = localStorage.getItem(themeStorageKey); } catch { /* Storage may be blocked. */ }
      document.documentElement.dataset.theme =
        override === "light" || override === "dark"
          ? override : system.matches ? "dark" : "light";
    };
    sync();
    system.addEventListener("change", sync);
    const storage = (event: StorageEvent) => {
      if (event.key === themeStorageKey || event.key === null) sync();
    };
    window.addEventListener("storage", storage);
    return () => {
      system.removeEventListener("change", sync);
      window.removeEventListener("storage", storage);
    };
  }, []);

  function toggle() {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(themeStorageKey, theme); } catch { /* Still works for this visit. */ }
  }

  return (
    <button type="button" onClick={toggle}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-background/80 text-foreground transition-colors hover:border-accent"
    >
      <span className="theme-to-light"><Sun className="h-5 w-5" aria-hidden /><span className="sr-only">Switch to light theme</span></span>
      <span className="theme-to-dark"><Moon className="h-5 w-5" aria-hidden /><span className="sr-only">Switch to dark theme</span></span>
    </button>
  );
}
