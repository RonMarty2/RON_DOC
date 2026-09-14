import type { Metadata } from "next";
import { LaminaBonos } from "./LaminaBonos";

// Sin enlaces ni indexación hasta que Ronald la revise contra su dossier de Matemática Financiera.
export const metadata: Metadata = {
  title: "Bonos: precio, rendimiento y duración",
  robots: { index: false, follow: false },
};

export default function BonosPage() {
  return <LaminaBonos />;
}
