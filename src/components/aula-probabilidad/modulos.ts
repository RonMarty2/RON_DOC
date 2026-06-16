/**
 * Navegación de la herramienta "Aula Interactiva de Probabilidad".
 *
 * Se organiza en DOS partes:
 *  - PRELUDIO "Tu mente te engaña": enganche, sesgos, sin teoría.
 *  - CONSTRUCCIÓN: de lo simple a Bayes, con los 60 estudiantes reales.
 *
 * Estilos aislados bajo la clase raíz `.aula-probabilidad`.
 */

export type ModuloId =
  | "puertas"
  | "cumpleanios"
  | "moneda"
  | "urna"
  | "condicional"
  | "bayes";

export type Parte = "preludio" | "construccion";

export interface ModuloMeta {
  id: ModuloId;
  parte: Parte;
  icono: string;
  titulo: string;
  subtitulo: string;
  resumen: string;
}

export const PARTES: Record<Parte, { etiqueta: string; descripcion: string }> = {
  preludio: {
    etiqueta: "Preludio · Tu mente te engaña",
    descripcion:
      "Tres demostraciones donde la intuición falla. El objetivo no es enseñar fórmulas todavía, sino instalar la duda: «no puedo confiar ciegamente en mi intuición».",
  },
  construccion: {
    etiqueta: "Construcción · De lo simple a Bayes",
    descripcion:
      "Ahora sí, paso a paso, con un grupo real de 60 estudiantes (el caso de Andrea). Cada peldaño sube la dificultad hasta entender por qué el positivo de Daniela significa 38% y no 90%.",
  },
};

export const MODULOS: ModuloMeta[] = [
  // ---- PRELUDIO ----
  {
    id: "puertas",
    parte: "preludio",
    icono: "🚪",
    titulo: "Las 3 puertas",
    subtitulo: "Monty Hall · sesgo del statu quo",
    resumen:
      "¿Cambiás o te quedás? La mayoría se queda por miedo a cambiar. Simulación de 1000 partidas: cambiar gana el doble.",
  },
  {
    id: "cumpleanios",
    parte: "preludio",
    icono: "🎂",
    titulo: "Los cumpleaños",
    subtitulo: "Coincidencias mágicas que son azar",
    resumen:
      "En este grupo real de 60 hay 5 fechas compartidas (¡una la comparten 4 personas!). Vemos premoniciones donde sólo hay probabilidad.",
  },
  {
    id: "moneda",
    parte: "preludio",
    icono: "🪙",
    titulo: "La moneda con racha",
    subtitulo: "La falacia del jugador",
    resumen:
      "Salió cara 5 veces seguidas, ¿la próxima es sello? No: la moneda no tiene memoria. Sigue siendo 50%.",
  },
  // ---- CONSTRUCCIÓN ----
  {
    id: "urna",
    parte: "construccion",
    icono: "🎱",
    titulo: "Probabilidad simple",
    subtitulo: "Peldaño 1 · casos favorables / posibles",
    resumen:
      "De los 60 estudiantes, 8 tienen ánimo bajo: 8/60 = 13.3%. Extraemos al azar muchas veces y la frecuencia converge a ese valor.",
  },
  {
    id: "condicional",
    parte: "construccion",
    icono: "🔎",
    titulo: "Probabilidad condicional",
    subtitulo: "Peldaño 2-3 · saber algo cambia la probabilidad",
    resumen:
      "Filtramos el aula: de los 16 que duermen mal, 4 tienen ánimo bajo = 25%, frente al 13.3% general. La información cambia la probabilidad.",
  },
  {
    id: "bayes",
    parte: "construccion",
    icono: "🧪",
    titulo: "El positivo de Daniela",
    subtitulo: "Peldaño 4-5 · el clímax (Bayes)",
    resumen:
      "Daniela dio positivo. ¿90% de probabilidad de estar mal? No: de los 21 positivos, sólo 8 tienen ánimo bajo. 8/21 = 38%.",
  },
];

export function modulosDeParte(parte: Parte): ModuloMeta[] {
  return MODULOS.filter((m) => m.parte === parte);
}
