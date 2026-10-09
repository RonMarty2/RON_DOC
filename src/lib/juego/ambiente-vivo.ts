/**
 * «La noche pasa» para cualquier juego (idea de Ronald, 09-10: la ventana, la luna, la ciudad y el reloj cambian
 * con el avance de la historia). Es común: cada tema pasa su PERFIL como dato y recibe las cuentas; lo que se dibuja
 * (capas de arte, PixiJS) lo pone la escena de cada juego. El primero en usarlo es el Tema 1 de Psicoestadística
 * (`psicoestadistica/hora-historia.ts`).
 *
 * Todo se mide en minutos desde la hora de inicio de la historia.
 */

export interface PerfilAmbiente {
  /** Hora del reloj al empezar, en minutos desde la medianoche (23:00 = 1380). */
  inicio: number;
  /** Minutos desde el inicio en que empieza a entrar la primera luz (hasta ahora es de noche). */
  amanecer: number;
  /** Minutos desde el inicio en que llega el cierre, con la primera luz completa. */
  cierre: number;
  /** Cuántas ventanitas de la ciudad hay encendidas al inicio, justo antes del amanecer y en el cierre. */
  ventanitas: { inicio: number; antesDelAmanecer: number; cierre: number };
  /** La luna: de dónde sale y dónde se pone, dentro del hueco de la ventana. */
  luna: { desde: { x: number; y: number }; hasta: { x: number; y: number } };
}

const limitar = (x: number) => Math.min(1, Math.max(0, x));

/** 0 de noche, 1 con la primera luz. */
export const amanecer = (c: PerfilAmbiente, p: number) => limitar((p - c.amanecer) / (c.cierre - c.amanecer));

/** La hora que marca el reloj, «23:50». */
export function horaTexto(c: PerfilAmbiente, p: number): string {
  const m = (c.inicio + Math.round(p)) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/** Ángulos (radianes, 0 = derecha, horario) de las manecillas para la hora exacta. */
export function angulosReloj(c: PerfilAmbiente, p: number): { hora: number; minuto: number } {
  const m = (c.inicio + p) % 1440;
  return { minuto: ((m % 60) / 60) * 2 * Math.PI - Math.PI / 2, hora: (((m / 60) % 12) / 12) * 2 * Math.PI - Math.PI / 2 };
}

/** Cuántas ventanitas están encendidas: bajan con la noche y suben un poco al amanecer (la ciudad despierta). */
export function ventanitasEncendidas(c: PerfilAmbiente, p: number): number {
  const v = c.ventanitas;
  if (p <= c.amanecer) return Math.round(v.inicio + ((v.antesDelAmanecer - v.inicio) * Math.max(0, p)) / c.amanecer);
  return Math.round(v.antesDelAmanecer + (v.cierre - v.antesDelAmanecer) * amanecer(c, p));
}

/** Posición de la luna: baja con la noche. */
export function posicionLuna(c: PerfilAmbiente, p: number): { x: number; y: number } {
  const t = limitar(p / c.cierre);
  const { desde, hasta } = c.luna;
  return { x: Math.round(desde.x + (hasta.x - desde.x) * t), y: Math.round(desde.y + (hasta.y - desde.y) * t) };
}
