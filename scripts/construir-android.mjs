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

const sincronizar = process.argv.includes("--sync");

console.log("→ Compilando el sitio (sin basePath, para la app)…");
correr("npx", ["next", "build"]);

console.log(`→ Copiando el sitio dentro del proyecto de Android…`);
correr("npx", ["cap", sincronizar ? "sync" : "copy", "android"]);

console.log("✔ Listo. El contenido dentro de la app ya está actualizado.");
