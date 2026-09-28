# 00 · Adaptación del dossier: Psicoestadística Descriptiva · juego de Psicología

**Estado: EN CONVERSACIÓN · Ronda 1 (maqueta general, sin fichas).** Tres marcos para elegir; recomendado
el A, «El Observatorio». Juego de la carrera de **Psicología**; el de Empresariales se adapta después, con
su propio dossier y en su propio documento.

**Próxima pregunta para Ronald:** ¿te convence que el alumno sea **el analista del Observatorio de la
ciudad** (A), o te llama más **la psicóloga del colegio** (B) o **el verificador de la redacción** (C)?
También vale «A con algo de B».

---

## Ronda 1 · versión 1 · 28-09-2026

**Con qué se trabajó:** los seis dossiers de la materia (Temas 1 a 6, archivos `.tex`), leídos completos
desde la carpeta de materias de Ronald; su ficha (sólo el mapa del semestre, §3, para el orden de dictado)
y la guía `QUE SUBIR A MOODLE.md` (el calendario del curso EAD-111, que usa este material). No se copió
nada al repositorio: aquí sólo se resumen los temas y se citan sus secciones. **"D3 §3.2"** es el dossier
del Tema 3, sección 3.2. También se leyeron `IDEA-JUEGO.md`, `PIEZAS-COMUNES.md`, `LEEME.md` del GDD y de
los agentes, `BITACORA.md` §0 y `CLAUDE.md`. No se usaron los casos de práctica ni los de evaluación de la
materia (Aranjuez, Convive, San Roque, SEDES, Aula 204, Camila, Tamizaje El Alto, el integrador y los
demás): son tareas que Ronald califica.

Todo va **por temas**, sin semanas ni duraciones. Cada tema se abre cuando Ronald lo habilita.

### Palabras de oficio de esta ronda

| Término | Qué quiere decir |
|---|---|
| **Propuesta** o *pitch* | Una idea de juego contada en una página para decidir si vale la pena hacerla. |
| **Marco** | Lo que da unidad a todo el juego: el mundo, quién eres, qué avanza. No cambia de tema a tema. |
| **Modalidad** | La forma de jugar un tema concreto (armar una tabla, muestrear, investigar papeles…). Cambia de tema a tema. |
| **Género** | La familia de juegos a la que pertenece un marco; dice qué haces la mayor parte del tiempo. |
| **Hub** (lugar central) | La pantalla a la que vuelves entre una modalidad y otra. Hace que modalidades distintas se sientan un solo juego. |
| **Bucle central** (*core loop*) | Lo que el jugador repite una y otra vez. |
| **Niebla de guerra** (*fog of war*) | En los juegos de estrategia, la parte del mapa que todavía no exploraste está tapada: sabes que hay algo, no qué. |
| **Revelación** (*reveal*) | El momento en que el juego destapa lo que estaba oculto y ves si tu apuesta era buena. |
| **Punto de control** (*checkpoint*) | Un momento donde el juego arranca lo siguiente con los números correctos, para que el error de un tema no arruine el próximo. |
| **Versión mínima jugable** | Lo más chico que se puede construir y probar con un curso. Aquí siempre es **un tema**. |
| **Jefe final** | El desafío que cierra. Ya decidido: la defensa oral en clase de Ronald. |

---

### 1. Qué aprende el alumno

#### 1.1 El arco de la materia, según el propio dossier

El dossier trae su arco con inicio y fin, y lo dice en sus cajas de enlace («Lo que resolvimos · Dónde se
rompe · Lo que viene»): **empieza** en cómo se fabrica un número sobre algo que no se ve (D1) y **termina**
en defender ante un tribunal lo que ese número permite afirmar y lo que no (D6 §6.4). En el medio, cada tema
resuelve la grieta que dejó el anterior:

| Tema | Qué logra el alumno | Qué deja para un tema posterior |
|---|---|---|
| **1 · Introducción** (D1) | Sabe de dónde sale un dato, a quién representa, qué operaciones admite y qué gráfico le corresponde | El **nivel de medición**, que decide todo lo demás (su tabla de decisión es la maestra de la materia), y la frontera muestra/población |
| **2 · Organización de datos** (D2) | Convierte una pila de planillas en una tabla de frecuencias y en un gráfico que se lee de un vistazo | La tabla agrupada (marca de clase) y la **forma** del histograma, que T3 nombra |
| **3 · Estadística unidimensional** (D3) | Resume una variable con cuatro números (centro, dispersión, posición, forma) después de limpiar los datos | La desviación (x − x̄), que T4 multiplica; el «diagnóstico» de una variable que T6 defiende |
| **4 · Estadística bidimensional** (D4) | Cruza dos variables: tabla de doble entrada, condicionadas, nube de puntos, covarianza, r, R² y recta | La pregunta «¿entre quiénes?» y el cruce que T6 presenta |
| **5 · Probabilidad** (D5) | Pone un número a lo que no pasó, lo recalcula con información nueva y lo invierte con Bayes | La tasa base; el puente a Psicoestadística Inferencial |
| **6 · Investigación y estadística** (D6) | Arma un informe que responde una pregunta y lo defiende ante repreguntas | El cierre: la defensa |

**El hilo que atraviesa los seis** no es un caso (cada tema trae los suyos), sino dos ideas que el dossier
repite en cada subtema: **«Qué NO se puede afirmar»** (cada subtema cierra con su límite) y **«primero se
mira, después se calcula»** (D4, tabla de decisión: el gráfico es el único paso que avisa que el resto no
tiene sentido). El juego tiene que enseñar esas dos cosas por encima de cualquier fórmula.

#### 1.2 Qué sabe hacer al terminar (diseño inverso)

Todo lo que «pasa» pasa en el mundo del juego, no es un mensaje de error.

| Sabe hacer | Lo demuestra así | Si lo hace mal, pasa esto |
|---|---|---|
| **T1** Distinguir población y muestra, parámetro y estadístico; reconocer quién quedó afuera de una muestra (cobertura, no respuesta, respuesta) y hacia dónde sesga; clasificar cada variable en su nivel (Stevens) y saber qué cálculo prohíbe; elegir el gráfico y leer dónde empieza el eje; separar el indicador del fenómeno; saber por qué un programa necesita grupo de control | Elige cómo conseguir los datos con recursos limitados, escribe el estadístico, dice qué grupo faltó y si el resultado sube o baja por eso; declara el nivel de cada columna; ajusta el gráfico | La ayuda va adonde no hacía falta; el informe sale con «colegio promedio: 3,4»; celebra que las denuncias bajaron a cero cuando lo que cambió fue la forma de contar; atribuye al programa una mejora que era regresión a la media |
| **T2** Contar frecuencias absolutas, relativas y acumuladas (sólo con orden); agrupar con Sturges, amplitud por exceso y límites [ ); leer histograma, polígono y ojiva; ordenar un Pareto y calcular ángulos | Arma la tabla desde datos crudos y responde un umbral («¿cuántos superan 4?»); pone las paredes de los intervalos; lee la mediana en la ojiva; prioriza causas | Se queda sin camas porque contó mal el umbral; el dato más alto no entra en ningún intervalo; cree que atacar las dos primeras causas resuelve el 80 % |
| **T3** Calcular media, mediana y moda y elegir cuál informar según la forma; desviación típica (n − 1) y CV; percentiles, cuartiles, RIC y atípicos; limpiar la matriz antes de calcular | Escribe los tres centros y la dispersión, informa el par que corresponde; ubica a una persona con su percentil; detecta el valor imposible | Un solo caso extremo hace que un grupo leve parezca moderado; manda al especialista al grupo equivocado entre dos con la misma media; confunde percentil con porcentaje |
| **T4** Tabular pares; distinguir conjunta, marginal y condicionada (el denominador); mirar la nube antes de calcular; covarianza (sólo el signo), r y R² como varianza compartida; recta de regresión dentro del rango | Escribe el porcentaje por fila, r, R², b, a y una predicción | Dice «20 %» cuando la pregunta era «entre los severos» (80 %); aplica una política como si r fuera causa y nada cambia; predice fuera del rango y se equivoca |
| **T5** Probabilidad simple (Laplace), condicionada, independencia; invertir la condición con Bayes usando frecuencias naturales | Escribe cuántos positivos habrá y cuántos de ellos tienen el trastorno (VPP) | Trata un tamizaje positivo como diagnóstico y etiqueta a dos de cada tres niños que no tienen nada |
| **T6** Ordenar un informe (muestra → una variable → dos variables); elegir estadístico y gráfico según el tipo de variable; decir el alcance y las limitaciones antes de que se las pregunten | Arma el informe con la evidencia que responde la pregunta; responde repreguntas | El tribunal repregunta justo por lo que no dijo; su conclusión se cae por una frase que prometía más de lo que los datos sostienen |

#### 1.3 La esencia: qué no puede faltar y qué se puede cambiar

**Lo esencial (se aprende sí o sí):**

- **Conceptos:** población, muestra, parámetro, estadístico; error muestral y no muestral; sesgos de
  cobertura, no respuesta y respuesta; indicador contra fenómeno (sesgo de reporte); fases del análisis y
  por qué no se reordenan; grupo de control y regresión a la media; descriptiva contra inferencial; los
  cuatro niveles de Stevens y qué permite cada uno; barras separadas contra pegadas; eje truncado y
  pictograma engañoso; frecuencias y acumuladas; intervalos y marca de clase; forma de una distribución;
  centro, dispersión, posición, forma; atípico; conjunta, marginal, condicionada; nube de puntos;
  covarianza, r, R²; regresión y extrapolación; correlación no es causa; probabilidad, condicionada,
  independencia, falacia de la inversa, tasa base; estructura del informe; alcance y limitaciones.
- **Cálculos:** n_i, h_i, N_i, H_i; Sturges, rango, amplitud, límites, marca de clase; ángulo de sector;
  media, mediana, moda (sueltos y agrupados); varianza con n − 1, desviación típica, CV; percentil con
  (n + 1), cuartiles, RIC, límites de 1,5 RIC; condicionadas por fila; covarianza, r, R², b, a, ŷ;
  P(A), P(A|B), regla del producto, Bayes (VPP) con frecuencias naturales.
- **Errores típicos:** el dossier trae uno o dos por subtema en sus cajas de alerta y de «el error de
  lectura típico»; son la materia prima de las pistas por error.
- **Decisiones:** a quién se mide, qué número se informa, a quién se deriva, dónde se pone el recurso, qué
  frase se firma.

**Lo adaptable (el juego puede cambiarlo, IDEA-JUEGO §9):** personas, lugares, instituciones y números
(cada alumno tiene su versión; la versión 0 puede ser el ejemplo del dossier); el orden interno de cada
tema; las anécdotas históricas de D1 §1.1 (Quetelet, Galton, Pearson) pueden aparecer como detalle del
mundo, no como lectura; el paso a paso en Excel de D3 §3.5 y D4 §4.7 queda para el dossier y la práctica
con software (el juego no enseña menús).

**Lo que el juego no usa:** los casos de práctica y de evaluación de la materia (ver arriba), y los
contenidos que el curso EAD-111 pide y el dossier no tiene (prueba t, ANOVA, intervalos de confianza,
software): no se inventan por fuera del dossier.

#### 1.4 Hallado al leer (conviene que lo mires; el juego ya tomó una posición)

1. **La ficha y el calendario nombran los temas distinto que los dossiers.** La ficha (§3) y `QUE SUBIR`
   dicen: T3 tendencia central, T4 medidas de dispersión, T5 distribución normal, T6 correlación y
   regresión. Los dossiers dicen: **T3** centro, dispersión, posición y forma (la dispersión está en D3
   §3.2); **T4** estadística bidimensional (tablas, r, regresión); **T5** probabilidad y Bayes (no hay
   distribución normal); **T6** investigación, informe y defensa. Por eso el calendario manda «dispersión» al
   Tema 4 y «correlación» al Tema 6. **En el juego:** mandan los dossiers.
2. **El denominador cambia de un tema a otro.** D3 §3.2 enseña la varianza con **n − 1**; D4 §4.4 enseña
   la covarianza dividiendo por **N**; D4 §4.5 arma r = S_xy / (S_x · S_y). Quien use la desviación de D3
   y la covarianza de D4 obtiene un r que no es el de Pearson (con 5 datos, un 20 % más chico). D6 §6.3
   trae r con la fórmula de sumas, que no tiene ese problema. **En el juego:** r se pide con la fórmula de
   D6 §6.3 (o con el mismo denominador arriba y abajo), y la pista reconoce el error de mezclar.
3. **Sturges: «entero impar más cercano».** D2 §2.2 lo dice en la definición, y sus dos ejemplos redondean
   al entero más cercano (5,91 → 6; 6,64 → 7). **En el juego:** entero más cercano, como los ejemplos.
4. **Los adjetivos de r no calzan.** D6 §6.3 da débil < 0,3, moderada 0,3 a 0,6, fuerte > 0,7 (entre 0,6
   y 0,7 no hay nada) y llama «moderada-alta» a 0,65. **En el juego:** el alumno escribe r y R²; el
   adjetivo nunca es la respuesta que se califica (el propio D6 dice que son convenciones).
5. **«R² explica» contra «R² es varianza compartida».** D4 §4.5 dice «el 64 % se debe a las horas de
   estudio» y «el Test A explica el 72,25 %… es un instrumento válido», y su propio «Qué NO se puede
   afirmar» lo corrige (varianza compartida, no explicación; coincidir no es validez). D6 §6.3 vuelve a
   decir «la motivación explica el 42 %». **En el juego:** «varianza compartida», como el «Qué NO» de D4.
6. **D5 empieza diciendo que viene después de la bidimensional**, y el calendario de EAD-111 pone
   probabilidad antes que correlación. **En el juego:** T4 y T5 no dependen uno del otro (ver §7).
7. **D1 §1.6, «La Regla de Oro»** (chi-cuadrado, t de Student, ANOVA) es contenido inferencial. El juego
   no lo usa.
8. **D3 §3.4:** g₁ mezcla 1/n arriba con s (n − 1) abajo. **En el juego:** la asimetría se lee con la
   regla práctica del mismo subtema (media contra mediana); g₁ no se calcula a mano.
9. **D4 §4.1** llama «cualitativa» al rendimiento Bajo/Medio/Alto; es ordinal (como dice la tabla de
   decisión de D1). Detalle.

---

### 2. Qué tiene de apasionante esta materia en la vida real

Un estudiante de primer semestre de Psicología eligió la carrera para entender a las personas, no para
hacer cuentas. El dossier le da el argumento para que las cuentas le importen: **detrás de cada número hay
alguien, y el número decide qué le pasa.** Las tensiones que la vuelven jugable, todas del dossier:

- **Lo invisible se mide con sombras.** Nadie ve la ansiedad; se ven respuestas a un test (D1 §1.2). El
  indicador no es el fenómeno: las denuncias de acoso bajan a cero porque el director prohibió reportar
  (D1, «Casos para pensar»).
- **Nadie ve la población entera.** El parámetro existe y nadie lo conoce (D1 §1.3); una muestra de 10.000
  mal elegida es peor que una de 1.000 bien elegida. Apostar con información incompleta es el oficio.
- **Números ciertos que engañan.** El eje que empieza en 68 (D1 §1.7), el pictograma que se agranda cuatro
  veces (D2 §2.4), la media que un solo paciente arrastra de «leve» a «moderado» (D3 §3.1), el 80 % del
  Pareto que no se resuelve (D2, «Qué NO»).
- **Dos grupos con el mismo promedio, uno donde te ahogas** (D3 §3.2, los dos ríos).
- **Una etiqueta a los siete años dura años.** El tamizaje que «acierta el 90 %» y se equivoca con dos de
  cada tres niños que señala (D5 §5.3).
- **El programa que «funcionó» sin hacer nada.** Elegir a los peores y verlos mejorar solos (regresión a la
  media, D1 §1.1 y §1.4).
- **El tribunal.** Un análisis impecable mal defendido se evalúa como si estuviera mal (D6 §6.4).

**El gancho que sale de ahí:** *cada número que firmas decide a quién le llega la ayuda. Sólo ves una
parte de la gente; tu trabajo es no prometer más de lo que viste.*

---

### 3. Modalidad por tema

Aquí manda el contenido, no el marco. «Sin juego propio» quiere decir que alcanza una escena corta o un
paso de otra escena (IDEA-JUEGO §13); se confirma subtema por subtema en las fichas, después de la maqueta.

| Tema | Qué tiene que hacer el alumno | Modalidad que calza | Alternativa |
|---|---|---|---|
| **T1.3** Población, muestra, errores y sesgos | Elegir cómo conseguir los datos, escribir el estadístico, decir quién faltó y hacia dónde sesga | **Muestrear con niebla y revelación**: sólo ves lo que mediste; después se destapa todo | Comparar dos encuestas ya hechas |
| **T1.5** Descriptiva e inferencial | Escribir la frase que se sostiene («de los 60…» contra «un tercio de la ciudad…») | Sin juego propio: es la frase que firma al cerrar T1.3 | Clasificar frases |
| **T1.1 y 1.4** Fases, grupo de control, regresión a la media | Decidir a quién da el programa y contra qué compara | **Experimento con «meses después»**: los peores mejoran igual sin programa | Ordenar las fases de un estudio fallido |
| **T1.2 y 1.8** Constructo, indicador, fuentes, sesgo de reporte | Decidir si cambió el fenómeno o la forma de contar | **Investigar papeles** (actas, circulares, registros) | Escena corta |
| **T1.6** Niveles de medición | Declarar el nivel de cada columna | **Clasificar con consecuencia**: el informe calcula lo que tú permites (y sale «1,4» si te equivocas) | Tarjetas por nivel |
| **T1.7** Gráficos | Elegir el gráfico y dónde empieza el eje | **Armar el gráfico** (huecos entre barras, inicio del eje) | Desenmascarar un gráfico ajeno |
| **T2.1** Frecuencias | Contar, relativizar, acumular; responder un umbral | **Armar la tabla** y decidir una capacidad con ella | Leer una tabla hecha |
| **T2.2** Intervalos | k, rango, amplitud por exceso, límites [ ), marca de clase | **Poner las paredes**: el histograma se redibuja con cada decisión y el dato máximo puede quedar afuera | Corregir una tabla mal agrupada |
| **T2.3** Histograma, polígono, ojiva | Leer la forma, superponer dos grupos, leer mediana o percentil en la ojiva | **Leer para decidir**: un curso con dos jorobas; un corte que sale de la ojiva | Construir la ojiva |
| **T2.4** Pareto, sectores, pictograma | Ordenar, acumular, cortar; ángulos; pictograma honesto | **Priorizar con presupuesto** y ver después qué no se resolvió | Rehacer un gráfico engañoso |
| **T3.1 y 3.4** Centro y forma | Media, mediana, moda; decidir cuál informar leyendo la forma | **Elegir qué número informar** con consecuencia sobre el grupo | Comparar dos informes |
| **T3.2** Dispersión | s con n − 1 y CV | **Dos grupos, la misma media**: dónde va el único especialista | Elegir entre dos candidatos por su consistencia |
| **T3.3** Posición | Percentil, cuartiles, RIC, caja, atípicos | **Ubicar a una persona** respecto de su grupo (un corte de derivación) | Leer una caja |
| **T3.5** Limpieza | Detectar el valor imposible y el código mal usado | **Limpiar la matriz** antes de informar (sin juego propio si cabe como paso de 3.1) | Escena corta |
| **T4.1 y 4.2** Doble entrada, marginal, condicionada | Tabular pares; porcentaje por fila; «¿entre quiénes?» | **Cruzar y condicionar** para decidir dónde enfocar | Leer una tabla hecha |
| **T4.3** Nube de puntos | Mirar dirección, forma, fuerza y el punto suelto antes de calcular | **Primero se mira**: la nube trae una curva o un atípico que cambia todo | Clasificar nubes |
| **T4.4 y 4.5** Covarianza, r, R² | Calcular, leer el signo, R² como varianza compartida | **Cálculo con consecuencia**: una medida tomada como si r fuera causa, y nada se mueve | Informe corto |
| **T4.6** Regresión | b, a, ŷ, rango observado | **Predecir para planificar** (cuántos cupos) y ver fallar la extrapolación | Recta para completar |
| **T4.7** Excel | Usar el software sin creerle a ciegas | Sin juego: dossier y práctica con software (lo de «mirar la nube antes» ya está en 4.3) | Ninguna |
| **T5.1** Laplace | P(A) con un sorteo real; falacia del jugador | Sin juego propio: un sorteo dentro de otra escena | Escena corta |
| **T5.2** Condicionada e independencia | Elegir el denominador; comparar P(A|B) con P(A); no invertir | **¿Entre quiénes?** (la misma lógica que 4.2, otro caso) | Tabla para completar |
| **T5.3** Bayes | Frecuencias naturales, VPP, qué hacer con un positivo | **Campaña de tamizaje con capacidad limitada** | Árbol para llenar |
| **T6.1** Arquitectura del argumento | Ordenar el informe y elegir la evidencia que responde la pregunta | **Armar el informe** con piezas | Corregir un informe desordenado |
| **T6.2 y 6.3** Diagnóstico de una y dos variables | Estadístico y gráfico según el tipo; alcance; R² honesto | **Informe con repregunta**: cada número que pones atrae la pregunta que le corresponde | Elegir la diapositiva |
| **T6.4** Defensa | Mostrar lo justo, nombrar limitaciones, responder | **Audiencia** (como *Ace Attorney*: te repreguntan y presentas la prueba) | Guion de resultados |

---

### 4. Tres marcos para toda la materia

Los tres admiten las modalidades de la sección 3; cambia **quién eres, qué avanza y qué se siente**. Los
tres cubren los seis temas (sección 5). Ninguno usa personajes, lugares, dibujos ni frases de los juegos
que ya existen (`PIEZAS-COMUNES.md` §4): ni la agencia de créditos de Cliza y su escritorio de «La
ventanilla», ni la lechera de Punata del «Valle de los Proyectos». Tampoco el caso de la Universidad con
fichas PHQ-9 del Aula de Probabilidad (es de Inferencial).

#### Marco A · «El Observatorio» (recomendado)

**Gancho:** *Eres el analista nuevo del Observatorio de Bienestar de Wayra Pampa. La ciudad está cubierta
de niebla: sólo ves a la gente que mediste. Cada informe que firmas decide adónde van los psicólogos, y un
día llega el censo y te muestra a quién no viste.*

**Género:** estrategia con niebla de guerra y revelación (*fog of war*: gestionas recursos escasos sobre un
mapa que sólo conoces por partes). Referencia: la niebla de *Civilization* y la ciudad que sufre tus
decisiones de *Frostpunk*.

**Quién eres:** analista del Observatorio municipal (una oficina chica, sin jefe encima). Los pedidos llegan
de gente de la ciudad: una concejala, la directora de un colegio, el médico del centro de salud, el
dirigente de un mercado. Wayra Pampa es una ciudad ficticia del altiplano o de los valles (nombre
provisional).

**El hub:** el mapa de la ciudad, en pixel art visto desde arriba, con barrios, colegios, el mercado, el
centro de salud y las afueras sin línea de teléfono. Cada persona es una figurita. Lo que no mediste está
bajo nubes. Tu recurso son **horas de psicólogo** (brigadas, talleres, evaluaciones) que se ponen sobre el
mapa. La progresión es la ciudad que vas conociendo y la gente que tu trabajo alcanzó, no puntos.

**Bucle central:** llega un pedido → decides cómo medir con lo que tienes (qué muestra, qué fuente) → las
nubes se abren sobre lo que mediste y llegan las planillas → escribes los números con la herramienta del
tema → firmas una frase y pones el recurso en el mapa → **«meses después» llega el censo** (o la brigada
visita casa por casa) y el mapa se destapa: ves quién necesitaba ayuda y no le llegó. El censo es del
mundo real (D1 §1.1: el censo del INE es la herramienta más antigua): en el juego, a diferencia de la vida,
el parámetro se llega a ver, y por eso sabes cuánto te equivocaste.

**Cómo cambia de un tema a otro:** siempre vuelves al mapa; cambia qué te piden y qué herramienta necesitas.
T1 mide; T2 ordena la pila; T3 compara barrios; T4 cruza dos cosas; T5 organiza un tamizaje; T6 arma el
informe. La niebla que levantaste en un tema queda levantada (el mapa recuerda dónde miraste y dónde
nunca), pero los números de cada tema arrancan de su punto de control.

**Dos minutos jugados** (Tema 1; los números cambian con la versión de cada alumno):

> El mapa de Wayra Pampa está casi todo bajo nubes; se ven los techos del mercado y la plaza. La concejala
> Marisol deja un fólder en tu mesa: «Tengo para talleres de sueño en tres colegios. ¿Dónde hacen falta?».
> Alcanza para sesenta encuestas. Hay tres maneras: llamar a los teléfonos del padrón, pararte en la puerta
> del colegio central a las once, o sortear nombres de las listas; pero sólo cuatro de los ocho colegios
> mandaron su lista. Sorteas en los cuatro y completas en la puerta del central. Las nubes se abren sobre
> las casas de quienes contestaron: sesenta figuritas, cada una con su planilla.
>
> Las planillas traen cuatro columnas: horas de sueño, turno, colegio y «¿cuánto sueño tienes en clase?»
> del 1 al 5. Antes de calcular, el Observatorio te pide qué es cada columna. Marcas «colegio» como
> cantidad y el resumen sale con «colegio promedio: 3,4». Lo corriges.
>
> Cuentas: 21 de 60 duermen menos de seis horas. Escribes 0,35. La radio quiere una frase. Escribes «un
> tercio de los estudiantes de Wayra Pampa duerme mal», firmas y pones los talleres en tres colegios.
>
> Meses después llega el censo escolar y la niebla se levanta de toda la ciudad. En los cuatro colegios sin
> lista, los del turno tarde, que trabajan de mañana, están casi todos en rojo: ahí era la mitad. Tu frase
> sonó en la radio toda la semana, y dos de tus talleres fueron a colegios que casi no los necesitaban. El
> mapa guarda las nubes de los colegios que nunca miraste.

**Cómo aparece cada tema esencial** (lo aprende porque sin eso no acierta dónde poner la ayuda):

- **T1:** la encuesta de sueño de arriba (muestra, sesgo, niveles, la frase); un colegio donde las
  denuncias de acoso bajaron a cero (papeles: la circular del director); el gráfico que la concejala quiere
  mostrar con el eje en 68; y un programa para «los diez peores» con o sin lista de espera, que mejoran
  igual (regresión a la media).
- **T2:** el centro de salud manda la pila de registros (ataques, tiempos de espera): tabla, umbral para
  decidir camas, intervalos con Sturges, ojiva para el corte, Pareto de motivos de consulta con un
  presupuesto que no alcanza para todos, y «meses después» el 80 % que no se resolvió.
- **T3:** dos barrios con la misma media y distinta dispersión, y un solo especialista; un grupo donde un
  caso extremo arrastra la media; el percentil de un niño para decidir si se deriva; la planilla con una
  edad de 200.
- **T4:** el mercado (turno de trabajo × estrés): porcentaje por fila para decidir dónde enfocar; horas de
  pantalla × sueño: la nube, r, R²; la propuesta de ordenanza que trata r como causa, y nada cambia; la
  recta para prever cupos y el barrio fuera del rango donde falla.
- **T5:** la campaña de tamizaje de lectura en las escuelas con una sola evaluadora: cuántos positivos, cuántos
  de verdad, qué se les dice a las familias.
- **T6:** el informe para la red de salud: qué va primero, qué estadístico y qué gráfico para cada variable,
  cómo se dice R², qué limitación se nombra antes de que la pregunten.

**Qué se adapta o se inventa:** la ciudad, sus barrios y su gente; el recurso (horas de psicólogo); el
censo que revela (el dossier sólo dice que el parámetro no se conoce); los números por versión; los
contextos del dossier (colegio, clínica, fábrica, comunidad) se reparten por barrios.

**Costo con lo que hay** (una persona con Claude, Next.js con Supabase, pixel art con código), según
`PIEZAS-COMUNES.md`:

- **Se reutiliza del motor:** partidas (`partida.ts`: `partidaNuevaDe`, `anotarEn`, `leerPartidaDe`,
  `guardarPartidaDe`), nube (`nube.ts`, las funciones `…De`), versión por alumno (`versionDeAlumno` con
  semilla propia `"<isla>:<tema>"`), sorteo con semilla (`azarConSemilla`), escalera de ayuda
  (`escalera.ts`), sección Jugar y candados (`content/islas.ts`, `src/lib/juegos.ts`), app de Android
  (`nativo.ts`), revisión de textos (`problemasDeTexto`), formato (`pct`, `tex`); y los patrones probados:
  versiones con `versionValida`, diagnóstico por error típico, prueba del alumno perezoso, partida
  reconstruida desde sus eventos, práctica sin nota y después con nota, guion aparte.
- **Hay que despegar antes:** la página del docente y `resumen.ts` (sólo leen la planta); `useCuenta` y
  `BarraCuenta` (viven en la carpeta de Proyectos II: pasarlas a `src/components/juego/`); `VERSION_MAXIMA`
  (a `partida.ts`); y `juegoDeMateria` (una isla por materia: para un juego por carrera hace falta el dato
  de carrera en la isla, sumando, sin tocar los juegos que existen).
- **Es nuevo, y se hace como motor** porque lo aprovechan el juego de Empresariales, Inferencial y las
  láminas de la materia: (1) **`src/lib/estadistica/`** con pruebas: frecuencias, Sturges, centro,
  dispersión con n − 1, percentiles con (n + 1), RIC y atípicos, covarianza, r, R², regresión,
  condicionadas y Bayes con frecuencias naturales (hoy `PIEZAS-COMUNES.md` §5 no tiene estadística con
  pruebas: las fórmulas del Aula se pueden tomar, su dataset no); (2) **una población con semilla y sus
  formas de muestrear** (al azar, por teléfono, en una puerta, con no respuesta), que sabe su propio
  parámetro; (3) **gráficos dibujados desde datos** (histograma, polígono, ojiva, caja, nube, Pareto,
  sectores) que reciben los datos y la paleta de cada juego.
- **Es nuevo y es contenido de este juego:** el mapa de Wayra Pampa con su niebla, la gente, los pedidos y
  el guion. Es la parte cara del arte: un mapa por barrios en mosaico, que se mueve con el dedo, sin nada
  que dependa del mouse.
- **Versión mínima jugable:** la llegada (escena corta) y **el Tema 1** entero, que es el primero que se
  dicta y el que monta el mapa, la niebla y el censo que todos los demás usan.

**En qué se distingue de lo que ya existe:** no hay escritorio, ventanilla, cola de clientes ni pared de
fichas (eso es de «La ventanilla»); no hay planta ni cadena de máquinas (eso es del «Valle»). Es un mapa
con niebla visto desde arriba, la ciudad entera es el personaje, y el momento fuerte es la revelación del
censo. La lógica «muestrear y que el censo revele» podría volver en Empresariales sólo si es lo que mejor
enseña allá y vestida con otro mundo; el mapa, la ciudad y su gente no.

**Riesgo principal:** que el mapa sea decorado y el juego se reduzca a llenar tablas. Remedio: toda
decisión se toma **sobre el mapa** (dónde medir, dónde poner la ayuda) y toda consecuencia se ve **en el
mapa** (la revelación); las tablas son la herramienta, no el juego.

---

#### Marco B · «La psicóloga del colegio»

**Gancho:** *Eres la psicóloga nueva de la Unidad Educativa Kantuta. Conoces a los chicos por su nombre, y
cada número de tus planillas es uno de ellos: si lo lees mal, el que paga es alguien que saludas en el
patio.*

**Género:** simulación de vida y gestión escolar con relaciones (*life sim*: el día a día de un lugar, con
personas que recuerdan lo que hiciste). Referencia: *Stardew Valley* (la gente del pueblo cambia contigo) y
*Two Point Campus* (gestionar una institución).

**Quién eres:** la única psicóloga de un colegio grande de El Alto (ficticio). Te piden cosas el director,
los profesores, las familias y la junta escolar.

**El hub:** tu gabinete, con una ventana al patio por donde pasan los chicos; el archivo de planillas; el
tablero de la sala de profesores. Cada chico tiene su cara (técnica de caras que salen del nombre, con
dibujos propios de este juego).

**Bucle central:** alguien te trae un problema del colegio → juntas o revisas los datos → escribes los
números → decides (a quién derivas, qué le dices al director, qué curso recibe el taller) → al final del
trimestre ves qué les pasó a los chicos con nombre.

**Cómo cambia de un tema a otro:** siempre el colegio; cambia la pregunta. T1: las denuncias de acoso que
bajaron a cero y la encuesta que hiciste sólo en el turno mañana. T2: las notas de un curso con dos jorobas.
T3: el GAD-7 de un grupo con un caso extremo; el percentil de un chico para la derivación. T4: estrés ×
rendimiento. T5: el tamizaje de lectura. T6: la junta de padres donde defiendes tu informe anual.

**Dos minutos jugados** (Tema 5):

> La profesora de segundo te deja la lista del tamizaje de lectura: 84 chicos marcados en positivo, de 600.
> El director quiere mandar hoy una carta a las familias: «posible dislexia». Tienes una sola fonoaudióloga,
> que puede evaluar a fondo a 40 por trimestre.
>
> En tu gabinete, el manual del test: detecta a 9 de cada 10 chicos con dislexia y marca por error a 1 de
> cada 10 sin ella. El informe del distrito: 5 de cada 100. Armas el árbol con los 600: 30 con dislexia, 27
> dan positivo; 570 sin dislexia, 57 dan positivo por error. Escribes: de los 84 marcados, 27 la tienen.
>
> Si firmas la carta, 84 familias leen «dislexia». Al trimestre, Mateo, que lee bien, sigue con la etiqueta
> en su legajo y ya no quiere leer en voz alta. Si en cambio escribes 27 y mandas a evaluación primero a
> los que tienen más señales, la fonoaudióloga confirma casos y el director te pide el mismo método para
> matemáticas.

**Cómo aparece cada tema esencial:** los seis, siempre dentro del colegio, con las modalidades de la
sección 3 (el mapa de A se cambia por el patio y los legajos). La regresión a la media se ve con los diez
chicos «peores» del bimestre, que mejoran igual sin taller.

**Qué se adapta:** el colegio y su gente; los casos del dossier (acoso, dislexia, GAD-7, estrés y
rendimiento) calzan casi sin cambio, con números por versión. Los de fábrica y comunidad (D5 §5.2, D1)
pasan a la escuela (turno mañana y tarde de alumnos que trabajan).

**Costo:**

- **Se reutiliza del motor:** lo mismo que A.
- **Hay que despegar:** lo mismo que A.
- **Nuevo como motor:** lo mismo que A, menos la población con muestreo por mapa (la muestra es un curso o
  un turno; se usa igual la población con semilla).
- **Nuevo y contenido de este juego:** el colegio, el patio, el gabinete y **muchos personajes con nombre y
  cara**; es el marco con más texto y más caras que dibujar.
- **Versión mínima jugable:** la llegada al colegio y el Tema 1.

**En qué se distingue:** escala de personas, no de ciudad ni de empresa; nadie pide un crédito ni monta una
planta. El riesgo de parecido está en la oficina: el gabinete no puede ser un escritorio con cola de gente
que se sienta (eso es «La ventanilla»); los chicos se ven en el patio y en sus legajos.

**Riesgo principal:** la escala. Algunos temas piden grupos grandes (Sturges con 50 datos, una prevalencia
del 5 %), y un solo colegio alcanza justo. Y es el marco más caro en texto y caras.

---

#### Marco C · «Verificado»

**Gancho:** *Trabajas en la mesa de verificación de un diario digital. Todos los días circulan números
sobre la salud mental de la ciudad, algunos ciertos y otros no. Si desmientes algo verdadero pierdes
lectores; si dejas pasar algo falso, la ciudad decide con eso.*

**Género:** juego de edición y verificación con consecuencias (lo que publicas cambia la ciudad).
Referencia: *Headliner: NoviNews* (eliges qué noticias publicar y el pueblo cambia).

**Quién eres:** verificador junior de «Dato Claro» (nombre provisional). Te llegan publicaciones que se
volvieron virales, cada una con su fuente de datos.

**El hub:** el muro de publicaciones virales y tu mesa de trabajo, donde **rehaces** con los datos de la
fuente la tabla, el gráfico o el número que la publicación muestra. Tu recurso es la confianza de los
lectores y lo que la ciudad decide con lo que publicas.

**Bucle central:** eliges qué publicación verificar → rehaces el cálculo o el gráfico con los datos crudos
→ escribes el número correcto → publicas el veredicto y tu propio titular → ves la reacción (la medida
que se tomó, los lectores que se fueron o llegaron).

**Cómo cambia de un tema a otro:** T1: «el acoso escolar desapareció» y el gráfico con el eje truncado. T2:
el pictograma que «duplicó las atenciones» y el Pareto «atacando dos causas resolvemos el 80 %». T3: «el
estudiante promedio tiene ansiedad moderada». T4: «estudiar más causa mejores notas» y «el test nuevo es
válido porque correlaciona 0,85». T5: «un test que acierta el 90 %». T6: una entrevista en vivo donde
defiendes tu verificación.

**Dos minutos jugados** (Tema 2):

> En el muro, una publicación del municipio con 3.000 compartidos: dos personitas, una chica y otra enorme.
> «Duplicamos las atenciones en salud mental». En la fuente, el registro de atenciones: 20 el año pasado,
> 40 éste. Es cierto que se duplicaron. Rehaces el pictograma con personitas del mismo tamaño: dos y
> cuatro. La de la publicación ocupa cuatro veces más que la otra. Escribes «el doble, no cuatro veces»,
> marcas «engañoso» y tu titular: «Las atenciones se duplicaron; el dibujo exagera».
>
> La siguiente dice que dos causas explican el 80 % de la deserción. En la fuente están las cinco causas.
> Las ordenas, acumulas y el 80 % cae en la segunda barra: es verdad. Si marcas «falso» por reflejo, el
> diario publica una corrección al día siguiente y pierdes lectores.

**Cómo aparece cada tema esencial:** cada «Qué NO se puede afirmar» del dossier es una publicación viral
que alguien afirmó. El alumno aprende las herramientas porque sin ellas no puede rehacer el número.

**Qué se adapta:** el diario, la ciudad, las publicaciones y sus autores; los errores típicos del dossier
se vuelven afirmaciones públicas.

**Costo:**

- **Se reutiliza y se despega:** lo mismo que A.
- **Nuevo como motor:** la estadística y los gráficos de A; además, gráficos «trucados» (eje truncado,
  pictograma escalado, torta con demasiados sectores) generados desde los mismos datos.
- **Nuevo y contenido de este juego:** el muro, la redacción, los autores de las publicaciones y el guion.
  Poco arte.
- **Versión mínima jugable:** la llegada a la redacción y el Tema 1.

**En qué se distingue:** redacción y ciudad, no banco ni planta. Pero **su lógica es la más cercana a «La
ventanilla»**: llega algo, lo revisas y dictaminas (sí o no). Habría que vestirlo muy distinto y cuidar que
el alumno siempre **rehaga** el número, no sólo dictamine.

**Riesgo principal:** que se vuelva «encuentra el error», el cuestionario con otra ropa que Ronald
descartó. Y la decisión (veredicto) pesa poco frente a lo que en la vida real decide un psicólogo.

---

### 5. Mapa de cobertura

Dónde se aprende cada tema esencial en cada marco. Ninguno queda afuera.

| Tema esencial | A · El Observatorio | B · La psicóloga del colegio | C · Verificado |
|---|---|---|---|
| T1.3 y 1.5 Muestra, sesgos, la frase | La encuesta de sueño y el censo | La encuesta sólo del turno mañana | «Un tercio de los jóvenes duerme mal» |
| T1.1 y 1.4 Control, regresión a la media | Los diez peores con o sin lista de espera | Los diez chicos peores del bimestre | «El programa redujo la ansiedad a la mitad» |
| T1.2 y 1.8 Indicador y fenómeno | Las denuncias que bajaron a cero | La misma, en su colegio | «El acoso escolar desapareció» |
| T1.6 Niveles de medición | Las columnas de la planilla | El legajo escolar | La tabla de la fuente |
| T1.7 Gráficos y eje | El gráfico de la concejala | El gráfico para el director | El gráfico viral |
| T2.1 Frecuencias | Registro del centro de salud y camas | Faltas por curso | Rehacer la tabla |
| T2.2 Intervalos | Tiempos de espera | Notas del curso | Rehacer el histograma |
| T2.3 Formas y ojiva | Corte para derivar | El curso con dos jorobas | «La mayoría aprobó» |
| T2.4 Pareto, sectores, pictograma | Motivos de consulta con presupuesto | Motivos de derivación | El pictograma y el Pareto viral |
| T3.1 y 3.4 Centro y forma | El grupo con un caso extremo | El GAD-7 de un grupo | «El promedio tiene ansiedad moderada» |
| T3.2 Dispersión | Dos barrios, un especialista | Dos cursos, un taller | «Los dos barrios están igual» |
| T3.3 Posición | El percentil de un niño | El percentil de un chico | «Está en el percentil 85: sacó 85 %» |
| T3.5 Limpieza | La edad de 200 | La planilla del profesor | La fuente con un error de tipeo |
| T4.1 y 4.2 Cruces y condicionadas | Turno × estrés en el mercado | Turno × rendimiento | «La mayoría de los estresados…» |
| T4.3 a 4.5 Nube, r, R² | Pantalla × sueño; la ordenanza | Pantalla × sueño en el colegio | «Estudiar causa mejores notas» |
| T4.6 Regresión | Cupos previstos y el barrio fuera de rango | Cupos del próximo año | «Con 16 años de estudio ganarás…» |
| T5.1 y 5.2 Probabilidad y condicionada | El sorteo y el turno | El sorteo y el turno | «Si eres del turno noche…» |
| T5.3 Bayes | Tamizaje de lectura en escuelas | Tamizaje de lectura del colegio | «Un test que acierta el 90 %» |
| T6.1 a 6.3 Informe | Informe para la red de salud | Informe anual al director | Nota de verificación |
| T6.4 Defensa | Audiencia pública | Junta de padres | Entrevista en vivo |

---

### 6. Dos comprobaciones antes de entregar

#### 6.1 Ninguna estrategia gana sin entender

Jugué cada decisión como un alumno perezoso. Lo que se agrega para que no gane va anotado; el bucle y el
aprendizaje lo detallan después, con sus pruebas en 500 versiones.

**Marco A:**

- **Siempre la opción «buena» (sortear).** No siempre existe: en cada versión faltan listas en colegios o
  barrios distintos y hay que elegir entre opciones que sesgan. Lo que se califica no es la opción: es el
  estadístico escrito, **quién faltó y si eso sube o baja el resultado**, y dónde pone la ayuda.
- **Repartir parejo.** El recurso no alcanza para todos y la necesidad está concentrada (como D5 §5.2: un
  programa parejo gasta la mitad donde el problema es menor). Parejo deja gente sin atender en el censo.
- **Siempre la media, o siempre la mediana.** En la mitad de las versiones el grupo es simétrico (media con
  su dispersión es lo que corresponde, D3 tabla de decisión) y en la otra mitad hay cola o un atípico. Ninguna
  regla fija acierta.
- **Derivar a todos los positivos.** La capacidad de evaluación es menor que los positivos en las versiones
  de prevalencia baja; sin el VPP no se sabe cuántos evaluar ni qué decir a las familias.
- **Al azar o copiar al compañero.** Cada versión cambia la ciudad (qué barrio tiene la necesidad, qué grupo
  queda afuera, el atípico, la prevalencia): la respuesta del compañero es la de otra ciudad.
- **Firmar siempre la frase prudente** («de los 60 encuestados…»). Es correcta, pero no decide nada: la
  concejala igual necesita saber dónde; hay que pasar de la frase a la decisión sabiendo qué no se puede
  afirmar.
- **Escribir cualquier número para avanzar.** No se avanza sin hacerlo bien (escalera de ayuda), y el
  escalón «otros números» en este mundo es **otro pedido, en otro barrio**.

**Marco B:** las mismas trampas y los mismos remedios, en un colegio. El más débil: con un solo colegio hay
menos lugares donde esconder la necesidad, y repartir parejo se castiga menos. Remedio: el taller sólo
alcanza para un curso.

**Marco C:** el perezoso marca siempre «engañoso». Remedio: la mitad de las publicaciones son ciertas y
desmentir una verdadera cuesta lectores; y el veredicto no alcanza: siempre hay que escribir el número
rehecho. Aun así es el marco donde más se parece a un «encuentra el error».

#### 6.2 La maqueta aguanta el orden real en que Ronald dicta

**El orden no está confirmado.** La ficha de la materia (§3) y el calendario del curso EAD-111 (que usa este
material) ponen: T1 → T2 y T3 → dispersión → probabilidad (T5) → correlación y regresión → comunicación de
resultados → caso integrador. Como la ficha nombra los temas distinto que los dossiers (§1.4, punto 1), leo
ese orden así, y lo tomo como **supuesto**: **T1 → T2 → T3 → T4 (tablas y condicionadas) → T5 → T4
(nube, r, regresión) → T6 → cierre integrador**. Es decir, el Tema 4 puede partirse en dos y el Tema 5 puede
ir antes que la segunda mitad del 4.

Comprobado que ningún tema da por hecho algo que se dicta después:

- **T1** no usa nada. **T2** usa el nivel de medición de T1 (qué gráfico va), que siempre se dicta antes.
- **T3** usa la tabla agrupada de T2 (media con marca de clase); T2 y T3 van juntos y T2 primero.
- **T4** usa la desviación de T3; T3 siempre va antes. Se arma en **dos piezas que Ronald habilita por
  separado**: T4a (tablas, marginales, condicionadas) y T4b (nube, covarianza, r, regresión).
- **T5** trae su propia tabla y su propia pregunta «¿entre quiénes?» (así la trae D5 §5.2), así que no
  necesita T4a ni T4b. Si se dicta antes o después, funciona igual.
- **T6** usa T3 y T4b (describir una y dos variables); va al final en cualquier orden.
- **Inicio y fin son piezas propias:** la **Llegada** (Ronald la habilita al principio) y **la Audiencia**
  (la habilita al último, junto con el caso integrador de su calendario); no son partes de un tema.
- Cada tema arranca de su **punto de control**: los datos del pedido traen los números correctos de la
  versión del alumno, no lo que escribió antes. La historia sí recuerda (el mapa guarda dónde miró).

---

### 7. Maqueta general (del marco recomendado, A)

Sólo la maqueta. Las fichas por subtema, con su «¿hace falta un juego?», vienen cuando Ronald la apruebe.
Si elige B o C, esta maqueta conserva el orden y lo que cada pieza usa; cambia el vestuario.

#### 7.1 Inicio y fin

**Inicio · La llegada:** tu primer día en el Observatorio de Wayra Pampa. El mapa entero está bajo nubes
salvo la plaza. Un cartel en la pared: la última vez que hubo censo. Sin números todavía: dónde estás, qué
es el Observatorio y qué es tu recurso.

**Fin · La audiencia:** el Concejo convoca una audiencia pública sobre el informe anual del Observatorio.
Presentas lo que la ciudad necesita con evidencia de todos los temas (una variable, un cruce, el tamizaje)
y te repreguntan justo por lo que la evidencia no sostiene. Lo que escribiste queda en el registro para
**la defensa oral en clase**, que es el jefe final. Individual: nadie defiende con un compañero.

#### 7.2 Las piezas y el orden en que Ronald las habilita

| Pieza | Qué pasa en el juego | Qué usa de antes (sólo si hace falta) | Qué deja |
|---|---|---|---|
| **Llegada** | El Observatorio, el mapa con niebla, el recurso | Nada | Dónde estás, antes del primer número |
| **1 · Medir** | La encuesta de sueño y el censo; las denuncias que bajaron a cero; el gráfico de la concejala; los diez peores | Nada | El mapa con sus primeras zonas vistas; la tabla de niveles en tu libreta |
| **2 · Ordenar la pila** | Registros del centro de salud: tabla, umbral, intervalos, ojiva, Pareto con presupuesto | El nivel de medición (T1) | Tablas y formas que T3 nombra |
| **3 · Una variable** | Dos barrios y un especialista; el caso extremo; el percentil de un niño; la planilla con la edad de 200 | La tabla agrupada (T2) | El «diagnóstico» de una variable |
| **4a · Cruzar** | El mercado: turno × estrés, marginales y condicionadas | Nada obligatorio (trae su tabla) | La pregunta «¿entre quiénes?» |
| **5 · El tamizaje** | Laplace en un sorteo; condicionada; la campaña de lectura con una sola evaluadora | Nada obligatorio (trae su tabla) | La tasa base |
| **4b · Relación y predicción** | Pantalla × sueño: nube, r, R²; la ordenanza; los cupos y el barrio fuera de rango | La desviación (T3) | El cruce para el informe |
| **6 · El informe** | El informe para la red de salud, con repreguntas | T3 y T4b | El registro del informe |
| **Audiencia** | El informe anual ante el Concejo | Todo, como evidencia | El registro completo para la defensa oral |

El orden de la tabla es el supuesto de §6.2; si Ronald dicta T4 entero antes que T5 (el orden del
dossier), las piezas son las mismas y se habilitan en otro orden.

#### 7.3 El hilo

**La ciudad y su niebla.** Los barrios vuelven con preguntas distintas (el colegio del turno tarde, el
mercado, las afueras sin teléfono) y el mapa recuerda lo que viste. Nada más se encadena a la fuerza: los
números de cada pieza son propios de su punto de control.

**Casos de contraste:** el dossier no trabaja un mismo tema en variantes de tipo (como los cinco tipos de
proyecto de Proyectos II); sí muestra la estadística en varios campos de la psicología (D1 §1.2:
psicometría, experimental, social; y los ejemplos clínicos, escolares, laborales y comunitarios). En el
juego esos campos son barrios y pedidos distintos, sin inventar un sistema de variantes por obligación.

#### 7.4 Cómo crece sin romper

- **Isla propia** para el juego de Psicología (nombre y datos al construir), al lado de «La ventanilla» y
  del «Valle»; sus partidas no tocan las de ellos.
- **Un tema, una pieza:** cada pieza es su archivo de datos y funciones con pruebas; sumar un pedido o un
  barrio es sumar un archivo.
- **Lo común no depende de este juego:** `src/lib/estadistica/`, la población con semilla y los gráficos
  reciben la isla y la escena como dato y se anotan en `PIEZAS-COMUNES.md` al construirlos.
- **El juego de Empresariales** es otra isla, otro mundo, otro documento; usa el mismo motor.

---

### 8. Recomendación ya decidida y la única pregunta

**Recomiendo el marco A, «El Observatorio»**, por tres razones que salen del dossier:

1. **Es la forma de la materia.** Toda la materia gira sobre una frontera: lo que viste (la muestra) y lo
   que no (la población). La niebla es esa frontera hecha pantalla, y el censo convierte en consecuencia
   el «Qué NO se puede afirmar» que cierra cada subtema, sin explicar nada.
2. **Tiene inicio y fin de verdad.** Empieza con la ciudad a ciegas y termina en una audiencia, que es
   exactamente donde termina el dossier (D6 §6.4) y donde Ronald pone el jefe final.
3. **Es el más distinto de lo que existe** y el que más motor nuevo deja para las materias que vienen
   (estadística con pruebas, población con semilla, gráficos desde datos).

**De los otros tomaría:** de B, **caras y nombres** en el mapa: al acercarte a un barrio ves a personas
concretas (el niño del percentil, el chico etiquetado), para que el número tenga cara. De C, **la frase que
firmas se escucha en la radio**: lo que prometes de más vuelve como titular.

**Decidido** (sale del dossier o de `IDEA-JUEGO.md`): mandan los dossiers sobre la ficha en los nombres de
los temas; r con la fórmula de D6 §6.3 o el mismo denominador arriba y abajo; Sturges al entero más
cercano; R² como varianza compartida; asimetría por media contra mediana; T4 en dos piezas y T5 sin
depender de T4; ningún caso de práctica o de evaluación de la materia entra al juego; el alumno escribe cada
número y la pista sale de su error; la versión mínima es la llegada y el Tema 1.

**La única pregunta, de gusto:** ¿te convence que el alumno sea **el analista del Observatorio de la
ciudad** (A), o te llama más **la psicóloga del colegio** (B) o **el verificador de la redacción** (C)?
También vale «A con algo de B».

**Queda abierto para después de elegir** (no se pregunta ahora): en qué materia del sitio aparece el juego
(la página de «Psicoestadística Descriptiva» o la de «Estadística y Análisis de Datos en Psicología», el
curso que usa este material); se decide al construir, con la sección Jugar por carrera.

### Lo que dijo Ronald

- 28-09: «ok» para empezar la ronda 1 con Psicoestadística Descriptiva (Psicología), de cero.

---

## Dossiers usados

Leídos directo de la carpeta de materias de Ronald el 28-09-2026 (no se suben al repositorio). Ruta
relativa a esa carpeta, fecha del archivo y huella (`scripts/huella-dossier.mjs`). Las dos últimas filas
no son dossiers: son la ficha y la guía de las que sale el orden de dictado (§6.2), y se anotan para saber
si ese orden cambia.

| Dossier (relativo a la carpeta de materias) | Fecha del archivo | Huella |
|---|---|---|
| `Psicoestadística Descriptiva/1_CONTENIDO/Tema 1/Tema 1- Latex.tex` | 2026-09-05 | `543dcf627601` |
| `Psicoestadística Descriptiva/1_CONTENIDO/Tema 2/Tema 2 - Latex.tex` | 2026-09-05 | `dc9d5ad5485c` |
| `Psicoestadística Descriptiva/1_CONTENIDO/Tema 3/Tema 3 - latex.tex` | 2026-09-05 | `66ddb8efa775` |
| `Psicoestadística Descriptiva/1_CONTENIDO/Tema 4/Tema 4 - latex.tex` | 2026-09-05 | `b05ab3465d42` |
| `Psicoestadística Descriptiva/1_CONTENIDO/Tema 5/Tema 5 - Latex.tex` | 2026-09-05 | `3ad8f61484ef` |
| `Psicoestadística Descriptiva/1_CONTENIDO/Tema 6/Tema 6 - Latex.tex` | 2026-09-05 | `81aeb1a3a882` |
| `Psicoestadística Descriptiva/FICHA_MATERIA.md` | 2026-09-23 | `160d81193cae` |
| `Psicoestadística Descriptiva/0_DISENO/QUE SUBIR A MOODLE.md` | 2026-09-23 | `a283cad1f57c` |
