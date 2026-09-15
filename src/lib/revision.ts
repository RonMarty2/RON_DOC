/**
 * Controles de texto para lo que ve el alumno, compartidos por las pruebas de
 * láminas y de la hoja de práctica: fórmulas que KaTeX no pudo dibujar,
 * decimales sin llaves, guiones largos y voseo.
 */

// Formas de voseo sin ambigüedad: no están "elegí", "pedí" ni "ves", que también existen en tuteo.
export const VOSEO = [
  "podés", "tenés", "querés", "sabés", "sos", "hacés", "fijate", "mirá", "pensá", "calculá", "probá",
  "tocá", "usá", "mové", "movés", "deslizá", "respondé", "contá", "volvé", "andá", "vení", "decí", "hacé",
  "poné", "tené", "sumá", "restá", "multiplicá", "dividí", "compará", "anotá", "recordá", "empezá", "seguí",
  "elegís", "necesitás", "pagás", "ganás", "ahorrás", "pedís", "depositás", "invertís", "cobrás", "debés",
];

export function erroresKatex(html: string) {
  return [...html.matchAll(/class="katex-error"[^>]*title="([^"]*)"/g)].map((m) => m[1]);
}

/** Fórmulas con "0,88" en vez de "0{,}88": KaTeX pone un espacio después de la coma. */
export function decimalesSinLlaves(html: string) {
  return [...html.matchAll(/<annotation encoding="application\/x-tex">([\s\S]*?)<\/annotation>/g)]
    .map((m) => m[1])
    .filter((tex) => /\d,\d/.test(tex));
}

/** Guiones largos y voseo en el texto que ve el alumno (sin etiquetas ni el TeX para lectores de pantalla). */
export function problemasDeTexto(etiqueta: string, html: string) {
  const texto = `${etiqueta} ${html
    .replace(/<annotation[^>]*>[\s\S]*?<\/annotation>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;|&#\d+;/g, " ")}`;
  return [
    ...(texto.includes("—") ? ["guion largo (—)"] : []),
    ...VOSEO.filter((f) => new RegExp(String.raw`(?<!\p{L})${f}(?!\p{L})`, "iu").test(texto)),
  ];
}
