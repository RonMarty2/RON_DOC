import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { paqueteT1 } from "./cifras";
import { ARCHIVO, ASOMBRO, BIENVENIDA, BOTONES_SELLO, CASO2, CIERRE_PASO1, ENCARGO, HOJA, JEFA_LLEGADA, TITULO, daniResponde, reaccionCaso2 } from "./guion-pantalla-t1";
import { resolverDecision2, piezasDisponibles2 } from "./flujo-t1";
import { VERSION_MAXIMA } from "../planta";

const aqui = dirname(fileURLToPath(import.meta.url));
const narrativa = readFileSync(resolve(aqui, "../../../../docs/juego/gdd/05-mundo-y-narrativa.md"), "utf-8");

// El texto de la narrativa tal como se lee: sin negritas/cursivas; los huecos {x} pasan a § para compararlos con lo ya llenado.
const limpio = narrativa.replace(/\*\*/g, "").replace(/\*/g, "").replace(/\{[^}]+\}/g, "§").replace(/[ \t]+/g, " ");
const trozos = limpio.split(/[«»|\n]/).map((t) => t.trim()).filter((t) => t.includes("§") && t.length >= 15);
const regex = (t: string) => new RegExp(`^${t.split("§").map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".{1,60}?")}$`, "i");
const regexTrozos = trozos.map(regex);

/** La cadena está en la narrativa tal cual, o encaja con un trozo de la narrativa que tiene huecos. */
const estaEnLaNarrativa = (s: string) => limpio.includes(s) || regexTrozos.some((r) => r.test(s));

const SEMILLAS = Array.from({ length: 40 }, (_, i) => 1 + i * Math.floor((VERSION_MAXIMA - 1) / 40));

describe("Textos de la pantalla = textos de la narrativa", () => {
  const fijos: string[] = [
    TITULO.principal,
    TITULO.pequeno,
    ...BIENVENIDA,
    ...JEFA_LLEGADA,
    ...ENCARGO,
    HOJA.titulo,
    HOJA.jefa,
    ...HOJA.preguntas,
    HOJA.botonDani,
    HOJA.botonPropias,
    ARCHIVO.jefa,
    ARCHIVO.jefaSeguro,
    ARCHIVO.daniAbre,
    ASOMBRO.filaHoy,
    ASOMBRO.jefa,
    ...CIERRE_PASO1.jefa,
    CIERRE_PASO1.beto,
    CASO2.jefa,
    BOTONES_SELLO.tal,
    BOTONES_SELLO.frase,
    BOTONES_SELLO.frenar,
    BOTONES_SELLO.confirmaTitulo,
    BOTONES_SELLO.si,
    BOTONES_SELLO.no,
  ];
  it.each(fijos)("«%s» está en la narrativa", (s) => {
    expect(estaEnLaNarrativa(s), s).toBe(true);
  });

  it("el control rechaza un texto cambiado o inventado (prueba del propio control)", () => {
    expect(estaEnLaNarrativa("Va al informe. El cero NO se sostenía.")).toBe(false);
    expect(estaEnLaNarrativa("Esta frase no existe en ningún lado de la narrativa.")).toBe(false);
    expect(estaEnLaNarrativa("Soy la mamá de un estudiante de Colegio. A mi hijo lo empujaron.")).toBe(false);
  });

  it("lo que lleva cifras de la versión también encaja con la narrativa", () => {
    for (const s of SEMILLAS) {
      const p = paqueteT1(s);
      for (const t of daniResponde(p)) expect(estaEnLaNarrativa(t), t).toBe(true);
      expect(estaEnLaNarrativa(CASO2.informe(p)), CASO2.informe(p)).toBe(true);
      expect(ASOMBRO.filaArchivo("octubre de 2025")).toBe("Archivo, octubre de 2025");
    }
  });

  it("todas las reacciones del caso 2 están en la narrativa, no tienen huecos sin llenar y no usan voseo", () => {
    const vistas = new Set<string>();
    for (const s of SEMILLAS) {
      const p = paqueteT1(s);
      const c = p.carpetas.porCaso[2];
      const ab = [c.claves[0]];
      const piezas = piezasDisponibles2(p, ab);
      const decisiones = [
        resolverDecision2(p, [], "tal"),
        resolverDecision2(p, ab, "tal"),
        resolverDecision2(p, [], "frenar"),
        resolverDecision2(p, ab, { frase: [piezas[0], piezas.find((x) => x.papel === c.claves[0])!] }),
        resolverDecision2(p, ab, { frase: [piezas[0], piezas[1]] }),
      ];
      for (const r of decisiones) {
        const re = reaccionCaso2(p, r);
        expect(re.lineas.length).toBeGreaterThan(0);
        for (const l of re.lineas) {
          expect(l.texto, l.texto).not.toMatch(/[{}§]/);
          expect(l.texto).not.toMatch(/\b(tenés|podés|sos|vos|fijate|mirá|calculá|querés)\b/i);
          expect(estaEnLaNarrativa(l.texto), l.texto).toBe(true);
          vistas.add(`${p.version.tipos[2]}:${r.filas[0]}`);
        }
      }
    }
    // Las 4 filas de P y las 5 de B (R2.1.sin) que se pueden alcanzar aquí.
    expect([...vistas].sort()).toEqual(["B:R2.1", "B:R2.1.sin", "B:R2.2", "B:R2.3", "B:R2.4", "P:R2.1", "P:R2.2", "P:R2.3", "P:R2.4"]);
  });

  it("los números de Dani salen con coma decimal y sin huecos", () => {
    for (const s of SEMILLAS) {
      for (const t of daniResponde(paqueteT1(s))) expect(t).not.toMatch(/[{}]|\d\.\d/);
    }
  });
});
