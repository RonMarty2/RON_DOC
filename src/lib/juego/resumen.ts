/**
 * Lo que ve el docente de cada partida, recalculado desde lo que escribió el alumno: la versión
 * que le toca por su cuenta, si cada número estaba bien y qué error típico cometió. No confía en
 * nada guardado salvo los números, la decisión y el argumento.
 */

import { bs } from "../formato";
import {
  capacidadDiaria,
  consecuencia,
  datosDeVersion,
  revisarCapacidad,
  revisarCapacidadConCompra,
  revisarRecuperacion,
  type Opcion,
} from "./planta";
import { describir, type Entrada } from "./registro";
import { versionDeAlumno } from "./version-alumno";

/** El nombre de cada error típico, dicho para el docente. */
export const ERROR_TIPICO: Record<string, string> = {
  "sumo-maquinas": "sumó los ritmos de las máquinas",
  "sin-eficiencia": "olvidó la eficiencia",
  "tomo-envasadora": "tomó la envasadora como límite",
  "tomo-pasteurizador": "tomó el pasteurizador como límite",
  "un-solo-tanque": "contó un solo tanque",
  "creyo-que-sube": "creyó que la envasadora nueva sube la producción",
  "conto-lo-que-no-se-vende": "contó la capacidad nueva entera, no lo que se vende",
  "dio-dias": "dio días en vez de meses",
  otra: "otro número",
};

export interface ResumenPartida {
  version: number;
  /** La versión que le corresponde por su cuenta; si no coincide con la guardada, algo se tocó. */
  versionEsperada: number;
  capacidad: { intentos: number; bien: boolean; errores: string[] };
  pidioAyuda: boolean;
  /** Decisiones en orden (si volvió a decidir, hay más de una). */
  decisiones: Opcion[];
  compra: { intentos: number; bien: boolean; errores: string[] };
  recuperacion: { intentos: number; bien: boolean; errores: string[] };
  argumento: string | null;
  terminada: boolean;
  lineas: { hora: string; texto: string; bien?: boolean }[];
  /** Los números correctos de su versión, para tenerlos a mano en la defensa. */
  correctos: { capacidad: number; conTanque: number; meses: number };
}

const vacio = () => ({ intentos: 0, bien: false, errores: [] as string[] });

export function resumirPartida(
  fila: { estudiante_id: string; version: number; registro: Entrada[]; terminada: boolean },
): ResumenPartida {
  const d = datosDeVersion(fila.version);
  const r: ResumenPartida = {
    version: fila.version,
    versionEsperada: versionDeAlumno(fila.estudiante_id),
    capacidad: vacio(),
    pidioAyuda: false,
    decisiones: [],
    compra: vacio(),
    recuperacion: vacio(),
    argumento: null,
    terminada: fila.terminada,
    lineas: [],
    correctos: {
      capacidad: capacidadDiaria(d),
      conTanque: consecuencia(d, "tanque").capacidad,
      meses: Math.round(consecuencia(d, "tanque").mesesRecuperacion! * 10) / 10,
    },
  };
  const contar = (t: ReturnType<typeof vacio>, dx: string) => {
    if (t.bien) return; // lo que escribió después de acertar no cuenta como intento
    t.intentos++;
    if (dx === "correcta") t.bien = true;
    else t.errores.push(ERROR_TIPICO[dx] ?? dx);
  };
  for (const e of fila.registro) {
    switch (e.tipo) {
      case "capacidad":
        contar(r.capacidad, revisarCapacidad(d, e.valor));
        break;
      case "ayuda":
        r.pidioAyuda = true;
        break;
      case "decision":
        r.decisiones.push(e.opcion);
        break;
      case "compra":
        // Cada decisión nueva empieza su propia cuenta de la compra.
        if (r.decisiones.length > 1 && r.compra.bien) r.compra = vacio();
        contar(r.compra, revisarCapacidadConCompra(d, e.opcion, e.valor));
        break;
      case "recuperacion":
        contar(r.recuperacion, revisarRecuperacion(d, e.valor));
        break;
      case "argumento":
        r.argumento = e.texto;
        break;
    }
    const { texto, bien } = describir(d, e, { diagnostico: false });
    const dx =
      e.tipo === "capacidad" ? revisarCapacidad(d, e.valor)
      : e.tipo === "compra" ? revisarCapacidadConCompra(d, e.opcion, e.valor)
      : e.tipo === "recuperacion" ? revisarRecuperacion(d, e.valor)
      : "correcta";
    r.lineas.push({ hora: e.hora, texto: dx === "correcta" ? texto : `${texto}: ${ERROR_TIPICO[dx]}`, bien });
  }
  return r;
}

/** Una línea corta para la tabla del curso. */
export function lineaCorta(r: ResumenPartida): string {
  const partes = [
    r.capacidad.bien ? `capacidad al intento ${r.capacidad.intentos}` : r.capacidad.intentos ? `capacidad sin resolver (${r.capacidad.intentos} ${r.capacidad.intentos === 1 ? "intento" : "intentos"})` : "sin empezar",
  ];
  if (r.pidioAyuda) partes.push("pidió ayuda");
  if (r.decisiones.length) partes.push(`decidió ${r.decisiones.map((o) => ({ envasadora: "A", tanque: "B", nada: "C" })[o]).join(" → ")}`);
  if (r.recuperacion.intentos) partes.push(r.recuperacion.bien ? `recuperación al intento ${r.recuperacion.intentos}` : "recuperación sin resolver");
  return partes.join(" · ");
}

export const formatoCorrectos = (r: ResumenPartida) =>
  `Hoy ${bs(r.correctos.capacidad)} botellas · con el tanque ${bs(r.correctos.conTanque)} · se recupera en ${bs(r.correctos.meses, 1)} meses`;
