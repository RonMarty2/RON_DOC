# Piezas comunes del juego: el motor y lo que es de cada juego

> Lo leen **todos los agentes de diseño antes de proponer** y Claude antes de construir. Se actualiza en
> el mismo commit en que se crea, se despega o se retira una pieza. Estado al **28-09-2026**.

## La regla: motor común, juego propio (Ronald, 28-09, «como Doom»)

*«Al crear un juego puedes hacer como Doom: podemos cambiar personajes, diálogos, pistolas, escenarios,
volverlo otra cosa diferente, pero hay cosas que reutilizamos… cuidado reutilices los diálogos o
personas… cada juego debe sentirse diferente.»*

Con el motor de *Doom* se hicieron decenas de juegos distintos. Todos usaban el mismo **motor**, la
parte invisible que mueve el juego. Cada uno ponía su **contenido**, que es lo que el jugador ve y
recuerda. Acá es igual:

| Se reutiliza: el **motor** (se importa, nunca se copia) | No se reutiliza: el **contenido** (cada juego el suyo) |
|---|---|
| Guardar y leer partidas, en el navegador y en Supabase | Personajes, nombres, caras concretas |
| Cuentas con Google, cursos, inscripciones | Diálogos, frases, chistes, muletillas |
| La versión de cada alumno (que no se pueda copiar) | Escenarios, lugares, empresas, casos |
| La escalera de ayuda (qué escalón toca) | El aspecto: paleta, dibujos, pantallas, sonidos |
| El registro para la nota y la página del docente | El marco, el rol del jugador, el gancho |
| Los cálculos probados de cada disciplina | Los textos de pistas, avisos y consecuencias |
| La sección Jugar, los candados, la app de Android | |

**La zona gris: la técnica se reutiliza, la pieza no.** Dibujar pixel art con rectángulos en una
grilla, o hacer que la cara de una persona salga de su nombre con cinco gestos, es **técnica**: se toma.
La cara de Doña Nieves o el escritorio de La ventanilla son **piezas de AIEF**: en otro juego se dibujan
de nuevo, con el aspecto que Ronald aprobó para ese juego. Con las **modalidades** pasa lo mismo: la
lógica de una mecánica (una cola de casos que se deciden, una cadena de etapas con un cuello de botella)
puede volver en otra materia **sólo si es la que mejor enseña ese tema**, y vestida con el mundo del juego
nuevo. Si un alumno que jugó los dos siente que es el mismo juego con otro nombre, no pasa.

**Reutilizar no baja la vara.** La modalidad la elige lo que mejor enseña; reutilizar sólo decide entre
opciones que enseñan igual de bien, y abarata lo que se construye. Si la mejor opción necesita una pieza
que no existe, se construye **como pieza de motor** (recibe la isla y la escena como dato, con sus
pruebas) y se suma a este catálogo: así la paga una materia y la aprovechan las siguientes.

---

## 1. Motor listo para usar (se importa tal cual)

| Pieza | Dónde | Qué hace | En un juego nuevo |
|---|---|---|---|
| Partidas | `src/lib/juego/partida.ts` | Guarda y lee la partida de **cualquier** isla y escena; clave `ron-doc-juego:<isla>:<escena>:<versión>` | Define su `Escena` y su tipo de eventos; usa `partidaNuevaDe`, `anotarEn`, `leerPartidaDe`, `guardarPartidaDe` |
| Nube | `src/lib/juego/nube.ts` | Cuenta de Google (web y app), cursos, partidas en la tabla `juego_partidas` | Usa las funciones terminadas en `…De` y `guardarPartidaNube`; `partidasDelCurso(curso, escena)` pasándole su escena |
| Versión por alumno | `src/lib/juego/version-alumno.ts` | La misma versión para la misma cuenta, en cualquier celular | `versionDeAlumno(id, "<isla>:<tema>")`: **siempre** con semilla propia |
| Sorteo con semilla | `azarConSemilla` en `src/lib/finanzas/ejercicios.ts` | Números al azar repetibles | Sirve para cualquier materia, aunque viva en `finanzas/` |
| Escalera de ayuda | `src/lib/juego/escalera.ts` | Qué escalón toca después de N errores (pista, concreta, leer) y qué se muestra | Cada paso define su `AyudaDePaso`; el escalón «otros números» lo resuelve cada juego (§2) |
| Sección Jugar y candados | `content/islas.ts`, `src/lib/juegos.ts` | Temas de la isla en la página de la materia; sin plan aprobado o sin aspecto aprobado, no se publica | Isla nueva = una entrada en `ISLAS`; escena nueva = una herramienta `tipo: "juego"` |
| App de Android | `src/lib/nativo.ts` | `esApp()` y el ingreso con Google fuera de la vista web | Nada: lo usa `nube.ts` |
| Revisión de textos | `problemasDeTexto` en `src/lib/revision.ts` | Voseo, guiones largos, KaTeX roto | La prueba del guion de cada tema la corre sobre todos sus textos |
| Formato | `src/lib/formato.ts` | `bs`, `pct`, `tex` | Tal cual |

## 2. Patrones probados (la forma se repite; el código es de cada juego)

- **Versiones:** la 0 es el ejemplo de la ficha; las demás salen con semilla y `versionValida` rechaza
  las que rompen la lección. La prueba recorre las 1.000. Ejemplos: `planta.ts`, `aief/ventanilla.ts`.
- **Diagnóstico por error típico:** `erroresTipicos…` calcula el número que da cada error; `revisar…`
  o `diagnostico…` lo reconoce y la pista responde a ese error, no a uno genérico.
- **Prueba del alumno perezoso:** en 500 versiones, ninguna estrategia sin entender (siempre sí, cero,
  lo que pide, al azar) gana. Ejemplo: `aief/ventanilla.test.ts`.
- **Partida reconstruida desde sus eventos:** se retoma donde quedó y el docente recalcula todo desde el
  registro, sin confiar en lo guardado. Ejemplo: `aief/tema1.ts`.
- **Práctica sin nota, después con nota:** la práctica muestra la consecuencia en el momento; lo que
  cuenta se corrige al cierre. Ejemplo: `aief/tema1.ts`.
- **Escalón «otros números»:** pasado «leer», un fallo más cambia el caso (en AIEF, el cliente se va:
  `FALLOS_HASTA_QUE_SE_VA`). Cada juego lo cuenta con su mundo.
- **Guion aparte del motor:** los textos viven en `guion-*.ts` y se prueban con `problemasDeTexto`.
- **Escena nueva sin pisar partidas viejas:** si cambia el sorteo, la escena cambia de nombre
  (`tema1` → `tema1-g2`) y lo guardado antes se sigue leyendo.

## 3. Motor todavía atado a una materia (sirve, pero hay que despegarlo antes)

| Pieza | Dónde | Qué la ata | Para despegarla |
|---|---|---|---|
| Página del docente | `src/app/juego-proyectos/docente/PanelDocente.tsx` + `src/lib/juego/resumen.ts` | Sólo lee la planta de Proyectos II. AIEF todavía no tiene la suya | Que el resumen reciba la escena y su función `describir` |
| Registro de la planta | `src/lib/juego/registro.ts` | El nombre es general, el contenido es de Proyectos II | Nada: cada juego tiene el suyo; no confundirlo con motor |
| Cuenta en pantalla | `useCuenta`, `BarraCuenta` en `src/app/juego-proyectos/CuentaJuego.tsx` | Es motor, pero vive en la carpeta de Proyectos II (AIEF la importa de ahí) | Pasarla a `src/components/juego/` cuando un juego nuevo la use |
| Funciones de la planta en la nube | `leerPartidaNube`, `partidaDeFila`, el valor por defecto de `partidasDelCurso` | Suponen la escena de la planta | Usar las versiones `…De` |
| Tope de versiones | `version-alumno.ts` toma `VERSION_MAXIMA` de `planta.ts` (999) | Funciona para todos, pero depende de un archivo de Proyectos II | Pasar el 999 a `partida.ts` cuando se toque |
| Sección Jugar | `juegoDeMateria` en `src/lib/juegos.ts` | Toma **una** isla por materia | Para un juego por carrera: un dato de carrera en la isla y que la sección Jugar muestre los dos (suma: los juegos que existen no cambian) |

## 4. Contenido de cada juego (no se reutiliza)

| Juego | Su contenido (nada de esto aparece en otro juego) |
|---|---|
| Proyectos II · «Valle de los Proyectos» | Lácteos Valle Alto, Don Mario; el dibujo de la planta y del Tunari (`LienzoPlanta.tsx`); `guion-planta.ts`; los datos de `planta.ts` |
| AIEF · «La ventanilla» | La agencia de créditos, Doña Nieves, Doña Rosa y los clientes de `aief/tema1.ts`; Don Efraín y los demás de `05-mundo-y-narrativa.md`; el aspecto A (escritorio tipo *Papers, Please*): `Mostrador.tsx`, `piezas.tsx` (caras, cola, pared, calendario, nota adhesiva, sumadora), `ventanilla.css`; `aief/guion-tema1.ts` |
| Psicoestadística Descriptiva (Psicología) · «La mesa de verificación» (Tema 1) | El Departamento de Orientación de un colegio, de noche, la víspera del consejo (el jugador es el psicólogo del colegio); la jefa Lic. Ximena Rocabado, el docente «a ojo» Beto Salvatierra, el director Ugarte, la señora Quiroga (llamada), Dani (practicante de psicología, silueta; el nombre cambia por versión), la profesora Camacho, la tallerista Paola, la consultora externa *Horizonte*; pools de colegios (Santa Lucía, Los Pinos, San Martín de la Loma, Villa Esperanza; vecinos San Rafael, Monte Verde, Nuevo Amanecer, Los Cedros), de fuentes (Dirección Distrital Meridiano, Red Escolar Corriente, Observatorio Brújula, Programa Cuadrante) y del archivador de expedientes (San Ignacio, Alborada, Santa Clara, Las Palmas, Los Álamos, Alto Verde); `05-mundo-y-narrativa.md` sección «Tema 1 · narrativa v1» |

Un juego nuevo **no usa** estos nombres, personajes, frases ni dibujos, ni «parecidos» (otra agencia,
otra jefa que se asoma). El crítico lo revisa.

## 5. Cálculos probados que existen, por disciplina

| Disciplina | Dónde | ¿Con pruebas en `npm test`? |
|---|---|---|
| Finanzas | `src/lib/finanzas/` (interés, anualidades, bonos, depreciación, estados financieros) y el motor de SIMPRO en `src/lib/simpro/` (no se edita: ver `FUENTES.md`) | Sí |
| Probabilidad | `src/components/aula-probabilidad/calculos.ts` | No: está atado al dataset del Aula y se verifica en el navegador (`verificarVerdades`). Se puede tomar la fórmula; el dataset y su caso son contenido del Aula |
| Otras disciplinas | No hay | No hay |

Un juego que necesite cálculos de una disciplina sin fila acá los construye como motor, con sus pruebas,
y suma la fila.

## Cómo se mantiene

- Quien **construye** (etapa 6) y crea algo que otro juego podría usar: lo pone como motor (recibe la
  isla y la escena como dato, con pruebas) y lo anota en §1 en el mismo commit.
- Quien **despega** una pieza de §3 la pasa a §1.
- Quien **agrega un personaje, un escenario o un aspecto** lo anota en §4, en la fila de su juego.

## Audio: precarga y caché (09-10)
`Motor.precargar()` (`src/lib/juego/sonido/motor.ts`) baja las pistas al abrir la pantalla y `public/sw.js` las guarda en la caché `ron-doc-audio-v1` (solo `.mp3`; sin `Range`; no se borra al publicar). Lo usa cada juego desde su enganche de sonido. Una pista nueva o cambiada lleva otro nombre de archivo.

## Ambiente vivo (09-10)
La hora de la historia, la luna y las ventanitas de la ciudad salen de `src/lib/juego/ambiente-vivo.ts` con un perfil por tema (el del Tema 1 de Psicoestadística: `psicoestadistica/hora-historia.ts`). El dibujo en PixiJS está hoy en `EscenaPixi.tsx` y se extrae a una pieza común cuando entre el segundo juego.

## Antes de dar algo por publicado
Mirar que el deploy de GitHub (`Deploy a GitHub Pages`) haya terminado en verde: el 09-10 estuvo fallando desde las 07:11 (Node 20 en el workflow, el proyecto exige 22) sin que se notara, y la app seguía mostrando la versión vieja.
