// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { paqueteT1 } from "@/lib/juego/psicoestadistica/cifras";
import { piezasDisponibles2 } from "@/lib/juego/psicoestadistica/flujo-t1";
import * as G from "@/lib/juego/psicoestadistica/guion-pantalla-t1";
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
const hay = (texto: string) => expect(screen.getByText(texto), texto).toBeTruthy();
/** Pasa todas las líneas de un diálogo hasta su último botón. */
function pasarDialogo(ultimo: RegExp | string = /^Seguir/) {
  for (let i = 0; i < 12 && screen.queryByRole("button", { name: /^Siguiente/ }); i++) pulsa(/^Siguiente/);
  pulsa(ultimo);
}
const papel = (caso: 1 | 2, id: string) => papelDe(p, caso, id, { hoy: new Date() }).nombre;

/** Del título hasta tener la carpeta del caso 2 delante (con las pantallas de orientación leídas). */
async function hastaElCaso2() {
  render(<Mesa />);
  await screen.findByRole("heading", { name: /Mesa de verificación/ });
  hay(G.TITULO.prueba + " Luz y polvo provisionales.");
  pulsa(/Empezar/);

  hay(G.BIENVENIDA[0]); // quién eres y cuál es tu trabajo: antes del primer toque de juego
  pasarDialogo();
  pasarDialogo(); // la jefa se presenta y hace el encargo
  hay("Para empezar");
  hay(`«${G.HOJA.jefa}»`);
  hay(`«${G.HOJA.presentaDani(p)}»`); // Dani se presenta antes de responder
  pulsa(G.HOJA.botonDani(p));
  pasarDialogo(); // Dani responde

  // Paso 1: el archivo dice qué buscar y qué cuesta abrir; al abrir el papel con sueño aparece el hallazgo.
  hay(`«${G.ARCHIVO.consigna}»`);
  const sueno = p.carpetas.porCaso[1].claves[0];
  pulsa(new RegExp(`^${papel(1, sueno)}`));
  expect(screen.getByRole("dialog")).toBeTruthy();
  pulsa(/^Cerrar/);
  hay(G.ASOMBRO.titulo);
  expect(screen.getByText(/Archivo, /)).toBeTruthy();
  pasarDialogo(); // la jefa: «ya se hizo…», lo que era el encargo y cuál es tu trabajo
  pulsa(/^Seguir/);
  pasarDialogo(); // los medidores, las rayas, Horizonte y Beto
  expect(screen.getByRole("img", { name: /Credibilidad: 50/ })).toBeTruthy();
  hay(G.ROTULOS_TUBOS.c);
  hay(G.ROTULOS_TUBOS.voz);

  // Caso 2: el informe y qué hay que comprobar.
  expect(screen.getByText(/CERO DENUNCIAS/)).toBeTruthy();
  pasarDialogo(/^A la carpeta/);
  hay(`«${G.ARCHIVO2.consigna}»`);
}

beforeEach(() => {
  window.localStorage.clear();
  window.localStorage.setItem("ron-doc-juego:psicoestadistica:semilla-prueba", String(SEMILLA));
});
afterEach(cleanup);

describe("La mesa de verificación: del título al final del Caso 2", () => {
  it("se puede jugar entera, dice qué hacer en cada paso, se guarda y se retoma", async () => {
    await hastaElCaso2();
    // Con 0 papeles abiertos la jefa avisa, y cada botón dice lo que hace.
    hay(`«${G.ARCHIVO2.sinPapeles}»`);
    hay(G.ARCHIVO2.explicaTal);
    hay(G.ARCHIVO2.explicaFrase);
    hay(G.ARCHIVO2.explicaFrenar);

    const clave = p.carpetas.porCaso[2].claves[0];
    pulsa(new RegExp(`^${papel(2, clave)}`));
    pulsa(/^Cerrar/);
    expect(screen.queryByText(`«${G.ARCHIVO2.sinPapeles}»`)).toBeNull();
    pulsa("Redactar la frase");
    hay(G.FRASE.instruccion);
    const piezas = piezasDisponibles2(p, [clave]);
    const delClave = piezas.find((x) => x.papel === clave)!;
    fireEvent.click(screen.getByRole("button", { name: delClave.texto }));
    fireEvent.click(screen.getByRole("button", { name: piezas[0].texto }));
    pulsa(G.FRASE.boton.replace("▸", ">"));
    hay("¿Firmar? Después no hay vuelta.");
    expect(screen.queryByText(G.SIN_PAPELES_AL_FIRMAR)).toBeNull(); // abrió un papel: no hay aviso
    pulsa("Sí, al consejo");

    pasarDialogo(/^Seguir|^Continuar/); // la reacción de la jefa, con por qué se movieron los medidores
    expect(screen.getByText(/^Credibilidad .* · Voz .*\.$/)).toBeTruthy();
    if (screen.queryByRole("button", { name: /^Continuar/ })) pulsa(/^Continuar/);
    hay("Aquí termina esta prueba");
    expect(screen.getByText(/^Credibilidad \d+ · Voz \d+\.$/)).toBeTruthy();
    expect(screen.getByText(new RegExp("^Abriste .+: ahí estaba lo que decidía este informe\\.$"))).toBeTruthy();

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
    hay("Aquí termina esta prueba");
  });

  it("firmar sin abrir ningún papel avisa, pero no bloquea (la fila R2.1.sin existe)", async () => {
    await hastaElCaso2();
    pulsa("Firmar tal cual");
    hay(G.SIN_PAPELES_AL_FIRMAR);
    hay("¿Firmar? Después no hay vuelta.");
    pulsa("Sí, al consejo");
    pasarDialogo(/^Seguir|^Continuar/);
    if (screen.queryByRole("button", { name: /^Continuar/ })) pulsa(/^Continuar/);
    hay("Aquí termina esta prueba");
    expect(screen.getByText(/^Quedó sin abrir: .+\. Era el papel que más decía sobre este informe\.$/)).toBeTruthy();
  });

  it("«Todavía no» en la confirmación vuelve a la carpeta sin sellar nada", async () => {
    await hastaElCaso2();
    pulsa("Frenar");
    pulsa("Todavía no");
    hay(G.ARCHIVO2.explicaFrenar);
    const guardada = JSON.parse(window.localStorage.getItem(CLAVE_PARTIDA)!);
    expect(guardada.eventos.some((e: { tipo: string }) => e.tipo === "sella")).toBe(false);
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
    hay("El archivo del colegio");
  });
  it("«De cero» pide confirmación, borra el avance y vuelve al título; «No» no toca nada", async () => {
    await hastaElCaso2();
    expect(window.localStorage.getItem(CLAVE_PARTIDA)).toBeTruthy();
    pulsa(/Empezar de cero/);
    hay("¿Empezar de cero? Se pierde tu avance.");
    pulsa(/^No$/);
    expect(screen.queryByText("¿Empezar de cero? Se pierde tu avance.")).toBeNull();
    hay(`«${G.ARCHIVO2.consigna}»`); // sigue donde estaba
    pulsa(/Empezar de cero/);
    pulsa(/Sí, de cero/);
    await screen.findByRole("heading", { name: /Mesa de verificación/ });
    expect(screen.getByRole("button", { name: /Empezar/ })).toBeTruthy();
    expect(screen.queryByRole("button", { name: /Empezar de cero/ })).toBeNull(); // en el título no hace falta
    const guardada = window.localStorage.getItem(CLAVE_PARTIDA);
    expect(guardada === null || !guardada.includes("p1.")).toBe(true); // ya no queda avance guardado
  });
});
