/**
 * La noche pasa (mapa de ambientes «v20 horas», Ronald 09-10): la historia empieza a las 23:00 y el
 * cierre llega a las 05:30 con la primera luz. Todo se mide en minutos desde las 23:00 (0 a 390).
 * Solo cuentas: lo que se dibuja (ventana, luna, reloj) está en `EscenaPixi.tsx`. Las cuentas son las comunes de
 * `src/lib/juego/ambiente-vivo.ts`; aquí está el perfil de este tema.
 */

import * as A from "../ambiente-vivo";

export const MIN_AMANECER = 350; // 04:50: sigue de noche; desde aquí entra la primera luz
export const MIN_CIERRE = 390; // 05:30
const MIN_CASO2 = 50; // 23:50

/** Los 16 huecos de ventanita (2×2) de `ciudad_siluetas.png`; copia de `docs/juego/arte/psicoestadistica/ciudad_luces.json` (la prueba las compara). */
export const HUECOS_CIUDAD: readonly (readonly [number, number])[] = [
  [11, 9], [11, 13], [22, 11], [31, 6], [35, 10], [31, 14], [44, 10], [53, 8],
  [53, 12], [58, 6], [63, 10], [5, 13], [16, 15], [27, 14], [39, 12], [49, 15],
];

/** Qué ventanitas se apagan primero al avanzar la noche (fijo, para que todos los alumnos vean lo mismo). */
export const ORDEN_VENTANITAS = [3, 9, 7, 10, 0, 6, 12, 14, 1, 4, 8, 11, 15, 2, 5, 13] as const;

/** Minutos desde las 23:00 según la fase de la pantalla: el Caso 2 es el segundo (23:50) y el final de la prueba es el cierre (05:30). */
export function minutosDeFase(fase: string): number {
  if (fase === "fin") return MIN_CIERRE;
  if (["entrada2", "archivo2", "frase", "confirma", "reaccion"].includes(fase)) return MIN_CASO2;
  return 0;
}

/** El perfil del Tema 1: de 23:00 a 05:30, 13 ventanitas al empezar, 3 a las 04:50 y 5 con la primera luz; la luna baja por el hueco de 68×52. */
export const PERFIL_T1: A.PerfilAmbiente = {
  inicio: 23 * 60,
  amanecer: MIN_AMANECER,
  cierre: MIN_CIERRE,
  ventanitas: { inicio: 13, antesDelAmanecer: 3, cierre: 5 },
  luna: { desde: { x: 50, y: 5 }, hasta: { x: 42, y: 36 } },
};

export const amanecer = (p: number) => A.amanecer(PERFIL_T1, p);
export const horaTexto = (p: number) => A.horaTexto(PERFIL_T1, p);
export const angulosReloj = (p: number) => A.angulosReloj(PERFIL_T1, p);
export const ventanitasEncendidas = (p: number) => A.ventanitasEncendidas(PERFIL_T1, p);
export const posicionLuna = (p: number) => A.posicionLuna(PERFIL_T1, p);
