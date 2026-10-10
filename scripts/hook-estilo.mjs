// Hook PostToolUse (Edit/Write/MultiEdit): avisa de guiones largos y voseo en lo que lee el alumno.
// Revisa solo content/**.mdx, ejercicios/ y src/app/**.tsx (sin tests). No bloquea: devuelve el aviso a Claude.
// El control completo y exacto sigue siendo `npm test` (src/lib/revision.ts); este es un aviso rapido.
import { readFileSync, existsSync } from "node:fs";

let entrada = {};
try {
  entrada = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}

const ruta = String(entrada?.tool_input?.file_path ?? "").replaceAll("\\", "/");
const aplica =
  (/\/content\/.+\.(mdx|md)$/.test(ruta)) ||
  (/\/ejercicios\/.+\.(tex|md|mdx)$/.test(ruta)) ||
  (/\/src\/app\/.+\.tsx$/.test(ruta) && !/\.test\.tsx$/.test(ruta));
if (!aplica || !existsSync(ruta)) process.exit(0);

const VOSEO = /(?<!\p{L})(vos|sos|tenés|podés|querés|sabés|hacés|decís|ves\?|fijate|mirá|calculá|contá|volvé|pedí|escribí|resolvelo|sumale|invertís|tomás|elegí|pensá|fijá|probá|usá|dale|andá|poné|sacá|tené|hacé|decime|decile|fijense)(?!\p{L})/giu;
const hallazgos = [];
readFileSync(ruta, "utf8").split("\n").forEach((linea, i) => {
  if (/^\s*(\/\/|\*|\/\*|\{\/\*)/.test(linea)) return; // comentarios de codigo: no los lee el alumno
  if (linea.includes("—")) hallazgos.push(`linea ${i + 1}: guion largo (—)`);
  const v = [...new Set([...linea.matchAll(VOSEO)].map((m) => m[1].toLowerCase()))];
  if (v.length) hallazgos.push(`linea ${i + 1}: posible voseo (${v.join(", ")})`);
});

if (hallazgos.length) {
  console.error(`Aviso de estilo en ${ruta.split("/").slice(-3).join("/")}:\n${hallazgos.slice(0, 15).join("\n")}\nRegla: tuteo siempre y sin guiones largos. Corrige si es texto del alumno; ignora si es codigo o falsa alarma.`);
  process.exit(2);
}
process.exit(0);
