"use client";

import { useMemo, useState } from "react";
import { combinaciones, permutaciones, contar, phq9Positivo } from "./calculos";
import { Definicion, Formula, Frac, V, Trampa, Puente, MiniHistoria } from "./narrativa";

const LETRAS = ["A", "B", "C", "D", "E", "F"];

/**
 * 2.4 — Teoría combinatoria.
 *
 * La pregunta que decide todo es una sola: ¿importa el orden? El interactivo
 * la vuelve visible enumerando de verdad los grupos posibles con un conjunto
 * chico, antes de saltar a C(43,5).
 */
export function ModuloCombinatoria({ onContinuar }: { onContinuar: () => void }) {
  const positivos = contar(phq9Positivo);
  const c = combinaciones(positivos, 5);
  const pr = permutaciones(positivos, 5);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-slate-700 dark:text-slate-300">
        El servicio tiene {positivos} estudiantes marcados como positivos y
        capacidad para entrevistar a 5 esta semana. La pregunta administrativa
        es simple: ¿a quiénes cito? La estadística que hay detrás es menos
        obvia: <strong>¿cuántos grupos distintos de 5 se pueden formar?</strong>{" "}
        Si son pocos, el equipo podría revisarlos todos. Si son muchísimos,
        hace falta un criterio.
      </p>

      <Definicion termino="Factorial (n!)">
        El producto de todos los enteros de 1 hasta <V>n</V>. Representa de
        cuántas formas distintas se pueden ordenar <V>n</V> elementos. Por
        convención, 0! = 1.
      </Definicion>

      <FactorialCreciente />

      <Definicion termino="Permutación — el orden SÍ importa">
        Cantidad de formas de seleccionar <V>r</V> elementos de un total de{" "}
        <V>n</V> <strong>y ordenarlos</strong>. Cambiar de lugar a dos
        seleccionados produce un resultado distinto.
      </Definicion>

      <Definicion termino="Combinación — el orden NO importa">
        Cantidad de formas de seleccionar <V>r</V> elementos de un total de{" "}
        <V>n</V> sin importar en qué orden queden. Cada grupo se cuenta una
        sola vez.
      </Definicion>

      <Enumerador />

      <MiniHistoria titulo="Una sale de la otra">
        Todo grupo de <V>r</V> elementos admite <V>r</V>! ordenamientos
        internos. Por eso la combinación no es más que la permutación dividida
        entre esas repeticiones: C(<V>n</V>,<V>r</V>) = P(<V>n</V>,<V>r</V>) /{" "}
        <V>r</V>!. Y por eso la combinación siempre da menos o igual.
      </MiniHistoria>

      <h4 className="mt-2 font-serif text-xl font-semibold text-slate-900 dark:text-slate-100">
        Aplicado: elegir 5 entre {positivos}
      </h4>
      <p className="text-sm text-slate-700 dark:text-slate-300">
        A los 5 citados se los llama el mismo día, sin horarios diferenciados.
        Intercambiar dos de ellos no cambia nada en la práctica:{" "}
        <strong>el orden no importa</strong>, así que corresponde combinación.
      </p>

      <Formula
        titulo="Combinación"
        simbolos={
          <>
            <V>C</V>(<V>n</V>, <V>r</V>) =
            <Frac
              arriba={<><V>n</V>!</>}
              abajo={<><V>r</V>! (<V>n</V> − <V>r</V>)!</>}
            />
          </>
        }
        numeros={
          <>
            <Frac
              arriba={<>43 × 42 × 41 × 40 × 39</>}
              abajo={<>5 × 4 × 3 × 2 × 1</>}
            />
            = {c.toLocaleString("es")}
          </>
        }
        resultado={
          <>
            Existen <strong>{c.toLocaleString("es")}</strong> formas distintas
            de armar ese grupo de 5. El equipo no puede revisarlas todas ni
            compararlas: necesita un criterio clínico de priorización, porque
            la combinatoria le acaba de demostrar que la fuerza bruta no es una
            opción.
          </>
        }
        nota={
          <>
            No hace falta calcular 43! completo: se expande sólo hasta donde se
            cancela con 38!.
          </>
        }
      />

      <Formula
        titulo="Si el orden importara (permutación)"
        simbolos={
          <>
            <V>P</V>(<V>n</V>, <V>r</V>) =
            <Frac arriba={<><V>n</V>!</>} abajo={<>(<V>n</V> − <V>r</V>)!</>} />
          </>
        }
        numeros={<>43 × 42 × 41 × 40 × 39 = {pr.toLocaleString("es")}</>}
        resultado={
          <>
            Exactamente 5! = 120 veces más, porque cada grupo de 5 personas
            admite 120 ordenamientos internos. Si a cada citado se le asignara
            un horario distinto, éste sería el número correcto.
          </>
        }
      />

      <Trampa
        error="usar permutación cuando el orden no importa"
        porQue="la permutación suele enseñarse primero y queda como reflejo; además su fórmula es más corta."
        correccion="aplicar la prueba de intercambio: si permutar dos seleccionados da el mismo resultado práctico, es combinación."
      />

      <Trampa
        error="intentar calcular los factoriales completos"
        porQue="se aplica la fórmula literalmente, sin simplificar. 43! no entra en una calculadora común."
        correccion="expandir sólo el factorial mayor hasta el punto donde se cancela con el del denominador."
      />

      <Puente
        etiquetaBoton="Ir a 2.5 · Reglas básicas"
        onContinuar={onContinuar}
      >
        <p>
          Ya sabemos contar cuántas selecciones son posibles. Pero volvamos al
          problema de fondo: los estudiantes respondieron{" "}
          <strong>dos</strong> cuestionarios, no uno.
        </p>
        <p>
          ¿Qué probabilidad hay de que alguien dé positivo en{" "}
          <em>alguno</em> de los dos? ¿Y en <em>ambos</em>? Responder eso exige
          saber cuándo se suman probabilidades y cuándo se multiplican.
        </p>
      </Puente>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Qué tan rápido crece el factorial                                   */
/* ------------------------------------------------------------------ */

function FactorialCreciente() {
  const [n, setN] = useState(5);
  const valor = useMemo(() => {
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  }, [n]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        Movelo y mirá qué rápido crece
      </h4>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <label className="flex flex-1 items-center gap-3">
          <span className="font-mono text-sm text-slate-600 dark:text-slate-400">
            n = {n}
          </span>
          <input
            type="range"
            min={0}
            max={20}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="h-2 flex-1 cursor-pointer accent-blue-600"
          />
        </label>
      </div>
      <p className="mt-4 font-serif text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100 sm:text-3xl">
        {n}! = {valor.toLocaleString("es")}
      </p>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {n <= 6
          ? "Con estos números todavía se podría enumerar a mano."
          : n <= 12
            ? "Enumerar uno por uno ya dejó de ser viable."
            : "Acá se ve por qué hace falta contar sin enumerar: ninguna lista de este tamaño es revisable."}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Enumerador: la diferencia entre orden y no orden, vista de verdad   */
/* ------------------------------------------------------------------ */

function Enumerador() {
  const [n, setN] = useState(4);
  const [r, setR] = useState(2);
  const [importaOrden, setImportaOrden] = useState(false);

  const elementos = LETRAS.slice(0, n);

  const listas = useMemo(() => {
    const salida: string[][] = [];
    function combos(inicio: number, actual: string[]) {
      if (actual.length === r) {
        salida.push([...actual]);
        return;
      }
      for (let i = inicio; i < elementos.length; i++) {
        actual.push(elementos[i]);
        combos(i + 1, actual);
        actual.pop();
      }
    }
    function perms(usados: boolean[], actual: string[]) {
      if (actual.length === r) {
        salida.push([...actual]);
        return;
      }
      for (let i = 0; i < elementos.length; i++) {
        if (usados[i]) continue;
        usados[i] = true;
        actual.push(elementos[i]);
        perms(usados, actual);
        actual.pop();
        usados[i] = false;
      }
    }
    if (importaOrden) perms(Array(n).fill(false), []);
    else combos(0, []);
    return salida;
  }, [n, r, importaOrden, elementos]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h4 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        La única pregunta que decide: ¿importa el orden?
      </h4>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Con un conjunto chico se pueden listar todas las posibilidades y ver la
        diferencia con los propios ojos.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-5">
        <label className="flex items-center gap-2 text-sm">
          <span className="font-mono text-slate-600 dark:text-slate-400">
            n = {n}
          </span>
          <input
            type="range"
            min={2}
            max={6}
            value={n}
            onChange={(e) => {
              const v = Number(e.target.value);
              setN(v);
              if (r > v) setR(v);
            }}
            className="h-2 w-28 cursor-pointer accent-blue-600"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="font-mono text-slate-600 dark:text-slate-400">
            r = {r}
          </span>
          <input
            type="range"
            min={1}
            max={Math.min(n, 3)}
            value={r}
            onChange={(e) => setR(Number(e.target.value))}
            className="h-2 w-28 cursor-pointer accent-blue-600"
          />
        </label>
        <button
          type="button"
          onClick={() => setImportaOrden((v) => !v)}
          className={
            "rounded-full px-4 py-2 text-sm font-semibold transition " +
            (importaOrden
              ? "bg-amber-500 text-white hover:bg-amber-600"
              : "bg-blue-600 text-white hover:bg-blue-700")
          }
        >
          {importaOrden ? "El orden SÍ importa" : "El orden NO importa"}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {listas.map((grupo, i) => (
          <span
            key={i}
            className={
              "rounded-md px-2.5 py-1 font-mono text-sm " +
              (importaOrden
                ? "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200"
                : "bg-blue-100 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200")
            }
          >
            {grupo.join(importaOrden ? "→" : "")}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
        <p>
          <strong className="tabular-nums">{listas.length}</strong>{" "}
          posibilidades ={" "}
          <span className="font-mono">
            {importaOrden
              ? `P(${n}, ${r}) = ${permutaciones(n, r)}`
              : `C(${n}, ${r}) = ${combinaciones(n, r)}`}
          </span>
        </p>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          {importaOrden
            ? `Fijate que A→B y B→A aparecen las dos: son ordenamientos distintos del mismo par. Por eso hay ${permutaciones(n, r) / combinaciones(n, r)} veces más que en combinación (${r}! ordenamientos internos por grupo).`
            : "Cada grupo aparece una sola vez: AB está, pero BA no, porque son el mismo grupo."}
        </p>
      </div>
    </div>
  );
}
