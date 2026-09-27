import { describe, expect, it } from "vitest";
import { ayudaVisible, escalonDe, type AyudaDePaso } from "./escalera";

const ayuda: AyudaDePaso = { concreta: ["Revisa la etapa más lenta."], leer: { donde: "de Proyectos II (semana 2), páginas 13 a 15", que: "capacidad" } };

describe("escalera de ayuda", () => {
  it("sube un escalón por error y no pasa del tercero", () => {
    expect([0, 1, 2, 3, 7].map(escalonDe)).toEqual([null, "pista", "concreta", "leer", "leer"]);
  });

  it("muestra la pista concreta desde el segundo error y el dossier desde el tercero", () => {
    expect(ayudaVisible(1, ayuda)).toEqual({ concreta: [], leer: null });
    expect(ayudaVisible(2, ayuda)).toEqual({ concreta: ayuda.concreta, leer: null });
    expect(ayudaVisible(3, ayuda).leer).toBe("Lee en tu dossier de Proyectos II (semana 2), páginas 13 a 15: capacidad. Después vuelve a intentarlo.");
  });

  it("sin página del dossier, el tercer escalón sigue con la pista concreta", () => {
    expect(ayudaVisible(5, { concreta: ["a"] })).toEqual({ concreta: ["a"], leer: null });
  });
});
