import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

function applyTheme(theme: "dark" | "light") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch {}
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#ffffff" : "#000000");
}

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  return (
    <button
      type="button"
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      disabled={!mounted}
      onClick={() => {
        const next = isDark ? "light" : "dark";
        setIsDark(next === "dark");
        applyTheme(next);
      }}
      className={cn(
        "relative inline-flex size-8 items-center justify-center rounded-lg border border-border bg-transparent text-fg",
        "transition-[background-color,color] duration-150 ease-out",
        "hover:bg-surface hover:text-fg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40",
        "disabled:pointer-events-none disabled:opacity-50",
        "active:scale-[0.96]",
        "after:absolute after:top-1/2 after:left-1/2 after:size-11 after:-translate-x-1/2 after:-translate-y-1/2",
      )}
    >
      <span className="relative size-4">
        <Moon
          className={cn(
            "absolute inset-0 size-4 transition-[opacity,filter,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
            isDark
              ? "scale-100 opacity-100 blur-none"
              : "scale-[0.25] opacity-0 blur-[4px]",
          )}
          strokeWidth={1.75}
          aria-hidden
        />
        <Sun
          className={cn(
            "absolute inset-0 size-4 transition-[opacity,filter,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
            isDark
              ? "scale-[0.25] opacity-0 blur-[4px]"
              : "scale-100 opacity-100 blur-none",
          )}
          strokeWidth={1.75}
          aria-hidden
        />
      </span>
    </button>
  );
}
