# 00 · Adaptación del dossier: Análisis e Interpretación de Estados Financieros (AIEF)

**Estado: en conversación (Ronda 1).** Agente: `adaptador-de-dossier`. Es el **juego propio de AIEF**
(`IDEA-JUEGO.md` §14 y §16): no comparte mundo, personajes ni género con el de Proyectos II; comparte
sólo la base técnica (cuentas, versión por alumno, registro para la nota, escalera de ayuda, pruebas).

**Única pregunta para Ronald:** ¿te convence que el alumno sea **el oficial de créditos de un banco
chico del valle** (propuesta A, recomendada), o te llama más **la investigadora que resuelve casos y
los defiende en audiencia** (B) o **el administrador financiero de la banda Los Cóndores de Cliza**
(C)? (sección 7).

---

## Ronda 1 · versión 1 · 26-09-2026

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

#### Marco A · "La ventanilla" (recomendado)

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

*(Pendiente.)*

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
