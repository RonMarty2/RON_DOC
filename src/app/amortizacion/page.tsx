import type { Metadata } from "next";
import { metadataDeHerramienta } from "@/lib/seo";
import { LaminaAmortizacion } from "./LaminaAmortizacion";

// Título, descripción e imagen para compartir salen de content/materias.ts; mientras sea borrador, no se indexa.
export const metadata: Metadata = metadataDeHerramienta("/amortizacion");

export default function AmortizacionPage() {
  return <LaminaAmortizacion />;
}
