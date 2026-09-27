# 00 · Adaptación del dossier: Análisis e Interpretación de Estados Financieros (AIEF)

**Estado: marco A "La ventanilla" ELEGIDO; maqueta general (Ronda 2) aceptada con los ajustes del
crítico; fichas de la versión mínima en revisión (Ronda 3).** Agente: `adaptador-de-dossier`. Es el
**juego propio de AIEF** (`IDEA-JUEGO.md` §14 y §16): no comparte mundo, personajes ni género con el de
Proyectos II; comparte sólo la base técnica (cuentas, versión por alumno, registro para la nota,
escalera de ayuda, pruebas).

**Única pregunta para Ronald:** ¿te parecen bien, como **reglas del juego** (no del dossier), las tres
reglas de crédito de la agencia de R3.1: hasta el 60 % de la garantía (primero en libros, después en
bolivianos de hoy) y, desde el Tema 2, hasta la mitad de la utilidad neta con IUE y nunca más que la
caja que hay? (Recomendado: sí; son simples y cada una usa sólo lo que el tema enseña.)

---

## Ronda 3 · versión 3 · 27-09-2026 · Fichas de la versión mínima (Llegada, Tema 1 y Tema 2)

**Con qué se trabajó:** la Ronda 2 (abajo), la revisión del crítico sobre ella (`06-revisiones.md`,
27-09: "construir la versión mínima con ajustes") y lo que ya existe en `src/lib/juego/`
(`escalera.ts`, `registro.ts`, `version-alumno.ts`, `planta.ts`). **Los dossiers no estaban en este
equipo:** las secciones se citan como las citó la Ronda 1 y **ninguna página está escrita**; donde
hace falta, dice **[verificar en el dossier]**. Todos los números de los ejemplos son del juego, no del
dossier (el juego tiene los suyos, §9; cada alumno recibe otros).

### Lo que dijo Ronald

- **27-09, sobre la revisión de la Ronda 2:** «hacé todo tú». Volvió a delegar. Quedó decidido así (y
  con eso se responde también la pregunta de la Ronda 2: rechazar a un buen cliente **sí** es un error):
  1. Cada carpeta trae **tres cifras** (lo que pide, lo mínimo que le sirve, lo que puede pagar) y hay
     tres respuestas correctas posibles: **sí completo**, **contraoferta calculada** o **cero**. Un
     cuarto color, **"bien rechazado"**, premia el buen no.
  2. La consecuencia se ve **al cierre de la jornada**, no carpeta por carpeta, y una carpeta decidida
     **no se rehace**: si te equivocaste, llega otro cliente con otros números.
  3. En los Temas 1 y 2, lo que el cliente puede pagar sale de una **regla de la agencia**, inventada y
     marcada como regla del juego en el manual.
  4. La meta de colocación es **presión de la jefa**, no requisito para pasar.
  5. La jornada tiene ritmo: cola de clientes, una regla nueva por tema que choca con la anterior y un
     giro al final del día.

### Palabras de oficio nuevas en esta ronda

- **Jornada:** un día en la ventanilla. Es la unidad de juego de cada tema: empieza con la regla del
  día, sigue con la cola de clientes y termina con el cierre.
- **Cierre de la jornada:** el resumen del día (como el de *Papers, Please*): recién ahí se da vuelta
  la pared y ves qué pasó con cada crédito.
- **Regla del día:** la página nueva del manual que la jefa te da al abrir. Se suma a las anteriores o
  las reemplaza, y ahí está la trampa.
- **Giro:** la carpeta del final del día que da vuelta lo que venías haciendo.
- **Tutorial:** la parte donde el juego te enseña a manejar la pantalla, sin nota.

### R3.1 Reglas comunes a todas las jornadas

**Las tres cifras de cada carpeta.**

- **Lo que pide** el cliente: lo dice él.
- **Lo mínimo que le sirve:** está en un papel de la carpeta (la cotización, la planilla que tiene que
  pagar). Por debajo de eso, el crédito no le sirve.
- **Lo que puede pagar** (el **tope**): no está escrito en ningún lado. Sale de aplicar la regla de la
  agencia al número que el tema te enseña a calcular.

**El monto correcto** sale de comparar las tres:

- tope igual o mayor que lo que pide: **sí completo** (le prestas lo que pide);
- tope entre el mínimo y lo que pide: **contraoferta**, por el tope exacto (la agencia presta en
  múltiplos de Bs 100, redondeando hacia abajo);
- tope por debajo del mínimo: **cero**.

**Los cuatro colores del cierre** (el crédito que escribiste contra el correcto):

- **Verde:** escribiste el monto correcto y lo devuelve.
- **Bien rechazado** (verde con sello de "no"): escribiste cero y era cero. "Se fue a la cooperativa de
  enfrente y allá cayó en mora."
- **Rojo:** prestaste más que el correcto (o algo cuando era cero). Entra en mora.
- **Gris:** prestaste menos que el correcto (o cero cuando no lo era). "La cooperativa de enfrente le
  ofreció lo que sí podía pagar y se fue." Si le ofreciste menos que su mínimo, "no le servía".

**Las reglas de la agencia** (inventadas por el juego, con un sello de "regla del juego" en el manual;
no son del dossier):

- **Regla cero** (Llegada): prestamos hasta el **60 % del valor de la garantía, tal como figura en sus
  libros**.
- **Regla del Tema 1** (choca con la cero): la garantía vale **lo que valdría hoy**, reexpresada por
  inflación; el valor en libros de hace años ya no sirve.
- **Regla del Tema 2** (choca con la del 1): "la garantía no paga cuotas". Desde hoy el tope sale de los
  estados: **la mitad de la utilidad neta del año, después del IUE, y nunca más que la caja que el
  cliente tiene hoy**. La primera mitad pregunta si el negocio gana; la segunda, si tiene con qué pagar.
  Juntas dicen lo que enseña D2 §2.3: la utilidad no es caja.
- En el Tema 5 esta regla se reemplaza por el flujo de efectivo (queda para esa ficha).

**La jornada, en orden.**

1. **Abrir:** la jefa te da la regla del día (la hoja del manual se abre sola, con el sello de "nueva").
2. **La cola:** en la puerta ves a los que esperan (tres o cuatro siluetas). Atiendes en el orden en
   que llegaron; no hay reloj, la cola da tensión sin castigar por lento.
3. **Cada carpeta:** el cliente dice su frase (una de "Qué NO se puede afirmar" del dossier); calculas
   el número del tema y lo escribes; ese número **sí se corrige ahí mismo**, con la escalera, antes de
   seguir. Después escribes el monto y firmas. **El monto no se corrige:** la carpeta se archiva.
4. **El giro:** la última carpeta del día trae la trampa del tema.
5. **El cierre:** se da vuelta la pared con los colores del día, la barra de la meta muestra cuánto se
   colocó y la jefa dice dos líneas.

**Si te equivocaste en un monto** (la escalera, aplicada a la decisión):

- la carpeta no se rehace; en la jornada siguiente (**de repaso**) llega **otro cliente del mismo tipo
  con otros números**, que es el escalón "otros números" puesto de entrada;
- junto con él llega la ayuda: 1.ª vez, la consecuencia y una pista según tu error (por ejemplo, "usaste
  la regla de ayer"); 2.ª vez, qué paso revisar; 3.ª vez, a leer (la página del manual si el error fue de
  la regla; la sección del dossier si fue del concepto);
- la jornada de repaso trae sólo los tipos de carpeta que fallaste.

**La meta de colocación:** una barra arriba de la cola ("hoy colocamos Bs 41.300 de 50.000"). La jefa la
nombra al abrir y la comenta al cerrar, **no cuenta para pasar**. Se calcula como el 80 % de lo que
suman los montos correctos del día, redondeado a mil hacia abajo: jugar bien la cumple, rechazar de más
no, y como no es igual a ninguna suma exacta no delata qué aprobar.

**Para pasar un tema:** la última carpeta de cada tipo de ese tema, bien decidida (número y monto). El
registro guarda por separado el número que sostiene la decisión y el monto (para la defensa sirven los
dos), cuántas carpetas de repaso hicieron falta y en qué escalón acertó.

**Los perezosos, jugados contra estas reglas:**

- **Siempre lo que pide:** rojo en contraofertas y ceros (dos de cada tres casos).
- **Siempre cero:** gris en sí completos y contraofertas.
- **Siempre el mínimo:** gris donde había que prestar más, rojo donde era cero.
- **Al azar:** casi nunca cae en el monto exacto.
- **Ajustar por el color:** no hay color hasta el cierre y la carpeta no se rehace; la de repaso trae
  otros números.
- **Usar la regla de ayer:** la carpeta del choque de reglas lo castiga (ver T2.2).
- **Copiar:** otra versión, otras tres cifras.

**En el celular:** una carpeta por pantalla, con pestañas para cada papel; asignas tocando, sin
arrastrar; el manual sube desde abajo; el campo del monto acepta "20000", "20.000" y "20 000" y muestra
"Bs 20.000" antes de firmar; la cifra que estás usando queda fija arriba del campo con el teclado
abierto (se mide en 375×812). El botón atrás cierra primero el manual, después la pared, después vuelve
de la carpeta al escritorio, y recién ahí pregunta si sales. Cada paso se guarda en el teléfono y se
sube cuando vuelve la red.

**Dos cabos de la maqueta, resueltos** (hallazgo 7 del crítico):

- **Si un alumno abre un tema sin haber jugado la Llegada** (entró tarde, o habilitaste varias piezas
  juntas), la Llegada se juega sola antes; es corta y no tiene nota.
- **Las familias de Los Cóndores** fijan sólo los números de la cadena (balances, acta, flujo). Cada
  pieza sortea **por alumno** qué clientes son buenos, sus tres cifras y la frase a desmentir. No toca a
  la versión mínima.

### R3.2 Fichas

#### Inicio · La llegada

- **¿Necesita un juego?** No. Es una escena con un tutorial: sin nota y sin errores que registrar.
- **Sabe hacer al terminar:** dónde está (la agencia de Cliza del Banco Kusi), qué hace (decide cuánto
  prestar), y cómo se maneja la pantalla: carpeta, manual, cola, pared, campo del monto.
- **Cómo se juega:** entras a la agencia; la jefa te muestra el escritorio, el manual casi vacío con la
  regla cero y la pared sin fichas. "La agencia vive de prestar. Si no prestas, cierra; si prestas mal,
  también." Te pasa una **carpeta de práctica**: una señora que pide Bs 10.000 y deja en garantía una
  moto que figura en sus libros por Bs 20.000. La jefa te guía: 60 % de 20.000 es 12.000, alcanza para
  lo que pide, escribes 10.000 y firmas. Esa noche, la pared se da vuelta: tu primera ficha, verde.
- **Si lo hace mal:** la jefa lo corrige en el momento (es el tutorial); no se registra como error.
- **Para pasar:** firmar la carpeta de práctica.

#### Tema 1.1 · Quién lee un estado financiero y para qué

- **¿Necesita un juego?** No uno propio: una **escena corta** al abrir la jornada del Tema 1. Es criterio,
  no cálculo.
- **Sabe hacer al terminar:** nombrar qué usuario lee un estado y qué decisión toma con él.
- **Cómo se juega:** tres personas llegan a la ventanilla pidiendo el mismo balance de la misma
  empresa: un proveedor, un socio que piensa vender su parte y un inspector de impuestos [verificar en el dossier D1 §1.1: que sean usuarios que el dossier nombra]. Cada uno dice
  para qué lo quiere. Tocas a cada uno y después la decisión que toma con ese balance (fiar o no,
  cuánto pedir por su parte, cuánto impuesto cobrar). La jefa: "El mismo papel, tres preguntas. La
  nuestra es otra: si nos devuelven."
- **Si lo hace mal:** el que quedó mal ubicado vuelve a la fila y lo explica de otra forma; no hay
  carpeta ni monto.
- **Escalera:** la pista del personaje; después, a leer **D1 §1.1** [verificar en el dossier: página].
- **Para pasar:** los tres bien ubicados. Se registra, pero pesa poco: es la entrada al tema.

#### Tema 1.2 · Primero la NC; la NIIF sólo si hay vacío

- **¿Necesita un juego?** Sí.
- **Sabe hacer al terminar:** buscar primero la norma contable boliviana (NC) que rige una operación, y
  aceptar una NIIF sólo si ninguna NC la cubre.
- **Tipo de juego recomendado:** **reglamento**, como *Papers, Please*: revisas papeles contra un manual.
- **Por qué calza:** la trampa real del subtema es "suponer el vacío". Con el manual abierto, el alumno
  tiene que demostrar que buscó.
- **Alternativa:** un auditor que pregunta en voz alta "¿por qué NIIF?" y el alumno escribe la
  respuesta; más barato de dibujar, menos juego.
- **Cómo se juega:** dos clientes traen el balance que preparó su contador, para respaldar su pedido.
  Cada carpeta marca **una** operación con una nota del contador ("valuamos esto según la NIIF tal").
  Abres el manual, donde está la lista de las 14 NC con su título [verificar en el dossier D1 §1.2: la
  lista y los títulos]. **Escribes el número de la NC** que rige esa operación, o "0" si ninguna la
  cubre. Después decides: **aceptar** el balance como respaldo o **devolverlo** para que lo rehagan.
- **Si lo hace mal:** al cierre, si aceptaste uno mal hecho, el auditor del banco lo observa (**rojo**);
  si devolviste uno bien hecho, el cliente se ofendió y se fue (**gris**).
- **Escalera:** el número de la NC se corrige en la carpeta: pista según el error ("esa NC es de otra
  cosa"; "sí hay una NC: busca por el título"); después, qué revisar ("lee los títulos de la lista antes
  de ir a la NIIF"); después, **D1 §1.2** [verificar en el dossier: página]. La decisión de aceptar o
  devolver, si falla, vuelve con otro cliente en el repaso.
- **Para pasar:** las dos carpetas (o las de repaso) con la NC correcta y la decisión correcta. La
  versión sortea si la nota del contador está bien o mal.

#### Tema 1.3 · La máquina que "creció" (reexpresión por inflación)

- **¿Necesita un juego?** Sí. Es el **giro** del día y el primer crédito de verdad.
- **Sabe hacer al terminar:** reexpresar un valor con el índice de inflación (NC 3) y reconocer que un
  "crecimiento" que sólo es inflación no es crecimiento; saber qué característica de calidad falta
  cuando la unidad de medida cambia.
- **Tipo de juego recomendado:** **cálculo con consecuencia**, dentro de una carpeta de crédito.
- **Por qué calza:** es un solo cálculo y una sola idea (la unidad de medida). La consecuencia en la
  pared la vuelve decisión.
- **Alternativa:** la hiperinflación como documento del archivo, para leer; no enseña a calcular.
- **Cómo se juega:** Don Julio, de una carpintería, pide Bs 70.000. Deja en garantía una sierra que
  figura en sus libros por Bs 90.000, comprada hace años. La cotización de la madera que tiene que
  comprar dice Bs 50.000 (su mínimo). Dice: "La sierra ahora vale 130 mil, ¡gané 40 mil sin moverme!".
  La regla del día (nueva, choca con la cero): la garantía vale lo que valdría hoy. En la carpeta están
  el índice del día de compra y el de hoy (1,15 veces) [verificar en el dossier D1 §1.3: qué índice usa
  el dossier, UFV u otro]. Escribes el valor de hoy: **Bs 103.500**. El 60 % es 62.100: menos de lo que
  pide y más que su mínimo. Escribes la contraoferta: **Bs 62.100**. Y le escribes, en una línea, que
  la sierra no le dio 40 mil: la misma sierra, en bolivianos de hoy.
- **Si lo hace mal:** con la regla cero (libros, 90.000) prestas 54.000: **gris**, se va a la cooperativa
  de enfrente, que le ofreció más. Con lo que dice Don Julio (130.000) prestas los 70.000: **rojo**. Si
  escribes un valor reexpresado mal, no avanzas hasta corregirlo.
- **Escalera:** del valor reexpresado, en la carpeta: pista según el error ("multiplicaste por el índice
  de hoy, no por cuánto subió"; "dividiste al revés"); después, qué revisar ("índice de hoy entre índice
  de compra"); después, **D1 §1.3** [verificar en el dossier: página]. Del monto, en el repaso: "usaste
  la regla de ayer" o "usaste el valor que dice el cliente"; después, la página del manual con la regla.
- **Para pasar:** valor reexpresado y monto correctos en la última carpeta de este tipo.

#### Tema 2.1 · El balance y la ecuación contable

- **¿Necesita un juego?** Sí.
- **Sabe hacer al terminar:** clasificar partidas en activo, pasivo y patrimonio, verificar que
  Activo = Pasivo + Patrimonio y no confundir lo que es caja con lo que se va a cobrar.
- **Tipo de juego recomendado:** **armar**: las partidas sueltas van a su bloque y el balance se cierra.
- **Por qué calza:** clasificar es donde nacen los errores (el anticipo de un cliente es una deuda, no
  plata propia). Armar obliga a decidir cada partida.
- **Alternativa:** un balance con errores para corregir; más rápido, pero es "encuentra el error".
- **Cómo se juega:** doña Rosa, de una ferretería, pide Bs 30.000; la cotización del lote de herramientas
  dice Bs 15.000. Trae sus papeles en una caja de zapatos. La regla del día (nueva, choca con la del
  Tema 1): el tope es la mitad de la utilidad neta con IUE, y nunca más que la caja. Su utilidad neta ya
  viene con el sello del contador del banco: Bs 70.000. Tocas cada partida y después su bloque. Entre
  los papeles hay un **anticipo** que le pagó un colegio por un pedido que todavía no entregó, y un
  **cheque a 60 días** que ella guardó con la plata de la caja [verificar en el dossier D2 §2.1: si el
  cheque diferido está entre las trampas; el anticipo sí]. Cuando terminas, **cierras** el balance y
  escribes los totales; recién ahí se prende la luz. Doña Rosa: "Tengo 32 mil en caja y el negocio es
  todo mío". Escribes su patrimonio y su caja de verdad: **Bs 22.000**. La mitad de la utilidad es
  35.000, la caja 22.000: el tope es 22.000. Contraoferta: **Bs 22.000**.
- **Si lo hace mal:** si el cierre no cuadra, cuenta como intento y sube la escalera. Si deja el cheque
  en la caja, el tope le da 30.000, presta lo que pide: **rojo**. Si presta el mínimo: **gris**.
- **Escalera:** del cierre: "no te cuadra"; "revisa lo que te pagaron por algo que todavía
  no entregaste"; **D2 §2.1** [verificar en el dossier: página]; si falla otra vez, otra caja de zapatos.
  Del monto: en el repaso, con otro cliente.
- **Para pasar:** balance cerrado, patrimonio y caja bien escritos y monto correcto.
- **Contraste:** comercial (ferretería), como en el dossier.

#### Tema 2.2 · El estado de resultados y el IUE

- **¿Necesita un juego?** Sí. Es además la carpeta del **choque de reglas**.
- **Sabe hacer al terminar:** bajar la cascada de ventas a utilidad neta, con el IUE del 25 % sobre la
  utilidad antes de impuestos (D2 §2.2), y saber en qué nivel se va el margen.
- **Tipo de juego recomendado:** **cálculo con consecuencia**: escribes cada escalón de la cascada.
- **Por qué calza:** la cascada es un diagnóstico, dice en qué nivel mirar; y el error típico (el IUE
  sobre las ventas) cambia el monto de golpe.
- **Alternativa:** dos empresas con la misma utilidad neta y márgenes distintos; mejor para el Tema 5.
- **Cómo se juega:** don Óscar, de una distribuidora de bebidas, pide Bs 30.000 para un segundo
  camión; su mínimo (la cuota inicial del camión) es 18.000. Llega con el camión que ya tiene como
  garantía, tasado hoy en Bs 100.000, y lo dice con orgullo: "El 60 % de eso es 60 mil, me alcanza
  sobrado". Su caja, con sello: Bs 40.000. Te pasa su estado de resultados sin terminar: ventas 600.000,
  costo de ventas 390.000, gastos de operación 130.000, gastos financieros 20.000. Escribes utilidad
  bruta, operativa, antes de impuestos (60.000), el IUE (15.000) y la **utilidad neta: Bs 45.000**. La
  mitad es 22.500; la caja alcanza. Contraoferta: **Bs 22.500**. Y le contestas que el camión no paga
  cuotas: la regla de hoy mira los estados.
- **Si lo hace mal:** con la regla de ayer (la garantía) prestas los 30.000: **rojo**. Sin IUE, la mitad
  da 30.000: **rojo**. Con el IUE sobre las ventas la utilidad da negativa y rechazas: **gris**.
- **Escalera:** de la cascada, en la carpeta: "el impuesto te salió más grande que la ganancia, ¿sobre
  qué lo calculaste?"; "el IUE va sobre la utilidad antes de impuestos"; **D2 §2.2** [verificar en el
  dossier: página]. Del monto: en el repaso, con otro cliente.
- **Para pasar:** utilidad neta y monto correctos.

#### Tema 2.3 · La cooperativa que ganó y no puede pagar (los dos estados juntos)

- **¿Necesita un juego?** Sí. Es el **giro** del día.
- **Sabe hacer al terminar:** unir los dos estados con Patrimonio final = Patrimonio inicial + Utilidad
  neta − Dividendos, y ver que la utilidad no es caja.
- **Tipo de juego recomendado:** **investigar papeles**: la empresa ganó y no puede pagar; buscas dónde
  está la plata.
- **Por qué calza:** la lección es un descubrimiento, no una fórmula. Va última para que llegue como
  sorpresa después de dos carpetas donde la caja no molestó.
- **Alternativa:** un "meses después" con la cuenta impaga, sin investigación.
- **Cómo se juega:** doña Justina, presidenta de una cooperativa de quinua, pide Bs 50.000 para pagar a
  los productores; la planilla dice que necesita al menos 25.000. Trae los dos estados y un sobre de
  contratos. "Este año ganamos 120 mil, el patrimonio creció, ¿qué más quiere?". Escribes el patrimonio
  final: 300.000 de inicio, más 120.000, menos 20.000 repartidos: **Bs 400.000**. Cuadra. Entonces
  buscas la plata: en el balance, casi todo el activo corriente son cuentas por cobrar; en el sobre, el
  contrato con el exportador que paga a 90 días. Escribes la caja: **Bs 9.000**. La mitad de la
  utilidad sería 60.000, pero la caja manda: el tope es 9.000, menos que su mínimo. Escribes **cero**.
- **Si lo hace mal:** si miras sólo la utilidad, prestas los 50.000: **rojo** ("tres meses después, la
  cooperativa no pagó la primera cuota: el exportador todavía no le paga"). Si prestas los 9.000: **gris**
  ("no le servía; se fue"). Si escribes cero: **bien rechazado** ("pidió en la cooperativa de enfrente,
  y allá está en mora").
- **Escalera:** del patrimonio final, en la carpeta: "¿qué pasó con lo que se repartió?"; "PF = PI + UN
  − D"; **D2 §2.3** [verificar en el dossier: página]. Del monto, en el repaso: "la utilidad dice que
  ganó, no que tiene"; después, la página del manual con la segunda mitad de la regla.
- **Para pasar:** patrimonio final, caja y monto correctos.
- **Contraste:** asociativa y productiva frente a las dos comerciales del día. Se inspira en el ejemplo
  de D2 §2.3, con otra empresa y otros números; no usa el caso de Estudio de Casos de D2.

### R3.2-bis Verificado en el dossier del Tema 1 (27-09, sesión local con el dossier a la vista)

Ronald aprobó la maqueta general el 27-09 («ok»). Leído el PDF del Tema 1 (huella abajo, págs. impresas);
el `.tex` sigue igual al de la Ronda 1. Reemplaza los **[verificar en el dossier]** de las fichas del Tema 1:

- **1.1 (págs. 2 a 6; Cuadro 1 en la pág. 4).** Usuarios con su decisión, como los nombra el Cuadro 1:
  banco (otorgar o negar un crédito, y a qué tasa), inversionista (aportar o retirar capital), proveedor
  (vender al contado o a 30 días), gerencia (invertir, contratar, fijar precios), SIN (verificar la base
  imponible declarada), empleado (permanecer o negociar condiciones). **La escena usa proveedor,
  inversionista (el socio que piensa retirar su parte) y SIN**; la jefa cierra con la del banco.
- **1.2 (págs. 7 a 12; Cuadro 2, las 14 NC, págs. 8 y 9).** El manual del juego copia el Cuadro 2 tal cual.
  El único vacío que el dossier nombra es el **estado de flujo de efectivo (NIC 7 supletoria, pág. 7)**:
  es la única operación sin NC del juego (no se inventan otros vacíos). El dossier subraya que
  arrendamientos (NC 10) y consolidación (NC 8) sí tienen norma boliviana (pág. 9). Las NIIF/NIC que cita
  el contador en las notas equivocadas (NIIF 16, NIIF 10, NIC 21, NIC 28, NIC 29, NIC 16, NIC 10, NIC 8)
  **son del juego, no del dossier**; son las normas internacionales reales de cada operación.
- **1.3 (págs. 12 a 16; cálculo paso a paso en la pág. 14).** El dossier usa un **índice general de
  precios** (I₀ = 100, I₁ = 112), no la UFV: V reexpresado = V histórico × I₁ / I₀. El juego muestra los
  índices igual (compra 100, hoy 115 en la versión 0). La característica que se pierde sin reexpresar es
  la **relevancia** (el balance de la hiperinflación «cumplía la norma y había dejado de ser relevante»).

| Dossier (relativo a la carpeta de materias) | Fecha del archivo | Huella |
|---|---|---|
| `analisis e interpretacion de estados financieros/1_CONTENIDO/TEMA 1/TEMA 1 - DOSSIER.pdf` | 2026-09-06 | `7cbe14e402f8` |

**Decisiones chicas tomadas al programar el Tema 1 (27-09), mostradas a Ronald para que las cambie si quiere:**
1. Las operaciones de las carpetas de 1.2 (`OPERACIONES` en `src/lib/juego/aief/tema1.ts`) y la norma
   internacional que cita el contador en las notas equivocadas: del juego, no del dossier.
2. Nombres: Doña Teresa (jefa), Doña Rosa (práctica), Doña Elena, Don Hugo, la inspectora del SIN,
   Ferretería San Isidro; clientes de 1.2 de una lista corta.
3. **Sin barra de meta en el Tema 1:** con un solo crédito en la jornada, la meta delataría el monto.
   Aparece desde el Tema 2.
4. La regla de la agencia del 60 % (la «única pregunta» de arriba) se toma como aprobada con el «ok» de
   Ronald a la maqueta.
5. En 1.2 cada jornada trae **dos** carpetas, una bien hecha y una para devolver (así «siempre aceptar» o
   «siempre devolver» pierden); el repaso de 1.2 trae otra vez dos.

### R3.3 Qué datos y funciones hay que programar

Todo en la isla `aief` (archivos propios, con su `.test.ts`); lo que sirve también a las láminas va en
`src/lib/finanzas/`. Nada de lo que ya existe se reescribe.

**Funciones comunes (van a `src/lib/finanzas/`, con pruebas):**

- `reexpresar(valor, indiceCompra, indiceHoy)`.
- `cascada({ ventas, costo, gastosOperacion, gastosFinancieros })`: utilidad bruta, operativa, antes de
  impuestos, IUE al 25 % (cero si la utilidad antes de impuestos es negativa [verificar en el dossier
  D2 §2.2]) y utilidad neta.
- `patrimonio(activo, pasivo)` y `patrimonioFinal(inicial, utilidadNeta, dividendos)`.

**El motor de la jornada (isla `aief`):**

- `montoCorrecto({ pide, minimo, tope })`: sí completo, contraoferta (tope redondeado hacia abajo a Bs 100)
  o cero.
- `colorDelCierre(carpeta, escrito)`: verde, bien rechazado, rojo, gris o "no le servía".
- `topeRegla(regla, datos)`: regla cero (60 % de la garantía en libros), regla 1 (60 % reexpresada),
  regla 2 (mitad de la utilidad neta, sin pasar la caja).
- `diagnosticoMonto(carpeta, escrito)`: qué error explica el monto (regla de ayer, valor del cliente,
  sin IUE, sólo la utilidad, prestó lo que pide, prestó el mínimo, otra), para la pista.
- `metaDelDia(carpetas)`: 80 % de la suma de los correctos, redondeado a mil hacia abajo.

**Qué genera cada carpeta por versión** (sorteo con semilla, como `planta.ts`; cada tipo tiene su
`datosDeVersion` y su `versionValida`):

- **Práctica (Llegada):** fija, sin versión.
- **T1.2:** una operación de una lista fija de situaciones con su NC [verificar en el dossier D1 §1.2], y
  si la nota del contador está bien o mal.
- **T1.3:** valor en libros, índices de compra y de hoy, valor que dice el cliente, lo que pide y su
  mínimo.
- **T2.1:** las partidas de la ferretería (con un anticipo y un cheque diferido), la utilidad neta con
  sello, lo que pide y su mínimo.
- **T2.2:** ventas, costo, gastos, caja con sello, garantía tasada hoy, lo que pide y su mínimo.
- **T2.3:** patrimonio inicial, utilidad neta, dividendos, caja, cuentas por cobrar, lo que pide y su
  mínimo.

**Qué revisa `versionValida` en cada carpeta** (es lo que conserva la lección):

- el monto correcto cae en el caso que tocó en el sorteo: T1.3 y T2.1 sortean entre sí completo y
  contraoferta; T2.2 es siempre contraoferta (para que el choque de reglas se vea); T2.3, cero o
  contraoferta limitada por la caja;
- el mínimo queda al menos un 10 % por debajo del correcto (así "prestar el mínimo" nunca acierta);
- cada error típico da un monto distinto del correcto y cae en otro color: la regla de ayer, el valor del
  cliente, sin IUE, IUE sobre ventas, el cheque en la caja;
- en T2.2, la regla de la garantía da siempre más que la regla de los estados (el choque se nota);
- en T2.3, la mitad de la utilidad cubre lo que pide y la caja queda por debajo del mínimo o entre el
  mínimo y lo que pide (el giro siempre está);
- los números son redondos y legibles en un celular (miles o cientos).

**Pruebas que encierran la regla de "nadie gana sin entender":** en 500 versiones, las estrategias
"siempre lo que pide", "siempre cero", "siempre el mínimo" y "la regla de ayer" no aciertan nunca una
jornada completa, y el alumno que calcula bien acierta siempre.

**Revisión de lo que el alumno escribe** (como `revisarCapacidad` en `planta.ts`): valor reexpresado,
NC, totales del balance, patrimonio, caja, cada escalón de la cascada, utilidad neta, patrimonio final.
Cada revisor devuelve el diagnóstico del error típico para elegir la pista.

**Trabajo de código que suma y no rompe** (del hallazgo 6 del crítico):

- `registro.ts` y `nube.ts` reciben la isla y la escena como dato; lo guardado de `proyectos`/`planta`
  se sigue leyendo igual.
- El registro guarda la versión **de cada carpeta**, el número y el monto por separado, y el color del
  cierre; `escalera.ts` suma el escalón "otros números".
- Una cola de guardado en el teléfono que reintenta cuando vuelve la red, también después del cierre.
- La ruta del juego entra en la precarga del sitio, para abrir sin red en la web y en la app.
- Se puede jugar sin cuenta y entrar después: la partida local se sube al entrar.

---

## Ronda 2 · versión 2 · 27-09-2026 · Maqueta general corregida del marco A

**Con qué se trabajó:** la Ronda 1 (abajo), la revisión del crítico sobre ella (`06-revisiones.md`,
26-09) y `IDEA-JUEGO.md` §9 a §17. **Los dossiers no estaban en este equipo** (viven en tu PC): todo sale
de lo que la Ronda 1 ya resumió y citó. Lo que hay que confirmar contra el dossier o contra la ficha de
la materia va marcado **[verificar en el dossier]** o **[verificar en la ficha de la materia]**; no se
inventó ninguna página.

**Qué cambia respecto de la Ronda 1:** se corrigen los dos bloqueos del crítico (rechazar a todos ganaba
sin entender; el inicio y el fin no aguantaban tu orden de dictado) y se toman sus hallazgos 3, 4, 6, 7,
8 y 9. Sólo es la **maqueta**: qué piezas hay, en qué orden se habilitan, qué hilo las une y qué usa
cada una de otra. Nada por subtema todavía.

### Lo que dijo Ronald

- **27-09, sobre las tres propuestas de la Ronda 1:** «hacé todo tú». Delegó la elección. Se elige el
  **Marco A, "La ventanilla"** (oficial de créditos de la agencia de Cliza), el que recomendaban el
  adaptador y el crítico. De B se toma la **objeción** (desmentir con un número una frase que "no se
  puede afirmar"); de C, que **Los Cóndores vuelvan** como cliente cuya historia se sigue.

### Palabras de oficio nuevas en esta ronda

- **Estrategia dominante:** una forma de jugar que gana siempre sin pensar (por ejemplo, "rechaza a
  todos"). Si existe, el juego no enseña: hay que quitarla.
- **Pieza:** una parte del juego que tú habilitas por separado (el Inicio, cada tema, el Cierre). Tiene
  sus propios archivos y su punto de control.
- **Meta de colocación:** cuánto tiene que prestar la agencia. En la vida real es la presión que tiene
  todo oficial de créditos; en el juego es lo que vuelve costoso decir que no.
- **Línea condicionada:** una frase de la historia que cambia según lo que el alumno ya jugó ("la otra
  vez viniste por las luces"), no según el número del tema.

### R2.1 El corazón del bucle: por qué nadie gana sin entender

*Ajustado en la Ronda 3 (R3.1): tres cifras por carpeta, cuatro colores con "bien rechazado", resultado
al cierre de la jornada, la carpeta no se rehace, la meta sólo como presión y sin "cuota". Donde este
apartado diga otra cosa, manda R3.1.*

**La idea en una línea:** la agencia vive de prestar; si no prestas, se pierde el cliente; si prestas
mal, entra la mora. Sólo el número que el tema te enseña a calcular dice cuánto se puede prestar.

- **La meta de colocación.** Cada tema, tu jefa te fija cuánto tiene que colocar la agencia con las
  carpetas de ese tema. No la cumples rechazando.
- **Tres colores en tu pared de cartera**, no dos. **Verde:** prestaste y paga. **Rojo:** prestaste más
  de lo que podía pagar (mora). **Gris:** era un buen cliente, le dijiste que no (o le ofreciste tan
  poco que no le servía) y se fue a la cooperativa de enfrente. Rojo y gris pesan igual.
- **Clientes buenos de verdad.** Más o menos la mitad de las carpetas de cada tema merecen el sí. La
  versión de cada alumno sortea cuáles, y cuánto.
- **La decisión se escribe.** No hay botones de "aprobar" y "rechazar": escribes **el monto** que
  apruebas (cero es rechazar) y la cuota o la condición, junto con **el número que lo sostiene** (las
  fuentes reales, el flujo de operación, la prueba ácida, según el tema).
- **El "meses después" sale de una función con pruebas**, no de un guion por opción: compara la cuota
  con la capacidad de pago de esa versión. Si el monto queda por encima, rojo; si queda por debajo de lo
  que el cliente necesita, gris; entre los dos, verde.
- **Cada cliente trae una frase que no se puede afirmar** (las secciones "Qué NO se puede afirmar" del
  dossier): "este año generamos 43 mil". Desmentirla con un número escrito es el verbo fijo del bucle.
- **Condición para pasar el tema:** cumplir la meta sin rojos ni grises, con los números bien escritos.
  Cada rojo o gris es un error y sube un escalón de la ayuda (la consecuencia en el mundo, después una
  pista concreta, después la sección del dossier, después otra versión).

**El alumno perezoso, jugado:**

- **Siempre no:** grises, meta sin cumplir, no pasa.
- **Siempre sí, por lo que pide:** la mitad de los que piden de más entra en rojo.
- **Al azar:** cae en rojo o en gris en casi todas las carpetas.
- **Prestar poquito a todos (lo más barato):** por debajo de lo que el cliente necesita, se va: gris.
- **Copiar al compañero:** otra versión, otros montos y otros clientes buenos; lo copiado cae en rojo o
  gris.
- **Mover cuentas hasta que se prenda la luz:** la luz de control ya no responde a cada movimiento; se
  prende sólo cuando **cierras** el cuadro y escribes los totales, y cada cierre fallido cuenta como un
  intento (hallazgo 4 del crítico).

**Los temas sin crédito también tienen dos lados.** En el Tema 1 decides si aceptas o devuelves el
balance que trae el cliente como respaldo: devolver uno bien hecho es un cliente perdido; aceptar uno
mal hecho, una observación del auditor. En el Tema 7 el supervisor califica tu banco y tú respondes con tu propio diagnóstico: llamarlo frágil cuando
está sano desata una corrida que no hacía falta; llamarlo sano cuando no lo está deja pasar la mora que
se come el capital.

**Cómo se juega en el celular, en pocas frases:** una carpeta por pantalla, con pestañas ("antes",
"después", "acta"); asignas una cuenta tocándola y después tocando su columna, sin arrastrar; el manual
es una hoja que sube desde abajo y el botón atrás la cierra sin salir del juego; la decisión es un solo
campo numérico con el teclado de números, y arriba queda a la vista el dato que estás usando. La pared de
cartera es una franja de fichas de colores que se abre con un toque. Cada paso se guarda solo en el
teléfono; si se corta la conexión sigues jugando y se sube al volver.

### R2.2 Las piezas y el orden en que las habilitas

Tu orden de dictado, según la Ronda 1 y la revisión del crítico: el Tema 1, el 2, la primera mitad del 4
(fondos, D4 §4.1 a §4.3), el 3, la segunda mitad del 4 (capital de trabajo, D4 §4.4 a §4.6), el 5, el 7
sin su cierre, el 6, y al último el cierre de D7 (§7.12). **[verificar en la ficha de la materia:** en
qué punto exacto entran la segunda mitad del Tema 4 y el Tema 5**]**. Por eso el Tema 4 se parte en dos
piezas, y el inicio y el final son piezas propias.

1. **Inicio · La llegada** (la habilitas primero). Tu primer día en la agencia de Cliza del Banco Kusi:
   la jefa, un manual casi vacío, la pared de cartera vacía y la meta de colocación. "La agencia vive de
   prestar. Si no prestas, cierra; si prestas mal, también." Ningún número todavía.
2. **Tema 1 · Las reglas.** Tres personas piden el mismo balance para cosas distintas; operaciones que
   se resuelven con el manual de las 14 NC; la máquina que "creció" sólo por inflación. Decides aceptar o
   devolver balances. Deja en el manual la página de NC, NIIF supletoria y unidad de medida.
3. **Tema 2 · Los dos estados.** La ferretería, la distribuidora y la cooperativa que ganó y no puede
   pagar. Primeros créditos y primeras fichas. Deja la ecuación y la cascada (con IUE al 25 %) en el
   manual.
4. **Escena propia · Don Efraín entra por primera vez.** Corta, sin cálculo: te presentas con Los
   Cóndores de Cliza. Se juega sola antes de la primera pieza que la necesite (en tu orden, el Tema 4a);
   si alguna vez habilitas el 3 primero, se juega antes del 3.
5. **Tema 4a · De dónde vino la plata** (D4 §4.1 a §4.3). Los Cóndores piden 20 mil para las luces
   ("generamos 43 mil"); cuadro de fondos, control con la caja y el acta de socios con el aporte en
   especie. Escribes las fuentes reales y el monto. El manual explica "no pasó por caja" sin necesitar
   todavía el vocabulario del Tema 3.
6. **Tema 3 · El patrimonio.** Los Cóndores vuelven (línea condicionada) y compiten con el taller Killa
   por el único cupo; estado de cambios e índice de autofinanciamiento. Dejar a los dos sin cupo es gris.
7. **Tema 4b · El colchón** (D4 §4.4 a §4.6). Capital de trabajo, su composición, y la contraoferta de
   pronto pago contra el préstamo: escribes el costo anual.
8. **Tema 5 · La caja y los porcentajes.** Flujo de Los Cóndores y el mes en rojo (escribes cuánto y
   cuándo prestar como puente); la banda nacional cuatro veces más grande; La Espiga con su cuaderno y
   un borrador que cuadra y está mal.
9. **Tema 7 · El supervisor** (D7 §7.1 a §7.11). Se da vuelta la mesa: ahora leen **tu banco**, con los
   números de la versión (no los de tu cartera). La mora que se lleva el capital, el CAMEL y la letra que
   domina, el auditor con su salvedad (objeción), y la mentoría a Sumaj Manos, donde escribes lo que
   cuesta cada acción y con qué la paga la dueña. Como el Tema 6 todavía no se jugó, la jefa te da la
   **tarjeta de tres ratios** (ROA, ROE y apalancamiento) que D7 §7.1 ya trae como recordatorio.
10. **Tema 6 · El comité.** Un crédito grande para Los Cóndores: eliges tres o cuatro ratios, los lees
    contra una referencia y desarmas el ROE. Se sostiene solo; como ya viste un banco por dentro, el
    comité te lo recuerda en una línea condicionada.
11. **Cierre · La revisión del año y "ahora con el tuyo"** (D7 §7.12; lo habilitas al último). El
    supervisor abre tu pared de fichas y comenta las rojas y las grises en dos líneas cada una. Después,
    la secuencia de seis preguntas aplicada al emprendimiento del reto del alumno, que ya puede usar los
    ratios del Tema 6. Todo queda en el registro para **tu defensa oral**, el jefe final.

### R2.3 Qué usa cada pieza de otra (sólo cuando hace falta)

- **Los números no se arrastran nunca:** cada pieza arranca de su **punto de control**, con los números
  correctos de la versión del alumno. Un error de un tema no cambia los datos del siguiente.
- **La historia sí se arrastra**, con líneas condicionadas escritas según lo ya jugado, no según el
  número del tema. Así el orden en que habilitas no rompe nada.
- **Lo que de verdad se usa:** la ecuación y la cascada (Tema 2) en todos los que siguen; la idea de
  fuente y aplicación (4a) en el flujo del Tema 5; la tarjeta de tres ratios en el Tema 7; todos los
  temas en el Cierre, que por eso va al final.
- **Comprobado en tu orden:** ninguna pieza da por hecho algo de una pieza que se habilita después. El 4a
  no usa los componentes del patrimonio (Tema 3); el 7 usa sólo tres ratios, que la tarjeta cubre
  **[verificar en el dossier:** que el diagnóstico de Sumaj Manos, D7 §7.10 y §7.11, no pida otros
  ratios del Tema 6**]**; el 6 no usa nada del 7.
- **La cartera es historia, no cálculo** (hallazgo 3 del crítico). La pared se llena tema por tema y se
  comenta en el Cierre y en la defensa ("¿por qué le prestaste a este?"), pero no entra en ningún número
  que se califique. El banco del Tema 7 tiene sus propios números de versión. El ascenso a analista de la
  Ronda 1 se quita: ya no hace falta.
- **Si un alumno no jugó una pieza**, la pared muestra esa franja vacía (no se llena "por defecto") y tu
  página del docente lo marca.

### R2.4 El hilo

Doble, como en la Ronda 1: **Los Cóndores de Cliza**, que vuelven del 4a al 6 (el dossier los encadena
del Tema 3 al 6), y **tu pared de cartera**, que se llena en todas las piezas con crédito y se lee en el
Cierre. Los clientes de contraste (ferretería, distribuidora, cooperativa, Killa, banda nacional, La
Espiga, Sumaj Manos) entran y salen en su tema.

### R2.5 Avisos sobre el dossier (para ti; el juego ya tomó posición)

El juego sigue **lo que enseña la regla** y la escalera de ayuda **nunca manda a leer un ejemplo que la
contradiga**. Los ocho puntos de la Ronda 1 (§1.4) siguen en pie, más uno que encontró el crítico:

- **IUE** (§1.4, punto 1): toda cascada del juego lleva IUE al 25 %. En los temas donde el dossier
  calcula sin IUE (D5, D6, D7), el escalón de "a leer" apunta a **D2 §2.2** y no al ejemplo del tema.
  Si corriges esos ejemplos, el escalón vuelve a su sección.
- **NIIF en D7 §7.7** (punto 2): en la auditoría, el escalón "a leer" del marco normativo apunta a
  **D1 §1.2**.
- **D5 §5.1, los 18.000** (punto 5): el escalón apunta a los pasos del método indirecto, no al ejemplo
  comentado.
- **Nuevo, D4 §4.3:** dice que las fuentes reales "ya se aplicaron casi en su totalidad", pero las
  aplicaciones reales (22.000) superan a las fuentes reales (18.000): se gastó todo y 4.000 más de la
  caja. El juego lo dice así, y el escalón apunta a la regla de fuentes y aplicaciones.
- **Casos de "Estudio de Casos":** inspiran, pero no se publican con sus números (además de Wara, Q'ente
  y Amaru, que ya estaban fuera). El juego cambia empresa y números.
- Qué escalón apunta a qué sección queda anotado en cada ficha, para revisarlo cuando cambie el dossier.
  Las páginas se completan con el dossier a la vista **[verificar en el dossier]**.

### R2.6 Costo y versión mínima, corregidos

- **Lo caro es la cadena de Los Cóndores** (hallazgo 7): generar una banda entera por alumno que cuadre
  en cinco piezas es varias veces el trabajo de `planta.ts`. **Versión barata, recomendada:** unas cinco
  familias de Cóndores armadas y probadas una vez; cada alumno recibe una familia, y cada pieza sortea
  sólo sus datos nuevos.
- **Versión mínima jugable:** la Llegada, la escena de la máquina que "creció" (Tema 1) y el Tema 2 con
  sus tres carpetas, la meta de colocación, la pared de tres colores y el "meses después" calculado. Es
  lo más chico que ya prueba lo que importa: que rechazar a todos no gane y que el número decida.
- **Estructura que suma:** cada pieza (Inicio, cada tema, la escena de Don Efraín, el Cierre) es su
  propio archivo de datos y funciones con pruebas, con su interruptor de habilitación en la página del
  docente; AIEF es una isla propia (`isla: "aief"`) y no toca lo guardado de Proyectos II. Cada decisión
  es una entrada nueva del registro: sumar una carpeta no borra lo ya jugado.
- **Web y app de Android por igual:** todo lo de R2.1 está pensado para el dedo y la pantalla chica
  (nada que dependa del mouse), el teclado que tapa media pantalla, el botón atrás, la rotación y la
  conexión que se corta. Se mide en 375×812 con el teclado abierto. Nada de esto necesita algo propio
  del teléfono.

### R2.7 Recomendación y la única pregunta

**Decidido en esta ronda** (sale del dossier, de la revisión o de lo que delegaste): marco A; meta de
colocación y pared de tres colores; la decisión se escribe como monto; el "meses después" sale de una
función con pruebas; el Tema 4 en dos piezas; Inicio y Cierre como piezas propias; la escena del primer
encuentro con Don Efraín; la cartera como historia y no como cálculo; la tarjeta de tres ratios en el
Tema 7; los escalones "a leer" que evitan los ejemplos contradictorios.

**La única pregunta, de criterio:** ¿te parece justo que **rechazar a un buen cliente cuente como error
del tema, igual que prestarle a uno malo**? Recomendado: **sí**, porque es lo que impide pasar
rechazando a todos y es lo que vive un oficial de créditos de verdad. La alternativa es que el gris sólo
se vea en la pared y se converse en la defensa, pero entonces "rechaza a todos" vuelve a pasar los temas.

**Si apruebas la maqueta**, la ronda siguiente trae las fichas tema por tema, empezando por la Llegada,
el Tema 1 y el Tema 2 (la versión mínima), y decide en cada subtema si hace falta un juego o basta una
escena.

### Resumen de traspaso (provisional, hasta que apruebes la maqueta)

- **Elegida:** Marco A, "La ventanilla": oficial de créditos de la agencia de Cliza del Banco Kusi
  (nombre provisional). Género: inspección de documentos con consecuencias (*Papers, Please*).
- **Decidido:** todo lo de R2.7, más lo de la Ronda 1 §7 (IUE al 25 %, marco de D1, sin Wara, Q'ente ni
  Amaru, el alumno escribe cada número).
- **Abierto:** la pregunta de R2.7; el punto exacto del dictado donde entran el Tema 4b y el Tema 5; si
  corriges los ejemplos del dossier sin IUE; las fichas por subtema. El director, el bucle, el
  aprendizaje, la narrativa y la progresión corren sobre esto cuando apruebes la maqueta.

---

## Ronda 1 · versión 1 · 26-09-2026 (antecedente; la corrige la Ronda 2)

**Con qué se trabajó:** los siete dossiers de AIEF (Temas 1 a 7, archivos `.tex`), leídos completos
desde la carpeta de materias de Ronald, y las cinco guías de lectura. No se copió nada al
repositorio (es público): aquí sólo se resumen los temas, se citan sus secciones y se usan los números
que hacen falta para hablar del juego. Para ubicar el material se cita así: **"D4 §4.3"** es el
dossier del Tema 4, sección 4.3. También se leyeron `IDEA-JUEGO.md`, `LEEME.md` del GDD, `BITACORA.md`
§0, `CLAUDE.md` y lo que ya existe en `src/lib/juego/` y `src/app/juego-proyectos/`.

Todo va **por temas**, sin semanas ni duraciones. Cada tema se abre cuando tú lo habilitas.

### Palabras de oficio de esta ronda

Cada una se explica una vez; el resto del documento las usa igual.

| Término | Qué quiere decir |
|---|---|
| **Propuesta** o *pitch* | Una idea de juego contada en una página para decidir si vale la pena hacerla. |
| **Marco** | Lo que da unidad a todo el juego: el mundo, quién eres, qué historia avanza. No cambia de tema a tema. |
| **Modalidad** | La forma de jugar un tema concreto (clasificar papeles, armar una tabla, apostar en el tiempo…). Cambia de tema a tema. |
| **Género** | La familia de juegos a la que pertenece un marco; define qué haces la mayor parte del tiempo. |
| **Hub** (lugar central) | La pantalla a la que vuelves entre una modalidad y otra: un escritorio, una oficina. Hace que modalidades distintas se sientan el mismo juego. |
| **Bucle central** (*core loop*) | Lo que el jugador repite una y otra vez. |
| **Progresión** | Lo que cambia y se acumula a medida que avanzas. |
| **Punto de control** (*checkpoint*) | Un momento donde el juego guarda y arranca lo siguiente con los números correctos, para que el error de ayer no arruine lo de mañana. |
| **Versión mínima jugable** | Lo más chico que se puede construir y probar con un curso para saber si la idea funciona. |
| **Jefe final** | El desafío que cierra una etapa. Ya decidido: tu defensa oral en clase. |

---

### 1. Qué aprende el alumno

#### 1.1 El arco de la materia, según el propio dossier

El dossier ya trae un arco con inicio y fin, y lo dice en sus mapas de ruta: **empieza** por las
reglas con que se fabrica un número (D1) y **termina** en una sola pregunta sobre el emprendimiento del
reto del semestre, *¿es financieramente viable?* (D7 §7.12). En el medio, cada tema abre una pieza que
el anterior dejó cerrada:

| Tema | Qué logra el alumno | Qué deja para un tema posterior |
|---|---|---|
| **1 · Normas y marco** | Sabe quién lee un estado financiero, bajo qué regla se hizo en Bolivia y qué lo vuelve confiable | El filtro con que se lee todo lo demás: "¿en qué unidad y bajo qué norma está este número?" |
| **2 · Balance y estado de resultados** | Lee la foto (balance) y la película (resultados) y las une con el patrimonio | La ecuación contable y la idea de que utilidad no es caja (vuelve en 4, 5 y 7) |
| **3 · Patrimonio** | Abre el casillero del patrimonio: de qué está hecho, cómo se movió y si el crecimiento es de calidad | El balance de cierre de **Los Cóndores de Cliza**, que es el de partida del Tema 4 |
| **4 · Fondos y capital de trabajo** | Explica de dónde vino y a dónde fue la plata, y cuánto colchón de corto plazo hay | El balance con que abre el Tema 5 y la pregunta "¿cuánto se cobró de verdad?" |
| **5 · Flujo, vertical, horizontal y armado** | Registra la caja real, la proyecta, lee en porcentajes y **arma** estados desde datos crudos | Los estados de cierre de Los Cóndores, que son los datos del Tema 6 |
| **6 · Ratios** | Usa un sistema de cuatro preguntas y descompone el ROE | ROA, ROE y apalancamiento, que el Tema 7 aplica a un banco |
| **7 · Diagnóstico avanzado** | Lee un banco al revés, lo califica con CAMEL, decide cuánto creer según la auditoría, y diagnostica una microempresa | El cierre: la secuencia de seis preguntas aplicada a su propio emprendimiento |

**El hilo que el dossier ya trae hecho:** Los Cóndores de Cliza, una banda show familiar, atraviesa
los Temas 3 a 6 con números encadenados (el cierre de un tema es la apertura del siguiente; D6 lo
verifica en su cabecera). Alrededor aparecen casos de contraste: una ferretería y una distribuidora
(D2), el taller Killa (D3), la panadería La Espiga (D5), un banco ficticio (D7) y la microempresa Sumaj
Manos (D7).

**Dos cruces de calendario** que el juego tiene que tolerar (sección 6.4): tú dictas D4 §4.1 a §4.3
antes que D3, aunque D4 arranca del balance con que cierra D3; y dictas D7 antes que D6, aunque D7
usa ratios de D6 (el propio D7 §7.1 trae un recordatorio para eso).

#### 1.2 Qué sabe hacer al terminar (diseño inverso)

Primero lo que tiene que **saber hacer**, después **cómo lo demuestra** en el juego y **qué pasa si lo
hace mal**. Todo lo que "pasa" pasa en el mundo del juego, no es un mensaje de error.

| Sabe hacer | Lo demuestra así | Si lo hace mal, pasa esto |
|---|---|---|
| **T1** Nombrar qué usuario lee un estado y qué decisión toma con él; buscar primero la NC boliviana y usar la NIIF sólo si hay vacío; reexpresar una cifra por inflación (NC 3) | Resuelve una operación consultando la lista de las 14 NC y escribe la norma que aplica; escribe el valor reexpresado de un activo | Aplica una NIIF donde había NC (el auditor lo observa); celebra un "crecimiento" que era sólo inflación |
| **T2** Clasificar partidas, verificar Activo = Pasivo + Patrimonio, bajar la cascada de ventas a utilidad neta con el IUE sobre la utilidad antes de impuestos, y unir los dos estados con PF = PI + UN − D | Completa el balance y la cascada de un cliente y escribe utilidad neta y patrimonio final | Cobra el IUE sobre las ventas (siete veces más, D2 §2.2); presta a una empresa rentable que no tiene caja para pagar |
| **T3** Desagregar el patrimonio en sus cuatro partes, armar el estado de cambios (el traspaso del resultado anterior primero) y calcular el índice de autofinanciamiento | Arma la tabla de cambios de una gestión y escribe el índice en dos fechas | Confunde un aporte de un socio con utilidad y aprueba un crecimiento que no se sostiene solo |
| **T4** Clasificar cada variación como fuente o aplicación con la caja como control; separar lo que no pasó por caja; calcular capital de trabajo, razón corriente y su composición; costear una política (pronto pago contra préstamo) | Arma el cuadro de fondos, escribe las fuentes reales y propone una política con su costo anual | Cree que el cliente "generó" lo que en realidad fue un aporte en especie; recomienda un préstamo cuando cobrar antes salía más barato |
| **T5** Armar el flujo por método indirecto y clasificar en operación, inversión y financiamiento; proyectar la caja mes a mes; leer vertical, horizontal y combinados; armar estados desde un balance de comprobación y revisarlos sin confiar en el cuadre | Escribe el flujo de operación, encuentra el mes en rojo y cuánto hace falta, corrige un borrador con errores | Resta la depreciación; descubre el déficit el mismo mes; firma un balance que cuadra con el IVA en el patrimonio |
| **T6** Elegir los ratios según la pregunta, calcularlos del mismo cierre, leerlos contra una referencia y descomponer el ROE (DuPont) | Entrega al comité un informe con tres o cuatro ratios, su referencia y de dónde sale el ROE | Aprueba por un ROE espectacular a una empresa a un mal trimestre de no poder pagar (D6 §6.1, empresa B) |
| **T7** Reconocer qué tipo de entidad lee; medir la mora contra el patrimonio; leer las cinco letras del CAMEL sin promediar; clasificar la opinión del auditor y recalcular con un escenario conservador (los dos lados del ratio); diagnosticar una microempresa y priorizar recomendaciones | Escribe la mora que se lleva el capital, nombra la letra que domina, recalcula el CAR tras una salvedad y ordena recomendaciones por viabilidad | Declara en quiebra a un banco sano (o sano a uno frágil); calcula ratios sobre estados con opinión negativa; recomienda a una microempresa un préstamo que no puede conseguir |

#### 1.3 La esencia: qué no puede faltar y qué se puede cambiar

**La idea que atraviesa los siete temas** (D7, síntesis): *ningún número decide solo*. Cada subtema
del dossier cierra con una sección "Qué NO se puede afirmar": el alumno aprende tanto a calcular como a
decir qué no dice el número. Eso es lo que el juego tiene que enseñar por encima de cualquier fórmula.

**Lo esencial (se aprende sí o sí):**

- **Conceptos:** usuarios primarios; NC obligatoria y NIIF supletoria; características fundamentales y
  de mejora; ecuación contable; cascada del estado de resultados; devengado (utilidad no es caja);
  cuatro componentes del patrimonio; transacciones con propietarios contra resultado; fuente y
  aplicación; movimiento sin efecto en caja; capital de trabajo y su calidad; tres actividades del
  flujo; presupuesto de caja; tamaño común; pp contra variación %; cuenta de resultado contra cuenta de
  balance; cuatro familias de ratios; identidad DuPont; banco como intermediario; CAMEL y dominancia;
  cuatro opiniones de auditoría; viabilidad antes que impacto en microempresas.
- **Cálculos:** reexpresión (NC 3); patrimonio; cascada con IUE 25 %; PF = PI + UN − D; estado de
  cambios; índice de autofinanciamiento; cuadro de fondos contra caja; fuentes reales; capital de
  trabajo; razón corriente y peso de la caja; costo anual del pronto pago; flujo indirecto;
  presupuesto y necesidad de financiamiento; vertical; horizontal; pp; armado desde comprobación;
  razón corriente, prueba ácida, solvencia, endeudamiento, deuda/patrimonio, cobertura, margen, ROA,
  ROE, rotación y días de cobro; DuPont; mora sobre patrimonio y punto de quiebre; CAR; CAR ajustado.
- **Errores típicos** (el dossier trae dos o tres por subtema, en sus cajas de trampas): son la
  materia prima de las pistas por error.
- **Decisiones:** cada subtema cierra con "LA DECISIÓN": qué haría un gerente. El juego convierte esas
  cajas en lo que el jugador decide.

**Lo adaptable (el juego puede cambiarlo, §9):**

- Las empresas, las personas, los montos y el orden interno de cada tema. Cada alumno tiene su versión.
- Las anécdotas históricas (Pacioli, Medici, VOC, Enron, la hiperinflación de 1984-1985) pueden
  aparecer como documentos del archivo o diálogos, no como lectura obligatoria.
- **Lo que el juego no usa:** los tres casos de los entregables evaluados (Wara Estudio Textil, Q'ente
  Turismo Vivencial y Amaru Cerámica). Publicarlos resueltos en un repositorio público arruinaría tus
  evaluaciones (D7 ya tuvo que corregir una filtración así, según su cabecera).

#### 1.4 Hallado al leer (conviene que lo mires; el juego ya tomó una posición)

1. **El IUE aparece y desaparece.** D2 §2.2 enseña la cascada con IUE del 25 % sobre la utilidad antes
   de impuestos. Los casos de D5 (Los Cóndores, La Espiga), D6 (Los Cóndores) y D7 (Sumaj Manos) pasan
   de utilidad operativa menos intereses a utilidad neta sin IUE. En el cierre de D6 (Amaru), 38.000 −
   4.000 = 34.000 antes de impuestos y la utilidad neta es 28.000: un impuesto del 17,6 %, no del 25 %.
   **En el juego:** toda cascada lleva su línea de IUE al 25 %, como enseña D2.
2. **D7 §7.7 dice que el auditor opina "de acuerdo con las NIIF, en su lectura boliviana".** D1 §1.2
   dice que el marco obligatorio son las NC 1 a 14 y la NIIF es supletoria. **En el juego:** manda D1.
3. **D2 §2.3, "Qué NO se puede afirmar"**, cita "la cooperativa minera del apartado"; el ejemplo del
   apartado es una cooperativa de quinua, y la minera es el Caso 3 del final.
4. **D3 §3.2, ejemplo inmediato:** llama "transacción con terceros" a una donación que sube el
   patrimonio, pero la definición del mismo subtema dice que hay sólo dos categorías (con propietarios
   o resultado). Conviene precisarlo en el dossier; el juego no usa donaciones.
5. **D5 §5.1, ejemplo comentado:** dice que los Bs 18.000 de diferencia entre flujo y utilidad son
   "utilidad del año pasado y plata no pagada"; son depreciación (12.000), cobro de cuentas por cobrar
   (2.000) y proveedores (4.000). La depreciación no es utilidad del año pasado.
6. **D6, final de §6.5:** hay una caja de trampas y una de enlace repetidas (quedaron de la versión
   anterior, después de las nuevas).
7. **Guías de lectura:** la del Tema 5 dice que §5.9 es "otra vez con Los Cóndores" (el dossier usa La
   Espiga) y ubica el glosario en páginas distintas; la del Tema 4 habla de "cinco saldos a determinar"
   (el caso Wara tiene siete) y de un diagnóstico de una página que la consigna del dossier no pide; la
   del Tema 7 dice que la semaforización de §7.5 da umbrales verde, amarillo y rojo, y la figura no los
   trae.
8. **Voseo:** D3 a D7 usan voseo ("pensá", "calculá"). El juego va en tuteo; como no copia texto del
   dossier, no se arrastra.

---

### 2. Qué tiene de apasionante esta materia en la vida real

AIEF no es "calcular ratios": es **mirar números que alguien preparó para que te vieras obligado a
creerle, y descubrir qué no dicen**. Las tensiones que la vuelven jugable, todas del dossier:

- **Quien prepara los números es el mismo que queda calificado por ellos.** La razón de ser de las
  normas (D1 §1.1) y de la auditoría (D7 §7.7). Enron cumplía la forma hasta el día que dejó de
  hacerlo. Es el placer del detective: cada documento tiene un autor con un interés.
- **Empresas que ganan y quiebran.** La utilidad es una opinión, el efectivo es un hecho (D4 §4.3). La
  cooperativa de quinua que ganó bien y no puede pagar a sus productores (D2 §2.3); la banda que
  factura a crédito y se queda sin caja (D5 §5.1).
- **El error invisible.** Un balance que cuadra y está mal (D5 §5.8): el IVA metido en el patrimonio no
  mueve ningún total y cambia el endeudamiento.
- **El número espectacular que miente.** ROE del 100 % en una empresa a un trimestre de no poder pagar
  (D6 §6.1); razón corriente de 5,05 que esconde plata parada (D5 §5.9); ROE del 68,8 % de una
  microempresa que gana Bs 11.000 al año (D7 §7.10).
- **Plata ajena y poco margen.** Un banco con 6 % de patrimonio está a siete puntos de mora de perder
  todo su capital (D7 §7.3); una corrida no necesita que el banco esté mal, necesita que muchos vengan
  el mismo día.
- **El reloj.** A una pyme la plata no le falta en promedio: le falta un martes concreto (D5 §5.3).
- **Decidir a quién sí y a quién no.** El dossier vuelve una y otra vez a la misma escena: un oficial
  de crédito con dos solicitudes y un solo cupo (D3, Caso 3), una empresa que pide un préstamo para
  crecer (D5 y D6), un banco que recibe la visita del supervisor (D7).

**El gancho que sale de ahí:** *todos los números que te muestran son ciertos, y aun así te pueden
engañar. Tu trabajo es descubrir qué no dicen antes de poner tu firma.*

---

### 3. Modalidad por tema

Aquí manda el contenido, no el marco: cada tema pide un verbo distinto.

| Tema | Qué tiene que hacer el alumno | Modalidad que calza | Por qué | Alternativa |
|---|---|---|---|---|
| **T1.1** Usuarios | Nombrar quién lee y qué decide | **Escena corta**: tres personas piden el mismo balance para cosas distintas | Es criterio, no cálculo; un diálogo alcanza | Clasificar tarjetas de usuario y decisión |
| **T1.2** NC y NIIF | Buscar primero la NC; justificar la NIIF sólo con vacío | **Reglamento** (como *Papers, Please*: revisas papeles contra un manual): cada operación se resuelve consultando el manual de las 14 NC | La trampa real es "suponer el vacío"; el manual obliga a demostrarlo | Pregunta abierta de un auditor |
| **T1.3** Calidad y reexpresión | Reexpresar con índices; reconocer qué característica falta | **Escena con cálculo**: una máquina que "creció 12 %" sin cambiar | Un solo cálculo y una idea (la unidad de medida) | La hiperinflación como documento del archivo |
| **T2.1** Balance | Clasificar y verificar la ecuación | **Armar**: partidas sueltas que se ubican en su bloque; la ecuación se enciende al cuadrar | Clasificar es donde nacen los errores (el anticipo de cliente es pasivo) | Balance con errores para corregir |
| **T2.2** Resultados | Bajar la cascada y el IUE | **Cálculo con consecuencia**: el nivel donde se va el margen es la palanca | La cascada es diagnóstico: dice en qué nivel mirar | Comparar dos empresas con la misma utilidad |
| **T2.3** Leerlos juntos | PF = PI + UN − D; ver que utilidad no es caja | **Investigar papeles**: la empresa ganó y no puede pagar; buscas dónde está la plata | La lección es un descubrimiento, no una fórmula | Un "meses después" con la cuenta impaga |
| **T3.1 a 3.3** Patrimonio | Desagregar, armar el estado de cambios, calcular el índice de autofinanciamiento | **Armar una tabla** (movimiento por fila, componente por columna, cuadre doble) y **decidir entre dos** solicitudes con un solo cupo | La tabla es construcción pura; el cupo único obliga a usar el índice | Seguir la "represa" movimiento a movimiento |
| **T4.1 a 4.3** Fondos | Clasificar variaciones, controlar con caja, separar lo que no pasó por caja | **Clasificar con control**: cada variación va a fuente o aplicación y la caja dice si cuadra; después, un acta de socios revela el aporte en especie | El control con caja es jugable (se enciende o no) y el acta convierte la lectura gerencial en hallazgo | Entrevista con el cliente |
| **T4.4 a 4.6** Capital de trabajo | Calcular, leer la composición, costear una política | **Negociar**: el cliente pide un préstamo y tú puedes contraofertar cobrar antes; se compara el 14,9 % anual contra la tasa | Convierte el diagnóstico en decisión con costo, que es lo que el subtema pide | Simular políticas con deslizadores |
| **T5.1 y 5.2** Flujo | Método indirecto y clasificación O, I, F | **Clasificar con árbol** (tres sobres) y escribir el flujo de operación | La clasificación cambia el diagnóstico aunque la caja sea la misma | Movimientos dudosos como tarjetas |
| **T5.3** Presupuesto | Proyectar mes a mes y actuar sobre el calendario | **Apostar en el tiempo**: una línea de meses donde el saldo cae en rojo; mueves pagos o pides anticipos antes de que llegue | Es el único tema que trata del futuro; el reloj es la mecánica | Proyección sin eventos |
| **T5.4 a 5.6** Vertical y horizontal | Leer en %, ritmo y peso a la vez | **Comparar dos casos de tamaños distintos** y encontrar la cuenta que "se quedó quieta" | El hallazgo (el vehículo) sólo aparece cruzando las dos lecturas | Tabla combinada para llenar |
| **T5.7 y 5.8** Armar y revisar | Armar estados desde un balance de comprobación y revisarlos | **Armar** los dos estados y **revisar un borrador** con los cuatro controles | Es construir, no sólo leer; el error que no rompe el cuadre es el corazón | Sólo revisión |
| **T5.9** Primera interpretación | Cruzar composición, liquidez y rentabilidad | **Escena de diagnóstico**: cuatro frases al cliente | Es redacción con criterio; se revisa completo y coherente, la calidad la ves tú | Elegir la frase que se sostiene |
| **T6** Ratios | Elegir según la pregunta, leer contra referencia, DuPont | **Informe al comité**: te hacen una pregunta ("¿le prestamos?") y eliges tres o cuatro ratios, los calculas y la descomposición dice de dónde sale el ROE | Enseña que un ratio sin pregunta ni referencia es un número suelto | Tablero con los quince ratios (lo que el dossier dice que no hay que hacer) |
| **T7.1 a 7.3** Banco | Leer un banco al revés; mora contra patrimonio | **Inspección**: el balance de un banco; calculas la mora que se lleva el capital y el retiro que vacía la caja | Los números "de alarma" son normales y viceversa: es un giro | Comparación banco contra empresa |
| **T7.4 a 7.6** CAMEL | Calificar las cinco letras y nombrar la que domina | **Informe de inspección** con cruce A contra C y un escenario que mueve una letra | La dominancia se vive cuando una sola letra tumba el diagnóstico | Semáforo con umbrales |
| **T7.7 a 7.9** Auditoría | Clasificar la opinión; escenario conservador con los dos lados | **Objeción** (como *Ace Attorney*: presentas la prueba que contradice lo que te dicen): el informe dice "excepto" y alguien insiste en que está limpio | La diferencia entre las cuatro opiniones es una palabra; encontrarla es el juego | Clasificar frases del informe |
| **T7.10 a 7.12** Microempresa y reto | Diagnosticar, priorizar por viabilidad, aplicar al proyecto propio | **Mentoría**: una dueña con una sola hora libre; eliges dos acciones y el juego corre el trimestre; después, "ahora con el tuyo" | En microempresa manda la viabilidad, y eso sólo se siente con recursos escasos | Lista de recomendaciones para ordenar |

---

### 4. Tres marcos para toda la materia

Los tres admiten las modalidades de la sección 3; lo que cambia es **quién eres, qué avanza y qué se
siente**. Los tres cubren los siete temas (sección 5).

#### Marco A · "La ventanilla" (recomendado; ELEGIDO en la Ronda 2)

**Gancho:** *Te acaban de contratar en la agencia de Cliza de un banco chico del valle. Cada cliente
que se sienta frente a ti trae papeles que dicen la verdad a medias, y cada crédito que firmas queda en
tu cartera para siempre.*

**Género:** juego de inspección de documentos con consecuencias (*document inspection game*: el trabajo
es revisar papeles contra reglas y decidir; lo que dejas pasar vuelve después). Referencia: *Papers,
Please* (revisas pasaportes; al día siguiente llega la consecuencia de lo que aprobaste).

**Quién eres:** oficial de créditos recién llegado a la agencia de Cliza del "Banco Kusi" (nombre
provisional y ficticio). Tu jefa de agencia te pasa las carpetas; el comité de crédito revisa tus
informes; al final llega el supervisor.

**El hub:** tu escritorio en la agencia, con tres cosas a la vista:

- **La carpeta del cliente de turno** (los documentos cambian con cada tema: una operación para
  clasificar, dos balances, un balance de comprobación, un informe de auditoría).
- **Tu manual** (la libreta de reglas), que crece con cada tema: primero la lista de las 14 NC, después
  la ecuación, la cascada, la regla de fuentes y aplicaciones, el árbol del flujo, las familias de
  ratios. Es lo que el alumno consulta, como el reglamento de *Papers, Please*.
- **Tu cartera:** una pared con una ficha por crédito que aprobaste. Con el tiempo cada ficha se pone
  verde (paga) o roja (mora). Es la progresión visible, sin puntos ni medallas.

**Bucle central:** llega un cliente con una solicitud → revisas sus papeles con la herramienta del
tema → escribes los números que sostienen tu opinión → decides (aprobar, rechazar, aprobar con
condiciones, contraofertar) → "meses después" ves qué pasó con esa ficha.

**Cómo cambia de un tema a otro:** siempre vuelves al escritorio; lo que cambia es qué trae el cliente
y qué herramienta de tu manual necesitas. Los Cóndores de Cliza vuelven gestión tras gestión (como en
el dossier, del Tema 3 al 6), así que hay un cliente cuya historia sigues y otros que aparecen para un
contraste (la panadería, el taller, la microempresa). En el Tema 7 el juego **da vuelta la mesa**:
llega el supervisor y ahora el que es leído con los números es **tu banco**, y tu cartera es la letra A
de su CAMEL.

**Dos minutos jugados** (Tema 4, fondos; números del caso del dossier, que en el juego cambian por
versión):

> Suena la campanita de la puerta. Es Don Efraín, el director de Los Cóndores de Cliza, con el
> sombrero en la mano y dos balances en una bolsa de nylon. "Este año generamos 43 mil bolivianos,
> licenciado. Préstanos 20 mil para las luces nuevas y los pagamos en un año."
>
> Pones los dos balances lado a lado. El activo creció de Bs 180.000 a Bs 208.000. En tu manual se
> abre la página nueva: *fuente es lo que sube del lado derecho o baja del izquierdo; aplicación, al
> revés; la caja no se clasifica, se usa de control.* Arrastras cada cuenta a su columna. Pones las
> cuentas por cobrar, que subieron, en fuentes; el control de caja se queda en gris. Las mueves a
> aplicaciones: ahora sí. Fuentes 43.000, aplicaciones 47.000, y la luz de control se enciende en
> verde: la diferencia, −4.000, es exactamente lo que bajó la caja.
>
> "¿Ves? Cuarenta y tres mil", dice Don Efraín. Tu jefa, desde su escritorio, sin levantar la vista:
> "¿Y cuánto de eso pasó por la caja?". En la bolsa hay un papel más: el acta de socios. Un socio
> nuevo entró poniendo instrumentos por Bs 20.000, y se capitalizaron Bs 5.000 de reservas. Ninguno de
> los dos movió un peso. Escribes las fuentes reales: 18.000. Y ya se aplicaron casi todas.
>
> Decides. Si apruebas los 20 mil tal como los pide, la ficha de Los Cóndores entra a tu cartera y el
> juego salta: "Tres meses después". La ficha parpadea en amarillo: en el mes de menos fiestas no
> llegaron a la cuota. Si en cambio anotas en tu informe que la banda generó 18 mil y no 43 mil, y
> propones un monto menor, la ficha entra en verde. En los dos casos el registro guarda tus números y
> tu argumento.

**Cómo aparece cada tema esencial:** el alumno aprende cada herramienta **porque sin ella no puede
decidir sobre la carpeta**. T1: los primeros clientes traen operaciones para clasificar con el manual
de NC y una máquina que "creció" por inflación. T2: la ferretería, la distribuidora y la cooperativa
que ganó y no paga. T3: Los Cóndores aparece por primera vez y compite con el taller Killa por el
único cupo del mes. T4: la escena de arriba y, en su segunda mitad, la contraoferta de pronto pago. T5:
la nueva gestión de Los Cóndores (flujo y el mes en rojo), la comparación con una banda nacional
cuatro veces más grande, y La Espiga que llega con un cuaderno y un borrador con errores. T6: el
comité te pide un informe con tres o cuatro ratios, no quince. T7: el supervisor, el CAMEL de tu banco,
el auditor que firma con salvedad sobre parte de la cartera, y por último la mentoría a Sumaj Manos y
"ahora con el tuyo".

**Qué se adapta o se inventa:** el banco, la agencia, la jefa, Don Efraín y los demás personajes; la
cartera y el "meses después" (el dossier no tiene consecuencias en el tiempo); el tamaño del banco se
achica para que la agencia sea creíble, conservando sus proporciones (6 % de patrimonio, etc.); todos
los números por versión.

**Costo con lo que hay** (una persona con Claude, Next.js, Supabase, pixel art con código):

- **Lo barato:** el arte. Un escritorio, una ventanilla, clientes que se sientan, documentos en
  pantalla y la pared de fichas. Mucho menos dibujo que un mundo que crece.
- **Lo caro:** los documentos por versión. Cada carpeta (balance, resultados, comprobación) tiene que
  generarse con semilla y cumplir reglas que conserven la lección (que cuadre, que el aporte en especie
  exista, que la trampa se pueda cometer). Es el mismo trabajo que ya se hizo en `planta.ts`, uno por
  tema. Las funciones financieras (cascada, cuadro de fondos, flujo indirecto, ratios, CAMEL) sirven
  también para las láminas.
- **Lo que se reusa:** versión por alumno, registro, cuentas, página del docente y escalera de ayuda.
- **Versión mínima jugable:** el escritorio, el manual y la cartera, más **el Tema 2 completo** (tres
  clientes: el balance de la ferretería, la cascada de la distribuidora y la cooperativa que ganó y no
  paga, con su "meses después") y **una escena del Tema 1** (la máquina que no creció). Es lo que
  todos los temas siguientes usan.

**Riesgo principal:** que se vuelva un "encuentra el error" (el cuestionario con otra ropa que
descartaste). Remedio: el alumno siempre **escribe** el número corregido y **decide**, la decisión
tiene consecuencia en su cartera, y varios temas son de construir, no de revisar (el estado de cambios,
el flujo, armar estados desde el comprobante).

---

#### Marco B · "Caso abierto"

**Gancho:** *Cada caso empieza con algo que no cierra: una cooperativa que ganó y no paga sueldos, un
socio que jura que la banda creció, un banco del que corre un rumor. Juntas las pruebas y las
presentas donde duele.*

**Género:** investigación y juicio (*deducción*: el juego te da pistas y tú armas la explicación;
*juicio*: presentas la prueba que contradice un testimonio). Referencias: *Ace Attorney* (investigas y
luego gritas "¡Objeción!" con la prueba exacta) y *Return of the Obra Dinn* (deduces qué pasó a partir
de documentos).

**Quién eres:** la joven perita contable de una pequeña firma de Cochabamba que atiende peritajes para
juzgados, bancos y socios peleados.

**El hub:** la oficina, con un corcho donde cada caso resuelto deja su expediente. Lo que avanza es tu
reputación y el tipo de caso que te encargan (de un reclamo de socios a un banco).

**La jugada que lo distingue:** las secciones **"Qué NO se puede afirmar"** del dossier (cuatro o cinco
por subtema) son literalmente los testimonios falsos. Alguien afirma lo que no se puede afirmar ("el
patrimonio subió, así que tenemos con qué pagar") y tú presentas la prueba y el número que lo
desmiente.

**Cómo cambia de un tema a otro:** cada tema es un caso con su investigación (la modalidad del tema) y
su audiencia. El cierre del Tema 7 es natural: tu firma emite su primera opinión de auditoría y tienes
que elegir entre las cuatro.

**Dos minutos jugados** (Tema 2, leer los dos estados juntos):

> El juzgado de trabajo te manda un expediente: los trabajadores de una cooperativa minera reclaman
> sueldos atrasados. El presidente de la cooperativa jura que no hay mala fe: "Este año ganamos 140
> mil bolivianos. ¡Mire el balance!".
>
> En la oficina abres los papeles. El estado de resultados dice utilidad neta Bs 140.000. El balance
> del año anterior, patrimonio Bs 900.000; no hubo reparto. Escribes el patrimonio final: 1.040.000.
> Cuadra. Entonces, ¿dónde está la plata? Revisas el activo corriente: casi todo son cuentas por
> cobrar. Buscas en la carpeta: un contrato de venta de mineral con pago a 60 días.
>
> Audiencia. El abogado de la cooperativa repite: "El patrimonio creció 140 mil. Con eso se pagan los
> sueldos". Tu libreta se abre con las pruebas que juntaste. Eliges el contrato a 60 días y la línea de
> cuentas por cobrar. "¡Objeción!". Escribes en una frase que la ecuación explica el patrimonio, no la
> caja. El juez asiente: el problema no es de mala fe, es de caja. Y te pregunta qué estado habría
> avisado a tiempo. Escribes: el flujo de efectivo. El caso se cierra y su expediente sube al corcho.

**Cómo aparece cada tema esencial:** cada tema es un caso. T1: el peritaje sobre si una cooperativa de
quinua podía usar NIIF para sus cultivos (no hay NC: supletoria). T3: dos socios pelean porque "la banda
creció" (por un aporte, no por utilidad). T4: el banco sospecha de fuentes infladas. T5: una panadería
cuyo balance cuadra y está mal. T6: un inversionista deslumbrado por un ROE altísimo. T7: el rumor de
corrida, el CAMEL y tu primera opinión de auditoría.

**Qué se adapta o se inventa:** la firma, los personajes, los litigios y las audiencias (el dossier no
tiene juicios). Los casos de estudio del dossier pasan a ser expedientes.

**Costo:** el más caro en **escritura**: cada caso necesita pistas, testimonios y contradicciones que
sigan funcionando con los números de cada versión. Arte medio (oficina, sala de audiencia, retratos).
**Versión mínima jugable:** la oficina y un caso completo (la cooperativa minera) con su audiencia.

**Riesgo principal:** cada caso es una empresa nueva, así que se pierde el hilo de Los Cóndores que el
dossier encadena del Tema 3 al 6, y vuelve el riesgo de "aparece de la nada". Además, la audiencia puede
caer en elegir la prueba correcta de una lista (opción múltiple disfrazada) si no se exige escribir el
número.

---

#### Marco C · "El mánager de la banda"

**Gancho:** *Los Cóndores de Cliza te dan las cuentas de la banda. Tocan en todas las fiestas del
valle, ganan bien y siempre les falta plata. Tu trabajo: que la banda crezca sin quedarse sin caja
el mes que menos se toca.*

**Género:** simulador de gestión (*management sim* o *tycoon*: administras un negocio en el tiempo y ves
el efecto de cada decisión en sus números). Referencia: *Game Dev Tycoon* (llevas un estudio desde un
garaje, decidiendo en qué gastar cada año).

**Quién eres:** el sobrino o sobrina de Don Efraín que estudia administración y termina llevando las
cuentas de la banda.

**El hub:** la sala de ensayo, con la pizarra de las cuentas. Cada tema desbloquea un **tablero** nuevo
(el balance, el estado de resultados, el estado de cambios, el cuadro de fondos, el flujo, los
porcentajes, los ratios) que necesitas para decidir la gestión siguiente.

**Cómo cambia de un tema a otro:** cada gestión trae decisiones (repartir o reinvertir, aceptar un socio,
comprar equipo, dar crédito a los organizadores, pedir un préstamo) y el tema dice con qué tablero se
leen. El Tema 7 queda más forzado: el banco al que le pides el préstamo, el auditor que te exige el
inversionista y, al final, la mentoría a otra microempresa.

**Dos minutos jugados** (Tema 5, presupuesto de caja):

> Llegas a la sala de ensayo: la caja de la banda tiene Bs 41.000 y el tablero del presupuesto se
> desbloquea. Tres meses por delante. El primero es de fiestas: cobros 45.000, pagos 30.000. El
> segundo, flojo: cobros 15.000, pagos 28.000. El tercero trae el pago grande ya comprometido del bus y
> el vestuario: cobros 18.000, pagos 65.000.
>
> Escribes los saldos mes a mes: 56.000, 43.000 y, en el tercero, −4.000. La columna se pone roja.
> La banda decidió no bajar de Bs 5.000 en caja: escribes cuánto falta, 9.000. Don Efraín ya está
> hablando de pedir un préstamo de urgencia. Tú tienes dos cartas más: negociar con el proveedor del
> vestuario que Bs 20.000 pasen al cuarto mes, o pedirle al organizador de una fiesta un anticipo de
> Bs 12.000. Juegas la primera. El tercer mes queda en 16.000, sin un peso prestado. Avanzas el tiempo:
> llega el tercer mes y los músicos cobran el día que tocaba.

**Cómo aparece cada tema esencial:** T1: la banda formaliza sus cuentas y tiene que saber bajo qué norma.
T2: el primer balance y el primer estado de resultados de la banda. T3: el socio nuevo y el reparto. T4:
cómo se financió el equipo nuevo y la política de cobro a los organizadores. T5: el flujo, el
presupuesto y los porcentajes. T6: los ratios que mira el banco cuando piden el préstamo. T7: el banco
por dentro, la auditoría que pide el inversionista y la mentoría a Sumaj Manos.

**Qué se adapta o se inventa:** los años de la banda, los eventos (fiestas, un organizador que no paga,
un bus que se rompe), la familia. Es el marco que más usa el caso del dossier tal cual.

**Costo:** el más caro de los tres. Un simulador de gestiones con eventos, tableros que se desbloquean y
decisiones que se arrastran de un año a otro. **Versión mínima jugable:** una gestión de la banda con el
reparto de utilidades (T3) y el presupuesto de caja (T5).

**Riesgo principal:** AIEF enseña a **leer números ajenos para decidir**, y aquí el alumno lee siempre
los suyos; T1 y T7 entran forzados. Además los errores se arrastran de gestión en gestión, así que hacen
falta puntos de control en cada tema, lo que le quita parte de la gracia a la gestión.

---

### 5. Mapa de cobertura

Dónde se aprende cada tema esencial en cada marco. Ningún tema queda afuera.

| Tema esencial | A · La ventanilla | B · Caso abierto | C · El mánager |
|---|---|---|---|
| T1.1 Usuarios y su decisión | Tres personas piden el mismo balance en la ventanilla | Quién encargó el peritaje y para qué | Quién le pide los estados a la banda |
| T1.2 NC obligatoria, NIIF supletoria | Operaciones contra el manual de las 14 NC | Peritaje de la cooperativa de quinua | La banda formaliza sus cuentas |
| T1.3 Calidad y reexpresión (NC 3) | La máquina que "creció 12 %" | Un balance tardío que ya no sirve | Comparar dos años de la banda |
| T2.1 Balance y ecuación | Balance de la ferretería | Balance como prueba | Primer balance de la banda |
| T2.2 Cascada e IUE | Cascada de la distribuidora | Estado de resultados como prueba | Primer estado de resultados |
| T2.3 PF = PI + UN − D; utilidad no es caja | La cooperativa que ganó y no paga | Audiencia de la cooperativa minera | El mes que ganaron y no alcanzó |
| T3.1 y 3.2 Componentes y estado de cambios | Los Cóndores con socio nuevo | Pelea de socios | El socio nuevo y el reparto |
| T3.3 Índice de autofinanciamiento | Cupo único: Los Cóndores o Killa | "La banda creció" desmentido | ¿Repartir o reinvertir? |
| T4.1 y 4.2 Cuadro de fondos y control de caja | La escena de los 43 mil | Fuentes infladas | Cómo se pagó el equipo |
| T4.3 Lo que no pasó por caja | El acta de socios | Prueba del aporte en especie | El aporte en instrumentos |
| T4.4 y 4.5 Capital de trabajo y composición | El colchón de Los Cóndores | Caja contra cuentas por cobrar | El colchón de la banda |
| T4.6 Política con costo | Contraoferta de pronto pago | El peritaje propone la política | Política de cobro a organizadores |
| T5.1 y 5.2 Flujo indirecto y O, I, F | Nueva gestión de Los Cóndores | Dónde se fue la caja | Tablero de flujo |
| T5.3 Presupuesto de caja | El mes en rojo antes de firmar | Rumor de impago | La escena del tercer mes |
| T5.4 a 5.6 Vertical, horizontal, combinados | Los Cóndores contra una banda nacional | Comparación de dos empresas | Tablero de porcentajes |
| T5.7 y 5.8 Armar y revisar estados | La Espiga con cuaderno y borrador | El balance que cuadra y está mal | La banda arma sus estados |
| T5.9 Primera interpretación | Cuatro frases a La Espiga | Dictamen del caso | Informe a los socios |
| T6.1 Sistema y referencia | Informe al comité | El inversionista deslumbrado | Los ratios que mira el banco |
| T6.2 a 6.4 Cuatro familias | Informe al comité | Pruebas por familia | Tablero de ratios |
| T6.5 DuPont y límites | De dónde sale el ROE | Desarmar el ROE en audiencia | La palanca de la banda |
| T7.1 a 7.3 Banco y alertas | Tu banco por dentro | Rumor de corrida | El banco del préstamo |
| T7.4 a 7.6 CAMEL y dominancia | El supervisor califica tu banco; tu cartera es la A | Peritaje de un banco | (débil) informe sobre el banco |
| T7.7 a 7.9 Auditoría y escenario conservador | Salvedad sobre parte de tu cartera | Tu primera opinión | La auditoría que pide el inversionista |
| T7.10 a 7.12 Microempresa, prioridades y reto | Mentoría a Sumaj Manos y "ahora con el tuyo" | Caso de Sumaj Manos | Mentoría a otra microempresa |

---

### 6. Maqueta general (de la propuesta recomendada, A)

*Reemplazado por la Ronda 2 (R2.2 y R2.3) y la Ronda 3 (R3.1). Queda como antecedente; no construir desde aquí.*

Primero la maqueta entera; el detalle por subtema, con sus fichas, recién cuando la apruebes
(`IDEA-JUEGO.md` §13). Si eliges B o C, esta maqueta conserva el orden de los temas y lo que cada uno
usa del otro; cambia el vestuario.

#### 6.1 Inicio y fin

**Inicio:** el primer día en la agencia de Cliza. Tu jefa te da el escritorio, un manual casi vacío y
una pared de cartera sin fichas. "Aquí nadie te va a mentir con los números. Te van a mostrar números
ciertos que no dicen lo que parece."

**Fin:** el supervisor revisa tu banco con el CAMEL, y la letra A es tu cartera, con cada ficha verde o
roja que dejaste en el camino. Después, la dueña de Sumaj Manos te pide ayuda con una sola hora libre, y
el juego termina con **"ahora con el tuyo"**: la secuencia de seis preguntas de D7 §7.12 aplicada al
emprendimiento del reto del alumno. Lo que escribió queda en su registro para **la defensa oral en tu
clase**, que es el jefe final.

#### 6.2 El orden y el hilo

| Tema | Qué pasa en el juego | Qué usa de antes | Qué deja para después |
|---|---|---|---|
| **Llegada** | Te presentan la agencia, el manual y la cartera vacía | (nada) | Dónde estás y qué es tu trabajo, antes del primer número |
| **1 · Las reglas** | Los primeros clientes: quién pide un estado y para qué; operaciones que se resuelven con el manual de las 14 NC; la máquina que "creció" | (nada) | La primera página del manual (NC, NIIF supletoria, unidad de medida) |
| **2 · Los dos estados** | La ferretería, la distribuidora y la cooperativa que ganó y no paga | El manual | La ecuación y la cascada en el manual; las primeras fichas en la cartera |
| **3 · El patrimonio** | Los Cóndores llegan por primera vez; compiten con el taller Killa por el único cupo del mes | La ecuación (T2) | Los Cóndores como cliente que vuelve; su balance de cierre |
| **4 · La plata que entra y sale** | Los Cóndores vuelven por las luces (la escena de la sección 4); después, el colchón y la contraoferta de pronto pago | El balance de cierre de Los Cóndores (T3) | El balance final de Los Cóndores |
| **5 · La caja y los porcentajes** | La nueva gestión de Los Cóndores (flujo y el mes en rojo); la comparación con una banda nacional; La Espiga con su cuaderno y su borrador | El balance de Los Cóndores (T4) | Los estados de cierre de Los Cóndores y de La Espiga |
| **6 · El comité** | El comité te pide un informe para decidir un crédito grande a Los Cóndores; eliges los ratios y desarmas el ROE | Los estados de cierre (T5) | Tu ascenso a analista; ROA, ROE y apalancamiento en el manual |
| **7 · El banco por dentro** | El supervisor lee tu banco (6 % de patrimonio), la mora que se lleva el capital, el CAMEL con tu cartera como A, el auditor con su salvedad; la mentoría a Sumaj Manos; "ahora con el tuyo" | La cartera de todos los temas; ROA, ROE y apalancamiento (T6) | El registro completo para tu defensa oral |

**El hilo es doble y viene del dossier:** Los Cóndores, que el dossier ya encadena del Tema 3 al 6, y
**tu cartera**, que es lo único que el juego agrega como cadena propia y que sólo se cobra en el Tema 7.
Nada más se encadena a la fuerza: los clientes de contraste (ferretería, distribuidora, cooperativa,
Killa, banda nacional, La Espiga, Sumaj Manos) entran y salen en su tema.

#### 6.3 Casos de contraste

El dossier sí trabaja el mismo tema en variantes, aunque no por "tipo de proyecto" sino por **tipo de
entidad**: una empresa de servicios sin inventario (la banda), una productiva con inventario (la
panadería), una comercial (ferretería, distribuidora), un banco y una microempresa. D7 §7.1 lo vuelve
regla: el primer paso es reconocer qué tipo de entidad se está leyendo. En el juego, Los Cóndores es el
hilo, y cada tema trae el contraste que el dossier usa en ese punto (La Espiga para la prueba ácida y la
liquidez de más, el banco para los umbrales al revés, Sumaj Manos para la escala micro).

#### 6.4 Cómo se juega en tu orden de calendario

Cada tema se abre cuando tú lo habilitas, y **cada tema arranca de un punto de control**: la carpeta
del cliente trae los números correctos de la versión del alumno, no los que él escribió en el tema
anterior. Así:

- Si habilitas el Tema 4 (fondos) antes que el Tema 3, la carpeta de Los Cóndores ya trae los dos
  balances y el acta de socios; el juego no necesita que haya jugado el 3.
- Si habilitas el Tema 7 antes que el Tema 6, la jefa te da la tarjeta de los tres ratios que D7 §7.1
  ya trae como recordatorio.
- Si llega al Tema 7 con la cartera incompleta, las fichas que faltan se llenan con decisiones por
  defecto, y tu página del docente lo marca.
- La historia sí recuerda lo que hizo ("menos mal que no le dimos los 20 mil"); los números no
  arrastran el error.

#### 6.5 Cómo crece sin romper (estructura escalable)

- **Un juego nuevo, al lado del otro.** AIEF entra como isla propia (`isla: "aief"`), con su ruta y su
  carpeta. La escena de Proyectos II y sus partidas guardadas no se tocan.
- **Un tema, una pieza.** Cada tema es un archivo de datos y funciones con sus pruebas; agregar un
  cliente o una escena es sumar un archivo y una línea en su registro.
- **Lo común no depende de AIEF.** Las funciones financieras (cascada, cuadro de fondos, flujo, ratios,
  CAMEL) van con sus pruebas donde el resto del sitio también las pueda usar (las láminas, por
  ejemplo). La versión por alumno, el registro, las cuentas y la página del docente se reusan con una
  semilla por tema.
- **La cartera se agrega, no se reescribe:** cada decisión es una entrada nueva del registro; lo que un
  alumno ya jugó no se pierde si mañana se suma un cliente.

---

### 7. Recomendación ya decidida y la única pregunta

*Reemplazado por la Ronda 2 (R2.7) y la Ronda 3. Queda como antecedente.*

**Recomiendo el marco A, "La ventanilla"**, por tres razones que salen del dossier:

1. **Es la forma de la materia.** AIEF enseña a leer números que otro preparó para tomar una decisión
   (D1 §1.1 pone al banco como usuario primario desde la primera página), y el dossier vuelve una y otra
   vez a la misma escena: alguien pide plata y hay que decidir si se le presta (D3 Caso 3, D5, D6, D7).
2. **Tiene inicio y fin de verdad.** Empieza en una ventanilla vacía y termina con el supervisor leyendo
   tu propio banco, donde tu cartera es la letra A. El Tema 7, que en los otros marcos entra forzado,
   aquí es el desenlace.
3. **Es el más barato de dibujar** y reusa todo lo que ya existe; el costo va a los documentos por
   versión, que son justo lo que hace que cuente para la nota.

**De los otros dos tomaría:** de B, la **objeción** como modalidad para los "Qué NO se puede afirmar" y
para la auditoría del Tema 7; de C, que **Los Cóndores vuelvan gestión tras gestión** como cliente
cuya historia se sigue.

**Decidido** (sale del dossier o de `IDEA-JUEGO.md`): el orden de los temas es el del dossier, cada uno
abierto cuando tú lo habilitas y con su punto de control; toda cascada lleva IUE al 25 % (D2 §2.2); el
marco normativo es el de D1 (NC obligatoria, NIIF supletoria); los casos de los entregables evaluados
(Wara, Q'ente, Amaru) no entran al juego; el alumno escribe cada número y la pista sale de su error
(las trampas del dossier); **se construye primero la llegada, el Tema 2 completo y una escena del Tema
1**, porque todo lo demás usa lo que esos temas producen.

**La única pregunta, de gusto:** ¿te convence que el alumno sea **el oficial de créditos de la agencia**
(A), o te llama más **la perita que resuelve casos y los defiende en audiencia** (B) o **el mánager de
Los Cóndores** (C)? También vale "A con algo de B".

### Lo que dijo Ronald

*(Respondió el 27-09: ver la Ronda 2, arriba.)*

---

## Dossiers usados

Leídos directo de la carpeta de materias de Ronald el 26-09-2026 (no se suben al repositorio). Ruta
relativa a esa carpeta, fecha del archivo y huella (`scripts/huella-dossier.mjs`). Se leyeron además,
como apoyo, las guías de lectura de los Temas 1 a 7 (misma carpeta, `1_CONTENIDO`).

| Dossier (relativo a la carpeta de materias) | Fecha del archivo | Huella |
|---|---|---|
| `analisis e interpretacion de estados financieros/1_CONTENIDO/TEMA 1/Latex/TEMA 1 - DOSSIER.tex` | 2026-09-06 | `ceae4e587bbf` |
| `analisis e interpretacion de estados financieros/1_CONTENIDO/TEMA 2/TEMA 2 - DOSSIER.tex` | 2026-09-06 | `654083ed246e` |
| `analisis e interpretacion de estados financieros/1_CONTENIDO/TEMA 3/Tema3_Patrimonio_y_Movimientos_Patrimoniales.tex` | 2026-09-06 | `740e2f321bec` |
| `analisis e interpretacion de estados financieros/1_CONTENIDO/TEMA 4/Tema4_Origen_Aplicacion_Fondos_y_Capital_Trabajo.tex` | 2026-09-07 | `ed6441e8c56e` |
| `analisis e interpretacion de estados financieros/1_CONTENIDO/TEMA 5/Tema5_Analisis_Vertical_Horizontal_y_Flujo_Efectivo.tex` | 2026-09-07 | `4083a7713058` |
| `analisis e interpretacion de estados financieros/1_CONTENIDO/TEMA 6/Tema6_Razones_o_Ratios_Financieros.tex` | 2026-09-07 | `8b0a87507c27` |
| `analisis e interpretacion de estados financieros/1_CONTENIDO/TEMA 7/Tema7_Diagnostico_Avanzado.tex` | 2026-09-07 | `43454c32ae1c` |
