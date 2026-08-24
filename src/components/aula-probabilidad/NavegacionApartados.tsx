"use client";

import { useEffect, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { MODULOS, type ModuloId } from "./modulos";
import { BLOQUES, ORDEN_BLOQUES } from "./bloques";

/**
 * La navegación entre apartados, en dos formas según el espacio REAL.
 *
 * Historia del componente:
 *
 *  1. Era una barra pegajosa de cuatro filas que seguía al lector durante todo
 *     el desplazamiento: en un portátil se comía cerca del 15% del alto útil.
 *  2. Pasó a ser un riel vertical a la derecha, pero decidido por un punto de
 *     corte fijo (`min-[1440px]`). Ese punto de corte mira el ancho de la
 *     ventana, NO el margen que sobra al costado del texto: al hacer zoom (o
 *     al agrandar la letra del navegador) el riel seguía apareciendo aunque ya
 *     no cupiera, y se veía cortado contra el borde.
 *  3. Ahora el riel se MIDE, no se adivina. `useHuecoRiel` compara el borde
 *     derecho de la columna de contenido con el ancho útil de la ventana; si
 *     el hueco que sobra no alcanza para un riel legible, el riel no existe y
 *     manda el botón flotante. El umbral está en `em`, así que también se
 *     adapta cuando el navegador agranda sólo el texto.
 *
 * Además el riel y el menú se dibujan con `createPortal` sobre `document.body`:
 * así su posición no depende de ningún ancestro (un `transform` o un
 * `backdrop-filter` en cualquier contenedor cambiaría el marco de referencia de
 * `position: fixed` y volvería a descuadrarlo).
 */

/** Hueco disponible a la derecha del contenido, ya en píxeles concretos. */
export interface HuecoRiel {
  /** Distancia desde el borde izquierdo de la ventana. */
  izquierda: number;
  /** Ancho que puede ocupar el riel sin tocar nada. */
  ancho: number;
}

/** Mínimo para que las etiquetas se lean sin cortarse (en `em`, no en px). */
const ANCHO_MINIMO_EM = 14.5;
/** No tiene sentido que crezca más: es un índice, no una columna de texto. */
const ANCHO_MAXIMO_EM = 18;
/** Aire entre el contenido y el riel, y entre el riel y el borde. */
const SEPARACION_EM = 1.25;

/**
 * Mide el margen libre a la derecha de `refContenido` y devuelve dónde entra
 * el riel — o `null` si no entra. Se recalcula al redimensionar, al hacer
 * zoom, al cambiar el tamaño de letra y al cambiar de apartado (el alto del
 * contenido cambia, aparece o desaparece la barra de desplazamiento y con ella
 * el ancho útil).
 */
export function useHuecoRiel(
  refContenido: RefObject<HTMLElement | null>
): HuecoRiel | null {
  const [hueco, setHueco] = useState<HuecoRiel | null>(null);

  useEffect(() => {
    const contenido = refContenido.current;
    if (!contenido || typeof ResizeObserver === "undefined") return;

    // Firma del último valor aplicado: evita `setState` en cada píxel de
    // arrastre y corta cualquier riesgo de bucle con el ResizeObserver.
    let ultimaFirma = "";

    const medir = () => {
      const raiz =
        parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const separacion = SEPARACION_EM * raiz;
      const minimo = ANCHO_MINIMO_EM * raiz;
      const maximo = ANCHO_MAXIMO_EM * raiz;

      const caja = contenido.getBoundingClientRect();
      // `clientWidth` del documento excluye la barra de desplazamiento; usar
      // `innerWidth` dejaría el riel medio tapado por ella.
      const anchoUtil = document.documentElement.clientWidth;
      const libre = anchoUtil - caja.right - separacion * 2;

      // El riel se centra en el hueco: si sobra espacio no queda pegado al
      // texto ni al borde, que es lo que lo hacía ver «cortado».
      const anchoRiel = Math.min(libre, maximo);
      const siguiente: HuecoRiel | null =
        libre >= minimo
          ? {
              izquierda: Math.round(
                caja.right + separacion + (libre - anchoRiel) / 2
              ),
              ancho: Math.round(anchoRiel),
            }
          : null;

      const firma = siguiente ? `${siguiente.izquierda}:${siguiente.ancho}` : "";
      if (firma === ultimaFirma) return;
      ultimaFirma = firma;
      setHueco(siguiente);
    };

    medir();

    const observador = new ResizeObserver(medir);
    observador.observe(contenido);
    observador.observe(document.documentElement);
    window.addEventListener("resize", medir);
    window.visualViewport?.addEventListener("resize", medir);

    return () => {
      observador.disconnect();
      window.removeEventListener("resize", medir);
      window.visualViewport?.removeEventListener("resize", medir);
    };
  }, [refContenido]);

  return hueco;
}

/**
 * Los botones flotantes se esconden mientras se baja y vuelven al subir o al
 * detenerse.
 *
 * Flotar sobre el texto es el precio de no ocupar espacio fijo, y se hacía
 * notar: el botón quedaba encima del párrafo que estabas leyendo. Así el
 * lector recupera la pantalla completa mientras avanza, y los controles
 * reaparecen apenas los busca (subir) o apenas deja de leer.
 */
export function useOcultarAlBajar(): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let ultimo = window.scrollY;
    let quieto: number | undefined;

    const alDesplazar = () => {
      const y = window.scrollY;
      // Umbral de 4px: evita que el rebote del navegador lo dispare solo.
      if (y > ultimo + 4 && y > 140) setVisible(false);
      else if (y < ultimo - 4) setVisible(true);
      ultimo = y;

      window.clearTimeout(quieto);
      quieto = window.setTimeout(() => setVisible(true), 900);
    };

    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => {
      window.removeEventListener("scroll", alDesplazar);
      window.clearTimeout(quieto);
    };
  }, []);

  return visible;
}

/** Lista de apartados agrupada por bloque. Se usa en el riel y en el panel. */
function ListaApartados({
  activo,
  irA,
  compacta,
}: {
  activo: ModuloId;
  irA: (id: ModuloId) => void;
  compacta?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      {ORDEN_BLOQUES.map((bloqueId) => {
        const b = BLOQUES[bloqueId];
        const delBloque = MODULOS.filter((m) => m.bloque === bloqueId);
        const bloqueActivo = delBloque.some((m) => m.id === activo);
        return (
          <div key={bloqueId}>
            <div className="mb-1 flex items-center gap-1.5">
              <span className={"h-1 w-3 shrink-0 rounded-full " + b.barra} />
              <span
                className={
                  "font-mono text-[9px] font-semibold uppercase tracking-widest transition " +
                  (bloqueActivo ? b.texto : "text-slate-400 dark:text-slate-600")
                }
              >
                {b.etiqueta}
              </span>
            </div>
            <div className={compacta ? "flex flex-wrap gap-1.5" : "flex flex-col gap-0.5"}>
              {delBloque.map((m) => {
                const esActivo = m.id === activo;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => irA(m.id)}
                    aria-current={esActivo ? "step" : undefined}
                    className={
                      compacta
                        ? "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition " +
                          (esActivo ? b.activo : b.inactivo)
                        : "flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] leading-tight transition " +
                          (esActivo
                            ? "bg-slate-100 font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200")
                    }
                  >
                    <span aria-hidden className="shrink-0">
                      {m.icono}
                    </span>
                    {/* `min-w-0` + salto de línea: si el hueco se angosta, la
                        etiqueta se parte en dos renglones en vez de cortarse. */}
                    <span
                      className={
                        compacta
                          ? "whitespace-nowrap"
                          : "min-w-0 flex-1 break-words"
                      }
                    >
                      {m.apartado ? `${m.apartado} ${m.titulo}` : m.titulo}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Riel vertical a la derecha. Sólo se dibuja cuando `hueco` no es `null`, es
 * decir cuando la medición confirmó que entra completo.
 */
export function RielApartados({
  activo,
  irA,
  indiceActivo,
  hueco,
}: {
  activo: ModuloId;
  irA: (id: ModuloId) => void;
  indiceActivo: number;
  hueco: HuecoRiel | null;
}) {
  if (!hueco) return null;

  return createPortal(
    <nav
      aria-label="Apartados"
      style={{ left: hueco.izquierda, width: hueco.ancho }}
      className="pointer-events-none fixed inset-y-0 z-20 flex items-center"
    >
      <div className="pointer-events-auto max-h-[76vh] w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-slate-400">
            Recorrido
          </span>
          <span className="shrink-0 font-mono text-[10px] tabular-nums text-slate-400">
            {indiceActivo + 1}/{MODULOS.length}
          </span>
        </div>
        <ListaApartados activo={activo} irA={irA} />
      </div>
    </nav>,
    document.body
  );
}

/**
 * Botón flotante + panel. Es la forma por defecto: aparece siempre que el riel
 * no quepa, incluido el primer render del servidor (donde todavía no hay nada
 * medido) y cualquier nivel de zoom.
 */
export function MenuApartados({
  activo,
  irA,
  indiceActivo,
  visible,
}: {
  activo: ModuloId;
  irA: (id: ModuloId) => void;
  indiceActivo: number;
  visible: boolean;
}) {
  const [abierto, setAbierto] = useState(false);
  const [montado, setMontado] = useState(false);
  const alaVista = useOcultarAlBajar();
  const meta = MODULOS.find((m) => m.id === activo) ?? MODULOS[0];
  const acento = BLOQUES[meta.bloque];

  useEffect(() => setMontado(true), []);

  // Si el riel toma el relevo mientras el panel estaba abierto, cerrarlo.
  useEffect(() => {
    if (!visible) setAbierto(false);
  }, [visible]);

  useEffect(() => {
    if (!abierto) return;
    const porTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", porTecla);
    return () => window.removeEventListener("keydown", porTecla);
  }, [abierto]);

  function elegir(id: ModuloId) {
    irA(id);
    setAbierto(false);
  }

  if (!visible || !montado) return null;

  return createPortal(
    <>
      {/* Botón compacto. Antes mostraba el título completo del apartado y
          quedaba tan ancho que tapaba el texto de la página; el número de
          apartado alcanza para saber dónde estás. */}
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-label={`Apartados. Estás en ${meta.titulo}, ${indiceActivo + 1} de ${MODULOS.length}`}
        className={
          "abajo-seguro fixed left-4 z-40 flex items-center gap-2 rounded-full py-3 pl-4 pr-4 text-sm font-semibold shadow-lg transition duration-200 " +
          (alaVista || abierto
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-24 opacity-0") +
          " " + acento.activo
        }
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="shrink-0"
          aria-hidden
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="font-mono text-xs tabular-nums">
          {indiceActivo + 1}/{MODULOS.length}
        </span>
      </button>

      {abierto && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-900/30"
            onClick={() => setAbierto(false)}
            aria-hidden
          />
          <nav
            aria-label="Apartados"
            className="pb-segura px-seguro fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-2xl border-t border-slate-200 bg-white px-5 pt-4 shadow-2xl sm:bottom-20 sm:left-4 sm:right-auto sm:w-[min(18rem,calc(100vw-2rem))] sm:rounded-2xl sm:border sm:pb-4 dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="min-w-0 truncate font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Recorrido · {indiceActivo + 1} de {MODULOS.length}
              </span>
              <button
                type="button"
                onClick={() => setAbierto(false)}
                className="text-sm text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                cerrar ✕
              </button>
            </div>
            <ListaApartados activo={activo} irA={elegir} />
          </nav>
        </>
      )}
    </>,
    document.body
  );
}
