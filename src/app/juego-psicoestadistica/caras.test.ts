import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CARA } from "./Mesa";

describe("caras del diálogo", () => {
  it("cada personaje que habla tiene su imagen en el arte propio", () => {
    for (const [quien, archivo] of Object.entries(CARA)) {
      const ruta = join(process.cwd(), "public/juego/psicoestadistica/arte", `${archivo}.png`);
      expect(existsSync(ruta), `${quien} → ${archivo}.png`).toBe(true);
    }
  });
});
