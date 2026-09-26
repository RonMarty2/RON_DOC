# 01 · Visión: qué tipo de juego estamos armando

**Versión 2 · 26-09-2026** · Agente: `director-de-juego` · Estado: **propuesta para Ronald** (nada de
esto está decidido salvo lo que se marca como "ya decidido").

**Qué cambió respecto de la versión 1:** corrige los hallazgos 1 a 5 de la revisión del 26-09
(`06-revisiones.md`), además de varios menores:

- **Investigación:** ahora está diseñada. Hay datos de más, una contradicción y una libreta, y la ficha
  con los números justos desaparece.
- **Argumento del género, más honesto:** la llegada resuelve el "de la nada" y los verbos resuelven el
  "cuestionario". También se corrige el argumento contra el roguelite.
- **Hilo entre casos y nota:** el hilo queda con dos opciones. En la nota vale "el caso más la defensa"
  salvo que decidas otra cosa.
- **Sin promesas de más:** no se afirma que el juego funcione sin red ni que tenga modo proyector.
- **Mundo:** marcado como propuesta.
- **Tamaño:** un caso por unidad, de 10 a 20 minutos.
- **Celular:** los géneros van en bloques que se leen en el teléfono.
- **Medidas:** se mide lo que no se puede fingir.

## Decisiones pendientes de Ronald

Cada una trae mi recomendación; tú decides.

1. **El género** (sección 2). Recomendado: **juego de casos de consultoría**, con la estructura de
   *Ace Attorney* (investigas, luego defiendes). Alternativas: simulador de gestión o novela visual
   con cálculos.
2. **Qué hace el alumno en la investigación** (sección 3). Recomendado: **B, datos de más y una
   contradicción**, que anota en su libreta sólo lo que elige. Alternativas: A, tocar y que se anote
   solo (barata, pero es decorado), o C, preguntas con límite.
3. **Qué pasa de un caso al siguiente** (sección 4.3). Recomendado para el nivel 1: **sólo la
   historia**. Don Mario recuerda qué le aconsejaste, pero los números del caso siguiente son los del
   dossier, iguales para todos. Alternativa: caja y reputación con números, fuera de la nota
   (mejor para el nivel 3).
4. **Cuántos casos tiene la isla** (sección 4.2). Recomendado: **uno por unidad del dossier** (4 a 6),
   de 10 a 20 minutos cada uno. Alternativas: uno corto por semana, casi un ejercicio, o uno completo
   por semana (no lo recomiendo: semanas de trabajo por caso).
5. **De dónde sale la nota.** Lo dicho hasta hoy (IDEA-JUEGO §3 y la pantalla final de la escena 1):
   **el caso más la defensa**. Queda así salvo que decidas otra cosa. La opción que habría que pesar
   es "el caso sólo habilita la defensa y la nota sale de ella". El reparto se trabaja en
   `04-aprendizaje.md`.
6. **Qué gana el consultor al avanzar.** Recomendado: reputación narrativa (clientes nuevos que llegan
   "porque alguien te recomendó"), sin puntos. Alternativa: nada fuera de la nota.
7. **El uso en clase:** ¿el primer caso se juega en clase entre todos, proyectado? Recomendado: sí,
   el caso 1, para enseñar a jugar. Hay que construir una vista para proyector: la escena no la tiene.
8. **El mundo** (propuesta para `05-mundo-y-narrativa.md`): llegar a Punata en la flota y una mentora
   de la consultora que da los encargos. Recomendado como punto de partida; puede ser otro lugar u
   otro personaje.

**Ya decidido** (IDEA-JUEGO §5 y bitácora §0):
- cuentas con Supabase;
- versión de datos por alumno;
- arte hecho con código hasta probar con un curso;
- primera isla Proyectos II;
- la defensa oral es el jefe final;
- nivel 1 (escenas) primero.

---

## 0. Palabras de oficio que se usan en este documento

Cada término se explica una vez aquí; las demás partes del GDD los usan igual.

| Término | Qué quiere decir |
|---|---|
| **Género** | La familia de juegos a la que pertenece: define qué hace el jugador la mayor parte del tiempo. |
| **Core loop** (bucle central) | Lo que el jugador repite una y otra vez. Aquí: llegar, investigar, calcular, decidir, ver qué pasó. |
| **Meta loop** (bucle de fondo) | Lo que cambia entre una vuelta y otra y le da motivo para seguir (la historia del cliente, la reputación). |
| **Verbo** | Una acción que el jugador puede hacer: anotar, calcular, decidir, señalar. Un juego se define más por sus verbos que por su dibujo. |
| **Pilar de diseño** | Una regla corta con la que se acepta o se rechaza cualquier idea nueva. |
| **Anti-pilar** | Lo que el juego decide no ser, aunque sea tentador. |
| **Beat chart** (tabla de momentos) | El recorrido de la materia en orden, un renglón por momento: tema, lugar, personaje, qué calcula, qué decide, qué minijuego. Es lo que pediste ("tu materia empieza así, con el tema tal…"). Va en `03-progresion-proyectos.md`. |
| **Onboarding** (llegada) | Cómo se le presenta al jugador el mundo antes de pedirle nada. Es lo que faltó en la escena 1. |
| **Feedback** (respuesta) | Lo que el juego le muestra al jugador después de actuar: la pista según su error, la cinta que va más rápido. |
| **Jefe final** | El desafío que cierra una etapa y comprueba todo lo aprendido. Aquí es tu defensa oral. |
| **Minijuego** | Una actividad corta con reglas propias dentro del juego (por ejemplo, ordenar las máquinas en la línea). |
| **Rebanada completa** (*vertical slice*) | Una parte chica del juego hecha de punta a punta para probar si funciona. La escena 1 es la primera; la calidad final del arte se decide después de la prueba con un curso. |
| **Alcance** (*scope*) | Cuánto se va a construir. El enemigo número uno de un proyecto de una persona. |

---

## 1. Frase de visión

> **Eres el consultor joven al que los emprendedores del valle llaman cuando no saben si invertir:
> visitas su empresa, separas lo que importa de lo que no, haces la cuenta, les dices qué hacer y
> después lo defiendes frente al docente.**

En palabras de todos los días: *cada unidad te llega un cliente, visitas su empresa, haces la cuenta y
le aconsejas; al final lo defiendes en clase.*

---

## 2. Género y referencias

### 2.1 Primero, qué resuelve el género y qué no

Tu crítica a la escena 1 tiene dos partes, y **el género sólo resuelve una**. Conviene decirlo claro
para que, si algo falla en la prueba, sepas dónde mirar.

- **"Aparece de la nada, sin saber de qué es la empresa ni qué datos hay."** Esto **no lo resuelve
  el género**: lo resuelve la **llegada** (un encargo que dice quién es el cliente y qué quiere) y una
  **visita** antes de la primera pregunta. Eso se le puede poner a cualquier género. Entra sí o sí.
- **"No quiero un cuestionario con puntos."** Esto lo resuelven los **verbos del alumno**, no el
  nombre del género. Si el bucle sigue siendo "leer, escribir un número, elegir A, B o C", es un
  cuestionario con otro disfraz. Los verbos que lo cambian son tres:
  1. **Investigar con criterio:** separar datos útiles de los que sobran y descubrir quién dice algo
     falso (sección 3).
  2. **Decidir cuando el número no decide solo:** hoy, quien calculó 720 ya sabe que la envasadora no
     sirve. Las decisiones tienen que tener un costo del otro lado; por ejemplo, el tanque sirve, pero
     Don Mario tiene poca caja y un pedido grande en riesgo. El número informa y el alumno decide. Los
     datos que hagan falta salen del dossier (`[DATO DEL DOSSIER]` si no están). El detalle va en `02`.
  3. **Defender:** señalar en la defensa el dato de su libreta que sostiene el consejo.

El género se elige por otra cosa: por **qué forma tiene la unidad de juego, cómo cierra y cuánto
cuesta**. Ahí gana el juego de casos.

### 2.2 Cuatro géneros posibles

**A. Simulador de gestión o tycoon con historia** (ej.: *Game Dev Tycoon*, *Good Pizza, Great Pizza*)
- **Qué haces:** administras una empresa a lo largo del tiempo: compras, produces, vendes, reaccionas a eventos.
- **Qué pide al alumno:** muchas decisiones seguidas y mirar indicadores.
- **Por qué sí o no:** bueno para decidir, malo para calcular: el simulador hace la cuenta y el alumno
  mueve perillas. Caro: hay que equilibrar una economía entera. **Para el nivel 3, sobre SIMPRO.**

**B. Novela visual con cálculos**
- **Qué haces:** lees una historia con personajes y de vez en cuando eliges o escribes algo.
- **Qué pide al alumno:** leer y, a ratos, calcular.
- **Por qué sí o no:** barato, pero el cálculo queda como una interrupción del texto. Es lo más
  parecido al cuestionario que rechazaste.

**C. Juego de casos de consultoría (recomendado)** (ej.: *Ace Attorney*, *Papers, Please*)
- **Qué haces:** cada caso es un cliente con un problema: investigas, calculas, aconsejas y defiendes.
- **Qué pide al alumno:** mirar con atención, elegir qué datos importan, calcular a mano, decidir y argumentar.
- **Por qué sí:** el caso calza con una unidad del dossier; el cierre del género (el juicio) es tu
  defensa oral; y la escena 1 ya tiene casi esta forma, así que el costo es medio y ya empezado.

**D. Roguelite de decisiones** (ej.: *Reigns*)
- **Qué haces:** partidas cortas que se repiten; cada una es distinta y se aprende de perder.
- **Qué pide al alumno:** decidir rápido, muchas veces.
- **Por qué no como base:** los datos variables no son el problema (la escena 1 ya saca 999 versiones
  con semilla, dentro de los límites del dossier). El problema es que **no deja un caso propio que
  defender** y premia jugar muchas veces más que razonar una vez. **Sí sirve como modo de práctica**
  (el mismo caso con otra versión, sin nota), para después de la prueba.

### 2.3 Recomendación

**Juego de casos de consultoría**, con historia que se recuerda entre casos y SIMPRO como herramienta
dentro de los casos cuando lleguen el VAN y la TIR. El tycoon completo queda para el nivel 3.

Esto ajusta, sin contradecir, lo que decía `IDEA-JUEGO.md` §2 ("simulador de gestión con historia"):
el mundo sigue reaccionando a tus decisiones, pero lo que el alumno hace la mayor parte del tiempo es
**resolver casos**. Es más barato y encaja con la defensa oral.

### 2.4 Juegos de referencia y qué tomar de cada uno

1. ***Ace Attorney*** (Capcom, desde 2001). Juego de abogado en dos fases. En la **investigación**
   recorres lugares y juntas pruebas. En el **juicio** escuchas testimonios y presentas la prueba que
   muestra la contradicción. Lo difícil no es encontrar la prueba sino **darse cuenta de cuál
   contradice a quién**.
   **Qué tomamos:** el caso en dos tiempos y la contradicción (el hijo de Don Mario jura que la
   envasadora es el problema; tu libreta dice otra cosa). "Presentar la prueba" es una mecánica
   concreta: en la defensa señalas el dato de tu libreta que desmiente al hijo.
2. ***Papers, Please*** (Lucas Pope, 2013). Eres inspector de frontera y revisas documentos contra un
   reglamento. Al día siguiente te llega la multa por lo que dejaste pasar.
   **Qué tomamos:**
   - el trabajo es mirar papeles con atención, y hay más papel del que importa;
   - el error llega **después**, como consecuencia concreta, no como una cruz roja;
   - su tamaño: un juego enorme hecho por una persona con pocas pantallas.
3. ***Good Pizza, Great Pizza*** (TapBlaze, 2014, celular). Atiendes clientes uno por uno, cada uno con
   su personalidad; cada capítulo trae clientes nuevos.
   **Qué tomamos:** clientes con cara y carácter que vuelven, y tramos cortos jugables en el celular.

---

## 3. La investigación: qué hace el alumno para que no sea decorado

Es la parte que separa este juego de un cuestionario. Si la investigación es tocar tres objetos del
dibujo para destapar los mismos cinco números de la ficha, es la ficha con tres clics de más.

**Recomendada, opción B: datos de más, una contradicción y una libreta.**

- **Hay más información de la que se necesita.** En la planta, la placa del pasteurizador dice su
  ritmo nominal; el cuaderno de producción dice lo que salió de verdad ayer; hay datos que sobran (la
  cámara de frío, el precio de la leche).
- **Alguien dice algo falso.** El hijo: "la envasadora es el problema". El vendedor: "tres veces más
  rápida, triplica tu producción".
- **El alumno anota en su libreta sólo lo que elige.** Después **calcula con su libreta**, no con una
  ficha. **La ficha con los números exactos desaparece** de la pantalla de cálculo.
- **Se puede evaluar:** el registro muestra qué anotó y qué dejó fuera ("anotó el dato que sobra",
  "no anotó la eficiencia"). Así la pista que recibe al fallar puede apuntar a su libreta.
- **Llega a la defensa:** el alumno señala el dato de su libreta que desmiente al hijo.

Los números nuevos (ritmo nominal, datos de sobra) tienen que salir del dossier, marcados
`[DATO DEL DOSSIER]` si no están. También salen de `planta.ts` con pruebas, y las reglas de versión
tienen que cubrirlos.

**Las otras dos opciones:**
- **A. Recolectar.** Tocar objetos revela datos y se anotan solos. Barata, pero es decorado; no la
  recomiendo sola.
- **C. Preguntar con límite.** Puedes hacerle tres preguntas a Don Mario antes de calcular. Da más
  juego, pero castiga al que no sabe qué preguntar justo en el primer caso. Sirve para un caso
  avanzado.

**En el celular:** calcular con la libreta obliga a ver la libreta y escribir a la vez. Propuesta
para `02`: la libreta como franja fija y plegable arriba del campo, medida en 375×812 con el teclado
abierto.

---

## 4. Cómo se siente la materia

### 4.1 El recorrido, a grandes rasgos

Esto responde a tu "tu materia empieza así…". El detalle renglón por renglón es el **beat chart** de
`03-progresion-proyectos.md`, que todavía no existe. El mundo (Punata, la flota, la mentora) es
**propuesta** para `05-mundo-y-narrativa.md`, no algo decidido.

1. **Llegada al valle** (unos 3 minutos). *Propuesta:* llegas en la flota a Punata y una mentora de
   la consultora te da la carpeta del primer cliente: quién es, qué vende, qué quiere. Nadie te
   pregunta nada todavía.
2. **Caso 1 · "La máquina que no alcanzaba"** (Lácteos Valle Alto, unidad de cadena de valor y
   tamaño). Personaje: Don Mario.
   - **Visita:** anotas en tu libreta lo que te parece importante y te topas con el hijo, que dice que
     la envasadora es el problema.
   - **Cálculo:** capacidad y cuello de botella.
   - **Decisión:** envasadora, tercer tanque o no invertir.
   - **Antes de firmar:** calculas cuánto saldrá con la compra y en cuánto tiempo se recupera.
   - **Un mes después:** ves la consecuencia.
   - **Defensa:** escribes tu argumento.

   Ya existe todo salvo la llegada, la visita y la libreta.
3. **Caso 2 · "La cámara de frío que se llenó".** Don Mario vuelve y recuerda qué le aconsejaste (ver
   4.3). Números `[DATO DEL DOSSIER]`.
4. **Casos siguientes, uno por unidad.** Clientes nuevos que llegan recomendados. Entran el flujo de
   caja, el VAN y la TIR con el motor de SIMPRO, y los eventos (sequía, devaluación) que obligan a
   recalcular. Temas y números `[DATO DEL DOSSIER]`.
5. **Jefe final · la defensa.** En clase, frente a ti, el alumno defiende su caso con su versión de
   los números. Tú tienes su registro en el panel del docente.

### 4.2 Tamaño

La escena 1 llevó varios días entre motor, versiones, pistas, guion revisado, pruebas, registro y
panel. Un caso completo por semana (unos 16) no lo sostiene una persona.

- **Casos por isla:** recomendado, **uno por unidad del dossier**, de 4 a 6 por isla.
- **Duración:** **10 a 20 minutos por caso**, en tramos de unos 5 minutos que se guardan solos
  (llegada y visita, cálculo, decisión, consecuencia y defensa). Se puede dejar en el micro y seguir
  en casa.
- **Minijuego:** el de ordenar las máquinas es opcional, para después de la prueba con un curso.

### 4.3 El hilo entre casos

**Opción A (recomendada para el nivel 1): sólo pasa la historia.** Don Mario recuerda en una línea qué
le aconsejaste ("el tanque funcionó, ahora tengo otro lío" o "la envasadora sigue parada, a ver si
esta vez…"). Los números del caso 2 son los del dossier, con la versión del alumno, **iguales para
quien acertó y para quien falló**.
- Costo: casi nada.
- No castiga dos veces al que se equivocó.
- Respeta el dossier.

**Opción B: caja y reputación con números.** Se arrastran de un caso al otro, pero la nota del caso
sólo mira el razonamiento dentro del caso.
- Costo: dos variantes por caso, y reglas de versión para ambas.
- Encaja mejor en el nivel 3, sobre SIMPRO, donde la economía sí existe.

---

## 5. Pilares de diseño

Cada idea nueva se juzga con estas cinco reglas. Si no pasa una, no entra.

1. **Si no cambia una decisión, no va.** Cada cálculo termina en algo que el alumno decide con ese
   número, y la decisión tiene un costo del otro lado: el número informa, no decide solo.
2. **Primero se ve, después se calcula.** Nadie pregunta nada antes de que el alumno sepa dónde está,
   de qué es la empresa y qué quiere el cliente. Los datos se buscan en el mundo, con más de los que
   hacen falta; no se reparten en una ficha.
3. **El alumno escribe el número; el mundo le responde.** Nunca elige el resultado entre opciones. La
   pista depende de su error y la consecuencia se ve en el cliente, no en un puntaje.
4. **Cada caso es del dossier y es sólo tuyo.** Los números salen del dossier de Ronald (versión 0) y
   de funciones probadas; cada alumno tiene su versión, con la misma lección.
5. **Todo se juega para poder defenderlo.** El caso deja un registro (la libreta, los números, la
   decisión, el argumento) que el alumno sostiene en voz alta.

---

## 6. Lo que el juego no es (anti-pilares)

- **No es un cuestionario con puntos**, ni con animaciones encima ("eso para mí no es juego").
- **No es una ficha repartida en el dibujo:** si la investigación no pide elegir, no es investigación.
- **No es un tycoon completo** en el nivel 1: no hay economía que equilibrar.
- **No es un juego de reflejos ni de tiempo:** no se pierde por ser lento. El reloj corre en la
  historia ("un mes después"), no en la pantalla.
- **No es un mundo abierto para caminar** en el nivel 1. El mapa explorable es el nivel 2, si hace falta.
- **No es niveles, logros y rachas como fin en sí mismos** (la gamificación vieja quedó archivada).
- **No reemplaza la clase:** el juego prepara la defensa, y la defensa es tuya.

---

## 7. Público y contexto de uso

- **Quién:** alumnos universitarios de Proyectos II en Cochabamba. Saben algo de costos y de
  matemática financiera; muchos nunca vieron una planta por dentro.
- **Dónde:** sobre todo **en el celular**, en el micro o en casa, a veces **con mala conexión**.
  - Letra grande, un cálculo por pantalla, con la libreta a la vista.
  - Nada que exija teclado de PC.
  - **Requisito, todavía no construido:** el caso tendría que poder jugarse con conexión intermitente
    y subir lo guardado al volver la red. Hoy la página del juego es borrador, no entra en la
    precarga del sitio, y entrar con Google necesita red.
  - **Tarea de código:** hoy el guardado se reintenta con la respuesta siguiente, así que si falla al
    entregar (el último paso) la entrega queda sin subir hasta recargar.
- **En clase, proyectado:** el caso tiene que leerse desde el fondo del aula. **Hay que construirlo:**
  las láminas tienen una vista para proyector (que todavía no probaste en clase), pero la escena del
  juego no usa ese armazón.
- **Cuánto tiempo:** 10 a 20 minutos por caso, en tramos que se guardan solos.

---

## 8. Sensación buscada

> **"Ser el consultor al que el valle le cree."**

- **Al entrar:** curiosidad (¿qué le pasa a esta empresa?).
- **Al investigar:** sensación de detective, cuando notas que el hijo está equivocado antes de hacer
  la cuenta.
- **Al calcular:** confirmarlo con un número.
- **Al decidir:** responsabilidad, porque la plata es de alguien que ya conoces.
- **Al final:** el orgullo de explicarlo en voz alta y que se sostenga.

---

## 9. Cómo se mide que funciona (primera prueba con un curso)

Si el caso cuenta para la nota, lo van a entregar aunque sea aburrido, y a quien los evalúa le van a
decir que les gustó. Por eso se mide sobre todo lo que no se puede fingir.

| Qué se mide | De dónde sale | Señal de que funciona |
|---|---|---|
| **¿Entienden dónde están antes de calcular?** | Pregunta de una línea al final: "¿de qué era la empresa y qué problema tenía?" | Casi todos lo dicen con sus palabras. Si no, falla la llegada. |
| **¿La investigación se piensa?** | Registro: qué anotaron en la libreta; tiempo en la visita contra tiempo en el cálculo | La mayoría deja fuera el dato que sobra y anota la eficiencia; nadie pasa la visita en segundos. |
| **¿Las pistas enseñan?** | Registro: errores típicos por intento | El error más común baja del primer al segundo intento. |
| **¿La decisión se piensa?** | Registro: cuántos cambian de opinión tras calcular antes de firmar | Hay alumnos que eligen mal y cambian solos, sin pista. |
| **¿Lo sienten juego?** | Registro: cuántos **reabren** el caso después de entregarlo, o lo empiezan antes de que sea obligatorio | Hay alguno. Cero es mala señal. |
| **¿Sostienen la defensa?** | Tu rúbrica en la defensa oral, contra una nota de referencia tuya de un curso anterior con el mismo tema | Igual o mejor, y con argumentos que citan su libreta. |

Si la llegada y las pistas funcionan pero la defensa no mejora, el problema no es el género sino el
registro o la rúbrica (`04-aprendizaje.md`).

---

## 10. Lo que esta parte le deja a las demás

- **Bucle (`02`):** tiene que definir:
  - el core loop recomendado: llegada → visita e investigación → cálculo con la libreta → decisión
    con costo → consecuencia → defensa;
  - el verbo de la investigación (opción B);
  - la decisión que no se resuelve sola con el cálculo;
  - la libreta en el celular.
- **Mundo (`05`):** la llegada, quién da los encargos y por qué el alumno está en el valle (lo de
  Punata, la flota y la mentora es propuesta).
- **Progresión (`03`):** un caso por unidad del dossier, con un cliente que vuelve y el hilo de la
  opción que decidas.
- **Aprendizaje (`04`):**
  - el reparto de la nota entre el caso y la defensa;
  - qué de la libreta se evalúa;
  - la rúbrica de la defensa.
- **Código (fuera del GDD):** el reintento del guardado al entregar en `EscenaPlanta.tsx`.

**Supuesto:** las partes 02 a 05 todavía no existen. Si alguna decide distinto, esta visión se revisa
contigo.

**Referencias confirmadas:**
- [Ace Attorney, fases de investigación y juicio](https://strategywiki.org/wiki/Phoenix_Wright:_Ace_Attorney/Gameplay)
- [Papers, Please](https://en.wikipedia.org/wiki/Papers,_Please)
- [Good Pizza, Great Pizza](https://en.wikipedia.org/wiki/Good_Pizza,_Great_Pizza)
