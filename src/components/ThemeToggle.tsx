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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-borde bg-tarjeta text-tinta-media transition hover:bg-papel-suave"
    >
      <span aria-hidden className="text-base">
        {esOscuro ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
