# Bitácora — Matemática Financiera

**Estado:** tres láminas en borrador, **sin enlazar** y con `noindex`. Ninguna sale todavía del dossier de Ronald: están armadas con definiciones estándar y esperan su revisión.
**Última actualización:** 2026-09-14

---

## Láminas

| Lámina | Ruta | Tarjetas | Cálculos desde |
|---|---|---|---|
| Interés compuesto e inflación | `/interes-compuesto` | 12 | `src/lib/finanzas/interes.ts` |
| Cuotas iguales: cuánto valen hoy y al final (anualidades) | `/anualidades` | 11 | `src/lib/finanzas/anualidades.ts` |
| Tres formas de devolver un préstamo | `/amortizacion` | 10 | `src/lib/simpro/calculo-financiero.ts` (`calcularAmortizacionGenerica`) |

Encadenadas con el pie de la tarjeta: interés compuesto → anualidades → amortización.

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

## Decisiones

| Fecha | Decisión | Por qué |
|---|---|---|
| 2026-09-14 | Primera lámina financiera: amortización, con el motor de SIMPRO | Es lo que el motor ya calcula y probado |
| 2026-09-14 | Segunda: interés compuesto, con funciones propias y pruebas | Es el primer tema de la materia y la base del préstamo; SIMPRO no lo calcula |
| 2026-09-14 | La tasa real se calcula con Fisher, y el "Ojo" es justamente restar tasas | Es el error típico, y con inflación alta deja de ser chico |
| 2026-09-14 | En la tabla del francés se quitó la columna "Queda" | Repetía el "Debes" de la fila siguiente y obligaba a desplazar de costado en celular |
| 2026-09-14 | Tercera lámina: anualidades, entre interés compuesto y amortización | Es el puente: la cuota francesa es la cuota de una anualidad cuyo VP es el préstamo |
| 2026-09-14 | La cuota se llama $R$ en todas las láminas | $C$ ya era el capital en interés compuesto |

## Pendiente

- Revisión de Ronald y "publícala" (agregar como herramientas de `matematica-financiera` en `content/materias.ts` y quitar `robots` de cada `page.tsx`).
- Bonos y depreciaciones (ver `BITACORA.md` §7).
