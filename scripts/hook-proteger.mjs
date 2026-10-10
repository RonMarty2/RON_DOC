// Hook PreToolUse (Edit/Write/MultiEdit): bloquea editar lo que no se edita a mano.
//  - src/lib/simpro/: copia del motor de SimuladorPRO; si esta mal se arregla alla y se vuelve a copiar (FUENTES.md).
//  - package-lock.json: lo escribe npm, no una edicion.
import { readFileSync } from "node:fs";

let entrada = {};
try {
  entrada = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}

const ruta = String(entrada?.tool_input?.file_path ?? "").replaceAll("\\", "/");
if (/\/src\/lib\/simpro\//.test(ruta)) {
  console.error("Bloqueado: src/lib/simpro/ es una copia del motor de SimuladorPRO. Se arregla en ese repo y se vuelve a copiar (ver FUENTES.md). Si Ronald lo autoriza, desactiva este hook en .claude/settings.json.");
  process.exit(2);
}
if (/\/package-lock\.json$/.test(ruta)) {
  console.error("Bloqueado: package-lock.json lo escribe npm. Usa npm install, no una edicion directa.");
  process.exit(2);
}
process.exit(0);
