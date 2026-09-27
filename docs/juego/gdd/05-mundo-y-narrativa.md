# 05 · Mundo y narrativa

Agente: `disenador-narrativo`. Cada sección nueva va arriba, con su versión y fecha.

**Versión 1 · 27-09-2026**

## Decisiones pendientes de Ronald

1. ~~Giros del valle o castellano neutro~~ **Decidido por Ronald (27-09): castellano neutro con tuteo, sin
   giros regionales.** Todo lo de abajo ya está así.

Lo demás de esta sección queda como propuesta por defecto y pasa al `critico-de-jugabilidad` (etapa 5)
antes de mostrártelo.

---

## AIEF · Tema 1 · versión 1 · 27-09-2026 · Etapa 4 sobre el tema ya construido

**Aviso de etapa.** El Tema 1 se construyó el 27-09 saltándose etapas. La 1 (ficha, `00-adaptacion-aief.md`
R3.2 y R3.2-bis), la 2 (`04-aprendizaje.md`) y la 3 (`02-bucle-y-mecanicas.md`) ya están. Esta es la 4,
**sobre lo construido**: quién aparece, qué dice y qué frases del código conviene cambiar (sin tocarlo).

**Decisión nueva de Ronald (27-09):** las características de calidad **entran al juego** con la hoja de
observación de B1.6. Por eso la parte 4 de abajo ya no va marcada «si Ronald aprueba». El plan completo
se le muestra en simple antes de construir.

**Qué leí:** `02` (B1.1 a B1.12), `04` (A1.1 a A1.5), `00-adaptacion-aief.md` (R3.1, R3.2, R3.2-bis y el
marco A), `IDEA-JUEGO.md` §19, `src/lib/juego/aief/guion-tema1.ts`, `tema1.ts`, la línea de
`EscenaVentanilla.tsx` que muestra el nombre de cada persona, y el dossier del Tema 1 (`.tex`, huella del
PDF `7cbe14e402f8`): Cuadro 1 (pág. 4), los tres «Qué NO se puede afirmar» (1.1, 1.2 y 1.3), los Errores
y el apartado 1.3 (págs. 12 a 16).

**Palabras de oficio de esta sección:**
- **Grupo de frases (pool):** varias frases que dicen lo mismo con otras palabras; la versión del alumno
  sortea cuál sale.
- **Romper la ficción:** cuando un texto del juego habla como el curso («Tema 1») y no como la agencia.
- **Palabra delatora:** una palabra que repite el texto de la respuesta (si la persona dice «contratar»,
  el sello «Invertir, contratar, fijar precios» se elige sin pensar).

### N1.1 El mundo del Tema 1

**La agencia de Cliza del Banco Kusi** (ficticio). Una casa antigua sobre la plaza, con una sola
ventanilla de créditos: la tuya. Detrás del vidrio, el escritorio de Doña Teresa. En la pared de tu lado,
un corcho vacío: **la pared**, donde va una ficha por cada crédito que firmas. En la puerta, un banco de
madera donde espera la cola. **Enfrente, cruzando la plaza, la cooperativa**: sin nombre, siempre con
gente. Es adonde se van los clientes que no atiendes bien, y adonde van a caer en mora los que no podían
pagar. La cooperativa tiene que aparecer en la Llegada, porque después la nombran los textos del cierre.

**El oficial (el alumno).** Recién llegado, sin nombre y **sin género**: nadie le dice «bienvenido» ni
«bienvenida». Lo tratan de tú.

**Ficha de personaje · Doña Teresa, jefa de agencia**

| | |
|---|---|
| Quién es | Unos cuarenta años en el banco, a punto de jubilarse. Empezó de cajera en 1985, en plena hiperinflación: «contábamos los billetes por bultos». |
| Qué le importa | Que la agencia no cierre y que la pared no se llene de rojo. Le molesta perder un buen cliente con la cooperativa de enfrente tanto como prestarle a uno que no paga. |
| Cómo habla | Frases cortas, sin tecnicismos, de pie junto a tu silla. Nunca te da la respuesta: te hace una pregunta o te manda al manual. |
| Para qué sirve en el juego | Abre cada jornada con la regla del día y la **justifica con algo que vivió**, para que ninguna regla caiga del cielo. Cierra con dos líneas. |
| Aparece en | Llegada, apertura de 1.1, apertura de la jornada, hoja nueva de 1.3, cierre, repaso. |

Su recuerdo de 1985 es el ejemplo comentado de 1.3 del dossier (la hiperinflación de 1984 y 1985, pág. 15)
puesto en boca de alguien. No da cifras: las cifras del dossier se quedan en el dossier.

**Ficha de personaje · Doña Nieves, dueña de la Ferretería San Isidro** (nueva, para 1.1)

| | |
|---|---|
| Quién es | Clienta de la agencia desde hace años. Su contador le acaba de entregar el balance del año. |
| Qué le pasa | Cinco personas le pidieron ese balance para cosas distintas y no sabe qué parte darle a cada una. |
| Cómo habla | Apurada y franca: «Yo sé vender clavos, no leer balances». |
| Por qué hace falta | Hoy la escena dice que tres personas llegan **al banco** a pedir el balance de un cliente. Un banco no reparte los papeles de sus clientes: un alumno de administración lo nota, y la escena parece salida de la nada. Con Doña Nieves, el balance es de ella y es ella quien lo entrega; tú la ayudas. |
| Aparece en | Sólo en 1.1. Si hay Tema 2 de la ferretería, puede volver. |

**Los cinco momentos, en orden de la historia**

| Momento | Día | Cómo se presenta (para que nada aparezca de la nada) |
|---|---|---|
| **Llegada** | Día 1 | Doña Teresa te muestra la ventanilla, el manual con la regla cero, la pared vacía y, por la ventana, la cooperativa de enfrente. Primera clienta: Doña Rosa y su moto. Al cerrar se da vuelta la pared: el juego adelanta el tiempo para que veas cómo terminó el crédito. |
| **1.1** | Día 2, antes de abrir | Doña Nieves entra antes que la cola, con su balance recién hecho y una fila de gente detrás que se lo pidió. Doña Teresa: «Ayúdala, que esto también es trabajo nuestro». Tú sellas qué va a decidir cada persona y le das la hoja que necesita. Cierra Doña Teresa con la decisión del banco. |
| **1.2** | Día 2, la cola | Doña Teresa abre la ventanilla y cuenta por qué se revisa la norma: el año pasado el auditor del banco observó balances que citaban normas que no correspondían. Desde la decisión nueva de Ronald, suma la hoja de observación: «Una norma bien puesta no garantiza que el balance diga la verdad». |
| **1.3** | Día 2, última carpeta | El giro. Doña Teresa trae la hoja nueva del manual y la justifica con 1985. Entra el carpintero con su sierra. |
| **Cierre** | Día 2, noche | Se da vuelta la pared. Doña Teresa dice dos líneas. Si algo falló, «mañana» es la jornada de repaso (Día 3 en adelante). |

### N1.2 Para 1.1: las cinco personas que no son el banco

Cada persona dice **qué le pasa**, nunca quién es ni qué va a decidir. **Nombre que ve el alumno: sólo el
nombre** («Doña Elena»), sin el rol. El rol va aparte, para el registro del docente (ver N1.5, cambio 4).

**Palabras que ninguna frase puede tener** (para una prueba en la construcción): los nombres de los roles
(inversionista, socio, accionista, proveedor, gerente, gerencia, SIN, Impuestos, fisco, inspector,
empleado) y las palabras de las decisiones del Cuadro 1 (aportar, retirar, capital, contado, 30 días,
invertir, contratar, fijar precios, verificar, base imponible, declarada, permanecer, negociar).

Nombres sugeridos (uno por rol, fijo por rol en todas las versiones para que el registro se lea fácil;
si se prefiere sortearlos también, son sólo texto): Don Hugo (inversionista), Doña Elena (proveedor),
Rodrigo (gerencia: el hijo de Doña Nieves, que maneja la tienda), la licenciada Aguilar (SIN), Wilma
(empleada).

**Inversionista** · decide aportar o retirar capital · mira rentabilidad sostenida y patrimonio
1. «Hace cinco años puse mis ahorros en esta ferretería, y cada diciembre me toca una parte de lo que gana. Mi hermano dice que saque lo mío y me compre un minibús.»
2. «Me ofrecen entrar con una parte del negocio si pongo plata para abrir otra tienda en Tolata. Antes quiero saber si esto gana de verdad, un año tras otro.»
3. «Fundé esta ferretería con Doña Nieves y la mitad es mía. Estoy pensando si sigo metiendo plata o si saco lo que me toca.»

**Proveedor** · decide vender al contado o a 30 días · mira capacidad de pago de corto plazo
1. «Cada mes les traigo cemento de la fábrica. Ahora me piden que les deje la carga y les cobre el mes que viene.»
2. «Les entrego clavos y tornillos desde hace años. El último pedido me lo pagaron tarde, y el que viene es el doble.»
3. «Me encargaron veinte rollos de alambre para la siembra. Si se los dejo sin cobrar, ¿me van a poder pagar cuando vendan?»

**Gerencia** · decide invertir, contratar, fijar precios · mira márgenes por línea de negocio
1. «Cada mañana abro la tienda y cuadro la caja. Vendemos mucha pintura, pero no sé si con ella ganamos algo o sólo movemos plata.»
2. «En diciembre la gente hace fila en el mostrador y somos dos para atender. Soy yo quien organiza la tienda, y no sé si nos alcanza para sumar a alguien.»
3. «Nos ofrecen una mezcladora para alquilarla a los constructores. La compraría la ferretería, y la última palabra es mía.»

**SIN** · decide verificar la base imponible declarada · mira utilidad antes de impuestos
1. «Traigo el formulario que la ferretería presentó en abril. Quiero ver si lo que pusieron ahí coincide con lo que dice su balance.»
2. «Mi oficina revisa este mes a los comercios de la provincia. Según sus papeles la ferretería casi no ganó nada, y tiene el depósito lleno.»
3. «Tengo una orden de fiscalización con el nombre de la ferretería.»

**Empleado** · decide permanecer o negociar condiciones · mira continuidad y resultados del periodo
1. «Trabajo en el depósito hace ocho años. Me ofrecieron un puesto en una ferretería de Punata y tengo que responder el lunes.»
2. «Somos seis en la tienda y este año no hubo aumento. Doña Nieves dice que las ventas bajaron; quiero verlo con mis propios ojos antes de hablar con ella.»
3. «Me ofrecieron otro trabajo, con menos sueldo pero seguro. Quiero saber si esta ferretería va a seguir abierta el año que viene.»

**Cómo se revisó que no se confundan:** «saco lo mío» (inversionista) no usa «quedarse», que sonaría a
empleado; la mezcladora dice «la compraría la ferretería», para que no suene a alguien que pone su plata;
el proveedor siempre habla de mercadería que entrega. **La frase 3 del SIN es la más fácil a propósito:**
conviene que la versión la saque poco (o sólo como segunda frase de B1.3, cuando vuelve una persona).

**Reacciones, iguales para todos** (se sortean; no dicen si fallaste en el sello o en la hoja, y no dicen
cuál era):
- Se va conforme: «Con esto ya sé qué hacer. Gracias.» · «Justo lo que necesitaba ver.» · «Esto me
  contesta. Me voy tranquila.» (o «tranquilo», según el personaje).
- Se va sin lo que necesitaba: «Con esto no decido nada de lo mío.» · «Esta hoja no me contesta lo que
  vine a preguntar.» · «Me voy igual que llegué.»

La pista que diferencia sello de hoja (B1.3: «La decisión es esa. Pero ¿qué parte del balance le contesta
su pregunta?») la da **el juego**, no la persona. Aviso para el crítico: esa pista confirma que el sello
estaba bien; es aceptable porque la persona ya se fue y la siguiente es otra.

**Doña Teresa cierra 1.1** (reemplaza a `CIERRA_T11`): «El mismo papel, cinco preguntas distintas. La
nuestra es otra: si le prestamos, cuánto y a qué tasa. Abramos la ventanilla.» (Si la versión trajo
tres personas, «tres preguntas»: el número sale del sorteo, no escrito a mano.)

### N1.3 Para 1.2: lo que dice el cliente, sin delatar el dictamen

Salen de los «Qué NO se puede afirmar» del dossier: 1.2 (pág. 10), 1.1 (pág. 5) y 1.3 (pág. 15). Cada
frase es algo que el cliente cree y que el dossier dice que **no** se puede afirmar; ninguna dice si el
balance está bien o mal. Para que no contradigan la nota del contador, van en tres grupos:

**Grupo A · con cualquier nota**

| Frase | De dónde sale |
|---|---|
| «Aquí tienes el balance que preparó mi contador.» | neutra |
| «Te traigo el balance del año. Lo necesito para el préstamo.» | neutra |
| «Mi contador me dijo que te lo entregue en mano.» | neutra |
| «Mi contador dice que lo que aprueba el CTNAC es ley, y él lo cumple al pie de la letra.» | 1.2, Qué NO 3 (y Error 2) |
| «Mi contador ya lo prepara para las normas nuevas del 2027. Más al día, imposible.» | 1.2, Qué NO 4 |
| «Está completito, no le falta ni una hoja.» | 1.1, Qué NO 4 (cumplir la forma no es ser confiable) |
| «Cumple todas las normas. Con eso ya sirve, ¿no?» | 1.3, Qué NO 1 |

**Grupo B · sólo si la nota cita una NIIF** (sale igual con la nota bien hecha del flujo y con la mal
hecha que cita la NIIF habiendo NC)

| Frase | De dónde sale |
|---|---|
| «Mi contador dice que Bolivia ya adoptó las NIIF, como Brasil y Argentina.» | 1.2, Qué NO 1 (y Error 1) |
| «Mi contador buscó y dice que para esto no hay norma boliviana.» | 1.2, Qué NO 2 |

**Grupo C · sólo si la nota cita una NC** (sale igual con la correcta y con la equivocada)

| Frase | De dónde sale |
|---|---|
| «Mi contador trabaja sólo con normas bolivianas. Dice que se las sabe de memoria.» | del juego |

**Excluida en las carpetas con defecto de oportunidad (N1.4):** «Te lo entregué a tiempo, antes que
nadie» (1.3, Qué NO 4). Con esa carpeta la frase delataría el sello. En las demás puede sumarse al grupo A.

**Justificación de la nota del contador** (la forma única de B1.4, «Registrado según la [norma].
[Justificación].»), también sorteada aparte del dictamen:
- Con NIIF: «Porque ninguna NC boliviana lo regula.» · «Como Bolivia ya adoptó las NIIF.»
- Con NC: «Por ser la norma boliviana vigente.» · sin justificación.

**Aviso para el crítico:** con la forma única, la nota bien hecha del flujo puede decir «como Bolivia ya
adoptó las NIIF», que es una afirmación falsa en una nota que el juego da por bien hecha. El tratamiento es
correcto aunque el contador razone mal. Conviene que el crítico diga si eso se sostiene en la defensa o si
esa justificación se limita a las notas mal hechas (a costa de volver a delatar).

### N1.4 La hoja de observación: los papeles de la carpeta de 1.2

Cada carpeta de 1.2 trae **siempre** un papel más (también las sanas; si sólo lo trajeran las que tienen
defecto, el papel mismo delataría). Está escrito como lo vería el oficial: un hecho en un papel, sin
señalar nada y sin la palabra de la característica.

| # | Lo que ve el oficial | Falla | Nivel | Dossier | Nota |
|---|---|---|---|---|---|
| 1 | Carta del cliente: «Ofrezco en garantía mi galpón, que vale Bs 150.000 según la minuta de compra de 2009.» No hay otro valor en la carpeta. | Relevancia | Fundamental | 1.3, ejemplo comentado y Qué NO 1 (pág. 15) | Es un papel del cliente, no una cifra del balance: así no choca con la NC 3 de 1.2. El monto sale de la versión |
| 2 | Para respaldar el crédito de su panadería, el cliente adjunta con orgullo el balance de la fraternidad de la entrada que él preside. | Relevancia | Fundamental | definición, pág. 13; glosario | Del juego, con humor. Pide al crítico que vea si alguien lo leería como representación fiel |
| 3 | Carta de otra entidad financiera: «Le recordamos su cuota vencida.» En el pasivo del balance no figura ninguna deuda con esa entidad. | Representación fiel | Fundamental | Enron (1.1, pág. 5) y definición, pág. 13 | Sin nombre de la entidad (no la cooperativa de enfrente, que es otra cosa en la historia) |
| 4 | En cuentas por cobrar: Bs 40.000 de «Transportes El Rápido». En la carpeta, un recorte del periódico: esa empresa cerró hace un año. | Representación fiel | Fundamental | pág. 13 y Error 2 de 1.3 (previsión por incobrables, pág. 16) | Del juego. El monto sale de la versión |
| 5 | Solicitud del cliente fechada en marzo: «Urgente, es para la siembra.» El balance que la respalda llegó recién en julio. | Oportunidad | Mejora | ejemplo inmediato, pág. 13 | Con esta carpeta no sale la frase «Te lo entregué a tiempo» |
| 6 | Nota de inventarios: «Valuados con el método que el contador creyó conveniente.» No dice cuál ni por qué. | Verificabilidad | Mejora | 1.2, Análisis metodológico, paso 4 (pág. 10) | Sobre inventarios, nunca sobre la operación marcada |
| 7 | Este año los fletes están dentro del costo de ventas; el año pasado iban aparte. La columna del año pasado no se rehízo. | Comparabilidad | Mejora | pág. 13 y glosario | Cambia el 04: el «cambió el método de depreciación sin explicarlo» es también un tema de la NC 13 y se mezcla con 1.2 |
| 8 | Nota 7: «Se procedió al reconocimiento del devengamiento diferido de partidas conexas conforme a criterio prudencial vigente.» El cliente te pregunta qué quiere decir. | Comprensibilidad | Mejora | glosario y pág. 13 | Del juego |

**Papeles sanos** (la carpeta sin defecto, «nada que observar»):
- S1: Portada: «Balance al 31 de diciembre. Entregado en marzo, junto con la solicitud.»
- S2: Carta del cliente: «Ofrezco en garantía mi camioneta. Adjunto el avalúo del perito, de este mes.»
- S3: Nota de inventarios: «Valuados al costo promedio ponderado, igual que el año pasado.»

**Dos avisos que salen de escribir los papeles:**
1. **Casi cualquier defecto se puede leer como una falla de alguna NC** (la NC 11 pide información
   esencial; la NC 13, explicar los cambios). Para que el alumno no dude entre el sello de la norma y el
   de la calidad, el manual tiene que decir en una línea: «La norma se revisa en la operación marcada.
   La hoja de observación, en el resto de la carpeta». Doña Teresa lo dice al abrir la jornada (N1.5).
2. **El papel 1 y la regla de 1.3 dicen lo mismo con otras palabras** (una garantía con un valor viejo no
   sirve). Es bueno: 1.2 lo siembra y 1.3 lo hace calcular. Pero si el papel 1 sale en la misma jornada,
   anticipa el giro. Recomendado: el papel 1 sólo en jornadas de repaso, no en la jornada principal.

### N1.5 Qué cambiar en `guion-tema1.ts` (y dos cosas de `tema1.ts`)

Sin tocar los archivos. Por orden de importancia:

| # | Dónde | Hoy | Propuesta | Por qué |
|---|---|---|---|---|
| 1 | `PERSONA[p].nombre` | «Doña Elena, le vende clavos y tornillos a la ferretería» | Sólo «Doña Elena»; el rol va a otro campo que lee sólo `describir` (registro del docente) | La pantalla lo muestra arriba de la frase (`EscenaVentanilla.tsx`, línea 285): **dice el rol**, que es la respuesta |
| 2 | `diceClienteT12` | «Bolivia ya adoptó las NIIF» sólo en las carpetas para devolver | El grupo de frases de N1.3, sorteado aparte de la nota | Delator de B1.4 y A1.3 |
| 3 | `aciertoNC` | «…así que la NIIF entra como supletoria.» | «Bien: la rige la NC 10.» / «Bien: ninguna NC la regula.» | Adelanta el dictamen (B1.4) |
| 4 | `ABRE_T11` | Tres personas llegan al banco pidiendo el balance de la ferretería | «Antes de abrir entra Doña Nieves, de la Ferretería San Isidro, con el balance que le acaba de entregar su contador. Detrás de ella, gente que se lo pidió. "Yo sé vender clavos, no leer balances. ¿Me ayudas a darle a cada uno lo que necesita?"» | Un banco no reparte los papeles de sus clientes; la escena parecía salida de la nada |
| 5 | `PERSONA` (dice, otraVez) | Tres personas fijas, dos frases | Las cinco de N1.2, tres frases cada una | Varía por alumno (regla del 27-09) |
| 6 | `AYUDA_T11.concreta[1]` | «El que vende quiere saber si le pagan; el socio…; el fisco…» | «Piensa qué va a hacer esa persona mañana con lo que lea: ¿cobrar algo, poner o sacar plata, quedarse en su trabajo, decidir algo de la tienda?» | Hoy es la clave de las tres personas fijas; con cinco al azar ya no sirve y la pista tiene que ser una pregunta |
| 7 | `LLEGADA[0]` | «Bienvenido a la agencia…» | «Te damos la bienvenida a la agencia de Cliza del Banco Kusi. Aquí decides cuánto prestarle a cada cliente.» | Sin género |
| 8 | `LLEGADA` (agregar una línea) | La cooperativa de enfrente no se presenta | «¿Ves la cooperativa de enfrente? Si le prestas de menos a un buen cliente, se va allá. Y si le prestas a uno que no puede pagar, vuelve aquí a no pagar.» | El cierre la nombra sin que nadie la haya presentado |
| 9 | `PARED_PRIMERA` | «Esa noche se da vuelta la pared… Doña Rosa pagó sus cuotas.» | «Esta es la pared. Aquí adelantamos el tiempo: cada ficha te muestra cómo terminó el crédito. Doña Rosa pagó todas sus cuotas.» | Nadie paga todas sus cuotas en una noche |
| 10 | `ABRE_JORNADA` (agregar) | Sólo la norma | «El año pasado el auditor del banco nos observó balances con normas que no correspondían. Desde entonces se revisa la operación marcada. Y mira el resto de la carpeta: hay defectos que se anotan y defectos que tumban un balance.» | Justifica la regla y presenta la hoja de observación sin decir la jerarquía, que tiene que traer el alumno |
| 11 | `HOJA_NUEVA` | «…una hoja nueva del manual: reemplaza a la regla de ayer.» | «Última carpeta del día. Antes, una hoja nueva del manual. Yo empecé de cajera en el 85, cuando los billetes se contaban por bultos. Desde entonces, aquí una garantía vale lo que valdría hoy, no lo que costó.» | La regla nueva tiene un motivo en la historia, y es el ejemplo del dossier (pág. 15) |
| 12 | `RECUERDA_REGLA` | «Recuerda la regla del Tema 1:» | «Recuerda la hoja nueva de tu manual:» | «Tema 1» rompe la ficción |
| 13 | `aciertoHoy` (agregar al final) | | «Con el valor de libros habrías decidido con un número que ya no dice nada de hoy.» | Nombra la relevancia sin decir la palabra: criterio 3 de la rúbrica |
| 14 | `diceClienteT13` | Una frase | Dos más, sorteadas, con los mismos números de la carpeta: «Mi sierra rindió más que un ahorro en el banco: de Bs X a Bs Y.» · «Si hoy vendo la sierra me pagan Bs Y. Eso ya es ganancia, ¿no?» | Todas salen del Qué NO 2 de 1.3; que no sea la misma frase para todos |
| 15 | `pideLinea` | Línea libre | Línea guiada: «Antes de que se vaya, termina la frase: "Tu sierra no te hizo ganar Bs X, porque…"» | Acorta el teclado de texto en el celular (B1.7) y deja evidencia comparable para la defensa |
| 16 | `FINAL` | «…quién lee un balance, con qué norma se hizo y en qué unidad de medida está.» | «…quién lee un balance, con qué norma se hizo, si dice la verdad y en qué unidad de medida está.» | Suma la calidad, que ahora entra |
| 17 | `CLIENTES_T12` (en `tema1.ts`) | «Don Efraín, transporte» y «Don Ramiro, ferretería» | «Don Gregorio, transporte» y «Don Ramiro, imprenta» (o cualquier rubro que no sea ferretería) | Don Efraín es el director de Los Cóndores de Cliza en la maqueta (Tema 4); y con la Ferretería San Isidro en 1.1, otra ferretería en 1.2 confunde |
| 18 | Tema 2.1 de la maqueta (no es código) | «doña Rosa, de una ferretería» | Otro nombre y otro rubro cuando se diseñe el Tema 2 | Doña Rosa ya es la clienta de la moto. Se cambia el Tema 2, que no está construido, y no el 1, que sí |

**Lo que no conviene tocar:** `LUGAR`, `JEFA`, `LLEGADA[1]` («Si no prestas, cierra; si prestas mal,
también»), `queFuePaso` y los textos del repaso: están bien y se leen en voz de Doña Teresa.

**Qué se rompe al cambiarlos:** los cambios 1 a 16 son textos, así que lo guardado no se pierde. El 1
cambia lo que ve el docente en el registro si `describir` sigue usando `nombre`: por eso el rol va a un
campo aparte. El 17 cambia el nombre del cliente de 1.2 en el registro de quien ya jugó (el nombre se
calcula, no se guarda); hoy es borrador y casi nadie jugó, así que es aceptable, pero se avisa.

### N1.6 Avisos para otras partes

- **`critico-de-jugabilidad` (etapa 5):** revisar que las frases de N1.2 no se confundan entre usuarios
  (sobre todo gerencia 3 con inversionista, y proveedor con banco); el papel 2 de N1.4 (¿relevancia o
  representación fiel?); la justificación «como Bolivia ya adoptó las NIIF» en una nota bien hecha
  (N1.3); y que los montos de los papeles 1 y 4 salgan de la versión.
- **Construcción (etapa 6):** una prueba que busque las palabras prohibidas de N1.2 en todas las frases;
  la prueba de independencia de B1.4 extendida a los grupos A, B y C de N1.3; el papel 1 de N1.4 sólo en
  repasos.
- **`disenador-de-aprendizaje`:** el defecto de comparabilidad del 04 (A1.1) cambia de «método de
  depreciación» a «fletes reclasificados» (N1.4, papel 7).
