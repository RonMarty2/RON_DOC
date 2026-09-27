import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import { metadataDeHerramienta } from "@/lib/seo";
import { EscenaVentanilla } from "./EscenaVentanilla";
import "../juego-proyectos/juego.css";
import "./ventanilla.css";

// Título, descripción e imagen para compartir salen de content/materias.ts; mientras sea borrador, no se indexa.
export const metadata: Metadata = metadataDeHerramienta("/juego-aief");

const pixel = Press_Start_2P({ subsets: ["latin"], weight: "400", display: "swap" });
const dialogo = VT323({ subsets: ["latin"], weight: "400", display: "swap", variable: "--juego-pixel-dialogo" });

export default function JuegoAiefPage() {
  return (
    <div className={dialogo.variable}>
      <EscenaVentanilla fuentePixel={pixel.style.fontFamily} />
    </div>
  );
}
