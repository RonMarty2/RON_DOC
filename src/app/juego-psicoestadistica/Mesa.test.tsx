// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { paqueteT1 } from "@/lib/juego/psicoestadistica/cifras";
import { piezasDisponibles2 } from "@/lib/juego/psicoestadistica/flujo-t1";
import { papelDe } from "@/lib/juego/psicoestadistica/papeles-t1";

// La escena de PixiJS necesita un canvas de verdad: aquí se prueba el JUEGO (lo que se lee, se toca y se guarda), no el dibujo.
vi.mock("./EscenaPixi", () => ({ EscenaPixi: () => null }));
vi.mock("../juego-proyectos/CuentaJuego", () => ({
  useCuenta: () => ({ estado: "sin-nube", alumno: null, cursos: [], cursoId: null, elegirCurso: () => {} }),
}));

const { Mesa } = await import("./Mesa");

const SEMILLA = 21;
const CLAVE_PARTIDA = `ron-doc-juego:psicoestadistica:tema1:${SEMILLA}`;
const p = paqueteT1(SEMILLA);

const boton = (nombre: RegExp | string) => screen.getByRole("button", { name: nombre });
const pulsa = (nombre: RegExp | string) => fireEvent.click(boton(nombre));
/** Pasa todas las líneas de un diálogo hasta su último botón. */
function pasarDialogo(ultimo: RegExp | string = /^Seguir/) {
  for (let i = 0; i < 12 && screen.queryByRole("button", { name: /^Siguiente/ }); i++) pulsa(/^Siguiente/);
  pulsa(ultimo);
}
const papel = (caso: 1 | 2, id: string) => papelDe(p, caso, id, { hoy: new Date() }).nombre;

beforeEach(() => {
  window.localStorage.clear();
  window.localStorage.setItem("ron-doc-juego:psicoestadistica:semilla-prueba", String(SEMILLA));
});
afterEach(cleanup);

describe("La mesa de verificación: del título al final del Caso 2", () => {
  it("se puede jugar entera, se guarda y se retoma", async () => {
    render(<Mesa />);
    await screen.findByRole("heading", { name: /Mesa de verificación/ });
    pulsa(/Empezar/);

    pasarDialogo(); // bienvenida
    pasarDialogo(); // la jefa y el encargo
    expect(screen.getByText("Para empezar")).toBeTruthy();
    pulsa("Responde Dani");
    pasarDialogo(); // Dani responde

    // Paso 1: abre un papel con sueño y aparece el asombro.
    const sueno = p.carpetas.porCaso[1].claves[0];
    pulsa(new RegExp(`^${papel(1, sueno)}`));
    expect(screen.getByRole("dialog")).toBeTruthy();
    pulsa(/^Cerrar/);
    expect(screen.getByText("Lo que encontraste")).toBeTruthy();
    expect(screen.getByText(/Archivo, /)).toBeTruthy();
    pulsa(/^Seguir/); // la línea de la jefa
    pulsa(/^Seguir/); // al cierre del paso
    pasarDialogo(); // la jefa presenta los tubos y Beto pasa

    // Caso 2: el informe, la jefa y la carpeta.
    expect(screen.getByText(/CERO DENUNCIAS/)).toBeTruthy();
    expect(screen.getByRole("img", { name: /Credibilidad: 50/ })).toBeTruthy();
    pulsa(/^A la carpeta/);

    const clave = p.carpetas.porCaso[2].claves[0];
    pulsa(new RegExp(`^${papel(2, clave)}`));
    pulsa(/^Cerrar/);
    pulsa("Redactar la frase");
    const piezas = piezasDisponibles2(p, [clave]);
    const delClave = piezas.find((x) => x.papel === clave)!;
    fireEvent.click(screen.getByRole("button", { name: delClave.texto }));
    fireEvent.click(screen.getByRole("button", { name: piezas[0].texto }));
    pulsa(/^Sellar la frase/);
    expect(screen.getByText("¿Firmar? Después no hay vuelta.")).toBeTruthy();
    pulsa("Sí, al consejo");

    pasarDialogo(/^Seguir|^Continuar/); // la reacción de la jefa
    if (screen.queryByRole("button", { name: /^Continuar/ })) pulsa(/^Continuar/);
    expect(screen.getByText("Aquí termina esta prueba")).toBeTruthy();

    // Quedó guardado, con lo que pasó.
    const guardada = JSON.parse(window.localStorage.getItem(CLAVE_PARTIDA)!);
    const tipos = guardada.eventos.map((e: { tipo: string }) => e.tipo);
    expect(tipos).toEqual(expect.arrayContaining(["p1.respuestas", "p1.abrio", "caso.entra", "abrir", "armar", "entrada", "sella"]));
    expect(guardada.eventos.find((e: { tipo: string }) => e.tipo === "sella").decision).toBe("R2.3");

    // Y al volver, se retoma en el final.
    cleanup();
    render(<Mesa />);
    await screen.findByRole("heading", { name: /Mesa de verificación/ });
    pulsa(/Continuar donde quedé/);
    expect(screen.getByText("Aquí termina esta prueba")).toBeTruthy();
  });

  it("la hoja «Poner las mías» no deja seguir con números fuera de rango", async () => {
    render(<Mesa />);
    await screen.findByRole("heading", { name: /Mesa de verificación/ });
    pulsa(/Empezar/);
    pasarDialogo();
    pasarDialogo();
    pulsa("Poner las mías");
    const campos = screen.getAllByRole("textbox");
    fireEvent.change(campos[0], { target: { value: "20" } });
    fireEvent.change(campos[1], { target: { value: "45" } });
    fireEvent.change(campos[2], { target: { value: "70" } });
    pulsa(/^Seguir/);
    expect(screen.getAllByRole("alert")).toHaveLength(1);
    fireEvent.change(campos[0], { target: { value: "7,5" } });
    pulsa(/^Seguir/);
    expect(screen.getByText("El archivo del colegio")).toBeTruthy();
  });
});
