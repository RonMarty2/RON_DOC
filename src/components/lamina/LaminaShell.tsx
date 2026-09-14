"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export type Tono = "acento" | "tenue" | "aviso" | "ok" | "error";

export const TONO_TEXTO: Record<Tono, string> = {
  acento: "text-acento",
  tenue: "text-tinta-tenue",
  aviso: "text-aviso",
  ok: "text-ok",
  error: "text-error",
};

export type LaminaDiapositiva = {
  etiqueta: string;
  tono?: Tono;
  contenido: React.ReactNode;
};

export type LaminaEnlace = {
  href: string;
  titulo: string;
};

export type LaminaShellProps = {
  /** Línea chica sobre el título, ej. "Psicoestadística Inferencial · Unidad 2". */
  contexto: string;
  titulo: string;
  volver: LaminaEnlace;
  diapositivas: LaminaDiapositiva[];
  necesitasAntes?: LaminaEnlace;
  teAbrePuertaA?: LaminaEnlace;
};

const FlechaIzq = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const FlechaDer = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

// Un gesto que empieza sobre algo con desplazamiento propio (una fórmula ancha, un deslizador) no cambia de tarjeta.
function tieneGestoPropio(desde: EventTarget | null, limite: Element): boolean {
  for (let n = desde instanceof Element ? desde : null; n && n !== limite; n = n.parentElement) {
    if (n.matches("input, textarea, select")) return true;
    const ox = getComputedStyle(n).overflowX;
    if ((ox === "auto" || ox === "scroll") && n.scrollWidth > n.clientWidth + 1) return true;
  }
  return false;
}

/**
 * Lámina en tarjetas: una idea por tarjeta, navegación sólo con íconos,
 * puntos tocables, deslizar, y flechas o control de presentación en clase.
 */
export function LaminaShell({
  contexto,
  titulo,
  volver,
  diapositivas,
  necesitasAntes,
  teAbrePuertaA,
}: LaminaShellProps) {
  const total = diapositivas.length;
  const [pos, setPos] = useState({ i: 0, dir: 1 });
  const toque = useRef<{ x: number; y: number } | null>(null);

  const irA = useCallback(
    (destino: (actual: number) => number) => {
      setPos((p) => {
        const n = destino(p.i);
        if (n < 0 || n >= total || n === p.i) return p;
        return { i: n, dir: n > p.i ? 1 : -1 };
      });
    },
    [total]
  );

  // El contenido del sitio queda detrás de la lámina: que no se desplace a escondidas.
  useEffect(() => {
    const html = document.documentElement;
    const previo = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previo;
    };
  }, []);

  useEffect(() => {
    function alTeclear(e: KeyboardEvent) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.target instanceof Element && e.target.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        irA((a) => a + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        irA((a) => a - 1);
      }
    }
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [irA]);

  function alEmpezarToque(e: React.TouchEvent) {
    toque.current = tieneGestoPropio(e.target, e.currentTarget)
      ? null
      : { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }

  function alTerminarToque(e: React.TouchEvent) {
    if (!toque.current) return;
    const dx = e.changedTouches[0].clientX - toque.current.x;
    const dy = e.changedTouches[0].clientY - toque.current.y;
    toque.current = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      irA((a) => a + (dx < 0 ? 1 : -1));
    }
  }

  const { i, dir } = pos;
  const tarjeta = diapositivas[i];

  return (
    <div className="pt-segura px-seguro fixed inset-0 z-50 flex flex-col bg-papel text-tinta">
      <header className="border-b border-borde">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-2.5">
          <Link
            href={volver.href}
            aria-label={`Volver a ${volver.titulo}`}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-acento hover:text-acento-hover"
          >
            <FlechaIzq />
            <span className="hidden sm:inline">{volver.titulo}</span>
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-tinta-tenue">
              {contexto}
            </p>
            <p className="truncate font-serif text-lg font-medium leading-tight">{titulo}</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <nav aria-label="Tarjetas de la lámina" className="flex flex-wrap justify-center gap-x-1 px-4 pt-2">
        {diapositivas.map((d, n) => (
          <button
            key={n}
            type="button"
            onClick={() => irA(() => n)}
            aria-label={`Ir a: ${d.etiqueta}`}
            aria-current={n === i ? "step" : undefined}
            className="px-0.5 py-2"
          >
            <span
              className={`block h-1 rounded-full transition-all duration-200 ${
                n === i ? "w-8 bg-acento" : n < i ? "w-5 bg-acento/45" : "w-5 bg-borde-fuerte"
              }`}
            />
          </button>
        ))}
      </nav>

      <div
        className="flex min-h-0 flex-1 items-center justify-center px-2 py-1 sm:px-6"
        onTouchStart={alEmpezarToque}
        onTouchEnd={alTerminarToque}
      >
        <div className="lamina-escala h-full max-h-[46em] w-full max-w-[42em]">
          <article
            key={i}
            aria-live="polite"
            className={`${dir > 0 ? "lamina-entra-der" : "lamina-entra-izq"} flex h-full flex-col gap-[0.9em] overflow-y-auto overscroll-contain rounded-[1.25em] border border-borde bg-tarjeta px-[1.4em] py-[1.6em] leading-relaxed shadow-[0_8px_30px_rgba(0,0,0,0.06)]`}
          >
            <p className={`text-[0.72em] font-extrabold uppercase tracking-[0.06em] ${TONO_TEXTO[tarjeta.tono ?? "acento"]}`}>
              {tarjeta.etiqueta}
            </p>
            {tarjeta.contenido}
          </article>
        </div>
      </div>

      <div className="pb-segura">
        <div className="flex items-center justify-center gap-5 px-4 pt-3">
          <button
            type="button"
            onClick={() => irA((a) => a - 1)}
            disabled={i === 0}
            aria-label="Tarjeta anterior"
            className="flex size-13 items-center justify-center rounded-full bg-papel-suave text-tinta transition disabled:opacity-30"
          >
            <FlechaIzq />
          </button>
          <button
            type="button"
            onClick={() => irA((a) => a + 1)}
            disabled={i === total - 1}
            aria-label="Tarjeta siguiente"
            className="flex size-15 items-center justify-center rounded-full bg-acento text-acento-texto transition hover:bg-acento-hover disabled:opacity-30"
          >
            <FlechaDer />
          </button>
        </div>

        {(necesitasAntes || teAbrePuertaA) && (
          <footer className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-2 px-4 pt-3">
            {necesitasAntes && <EnlacePie etiqueta="Necesitas antes" enlace={necesitasAntes} />}
            {teAbrePuertaA && <EnlacePie etiqueta="Te abre la puerta a" enlace={teAbrePuertaA} />}
          </footer>
        )}
      </div>
    </div>
  );
}

function EnlacePie({ etiqueta, enlace }: { etiqueta: string; enlace: LaminaEnlace }) {
  return (
    <Link href={enlace.href} className="flex flex-col text-xs">
      <span className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-tinta-tenue">{etiqueta}</span>
      <span className="font-medium text-acento hover:text-acento-hover">{enlace.titulo}</span>
    </Link>
  );
}
