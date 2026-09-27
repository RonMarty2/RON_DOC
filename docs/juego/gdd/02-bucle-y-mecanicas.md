# 02 · Bucle y mecánicas

Agente: `disenador-de-bucle`. Cada sección nueva va arriba, con su versión y fecha.

## Decisiones pendientes de Ronald

1. **Ninguna nueva en esta ronda.** Sigue abierta la de `04-aprendizaje.md` (si las características de
   calidad entran al juego como hoja de observación o quedan sólo para la defensa). Aquí va diseñada su
   versión jugable (B1.6), marcada **«si Ronald aprueba»**, para que decida viendo cómo se jugaría.

Si no dices otra cosa, lo demás de esta sección queda como propuesta por defecto y pasa al
`disenador-narrativo` (etapa 4) y después al crítico (etapa 5), antes de mostrártelo.

---

## AIEF · Tema 1 · versión 1 · 27-09-2026 · Etapa 3 sobre el tema ya construido

**Aviso de etapa.** El Tema 1 se construyó el 27-09 saltándose las etapas 2 a 5 y 7
(`.claude/agents/LEEME.md`). La etapa 1 está (`00-adaptacion-aief.md` R3.1, R3.2 y R3.2-bis) y la 2
acaba de terminar (`04-aprendizaje.md`, «AIEF · Tema 1 · v1»). Esta es la 3, **sobre lo construido**:
dice cómo se juega lo que la 2 pidió demostrar, y qué hay que cambiar en el código para eso (sin
escribirlo). Nada de esto se construye hasta pasar por narrativa, crítico y tu aprobación.

**Qué leí:** `04-aprendizaje.md` (A1.1 a A1.5), `00-adaptacion-aief.md` (R3.1, R3.2, R3.2-bis),
`06-revisiones.md` (las dos revisiones de AIEF), `IDEA-JUEGO.md` §18 y §19, y el código:
`src/lib/juego/aief/tema1.ts`, `guion-tema1.ts`, `ventanilla.ts` y
`src/app/juego-aief/EscenaVentanilla.tsx`.

**Palabras de oficio de esta sección:**
- **Bucle (loop):** lo que el jugador hace una y otra vez. Se mira en tres escalas: el gesto (segundos),
  la carpeta, la jornada.
- **Gesto:** la acción física en la pantalla: tocar un sello, entregar una hoja, escribir un número.
- **Descarte:** acertar sacando las opciones que ya se usaron, sin saber por qué la que queda es la buena.
- **Tanteo:** acertar probando y mirando la respuesta del juego («rojo, bajo; gris, subo»).
- **Delator:** un detalle de la pantalla que dice la respuesta sin que haga falta entender (una frase que
  sólo aparece en los casos de «devolver»).
- **Hoja inferior (bottom sheet):** un panel que sube desde abajo, como el manual de hoy; el botón atrás
  lo cierra primero.

### B1.1 Los tres bucles del Tema 1

**El gesto (segundos):** mirar un papel → tocar o escribir → el mundo responde (la persona se va
conforme o molesta; el campo muestra «Bs 103.500» antes de firmar; la pista aparece). Nunca «correcto
+10 puntos».

**La carpeta (el core loop de la ventanilla, igual que hoy):**

```
llega el cliente y dice su frase
  → abres la carpeta (un papel por pestaña)
  → calculas o buscas EL NÚMERO del tema y lo escribes   ← se corrige ahí, con la escalera
  → [si Ronald aprueba] marcas la hoja de observación     ← no se corrige ahí
  → decides (aceptar / devolver, o el monto) y firmas     ← no se rehace
  → la carpeta se archiva; pasa el siguiente de la cola
```

**La jornada:**

```
la jefa abre (regla del día) → 1.1 en el mostrador (antes de abrir)
  → cola: 2 carpetas de 1.2 → hoja nueva del manual → 1 carpeta de 1.3 (el giro)
  → cierre: se da vuelta la pared → si algo falló, jornada de repaso con OTROS clientes
  → aprobado cuando la última carpeta de cada tipo sale bien
```

**La materia:** lo que se acumula de tema en tema es la pared de fichas (historia, no nota) y el manual
(cada tema suma una regla que choca con la anterior). No cambia en esta ronda.

### B1.2 Diseño inverso, con la mecánica que lo obliga

| Sabe hacer | Lo demuestra así | Si lo hace mal pasa esto |
|---|---|---|
| 1.1 Decir qué decisión toma cada usuario y qué mira primero (Cuadro 1, pág. 4) | Pone el **sello de decisión** y **entrega la hoja del balance** que esa persona mira primero, a personas que no dicen quién son | La persona se va sin lo que necesitaba y llega otra persona (otro usuario); pista según el error |
| 1.2 Buscar la NC antes de aceptar una NIIF (págs. 7 a 10) | Escribe el número de la NC; después acepta o devuelve comparando con la nota del contador, que **nunca delata** | NC mal: se corrige ahí. Dictamen mal: rojo o gris al cierre, repaso con otros clientes |
| 1.3 Reexpresar con I₀ distinto de 100, sin restar índices (pág. 14) | Escribe el valor de hoy con índices como 120 y 150; después el monto | Valor mal: no avanza, pista según el error (incluye «restaste los índices»). Monto mal: color al cierre, repaso |
| 1.3 calidad (si Ronald aprueba) | En la hoja de observación marca qué característica falla, y su dictamen sigue la jerarquía | Al cierre: el auditor observa (rojo) o el cliente se va (gris); repaso |

### B1.3 (a) 1.1 · El mostrador: sellos y hojas

**Qué cambia de fondo:** hoy son 3 personas fijas y 3 opciones con reintento (se gana por descarte en
tres toques). Pasa a ser **un gesto de ventanilla con dos partes, sobre personas sorteadas que no dicen
su rol**, sin reintento sobre la misma persona.

**Qué ve (375×812, sin teclado en todo 1.1):**
- Arriba, la persona (silueta en el mostrador) y su frase, que cuenta **qué le pasa**, no quién es
  («Me ofrecieron otro trabajo y quiero saber si esta empresa va a seguir»). La frase queda fija arriba
  mientras decide.
- Debajo, **el portasellos**: 6 sellos en una grilla de 2 × 3, uno por decisión del Cuadro 1 (las seis,
  también la del banco). Botones grandes, de al menos 48 px de alto, con el texto corto del Cuadro 1.
- Después de sellar, **el balance de la Ferretería San Isidro** como una carpeta con 6 hojas en una lista
  vertical (las de la columna «Qué mira primero» del Cuadro 1: liquidez y endeudamiento; rentabilidad y
  patrimonio; capacidad de pago de corto plazo; márgenes por línea; utilidad antes de impuestos;
  continuidad y resultados). Toca la hoja y **se la entregas**.

**Qué toca:** sello (1 toque) → hoja (1 toque). Dos toques por persona. Nada se arrastra.

**Cómo varía por alumno (A1.2 de `04`):** la versión sortea 3 de los 5 usuarios que no son el banco (10
combinaciones), su orden (6), la frase de cada uno (2 o 3 por usuario, las escribe el narrativo), el
orden de los sellos en la grilla y el de las hojas. La versión 0 queda como hoy (proveedor, socio que
piensa retirar su parte, inspectora del SIN), para el ejemplo.

**Por qué no se gana por descarte:** los sellos y las hojas **no se gastan**: quedan en el portasellos
para la persona siguiente. Con 6 sellos y 6 hojas siempre disponibles, cada persona es una de seis por
una de seis. El banco nunca viene a la fila, pero su sello está: es un distractor más.

**Qué pasa si se equivoca:** la persona reacciona en el mundo **sin decir cuál era**: «Con esto no
decido nada de lo mío» y se va (la silueta sale por la puerta). La pista va según el error (las de A1.3
de `04`, por ejemplo: sello del SIN a quien no es el SIN → «Ese papel también lo usan el banco y la
gerencia, no sólo Impuestos»; a la gerencia con sello de otro → «La gerencia prepara el balance y además
lo usa»). **No se rehace:** entra a la fila **otra persona**, otro usuario de los que no vinieron (es el
escalón (d), «otros números», puesto de entrada, como en las carpetas). Si ya pasaron los cinco, vuelve
uno con **otra frase**. Escalera: 1.ª falla, consecuencia y pista; 2.ª, pista concreta («pregúntate qué
va a hacer con el balance, no quién es»); 3.ª, a leer el Cuadro 1 (pág. 4) y págs. 5 y 6.

**Sello bien y hoja mal** cuenta como falla (la decisión sin saber qué mirar es la mitad del subtema),
con su propia pista: «La decisión es esa. Pero ¿qué parte del balance le contesta su pregunta?».

**Para pasar:** tres personas bien atendidas (sello y hoja), no hace falta que sea seguidas. Pesa 10 %
del registro del tema (propuesta de `04`). Cierra la jefa como hoy: «La nuestra es otra».

**Lo que un compañero puede pasarle:** «el proveedor decide si fía y mira la plata de corto plazo». Es
el concepto, que es lo que hay que aprender. No hay clave de letras que copiar.

**Riesgo que queda:** alguien que falla muchas veces puede ir juntando «a este no le va tal sello».
Llega tarde (la escalera ya lo mandó al Cuadro 1 en la 3.ª), el registro muestra cuántas personas hizo
falta y 1.1 pesa poco. Se acepta.

### B1.4 (b) 1.2 · Que nada delate el dictamen

Hoy hay **tres delatores**, no dos:

1. **La frase del cliente** (`diceClienteT12`): «Bolivia ya adoptó las NIIF» sólo sale cuando hay que
   devolver.
2. **La nota del contador** (`textoNota`): la nota mal hecha dice «Como Bolivia ya adoptó las NIIF…» y la
   bien hecha con NIIF dice «…porque ninguna NC boliviana lo regula». Quien lee sólo la justificación
   acierta sin buscar. Este no estaba en `04`.
3. **El flujo de efectivo**: aparece sólo en carpetas bien hechas (40 % de ellas), y el texto de acierto
   de la NC le dice «así que la NIIF entra como supletoria» antes de dictaminar.

**Cómo se juega sin delatores:**

- **La nota del contador tiene siempre la misma forma:** «Registrado según la [norma]. [Justificación].»
  La justificación se sortea **aparte** de si está bien o mal. En particular, la nota mal hecha con NIIF
  dice lo mismo que la bien hecha: **«porque ninguna NC boliviana lo regula»**. Eso es justo el error del
  subtema (el contador **supuso el vacío**), y sólo lo desmiente quien buscó la NC en el manual. La
  otra justificación («como Bolivia ya adoptó las NIIF») puede salir en cualquier nota que use NIIF,
  también en la del flujo, que está bien hecha.
- **La frase del cliente** se sortea de un grupo propio, **independiente de la nota**: las frases de «Qué
  NO se puede afirmar» de 1.2 (pág. 10) y frases neutras («Aquí tienes el balance que preparó mi
  contador»). Cada frase sale igual de seguido en carpetas para aceptar y para devolver. Las escribe el
  narrativo.
- **El texto de acierto de la NC queda neutro:** «Bien: la rige la NC 10» o «Bien: ninguna NC la
  regula». Sin «así que la NIIF entra». Comparar con la nota es trabajo del alumno.
- **El flujo de efectivo, como excepción y con dos caras.** Recomendado:
  - sale en **una de cada cuatro jornadas** más o menos, no en casi la mitad;
  - cuando sale, la mitad de las veces está bien hecho (NIC 7 supletoria) y la otra mitad **mal**: el
    contador cita una NC que no lo regula («Registrado según la NC 11»). Es la misma lógica de «NC
    equivocada» que ya existe; el alumno escribe 0 (ninguna NC lo rige) y devuelve, porque la nota no
    coincide.
  - **Alternativa más barata:** sólo bajar la frecuencia y dejarlo siempre bien hecho. Costo: quien lo ve
    dos veces aprende «flujo, aceptar» como patrón, aunque sea cierto.
  - Ojo para el crítico: la cara «mal» presenta como error citar una NC para el flujo. Es coherente con
    lo verificado en R3.2-bis (el flujo es el único vacío, NIC 7 supletoria, pág. 7), pero es una
    adaptación del juego y se marca así.

**Qué toca el alumno, igual que hoy:** escribe el número de NC (teclado numérico, campo fijo arriba del
teclado) y después dos botones, ACEPTAR o DEVOLVER (tres si entra la calidad, B1.6). El dictamen **no
se corrige ahí**: el color se ve al cierre.

**Prueba que lo encierra (para la etapa 6):** en las 999 versiones, para cada frase del cliente y cada
justificación de la nota, la proporción de «devolver» queda entre 35 % y 65 %; el flujo aparece en
ambos dictámenes; y «devolver si la nota dice NIIF» o «aceptar si el cliente no dice nada raro» no
aciertan una jornada completa en más del 30 % de las versiones.

### B1.5 (c) 1.3 · Índice de compra distinto de 100

**Qué ve:** la misma carpeta de hoy, con el índice de compra sorteado. En la franja de cifras que queda
fija arriba del campo (con el teclado abierto): **Sierra en libros · Índice al comprarla · Índice hoy**,
por ejemplo 80.000 · 120 · 150.

**Cómo varía:** desde la versión 1, el índice de compra **nunca es 100** en la jornada (se sortea, por
ejemplo, entre 105 y 130) y el de hoy sale de multiplicarlo por un factor limpio (1,10 a 1,40), con dos
condiciones: el índice de hoy es entero y el valor de hoy cae en múltiplos de Bs 100. La versión 0
(Don Julio, 100 y 115) queda igual, como ejemplo del dossier.

**Recomendado:** que I₀ = 100 no aparezca en la jornada. Si apareciera a veces, el atajo «dividir entre
100» acertaría justo ahí y el registro guardaría un acierto que no dice nada.

**Los errores del valor de hoy, con I₀ distinto de 100** (se corrigen en la carpeta, con la escalera):

| Error | Lo que escribe (ej. 80.000, 120 → 150) | Pista (tuteo) |
|---|---|---|
| Restó los índices y lo tomó como porcentaje | 80.000 × 1,30 = 104.000 | «Los índices no son porcentajes: de 120 a 150 son 30 puntos, pero no es un 30 %. Divide el de hoy entre el de compra.» |
| Ignoró el de compra (el hábito del 100) | 80.000 × 1,50 = 120.000 | «Dividiste el índice de hoy entre 100. Aquí la sierra se compró con el índice en 120: divide entre ese.» |
| Al revés | 80.000 × 120 / 150 = 64.000 | la de hoy («el valor tiene que subir») |
| Los de hoy: en libros, del cliente, por el índice sin dividir, sólo el ajuste, ya el 60 % | | las de hoy |

Correcto: 80.000 × 150 / 120 = **100.000**. Escalón «a leer»: pág. 14.

**Qué revisa la versión (para la etapa 6):** los montos de todos los errores del valor de hoy son
distintos entre sí y del correcto, con al menos Bs 1.000 de diferencia (que no se confundan a la vista
en un celular). Hoy el diagnóstico «al revés» calcula libros entre índice de hoy, que sólo es cierto
con I₀ = 100: hay que corregirlo.

**Opcional, barato (primero se ve, después se calcula):** en la ficha, las dos cifras de índice como dos
barras (120 y 150) con el tramo que subió marcado «30 puntos sobre 120». Se construye sólo si sobra;
no cambia la mecánica.

### B1.6 (d) Calidad de la información · **SI RONALD APRUEBA**

Se juega **sólo en las dos carpetas de 1.2**. En 1.3 no: ahí la característica que falla es siempre la
relevancia (el valor sin reexpresar), así que sería la misma respuesta para todos y se copiaría. La
relevancia queda en el texto de acierto del valor de hoy y en la defensa (criterio 3 de la rúbrica).

**Qué ve:** la carpeta de 1.2 trae, además de la operación y la nota, **un papel más** en una pestaña
(la portada del balance, una carta, el anexo de notas). En una de cada tres carpetas más o menos no hay
nada raro; en las otras, **un defecto sorteado** de la tabla de `04` A1.1, escrito como hecho en el papel,
no señalado: «Balance al 31-12-2025 · entregado el 20-07-2026» (oportunidad, mejora); una carta del
banco de enfrente que reclama una deuda que no está en el pasivo (representación fiel, fundamental); la
maquinaria «a valor de compra de 2016, sin ajustar» (relevancia, fundamental); y así.

**Qué toca (después de escribir la NC bien):**
1. **La hoja de observación** sube desde abajo: 7 sellos (las 6 características y «nada que observar»).
   Toca uno. Las etiquetas dicen el nombre de la característica **sin** decir si es fundamental o de
   mejora: esa jerarquía la tiene que traer el alumno.
2. **El dictamen, con tres botones:** ACEPTAR · ACEPTAR CON OBSERVACIÓN · DEVOLVER.

**La jerarquía se vuelve decisión:**

| Norma | Defecto | Dictamen correcto |
|---|---|---|
| mal | cualquiera | devolver |
| bien | fundamental | devolver (aunque la norma esté bien) |
| bien | de mejora | aceptar con observación |
| bien | ninguno | aceptar |

**Qué pasa si se equivoca:** nada se corrige ahí ni se rehace (siete sellos con respuesta inmediata
sería tanteo). Al cierre, en la pared: aceptar con una fundamental fallando → **rojo** («el auditor lo
observó: el balance no decía la verdad»); devolver o poner observación a uno sano → **gris** («el cliente
se ofendió y se fue»); aceptar con observación cuando fallaba una fundamental → **rojo** («llegó a
tiempo, pero ¿decía la verdad?», el Qué NO de 1.3). El sello de observación equivocado, aunque el dictamen
salga bien, manda ese tipo al repaso con su pista (lo que se evalúa es reconocer la característica).
Escalera en el repaso: pista según el sello → qué revisar («primero: ¿es relevante y dice la verdad?
Recién después, lo demás») → a leer págs. 12, 13 y 15.

**Choques a cuidar al sortear:** el defecto de comparabilidad («cambió el método de depreciación sin
explicarlo») no sale si la operación marcada es el cambio contable (NC 13), y el de verificabilidad no
puede tratar de la nota de la operación marcada (se mezclaría con 1.2): va sobre otra cifra del balance.
El narrativo escribe los papeles; los defectos salen de la tabla de `04`, y lo inventado se marca.

**Perezosos:** «nada que observar siempre» falla en dos de cada tres; «devolver siempre» pierde los
sanos y los de mejora; «con observación siempre» pierde los sanos, los mal normados y los fundamentales.

**Costo en el ritmo:** 2 toques más por carpeta de 1.2 (4 por jornada), sin teclado.

### B1.7 Ritmo de la jornada

Contado en pantallas y gestos, no en tiempo:

| Parte | Hoy | Propuesto | Con calidad |
|---|---|---|---|
| Llegada | 3 «seguir» + 1 número | igual | igual |
| 1.1 | 3 toques como mínimo | 6 toques como mínimo, sin teclado | igual |
| 1.2 (×2) | 1 número + 1 toque | igual | + 2 toques |
| 1.3 | 2 números + 1 línea | igual | igual |
| Cierre | 1 toque | igual | igual |

La jornada crece en 3 toques (7 con calidad) y **ninguna escritura**. No se agrega ninguna carpeta. Lo que
más alarga hoy es la línea libre al cliente de 1.3 (teclado de texto en el celular); se mantiene porque
es la evidencia para la defensa, pero conviene que el narrativo la acorte a una línea guiada («La misma
sierra, en bolivianos de hoy, vale…»). Queda a su criterio.

### B1.8 Nadie gana sin entender: los perezosos contra el Tema 1

| Perezoso | 1.1 | 1.2 | 1.3 |
|---|---|---|---|
| Descarte | Los sellos y hojas no se gastan: no sirve | Dos botones, pero una de cada carpeta de cada lado: 50 % por carpeta, 25 % la jornada, y el repaso trae otros | No hay opciones: se escribe |
| Tanteo | La persona se va; llega otra | El dictamen no se ve hasta el cierre y no se rehace | Valor: pistas, no colores. Monto: color al cierre, repaso con otros números |
| Leer el delator | Nadie dice su rol | Frase y nota independientes del dictamen | I₀ distinto de 100: el atajo del 100 falla |
| Copiar | Otras personas, frases, orden | Otra operación, nota, orden | Otros números e índices |
| Siempre lo mismo | Un solo sello: acierta 1 de 6 | Siempre aceptar o siempre devolver: pierde uno por jornada | Siempre lo que pide, cero o el mínimo: pierde (ya probado) |

### B1.9 Economía

En el Tema 1 no se agrega ningún recurso. La meta de colocación sigue fuera (con un solo crédito
delataría el monto: R3.2-bis, decisión 3). Lo que se mueve es la **pared** (historia, se ve al cierre) y
la **cola** (tensión sin reloj). Un recurso más (caja, reputación) no cambiaría ninguna decisión de este
tema, así que sobraría.

### B1.10 En el celular (375×812) y en la app

- **Sin teclado en 1.1 y en la calidad:** todo es tocar.
- **Con teclado (NC, valor de hoy, monto):** la franja de cifras que usa (operación marcada en 1.2;
  libros, I₀ e I₁ en 1.3) queda **fija arriba del campo**. Hoy la ficha va arriba del diálogo y con el
  teclado abierto se va de la pantalla: hay que medirlo.
- **Botón atrás:** cierra primero la hoja de observación o el manual, después la carpeta, y recién
  después pregunta si sales (sigue pendiente de la construcción del 27-09).
- **Grillas de 2 columnas** (sellos) y listas verticales (hojas del balance): nada de 6 botones en una fila.
- **Sin red:** cada gesto es un evento que se guarda en el teléfono como hoy; no cambia.

### B1.11 Qué hay que construir (etapa 6) y qué se reutiliza

**Se reutiliza sin tocar:** `escalera.ts`, `partida.ts`, `nube.ts`, `version-alumno.ts`; de
`ventanilla.ts`, `montoCorrecto`, `colorDelCierre`, `redondearAbajo100`, `REGLAS` y todo lo del Tema 2;
`reexpresar`; el cierre con la pared, el `Mostrador`, el manual con las 14 NC, `versionDeRepaso`,
`carpetasDeRonda` y la lógica de rondas de `avanceDe`; los textos del cierre y del repaso.

**Hay que construir o cambiar (todo suma):**

1. **Lo guardado se sigue leyendo (lo primero).** Cambiar cómo se sortean las carpetas cambia lo que vio
   quien ya jugó: `avanceDe` recalcularía sus colores con carpetas nuevas. Recomendado: la partida guarda
   **con qué generación de carpetas se jugó**; sin ese dato es la de hoy, que se conserva tal cual al
   lado de la nueva. Hoy es borrador y casi nadie jugó, pero la regla 4 de «Estructura» vale igual.
2. **1.1 (`tema1.ts`):** los 6 usuarios del Cuadro 1 con su decisión y su «qué mira primero»; el
   sorteo por versión (quiénes, orden, frase); un evento nuevo para «sello y hoja entregados a tal
   persona», con el evento `usuario` de hoy todavía leído; la cola de personas que sigue a una falla; el
   diagnóstico del error para la pista. En `guion-tema1.ts`, las frases por usuario (narrativo) y las
   pistas nuevas. En la pantalla, el portasellos y la carpeta de hojas en lugar de las tres opciones.
3. **1.2:** `textoNota` con forma única y justificación sorteada aparte; la frase del cliente sorteada
   de su propio grupo; `aciertoNC` neutro; la frecuencia del flujo y su cara «mal»; la prueba de
   independencia de B1.4.
4. **1.3 (`ventanilla.ts` y `tema1.ts`):** sortear el índice de compra; las reglas nuevas de
   `versionValida`; los diagnósticos «restó los índices» e «ignoró el de compra»; corregir «al revés»;
   la franja de cifras fija con el teclado abierto.
5. **Calidad, sólo si Ronald aprueba:** el defecto en la carpeta de 1.2, el evento de la observación, el
   tercer dictamen y sus colores, su diagnóstico para el repaso, y la hoja inferior.
6. **Pruebas:** los perezosos de B1.8 (con las nuevas variantes de 1.1 y 1.2), la independencia de los
   delatores, los errores de 1.3 distintos en las 999 versiones, y que una partida vieja se siga leyendo
   con el resultado que tenía.

### B1.12 Avisos para otras partes

- **`disenador-narrativo` (etapa 4):** frases por usuario de 1.1 (2 o 3 cada uno, sin decir su rol, más
  sus reacciones cuando se va conforme y cuando se va molesto sin delatar la respuesta); el grupo de
  frases de clientes de 1.2 independientes del dictamen; las justificaciones de la nota; si Ronald
  aprueba, los papeles con defecto; y ver si la línea al cliente de 1.3 se guía.
- **`disenador-de-aprendizaje`:** el tercer delator (la nota del contador) no estaba en A1.3: conviene
  sumarlo. Nada de lo propuesto cambia los pesos de A1.4.
- **`critico-de-jugabilidad` (etapa 5):** revisar la cara «mal» del flujo (adaptación del juego) y el
  riesgo de descarte a largo plazo en 1.1 (B1.3).
