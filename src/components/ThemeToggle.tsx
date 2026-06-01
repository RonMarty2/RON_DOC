"use client";

import { useTema } from "./ThemeProvider";

export function ThemeToggle() {
  const { tema, alternar } = useTema();
  const esOscuro = tema === "oscuro";

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={esOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      <span aria-hidden className="text-base">
        {esOscuro ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
