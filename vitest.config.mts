import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Los alias son los mismos de tsconfig.json, para que las pruebas puedan renderizar láminas enteras.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@content": fileURLToPath(new URL("./content", import.meta.url)),
    },
  },
  oxc: { jsx: { runtime: "automatic" } },
});
