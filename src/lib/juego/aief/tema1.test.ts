import { describe, expect, it } from "vitest";
import {
  NORMAS,
  OPERACIONES,
  PERSONAS,
  PRACTICA_CORRECTO,
  avanceDe,
  carpetasDeRonda,
  carpetasT12,
  colorDictamen,
  dictamenCorrecto,
  ncDe,
  notaBienHecha,
  revisarNC,
  revisarReexpresion,
  valorDeHoy,
  versionDeRepaso,
  type EventoTema1,
} from "./tema1";
import { VERSION_MAXIMA, carpetaT13, correctoDe, PORCENTAJE_GARANTIA } from "./ventanilla";

const VERSIONES = Array.from({ length: VERSION_MAXIMA + 1 }, (_, v) => v);

describe("1.2 · el manual copia el Cuadro 2 del dossier", () => {
  it("las 14 NC, numeradas de 1 a 14", () => {
    expect(NORMAS.map(([n]) => n)).toEqual(Array.from({ length: 14 }, (_, i) => i + 1));
  });

  it("cada operación apunta a la NC cuyo título la nombra; sólo el flujo de efectivo no tiene NC", () => {
    const palabra: Record<string, string> = {
      arrendamiento: "arrendamientos",
      consolidacion: "Consolidación",
      "diferencia-cambio": "diferencias de cambio",
      "inversion-permanente": "inversiones permanentes",
      "hecho-posterior": "hechos posteriores",
      revalorizacion: "Revalorización",
      "moneda-constante": "moneda constante",
      "cambio-contable": "Cambios contables",
    };
    for (const op of OPERACIONES) {
      if (op.id === "flujo-efectivo") expect(op.nc).toBe(0);
      else expect(NORMAS.find(([n]) => n === op.nc)![1]).toContain(palabra[op.id]);
    }
  });
});

describe("1.2 · carpetas por versión", () => {
  it("la versión 0 es la trampa del dossier: arrendamiento con NIIF 16 (devolver) y flujo con NIC 7 (aceptar)", () => {
    const [a, b] = carpetasT12(0);
    expect([a.operacion, dictamenCorrecto(a), ncDe(a)]).toEqual(["arrendamiento", "devolver", 10]);
    expect([b.operacion, dictamenCorrecto(b), ncDe(b)]).toEqual(["flujo-efectivo", "aceptar", 0]);
  });

  it.each(VERSIONES)("versión %i: una bien hecha y una para devolver, operaciones y clientes distintos", (v) => {
    const [a, b] = carpetasT12(v);
    expect(notaBienHecha(a.nota) !== notaBienHecha(b.nota)).toBe(true);
    expect(a.operacion).not.toBe(b.operacion);
    expect(a.cliente).not.toBe(b.cliente);
    for (const c of [a, b]) {
      if (c.nota === "niif-supletoria") expect(c.operacion).toBe("flujo-efectivo");
      if (c.nota === "nc-equivocada") {
        expect(c.ncCitada).not.toBe(ncDe(c));
        expect(c.ncCitada).toBeGreaterThanOrEqual(1);
        expect(c.ncCitada).toBeLessThanOrEqual(14);
      }
    }
  });

  it("siempre aceptar o siempre devolver pierde una carpeta en todas las versiones", () => {
    for (const v of VERSIONES) {
      for (const d of ["aceptar", "devolver"] as const) {
        const colores = carpetasT12(v).map((c) => colorDictamen(c, d));
        expect(colores.some((c) => c === "rojo" || c === "gris")).toBe(true);
      }
    }
  });

  it("no todas las versiones traen lo mismo (copiar al de al lado no sirve)", () => {
    const distintas = new Set(VERSIONES.map((v) => carpetasT12(v).map((c) => `${c.operacion}:${c.nota}`).join("|")));
    expect(distintas.size).toBeGreaterThan(20);
  });

  it("la revisión de la NC nombra el error típico", () => {
    const [arr, flujo] = carpetasT12(0);
    expect(revisarNC(arr, 10)).toBe("correcta");
    expect(revisarNC(arr, 0)).toBe("supuso-el-vacio");
    expect(revisarNC(arr, 16)).toBe("copio-la-niif");
    expect(revisarNC(arr, 7)).toBe("otra-nc");
    expect(revisarNC(arr, 40)).toBe("fuera-de-lista");
    expect(revisarNC(flujo, 0)).toBe("correcta");
    expect(revisarNC(flujo, 11)).toBe("hay-vacio");
  });
});

describe("1.3 · el valor de hoy", () => {
  it("la ficha: 90.000 con índices 100 y 115 son Bs 103.500, y cada error típico se reconoce", () => {
    const c = carpetaT13(0);
    expect(valorDeHoy(c)).toBe(103_500);
    expect(revisarReexpresion(c, 103_500)).toBe("correcta");
    expect(revisarReexpresion(c, 90_000)).toBe("en-libros");
    expect(revisarReexpresion(c, 130_000)).toBe("del-cliente");
    expect(revisarReexpresion(c, 90_000 * 115)).toBe("por-el-indice");
    expect(revisarReexpresion(c, 78_261)).toBe("al-reves");
    expect(revisarReexpresion(c, 13_500)).toBe("solo-el-ajuste");
    expect(revisarReexpresion(c, 62_100)).toBe("ya-el-sesenta");
    expect(correctoDe(c)).toBe(62_100);
  });

  it.each(VERSIONES)("versión %i: ningún error típico da el valor correcto", (v) => {
    const c = carpetaT13(v);
    const hoy = valorDeHoy(c);
    for (const x of [c.enLibros, c.valorDelCliente, hoy - c.enLibros, PORCENTAJE_GARANTIA * hoy]) {
      expect(Math.abs(x - hoy)).toBeGreaterThanOrEqual(1);
    }
  });
});

// ── El avance de la partida ──────────────────────────────────────────────────

const usuariosBien: EventoTema1[] = PERSONAS.map((p) => ({ tipo: "usuario", persona: p, eligio: p }));

function jugarRonda(version: number, ronda: number, tipos: ("t12" | "t13")[], montoT13?: number): EventoTema1[] {
  return carpetasDeRonda(version, ronda, tipos).flatMap((c, i): EventoTema1[] => {
    if (c.tipo === "t12") return [{ tipo: "nc", ronda, i, valor: ncDe(c) }, { tipo: "dictamen", ronda, i, decision: dictamenCorrecto(c) }];
    return [
      { tipo: "reexpresion", ronda, i, valor: valorDeHoy(c) },
      { tipo: "monto", ronda, i, valor: montoT13 ?? correctoDe(c) },
      { tipo: "linea", ronda, texto: "La sierra es la misma: sólo cambió la unidad de medida." },
    ];
  });
}

describe("avance", () => {
  it("sin nada, empieza por la llegada", () => {
    const a = avanceDe(0, []);
    expect([a.llegada, a.usuarios.length, a.ronda, a.actual]).toEqual([false, 0, 0, 0]);
  });

  it("jugando todo bien, aprueba el tema en la primera jornada", () => {
    const ev: EventoTema1[] = [{ tipo: "llegada", monto: PRACTICA_CORRECTO }, ...usuariosBien, ...jugarRonda(0, 0, ["t12", "t13"])];
    const antes = avanceDe(0, ev);
    expect(antes.resultados?.map((r) => r.color)).toEqual(["bien-rechazado", "verde", "verde"]);
    expect(antes.aprobado).toBe(false); // falta cerrar la jornada
    expect(avanceDe(0, [...ev, { tipo: "cierre", ronda: 0 }]).aprobado).toBe(true);
  });

  it("un NC mal escrito no avanza la carpeta; bien escrito, pide el dictamen", () => {
    const base: EventoTema1[] = [{ tipo: "llegada", monto: PRACTICA_CORRECTO }, ...usuariosBien];
    const mal = avanceDe(0, [...base, { tipo: "nc", ronda: 0, i: 0, valor: 0 }]);
    expect([mal.actual, mal.numeroBien]).toEqual([0, false]);
    const bien = avanceDe(0, [...base, { tipo: "nc", ronda: 0, i: 0, valor: 10 }]);
    expect([bien.actual, bien.numeroBien]).toEqual([0, true]);
  });

  it("con la regla de ayer en la 1.3, repasa sólo esa carpeta, con otros números y el error anotado", () => {
    const enLibros = carpetaT13(0).enLibros;
    const ev: EventoTema1[] = [
      { tipo: "llegada", monto: PRACTICA_CORRECTO },
      ...usuariosBien,
      ...jugarRonda(0, 0, ["t12", "t13"], PORCENTAJE_GARANTIA * enLibros),
      { tipo: "cierre", ronda: 0 },
    ];
    const a = avanceDe(0, ev);
    expect(a.ronda).toBe(1);
    expect(a.carpetas.map((c) => c.tipo)).toEqual(["t13"]);
    expect(a.carpetas[0].version).toBe(versionDeRepaso(0, 1));
    expect(a.carpetas[0].version).not.toBe(0);
    expect(a.fallosPorTipo.t13).toBe(1);
    expect(a.ultimoError.t13).toBe("regla-de-ayer");

    const fin = avanceDe(0, [...ev, ...jugarRonda(0, 1, ["t13"]), { tipo: "cierre", ronda: 1 }]);
    expect(fin.aprobado).toBe(true);
  });

  it("la primera decisión cuenta: firmar otra vez la misma carpeta no la cambia", () => {
    const c = carpetaT13(0);
    const ev: EventoTema1[] = [
      { tipo: "llegada", monto: PRACTICA_CORRECTO },
      ...usuariosBien,
      ...jugarRonda(0, 0, ["t12"]),
      { tipo: "reexpresion", ronda: 0, i: 2, valor: valorDeHoy(c) },
      { tipo: "monto", ronda: 0, i: 2, valor: c.pide },
      { tipo: "monto", ronda: 0, i: 2, valor: correctoDe(c) },
      { tipo: "linea", ronda: 0, texto: "otra" },
    ];
    expect(avanceDe(0, ev).resultados?.[2].color).toBe("rojo");
  });

  it("las versiones de repaso nunca repiten la de la ronda anterior", () => {
    for (const v of VERSIONES) for (let r = 1; r < 5; r++) expect(versionDeRepaso(v, r)).not.toBe(versionDeRepaso(v, r - 1));
  });
});
