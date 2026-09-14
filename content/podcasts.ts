import type { Podcast } from "@/lib/types";

/**
 * LISTA DE PODCASTS
 *
 * Agrega un objeto por episodio. Las plataformas soportadas son "ivoox" y "youtube".
 * Los enlaces son externos: el sitio NO aloja audio/video, solo redirige.
 * Mientras la lista esté vacía, la sección no aparece en el sitio.
 *
 * Ejemplo:
 *   {
 *     titulo: "Cómo leer un estado de resultados en 10 minutos",
 *     plataforma: "youtube",
 *     url: "https://www.youtube.com/watch?v=...",
 *     descripcion: "Recorrido rápido por los rubros clave.",
 *     fecha: "2026-09-01",
 *     duracion: "12 min",
 *   },
 */
export const PODCASTS: Podcast[] = [];
