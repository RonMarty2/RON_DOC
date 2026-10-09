import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import { metadataDeHerramienta } from "@/lib/seo";
import { Mesa } from "./Mesa";
import "./mesa.css";

// Título, descripción e imagen para compartir salen de content/materias.ts; mientras sea borrador, no se indexa.
export const metadata: Metadata = metadataDeHerramienta("/juego-psicoestadistica");

const pixel = Press_Start_2P({ subsets: ["latin"], weight: "400", display: "swap", variable: "--mesa-pixel" });
const dialogo = VT323({ subsets: ["latin"], weight: "400", display: "swap", variable: "--mesa-dialogo" });

export default function JuegoPsicoestadisticaPage() {
  return (
    <div className={`${pixel.variable} ${dialogo.variable} mesa-fondo`}>
      <Mesa />
    </div>
  );
}
