import type { Podcast } from "@/lib/types";

/**
 * LISTA DE PODCASTS
 *
 * Agregá un objeto por episodio. Las plataformas soportadas son "ivoox" y "youtube".
 * Los enlaces son externos: el sitio NO aloja audio/video, solo redirige.
 */
export const PODCASTS: Podcast[] = [
  {
    titulo: "[EPISODIO PLACEHOLDER] Introducción a la estadística para psicólogos",
    plataforma: "ivoox",
    url: "https://www.ivoox.com/",
    descripcion:
      "Breve introducción al rol de la estadística descriptiva en la investigación psicológica.",
    fecha: "2025-03-15",
    duracion: "28 min",
  },
  {
    titulo: "[EPISODIO PLACEHOLDER] Cómo leer un estado de resultados en 10 minutos",
    plataforma: "youtube",
    url: "https://www.youtube.com/",
    descripcion:
      "Recorrido rápido por los rubros clave del estado de resultados.",
    fecha: "2025-02-02",
    duracion: "12 min",
  },
  {
    titulo: "[EPISODIO PLACEHOLDER] Series de tiempo: lo que no te enseñan en la primera clase",
    plataforma: "ivoox",
    url: "https://www.ivoox.com/",
    descripcion:
      "Errores frecuentes al estimar modelos ARIMA y cómo evitarlos.",
    fecha: "2025-01-18",
    duracion: "41 min",
  },
];
