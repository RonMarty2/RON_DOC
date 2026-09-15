import { describe, expect, it } from "vitest";
import {
  anotarRespuesta,
  anotarTarjeta,
  claveLamina,
  leerProgreso,
  olvidarProgreso,
  tarjetaParaRetomar,
  type Almacen,
} from "./progreso";

function almacenDePrueba(inicial: Record<string, string> = {}): Almacen & { datos: Map<string, string> } {
  const datos = new Map(Object.entries(inicial));
  return {
    datos,
    getItem: (k) => datos.get(k) ?? null,
    setItem: (k, v) => void datos.set(k, v),
    removeItem: (k) => void datos.delete(k),
  };
}

describe("progreso de una lámina", () => {
  it("la ruta con o sin barra final es la misma lámina", () => {
    expect(claveLamina("/bonos/")).toBe(claveLamina("/bonos"));
    expect(claveLamina("/")).toBe("ron-doc-lamina:/");
  });

  it("sin nada guardado empieza vacío y abre en la primera tarjeta", () => {
    const p = leerProgreso("/bonos", almacenDePrueba());
    expect(p).toEqual({ tarjeta: 0, total: 0, vistas: [], hechos: 0, bien: 0 });
    expect(tarjetaParaRetomar(p, 12)).toBe(0);
  });

  it("recuerda la última tarjeta y las que ya vio, sin repetir", () => {
    const a = almacenDePrueba();
    anotarTarjeta("/bonos", 0, 12, a);
    anotarTarjeta("/bonos", 1, 12, a);
    anotarTarjeta("/bonos", 7, 12, a);
    anotarTarjeta("/bonos/", 1, 12, a);
    const p = leerProgreso("/bonos", a);
    expect(p.tarjeta).toBe(1);
    expect(p.vistas).toEqual([0, 1, 7]);
    expect(tarjetaParaRetomar(p, 12)).toBe(1);
  });

  it("si la lámina cambió de largo no retoma y vuelve a contar las vistas", () => {
    const a = almacenDePrueba();
    anotarTarjeta("/bonos", 5, 12, a);
    expect(tarjetaParaRetomar(leerProgreso("/bonos", a), 13)).toBe(0);
    const p = anotarTarjeta("/bonos", 2, 13, a);
    expect(p.vistas).toEqual([2]);
  });

  it("cuenta los aciertos aparte de las tarjetas", () => {
    const a = almacenDePrueba();
    anotarTarjeta("/bonos", 11, 12, a);
    anotarRespuesta("/bonos", true, a);
    anotarRespuesta("/bonos", false, a);
    anotarRespuesta("/bonos", true, a);
    const p = leerProgreso("/bonos", a);
    expect([p.bien, p.hechos]).toEqual([2, 3]);
    expect(p.tarjeta).toBe(11);
    expect(leerProgreso("/anualidades", a).hechos).toBe(0);
  });

  it("olvidar borra sólo esa lámina", () => {
    const a = almacenDePrueba();
    anotarTarjeta("/bonos", 3, 12, a);
    anotarTarjeta("/anualidades", 4, 11, a);
    olvidarProgreso("/bonos", a);
    expect(leerProgreso("/bonos", a).total).toBe(0);
    expect(leerProgreso("/anualidades", a).tarjeta).toBe(4);
  });

  it("datos rotos o manipulados no rompen la lámina", () => {
    const clave = claveLamina("/bonos");
    for (const crudo of ["{", "null", "42", '"hola"', '{"tarjeta":-3,"total":"x"}', '{"tarjeta":99,"total":12}']) {
      const p = leerProgreso("/bonos", almacenDePrueba({ [clave]: crudo }));
      expect(tarjetaParaRetomar(p, 12)).toBe(0);
    }
    const raro = leerProgreso(
      "/bonos",
      almacenDePrueba({ [clave]: '{"tarjeta":2,"total":12,"vistas":[3,3,1,40,-1,1.5,"2"],"hechos":2,"bien":9}' })
    );
    expect(raro.vistas).toEqual([1, 3]);
    expect(raro.bien).toBe(2);
  });

  it("si el navegador bloquea el almacenamiento, sigue sin guardar", () => {
    const bloqueado: Almacen = {
      getItem: () => {
        throw new Error("bloqueado");
      },
      setItem: () => {
        throw new Error("bloqueado");
      },
      removeItem: () => {
        throw new Error("bloqueado");
      },
    };
    expect(() => anotarTarjeta("/bonos", 3, 12, bloqueado)).not.toThrow();
    expect(() => anotarRespuesta("/bonos", true, bloqueado)).not.toThrow();
    expect(() => olvidarProgreso("/bonos", bloqueado)).not.toThrow();
    expect(leerProgreso("/bonos", null).tarjeta).toBe(0);
  });
});
