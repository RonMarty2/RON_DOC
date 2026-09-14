// Sin "use client" a propósito: usado desde el servidor, la fórmula llega armada y KaTeX no viaja al navegador.
import katex from "katex";
import "katex/dist/katex.min.css";

type Segmento = {
  tipo: "texto" | "inline" | "display";
  contenido: string;
};

/** Texto con matemática entre `$...$` (en línea) o `$$...$$` (en bloque). */
export function MathText({
  children,
  className,
  block,
}: {
  children: string;
  className?: string;
  block?: boolean;
}) {
  const segmentos = parsearMath(children ?? "");
  const Envoltorio = block ? "div" : "span";

  return (
    <Envoltorio className={className}>
      {segmentos.map((seg, i) => {
        if (seg.tipo === "texto") {
          return (
            <span key={i} className="whitespace-pre-wrap">
              {seg.contenido}
            </span>
          );
        }
        const html = katex.renderToString(seg.contenido, {
          displayMode: seg.tipo === "display",
          throwOnError: false,
          strict: "ignore",
          // Con MathML oculto a la vista, un lector de pantalla puede leer la fórmula (Axiom usa sólo "html").
          output: "htmlAndMathml",
        });
        if (seg.tipo === "display") {
          return (
            <span
              key={i}
              className="my-3 block overflow-x-auto overflow-y-hidden"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        return (
          <span
            key={i}
            style={{
              // nowrap: sin esto el navegador parte "x + 1" en dos renglones.
              whiteSpace: "nowrap",
              // Consecuencia del nowrap: la fórmula ancha se desplaza en vez de salirse del celular.
              display: "inline-block",
              maxWidth: "100%",
              overflowX: "auto",
              // Obligatorio: si no, cada fracción se gana una barra de desplazamiento vertical.
              overflowY: "hidden",
              verticalAlign: "bottom",
              // KaTeX sobresale ~6px de su caja; el padding lo salva y el margen devuelve el renglón.
              paddingTop: 6,
              paddingBottom: 6,
              marginTop: -6,
              marginBottom: -6,
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </Envoltorio>
  );
}

function parsearMath(texto: string): Segmento[] {
  const resultado: Segmento[] = [];
  const regex = /(\$\$([^$]+)\$\$|\$([^$\n]+)\$)/g;
  let ultimoIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(texto)) !== null) {
    if (match.index > ultimoIdx) {
      resultado.push({ tipo: "texto", contenido: texto.slice(ultimoIdx, match.index) });
    }
    if (match[2] !== undefined) {
      resultado.push({ tipo: "display", contenido: match[2] });
    } else {
      resultado.push({ tipo: "inline", contenido: match[3] });
    }
    ultimoIdx = match.index + match[0].length;
  }

  if (ultimoIdx < texto.length) {
    resultado.push({ tipo: "texto", contenido: texto.slice(ultimoIdx) });
  }

  return resultado;
}
