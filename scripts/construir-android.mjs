/**
 * Compila el sitio y lo copia adentro del proyecto de Android.
 *
 * Existe por dos motivos:
 *
 *  1. Para Android hay que compilar SIN basePath (la app no se sirve desde
 *     /RON_DOC sino desde la raíz local del teléfono). Antes eso se hacía con
 *     `NEXT_PUBLIC_BASE_PATH= next build`, que es sintaxis de shell de Unix y
 *     falla en la consola de Windows. Acá la variable se define desde Node, así
 *     que funciona igual en Windows, Mac y Linux.
 *
 *  2. Gradle lo llama solo antes de compilar la app (ver android/app/build.gradle),
 *     para que apretar ▶ en Android Studio instale SIEMPRE el contenido nuevo.
 *     Sin esto había que acordarse de correr el comando a mano, y si te
 *     olvidabas la app se instalaba con el contenido viejo sin avisar nada.
 *
 * Uso:
 *   node scripts/construir-android.mjs           compila y copia
 *   node scripts/construir-android.mjs --sync    además actualiza los plugins
 *                                                nativos (sólo hace falta si
 *                                                se agregó o quitó un plugin)
 */

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const esWindows = process.platform === "win32";

function correr(comando, args) {
  const r = spawnSync(esWindows ? `${comando}.cmd` : comando, args, {
    cwd: raiz,
    stdio: "inherit",
    // En Windows los ejecutables de npm son .cmd y necesitan shell.
    shell: esWindows,
    env: {
      ...process.env,
      // Vacío a propósito: dentro de la app no hay subcarpeta /RON_DOC.
      NEXT_PUBLIC_BASE_PATH: "",
    },
  });
  if (r.status !== 0) {
    process.exit(r.status ?? 1);
  }
}

/*
 * Capacitor 8 exige Node 22 o superior. Next se conforma con menos, así que sin
 * este control el error aparecía DESPUÉS de compilar el sitio entero —más de un
 * minuto perdido— y con la forma «[fatal] The Capacitor CLI requires NodeJS
 * >=22.0.0», que no dice cómo arreglarlo en Windows.
 */
const NODE_MINIMO = 22;
const versionActual = Number(process.versions.node.split(".")[0]);
if (versionActual < NODE_MINIMO) {
  console.error(`
  Tu versión de Node.js es la ${process.versions.node} y hace falta la ${NODE_MINIMO} o superior.

  Qué hacer:

    1. Entrá a https://nodejs.org y descargá la versión LTS.
       En Windows es un instalador .msi: siguiente, siguiente, listo.
    2. CERRÁ Android Studio por completo y volvé a abrirlo.
       Si no, sigue usando la versión vieja que tenía en memoria.
    3. Verificá en la terminal (Alt+F12):   node -v
    4. Volvé a apretar ▶ Run.

  (Lo pide Capacitor, la herramienta que empaqueta el sitio como app.)
`);
  process.exit(1);
}

const sincronizar = process.argv.includes("--sync");

console.log("→ Compilando el sitio (sin basePath, para la app)…");
correr("npx", ["next", "build"]);

console.log(`→ Copiando el sitio dentro del proyecto de Android…`);
correr("npx", ["cap", sincronizar ? "sync" : "copy", "android"]);

console.log("✔ Listo. El contenido dentro de la app ya está actualizado.");
