"use client";

/**
 * Las piezas del escritorio de «La ventanilla» (01-vision.md V1.10): la cara del cliente con sus cinco
 * gestos, la cola, la pared chica, el calendario, la nota adhesiva y la sumadora. Pixel art dibujado con
 * rectángulos en una grilla de 16 × 16 (coordenadas contadas, no a ojo).
 */

import { useEffect, useState, type ReactNode } from "react";

export type Gesto = "neutro" | "hablando" | "contento" | "impaciente" | "se-va";

const PIELES = ["#f2c9a0", "#d9a77a", "#b98356", "#e8b98f"];
const PELOS = ["#2c1a12", "#4a2e1c", "#15122b", "#6b4a1f", "#8a8a8a"];
const ROPAS = ["#8e7cc3", "#d4537e", "#1d9e75", "#e69138", "#6fa8dc", "#c27ba0"];

function hash(s: string) {
  let h = 0;
  for (const c of s) h = (Math.imul(h, 31) + c.charCodeAt(0)) >>> 0;
  return h;
}

/** La cara de cada persona sale de su nombre: siempre la misma para el mismo nombre. */
export function Cara({ nombre, gesto, tamano = 104, jefa }: { nombre: string; gesto: Gesto; tamano?: number; jefa?: boolean }) {
  const h = hash(nombre);
  const piel = jefa ? "#e8b98f" : PIELES[h % PIELES.length];
  const pelo = jefa ? "#8a8a8a" : PELOS[(h >> 3) % PELOS.length];
  const ropa = jefa ? "#534ab7" : ROPAS[(h >> 6) % ROPAS.length];
  const px = (x: number, y: number, w: number, hh: number, c: string, k?: string) => <rect key={k ?? `${x}-${y}-${c}`} x={x} y={y} width={w} height={hh} fill={c} />;
  const partes: ReactNode[] = [];
  // hombros y cuello
  partes.push(px(2, 13, 12, 3, ropa), px(6, 11, 4, 2, piel));
  if (gesto === "se-va") {
    partes.push(px(3, 2, 10, 10, pelo), px(4, 1, 8, 1, pelo));
  } else {
    partes.push(px(4, 3, 8, 8, piel), px(3, 2, 10, 2, pelo), px(3, 4, 1, 3, pelo), px(12, 4, 1, 3, pelo));
    if (jefa) partes.push(px(5, 6, 2, 1, "#2c2c2a", "l1"), px(9, 6, 2, 1, "#2c2c2a", "l2"), px(7, 6, 2, 1, "#2c2c2a", "l3"));
    // ojos
    const ojoY = gesto === "contento" ? 7 : 6;
    partes.push(px(5, ojoY, 1, gesto === "contento" ? 1 : 2, "#2c2c2a", "o1"), px(10, ojoY, 1, gesto === "contento" ? 1 : 2, "#2c2c2a", "o2"));
    if (gesto === "impaciente") partes.push(px(4, 5, 3, 1, "#2c2c2a", "c1"), px(9, 5, 3, 1, "#2c2c2a", "c2"));
    // boca
    if (gesto === "hablando") partes.push(px(7, 9, 2, 1, "#7a2e2e", "b1"));
    else if (gesto === "contento") partes.push(px(6, 9, 1, 1, "#7a2e2e", "b1"), px(7, 10, 2, 1, "#7a2e2e", "b2"), px(9, 9, 1, 1, "#7a2e2e", "b3"));
    else if (gesto === "impaciente") partes.push(px(6, 10, 1, 1, "#7a2e2e", "b1"), px(7, 9, 1, 1, "#7a2e2e", "b2"), px(8, 10, 1, 1, "#7a2e2e", "b3"), px(9, 9, 1, 1, "#7a2e2e", "b4"));
    else partes.push(px(6, 10, 4, 1, "#7a2e2e", "b1"));
  }
  return (
    <svg className={`ventanilla-cara gesto-${gesto}`} viewBox="0 0 16 16" width={tamano} height={tamano} shapeRendering="crispEdges" role="img" aria-label={`${nombre}, ${gesto.replace("-", " ")}`}>
      {partes}
    </svg>
  );
}

/** Las cabecitas de la cola detrás del vidrio. */
export function Cola({ cuantos }: { cuantos: number }) {
  return (
    <div className="ventanilla-cola" aria-label={`${cuantos} en la cola`}>
      {Array.from({ length: Math.min(cuantos, 4) }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}

/** La pared chica: una ficha por carpeta; boca abajo hasta el cierre. */
export function ParedChica({ fichas }: { fichas: (string | null)[] }) {
  const lista = fichas.length === 0 ? [null, null, null] : fichas;
  return (
    <div className="ventanilla-paredchica" aria-label="La pared">
      {lista.map((f, i) => (
        <span key={i} className={f ?? "boca-abajo"} />
      ))}
    </div>
  );
}

/** El calendario: pasa hojas cuando se adelanta el tiempo. */
export function Calendario({ pasando }: { pasando: boolean }) {
  const meses = ["DIC", "ENE", "FEB", "MAR"];
  const [k, setK] = useState(0);
  useEffect(() => {
    if (!pasando) return setK(0);
    const t = window.setInterval(() => setK((x) => Math.min(x + 1, meses.length - 1)), 220);
    return () => window.clearInterval(t);
  }, [pasando]);
  return (
    <div className={pasando ? "ventanilla-calendario pasando" : "ventanilla-calendario"} aria-hidden>
      <span>{meses[k]}</span>
    </div>
  );
}

/** La nota adhesiva de Doña Teresa: así llega la escalera de ayuda. */
export function NotaAdhesiva({ lineas, leer }: { lineas: string[]; leer?: string | null }) {
  if (lineas.length === 0 && !leer) return null;
  return (
    <div className="ventanilla-postit" role="note">
      {lineas.map((l) => (
        <p key={l}>{l}</p>
      ))}
      {leer && <p className="leer">📖 {leer}</p>}
    </div>
  );
}

/**
 * La sumadora del juego: reemplaza al teclado del celular, que tapa la cifra. Con `operaciones`, hace
 * cuentas (× ÷ =) y muestra la tirita; lo que va a la casilla es lo que se anota, no lo que calcula sola.
 */
export function Sumadora({
  valor,
  cambiar,
  anotar,
  etiqueta,
  operaciones,
}: {
  valor: string;
  /** Con actualización funcional: cada tecla se suma sobre la anterior aunque se toquen seguidas. */
  cambiar: (f: string | ((v: string) => string)) => void;
  anotar: () => void;
  etiqueta: string;
  operaciones?: boolean;
}) {
  const [tirita, setTirita] = useState("");
  const [op, setOp] = useState<{ a: number; signo: "×" | "÷" } | null>(null);

  // Teclado físico o lector de pantalla: sigue funcionando igual.
  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) cambiar((v) => (v + e.key).slice(0, 12));
      else if (e.key === "Backspace") cambiar((v) => v.slice(0, -1));
      else if (e.key === "Enter") anotar();
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  });

  const n = () => Number(valor || "0");
  const operar = (signo: "×" | "÷") => {
    setOp({ a: n(), signo });
    setTirita(`${n().toLocaleString("es-BO")} ${signo}`);
    cambiar("");
  };
  const igual = () => {
    if (!op) return;
    const r = op.signo === "×" ? op.a * n() : n() === 0 ? 0 : op.a / n();
    const redondo = Math.round(r * 100) / 100;
    setTirita(`${tirita} ${n().toLocaleString("es-BO")} = ${redondo.toLocaleString("es-BO")}`);
    setOp(null);
    cambiar(String(Math.round(redondo)));
  };

  const teclas = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "000"];
  return (
    <div className="ventanilla-sumadora" aria-label={`Sumadora: ${etiqueta}`}>
      <div className="visor">
        {tirita && <span className="tirita">{tirita}</span>}
        <output aria-live="polite">{valor ? Number(valor).toLocaleString("es-BO") : "0"}</output>
      </div>
      <div className="teclas">
        {teclas.map((t) => (
          <button key={t} type="button" onClick={() => cambiar((v) => (v + t).replace(/^0+(?=\d)/, "").slice(0, 12))}>
            {t}
          </button>
        ))}
        <button type="button" aria-label="Borrar" onClick={() => cambiar((v) => v.slice(0, -1))}>
          ⌫
        </button>
        {operaciones && (
          <>
            <button type="button" className="op" onClick={() => operar("×")}>×</button>
            <button type="button" className="op" onClick={() => operar("÷")}>÷</button>
            <button type="button" className="op" onClick={igual}>=</button>
          </>
        )}
        <button type="button" className="anotar" onClick={anotar}>
          ANOTAR
        </button>
      </div>
    </div>
  );
}
