/**
 * Progreso del alumno en cada lámina, guardado sólo en su navegador
 * (localStorage): sin cuentas y sin servidor. Si el navegador no deja guardar
 * (modo privado, almacenamiento bloqueado), todo sigue funcionando y
 * simplemente no se recuerda nada.
 */

export type ProgresoLamina = {
  /** Última tarjeta abierta, contando desde 0. */
  tarjeta: number;
  /** Cuántas tarjetas tenía la lámina cuando se guardó. */
  total: number;
  /** Tarjetas que ya abrió, ordenadas. */
  vistas: number[];
  /** Ejercicios de práctica respondidos y acertados. */
  hechos: number;
  bien: number;
};

export type Almacen = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const PREFIJO = "ron-doc-lamina:";

/** "/bonos/" y "/bonos" son la misma lámina. */
export function claveLamina(ruta: string): string {
  const limpia = ruta.replace(/\/+$/, "");
  return PREFIJO + (limpia || "/");
}

function vacio(): ProgresoLamina {
  return { tarjeta: 0, total: 0, vistas: [], hechos: 0, bien: 0 };
}

function natural(x: unknown): number | null {
  return typeof x === "number" && Number.isInteger(x) && x >= 0 ? x : null;
}

function almacenDelNavegador(): Almacen | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** Lee lo guardado; ante cualquier dato raro devuelve un progreso vacío en vez de fallar. */
export function leerProgreso(ruta: string, almacen: Almacen | null = almacenDelNavegador()): ProgresoLamina {
  try {
    const crudo = almacen?.getItem(claveLamina(ruta));
    if (!crudo) return vacio();
    const d = JSON.parse(crudo) as Record<string, unknown>;
    const total = natural(d.total) ?? 0;
    const tarjeta = natural(d.tarjeta) ?? 0;
    const hechos = natural(d.hechos) ?? 0;
    const bien = Math.min(natural(d.bien) ?? 0, hechos);
    const vistas = Array.isArray(d.vistas)
      ? [...new Set(d.vistas.map(natural).filter((n): n is number => n !== null && n < total))].sort((a, b) => a - b)
      : [];
    return { tarjeta: tarjeta < total ? tarjeta : 0, total, vistas, hechos, bien };
  } catch {
    return vacio();
  }
}

function escribir(ruta: string, p: ProgresoLamina, almacen: Almacen | null) {
  try {
    almacen?.setItem(claveLamina(ruta), JSON.stringify(p));
  } catch {
    // Almacenamiento lleno o bloqueado: se pierde el progreso, nada más.
  }
}

/**
 * Anota que abrió la tarjeta `i` de una lámina de `total` tarjetas. Si la
 * lámina cambió de largo desde la última vez, las tarjetas vistas ya no
 * corresponden a las mismas ideas y se empiezan a contar de nuevo.
 */
export function anotarTarjeta(
  ruta: string,
  i: number,
  total: number,
  almacen: Almacen | null = almacenDelNavegador()
): ProgresoLamina {
  const previo = leerProgreso(ruta, almacen);
  const vistas = previo.total === total ? previo.vistas : [];
  const p: ProgresoLamina = {
    ...previo,
    tarjeta: i,
    total,
    vistas: vistas.includes(i) ? vistas : [...vistas, i].sort((a, b) => a - b),
  };
  escribir(ruta, p, almacen);
  return p;
}

/** Suma un ejercicio respondido a la cuenta de la lámina. */
export function anotarRespuesta(
  ruta: string,
  acierto: boolean,
  almacen: Almacen | null = almacenDelNavegador()
): ProgresoLamina {
  const previo = leerProgreso(ruta, almacen);
  const p = { ...previo, hechos: previo.hechos + 1, bien: previo.bien + (acierto ? 1 : 0) };
  escribir(ruta, p, almacen);
  return p;
}

/**
 * Tarjeta en la que conviene abrir la lámina: donde quedó, salvo que la
 * lámina haya cambiado de largo (el número ya no apunta a la misma idea).
 */
export function tarjetaParaRetomar(p: ProgresoLamina, total: number): number {
  return p.total === total && p.tarjeta < total ? p.tarjeta : 0;
}

/** Olvida la lámina entera: tarjetas vistas, dónde quedó y aciertos. */
export function olvidarProgreso(ruta: string, almacen: Almacen | null = almacenDelNavegador()) {
  try {
    almacen?.removeItem(claveLamina(ruta));
  } catch {
    /* nada que hacer */
  }
}
