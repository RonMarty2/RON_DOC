import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { MathText } from "@/components/MathText";
import type { LaminaShellProps } from "@/components/lamina/LaminaShell";
import { decimalesSinLlaves, erroresKatex, problemasDeTexto } from "@/lib/revision";

// Revisa TODAS las tarjetas de cada lámina, no sólo la primera (que es la única
// que queda en el HTML compilado). Corre en el deploy: si algo falla, no se publica.

// La lámina se "abre" sin navegador: en vez de mostrar la tarjeta actual, se guarda la lista entera.
let capturada: LaminaShellProps | null = null;
vi.mock("@/components/lamina/LaminaShell", async (original) => ({
  ...(await original<typeof import("@/components/lamina/LaminaShell")>()),
  LaminaShell: (props: LaminaShellProps) => {
    capturada = props;
    return null;
  },
}));

const { LaminaInteresCompuesto } = await import("./interes-compuesto/LaminaInteresCompuesto");
const { LaminaAnualidades } = await import("./anualidades/LaminaAnualidades");
const { LaminaAmortizacion } = await import("./amortizacion/LaminaAmortizacion");
const { LaminaBonos } = await import("./bonos/LaminaBonos");
const { LaminaDepreciaciones } = await import("./depreciaciones/LaminaDepreciaciones");
const { LaminaBayes } = await import("./muestra/LaminaBayes");

// Al crear una lámina nueva, sumarla acá.
const LAMINAS = {
  "/interes-compuesto": LaminaInteresCompuesto,
  "/anualidades": LaminaAnualidades,
  "/amortizacion": LaminaAmortizacion,
  "/bonos": LaminaBonos,
  "/depreciaciones": LaminaDepreciaciones,
  "/muestra": LaminaBayes,
};

function abrir(Lamina: () => React.ReactNode) {
  capturada = null;
  renderToStaticMarkup(<Lamina />);
  if (!capturada) throw new Error("La lámina no usó LaminaShell");
  return capturada as LaminaShellProps;
}

describe("los controles detectan lo que buscan", () => {
  it("una fórmula rota, un decimal sin llaves, un guion largo y voseo", () => {
    const html = renderToStaticMarkup(<MathText>{"Si podés — mira $\\frac{1}{$ y $0,88$ pero no $0{,}88$"}</MathText>);
    expect(erroresKatex(html)).toHaveLength(1);
    expect(decimalesSinLlaves(html)).toEqual(["0,88"]);
    expect(problemasDeTexto("Paso 1", html)).toEqual(["guion largo (—)", "podés"]);
  });

  it("no confunde palabras en tuteo que se parecen", () => {
    const html = renderToStaticMarkup(<MathText>{"Tú ves que elegí bien; los positivos y $x - 1$"}</MathText>);
    expect(problemasDeTexto("Ojo", html)).toEqual([]);
  });
});

describe.each(Object.entries(LAMINAS))("lámina %s", (_ruta, Lamina) => {
  const { titulo, diapositivas } = abrir(Lamina);
  const tarjetas = diapositivas.map((d, n) => ({
    nombre: `${n + 1}. ${d.etiqueta}`,
    etiqueta: d.etiqueta,
    html: renderToStaticMarkup(<>{d.contenido}</>),
  }));

  it("tiene título, más de una tarjeta y termina en la práctica", () => {
    expect(titulo.trim()).not.toBe("");
    expect(tarjetas.length).toBeGreaterThan(1);
    expect(tarjetas[tarjetas.length - 1].etiqueta).toMatch(/practícalo/i);
  });

  it.each(tarjetas)("$nombre: fórmulas sin error de KaTeX", ({ html }) => {
    expect(erroresKatex(html)).toEqual([]);
  });

  it.each(tarjetas)("$nombre: decimales con {,} dentro de las fórmulas", ({ html }) => {
    expect(decimalesSinLlaves(html)).toEqual([]);
  });

  it.each(tarjetas)("$nombre: sin guiones largos ni voseo", ({ etiqueta, html }) => {
    expect(problemasDeTexto(etiqueta, html)).toEqual([]);
  });
});
