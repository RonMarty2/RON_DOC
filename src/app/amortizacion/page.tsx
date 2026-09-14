import type { Metadata } from "next";
import { LaminaAmortizacion } from "./LaminaAmortizacion";

// Sin enlaces ni indexación hasta que Ronald la revise contra su dossier de Matemática Financiera.
export const metadata: Metadata = {
  title: "Tres formas de devolver un préstamo",
  robots: { index: false, follow: false },
};

export default function AmortizacionPage() {
  return <LaminaAmortizacion />;
}
