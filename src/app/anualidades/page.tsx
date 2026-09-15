import type { Metadata } from "next";
import { metadataDeHerramienta } from "@/lib/seo";
import { LaminaAnualidades } from "./LaminaAnualidades";

// Título, descripción e imagen para compartir salen de content/materias.ts; mientras sea borrador, no se indexa.
export const metadata: Metadata = metadataDeHerramienta("/anualidades", "Anualidades");

export default function AnualidadesPage() {
  return <LaminaAnualidades />;
}
