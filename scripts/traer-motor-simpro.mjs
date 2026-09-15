/**
 * Copia el motor de SimuladorPRO (../simuladorPRO) a src/lib/simpro/.
 *
 * Los archivos quedan IDÉNTICOS a los de SIMPRO salvo las rutas de import:
 * allá `@/lib/x` y `@/types/x` apuntan a su propio src/, acá todo vive bajo
 * src/lib/simpro/ (lib/ → simpro/, types/ → simpro/types/). El script
 * reescribe sólo eso, así que nada del cálculo se toca a mano.
 *
 * Uso (desde RON_DOC):
 *   node scripts/traer-motor-simpro.mjs              copia y reescribe imports
 *   node scripts/traer-motor-simpro.mjs --comprobar  no escribe; falla si la copia
 *                                                    ya no coincide con SIMPRO
 *
 * Si un archivo copiado importa algo de SIMPRO que no está en la lista, falla
 * y dice qué agregar. Después de copiar: `npm test` (corren también las pruebas
 * de SIMPRO) y anotar el commit en FUENTES.md.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const simpro = resolve(raiz, "..", "simuladorPRO", "src");

/** Rutas dentro de simuladorPRO/src. Para sumar una pieza, agregarla acá. */
export const ARCHIVOS = [
  "lib/calculo-financiero.ts",
  "lib/calculo-financiero.test.ts",
  "lib/calculo-financiero-v2.test.ts",
  "types/proyecto.ts",
  "lib/iva-proyecto.ts",
  "lib/flujo-proyecto.ts",
  "lib/escenarios.ts",
  "lib/escenarios.test.ts",
  "lib/finanzas/proyecto-financiero.ts",
  "lib/finanzas/proyecto-financiero.test.ts",
  "lib/finanzas/sensibilidad.ts",
  "lib/finanzas/api-contract.ts",
  "lib/laboratorio-viabilidad.ts",
  "lib/laboratorio-viabilidad.test.ts",
  "lib/proyecto-factory.ts",
  "lib/plantillas.ts",
  "lib/plantillas.test.ts",
];

/** "lib/finanzas/x.ts" → "finanzas/x.ts"; "types/proyecto.ts" → "types/proyecto.ts" (dentro de src/lib/simpro). */
export function destinoDe(rutaSimpro) {
  if (rutaSimpro.startsWith("lib/")) return rutaSimpro.slice("lib/".length);
  if (rutaSimpro.startsWith("types/")) return rutaSimpro;
  throw new Error(`Sólo se copian archivos de lib/ o types/: ${rutaSimpro}`);
}

function sinExtension(ruta) {
  return ruta.replace(/\.(ts|tsx)$/, "");
}

/**
 * Reescribe los imports de un archivo de SIMPRO para su lugar en RON_DOC.
 * `existe(rutaSimproSinExtension)` dice si ese módulo está en la lista.
 */
export function reescribirImports(codigo, rutaSimpro, existe) {
  const carpetaOrigen = posix.dirname(rutaSimpro);
  const carpetaDestino = posix.dirname(destinoDe(rutaSimpro));
  const faltan = [];

  const nuevo = codigo.replace(
    /(\bfrom\s*|\bimport\s*\(\s*|\bvi\.mock\s*\(\s*|^\s*import\s+)(["'])([^"']+)\2/gm,
    (todo, antes, comilla, especificador) => {
      let objetivo = null;
      if (especificador.startsWith("@/lib/") || especificador.startsWith("@/types/")) {
        objetivo = especificador.slice(2);
      } else if (especificador.startsWith(".")) {
        objetivo = posix.normalize(posix.join(carpetaOrigen, especificador));
      } else {
        return todo;
      }
      if (!objetivo.startsWith("lib/") && !objetivo.startsWith("types/")) {
        faltan.push(objetivo);
        return todo;
      }
      if (!existe(sinExtension(objetivo))) {
        faltan.push(objetivo);
        return todo;
      }
      let relativo = posix.relative(carpetaDestino, sinExtension(destinoDe(`${sinExtension(objetivo)}.ts`)));
      if (!relativo.startsWith(".")) relativo = `./${relativo}`;
      return `${antes}${comilla}${relativo}${comilla}`;
    }
  );
  return { codigo: nuevo, faltan };
}

function main() {
  const comprobar = process.argv.includes("--comprobar");
  if (!existsSync(simpro)) {
    console.error(`No encuentro ${simpro}: SimuladorPRO tiene que estar clonado al lado de RON_DOC.`);
    process.exit(1);
  }
  const modulos = new Set(ARCHIVOS.map(sinExtension));
  const existe = (m) => modulos.has(m);
  const problemas = [];
  const distintos = [];

  for (const ruta of ARCHIVOS) {
    const origen = join(simpro, ruta);
    if (!existsSync(origen)) {
      problemas.push(`${ruta} ya no existe en SIMPRO`);
      continue;
    }
    const { codigo, faltan } = reescribirImports(readFileSync(origen, "utf8"), ruta, existe);
    for (const f of faltan) problemas.push(`${ruta} importa ${f}, que no está en la lista ARCHIVOS`);
    const destino = join(raiz, "src", "lib", "simpro", destinoDe(ruta));
    if (comprobar) {
      const actual = existsSync(destino) ? readFileSync(destino, "utf8").replace(/\r\n/g, "\n") : null;
      if (actual !== codigo.replace(/\r\n/g, "\n")) distintos.push(ruta);
    } else {
      mkdirSync(dirname(destino), { recursive: true });
      writeFileSync(destino, codigo);
    }
  }

  if (problemas.length > 0) {
    console.error(`[motor-simpro] problemas:\n  ${problemas.join("\n  ")}`);
    process.exit(1);
  }
  if (comprobar) {
    if (distintos.length > 0) {
      console.error(`[motor-simpro] la copia no coincide con SIMPRO en:\n  ${distintos.join("\n  ")}\nCorrer sin --comprobar para traer la versión nueva.`);
      process.exit(1);
    }
    console.log(`[motor-simpro] los ${ARCHIVOS.length} archivos coinciden con SIMPRO.`);
  } else {
    console.log(`[motor-simpro] copiados ${ARCHIVOS.length} archivos a src/lib/simpro/.`);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
