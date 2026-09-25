/**
 * Escena 1 del juego (isla Proyectos II): «La máquina que no alcanzaba», con Lácteos Valle Alto.
 * Todo número que ve o escribe el alumno sale de acá, con pruebas en planta.test.ts.
 *
 * La versión 0 es el caso del dossier de la Semana 1 de Proyectos II (subtema 1.3). Las demás
 * versiones cambian los números con un sorteo con semilla, pero siempre dentro de reglas que
 * conservan la lección: la fermentación es el cuello de botella, la envasadora rápida no agrega
 * ni un litro y el tercer tanque alcanza para los pedidos. Así dos alumnos con versiones distintas
 * razonan igual pero no pueden copiarse el número.
 */

import { azarConSemilla, type Azar } from "../finanzas/ejercicios";

export const VERSION_MAXIMA = 999;

export interface DatosPlanta {
  version: number;
  /** Litros por hora. */
  pasteurizador: number;
  tanques: number;
  litrosPorTanque: number;
  /** Horas que tarda en fermentar un tanque lleno. */
  cicloHoras: number;
  envasadora: number;
  envasadoraNueva: number;
  precioEnvasadoraNueva: number;
  precioTanque: number;
  horasPorDia: number;
  /** Fracción del día que las máquinas trabajan de verdad (limpiezas y paradas). */
  eficiencia: number;
  pedidosPorDia: number;
  /** Bs por litro vendido, ya descontado el costo. */
  margenPorLitro: number;
  diasPorMes: number;
  /** Plata de la empresa al empezar la escena (dato de la escena, no del dossier). */
  cajaInicial: number;
}

export const CASO_DOSSIER: DatosPlanta = {
  version: 0,
  pasteurizador: 300,
  tanques: 2,
  litrosPorTanque: 200,
  cicloHoras: 8,
  envasadora: 120,
  envasadoraNueva: 400,
  precioEnvasadoraNueva: 38_000,
  precioTanque: 45_000,
  horasPorDia: 16,
  eficiencia: 0.9,
  pedidosPorDia: 860,
  margenPorLitro: 4,
  diasPorMes: 26,
  cajaInicial: 120_000,
};

/** Litros por hora que deja pasar la fermentación con `tanques` tanques. */
export function ritmoFermentacion(d: DatosPlanta, tanques = d.tanques) {
  return (tanques * d.litrosPorTanque) / d.cicloHoras;
}

/**
 * Litros por día que sale de la planta: el yogur pasa por todas las etapas, una tras otra,
 * así que manda la más lenta. Se redondea al litro, que es lo que se cuenta en botellas.
 */
export function capacidadDiaria(d: DatosPlanta, cambios: { tanques?: number; envasadora?: number } = {}) {
  const ritmo = Math.min(d.pasteurizador, ritmoFermentacion(d, cambios.tanques), cambios.envasadora ?? d.envasadora);
  return Math.round(ritmo * d.horasPorDia * d.eficiencia);
}

export type Etapa = "pasteurizador" | "fermentacion" | "envasadora";

export function cuelloDeBotella(d: DatosPlanta): Etapa {
  const ritmos: [Etapa, number][] = [
    ["pasteurizador", d.pasteurizador],
    ["fermentacion", ritmoFermentacion(d)],
    ["envasadora", d.envasadora],
  ];
  return ritmos.reduce((a, b) => (b[1] < a[1] ? b : a))[0];
}

export type Opcion = "envasadora" | "tanque" | "nada";

/** Qué pasa un mes después de cada decisión. */
export function consecuencia(d: DatosPlanta, opcion: Opcion) {
  const antes = capacidadDiaria(d);
  const despues =
    opcion === "tanque"
      ? capacidadDiaria(d, { tanques: d.tanques + 1 })
      : opcion === "envasadora"
        ? capacidadDiaria(d, { envasadora: d.envasadoraNueva })
        : antes;
  const gasto = opcion === "tanque" ? d.precioTanque : opcion === "envasadora" ? d.precioEnvasadoraNueva : 0;
  const vendidosAntes = Math.min(antes, d.pedidosPorDia);
  const vendidosDespues = Math.min(despues, d.pedidosPorDia);
  const margenExtraPorMes = (vendidosDespues - vendidosAntes) * d.margenPorLitro * d.diasPorMes;
  return {
    capacidad: despues,
    gasto,
    pedidosPerdidosPorDia: d.pedidosPorDia - vendidosDespues,
    margenExtraPorMes,
    /** Meses para recuperar lo invertido con el margen extra; null si no hay margen extra. */
    mesesRecuperacion: gasto > 0 && margenExtraPorMes > 0 ? gasto / margenExtraPorMes : null,
  };
}

// ── Revisión de lo que escribe el alumno ─────────────────────────────────────

export type Diagnostico =
  | "correcta"
  | "sumo-maquinas"
  | "sin-eficiencia"
  | "tomo-envasadora"
  | "tomo-pasteurizador"
  | "un-solo-tanque"
  | "otra";

/**
 * Los errores típicos al calcular la capacidad, cada uno con el número que da. El orden importa:
 * si dos errores dieran el mismo número en alguna versión, gana el primero (las pruebas verifican
 * que en ninguna versión coinciden).
 */
export function erroresTipicosCapacidad(d: DatosPlanta): [Exclude<Diagnostico, "correcta" | "otra">, number][] {
  const dia = d.horasPorDia * d.eficiencia;
  return [
    ["sumo-maquinas", Math.round((d.pasteurizador + ritmoFermentacion(d) + d.envasadora) * dia)],
    ["sin-eficiencia", Math.round(ritmoFermentacion(d) * d.horasPorDia)],
    ["tomo-envasadora", Math.round(d.envasadora * dia)],
    ["tomo-pasteurizador", Math.round(d.pasteurizador * dia)],
    ["un-solo-tanque", Math.round(ritmoFermentacion(d, 1) * dia)],
  ];
}

/** Se acepta una diferencia de redondeo: medio por ciento o dos litros, lo que sea mayor. */
const cerca = (escrito: number, esperado: number) => Math.abs(escrito - esperado) <= Math.max(2, esperado * 0.005);

export function revisarCapacidad(d: DatosPlanta, escrito: number): Diagnostico {
  if (cerca(escrito, capacidadDiaria(d))) return "correcta";
  return erroresTipicosCapacidad(d).find(([, n]) => cerca(escrito, n))?.[0] ?? "otra";
}

export type DiagnosticoCompra = "correcta" | "creyo-que-sube" | "sin-eficiencia" | "otra";

/**
 * Antes de que pase el mes, el alumno dice cuántas botellas saldrán con lo que compró.
 * Con la envasadora el error típico es creer que sube (la nueva envasadora como límite, o el
 * pasteurizador); con el tanque, olvidar la eficiencia.
 */
export function revisarCapacidadConCompra(d: DatosPlanta, opcion: "envasadora" | "tanque", escrito: number): DiagnosticoCompra {
  if (cerca(escrito, consecuencia(d, opcion).capacidad)) return "correcta";
  const dia = d.horasPorDia * d.eficiencia;
  if (opcion === "envasadora") {
    const creidos = [d.envasadoraNueva * dia, Math.min(d.pasteurizador, d.envasadoraNueva) * dia].map(Math.round);
    return creidos.some((n) => cerca(escrito, n)) ? "creyo-que-sube" : "otra";
  }
  return cerca(escrito, Math.round(ritmoFermentacion(d, d.tanques + 1) * d.horasPorDia)) ? "sin-eficiencia" : "otra";
}

export type DiagnosticoRecuperacion = "correcta" | "conto-lo-que-no-se-vende" | "dio-dias" | "otra";

/** Los números que dan los errores típicos al calcular la recuperación del tanque. */
export function erroresTipicosRecuperacion(d: DatosPlanta): [Exclude<DiagnosticoRecuperacion, "correcta" | "otra">, number][] {
  const extraVendido = d.pedidosPorDia - capacidadDiaria(d);
  const extraProducido = consecuencia(d, "tanque").capacidad - capacidadDiaria(d);
  return [
    // la capacidad nueva entera, aunque no haya pedidos para venderla
    ["conto-lo-que-no-se-vende", d.precioTanque / (extraProducido * d.margenPorLitro * d.diasPorMes)],
    // el margen de un día, no de un mes: da días
    ["dio-dias", d.precioTanque / (extraVendido * d.margenPorLitro)],
  ];
}

/** Meses de recuperación del tercer tanque, con un décimo de tolerancia (se escribe con un decimal). */
export function revisarRecuperacion(d: DatosPlanta, escrito: number): DiagnosticoRecuperacion {
  const cercaMeses = (a: number, b: number) => Math.abs(a - b) <= 0.1;
  const meses = consecuencia(d, "tanque").mesesRecuperacion;
  if (meses !== null && cercaMeses(escrito, meses)) return "correcta";
  return erroresTipicosRecuperacion(d).find(([, n]) => cercaMeses(escrito, n))?.[0] ?? "otra";
}

// ── Versiones ────────────────────────────────────────────────────────────────

const entre = (azar: Azar, min: number, max: number, paso: number) =>
  min + paso * Math.floor(azar() * (Math.floor((max - min) / paso) + 1));

/** Cumple las reglas que conservan la lección, y los errores típicos no se confunden entre sí. */
export function versionValida(d: DatosPlanta) {
  const ferm3 = ritmoFermentacion(d, d.tanques + 1);
  const hoy = capacidadDiaria(d);
  const conTanque = capacidadDiaria(d, { tanques: d.tanques + 1 });
  const numeros = [hoy, ...erroresTipicosCapacidad(d).map(([, n]) => n)];
  const meses = consecuencia(d, "tanque").mesesRecuperacion;
  const distintos = numeros.every((a, i) => numeros.every((b, j) => i === j || !cerca(a, b)));
  return (
    cuelloDeBotella(d) === "fermentacion" &&
    // con un tanque más la fermentación sigue siendo lo más lento: el tanque rinde entero
    ferm3 < Math.min(d.pasteurizador, d.envasadora) &&
    capacidadDiaria(d, { envasadora: d.envasadoraNueva }) === hoy &&
    // faltan al menos 50 botellas hoy, y con el tanque sobran al menos 50
    d.pedidosPorDia - hoy >= 50 &&
    conTanque - d.pedidosPorDia >= 50 &&
    // una recuperación creíble para un tanque: ni semanas ni más de medio año largo
    meses !== null && meses >= 1.5 && meses <= 8 &&
    erroresTipicosRecuperacion(d).every(([, n]) => Math.abs(n - meses) > 0.25) &&
    distintos
  );
}

/** Semilla con dispersión, para que versiones vecinas no den números parecidos. */
const semilla = (version: number) => Math.imul(version ^ 0x5eed, 2654435761) >>> 0;

/** Los datos de una versión. La 0 es el caso del dossier; las demás, siempre las mismas para el mismo número. */
export function datosDeVersion(version: number): DatosPlanta {
  if (!Number.isInteger(version) || version < 0 || version > VERSION_MAXIMA) {
    throw new Error(`La versión va de 0 a ${VERSION_MAXIMA}`);
  }
  if (version === 0) return CASO_DOSSIER;
  const azar = azarConSemilla(semilla(version));
  for (let intento = 0; intento < 200; intento++) {
    const base = {
      ...CASO_DOSSIER,
      version,
      pasteurizador: entre(azar, 250, 400, 25),
      litrosPorTanque: entre(azar, 150, 300, 50),
      cicloHoras: entre(azar, 6, 10, 2),
      envasadora: entre(azar, 100, 160, 10),
      precioTanque: entre(azar, 35_000, 55_000, 5_000),
      precioEnvasadoraNueva: entre(azar, 30_000, 45_000, 1_000),
      horasPorDia: entre(azar, 12, 20, 4),
      eficiencia: entre(azar, 80, 95, 5) / 100,
      margenPorLitro: entre(azar, 3, 6, 1),
    };
    const hoy = capacidadDiaria(base);
    const conTanque = capacidadDiaria(base, { tanques: base.tanques + 1 });
    // Los pedidos caen entre lo que sale hoy y lo que saldría con el tanque, en decenas.
    const minimo = Math.ceil((hoy + 50) / 10) * 10;
    const maximo = Math.floor((conTanque - 50) / 10) * 10;
    if (maximo < minimo) continue;
    const datos = { ...base, pedidosPorDia: entre(azar, minimo, maximo, 10) };
    if (versionValida(datos)) return datos;
  }
  throw new Error(`No se pudo armar la versión ${version}`);
}
