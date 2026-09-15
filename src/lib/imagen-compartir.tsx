import { ImageResponse } from "next/og";
import { MATERIAS } from "@content/materias";
import { claveDeHerramienta } from "@/lib/seo";

/**
 * Imagen que aparece al compartir un enlace (WhatsApp, Telegram, Facebook).
 * Se genera al compilar, una por página, con los colores del sitio.
 *
 * La letra es la Noto Sans que trae Next: es la única disponible sin bajar
 * archivos que tiene tildes y eñe (las de KaTeX no las traen).
 */

export const TAMANO_IMAGEN = { width: 1200, height: 630 };

/**
 * Entran tres renglones de descripción (unos 180 caracteres, aun con título
 * de tres renglones). Si es más larga, se queda con la primera oración (suele
 * ser el gancho); si ni eso entra, corta en un espacio.
 */
export function resumir(texto: string, maximo = 180): string {
  if (texto.length <= maximo) return texto;
  // "Mgr." o "Dr." no terminan una oración.
  const primera = texto.match(/^.+?(?<!\b(?:Mgr|Dr|Dra|Lic|Ing|Sr|Sra|Prof))[.!?](?=\s|$)/)?.[0];
  if (primera && primera.length <= maximo) return primera;
  const corte = texto.slice(0, maximo - 1);
  return `${corte.slice(0, corte.lastIndexOf(" ")).replace(/[,;:]$/, "")}…`;
}

// Mismos valores que los tokens claros de globals.css.
const PAPEL = "#faf7f0";
const TINTA = "#1a1f2e";
const TINTA_MEDIA = "#3f4557";
const TINTA_TENUE = "#5a6072";
const BORDE_FUERTE = "#c9bda3";
const ACENTO = "#9c3d1c";

export function imagenCompartir({
  contexto,
  titulo,
  descripcion,
}: {
  contexto: string;
  titulo: string;
  descripcion?: string;
}) {
  const largo = titulo.length;
  const letraTitulo = largo > 60 ? 60 : largo > 36 ? 70 : 84;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: PAPEL }}>
        <div style={{ display: "flex", width: 18, height: "100%", background: ACENTO }} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "64px 72px 56px 66px" }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 3, color: TINTA_TENUE, textTransform: "uppercase" }}>
            {contexto}
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: letraTitulo, lineHeight: 1.12, color: TINTA }}>
            {titulo}
          </div>
          {descripcion && (
            <div style={{ display: "flex", marginTop: 28, fontSize: 32, lineHeight: 1.4, color: TINTA_MEDIA }}>
              {resumir(descripcion)}
            </div>
          )}
          <div style={{ display: "flex", flex: 1 }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Los puntos de navegación de las tarjetas: la marca de las láminas. */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {[64, 40, 40, 40, 40].map((ancho, i) => (
                <div
                  key={i}
                  style={{ display: "flex", width: ancho, height: 9, marginRight: 10, borderRadius: 9, background: i === 0 ? ACENTO : BORDE_FUERTE }}
                />
              ))}
            </div>
            <div style={{ display: "flex", fontSize: 26, color: TINTA_TENUE }}>Ronald Martínez Jiménez</div>
          </div>
        </div>
      </div>
    ),
    TAMANO_IMAGEN
  );
}

type Contenido = { contexto: string; titulo: string; descripcion?: string };

/**
 * Todas las imágenes que se generan al compilar, por clave: la portada,
 * proyectos, cada materia (`materia-<slug>`) y cada aula o lámina (su ruta sin
 * barras). Los textos salen de `content/`, así que al cambiar un título la
 * imagen cambia sola.
 */
export function imagenesParaCompartir(): Record<string, Contenido> {
  const imagenes: Record<string, Contenido> = {
    portada: {
      contexto: "Cochabamba · Bolivia",
      titulo: "Aulas interactivas",
      descripcion: "Las materias que dicta, en tarjetas: cada concepto se define, se ve funcionar y se comprueba con datos reales.",
    },
    proyectos: { contexto: "Ronald Martínez Jiménez", titulo: "Proyectos", descripcion: "AXIOM y SIMPRO: las apps educativas de donde salen el aspecto y el motor financiero de este sitio." },
  };
  for (const materia of MATERIAS) {
    imagenes[`materia-${materia.slug}`] = { contexto: "Materia", titulo: materia.nombre, descripcion: materia.descripcion };
    for (const h of materia.herramientas ?? []) {
      imagenes[claveDeHerramienta(h.href)] = {
        contexto: `${materia.nombre} · ${h.tipo === "lamina" ? "Lámina" : h.tipo === "hoja" ? "Hoja de práctica" : "Aula interactiva"}`,
        titulo: h.titulo,
        descripcion: h.descripcion,
      };
    }
  }
  return imagenes;
}
