"use client";

import { useMemo, useState } from "react";
import { combinaciones, permutaciones, contar, phq9Positivo } from "./calculos";
import {
  Definicion,
  Ejemplos,
  Ejemplo,
  Frac,
  V,
  Trampa,
  Puente,
  MiniHistoria,
  Desarrollo,
  Termino,
  Comprueba,
  PasoTitulo,
  FormulaAnotada,
} from "./narrativa";

const LETRAS = ["A", "B", "C", "D", "E", "F"];
const INSIGNIA = "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300";
const ACENTO = "border-indigo-300 text-indigo-700 dark:border-indigo-700 dark:text-indigo-300";

/**
 * 2.4 — Teoría combinatoria.
 *
 * La pregunta que decide todo es una sola: ¿importa el orden? El interactivo
 * la vuelve visible enumerando de verdad los grupos posibles, y el desarrollo
 * paso a paso muestra la cancelación de factoriales que normalmente se omite.
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
        Si son pocos, el equipo podría revisarlos todos y elegir el mejor. Si
        son muchísimos, hace falta un criterio, porque enumerar es imposible.
      </p>

      <PasoTitulo numero={1} insignia={INSIGNIA}>
        El ladrillo de base: el factorial
      </PasoTitulo>

      <Definicion termino="Factorial (n!)">
        El producto de todos los enteros desde 1 hasta <V>n</V>. Representa de
        cuántas formas distintas se pueden <strong>ordenar</strong> <V>n</V>{" "}
        elementos. Por convención,{" "}
        <Termino significa="Hay exactamente una forma de ordenar un conjunto vacío: no hacer nada. Esa convención es la que hace que las fórmulas de abajo funcionen en sus casos extremos.">
          0! = 1
        </Termino>
        .
      </Definicion>

      <FactorialCreciente />

      <PasoTitulo numero={2} insignia={INSIGNIA}>
        La única pregunta que decide: ¿importa el orden?
      </PasoTitulo>

      <div className="grid gap-4 sm:grid-cols-2">
        <Definicion termino="Permutación — el orden SÍ importa">
          Formas de seleccionar <V>r</V> elementos de un total de <V>n</V>{" "}
          <strong>y ordenarlos</strong>. Intercambiar dos seleccionados produce
          un resultado distinto.
        </Definicion>
        <Definicion termino="Combinación — el orden NO importa">
          Formas de seleccionar <V>r</V> elementos sin importar en qué orden
          queden. Cada grupo se cuenta una sola vez.
          <Ejemplos titulo="Ver cuál corresponde en cada caso">
            <Ejemplo caso="COMBINACIÓN — elegir 5 estudiantes para citar el mismo día">
              Intercambiar dos no cambia nada: es el mismo grupo.
            </Ejemplo>
            <Ejemplo caso="COMBINACIÓN — repartir una mano de 5 cartas">
              Tener el as antes o después no cambia la mano.
            </Ejemplo>
            <Ejemplo caso="COMBINACIÓN — armar un comité de 3 personas">
              Sin cargos asignados, sólo importa quiénes lo integran.
            </Ejemplo>
            <Ejemplo caso="PERMUTACIÓN — asignar turnos de 9, 10 y 11 h">
              Cambiar quién va primero produce otra asignación.
            </Ejemplo>
            <Ejemplo caso="PERMUTACIÓN — podio de oro, plata y bronce">
              El orden es exactamente lo que se está decidiendo.
            </Ejemplo>
            <Ejemplo caso="PERMUTACIÓN — una clave de 4 dígitos sin repetir">
              1234 y 4321 abren cosas distintas.
            </Ejemplo>
          </Ejemplos>
        </Definicion>
      </div>

      <Enumerador />

      <MiniHistoria titulo="Una sale de la otra">
        Todo grupo de <V>r</V> elementos admite <V>r</V>! ordenamientos
        internos. Por eso la combinación no es más que la permutación dividida
        entre esas repeticiones: C(<V>n</V>,<V>r</V>) = P(<V>n</V>,<V>r</V>) ÷{" "}
        <V>r</V>!. Y por eso la combinación siempre da menos o igual.
      </MiniHistoria>

      <Comprueba
        pregunta="El servicio decide citar a 3 estudiantes y asignarles turnos distintos: 9:00, 10:00 y 11:00. ¿Qué corresponde calcular?"
        pista="Aplicá la prueba de intercambio: ¿cambia algo si dos de los citados intercambian su lugar?"
        opciones={[
          {
            texto: "Permutación",
            esCorrecta: true,
            porQue:
              "Si Ana va a las 9:00 y Beto a las 10:00, no es lo mismo que al revés: cada persona recibe un turno distinto. Intercambiarlos produce una asignación diferente, así que el orden importa.",
          },
          {
            texto: "Combinación",
            porQue:
              "Sería combinación si sólo se eligiera a quiénes citar, sin asignar turnos. Pero acá cada seleccionado recibe un horario propio, y eso distingue un ordenamiento de otro.",
          },
        ]}
      />

      <PasoTitulo numero={3} insignia={INSIGNIA}>
        Aplicado: elegir 5 entre {positivos}
      </PasoTitulo>

      <p className="text-sm text-slate-700 dark:text-slate-300">
        A los 5 citados se los llama el mismo día, sin horarios diferenciados.
        Intercambiar dos de ellos no cambia nada en la práctica:{" "}
        <strong>el orden no importa</strong>, así que corresponde combinación.
      </p>

      <FormulaAnotada
        titulo="Qué es cada parte de la fórmula"
        partes={[
          { expresion: <><V>C</V>(43, 5)</>, etiqueta: "lo que buscamos", significa: "Cuántos grupos distintos de 5 se pueden formar entre los 43 positivos.", color: "verde" },
          { expresion: "=" },
          { expresion: "43!", etiqueta: "n!", significa: "Todas las formas de ordenar los 43 estudiantes.", color: "azul" },
          { expresion: "÷" },
          { expresion: "5!", etiqueta: "r!", significa: "Los ordenamientos internos de cada grupo de 5, que NO queremos contar por separado. Vale 120.", color: "ambar" },
          { expresion: "×" },
          { expresion: "38!", etiqueta: "(n − r)!", significa: "Los ordenamientos de los 38 que quedan afuera, que tampoco nos interesan.", color: "ambar" },
        ]}
      />

      <Desarrollo
        insignia={INSIGNIA}
        acento={ACENTO}
        pasos={[
          {
            expresion: (
              <>
                <V>C</V>(43, 5) =
                <Frac arriba="43!" abajo={<>5! × (43 − 5)!</>} /> ={" "}
                <Frac arriba="43!" abajo={<>5! × 38!</>} />
              </>
            ),
            explicacion: "Sustituimos n = 43 y r = 5 en la fórmula, y resolvemos la resta del denominador: 43 − 5 = 38.",
          },
          {
            expresion: (
              <>
                =
                <Frac
                  arriba={<>43 × 42 × 41 × 40 × 39 × 38!</>}
                  abajo={<>5! × 38!</>}
                />
              </>
            ),
            explicacion:
              "Acá está el truco que casi nunca se explica: 43! significa 43 × 42 × 41 × … × 1, y en algún momento de esa cadena aparece 38!. Así que expandimos 43! sólo hasta llegar a 38! y dejamos el resto sin desarrollar. Nadie necesita calcular 43! completo.",
          },
          {
            expresion: (
              <>
                =
                <Frac arriba={<>43 × 42 × 41 × 40 × 39</>} abajo="5!" />
              </>
            ),
            explicacion:
              "Ahora 38! aparece arriba y abajo, así que se cancela. Por eso conviene expandir sólo hasta ahí: la cancelación es el motivo.",
          },
          {
            expresion: (
              <>
                =
                <Frac arriba={<>115.511.760</>} abajo={<>5 × 4 × 3 × 2 × 1 = 120</>} />
              </>
            ),
            explicacion:
              "Resolvemos el producto de arriba y desarrollamos 5! = 120 abajo.",
          },
          {
            expresion: <>= {c.toLocaleString("es")}</>,
            explicacion:
              "Existen 962.598 formas distintas de armar ese grupo de 5. El equipo no puede revisarlas todas ni compararlas: la combinatoria le acaba de demostrar que la fuerza bruta no es una opción, y que necesita un criterio clínico de priorización.",
          },
        ]}
      />

      <MiniHistoria titulo="Ese número tiene una segunda lectura">
        Si el servicio sorteara a los 5 estudiantes completamente al azar, la
        probabilidad de que salga un grupo específico cualquiera sería{" "}
        <strong>1 entre {c.toLocaleString("es")}</strong>. Es un caso genuino
        de{" "}
        <Termino significa="Casos favorables sobre casos posibles, cuando todos los resultados tienen la misma chance. Ver apartado 2.2.">
          probabilidad clásica
        </Termino>
        , porque acá sí se cumple la equiprobabilidad — por diseño del sorteo,
        no por suposición.
      </MiniHistoria>

      <PasoTitulo numero={4} insignia={INSIGNIA}>
        Y si el orden importara
      </PasoTitulo>

      <Desarrollo
        titulo="La permutación, para comparar"
        insignia={INSIGNIA}
        acento={ACENTO}
        pasos={[
          {
            expresion: (
              <>
                <V>P</V>(43, 5) =
                <Frac arriba="43!" abajo={<>(43 − 5)!</>} /> ={" "}
                <Frac arriba="43!" abajo="38!" />
              </>
            ),
            explicacion:
              "Misma sustitución que antes, pero ahora el denominador NO tiene el r!: no dividimos entre los ordenamientos internos, porque justamente queremos contarlos.",
          },
          {
            expresion: <>= 43 × 42 × 41 × 40 × 39 = {pr.toLocaleString("es")}</>,
            explicacion: `Cancelamos 38! igual que antes y resolvemos. Da exactamente 120 veces más que la combinación, porque 5! = 120 es la cantidad de ordenamientos que cada grupo de 5 admite.`,
          },
        ]}
      />

      <Comprueba
        pregunta={`¿Por qué P(43,5) = ${pr.toLocaleString("es")} es exactamente 120 veces mayor que C(43,5) = ${c.toLocaleString("es")}?`}
        opciones={[
          {
            texto: "Porque cada grupo de 5 personas se puede ordenar de 5! = 120 maneras distintas",
            esCorrecta: true,
            porQue:
              "La permutación cuenta cada grupo una vez por cada orden posible en que se lo puede escribir. Como 5 elementos admiten 5! = 120 ordenamientos, cada grupo aparece 120 veces. Dividir entre 120 es justamente lo que hace la combinación.",
          },
          {
            texto: "Porque hay 120 estudiantes más en la permutación",
            porQue:
              "El total de estudiantes es el mismo (43) en las dos fórmulas. Lo que cambia no es cuántos hay, sino si contamos por separado los distintos órdenes del mismo grupo.",
          },
          {
            texto: "Porque la permutación usa 43! y la combinación no",
            porQue:
              "Las dos usan 43! arriba. La diferencia está abajo: la combinación divide además entre r! = 5! = 120, y eso es exactamente el factor entre ambas.",
          },
        ]}
      />

      <Trampa
        error="usar permutación cuando el orden no importa"
        porQue="la permutación suele enseñarse primero y queda como reflejo; además su fórmula es más corta. Reportar 115.511.760 grupos posibles en lugar de 962.598 infla el resultado 120 veces."
        correccion="aplicar la prueba de intercambio: si permutar dos seleccionados da el mismo resultado práctico, es combinación."
      />

      <Trampa
        error="intentar calcular los factoriales completos"
        porQue="se aplica la fórmula literalmente, sin simplificar. 43! no entra en una calculadora común y no hace ninguna falta."
        correccion="expandir sólo el factorial mayor hasta el punto donde se cancela con el del denominador, como hicimos en el paso 2 del desarrollo."
      />

      <Puente etiquetaBoton="Ir a 2.5 · Reglas básicas" onContinuar={onContinuar}>
        <p>
          Ya sabemos contar cuántas selecciones son posibles. Pero volvamos al
          problema de fondo: los estudiantes respondieron <strong>dos</strong>{" "}
          cuestionarios, no uno.
        </p>
        <p>
          ¿Qué probabilidad hay de que alguien dé positivo en <em>alguno</em> de
          los dos? ¿Y en <em>ambos</em>? Responder eso exige saber cuándo se
          suman probabilidades y cuándo se multiplican.
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

  const desarrollo =
    n === 0
      ? "1 (por convención)"
      : Array.from({ length: Math.min(n, 6) }, (_, i) => n - i).join(" × ") +
        (n > 6 ? " × … × 2 × 1" : "");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h5 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        Movelo y mirá qué rápido crece
      </h5>
      <label className="mt-4 flex items-center gap-3">
        <span className="w-16 shrink-0 font-mono text-sm text-slate-600 dark:text-slate-400">
          n = {n}
        </span>
        <input
          type="range"
          min={0}
          max={20}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="h-2 flex-1 cursor-pointer accent-indigo-600"
        />
      </label>
      <p className="mt-4 font-mono text-sm text-slate-500 dark:text-slate-400">
        {n}! = {desarrollo}
      </p>
      <p className="mt-1 font-serif text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-100 sm:text-3xl">
        = {valor.toLocaleString("es")}
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

  const elementos = useMemo(() => LETRAS.slice(0, n), [n]);

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
      <h5 className="font-serif text-lg font-semibold text-slate-900 dark:text-slate-100">
        Todas las posibilidades, listadas de verdad
      </h5>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Con un conjunto chico se pueden enumerar y ver la diferencia con los
        propios ojos.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
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
            className="h-2 w-full min-w-[7rem] cursor-pointer accent-indigo-600 sm:w-28"
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
            className="h-2 w-full min-w-[7rem] cursor-pointer accent-indigo-600 sm:w-28"
          />
        </label>
        <button
          type="button"
          onClick={() => setImportaOrden((v) => !v)}
          className={
            "rounded-full px-4 py-2 text-sm font-semibold transition " +
            (importaOrden
              ? "bg-amber-500 text-white hover:bg-amber-600"
              : "bg-indigo-600 text-white hover:bg-indigo-700")
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
                : "bg-indigo-100 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200")
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
            ? `Fijate que A→B y B→A aparecen las dos: son ordenamientos distintos del mismo par. Por eso hay ${permutaciones(n, r) / combinaciones(n, r)} veces más que en combinación — que es exactamente ${r}! ordenamientos internos por grupo.`
            : "Cada grupo aparece una sola vez: AB está, pero BA no, porque son el mismo grupo con otro orden de escritura."}
        </p>
      </div>
    </div>
  );
}
