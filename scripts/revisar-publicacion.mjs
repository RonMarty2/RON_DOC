// Controles de publicación de RON_DOC. Sólo lee: no publica, no cambia variables, no toca Supabase.
//
//   node scripts/revisar-publicacion.mjs [--rapido]
//
// Revisa el repositorio donde está este archivo (sirve igual en la PC, la portátil o la nube).
// --rapido salta la compilación (lo más lento). Nació el 25-09-2026, cuando el proyecto de Supabase
// estaba pausado y el deploy no le pasaba las variables al juego, y ningún control lo vio.
// Lo usa el agente .claude/agents/revisar-publicacion.md.

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITIO = "https://ronmarty2.github.io/RON_DOC";
const REPO_GH = "RonMarty2/RON_DOC";
const rapido = process.argv.includes("--rapido");

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const hallazgos = []; // { nivel: "🔴" | "🟠" | "🟢", que, detalle }
const anotar = (nivel, que, detalle = "") => hallazgos.push({ nivel, que, detalle });
const correr = (cmd, opciones = {}) =>
  execSync(cmd, { cwd: repo, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opciones }).trim();
const intentar = (cmd, opciones) => {
  try {
    return { ok: true, salida: correr(cmd, opciones) };
  } catch (e) {
    return { ok: false, salida: `${e.stdout ?? ""}${e.stderr ?? ""}`.trim() };
  }
};

console.log(`Revisando ${repo}\n`);

// 1. La copia de trabajo: sin cambios sueltos y al día con GitHub.
intentar("git fetch -q origin");
const sueltos = intentar("git status --porcelain").salida;
if (sueltos) anotar("🟠", "Hay cambios sin subir en la copia de trabajo", sueltos.split("\n").slice(0, 8).join(" | "));
else anotar("🟢", "Copia de trabajo sin cambios sueltos");
const [atras, adelante] = intentar("git rev-list --left-right --count origin/main...HEAD").salida.split(/\s+/).map(Number);
if (atras) anotar("🟠", `La copia está ${atras} commit(s) atrás de GitHub`, "git pull --ff-only antes de trabajar");
if (adelante) anotar("🟠", `Hay ${adelante} commit(s) sin subir a GitHub`);
if (!atras && !adelante) anotar("🟢", "Copia igual a GitHub (main)");

// 2. Pruebas, tipos y compilación: lo mismo que exige el deploy.
const pruebas = intentar("npx vitest run", { timeout: 300000 });
const resumen = (pruebas.salida.match(/Tests\s+[^\n]+/) ?? ["?"])[0];
anotar(pruebas.ok ? "🟢" : "🔴", pruebas.ok ? `Pruebas: ${resumen}` : "Fallan pruebas: el deploy no va a publicar", pruebas.ok ? "" : resumen);
const tipos = intentar("npx tsc --noEmit", { timeout: 300000 });
anotar(tipos.ok ? "🟢" : "🔴", tipos.ok ? "Tipos sin errores" : "Errores de tipos", tipos.ok ? "" : tipos.salida.split("\n").slice(0, 5).join(" | "));
if (rapido) anotar("🟠", "Compilación no revisada (--rapido)");
else {
  const build = intentar("npm run build", { timeout: 600000 });
  anotar(build.ok ? "🟢" : "🔴", build.ok ? "Compila" : "No compila", build.ok ? "" : build.salida.split("\n").slice(-6).join(" | "));
}

// 3. Variables de Supabase: que existan en GitHub y que el deploy se las pase al build.
const variables = {};
for (const linea of intentar(`gh variable list -R ${REPO_GH}`).salida.split("\n")) {
  const [nombre, valor] = linea.split("\t");
  if (nombre) variables[nombre] = valor ?? "";
}
for (const v of ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]) {
  if (variables[v]) anotar("🟢", `Variable ${v} cargada en GitHub`);
  else anotar("🔴", `Falta la variable ${v} en GitHub`, "sin ella el juego guarda sólo en el navegador");
}
const deploy = readFileSync(path.join(repo, ".github/workflows/deploy.yml"), "utf8");
for (const v of ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]) {
  if (!new RegExp(`${v}:\\s*\\$\\{\\{\\s*vars\\.${v}`).test(deploy))
    anotar("🔴", `deploy.yml no le pasa ${v} al build`, "así pasó el 25-09: las variables existían y el juego no las veía");
}
if (!existsSync(path.join(repo, ".github/workflows/mantener-supabase.yml")))
  anotar("🔴", "Falta mantener-supabase.yml", "sin él, el plan gratis pausa el proyecto tras una semana sin uso");

// 4. Supabase despierto: una lectura real con la clave pública (no se imprime).
const url = variables.NEXT_PUBLIC_SUPABASE_URL;
const clave = intentar(`gh variable get NEXT_PUBLIC_SUPABASE_ANON_KEY -R ${REPO_GH}`).salida;
if (url && clave) {
  try {
    const r = await fetch(`${url}/rest/v1/juego_partidas?select=id&limit=1`, {
      headers: { apikey: clave, Authorization: `Bearer ${clave}` },
      signal: AbortSignal.timeout(15000),
    });
    if (r.status === 200) anotar("🟢", "Supabase responde (tabla juego_partidas)");
    else if (r.status === 404) anotar("🔴", "Supabase responde pero falta la tabla juego_partidas");
    else anotar("🔴", `Supabase respondió ${r.status}`, "puede estar pausado: panel de Supabase → Resume project");
  } catch {
    anotar("🔴", "Supabase no responde", "probablemente pausado: panel de Supabase → Resume project");
  }
}

// 5. Las últimas corridas en GitHub.
for (const [flujo, nombre] of [["deploy.yml", "Deploy"], ["mantener-supabase.yml", "Mantener Supabase"]]) {
  const r = intentar(`gh run list -R ${REPO_GH} --workflow ${flujo} -L 1 --json conclusion,status,createdAt`);
  try {
    const [ultima] = JSON.parse(r.salida);
    if (!ultima) anotar("🟠", `${nombre}: todavía no corrió nunca`);
    else if (ultima.status !== "completed") anotar("🟠", `${nombre}: corriendo ahora (${ultima.createdAt})`);
    else anotar(ultima.conclusion === "success" ? "🟢" : "🔴", `${nombre}: última corrida ${ultima.conclusion} (${ultima.createdAt.slice(0, 10)})`);
  } catch {
    anotar("🟠", `${nombre}: no se pudo leer el historial de GitHub`);
  }
}

// 6. El sitio publicado: el juego lleva los datos de Supabase y los borradores no se anuncian.
try {
  const html = await (await fetch(`${SITIO}/juego-proyectos/`, { signal: AbortSignal.timeout(15000) })).text();
  const scripts = [...html.matchAll(/src="([^"]+\.js)"/g)].map((m) => new URL(m[1], `${SITIO}/`).href);
  let conSupabase = false;
  for (const s of scripts) {
    const js = await (await fetch(s, { signal: AbortSignal.timeout(15000) })).text();
    if (url && js.includes(new URL(url).host)) {
      conSupabase = true;
      break;
    }
  }
  if (url) anotar(conSupabase ? "🟢" : "🔴", conSupabase ? "El juego publicado apunta a Supabase" : "El juego publicado NO lleva los datos de Supabase", conSupabase ? "" : "volver a publicar después de cargar las variables");
} catch {
  anotar("🟠", "No se pudo abrir el juego publicado");
}
const materias = readFileSync(path.join(repo, "content/materias.ts"), "utf8");
const borradores = [...materias.matchAll(/href:\s*"([^"]+)"[^}]*?borrador:\s*true/g)].map((m) => m[1]);
try {
  const mapa = await (await fetch(`${SITIO}/sitemap.xml`, { signal: AbortSignal.timeout(15000) })).text();
  const filtrados = borradores.filter((b) => mapa.includes(`${SITIO}${b}/`));
  if (filtrados.length) anotar("🔴", "Borradores anunciados en el sitemap", filtrados.join(", "));
  else anotar("🟢", `${borradores.length} borrador(es) fuera del sitemap`, borradores.join(", "));
} catch {
  anotar("🟠", "No se pudo leer el sitemap publicado");
}

// Informe, lo grave primero.
const orden = { "🔴": 0, "🟠": 1, "🟢": 2 };
hallazgos.sort((a, b) => orden[a.nivel] - orden[b.nivel]);
for (const h of hallazgos) console.log(`${h.nivel} ${h.que}${h.detalle ? `\n     ${h.detalle}` : ""}`);
const rojos = hallazgos.filter((h) => h.nivel === "🔴").length;
console.log(`\n${rojos ? `${rojos} problema(s) que bloquean` : "Nada bloquea la publicación"}.`);
process.exitCode = rojos ? 1 : 0;
