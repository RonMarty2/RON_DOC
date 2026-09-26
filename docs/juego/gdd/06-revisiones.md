# 06 · Revisiones: lo que falla en lo propuesto

**Versión 1 · 26-09-2026** · Agente: `critico-de-jugabilidad` · Lo más nuevo arriba.

## Decisiones pendientes de Ronald

Salen de la revisión de `01-vision.md` v1; se suman a las cinco que esa parte ya lista.

1. **Qué hace que la investigación sea un juego y no una ficha repartida en tres lugares** (hallazgo 1).
   Recomendado: la opción B (datos de más y una contradicción que resolver).
2. **Si lo que pasa de un caso al siguiente son números (caja, reputación) o sólo la historia** (hallazgo 3).
   Recomendado: sólo la historia en el nivel 1.
3. **Cuántos casos tiene la isla**: uno por semana o uno por unidad (hallazgo 5). Recomendado: uno por unidad.
4. **Si la nota sale "del caso más la defensa" (lo que dice IDEA-JUEGO §3 y la escena 1) o "sólo de la
   defensa"** (lo que dice el pilar 5). Hoy los dos textos se contradicen (hallazgo 4).

---

## 26-09-2026 · Revisión de `01-vision.md` versión 1 (director-de-juego)

**Qué se revisó:** `docs/juego/gdd/01-vision.md` v1, contra `IDEA-JUEGO.md`, `LEEME.md` del GDD,
`CLAUDE.md`, `BITACORA.md` §0 y la escena 1 que existe (`src/lib/juego/guion-planta.ts`,
`src/app/juego-proyectos/EscenaPlanta.tsx`, `src/lib/juego/nube.ts`). Se jugó mentalmente la escena 1
más lo que la visión le agrega (llegada, investigación, minijuego, caso 2) como tres alumnos: la que
sabe, el que no sabe y el que quiere terminar rápido.

**Veredicto:** llevar a Ronald **con ajustes**. El género recomendado es razonable y barato, los
pilares y los anti-pilares están bien, y el glosario sirve. Pero la visión vende como resuelto lo que
todavía es sólo un nombre: la parte que haría que esto no sea un cuestionario (la investigación) no
está definida, y la capa de gestión choca con las versiones y con la nota. Antes de mostrarla hay que
corregir los hallazgos 1 a 4; el resto puede ir como nota.

### Hallazgos, de más grave a menos grave

#### 1. La investigación, que es lo que separa esto de un cuestionario, no está diseñada y hoy sería falsa

- **Qué pasa.** Todo el argumento contra el "cuestionario con puntos" descansa en la fase de
  investigación de *Ace Attorney*: "el alumno encuentra los datos en el mundo: la placa del
  pasteurizador, los tanques, el cuaderno de producción". Pero en la escena 1 los datos ya están a la
  vista en una ficha (`fichaMaquinas` y `condicionesPlanta`: exactamente los cinco números que hacen
  falta, ni uno más). Si la investigación consiste en tocar tres objetos del dibujo para destapar esos
  mismos cinco números, es la misma ficha con tres clics de más: **decorado**. El alumno que quiere
  terminar rápido toca todo sin mirar (no hay costo), el que sabe se aburre, y nadie decidió nada.
  En *Ace Attorney* la investigación funciona porque lo difícil no es encontrar la prueba, es **darse
  cuenta de cuál contradice a quién**; eso es lo que la visión no toma.
- **Por qué importa.** Es la crítica central de Ronald. Si la primera prueba con un curso muestra
  "leer, tocar, escribir un número, elegir A/B/C", Ronald va a ver el mismo cuestionario animado que
  rechazó, ahora con más pantallas. Además el pilar 2 ("los datos se encuentran en el mundo, no en un
  enunciado") se cumple en la letra y no en el fondo.
- **Propuesta concreta.** Que 01 diga qué verbo nuevo tiene el jugador en la investigación, con tres
  opciones para Ronald (el detalle va en `02-bucle-y-mecanicas.md`):
  - **A. Recolectar (lo mínimo, barato).** Tocar objetos revela datos; se anotan solos en la libreta.
    Costo bajo, pero es decorado: no lo recomiendo solo.
  - **B. Datos de más y una contradicción (recomendada).** En la planta hay más información de la que
    se necesita (la placa dice 300 L/h de nominal, el cuaderno de producción dice lo que salió de
    verdad ayer; hay un dato que sobra, como la cámara de frío o el precio de la leche) y **alguien
    dice algo falso** (el hijo: "la envasadora es el problema"). El alumno **anota en su libreta sólo
    lo que elige** y después calcula con su libreta, no con una ficha. Así la investigación se
    evalúa ("anotó el dato que sobra", "no anotó la eficiencia") y el "presentar la prueba" de Ace
    Attorney existe de verdad: en la defensa escrita señala el dato de su libreta que desmiente al hijo.
    Costo medio: más guion por caso y reglas de versión que controlen también los datos de sobra.
  - **C. Preguntar con límite.** Puedes hacerle tres preguntas a Don Mario antes de calcular; elegir mal
    obliga a volver. Más juego, pero castiga al que no sabe qué preguntar justo en el primer caso.
  - Y en cualquiera: **la ficha con los cinco números justos desaparece** de la pantalla de cálculo;
    queda la libreta del alumno.
- Ojo con los números de la opción B: el dato de sobra y el "valor nominal" tienen que salir del dossier
  (`[DATO DEL DOSSIER]` si no están) y de `planta.ts` con pruebas, no inventados en el guion.

#### 2. El género nombra la crítica de Ronald pero no la resuelve: la resuelve la llegada, que sirve para cualquier género

- **Qué pasa.** La tabla 2.1 dice que el juego de casos "resuelve tu crítica por diseño: todo caso
  empieza con el encargo y la visita". Pero una llegada (onboarding) con encargo y visita se le puede
  poner a un tycoon, a una novela visual o a lo que sea; no es una propiedad del género. Y la otra
  mitad de la crítica ("cuestionario con puntos") el género tampoco la toca: el bucle central que
  queda (leer, escribir un número, elegir entre A, B y C, ver la consecuencia) es el mismo de la escena
  1 de hoy. La propia IDEA-JUEGO §8.2 ya había marcado que "la decisión es de opción múltiple y ya
  está resuelta" para quien calculó bien; la visión no dice cómo cambia eso.
  La comparación está además inclinada: a D (roguelite) se la descarta porque "las partidas al azar
  chocan con los números del dossier", cuando la escena 1 ya genera 999 versiones con semilla dentro
  de límites del dossier, que es el mismo mecanismo.
- **Por qué importa.** Ronald pidió que le definan y le recomienden un tipo de juego. Si la
  recomendación se apoya en un argumento que no es del género, Ronald elige por la razón equivocada y,
  cuando la llegada no alcance, no va a saber qué falló.
- **Propuesta concreta.** Separar las dos cosas en 2.2: (a) "la escena no aparece de la nada" se
  resuelve con la llegada y el encargo, y eso entra sea cual sea el género; (b) "no es un cuestionario"
  se resuelve con los verbos del jugador: investigar con criterio (hallazgo 1), **decidir entre
  opciones que no se resuelven solas con el cálculo** (por ejemplo, el tanque o no comprar si Don
  Mario tiene poca caja y un pedido grande en riesgo: el número informa, no decide) y defender.
  El juego de casos sigue siendo la recomendación, pero por lo que realmente aporta: una unidad que
  calza con la semana del dossier, un cierre que es la defensa oral, y bajo costo. Corregir la fila
  de D para que no use un argumento falso.

#### 3. La capa de gestión (caja y reputación entre casos) choca con las versiones, con el dossier y con la nota

- **Qué pasa.** La visión propone que "si le aconsejaste bien, llega con más producción; si no, llega
  con menos caja y desconfiado". Eso tiene tres problemas:
  1. **El error se arrastra a la nota.** Si el caso 2 cuenta para la nota y empieza peor porque
     fallaste el caso 1, el que no sabía queda penalizado dos veces. En un juego de entretenimiento
     eso es tensión; en uno que pone nota es injusto y Ronald lo va a tener que explicar.
  2. **No sale del dossier.** El dossier de la Semana 2 tiene un caso con sus números; "Don Mario con
     menos caja" es una segunda versión del caso 2 que nadie escribió. El pilar 4 ("los números
     salen del dossier") se rompe o el trabajo de cada caso se duplica.
  3. **Hoy no hay rama real.** La escena 1 permite "volver a intentar" tras la mala decisión, así
     que casi todos terminan con el tanque. La rama "mal aconsejado" sólo la verían quienes no
     vuelven a intentar.
- **Por qué importa.** Es lo que la visión presenta como la diferencia con un cuestionario (el mundo
  recuerda), y es la parte más cara y más frágil del documento.
- **Propuesta concreta.** Dos opciones para Ronald:
  - **A. Sólo la historia pasa entre casos (recomendada para el nivel 1).** Don Mario recuerda qué le
    aconsejaste y lo dice en una línea al empezar el caso 2; los números del caso 2 son los del
    dossier (con la versión del alumno), iguales para quien acertó o falló. Costo: casi nada. La
    reputación queda como adorno narrativo (quién te recomienda), sin números.
  - **B. Caja y reputación con números, fuera de la nota.** Se arrastran, pero la nota del caso sólo
    mira el razonamiento dentro del caso. Costo: dos variantes por caso y reglas de versión para
    ambas. Mejor para el nivel 3 (sobre SIMPRO), donde la economía sí existe.
  Corregir en consecuencia la decisión pendiente 2 y el punto 3 de la sección 3.

#### 4. Contradicciones con lo decidido y con la escena 1

- **La nota.** El pilar 5 dice "la nota se pone en la defensa, no en el juego" y la decisión pendiente
  4 dice "el caso registra cómo razonó, la defensa pone la nota". IDEA-JUEGO §3 dice "la nota sale del
  caso más la defensa", y la escena 1 ya se lo dice al alumno (`FINAL` en `guion-planta.ts`: "La nota
  sale de acá más tu defensa en clase"). Un pilar no puede fijar lo que la misma parte deja como
  decisión pendiente. **Propuesta:** el pilar 5 queda como "todo se juega para poder defenderlo" y la
  frase sobre la nota se quita hasta que Ronald decida el reparto en `04-aprendizaje.md`.
- **"Proyectado, el modo proyector de las láminas ya existe".** Existe para `LaminaShell`; la escena
  del juego no usa ese shell, y el modo proyector de las láminas todavía está pendiente de que Ronald
  lo pruebe en clase (CLAUDE.md). **Propuesta:** decir "habría que adaptarlo".
- **"Se puede jugar sin red; se guarda cuando vuelve la conexión".** No es lo que hay: la página del
  juego es borrador y los borradores no entran en la precarga del service worker
  (`scripts/precarga-sw.mjs` sólo precarga lo del sitemap); entrar con Google necesita red; y el
  guardado en `EscenaPlanta.tsx` se reintenta "con la próxima respuesta", así que si falla al
  **entregar** (el último paso) no hay próxima respuesta y la entrega queda sin subir hasta recargar.
  **Propuesta:** en 01 decirlo como requisito ("tiene que poder…"), no como hecho, y anotar el
  reintento de la entrega como tarea para el código.
- **"La escena 1 es la vertical slice".** Una vertical slice es con la calidad final; el arte es con
  código "hasta probar con un curso" (decidido). **Propuesta:** "es la primera rebanada; la calidad
  final del arte se decide después de la prueba".
- **Datos nuevos sin marca.** "Llegas en la flota a Punata" y "tu mentora de la consultora" son
  propuestas de mundo (parte 05, que no existe); están escritas como hechos. Marcarlas como supuestos.

#### 5. El tamaño: un caso por semana es demasiado para una persona, y 20 a 40 minutos es demasiado para un celular

- **Qué pasa.** La escena 1, que ya existe, llevó varios días de trabajo: motor con versiones y reglas
  que conservan la lección, diagnóstico de errores típicos, pistas, guion revisado en 200 versiones,
  pruebas, registro y página del docente. La visión propone un caso **por semana** (unas 16 por isla)
  con investigación, minijuego y variantes por caja. Sobre la duración: el definidor de esta revisión
  apunta a 10 a 20 minutos por escena; la escena 1 de hoy se juega en unos 10 a 15, y con llegada e
  investigación llega a 20. Pedir 40 minutos en un micro, con el teclado del celular tapando media
  pantalla, es pedir que lo dejen a la mitad.
- **Por qué importa.** El riesgo que ya se le dijo a Ronald (IDEA §4: "un juego se come el tiempo si
  no se limita") vuelve por la puerta de atrás. Y un caso que no se termina no llega a la defensa.
- **Propuesta concreta.** Opciones: **A. un caso por unidad del dossier** (4 a 6 por isla, recomendado);
  **B. un caso por semana, pero corto** (sólo cálculo y decisión, sin investigación, casi un
  ejercicio); **C. un caso por semana completo** (costo de semanas por caso, no lo recomiendo).
  Duración objetivo: **10 a 20 minutos por caso**, partido en tramos de 5 que se guardan solos.
  El minijuego de ordenar máquinas, marcarlo como opcional y para después de la prueba con un curso.

#### 6. El celular: "un cálculo por pantalla" y "calculas con tu libreta" se pisan

- **Qué pasa.** Si los datos salen de la investigación (hallazgo 1), al calcular el alumno necesita
  ver su libreta y escribir a la vez. En 375 px con el teclado abierto quedan unos 350 px de alto.
  La visión dice "un cálculo por pantalla" pero no dónde queda la libreta.
- **Propuesta concreta.** Que 02 defina la libreta como una franja fija arriba del campo (plegable), y
  que se mida con Playwright en 375×812 con el teclado abierto, como se midió la escena 1.

#### 7. Poco claro para quien no es desarrollador de videojuegos

- La tabla 2.1 (cuatro columnas por seis filas) no se lee en un celular y mezcla criterios; Ronald va
  a leerla en la artifact o en el teléfono. **Propuesta:** una tarjeta por género con tres líneas
  ("qué haces", "qué pide al alumno", "por qué sí o por qué no").
- "*Case-based adventure* con *management layer*" está bien como etiqueta, pero conviene una frase de
  la vida real: "cada semana te llega un cliente, visitas su empresa, haces la cuenta y le aconsejas".
- Términos que se definen y después no se usan (estado de falla) o que se usan sin definir (flota,
  "presentar la prueba" como mecánica). Revisar.

#### 8. Las medidas de éxito miden la obligación, no el juego

- "8 de cada 10 lo entregan": si cuenta para la nota, lo entregan aunque sea aburrido. "¿Volverías
  a jugar?" preguntado a alumnos que el docente va a evaluar da siempre que sí. "Mejor que un curso
  sin el juego" no tiene contra qué compararse.
- **Propuesta:** medir lo que no se puede fingir: cuántos **reabren** el caso después de entregarlo
  o antes de que sea obligatorio, cuánto tiempo pasan en la investigación contra la pantalla de
  cálculo, y la pregunta de comprensión al final (esa sí está bien). Para comparar la defensa,
  pedirle a Ronald una nota de referencia de un curso anterior con el mismo tema.

### Lo que está bien y conviene no tocar

- Los cinco pilares (salvo la frase de la nota del 5) y los anti-pilares: son claros y ya sirven de filtro.
- El glosario de la sección 0: justo lo que Ronald pidió.
- Dejar el tycoon completo para el nivel 3 y meter SIMPRO como herramienta dentro de los casos.
- *Papers, Please* como referencia de tamaño y de "el error llega después, como consecuencia".
- La pregunta de una línea "¿de qué era la empresa y qué problema tenía?" para medir la llegada.

### Avisos para otras partes

- `02-bucle-y-mecanicas.md`: tiene que definir el verbo de la investigación (hallazgo 1) y la
  decisión que no se resuelve sola con el cálculo (hallazgo 2).
- Código (no es del GDD): el reintento de guardado tras la entrega en `EscenaPlanta.tsx` (hallazgo 4).
