import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { BOTONES_SELLO, FRASE } from "@/lib/juego/psicoestadistica/guion-pantalla-t1";
import { E04_CLIC, E14 } from "@/lib/juego/psicoestadistica/sonido-t1";
import { efectoDeBoton } from "./sonido";

const aqui = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(resolve(aqui, "mesa.css"), "utf-8");

describe("Legibilidad de la pantalla (regla «todo texto que lee el alumno se lee, y se mide»)", () => {
  it("ninguna letra mide menos de 12 px (el crítico la encontró a mano en 10 y 11 px el 09-10; ahora lo impide una prueba)", () => {
    const tamanos = [...css.matchAll(/font-size:\s*([\d.]+)px/g)].map((m) => ({ px: Number(m[1]), en: css.slice(Math.max(0, m.index! - 60), m.index!).split("\n").pop() }));
    expect(tamanos.length).toBeGreaterThan(10);
    const chicas = tamanos.filter((t) => t.px < 12);
    expect(chicas, JSON.stringify(chicas)).toEqual([]);
  });

  it("todo lo que se toca mide al menos 44 px de alto", () => {
    for (const regla of [".mesa-boton", ".mesa-sonido", ".mesa-pieza", ".mesa-papel"]) {
      const bloque = css.split("\n").find((l) => l.startsWith(`${regla} {`) || l.startsWith(`${regla}{`)) ?? css.slice(css.indexOf(`${regla} {`), css.indexOf("}", css.indexOf(`${regla} {`)));
      const m = /min-height:\s*(\d+)px/.exec(bloque.length > 20 ? bloque : css.slice(css.indexOf(`${regla} {`)));
      expect(m, regla).toBeTruthy();
      expect(Number(m![1]), regla).toBeGreaterThanOrEqual(44);
    }
  });
});

describe("Qué efecto suena al apretar cada botón", () => {
  it("los tres botones de decidir suenan con el mismo timbre y un tono distinto", () => {
    expect(efectoDeBoton(BOTONES_SELLO.tal, false)).toEqual(E04_CLIC("tal"));
    expect(efectoDeBoton(BOTONES_SELLO.frase, false)).toEqual(E04_CLIC("frase"));
    expect(efectoDeBoton(BOTONES_SELLO.frenar, false)).toEqual(E04_CLIC("frenar"));
    expect(efectoDeBoton(FRASE.boton, false)).toEqual(E04_CLIC("frase"));
  });
  it("«Sí, al consejo» firma; las piezas y los botones de volver hacen un clic de elección; el resto de botones, ninguno", () => {
    expect(efectoDeBoton(BOTONES_SELLO.si, false)).toBe("firma");
    expect(efectoDeBoton("cualquier pieza de la frase", true)).toBe(E14);
    for (const t of ["Atrás", "Volver a los papeles", BOTONES_SELLO.no, "Continuar ▸"]) expect(efectoDeBoton(t, false), t).toBe(E14);
    for (const t of ["Siguiente ▸", "Seguir ▸", "Cerrar ▸", "Empezar ▸"]) expect(efectoDeBoton(t, false), t).toBeNull();
  });
});
