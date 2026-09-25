"use client";

import { useEffect, useRef } from "react";

// Pixel art de la planta de Lácteos Valle Alto, dibujado con código sobre un lienzo de 320×180
// (decidido el 25-09: arte con código hasta probarlo con un curso). Viene de docs/juego/valle-escena.html.

const PERSONA = [
  // Don Mario: sombrero, bigote, delantal
  "....KKKK....", "...KKKKKK...", "..KKKKKKKK..", "....SSSS....", "...SSSSSS...", "...SESSES...",
  "...SSMMSS...", "....SSSS....", "..WWWWWWWW..", ".SWWWAAWWWS.", ".SWWWAAWWWS.", ".SWWWAAWWWS.",
  "...WWAAWW...", "...PP..PP...", "...PP..PP...", "..BBB..BBB..",
];
const COL: Record<string, string> = {
  K: "#3b2a1e", S: "#d9a47a", E: "#15122b", M: "#4a2c1a", W: "#f3eee4", A: "#5b8fd6", P: "#3a3266", B: "#2a2140",
};
const CIELO = ["#2b2150", "#3d2a5e", "#5a3363", "#8a4560", "#c2605a", "#e98a57", "#f2a65a"];
const TUNARI: [number, number][] = [
  [30, 80], [60, 88], [95, 60], [120, 70], [150, 52], [175, 66], [210, 74], [240, 64], [280, 84], [320, 78], [320, 110], [0, 110],
];

const semilla = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

export function LienzoPlanta({
  tanques,
  envasadoraNueva,
  velocidad,
  fuente,
}: {
  tanques: number;
  envasadoraNueva: boolean;
  /** 1 = como hoy; más, si la planta produce más. */
  velocidad: number;
  /** Familia de la letra pixelada (la de next/font). */
  fuente: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const estado = useRef({ tanques, envasadoraNueva, velocidad });
  estado.current = { tanques, envasadoraNueva, velocidad };

  useEffect(() => {
    const c = ref.current?.getContext("2d");
    if (!c) return;
    const P = (x: number, y: number, w: number, h: number, col: string) => {
      c.fillStyle = col;
      c.fillRect(x | 0, y | 0, w | 0, h | 0);
    };
    const letra = (t: string, x: number, y: number, tam: number, col: string) => {
      c.fillStyle = col;
      c.font = `${tam}px ${fuente}`;
      c.fillText(t, x, y);
    };
    const sprite = (m: string[], x: number, y: number) =>
      m.forEach((f, j) => [...f].forEach((ch, i) => COL[ch] && P(x + i, y + j, 1, 1, COL[ch])));

    let t = 0;
    let botellas: number[] = [];
    let ultimo = 0;
    let pedido = 0;

    const fondo = () => {
      CIELO.forEach((col, i) => P(0, i * 13, 320, 13, col));
      for (let i = 0; i < 26; i++) if ((t / 30 + i) % 7 > 1) P(semilla(i) * 320, semilla(i + 99) * 40, 1, 1, "#f3eee4");
      P(248, 58, 10, 10, "#ffd89a");
      P(246, 60, 14, 6, "#ffd89a"); // sol bajando
      c.fillStyle = "#4a3f7a"; // el Tunari
      c.beginPath();
      c.moveTo(0, 104);
      TUNARI.forEach(([x, y]) => c.lineTo(x, y));
      c.fill();
      P(147, 52, 8, 3, "#e9e4f5");
      P(144, 55, 12, 2, "#e9e4f5"); // nieve
      P(0, 108, 320, 72, "#3c5a3a");
      P(0, 150, 320, 30, "#6b5a45"); // pasto y calle
      for (let x = 0; x < 320; x += 16) P(x + 4, 162, 8, 2, "#8a775c");
    };

    const planta = () => {
      const { tanques, envasadoraNueva } = estado.current;
      P(20, 70, 190, 80, "#b8683f");
      P(20, 66, 190, 6, "#8e4e2e"); // galpón de adobe
      for (let x = 20; x < 210; x += 10) P(x, 66, 5, 3, "#a85c34");
      P(40, 74, 150, 10, "#15122b");
      letra("LACTEOS VALLE ALTO", 44, 83, 8, "#f2a65a");
      for (let i = 0; i < 3; i++) {
        const x = 34 + i * 26;
        const lleno = i < tanques;
        P(x, 96, 20, 40, lleno ? "#c9d3dc" : "#6d6590");
        P(x + 2, 98, 4, 36, lleno ? "#eef3f7" : "#7d75a0");
        if (!lleno) letra("?", x + 7, 120, 6, "#e9e4f5");
        P(x + 4, 136, 3, 6, "#5c5476");
        P(x + 13, 136, 3, 6, "#5c5476");
      }
      P(118, 112, 34, 26, envasadoraNueva ? "#5b8fd6" : "#8a8fa0"); // envasadora
      P(122, 116, 26, 8, "#15122b");
      P(124, 118, envasadoraNueva ? 22 : 10, 4, envasadoraNueva ? "#8fd694" : "#f2a65a");
      P(152, 128, 56, 4, "#3a3266"); // cinta
      botellas.forEach((b) => {
        P(b, 121, 5, 7, "#f3eee4");
        P(b + 1, 119, 3, 2, "#ef6f6c");
      });
      P(214, 96, 30, 44, "#e9e4f5");
      P(218, 102, 22, 30, "#bcd6e6"); // cámara de frío
      letra("FRIO", 218, 138, 6, "#3a3266");
      P(258, 124, 40, 18, "#f3eee4");
      P(292, 128, 12, 14, "#d8d2c6"); // camioneta
      P(262, 140, 7, 7, "#15122b");
      P(286, 140, 7, 7, "#15122b");
      sprite(PERSONA, 190 + Math.round(Math.sin(t / 40)), 134);
    };

    const quieto = matchMedia("(prefers-reduced-motion: reduce)");
    const cuadro = (ms: number) => {
      if (ms - ultimo > 50 || !ultimo) {
        ultimo = ms;
        t++;
        const { velocidad } = estado.current;
        if (!quieto.matches) {
          if (t % Math.max(4, Math.round(10 / velocidad)) === 0) botellas.push(152);
          botellas = botellas.map((b) => b + 0.8 * velocidad).filter((b) => b < 206);
        }
        fondo();
        planta();
      }
      pedido = requestAnimationFrame(cuadro);
    };
    // La letra pixelada tiene que estar cargada antes de escribir el cartel.
    let vivo = true;
    document.fonts.ready.then(() => {
      if (vivo) pedido = requestAnimationFrame(cuadro);
    });
    return () => {
      vivo = false;
      cancelAnimationFrame(pedido);
    };
  }, [fuente]);

  return (
    <canvas
      ref={ref}
      width={320}
      height={180}
      role="img"
      aria-label="Escena en pixel art: la planta de Lácteos Valle Alto en Punata, al atardecer, con el cerro Tunari al fondo"
    />
  );
}
