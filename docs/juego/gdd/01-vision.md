# 01 · Visión: qué tipo de juego estamos armando

**Versión 1 · 26-09-2026** · Agente: `director-de-juego` · Estado: **propuesta para Ronald** (nada de
esto está decidido salvo lo que se marca como "ya decidido").

## Decisiones pendientes de Ronald

1. **El género** (sección 2). Recomendado: **juego de casos de consultoría** (la estructura de
   *Ace Attorney*) con **una capa ligera de gestión** (la caja del cliente y tu reputación, como en
   *Papers, Please*). Alternativas: simulador de gestión puro, o novela visual con cálculos.
2. **¿Las escenas se conectan?** Recomendado: sí, pero sólo con dos números que pasan de un caso al
   siguiente (la caja del cliente y tu reputación). Alternativa barata: cada caso empieza de cero.
3. **¿Qué gana el consultor al avanzar?** Recomendado: reputación en el valle (clientes nuevos que
   llegan porque alguien te recomendó). Alternativa: nada fuera de la nota.
4. **Cuánto de la nota sale del juego y cuánto de la defensa oral.** Propuesta a discutir: el caso
   registra cómo razonó, la defensa pone la nota. El reparto lo decides tú (se trabaja en `04-aprendizaje.md`).
5. **El uso en clase proyectado:** ¿el caso se juega en clase entre todos (tú al mando del proyector)
   o sólo en casa? Cambia cuánto texto entra por pantalla.

**Ya decidido** (IDEA-JUEGO §5 y bitácora §0): cuentas con Supabase; versión de datos por alumno;
arte hecho con código hasta probar con un curso; primera isla Proyectos II; la defensa oral es el
jefe final; nivel 1 (escenas) primero.

---

## 0. Palabras de oficio que se usan en este documento

Cada término se explica una vez aquí; las demás partes del GDD los usan igual.

| Término | Qué quiere decir |
|---|---|
| **Género** | La familia de juegos a la que pertenece: define qué hace el jugador la mayor parte del tiempo. |
| **Core loop** (bucle central) | La secuencia de acciones que el jugador repite una y otra vez. En tu juego: llegar, mirar, calcular, decidir, ver qué pasó. |
| **Meta loop** (bucle de fondo) | Lo que cambia entre una vuelta y otra del bucle central y le da motivo para seguir: la reputación, la caja, los clientes nuevos. |
| **Pilar de diseño** | Una regla corta con la que se acepta o se rechaza cualquier idea nueva. |
| **Anti-pilar** | Lo que el juego decide no ser, aunque sea tentador. |
| **Beat chart** (tabla de momentos) | El recorrido de la materia en orden, un renglón por momento: tema, lugar, personaje, qué calcula, qué decide, qué minijuego, qué cambia. Es lo que pediste ("tu materia empieza así, con el tema tal…"). Va en `03-progresion-proyectos.md`. |
| **Onboarding** (llegada) | Cómo se le presenta al jugador el mundo antes de pedirle nada. Es exactamente lo que faltó en la escena 1. |
| **Feedback** (respuesta) | Lo que el juego le muestra al jugador después de actuar: la pista por error, la cinta que va más rápido. |
| **Estado de falla** | Qué pasa cuando el jugador se equivoca. En un juego educativo, equivocarse tiene que costar algo pero no expulsarlo. |
| **Jefe final** | El desafío que cierra una etapa y comprueba todo lo aprendido. Aquí es tu defensa oral. |
| **Minijuego** | Una actividad corta con reglas propias dentro del juego (por ejemplo, ordenar las máquinas de la planta en la línea). |
| **Vertical slice** (rebanada completa) | Una parte chica del juego terminada de punta a punta con la calidad final, para probar si funciona antes de hacer el resto. La escena 1 lo es. |
| **Scope** (alcance) | Cuánto se va a construir. El enemigo número uno de un proyecto de una persona. |

---

## 1. Frase de visión

> **Eres el consultor joven al que los emprendedores del valle llaman cuando no saben si invertir:
> recorres su empresa, calculas con sus números reales, les dices qué hacer y después lo defiendes
> frente al docente.**

Quién: el alumno de Proyectos II. Qué hace: diagnostica, calcula y aconseja un caso por semana.
Por qué importa: porque el cálculo decide qué le pasa a un cliente que el alumno ya conoce, y porque
al final tiene que sostener su consejo en voz alta.

---

## 2. Género y referencias

### 2.1 Cuatro géneros posibles, comparados

| | **A. Simulador de gestión / tycoon con historia** | **B. Novela visual con cálculos** | **C. Juego de casos de consultoría** (recomendado, con algo de A) | **D. Roguelite de decisiones** |
|---|---|---|---|---|
| **Qué es** | Administras una empresa a lo largo del tiempo: compras, produces, vendes, reaccionas a eventos. Ej.: *Game Dev Tycoon*, *Good Pizza, Great Pizza*. | Se lee una historia con personajes y de vez en cuando se elige o se escribe algo. Ej.: las novelas visuales japonesas. | Cada caso es un cliente con un problema: investigas (miras la empresa, juntas los datos), calculas, aconsejas y defiendes. Ej.: *Ace Attorney*, *Papers, Please*. | Partidas cortas que se repiten con datos al azar; cada partida es distinta y se aprende de perder. Ej.: *Reigns*. |
| **Qué pide al alumno** | Muchas decisiones seguidas, mirar indicadores, reaccionar. | Leer, a veces elegir. | Mirar con atención, sacar los datos correctos, calcular a mano, decidir y **argumentar**. | Decidir rápido, muchas veces. |
| **Encaje con calcular y decidir** | Bueno para decidir; malo para calcular: el simulador calcula por el alumno y él sólo mueve perillas. | Débil: el cálculo queda como una interrupción del texto. Es el riesgo de "cuestionario animado". | **Muy bueno:** el caso es la unidad de la materia (una semana, un tema del dossier), el cálculo es la investigación y la defensa oral es literalmente el juicio final del género. | Bueno para practicar mucho; malo para la defensa (no hay un caso propio que sostener). |
| **Encaje con lo que dijiste** | Pixel art sí; "que no aparezca de la nada" cuesta, porque el tycoon empieza con la empresa ya en marcha. | Resuelve el contexto, pero es lo más parecido al cuestionario que rechazaste. | Resuelve tu crítica por diseño: **todo caso empieza con el encargo y la visita**, antes de la primera pregunta. | Las partidas al azar chocan con "los números salen del dossier". |
| **Costo de construirlo con lo que hay** | Alto: economía que se equilibra, muchas pantallas, eventos. Es el nivel 3 (sobre SIMPRO). | Bajo. | **Medio y ya empezado:** la escena 1 ya tiene esta forma; falta la llegada (onboarding) y el hilo entre casos. | Medio; hay que rehacer la escena 1. |

### 2.2 Recomendación

**Un juego de casos de consultoría (aventura de investigación por casos), con una capa ligera de
gestión.** En una frase de oficio: *case-based adventure* con *management layer*.

- **El esqueleto es el de los juegos de casos**: cada semana de la materia es un caso con un cliente;
  cada caso tiene la misma forma (encargo → visita e investigación → cálculo → decisión → consecuencia
  → defensa). Eso da el "recorrido" que pediste: tu materia empieza con un caso, sigue con otro, y
  cierra con el jefe final.
- **La gestión es ligera y sólo sirve para que el error duela**: dos números viajan entre casos (la
  caja del cliente y tu reputación). No hay que equilibrar una economía entera.
- **El simulador grande (SIMPRO) entra como herramienta dentro de los casos** cuando llegue VAN y TIR,
  no como el juego entero. El tycoon completo queda para el nivel 3, si todo funciona.

Esto ajusta, sin contradecir, lo que decía `IDEA-JUEGO.md` §2 ("simulador de gestión con historia"):
el mundo sigue reaccionando a tus decisiones, pero lo que el alumno hace la mayor parte del tiempo es
**resolver casos**, no administrar una empresa. Es más barato y encaja mejor con la defensa oral.

### 2.3 Juegos de referencia y qué tomar de cada uno

1. **Ace Attorney** (Capcom, desde 2001). Juego de abogado dividido en dos fases: en la
   **investigación** recorres lugares, hablas con la gente y juntas pruebas; en el **juicio** interrogas
   testigos y presentas la prueba que muestra la contradicción.
   **Qué tomamos:** la forma del caso en dos tiempos. La visita a la planta es la investigación (el
   alumno encuentra los datos en el mundo: la placa del pasteurizador, los tanques, el cuaderno de
   producción); el cálculo y la defensa son el juicio. Y la idea de "presentar la prueba": en la
   defensa, el alumno señala el número que sostiene su consejo.
2. **Papers, Please** (Lucas Pope, 2013). Eres inspector de frontera: revisas documentos contra un
   reglamento, cada día termina con el sueldo y tienes que pagar comida, calefacción y remedios de tu
   familia; si te equivocas llega una multa al día siguiente.
   **Qué tomamos:** que el trabajo sea mirar papeles con atención (fichas, facturas, cuadernos de la
   empresa), y que el error llegue **después** como consecuencia concreta, no como una cruz roja.
   También su tamaño: es un juego enorme hecho por una persona con pocas pantallas.
3. **Good Pizza, Great Pizza** (TapBlaze, 2014, celular). Atiendes clientes uno por uno, cada uno con
   su personalidad y su pedido; con lo que ganas mejoras el local, y cada capítulo trae clientes y un
   rival nuevo.
   **Qué tomamos:** clientes con cara y carácter que vuelven, capítulos cortos jugables en el celular,
   y un bucle de fondo sencillo (lo que haces bien hoy te abre algo mañana).

---

## 3. Cómo se siente la materia (el recorrido, a grandes rasgos)

Esto responde tu "tu materia empieza así…". El detalle renglón por renglón es el **beat chart** de
`03-progresion-proyectos.md`, que todavía no existe; aquí va sólo el esqueleto para que veas el género
funcionando. Lo que no sale del dossier va como `[DATO DEL DOSSIER]`.

1. **Llegada al valle (onboarding, 3 minutos).** Llegas en la flota a Punata. Tu mentora de la
   consultora te da la carpeta del primer cliente: quién es, qué vende, qué quiere. Nadie te pregunta
   nada todavía.
2. **Caso 1, Semana 1 · "La máquina que no alcanzaba" (Lácteos Valle Alto).**
   Tema: cadena de valor y tamaño. Personaje: Don Mario. **Investigación:** recorres la planta y
   anotas en tu libreta cada máquina (el minijuego posible: poner las máquinas en el orden en que pasa
   el yogur). **Cálculo:** capacidad y cuello de botella. **Decisión:** envasadora o tercer tanque.
   **Cálculo antes de firmar** y **recuperación**. **Consecuencia:** un mes después. **Defensa:** tu
   argumento escrito. (Todo esto ya existe salvo la llegada, la investigación y el minijuego.)
3. **Caso 2, Semana 2 · "La cámara de frío que se llenó".** Don Mario vuelve: si le aconsejaste bien,
   llega con más producción y un problema nuevo; si no, llega con menos caja y desconfiado. Números
   `[DATO DEL DOSSIER]` de la Semana 2.
4. **Casos 3 en adelante.** Clientes nuevos que llegan recomendados según tu reputación; entran el
   flujo de caja, el VAN y la TIR con el motor de SIMPRO, y los eventos (sequía, devaluación) que
   obligan a recalcular. Temas y números `[DATO DEL DOSSIER]` de cada semana.
5. **Jefe final · la defensa.** En clase, frente a ti, el alumno defiende su caso con su versión de
   los números. Tú tienes su registro en el panel del docente.

---

## 4. Pilares de diseño

Cada idea nueva se juzga con estas cinco reglas. Si no pasa una, no entra.

1. **Si no cambia una decisión, no va.** Cada cálculo termina en algo que el alumno decide con ese
   número. Un cálculo que no se usa es cuestionario.
2. **Primero se ve, después se calcula.** Nadie pregunta nada antes de que el alumno sepa dónde está,
   de qué es la empresa y de dónde salen los datos. Los datos se encuentran en el mundo, no en un
   enunciado.
3. **El alumno escribe el número; el mundo le responde.** Nunca se elige el resultado entre opciones.
   La respuesta a un error depende del error, y la consecuencia de una mala decisión se ve en el
   cliente, no en un puntaje.
4. **Cada caso es del dossier y es sólo tuyo.** Los números salen del dossier de Ronald (versión 0) y
   de funciones probadas; cada alumno tiene su versión, con la misma lección.
5. **Todo se juega para poder defenderlo.** El caso deja un registro que el alumno sostiene en voz
   alta; la nota se pone en la defensa, no en el juego.

---

## 5. Lo que el juego no es (anti-pilares)

- **No es un cuestionario con puntos**, ni con animaciones encima ("eso para mí no es juego").
- **No es un tycoon completo** en el nivel 1: no hay economía que equilibrar ni cien pantallas.
- **No es un juego de reflejos ni de tiempo:** no se pierde por ser lento. El reloj corre en la
  historia (un mes después), no en la pantalla.
- **No es un mundo abierto para caminar** en el nivel 1. El mapa explorable es el nivel 2, si hace falta.
- **No es niveles, logros y rachas como fin en sí mismos** (la gamificación vieja quedó archivada).
- **No reemplaza la clase:** el juego prepara la defensa; el docente pone la nota.

---

## 6. Público y contexto de uso

- **Quién:** alumnos universitarios de Proyectos II en Cochabamba. Saben algo de costos y de
  matemática financiera; muchos nunca vieron una planta por dentro.
- **Dónde:** sobre todo **en el celular**, en el micro o en casa, a veces **con mala conexión**.
  Consecuencia de diseño: el caso se carga entero al entrar y se puede jugar sin red; se guarda en la
  cuenta cuando vuelve la conexión. Letra grande, un cálculo por pantalla, nada que exija teclado de PC.
- **En clase, proyectado:** el caso tiene que leerse desde el fondo del aula (el modo proyector de las
  láminas ya existe). Sirve para jugar el caso 1 entre todos antes de soltarlos solos.
- **Cuánto tiempo:** un caso entre 20 y 40 minutos, que se puede dejar y retomar.

---

## 7. Sensación buscada

> **"Ser el consultor al que el valle le cree."**

Al entrar: curiosidad (¿qué le pasa a esta empresa?). Al calcular: la sensación de detective, de
encontrar el número que nadie vio (el cuello de botella que el hijo de Don Mario no vio). Al decidir:
responsabilidad, porque la plata es de alguien que ya conoces. Al final: el orgullo de explicarlo
en voz alta y que se sostenga.

---

## 8. Cómo se mide que funciona (primera prueba con un curso)

Con un curso real jugando el caso 1 (y el 2 cuando exista):

| Qué se mide | De dónde sale | Señal de que funciona |
|---|---|---|
| **¿Lo terminan?** | Registro en Supabase: empezadas contra entregadas | 8 de cada 10 lo entregan sin que se los recuerdes dos veces. |
| **¿Entienden dónde están antes de calcular?** | Pregunta de una línea al final: "¿de qué era la empresa y qué problema tenía?" | Casi todos lo dicen con sus palabras. Si no, falla la llegada. |
| **¿Las pistas enseñan?** | Registro: errores típicos por intento | El error más común baja del primer al segundo intento. |
| **¿La decisión se piensa?** | Registro: cuántos cambian de opinión tras calcular antes de firmar | Hay alumnos que eligen la envasadora y cambian solos. |
| **¿Sostienen la defensa?** | Tu rúbrica en la defensa oral | Mejor que en un curso sin el juego, o que en tu experiencia previa con el mismo tema. |
| **¿Lo sienten juego?** | Tres preguntas cortas al final ("¿volverías a jugar el siguiente caso?") | La mayoría dice que sí, y alguno pregunta qué le pasa a Don Mario. |

Si la llegada y las pistas funcionan pero la defensa no mejora, el problema no es el género sino el
registro o la rúbrica (`04-aprendizaje.md`).

---

## 9. Lo que esta parte le deja a las demás

- **Bucle (`02`):** el core loop recomendado es encargo → visita e investigación → cálculo → decisión
  → consecuencia → defensa; el meta loop, caja del cliente + reputación. La escena 1 hoy no tiene
  encargo ni investigación: es lo primero a sumar.
- **Mundo (`05`):** hace falta una mentora o consultora que dé los encargos (la voz que pone el
  contexto) y una razón para que el alumno esté en el valle.
- **Progresión (`03`):** un caso por semana del dossier, con un cliente que vuelve.
- **Aprendizaje (`04`):** la investigación es evaluable (qué datos anotó) y la defensa necesita rúbrica.

Supuesto marcado: las partes 02 a 06 todavía no existen; si alguna decide distinto, esta visión se
revisa con Ronald.

Referencias confirmadas: [Ace Attorney, fases de investigación y juicio](https://strategywiki.org/wiki/Phoenix_Wright:_Ace_Attorney/Gameplay),
[Papers, Please](https://en.wikipedia.org/wiki/Papers,_Please),
[Good Pizza, Great Pizza](https://en.wikipedia.org/wiki/Good_Pizza,_Great_Pizza).
