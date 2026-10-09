import { describe, expect, it } from "vitest";
import { VERSION_MAXIMA } from "../planta";
import { problemasDeTexto } from "../../revision";
import {
  cifrasT1,
  fechaAnio,
  hechosA,
  K_CIFRAS,
  K_COLEGIOS,
  K_CURSO,
  K_DANI,
  K_FUENTES,
  MESES_ESCOLARES,
  paqueteT1,
  POOL_CURSOS,
  semillaDePractica,
  tipoDeCaso,
  type PaqueteT1,
} from "./cifras";
import { K_CARPETA } from "./carpeta";
import { POOL_COLEGIOS, POOL_FUENTES, versionT1 } from "./version";
import type { NumeroDeCaso } from "./reglas-t1";

const semillas = Array.from({ length: VERSION_MAXIMA }, (_, i) => i + 1);
const paquetes: PaqueteT1[] = semillas.map((s) => paqueteT1(s));
const d = (x: number) => Math.round(x * 10);
const frac = (n: number) => n / paquetes.length;

describe("rubros (G9)", () => {
  it("cada rubro tiene un k propio, menor que 100 (si no, pisaría el flujo de otra versión)", () => {
    const ks = [1, 2, K_CARPETA, K_DANI, K_COLEGIOS, K_FUENTES, 15, 17, 18, K_CURSO, ...([1, 2, 3, 4, 5, 6, 7, 8] as const).map(K_CIFRAS)];
    expect(new Set(ks).size).toBe(ks.length);
    for (const k of ks) expect(k).toBeLessThan(100);
    expect(K_CIFRAS(1)).toBe(21);
    expect(K_CIFRAS(8)).toBe(28);
  });

  it("determinista, y dos versiones distintas dan cifras distintas", () => {
    expect(paqueteT1(41)).toEqual(paqueteT1(41));
    expect(paqueteT1(41).cifras).not.toEqual(paqueteT1(42).cifras);
    expect(cifrasT1(versionT1(9))).toEqual(paqueteT1(9).cifras);
  });
});

describe("colegio por caso, fuente del caso 4 y curso", () => {
  it("cada caso (1 a 8) tiene un colegio del pool; dos casos seguidos nunca comparten colegio; cada colegio sale en 2 casos", () => {
    for (const { cifras } of paquetes) {
      const lista = ([1, 2, 3, 4, 5, 6, 7, 8] as const).map((n) => cifras.colegios[n]);
      for (const c of lista) expect(POOL_COLEGIOS).toContain(c);
      for (let i = 1; i < lista.length; i++) expect(lista[i]).not.toBe(lista[i - 1]);
      for (const c of POOL_COLEGIOS) expect(lista.filter((x) => x === c)).toHaveLength(2);
    }
  });

  it("los cuatro colegios salen en el caso 2 en todas las proporciones", () => {
    for (const c of POOL_COLEGIOS) expect(frac(paquetes.filter((p) => p.cifras.colegios[2] === c).length)).toBeGreaterThan(0.18);
  });

  it("la fuente del caso 4 es la cuarta: distinta de las de los casos 3, 6 y 7", () => {
    for (const { version, cifras } of paquetes) {
      const todas = [...Object.values(version.textos.fuentes), cifras.fuenteCaso4];
      expect(new Set(todas).size).toBe(4);
      expect(POOL_FUENTES).toContain(cifras.fuenteCaso4);
    }
  });

  it("el curso del caso 6 sale del pool y nunca es 4.º A (el de la profesora Camacho)", () => {
    for (const { cifras } of paquetes) {
      expect(POOL_CURSOS).toContain(cifras.caso6.curso);
      expect(cifras.caso6.curso).not.toBe("4.º A");
    }
    expect(new Set(paquetes.map((p) => p.cifras.caso6.curso)).size).toBe(POOL_CURSOS.length);
  });
});

describe("paso 1 · Dani y los papeles con sueño", () => {
  it("las respuestas de Dani están en rango y los valores del archivo son DISTINTOS de los de hoy", () => {
    for (const { carpetas, cifras } of paquetes) {
      const { dani, papeles } = cifras.paso1;
      expect(dani.horas).toBeGreaterThanOrEqual(5);
      expect(dani.horas).toBeLessThanOrEqual(8.5);
      expect(dani.horas * 2).toBe(Math.round(dani.horas * 2));
      expect(dani.minutos).toBeGreaterThanOrEqual(15);
      expect(dani.minutos).toBeLessThanOrEqual(180);
      expect(dani.animo).toBeGreaterThanOrEqual(30);
      expect(dani.animo).toBeLessThanOrEqual(90);
      expect(Object.keys(papeles).sort()).toEqual([...carpetas.porCaso[1].claves].sort());
      for (const p of Object.values(papeles)) {
        expect(p.horasAnt).not.toBe(dani.horas);
        expect(p.col2Ant).not.toBe(p.col2 === "minutos" ? dani.minutos : dani.animo);
      }
    }
  });

  it("la segunda columna cambia de un papel a otro (minutos de celular o ánimo)", () => {
    const cols = new Set(paquetes.flatMap((p) => Object.values(p.cifras.paso1.papeles).map((x) => x.col2)));
    expect(cols).toEqual(new Set(["minutos", "animo"]));
  });
});

describe("caso 2 · meses, derivaciones, buzón y corcho", () => {
  it("la gráfica son 4 meses que terminan en {mes}: varias, varias, varias, cero (Q6: el cero es cierto)", () => {
    for (const { cifras } of paquetes) {
      const c = cifras.caso2;
      expect(c.mesesGrafica).toHaveLength(4);
      expect(c.mesesGrafica[3]).toBe(c.mes);
      expect(c.denuncias).toHaveLength(4);
      expect(c.denuncias[3]).toBe(0);
      for (const n of c.denuncias.slice(0, 3)) expect(n).toBeGreaterThanOrEqual(3);
      expect(MESES_ESCOLARES.indexOf(c.mes as (typeof MESES_ESCOLARES)[number])).toBe(MESES_ESCOLARES.indexOf(c.mesAnt as (typeof MESES_ESCOLARES)[number]) + 1);
    }
  });

  it("tipo P: derivaciones y buzón SUBEN; tipo B: BAJAN (los textos dicen «pasaron de» / «bajaron» y «más» / «menos»)", () => {
    for (const { version, cifras } of paquetes) {
      const c = cifras.caso2;
      if (version.tipos[2] === "P") {
        expect(c.d1).toBeGreaterThan(c.d0);
        expect(c.b1).toBeGreaterThan(c.b0);
        expect(c.hechoClave).not.toBeNull();
      } else {
        expect(c.d1).toBeLessThan(c.d0);
        expect(c.d1).toBeGreaterThanOrEqual(0);
        expect(c.b1).toBeLessThan(c.b0);
        expect(c.hechoClave).toBeNull();
      }
    }
  });

  it("{hechoClave}: una frase de 16 palabras o menos que cita el hecho del clave de la versión", () => {
    const vistos = new Set<string>();
    for (const { version, carpetas, cifras } of paquetes) {
      if (version.tipos[2] !== "P") continue;
      const h = cifras.caso2.hechoClave!;
      expect(h.split(/\s+/).length).toBeLessThanOrEqual(16);
      const clave = carpetas.porCaso[2].claves[0];
      vistos.add(clave);
      if (clave === "C2-3") expect(h).toContain(`de ${cifras.caso2.d0} a ${cifras.caso2.d1}`);
      else expect(h).toContain(`desde ${cifras.caso2.mes}`);
      expect(problemasDeTexto("hecho", h)).toEqual([]);
    }
    expect(vistos).toEqual(new Set(["C2-1", "C2-2", "C2-3"]));
  });

  it("corcho: el clave y los dos señuelos de la ventana caen en {mesAnt}; los otros 3 en meses distintos entre sí y de {mesAnt}", () => {
    for (const { carpetas, cifras } of paquetes) {
      const c = cifras.caso2;
      const ids = carpetas.porCaso[2].papeles.map((p) => p.id);
      expect(Object.keys(c.corcho).sort()).toEqual([...ids].sort());
      expect(c.corcho[carpetas.porCaso[2].claves[0]]).toBe(c.mesAnt);
      expect(c.corcho["C2-8"]).toBe(c.mesAnt);
      expect(c.corcho["C2-9"]).toBe(c.mesAnt);
      const otros = ids.filter((id) => ![carpetas.porCaso[2].claves[0], "C2-8", "C2-9"].includes(id)).map((id) => c.corcho[id]);
      expect(otros).toHaveLength(3);
      expect(new Set(otros).size).toBe(3);
      expect(otros).not.toContain(c.mesAnt);
    }
  });
});

describe("caso 3 · tandas y cifra del oficio (Q7)", () => {
  it("Q7: las 3 medias que se muestran son distintas en las 999 versiones", () => {
    for (const { cifras } of paquetes) expect(new Set(cifras.caso3.medias).size).toBe(3);
  });

  it("la cifra del oficio queda donde dice 02 según el tipo", () => {
    for (const { version, cifras } of paquetes) {
      const dist = Math.abs(cifras.caso3.cifra - cifras.caso3.mu);
      if (version.tipos[3] === "P") {
        expect(dist).toBeGreaterThan(1.0);
        expect(dist).toBeLessThanOrEqual(1.6);
      } else if (version.tipos[3] === "B") expect(dist).toBeLessThanOrEqual(0.15 + 1e-9);
      else expect(dist).toBeLessThanOrEqual(0.5);
    }
  });
});

describe("caso 4 · los dos estudios", () => {
  it("el estudio bueno da menos «mucho estrés» que el malo (quien se inscribió por voluntad exagera), en 22 a 62 %", () => {
    for (const { version, cifras } of paquetes) {
      const { rA, rB } = cifras.caso4;
      const [bueno, malo] = version.buenoEsA ? [rA, rB] : [rB, rA];
      expect(bueno).toBeGreaterThanOrEqual(22);
      expect(bueno).toBeLessThanOrEqual(38);
      expect(malo - bueno).toBeGreaterThanOrEqual(12);
      expect(malo - bueno).toBeLessThanOrEqual(24);
    }
  });
});

describe("caso 5 · Q1 a Q5 en las 999 versiones", () => {
  it("Q1, Q2, Q3, Q4, Q5 y I2, I4, I5 (los números de las 3 opciones salen del mismo generador)", () => {
    for (const { cifras } of paquetes) {
      const o = cifras.caso5.opciones;
      for (const op of ["a", "b", "c"] as const) {
        expect(o[op].bruta).toBeGreaterThanOrEqual(1); // Q1
        expect(o[op].rho).toBeGreaterThanOrEqual(-4); // I5
        expect(o[op].rho).toBeLessThanOrEqual(10);
        expect(Math.abs(d(o[op].bruta) - d(o[op].rho))).toBeGreaterThan(20); // I4
      }
      expect(d(o.c.grupo!.despues) - d(o.c.grupo!.antes)).toBeGreaterThanOrEqual(10); // Q3
      expect(d(o.a.vecino!.despues) - d(o.a.vecino!.antes)).toBeGreaterThanOrEqual(40); // Q4
      expect(o.a.inflada! - o.a.rho).toBeGreaterThan(1); // Q2
      expect(d(o.b.inflada!) - d(o.b.rho)).toBe(25); // Q5 (el 2,5 que dice el informe)
    }
  });

  it("δ de la hoja es el efectoReal de la versión", () => {
    for (const { version, cifras } of paquetes) expect(cifras.caso5.delta).toBe(version.efectoReal);
  });
});

describe("caso 6 · la hoja de respuestas", () => {
  it("60 filas en P y B, 12 en A; el N declarado es exactamente cuántos duermen MENOS de 6 horas", () => {
    for (const { version, cifras } of paquetes) {
      const c = cifras.caso6;
      expect(c.den).toBe(version.tipos[6] === "A" ? 12 : 60);
      expect(c.horas).toHaveLength(c.den);
      expect(c.horas.filter((h) => h < 6).length).toBe(c.N);
      expect(c.N).toBeGreaterThanOrEqual(c.den === 60 ? 12 : 2);
      expect(c.N).toBeLessThanOrEqual(c.den === 60 ? 18 : 4);
      for (const h of c.horas) expect(h * 2).toBe(Math.round(h * 2));
    }
  });

  it("hay filas que valen justo 6,0 (el «menos de» es estricto) en varias versiones", () => {
    expect(paquetes.filter((p) => p.cifras.caso6.horas.includes(6)).length).toBeGreaterThan(300);
  });

  it("Q9: {hechosA} nombra solo lo que dice el papel clave ABIERTO", () => {
    for (const { version, carpetas } of paquetes) {
      if (version.tipos[6] !== "A") continue;
      const clave = carpetas.porCaso[6].claves[0];
      expect(hechosA(carpetas, [])).toEqual([]);
      const otros = carpetas.porCaso[6].papeles.map((p) => p.id).filter((id) => id !== clave);
      expect(hechosA(carpetas, otros)).toEqual([]);
      expect(hechosA(carpetas, [clave])).toEqual([clave === "C6-3" ? "la hoja se pasó en semana de exámenes" : "solo 12 de 60 respondieron"]);
    }
  });
});

describe("caso 7 · el gráfico", () => {
  it("x es |A − B| con 1 decimal; en P el eje empieza arriba de cero y por debajo de las barras; en B empieza en cero", () => {
    for (const { version, cifras } of paquetes) {
      const c = cifras.caso7;
      expect(c.x).toBe(Math.round(Math.abs(c.vA - c.vB) * 10) / 10);
      expect(c.tallerA).not.toBe(c.tallerB);
      if (version.tipos[7] === "P") {
        expect(c.x).toBeGreaterThanOrEqual(1.2);
        expect(c.x).toBeLessThanOrEqual(3.0);
        const menor = Math.min(c.vA, c.vB);
        expect(c.base).toBeGreaterThan(0);
        expect(menor - c.base).toBeGreaterThanOrEqual(2);
        expect(menor - c.base).toBeLessThanOrEqual(7);
        expect(c.base % 5).toBe(0);
      } else {
        expect(c.base).toBe(0);
        expect(c.x).toBeGreaterThanOrEqual(4);
        expect(c.x).toBeLessThanOrEqual(12);
      }
      expect(Math.max(c.vA, c.vB)).toBeLessThanOrEqual(100);
    }
  });

  it("A es mayor que B en la mitad de las versiones", () => {
    expect(frac(paquetes.filter((p) => p.cifras.caso7.vA > p.cifras.caso7.vB).length)).toBeGreaterThan(0.44);
  });
});

describe("caso 8 · seguimiento del semestre", () => {
  it("financiar y aún no: el taller sube mucho más que el grupo; no financiar: casi igual", () => {
    for (const { version, cifras } of paquetes) {
      const c = cifras.caso8;
      const dm = d(c.m2) - d(c.m1);
      const dg = d(c.g2) - d(c.g1);
      if (version.decisionReal === 1) expect(Math.abs(dm - dg)).toBeLessThanOrEqual(5);
      else {
        expect(dm).toBeGreaterThanOrEqual(50);
        expect(dg).toBeLessThanOrEqual(15);
        expect(dm - dg).toBeGreaterThanOrEqual(35);
      }
    }
  });
});

describe("práctica abierta de un caso", () => {
  it("la semilla de práctica es una versión válida, distinta de la oficial, determinista, y cambia el TIPO de ese caso", () => {
    for (const s of [1, 2, 3, 100, 500, 999]) {
      for (const caso of [2, 3, 4, 5, 6, 7, 8] as NumeroDeCaso[]) {
        const p = semillaDePractica(s, caso, 1);
        expect(p).toBeGreaterThanOrEqual(1);
        expect(p).toBeLessThanOrEqual(VERSION_MAXIMA);
        expect(p).not.toBe(s);
        expect(semillaDePractica(s, caso, 1)).toBe(p);
        expect(tipoDeCaso(versionT1(p), caso)).not.toBe(tipoDeCaso(versionT1(s), caso));
      }
    }
  });

  it("cada intento es otra semilla (en general), el caso 1 no tiene tipo pero cambia la semilla, y el intento 0 se rechaza", () => {
    const vistos = new Set([1, 2, 3, 4, 5, 6, 7, 8].map((i) => semillaDePractica(10, 3, i)));
    expect(vistos.size).toBeGreaterThan(3);
    expect(semillaDePractica(10, 1, 1)).not.toBe(10);
    expect(() => semillaDePractica(10, 3, 0)).toThrow();
  });
});

describe("fechaAnio", () => {
  it("es el mes de hoy, un año atrás", () => {
    expect(fechaAnio(new Date(2026, 9, 8))).toBe("octubre de 2025");
    expect(fechaAnio(new Date(2027, 0, 1))).toBe("enero de 2026");
  });
});
