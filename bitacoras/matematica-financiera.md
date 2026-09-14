# Bitácora — Matemática Financiera

**Estado:** las cinco láminas del temario de `content/materias.ts` están en borrador, **sin enlazar** y con `noindex`. Ninguna sale todavía del dossier de Ronald: están armadas con definiciones estándar y esperan su revisión.
**Última actualización:** 2026-09-14

---

## Láminas

| Lámina | Ruta | Tarjetas | Cálculos desde |
|---|---|---|---|
| Interés compuesto e inflación | `/interes-compuesto` | 12 | `src/lib/finanzas/interes.ts` |
| Cuotas iguales: cuánto valen hoy y al final (anualidades) | `/anualidades` | 11 | `src/lib/finanzas/anualidades.ts` |
| Tres formas de devolver un préstamo | `/amortizacion` | 10 | `src/lib/simpro/calculo-financiero.ts` (`calcularAmortizacionGenerica`) |
| Bonos: precio, rendimiento y duración | `/bonos` | 12 | `src/lib/finanzas/bonos.ts` |
| Depreciaciones: cuatro formas de repartir una pérdida | `/depreciaciones` | 11 | `src/lib/finanzas/depreciacion.ts` (el lineal, con el motor de SIMPRO) |

Encadenadas con el pie de la tarjeta, en el orden del programa: interés compuesto → anualidades → amortización → bonos → depreciaciones.

### Depreciaciones

Gancho (¿cuánto cuesta cada año?) → depreciar es repartir (C, S, n, valor en libros) → lineal → suma de dígitos → porcentaje fijo sobre el saldo → por qué acelerar (tabla de valor en libros) → fondo de amortización, el método financiero (una anualidad con VF conocido) → los cuatro lado a lado, todos suman 45.000 → **Ojo:** olvidar el salvamento → laboratorio (costo, salvamento, vida, tasa del fondo, método) → práctica.

"Porcentaje fijo" usa $d = 1 - (S/C)^{1/n}$, que termina exacto en el salvamento. Si el dossier usa "doble saldo decreciente" ($2/n$), hay que agregarlo: no llega exacto al salvamento y se ajusta el último año.

### Bonos

Gancho (¿pagarías Bs 1.000?) → un bono son dos cosas conocidas (anualidad de cupones + un monto) → cupones a hoy → nominal a hoy → el precio es la suma (bajo la par) → si sube la tasa baja el precio → rendimiento al vencimiento, probando tasas → duración de Macaulay con el peso de cada pago → para qué sirve: sensibilidad aproximada vs recalculada → **Ojo:** creer que rinde el cupón → laboratorio (cupón, mercado, años: precio, par, duración, caída si sube 1 punto) → práctica.

El rendimiento al vencimiento se busca por bisección (`rendimientoAlVencimiento`): no tiene fórmula cerrada, y así lo dice la lámina.

### Cuotas iguales (anualidades)

Gancho (¿Bs 5.000?) → una cuota sola ya se sabe (interés compuesto) → cada cuota crece un tiempo distinto → la suma tiene fórmula (VF) → al revés: cuánto vale hoy → fórmula del VP → **la cuota de un préstamo sale de despejar R** (es la francesa) → vencida o anticipada → **Ojo:** sumar las cuotas como si se pagaran el mismo día → laboratorio (cuota, tasa, períodos, vencida/anticipada) → práctica (cuota para juntar un monto).

Hay una prueba que compara `cuotaDesdeValorPresente` con la cuota francesa del motor de SIMPRO: si alguna de las dos cambia, falla.

### Interés compuesto e inflación

Gancho (¿Bs 13.000?) → interés simple → el interés gana interés (año por año) → multiplicar tres veces es elevar al cubo → la diferencia crece con los años → capitalizar más seguido → tasa nominal y efectiva → los precios también suben → tasa real (Fisher) → **Ojo:** restar tasas → laboratorio (tasa, años, inflación, capitalización) → práctica.

### Tres formas de devolver un préstamo

Gancho (¿mismo interés con los tres?) → regla base: el interés es sobre lo que todavía debes → americano → alemán → francés → de dónde sale la cuota → la tabla fila por fila → **Ojo:** la cuota más baja no es la más barata → laboratorio (tasa y plazo) → práctica.

Orden elegido: del sistema más simple de calcular al más complejo (americano → alemán → francés).

## Notación usada (a confirmar con el dossier)

| Símbolo | Significa |
|---|---|
| $C$ | capital depositado |
| $R$ | cuota (anualidades y amortización) |
| $P$ | préstamo |
| $M$ | monto al final |
| $\text{VF}$, $\text{VP}$ | valor futuro, valor presente |
| $N$ | nominal de un bono |
| $c$ | tasa de cupón (el cupón es $R = N \cdot c$) |
| $D$ | duración de Macaulay |
| $S$ | valor de salvamento |
| $d$ | tasa del porcentaje fijo |
| $i$ | tasa por período · tasa efectiva anual |
| $n$ | número de períodos |
| $j$ | tasa nominal anual |
| $m$ | capitalizaciones por año |
| $\pi$ | inflación |
| $r$ | tasa real |

La cuota era $C$ en la lámina de amortización y chocaba con el capital de la de interés compuesto: se unificó en $R$ el 14-sep. Si el dossier usa otras letras, cambiarlas en las tres láminas.

## Números de verdad (salen de las funciones; si cambian, algo se rompió)

- Bs 10.000 al 10% durante 3 años: simple **13.000**, compuesto **13.310**; mensual **13.481,82**; efectiva mensual **10,47%**.
- Con 5% de inflación: en precios de hoy **11.497,68**; tasa real **4,76%**. Con 30% e inflación 20%: **8,33%**.
- Préstamo Bs 10.000 al 10% en 5 años: interés americano **5.000**, alemán **3.000**, francés **3.189,87**; cuota francesa **2.637,97**.
- Práctica: alemán 6.000 / 10% / 3 años, segunda cuota **2.400**; depósito 5.000 al 8% semestral 2 años **5.849,29**.
- Bs 1.000 por año, 5 años, 10%: VF **6.105,10**, VP **3.790,79**; anticipada VF **6.715,61**, VP **4.169,87**. Cuota para Bs 10.000 de VP: **2.637,97** (igual a la francesa).
- Práctica: juntar Bs 10.000 en 4 años al 8%: cuota **2.219,21** (distractores 3.019,21 = cuota de VP; 2.054,82 = anticipada).
- Bono Bs 1.000, cupón 8%, 5 años, mercado 10%: cupones hoy **303,26**, nominal hoy **620,92**, precio **924,18**. Al 6% **1.084,25**, al 8% **1.000**, al 12% **855,81**. Duración **4,28** años (modificada 3,89). Al 11%: **889,12**, cae **3,79%** (aproximación 3,89%). Sin cupón: duración **5** exacta.
- Práctica: bono cupón 6%, 3 años, mercado 8%: **948,46** (distractores 793,83 = sólo nominal; 1.180 = sin descontar).
- Máquina Bs 50.000, salvamento 5.000, 5 años: lineal **9.000**/año; dígitos **15.000, 12.000, 9.000, 6.000, 3.000**; porcentaje fijo $d$ = **36,90%** (año 1 **18.452,13**, año 2 **11.642,51**); fondo al 8%: depósito **7.670,54**, depreciación del año 5 **10.435,69**. Todos acumulan **45.000**.
- Práctica: vehículo 80.000, salvamento 8.000, 4 años, dígitos, año 2: **21.600** (distractores 18.000 lineal; 28.800 año 1; 24.000 sin salvamento).

## Decisiones

| Fecha | Decisión | Por qué |
|---|---|---|
| 2026-09-14 | Primera lámina financiera: amortización, con el motor de SIMPRO | Es lo que el motor ya calcula y probado |
| 2026-09-14 | Segunda: interés compuesto, con funciones propias y pruebas | Es el primer tema de la materia y la base del préstamo; SIMPRO no lo calcula |
| 2026-09-14 | La tasa real se calcula con Fisher, y el "Ojo" es justamente restar tasas | Es el error típico, y con inflación alta deja de ser chico |
| 2026-09-14 | En la tabla del francés se quitó la columna "Queda" | Repetía el "Debes" de la fila siguiente y obligaba a desplazar de costado en celular |
| 2026-09-14 | Tercera lámina: anualidades, entre interés compuesto y amortización | Es el puente: la cuota francesa es la cuota de una anualidad cuyo VP es el préstamo |
| 2026-09-14 | La cuota se llama $R$ en todas las láminas | $C$ ya era el capital en interés compuesto |
| 2026-09-14 | En bonos el cupón también es $R$ y se presenta como anualidad | Así la lámina se apoya entera en la anterior, en vez de introducir una letra nueva |
| 2026-09-14 | Duración de Macaulay mostrada como "cuánto esperas tu dinero" con el peso de cada pago, y la modificada sólo como herramienta de sensibilidad | La definición con sumatoria sola no dice nada; el peso del nominal (73%) explica por qué dura casi el plazo |
| 2026-09-14 | Depreciaciones con cuatro métodos: tres contables y el fondo de amortización | El tema dice "métodos contables y financieros"; el fondo conecta con anualidades y es el único que carga más al final |
| 2026-09-14 | El lineal usa `calcularDepreciacionAnual` de SIMPRO con la base C − S | SIMPRO deprecia sin salvamento; pasándole la base, el cálculo es el mismo y queda probado contra el motor |

## Pendiente

- Revisión de Ronald y "publícalas": borrar las cinco líneas `borrador: true,` de Matemática Financiera en `content/materias.ts`. La página de la materia y la portada ya las muestran como lista numerada en este orden.
