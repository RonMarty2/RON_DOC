import { describe, expect, it } from "vitest";
import {
  CARPETA_T13_EJEMPLO,
  FALLOS_HASTA_QUE_SE_VA,
  FRASES_CLIENTE_T12,
  NORMAS,
  OPERACIONES,
  PAPELES,
  PERSONAS_PARA_PASAR,
  PRACTICA_CORRECTO,
  ROLES,
  avanceDe,
  carpetaT12Repaso,
  carpetaT13,
  carpetasDeRonda,
  carpetasT12,
  colorDeMonto,
  correctoT13,
  dictamenCorrecto,
  erroresHoy,
  finalP13,
  finalT12,
  mostradorT11,
  ncDe,
  normaBien,
  papel,
  practicaT12,
  practicaT13,
  practicaT13Valida,
  revisarNC,
  revisarReexpresion,
  revisarT11,
  selloCorrecto,
  t13Valida,
  valorDeHoy,
  versionDeRepaso,
  type CarpetaT12,
  type Dictamen,
  type EventoTema1,
} from "./tema1";
import { PORCENTAJE_GARANTIA, VERSION_MAXIMA } from "./ventanilla";

const VERSIONES = Array.from({ length: VERSION_MAXIMA + 1 }, (_, v) => v);

describe("1.1 · el mostrador", () => {
  it("la cola: práctica primero, cinco roles en la primera vuelta y Doña Nieves siempre sugiere una hoja ajena", () => {
    for (const v of VERSIONES) {
      const { cola, ordenSellos, ordenHojas } = mostradorT11(v);
      expect(new Set(cola.slice(1, 6).map((p) => p.rol)).size).toBe(5);
      expect(cola[0].sugiere).not.toBeNull();
      expect(cola.slice(1, 1 + PERSONAS_PARA_PASAR).filter((p) => p.sugiere).length).toBe(1);
      for (const p of cola) if (p.sugiere) expect(p.sugiere).not.toBe(p.rol);
      expect(ordenSellos).toHaveLength(6);
      expect(ordenHojas).toHaveLength(5);
    }
  });

  it("la frase fácil del SIN (la 3) sólo sale cuando vuelve", () => {
    for (const v of VERSIONES) {
      const primera = mostradorT11(v).cola.find((p) => p.rol === "sin")!;
      expect(primera.frase).not.toBe(2);
    }
  });

  it("nombres sorteados aparte del rol: el mismo rol no tiene siempre el mismo nombre", () => {
    const nombres = new Set(VERSIONES.map((v) => mostradorT11(v).cola.find((p) => p.rol === "proveedor")!.nombre));
    expect(nombres.size).toBeGreaterThan(4);
  });

  it("revisa sello y hoja, y nombra a quien siguió a Doña Nieves", () => {
    const p = { rol: "proveedor" as const, nombre: "", mujer: true, frase: 0, sugiere: "gerencia" as const };
    expect(revisarT11(p, "proveedor", "proveedor")).toBe("bien");
    expect(revisarT11(p, "proveedor", "gerencia")).toBe("siguio-a-nieves");
    expect(revisarT11(p, "banco", "proveedor")).toBe("sello");
    expect(revisarT11(p, "proveedor", "sin")).toBe("hoja");
  });

  it("un mismo sello siempre acierta como mucho 1 de cada 5 roles", () => {
    for (const r of ROLES) expect(ROLES.filter((x) => x === r)).toHaveLength(1);
  });
});

describe("1.2 · norma, calidad y dictamen", () => {
  it("el manual copia el Cuadro 2 y cada operación apunta a la NC cuyo título la nombra", () => {
    expect(NORMAS.map(([n]) => n)).toEqual(Array.from({ length: 14 }, (_, i) => i + 1));
    const palabra: Record<string, string> = {
      arrendamiento: "arrendamientos", consolidacion: "Consolidación", "diferencia-cambio": "diferencias de cambio",
      "inversion-permanente": "inversiones permanentes", "hecho-posterior": "hechos posteriores", revalorizacion: "Revalorización",
      "moneda-constante": "moneda constante", "cambio-contable": "Cambios contables", mineria: "minera", "dos-cambios": "más de un tipo de cambio",
    };
    for (const op of OPERACIONES) {
      if (op.id === "flujo-efectivo") expect(op.nc).toBe(0);
      else expect(NORMAS.find(([n]) => n === op.nc)![1]).toContain(palabra[op.id]);
    }
  });

  it.each(VERSIONES)("versión %i: una se queda y una se devuelve, operaciones distintas", (v) => {
    const [a, b] = carpetasT12(v);
    expect([dictamenCorrecto(a) === "devolver", dictamenCorrecto(b) === "devolver"].filter(Boolean)).toHaveLength(1);
    expect(a.operacion).not.toBe(b.operacion);
    for (const c of [a, b]) {
      expect(papel(c.papel).soloRepaso).toBeFalsy();
      if (c.operacion === "cambio-contable") expect(["s4", "fletes", "iva"]).not.toContain(c.papel);
      if (papel(c.papel).falla === "oportunidad") expect(c.frase).not.toBe(7);
      if (c.citada.tipo === "nc" && c.operacion === "flujo-efectivo") expect([1, 11, 14]).not.toContain(c.citada.nc);
    }
  });

  it("ningún dictamen repetido gana la jornada", () => {
    for (const d of ["aceptar", "observar", "devolver"] as Dictamen[]) {
      const ganan = VERSIONES.filter((v) => carpetasT12(v).every((c) => dictamenCorrecto(c) === d)).length;
      expect(ganan).toBe(0);
    }
  });

  it("la frase del cliente y la justificación no delatan el dictamen (entre 25 % y 75 % de devolver)", () => {
    const todas: CarpetaT12[] = VERSIONES.slice(1).flatMap((v) => [...carpetasT12(v), carpetaT12Repaso(v)]);
    const porFrase = new Map<number, { dev: number; n: number }>();
    for (const c of todas) {
      const x = porFrase.get(c.frase) ?? { dev: 0, n: 0 };
      porFrase.set(c.frase, { dev: x.dev + (dictamenCorrecto(c) === "devolver" ? 1 : 0), n: x.n + 1 });
    }
    // Las del grupo A salen con cualquier nota: ninguna puede inclinar el dictamen. Las de B y C sólo repiten
    // lo que la nota ya muestra (NIIF o NC), que es justo lo que el alumno tiene que revisar buscando la NC.
    for (const [frase, { dev, n }] of porFrase) {
      if (FRASES_CLIENTE_T12[frase].grupo !== "A" || n < 40) continue;
      expect(dev / n).toBeGreaterThan(0.25);
      expect(dev / n).toBeLessThan(0.75);
    }
    const conNiif = todas.filter((c) => c.citada.tipo === "niif");
    const devNiif = conNiif.filter((c) => dictamenCorrecto(c) === "devolver").length / conNiif.length;
    expect(devNiif).toBeLessThan(0.9);
  });

  it("el flujo de efectivo sale en pocas jornadas y con las dos caras", () => {
    const flujos = VERSIONES.slice(1).flatMap((v) => carpetasT12(v)).filter((c) => c.operacion === "flujo-efectivo");
    expect(flujos.length / (2 * VERSION_MAXIMA)).toBeLessThan(0.2);
    expect(flujos.some(normaBien)).toBe(true);
    expect(flujos.some((c) => !normaBien(c))).toBe(true);
  });

  it("el pagaré no existe en las carpetas con nota y los papeles de relevancia sólo en repaso", () => {
    expect(PAPELES.some((p) => p.id === "pagare")).toBe(false);
    const repasos = VERSIONES.slice(1).map(carpetaT12Repaso);
    expect(repasos.some((c) => papel(c.papel).falla === "relevancia")).toBe(true);
  });

  it("la revisión de la NC nombra el error típico", () => {
    const arr = { operacion: "arrendamiento" as const };
    expect(revisarNC(arr, 10)).toBe("correcta");
    expect(revisarNC(arr, 0)).toBe("supuso-el-vacio");
    expect(revisarNC(arr, 16)).toBe("copio-la-niif");
    expect(revisarNC(arr, 7)).toBe("otra-nc");
    expect(revisarNC(arr, 40)).toBe("fuera-de-lista");
    expect(revisarNC({ operacion: "flujo-efectivo" }, 0)).toBe("correcta");
    expect(revisarNC({ operacion: "flujo-efectivo" }, 7)).toBe("hay-vacio");
  });

  it("los finales de la ficha: sin sello correcto no hay verde, y aceptar un fundamental es rojo", () => {
    const [devuelve, queda] = carpetasT12(0);
    expect(finalT12(devuelve, "nada", "devolver", false).color).toBe("bien-rechazado");
    expect(finalT12(devuelve, "nada", "aceptar", false).final).toBe("norma-mal-aceptada");
    expect(finalT12(queda, "oportunidad", "observar", false).color).toBe("verde");
    expect(finalT12(queda, "nada", "observar", false).final).toBe("sello-equivocado");
    expect(finalT12(queda, "oportunidad", "aceptar", false).final).toBe("mejora-no-vista");
    expect(finalT12(queda, "oportunidad", "observar", true).final).toBe("se-fue");
    expect(selloCorrecto(queda)).toBe("oportunidad");
  });
});

describe("1.3 · valor de hoy y monto", () => {
  it("el ejemplo: 80.000 con índices 120 y 150 son Bs 100.000; tope 60.000; contraoferta", () => {
    const c = CARPETA_T13_EJEMPLO;
    expect(valorDeHoy(c)).toBe(100_000);
    expect(correctoT13(c)).toBe(60_000);
    expect(revisarReexpresion(c, 104_000)).toBe("resto-indices");
    expect(revisarReexpresion(c, 120_000)).toBe("ignoro-compra");
    expect(revisarReexpresion(c, 64_000)).toBe("al-reves");
    expect(revisarReexpresion(c, 80_000)).toBe("en-libros");
  });

  it.each(VERSIONES)("versión %i: la carpeta cumple la lección (y la de repaso también)", (v) => {
    for (const c of [carpetaT13(v), carpetaT13(v, 1), carpetaT13(v, 2)]) {
      expect(t13Valida(c)).toBe(true);
      expect(valorDeHoy(c) % 500).toBe(0);
      expect(correctoT13(c)).toBeLessThan(c.pide); // siempre contraoferta
      expect(correctoT13(c) % 100).toBe(0);
    }
  });

  it("nadie gana la 1.3 sin entender: lo que pide, cero, el mínimo, la regla de ayer, el valor del cliente", () => {
    for (const v of VERSIONES) {
      const c = carpetaT13(v);
      const ok = correctoT13(c);
      const perezosos = [c.pide, 0, c.minimo, Math.floor((PORCENTAJE_GARANTIA * c.enLibros) / 100) * 100];
      for (const m of perezosos) expect(colorDeMonto(c, m) === "verde" && m !== ok).toBe(false), expect(m).not.toBe(ok);
    }
  });

  it("los errores del valor de hoy son distintos entre sí y del correcto por más de Bs 1.000", () => {
    for (const v of VERSIONES.slice(0, 300)) {
      const c = carpetaT13(v);
      const xs = [valorDeHoy(c), ...Object.values(erroresHoy(c))];
      for (let i = 0; i < xs.length; i++) for (let j = i + 1; j < xs.length; j++) expect(Math.abs(xs[i] - xs[j])).toBeGreaterThanOrEqual(1_000);
    }
  });

  it.each(VERSIONES)("versión %i: la práctica del carpintero separa los tres caminos", (v) => {
    const p = practicaT13(v);
    expect(practicaT13Valida(p)).toBe(true);
    const ayer = finalP13(p, Math.floor((PORCENTAJE_GARANTIA * p.enLibros) / 100) * 100);
    expect([ayer.final, ayer.color]).toEqual(["regla-de-ayer", "gris"]);
    expect(finalP13(p, p.pide).color).toBe("rojo");
    expect(finalP13(p, ayer.cooperativa).color).toBe("verde");
  });
});

// ── La partida de punta a punta ──────────────────────────────────────────────

function jugarHastaJornada(v: number): EventoTema1[] {
  const { cola } = mostradorT11(v);
  const ev: EventoTema1[] = [{ tipo: "llegada", monto: PRACTICA_CORRECTO }, { tipo: "visto", que: "pared" }];
  ev.push({ tipo: "t11", i: 0, sello: cola[0].rol, hoja: cola[0].sugiere! });
  for (let i = 1; i <= PERSONAS_PARA_PASAR; i++) ev.push({ tipo: "t11", i, sello: cola[i].rol, hoja: cola[i].rol });
  ev.push({ tipo: "visto", que: "t11" });
  const p = practicaT12(v);
  ev.push({ tipo: "p12-nc", valor: ncDe({ operacion: p.operacion } as CarpetaT12) }, { tipo: "p12-dictamen", decision: "aceptar" }, { tipo: "visto", que: "p12" });
  return ev;
}

function jugarCarpetas(v: number, ronda: number, tipos: ("t12" | "t13")[], antesDe13: EventoTema1[] = [], montoMal = false): EventoTema1[] {
  return carpetasDeRonda(v, ronda, tipos).flatMap((c, i): EventoTema1[] => {
    if (c.tipo === "t12") {
      return [
        { tipo: "nc", ronda, i, valor: ncDe(c) },
        { tipo: "sello", ronda, i, sello: selloCorrecto(c) },
        { tipo: "dictamen", ronda, i, decision: dictamenCorrecto(c) },
      ];
    }
    return [...antesDe13, { tipo: "reexpresion", ronda, i, valor: valorDeHoy(c) }, { tipo: "monto", ronda, i, valor: montoMal ? c.pide : correctoT13(c) }];
  });
}

describe("avance", () => {
  it("sin nada, empieza por la llegada; después la pared y el mostrador con la práctica", () => {
    expect(avanceDe(0, []).paso.paso).toBe("llegada");
    const ev: EventoTema1[] = [{ tipo: "llegada", monto: PRACTICA_CORRECTO }];
    expect(avanceDe(0, ev).paso.paso).toBe("pared");
    const t11 = avanceDe(0, [...ev, { tipo: "visto", que: "pared" }]).paso;
    expect(t11.paso === "t11" && t11.practica).toBe(true);
  });

  it("la práctica de 1.1 no cuenta: hacen falta tres personas con nota bien atendidas", () => {
    const { cola } = mostradorT11(5);
    const ev: EventoTema1[] = [{ tipo: "llegada", monto: PRACTICA_CORRECTO }, { tipo: "visto", que: "pared" }, { tipo: "t11", i: 0, sello: cola[0].rol, hoja: cola[0].rol }];
    for (let i = 1; i <= 2; i++) ev.push({ tipo: "t11", i, sello: cola[i].rol, hoja: cola[i].rol });
    ev.push({ tipo: "t11", i: 3, sello: "banco", hoja: cola[3].rol });
    const a = avanceDe(5, ev);
    expect(a.t11Bien).toBe(2);
    expect(a.paso.paso === "t11" && a.paso.i).toBe(4);
  });

  it.each([0, 1, 417, 999])("versión %i: jugando todo bien, aprueba en la primera jornada", (v) => {
    const p13 = practicaT13(v);
    const ev = [
      ...jugarHastaJornada(v),
      ...jugarCarpetas(v, 0, ["t12", "t13"], [{ tipo: "p13-monto", valor: p13.pide }, { tipo: "visto", que: "p13" }]),
    ];
    const a = avanceDe(v, ev);
    expect(a.paso.paso).toBe("cierre");
    expect(a.manual).toEqual({ calidad: true, formula: true });
    expect(avanceDe(v, [...ev, { tipo: "cierre", ronda: 0 }]).aprobado).toBe(true);
  });

  it("la práctica de 1.3 aparece recién después de las dos carpetas de 1.2", () => {
    const ev = [...jugarHastaJornada(3), ...jugarCarpetas(3, 0, ["t12"])];
    expect(avanceDe(3, ev).paso.paso).toBe("p13");
  });

  it("con lo que pide en la 1.3, repasa sólo esa carpeta, con otros números y el error anotado", () => {
    const v = 8;
    const ev = [
      ...jugarHastaJornada(v),
      ...jugarCarpetas(v, 0, ["t12", "t13"], [{ tipo: "p13-monto", valor: 0 }, { tipo: "visto", que: "p13" }], true),
      { tipo: "cierre", ronda: 0 } as EventoTema1,
    ];
    const a = avanceDe(v, ev);
    expect(a.ronda).toBe(1);
    expect(a.rondas[1].map((c) => c.tipo)).toEqual(["t13"]);
    expect(a.rondas[1][0]).not.toEqual(a.rondas[0][2]);
    expect(a.fallosPorTipo.t13).toBe(1);
    expect(a.ultimoError.t13).toBe("presto-lo-que-pide");
    const fin = avanceDe(v, [...ev, ...jugarCarpetas(v, 1, ["t13"]), { tipo: "cierre", ronda: 1 }]);
    expect(fin.aprobado).toBe(true);
  });

  it("escalón (d): después de cuatro NC equivocadas el cliente se va y la carpeta cuenta como fallada", () => {
    const v = 12;
    const ev: EventoTema1[] = [...jugarHastaJornada(v)];
    for (let k = 0; k < FALLOS_HASTA_QUE_SE_VA; k++) ev.push({ tipo: "nc", ronda: 0, i: 0, valor: 99 });
    const a = avanceDe(v, ev);
    expect(a.paso.paso === "t12" && a.paso.i).toBe(1);
  });

  it("las versiones de repaso nunca repiten la de la ronda anterior", () => {
    for (const v of VERSIONES) for (let r = 1; r < 5; r++) expect(versionDeRepaso(v, r)).not.toBe(versionDeRepaso(v, r - 1));
  });
});
