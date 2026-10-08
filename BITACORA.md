# Bitácora · RON_DOC

> **Leer esto primero.** Qué es el sitio, en qué estado está, qué se decidió y qué sigue. Cada parte terminada se anota acá en el mismo commit.
>
> Cada materia tiene además su bitácora en `bitacoras/` (qué enseña cada lámina, números de verdad, decisiones de contenido).

**Última actualización:** 2026-09-25

---

## 0. En curso ahora (leer antes que nada)

> **LEER PRIMERO: `docs/juego/RETOMAR.md`** (nota de relevo del 08-10: qué decidió Ronald, el método, dónde está cada archivo, qué sigue y qué no repetir). Lo que está debajo es el detalle histórico.

> **08-10 (Claude, PC RONMARTY): giro de Ronald, sin ejecutar todavía.** (1) **Sonido:** probó Flow Music (Google Labs,
> `flowmusic.app`, sí disponible desde Bolivia, con su sesión) con una pista 8 bits para la escena «La encuesta de sueño»
> y **le gustó mucho**. Agente nuevo `disenador-de-sonido` (`.claude/agents/`, registrado en `LEEME.md`; sale `07-sonido.md`),
> etapa **4-bis: justo después de diseñar cada nivel, isla o materia**, antes del crítico; se mejora con cada prueba
> (apartado «Lo aprendido»). **Lo legal (licencia de Flow Music) queda pendiente de Ronald: ninguna pista se integra ni
> se publica.** Playground (Google Labs) descartado: no disponible en su región. (2) **Motores/aspecto:** el boceto A le
> pareció «un dibujo y ya»; el juego actual se dibuja con rectángulos de código. Demos de la misma escena en tres técnicas
> en `docs/juego/bocetos/motores/` (`index.html`): HTML/CSS, PixiJS, Phaser. Entre PixiJS y Phaser Ronald no ve diferencia
> (cierto: la diferencia visible es de 1 a 2/3; lo que sube la calidad es el arte real, no el motor). Sin decidir. (3) **Ronald
> pidió cambiar de materia a una que domine, empezar de cero rescatando lo reutilizable, y extrapolar su VISIÓN a las demás
> materias sin copiar el estilo** (finanzas, estadística y bolsa se enseñan distinto). **Antes de hacer nada: acordar el plan
> con él.** Pendiente: confirmar qué materia, qué entra en «de cero» y un inventario simple de lo que se puede reutilizar.
> La maqueta 3.6 de Psicoestadística Descriptiva (Psicología) sigue sin aprobar.
> **Plan aprobado por Ronald (08-10), de a un paso:** (1) visión en una página → **hecha:** `docs/juego/VISION-RONALD.md`
> (confirmada por Ronald; frases citadas verificadas contra los archivos); (2) arte con paquetes de pixel art de uso libre
> (licencia a verificar paquete por paquete) y una pantalla de prueba del Tema 1 con PixiJS, comparada con el boceto A;
> (3) ajustar la maqueta tema por tema; (4) construir el Tema 1 como borrador. Materia: Psicoestadística Descriptiva
> (Psicología); «de cero» = aspecto y motor visual; se conservan motor invisible, agentes y maqueta. Avance: resumen de 5
> líneas por etapa. **Regla corregida por Ronald (08-10):** las referencias a juegos famosos que lo hicieron bien **sí**
> (se proponen 1 a 3 por materia y se dice qué se toma y qué se cambia); no se copia arte, personajes, nombres ni música de
> un juego comercial, ni el contenido de otro juego de RON_DOC. Pasada a los 7 agentes y a `REGLAS-COMUNES-AGENTES.md`.
> **CORRECCIÓN DE ORDEN (08-10, Ronald):** el plan de arriba tenía el arte (paso 2) antes de analizar el tema, y la sesión
> eligió referencias por su cuenta; Ronald lo frenó: **primero el análisis del dossier del tema y recomendar cómo aprender
> jugando, después él dice qué le gusta, al final referencias, aspecto, arte y sonido.** Regla escrita en los 7 agentes y en
> `REGLAS-COMUNES-AGENTES.md`. El paso 2 del plan (arte) queda **en pausa**; en curso: análisis de cero del Tema 1 por el
> adaptador → `docs/juego/gdd/00-tema1-de-cero-psicoestadistica.md` (fase A sin leer la maqueta; fase B la compara).
> **IDEA DE RONALD PARA EL TEMA 1 (08-10, textual; sin asentar todavía):** el Tema 1 es «Introducción a la estadística en
> ciencias del comportamiento». Quiere «un juego del tipo ir descubriendo… introducirles sin explicar la utilidad… entro y
> cuando termino el juego me doy cuenta de que estadística había sido muy útil, está en todo, no sabía ni para qué servía, todo
> se me quedó jugando, no entiendo a fondo pero sí sé que existe ahora». Pidió **planificar y asentar la idea antes de hacer
> nada.** Pendiente: confirmar la frase de la idea, definir «qué debe quedarse» (5 a 7 ideas), si el tema cuenta para la nota y
> cómo se ve qué aprendió. Después: 2 o 3 formas de juego de descubrimiento (adaptador), y recién ahí referencias y aspecto.
> **DECIDIDO por Ronald (08-10):** cada materia es un juego global repartido en minijuegos, las **islas metafóricas**, cada una con su puntaje sobre 100 y uno
> global al final (él pondera); **el Tema 1 de Psicoestadística Descriptiva probablemente no mide nota** (otros temas o materias pueden sí); **cierra con revelación**;
> la frase de la idea del Tema 1 queda asentada. Regla «la calificación ya está decidida: no se pregunta» escrita en los 7 agentes y en `REGLAS-COMUNES-AGENTES.md`.
> En curso: paso 2 del plan, «qué debe quedarse» (5 a 7 ideas) → `docs/juego/gdd/ideas-psicoestadistica-descriptiva-tema1.md`; después, formas de juego de descubrimiento.
> **DECIDIDO (08-10, Ronald):** el juego **nunca** manda a leer el dossier ni dice «según el dossier»; enseña mientras se juega. Cambia el tercer escalón de la
> escalera de ayuda (hoy «lee la sección del dossier», en `src/lib/juego/escalera.ts` y en el guion de AIEF): pasa a ayuda dentro del juego. **El código existente no se
> toca sin su OK** (afecta `escalera.ts`, `guion-tema1.ts` de AIEF y sus pruebas). Regla en los 7 agentes y `REGLAS-COMUNES-AGENTES.md`.
> **DECIDIDO (08-10, Ronald):** el juego **no enseña software** (ni jamovi, EViews ni menús o comandos). Regla en los 7 agentes y `REGLAS-COMUNES-AGENTES.md`.
> **CONFIRMADO por Ronald (08-10):** cada materia **empieza descubriendo para qué sirve** lo que se verá, ajustado al dossier (la mecánica cambia por materia). Regla en los 7 agentes y `REGLAS-COMUNES-AGENTES.md`.
> **APROBADO por Ronald (08-10):** las **8 ideas del Tema 1** de Psicoestadística Descriptiva en tres momentos (1 Está en todo: los datos están en todas partes, alguien decidió qué contar; 2 Cuidado con los números: con pocos se habla de muchos, importa quién responde, lo que mejora solo, lo que ves no es lo que concluyes, un gráfico miente con datos verdaderos; 3 Sirve para decidir: una decisión con datos le gana a la de «a ojo»; se quita «no todo número se promedia», que va al Tema 2). **Método para todo el juego:** dossier → ideas principales (Ronald aprueba) → formas de juego → su gusto → referencias, aspecto, arte, sonido; también el **Tema 0** para materias sin introducción. Regla actualizada en los 7 agentes. En curso: verificar las 8 contra el dossier y proponer 2 o 3 formas de juego de descubrimiento.
> **AGENTE NUEVO (08-10, pedido de Ronald): `extractor-de-ideas`** (`.claude/agents/`, registrado en `LEEME.md`, etapa **0-bis**): saca las 5 a 8 ideas principales de cada tema y del Tema 0 de cada materia → `docs/juego/gdd/ideas-<materia>-tema<N>.md`; Ronald las aprueba y **el adaptador no propone formas de juego sin ese archivo en «APROBADA»** (regla añadida al adaptador). Así el orden no depende de la memoria de la sesión.
> **Pendiente:** al terminar el adaptador en curso (8 ideas y formas de juego del Tema 1), pasar su lista de ideas a `ideas-psicoestadistica-descriptiva-tema1.md` con estado `APROBADA 2026-10-08` (Ronald aprobó las 8). Y **proponer** a Ronald un candado en el código (como `plan:`/`aspecto:` de `content/islas.ts`) para que `npm test` no deje avanzar sin ideas aprobadas: requiere su OK.
> **ELEGIDO por Ronald (08-10): Tema 1 de Psicoestadística = Forma 1 «La mesa de verificación»** (el alumno verifica afirmaciones en una redacción), con los arreglos del crítico (v12 en `06-revisiones.md`): documentos con señuelos en vez de menú de preguntas, dos medidores (credibilidad y lectores), casos 2/4/5 sin repetir molde, el taller dentro de la redacción, arranque propio con personaje de reserva, revelación en fichas. Las formas 2 y 3 se descartan como forma principal. En curso: ficha corregida → `docs/juego/gdd/00-tema1-forma1-ficha.md`. Siguiente: referencias y aspecto con arte real (director), aprendizaje, bucle, narrativa, crítico.
> **ELEGIDO por Ronald (08-10): aspecto del Tema 1 = Dirección A «La redacción de noche»** (pixel art a color, lámpara y penumbra, PixiJS), **con cara solo para la editora y 3 a 4 personajes principales; el resto en silueta.** Fuente: `docs/juego/gdd/aspecto-psicoestadistica-tema1-propuestas.md`. **Boceto vivo hecho** (`docs/juego/bocetos/motores/aspecto-A/index.html`, Caso 2, arte PROVISIONAL, 4 paquetes Kenney CC0 verificados leyendo su `License.txt`; LimeZu sigue sin confirmar). Ronald: «lo veo bien», pero notó letras que se pierden («Agencia Norte · Caso 2»), un sello tapando el titular y números 25/60 pisados. **Corregido y medido:** nuevo `medir_legibilidad.py` (modo `?medir=1`; probado contra la versión mala: detecta los defectos) y **regla nueva «todo texto que lee el alumno se lee, y se mide»** en `REGLAS-COMUNES-AGENTES.md` y en 7 agentes (no en `disenador-de-sonido` ni `extractor-de-ideas`, que no producen pantallas). Límite dicho: el contraste 4.5 a 1 está en la regla pero **el script aún no lo calcula**; en el boceto se eligió a ojo. Ronald también preguntó por qué «no dice nada»: es esperado, el boceto no tiene textos ni diálogos escritos. Siguiente: aprendizaje, bucle, narrativa y sonido sobre la ficha, luego crítico.
> **Hallazgo de sincronización (08-10, PC RONMARTY):** esta PC estaba 19 commits atrás: `.claude/agents/` (carpeta con punto, no sincroniza por Synology) no tenía las reglas del 08-10 ni `disenador-de-sonido` / `extractor-de-ideas`, mientras `docs/` sí estaba al día por Synology. Se respaldó, se hizo `git pull --ff-only` y se re-aplicó lo de hoy. **Sin commitear todavía.**
> **CORTE / RELEVO (08-10, ~12:25, PC RONMARTY).** Ronald: *«probemos todo con el primer tema de esta materia y vemos qué tal»*; pidió dejar todo escrito para retomar sin el contexto. Hecho hoy en esta tanda: aspecto A elegido y boceto vivo; regla de legibilidad; sincronización de esta PC con GitHub (estaba 19 commits atrás); **aprendizaje del Tema 1 hecho** (`04-aprendizaje.md`); **bucle del Tema 1 lanzado y sin terminar al momento del corte** (`02-bucle-y-mecanicas.md`: verificar en el disco antes de tocar). Sigue: narrativa, sonido, crítico, plan en simple para Ronald, construcción. Detalle y orden exactos en `docs/juego/RETOMAR.md` §4.
> **Dos mejoras a los agentes por casos de hoy (08-10):** (a) en los 7 y en `REGLAS-COMUNES-AGENTES.md`: lo ya decidido no se
> vuelve a preguntar y no se entrega con un ✘ (el director repitió preguntas contestadas y recomendó lo contrario de un plan
> aprobado); (b) en `director-de-juego`: los bocetos de aspecto se hacen con arte real y en el motor propuesto, no con
> rectángulos de código (el boceto A le pareció «un dibujo y ya»).

> **EN CURSO desde 28-09 11:45 (Claude, PC RonMarty): mejorar los agentes antes de probarlos en
> Psicoestadística Descriptiva.** Ronald pausa AIEF (*«al jugar el Tema 1 de AIEF no domino el tema»*) y
> prueba el equipo en una materia que domina. Decisiones suyas del 28-09, que pasan a regla:
> (1) **motor común, juego propio, «como Doom»**: se reutiliza lo invisible (guardado, cuentas, versiones
> por alumno, escalera, registro, cálculos probados); nunca personajes, nombres, diálogos, escenarios ni
> aspecto: cada juego se siente distinto; (2) **Psicoestadística Descriptiva tiene dos juegos, uno por
> carrera**: Psicología ahora; Empresariales después, con su propio dossier. Pasos:
> - [x] a. Rescatado `src/app/juego-aief/piezas.tsx` (piezas del aspecto A: cara con gestos, nota
>   adhesiva, sumadora…): se creó el 28-09 a las 06:24 y **nunca se había subido**; llegó a esta PC sólo por
>   Synology, horas después. Subido sin conectar a la pantalla (nadie lo importa todavía).
> - [x] b. Catálogo `docs/juego/PIEZAS-COMUNES.md`: motor listo (§1), patrones probados (§2), motor
>   todavía atado a una materia (§3: página del docente y resumen sólo leen la planta; la cuenta en
>   pantalla vive en la carpeta de Proyectos II; la sección Jugar toma una isla por materia), contenido de
>   cada juego que no se reutiliza (§4) y cálculos probados por disciplina (§5). Sin nada de una materia en
>   particular: el análisis de cada materia es del adaptador (ver abajo).
> - [x] c. Regla «motor común, juego propio, como Doom» y «un juego por carrera» en los 7 agentes (común),
>   más lo propio de cada uno: adaptador (costo en motor / despegar / nuevo, y en qué se distingue),
>   director (bocetos que no repiten el aspecto de otro juego), bucle (lógica reutilizada, vestida
>   distinta), aprendizaje (patrones probados), narrativa (ningún personaje ni parecido de otro juego),
>   crítico (punto 13). `LEEME.md` (etapa 6 y registro) e IDEA-JUEGO §20.
> - [x] e. Ronald, 28-09: en las sesiones del juego **no se revisan Axiom ni SimuladorPRO** (excepción en
>   `CLAUDE.md`); al empezar, `git pull` y avisar lo que haya sin subir (`CLAUDE.md`, «Antes de hacer
>   cualquier cosa», punto 1); y **cada agente trabaja de cero** (`LEEME.md`): la sesión no le adelanta el
>   análisis de la materia.
> - [x] d. Paso 1 de la materia: ronda 1 del adaptador con Psicoestadística Descriptiva (Psicología), de
>   cero, ya como agente propio → `docs/juego/gdd/00-adaptacion-psicoestadistica-descriptiva-psicologia.md`
>   (6 dossiers leídos enteros, huellas anotadas). Tres marcos: **A «El Observatorio»** (analista de
>   bienestar de una ciudad, mapa con niebla, el censo revela a quién no llegó la ayuda; recomendado),
>   B «La psicóloga del colegio», C «Verificado». Avisa cuatro cosas del dossier (verificadas en el `.tex`:
>   varianza con n − 1 en el Tema 3 y covarianza con N en el Tema 4; Sturges «impar» y ejemplos que no;
>   ficha y dossiers nombran distinto los Temas 4 a 6; R² «explica»). No se tocan desde acá.
> - [x] g. Mejoras a los agentes por lo visto en la ronda 1 (Ronald: «debemos mejorar los agentes mientras
>   hacemos»): **el orden de dictado es un dato** (se busca en el calendario; si no está claro, se pregunta
>   aparte, sin gastar la pregunta de la ronda) y **lo que un tema posterior profundiza se juega allá** (la
>   ronda 1 dio cinco escenas al Tema 1, una introducción; Ronald: «abarca mucho y aprieta poco»). En los 7
>   agentes, más lo propio del adaptador y de progresión; IDEA-JUEGO §21. Ronald también aclaró que el juego
>   no usa los números del dossier: sus inconsistencias sólo importan donde el juego manda a leer una página.
> - [x] h. Bocetos para elegir (Ronald: «esperar bocetos»): el director dibujó dos pantallas por marco
>   (Tema 1 y Tema 4) en `docs/juego/bocetos/psicoestadistica-psicologia-{A,B,C}.html`. El primer intento se
>   trabó sin dejar nada; el segundo, un archivo por marco, salió bien. Recomienda A con personas con nombre
>   de B; ve como punto débil de A que en el Tema 4 el mapa queda de adorno.
> - [x] f. **Ronald eligió (28-09): A «El Observatorio» con personas con nombre de B** («SI, PARECE BIEN»):
>   al tocar una figurita del mapa aparece quién es, con nombre y una línea de su vida. De B no se toma el
>   colegio como único lugar, ni el rol de psicóloga, ni un elenco grande fijo. Preguntó: *«¿estás seguro que
>   es un juego, no sólo un cuestionario bonito? Apliquemos los agentes»*.
> - [x] i. El crítico (`06-revisiones.md` v7): el Tema 1 es juego; del 2 al 6, tal como estaba, cuestionario
>   bonito. **Ronald rechazó su arreglo 1** (llevar la niebla a todos los temas): la niebla es sólo del
>   subtema de muestra; cada tema y subtema tiene su forma de juego (IDEA-JUEGO §22). Los demás arreglos
>   valen. Orden de dictado confirmado: **correlación y regresión antes que probabilidad**. Pasado a los 7
>   agentes: «el marco es el mundo, no una mecánica»; y al adaptador, al bucle y al crítico, los controles
>   del patrón que se aprende una vez, el número de peaje y la frase obvia.
> - [x] j. Ronda 2 del adaptador, con lista de salida → crítico v8 (**dos bloqueos**: subtemas sin lugar y
>   números de peaje; la lista de salida los daba por ✔ sin comprobarlos) → **versión 2.1 corregida**:
>   71 subtemas con lugar, 23 números que escribe el alumno y cada uno cambia algo, secciones de la ronda 1
>   marcadas SUPERADA. Regla nueva en los 7 agentes: un ✔ vale sólo con la prueba contada.
> - [x] k. Ronald **no aprobó** la 2.1: «muy light, muy cerrado… no veo profundidad: media, mediana, moda».
>   Propuso para el Tema 3 tres grupos de forma distinta con conclusiones que se juzgan calculando. Y: «¿qué
>   tal con otros temas que no domino? ¿No deberías haberlo captado? Mejora el agente correspondiente». Hecho
>   (IDEA-JUEGO §23): el de aprendizaje entra en la etapa de materia como revisor experto de la profundidad,
>   antes del crítico; el adaptador, con reglas de profundidad (practicar, hermanos juntos, serie de casos,
>   práctica abierta, y el resumen dice qué se practica y qué cambia por alumno).
> - [x] l. Ronda 3 (profundidad: 32 casos, práctica abierta, el principio de Ronald en todos los temas,
>   ideas propias) → **aprendizaje como experto** (`04-aprendizaje.md`: 91 conceptos, 2 bloqueos, 15 ideas)
>   → 3.1 → **crítico v9** (2 bloqueos: la regla «trampa en toda versión» contaba de más, y la idea «el
>   taller funcionó» enseñaba al revés la regresión a la media; nombres de AIEF) → **3.2 final**. Hubo dos
>   cortes por límite de uso y dos agentes trabados; se retomó verificando el disco cada vez. Una copia en
>   conflicto de Synology (`…_DownloadConflict.md`, 28-09 17:29) sigue en `docs/juego/gdd/`: es una foto
>   vieja sin nada propio; la borra Ronald si quiere.
> - [x] l-bis. **07 y 08-10 (Claude, PC RONMARTY): de la 3.2 a la 3.6, sin ronda nueva.** 3.3: puesta al día con los
>   seis dossiers pulidos del 02 y 03-10. 3.4: corrige la revisión de aprendizaje (`04` «revisión de la maqueta v3.3»: 1
>   bloqueo, 4 importantes, 10 menores). Crítico v10 (`06`): 1 bloqueo (Tema 6 caso 3, la consecuencia enseñaba
>   «asociación que sobrevive al control es causa»), 5 importantes, 6 menores → 3.5. Crítico v11: sin bloqueos, 5
>   importantes (forma «garantizado entre dos temas» hacía dominante «no se puede decir con una recta»; predicción
>   contra nube curva; regla 5 movida al caso 4 y «9 respuestas fijas» mal contadas; márgenes de `versionValida`
>   sin número; turnos sin atar a la versión) → **3.6** (tercios 1000/1000/1000 simulados, 10 respuestas fijas
>   contadas con script, 59 números que decide el alumno). Controles: sin voseo, 0 guiones largos, sin caracteres
>   de control. **Ya pasó por aprendizaje y por el crítico dos veces; sólo falta que Ronald la apruebe.**
>   **Agentes mejorados con lo visto (08-10):** el crítico tiene Bash y recuenta con `.py` (reglas 14 y 15); el
>   adaptador repite la prueba del perezoso tras cada corrección y cita el script de cada conteo; el de bucle,
>   regla 10. Viajan por git, no por `conectar_agentes.py`. **Playground (Google Labs, 07-10):** probado, «no
>   disponible en tu región»; se retoma si abren Bolivia. Nada que construir.
> - [ ] m. **Esperando a Ronald:** que apruebe la maqueta 3.6 (antes decía 3.2). Después: director (visión y aspecto) →
>   crítico → Ronald → progresión → crítico → Ronald. Pendiente de respuesta: sacar el repositorio de Synology.
>   Con su elección, ronda 2 del adaptador (maqueta con las reglas nuevas) y después el director. Queda para
>   cuando se construya: en qué página del sitio va el juego (Descriptiva o EAD-111, el curso que este
>   semestre usa ese material).
>
> Nota de esta PC: `git stash@{0}` guarda el trabajo suelto que había en el disco antes del `git pull` del
> 28-09 (casi todo ya estaba en GitHub; lo único propio es un borrador de escalera de ayuda para la escena
> de Proyectos II). El stash **no viaja** a la otra PC.

> **EN CURSO desde 28-09 (Claude, PC RONMARTY): rehacer la pantalla de «La ventanilla» con el aspecto A**
> que Ronald aprobó («OK» a la pantalla de 1.2 explicada): `01-vision.md` V1.10 (tres franjas: ventanilla
> con cara que reacciona, escritorio con papeles que se tocan, bandeja con libreta, sellos y sumadora;
> manual como hoja inferior con el registro como última pestaña; «se adelanta el tiempo»; pared que se da
> vuelta). Sólo `src/app/juego-aief/` (pantalla y estilos); el motor `src/lib/juego/aief/` no se toca.
> **28-09, después de probarlo en el navegador tamaño celular: a Ronald no le gusta el aspecto** («una
> imagen estática arriba, texto abajo, se ve horrible o muy básico… RECUERDA PLANIFIQUEMOS»). Nunca se
> había planificado cómo se ve. Se le mostraron tres bocetos (A escritorio tipo *Papers, Please*, B escena
> con personajes tipo *Ace Attorney*, C agencia que se recorre); recomendado A con caras que reaccionan de
> B. **Esperando su elección.** Regla nueva en los 7 agentes, `LEEME.md`, `CLAUDE.md` y en el código: el
> aspecto se acuerda al inicio con bocetos y sin `aspecto: "aprobado …"` en la isla ningún juego se publica.
> Con su elección: el director escribe «Aspecto y sensación» en `01-vision.md` y recién ahí se rehace la
> pantalla (el motor y las reglas no se tocan).
> **HECHO 28-09 (Claude, PC RONMARTY): el Tema 1 de AIEF construido según su plan aprobado**, sobre el
> prototipo (se reutilizaron motor de montos y colores, escalera, guardado, cuenta, mostrador, manual y
> registro). Los 13 puntos de `02` B2.10 están hechos: semilla propia de AIEF y escena `tema1-g2` (las
> partidas del prototipo, `tema1`, sólo pruebas, quedan guardadas sin tocar); sin cuenta sólo la partida
> de ejemplo, rotulada «no cuenta para la nota», sin número de versión a la vista y con «jugar de nuevo»;
> sin ✔ de decisiones antes del cierre; 1.3 siempre contraoferta con valor de hoy múltiplo de 500 e índice
> de compra distinto de 100; regla del monto en el manual; escalón (d) en NC y valor de hoy; 1.2 sin
> delatores; hoja de observación y dictamen de tres botones con la página «Calidad»; 1.1 como mostrador;
> las tres prácticas con «se adelanta el tiempo»; textos de `05` v2.1. 3.625 pruebas; jugado entero en
> 375×812 (con errores a propósito, repaso y aprobación) y mirado en 1366×768: sin desborde ni errores.
> **Antes de que cuente para la nota o lo juegue un curso (`02` B2.10, 14 a 16):** más redacciones
> (las de `05` N2.5 ya están cargadas; faltan las de calidad por papel si el crítico lo pide), manual y hoja
> como hojas inferiores con el botón atrás del celular, `/juego-aief` en la precarga sin red, **la hoja del
> docente para la defensa** (página del docente de AIEF, con escalón y puntos por ítem sobre 100). Y el
> crítico sobre lo jugable (etapa 7) antes de mostrárselo a Ronald como terminado. **Hecho (`06` v6):** cumple los 13
> puntos; se corrigieron sus tres arreglos previos a la prueba (línea de cierre de «devolvió uno con observación»,
> aviso «se fue» que quedaba pegado, botón «ANOTAR LA NC») y el repaso de 1.2 pasó a traer el par. **Quedan para
> 14 a 16** (`06` v6): `#v=N` sólo para el docente y la marca de cuenta en la partida local; que una partida local
> más corta no pise la de la nube al volver la red; poder corregir sello y dictamen antes de firmar; manual como
> hoja inferior; dos redacciones que repiten el título de su NC.
> Nota: la ayuda que baja o no la nota (`04` A2.5) no hace falta resolverla ahora: el registro guarda el
> escalón y el puntaje va con la hoja del docente (punto 16). Ronald no quiere preguntas de ponderación.
> **Ronald respondió (27-09):** las características de calidad de la información (1.3) **sí entran al
> juego** (hoja de observación), pero *«se supone que teníamos que planificar»*: **antes de construir
> se le muestra el plan completo del Tema 1 en simple** y lo aprueba. También: la app pasa a llamarse
> **«Aula Virtual»** (recompilada e instalada); **el estilo visual no le termina de gustar** («vamos por
> buen camino»): queda pendiente, sin tocar hasta que él lo pida. En esta sesión los agentes del
> proyecto no estaban cargados (llegaron con el `git pull`): se corrieron como agente general que lee
> y sigue su archivo `.md`.

> Regla pedida por Ronald: si se cortan los tokens, otra IA tiene que poder seguir desde acá sin rehacer nada. Antes de cada paso se actualiza esta lista, y se sube después de cada paso terminado. Al terminar el trabajo entero, pasa a §6 y esta sección queda vacía.

### En curso (26-09): el juego para AIEF, primera isla (decidido por Ronald)

Proyectos II cede el primer lugar a **Análisis e Interpretación de EEFF** (siete temas con dossier
completo; `docs/juego/IDEA-JUEGO.md` §14). Los dossiers se leen de la carpeta de materias de Ronald,
sin subirlos, y se anota su versión. Pasos:

- [x] 1. Regla de **estructura escalable** en `CLAUDE.md` y en los 7 agentes de diseño; sus reglas
  comunes dejan de nombrar a Proyectos II como si fuera la única materia (queda como ejemplo).
- [x] 2. Decisión anotada (IDEA-JUEGO §14 y §15, esta bitácora).
- [x] 3. Adaptador: lee los dossiers de la carpeta de materias sin subirlos y anota su versión en «Dossiers usados» (`scripts/huella-dossier.mjs`, con 4 pruebas; `--comparar` avisa si un dossier cambió). Regla nueva de Ronald en los 7 agentes: **un juego propio por materia** (IDEA-JUEGO §16).
- [x] 4. Ronda 1 del adaptador con AIEF → `docs/juego/gdd/00-adaptacion-aief.md` v1 (7 dossiers leídos enteros, huellas anotadas; tres marcos: **A «La ventanilla»** oficial de créditos, recomendado; B «Caso abierto» perita; C «El mánager de la banda»; con maqueta general, sin fichas). Revisado por el crítico en `06-revisiones.md`: mantiene A con **2 bloqueos** (se gana rechazando a todos; inicio y fin no sobreviven al orden en que se dicta) y 5 importantes. Ambos confirman inconsistencias del dossier de AIEF (IUE 25 % en el Tema 2 y ausente en los casos de los Temas 5 a 7, entre otras): se avisan a Ronald, no se tocan desde acá.
- [x] 5. Marco elegido el 27-09: **A «La ventanilla»** (Ronald delegó: «hacé todo tú»; era el recomendado por el adaptador y el crítico).
- [x] 6. Ronda 2 del adaptador (27-09): maqueta general corregida. Meta de colocación y pared de cartera con tres colores (verde paga, rojo mora, gris = buen cliente rechazado que se va a la competencia; rojo y gris pesan igual), la mitad de las carpetas merecen el sí; orden de piezas según el dictado (Inicio → T1 → T2 → primer encuentro con Don Efraín → T4a → T3 → T4b → T5 → T7 → T6 → Cierre); los números no se arrastran entre piezas; versión mínima jugable: llegada + Tema 1 + Tema 2. Marcado lo que hay que verificar en los dossiers (están en la PC de Ronald).
- [x] 7. Crítico sobre la ronda 2 (06-revisiones v3): **construir con ajustes**. El orden de dictado quedó resuelto; sigue abierta la estrategia dominante (el monto era un sí o no disfrazado, y se podía acertar tanteando con el color). Decidido por delegación de Ronald: tres cifras por carpeta (pide, mínimo que le sirve, puede pagar) con contraoferta calculada y ficha "bien rechazado"; la consecuencia se ve al cierre de la jornada y no se rehace la carpeta; en T1 y T2 la capacidad de pago sale de una regla de la agencia inventada y marcada; la meta es presión de la jefa, no requisito; jornada con cola de clientes. Lecciones pasadas a los agentes (bucle, crítico, progresión, aprendizaje).
- [x] 8a. Código común (27-09): `src/lib/juego/partida.ts` guarda y lee partidas de **cualquier isla y escena** (misma clave `ron-doc-juego:<isla>:<escena>:<versión>`, así lo ya guardado se sigue leyendo); `nube.ts` suma `leerPartidaNubeDe`, `partidaDeFilaDe` y `partidasDelCurso(curso, escena)`; las funciones de la planta quedan con su nombre y usan lo común por dentro. 572 pruebas. (El reintento del guardado al entregar ya existía desde el 26-09: el crítico lo dio por faltante.)
- [x] 8b. Motor de «La ventanilla» (27-09): `src/lib/finanzas/estados.ts` (reexpresión, cascada con IUE al 25 %, patrimonio y patrimonio final, con pruebas) y `src/lib/juego/aief/ventanilla.ts` (monto correcto por las tres cifras, colores del cierre, reglas de la agencia, meta, diagnóstico del monto por error típico, carpetas de los Temas 1.3, 2.2 y 2.3 por versión con la 0 = ficha). Pruebas: las 1.000 versiones válidas, las cuentas de la ficha, números en miles, y **en 500 versiones ninguna estrategia perezosa (lo que pide, cero, el mínimo, la regla de ayer) gana una jornada; quien calcula bien, siempre**. 588 pruebas. Lo del Tema 2 (carpetas 2.2 y 2.3) queda programado y probado pero **sin usar** hasta que Ronald apruebe el Tema 1 (§18 de IDEA-JUEGO: un tema a la vez).
- [x] 8c. **Ronald aprobó la maqueta general de AIEF** («ok», 27-09, después de un resumen simple).
- [ ] 9. **EN CURSO desde 27-09 16:55 (Claude, PC RONMARTY, sesión local):** sólo el Tema 1 jugable (Llegada, 1.1, 1.2, 1.3) en la pantalla de «La ventanilla», web y app; probarlo y mostrárselo a Ronald en su celular antes del Tema 2. Pasos, cada uno se marca al terminarlo:
  - [x] 9a. (hecho: `00-adaptacion-aief.md` R3.2-bis) Verificar en el dossier de AIEF (en esta PC) lo marcado [verificar en el dossier] de las fichas del Tema 1: usuarios de D1 §1.1, lista y títulos de las NC de §1.2, índice de §1.3 (¿UFV?) y páginas para la escalera. Se anota en `00-adaptacion-aief.md`.
  - [x] 9b. (hecho: `tema1.ts`, `guion-tema1.ts` y sus pruebas; decisiones chicas en R3.2-bis) Motor del Tema 1 en `src/lib/juego/aief/` con pruebas: datos de 1.1, carpetas de 1.2, revisores del valor reexpresado y de la NC con su diagnóstico.
  - [x] 9c. (hecho 27-09; jugada entera en 375×812 y 1366×768 con errores a propósito: pistas, escalera, cierre, repaso y aprobación; sin errores de consola ni desborde. **Falta:** página del docente para AIEF, botón atrás de Android y la ficha «bien rechazado» con dibujo propio) Pantalla en `/juego-aief` (borrador): Llegada, jornada del Tema 1, cierre con la pared, repaso; guardado local y en la cuenta. AIEF como materia en `content/materias.ts` con el juego en la isla `aief`.
  - [ ] 9d. Pruebas, voseo, 375×812 y 1366×768; subir; abrirlo en el celular de Ronald.
- [x] 8. Fichas de la versión mínima (Llegada, Tema 1, Tema 2) con los ajustes; después, el código común que falta (registro y nube por isla y escena, escalón "otros números", guardado sin conexión) y la primera escena.

### HECHO 27-09 ~18:15 (Claude, PC RONMARTY): la estructura de entrada (pedido de Ronald)

Ronald abrió la app y vio la portada con la pregunta del Aula de Probabilidad, «Aulas» y «Proyectos»:
*«ya muestra cosas de una materia ni siquiera escogí qué materias ver… no encuentro la sección del juego
ni dónde están mis materias; si no tienes suficiente contenido, aunque sea crea placeholders»*. Cambia
la regla del 14-09 («no se publica nada sin contenido»): **la estructura se muestra entera y lo que
falta dice «En construcción»**. Pasos:
- [x] Inicio que presenta la idea y lleva a **elegir la materia**: las 11 de `content/materias.ts` (se
  sumaron Proyectos II, Modelos de Evaluación, Bolsa de Valores, Gestión de Recursos Microfinancieros y
  Estadística y Análisis de Datos en Psicología, con descripción de una línea; ordenadas por cuánto tienen).
  Cada tarjeta dice qué sección está lista, en prueba o en construcción. Menú: «Materias» y «Proyectos».
- [x] Página de cada materia con **Estudiar · Jugar · Practicar**; Jugar **por temas** (`src/lib/juegos.ts`,
  con pruebas; `content/islas.ts` con `materia` y `temas`; AIEF: sus 7 temas, el 1 con «Jugar (en prueba)»).
- [x] La lechera pasó a la materia Proyectos II (isla `proyectos-ii`); «Administración Financiera» ahora se
  llama «Administración Financiera I» (el slug no cambia).
- [x] Se retiró `/juegos` y el botón «Juegos»; la regla quedó en `CLAUDE.md` y en los 7 agentes.
- Mirado en 375×812: sin desborde; Bolsa de Valores muestra sus tres secciones en construcción.

### Recorrido del estudiante (27-09, acordado como plan final · **para después: ahora el foco es el juego**)

Ronald notó que nunca se había decidido **qué ve un estudiante al abrir la app**. Acordado: se entra
por **la materia** (Inicio «Elige tu materia» → su materia con ESTUDIAR, JUGAR y PRACTICAR); primera
materia completa: AIEF, un tema a la vez. Plan por fases y decisiones abiertas en
**`docs/RECORRIDO-ESTUDIANTE.md`**. **Toda sesión que construya algo para estudiantes lo lee
primero.** La entrada «Juegos» de abajo se retira en la fase 1.

### Entrada «Juegos»: una sección por isla (27-09, hecho · se retira en la fase 1 del recorrido)

Pedido de Ronald: el alumno no tenía por dónde llegar a los juegos. Hecho: página **`/juegos`** con una
sección por isla (`content/islas.ts`: Proyectos II y AIEF, en ese orden) y sus juegos; las islas sin juego
publicado dicen «En construcción». Cada juego lleva `isla` en `content/materias.ts` (sin isla válida el
build se corta, `src/lib/juegos.ts` con 4 pruebas). **Mientras ningún juego esté publicado, `/juegos` es
vista previa del docente** (sin enlaces, `noindex`, muestra también los borradores con un aviso); con el
primer juego sin `borrador` aparecen solos el botón «Juegos» del menú, la tarjeta de la portada y la
entrada del sitemap. Regla pasada a los 7 agentes del juego. 592 pruebas; mirada en 375 px sin desborde.

- **Para la sesión de AIEF:** cuando «La ventanilla» tenga ruta, se registra como herramienta
  `tipo: "juego"`, `isla: "aief"`, `borrador: true`. AIEF todavía no es una materia de
  `content/materias.ts`: hay que sumarla (sin temas; se publica sola cuando el juego deje de ser borrador).

### App de Android: entrar con Google dentro de la app (27-09) · **recompilar**

Google no deja iniciar sesión dentro de la vista web de una app, así que en la app el botón «Entrar
con Google» abre el navegador del teléfono y vuelve a la app por `bo.ronmartinez.aula://login`
(`src/lib/nativo.ts`, el único archivo que habla con la parte nativa; `nube.ts` lo usa sólo si
`esApp()`). Plugins nuevos `@capacitor/app` y `@capacitor/browser`, *intent-filter* en el
AndroidManifest, 4 pruebas nuevas (566). La web no cambia: comprobado que no carga nada de Capacitor.
El nombre de la app pasó a **«Aula Virtual»** el 27-09 (pedido de Ronald; antes «Aula de Probabilidad»): `capacitor.config.ts` y `android/app/src/main/res/values/strings.xml`.

- [x] Código, plugins y manifiesto.
- [x] En Supabase → Authentication → URL Configuration → Redirect URLs: agregada
  `bo.ronmartinez.aula://login` el 27-09 (Claude, con la sesión de Ronald en el navegador interno; quedan 4).
- [x] Recompilada e instalada el 27-09 (Claude, PC RONMARTY) sin abrir Android Studio: `npx cap sync android`, `gradlew assembleDebug` con el Java de Android Studio (`jbr`) y `adb install -r` al teléfono de Ronald por USB. El manifiesto compilado trae el esquema `bo.ronmartinez.aula`.
- [ ] Probar en el teléfono: entrar con Google, elegir la cuenta, volver a la app ya adentro.

### Juego: escalera de ayuda y dominio en la escena de la planta (27-09)

Pieza común `src/lib/juego/escalera.ts` (sirve a cualquier escena de cualquier materia, con pruebas):
error 1 → pista según el error; 2 → pista concreta del socio (qué revisar, sin el resultado); 3 →
"lee en tu dossier" con la página exacta. La escena de la planta la usa en capacidad (D2 págs. 13 a
15), compra (D2 págs. 14 y 15) y recuperación (sin página: el dossier no la trae, sigue la pista
concreta). **Se quitó "seguir sin resolverlo"**: no se avanza sin hacerlo bien. El registro anota el
primer momento en que llegó a cada escalón; las ayudas del formato viejo se siguen leyendo. Falta el
cuarto escalón ("otros números"): necesita que el registro guarde la versión de cada paso. 569 pruebas;
jugada con Playwright: sin errores y sin forma de saltar un paso.

### Pausado (26-09, pedido de Ronald): la adaptación de Proyectos II

Se está mejorando primero la forma de planificar y los agentes. La adaptación queda en la ronda 2
(`docs/juego/gdd/00-adaptacion-proyectos-ii.md`); lo siguiente, cuando Ronald la retome, es la
**ronda 3: sólo la maqueta general** de toda la materia (IDEA-JUEGO §13). Material: dossiers de las
semanas 1 y 2 y el índice, subidos a la sesión (no al repositorio).

### El juego: isla Proyectos II, escena 1 (primero, decidido el 25-09)

**Decisiones de Ronald (25-09):** cuentas con **Supabase** (no el código de entrega recomendado), el mismo proyecto de SIMPRO (perfiles, cursos, inscripciones, Google); primera isla **Proyectos II**; arte **dibujado con código** hasta probarlo con un curso; **el juego va antes** que terminar el simulador (pausado abajo, se retoma cuando una escena necesite VAN o TIR). Idea completa y revisión en `docs/juego/IDEA-JUEGO.md` (§8).

**Pasos:**

- [x] 1. Motor de la escena 1 (`src/lib/juego/planta.ts` + pruebas): la versión 0 es el caso del dossier (720 L/día, tercer tanque 1.080, recuperación 3,1 meses); las versiones 1 a 999 salen con semilla y cumplen las reglas que conservan la lección (fermentación como cuello de botella, la envasadora nueva no suma, el tanque alcanza, recuperación entre 1,5 y 8 meses, errores típicos que no se confunden). Diagnóstico de cada error típico para la pista.
- [x] 2. Escena 1 jugable en **`/juego-proyectos`** (borrador en Administración Financiera, `tipo: "juego"`, `noindex`, fuera del sitemap; con barra en la ruta se rompía la imagen para compartir). Flujo: calcular la capacidad (pista por error típico y, tras dos fallos, la ayuda del socio) → decidir → **calcular cuántas botellas saldrán con la compra antes de firmar** (quien elige la envasadora descubre ahí que no sube; puede cambiar de decisión) → un mes después → con el tanque, **calcular la recuperación** → defensa escrita → registro. Textos en `src/lib/juego/guion-planta.ts` (revisados en 200 versiones: tuteo y sin guiones largos), registro en `src/lib/juego/registro.ts` (guarda sólo lo que hizo el alumno; si estaba bien se recalcula con la versión). Versión por dirección: `#v=333`; sin eso, el caso del dossier. Pixel art con código en `LienzoPlanta.tsx`; letras con `next/font`; colores propios del juego en `juego.css` (excepción a los tokens, contraste medido, el más bajo 5,4:1). Jugada entera con Playwright en 375×812 y 1366×768: sin errores de consola ni desborde, el registro sobrevive a recargar. Detalle pendiente: Press Start 2P no trae "Í" y "DÍA" sale con otra letra.
- [x] 3. Tabla `juego_partidas` **aplicada el 25-09** en el Supabase de SIMPRO (proyecto «proyectos», `syfbgauvictgykdptamb`; estaba PAUSADO por el plan gratis y se reactivó ese día). SQL en `docs/juego/supabase-juego-partidas.sql`. **Falta:** copiarlo al repo de SIMPRO como `supabase/migrations/033_juego_partidas.sql` (a Claude no se le permitió escribir en ese repo).
- [ ] 4. Inicio de sesión y guardar la partida. **Necesita a Ronald:** la URL y la clave pública (anon) del proyecto como variables del deploy de GitHub (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) y `https://ronmarty2.github.io/RON_DOC/` entre las direcciones de regreso permitidas de Supabase. Sin esas variables, el juego sigue funcionando sin guardar (como el modo local de SIMPRO). La versión de cada alumno sale de su id, así el docente la recalcula. **EN CURSO 25-09 (Claude, PC RONMARTY):** ✅ código hecho: `src/lib/juego/nube.ts` (cliente cargado sólo si hay variables, entrar con Google, cursos del alumno, leer y guardar la partida con upsert), `version-alumno.ts` (FNV-1a del id → 1 a 999, con pruebas), `CuentaJuego.tsx` (barra: entrar, curso, «guardado en tu cuenta», entregada = fija y sin «jugar de nuevo»). Sin variables se ve igual que antes. Lo jugado sin cuenta en ese navegador pasa a la cuenta al entrar. Probado con variables falsas: la barra aparece, sin errores de consola. Hecho también: `https://ronmarty2.github.io/RON_DOC/**` en Redirect URLs (Google ya estaba activo), variable `NEXT_PUBLIC_SUPABASE_URL` en GitHub, el deploy ahora pasa las variables al build, y `mantener-supabase.yml` consulta la base cada 3 días para que no se pause. ✅ 25-09: Ronald cargó `NEXT_PUBLIC_SUPABASE_ANON_KEY` (desde la web de GitHub: en el panel de la app no se puede copiar y la terminal de la app no pega en el aviso de `gh`). Comprobado: con la clave anónima la tabla responde `[]` (200) e insertar sin sesión da 401; deploy publicado con la barra «ENTRAR CON GOOGLE»; `mantener-supabase.yml` corrido a mano: respuesta 200. **Falta:** la prueba de punta a punta con una cuenta de Google real (entrar, responder, ver «Guardado en tu cuenta ✔»).
- [x] 5. Página del docente en **`/juego-proyectos/docente`** (sin enlaces, `noindex`): entra con Google, elige uno de los cursos que dicta en SIMPRO y ve cada inscrito (no empezó / en curso / entregada) con una línea de resumen; al abrirlo, su versión y sus números correctos para la defensa, las decisiones, el argumento y cada número escrito con el error típico nombrado. Todo se recalcula desde lo escrito (`src/lib/juego/resumen.ts`, con pruebas); si la versión guardada no es la que le toca a su cuenta, avisa. Consultas en `nube.ts` (`cursosQueDicta`, `partidasDelCurso`), dentro de lo que ya permiten las políticas de SIMPRO. Probada con Playwright contra un Supabase simulado (3 inscritos, una versión cambiada): sin errores ni desborde en 375 px. **Falta:** probarla con la cuenta real de Ronald.
- [ ] 6. Probar con un curso real; después, escena 2 («La cámara de frío que se llenó», Semana 2).

### Simulador de proyectos de SIMPRO dentro de RON_DOC (pausado el 25-09: va primero el juego)

**Pedido (14-sep):** Ronald vio que de SIMPRO sólo había 2 cálculos escondidos en láminas sin publicar y un enlace en "Proyectos", y eligió **"Traer el simulador SIMPRO"**: que sus alumnos armen y simulen un proyecto de inversión (VAN, TIR, flujo de caja, impuestos de Bolivia) dentro de la página, sin cuenta.

**Decisiones tomadas:**

- Ruta `/simulador-proyectos`, tipo `aula`, en **Administración Financiera** (la bitácora de SIMPRO dice que está pensado para "Análisis Financiero" o "Formulación de Proyectos"; moverlo de materia es cambiar una línea en `content/materias.ts`).
- Sin login ni Supabase: el proyecto elegido y los ajustes quedan en el navegador del alumno.
- Se trae el **motor** de SIMPRO, no su interfaz (React + Vite + Supabase, otro stack): la interfaz se escribe acá con el aspecto del sitio y textos en tuteo.
- El motor se copia con `node scripts/traer-motor-simpro.mjs` a `src/lib/simpro/`: archivos idénticos salvo las rutas de import. `--comprobar` dice si SIMPRO cambió. No editar esos archivos a mano.
- Es material de Ronald (su app, sus 27 proyectos de ejemplo), así que se publica sin esperar "publícalas", una vez que funcione completo.

**Números de referencia** (salen del motor; sirven para comprobar que la página muestra lo mismo): Cafetería «Grano Andino» (clave `cafeteria`): inversión 120.000, capital de trabajo 50.000, préstamo 63.000, WACC 11,03%, flujo −122.600 | 45.584 | 43.034 | 57.560 | 73.549 | 195.617, VAN 159.712, TIR 43,1%, recuperación 2,59 años. De las 27 plantillas, 6 no son viables: `muebles`, `lavanderia`, `academia`, `medio`, `solar`, `digitalizacion`.

**Pregunta para Ronald (no se tocó el motor):** el flujo del año 0 ya descuenta el préstamo (es lo que ponen los dueños) y el VAN lo descuenta al WACC. En el enfoque clásico, ese flujo se descuenta al costo del capital propio, o bien se usa el WACC con el flujo sin deuda. Si hay que cambiarlo, se arregla en SIMPRO y se vuelve a copiar.

**Pasos:**

- [x] 1. Motor copiado: tipos, flujo de caja a 5 años con IVA, IT e IUE, indicadores, escenarios, sensibilidad, laboratorio de viabilidad, fábrica de proyectos y las 27 plantillas (17 archivos, 187 pruebas de SIMPRO corriendo en `npm test`).
- [ ] 2. **(en curso)** Página `/simulador-proyectos`: elegir proyecto (27 plantillas por categoría, `PLANTILLAS` y `CATEGORIAS` de `plantillas.ts`) y "así está armado" (inversión por categoría, capital de trabajo, productos, personal, financiamiento).
- [ ] 3. Flujo de caja año 0 a 5 (`construirFlujoCaja` de `flujo-proyecto.ts`): tabla y gráfico de barras calculado.
- [ ] 4. "¿Conviene?": VAN, TIR contra WACC, período de recuperación, IR y RBC, cada uno con su fórmula en KaTeX y qué significa con los números del proyecto.
- [ ] 5. Tres escenarios (`compararEscenarios`, `DEFAULT_OPTIMISTA`, `DEFAULT_PESIMISTA`, `esViable`).
- [ ] 6. Laboratorio: deslizadores de precio, ventas, costos y deuda (`calcularEscenarioLaboratorio`) y cuánto aguanta cada variable (`analizarLimitesViabilidad`).
- [ ] 7. Publicar: herramienta en `content/materias.ts` sin borrador; pruebas de texto (KaTeX, voseo) sobre la página; medir en 375 px; imagen para compartir; anotar en §6, `FUENTES.md` y vaciar esta sección.

---

## 1. Qué es

El aula de las materias que dicta el Mgr. Ronald Martínez Jiménez (Cochabamba): **un libro interactivo por materia**. Toma lo visual de Axiom y el motor financiero de SIMPRO (ver `FUENTES.md`).

- **Publicado:** `https://ronmarty2.github.io/RON_DOC/` (GitHub Pages, se despliega solo con cada push a `main`).
- **Stack:** Next.js 15 exportado a HTML estático, Tailwind 4, KaTeX, vitest. App Android con Capacitor (`LEEME-ANDROID.md`).

## 2. Cómo retomar

0. Leer §0 (trabajo a medio hacer).
1. `git pull` (hay otra sesión trabajando en paralelo, ver §5).
2. Revisar si Axiom o SIMPRO cambiaron: protocolo en `FUENTES.md`.
3. Leer `CLAUDE.md` (reglas de formato, idioma y publicación).
4. Comandos:

   ```bash
   npm install
   npm run dev      # http://localhost:3000
   npm test         # motor de SIMPRO + fórmulas propias
   npm run build    # sitio estático en out/ (y la lista de precarga del service worker)
   node scripts/servir-compilado.mjs   # out/ bajo /RON_DOC/ en :3017, para probar sin internet
   ```

   **Medir si las tarjetas entran:** abrir la lámina en 375×812 y en 1366×768 y pasar `scripts/medir-tarjetas.js` a la consola (o a la herramienta de JavaScript del navegador de Claude Code). Recorre todas las tarjetas y seis rondas de práctica; "problemas" vacío = entra bien. Lo demás (fórmulas, `{,}`, guiones largos, voseo) lo revisa `npm test`.

   Para verlo en el navegador de Claude Code: las configuraciones `ron-doc` (desarrollo) y `ron-doc-compilado` (lo compilado) están en `Pagina personal/.claude/launch.json` (fuera del repo). No correr `next build` con `npm run dev` levantado: comparten `.next`. Para que lo compilado quede igual que en GitHub: `MSYS_NO_PATHCONV=1 NEXT_PUBLIC_BASE_PATH=/RON_DOC npm run build`.

## 3. Estado actual

| Parte | Ruta | Estado |
|---|---|---|
| Portada | `/` | Publicada. Pregunta del Aula, aulas abiertas, "cómo está hecho", proyectos |
| Aula de Probabilidad (Psicoestadística Inferencial, Unidad 2) | `/aula-probabilidad` | Publicada. Scroll, no tarjetas. Con la paleta del sitio desde el 14-sep (neutros); conserva sus colores de bloque y de gráficos. Bitácora: `bitacoras/psicoestadistica-inferencial.md` |
| Materia Psicoestadística Inferencial | `/materias/psicoestadistica-inferencial` | Publicada |
| Proyectos (AXIOM, SIMPRO) | `/proyectos` | Publicada, enlaces reales |
| **Lámina Interés compuesto e inflación** | `/interes-compuesto` | **Borrador sin enlazar**: espera revisión de Ronald |
| **Lámina Cuotas iguales (anualidades)** | `/anualidades` | **Borrador sin enlazar**: espera revisión de Ronald |
| **Lámina Tres formas de devolver un préstamo** | `/amortizacion` | **Borrador sin enlazar**: espera revisión de Ronald |
| **Lámina Bonos: precio, rendimiento y duración** | `/bonos` | **Borrador sin enlazar**: espera revisión de Ronald |
| **Lámina Depreciaciones** | `/depreciaciones` | **Borrador sin enlazar**: espera revisión de Ronald |
| **Hoja de práctica para imprimir** (Matemática Financiera) | `/practica-financiera` | **Borrador sin enlazar**: sale de los mismos generadores que las láminas, así que se publica junto con ellas |
| Muestra del formato (Bayes) | `/muestra` | Sin enlazar, sólo referencia del formato |
| Otras 4 materias | — | "En preparación" en la portada: falta el dossier de cada una |
| Podcasts, tesis | `/podcasts`, `/tesis` | Ocultos (404) hasta que `content/podcasts.ts` o `content/tesis.ts` tengan datos reales |
| Cuaderno de ejercicios LaTeX | `ejercicios/` | Lo trabaja otra sesión (§5) |
| App Android | `android/` | **Sin recompilar** desde los cambios del 14-sep: hay que abrirla en Android Studio y darle Run |

**Criterio de "entra bien"** usado al medir láminas: sin desplazamiento dentro de la tarjeta en 375×812, 1280×720, 1366×768 y 1920×1080. En 360×640 se tolera que la tarjeta se desplace por dentro.

## 4. Decisiones

| Fecha | Decisión | Por qué |
|---|---|---|
| 2026-09-14 | RON_DOC deja de ser "sitio personal con de todo" y pasa a ser un libro interactivo por materia | Todo menos el Aula era `[CONTENIDO PENDIENTE]`: el sitio no tenía idea propia |
| 2026-09-14 | Formato de lámina: tarjetas (`LaminaShell`), no scroll | Probado y aprobado por Ronald en Axiom; mejor en celular y en proyector |
| 2026-09-14 | Paleta, tipografías y KaTeX de Axiom en todo el sitio, con modo oscuro por variables CSS | Axiom es la referencia visual; RON_DOC tenía plantilla genérica y fórmulas armadas a mano |
| 2026-09-14 | Tuteo en todo texto que lee el alumno (web, láminas, cuadernillos) | Los alumnos son de Cochabamba. 384 formas pasadas en 56 archivos |
| 2026-09-14 | Se publica sólo lo que tiene contenido real (`src/lib/publicado.ts`) | Mejor ninguna página que una plantilla vacía |
| 2026-09-14 | "Sobre mí" eliminado | Era todo relleno; si Ronald quiere bio, se escribe con él |
| 2026-09-14 | Motor financiero: copia idéntica de SIMPRO en `src/lib/simpro/`, con sus pruebas | Los números no pueden dar distinto entre las dos apps |
| 2026-09-14 | Lo que SIMPRO no calcula va en `src/lib/finanzas/`, con pruebas propias | Las láminas no hacen cuentas por su cuenta: todo monto sale de una función probada |
| 2026-09-14 | Las láminas que no salen del dossier de Ronald quedan sin enlazar y con `noindex` hasta que él diga "publícala" | Elegido por Ronald: "revisarla primero" |
| 2026-09-14 | La letra de las tarjetas se frena también por la altura (`2vh`) | A 1366×768, típico de proyector, crecer sólo con el ancho desbordaba las tarjetas |
| 2026-09-14 | Trabajar parte por parte sin preguntar, anotando todo en esta bitácora | Pedido explícito de Ronald |
| 2026-09-14 | Una herramienta en borrador se marca con `borrador: true` en `content/materias.ts`, y esa sola marca controla dónde aparece y si se indexa | Publicar tiene que ser un solo cambio, sin olvidar ningún lugar |
| 2026-09-14 | En el Aula, los grises y blancos pasan a los tokens (papel, tinta, borde); los colores con significado (azul, índigo, ámbar, verde, rosa) se quedan | Los neutros eran lo que la hacía parecer otro sitio. Los colores distinguen bloques del recorrido y categorías de los gráficos: pasarlos al terracota y al rojo, que se parecen, borraba información |
| 2026-09-14 | Un gris sin variante `dark:` se convierte igual, salvo fondos blancos o semitransparentes | El primer intento convirtió también un botón blanco sobre azul, que en modo oscuro quedaba ilegible: esos eran iguales en los dos modos a propósito |
| 2026-09-14 | Letra blanca sobre ámbar, verde o rosa medios pasa a un tono más oscuro del mismo color (o letra oscura sobre ámbar) | No llegaban a 4.5:1; el color sigue diciendo lo mismo |
| 2026-09-14 | La práctica de las láminas genera ejercicios nuevos; las opciones incorrectas salen de errores típicos, no del azar | Una sola pregunta por lámina no alcanza para practicar; equivocarse con un distractor con nombre enseña qué se confundió |
| 2026-09-14 | El azar se usa sólo después de un clic; el primer ejercicio es fijo | Si se sorteara al cargar, el HTML del servidor y el del navegador no coincidirían |
| 2026-09-14 | El progreso se guarda en el navegador del alumno (localStorage), no en un servidor | Sin cuentas ni datos personales fuera del celular; si el navegador no deja guardar, la lámina funciona igual |
| 2026-09-14 | La hoja imprimible trae versiones numeradas, no una sola hoja fija | Con otros números por versión, dos alumnos sentados juntos no pueden copiarse; con el número, el docente recupera las respuestas de cualquier versión |
| 2026-09-14 | Imagen para compartir generada por página al compilar, con Noto Sans | Los alumnos reciben los enlaces por WhatsApp: sin imagen el enlace pasa desapercibido. Crimson Pro y Atkinson sólo están en woff2, que el generador no lee |
| 2026-09-14 | Sin internet se guarda todo lo publicado apenas se abre el sitio, no sólo lo visitado | Las láminas se proyectan en aulas sin conexión y el alumno estudia con datos móviles: ~630 kB una vez, a cambio de que funcione todo |
| 2026-09-14 | La lámina retoma sola donde quedó, con un aviso para volver al inicio | Es lo que hace el Aula. Para proyectar en clase desde la misma computadora: el aviso, el primer punto o la tecla Inicio |
| 2026-09-26 | **Un juego por materia, ajustado a ella**: cada materia con su marco propio; lo común es la base técnica (cuentas, versiones, registro, ayuda) | Pedido de Ronald. IDEA-JUEGO §16 y regla común de los agentes de diseño |
| 2026-09-26 | **Primera isla: AIEF** (siete temas con dossier completo); Proyectos II en pausa y su escena queda como demostración. Los dossiers se leen sin subirlos y se anota su versión | Pedido de Ronald: Proyectos II tiene sólo dos semanas de dossier. `docs/juego/IDEA-JUEGO.md` §14 |
| 2026-09-26 | **Estructura escalable, modificable, ampliable sin romper** para todo el proyecto: se crece sumando piezas | Pedido de Ronald. `CLAUDE.md` «Estructura», IDEA-JUEGO §15 y regla común de los agentes de diseño |
| 2026-09-27 | **Un tema a la vez:** se construye y prueba un solo tema; el siguiente, cuando Ronald aprueba el anterior; la maqueta no se da por aprobada sin él | Pedido de Ronald: la ronda 3 de AIEF había juntado Llegada, Tema 1 y Tema 2. IDEA-JUEGO §18 y regla de los agentes |
| 2026-09-27 | Web y app de Android por igual (regla 8 de «Estructura»); lecciones de la revisión de AIEF pasadas a los agentes que corresponden | Pedido de Ronald. `docs/juego/IDEA-JUEGO.md` §17 |
| 2026-09-26 | Primero la maqueta general de toda la materia (inicio, fin, temas orquestados, dependencias sólo si hacen falta); después tema por tema, decidiendo si cada subtema necesita un juego | Pedido de Ronald. `docs/juego/IDEA-JUEGO.md` §13 y regla de los 7 agentes |
| 2026-09-26 | El juego se organiza **por temas** (secciones del Capítulo 4), sin semanas ni duraciones; cada tema se abre cuando Ronald lo habilita | Pedido de Ronald. `docs/juego/IDEA-JUEGO.md` §12 y regla de los 7 agentes |
| 2026-09-26 | Cómo se planifica el juego: diseño inverso, arco de la materia con etapas encadenadas (inicio y fin del mapa de ruta del dossier), dominio antes de avanzar con escalera de ayuda que manda a leer el dossier, tipos de proyecto, decidir lo que el dossier responde; y todo lo decidido se vuelve regla de los agentes | Pedidos de Ronald. `docs/juego/IDEA-JUEGO.md` §11. Marco por defecto: "La planta que levantas" |
| 2026-09-26 | **Marco fijo, modalidad variable:** cada tema o subtema se juega con la modalidad que mejor lo enseña, bajo un mismo marco (mundo, personaje, historia, registro) | Pedido de Ronald: que el juego no se case con un solo tipo. `docs/juego/IDEA-JUEGO.md` §10 y reglas de los 7 agentes |
| 2026-09-26 | Agente `adaptador-de-dossier` como primer paso: dossier → propuestas de juego → conversación con Ronald → recién ahí los demás agentes | Pedido de Ronald. Se detuvo la versión 3 de la visión, que iba antes de ese paso |
| 2026-09-26 | **Juego con sabor a la materia, no materia con sabor a juego:** el dossier es la base de contenido y el juego puede adaptarlo (orden, empresas, personajes, números); conceptos y cálculos siempre correctos y con pruebas | Pedido de Ronald; manda sobre lo anterior del juego. Las láminas mantienen su regla 6. Detalle en `docs/juego/IDEA-JUEGO.md` §9 |
| 2026-09-26 | Equipo de 6 agentes de diseño del juego (director, bucle, progresión, aprendizaje, narrativa, crítico) y el GDD en `docs/juego/gdd/` | Pedido de Ronald: definir primero qué tipo de juego es y su estructura técnica (beat chart, core loop…) antes de seguir construyendo escenas |
| 2026-09-25 | Agentes en `.claude/agents/`, con un registro de origen (nube o PC) y reglas para combinarlos | Ronald creó agentes en la copia vieja de OneDrive, sin subir; Claude irá creando los que haga falta en la nube, y se juntan cuando Ronald esté en la PC sin que uno pise al otro |
| 2026-09-25 | Subir directo a `main` cuando las pruebas pasan, sin preguntar ni PR (anotado en `CLAUDE.md`) | Pedido de Ronald: las sesiones en la nube se quedaban en su rama y lo hecho no se publicaba |
| 2026-09-25 | Juego: cuentas con **Supabase** (el proyecto de SIMPRO), primera isla Proyectos II, arte con código, y va antes que el simulador | Elegido por Ronald. Cambia, sólo para la parte evaluada del juego, la decisión del 14-09 de no tener cuentas: las láminas siguen sin cuentas. Se había recomendado un código de entrega |
| 2026-09-24 | **RON_DOC tendrá un juego**: simulador de gestión con historia, en pixel art, una isla por materia, que **cuenta para la nota** (datos por versión, registro de decisiones, defensa oral como jefe final). No un cuestionario con puntos | Pedido de Ronald; vio la muestra (`docs/juego/valle-escena.html`) y dijo «se ve genial». Detalle y decisiones pendientes en `docs/juego/IDEA-JUEGO.md` |

## 5. Trabajo en paralelo

Otra sesión de Claude (desde claude.ai) trabaja en **`ejercicios/`** (cuadernillo LaTeX de la Unidad 2) y en la bitácora de Psicoestadística Inferencial. Sube por PR (#30, #31 del 14-sep).

- Antes de trabajar: `git pull`.
- No tocar `ejercicios/`, `bitacoras/psicoestadistica-inferencial.md` ni `src/components/aula-probabilidad/` sin necesidad: son su terreno.
- **Aviso para esa sesión (14-sep):** los componentes del Aula cambiaron de clases de color en un solo commit (grises → `bg-tarjeta`, `text-tinta-media`, `border-borde`…, sin sus `dark:`; `font-mono` → `tabular-nums`). Si tenías trabajo del Aula sin subir, al integrarlo usa esos tokens para lo neutro.
- Si un push es rechazado, `git pull --rebase` y volver a subir.

## 6. Registro de cambios

### 2026-09-14

- `bf091f0` Contexto: `CLAUDE.md` y `FUENTES.md` (qué es RON_DOC, protocolo para traer mejoras de Axiom y SIMPRO).
- `ad8ad62` Base visual de Axiom: paleta con modo oscuro, Crimson Pro + Atkinson, `MathText` (KaTeX), `LaminaShell` y dispositivos. Muestra en `/muestra`.
- `6adce43` Tuteo en todo el texto del alumno; PDFs del cuadernillo recompilados (el pie decía "2 / ??").
- `7f1d3a7` Portada nueva y regla de publicación; proyectos reales; "Sobre mí" fuera; título de pestaña sin duplicar.
- `aad4dd6` Motor financiero de SIMPRO copiado con sus 87 pruebas; lámina `/amortizacion`.
- `fc05ce2` Borrados los HTML de relleno de `public/interactivos`; revisión de Axiom (6 commits del banco de exámenes, nada que traer).
- `6e9ca79` Lámina `/interes-compuesto` con `src/lib/finanzas/interes.ts` y sus pruebas; ajustes de alto en `/amortizacion`; esta bitácora y `bitacoras/matematica-financiera.md`.
- `a7dc21e` El deploy corre `npm test` antes de compilar. `sitemap.xml` generado sólo con lo publicado (`src/app/sitemap.ts`); sin `robots.txt`, porque bajo `/RON_DOC/` los buscadores no lo leen.
- `5e1d43e` Lámina `/anualidades` con `src/lib/finanzas/anualidades.ts` y pruebas (103 en total, una contra la cuota francesa de SIMPRO). Cadena interés compuesto → anualidades → amortización. La cuota pasa a llamarse $R$ en todas las láminas.
- `6c99ee2` Lámina `/bonos` con `src/lib/finanzas/bonos.ts` (precio, rendimiento al vencimiento por bisección, duración de Macaulay y modificada) y pruebas (110 en total). Pie de las láminas en un solo renglón.
- `3853c09` Lámina `/depreciaciones` con `src/lib/finanzas/depreciacion.ts` (lineal con el motor de SIMPRO, suma de dígitos, porcentaje fijo, fondo de amortización) y pruebas (121 en total). Con esto están las cinco láminas del temario de Matemática Financiera.
- `b6e0ebe` Publicación de Matemática Financiera preparada: las cinco láminas están en `content/materias.ts` con `borrador: true`, que decide a la vez portada, página de materia, sitemap y `noindex`. Varias láminas se muestran como lista numerada (`ListaLaminas`). Probado quitando las marcas en local y vuelto a poner.
- `86b5cb6` Accesibilidad de las láminas: fórmulas con MathML para lectores de pantalla; la etiqueta de cada tarjeta es título (`h2`); al cambiar de tarjeta se anuncia sólo "Tarjeta n de N" en vez de leer la tarjeta entera; el foco no se mueve, para no obligar a volver a buscar el botón.
- `6aec37f` De Axiom: `parsearMath` en `src/components/math-parse.ts` con sus 10 pruebas, y `**negrita**` dentro de MathText (131 pruebas en total).
- `6771f61` El Aula de Probabilidad pasa a la paleta del sitio: 683 clases de gris y blanco a tokens y 609 variantes `dark:` que sobraban, en 21 archivos; etiquetas en Atkinson en vez de monoespaciada. Verificado midiendo el contraste de todo el texto en los 11 apartados, claro y oscuro: 0 por debajo de lo legible, después de corregir 7 casos (letra blanca sobre colores medios y una indicación en gris muy claro). Sin desbordes en 375 px.
- `8469c68` **Práctica ilimitada** en las cinco láminas de Matemática Financiera: el primer ejercicio es el escrito a mano y "Otro ejercicio" genera uno nuevo con otros números (`src/lib/finanzas/ejercicios.ts`, dos tipos por tema). Cada distractor es un error típico con nombre. Marcador de aciertos. `src/lib/formato.ts` junta el formato de montos. 165 pruebas: 2.000 ejercicios generados verifican 4 opciones distintas, explicación con el resultado y fórmulas sin error de KaTeX.
- `e44e01a` **Progreso del alumno** guardado en su navegador, sin cuentas (`src/lib/progreso.ts`, con pruebas): la lámina se abre en la tarjeta donde quedó, con el aviso "Seguiste donde quedaste · Volver a la primera tarjeta" en el lugar del pie; los puntos marcan las tarjetas ya vistas; los aciertos de la práctica se suman entre visitas; la lista de láminas muestra "Viste 9 de 12 tarjetas · 2 de 3 ejercicios bien" o "✓ Vista entera". Inicio y Fin del teclado (o del control de presentación) saltan a la primera y la última tarjeta. Si la lámina cambia de largo, no retoma. 173 pruebas.
- `ffd6841` **Sin internet de verdad.** El service worker guardaba sólo el HTML de `/` y `/aula-probabilidad/`: sin conexión la página se veía pero no respondía (faltaba el JavaScript). Ahora `scripts/precarga-sw.mjs` corre después de `npm run build`, toma las páginas del sitemap (sólo lo publicado: una lámina entra sola al publicarla) y les suma el JS, el CSS y las fuentes que cargan, sin woff/ttf ni las variantes de vietnamita y latín extendido. La versión del caché es una huella del contenido: si algo cambia, el teléfono renueva todo. Hoy: 4 páginas y 37 archivos, unos 630 kB por la red más el HTML (JS 218, CSS 18, fuentes 397). Probado con `scripts/servir-compilado.mjs`: portada abierta con red, servidor apagado, el Aula (nunca visitada) abrió, respondió a los clics y cargó sus fuentes. Se verificó también que todo lo que pide la lámina de Bonos, práctica incluida, está en la lista. Si el sitemap y `out/` no cuadran, la compilación falla. 179 pruebas.
- `67eadbe` **Control automático antes de publicar.** `src/app/laminas.test.tsx` abre las seis láminas sin navegador y revisa **todas** las tarjetas (el HTML compilado sólo trae la primera): fórmulas sin error de KaTeX, decimales con `{,}` dentro de las fórmulas, sin guiones largos y sin voseo (lista de formas inequívocas). La lámina tiene que terminar en "Practícalo tú". Una prueba con errores puestos a propósito confirma que los controles detectan. Corre en el deploy: si falla, no se publica. Para lo que sólo mide un navegador, `scripts/medir-tarjetas.js`: medidas hoy las cinco láminas en 375×812 y 1366×768, todas entran, práctica incluida (y en 360×520 avisa 24 desbordes, o sea que mide). `vitest.config.mts` con los alias `@/` y `@content/`. 385 pruebas en total (206 de las láminas).
- `2691af7` **Vista previa al compartir.** Al pegar un enlace en WhatsApp no salía imagen (no había `og:image`) y las láminas mostraban el nombre del sitio en vez del suyo. Ahora `src/app/compartir/[imagen]/route.tsx` genera al compilar un PNG de 1200×630 por página (portada, proyectos, cada materia y cada aula o lámina: `out/compartir/<clave>.png`), con los colores del sitio, el título, la descripción y los puntos de las tarjetas. Los textos salen de `content/materias.ts`. Las láminas usan `metadataDeHerramienta(href)` (título, descripción, imagen y `noindex` si es borrador). Se descartó el `opengraph-image` de Next: sale sin extensión y con `metadataBase` duplicaba `/RON_DOC/`. La letra es Noto Sans (viene con Next): las serif disponibles sin bajar archivos, las de KaTeX, no tienen tildes ni eñe. 389 pruebas.
- `b01d881` **Hoja de práctica para imprimir** (`/practica-financiera`, borrador). Elige temas (los cinco de las láminas) y de 1 a 4 ejercicios por tema; cada **versión** (1 a 9.999) da otros números, siempre los mismos para el mismo número, y los ajustes viajan en la dirección (`#v=4821&t=anualidades,bonos&n=3`), así un enlace guardado reproduce la hoja. Alterna los dos tipos de ejercicio de cada tema (los generadores aceptan `tipo`). Al imprimir sale sólo la hoja en A4, con Nombre y Fecha, espacio para calcular y la hoja de respuestas explicada en página aparte; en modo oscuro también imprime tinta negra sobre blanco (`@media print` en `globals.css`, que además oculta encabezado y pie en cualquier página). Verificado imprimiendo a PDF con Edge sin ventana. `src/lib/finanzas/hoja.ts` con pruebas; las hojas de 40 versiones pasan los controles de fórmulas, `{,}`, guiones largos y voseo (detectores ahora en `src/lib/revision.ts`). Nuevo tipo de herramienta `hoja` (tarjeta "Hoja de práctica para imprimir · Armar la hoja"). 435 pruebas.
- *(este commit)* **Rendimiento medido, sin cambios.** JavaScript comprimido por página (sin los polyfills, que sólo bajan navegadores viejos): portada 106 kB, Aula 178 kB, lámina 194 kB. La base de React y Next son 99 kB en todas; lo propio de la lámina son 75 kB de KaTeX. KaTeX tiene que ir en el navegador porque la práctica y el laboratorio arman fórmulas nuevas al tocar; cargarlo aparte rompería la primera tarjeta, que llega armada desde el servidor. Con la precarga, además, se baja una sola vez. Revisión de Axiom y SIMPRO: sin commits nuevos.

### 2026-09-24

- `3ca2ed3` **Idea del juego registrada**, sin tocar el sitio: `docs/juego/IDEA-JUEGO.md` (qué pidió Ronald, la idea, cómo cuenta para la nota, tamaño, decisiones pendientes, de dónde salen los casos) y `docs/juego/valle-escena.html` (muestra jugable de la escena 1, «La máquina que no alcanzaba», con Lácteos Valle Alto). Hecho desde la PC de Ronald; se retoma online.

### 2026-09-25

- *(este commit)* **Revisión del juego, sin construir todavía:** `docs/juego/IDEA-JUEGO.md` §8 (la versión de la muestra es de adorno, la decisión queda resuelta al calcular, pistas atadas a una versión, números fuera de funciones probadas, fuentes de internet) y recomendación de **código de entrega** en vez de cuentas. **De Axiom:** el detector de voseo pasa a generar las formas desde infinitivos, con los imperativos con pronombre pegado ("sumale", "resolvelo") y verbos de finanzas (`src/lib/revision.ts`); barrido de 157 archivos: el sitio está limpio, quedan 2 en `ejercicios/LEEME.md` (terreno de la otra sesión). 536 pruebas.
- *(este commit)* **Juego, paso 1:** decisiones de Ronald anotadas (§0 y §4), motor de la escena 1 con versiones (`src/lib/juego/planta.ts`, 10 pruebas que recorren las 999 versiones) y borrador de la tabla de partidas para Supabase. 546 pruebas.
- *(este commit)* **Juego, paso 2:** escena 1 jugable en `/juego-proyectos` (borrador). El detector de voseo pasa a una sola expresión compilada (la suite tarda la mitad). 551 pruebas.

### 2026-09-25 (tarde)

- *(este commit)* **Juego, paso 5:** página del docente `/juego-proyectos/docente` con el resumen recalculado de cada partida del curso. 558 pruebas.

## 7. Qué sigue

**Agentes: fusión PC + nube hecha el 26-09.** En la copia sincronizada de la PC no había `.claude\agents\`: el único agente de la PC era `revisar-publicacion` (skill en `.claude\skills\`), que pasó a `.claude/agents/` con su script en `scripts/revisar-publicacion.mjs` y quedó en el registro. La copia de trabajo con git en la PC es `C:\Users\lmigu\RON_DOC_trabajo` (fuera de la sincronización, porque git y Synology se pisan); ya no hace falta otro clon.

**El juego:** en curso, ver §0 (decidido el 25-09). La gamificación vieja de la copia de OneDrive **no se subió**: ver §7 del documento.

**Se puede hacer sin Ronald** (en este orden):

1. Probar las láminas con un lector de pantalla real (TalkBack en Android): la accesibilidad se verificó por estructura, no escuchándola.

**Decisiones de Ronald que mejorarían mucho:** dominio propio (la dirección de GitHub Pages es difícil de recordar); contar visitas (requiere un servicio externo: decisión de privacidad); Aula en tarjetas o scroll.

**Cuando Ronald diga "publícalas":** en `content/materias.ts`, dentro de Matemática Financiera, borrar las seis líneas `borrador: true,` (cinco láminas y la hoja de práctica) y subir. Nada más: portada, página de la materia, sitemap e indexación se ajustan solos.

**Necesita a Ronald:**

- Revisar `/interes-compuesto`, `/anualidades`, `/amortizacion`, `/bonos`, `/depreciaciones` (notación, ejemplos, orden) y la hoja `/practica-financiera`, y decir "publícalas".
- Pasar el dossier de la próxima materia.
- Probar una lámina proyectada en clase.
- Recompilar la app Android en Android Studio.
- Decidir si el Aula de Probabilidad pasa a tarjetas.
- Opcional: bio, podcasts reales, cifras de tesis.
