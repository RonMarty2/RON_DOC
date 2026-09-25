/**
 * Controles de texto para lo que ve el alumno, compartidos por las pruebas de
 * láminas y de la hoja de práctica: fórmulas que KaTeX no pudo dibujar,
 * decimales sin llaves, guiones largos y voseo.
 */

// Voseo: se listan INFINITIVOS y se generan sus formas, como en Axiom (06b691f, 16-sep). Una lista de
// formas escritas a mano sólo ve lo que alguien se acordó de escribir, y buscar "-ás/-és/-ís" marca el
// futuro de tú ("verás") y sustantivos ("interés"). De "mirar" salen "mirás", "mirá" y el imperativo con
// pronombre pegado sin tilde ("miralo", "mirale"), que en tuteo lleva tilde ("míralo") y un buscador de
// tildes no ve. Sumar un verbo es agregar una palabra.
const INFINITIVOS = [
  // consignas de lámina
  "poder", "tener", "querer", "saber", "hacer", "decir", "mirar", "pensar", "calcular", "probar", "tocar",
  "usar", "mover", "deslizar", "responder", "contar", "volver", "poner", "sumar", "restar", "multiplicar",
  "dividir", "comparar", "anotar", "recordar", "empezar", "seguir", "elegir", "necesitar", "fijar", "leer",
  "escribir", "buscar", "resolver", "obtener", "entender", "aprender", "venir", "marcar", "revisar",
  "completar", "comprobar", "verificar", "estimar", "redondear", "convertir", "despejar", "reemplazar",
  "aplicar", "ubicar", "avanzar", "cambiar", "llevar", "sacar", "dejar", "quitar", "notar", "bajar",
  "subir", "tomar", "pasar", "armar", "ordenar", "separar", "repetir", "terminar", "observar", "descontar",
  // finanzas y el juego
  "pagar", "ganar", "ahorrar", "pedir", "depositar", "invertir", "cobrar", "deber", "prestar", "comprar",
  "vender", "producir", "gastar", "decidir", "capitalizar", "amortizar", "depreciar", "defender",
  "argumentar", "explicar", "asesorar", "aconsejar", "entregar",
];

// Palabras que existen y que la regla genera: "tomate", "terminales", el nombre Tomás y las letras cambiales.
const NO_SON_VOSEO = new Set(["tomate", "terminales", "tomás", "cambiales"]);

function formasDeVoseo() {
  const formas = new Set(["sos", "vos", "andá", "vení", "decí", "dividí", "seguí", "fijate", "acordate", "date cuenta"]);
  for (const inf of INFINITIVOS) {
    const raiz = inf.slice(0, -2);
    const vocal = inf.at(-2) as "a" | "e" | "i";
    const tilde = { a: "á", e: "é", i: "í" }[vocal];
    formas.add(`${raiz}${tilde}s`);
    // El imperativo suelto de -ir ("elegí", "invertí") es también el pretérito de yo: sólo los de arriba.
    if (vocal !== "i") formas.add(`${raiz}${tilde}`);
    // Sin "se": con -ar daría "sumase", imperfecto de subjuntivo bien escrito.
    for (const pron of ["lo", "la", "los", "las", "le", "les", "me", "nos", "te"]) formas.add(`${raiz}${vocal}${pron}`);
  }
  return [...formas].filter((f) => !NO_SON_VOSEO.has(f));
}

export const VOSEO = formasDeVoseo();

// Una sola expresión con todas las formas (las largas primero), compilada una vez: son más de mil.
const HAY_VOSEO = new RegExp(
  String.raw`(?<!\p{L})(${[...VOSEO].sort((a, b) => b.length - a.length).join("|")})(?!\p{L})`,
  "giu",
);

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
    ...new Set([...texto.matchAll(HAY_VOSEO)].map((m) => m[1].toLowerCase())),
  ];
}
