// Huella de los dossiers que usa el juego: qué versión de cada uno se leyó al adaptarlo.
//
//   node scripts/huella-dossier.mjs --base "<carpeta de materias>" <archivo> [<archivo>…]
//     imprime una fila de tabla por archivo: | `ruta relativa` | fecha | huella |
//
//   node scripts/huella-dossier.mjs --base "<carpeta de materias>" --comparar docs/juego/gdd/00-adaptacion-<materia>.md
//     lee esas filas del documento y dice qué dossier cambió o ya no está.
//
// Los dossiers no se suben (el repositorio es público): la ruta se guarda relativa a la carpeta de
// materias, sin datos personales. La huella son los primeros 12 caracteres del SHA-256 del archivo:
// si el archivo cambia en algo, la huella cambia. Decidido por Ronald el 26-09 (IDEA-JUEGO §14).

import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

/** Huella corta del contenido (12 hex del SHA-256). */
export function huella(contenido) {
  return createHash("sha256").update(contenido).digest("hex").slice(0, 12);
}

/** Ruta relativa con barras normales, para que sea igual en Windows, en la nube y en otra PC. */
export function rutaRelativa(base, archivo) {
  return path.relative(base, archivo).split(path.sep).join("/");
}

export function filaDeTabla({ ruta, fecha, huella: h }) {
  return `| \`${ruta}\` | ${fecha} | \`${h}\` |`;
}

/** Filas de huella dentro de un documento: | `ruta` | AAAA-MM-DD | `huella` |. */
export function leerFilas(markdown) {
  const filas = [];
  for (const m of markdown.matchAll(/^\|\s*`([^`]+)`\s*\|\s*(\d{4}-\d{2}-\d{2})\s*\|\s*`([0-9a-f]{12})`\s*\|/gm)) {
    filas.push({ ruta: m[1], fecha: m[2], huella: m[3] });
  }
  return filas;
}

/** Compara lo anotado con lo actual. `actual(ruta)` devuelve { huella, fecha } o null si no existe. */
export function comparar(anotadas, actual) {
  return anotadas.map((f) => {
    const hoy = actual(f.ruta);
    if (!hoy) return { ...f, estado: "no está" };
    return { ...f, estado: hoy.huella === f.huella ? "igual" : "cambió", fechaActual: hoy.fecha };
  });
}

function medir(base, ruta) {
  const archivo = path.join(base, ruta);
  if (!existsSync(archivo)) return null;
  return { huella: huella(readFileSync(archivo)), fecha: statSync(archivo).mtime.toISOString().slice(0, 10) };
}

function principal(args) {
  const i = args.indexOf("--base");
  if (i < 0 || !args[i + 1]) throw new Error('Falta --base "<carpeta de materias>".');
  const base = path.resolve(args[i + 1]);
  const resto = args.filter((_, j) => j !== i && j !== i + 1);

  const c = resto.indexOf("--comparar");
  if (c >= 0) {
    const doc = resto[c + 1];
    const filas = leerFilas(readFileSync(doc, "utf8"));
    if (!filas.length) {
      console.log(`${doc} no tiene filas de huella todavía.`);
      return 0;
    }
    const resultado = comparar(filas, (ruta) => medir(base, ruta));
    for (const r of resultado) {
      const marca = r.estado === "igual" ? "🟢" : r.estado === "cambió" ? "🟠" : "🔴";
      console.log(`${marca} ${r.estado.padEnd(7)} ${r.ruta}${r.estado === "cambió" ? ` (anotado ${r.fecha}, ahora ${r.fechaActual})` : ""}`);
    }
    const distintos = resultado.filter((r) => r.estado !== "igual").length;
    console.log(
      distintos
        ? `\n${distintos} dossier(s) distinto(s) de lo que se usó. Revisar sólo si cambió un concepto, una fórmula o la lista de temas.`
        : "\nTodos los dossiers siguen iguales a los que se usaron.",
    );
    return 0;
  }

  console.log("| Dossier (relativo a la carpeta de materias) | Fecha del archivo | Huella |");
  console.log("|---|---|---|");
  for (const a of resto) {
    const archivo = path.resolve(a);
    const ruta = rutaRelativa(base, archivo);
    const m = medir(base, ruta);
    if (!m) throw new Error(`No existe: ${archivo}`);
    console.log(filaDeTabla({ ruta, ...m }));
  }
  return 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    process.exitCode = principal(process.argv.slice(2));
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  }
}
