import { afterEach, describe, expect, it } from "vitest";
import { codigoDelRegreso } from "./juego/nube";
import { REGRESO_APP, esApp } from "./nativo";

describe("app de Android", () => {
  afterEach(() => {
    delete (globalThis as { window?: unknown }).window;
  });

  it("fuera de la app (y en el servidor) nunca es app", () => {
    expect(esApp()).toBe(false);
    (globalThis as { window?: unknown }).window = {};
    expect(esApp()).toBe(false);
    (globalThis as { window?: unknown }).window = { Capacitor: { isNativePlatform: () => false } };
    expect(esApp()).toBe(false);
  });

  it("dentro de la app sí", () => {
    (globalThis as { window?: unknown }).window = { Capacitor: { isNativePlatform: () => true } };
    expect(esApp()).toBe(true);
  });

  it("saca el código del regreso de Supabase, y nada si volvió con error", () => {
    expect(codigoDelRegreso(`${REGRESO_APP}?code=abc-123`)).toBe("abc-123");
    expect(codigoDelRegreso(`${REGRESO_APP}?code=abc&otra=1#x`)).toBe("abc");
    expect(codigoDelRegreso(`${REGRESO_APP}?error=access_denied&error_description=No`)).toBeNull();
    expect(codigoDelRegreso(REGRESO_APP)).toBeNull();
  });

  it("la dirección de regreso es la que declara el AndroidManifest", async () => {
    const { readFileSync } = await import("node:fs");
    const manifiesto = readFileSync("android/app/src/main/AndroidManifest.xml", "utf8");
    const [esquema, host] = REGRESO_APP.split("://");
    expect(manifiesto).toContain(`android:scheme="${esquema}" android:host="${host}"`);
  });
});
