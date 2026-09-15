import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MathText } from "@/components/MathText";
import { armarHoja, TEMAS_HOJA, type IdTema } from "@/lib/finanzas/hoja";
import { decimalesSinLlaves, erroresKatex, problemasDeTexto } from "@/lib/revision";

const TODOS = TEMAS_HOJA.map((t) => t.id) as IdTema[];

// Lo que se imprime tiene que pasar los mismos controles que las láminas, en muchas versiones.
describe("hoja de práctica impresa", () => {
  it.each(Array.from({ length: 40 }, (_, k) => k + 1))("versión %i: fórmulas, decimales y texto en orden", (version) => {
    for (const e of armarHoja(version, TODOS, 4)) {
      const html = renderToStaticMarkup(
        <>
          <MathText>{e.pregunta}</MathText>
          {e.opciones.map((o, k) => (
            <MathText key={k}>{o}</MathText>
          ))}
          <MathText>{e.explicacion}</MathText>
        </>
      );
      expect(erroresKatex(html)).toEqual([]);
      expect(decimalesSinLlaves(html)).toEqual([]);
      expect(problemasDeTexto(e.tituloTema, html)).toEqual([]);
    }
  });
});
