import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import { metadataDeHerramienta } from "@/lib/seo";
import { EscenaPlanta } from "./EscenaPlanta";
import "./juego.css";

// Título, descripción e imagen para compartir salen de content/materias.ts; mientras sea borrador, no se indexa.
export const metadata: Metadata = metadataDeHerramienta("/juego-proyectos");

// Letra de los carteles (Press Start 2P) y de los diálogos (VT323). Con next/font viajan con el
// sitio, así el juego se ve igual sin internet.
const pixel = Press_Start_2P({ subsets: ["latin"], weight: "400", display: "swap" });
const dialogo = VT323({ subsets: ["latin"], weight: "400", display: "swap", variable: "--juego-pixel-dialogo" });

export default function JuegoProyectosPage() {
  return (
    <div className={dialogo.variable}>
      <EscenaPlanta fuentePixel={pixel.style.fontFamily} />
    </div>
  );
}
