import type { Metadata } from "next";
import { LaminaBayes } from "./LaminaBayes";

// Sin enlaces desde el sitio: es la muestra del formato de láminas para revisarlo antes de escribir las reales.
export const metadata: Metadata = {
  title: "Muestra del formato de láminas",
  robots: { index: false, follow: false },
};

export default function MuestraPage() {
  return <LaminaBayes />;
}
