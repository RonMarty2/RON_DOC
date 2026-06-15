/**
 * Tipos del sistema de contenido del sitio.
 *
 * Todo el contenido se define en `content/` como objetos TS más archivos MDX.
 * El sitio se genera estáticamente leyendo estos archivos al hacer `next build`.
 */

export type ColorAcento = "azul" | "verde" | "morado" | "naranja";

export interface Recurso {
  /** Título visible (ej. "Resumen de la unidad 1"). */
  titulo: string;
  /** Ruta del archivo dentro de /public (ej. "/recursos/psicoestadistica/u1.pdf"). */
  archivo: string;
  /** Tamaño legible opcional (ej. "1.2 MB"). */
  tamanio?: string;
  /** Descripción corta opcional. */
  descripcion?: string;
  /** Si es `true` muestra un visor embebido (iframe) colapsable. Por defecto `false`. */
  embebido?: boolean;
}

export interface Interactivo {
  /** Ruta del HTML dentro de /public/interactivos/ (ej. "/interactivos/pearson_pizarra.html"). */
  src: string;
  /** Título visible sobre el iframe. */
  titulo: string;
  /** Descripción corta opcional. */
  descripcion?: string;
  /** Altura del iframe (ej. "600px"). Default: "600px". */
  alto?: string;
}

export interface Tema {
  /** Slug de la URL (ej. "correlacion-pearson"). */
  slug: string;
  /** Título del tema. */
  titulo: string;
  /** Resumen corto para la tarjeta. */
  resumen: string;
  /** Nombre del archivo MDX dentro de content/temas/[materia]/ (sin extensión). */
  archivoMdx: string;
  recursos?: Recurso[];
  interactivos?: Interactivo[];
}

export interface Materia {
  slug: string;
  nombre: string;
  descripcion: string;
  /** Color de acento de la materia, mapea a clases Tailwind preestablecidas. */
  color: ColorAcento;
  /** Emoji o símbolo corto para identificar visualmente la materia. */
  icono: string;
  temas: Tema[];
  /** Herramientas/apps interactivas asociadas a la materia (opcional). */
  herramientas?: HerramientaMateria[];
}

/**
 * Herramienta interactiva (mini-app) ligada a una materia. A diferencia de un
 * tema, no es contenido lineal sino una app con su propia ruta.
 */
export interface HerramientaMateria {
  /** Path absoluto al que linkea la tarjeta (ej. "/aula-probabilidad"). */
  href: string;
  titulo: string;
  descripcion: string;
  /** Emoji o símbolo corto. */
  icono: string;
}

export interface Podcast {
  titulo: string;
  plataforma: "ivoox" | "youtube";
  /** URL externa (se abre en nueva pestaña). */
  url: string;
  descripcion: string;
  /** Fecha en formato ISO (YYYY-MM-DD) opcional, para ordenar y mostrar. */
  fecha?: string;
  /** Duración legible opcional (ej. "32 min"). */
  duracion?: string;
}

/**
 * Proyecto externo: una app, herramienta o sitio que mantenés en otro repo/dominio.
 * El sitio sólo enlaza, no aloja nada.
 */
export interface Proyecto {
  slug: string;
  titulo: string;
  /** Resumen para la tarjeta. */
  descripcion: string;
  /** URL pública del proyecto (se abre en nueva pestaña). */
  url: string;
  /** Estado del proyecto, para badge visual. */
  estado: "en-linea" | "beta" | "en-desarrollo" | "archivado";
  /** Emoji o símbolo corto. */
  icono: string;
  /** Tags cortos (ej. "estadística", "react", "PDF"). */
  tags?: string[];
  /** Año de lanzamiento o última actualización mayor (opcional). */
  anio?: number;
}

/**
 * Resumen agregado de tesis dirigidas/revisadas. No incluye datos personales
 * de estudiantes ni de instituciones para respetar privacidad.
 */
export interface AreaTesis {
  /** Nombre del área (ej. "Análisis financiero aplicado"). */
  nombre: string;
  /** Cantidad de tesis acompañadas en esa área. */
  cantidad: number;
  /** Descripción opcional del tipo de trabajos que se abordan. */
  descripcion?: string;
}
