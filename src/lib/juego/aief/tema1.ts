/**
 * Tema 1 de «La ventanilla» (AIEF), generación 2: el plan aprobado por Ronald el 27-09 después de pasar
 * por todos los agentes (docs/juego/gdd: 04 v2, 02 v2, 05 v2.1, 06 v5; lista de trabajo 02 B2.10).
 *
 * El alumno aprende por consecuencia, no por explicación: en cada parte hay una carpeta de práctica sin
 * nota cuyo final se ve en el momento, y después las carpetas con nota, que se corrigen al cierre.
 *
 * Todo sale de funciones puras: la cola de 1.1, las carpetas por versión, la revisión de cada número y el
 * avance de la partida, que se reconstruye leyendo sus eventos (se retoma donde quedó y el docente puede
 * recalcular todo desde el registro).
 *
 * La escena se guarda como «tema1-g2»: las partidas del prototipo («tema1», sólo pruebas, ningún alumno)
 * quedan guardadas sin tocar y no se mezclan con las de este sorteo.
 */

import { azarConSemilla, type Azar } from "../../finanzas/ejercicios";
import { reexpresar } from "../../finanzas/estados";
import type { ConHora, Escena } from "../partida";
import { PORCENTAJE_GARANTIA, VERSION_MAXIMA, colorDelCierre, diagnosticoMonto, montoCorrecto, type Color, type DiagnosticoMonto } from "./ventanilla";

export const ESCENA_TEMA1: Escena<"aief", "tema1-g2"> = {
  isla: "aief",
  escena: "tema1-g2",
  versionValida: (v) => Number.isInteger(v) && v >= 0 && v <= VERSION_MAXIMA,
};

/** Semilla del Tema 1 de AIEF: distinta de la de Proyectos II para que la misma cuenta no reciba la misma versión. */
export const SEMILLA_VERSION = "aief:tema1";

/** Pasado el escalón «leer», un fallo más en el mismo número y el cliente se va (escalón d). */
export const FALLOS_HASTA_QUE_SE_VA = 4;

// ── Azar ──────────────────────────────────────────────────────────────────────

function azarDe(version: number, etiqueta: string): Azar {
  let h = Math.imul(version ^ 0x1a1e, 2654435761) >>> 0;
  for (const ch of `aief:t1:${etiqueta}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  return azarConSemilla(h);
}
const elegir = <T>(azar: Azar, xs: readonly T[]): T => xs[Math.floor(azar() * xs.length)];
function barajar<T>(azar: Azar, xs: readonly T[]): T[] {
  const r = [...xs];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}
const entre = (azar: Azar, min: number, max: number, paso = 1) => min + paso * Math.floor(azar() * (Math.floor((max - min) / paso) + 1));
const abajo = (x: number, a: number) => Math.floor(x / a) * a;
const arriba = (x: number, a: number) => Math.ceil(x / a) * a;

export function revisarVersion(version: number) {
  if (!ESCENA_TEMA1.versionValida(version)) throw new Error(`La versión va de 0 a ${VERSION_MAXIMA}`);
}

// ── Llegada: la carpeta de práctica de Doña Rosa (fija, sin nota) ─────────────

export const PRACTICA = { cliente: "Doña Rosa", pide: 10_000, garantia: "una moto", enLibros: 20_000 } as const;
export const PRACTICA_CORRECTO = PRACTICA.pide; // 60 % de 20.000 = 12.000 alcanza para lo que pide

// ── 1.1 · El mostrador (Cuadro 1 del dossier, pág. 4) ─────────────────────────

/** Las cinco personas que llegan al mostrador (el banco nunca viene: su sello queda como distractor). */
export type Rol = "inversionista" | "proveedor" | "gerencia" | "sin" | "empleado";
export type Sello = Rol | "banco";
export const ROLES: Rol[] = ["inversionista", "proveedor", "gerencia", "sin", "empleado"];
export const SELLOS: Sello[] = ["banco", ...ROLES];

/** Las decisiones del Cuadro 1, una por sello. */
export const DECISIONES: Record<Sello, string> = {
  banco: "Otorgar o negar un crédito, y a qué tasa",
  inversionista: "Aportar o retirar capital",
  proveedor: "Vender al contado o a 30 días",
  gerencia: "Invertir, contratar, fijar precios",
  sin: "Verificar la base imponible declarada",
  empleado: "Permanecer o negociar condiciones",
};

/** «Qué mira primero» del Cuadro 1: una hoja del balance por persona (la del banco sale de la lista). */
export const HOJAS: Record<Rol, string> = {
  inversionista: "Rentabilidad sostenida y patrimonio",
  proveedor: "Capacidad de pago de corto plazo",
  gerencia: "Márgenes por línea de negocio",
  sin: "Utilidad antes de impuestos",
  empleado: "Continuidad y resultados del periodo",
};

/** Nombres sorteados aparte del rol (05 N2.3), con su género para la reacción. */
export const NOMBRES_T11: { nombre: string; mujer: boolean }[] = [
  { nombre: "Doña Elena", mujer: true },
  { nombre: "Doña Wilma", mujer: true },
  { nombre: "Doña Marta", mujer: true },
  { nombre: "Doña Julia", mujer: true },
  { nombre: "Don Hugo", mujer: false },
  { nombre: "Don Óscar", mujer: false },
  { nombre: "Don Fausto", mujer: false },
  { nombre: "Don Aurelio", mujer: false },
];

/** Cuántas frases tiene cada rol (los textos están en guion-tema1.ts). La 3 del SIN, la más fácil, sólo cuando vuelve. */
export const FRASES_POR_ROL = 3;
const frasesPrimeraVez = (r: Rol) => (r === "sin" ? [0, 1] : [0, 1, 2]);

export interface PersonaT11 {
  rol: Rol;
  nombre: string;
  mujer: boolean;
  frase: number;
  /** Si Doña Nieves se asoma y sugiere una hoja (siempre una que esa persona no necesita). */
  sugiere: Rol | null;
}

export interface MostradorT11 {
  /** La primera es la de práctica (sin nota); después, las que cuentan. */
  cola: PersonaT11[];
  ordenSellos: Sello[];
  ordenHojas: Rol[];
}

export const PERSONAS_PARA_PASAR = 3;

/** La cola del mostrador de una versión: práctica y personas sorteadas, sin rol a la vista. */
export function mostradorT11(version: number): MostradorT11 {
  revisarVersion(version);
  const azar = azarDe(version, "t11");
  const nombres = barajar(azar, NOMBRES_T11);
  const practica: Rol = version === 0 ? "gerencia" : elegir(azar, ROLES);
  const vuelta1: Rol[] = version === 0 ? ["proveedor", "inversionista", "sin", "empleado", "gerencia"] : barajar(azar, ROLES);
  const vuelta2 = barajar(azar, ROLES);
  const roles = [practica, ...vuelta1, ...vuelta2, ...barajar(azar, ROLES)];
  const vistas = new Map<Rol, number>();
  const conNieves = 1 + Math.floor(azar() * PERSONAS_PARA_PASAR); // una de las tres primeras con nota
  const cola = roles.map((rol, i): PersonaT11 => {
    const vez = vistas.get(rol) ?? 0;
    vistas.set(rol, vez + 1);
    const opciones = vez === 0 ? frasesPrimeraVez(rol) : [0, 1, 2];
    const frase = opciones[(Math.floor(azar() * opciones.length) + vez) % opciones.length];
    const otra = elegir(azar, ROLES.filter((r) => r !== rol));
    const n = nombres[i % nombres.length];
    return { rol, nombre: n.nombre, mujer: n.mujer, frase, sugiere: i === 0 || i === conNieves ? otra : null };
  });
  return { cola, ordenSellos: barajar(azar, SELLOS), ordenHojas: barajar(azar, ROLES) };
}

export type DiagnosticoT11 = "bien" | "sello" | "hoja" | "siguio-a-nieves";

export function revisarT11(p: PersonaT11, sello: Sello, hoja: Rol): DiagnosticoT11 {
  if (sello === p.rol && hoja === p.rol) return "bien";
  if (p.sugiere && hoja === p.sugiere) return "siguio-a-nieves";
  if (sello !== p.rol) return "sello";
  return "hoja";
}

// ── 1.2 · La norma, la calidad y el dictamen (Cuadro 2, págs. 8 y 9) ─────────

export const NORMAS: [number, string][] = [
  [1, "Principios y normas técnico-contables generalmente aceptados para la preparación de EE.FF."],
  [2, "Tratamiento contable de hechos posteriores al cierre del ejercicio"],
  [3, "Estados financieros a moneda constante (ajuste por inflación)"],
  [4, "Revalorización técnica de activos fijos"],
  [5, "Principios de contabilidad para la industria minera"],
  [6, "Tratamiento contable de las diferencias de cambio"],
  [7, "Valuación de inversiones permanentes"],
  [8, "Consolidación de estados financieros"],
  [9, "Normas de contabilidad para la industria petrolera"],
  [10, "Tratamiento contable de los arrendamientos"],
  [11, "Información esencial requerida para una adecuada exposición de los EE.FF."],
  [12, "Operaciones en moneda extranjera cuando coexiste más de un tipo de cambio"],
  [13, "Cambios contables y su exposición"],
  [14, "Políticas contables, su exposición y revelación"],
];

export type IdOperacion =
  | "arrendamiento"
  | "consolidacion"
  | "diferencia-cambio"
  | "inversion-permanente"
  | "hecho-posterior"
  | "revalorizacion"
  | "moneda-constante"
  | "cambio-contable"
  | "flujo-efectivo"
  | "mineria"
  | "dos-cambios";

export interface Operacion {
  id: IdOperacion;
  /** Hechos de la empresa, en dos o tres redacciones (05 N2.5): ninguna repite el título de su NC. */
  redacciones: string[];
  /** La NC que la rige; 0 si ninguna (el único vacío que nombra el dossier es el flujo de efectivo). */
  nc: number;
  /** La norma internacional de la operación (del juego, no del dossier). */
  niif: string;
  /** La NC que un contador distraído confunde con esta (títulos o números parecidos). */
  confusa: number;
  /** Cliente propio de cada redacción, cuando el rubro tiene que calzar. */
  clientes?: string[];
}

export const OPERACIONES: Operacion[] = [
  {
    id: "arrendamiento", nc: 10, niif: "NIIF 16", confusa: 7,
    redacciones: [
      "El local de la tienda es alquilado, con contrato a cinco años.",
      "Usa un camión que no es suyo: lo tiene en leasing, con cuotas mensuales y opción de comprarlo al final.",
      "Alquila una máquina tejedora por tres años, con cuota fija cada mes.",
    ],
  },
  {
    id: "consolidacion", nc: 8, niif: "NIIF 10", confusa: 7,
    redacciones: [
      "La empresa es dueña de otra y presenta un solo balance de las dos juntas.",
      "Tiene el 80 % de una distribuidora y presenta un balance con las cifras de las dos sumadas.",
      "Compró el taller que le hacía los repuestos y ahora muestra todo en un solo balance.",
    ],
  },
  {
    id: "diferencia-cambio", nc: 6, niif: "NIC 21", confusa: 12,
    redacciones: [
      "Tiene una deuda en dólares y registró lo que subió al moverse el tipo de cambio.",
      "Le debe en dólares a un proveedor de Chile y anotó la pérdida porque ahora necesita más bolivianos para pagarle.",
      "Tiene ahorros en dólares y registró cuánto más valen en bolivianos desde que cambió la cotización.",
    ],
  },
  {
    id: "inversion-permanente", nc: 7, niif: "NIC 28", confusa: 8,
    redacciones: [
      "Compró acciones de otra empresa para conservarlas muchos años.",
      "Tiene el 30 % de una empresa de transporte y no piensa venderlo.",
      "Compró una parte del molino que le vende la harina, para quedarse como socia por años.",
    ],
  },
  {
    id: "hecho-posterior", nc: 2, niif: "NIC 10", confusa: 10,
    redacciones: [
      "Se quemó un depósito después del cierre del año, antes de entregar el balance.",
      "En enero, con el año ya cerrado, quebró su principal cliente y le quedó debiendo.",
      "En febrero perdió un juicio que venía del año pasado; el balance todavía no estaba entregado.",
    ],
  },
  {
    id: "revalorizacion", nc: 4, niif: "NIC 16", confusa: 3,
    redacciones: [
      "Un perito revalorizó la maquinaria de la empresa.",
      "Hizo tasar su edificio por un perito y subió su valor en el balance.",
      "Un ingeniero tasó de nuevo los camiones y el balance muestra el valor nuevo.",
    ],
  },
  {
    id: "moneda-constante", nc: 3, niif: "NIC 29", confusa: 4,
    redacciones: [
      "Ajustó todo el balance por inflación.",
      "Actualizó todas las cifras del balance con el índice de precios del año.",
      "Rehízo el balance del año pasado en bolivianos de este año para compararlo.",
    ],
  },
  {
    id: "cambio-contable", nc: 13, niif: "NIC 8", confusa: 14,
    redacciones: [
      "Cambió el método de depreciación respecto del año pasado.",
      "Dejó de depreciar sus camiones en línea recta y pasó a hacerlo por kilómetro recorrido.",
    ],
  },
  {
    id: "flujo-efectivo", nc: 0, niif: "NIC 7", confusa: 0,
    redacciones: [
      "Presenta el estado de flujo de efectivo.",
      "Agregó un estado que muestra cuánto dinero entró y salió de caja en el año.",
      "Suma un cuadro con lo que cobró y pagó en efectivo, separado por actividad.",
    ],
  },
  {
    id: "mineria", nc: 5, niif: "NIIF 6", confusa: 9,
    redacciones: [
      "Una cooperativa minera anotó lo que gastó en buscar una veta nueva, antes de saber si rinde.",
      "Una empresa minera registró lo que pagó por los estudios de un yacimiento de zinc.",
    ],
    clientes: ["Don Rolando, de Potosí, cooperativa minera", "Don Rolando, de Potosí, cooperativa minera"],
  },
  {
    id: "dos-cambios", nc: 12, niif: "NIC 21", confusa: 6,
    redacciones: [
      "Importa repuestos y en el año pagó sus dólares a dos cotizaciones: la oficial y la de las casas de cambio.",
      "Exporta quinua y cobra en dólares; este año hubo dos cotizaciones y registró con una de ellas.",
    ],
    clientes: ["Don Gregorio, transporte", "Don Anselmo, exportadora de quinua"],
  },
];

export const operacion = (id: IdOperacion) => OPERACIONES.find((o) => o.id === id)!;

/** Si el contador cita la NC equivocada del flujo, es una claramente ajena (nunca la 1, 11 ni 14). */
const NC_AJENAS_AL_FLUJO = [2, 4, 7, 8, 10];

export const CLIENTES_T12 = ["Don Ramiro, imprenta", "Doña Carmen, farmacia", "Don Gregorio, transporte", "Doña Silvia, panadería", "Don Marcelo, lavandería"];

// Calidad de la información (dossier 1.3, págs. 12 y 13): la página «Calidad» del manual.
export type Caracteristica = "relevancia" | "representacion-fiel" | "comparabilidad" | "verificabilidad" | "oportunidad" | "comprensibilidad";
export type SelloCalidad = Caracteristica | "nada";
export const CARACTERISTICAS: Caracteristica[] = ["relevancia", "representacion-fiel", "comparabilidad", "verificabilidad", "oportunidad", "comprensibilidad"];
export const FUNDAMENTALES: Caracteristica[] = ["relevancia", "representacion-fiel"];
export const esFundamental = (c: Caracteristica) => FUNDAMENTALES.includes(c);

export interface Papel {
  id: string;
  /** null = papel sano («nada que observar»). */
  falla: Caracteristica | null;
  /** Con {X}, un monto de la versión. */
  texto: string;
  soloRepaso?: boolean;
}

/** Los papeles de la hoja de observación (05 N1.4 y N2.5). El pagaré es sólo de la práctica. */
export const PAPELES: Papel[] = [
  { id: "galpon", falla: "relevancia", soloRepaso: true, texto: "Carta del cliente: «Ofrezco en garantía mi galpón, que vale Bs {X} según la minuta de compra de 2009.» No hay otro valor en la carpeta." },
  { id: "terreno", falla: "relevancia", soloRepaso: true, texto: "Carta del cliente: «Respaldo el crédito con mi terreno, que figura en el balance por Bs {X}, lo que pagué en 1998.»" },
  { id: "cuota-vencida", falla: "representacion-fiel", texto: "Carta de otra entidad financiera: «Le recordamos su cuota vencida.» En el pasivo del balance no figura ninguna deuda con esa entidad." },
  { id: "camion-a-plazos", falla: "representacion-fiel", texto: "Contrato de compra de un camión a plazos, con doce cuotas por pagar. En el pasivo no figura." },
  { id: "cobro-imposible", falla: "representacion-fiel", texto: "En cuentas por cobrar: Bs {X} de «Transportes El Rápido». En la carpeta, un recorte del periódico: esa empresa cerró hace un año." },
  { id: "camion-robado", falla: "representacion-fiel", texto: "En activos, un camión por Bs {X}. En la carpeta, la denuncia policial de su robo, de octubre." },
  { id: "llego-en-julio", falla: "oportunidad", texto: "Solicitud del cliente fechada en marzo: «Urgente, es para la siembra.» El balance que la respalda llegó recién en julio." },
  { id: "balance-viejo", falla: "oportunidad", texto: "Solicitud de octubre, para la campaña de Navidad. El balance que la respalda es el de hace casi dos años." },
  { id: "inventario-a-criterio", falla: "verificabilidad", texto: "Nota de inventarios: «Valuados con el método que el contador creyó conveniente.» No dice cuál ni por qué." },
  { id: "reserva-prudente", falla: "verificabilidad", texto: "Nota de cuentas por cobrar: «Se dejó una reserva prudente para lo que no se cobre.» No dice cuánto ni cómo." },
  { id: "fletes", falla: "comparabilidad", texto: "Este año los fletes están dentro del costo de ventas; el año pasado iban aparte. La columna del año pasado no se rehízo." },
  { id: "iva", falla: "comparabilidad", texto: "Este año las ventas se muestran sin IVA; el año pasado, con IVA. La columna anterior no se rehízo." },
  { id: "nota-7", falla: "comprensibilidad", texto: "Nota 7: «Se procedió al reconocimiento del devengamiento diferido de partidas conexas conforme a criterio prudencial vigente.» El cliente tampoco sabe qué quiere decir." },
  { id: "codigos", falla: "comprensibilidad", texto: "El balance trae las cuentas sólo con códigos: «1.1.2.03 … Bs {X}», sin nombre. El cliente tampoco sabe qué son." },
  { id: "s1", falla: null, texto: "Portada: «Balance al 31 de diciembre. Entregado en marzo, junto con la solicitud.»" },
  { id: "s2", falla: null, texto: "Carta del cliente: «Ofrezco en garantía mi camioneta. Adjunto el avalúo del perito, de este mes.»" },
  { id: "s3", falla: null, texto: "Nota de inventarios: «Valuados al costo promedio ponderado, igual que el año pasado.»" },
  { id: "s4", falla: null, texto: "Nota de activos fijos: «Depreciados en línea recta, a las mismas tasas que el año pasado.»" },
];

export const papel = (id: string) => PAPELES.find((p) => p.id === id)!;

/** Lo que dice el cliente (05 N1.3): A con cualquier nota, B sólo si la nota cita una NIIF, C sólo si cita una NC. */
export type GrupoFrase = "A" | "B" | "C";
export const FRASES_CLIENTE_T12: { grupo: GrupoFrase; texto: string; noConOportunidad?: boolean }[] = [
  { grupo: "A", texto: "Aquí tienes el balance que preparó mi contador." },
  { grupo: "A", texto: "Te traigo el balance del año. Lo necesito para el préstamo." },
  { grupo: "A", texto: "Mi contador me dijo que te lo entregue en mano." },
  { grupo: "A", texto: "Mi contador dice que lo que aprueba el CTNAC es ley, y él lo cumple al pie de la letra." },
  { grupo: "A", texto: "Mi contador ya lo prepara para las normas nuevas del 2027. Más al día, imposible." },
  { grupo: "A", texto: "Está completito, no le falta ni una hoja." },
  { grupo: "A", texto: "Cumple todas las normas. Con eso ya sirve, ¿no?" },
  { grupo: "A", texto: "Te lo entregué a tiempo, antes que nadie.", noConOportunidad: true },
  { grupo: "B", texto: "Mi contador dice que Bolivia ya adoptó las NIIF, como Brasil y Argentina." },
  { grupo: "B", texto: "Mi contador buscó y dice que para esto no hay norma boliviana." },
  { grupo: "C", texto: "Mi contador trabaja sólo con normas bolivianas. Dice que se las sabe de memoria." },
];

export type Dictamen = "aceptar" | "observar" | "devolver";

export interface CarpetaT12 {
  tipo: "t12";
  version: number;
  cliente: string;
  operacion: IdOperacion;
  redaccion: number;
  /** La norma que citó el contador: «NC n» o la NIIF/NIC. */
  citada: { tipo: "nc"; nc: number } | { tipo: "niif" };
  /** Si la justificación de la nota lleva «Por ser la norma boliviana vigente» (sólo con NC). */
  conJustificacion: boolean;
  papel: string;
  /** El monto que aparece en el papel, si lo pide ({X}). */
  montoPapel: number;
  frase: number;
}

/** La nota del contador está bien si cita la NC que rige, o la NIIF cuando ninguna NC lo regula. */
export function normaBien(c: CarpetaT12): boolean {
  const op = operacion(c.operacion);
  return c.citada.tipo === "nc" ? c.citada.nc === op.nc && op.nc > 0 : op.nc === 0;
}

export const selloCorrecto = (c: CarpetaT12): SelloCalidad => papel(c.papel).falla ?? "nada";

/** La página «Calidad» del manual, aplicada. */
export function dictamenCorrecto(c: CarpetaT12): Dictamen {
  if (!normaBien(c)) return "devolver";
  const falla = papel(c.papel).falla;
  if (!falla) return "aceptar";
  return esFundamental(falla) ? "devolver" : "observar";
}

export const ncDe = (c: CarpetaT12) => operacion(c.operacion).nc;
export const redaccionDe = (c: CarpetaT12) => operacion(c.operacion).redacciones[c.redaccion];

export function textoNota(c: CarpetaT12): string {
  const op = operacion(c.operacion);
  if (c.citada.tipo === "niif") return `Registrado según la ${op.niif}. Porque ninguna NC boliviana lo regula.`;
  return `Registrado según la NC ${c.citada.nc}.${c.conJustificacion ? " Por ser la norma boliviana vigente." : ""}`;
}

export const textoPapel = (c: CarpetaT12) => papel(c.papel).texto.replace("{X}", c.montoPapel.toLocaleString("es-BO"));

type Forma = "bien-sano" | "bien-mejora" | "mal-sano" | "mal-mejora" | "bien-fundamental";
const QUEDAN: Forma[] = ["bien-sano", "bien-mejora"];
const SE_DEVUELVEN: Forma[] = ["mal-sano", "mal-mejora", "bien-fundamental"];

function armarT12(azar: Azar, version: number, forma: Forma, repaso: boolean, excluir: IdOperacion[], cliente: string): CarpetaT12 {
  // Una de cada cuatro jornadas, más o menos (dos carpetas por jornada).
  const flujo = azar() < 0.13 && !excluir.includes("flujo-efectivo");
  const conNc = OPERACIONES.filter((o) => o.nc > 0 && !excluir.includes(o.id));
  const op = flujo ? operacion("flujo-efectivo") : elegir(azar, conNc);
  const bien = !forma.startsWith("mal");
  let citada: CarpetaT12["citada"];
  if (op.nc === 0) citada = bien ? { tipo: "niif" } : { tipo: "nc", nc: elegir(azar, NC_AJENAS_AL_FLUJO) };
  else if (bien) citada = { tipo: "nc", nc: op.nc };
  else citada = azar() < 0.6 ? { tipo: "niif" } : { tipo: "nc", nc: op.confusa };

  const nivel = forma.split("-")[1] as "sano" | "mejora" | "fundamental";
  const candidatos = PAPELES.filter((p) => {
    if (nivel === "sano") return p.falla === null && !(op.id === "cambio-contable" && p.id === "s4");
    if (!p.falla) return false;
    if (nivel === "mejora") return !esFundamental(p.falla) && !(op.id === "cambio-contable" && p.falla === "comparabilidad");
    return esFundamental(p.falla) && (repaso || !p.soloRepaso);
  });
  const pap = elegir(azar, candidatos);
  const redaccion = Math.floor(azar() * op.redacciones.length);
  const grupos: GrupoFrase[] = ["A", citada.tipo === "niif" ? "B" : "C"];
  const frases = FRASES_CLIENTE_T12.map((f, i) => ({ ...f, i })).filter((f) => grupos.includes(f.grupo) && !(f.noConOportunidad && pap.falla === "oportunidad"));
  return {
    tipo: "t12",
    version,
    cliente: op.clientes?.[redaccion] ?? cliente,
    operacion: op.id,
    redaccion,
    citada,
    conJustificacion: citada.tipo === "nc" && azar() < 0.5,
    papel: pap.id,
    montoPapel: entre(azar, 20, 150) * 1_000,
    frase: elegir(azar, frases).i,
  };
}

export const CARPETAS_T12_EJEMPLO: [CarpetaT12, CarpetaT12] = [
  // Se devuelve: arrendamiento con NIIF habiendo NC (la trampa del dossier, pág. 9), papel sano.
  { tipo: "t12", version: 0, cliente: "Don Ramiro, imprenta", operacion: "arrendamiento", redaccion: 0, citada: { tipo: "niif" }, conJustificacion: false, papel: "s1", montoPapel: 0, frase: 8 },
  // Se queda con observación: NC bien puesta y el balance llegó tarde.
  { tipo: "t12", version: 0, cliente: "Doña Carmen, farmacia", operacion: "revalorizacion", redaccion: 0, citada: { tipo: "nc", nc: 4 }, conJustificacion: true, papel: "llego-en-julio", montoPapel: 0, frase: 1 },
];

/** Las dos carpetas con nota de la jornada: una se queda y una se devuelve, en orden sorteado. */
export function carpetasT12(version: number): [CarpetaT12, CarpetaT12] {
  revisarVersion(version);
  if (version === 0) return CARPETAS_T12_EJEMPLO;
  const azar = azarDe(version, "t12");
  const clientes = barajar(azar, CLIENTES_T12);
  const queda = armarT12(azar, version, elegir(azar, QUEDAN), false, [], clientes[0]);
  const devuelve = armarT12(azar, version, elegir(azar, SE_DEVUELVEN), false, [queda.operacion], clientes[1]);
  return azar() < 0.5 ? [queda, devuelve] : [devuelve, queda];
}

/** La carpeta de un repaso de 1.2: una sola, que se queda o se devuelve (sorteado aparte). */
export function carpetaT12Repaso(version: number): CarpetaT12 {
  revisarVersion(version);
  const azar = azarDe(version, "t12-repaso");
  const forma = azar() < 0.5 ? elegir(azar, QUEDAN) : elegir(azar, SE_DEVUELVEN);
  return armarT12(azar, version, forma, true, [], elegir(azar, CLIENTES_T12));
}

export type DiagnosticoNC = "correcta" | "supuso-el-vacio" | "otra-nc" | "hay-vacio" | "copio-la-niif" | "fuera-de-lista";

/** El número de NC que escribió el alumno (0 = ninguna la regula). */
export function revisarNC(c: Pick<CarpetaT12, "operacion">, escrito: number): DiagnosticoNC {
  const op = operacion(c.operacion);
  if (escrito === op.nc) return "correcta";
  if (op.nc === 0) return "hay-vacio";
  if (escrito === 0) return "supuso-el-vacio";
  if (escrito === Number(op.niif.replace(/\D/g, ""))) return "copio-la-niif";
  if (escrito < 1 || escrito > 14) return "fuera-de-lista";
  return "otra-nc";
}

/** Qué pasó con una carpeta de 1.2 al cierre. */
export type FinalT12 = "bien" | "se-fue" | "norma-mal-aceptada" | "fundamental-aceptado" | "mejora-no-vista" | "sano-observado" | "sello-equivocado" | "devolvio-uno-bueno";

export function finalT12(c: CarpetaT12, sello: SelloCalidad | null, d: Dictamen | null, seFue: boolean): { final: FinalT12; color: Color } {
  if (seFue || !d) return { final: "se-fue", color: "gris" };
  const ok = dictamenCorrecto(c);
  const falla = papel(c.papel).falla;
  if (d === ok && sello === selloCorrecto(c)) return { final: "bien", color: ok === "devolver" ? "bien-rechazado" : "verde" };
  if (d !== "devolver" && !normaBien(c)) return { final: "norma-mal-aceptada", color: "rojo" };
  if (d !== "devolver" && falla && esFundamental(falla)) return { final: "fundamental-aceptado", color: "rojo" };
  if (d === ok) return { final: "sello-equivocado", color: "gris" };
  if (!falla && d !== "aceptar") return { final: "sano-observado", color: "gris" };
  if (falla && d === "aceptar") return { final: "mejora-no-vista", color: "gris" };
  return { final: "devolvio-uno-bueno", color: "gris" };
}

// ── 1.2 · La práctica del pagaré (Doña Beatriz) ──────────────────────────────

export interface PracticaT12 {
  cliente: string;
  operacion: IdOperacion;
  redaccion: number;
  frase: number;
  proveedores: number;
  prestamoKusi: number;
  pagare: number;
}

export function practicaT12(version: number): PracticaT12 {
  revisarVersion(version);
  const azar = azarDe(version, "p12");
  const op = version === 0 ? operacion("consolidacion") : elegir(azar, OPERACIONES.filter((o) => o.nc > 0 && !o.clientes));
  return {
    cliente: "Doña Beatriz, Librería Mi Cuaderno",
    operacion: op.id,
    redaccion: version === 0 ? 0 : Math.floor(azar() * op.redacciones.length),
    frase: version === 0 ? 1 : elegir(azar, [0, 1, 2]),
    proveedores: entre(azar, 8, 30) * 1_000,
    prestamoKusi: entre(azar, 10, 40) * 1_000,
    pagare: entre(azar, 15, 60) * 1_000,
  };
}

// ── 1.3 · La reexpresión (pág. 14): práctica del carpintero y carpeta con nota ─

export interface ClienteT13 {
  nombre: string;
  garantia: string;
  minimo: string;
}

/** Otro rubro, otra garantía (05 N2.6): la sierra queda sólo para la práctica. */
export const CLIENTES_T13: ClienteT13[] = [
  { nombre: "Doña Paola, costura", garantia: "máquina de coser industrial", minimo: "Cotización de la tela" },
  { nombre: "Don Ernesto, panadería", garantia: "horno", minimo: "Cotización de la harina" },
  { nombre: "Doña Sonia, taller de motos", garantia: "compresor", minimo: "Cotización de los repuestos" },
  { nombre: "Don Teodoro, encuadernación", garantia: "guillotina de papel", minimo: "Cotización del papel" },
];
export const CARPINTEROS = ["Don Víctor", "Doña Lidia", "Don Rubén"];

export interface CarpetaT13 {
  tipo: "t13";
  version: number;
  cliente: number;
  enLibros: number;
  indiceCompra: number;
  indiceHoy: number;
  valorDelCliente: number;
  pide: number;
  minimo: number;
  frase: number;
}

export const valorDeHoy = (c: Pick<CarpetaT13, "enLibros" | "indiceCompra" | "indiceHoy">) => Math.round(reexpresar(c.enLibros, c.indiceCompra, c.indiceHoy));
export const topeT13 = (c: Pick<CarpetaT13, "enLibros" | "indiceCompra" | "indiceHoy">) => PORCENTAJE_GARANTIA * valorDeHoy(c);
export const cifrasT13 = (c: CarpetaT13) => ({ pide: c.pide, minimo: c.minimo, tope: topeT13(c) });
export const correctoT13 = (c: CarpetaT13) => montoCorrecto(cifrasT13(c));

/** Los números que da cada error típico del valor de hoy (02 B1.5). */
export function erroresHoy(c: Pick<CarpetaT13, "enLibros" | "indiceCompra" | "indiceHoy" | "valorDelCliente">) {
  const { enLibros: L, indiceCompra: i0, indiceHoy: i1 } = c;
  return {
    "en-libros": L,
    "del-cliente": c.valorDelCliente,
    "por-el-indice": L * i1,
    "al-reves": (L * i0) / i1,
    "solo-el-ajuste": valorDeHoy(c) - L,
    "ya-el-sesenta": PORCENTAJE_GARANTIA * valorDeHoy(c),
    "resto-indices": L * (1 + (i1 - i0) / 100),
    "ignoro-compra": (L * i1) / 100,
  } as const;
}

export type DiagnosticoReexpresion = "correcta" | keyof ReturnType<typeof erroresHoy> | "otra";

export function revisarReexpresion(c: Pick<CarpetaT13, "enLibros" | "indiceCompra" | "indiceHoy" | "valorDelCliente">, escrito: number): DiagnosticoReexpresion {
  if (Math.abs(escrito - valorDeHoy(c)) < 1) return "correcta";
  for (const [d, x] of Object.entries(erroresHoy(c))) if (Math.abs(escrito - x) < 1) return d as DiagnosticoReexpresion;
  return "otra";
}

/** Lo que conserva la lección: siempre contraoferta, redondeo que nunca decide, errores bien separados. */
export function t13Valida(c: CarpetaT13): boolean {
  const hoy = valorDeHoy(c);
  const tope = topeT13(c);
  if (hoy !== (c.enLibros * c.indiceHoy) / c.indiceCompra || hoy % 500 !== 0) return false;
  if (c.indiceCompra === 100 || c.indiceHoy <= c.indiceCompra) return false;
  if (!(c.pide > tope && c.minimo <= 0.9 * tope && c.minimo > 0 && c.valorDelCliente > hoy)) return false;
  const valores = [hoy, ...Object.values(erroresHoy(c))];
  for (let i = 0; i < valores.length; i++) for (let j = i + 1; j < valores.length; j++) if (Math.abs(valores[i] - valores[j]) < 1_000) return false;
  const con = (t: number) => montoCorrecto({ pide: c.pide, minimo: c.minimo, tope: t });
  const correcto = correctoT13(c);
  const perezosos = [c.pide, 0, c.minimo, con(PORCENTAJE_GARANTIA * c.enLibros), con(PORCENTAJE_GARANTIA * c.valorDelCliente), con(PORCENTAJE_GARANTIA * (c.enLibros * c.indiceHoy) / 100)];
  return perezosos.every((m) => m !== correcto);
}

export const CARPETA_T13_EJEMPLO: CarpetaT13 = {
  tipo: "t13", version: 0, cliente: 0, enLibros: 80_000, indiceCompra: 120, indiceHoy: 150, valorDelCliente: 130_000, pide: 75_000, minimo: 45_000, frase: 0,
};

function armarT13(azar: Azar, version: number): CarpetaT13 {
  for (let intento = 0; intento < 2_000; intento++) {
    const indiceCompra = entre(azar, 105, 130);
    const indiceHoy = Math.round(indiceCompra * entre(azar, 110, 140, 5) / 100);
    const enLibros = entre(azar, 8, 30) * 5_000;
    const c: CarpetaT13 = {
      tipo: "t13", version, cliente: Math.floor(azar() * CLIENTES_T13.length), enLibros, indiceCompra, indiceHoy,
      valorDelCliente: 0, pide: 0, minimo: 0, frase: Math.floor(azar() * 3),
    };
    const hoy = (enLibros * indiceHoy) / indiceCompra;
    if (!Number.isInteger(hoy) || hoy % 500 !== 0) continue;
    const tope = PORCENTAJE_GARANTIA * hoy;
    c.pide = arriba(tope * entre(azar, 115, 150, 5) / 100, 1_000);
    c.minimo = abajo(tope * entre(azar, 50, 85, 5) / 100, 1_000);
    c.valorDelCliente = arriba(hoy * entre(azar, 120, 150, 5) / 100, 1_000);
    if (t13Valida(c)) return c;
  }
  throw new Error(`No se pudo armar la carpeta de 1.3 de la versión ${version}`);
}

export function carpetaT13(version: number, repaso = 0): CarpetaT13 {
  revisarVersion(version);
  if (version === 0 && repaso === 0) return CARPETA_T13_EJEMPLO;
  return armarT13(azarDe(version, `t13:${repaso}`), version);
}

/** La práctica de 1.3: el carpintero se juega con la regla de ayer; los tres caminos dan colores distintos. */
export interface PracticaT13 {
  carpintero: string;
  enLibros: number;
  indiceCompra: number;
  indiceHoy: number;
  pide: number;
  minimo: number;
  frase: number;
}

export function practicaT13Valida(p: PracticaT13): boolean {
  const hoy = (p.enLibros * p.indiceHoy) / p.indiceCompra;
  if (!Number.isInteger(hoy) || hoy % 500 !== 0 || p.indiceCompra === 100) return false;
  const tope = PORCENTAJE_GARANTIA * hoy;
  const ayer = PORCENTAJE_GARANTIA * p.enLibros;
  return p.minimo < ayer && ayer < tope && tope < p.pide && ayer % 100 === 0 && tope - ayer >= 2_000;
}

export function practicaT13(version: number): PracticaT13 {
  revisarVersion(version);
  if (version === 0) return { carpintero: "Don Víctor", enLibros: 60_000, indiceCompra: 110, indiceHoy: 132, pide: 50_000, minimo: 30_000, frase: 0 };
  const azar = azarDe(version, "p13");
  for (let intento = 0; intento < 2_000; intento++) {
    const indiceCompra = entre(azar, 105, 130);
    const indiceHoy = Math.round(indiceCompra * entre(azar, 115, 140, 5) / 100);
    const enLibros = entre(azar, 8, 25) * 5_000;
    const hoy = (enLibros * indiceHoy) / indiceCompra;
    const p: PracticaT13 = {
      carpintero: elegir(azar, CARPINTEROS), enLibros, indiceCompra, indiceHoy,
      pide: arriba(PORCENTAJE_GARANTIA * hoy * entre(azar, 115, 140, 5) / 100, 1_000),
      minimo: abajo(PORCENTAJE_GARANTIA * enLibros * entre(azar, 50, 80, 5) / 100, 1_000),
      frase: Math.floor(azar() * 2),
    };
    if (practicaT13Valida(p)) return p;
  }
  throw new Error(`No se pudo armar la práctica de 1.3 de la versión ${version}`);
}

export type FinalP13 = "regla-de-ayer" | "lo-que-pide" | "bien" | "otro";

/** Lo que pasó con el carpintero: el color y, en gris, cuánto le prestó la cooperativa por la misma sierra. */
export function finalP13(p: PracticaT13, monto: number): { final: FinalP13; color: Color; cooperativa: number } {
  const hoy = (p.enLibros * p.indiceHoy) / p.indiceCompra;
  const cifras = { pide: p.pide, minimo: p.minimo, tope: PORCENTAJE_GARANTIA * hoy };
  const cooperativa = montoCorrecto(cifras);
  const color = colorDelCierre(cifras, monto);
  if (monto === montoCorrecto({ ...cifras, tope: PORCENTAJE_GARANTIA * p.enLibros })) return { final: "regla-de-ayer", color, cooperativa };
  if (monto === p.pide) return { final: "lo-que-pide", color, cooperativa };
  if (monto === cooperativa) return { final: "bien", color, cooperativa };
  return { final: "otro", color, cooperativa };
}

// ── La jornada y sus repasos ─────────────────────────────────────────────────

export type TipoCarpeta = "t12" | "t13";
export type CarpetaTema1 = CarpetaT12 | CarpetaT13;

/** La versión de las carpetas de un repaso: otros números, nunca la de la ronda anterior. */
export function versionDeRepaso(version: number, ronda: number): number {
  if (ronda === 0) return version;
  return ((version + 211 * ronda - 1) % VERSION_MAXIMA) + 1;
}

/** La jornada (ronda 0) trae dos de 1.2 y una de 1.3; cada repaso, una carpeta por tipo que falló. */
export function carpetasDeRonda(version: number, ronda: number, tipos: TipoCarpeta[]): CarpetaTema1[] {
  const r: CarpetaTema1[] = [];
  if (ronda === 0) {
    if (tipos.includes("t12")) r.push(...carpetasT12(version));
    if (tipos.includes("t13")) r.push(carpetaT13(version));
    return r;
  }
  const v = versionDeRepaso(version, ronda);
  if (tipos.includes("t12")) r.push(carpetaT12Repaso(v));
  if (tipos.includes("t13")) r.push(carpetaT13(v, ronda));
  return r;
}

export const colorDeMonto = (c: CarpetaT13, monto: number) => colorDelCierre(cifrasT13(c), monto);
export const diagnosticoMontoT13 = (c: CarpetaT13, monto: number): DiagnosticoMonto => {
  const ok = correctoT13(c);
  if (monto === ok) return "correcto";
  if (monto === c.pide) return "presto-lo-que-pide";
  const con = (t: number) => montoCorrecto({ pide: c.pide, minimo: c.minimo, tope: t });
  if (monto === con(PORCENTAJE_GARANTIA * c.enLibros)) return "regla-de-ayer";
  if (monto === con(PORCENTAJE_GARANTIA * c.valorDelCliente)) return "valor-del-cliente";
  return diagnosticoMonto({ tipo: "t13", version: c.version, cliente: "", enLibros: c.enLibros, indiceCompra: c.indiceCompra / 100, indiceHoy: c.indiceHoy / 100, valorDelCliente: c.valorDelCliente, pide: c.pide, minimo: c.minimo }, monto);
};

// ── Eventos: lo que hizo el alumno, nada más ─────────────────────────────────

export type Visto = "pared" | "t11" | "p12" | "p13";

export type EventoTema1 =
  | { tipo: "llegada"; monto: number }
  | { tipo: "visto"; que: Visto }
  | { tipo: "t11"; i: number; sello: Sello; hoja: Rol }
  | { tipo: "p12-nc"; valor: number }
  | { tipo: "p12-dictamen"; decision: "aceptar" | "devolver" }
  | { tipo: "p13-monto"; valor: number }
  | { tipo: "nc"; ronda: number; i: number; valor: number }
  | { tipo: "sello"; ronda: number; i: number; sello: SelloCalidad }
  | { tipo: "dictamen"; ronda: number; i: number; decision: Dictamen }
  | { tipo: "reexpresion"; ronda: number; i: number; valor: number }
  | { tipo: "monto"; ronda: number; i: number; valor: number }
  | { tipo: "ayuda"; paso: string; escalon: "concreta" | "leer" }
  | { tipo: "cierre"; ronda: number };

export type EventoConHora = ConHora<EventoTema1>;

export interface Resultado {
  carpeta: CarpetaTema1;
  color: Color;
  /** Qué pasó, para la línea de la ficha (05 N2.5). */
  final: FinalT12 | DiagnosticoMonto | "se-fue";
}

/** Un número que se corrige en el momento: cuántas veces falló antes de acertar, y si el cliente se fue. */
export interface EstadoNumero {
  fallos: number;
  bien: boolean;
  seFue: boolean;
}

function estadoNumero(valores: number[], esBien: (v: number) => boolean): EstadoNumero {
  let fallos = 0;
  for (const v of valores) {
    if (esBien(v)) return { fallos, bien: true, seFue: false };
    fallos++;
    if (fallos >= FALLOS_HASTA_QUE_SE_VA) return { fallos, bien: false, seFue: true };
  }
  return { fallos, bien: false, seFue: false };
}

export type Paso =
  | { paso: "llegada" }
  | { paso: "pared" }
  | { paso: "t11"; i: number; persona: PersonaT11; practica: boolean; fallos: number; anterior: { persona: PersonaT11; dx: DiagnosticoT11 } | null }
  | { paso: "cierre-t11" }
  | { paso: "p12"; nc: EstadoNumero }
  | { paso: "p12-consecuencia"; decision: "aceptar" | "devolver" }
  | { paso: "t12"; i: number; carpeta: CarpetaT12; nc: EstadoNumero; sello: SelloCalidad | null }
  | { paso: "p13" }
  | { paso: "p13-consecuencia"; monto: number }
  | { paso: "t13"; i: number; carpeta: CarpetaT13; hoy: EstadoNumero }
  | { paso: "cierre"; resultados: Resultado[]; aRepasar: TipoCarpeta[] }
  | { paso: "final" };

export interface Avance {
  paso: Paso;
  ronda: number;
  /** Las carpetas de cada ronda jugada, de la 0 a la actual (para el registro). */
  rondas: CarpetaTema1[][];
  mostrador: MostradorT11;
  /** Personas de 1.1 bien atendidas (sin contar la práctica). */
  t11Bien: number;
  /** El manual suma la hoja de observación después de la práctica de 1.2 y la fórmula después de la de 1.3. */
  manual: { calidad: boolean; formula: boolean };
  fallosPorTipo: Record<TipoCarpeta, number>;
  ultimoError: Partial<Record<TipoCarpeta, string>>;
  aprobado: boolean;
}

const visto = (ev: EventoTema1[], que: Visto) => ev.some((e) => e.tipo === "visto" && e.que === que);
const bienColor = (c: Color) => c === "verde" || c === "bien-rechazado";

function resultadoDe(c: CarpetaTema1, i: number, ev: EventoTema1[]): Resultado | null {
  if (c.tipo === "t12") {
    const nc = estadoNumero(ev.flatMap((e) => (e.tipo === "nc" && e.i === i ? [e.valor] : [])), (v) => revisarNC(c, v) === "correcta");
    if (nc.seFue) return { carpeta: c, color: "gris", final: "se-fue" };
    const d = ev.find((e) => e.tipo === "dictamen" && e.i === i) as Extract<EventoTema1, { tipo: "dictamen" }> | undefined;
    if (!nc.bien || !d) return null;
    const s = ev.find((e) => e.tipo === "sello" && e.i === i) as Extract<EventoTema1, { tipo: "sello" }> | undefined;
    const { final, color } = finalT12(c, s?.sello ?? null, d.decision, false);
    return { carpeta: c, color, final };
  }
  const hoy = estadoNumero(ev.flatMap((e) => (e.tipo === "reexpresion" && e.i === i ? [e.valor] : [])), (v) => revisarReexpresion(c, v) === "correcta");
  if (hoy.seFue) return { carpeta: c, color: "gris", final: "se-fue" };
  const m = ev.find((e) => e.tipo === "monto" && e.i === i) as Extract<EventoTema1, { tipo: "monto" }> | undefined;
  if (!hoy.bien || !m) return null;
  return { carpeta: c, color: colorDeMonto(c, m.valor), final: diagnosticoMontoT13(c, m.valor) };
}

function pasoDeCarpeta(c: CarpetaTema1, i: number, ev: EventoTema1[]): Paso {
  if (c.tipo === "t12") {
    const nc = estadoNumero(ev.flatMap((e) => (e.tipo === "nc" && e.i === i ? [e.valor] : [])), (v) => revisarNC(c, v) === "correcta");
    const s = ev.find((e) => e.tipo === "sello" && e.i === i) as Extract<EventoTema1, { tipo: "sello" }> | undefined;
    return { paso: "t12", i, carpeta: c, nc, sello: s?.sello ?? null };
  }
  const hoy = estadoNumero(ev.flatMap((e) => (e.tipo === "reexpresion" && e.i === i ? [e.valor] : [])), (v) => revisarReexpresion(c, v) === "correcta");
  return { paso: "t13", i, carpeta: c, hoy };
}

export function avanceDe(version: number, eventos: EventoTema1[]): Avance {
  const mostrador = mostradorT11(version);
  const manual = { calidad: visto(eventos, "p12"), formula: visto(eventos, "p13") };
  const base = { mostrador, manual, fallosPorTipo: { t12: 0, t13: 0 }, ultimoError: {}, aprobado: false };

  // 1.1: la cola se atiende en orden; la práctica es la primera.
  const t11 = eventos.filter((e): e is Extract<EventoTema1, { tipo: "t11" }> => e.tipo === "t11");
  let t11Bien = 0;
  let t11Fallos = 0;
  t11.forEach((e) => {
    if (e.i === 0) return;
    if (revisarT11(mostrador.cola[e.i], e.sello, e.hoja) === "bien") t11Bien++;
    else t11Fallos++;
  });
  const ultimoT11 = t11.at(-1);
  const anterior = ultimoT11 ? { persona: mostrador.cola[ultimoT11.i], dx: revisarT11(mostrador.cola[ultimoT11.i], ultimoT11.sello, ultimoT11.hoja) } : null;

  const conPaso = (paso: Paso, extra: Partial<Avance> = {}): Avance => ({ ...base, paso, ronda: 0, rondas: [], t11Bien, ...extra });

  if (!eventos.some((e) => e.tipo === "llegada" && e.monto === PRACTICA_CORRECTO)) return conPaso({ paso: "llegada" });
  if (!visto(eventos, "pared")) return conPaso({ paso: "pared" });
  if (t11Bien < PERSONAS_PARA_PASAR) {
    const i = Math.min(t11.length, mostrador.cola.length - 1);
    return conPaso({ paso: "t11", i, persona: mostrador.cola[i], practica: i === 0, fallos: t11Fallos, anterior });
  }
  if (!visto(eventos, "t11")) return conPaso({ paso: "cierre-t11" });

  // Rondas: la 0 con sus prácticas; los repasos, sólo lo que falló.
  let ronda = 0;
  let tipos: TipoCarpeta[] = ["t12", "t13"];
  const fallosPorTipo: Record<TipoCarpeta, number> = { t12: 0, t13: 0 };
  const ultimoError: Partial<Record<TipoCarpeta, string>> = {};
  const rondas: CarpetaTema1[][] = [];
  for (;;) {
    const carpetas = carpetasDeRonda(version, ronda, tipos);
    rondas.push(carpetas);
    const ev = eventos.filter((e) => "ronda" in e && e.ronda === ronda);
    const extra = { ronda, rondas, fallosPorTipo, ultimoError };

    if (ronda === 0) {
      const p12nc = estadoNumero(eventos.flatMap((e) => (e.tipo === "p12-nc" ? [e.valor] : [])), (v) => revisarNC(practicaT12(version), v) === "correcta");
      const p12d = eventos.find((e) => e.tipo === "p12-dictamen") as Extract<EventoTema1, { tipo: "p12-dictamen" }> | undefined;
      if (!p12d) return conPaso({ paso: "p12", nc: p12nc }, extra);
      if (!visto(eventos, "p12")) return conPaso({ paso: "p12-consecuencia", decision: p12d.decision }, extra);
    }
    for (let i = 0; i < carpetas.length; i++) {
      const c = carpetas[i];
      if (ronda === 0 && c.tipo === "t13") {
        const p13 = eventos.find((e) => e.tipo === "p13-monto") as Extract<EventoTema1, { tipo: "p13-monto" }> | undefined;
        if (!p13) return conPaso({ paso: "p13" }, extra);
        if (!visto(eventos, "p13")) return conPaso({ paso: "p13-consecuencia", monto: p13.valor }, extra);
      }
      if (!resultadoDe(c, i, ev)) return conPaso(pasoDeCarpeta(c, i, ev), extra);
    }
    const resultados = carpetas.map((c, i) => resultadoDe(c, i, ev)!);
    const fallaron = (["t12", "t13"] as const).filter((t) => resultados.some((r) => r.carpeta.tipo === t && !bienColor(r.color)));
    const cerrada = eventos.some((e) => e.tipo === "cierre" && e.ronda === ronda);
    if (!cerrada) return conPaso({ paso: "cierre", resultados, aRepasar: fallaron }, extra);
    if (fallaron.length === 0) return conPaso({ paso: "final" }, { ...extra, aprobado: true });
    for (const t of fallaron) {
      fallosPorTipo[t] += 1;
      ultimoError[t] = resultados.find((r) => r.carpeta.tipo === t && !bienColor(r.color))!.final;
    }
    tipos = fallaron;
    ronda += 1;
  }
}
