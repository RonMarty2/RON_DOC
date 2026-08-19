"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Componentes de presentación compartidos por todos los módulos.
 *
 * Patrón de libro, en este orden:
 *   Definicion  → qué es el término (corto, sin ejemplo)
 *   [interactivo] → el estudiante lo comprueba
 *   Formula     → la notación simbólica y la sustitución con datos, lado a lado
 *   Trampa      → el error común, por qué ocurre y cómo corregirlo
 *   Puente      → qué queda abierto y hacia dónde sigue
 */

/** Definición formal de un término — estilo libro, sin caja de color. */
export function Definicion({
  termino,
  children,
}: {
  termino: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-4 border-slate-800 pl-4 dark:border-slate-200">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
        Definición
      </p>
      <p className="mt-0.5 font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        {termino}
      </p>
      <div className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {children}
      </div>
    </div>
  );
}

/** Nota conceptual corta (distinción entre dos términos que se confunden). */
export function MiniHistoria({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="rounded-xl border-l-4 border-amber-400 bg-amber-50/70 px-4 py-3 text-sm dark:border-amber-500 dark:bg-amber-950/20">
      <p className="font-semibold text-amber-900 dark:text-amber-200">
        🧠 {titulo}
      </p>
      <div className="mt-1 leading-relaxed text-amber-900/80 dark:text-amber-200/80">
        {children}
      </div>
    </aside>
  );
}

/**
 * Fracción apilada, legible sin librerías de fórmulas.
 * Se usa dentro de <Formula> tanto en la columna de símbolos como en la de
 * números, para que ambas se lean igual.
 */
export function Frac({
  arriba,
  abajo,
}: {
  arriba: React.ReactNode;
  abajo: React.ReactNode;
}) {
  return (
    <span className="mx-1 inline-flex flex-col items-center align-middle">
      <span className="px-1.5 pb-0.5">{arriba}</span>
      <span className="h-px w-full bg-current" />
      <span className="px-1.5 pt-0.5">{abajo}</span>
    </span>
  );
}

/** Variable en cursiva serif, como en un libro de texto. */
export function V({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic">{children}</span>;
}

/** El error común de este apartado: qué es, por qué ocurre y cómo corregirlo. */
export function Trampa({
  error,
  porQue,
  correccion,
}: {
  error: React.ReactNode;
  porQue: React.ReactNode;
  correccion: React.ReactNode;
}) {
  return (
    <aside className="rounded-xl border-l-4 border-rose-400 bg-rose-50/70 px-4 py-3 text-sm dark:border-rose-500 dark:bg-rose-950/20">
      <p className="font-semibold text-rose-900 dark:text-rose-200">
        ⚠️ Trampa común: {error}
      </p>
      <p className="mt-1.5 leading-relaxed text-rose-900/80 dark:text-rose-200/80">
        <span className="font-semibold">Por qué ocurre:</span> {porQue}
      </p>
      <p className="mt-1 leading-relaxed text-rose-900/80 dark:text-rose-200/80">
        <span className="font-semibold">Cómo corregirlo:</span> {correccion}
      </p>
    </aside>
  );
}

/**
 * Cierre del apartado: qué quedó abierto y hacia dónde sigue. Es lo que
 * convierte una lista de temas sueltos en un hilo continuo.
 */
export function Puente({
  children,
  etiquetaBoton,
  onContinuar,
}: {
  children: React.ReactNode;
  etiquetaBoton: string;
  onContinuar: () => void;
}) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white sm:p-8">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-blue-200">
        Lo que sigue
      </p>
      <div className="mt-2 space-y-2 leading-relaxed text-blue-50">{children}</div>
      <button
        type="button"
        onClick={onContinuar}
        className="mt-5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
      >
        {etiquetaBoton} →
      </button>
    </div>
  );
}

/* ================================================================== */
/* MEJORAS DIDÁCTICAS                                                  */
/* ================================================================== */

/**
 * Término con definición en línea. Subrayado punteado; al tocarlo despliega
 * una nota breve sin sacar al lector de la página. Para símbolos y palabras
 * que de otro modo quedarían usados pero nunca explicados (µ, σ, Σ,
 * equiprobable, dicotómico…).
 *
 * No usar dentro de <Formula>, que recorta lo que se desborda.
 */
export function Termino({
  children,
  significa,
}: {
  children: React.ReactNode;
  /** Definición breve, una o dos frases. */
  significa: React.ReactNode;
}) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const botonRef = useRef<HTMLButtonElement>(null);

  // Se cierra al desplazarse, al tocar fuera, al girar la pantalla o con Escape.
  useEffect(() => {
    if (!pos) return;
    const cerrar = () => setPos(null);
    const porTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPos(null);
    };
    const porToque = (e: MouseEvent | TouchEvent) => {
      if (!botonRef.current?.contains(e.target as Node)) setPos(null);
    };
    window.addEventListener("scroll", cerrar, true);
    window.addEventListener("resize", cerrar);
    window.addEventListener("keydown", porTecla);
    document.addEventListener("mousedown", porToque);
    document.addEventListener("touchstart", porToque);
    return () => {
      window.removeEventListener("scroll", cerrar, true);
      window.removeEventListener("resize", cerrar);
      window.removeEventListener("keydown", porTecla);
      document.removeEventListener("mousedown", porToque);
      document.removeEventListener("touchstart", porToque);
    };
  }, [pos]);

  function alternar() {
    if (pos) {
      setPos(null);
      return;
    }
    const r = botonRef.current?.getBoundingClientRect();
    if (!r) return;
    const ancho = Math.min(288, window.innerWidth - 24);
    // Se centra bajo la palabra, pero sin salirse de la pantalla.
    const left = Math.min(
      Math.max(12, r.left + r.width / 2 - ancho / 2),
      window.innerWidth - ancho - 12
    );
    // Si no entra abajo, se muestra arriba.
    const abajo = window.innerHeight - r.bottom;
    const top = abajo > 170 ? r.bottom + 8 : Math.max(12, r.top - 170);
    setPos({ top, left });
  }

  return (
    <>
      <button
        ref={botonRef}
        type="button"
        onClick={alternar}
        aria-expanded={pos !== null}
        className={
          "cursor-help border-b-2 border-dotted font-medium transition " +
          (pos
            ? "border-blue-600 bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200"
            : "border-blue-500 text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-950/40")
        }
      >
        {children}
      </button>
      {pos && (
        <span
          role="note"
          style={{
            position: "fixed",
            top: pos.top,
            left: pos.left,
            width: Math.min(288, typeof window !== "undefined" ? window.innerWidth - 24 : 288),
          }}
          className="z-50 block rounded-xl border border-slate-200 bg-white p-3 text-left text-xs font-normal leading-relaxed text-slate-700 shadow-xl dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
        >
          {significa}
        </span>
      )}
    </>
  );
}

/**
 * Ejemplos a pedido. Una definición sola no alcanza: el lector necesita ver
 * casos concretos, pero mostrarlos todos de entrada satura la página. Con
 * este botón los pide cuando los necesita.
 */
export function Ejemplos({
  titulo = "Ver ejemplos",
  children,
}: {
  titulo?: string;
  children: React.ReactNode;
}) {
  const [abierto, setAbierto] = useState(false);
  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-400 hover:text-blue-700 dark:border-slate-600 dark:text-slate-400 dark:hover:border-blue-600 dark:hover:text-blue-300"
      >
        {abierto ? "Ocultar ejemplos" : titulo} {abierto ? "▲" : "▼"}
      </button>
      {abierto && (
        <div className="mt-2 flex flex-col gap-2 rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800/60">
          {children}
        </div>
      )}
    </div>
  );
}

/** Una fila de ejemplo: el caso concreto y qué ilustra. */
export function Ejemplo({
  caso,
  children,
}: {
  caso: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5 border-l-2 border-slate-300 pl-3 dark:border-slate-600">
      <span className="font-mono text-sm text-slate-800 dark:text-slate-200">
        {caso}
      </span>
      {children && (
        <span className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          {children}
        </span>
      )}
    </div>
  );
}

export interface PasoCalculo {
  /** La línea de la cuenta tal como se escribiría en el pizarrón. */
  expresion: React.ReactNode;
  /** Qué se hizo en este paso y por qué. */
  explicacion: React.ReactNode;
}

/**
 * El desarrollo de una cuenta, línea por línea, con la explicación de cada
 * movimiento. Se revela de a un paso para que el lector tenga que seguir el
 * razonamiento en vez de mirar el resultado ya hecho.
 */
export function Desarrollo({
  titulo = "Desarrollo paso a paso",
  pasos,
  acento = "text-blue-700 dark:text-blue-300",
  insignia = "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
}: {
  titulo?: string;
  pasos: PasoCalculo[];
  acento?: string;
  insignia?: string;
}) {
  const [visibles, setVisibles] = useState(1);
  const completo = visibles >= pasos.length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-2.5 dark:border-slate-800">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          {titulo}
        </p>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tabular-nums text-slate-400">
            {Math.min(visibles, pasos.length)} / {pasos.length}
          </span>
          {!completo && (
            <button
              type="button"
              onClick={() => setVisibles(pasos.length)}
              className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
            >
              Ver todo
            </button>
          )}
          {completo && pasos.length > 1 && (
            <button
              type="button"
              onClick={() => setVisibles(1)}
              className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
            >
              Reiniciar
            </button>
          )}
        </div>
      </div>

      <ol className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
        {pasos.slice(0, visibles).map((p, i) => (
          <li key={i} className="flex gap-4 px-5 py-4">
            <span
              className={
                "grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold tabular-nums " +
                insignia
              }
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="overflow-x-auto text-lg leading-loose tabular-nums text-slate-900 dark:text-slate-100">
                {p.expresion}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {p.explicacion}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {!completo && (
        <div className="border-t border-slate-100 px-5 py-3 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setVisibles((v) => v + 1)}
            className={
              "rounded-full border-2 px-4 py-2 text-sm font-semibold transition hover:bg-slate-50 dark:hover:bg-slate-800 " +
              acento
            }
          >
            Siguiente paso →
          </button>
        </div>
      )}
    </div>
  );
}

export interface ParteFormula {
  /** El trozo de fórmula. */
  expresion: React.ReactNode;
  /** Nombre de esa parte; se muestra como etiqueta arriba. */
  etiqueta?: string;
  /** Qué significa, en una línea. */
  significa?: string;
  color?: "azul" | "ambar" | "verde" | "gris";
}

const COLORES_PARTE = {
  azul: {
    caja: "bg-blue-100 text-blue-900 dark:bg-blue-950/60 dark:text-blue-200",
    chip: "text-blue-700 dark:text-blue-300",
  },
  ambar: {
    caja: "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200",
    chip: "text-amber-700 dark:text-amber-400",
  },
  verde: {
    caja: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200",
    chip: "text-emerald-700 dark:text-emerald-400",
  },
  gris: {
    caja: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
    chip: "text-slate-500 dark:text-slate-400",
  },
};

/**
 * Una fórmula con cada parte etiquetada y explicada. Sirve para que la
 * notación deje de ser un bloque opaco: se ve cuál trozo es la prevalencia,
 * cuál la sensibilidad y cuál el denominador que hay que construir.
 */
export function FormulaAnotada({
  titulo,
  partes,
}: {
  titulo?: string;
  /** Filas de la fórmula. Cada fila es una secuencia de partes. */
  partes: ParteFormula[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {titulo && (
        <p className="border-b border-slate-100 px-5 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:border-slate-800 dark:text-slate-500">
          {titulo}
        </p>
      )}
      <div className="overflow-x-auto px-5 py-6">
        <div className="flex flex-wrap items-end justify-center gap-x-2 gap-y-4">
          {partes.map((p, i) => {
            const c = COLORES_PARTE[p.color ?? "gris"];
            return (
              <span key={i} className="inline-flex flex-col items-center gap-1">
                {p.etiqueta ? (
                  <span
                    className={
                      "text-[10px] font-semibold uppercase tracking-wider " +
                      c.chip
                    }
                  >
                    {p.etiqueta}
                  </span>
                ) : (
                  <span className="text-[10px]">&nbsp;</span>
                )}
                <span
                  className={
                    "rounded-lg px-2.5 py-1.5 text-lg leading-none " +
                    (p.etiqueta ? c.caja : "text-slate-500 dark:text-slate-400")
                  }
                >
                  {p.expresion}
                </span>
              </span>
            );
          })}
        </div>
      </div>
      {partes.some((p) => p.significa) && (
        <ul className="flex flex-col gap-1.5 border-t border-slate-100 px-5 py-4 text-sm dark:border-slate-800">
          {partes
            .filter((p) => p.significa)
            .map((p, i) => {
              const c = COLORES_PARTE[p.color ?? "gris"];
              return (
                <li key={i} className="flex gap-2">
                  <span
                    className={
                      "shrink-0 rounded px-1.5 text-xs font-semibold " + c.caja
                    }
                  >
                    {p.etiqueta}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {p.significa}
                  </span>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}

export interface OpcionComprueba {
  texto: React.ReactNode;
  esCorrecta?: boolean;
  /** Por qué está bien o mal. Se muestra al elegir. */
  porQue: React.ReactNode;
}

/**
 * Momento de práctica: el lector tiene que producir una respuesta y recibe
 * corrección inmediata CON el razonamiento, no sólo un «bien» o «mal».
 * Recuperar activamente lo aprendido es lo que fija el concepto.
 */
export function Comprueba({
  pregunta,
  opciones,
  pista,
}: {
  pregunta: React.ReactNode;
  opciones: OpcionComprueba[];
  pista?: React.ReactNode;
}) {
  const [elegida, setElegida] = useState<number | null>(null);
  const respondio = elegida !== null;
  const acerto = respondio && opciones[elegida].esCorrecta === true;

  return (
    <div className="rounded-2xl border-2 border-slate-300 bg-slate-50/60 p-5 dark:border-slate-700 dark:bg-slate-900/60 sm:p-6">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
        Comprobá si lo entendiste
      </p>
      <p className="mt-2 font-serif text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100">
        {pregunta}
      </p>
      {pista && !respondio && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {pista}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-2">
        {opciones.map((o, i) => {
          const esta = elegida === i;
          const mostrarCorrecta = respondio && o.esCorrecta;
          return (
            <button
              key={i}
              type="button"
              disabled={respondio}
              onClick={() => setElegida(i)}
              className={
                "rounded-xl border-2 px-4 py-3 text-left text-sm transition disabled:cursor-default " +
                (mostrarCorrecta
                  ? "border-emerald-600 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                  : esta
                    ? "border-rose-400 bg-rose-50 text-rose-900 dark:bg-rose-950/30 dark:text-rose-200"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300")
              }
            >
              {mostrarCorrecta && <span aria-hidden>✓ </span>}
              {esta && !o.esCorrecta && <span aria-hidden>✗ </span>}
              {o.texto}
            </button>
          );
        })}
      </div>

      {respondio && (
        <div className="mt-4 flex flex-col gap-3">
          <p
            className={
              "rounded-xl px-4 py-3 text-sm leading-relaxed " +
              (acerto
                ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                : "bg-rose-100 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200")
            }
          >
            <strong>{acerto ? "Correcto. " : "No es ésa. "}</strong>
            {opciones[elegida].porQue}
          </p>
          {!acerto && (
            <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
              <strong>La correcta era: </strong>
              {opciones.find((o) => o.esCorrecta)?.porQue}
            </p>
          )}
          <button
            type="button"
            onClick={() => setElegida(null)}
            className="self-start text-xs font-semibold uppercase tracking-wider text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
          >
            Intentar de nuevo
          </button>
        </div>
      )}
    </div>
  );
}

/** Encabezado numerado, para que se vea la estructura interna del apartado. */
export function PasoTitulo({
  numero,
  children,
  insignia = "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
}: {
  numero: number;
  children: React.ReactNode;
  insignia?: string;
}) {
  return (
    <div className="mt-2 flex items-center gap-3">
      <span
        className={
          "grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold tabular-nums " +
          insignia
        }
      >
        {numero}
      </span>
      <h4 className="font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
        {children}
      </h4>
    </div>
  );
}
