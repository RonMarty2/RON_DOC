// Ejercicios de práctica con números nuevos cada vez. La respuesta sale de las mismas funciones probadas que usan
// las láminas, y cada opción incorrecta es un error típico con nombre, no un número al azar.
import { calcularAmortizacionGenerica } from "../simpro/calculo-financiero";
import { bs, pct, tex } from "../formato";
import { cuotaDesdeValorFuturo, cuotaDesdeValorPresente, valorFuturoAnualidad, valorPresenteAnualidad } from "./anualidades";
import { precioBono } from "./bonos";
import { tablaDepreciacion } from "./depreciacion";
import { montoCompuesto, montoSimple, tasaReal } from "./interes";

export interface Ejercicio {
  pregunta: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
}

export type Azar = () => number;

/** Generador reproducible (mulberry32): mismo número de semilla, mismos ejercicios. Sirve para las pruebas. */
export function azarConSemilla(semilla: number): Azar {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const entre = (azar: Azar, min: number, max: number, paso = 1) =>
  min + paso * Math.floor(azar() * (Math.floor((max - min) / paso) + 1));

const elegir = <T,>(azar: Azar, opciones: T[]): T => opciones[Math.floor(azar() * opciones.length)];

/** Mezcla la correcta con tres distractores distintos. Si dos opciones coinciden al redondear, devuelve null y se sortea otro. */
function armar(azar: Azar, pregunta: string, correcta: string, distractores: string[], explicacion: string): Ejercicio | null {
  const unicos = [...new Set(distractores)].filter((d) => d !== correcta);
  if (unicos.length < 3) return null;
  const opciones = [correcta, ...unicos.slice(0, 3)];
  for (let i = opciones.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [opciones[i], opciones[j]] = [opciones[j], opciones[i]];
  }
  return { pregunta, opciones, correcta: opciones.indexOf(correcta), explicacion };
}

function reintentar(azar: Azar, variantes: ((azar: Azar) => Ejercicio | null)[]): Ejercicio {
  for (let intento = 0; intento < 50; intento++) {
    const ejercicio = elegir(azar, variantes)(azar);
    if (ejercicio) return ejercicio;
  }
  throw new Error("No se pudo armar un ejercicio con opciones distintas");
}

const plata = (x: number) => `Bs ${bs(x)}`;
const dec = (x: number) => tex(bs(x, 2));

// ── Interés compuesto e inflación ───────────────────────────────────────────

const CAPITALIZACION: Record<number, { adverbio: string; periodos: string; periodo: string }> = {
  2: { adverbio: "semestralmente", periodos: "semestres", periodo: "semestre" },
  4: { adverbio: "trimestralmente", periodos: "trimestres", periodo: "trimestre" },
  12: { adverbio: "mensualmente", periodos: "meses", periodo: "mes" },
};

export function ejercicioInteresCompuesto(azar: Azar): Ejercicio {
  return reintentar(azar, [
    (a) => {
      const capital = entre(a, 1000, 20000, 500);
      const tasaPct = entre(a, 4, 15);
      const j = tasaPct / 100;
      const anios = entre(a, 2, 6);
      const m = elegir(a, [2, 4, 12]);
      const { adverbio, periodos, periodo } = CAPITALIZACION[m];
      const correcto = montoCompuesto(capital, j, anios, m);
      const anual = montoCompuesto(capital, j, anios);
      const simple = montoSimple(capital, j, anios);
      const sinMultiplicar = capital * Math.pow(1 + j / m, anios);
      return armar(
        a,
        `Depositas ${plata(capital)} al ${tasaPct}% anual capitalizable ${adverbio}, durante ${anios} años. ¿Cuánto tienes al final?`,
        plata(correcto),
        [plata(anual), plata(simple), plata(sinMultiplicar)],
        `Cada ${periodo} suma $\\dfrac{${dec(j)}}{${m}}$ y en ${anios} años hay $${m} \\times ${anios} = ${m * anios}$ ${periodos}: $M = ${tex(bs(capital))} \\cdot \\left(1 + \\dfrac{${dec(j)}}{${m}}\\right)^{${m * anios}} \\approx ${dec(correcto)}$. ${plata(anual)} sería capitalizando una vez al año, ${plata(simple)} con interés simple, y ${plata(sinMultiplicar)} olvida que los períodos son ${periodos}, no años.`
      );
    },
    (a) => {
      const tasaPct = entre(a, 6, 30);
      const inflacionPct = entre(a, 2, Math.min(20, tasaPct - 1));
      const i = tasaPct / 100;
      const inflacion = inflacionPct / 100;
      const correcto = tasaReal(i, inflacion);
      return armar(
        a,
        `Un depósito rinde ${tasaPct}% anual y la inflación es ${inflacionPct}% anual. ¿Cuál es la tasa real?`,
        pct(correcto),
        [pct(i - inflacion), pct((i - inflacion) / (1 + i)), pct(i * (1 - inflacion))],
        `Con la ecuación de Fisher: $r = \\dfrac{1 + ${dec(i)}}{1 + ${dec(inflacion)}} - 1 \\approx ${tex(pct(correcto))}$. Restar las tasas da ${pct(i - inflacion)}: se acerca, pero no es la tasa real.`
      );
    },
  ]);
}

// ── Anualidades ─────────────────────────────────────────────────────────────

export function ejercicioAnualidades(azar: Azar): Ejercicio {
  return reintentar(azar, [
    (a) => {
      const meta = entre(a, 5000, 50000, 1000);
      const tasaPct = entre(a, 4, 12);
      const i = tasaPct / 100;
      const anios = entre(a, 3, 10);
      const correcto = cuotaDesdeValorFuturo(meta, i, anios);
      const comoPrestamo = cuotaDesdeValorPresente(meta, i, anios);
      return armar(
        a,
        `Quieres juntar ${plata(meta)} en ${anios} años, depositando lo mismo al final de cada año al ${tasaPct}% anual. ¿Cuánto depositas cada año?`,
        plata(correcto),
        [plata(meta / anios), plata(comoPrestamo), plata(correcto / (1 + i))],
        `Lo que quieres tener al final es un valor futuro: $R = ${tex(bs(meta))} \\cdot \\dfrac{${dec(i)}}{${dec(1 + i)}^{${anios}} - 1} \\approx ${dec(correcto)}$. ${plata(meta / anios)} ignora el interés, ${plata(comoPrestamo)} lo trata como si fuera un préstamo (valor presente), y ${plata(correcto / (1 + i))} sería depositando al inicio de cada año.`
      );
    },
    (a) => {
      const cuota = entre(a, 200, 5000, 100);
      const tasaPct = entre(a, 4, 12);
      const i = tasaPct / 100;
      const anios = entre(a, 3, 10);
      const correcto = valorPresenteAnualidad(cuota, i, anios);
      const futuro = valorFuturoAnualidad(cuota, i, anios);
      return armar(
        a,
        `Te ofrecen ${plata(cuota)} al final de cada año durante ${anios} años. Si el dinero rinde ${tasaPct}% anual, ¿cuánto vale hoy esa oferta?`,
        plata(correcto),
        [plata(cuota * anios), plata(futuro), plata(valorPresenteAnualidad(cuota, i, anios, true))],
        `$\\text{VP} = ${tex(bs(cuota))} \\cdot \\dfrac{1 - ${dec(1 + i)}^{-${anios}}}{${dec(i)}} \\approx ${dec(correcto)}$. ${plata(cuota * anios)} suma las cuotas sin traerlas a hoy, y ${plata(futuro)} es lo que valen al final, no hoy.`
      );
    },
  ]);
}

// ── Amortización ────────────────────────────────────────────────────────────

export function ejercicioAmortizacion(azar: Azar): Ejercicio {
  return reintentar(azar, [
    (a) => {
      const anios = entre(a, 3, 8);
      const prestamo = anios * entre(a, 1000, 8000, 500);
      const tasaPct = entre(a, 5, 15);
      const i = tasaPct / 100;
      const anio = entre(a, 2, anios);
      const aleman = calcularAmortizacionGenerica({ capital: prestamo, tasaPeriodo: i, numPeriodos: anios, metodo: "aleman" });
      const frances = calcularAmortizacionGenerica({ capital: prestamo, tasaPeriodo: i, numPeriodos: anios, metodo: "frances" });
      const fila = aleman.cuotas[anio - 1];
      return armar(
        a,
        `Te prestan ${plata(prestamo)} al ${tasaPct}% anual, a pagar en ${anios} años con el sistema alemán. ¿Cuánto pagas en la cuota del año ${anio}?`,
        plata(fila.cuota),
        [plata(aleman.cuotas[0].cuota), plata(fila.amortizacionCapital), plata(frances.cuotas[0].cuota)],
        `Cada año devuelves $\\dfrac{${tex(bs(prestamo))}}{${anios}} = ${tex(bs(fila.amortizacionCapital))}$ de capital. Al empezar el año ${anio} debes $${tex(bs(fila.saldoInicial))}$, así que el interés es $${tex(bs(fila.saldoInicial))} \\times ${dec(i)} = ${tex(bs(fila.interes))}$ y la cuota es $${tex(bs(fila.amortizacionCapital))} + ${tex(bs(fila.interes))} = ${tex(bs(fila.cuota))}$.`
      );
    },
    (a) => {
      const prestamo = entre(a, 5000, 80000, 1000);
      const tasaPct = entre(a, 5, 15);
      const i = tasaPct / 100;
      const anios = entre(a, 3, 10);
      const frances = calcularAmortizacionGenerica({ capital: prestamo, tasaPeriodo: i, numPeriodos: anios, metodo: "frances" });
      const correcto = frances.cuotas[0].cuota;
      const alemanPrimera = prestamo / anios + prestamo * i;
      return armar(
        a,
        `Un préstamo de ${plata(prestamo)} al ${tasaPct}% anual se paga en ${anios} cuotas anuales iguales (sistema francés). ¿De cuánto es cada cuota?`,
        plata(correcto),
        [plata(prestamo / anios), plata(alemanPrimera), plata(cuotaDesdeValorFuturo(prestamo, i, anios))],
        `$R = ${tex(bs(prestamo))} \\cdot \\dfrac{${dec(i)}}{1 - ${dec(1 + i)}^{-${anios}}} \\approx ${dec(correcto)}$. ${plata(prestamo / anios)} ignora el interés, ${plata(alemanPrimera)} es la primera cuota del sistema alemán, y ${plata(cuotaDesdeValorFuturo(prestamo, i, anios))} trata el préstamo como un monto a juntar.`
      );
    },
  ]);
}

// ── Bonos ───────────────────────────────────────────────────────────────────

export function ejercicioBonos(azar: Azar): Ejercicio {
  return reintentar(azar, [
    (a) => {
      const cuponPct = entre(a, 3, 12);
      const mercadoPct = entre(a, 3, 14);
      if (mercadoPct === cuponPct) return null;
      const c = cuponPct / 100;
      const i = mercadoPct / 100;
      const anios = entre(a, 2, 8);
      const correcto = precioBono(1000, c, i, anios);
      const soloNominal = 1000 / Math.pow(1 + i, anios);
      const vpCupones = correcto - soloNominal;
      const sinDescontar = anios * 1000 * c + 1000;
      return armar(
        a,
        `Un bono de Bs 1.000 nominales paga un cupón de ${cuponPct}% anual y vence en ${anios} años. Si el mercado paga ${mercadoPct}%, ¿cuánto vale hoy?`,
        plata(correcto),
        [plata(soloNominal), plata(sinDescontar), plata(1000)],
        `Cupones: $${tex(bs(1000 * c))} \\cdot \\dfrac{1 - ${dec(1 + i)}^{-${anios}}}{${dec(i)}} \\approx ${dec(vpCupones)}$. Nominal: $\\dfrac{1.000}{${dec(1 + i)}^{${anios}}} \\approx ${dec(soloNominal)}$. Precio: $${dec(correcto)}$, ${correcto < 1000 ? "bajo la par, porque el mercado paga más que el cupón" : "sobre la par, porque el cupón paga más que el mercado"}. Bs 1.000 sería traerlo a hoy con la tasa del cupón.`
      );
    },
    (a) => {
      const cuponPct = entre(a, 3, 12);
      const mercadoPct = entre(a, 3, 14);
      const correcto = cuponPct === mercadoPct ? "A la par" : mercadoPct > cuponPct ? "Bajo la par" : "Sobre la par";
      return armar(
        a,
        `Un bono paga un cupón de ${cuponPct}% anual y hoy el mercado paga ${mercadoPct}%. ¿Cómo se vende?`,
        correcto,
        ["Bajo la par", "A la par", "Sobre la par", "No se sabe sin conocer el plazo"],
        cuponPct === mercadoPct
          ? "Si el mercado paga lo mismo que el cupón, traer los pagos a hoy devuelve justo el nominal: se vende a la par."
          : mercadoPct > cuponPct
            ? `El mercado paga ${mercadoPct}% y el bono sólo ${cuponPct}%: nadie paga el nominal completo por algo que rinde menos, así que se vende bajo la par. El plazo cambia cuánto baja, no hacia dónde.`
            : `El bono paga ${cuponPct}% y el mercado sólo ${mercadoPct}%: vale más que el nominal, así que se vende sobre la par. El plazo cambia cuánto sube, no hacia dónde.`
      );
    },
  ]);
}

// ── Depreciaciones ──────────────────────────────────────────────────────────

export function ejercicioDepreciaciones(azar: Azar): Ejercicio {
  return reintentar(azar, [
    (a) => {
      const vida = entre(a, 3, 8);
      const costo = entre(a, 10000, 200000, 5000);
      const salvamento = Math.round((costo * elegir(a, [0.05, 0.1, 0.2])) / 1000) * 1000;
      const anio = entre(a, 2, vida);
      const tabla = tablaDepreciacion(costo, salvamento, vida, "sumaDigitos");
      const suma = (vida * (vida + 1)) / 2;
      const peso = vida - anio + 1;
      const correcto = tabla[anio - 1].depreciacion;
      const lineal = tablaDepreciacion(costo, salvamento, vida, "lineal")[0].depreciacion;
      return armar(
        a,
        `Un equipo cuesta ${plata(costo)}, dura ${vida} años y su valor de salvamento es ${plata(salvamento)}. Con suma de dígitos, ¿cuánto se deprecia el año ${anio}?`,
        plata(correcto),
        [plata(lineal), plata(tabla[0].depreciacion), plata((costo * peso) / suma)],
        `Los dígitos suman $1 + 2 + \\dots + ${vida} = ${suma}$ y la base es $${tex(bs(costo))} - ${tex(bs(salvamento))} = ${tex(bs(costo - salvamento))}$. El año ${anio} se lleva $\\tfrac{${peso}}{${suma}}$: $\\tfrac{${peso}}{${suma}} \\cdot ${tex(bs(costo - salvamento))} \\approx ${dec(correcto)}$. ${plata(lineal)} es el lineal, ${plata(tabla[0].depreciacion)} el año 1, y ${plata((costo * peso) / suma)} olvida el salvamento.`
      );
    },
    (a) => {
      const vida = entre(a, 3, 10);
      const costo = entre(a, 10000, 200000, 5000);
      const salvamento = Math.round((costo * elegir(a, [0.05, 0.1, 0.2])) / 1000) * 1000;
      const anio = entre(a, 1, vida - 1);
      const tabla = tablaDepreciacion(costo, salvamento, vida, "lineal");
      const porAnio = tabla[0].depreciacion;
      const correcto = tabla[anio - 1].valorLibros;
      return armar(
        a,
        `Una máquina cuesta ${plata(costo)}, dura ${vida} años y al final se vende en ${plata(salvamento)}. Con el método lineal, ¿cuál es su valor en libros al terminar el año ${anio}?`,
        plata(correcto),
        [plata(costo - (anio * costo) / vida), plata(tabla[anio - 1].acumulada), plata(anio > 1 ? tabla[anio - 2].valorLibros : costo)],
        `Cada año se deprecia $\\dfrac{${tex(bs(costo))} - ${tex(bs(salvamento))}}{${vida}} = ${dec(porAnio)}$. Después de ${anio} ${anio === 1 ? "año" : "años"}: $${tex(bs(costo))} - ${anio} \\times ${dec(porAnio)} = ${dec(correcto)}$. ${plata(tabla[anio - 1].acumulada)} es lo depreciado, no lo que queda, y ${plata(costo - (anio * costo) / vida)} olvida el salvamento.`
      );
    },
  ]);
}
