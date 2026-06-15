/**
 * Helpers de aleatoriedad y simulación por lotes para la herramienta
 * Aula Interactiva de Probabilidad. Pensados para correr 1000+ iteraciones
 * sin congelar la UI: las simulaciones se trocean en lotes de ~100 y se
 * agendan con requestAnimationFrame.
 */

/** Entero aleatorio en [min, max] inclusive. */
export function entero(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Cumpleaños como día del año 1..365 (ignoramos años bisiestos). */
export function cumpleAleatorio(): number {
  return entero(1, 365);
}

/** Formatea un día del año como "DD MMM" en español. */
const MESES = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];
const DIAS_POR_MES = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export function diaDelAnioATexto(dia: number): string {
  let restante = dia;
  for (let m = 0; m < 12; m++) {
    if (restante <= DIAS_POR_MES[m]) {
      return `${restante.toString().padStart(2, "0")} ${MESES[m]}`;
    }
    restante -= DIAS_POR_MES[m];
  }
  return "—";
}

/** ¿En un arreglo de cumpleaños hay al menos dos repetidos? */
export function tieneCoincidencia(cumples: number[]): boolean {
  const visto = new Set<number>();
  for (const c of cumples) {
    if (visto.has(c)) return true;
    visto.add(c);
  }
  return false;
}

/**
 * Corre `total` iteraciones de `unaIteracion` en lotes pequeños, llamando
 * `enProgreso(hechas, acumulado)` para que el componente actualice la UI.
 * Devuelve un cancelador.
 *
 * Diseño: usamos requestAnimationFrame para ceder el hilo a la UI cada lote.
 * Cada lote vale ~5ms — visible y fluido sin sobrecargar.
 */
export interface ConfigSim<R> {
  total: number;
  tamLote?: number;
  unaIteracion: () => R;
  acumular: (acc: R[], nueva: R) => R[];
  acumuladoInicial: R[];
  enProgreso: (hechas: number, acumulado: R[]) => void;
  alTerminar?: (acumulado: R[]) => void;
}

export function simularEnLotes<R>(cfg: ConfigSim<R>): () => void {
  const tamLote = cfg.tamLote ?? 50;
  let hechas = 0;
  let acc = cfg.acumuladoInicial;
  let cancelado = false;
  let frame = 0;

  function paso() {
    if (cancelado) return;
    const limite = Math.min(hechas + tamLote, cfg.total);
    for (let i = hechas; i < limite; i++) {
      acc = cfg.acumular(acc, cfg.unaIteracion());
    }
    hechas = limite;
    cfg.enProgreso(hechas, acc);
    if (hechas < cfg.total) {
      frame = requestAnimationFrame(paso);
    } else {
      cfg.alTerminar?.(acc);
    }
  }

  frame = requestAnimationFrame(paso);
  return () => {
    cancelado = true;
    cancelAnimationFrame(frame);
  };
}

/** Una letra mayúscula al azar para iniciales de avatar. */
const LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export function inicialAleatoria(): string {
  return LETRAS[entero(0, LETRAS.length - 1)];
}

/** Paleta sobria para los avatares (acentos de fondo, mismo tono de texto). */
export const PALETA_AVATARES = [
  "bg-blue-600", "bg-indigo-600", "bg-sky-700",
  "bg-emerald-600", "bg-teal-700", "bg-amber-600",
  "bg-rose-600", "bg-violet-700", "bg-slate-700",
];
export function colorAvatar(seed: number): string {
  return PALETA_AVATARES[seed % PALETA_AVATARES.length];
}

/** Bernoulli: con probabilidad p devuelve true. */
export function bernoulli(p: number): boolean {
  return Math.random() < p;
}
