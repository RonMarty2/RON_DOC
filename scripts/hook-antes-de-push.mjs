// Hook PreToolUse (Bash): antes de un `git push`, corre npm test y tsc.
// Si alguno falla (codigo de salida distinto de 0), bloquea el push.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

let entrada = {};
try {
  entrada = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}

const comando = entrada?.tool_input?.command ?? "";
if (!/\bgit\s+push\b/.test(comando)) process.exit(0);

const pasos = [
  ["npm test", ["npm", "test"]],
  ["tsc --noEmit", ["npx", "tsc", "--noEmit"]],
];

for (const [nombre, [cmd, ...args]] of pasos) {
  const r = spawnSync(cmd, args, { encoding: "utf8", shell: true });
  if (r.status !== 0) {
    const cola = `${r.stdout ?? ""}${r.stderr ?? ""}`.split("\n").slice(-25).join("\n");
    console.error(`Push bloqueado: ${nombre} fallo (codigo ${r.status}).\n${cola}`);
    process.exit(2);
  }
}
process.exit(0);
