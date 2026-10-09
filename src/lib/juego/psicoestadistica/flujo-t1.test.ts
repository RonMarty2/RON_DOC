import { describe, expect, it } from "vitest";
import { paqueteT1 } from "./cifras";
import { VERSION_MAXIMA } from "../planta";
import {
  abrioSuenoPaso1,
  avanceDeEventos,
  abrirEnPaso1,
  cierreDelPaso1,
  entradaDeFrase2,
  fichasPaso1,
  fraseValida,
  papelesVistosPaso1,
  paso1Nuevo,
  piezasDisponibles2,
  resolverDecision2,
} from "./flujo-t1";

const SEMILLAS = Array.from({ length: 60 }, (_, i) => 1 + i * Math.floor((VERSION_MAXIMA - 1) / 60));

describe("Paso 1", () => {
  it("empieza con 3 fichas y sin haber abierto nada", () => {
    for (const s of SEMILLAS) {
      const p = paqueteT1(s);
      const e = paso1Nuevo(p);
      expect(fichasPaso1(e)).toBe(3);
      expect(abrioSuenoPaso1(p, e)).toBe(false);
    }
  });

  it("si abre un papel con sueño, no hay aviso y se sigue", () => {
    for (const s of SEMILLAS) {
      const p = paqueteT1(s);
      const clave = p.carpetas.porCaso[1].claves[0];
      const r = abrirEnPaso1(p, paso1Nuevo(p), clave);
      expect(r.aviso).toBeNull();
      expect(abrioSuenoPaso1(p, r.estado)).toBe(true);
      expect(fichasPaso1(r.estado)).toBe(2);
    }
  });

  it("reabrir un papel no cuesta ficha", () => {
    const p = paqueteT1(7);
    const id = p.carpetas.porCaso[1].papeles[0].id;
    const a = abrirEnPaso1(p, paso1Nuevo(p), id).estado;
    const b = abrirEnPaso1(p, a, id).estado;
    expect(b).toBe(a);
  });

  it("P1.5: gasta las 3 fichas sin sueño → la jefa regala una; si aun así no, Dani abre el papel (todos ven el asombro)", () => {
    for (const s of SEMILLAS) {
      const p = paqueteT1(s);
      const c = p.carpetas.porCaso[1];
      const sinSueno = c.papeles.filter((q) => !c.claves.includes(q.id)).map((q) => q.id);
      expect(sinSueno).toHaveLength(4);
      let e = paso1Nuevo(p);
      const avisos: (string | null)[] = [];
      for (const id of sinSueno.slice(0, 3)) {
        const r = abrirEnPaso1(p, e, id);
        e = r.estado;
        avisos.push(r.aviso);
      }
      expect(avisos).toEqual([null, null, "jefa-regala"]);
      expect(fichasPaso1(e)).toBe(1);
      const ultimo = abrirEnPaso1(p, e, sinSueno[3]);
      expect(ultimo.aviso).toBe("dani-abre");
      expect(ultimo.estado.ayudado).toBe(c.claves[0]);
      expect(abrioSuenoPaso1(p, ultimo.estado)).toBe(true);
      expect(cierreDelPaso1(p, ultimo.estado)).toMatchObject({ abrioSueno: true, ayudado: true, sobre: null });
    }
  });

  it("la regalada se puede gastar en un papel con sueño y entonces no hace falta Dani", () => {
    const p = paqueteT1(11);
    const c = p.carpetas.porCaso[1];
    const sinSueno = c.papeles.filter((q) => !c.claves.includes(q.id)).map((q) => q.id);
    let e = paso1Nuevo(p);
    for (const id of sinSueno.slice(0, 3)) e = abrirEnPaso1(p, e, id).estado;
    const r = abrirEnPaso1(p, e, c.claves[1]);
    expect(r.aviso).toBeNull();
    expect(r.estado.ayudado).toBeNull();
    expect(cierreDelPaso1(p, r.estado)).toMatchObject({ abrioSueno: true, ayudado: false });
    expect(papelesVistosPaso1(r.estado)).toHaveLength(4);
  });
});

describe("Caso 2: la frase", () => {
  it("siempre ofrece las 3 piezas genéricas y suma las de los papeles abiertos", () => {
    for (const s of SEMILLAS) {
      const p = paqueteT1(s);
      const c = p.carpetas.porCaso[2];
      expect(piezasDisponibles2(p, []).map((x) => x.papel)).toEqual([null, null, null]);
      const conClave = piezasDisponibles2(p, [c.claves[0]]);
      expect(conClave.length).toBeGreaterThanOrEqual(4);
      expect(conClave.filter((x) => x.papel === c.claves[0]).length).toBeGreaterThanOrEqual(1);
      for (const x of conClave) expect(x.texto).not.toMatch(/[{}]/);
    }
  });

  it("2 o 3 piezas", () => {
    expect(fraseValida([1])).toBe(false);
    expect(fraseValida([1, 2])).toBe(true);
    expect(fraseValida([1, 2, 3])).toBe(true);
    expect(fraseValida([1, 2, 3, 4])).toBe(false);
  });

  it("con el clave abierto y su pieza, la fila es R2.3; con solo genéricas, R2.4 (E2c)", () => {
    for (const s of SEMILLAS) {
      const p = paqueteT1(s);
      const c = p.carpetas.porCaso[2];
      const abiertos = [c.claves[0], c.papeles.find((q) => q.rol === "senuelo")!.id];
      const piezas = piezasDisponibles2(p, abiertos);
      const delClave = piezas.filter((x) => x.papel === c.claves[0]);
      const buena = resolverDecision2(p, abiertos, { frase: [delClave[0], piezas[0]] });
      expect(buena.filas[0]).toBe("R2.3");
      expect(buena.codigos).toEqual([]);
      const mala = resolverDecision2(p, abiertos, { frase: [piezas[0], piezas[1]] });
      expect(mala.filas[0]).toBe("R2.4");
      expect(mala.codigos).toEqual(["E2c"]);
    }
  });

  it("firmar tal cual en tipo P cuesta Credibilidad; frenar en tipo B cuesta Voz", () => {
    for (const s of SEMILLAS) {
      const p = paqueteT1(s);
      const tipo = p.version.tipos[2];
      const tal = resolverDecision2(p, [], "tal");
      const frenar = resolverDecision2(p, [], "frenar");
      if (tipo === "P") expect(tal.efecto).toEqual({ c: -20, voz: 10 });
      else expect(tal.efecto).toEqual({ c: 5, voz: 5 });
      if (tipo === "B") expect(frenar.efecto).toEqual({ c: 0, voz: -15 });
    }
  });

  it("la pieza del refuerzo solo cuenta si el refuerzo está abierto y entró a la carpeta", () => {
    for (const s of SEMILLAS) {
      const p = paqueteT1(s);
      const c = p.carpetas.porCaso[2];
      if (!c.refuerzo) continue;
      const abiertos = [c.claves[0], c.refuerzo];
      const piezas = piezasDisponibles2(p, abiertos);
      const elegidas = [piezas.find((x) => x.papel === c.claves[0])!, piezas.find((x) => x.papel === c.refuerzo)!];
      expect(entradaDeFrase2(p, abiertos, elegidas)).toMatchObject({ piezaClave: true, piezaRefuerzo: true });
      expect(resolverDecision2(p, abiertos, { frase: elegidas }).efecto).toEqual({ c: 10, voz: 4 });
    }
  });

  it("una frase de 1 pieza no se sella", () => {
    const p = paqueteT1(3);
    expect(() => entradaDeFrase2(p, [], [{ texto: "x", papel: null }])).toThrow();
  });
});

describe("Retomar una partida guardada", () => {
  const p = paqueteT1(21);
  const c1 = p.carpetas.porCaso[1];
  const c2 = p.carpetas.porCaso[2];

  it("sin eventos: al inicio", () => {
    expect(avanceDeEventos(p, []).fase).toBe("inicio");
  });

  it("repite los papeles abiertos del Paso 1 y las fichas quedan como estaban", () => {
    const a = avanceDeEventos(p, [
      { tipo: "p1.respuestas", propias: false },
      { tipo: "p1.abrio", papel: c1.papeles[0].id, ficha: 1 },
      { tipo: "p1.abrio", papel: c1.papeles[1].id, ficha: 2 },
    ]);
    expect(a.fase).toBe("archivo1");
    expect(a.propias).toBe(false);
    expect(fichasPaso1(a.paso1)).toBe(1);
  });

  it("si Dani tuvo que abrir el papel, al retomar también se ve (no se pierde la ayuda)", () => {
    const sin = c1.papeles.filter((q) => !c1.claves.includes(q.id)).map((q) => q.id);
    const a = avanceDeEventos(p, sin.map((papel, i) => ({ tipo: "p1.abrio" as const, papel, ficha: i + 1 })));
    expect(a.paso1.ayudado).toBe(c1.claves[0]);
  });

  it("en el caso 2: los papeles abiertos y, si ya selló, el fin con lo que selló", () => {
    const enCurso = avanceDeEventos(p, [
      { tipo: "caso.entra", caso: 2, casoTipo: p.version.tipos[2], fichas: 3, c: 50, voz: 50 },
      { tipo: "abrir", caso: 2, papel: c2.claves[0], rol: "clave" },
      { tipo: "abrir", caso: 2, papel: c2.claves[0], rol: "clave" },
    ]);
    expect(enCurso).toMatchObject({ fase: "archivo2", abiertos2: [c2.claves[0]], entrada2: null });
    const fin = avanceDeEventos(p, [
      { tipo: "caso.entra", caso: 2, casoTipo: p.version.tipos[2], fichas: 3, c: 50, voz: 50 },
      { tipo: "entrada", caso: 2, entrada: { abiertos: [], decision: "frenar" } },
    ]);
    expect(fin.fase).toBe("fin");
    expect(fin.entrada2).toEqual({ abiertos: [], decision: "frenar" });
  });
});
