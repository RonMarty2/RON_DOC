import { describe, expect, it } from "vitest";
import { MANIFIESTO_VACIO, leerManifiesto, pistaDe } from "../sonido/manifiesto";
import { duracionDe, problemasDeReceta } from "../sonido/receta";
import { FASES_T1, musicaDeFase, todasLasRecetas, type EstadoParaMusica, type FaseT1 } from "./sonido-t1";

const estado = (fase: FaseT1, o: Partial<EstadoParaMusica> = {}): EstadoParaMusica => ({ fase, fichas: 3, hallado: false, medidorBajo: false, lineaDeLaJefa: 0, ...o });

describe("Efectos del Tema 1", () => {
  const recetas = todasLasRecetas();
  it("hay 14 efectos más el soplo de Dani y el pluck de corcho, todos bien formados", () => {
    // E01..E14 salvo E04/E10/E12 que salen por variante: contar familias
    const familias = new Set(Object.keys(recetas).map((k) => k.replace(/_.*$/, "")));
    for (const e of ["E01", "E02", "E03", "E04", "E05", "E06", "E07", "E08", "E09", "E10", "E11", "E12", "E13", "E14", "SOPLO", "PLUCK"]) expect(familias.has(e), e).toBe(true);
    for (const [id, r] of Object.entries(recetas)) expect(problemasDeReceta(r), id).toEqual([]);
  });
  it("ningún efecto dura más de 3 s, y el del teléfono es el más largo", () => {
    const largo = Object.entries(recetas).sort((a, b) => duracionDe(b[1]) - duracionDe(a[1]))[0];
    expect(largo[0]).toBe("E07");
    expect(duracionDe(largo[1])).toBeLessThan(3);
  });
  it("los tres botones de decidir suenan igual salvo el tono (sin carga de «bueno» ni «malo»)", () => {
    const [a, b, c] = ["tal", "frase", "frenar"].map((x) => recetas[`E04_CLIC_${x}`]);
    for (const r of [a, b, c]) expect(r).toHaveLength(1);
    expect(a[0].onda).toBe(b[0].onda);
    expect(b[0].onda).toBe(c[0].onda);
    expect(a[0].dur).toBe(c[0].dur);
    expect(new Set([a[0].desde, b[0].desde, c[0].desde]).size).toBe(3);
  });
  it("la ficha n de la revelación suena siempre igual y sube con n", () => {
    for (let n = 2; n <= 8; n++) expect(recetas[`E12_${n}`][0].desde).toBeGreaterThan(recetas[`E12_${n - 1}`][0].desde);
  });
  it("una receta mala se detecta", () => {
    expect(problemasDeReceta([])).toContain("sin notas");
    expect(problemasDeReceta([{ onda: "square", desde: 5, inicio: 0, dur: 0.1 }]).join()).toMatch(/frecuencia/);
    expect(problemasDeReceta([{ onda: "square", desde: 440, inicio: 0, dur: 9 }]).join()).toMatch(/dura/);
  });
});

describe("Qué música suena en cada fase", () => {
  it("las 13 fases tienen respuesta", () => {
    expect(FASES_T1).toHaveLength(13);
    for (const f of FASES_T1) expect(musicaDeFase(estado(f)), f).toBeTruthy();
  });
  it("el título y el fin están en silencio (hasta que exista S10)", () => {
    expect(musicaDeFase(estado("titulo")).escena).toBeNull();
    expect(musicaDeFase(estado("fin")).escena).toBeNull();
  });
  it("sigue lo que se ve: la duda entra con 1 ficha y la tensión con 0 fichas sin haber hallado el papel", () => {
    expect(musicaDeFase(estado("archivo1", { fichas: 3 })).capa).toBe("calma");
    expect(musicaDeFase(estado("archivo1", { fichas: 1 })).capa).toBe("duda");
    expect(musicaDeFase(estado("archivo1", { fichas: 0 })).capa).toBe("tension");
    expect(musicaDeFase(estado("archivo1", { fichas: 0, hallado: true })).capa).toBe("calma");
  });
  it("«¿Firmar?» pone tensión, y la reacción vuelve a la calma más baja salvo medidor en 25 o menos", () => {
    expect(musicaDeFase(estado("confirma")).capa).toBe("tension");
    expect(musicaDeFase(estado("reaccion"))).toMatchObject({ escena: "s2", capa: "calma", relativo: 0.6 });
    expect(musicaDeFase(estado("reaccion", { medidorBajo: true })).capa).toBe("tension");
  });
  it("la capa de duda de la jefa entra con su segunda línea, y el remate es del asombro", () => {
    expect(musicaDeFase(estado("jefa", { lineaDeLaJefa: 0 })).capa).toBe("calma");
    expect(musicaDeFase(estado("jefa", { lineaDeLaJefa: 1 })).capa).toBe("duda");
    expect(musicaDeFase(estado("asombro")).capa).toBe("remate");
  });
  it("cada fase con música pertenece a la escena de su momento (S0 arranque, S1 Paso 1, S2 Caso 2)", () => {
    const esc = Object.fromEntries(FASES_T1.map((f) => [f, musicaDeFase(estado(f)).escena]));
    expect(esc).toMatchObject({ bienvenida: "s0", jefa: "s0", hoja: "s0", archivo1: "s1", asombro: "s1", cierre1: "s1", entrada2: "s2", archivo2: "s2", frase: "s2", confirma: "s2", reaccion: "s2" });
  });
});

describe("El manifiesto de música", () => {
  const bueno = {
    version: 1,
    volumen: { musica: 0.3, efectos: 0.55, avisos: 0.65 },
    pistas: { "s0-a": { archivo: "s0-a.mp3", bucle: true, volumen: 1, duracion: 29.1 }, "s1-d": { archivo: "s1-d.mp3", bucle: false, volumen: 1, duracion: 5.7 }, "s1-a": { archivo: "s1-a.mp3" } },
    escenas: { s0: { calma: "s0-a" }, s1: { calma: "s1-a", remate: "s1-d" } },
  };
  it("lo que viene mal no lo rompe", () => {
    for (const malo of [null, undefined, 5, "x", [], { pistas: 3 }, { pistas: { a: { archivo: "../../x.mp3" } } }, { escenas: { s0: { calma: "no-existe" } } }]) {
      expect(() => leerManifiesto(malo)).not.toThrow();
    }
    expect(leerManifiesto({ pistas: { a: { archivo: "../../x.mp3" } } }).pistas).toEqual({});
    expect(leerManifiesto(null)).toEqual(MANIFIESTO_VACIO);
  });
  it("la capa que falta se reemplaza por la calma, y sin escena no hay pista", () => {
    const m = leerManifiesto(bueno);
    expect(pistaDe(m, "s0", "calma")?.id).toBe("s0-a");
    expect(pistaDe(m, "s0", "tension")?.id).toBe("s0-a");
    expect(pistaDe(m, "s1", "remate")?.id).toBe("s1-d");
    expect(pistaDe(m, "s1", "remate")?.pista.bucle).toBe(false);
    expect(pistaDe(m, "s9", "calma")).toBeNull();
    expect(pistaDe(MANIFIESTO_VACIO, "s0", "calma")).toBeNull();
  });
  it("los volúmenes fuera de 0 a 1 vuelven al de partida", () => {
    expect(leerManifiesto({ volumen: { musica: 5, efectos: -1, avisos: "x" } }).volumen).toEqual({ musica: 0.3, efectos: 0.55, avisos: 0.65 });
  });
});
