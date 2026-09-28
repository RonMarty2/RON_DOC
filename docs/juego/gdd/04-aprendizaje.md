# 04 · Aprendizaje y evaluación

Agente: `disenador-de-aprendizaje`. Cada sección nueva va arriba, con su versión y fecha.

## Decisiones pendientes de Ronald

1. **(La única pregunta de esta ronda, AIEF Tema 1)** Las **características de calidad** de la
   información (relevancia y representación fiel; comparabilidad, verificabilidad, oportunidad y
   comprensibilidad) son la mitad del apartado 1.3 del dossier y hoy el juego no las evalúa. ¿Entran
   al juego como una **hoja de observación** dentro de las carpetas que ya existen (recomendado), o
   se quedan sólo para la defensa oral? Detalle en A1.1, hueco 2.

Si no dices otra cosa, lo demás de esta sección queda como propuesta por defecto (pesos de la nota en
A1.4, variación de 1.1 en A1.2), y el `disenador-de-bucle` lo toma en la etapa siguiente.

---

## AIEF · Tema 1 · versión 1 · 27-09-2026 · Etapa 2 sobre el tema ya construido

**Aviso de etapa.** El Tema 1 se construyó el 27-09 saltándose esta etapa y las 3, 4, 5 y 7 (ver
`.claude/agents/LEEME.md`). Esta revisión se hace **sobre lo construido**, antes de mostrárselo a
Ronald. La etapa 1 (ficha) sí está: `00-adaptacion-aief.md` R3.2 y R3.2-bis. La etapa 3 (bucle)
todavía no existe (`02-bucle-y-mecanicas.md` no está escrito): las mecánicas nuevas que propongo aquí
son **qué tiene que demostrar el alumno**; cómo se juega lo decide el bucle.

**Qué leí:** la ficha (R3.1, R3.2, R3.2-bis), `IDEA-JUEGO.md` §3, §18 y §19, el código
(`src/lib/juego/aief/tema1.ts`, `guion-tema1.ts`, `ventanilla.ts`,
`src/app/juego-aief/EscenaVentanilla.tsx`) y el dossier del Tema 1 (`.tex` y PDF, huella
`7cbe14e402f8`; las páginas citadas son las impresas, que coinciden con las del PDF).

**Palabras de oficio de esta sección:**
- **Diseño inverso:** se parte de lo que el alumno tiene que saber hacer al final y de ahí se baja a
  la prueba y a la situación de juego.
- **Evidencia:** lo que queda escrito en el registro y demuestra que lo sabe (un número, una decisión).
- **Discrimina:** una carpeta discrimina si quien no entendió **no puede** acertarla por otro camino.

### A1.1 Diseño inverso contrastado con lo construido

| Subtema | Sabe hacer (dossier) | Lo demuestra así (hoy) | Si lo hace mal pasa esto | ¿Cubierto? |
|---|---|---|---|---|
| 1.1 | Nombrar qué decisión toma cada usuario con el mismo estado (Cuadro 1, pág. 4) | Elige, para 3 personas fijas (proveedor, socio, SIN), una de 3 decisiones | La persona vuelve a la fila y lo explica de otra forma; pista; a leer el Cuadro 1 | **A medias.** Igual para todos (sólo rota el orden) y se gana por descarte: con 3 opciones y reintento libre, a lo sumo 3 toques. No toca «qué mira primero» (tercera columna del Cuadro 1) ni los usuarios primarios frente a los otros |
| 1.2 | Buscar primero la NC; aceptar la NIIF sólo ante un vacío demostrado (págs. 7 a 10) | Escribe el número de la NC (0 si ninguna) y después acepta o devuelve el balance | NC mal: se corrige ahí con la escalera. Dictamen mal: rojo (auditor) o gris (cliente perdido), y repaso con otras carpetas | **Sí**, lo central. Dos fugas chicas (ver A1.3) |
| 1.3 cálculo | Reexpresar con el índice general de precios, V × I₁ / I₀ (pág. 14), y leer el ajuste como cambio de unidad, no como crecimiento | Escribe el valor de hoy, después el monto del crédito, después una línea al cliente | Valor mal: no avanza, escalera con 6 pistas según el error. Monto mal: gris o rojo, repaso con otro carpintero | **Sí**, con un hueco: el índice de compra es **siempre 100** en las 999 versiones, así que «dividir entre el índice de compra» nunca se pone a prueba (hueco 1) |
| 1.3 calidad | Distinguir las 2 características fundamentales de las 4 de mejora, y saber que una de mejora no rescata la falta de una fundamental (págs. 12, 13 y 15) | **Nada.** Sólo el texto de acierto nombra «unidad de medida»; la línea al cliente se guarda pero no se revisa | Nada | **No** (hueco 2) |
| 1.3 lectura | «La misma sierra, en bolivianos de hoy» (Qué NO se puede afirmar, pág. 15) | La línea al cliente, texto libre de 20 caracteres o más | Nada: cualquier oración pasa | **Sólo evidencia para la defensa**, no evaluada |

**Hueco 1 · el índice de compra fijo en 100.** Con I₀ = 100 siempre, la cuenta se reduce a «libros
por el índice de hoy dividido 100», y el error típico de restar puntos de índice como si fueran
porcentaje (que aparece apenas I₀ no es 100) nunca sale. El dossier usa I₀ = 100 en su ejemplo, pero
enseña la fórmula con I₀. **Propuesta:** que la versión sortee también el índice de compra (por ejemplo
entre 100 y 130, con un cociente limpio) y sumar el diagnóstico «restaste los índices y lo tomaste como
porcentaje» con su pista. Costo: un cambio chico en `carpetaT13` y un revisor más; la versión 0 (Don
Julio, 100 y 115) queda igual.

**Hueco 2 · las características de calidad.** Es la mitad del apartado 1.3 y el juego no la toca.
**Propuesta (recomendada), barata y sin escena nueva:** una **hoja de observación** en las carpetas
que ya existen. En cada carpeta de 1.2 y 1.3 el balance trae además **un defecto sorteado** de una
lista que sale del dossier, y el alumno marca qué característica falla (de las 6) y si es
fundamental o de mejora. La jerarquía se vuelve decisión: si falla una fundamental, el balance se
devuelve aunque la norma esté bien; si sólo falla una de mejora, se acepta con observación.

| Defecto en la carpeta (situación) | Característica | Nivel | De dónde sale |
|---|---|---|---|
| Garantía o activos en valores de hace años, sin reexpresar | Relevancia | Fundamental | pág. 14 y ejemplo de la hiperinflación |
| El balance no muestra una deuda que el cliente sí tiene | Representación fiel | Fundamental | Enron (1.1) y definición, pág. 13 |
| El balance llegó seis meses tarde | Oportunidad | Mejora | ejemplo inmediato, pág. 13 |
| El contador no dejó escrito qué norma aplicó ni por qué | Verificabilidad | Mejora | 1.2, Análisis metodológico, paso 4 (pág. 10) |
| Cambió el método de depreciación y no lo explica en notas | Comparabilidad | Mejora | NC 13 y pág. 13 |
| Notas escritas en jerga que ni el cliente entiende | Comprensibilidad | Mejora | glosario y pág. 13 |

Con 6 defectos por 2 carpetas de 1.2 más 1 de 1.3, la combinación cambia por alumno. Cómo se ve y se
toca lo decide el bucle. **Alternativa:** dejarlo sólo para la defensa (costo cero, pero una parte
que pesa en el dossier queda sin evidencia en el registro). Es la pregunta a Ronald.

### A1.2 Qué varía por alumno y qué no

| Parte | Qué varía | Qué no | Medido | ¿Se puede copiar? |
|---|---|---|---|---|
| Llegada | Nada | Todo | 1 caso | Sí, pero no cuenta para la nota (tutorial) |
| 1.1 | Sólo el orden de las 3 opciones (3 órdenes posibles) | Personas, frases, decisiones | 1 caso | **Sí.** Choca con la regla del 27-09 |
| 1.2 | Operación, nota del contador (4 tipos), cuál carpeta va primero, clientes | Las 14 NC y las 9 operaciones | 235 combinaciones | No en lo que importa |
| 1.3 | Valor en libros, índice de hoy, lo que dice el cliente, lo que pide, su mínimo, sí completo o contraoferta | Índice de compra (siempre 100) | 762 casos en 999 versiones | No |
| Repaso | Otra versión (`versionDeRepaso`) con otros números | | | No |

**Propuesta para 1.1: que varíe con la misma lógica, sólo con el Cuadro 1.** Recomendado (costo
chico, son datos de texto; no hay números):

1. **Quiénes llegan:** la versión sortea 3 de los 5 usuarios del Cuadro 1 que no son el banco
   (inversionista, proveedor, gerencia, SIN, empleado): 10 combinaciones, por 6 órdenes de llegada. El
   banco queda para la jefa, que cierra con «la nuestra es otra», como hoy.
2. **Cada persona no dice quién es: dice qué le pasa.** Dos o tres frases por usuario, sorteadas
   (por ejemplo, empleado: «Me ofrecieron otro trabajo y quiero saber si esta empresa va a seguir»;
   gerencia: «Tengo que decidir si contrato dos vendedores más»). El alumno reconoce al usuario por la
   situación.
3. **Se elige entre las 6 decisiones del Cuadro 1, no entre 3.** Así el descarte ya no sirve (una
   de seis al azar, no una de tres) y las decisiones de los usuarios que no vinieron hacen de
   distractores.
4. **Segundo toque: qué página del balance le muestras primero**, con la columna «Qué mira primero»
   del Cuadro 1 (liquidez y endeudamiento, rentabilidad y patrimonio, capacidad de pago de corto
   plazo, márgenes por línea, utilidad antes de impuestos, continuidad y resultados). Es el paso 3 del
   Análisis metodológico de 1.1 (pág. 4 y 5) y es un gesto de ventanilla: entregas el papel.
5. **Escalón «otros números»:** si falla dos veces la misma persona, se va y llega otra persona
   (otro usuario de los que quedan) en vez de repetir la misma con otra frase.

Con eso hay 10 × 6 × frases × orden de opciones: cada alumno tiene otra respuesta correcta en su
pantalla. Lo que un compañero puede pasarle es **el concepto** («el proveedor decide si fía»), que es
justamente lo que hay que aprender; no una clave de letras.

**Si no se hace:** 1.1 pesa 5 % del registro del Tema 1 y la ficha lo dice. Aun con la variación
propongo que pese poco (10 %): es la entrada al tema, es criterio y no cálculo, y se reconoce más
de lo que se produce.

### A1.3 Errores típicos: cubiertos y faltantes

**Cubiertos por las pistas (bien hechos, cada uno con su número delator):**
- 1.2: supuso el vacío (escribió 0 habiendo NC); otra NC; copió el número de la NIIF; fuera de 1 a 14;
  creyó que había NC cuando es el flujo de efectivo; aceptó uno mal hecho; devolvió uno bien hecho.
- 1.3 valor de hoy: el de libros; el del cliente; por el índice de hoy sin dividir; al revés; sólo el
  ajuste; ya el 60 %.
- 1.3 monto: la regla de ayer (libros); el valor del cliente; lo que pide; el mínimo; rechazó.

**Faltan (con su pista propuesta y dónde se manda a leer):**

| Error | Lo delata | Pista (tuteo) | A leer |
|---|---|---|---|
| Prestó el tope entero cuando pide menos | monto = tope redondeado > lo que pide (hoy cae en «otra») | «Nunca prestas más de lo que te piden.» | tu manual |
| No redondeó a Bs 100 o redondeó hacia arriba | monto a menos de Bs 100 del correcto | «La agencia presta en múltiplos de Bs 100, redondeando hacia abajo.» | tu manual |
| Restó los índices como porcentaje (sólo si se sortea I₀, hueco 1) | libros × (1 + (I₁ − I₀)/100) | «Los índices no son porcentajes: divide el de hoy entre el de compra.» | pág. 14 |
| Creer que el balance es sólo para el SIN (Error 1 de 1.1) | en la variante de A1.2, asignar «verificar la base imponible» a quien no es el SIN | «Ese papel también lo usan el banco y la gerencia, no sólo Impuestos.» | pág. 6 |
| Creer que la gerencia es un usuario neutral (Qué NO, 1.1) | en la variante de A1.2, con la gerencia en la fila | «La gerencia prepara el balance y además lo usa: por eso existen las normas.» | pág. 5 |
| Confundir el auditor externo con el regulador (Error 2 de 1.1) | hoy no hay dónde | Queda para la defensa (A1.4) | pág. 6 |
| Tomar una resolución del CTNAC como ley (Error 2 de 1.2) | hoy no hay dónde | Queda para la defensa | pág. 11 |
| Ignorar las notas (Error 2 de 1.3) | aceptar sin mirar la nota del contador | Ya está implícito: la nota **es** lo que decide el dictamen. Conviene que la pista lo diga: «La nota del contador es la que te dice qué norma usó.» | pág. 16 |
| Que una característica de mejora rescate a una fundamental; que oportuno sea confiable (Qué NO, 1.3) | con la hoja de observación del hueco 2 | «Llegó a tiempo, pero ¿dice la verdad?» | págs. 13 y 15 |

**Fugas que dejan acertar sin entender (a cerrar):**
1. **La frase del cliente delata el dictamen en 1.2.** Sólo las notas «NIIF habiendo NC» traen la
   frase «Bolivia ya adoptó las NIIF» (`diceClienteT12`); es el 60 % de las carpetas para devolver. Quien
   lo nota devuelve por la frase, sin comparar. **Cerrar:** la frase del cliente se sortea de las
   cuatro de «Qué NO se puede afirmar» de 1.2 (pág. 10) y de frases neutras, **independiente** de la
   nota. (El número de NC sí hay que escribirlo antes, así que la fuga es sólo del dictamen.)
2. **El flujo de efectivo siempre se acepta.** Cuando la operación es el flujo, la nota es siempre
   «NIIF supletoria» (40 % de las carpetas bien hechas). Se aprende «flujo, aceptar». **Cerrar
   (barato):** bajar su frecuencia y dejarlo como la excepción que el dossier dice que es.
3. **En 1.3, cuando el caso es de sí completo (la mitad de las versiones), usar el valor del cliente
   da el mismo monto que el correcto** (lo permite `comunValida`). El valor de hoy ya se exigió antes,
   así que el daño es chico, pero en esas versiones el monto no discrimina ese error. Lo cubre la
   defensa (pregunta 2 de la rúbrica).

**Escalera en 1.1:** hoy los escalones (a), (b) y (c) están, pero no hay (d) «otros números»: el
reintento es con la misma persona y las mismas tres opciones. Lo resuelve el punto 5 de A1.2.

### A1.4 ¿Alcanza el registro para la defensa oral?

**Lo que ya queda (y sirve):** la versión del alumno (con ella se regeneran sus carpetas y sus
respuestas correctas: `avanceDe(version, eventos)`), cada número escrito con hora, cada dictamen y
cada monto por separado, la primera decisión (no se rehace), los repasos que hicieron falta, los
escalones de ayuda que vio (concreta y leer) y la línea que le escribió al cliente. Es suficiente
para reconstruir **qué hizo** y **en qué escalón acertó**.

**Lo que falta:**
1. **Dónde lo ve Ronald.** El panel del docente existe sólo para Proyectos II
   (`src/app/juego-proyectos/docente/`; `resumen.ts` lee sólo la planta). Para AIEF, lo guardado está
   en Supabase pero sin pantalla. **Hace falta una hoja por alumno** para la defensa: sus carpetas con
   la respuesta correcta al lado de lo que escribió, sus repasos, su línea al cliente y tres preguntas
   sugeridas. Es trabajo de construcción (etapa 6), no de diseño.
2. **El porqué del dictamen.** Hoy se registra «aceptó» o «devolvió», no la razón. La defensa lo pide
   en voz alta; no hace falta escribirlo en el juego.
3. **La hoja de observación** (hueco 2), si Ronald dice que sí.

**Rúbrica corta de la defensa del Tema 1** (4 criterios, 3 niveles; se usa con la hoja del alumno a
la vista):

| Criterio | Logrado | En proceso | No logrado |
|---|---|---|---|
| 1. Norma | Explica con su carpeta por qué esa operación tenía (o no) NC y qué hizo el contador mal o bien | Da la NC correcta pero no sabe por qué la NIIF no correspondía | No distingue NC de NIIF |
| 2. Reexpresión | Rehace la cuenta con sus índices y dice por qué el cliente no «ganó» | Rehace la cuenta pero lee el ajuste como ganancia | No puede rehacerla |
| 3. Calidad | Nombra qué característica se pierde sin reexpresar (relevancia) y por qué una de mejora no la rescata | Nombra la característica sin la jerarquía | No las distingue |
| 4. Usuarios | Con otro usuario que Ronald elige en el momento, dice su decisión y qué mira primero | Dice la decisión, no qué mira | Lo confunde |

Preguntas de apoyo para los errores que el juego no ve: «¿el auditor externo trabaja para el
Estado?» (Error 2 de 1.1) y «¿una resolución del CTNAC es una ley?» (Error 2 de 1.2).

**Nota (decidido por Ronald, 27-09; reemplaza el «40 % registro, 60 % defensa» que se proponía acá):**
el juego entrega **una nota sobre 100 por tema**; la final es el promedio sobre 100, y **cómo pondera
cada cosa lo decide Ronald después**: no se le propone reparto. El juego es **individual**, sin careo ni
nada en grupo. Cómo se reparten los 100 puntos dentro del Tema 1 (1.1, 1.2, calidad, 1.3) lo propone la
próxima ronda de esta etapa. En qué escalón acertó **no resta**: se muestra en la hoja del alumno.
Quien necesitó repasos aprobó igual, porque el dominio antes de avanzar ya se lo exigió.

**Integridad, en resumen:** 1.2 y 1.3 no se copian (otra versión, otras respuestas). 1.1 se copia
hoy; con A1.2 deja de copiarse la clave. Lo que todavía se puede hacer (que otro juegue por él, o que
le dicten la cuenta) lo cubre la defensa: rehacer **su** cuenta con **sus** índices delante de Ronald.

### A1.5 Para las etapas siguientes

- **Bucle (etapa 3):** decidir cómo se juega la variación de 1.1 (A1.2) y, si Ronald dice que sí, la
  hoja de observación (hueco 2).
- **Narrativa (etapa 4):** frases por usuario para 1.1 (dos o tres cada uno, sin nombrar su rol) y las
  frases de clientes de 1.2 independientes de la nota (fuga 1).
- **Construcción (etapa 6), cuando Ronald apruebe:** sortear el índice de compra (hueco 1), las pistas
  que faltan (A1.3), las dos fugas, y la hoja por alumno para la defensa (A1.4). Todo suma: la
  versión 0 y lo que un alumno ya jugó se siguen leyendo.
- **Nada contradice al dossier** en lo que el juego manda a leer: las páginas de los escalones de 1.1
  (pág. 4), 1.2 (págs. 8 y 9; 7 a 12) y 1.3 (pág. 14) están bien. Falta sumar pág. 5, 6, 10, 11, 13, 15
  y 16 a las pistas nuevas.
