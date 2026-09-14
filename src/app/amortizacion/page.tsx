import type { Metadata } from "next";
import { esBorrador } from "@/lib/publicado";
import { LaminaAmortizacion } from "./LaminaAmortizacion";

// Mientras sea borrador en content/materias.ts, no se indexa.
export const metadata: Metadata = {
  title: "Tres formas de devolver un préstamo",
  ...(esBorrador("/amortizacion") ? { robots: { index: false, follow: false } } : {}),
};

export default function AmortizacionPage() {
  return <LaminaAmortizacion />;
}
