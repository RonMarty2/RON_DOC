# 02 · Bucle y mecánicas

Agente: `disenador-de-bucle`. Cada sección nueva va arriba, con su versión y fecha.

## Decisiones pendientes de Ronald

1. **Ninguna nueva en esta ronda (v2 del Tema 1).** La única abierta que toca esta parte es la de
   `04-aprendizaje.md` sobre la ayuda y la nota (A2.5); la mecánica funciona igual con cualquiera de las
   dos respuestas, porque el registro guarda el escalón de cada ítem.

~~Si la calidad entra al juego~~ **Decidido por Ronald (27-09): entra.** B1.6 deja de ser «si Ronald
aprueba»; su versión vigente es B2.5.

Si no dices otra cosa, lo demás queda como propuesta por defecto y pasa a narrativa (etapa 4) y al crítico
(etapa 5) antes de mostrártelo.

---

<!--T1V2-INICIO-->
## Psicoestadística Descriptiva (Psicología) · Tema 1 «La mesa de verificación» · bucle y mecánicas · versión 2 (RECONSTRUIDA) · 08-10-2026

> **Por qué dice «reconstruida».** La v2 que revisaron el crítico v14 (simulación) y v15 (narrativa y sonido) se escribió el 08-10 en una sesión cuyos archivos nunca llegaron a este disco ni a GitHub (`RETOMAR.md`, nota de la alerta; `06-revisiones.md`, nota final de la entrada v15). Esta sección la **rehace** desde lo que sobrevivió: la v1 de abajo, la ficha `00-tema1-forma1-ficha.md`, las entradas v13, v14 y v15 de `06-revisiones.md` y la narrativa v3 de `05-mundo-y-narrativa.md` (NT1.6 con las reacciones de cada caso y sus efectos, NT1.7 con los 30 sobres, NT1.8 con los 8 expedientes, NT1.9 con las 71 ramas y NT1.11 con los 20 ajustes). **No se inventó ninguna cifra:** cada número sale de una de esas fuentes o de una cuenta hecha con script (`scripts-t1/`). Lo que no se pudo recuperar queda marcado **[RECONSTRUIR: falta X]** y se junta en la secc. 16.
> **Qué comprueba el reconstruido.** Las tablas de esta sección, jugadas con un simulador nuevo (`scripts-t1/simular_t1_v2.py`), dan la **mejor política que nunca abre un papel en 5,0 %**, contra el 4,8 % que midió el crítico v14 con el original, y las mismas cotas exactas (E-S1: 64 < 65; aumentos posibles 29; quien entiende suma 64 de Credibilidad y 31 de Voz). Eso es lo que sostiene que las tablas son las mismas (secc. 11.5). Los conteos que el crítico v14 hizo (46 filas de efecto, 29 códigos, 17 cambios, 15 ajustes, 12 reglas G, 14 mecánicas) salen aquí con `scripts-t1/contar_t1_v2.py`.
> **Estado:** entrega de la etapa de bucle para que el crítico la vuelva a revisar. Autor: diseñador de bucle (reconstrucción). **Sin nota** en este tema (decidido; no se pregunta): lo que se guarda es registro.
> **Las tres líneas del oficio** (regla «El juego se hace para el oficio de la carrera»). (1) Carrera del alumno: Psicología (documento de la materia `00-adaptacion-psicoestadistica-descriptiva-psicologia.md`). (2) Qué hace un profesional de esa carrera: el psicólogo o la psicóloga de un colegio recibe informes, oficios, actas y frases dichas en reuniones («los estudiantes duermen poco», «subió la ansiedad», «el taller funciona») y dice qué se puede afirmar con los datos del colegio. (3) Papel del jugador: **psicólogo o psicóloga del Departamento de Orientación**, la víspera del consejo de profesores (narrativa v3). ¿Lo haría un profesional de la carrera? Sí.
> **Parte de:** las 8 ideas APROBADAS, la ficha ELEGIDA (las cifras de la ficha mandan salvo donde la secc. 14 dice que este documento las ajusta), el aprendizaje `04-aprendizaje.md` y el aspecto A «La redacción de noche» (luz de lámpara, pixel art a color; el lugar pasó a ser el Departamento de Orientación, el aspecto no cambió). Nada de eso se reabre.
> **Decisión abierta de Ronald (con valor por defecto aplicado, no bloquea):** la meta del cierre. El crítico v14 (hallazgo 1) midió que con 65/65 pasa 61,7 % quien abre 3 papeles al azar y se cubre con lo intermedio, y 67,4 % quien entiende con p = 0,50. **Valor por defecto: dejar 65/65** y medir con alumnos reales; subir a 70/70 es un solo número en `reglas-t1.ts`. Es lo único que cambia el último diálogo («plaza fija») y el registro; no hay nota.
> **Vocabulario de la narrativa v3 (los números y las reglas no cambian):** Lectores se llama **Voz**; «publicar tal cual» es **«Firmar tal cual»**; «armar la frase/el titular/el rango» es **«Redactar»**; «retener» es **«Frenar»**; la editora es **la jefa del Departamento**; la mesa fija es **«plaza fija»**; el archivo de La Pizarra es **el archivador de expedientes**; los recortes de portada son **tarjetas del panel de acuerdos**. Los ids (G, P, R, E, V, M) no cambian. Las «fichas de tiempo» siguen siendo fichas; las ocho de la revelación se llaman **cartas** aquí (hallazgo C7 de v15: unificar en 04, 05 y 07).
> **Dónde se juega qué:** cada mecánica vive en un solo caso (nada se estira a otro tema). Dos piezas nacen como motor porque el Tema 6 las va a necesitar: la carpeta de papeles con presupuesto y el armador de frases por piezas.

**Palabras de oficio, una línea cada una:**
- **Evento:** un hecho guardado de la partida («abrió el papel 3», «escribió 7»); desde los eventos se reconstruye todo, incluso el registro.
- **Semilla:** el número que fija qué versión recibe el alumno; la misma semilla da siempre la misma versión.
- **Tope (*clamp*):** un medidor no baja de 0 ni sube de 100.
- **Papel clave / refuerzo / señuelo:** el que destapa el problema o confirma que no lo hay / el que da una cifra o fecha para la frase / el verosímil que no destapa nada.
- **Pieza:** un trozo de frase que solo existe si abriste el papel que lo trae.
- **Acierto sin evidencia:** decidir bien sin haber abierto lo que lo justificaba (suerte o instinto); se premia a medias y no cuenta como «descubrió».
- **Hábito:** el mismo tipo de error repetido en dos casos distintos, o dos veces dentro del caso 5 (que tiene dos turnos).
- **Política (de simulación):** una receta fija de qué hacer en cada caso, que se juega miles de veces para ver si gana sin entender.

---

### 0. Qué cambió respecto de la v1 (17 cambios)

La v1 (más abajo) se conserva como historia. La columna «n.º original» es el número que le daba la v2 que se perdió, **solo cuando una fuente lo cita** (05 NT1.11); en los demás **[RECONSTRUIR: n.º original]**.

| # | Cambio | De dónde sale | n.º original |
|---|---|---|---|
| 1 | G5 se aplica de verdad: cinco filas nuevas «sin evidencia» (R2.1.sin, R3.B.sin, R4.1.sin, R4.2.sin, R6.1.sin) que valen la mitad de la fila con evidencia; R5.8 y R8.3 ya eran explícitas | v13 hallazgo 1, causa (c) | [RECONSTRUIR: n.º original] |
| 2 | Frenar en el caso 2 con problema baja de +6/−8 a +3/−8 (R2.2) | v13 hallazgo 1, «prudencias más baratas» | [RECONSTRUIR: n.º original] |
| 3 | La base sola del caso 6 (R6.3) baja: P +2/+1, B 0/+2, A 0/+1 (antes +4/+2, 0/+4, 0/+2) | v13 hallazgo 1 | [RECONSTRUIR: n.º original] |
| 4 | Esperar de más en el caso 8 pasa de 0/−4 a 0/−8 (R8.8) | v13 hallazgo 1; v14 variantes | [RECONSTRUIR: n.º original] |
| 5 | La decisión correcta del caso 8 sin ningún papel clave sobre la mesa pasa de +2/0 a 0/0 (R8.3) | v13 hallazgo 1 («sin evidencia 0/0»); 05 R8.3 | [RECONSTRUIR: n.º original] |
| 6 | Cuarta clase de hábito H4 («creyó lo que mostraba su propio resultado o el dibujo») y 2 expedientes más: 8 en total, 2 por hábito | v13 hallazgo 7; 05 NT1.8 y NT1.11 #18 | [RECONSTRUIR: n.º original] |
| 7 | Cada caso tiene fondo de 9 papeles (caso 6 con C6-9, caso 8 con 2 claves y 7 señuelos) y en el caso 2 el clave y los 2 señuelos de la ventana entran siempre | v13 hallazgo 9 (G10); 05 NT1.11 #2 y #3; v14 hallazgo 5 | [RECONSTRUIR: n.º original] |
| 8 | La meta del cierre pasa de 60/60 a **65/65**; los tubos llevan marcas en 25 y 65 | v14 tabla de variantes; 05 NT1.11 #12 | 8 |
| 9 | Caso 3: el rango `ok` solo paga entero con la pieza del papel clave; la pieza existe en P, B y A; sin pieza rinde como `flojo`; código nuevo `E3f` | v13 hallazgo 2; 05 NT1.11 #14 | 9 |
| 10 | Caso 5, turno 1: el sorteo (c) cuesta **−3** de Voz (antes −6); y R5.9 pasa de −10/+4 a −10/0 | v13 hallazgo 3; 05 NT1.11 #15 y NT1.6 | 10 a 12 |
| 11 | Caso 5, turno 2: la cuenta buena ρ ya no se fuerza cerca del efecto real δ (se deja variar con desvío ≈ 4,4 y se filtra a [−4, 10]); la banda buena es `\|x − ρ\|` ≤ 1,0; el informe de la tallerista dice el 2,5 como número (I3) | v13 hallazgo 3 y 8; v14 supuestos; 05 NT1.6 C5-7 | 10 a 12 |
| 12 | Caso 5: códigos nuevos `E5d` (escribió 0 con la comparación abierta) y `E5e` (aconsejó a o b, solo registro); reacciones de subida bruta e inflado por opción | 05 NT1.7 y NT1.11 #15; v15 hallazgo B2 | 10 a 12 |
| 13 | **D-T1-1.** El caso 2 es «bien» en 1 de 3 versiones y con problema en 2 de 3 (antes siempre con problema); filas R2.1, R2.1.sin, R2.2, R2.3 y R2.4 en B; códigos `E2d` | v13 hallazgo 1 (constantes); v14 variantes; 05 NT1.11 #13 | 13 |
| 14 | **D-T1-2.** En el caso 7 la hoja de datos va adjunta y da la diferencia: la resta es fácil a propósito («primero se ve, después se calcula»); la idea 7 se registra por el lector antes y después y por `x`, no por abrir papeles | v13 hallazgo 4; v14 supuestos; v15 «jugar el caso 7» | [RECONSTRUIR: n.º original] |
| 15 | Caso 6: la hoja trae solo las respuestas recibidas (60, 60 o 12 filas), sin total ni curso, y la jefa no dice cuántas son; las filas se pueden marcar con un toque | 05 NT1.11 #16 | 15 |
| 16 | Los números al azar de cada rubro salen de `semilla * 100 + k` (antes `semilla + k`), para que dos versiones vecinas no compartan flujos | v13 hallazgo 9 (G9) | [RECONSTRUIR: n.º original] |
| 17 | Paso 1: los papeles con horas de sueño traen **2 de las 3** columnas, no las tres, para que el asombro no parezca armado | v13 hallazgo 9; 05 NT1.11 #17 | 17 |

**D-T1-1 y D-T1-2 son decisiones del bucle con valor por defecto, no respuestas de Ronald.** [RECONSTRUIR: el texto con que la v2 original las planteó; aquí se definen por cómo las usan v14 y v15.] El crítico v14 midió que D-T1-1 casi no mueve la mejor política sin papeles (4,8 % con B en 1 de 3; 3,4 % sin B): sirve contra el dictado entre compañeros («en el 2 siempre frena»), no contra el perezoso.

---

### 1. Los tres bucles

**1.1 De segundos (una acción y su respuesta).**

```
mirar la afirmación o el papel  →  tocar (abrir un papel, sacar una tanda, escribir un número)
   →  el mundo se mueve (el papel sube bajo la lámpara, la ficha se voltea, el corcho clava el papel)
   →  mirar de nuevo  →  ...  →  sellar una decisión (Firmar tal cual, Redactar, Frenar)
```

Regla de este bucle: **la respuesta del mundo muestra qué hiciste, nunca si estuvo bien.** Nada resplandece en el papel clave; los medidores no se mueven mientras abres. Eso se ve solo al cierre (regla 7: la consecuencia llega al cierre del caso y la decisión sellada no se rehace).

**1.2 De una escena (un caso; el *core loop* del Tema 1, 7 pasos).** Es la misma idea de los 7 pasos de la escena de `esquema.html` §3, con piezas propias de esta materia.

```
1 ENTRA la afirmación (un informe, un oficio, un acta o una frase dicha en una reunión) con tono de certeza;
   se ven C (Credibilidad), Voz y las fichas de tiempo (3, o 2 si C o Voz ≤ 25)
   →  2 MIRA la carpeta: 6 papeles que no dicen de qué sirven
   →  3 GASTA fichas: abre papeles, o saca tandas (caso 3), o pone papeles en la mesa (caso 8); no alcanza para todo
   →  4 ESCRIBE lo que el caso pide con números (rango, conteo, diferencia, cuánto subió) o REDACTA la frase con piezas
   →  5 SELLA: Firmar tal cual / Redactar / Frenar (o A, B, ninguna; o financiar, no, esperar). "¿Firmar? Después no hay vuelta."
   →  6 SALE EL INFORME: corte de 2 segundos; C y Voz se mueven; reacciona alguien (la jefa, una madre, una docente, el colega)
   →  7 SOBRE: si hubo error, un sobre de la jefa con una pregunta (escalón 2); "Siguiente caso" siempre habilitado
```

**1.3 De la materia (qué se acumula de caso en caso).**

```
Paso 1 (sin medidores, asombro)  →  Caso 2 (con problema en 2 de 3 versiones; el primer golpe)
   →  casos 3, 4, 5, 6, 7 en orden barajado por alumno (C y Voz pasan de uno a otro; el registro anota qué papeles abrió y qué dejó)
   →  Caso 8 (usa lo que aprendiste a pedir: con qué comparar, cuántos eran)
   →  cierre del informe (C ≥ 65 y Voz ≥ 65: plaza fija; si no, "otro trimestre de prueba": no bloquea)
   →  revelación: 8 cartas boca abajo  →  el camino ("esto apenas empieza")  →  práctica abierta
```

Se acumulan **tres cosas** entre casos: (a) los dos medidores (decisión de cuánto arriesgar), (b) las fichas, que **no** pasan de un caso a otro (cada caso las repone) salvo por el umbral de 25, y (c) el registro (hábitos y qué carta se dio vuelta). No se acumula ningún conocimiento «desbloqueable»: no hay objetos ni mejoras que se compren.

---

### 2. Reglas generales (se programan una vez, valen para los casos 2 a 8)

| Id | Regla |
|---|---|
| G1 | Al empezar el caso 2: C = 50 y Voz = 50. Los dos tienen tope 0 y 100. Todo efecto es un entero y se aplica **al sellar** (no antes). |
| G2 | Fichas del caso: `fichasDelCaso(C, Voz) = (C ≤ 25 o Voz ≤ 25) ? 2 : 3`, calculado **al empezar el caso** con los valores de ese momento. En el caso 5 vale para los dos turnos. |
| G3 | Abrir un papel cuesta 1 ficha. Reabrir un papel ya abierto no cuesta. Sin fichas no se abre nada. En el caso 3 sacar una tanda cuesta 1 ficha. Leer, escribir, redactar y sellar no cuestan. |
| G4 | La decisión sellada no se rehace. El «¿Firmar?» pide un segundo toque; después no hay vuelta. |
| G5 | **Acierto sin evidencia:** si un caso define su papel o papeles clave y la decisión fue correcta sin haberlos abierto (o sin haberlos puesto en la mesa, caso 8), el efecto es el de la fila «sin evidencia» (la mitad o menos de la fila con evidencia) y el registro lo marca. **Siete filas nombradas:** R2.1.sin, R3.B.sin, R4.1.sin, R4.2.sin y R6.1.sin (cada una vale exactamente la mitad de su fila con evidencia, con redondeo hacia cero) y R5.8 (+4/+2) y R8.3 (0/0), que son valores explícitos. Donde la decisión correcta **no puede tomarse** sin el papel (la frase con pieza de los casos 2, 3 y 6; el rango `ok` con pieza del caso 3; las piezas `grupo`), no hace falta fila: sin el papel esa opción no existe o rinde menos (G10, 5.2). |
| G6 | Cierre del informe (después del caso 8): `plazaFija = (C ≥ 65 y Voz ≥ 65)`. Solo cambia el último diálogo de la jefa y el registro. No hay nota. |
| G7 | Tipos por versión. **Caso 2:** con problema (P) en 2 de 3 versiones y bien (B) en 1 de 3, independiente de lo demás (D-T1-1). **Casos 3, 6 y 7** salen de **una** de estas 10 tiradas uniformes (c3, c6, c7): (B,B,P) (B,P,P) (P,B,P) (B,A,P) (A,B,P) (P,P,B) (P,B,B) (B,P,B) (P,A,B) (A,P,B), con P = con problema, B = bien, A = aún no se sabe. Cumplen: al menos un B, al menos un P, a lo más un A, y el caso 7 nunca es A. Cuenta: caso 3 es P 4, B 4, A 2 de 10; caso 6 igual; caso 7 es P 5, B 5. **Caso 4:** el estudio bueno es A o B, 50 %. **Caso 5:** efecto real δ = 0 o δ = 3 puntos, 50 %; siempre hay un problema (la regresión). **Caso 8:** financiar, no financiar o aún no, 1/3 cada uno. |
| G8 | Orden: Paso 1, caso 2 y caso 8 son fijos. Los casos 3, 4, 5, 6 y 7 salen en una permutación uniforme de las 120 posibles. |
| G9 | Sorteo: `semilla = versionDeAlumno(id, "psicoestadistica-descriptiva-psicologia:tema1")`. Un generador por rubro, `azarConSemilla(semilla * 100 + k)`: k=1 tipos, k=2 orden, k=3 papeles que entran a cada carpeta y su orden, k=10+caso cifras y textos de ese caso. Cambiar un rubro no cambia los otros. |
| G10 | Carpeta: cada caso tiene un **fondo de 9 papeles**; la versión recibe 6 con su papel clave dentro. **Caso 2:** el clave y los 2 señuelos de la ventana (C2-8 y C2-9) entran siempre; los otros 3 lugares se sortean entre los 6 restantes, y el refuerzo es uno de esos 6 (entra la mitad de las versiones, 3 de 6). **Casos 6 y 7:** hay además una **hoja adjunta** (la lista de respuestas, la hoja de datos) que no gasta ficha y no cuenta entre los 6; su fondo de 9 incluye C6-9 y C7-3. **Caso 5, turno 2:** la carpeta de 6 trae siempre lo que la opción elegida necesita. **Caso 8:** 2 claves y 7 señuelos, de los que entran 4. |
| G11 | Los medidores y su sentido: lo que atrae Voz cuesta Credibilidad si estaba mal; la prudencia da Credibilidad y cede Voz. Las marcas 25 y 65 se dibujan en los tubos. A 25 o menos el tubo titila y la lámpara baja; a 26 o más no hay aviso numérico. |
| G12 | La jefa **no corrige durante el caso**. Habla solo en la entrada (qué trae el informe) y en el cierre (sobre). |

*Por qué 3 fichas (ficha, secc. 2; recalculado con script en `contar_t1_v2.py`):* con 6 papeles y un clave, abrir 3 al azar da con él 3/6 = 0,50; con 2 fichas, 2/6 = 0,33. Con dos claves de los que basta uno (caso 4) es 1 − C(4,3)/C(6,3) = 0,80 con 3 fichas y 0,60 con 2. Con dos claves que se necesitan los dos (caso 8) es 4/20 = 0,20 con 3 fichas y 1/15 = 0,07 con 2.

---

### 3. Catálogo de modalidades y mecánicas del Tema 1

Tipos: **cálculo** (escribir un número), **decisión** (elegir con consecuencias), **exploración** (conseguir datos), **minijuego** (una acción corta que hace ver la idea). «Código» dice si ya existe (motor en `PIEZAS-COMUNES.md` §1 y §2, pantalla en `src/app/juego-<isla>/`). Pantallas de esta materia no existen todavía: lo único dibujado es el boceto del caso 2 (aspecto A).

| Id | Mecánica | Tipo | Qué hace el alumno | Qué contenido la vuelve necesaria | Cómo se ve (aspecto A) | Código |
|---|---|---|---|---|---|---|
| M1 | **Carpeta con presupuesto** | exploración | Toca papeles; cada uno gasta una ficha; no alcanza para todos | Ideas 2 a 8: lo importante no está a la vista y hay que decidir qué pedir | 6 papeles en abanico bajo el cono de luz; ficha de latón que se voltea | Boceto vivo (papeles, fichas, lector). Lógica **nueva**, pieza propia `carpeta.ts`; nace como motor (el Tema 6 la usa) |
| M2 | **Dos medidores que se empujan** | decisión | Ve C y Voz; decide cuánto arriesgar | Idea 8 y todas: firmar de más y frenar de más cuestan por lados opuestos | Dos tubos de tinta, azul y ámbar, con marcas en 25 y 65 | Boceto dibuja los tubos. Lógica **nueva**: `medidores.ts` |
| M3 | **Redactar con piezas** | decisión + armado | Arrastra 2 o 3 piezas a una línea; las específicas existen solo si abrió el papel que las trae | Ideas 2, 3 (rango con su pieza) y 6: decir lo que se sabe y hasta donde llega | Tira de piezas de imprenta que se arrastran | **Nueva**: `armador.ts`; nace como motor (Tema 6) |
| M4 | **Corcho por fecha** | exploración | Cada papel abierto se clava en una línea del tiempo; ve si algo cambió justo antes del cero | Idea 2: alguien cambió la forma de contar | Pared de corcho con hilos rojos (cuelga papeles del departamento) | **Nueva**, solo caso 2 |
| M5 | **Máquina de tandas** | minijuego + cálculo | Gasta una ficha, sale una tanda de 10 con su media; ve que cambian entre sí | Idea 3: con pocos se habla de muchos | Tambor de lotería que suelta 10 bolitas | **Nueva**: `tandas.ts`, sorteo con `azarConSemilla` |
| M6 | **Rango «entre __ y __»** | cálculo | Escribe dos números a partir de las tandas | Idea 3: la cifra de pocos se mueve; hay que decir cuánto | Dos casillas numéricas en un papel de frase | **Nueva**, dentro de `tandas.ts` |
| M7 | **Dos estudios, uno solo se cita** | decisión + exploración | Abre listas de quién respondió y elige A, B o ninguna | Idea 4: importa quién responde | Dos carpetas, una gorda y una delgada | **Nueva**, solo caso 4 |
| M8 | **Aconsejar y verificar lo tuyo (dos turnos)** | decisión + cálculo | Turno 1: elige a quién llamar. Turno 2: compara y escribe cuánto subió por el taller | Idea 5: lo que mejora solo | Hoja de 60 con puntajes; sorteo con el mismo tambor; segunda hoja un mes después | **Nueva**: `bienestar.ts` (generador con regresión por regla) |
| M9 | **Contar y concluir** | cálculo + armado | Cuenta en la hoja de respuestas y redacta la conclusión con piezas | Idea 6: lo medido no es lo de todos | Hoja con filas marcables + tira de piezas | **Nueva**, caso 6 |
| M10 | **Lector primero, luego rótulo** | decisión + cálculo | Decide a ojo con el gráfico; después escribe la diferencia de la hoja y decide qué firmar | Idea 7: un gráfico miente con datos verdaderos | Lámina pegada en la puerta; gráfico dibujado por código con eje | **Nueva**: `grafico.ts` |
| M11 | **Defender ante la dirección** | decisión + exploración | Abre papeles, pone sobre la mesa los que sostienen su recomendación, y ve su año y el del colega | Idea 8: decidir con datos bien leídos | Sala de dirección, dos calendarios lado a lado | **Nueva**, caso 8 |
| M12 | **Las ocho cartas** | cierre | Da vuelta la que quiere; ve su momento y su nombre | Revelación: «esto apenas empieza» | Ocho cartas de cartulina bajo la lámpara | **Nueva**, pieza propia |
| M13 | **El archivador de expedientes** | ayuda | Abre un expediente cerrado de otro año | Escalón 3 de la escalera (8.3) | Archivador con carpetas amarillentas | **Nueva**, pieza propia |
| M14 | **El primer encargo con Dani** | exploración | Responde tres preguntas (o deja que Dani lo haga) y busca la cifra en el archivo | Idea 1: los datos están en todas partes | Silueta de Dani en la silla del fondo | **Nueva**, paso 1 |

**Reutilizado del motor, sin reescribir** (nombres de `PIEZAS-COMUNES.md` §1 y §2): `partida.ts` (`partidaNuevaDe`, `anotarEn`, `leerPartidaDe`, `guardarPartidaDe`) para la partida por eventos; `version-alumno.ts` (`versionDeAlumno`) con semilla propia; `azarConSemilla` de `src/lib/finanzas/ejercicios.ts`; `nube.ts` (funciones `…De`) para guardar; `problemasDeTexto` de `src/lib/revision.ts` en la prueba del guion; `formato.ts` si hiciera falta. Patrones: «diagnóstico por error típico», «prueba del alumno perezoso», «partida reconstruida desde sus eventos», «guion aparte del motor» y «escena nueva sin pisar partidas viejas». **No se usa `escalera.ts`**: cuenta fallos seguidos en un mismo paso y su tercer escalón manda a leer el dossier; este tema no repite casos. La escalera del tema es la pieza propia `ayuda.ts` (secc. 8). **Hay que despegar**: la página del docente (`resumen.ts`/`PanelDocente.tsx`) solo lee la planta de Proyectos II (`PIEZAS-COMUNES.md` §3); el registro de la secc. 12 necesita que reciba la escena y su función `describir`. **«Como Doom»:** de otros juegos de RON_DOC se toma el motor invisible; ninguna mecánica de esta lista reutiliza la lógica de otro juego porque ninguna enseña mejor este tema, y ni un personaje, caso ni pantalla de otro juego se copia (nada de la ventanilla de AIEF). Sobre el parecido de la jefa con la de AIEF, ver secc. 15.

---

### 4. Paso 1 · «El primer encargo» (idea 1; sin medidores; exploración)

| Id | Regla |
|---|---|
| P1.1 | La jefa pide una cifra cotidiana sobre el sueño de 4.º del colegio. Antes, **3 preguntas fijas**: horas dormidas anoche (0 a 14, de 0,5 en 0,5), minutos de celular antes de dormir (0 a 300), cómo te fue ayer (0 a 100). |
| P1.2 | Por defecto responde **Dani** (silueta, practicante) con valores sorteados con k=10. Botón «poner las mías»: el alumno escribe los tres; fuera de rango, la casilla se marca y no deja seguir. **Esos tres números no entran en ningún cálculo de ningún caso** (único número sin consecuencia, a propósito: sin medidores, sin nota; aceptado en la revisión v12). No se envían a la nube; se guarda solo `datosPropios: true/false`. |
| P1.3 | Archivo del colegio: fondo de 9 papeles, 6 en la carpeta; **2 de los 6 traen horas de sueño** (se sortean entre 3 candidatos: cuaderno de la enfermería, encuesta anual de la secretaría, informe del orientador). **Cada uno trae 2 de las 3 columnas**: las horas de sueño y una segunda columna sorteada (minutos de celular o ánimo del día) (cambio 17). 3 fichas, sin castigo posible. |
| P1.4 | Al abrir el **primer** papel con sueño: asombro. Se muestran dos filas con las columnas que ese papel trae: «Tú, hoy» (o la de Dani) y «Archivo, hace un año» (fecha visible). La fila del archivo lleva valores propios (no repite los de hoy). No aparece ningún nombre técnico. |
| P1.5 | Si gasta las 3 fichas sin abrir uno con sueño: la jefa dice «¿Seguro que ahí no había nada?» **una sola vez** y regala 1 ficha. Si aun así no lo abre, Dani lo abre por él (el registro anota `ayudado`). Así **todos** ven el asombro. |
| P1.6 | Al cerrar el paso: la jefa dice «A partir de hoy firma el departamento, y firmas tú» y **recién entonces aparecen los tubos** (C = 50, Voz = 50, con marcas en 25 y 65). |

---

### 5. Los casos 2 a 8, uno por uno

Cada caso: qué hace el alumno, qué se escribe y qué cambia, y la tabla de efectos. Los efectos se escriben `C/Voz`. Todo se aplica al sellar y con tope (G1). Los textos que ve el alumno son de `05-mundo-y-narrativa.md` (NT1.6); aquí solo las reglas.

#### 5.1 Caso 2 · «El colegio sin denuncias» (idea 2) · con problema en 2 de 3 versiones, bien en 1 de 3 · exploración + decisión

- **Alumno:** abre papeles (se clavan en el corcho por fecha), redacta la frase o decide. Llega el informe de gestión del director: «cero denuncias».
- **Corcho (M4):** cada papel tiene una fecha. Se clava en una línea del tiempo bajo la gráfica de denuncias por mes. **La fecha del papel clave cae siempre en el mes anterior a la caída, y los 2 señuelos de la ventana (C2-8, lista de tutores, y C2-9, calendario) también caen ahí y entran siempre a la carpeta (G10)**, para que la cercanía de fecha no delate el clave. Los hilos salen de **todos** los papeles clavados.
- **Claves posibles (uno por versión):** C2-1 correo de la dirección, C2-2 libro de registro de la secretaría, C2-3 informe del orientador. **Refuerzo:** C2-4, el buzón anónimo; en el tipo B es banal. Entra a la carpeta la mitad de las versiones (G10).
- **Tipo P (2 de 3):** el clave destapa que el cero esconde hechos (cambió la forma de registrar). **Tipo B (1 de 3):** el mismo papel muestra que el registro **no cambió** y la caída es real. Los tres claves tienen la misma forma en las dos columnas, así que el nombre del papel no delata el tipo.
- **Piezas de la frase (M3):** siempre disponibles, 3 genéricas (G1 «según fuentes del colegio», G2 «datos preliminares», G3 «el director informa»). Cada papel abierto agrega **una** pieza de hecho: el clave agrega dos en P (las denuncias *registradas* bajaron a cero, con el hecho concreto del papel, y «no sabemos cuántos hechos hubo») y una en B (el registro sigue igual que antes); el refuerzo una; cada señuelo una verdadera e irrelevante. La frase lleva 2 o 3 piezas.

| Id | Condición al sellar | Tipo P | Tipo B |
|---|---|---|---|
| R2.1 | Firmar tal cual (en B, con el clave abierto) | −20/+10 | +10/+10 |
| R2.1.sin | Firmar tal cual sin abrir el clave (G5; solo existe en B) | no aplica | +5/+5 |
| R2.2 | Frenar | +3/−8 | 0/−15 |
| R2.3 | Frase que contiene una pieza del papel clave | +8/+4 (+10/+4 si lleva también la del refuerzo) | +10/+10 |
| R2.4 | Frase sin ninguna pieza del clave | −8/+4 | 0/+4 |

- **Error diagnosticado:** `E2a` firmó tal cual con problema · `E2b` frenó con problema sin abrir el clave · `E2c` frase sin pieza del clave (en P o en B) · `E2d` frenó en B (el cero se sostenía).
- **Por qué el tipo B no regala nada:** en B, firmar tal cual con el clave abierto paga igual que redactar con la pieza (+10/+10), pero firmar sin abrir paga la mitad (R2.1.sin) y frenar cuesta −15 de Voz. Quien «siempre duda del cero» pierde en 1 de 3 versiones; quien «siempre firma» pierde 20 en 2 de 3.

#### 5.2 Caso 3 · «La cifra de los de 4.º» (idea 3) · cálculo + minijuego

- **Alumno:** gasta fichas en papeles y/o en **tandas** (cada tanda: 10 estudiantes al azar de un registro generado de 480; se ve la media de esa tanda y una tira que acumula las medias de las tandas ya sacadas, para ver que se mueven). Después escribe un **rango** «entre a y b» (horas, de 0,1 en 0,1, con a ≤ b) o decide sin rango. La cifra que se verifica llega en un oficio de una fuente externa.
- **Generador (`tandas.ts`):** registro de 480 con media μ ∈ [5,5; 7,5] y desvío 1,1 h; media de una tanda con desvío ≈ 0,35 h (ficha: 3 tandas dan ancho medio 0,59 h). Las tandas salen sin reposición del registro, con k=10+3 y el índice de tanda: reabrir la partida da las mismas tandas. La cifra del oficio: tipo P, a más de 1,0 h de μ (entre 1,0 y 1,6); tipo B, a 0,15 h o menos; tipo A, a 0,5 h o menos de la media del registro, que en A es de la semana de exámenes.
- **Puerta del rango:** el botón «Redactar rango» se habilita con **2 o más tandas sacadas**. Con 0 o 1, la jefa dice «Con una tanda no sabes cuánto se mueve» y quedan Firmar tal cual y Frenar. (Hallazgo C6 de v15: esa frase da la idea 3 antes de verla; propuesta para narrativa: «Para redactar un rango necesitas 2 tandas».)
- **Papeles y pieza (cambio 9):** clave en P: la ficha de cómo se obtuvo la cifra («una tanda de 10 del turno tarde») o la hoja del turno tarde. En B: la ficha («150 al azar de los 480»). En A: el acta de la semana de exámenes o la ficha («9 respuestas»). **La pieza del clave existe en los tres tipos**, solo si el papel está abierto, y se pega al rango; es lo que hace que un rango `ok` pague su fila completa.
- **Cubre (H2 cerrado):** `cubre(a,b,μ) = a − 0,25 ≤ μ ≤ b + 0,25` (holgura 0,25 h). Con 3 tandas y rango mínimo-máximo cubre 97,5 %, con 2 tandas 88,7 % (ficha, secc. 2 y su `.py`). Un rango centrado en la media de 2 tandas con ancho 1,2 cubre 99,9 % (z = (0,6 + 0,25)/0,246 = 3,45). Por eso el aviso al registro: si el rango es el mínimo-máximo de ≥ 3 tandas vistas y no cubre, se marca `razonoBienNoCubrio` (no es engaño, pasa 2,5 % del tiempo).
- **Nivel del rango `n(a,b,μ)`, en este orden:** si no cubre → `noCubre`; si no, si `b − a > 2,0` → `ancho`; si no, si `b − a ≤ 1,2` → `ok`; si no → `flojo`. **`ok` paga entero solo con la pieza del clave en la frase; sin pieza rinde como `flojo`** (en A, sin pieza, ambos rinden −8/+4).

| Id | Tipo | Tal cual | Frenar | Rango `ok` con pieza | Rango `ok` sin pieza o `flojo` | `noCubre` | `ancho` |
|---|---|---|---|---|---|---|---|
| R3.P | con problema | −20/+10 | +6/−8 | +8/+4 | +3/0 | −10/+4 | 0/−2 |
| R3.B | bien (con la ficha abierta) | +10/+10 | 0/−15 | 0/+4 | 0/+2 | −10/+4 | 0/−2 |
| R3.B.sin | bien, tal cual sin abrir la ficha (G5) | +5/+5 | no aplica | no aplica | no aplica | no aplica | no aplica |
| R3.A.sin | aún no (rango sin la pieza) | −20/+10 | 0/−10 | no existe | −8/+4 | −10/+4 | 0/−2 |
| R3.A.con | aún no (rango con la pieza) | igual que R3.A.sin | igual | +8/+4 | +3/0 (`flojo` con pieza) | −10/+4 | 0/−2 |

- En B, el valor de `ok` con pieza (0/+4) es el de la v1, sin cambio; las fuentes de v2 no lo repiten. [RECONSTRUIR: confirmar R3.B `ok` con pieza = 0/+4.]
- En A, μ es la media del registro (semana de exámenes): el rango tiene que describirlo bien **y** la pieza tiene que decir de qué semana es. Solo con las dos cosas sube.
- **Error diagnosticado:** `E3a` firmó tal cual con ≤ 1 tanda (en P o A) · `E3b` rango `noCubre` · `E3c` rango `ancho` · `E3d` frenó en B · `E3e` rango en A sin la pieza · `E3f` rango bueno (`ok`) en P o B sin la pieza (sobre `S-E3f`: «¿Qué papel dice de dónde salió la cifra de la fuente?»).
- **Acierto sin evidencia:** firmar tal cual en B sin haber abierto la ficha (R3.B.sin).

#### 5.3 Caso 4 · «Dos encuestas, un titular» (idea 4) · decisión + exploración

- **Alumno:** abre papeles de la carpeta y elige A, B o ninguna. No escribe número. Los dos estudios son **del distrito** (no del colegio de 480): A con miles de respuestas, B con cientos (05 NT1.11 #1; las reglas R4 no cambian).
- **Papeles:** de los 6, **2 son claves**, elegidos entre 4 posibles (C4-1 lista de quienes respondieron A, C4-2 la de B, C4-3 cómo se invitó a A, C4-4 cómo se invitó a B); con uno basta para saber cuál es el bueno, porque exactamente uno lo es. Los otros 4 (C4-5 a C4-9) son banales y se sortean.
- **Quién es el bueno:** A en el 50 % de las versiones (el formulario obligatorio del distrito, casi todo 4.º) y B en el otro 50 % (A se aplicó solo en clubes de apoyo).

| Id | Condición | C/Voz |
|---|---|---|
| R4.1 | Elige el estudio bueno y es A, con algún clave abierto | +10/+10 |
| R4.1.sin | Ídem, sin abrir ningún clave (G5) | +5/+5 |
| R4.2 | Elige el estudio bueno y es B, con algún clave abierto | +8/+4 |
| R4.2.sin | Ídem, sin abrir ningún clave (G5) | +4/+2 |
| R4.3 | Elige el malo y es A | −20/+10 |
| R4.4 | Elige el malo y es B | −20/+4 |
| R4.5 | Ninguna | 0/−10 |

- **Error diagnosticado:** `E4a` eligió sin abrir ninguno de los 4 papeles que destapan · `E4b` eligió B siendo A el bueno habiendo abierto un papel que lo mostraba (sobrecorrección «la chica siempre») · `E4c` ninguna.
- **Acierto sin evidencia:** eligió el bueno sin abrir ningún clave (R4.1.sin, R4.2.sin).

#### 5.4 Caso 5 · «El taller de pausas» (idea 5) · decisión + cálculo en dos turnos

**Turno 1, aconsejas.** Ve la hoja de bienestar de 60 estudiantes (puntajes 0 a 100, sin gastar fichas). El director Ugarte tiene 13 cupos. Elige:
(a) los 13 de peor puntaje · (b) los 13 que se anotaron primero · (c) un sorteo entre los 26 de peor puntaje: 13 al taller y 13 de comparación (animación con el tambor del caso 3).

| Id | Opción | C/Voz al sellar el turno 1 |
|---|---|---|
| R5.1 | (a) o (b) | 0/0 |
| R5.2 | (c) | 0/−3 (el director protesta: «¿Por qué dejas a 13 sin ayuda?») |

**Generador (`bienestar.ts`), pensado para que la regresión salga de una regla y no pegada:** nivel real T ~ N(60, 10), medición = T + ruido N(0, 8). Primera medición de los 60; segunda = T + ruido nuevo + δ si va al taller (δ = 0 o 3). Con esa regla los 13 peores suben alrededor de 7 puntos sin taller y los otros 47 bajan alrededor de 2 (cuenta del propio modelo: confiabilidad 100/164 = 0,61). **Cambio 11: la cuenta buena ρ no se fuerza cerca de δ.** Con 13 contra 13 la diferencia entre dos grupos tiene un desvío de unos 4,4 puntos, y se deja que varíe así (la precisión de ±0,8 que forzaba la v1 enseñaba una exactitud falsa, justo donde el caso 8 enseña que 9 contra 9 es «aún no se sabe»). El generador solo re-sortea para cumplir:
- I1 (c): `ρ_c = Δ_taller − Δ_grupo`, sin forzarlo cerca de δ. [RECONSTRUIR: enunciado exacto de I1 e I2 en la v2 original.]
- I2 (a): `ρ_a = Δ_taller − Δ_vecino`, con `Δ_vecino ≥ 4` (el vecino sube casi lo mismo sin taller).
- I3 (b): los que se anotaron primero traen un sesgo de **+2,5** aun sin taller, y el informe de la tallerista **lo dice como número** («unos 2,5 puntos»): `ρ_b = Δ_taller − Δ_demás − 2,5`.
- I4: para cada opción, la distancia entre la banda de la cuenta buena (`ρ ± 1,0`) y la de la subida bruta (`Δ_taller ± 1,0`) y la inflada es mayor que 0 (las bandas no se tocan).
- I5: `ρ` queda entre −4 y +10.

**Turno 2, un mes después, verificas lo tuyo.** 3 fichas (o 2, G2). Fondo de 9 papeles: segunda medición de los llamados (C5-1) · de los demás (C5-2) · del grupo de comparación (C5-3) · colegio vecino (C5-4) · lista de asistencia · calendario de exámenes · informe de la tallerista (C5-7) · quejas de padres · acta de la dirección. **La carpeta de 6 siempre trae lo que la opción elegida necesita** (a: llamados + vecino; b: llamados + demás + informe; c: llamados + grupo); el resto se sortea. El alumno escribe `x` = «cuántos puntos subió por el taller» y firma con su número, o frena.

**Evaluación de `x` (se aplica la primera regla que cumple, en este orden). `Δ_t` = cambio medio de los llamados; todas las bandas valen ±1,0.**

| Id | Condición | C/Voz |
|---|---|---|
| R5.3 | Frenar | +2/−6 |
| R5.4 | Papel de los llamados abierto, `\|x − Δ_t\|` ≤ 1,0 y `x` fuera de la banda buena (**subida bruta**) | −20/+4 |
| R5.5 | Opción (a) o (b), papel de los demás abierto, `\|x − (Δ_t − Δ_demás)\|` ≤ 1,0 y fuera de la banda buena (**inflado**) | −20/+4 |
| R5.6 | Con (c), papeles requeridos abiertos y `\|x − ρ\|` ≤ 1,0 | +12/+6 |
| R5.7 | Con (a) o (b), papeles requeridos abiertos y `\|x − ρ\|` ≤ 1,0 | +6/+3 |
| R5.8 | Sin los papeles requeridos y `\|x − ρ\|` ≤ 1,0 (**acierto sin evidencia**, G5) | +4/+2 |
| R5.9 | Cualquier otro caso | −10/0 |

- **Los tres caminos tienen costo distinto, ninguno domina:** (a) 2 fichas, 0 Voz, techo +6/+3; (b) las 3 fichas, 0 Voz, techo +6/+3; (c) 2 fichas, −3 Voz en el turno 1, techo +12/+6 (neto C +12, Voz +3). Con 2 fichas (castigo), (b) no se puede cerrar. Azar de dar con los papeles requeridos con 3 fichas: (a) 0,20, (b) 0,05, (c) 0,20 (`contar_t1_v2.py`).
- **«Escribir 0»:** vale (R5.6 a R5.8) solo cuando `\|ρ\|` ≤ 1, que con el recorte de I5 ocurre en **22,3 %** de las versiones con δ = 0 y **16,1 %** con δ = 3 (cuenta exacta con `contar_t1_v2.py`; el crítico v14 midió 22,2 y 15,9 por simulación y pidió corregir el «alrededor de 1 de cada 6» que traía el texto de la v1). Con la comparación abierta y `ρ > 1`, escribir 0 es `E5d`.
- **Error diagnosticado:** `E5a` subida bruta (R5.4) · `E5b` inflado (R5.5) · `E5c` sin comparar (R5.8 o R5.9 sin los papeles requeridos) · `E5d` escribió 0 con los papeles requeridos abiertos y `ρ > 1` (hallazgo B2 de v15: antes se definía con `\|0 − ρ\| > 1`, que también disparaba el sobre «¿de verdad no quedó nada?» cuando `ρ` era negativa o `δ = 0`; con `ρ < −1` el caso cae en R5.9 sin código `E`) · `E5e` aconsejó (a) o (b) en el turno 1 (solo registro: alimenta el hábito H4, no tiene sobre).

#### 5.5 Caso 6 · «El titular de los 480» (idea 6) · cálculo + armado

- **Alumno:** la hoja adjunta (no cuesta ficha) trae solo las **respuestas recibidas**, una fila cada una, sin filas en blanco, sin curso y sin total: **60 filas en los tipos P y B, 12 en el tipo A** (cambio 15). La jefa no dice cuántas son, así que el tipo no se lee en la entrada. Abre papeles de la carpeta (3 fichas) y decide.
- **Claves posibles (3):** C6-1 cómo se eligieron los 60; C6-2 composición del colegio por curso; C6-3 acta de la semana de exámenes. En P sirven C6-1 y C6-2 (los 60 son de un solo curso y el colegio tiene ocho); en B C6-1 («sorteo entre los 480»); en A C6-1 («12 respondieron») o C6-3 («semana de exámenes»). C6-9 completa el fondo de 9.
- **Botones:** Firmar tal cual (la frase original, sin número) · **Redactar la conclusión** · Frenar.
- **Redactar:** primero el alumno **cuenta** en la hoja cuántos duermen menos de 6 horas y lo escribe (`N`, entero; puede marcar filas con un toque, el contador sube solo pero vale el número escrito). La base queda escrita: «{N} de los {den} duermen menos de 6 horas». Luego elige **una** extensión:
  - `ninguna` (solo lo medido).
  - `podrían` (genérica): «y podrían ser uno de cada cuatro en el colegio».
  - `grupo` (solo si abrió un papel clave): P «y todos son de {curso}» · B «elegidos por sorteo entre los 480: aproximadamente uno de cada cuatro» · A «con 12 respuestas en semana de exámenes aún no se sabe». **La pieza dice solo lo que el papel abierto muestra** (hallazgo I3 de v15: en P el papel C6-2 debe decir que las respuestas de la hoja son de {curso}; en A la pieza se parte en dos, una por papel). `grupo` paga R6.5 con cualquiera de los claves del tipo.
- **Conteo:** si `N` no coincide con la hoja, se suma **−10 a C** («ese número no sale de tu hoja») sobre lo que dé la tabla, en cualquier extensión.

| Id | Opción | Tipo P | Tipo B | Tipo A |
|---|---|---|---|---|
| R6.1 | Firmar tal cual (sin `N`) | −20/+10 | +10/+10 | −20/+10 |
| R6.1.sin | Firmar tal cual en B sin abrir el clave (G5) | no aplica | +5/+5 | no aplica |
| R6.2 | Frenar | +6/−8 | 0/−15 | 0/−10 |
| R6.3 | Base + `ninguna` | +2/+1 | 0/+2 | 0/+1 |
| R6.4 | Base + `podrían` | −8/+4 | 0/+4 | −8/+4 |
| R6.5 | Base + `grupo` | +8/+4 | +10/+10 | +8/+4 |
| R6.6 | `N` mal contado (se suma a lo anterior; solo cambia C) | −10/0 | −10/0 | −10/0 |

- **Piezas de la tira (H1 cerrado):** las cuatro opciones de arriba son **todas** las piezas del caso. `podrían` nunca toca el hueco (sin clave); `grupo` solo existe con el papel clave abierto.
- **Error diagnosticado:** `E6a` `N` mal contado · `E6b` firmó tal cual en P o A · `E6c` `podrían` en P o A · `E6d` frenó en B.
- **Acierto sin evidencia:** firmar tal cual en B sin haber abierto el clave (R6.1.sin).

#### 5.6 Caso 7 · «El gráfico del informe» (idea 7) · decisión + cálculo · tipos P o B

- **Primero eres el lector.** Antes de entrar a la mesa ves la lámina del informe con dos columnas, A y B (sin números en el eje), y en pocos segundos eliges a cuál **recortar** el presupuesto: al taller A, al B o a ninguno. Esa elección **no se juzga**: se guarda. Al cerrar el caso se vuelve a mostrar el mismo dato dibujado honesto y se pregunta, con dos toques, si recortarías el mismo; también se guarda, sin efecto en los medidores. (Retoque de oficio de v15: la pregunta debería ser «¿a cuál le recomendarías recortar?», porque el psicólogo recomienda y la dirección decide.)
- **Mesa:** la hoja de datos de la fuente está **adjunta y no gasta ficha**: trae los dos valores (por ejemplo A 64,8 y B 63,0). Los papeles que gastan ficha dicen cómo se dibujó el gráfico. **Claves (3 posibles):** C7-1 correo de la fuente, C7-2 captura del gráfico original, C7-3 ficha técnica de la hoja. En P dicen que el eje empieza arriba de cero; en B, que empieza en cero o que la diferencia es grande.
- **Número:** el alumno escribe `x` = «cuántos puntos de diferencia hay entre A y B» (decimales de 0,1). Correcto si `|x − |A−B|| ≤ 0,1`. **Todo lo que se firma lleva `x` como rótulo debajo del gráfico**, así el número decide en cada rama. D-T1-2: como la hoja da la diferencia, la resta es fácil; lo que el caso mide es si el alumno **desconfía del dibujo** y, por eso, la idea 7 se registra por el lector (antes y después) y por `x`, no por abrir papeles.
- **Rediseñar (H1 cerrado):** vuelve a dibujar el gráfico con la base en cero y con `x` como rótulo. En tipo P es lo mejor; **en tipo B no hace falta y cuesta**.

| Id | Opción | Tipo P (eje truncado) | Tipo B (bien) |
|---|---|---|---|
| R7.1 | Firmar tal cual, `x` correcto | −10/+10 | +10/+10 |
| R7.2 | Firmar tal cual, `x` incorrecto | −20/+10 | +4/+10 |
| R7.3 | Rediseñar con la base en cero, `x` correcto | +8/+4 | 0/−4 |
| R7.4 | Rediseñar con la base en cero, `x` incorrecto | −8/+4 | −6/−4 |
| R7.5 | Frenar | +6/−8 | 0/−15 |

- **Ajuste a la ficha (ver 14):** la ficha daba −20/+10 a «firmar tal cual» en P; aquí baja a −10/+10 si el rótulo es correcto, porque el dato sí está a la vista aunque el dibujo engañe. Sin eso el número no habría cambiado nada en esa rama.
- **Error diagnosticado:** `E7a` `x` incorrecto (escribió lo que se ve) · `E7b` firmó tal cual en P · `E7c` rediseñó o frenó en B.

#### 5.7 Caso 8 · «La dirección decide» (idea 8) · decisión + exploración

- **Alumno:** el director Ugarte decide si **financia** el taller el año que viene; el colega Beto propone decidir «a ojo». El alumno abre papeles (3 fichas, o 2 con el castigo; el caso 8 con 2 fichas es jugable, Ugarte lo dice con naturalidad), **pone sobre la mesa los papeles que sostienen su recomendación (hasta 2, solo de los que abrió)** y sella: **financiar**, **no financiar**, **esperar un trimestre**.
- **Papeles (fondo de 9):** 2 claves y 7 señuelos, de los que entran 4. K1 = C8-1, el seguimiento del semestre con grupo que no tuvo taller. K2 = C8-2, las listas con tamaños y cuándo se midió. Los nombres de los papeles dicen qué documento es, no lo que prueba (no pueden llamarse «resultados con grupo de control»).
- **Contenido por tipo:** *financiar*: K1 muestra una diferencia clara con comparación y K2 grupos de 40 contra 40 durante un semestre. *No financiar*: K1 muestra diferencia casi cero con K2 igual de sólido. *Aún no*: K1 muestra una diferencia atractiva pero K2 dice 9 contra 9 y tres semanas.
- **Evidencia:** `e` = cantidad de papeles puestos sobre la mesa que sean K1 o K2 (0, 1 o 2). Un señuelo puesto cuenta 0.
- **El colega:** propone la decisión correcta con probabilidad 1/3 y, si no, una de las otras dos con igual probabilidad. Se ven **los dos años** lado a lado (el tuyo y el del colega); es solo imagen, no mueve medidores.

| Id | Condición | C/Voz |
|---|---|---|
| R8.1 | Decisión correcta, `e = 2` | +12/+8 |
| R8.2 | Decisión correcta, `e = 1` | +6/+4 |
| R8.3 | Decisión correcta, `e = 0` (acierto sin evidencia, G5) | 0/0 |
| R8.4 | Financiar cuando era «no financiar» | −20/+6 |
| R8.5 | Financiar cuando era «aún no» | −15/+6 |
| R8.6 | No financiar cuando era «financiar» | −15/−8 |
| R8.7 | No financiar cuando era «aún no» | −10/−6 |
| R8.8 | Esperar cuando era «financiar» o «no financiar» | 0/−8 |

- **H3 cerrado:** quien abre un solo clave y acierta por suerte cobra la mitad y el registro lo marca; quien no abre ninguno cobra 0/0 y también. «Parecer que entendió» no sale gratis ni en la hoja de Ronald ni en los medidores.
- **Error diagnosticado:** `E8a` decidió con `e < 2` · `E8b` esperó cuando se podía decidir · `E8c` financió o no financió contra la evidencia · `E8d` coincidió con el colega o lo contradijo contra lo que decía la evidencia (se registra, no tiene sobre).

**Huecos sin código en las fuentes.** Hay decisiones equivocadas que ninguna fuente asigna a un `E…`: frenar en P o A en el caso 3 (R3.P y R3.A.sin), firmar tal cual en P o A en el caso 3 con 2 o más tandas, y escribir un número con la comparación abierta y `ρ < −1` en el caso 5. Se registran como decisión sin código (ni sobre ni hábito). [RECONSTRUIR: si la v2 original les daba código, aprendizaje y bucle lo deciden juntos; no se inventó ninguno para no pasar de los 29 que contaron v14 y v15.]

---

### 6. La revelación (M12)

| Id | Regla |
|---|---|
| V1 | Al cerrar el informe aparecen **8 cartas boca abajo**, una por idea, en el orden en que el alumno jugó. Se dan vuelta con un toque, en cualquier orden. No cuesta nada. |
| V2 | Cada carta muestra el **momento** de ese caso (el papel que abrió o el que dejó, el número que escribió, lo que firmó) y debajo las tres líneas de `04-aprendizaje.md` T1.7b (*Hiciste*, *Habría pasado*, *Cierre*) según la **rama**. |
| V3 | **Rama** = el cruce de T1.7a: tipo del caso × opción elegida × papeles abiertos × (caso 3) si el rango llevó la pieza × (caso 5) si `ρ` quedó dentro de la banda. Son **71 ramas**: 66 de `04` más 5 del caso 2 en tipo B (F2f a F2j). Cada texto afirma solo lo que su rama garantiza; por eso el registro guarda, en los eventos, todo lo que la rama necesita (secc. 12). Esto cierra los «tres huecos por carta» que la v1 dejaba a narrativa y los dos textos mal asignados del hallazgo 5 de v13. |
| V4 | El nombre técnico solo se dice para lo que el alumno hizo o dejó de hacer. En un tipo B la carta lo dice («esta vez no había problema») y no nombra nada. |
| V5 | Cuando las 8 están boca arriba aparece el **camino** (cierre general): solo el Tema 2 se nombra. Siempre hay un «Salir». Se registra qué cartas se dieron vuelta y en qué orden. |
| V6 | Desde el camino, cada carta ofrece «probar este caso con otras cifras» (8.4). |

---

### 7. Retroalimentación y dominio

**7.1 Qué pasa cuando acierta, cuando se equivoca y cuando se traba.**

| Situación | Qué ve el alumno | Qué se registra |
|---|---|---|
| **Acierta con evidencia** | Medidores suben, la jefa asiente (pulgar arriba), su frase queda como tarjeta en el panel de acuerdos. Sin nota. | clase `descubrió solo` |
| **Acierta sin evidencia** | Medidores suben menos (G5). La jefa pregunta una cosa: «¿En qué papel te apoyabas?» y deja tocar los papeles abiertos. Es opcional. | `acierto sin evidencia` |
| **Se equivoca** | Los medidores bajan al cierre, reacciona alguien del mundo (la madre que llama, una docente, el colega, el director vecino) y llega un **sobre de la jefa con una pregunta** (escalón 2). | la clase de T1.5 y el código `E…` |
| **Se traba** (3 fichas sin abrir lo que importa, o no sabe qué escribir) | No hay pantalla de error. Las fichas se acaban («Se acabó la noche. Cierra con lo que tienes»), el alumno sella con lo que tiene y el costo llega al cierre. En el paso 1 solo, la jefa regala una ficha (P1.5). | `fichas agotadas sin clave` |

**7.2 Este tema no bloquea.** Como no mide nota y su fin es el asombro, **nadie queda atrapado en un caso**. «No se avanza sin hacerlo bien» vale en los temas que miden y en la práctica abierta; aquí el dominio vive en que cada caso hace sentir el error y la revelación lo nombra.

---

### 8. Escalera de ayuda sin bloquear

Los cuatro escalones de `04-aprendizaje.md` T1.2, con **dónde aparece cada uno**. Pieza propia `ayuda.ts` (no `escalera.ts`). Ningún escalón manda a leer nada: el tercero es un caso parecido dentro del juego.

| Escalón | Qué es | Cuándo aparece | Bloquea |
|---|---|---|---|
| 1 · Consecuencia | Medidores, corte del informe, reacción de alguien | Siempre, al cierre | No |
| 2 · Pista de personaje | Un **sobre de la jefa** cae sobre la mesa con una pregunta de una o dos líneas, elegida por el código `E…` (los 28 textos de NT1.7 de `05`; ninguno nombra el concepto) | Después de una decisión que no fue «acierto con evidencia», **antes del botón «Siguiente caso»**. Se lee o se ignora con un toque | No |
| 3 · Un caso parecido ya resuelto | El **archivador de expedientes** (M13): un expediente cerrado de otro año, con otro colegio y sin cifras, que muestra en tres tiempos qué papel se abrió, qué se firmó y qué pasó. Sin explicar | Ver 8.3 | No |
| 4 · Otros números | Otra versión: otro tipo, otro clave, otras cifras | Solo en práctica abierta (8.4) | No |

**8.1 Una sola tabla de códigos de error y hábitos (hallazgo I1 de v15).** La v2 perdida y `04` llevaban dos tablas distintas: 29 códigos contra 26 (a `04` le faltaban `E2d`, `E3f` y `E5e`) y 11 diferencias de hábito (el bucle dejaba 7 códigos sin hábito; `04` los metía en H3 y H4 «para no dejar códigos sin hábito»). Esta es **la** tabla: 29 códigos, cada uno con al menos un hábito, y `04` T1.5b y `ayuda.ts` la copian con script desde `scripts-t1/tablas_t1_v2.py`. `ayuda.ts` recibe `{caso, codigo}` y devuelve `{pistaId}`; si hay varios errores en el mismo caso, se muestra el de mayor costo en C. El código nombra la decisión equivocada; que haya abierto o no el clave lo decide la rama de la revelación (V3), no el código.

| Código | Caso | Cuándo | Hábito | Sobre |
|---|---|---|---|---|
| E2a | 2 | Firmó tal cual con problema (R2.1 en P) | H1, H2 | S-E2a |
| E2b | 2 | Frenó con problema sin abrir el clave (R2.2 en P) | H1 | S-E2b |
| E2c | 2 | Frase sin ninguna pieza del clave, en P o en B (R2.4) | H3 | S-E2c |
| E2d | 2 | Frenó en B: el cero se sostenía (R2.2 en B) | H3 | S-E2d |
| E3a | 3 | Firmó tal cual con 1 tanda o menos, en P o A | H1, H2 | S-E3a |
| E3b | 3 | Rango `noCubre` | H4 | S-E3b |
| E3c | 3 | Rango `ancho` | H3 | S-E3c |
| E3d | 3 | Frenó en B | H3 | S-E3d |
| E3e | 3 | Rango en A sin la pieza (R3.A.sin) | H4 | S-E3e |
| E3f | 3 | Rango `ok` en P o B sin la pieza | H1 | S-E3f |
| E4a | 4 | Eligió sin abrir ninguno de los 4 papeles que destapan | H1, H2 | S-E4a |
| E4b | 4 | Eligió B siendo A el bueno, habiendo abierto un papel que lo mostraba | H3 | S-E4b |
| E4c | 4 | Ninguna | H3 | S-E4c |
| E5a | 5 | Subida bruta (R5.4) | H4 | S-E5a |
| E5b | 5 | Inflado (R5.5) | H4 | S-E5b |
| E5c | 5 | Sin comparar: R5.8 o R5.9 sin los papeles requeridos | H1 | S-E5c |
| E5d | 5 | Escribió 0 con los papeles requeridos abiertos y `ρ > 1` | H3 | S-E5d |
| E5e | 5 | Aconsejó (a) o (b) en el turno 1 | H4 | sin sobre (solo registro) |
| E6a | 6 | `N` mal contado (R6.6) | H4 | S-E6a |
| E6b | 6 | Firmó tal cual en P o A (R6.1) | H2 | S-E6b |
| E6c | 6 | `podrían` en P o A (R6.4) | H3 | S-E6c |
| E6d | 6 | Frenó en B (R6.2 en B) | H3 | S-E6d |
| E7a | 7 | `x` incorrecto: escribió lo que se ve | H4 | S-E7a |
| E7b | 7 | Firmó tal cual en P | H2 | S-E7b |
| E7c | 7 | Rediseñó o frenó en B | H3 | S-E7c |
| E8a | 8 | Decidió con `e` menor que 2 | H1 | S-E8a |
| E8b | 8 | Esperó cuando se podía decidir (R8.8) | H3 | S-E8b |
| E8c | 8 | Financió o no financió contra la evidencia (R8.4 a R8.7) | H4 | S-E8c |
| E8d | 8 | Coincidió con el colega o lo contradijo contra lo que decía la evidencia | H3, H4 | sin sobre (solo registro) |

Más el sobre del paso 1, `S-P1` (no abrió ninguno de los papeles con sueño): 29 + 1 = **30 sobres**, dos de ellos sin texto propio (`E5e`, `E8d`) porque solo alimentan el registro.

**Clase de registro de los tres códigos que faltaban en `04` (propuesta del crítico v15, I1):** `E2d` → *sobrecorrigió*, hábito H3; `E3f` → *acierto sin evidencia* si el clave estaba cerrado o *sobrecorrigió* si lo abrió y no puso la pieza, y **cuenta para H1 solo cuando el clave estaba cerrado**; `E5e` → solo registro, H4 dentro del caso 5.

**8.2 Hábito.** Un hábito es la misma clase en **dos casos distintos**; H4 se cumple también dentro del caso 5 (que tiene dos turnos: `E5e` en el turno 1 y `E5a` o `E5b` en el turno 2). Las cuatro clases:
- **H1** decidir sin abrir lo que importa: `E2a, E2b, E3a, E3f, E4a, E5c, E8a` (7).
- **H2** firmar de más: `E2a, E3a, E4a, E6b, E7b` (5).
- **H3** frenar, dudar o redactar de menos: `E2c, E2d, E3c, E3d, E4b, E4c, E5d, E6c, E6d, E7c, E8b, E8d` (12).
- **H4** creer lo que muestra el resultado propio o el dibujo: `E3b, E3e, E5a, E5b, E5e, E6a, E7a, E8c, E8d` (9).
Tres códigos están en dos clases (`E2a, E3a, E4a` en H1 y H2) y uno en H3 y H4 (`E8d`). **[RECONSTRUIR: confirmar la clase de `E3f`, `E5d` y `E5e`.]** La v2 perdida las repartió entre H1, H3 y H4; los conteos que el crítico v14 contó (H1 7, H2 5, H3 8, H4 5 con 7 códigos sin clase) solo cierran si `E3f` está en H1, `E5d` en H3 y `E5e` en H4, que es además lo que v15 propone. Las filas `E2c, E3c, E6c, E8d` en H3 y `E3b, E3e, E8c, E8d` en H4 vienen de `04` (v15, I1).

**8.3 DEFECTO · Los expedientes en la partida oficial.** La ficha de aprendizaje (T1.2, H5) dejaba el escalón 3 solo para la práctica abierta. Este diseño propone que **también en la oficial** aparezca, pero solo al cumplirse un hábito, solo al cierre del caso (nunca antes de decidir, así no se resuelve el caso con él) y como una pestaña que se toca si se quiere. **8 expedientes, 2 por hábito** (`R-H1a, R-H1b, R-H2a, R-H2b, R-H3a, R-H3b, R-H4a, R-H4b`, de `05` NT1.8), sorteados con k=10+caso; los escribe narrativa. En la práctica abierta aparece después de **cualquier** error. Si Ronald prefiere que la oficial no lo muestre, se apaga con un solo valor en `reglas-t1.ts`.

**8.4 DEFECTO · Práctica de un solo caso.** Desde el camino, cada carta ofrece «probar este caso con otras cifras»: ese caso solo, con C = 50, Voz = 50, 3 fichas, una semilla nueva derivada de la semilla y del intento, sin tocar la partida oficial. Es el escalón 4. Costo bajo: los generadores de cada caso ya son independientes.

**8.5 Sin bloqueo, probado:** ningún escalón deshabilita «Siguiente caso». Se prueba en `.test.ts`: para cada caso y cada código, el estado tras el sobre admite avanzar.

---

### 9. Economía

| Recurso | Cómo se mueve | Qué decisión cambia | Pasa al caso siguiente |
|---|---|---|---|
| **Credibilidad (C)** | Sube con frase bien armada, con el estudio bueno, con el número bien calculado; baja con la réplica | Frena firmar de más; si cae a 25 o menos, el caso siguiente tiene 2 fichas; la meta pide 65 | Sí |
| **Voz** | Sube al firmar; baja al frenar o con la frase tímida; el sorteo (c) del caso 5 cuesta 3 | Frena frenar de más y empuja a decidir; a 25 o menos, 2 fichas; la meta pide 65 | Sí |
| **Fichas de tiempo** | 3 por caso (2 si C o Voz ≤ 25); se gastan al abrir o al sacar tanda | Obliga a elegir qué mirar y qué dejar | **No**: se reponen cada caso |
| **Papeles abiertos** | Se guardan en el registro | Cambia qué piezas hay y qué evidencia vale | Solo para el registro (hábitos) |
| ~~Reputación, caja~~ | No existen en este tema | | Sobran: no cambiarían ninguna decisión que ya cambien C y Voz |

**Cada recurso cambia decisiones.** C lo hace porque su caída baja las fichas y porque la meta lo pide; Voz también. Si uno solo importara, «firmar siempre» o «frenar siempre» ganarían.

---

### 10. Dificultad

El orden de 3 a 7 se baraja, así que **la dificultad no sube con la posición**; sube con lo que cada caso pide y con lo que el propio alumno se hace:

| Palanca | Dónde |
|---|---|
| **Más datos**: 6 papeles por caso y nunca se abre todo | todos |
| **Datos que sobran**: 4 de los 6 son señuelos con fecha o cifra verosímil (en el caso 2, 2 señuelos caen en la ventana del cambio y entran siempre) | todos |
| **Datos que hay que conseguir**: el clave no está a la vista; en el caso 8 hacen falta **dos** | 2 al 8 |
| **Cuentas**: rango (2 números) en el 3, conteo de la hoja en el 6, diferencia en el 7, comparar dos mediciones en el 5 | 3, 5, 6, 7 |
| **Eventos**: el castigo de 2 fichas al caer un medidor a 25; el colega que a veces acierta; el segundo turno del caso 5 un mes después; el caso 2 que a veces está bien | 2, 5, 8 |
| **Práctica abierta**: sin la ayuda del paso 1 y con el expediente después de cualquier error | práctica |

---

### 11. Que ninguna estrategia gane sin entender

**11.1 Costo por los dos lados.** Cada decisión de abajo tiene un costo si se toma de más y otro si se toma de menos:
- Firmar de más: C −20 (casos 2, 3, 4, 6 en P o A), −10 (caso 7 en P con rótulo bueno).
- Frenar de más: Voz −8 a −15 (casos 2, 3, 6, 7), 0/−10 (caso 4), 0/−8 (caso 8), +2/−6 (caso 5).
- Rediseñar de más (caso 7 en B): 0/−4. Rango ancho: 0/−2 y sin ganar. Esperar de más (caso 8): 0/−8. Elegir «la chica» siempre (caso 4): 50 % de −20. Dudar siempre del cero (caso 2): −15 de Voz en 1 de cada 3.

**11.2 Sin prueba y error.** La consecuencia llega al cierre; la decisión sellada no se rehace; en la práctica abierta se rehace **con otro caso** (otra semilla). Los medidores no se mueven mientras se abre. En ninguna rama de la secc. 5 hay una pantalla donde el alumno vea el efecto de una decisión y pueda cambiarla.

**11.3 El número decide y no hay patrón fijo.** Enumeración de cada número que escribe el alumno:

| Número | Dónde | Qué cambia en el mundo |
|---|---|---|
| Las 3 respuestas del paso 1 | Paso 1 | **Nada** (único peaje, a propósito; ver P1.2) |
| `a` y `b` | Caso 3 | Cuatro niveles de efecto (R3: `ok` con pieza, `ok` sin pieza o `flojo`, `noCubre`, `ancho`) |
| `x` (cuánto subió) | Caso 5 | Seis niveles de efecto (R5.4 a R5.9) |
| `N` (conteo) | Caso 6 | −10 a C si falla, y entra en la conclusión |
| `x` (diferencia) | Caso 7 | Rótulo del gráfico: distinto efecto en R7.1 a R7.4 |

Total: 5 números de decisión (los 5 campos: `a`, `b`, `x`, `N`, `x`) y 3 de adorno. Ningún caso se decide eligiendo entre dos frases donde la prudente se nota sin calcular: las frases se arman con piezas que solo existen si abriste el papel (casos 2, 3 y 6), y la «prudente» sin papel (`podrían`, G1 a G3 del caso 2) cuesta −8. **Patrón que se aprende:** el tipo no se repite (G7: ni «el último es aún no», ni «el grande es el malo» (50/50 en el caso 4), ni «un solo caso está bien», ni «el caso 2 siempre es problema»), y el clave cambia por versión. La única constante es el caso 5, que es siempre un problema porque es la vergüenza (la regresión), y su respuesta correcta cambia con `ρ`.

**11.4 Valor intermedio que solo se encuentra calculando.** Caso 3: el rango bueno es el que cubre y no pasa de 1,2 h; escribir muy angosto arriesga (no cubre: −10/+4), muy ancho no gana (0/−2); y aun el rango bueno rinde poco sin la pieza del papel. Caso 5: la cuenta buena queda a ±1,0 de `ρ`, entre la subida bruta (muy lejos) y escribir 0 (solo vale en 1 de cada 5 versiones).

**11.5 Estrategias perezosas, corridas.** Dos pruebas exactas y las demás con simulación. El simulador del crítico v14 **se perdió con la v2**; `scripts-t1/simular_t1_v2.py` es uno nuevo, hecho con las mismas tablas y los supuestos que v14 declara (20 000 versiones por estrategia, semilla 20261008, meta 65/65, `ρ ~ N(δ; 4,4)` recortado a [−4, 10], refuerzo del caso 2 al 50 %, todos cuentan bien `N` y escriben el `x` correcto del 7). Su salida está en `scripts-t1/salida_simular_t1_v2.txt`.

*Exactas (probadas con `contar_t1_v2.py`, sin simulación):*
- **E-S1 «Firmar siempre, sin abrir nada»** (caso 2 tal cual; 3 tal cual; 4 siempre A; 5 aconsejar (a) y escribir 0; 6 tal cual; 7 tal cual con `x` de la hoja; 8 financiar): **no puede pasar.** Las diez sumas de C de los casos 3, 6 y 7 son 0, −25, −25, −25, −25, −30, −5, −5, −30, −30 (máximo 0, gracias a G5). Lo mejor posible en lo demás es +5 (caso 2 en B sin evidencia), +5 (caso 4), +4 (caso 5, R5.8) y 0 (caso 8, R8.3): **50 + 0 + 5 + 5 + 4 + 0 = 64 < 65.** Todos los aumentos posibles juntos suman 29 (5 + 5 + 4 + 15).
- **E-S2 «Frenar siempre»** (caso 4 ninguna; caso 5 frenar; caso 8 esperar): **no puede pasar.** Los 13 efectos de frenar sobre Voz son negativos (el menos malo es −6), así que Voz queda siempre por debajo de 50 y no llega a 65.

*Simuladas (20 000 versiones). Se muestran los números del crítico v14 y los de esta reconstrucción; donde difieren, es el modelo de «abrir al azar», no las tablas:*

| Estrategia | v14 (original perdido) | Esta reconstrucción |
|---|---|---|
| E-S1 firmar siempre | 0,0 % | 0,0 % |
| E-S2 frenar siempre | 0,0 % | 0,0 % |
| E-S3 / E-S3b / E-S3c: lo intermedio sin papeles (c5 frenar; c5 escribe 0; y el 7 mira el dibujo) | 0,0 / 0,0 / 0,0 % | 0,0 / 0,0 / 0,0 % |
| **Mejor política fija que nunca abre un papel** (21 600 políticas, re-medida en versiones nuevas) | **4,8 %** | **5,0 %** |
| …la mejor sin mirar el dibujo del 7 | 3,2 % | 3,4 % |
| E-S4 abre 3 al azar; si no halla, firma | 22,0 % | 34,9 % |
| E-S5 abre 3 al azar; si no halla, frena | 8,8 % | 15,7 % |
| E-S6 rediseña siempre el 7, lo demás con p = 0,65 / 0,80 / 1,00 | 53,0 / 77,4 / 100 % | 35,1 / 64,0 / 100 % |
| E-S7 escribe 0 siempre en el 5 (p = 0,65 / 0,80 / 1,00) | 61,4 / 83,9 / 100 % | 47,7 / 74,6 / 100 % |
| E-S8 espera siempre en el 8 (p = 0,65 / 0,80 / 1,00) | 42,6 / 67,6 / 100 % | 32,8 / 58,6 / 100 % |
| E-S9 copia las decisiones de otra versión | 0,3 % | 0,5 % |
| **E-S10 entiende** (p = 0,50 / 0,65 / 0,80 / 0,95); si falla, cubre con **lo prudente** | 37,6 / 64,6 / 87,5 / 99,3 % | 23,9 / 49,0 / 77,3 / 97,7 % |
| …si falla **firma** (como la ficha) | 43,5 / 68,4 / 89,0 / 99,4 % | 48,7 / 71,4 / 89,9 / 99,3 % |
| …si falla va a lo **intermedio** | 67,4 / 85,6 / 96,1 / 99,8 % | 64,1 / 83,5 / 95,4 / 99,8 % |

**Lo que dicen las dos columnas, y lo que no.** (1) La cifra que sostiene «sin estrategia dominante» es la de la mejor política que nunca abre un papel: **5,0 % contra 4,8 %**, muy por debajo del umbral declarado de **15 %**, y ninguna de las 21 600 pasa 10 %. Coinciden además las cotas exactas, la caída a 12,5 % con meta 60/60 (v14: 14,6 %) y a 0,9 % con 70/70 (v14: 1,0 %), y que la mejor política ya no frena en el caso 2 (firma tal cual, compara la cifra del oficio con la media de 2 tandas, elige siempre A, aconseja (a) y frena, redacta `podrían`, compara la hoja con el dibujo y espera). (2) Las tres sobrecorrecciones (E-S6, E-S7, E-S8) quedan **por debajo** de quien entiende con el mismo p en las dos columnas, que era lo que había que probar. (3) Difieren E-S4, E-S5, E-S6 a E-S8 y E-S10 «prudente»: en mi modelo, quien abre al azar o cubre con lo prudente se comporta de otra manera (por ejemplo, en el caso 7 resuelve con la hoja sin necesitar el clave, y «prudente» frena en los casos 2, 3, 6 y 7). No pude saber cuál detalle del original explica la diferencia; los cuatro que más importan (la mejor política sin papeles, E-S1, E-S2 y las cotas exactas) coinciden. **Lo que vale para decidir es la columna v14; la mía es una segunda medición independiente, no un reemplazo.** (4) **El 80 % de acierto de quien entiende es una estimación, no un dato:** solo se mide con alumnos reales.

**Declaraciones que pidió el crítico v14.**
- *Respaldo de E-S10 (hallazgo 2):* con p = 0,80, quien entiende pasa **entre 87,5 % y 96,1 %** según con qué se cubra cuando no halla el clave (lo prudente 87,5; firmar 89,0; lo intermedio 96,1). Ninguna cifra única es «el» pase de quien entiende.
- *E-S4 no es «sin papeles» (hallazgo 3):* el umbral de 15 % es para la política que nunca abre. Quien abre 3 papeles al azar y firma si no halla pasa 22,0 % (v14), falla por C en el 78 % y paga justo lo que el tema enseña.
- *Hueco abierto (hallazgo 1 de v14, decide Ronald):* quien abre 3 al azar y se cubre con lo intermedio pasa **61,7 %** con meta 65/65, y quien entiende con p = 0,50 y el mismo respaldo, 67,4 %. Con meta 60/70/75 el azar con respaldo intermedio pasa 75,6 / 46,9 / 28,9 % y quien entiende con p = 0,80, 99,0 / 92,2 / 82,3 % (cifras de v14, no repetidas aquí). No es un error de las tablas (abrir 3 de 6 da con el clave la mitad de las veces por construcción). **Valor por defecto: dejar 65/65**; subir a 70/70 es un número en `reglas-t1.ts`.

**11.6 Un arreglo se vuelve a probar (regla 10).** Cada arreglo de la v13 se jugó otra vez como alumno perezoso:
- *G5 aplicada (cambios 1 y 5):* firmar sin abrir ya no puede pasar (64 < 65, exacto). La búsqueda de las 21 600 políticas no encontró ninguna sobre 10 %.
- *Prudencias más baratas (cambios 2, 3 y 4):* la mejor política ya no frena en el 2 ni espera por sistema; quedó en 5,0 %.
- *`ok` con pieza (cambio 9, el cierre de H2):* la receta «dos tandas y escribe siempre 1,2» rinde +3/0 en P, 0/+2 en B y −8/+4 en A cuando no hay pieza: no domina (E-S3 y E-S3b dan 0,0 %). Es el arreglo que la v13 había dejado abierto.
- *Meta 65 (cambio 8):* con 60 la mejor sin papeles queda en 12,5 % (14,6 % en v14), sin margen; con 65, en 5,0 %.
- *Caso 2 en B (cambio 13):* v14 midió 4,8 % con B en 1 de 3 y 3,4 % sin B: no crea estrategia dominante, y frenar siempre el cero cuesta −15 en 1 de 3.
- *Aviso de método:* un arreglo puede crear una estrategia dominante nueva (pasó con «garantizado entre dos temas»). Esta v2 no encontró ninguna, pero la nueva que sí apareció es la del hueco abierto de arriba (azar más respaldo intermedio), y por eso está escrita.

---

### 12. Qué queda registrado (sin puntaje)

Eventos que guarda la partida (se reconstruye todo desde ellos; el docente recalcula sin confiar en lo guardado):

| Evento | Datos |
|---|---|
| `p1.respuestas` | `propias: bool` (no los valores) |
| `p1.abrio` / `p1.ayudado` | papel, ficha gastada |
| `caso.entra` | caso, tipo, fichas, C, Voz |
| `abrir` | caso, papel, rol (clave, refuerzo, señuelo) |
| `tanda` | caso 3, índice, media |
| `escribir` | caso, campo, valor, correcto (sí/no/banda); caso 3: nivel (`ok`, `flojo`, `noCubre`, `ancho`) y **si el rango llevó la pieza**; caso 5: `ρ` de la versión y qué banda tocó |
| `armar` | caso, piezas |
| `evidencia` | caso 8, papeles puestos |
| `lector` | caso 7, antes y después |
| `sella` | caso, decisión, C/Voz aplicados, código `E…` si lo hay |
| `sobre` | escalón visto |
| `expediente` | expediente abierto |
| `carta` | idea, orden |
| `cierre` | `plazaFija`, C, Voz |
| `practica` | caso, intento |

Con eso `registro-t1.ts` calcula, por idea, la clase de T1.5 (`descubrió solo`, `descubrió con pista`, `se dejó engañar`, `acierto sin evidencia`, `sobrecorrigió`), la **rama** de la revelación (V3), el escalón en que acertó, los hábitos (8.2, tabla única de 8.1) y el cambio de opinión (abrió en el caso siguiente el tipo de papel que había saltado). Para la idea 7 la clase sale del lector antes y después y de `x` (cambio 14), no de abrir papeles. **Sin nube del paso 1:** solo `propias`. La página del docente muestra una línea por alumno con 8 casillas, como pide T1.5.

---

### 13. Qué hay que construir y en qué orden (etapa 6)

Cada pieza nueva, con su `.test.ts`; las pruebas fijan las propiedades de abajo.

| # | Pieza | Pruebas mínimas |
|---|---|---|
| 1 | `tipos.ts` (G7, G8, G9) con `semilla * 100 + k` | Las 10 tiradas se cumplen; conteos P4 B4 A2 del caso 3; caso 2 en B en 1 de 3; que la misma semilla da lo mismo |
| 2 | `medidores.ts` (G1, G2, G6) | Tope; umbral 25 baja a 2 fichas; plaza fija con 65 y 65 |
| 3 | `carpeta.ts` (G3, G10) | Gasto; reabrir no cuesta; con 3 de 6 hay clave con prob. 0,50; en el caso 2 el clave y los 2 señuelos de la ventana entran siempre |
| 4 | `armador.ts` (M3) | Pieza clave solo existe con el papel abierto; 2 a 3 piezas |
| 5 | `reglas-t1.ts`: las tablas R2 a R8 y la tabla única de 29 códigos y 4 hábitos como **datos** (se generan de `tablas_t1_v2.py`) | 46 filas, 29 códigos con hábito, 7 filas de G5 (cinco valen la mitad de su fila); `E…` mapeados |
| 6 | `tandas.ts` | Cobertura 50 % y 75 % del rango mínimo-máximo con 2 y 3 tandas, 88,7 % y 97,5 % con holgura (la ficha ya los calculó); puerta de 2 tandas; rango `ok` sin pieza rinde como `flojo` |
| 7 | `bienestar.ts` | `ρ` dentro de [−4, 10]; I2, I3 e I4; que los 13 peores suban sin taller; `P(\|ρ\| ≤ 1)` = 22,3 % y 16,1 % |
| 8 | `grafico.ts` y conclusión (casos 6 y 7) | `N` correcto; `x` correcto; sesgo del eje |
| 9 | `ayuda.ts` | Siempre se puede avanzar (8.5); un hábito se cumple con dos clases en dos casos; la tabla de 8.1 completa |
| 10 | `registro-t1.ts` | Clasifica en las 5 clases; las 71 ramas de la revelación se calculan con los eventos de la secc. 12; acierto sin evidencia en caso 8 con `e < 2` |
| 11 | Simulación de perezosos | Portar `simular_t1_v2.py` a una prueba: E-S1 y E-S2 no pasan; la mejor política sin papeles queda bajo 15 % |
| 12 | `guion-t1.ts` | `problemasDeTexto` sin voseo ni guiones largos |

**Lectura y tamaño de letra (regla del texto que se lee).** Esta entrega no dibuja ninguna pantalla: lo medible se mide en construcción. Se fija aquí lo que las pantallas nuevas deben cumplir: letra mínima de **6 px lógicos en el lienzo del boceto, que son unos 12 px en un celular de 375 px de ancho** (`MIN_LOGICO = 6` en `medir_legibilidad.py`); contraste mínimo 4,5 a 1. Con la paleta del boceto, calculado con script (`contar_t1_v2.py`): etiquetas de los tubos `#b8d4ff` sobre `#07060d` = 13,4 a 1; `#ffdc94` sobre `#07060d` = 15,3 a 1. Los demás textos se miden con `medir_legibilidad.py`. **Estados que `?medir=1` debe recorrer:** entrada de cada caso, papel abierto, tira de piezas, casilla numérica con teclado abierto, sobre de la jefa, carta dada vuelta. Los dos riesgos que ya ocurrieron (sello que tapa el titular, números que se pisan con «TIEMPO») se vigilan en la entrada y el cierre de cada caso.

---

### 14. Ajustes que este documento hace a la ficha (para que el crítico los mire)

| # | Ajuste | Por qué |
|---|---|---|
| 1 | Casos 6 y 7: la **hoja** (respuestas recibidas, hoja de datos) va **adjunta**, no entre los 6 papeles; la ficha tenía la lista de 60 y la hoja con la escala entre los 9 | Sin esa hoja no se puede escribir el número; los claves de 7 pasan a ser correo, captura y ficha técnica |
| 2 | Caso 3: puerta de 2 tandas, nivel `flojo`, tabla por tipo y `ok` solo con pieza (R3) | H2 y la estrategia dominante nueva que crea una holgura sola |
| 3 | Caso 5: tres caminos con costos distintos, sesgo +2,5 dicho como número en (b), bandas ±1,0, `ρ` sin forzar a δ, orden de reglas R5.3 a R5.9 | Que la regresión salga de una regla y que (a), (b) y (c) no se dominen |
| 4 | Caso 6: base con `N` siempre; cuatro extensiones; `podrían` ≡ sin clave | H1 y que el número decida en toda rama |
| 5 | Caso 7: rótulo con `x` en toda publicación; tal cual en P baja a −10/+10 con rótulo correcto | H1 y el número que decide |
| 6 | Caso 8: poner papeles sobre la mesa; `e` escala el efecto; «financiar cuando aún no» = −15/+6 | H3 |
| 7 | Escalón 3 en la partida oficial al cumplirse un hábito (DEFECTO) | H5 |
| 8 | «Probar este caso con otras cifras» (DEFECTO) | Es el escalón 4; la ficha dejaba repetir «el juego» entero |
| 9 | Las tablas de estrategias de la ficha, secc. 8, se volvieron a correr con las tablas v2 | Las tablas R2 a R8 cambiaron (11.5) |
| 10 | Meta del cierre 65/65 y marcas 25 y 65 (la ficha decía 60 y 60) | Con 60 la mejor política sin papeles queda en 12,5 a 14,6 %, sin margen |
| 11 | Caso 2 con problema en 2 de 3 versiones y bien en 1 de 3 (la ficha: siempre con problema) | Contra el dictado entre compañeros y para que frenar siempre no gane (D-T1-1) |
| 12 | «Acierto sin evidencia» con filas propias en los casos 2, 3, 4 y 6 (la ficha no las tenía) | G5 estaba declarada y no aplicada (v13 hallazgo 1) |
| 13 | Prudencias más baratas: frenar en el caso 2 en P +3/−8, base sola del caso 6, esperar de más 0/−8, decisión correcta sin evidencia en el caso 8 0/0 | Que lo prudente no pague más que decidir con evidencia |
| 14 | Caso 5: el sorteo (c) cuesta 3 de Voz (la ficha: 6) y escribir un número que no sale de tus papeles da −10/0 | Que la opción que se quiere enseñar no sea la peor pagada (v13 hallazgo 3) |
| 15 | Paso 1: los papeles con sueño traen 2 de las 3 columnas (la ficha: las mismas tres preguntas) | Que el asombro no parezca armado (v13 hallazgo 9) |

**Los hallazgos de v13 y dónde quedaron.**

| Hallazgo v13 | Dónde queda |
|---|---|
| 1 se pasa la meta sin abrir un papel | cambios 1 a 5 y 8; 11.5 (5,0 %) |
| 2 el cierre de H2 no cerró | cambio 9; 11.6 |
| 3 caso 5: el sorteo mal pagado, «escribir 0» | cambios 10 a 12 |
| 4 casos 6 y 7: la hoja adjunta deja los claves de decorado | cambio 14 (D-T1-2) y secc. 12 |
| 5 ramas de la revelación mal asignadas | V3: 71 ramas por tipo y opción |
| 6 cifras viejas de las estrategias en `04` T1.6 | aviso a aprendizaje (secc. 15) |
| 7 los hábitos casi no se disparan | cambio 6; 8.2 (H4, 29 de 29 con hábito) |
| 8 caso 5: precisión que 13 contra 13 no tiene | cambio 11 |
| 9 cosméticos | G9 (cambio 16), G10 (cambio 7), paso 1 (cambio 17), filas marcables (cambio 15); «probar con otras cifras» ilimitado se mantiene (sin nota no daña); «al elegir (a) por segunda vez» y las líneas largas pasan a aprendizaje |

---

### 15. Avisos para otras partes

- **Aprendizaje (`04`):** (1) **I1:** reemplazar su tabla T1.5b por la de 8.1 (29 códigos; agrega `E2d`, `E3f`, `E5e`; todos con hábito), corregir su fila del caso 2 en T1.5a (en B **sí** existe el acierto sin evidencia, R2.1.sin) y limpiar T1.3, T1.4 y T1.6 de «siempre con problema», «48 filas vacías de 60» y las cifras viejas de estrategias (0 %, 22 %, 0,5 %). (2) **B1:** agregar «con pieza / sin pieza» como variable del caso 3 en P y B: el `ok` sin pieza va a la rama F3b, no a F3a (y `ramas_t1.py` debe importar los estados del bucle). (3) **B2:** F5h dice «Abriste con qué comparar y escribiste 0. La cuenta bien hecha daba {rho}.»; `E5d` es `ρ > 1` (5.4). (4) **I6:** F5a a F5c sin afirmar causa. (5) Adoptar F2f a F2j con id y fila en T1.7a. (6) Meta 65/65, marcas 25/65, 8 expedientes, hábitos H1 a H4. (7) «Cartas» en vez de «fichas» para la revelación. (8) Caso 3: «los estudiantes del colegio» (I5a). (9) Los tres textos de más de 25 palabras. (10) Dejar «al elegir (a) por segunda vez» solo para la práctica.
- **Narrativa (`05`):** (1) **I2:** la jefa se parece a la de AIEF (vidrio, frases cortas, sello); recomendado sacarle vidrio y sello (decide Ronald, valor recomendado A del crítico). (2) **I3:** C6-2 en P debe decir que las respuestas de la hoja son de {curso}; la pieza `grupo` de A se parte en dos. (3) **I7:** caso 5, turno 1: la aprobación de (a) y (b) no debe venir de la jefa. (4) **I5:** los cinco huecos del mundo (480, el encargo del paso 1, Horizonte y Beto, el mes del caso 5, la transición al caso 8). (5) **C1** (títulos con «titular»), **C5** (R8.4 a R8.7 con «recomendaste no financiar»), **C6** (dos líneas que dan la lección), **C9** (`{fuente}` por caso). (6) Los sobres `S-E5d` y `S-E3f` deben seguir las definiciones de 5.2 y 5.4.
- **Sonido (`07`):** los hallazgos I4 y C8 de v15. Regla que el bucle fija: **ningún sonido reacciona al valor que el alumno escribe antes de sellar** (G4 y 11.2: sería una pista para el tanteo), y el sonido del turno 2 del caso 5 no anuncia el resultado antes de que llame el director vecino.
- **Crítico:** (1) volver a revisar esta sección, en particular las 7 filas de G5 y los 7 puntos marcados [RECONSTRUIR] de la secc. 16; (2) la decisión de la meta 65/65 con las cifras de 11.5; (3) correr los scripts de `scripts-t1/` en su máquina.
- **Construcción:** `reglas-t1.ts` es **datos**, no lógica suelta, para ajustar números tras la primera prueba sin tocar reglas; el umbral 65 y 25 y todos los efectos pueden cambiar después de probar con alumnos. El etiquetado en pantalla cambia de «Lectores» a «Voz» en el boceto.
- **Código existente:** no se tocó `escalera.ts` ni nada de AIEF; el cambio de su tercer escalón sigue esperando el OK de Ronald.

---

### 16. Lo que no se pudo reconstruir (marcado [RECONSTRUIR])

1. **Texto exacto de D-T1-1 y D-T1-2** y de sus preguntas, si las hubo (secc. 0). Se definen por su uso en v14 y v15.
2. **Numeración original** de los cambios 1 a 7, 14 y 16 de la secc. 0 (la lista de 17 es la del crítico v14; el reparto en filas es de esta reconstrucción donde dice «n.º original» sin número).
3. **Enunciado exacto de I1 e I2** del caso 5 (5.4). Las fuentes solo dicen que ya no fuerzan `ρ` cerca de δ.
4. **Clase de hábito de `E3f`, `E5d` y `E5e`** (8.2): deducida de los conteos de v14 y de las propuestas de v15; si la v2 perdida los repartía distinto, cambian dos filas de la tabla.
5. **Código de tres decisiones** (frenar en P o A del caso 3; firmar tal cual en P o A del caso 3 con 2 o más tandas; número con `ρ < −1` en el caso 5): las fuentes no les dan `E…`.
6. **R3.B `ok` con pieza = 0/+4:** valor de la v1; ninguna fuente de v2 lo repite.
7. **El simulador del crítico v14** y sus salidas: se rehicieron; los números de E-S4, E-S5 y E-S10 «prudente» no coinciden con v14 (11.5). Quien tenga la otra PC puede buscar `scratch/simular_t1_v2.py` y las `salida_v2_*.txt`.

---

### Lista de salida · Tema 1 · bucle v2 (reconstruida)

Cada línea dice cómo se probó: `script` (con su archivo en `scripts-t1/` y su salida), `a mano` (solo lo que no se puede contar, con el motivo) o `pendiente` (cuenta como ✘). Las salidas están en `salida_contar_t1_v2.txt` y `salida_simular_t1_v2.txt`; ambos se corren con `python -I`.

| Regla | ✔/✘ | Cómo | Prueba contada |
|---|---|---|---|
| Bucles en tres escalas, con flechas | ✔ | a mano (un dibujo no se cuenta) | Secc. 1.1, 1.2 (7 pasos numerados), 1.3: 3 de 3 |
| Catálogo de modalidades con ficha por mecánica | ✔ | script | `contar_t1_v2.py`: M1 a M14 (14). Tipos presentes: cálculo (M6, M9, M10), decisión (M2, M3, M7, M8, M10, M11), exploración (M1, M4, M14), minijuego (M5) |
| Retroalimentación y dominio; escalera sin bloquear | ✔ | a mano | 7.1 (4 situaciones) y secc. 8 (4 escalones); la prueba programada de «Siguiente caso siempre habilitado» (8.5) es de construcción, pieza 9 |
| Economía: cada recurso cambia decisiones | ✔ | a mano | Secc. 9: 4 recursos y 2 descartados con motivo |
| Dificultad | ✔ | a mano | Secc. 10: 6 palancas |
| **Sin estrategia dominante, probado buscando** | ✔ | script | `simular_t1_v2.py`: E-S1 y E-S2 0,0 % y exactas (64 < 65); E-S3, E-S3b, E-S3c 0,0 %; **búsqueda de las 21 600 políticas que nunca abren un papel: la mejor pasa 5,0 % (v14: 4,8 %), umbral declarado 15 %**; ninguna sobre 10 %; sin mirar el dibujo del 7, 3,4 %. Quedan declarados el hueco de 61,7 % (azar más respaldo intermedio, decide Ronald; por defecto 65/65) y que E-S4 (22,0 % en v14) no es «sin papeles» |
| Cada regla general (G1 a G12) aparece aplicada en todas las tablas que le corresponden | ✔ | script | `contar_t1_v2.py`: 23 comprobaciones caso por caso (G2, G3, G4, G5, G7, G10, G12); G5: 7 filas nombradas, cinco valen exactamente la mitad, casos 2, 3, 4, 5, 6 y 8 la nombran y el caso 7 se declara fuera (D-T1-2). G1, G6, G8, G9 y G11 son globales y están una sola vez |
| Lo declarado no lo contradice otra línea (papeles por caso, fondos, «ok» del rango) | ✔ | script + a mano | Fondo de 9 en los 8 casos (G10, P1.3, 5.4 con sus 9 nombres, 5.5, 5.7: 2 claves + 4 de 7 señuelos = 6); `ok` = `b − a ≤ 1,2` en 5.2 y 11.4; meta 65 y marcas 25 y 65 en G6, G11, P1.6, 1.3 y 9 (`contar_t1_v2.py`). La relectura de las cifras de 11.1 contra las tablas es a mano |
| Tablas v2 = lo que escribe la narrativa v3 | ✔ | script | 46 filas R2 a R8 (R2 5, R3 5, R4 7, R5 9, R6 7, R7 5, R8 8); 83 efectos en la línea de su fila; 51 pares de efectos de las reacciones de `05` (NT1.6) leídos, 0 diferencias |
| Una sola tabla de códigos de error y hábitos (v15, I1) | ✔ | script | 29 códigos (E2 4, E3 6, E4 3, E5 5, E6 4, E7 3, E8 4) con `E2d`, `E3f` y `E5e`; 29 de 29 con hábito; H1 7, H2 5, H3 12, H4 9 (`E8d` en dos); 30 sobres = `S-P1` + 29, dos sin texto propio |
| Los 17 cambios de la v2 y los 15 ajustes a la ficha | ✔ | script | `contar_t1_v2.py`: 17 filas en la secc. 0 y 15 en la secc. 14. Los 17 son el número que contó el crítico v14; el reparto es de esta reconstrucción (ver secc. 16, punto 2) |
| No se ajusta por prueba y error | ✔ | a mano | G4 y 11.2: la consecuencia llega al cierre; la decisión sellada no se rehace; el sonido no reacciona al valor escrito (secc. 15) |
| El número decide y no hay patrón fijo | ✔ | a mano (se enumera, no se puede contar con script) | 11.3: 8 números, 5 deciden (`a`, `b`, `x`, `N`, `x`) y 3 son de adorno (paso 1, dicho a propósito); el tipo cambia por versión, también en el caso 2 |
| Cada subtema, su juego | ✔ | a mano | 8 mecánicas de caso distintas; la única compartida es M3 (frase con piezas) en los casos 2, 3 y 6, donde es la que mejor enseña |
| Un arreglo se vuelve a probar | ✔ | script | 11.6: G5, prudencias baratas, `ok` con pieza, meta 65 y caso 2 en B, jugados otra vez; ninguno crea una estrategia dominante nueva (0 de 21 600 sobre 10 %) |
| Tuteo, castellano neutro, sin guiones largos, sin voseo | ✔ | script | `contar_t1_v2.py`: 0 guiones largos, 0 formas de voseo; `buscar_voseo.py` sobre la sección extraída con `extraer_v2.py`: «sin voseo» |
| No manda a leer el dossier ni enseña software | ✔ | script | `contar_t1_v2.py`: 0 menciones de jamovi, EViews, Excel, SPSS ni «según el dossier» en la sección |
| Sin nota; individual | ✔ | a mano | G6 (solo cambia el diálogo y el registro); ningún careo ni juego en grupo: el colega Beto es un personaje |
| Cada alumno tiene su respuesta correcta | ✔ | a mano (el tema no mide nota; se sigue cumpliendo para que el registro no se copie) | G7 a G9 y G10: tipo de los casos 2 a 8, estudio bueno, δ, papel clave, 6 de 9 papeles y cifras salen de la semilla; copiar a otra versión pasa 0,3 % (v14) y 0,5 % (esta reconstrucción) |
| Oficio de la carrera (tres líneas) | ✔ | a mano | Arriba de la sección: Psicología · psicólogo de colegio · psicólogo del Departamento de Orientación; el papel lo haría un profesional de la carrera: sí |
| Reutiliza el motor, no el contenido de otro juego | ✔ | a mano | Secc. 3: `partida.ts`, `version-alumno.ts`, `azarConSemilla`, `nube.ts`, `problemasDeTexto`; nada de AIEF; el parecido de la jefa queda como aviso a narrativa (secc. 15) |
| Web y app por igual | ✔ | a mano | Todo es tocar, arrastrar piezas o escribir en una casilla (con el teclado abierto, estado a medir); la partida se reconstruye de los eventos y se guarda al volver la conexión |
| Texto que se lee: 12 px, 4,5 a 1, nada tapado | ✔ (parcial) | script para el contraste; el resto es de construcción | `contar_t1_v2.py`: 13,4 y 15,3 a 1. Esta entrega no dibuja pantallas: el tamaño y el tapado se miden en construcción con `medir_legibilidad.py` (secc. 13), no aquí |
| Lo aprobado no se reabre | ✔ | a mano | Ideas, forma elegida y aspecto A intactos; los 15 cambios a la ficha están declarados en la secc. 14 como ajustes que el crítico revisa |
| Archivos tocados | ✔ | a mano | Solo `02-bucle-y-mecanicas.md` (esta sección, arriba de la v1, y una frase en el título de la v1) y la carpeta nueva `scripts-t1/` (4 scripts y 2 salidas). No se tocaron `04`, `05`, `06`, `07` ni `RETOMAR.md`; no se hizo commit |
| **La v2 es idéntica a la que revisó el crítico** | **✘** | no se puede probar | La original no se guardó. Lo que se puede probar (46 filas, 29 códigos, 17 cambios, 15 ajustes, 12 reglas G, 14 mecánicas, cotas exactas, mejor política sin papeles 5,0 % contra 4,8 %) coincide; lo que no (texto exacto de D-T1-1 y D-T1-2, la numeración de 9 de los 17 cambios, I1 e I2 del caso 5, la clase de hábito de tres códigos, tres decisiones sin código, el simulador de v14) está en la secc. 16 con 7 puntos [RECONSTRUIR]. Es un ✘ explicado y no se puede cerrar sin la otra PC o sin que Ronald o el crítico confirmen esos puntos |

---

## Psicoestadística Descriptiva (Psicología) · Tema 1 «La mesa de verificación» · bucle y mecánicas · versión 1 · 08-10-2026 (superada por la v2 de arriba; se conserva como historia)

> **Estado:** entrega de la etapa de bucle, para el crítico. Autor: diseñador de bucle. **Sin nota** en este tema (decidido; no se pregunta): lo que se guarda es registro.
> **Parte de:** las 8 ideas APROBADAS, la ficha ELEGIDA `00-tema1-forma1-ficha.md` (las cifras de la ficha mandan salvo donde la sección 14 dice que este documento las ajusta), el aprendizaje `04-aprendizaje.md` (secc. «Tema 1 · aprendizaje v1», T1.1 a T1.9) y el aspecto A «La redacción de noche», con el boceto vivo `docs/juego/bocetos/motores/aspecto-A/index.html` (Caso 2) como lo único que existe visualmente. Nada de eso se reabre.
> **Decisiones pendientes de Ronald: ninguna.** Hay dos valores por defecto que él puede cambiar cuando lo juegue (marcados DEFECTO en 8.3 y 8.4); no bloquean nada.
> **Qué NO se hizo:** en esta tarea no hubo terminal. Ningún script se corrió. Las cuentas de abajo son **exactas a mano** (combinatoria y cotas) y están marcadas así; las simulaciones de estrategias perezosas con las tablas nuevas están **especificadas en 11.5 y pendientes de correr** por quien tenga terminal, antes de que el crítico dé su veredicto sobre ellas.
> **Dónde se juega qué:** cada mecánica de abajo vive en un solo caso (nada se estira a otro tema). Dos piezas nacen como motor porque el Tema 6 las va a necesitar: la carpeta de papeles con presupuesto y el armador de frases por piezas.

**Palabras de oficio, una línea cada una:**
- **Evento:** un hecho guardado de la partida («abrió el papel 3», «escribió 7»); desde los eventos se reconstruye todo, incluso el registro.
- **Semilla:** el número que fija qué versión recibe el alumno; la misma semilla da siempre la misma versión.
- **Tope (*clamp*):** un medidor no baja de 0 ni sube de 100.
- **Papel clave / refuerzo / señuelo:** el que destapa el problema o confirma que no lo hay / el que da una cifra o fecha para la frase / el verosímil que no destapa nada.
- **Acierto sin evidencia:** decidir bien sin haber abierto lo que lo justificaba (suerte o instinto); se premia a medias y no cuenta como «descubrió».
- **Hábito:** el mismo tipo de error repetido en dos casos distintos (por ejemplo, decidir sin abrir el papel clave).

---

### 1. Los tres bucles

**1.1 De segundos (una acción y su respuesta).**

```
mirar la afirmación o el papel  →  tocar (abrir un papel, sacar una tanda, escribir un número)
   →  el mundo se mueve (el papel sube bajo la lámpara, la ficha se voltea, el corcho clava el papel)
   →  mirar de nuevo  →  ...  →  sellar una decisión (Publicar, Armar la frase, Retener)
```

Regla de este bucle: **la respuesta del mundo muestra qué hiciste, nunca si estuvo bien.** Nada resplandece en el papel clave; los medidores no se mueven mientras abres. Eso se ve solo al cierre (regla 7: la consecuencia llega al cierre del caso y la decisión sellada no se rehace).

**1.2 De una escena (un caso; el *core loop* del Tema 1, 7 pasos).** Es la misma idea de los 7 pasos de la escena de `esquema.html` §3, pero con piezas propias de esta materia.

```
1 ENTRA la afirmación con tono de certeza (titular) y se ven C, L y las fichas (3, o 2 si C o L ≤ 25)
   →  2 MIRA la carpeta: 6 papeles que no dicen de qué sirven
   →  3 GASTA fichas: abre papeles, o saca tandas (caso 3), o pone papeles en la mesa (caso 8); no alcanza para todo
   →  4 ESCRIBE lo que el caso pide con números (rango, conteo, diferencia, cuánto subió) o ARMA la frase con piezas
   →  5 SELLA: Publicar / Armar la frase / Retener (o A, B, ninguna; o financiar, no, esperar). Un toque y un "¿sellar?"
   →  6 SALE LA EDICIÓN: corte de 2 segundos; C y L se mueven; reacciona alguien (la editora, una madre, un lector, el colega)
   →  7 NOTA: si hubo error, un sobre de la editora con una pregunta (escalón 2); "Siguiente caso" siempre habilitado
```

**1.3 De la materia (qué se acumula de caso en caso).**

```
Paso 1 (sin medidores, asombro)  →  Caso 2 (siempre con problema: el primer golpe)
   →  casos 3, 4, 5, 6, 7 en orden barajado por alumno (C y L pasan de uno a otro; el registro anota qué papeles abrió y qué dejó)
   →  Caso 8 (usa lo que aprendiste a pedir: con qué comparar, cuántos eran)
   →  cierre de edición (C ≥ 60 y L ≥ 60: mesa fija; si no, "otro trimestre de prueba": no bloquea)
   →  revelación: 8 fichas boca abajo  →  el camino ("esto apenas empieza")  →  práctica abierta
```

Se acumulan **tres cosas** entre casos: (a) los dos medidores (decisión de cuánto arriesgar), (b) las fichas, que **no** pasan de un caso a otro (cada caso las repone) salvo por el umbral de 25, y (c) el registro (hábitos y qué ficha se dio vuelta). No se acumula ningún conocimiento «desbloqueable»: no hay objetos ni mejoras que se compren.

---

### 2. Reglas generales (se programan una vez, valen para los casos 2 a 8)

| Id | Regla |
|---|---|
| G1 | Al empezar el caso 2: C = 50 y L = 50. Los dos tienen tope 0 y 100. Todo efecto es un entero y se aplica **al sellar** (no antes). |
| G2 | Fichas del caso: `fichasDelCaso(C, L) = (C ≤ 25 o L ≤ 25) ? 2 : 3`, calculado **al empezar el caso** con los valores de ese momento. En el caso 5 vale para los dos turnos. |
| G3 | Abrir un papel cuesta 1 ficha. Reabrir un papel ya abierto no cuesta. Sin fichas no se abre nada. En el caso 3 sacar una tanda cuesta 1 ficha. Leer, escribir, armar y sellar no cuestan. |
| G4 | La decisión sellada no se rehace. El «¿sellar?» pide un segundo toque; después no hay vuelta. |
| G5 | **Acierto sin evidencia:** si un caso define su papel o papeles clave y la decisión fue correcta sin haberlos abierto (o sin haberlos puesto en la mesa, caso 8), el efecto es el de la tabla del caso para ese supuesto (mitad o menos) y el registro lo marca. |
| G6 | Cierre de edición (después del caso 8): `mesaFija = (C ≥ 60 y L ≥ 60)`. Solo cambia el último diálogo de la editora y el registro. No hay nota. |
| G7 | Tipos por versión. Casos 3, 6 y 7 salen de **una** de estas 10 tiradas uniformes (c3, c6, c7): (B,B,P) (B,P,P) (P,B,P) (B,A,P) (A,B,P) (P,P,B) (P,B,B) (B,P,B) (P,A,B) (A,P,B), con P = con problema, B = bien, A = aún no se sabe. Cumplen: al menos un B, al menos un P, a lo más un A, y el caso 7 nunca es A. Cuenta: caso 3 es P 4, B 4, A 2 de 10; caso 6 igual; caso 7 es P 5, B 5. Caso 2 y caso 5 no tienen tipo variable (siempre problema). Caso 4: el estudio bueno es A o B, 50 %. Caso 5: efecto real δ = 0 o δ = 3 puntos, 50 %. Caso 8: financiar, no financiar o aún no, 1/3 cada uno. |
| G8 | Orden: Paso 1, caso 2 y caso 8 son fijos. Los casos 3, 4, 5, 6 y 7 salen en una permutación uniforme de las 120 posibles. |
| G9 | Sorteo: `semilla = versionDeAlumno(id, "psicoestadistica-descriptiva-psicologia:tema1")`. Un generador por rubro, `azarConSemilla(semilla + k)`: k=1 tipos, k=2 orden, k=3 papeles que entran a cada carpeta y su orden, k=10+caso cifras y textos de ese caso. Cambiar un rubro no cambia los otros. |
| G10 | Carpeta: cada caso tiene un **fondo de 9 papeles**; la versión recibe 6 con su papel clave dentro. En los casos 6 y 7 hay además una **hoja adjunta** (la lista de 60, la hoja de datos) que no gasta ficha y no cuenta entre los 6. |
| G11 | Los medidores y su sentido: lo que atrae Lectores cuesta Credibilidad si estaba mal; la prudencia da Credibilidad y cede Lectores. Los marcos 25 y 60 se dibujan en los tubos. A 25 o menos el tubo titila y la lámpara baja; a 26 o más no hay aviso numérico. |
| G12 | La editora **no corrige durante el caso**. Habla solo en la entrada (qué trae la agencia) y en el cierre (nota). |

*Por qué 3 fichas (ficha, secc. 2):* con 6 papeles y un clave, abrir 3 al azar da con él 3/6 = 0,50; con 2 fichas, 2/6 = 0,33. Con dos claves de los que basta uno (caso 4) es 1 − C(4,3)/C(6,3) = 1 − 4/20 = 0,80 con 3 fichas y 1 − 6/15 = 0,60 con 2. Con dos claves que se necesitan los dos (caso 8) es 4/20 = 0,20 con 3 fichas y 1/15 = 0,07 con 2 (cuentas a mano).

---

### 3. Catálogo de modalidades y mecánicas del Tema 1

Tipos: **cálculo** (escribir un número), **decisión** (elegir con consecuencias), **exploración** (conseguir datos), **minijuego** (una acción corta que hace ver la idea). «Código» dice si ya existe (motor en `PIEZAS-COMUNES.md` §1 y §2, pantalla en `src/app/juego-<isla>/`). Pantallas de esta materia no existen todavía: lo único dibujado es el boceto del caso 2.

| Id | Mecánica | Tipo | Qué hace el alumno | Qué contenido la vuelve necesaria | Cómo se ve (aspecto A) | Código |
|---|---|---|---|---|---|---|
| M1 | **Carpeta con presupuesto** | exploración | Toca papeles; cada uno gasta una ficha; no alcanza para todos | Idea 2 a 8: lo importante no está a la vista y hay que decidir qué pedir | 6 papeles en abanico bajo el cono de luz; ficha de latón que se voltea | Boceto vivo (papeles, fichas, lector). Lógica **nueva**, pieza propia `carpeta.ts`; nace como motor (el Tema 6 la usa) |
| M2 | **Dos medidores que se empujan** | decisión | Ve C y L; decide cuánto arriesgar | Idea 8 y todas: publicar de más y retener de más cuestan por lados opuestos | Dos tubos de tinta, azul y ámbar, con marcas en 25 y 60 | Boceto dibuja los tubos. Lógica **nueva**: `medidores.ts` |
| M3 | **Armar la frase con piezas** | decisión + armado | Arrastra 2 o 3 piezas a una línea; las específicas existen solo si abrió el papel que las trae | Idea 2, 3 (caso A), 6: decir lo que se sabe y hasta donde llega | Tira de piezas de imprenta que se arrastran | **Nueva**: `armador.ts`; nace como motor (Tema 6) |
| M4 | **Corcho por fecha** | exploración | Cada papel abierto se clava en una línea del tiempo; ve si algo cambió justo antes del cero | Idea 2: alguien cambió la forma de contar | Pared de corcho con hilos rojos | **Nueva**, solo caso 2 |
| M5 | **Máquina de tandas** | minijuego + cálculo | Gasta una ficha, sale una tanda de 10 con su media; ve que cambian entre sí | Idea 3: con pocos se habla de muchos | Tambor de lotería que suelta 10 bolitas | **Nueva**: `tandas.ts`, sorteo con `azarConSemilla` |
| M6 | **Rango «entre __ y __»** | cálculo | Escribe dos números a partir de las tandas | Idea 3: la cifra de pocos se mueve; hay que decir cuánto | Dos casillas numéricas en un papel de frase | **Nueva**, dentro de `tandas.ts` |
| M7 | **Dos estudios, uno solo sale** | decisión + exploración | Abre listas de quién respondió y elige A, B o ninguna | Idea 4: importa quién responde | Dos carpetas, una gorda y una delgada | **Nueva**, solo caso 4 |
| M8 | **Aconsejar y verificar lo tuyo (dos turnos)** | decisión + cálculo | Turno 1: elige a quién llamar. Turno 2: compara y escribe cuánto subió por el taller | Idea 5: lo que mejora solo | Hoja de 60 con puntajes; sorteo con el mismo tambor; segunda hoja un mes después | **Nueva**: `bienestar.ts` (generador con regresión por regla) |
| M9 | **Contar y titular** | cálculo + armado | Cuenta en la lista de 60 y arma el titular con piezas | Idea 6: lo medido no es lo de todos | Hoja de la agencia + tira de piezas | **Nueva**, caso 6 |
| M10 | **Lector primero, luego rótulo** | decisión + cálculo | Decide a ojo con el gráfico; después escribe la diferencia de la hoja y decide qué publicar | Idea 7: un gráfico miente con datos verdaderos | Recorte pegado en la pizarra; gráfico dibujado por código con eje | **Nueva**: `grafico.ts` |
| M11 | **Defender ante la dirección** | decisión + exploración | Abre papeles, pone sobre la mesa los que sostienen su recomendación, y ve su año y el del colega | Idea 8: decidir con datos bien leídos | Mesa de reunión, dos calendarios lado a lado | **Nueva**, caso 8 |
| M12 | **Las ocho fichas** | cierre | Da vuelta la que quiere; ve su momento y su nombre | Revelación: «esto apenas empieza» | Ocho cartas de cartulina bajo la lámpara | **Nueva**, pieza propia |
| M13 | **El archivo de La Pizarra** | ayuda | Abre un recorte viejo de otra edición | Escalón 3 de la escalera (8.3) | Cajón del archivo con recortes amarillentos | **Nueva**, pieza propia |
| M14 | **El primer encargo con Dani** | exploración | Responde tres preguntas (o deja que Dani lo haga) y busca la cifra en el archivo | Idea 1: los datos están en todas partes | Silueta de Dani en la silla del fondo | **Nueva**, paso 1 |

**Reutilizado del motor, sin reescribir** (nombres de `PIEZAS-COMUNES.md` §1 y §2): `partida.ts` (`partidaNuevaDe`, `anotarEn`, `leerPartidaDe`, `guardarPartidaDe`) para la partida por eventos; `version-alumno.ts` (`versionDeAlumno`) con semilla propia; `azarConSemilla` de `src/lib/finanzas/ejercicios.ts`; `nube.ts` (funciones `…De`) para guardar; `problemasDeTexto` de `src/lib/revision.ts` en la prueba del guion; `formato.ts` si hiciera falta. Patrones: «diagnóstico por error típico», «prueba del alumno perezoso», «partida reconstruida desde sus eventos», «guion aparte del motor» y «escena nueva sin pisar partidas viejas». **No se usa `escalera.ts`**: cuenta fallos seguidos en un mismo paso y su tercer escalón manda a leer el dossier; este tema no repite casos. La escalera del tema es la pieza propia `ayuda.ts` (secc. 8). **Hay que despegar**: la página del docente (`resumen.ts`/`PanelDocente.tsx`) solo lee la planta de Proyectos II (`PIEZAS-COMUNES.md` §3); el registro de la secc. 12 necesita que reciba la escena y su función `describir`. Ni un personaje, caso ni pantalla de otro juego se copia (nada de la ventanilla de AIEF).

---

### 4. Paso 1 · «El primer encargo» (idea 1; sin medidores; exploración)

| Id | Regla |
|---|---|
| P1.1 | La editora pide una cifra cotidiana: «¿cuántas horas duermen los de 4.º?». Antes, **3 preguntas fijas**: horas dormidas anoche (0 a 14, de 0,5 en 0,5), minutos de celular antes de dormir (0 a 300), cómo te fue ayer (0 a 100). |
| P1.2 | Por defecto responde **Dani** (silueta) con valores sorteados con k=10. Botón «poner las mías»: el alumno escribe los tres; fuera de rango, la casilla se marca y no deja seguir. **Esos tres números no entran en ningún cálculo de ningún caso** (único número sin consecuencia, a propósito: sin medidores, sin nota; aceptado en la revisión v12). No se envían a la nube; se guarda solo `datosPropios: true/false`. |
| P1.3 | Archivo del colegio: fondo de 9 papeles, 6 en la carpeta; **2 de los 6 traen horas de sueño** (se sortean entre 3 candidatos: cuaderno de la enfermería, encuesta anual de la secretaría, informe del orientador). 3 fichas, sin castigo posible. |
| P1.4 | Al abrir el **primer** papel con sueño: asombro. Se muestran dos filas con las mismas tres columnas: «Tú, hoy» (o la de Dani) y «Archivo, hace un año» (fecha visible). No aparece ningún nombre técnico. |
| P1.5 | Si gasta las 3 fichas sin abrir uno con sueño: la editora dice «¿seguro que ahí no había nada?» **una sola vez** y regala 1 ficha. Si aun así no lo abre, Dani lo abre por él (el registro anota `ayudado`). Así **todos** ven el asombro. |
| P1.6 | Al cerrar el paso: la editora dice «A partir de hoy firmas tú» y **recién entonces aparecen los tubos** (C = 50, L = 50). |

---

### 5. Los casos 2 a 8, uno por uno

Cada caso: qué hace el alumno, qué se escribe y qué cambia, y la tabla de efectos. Los efectos se escriben `C/L`. Todo se aplica al sellar y con tope (G1).

#### 5.1 Caso 2 · «El colegio sin denuncias» (idea 2) · siempre con problema · exploración + decisión

- **Alumno:** abre papeles (se clavan en el corcho por fecha), arma la frase o decide.
- **Corcho (M4):** cada papel tiene una fecha. Se clava en una línea del tiempo bajo la gráfica de denuncias por mes. **La fecha del papel clave cae siempre en el mes anterior a la caída, y al menos 2 señuelos también caen en esa ventana** (el calendario, la lista de tutores), para que la cercanía de fecha no delate el clave. Los hilos salen de **todos** los papeles clavados.
- **Claves posibles (uno por versión):** correo de la dirección, libro de registro de la secretaría, informe del orientador. **Refuerzo:** el buzón anónimo.
- **Piezas de la frase (M3):** siempre disponibles, 3 genéricas (G1 «según fuentes del colegio», G2 «datos preliminares», G3 «la agencia informa»). Cada papel abierto agrega **una** pieza de hecho: el clave agrega dos («las denuncias *registradas* bajaron a cero» con el hecho concreto del papel y «no sabemos cuántos hechos hubo»), el refuerzo una, cada señuelo una verdadera e irrelevante. La frase lleva 2 o 3 piezas.

| Id | Condición al sellar | C/L |
|---|---|---|
| R2.1 | Publicar tal cual | −20/+10 |
| R2.2 | Retener | +6/−8 |
| R2.3 | Frase que contiene una pieza del papel clave | +8/+4 (+10/+4 si lleva también la del refuerzo) |
| R2.4 | Frase sin ninguna pieza del clave | −8/+4 |

- **Error diagnosticado:** `E2a` publicó tal cual · `E2b` retuvo sin abrir el clave · `E2c` frase sin pieza clave.

#### 5.2 Caso 3 · «La cifra de los de 4.º» (idea 3) · cálculo + minijuego

- **Alumno:** gasta fichas en papeles y/o en **tandas** (cada tanda: 10 estudiantes al azar de un registro generado de 480; se ve la media de esa tanda y una tira que acumula las medias de las tandas ya sacadas, para ver que se mueven). Después escribe un **rango** «entre a y b» (horas, de 0,1 en 0,1, con a ≤ b) o decide sin rango.
- **Generador (`tandas.ts`):** registro de 480 con media μ ∈ [5,5; 7,5] y desvío 1,1 h; media de una tanda con desvío ≈ 0,35 h (ficha: 3 tandas dan ancho medio 0,59 h). Las tandas salen sin reposición del registro, con k=10+3 y el índice de tanda: reabrir la partida da las mismas tandas. La cifra de la agencia: tipo P, a más de 1,0 h de μ (entre 1,0 y 1,6); tipo B, a 0,15 h o menos; tipo A, a 0,5 h o menos de la media del registro, que en A es de la semana de exámenes.
- **Puerta del rango:** el botón «Armar rango» se habilita con **2 o más tandas sacadas**. Con 0 o 1, la editora dice «con una tanda no sabes cuánto se mueve» y quedan Publicar tal cual y Retener. (Cierra que alguien escriba «5,9 ± 0,6» sin haber visto nada.)
- **Papeles:** clave en P: la ficha de cómo se obtuvo la cifra («una tanda de 10 del turno tarde») o la hoja del turno tarde. En B: la ficha («150 al azar de los 480»). En A: el acta de la semana de exámenes o la ficha («9 respuestas»). La pieza de frase del clave sirve solo en A.
- **Cubre (H2 cerrado):** `cubre(a,b,μ) = a − 0,25 ≤ μ ≤ b + 0,25` (holgura 0,25 h). Con 3 tandas y rango mínimo-máximo cubre 97,5 %, con 2 tandas 88,7 % (ficha, secc. 2 y su `.py`). Un rango centrado en la media de 2 tandas con ancho 1,2 cubre 99,9 % (z = (0,6 + 0,25)/0,246 = 3,45, cuenta a mano). Por eso el aviso al registro: si el rango es el mínimo-máximo de ≥ 3 tandas vistas y no cubre, se marca `razonoBienNoCubrio` (no es engaño, pasa 2,5 % del tiempo).
- **Nivel del rango `n(a,b,μ)`, en este orden:** si no cubre → `noCubre`; si no, si `b − a > 2,0` → `ancho`; si no, si `b − a ≤ 1,2` → `ok`; si no → `flojo`.

| Id | Tipo | Tal cual | Retener | Rango `ok` | Rango `flojo` | `noCubre` | `ancho` |
|---|---|---|---|---|---|---|---|
| R3.P | con problema | −20/+10 | +6/−8 | +8/+4 | +3/0 | −10/+4 | 0/−2 |
| R3.B | bien | +10/+10 | 0/−15 | 0/+4 | 0/+2 | −10/+4 | 0/−2 |
| R3.A.sin | aún no (rango sin la pieza del clave) | −20/+10 | 0/−10 | −8/+4 | −8/+4 | −10/+4 | 0/−2 |
| R3.A.con | aún no (rango con la pieza del clave) | igual que arriba | igual | +8/+4 | +3/0 | −10/+4 | 0/−2 |

- En A, μ es la media del registro (semana de exámenes): el rango tiene que describirlo bien **y** la pieza tiene que decir de qué semana es. Solo con las dos cosas sube.
- **Error diagnosticado:** `E3a` tal cual con ≤ 1 tanda · `E3b` rango `noCubre` · `E3c` rango `ancho` · `E3d` retener en tipo B · `E3e` rango en A sin la pieza.
- **Acierto sin evidencia:** tal cual en B sin haber abierto la ficha.

#### 5.3 Caso 4 · «Dos encuestas, un titular» (idea 4) · decisión + exploración

- **Alumno:** abre papeles de la carpeta y elige A, B o ninguna. No escribe número.
- **Papeles:** de los 6, **2 son claves**, elegidos entre 4 posibles (lista de quienes respondieron A, la de B, cómo se invitó a A, cómo se invitó a B); con uno basta para saber cuál es el bueno, porque exactamente uno lo es. Los otros 4: ficha técnica común, tabla de resultados, matrícula, mensajes de padres, acta del consejo (se sortean).
- **Quién es el bueno:** A en el 50 % de las versiones (la plataforma obligatoria, casi toda la matrícula) y B en el otro 50 % (A se aplicó solo en el club de apoyo).

| Id | Condición | C/L |
|---|---|---|
| R4.1 | Elige el estudio bueno y es A | +10/+10 |
| R4.2 | Elige el estudio bueno y es B | +8/+4 |
| R4.3 | Elige el malo y es A | −20/+10 |
| R4.4 | Elige el malo y es B | −20/+4 |
| R4.5 | Ninguna | 0/−10 |

- **Error diagnosticado:** `E4a` eligió sin abrir ninguno de los 4 papeles que destapan · `E4b` eligió B siendo A el bueno habiendo abierto un papel que lo mostraba (sobrecorrección «la chica siempre») · `E4c` ninguna.
- **Acierto sin evidencia:** eligió el bueno sin abrir ningún clave.

#### 5.4 Caso 5 · «El taller de pausas» (idea 5) · decisión + cálculo en dos turnos

**Turno 1, aconsejas.** Ve la hoja de bienestar de 60 estudiantes (puntajes 0 a 100, sin gastar fichas). 13 cupos. Elige:
(a) los 13 de peor puntaje · (b) los 13 que se anotaron primero · (c) un sorteo entre los 26 de peor puntaje: 13 al taller y 13 de comparación (animación con el tambor del caso 3).

| Id | Opción | C/L al sellar el turno 1 |
|---|---|---|
| R5.1 | (a) o (b) | 0/0 (la editora lo elogia en una línea) |
| R5.2 | (c) | 0/−6 (la dirección protesta: «¿por qué dejas a 13 sin ayuda?») |

**Generador (`bienestar.ts`), pensado para que la regresión salga de una regla y no pegada:** nivel real T ~ N(60, 10), medición = T + ruido N(0, 8). Primera medición de los 60; segunda = T + ruido nuevo + δ si va al taller (δ = 0 o 3). Con esa regla los 13 peores suben alrededor de 7 puntos sin taller y los otros 47 bajan alrededor de 2 (cuenta del propio modelo: confiabilidad 100/164 = 0,61; ficha del dossier usa otras cifras y aquí no coinciden). Luego se **re-sortea hasta cumplir las invariantes** (se prueban en `.test.ts`):
- I1: en (c), `ρ_c = Δ_taller − Δ_grupo` queda a 0,8 o menos de δ.
- I2: en (a), `ρ_a = Δ_taller − Δ_vecino` queda a 2,0 o menos de δ (el vecino es otro colegio: peor comparación) y `Δ_vecino ≥ 4`.
- I3: en (b), los que se anotaron primero traen un sesgo de **+2,5** aun sin taller (el informe del tallerista lo dice: «los primeros en anotarse ya venían subiendo»); `ρ_b = Δ_taller − Δ_demás − 2,5` queda a 0,8 o menos de δ.
- I4: para cada opción, la distancia entre la banda de la cuenta buena (`ρ ± 1,0`) y la de la subida bruta (`Δ_taller ± 1,0`) y la inflada es mayor que 0 (las bandas no se tocan).

**Turno 2, un mes después, verificas lo tuyo.** 3 fichas (o 2, G2). Fondo de 9 papeles: segunda medición de los llamados · de los demás · del grupo de comparación · colegio vecino · lista de asistencia · calendario de exámenes · informe del tallerista · quejas de padres · acta de la dirección. **La carpeta de 6 siempre trae lo que la opción elegida necesita** (a: llamados + vecino; b: llamados + demás + informe; c: llamados + grupo); el resto se sortea. El alumno escribe `x` = «cuántos puntos subió por el taller» y publica, o retiene.

**Evaluación de `x` (se aplica la primera regla que cumple, en este orden). `Δ_t` = cambio medio de los llamados, y las bandas valen ±1,0.**

| Id | Condición | C/L |
|---|---|---|
| R5.3 | Retener | +2/−6 |
| R5.4 | Papel de los llamados abierto, `|x − Δ_t| ≤ 1,0` y `x` fuera de la banda buena (**subida bruta**) | −20/+4 |
| R5.5 | Opción (a) o (b), papel de los demás abierto, `|x − (Δ_t − Δ_demás)| ≤ 1,0` y fuera de la banda buena (**inflado**) | −20/+4 |
| R5.6 | Papeles requeridos de la opción abiertos y `|x − ρ| ≤ 1,0`, con (c) | +12/+6 |
| R5.7 | Ídem R5.6 con (a) o (b) | +6/+3 |
| R5.8 | Sin los papeles requeridos y `|x − δ| ≤ 1,0` (**acierto sin evidencia**) | +4/+2 |
| R5.9 | Cualquier otro caso | −10/+4 |

- **Los tres caminos tienen costo distinto, ninguno domina:** (a) 2 fichas, 0 Lectores, techo +6/+3; (b) las 3 fichas, 0 Lectores, techo +6/+3; (c) 2 fichas, −6 Lectores en el turno 1, techo +12/+6 (neto C +12, L 0). Con 2 fichas (castigo), (b) no se puede cerrar. Azar de dar con los papeles requeridos con 3 fichas: (a) 0,20, (b) 0,05, (c) 0,20 (cuentas a mano, como en G).
- **«Escribir 0»:** es correcto (R5.6 a R5.8) solo en las versiones con δ = 0, que son la mitad; con δ = 3 cae en R5.9 (−10/+4). Escribir 0 sin papeles es R5.8 o R5.9 y se marca.
- **Error diagnosticado:** `E5a` subida bruta (R5.4) · `E5b` inflado (R5.5) · `E5c` sin comparar (R5.8 o R5.9 sin los papeles) · `E5d` escribió 0 con δ = 3 habiendo abierto la comparación.

#### 5.5 Caso 6 · «El titular de los 480» (idea 6) · cálculo + armado

- **Alumno:** la hoja de la agencia (adjunta, no cuesta ficha) trae la lista de 60 con las horas de sueño. Abre papeles de la carpeta (3 fichas) y decide.
- **Claves posibles (3):** cómo se eligieron los 60; composición del colegio por curso; acta de la semana de exámenes. En P sirven los dos primeros (los 60 son de 4.º B, y el colegio tiene ocho cursos); en B el primero («sorteo entre los 480»); en A el tercero o el primero («12 respondieron»).
- **Botones:** Publicar tal cual (la frase original de la editora, sin número) · **Armar el titular** · Retener.
- **Armar el titular:** primero el alumno **cuenta** en la lista cuántos duermen menos de 6 horas y lo escribe (`N`, entero; en el tipo A la lista tiene 60 filas pero solo 12 con respuesta y se cuenta entre esas 12). La base queda escrita: «{N} de los {den} duermen menos de 6 horas». Luego elige **una** extensión:
  - `ninguna` (solo lo medido).
  - `podrían` (genérica): «y podrían ser uno de cada cuatro en el colegio».
  - `grupo` (solo si abrió un papel clave): P «y todos son de 4.º B» · B «elegidos por sorteo entre los 480: aproximadamente uno de cada cuatro» · A «con 12 respuestas en semana de exámenes aún no se sabe».
- **Conteo:** si `N` no coincide con la lista, se suma **−10 a C** («ese número no sale de tu hoja») sobre lo que dé la tabla, en cualquier extensión.

| Id | Opción | Tipo P | Tipo B | Tipo A |
|---|---|---|---|---|
| R6.1 | Publicar tal cual (sin `N`) | −20/+10 | +10/+10 | −20/+10 |
| R6.2 | Retener | +6/−8 | 0/−15 | 0/−10 |
| R6.3 | Base + `ninguna` | +4/+2 | 0/+4 | 0/+2 |
| R6.4 | Base + `podrían` | −8/+4 | 0/+4 | −8/+4 |
| R6.5 | Base + `grupo` | +8/+4 | +10/+10 | +8/+4 |
| R6.6 | `N` mal contado (se suma a lo anterior) | C −10 | C −10 | C −10 |

- **Piezas de la tira (H1 cerrado):** las cuatro opciones de arriba son **todas** las piezas del caso. `podrían` nunca toca el hueco (sin clave); `grupo` solo existe con el papel clave abierto.
- **Error diagnosticado:** `E6a` `N` mal contado · `E6b` tal cual en P o A · `E6c` `podrían` en P o A · `E6d` retener en B.
- **Acierto sin evidencia:** tal cual en B, sin haber abierto el clave.

#### 5.6 Caso 7 · «El gráfico de la agencia» (idea 7) · decisión + cálculo · tipos P o B

- **Primero eres el lector.** Antes de entrar a la mesa ves el recorte con dos columnas, A y B (sin números en el eje), y en pocos segundos eliges a cuál **recortar** el presupuesto: A, B o ninguno. Esa elección **no se juzga**: se guarda. Al cerrar el caso se vuelve a mostrar el mismo dato dibujado honesto y se pregunta, con dos toques, si recortarías el mismo; también se guarda, sin efecto en los medidores.
- **Mesa:** la hoja de datos de la agencia está **adjunta y no gasta ficha**: trae los dos valores (por ejemplo A 64,8 y B 63,0). Los papeles que gastan ficha dicen cómo se dibujó el gráfico. **Claves (3 posibles):** correo de la agencia, captura del gráfico original, ficha técnica de la hoja. En P dicen que el eje empieza arriba de cero; en B, que empieza en cero o que la diferencia es grande.
- **Número:** el alumno escribe `x` = «cuántos puntos de diferencia hay entre A y B» (decimales de 0,1). Correcto si `|x − |A−B|| ≤ 0,1`. **Todo lo que se publica lleva `x` como rótulo debajo del gráfico**, así el número decide en cada rama.
- **Rediseñar (H1 cerrado):** vuelve a dibujar el gráfico con la base en cero y con `x` como rótulo. En tipo P es lo mejor; **en tipo B no hace falta y cuesta**.

| Id | Opción | Tipo P (eje truncado) | Tipo B (bien) |
|---|---|---|---|
| R7.1 | Publicar tal cual, `x` correcto | −10/+10 | +10/+10 |
| R7.2 | Publicar tal cual, `x` incorrecto | −20/+10 | +4/+10 |
| R7.3 | Rediseñar con la base en cero, `x` correcto | +8/+4 | 0/−4 |
| R7.4 | Rediseñar con la base en cero, `x` incorrecto | −8/+4 | −6/−4 |
| R7.5 | Retener | +6/−8 | 0/−15 |

- **Ajuste a la ficha (ver 14):** la ficha daba −20/+10 a «publicar tal cual» en P; aquí baja a −10/+10 si el rótulo es correcto, porque el dato sí está a la vista aunque el dibujo engañe. Sin eso el número no habría cambiado nada en esa rama.
- **Error diagnosticado:** `E7a` `x` incorrecto (escribió lo que se ve) · `E7b` tal cual en P · `E7c` rediseñar o retener en B.

#### 5.7 Caso 8 · «La dirección decide» (idea 8) · decisión + exploración

- **Alumno:** el director decide si **financia** el taller el año que viene; el colega propone decidir «a ojo». El alumno abre papeles (3 fichas, o 2), **pone sobre la mesa los papeles que sostienen su recomendación (hasta 2, solo de los que abrió)** y sella: **financiar**, **no financiar**, **esperar un trimestre**.
- **Papeles (6):** 2 claves y los 4 restantes se sortean. K1 = la tabla de seguimiento con grupo que no tuvo taller. K2 = la lista por grupo con tamaños y cuándo se midió. Los nombres de los papeles dicen qué documento es, no lo que prueba (la redacción final es de narrativa; no pueden llamarse «resultados con grupo de control»).
- **Contenido por tipo:** *financiar*: K1 muestra una diferencia clara con comparación y K2 grupos de 40 contra 40 durante un semestre. *No financiar*: K1 muestra diferencia casi cero con K2 igual de sólido. *Aún no*: K1 muestra una diferencia atractiva pero K2 dice 9 contra 9 y tres semanas.
- **Evidencia:** `e` = cantidad de papeles puestos sobre la mesa que sean K1 o K2 (0, 1 o 2). Un señuelo puesto cuenta 0.
- **El colega:** propone la decisión correcta con probabilidad 1/3 y, si no, una de las otras dos con igual probabilidad. Se ven **los dos años** lado a lado (el tuyo y el del colega); es solo imagen, no mueve medidores.

| Id | Condición | C/L |
|---|---|---|
| R8.1 | Decisión correcta, `e = 2` | +12/+8 |
| R8.2 | Decisión correcta, `e = 1` | +6/+4 |
| R8.3 | Decisión correcta, `e = 0` (acierto sin evidencia) | +2/0 |
| R8.4 | Financiar cuando era «no financiar» | −20/+6 |
| R8.5 | Financiar cuando era «aún no» (valor nuevo, la ficha no lo traía) | −15/+6 |
| R8.6 | No financiar cuando era «financiar» | −15/−8 |
| R8.7 | No financiar cuando era «aún no» | −10/−6 |
| R8.8 | Esperar cuando era «financiar» o «no financiar» | 0/−4 |

- **H3 cerrado:** quien abre un solo clave y acierta por suerte cobra la mitad y el registro lo marca; quien no abre ninguno cobra +2/0 y también. «Parecer que entendió» ya no sale gratis ni en la hoja de Ronald ni en los medidores.
- **Error diagnosticado:** `E8a` decidió con `e < 2` · `E8b` esperó cuando se podía decidir · `E8c` financió o no financió contra la evidencia · `E8d` coincidió con el colega o lo contradijo contra lo que decía la evidencia (se registra, no tiene pista propia).

---

### 6. La revelación (M12)

| Id | Regla |
|---|---|
| V1 | Al cerrar la edición aparecen **8 cartas boca abajo**, una por idea, en el orden en que el alumno jugó. Se dan vuelta con un toque, en cualquier orden. No cuesta nada. |
| V2 | Cada carta muestra el **momento** de ese caso (el papel que abrió o el que dejó, el número que escribió, lo que selló) y debajo las tres líneas de `04-aprendizaje.md` T1.7 según la **rama**. |
| V3 | **Rama** = clasificación de T1.5 de esa idea: `descubrió solo` y `descubrió con pista` usan el texto «hiciste»; `se dejó engañar` usa el texto «no lo abrió»; `sobrecorrigió`, `no había problema` y `acierto sin evidencia` **piden un texto que T1.7 aún no trae** (tres huecos por carta: queda para narrativa). |
| V4 | El nombre técnico solo se dice para lo que el alumno hizo o dejó de hacer. En un tipo B la carta lo dice («esta vez no había problema») y no nombra nada. |
| V5 | Cuando las 8 están boca arriba aparece el **camino** (cierre general de T1.7): solo el Tema 2 se nombra. Siempre hay un «Salir». Se registra qué cartas se dieron vuelta y en qué orden. |
| V6 | Desde el camino, cada carta ofrece «probar este caso con otras cifras» (8.4). |

---

### 7. Retroalimentación y dominio

**7.1 Qué pasa cuando acierta, cuando se equivoca y cuando se traba.**

| Situación | Qué ve el alumno | Qué se registra |
|---|---|---|
| **Acierta con evidencia** | Medidores suben, la editora asiente, un recorte de portada con su frase. Sin nota. | clase `descubrió solo` |
| **Acierta sin evidencia** | Medidores suben menos (G5). La editora pregunta una cosa: «¿en qué papel te apoyaste?» y deja tocar los papeles abiertos. Es opcional. | `acierto sin evidencia` |
| **Se equivoca** | Los medidores bajan al cierre, reacciona alguien del mundo (la madre que llama, un lector, el colega, el vecino) y llega un **sobre con una pregunta** (escalón 2). | la clase de T1.5 y el código `E…` |
| **Se traba** (3 fichas sin abrir lo que importa, o no sabe qué escribir) | No hay pantalla de error. Las fichas se acaban, el alumno sella con lo que tiene y el costo llega al cierre. En el paso 1 solo, la editora regala una ficha (P1.5). | `fichas agotadas sin clave` |

**7.2 Este tema no bloquea.** Como no mide nota y su fin es el asombro, **nadie queda atrapado en un caso**. «No se avanza sin hacerlo bien» vale en los temas que miden y en la práctica abierta; aquí el dominio vive en que cada caso hace sentir el error y la revelación lo nombra.

---

### 8. Escalera de ayuda sin bloquear (cierra el pendiente 4)

Los cuatro escalones de `04-aprendizaje.md` T1.2, con **dónde aparece cada uno**. Pieza propia `ayuda.ts` (no `escalera.ts`).

| Escalón | Qué es | Cuándo aparece | Bloquea |
|---|---|---|---|
| 1 · Consecuencia | Medidores, corte de imprenta, reacción de alguien | Siempre, al cierre | No |
| 2 · Pista de personaje | Un **sobre de la editora** cae sobre la mesa con una pregunta de una o dos líneas, elegida por el código `E…` (los textos de T1.3, con voz de narrativa; ninguno nombra el concepto) | Después de una decisión que no fue «acierto con evidencia», **antes del botón «Siguiente caso»**. Se lee o se ignora con un toque | No |
| 3 · Un caso parecido ya resuelto | El **archivo de La Pizarra** (M13): un recorte viejo de otra edición, con otro colegio y otras cifras, que muestra en tres tiempos qué papel se abrió, qué se publicó y qué pasó. Sin explicar | Ver 8.3 | No |
| 4 · Otros números | Otra versión: otro tipo, otro clave, otras cifras | Solo en práctica abierta (8.4) | No |

**8.1 Cómo se elige la pista.** `ayuda.ts` recibe `{caso, codigo}` y devuelve `{pistaId}`. Un código por caso y error, los de las secciones 5.x (`E2a` a `E8d`). Si hay varios errores en el mismo caso, se muestra el de mayor costo en C.

**8.2 Hábito.** Se cuenta por clases: `H1` decidir sin abrir el clave (errores `E2a`, `E2b`, `E3a`, `E4a`, `E5c`, `E8a`), `H2` publicar de más (`E2a`, `E3a`, `E4a`, `E6b`, `E7b`), `H3` retener o dudar de más (`E3d`, `E4b`, `E4c`, `E6d`, `E7c`, `E8b`). Un hábito se cumple cuando la misma clase aparece en **dos casos distintos**.

**8.3 DEFECTO · El archivo en la partida oficial.** La ficha de aprendizaje (T1.2, H5) dejaba el escalón 3 solo para la práctica abierta. Este diseño propone que **también en la oficial** aparezca, pero solo al cumplirse un hábito, solo al cierre del caso (nunca antes de decidir, así no se resuelve el caso con él) y como una pestaña que se toca si se quiere. Un recorte por hábito y por papel (6 recortes, 2 por hábito, sorteados con k=10+caso; los escribe narrativa). En la práctica abierta aparece después de **cualquier** error. Si Ronald prefiere que la oficial no lo muestre, se apaga con un solo valor en `reglas-t1.ts`.

**8.4 DEFECTO · Práctica de un solo caso.** Desde el camino, cada carta ofrece «probar este caso con otras cifras»: ese caso solo, con C = 50, L = 50, 3 fichas, una semilla nueva (`semilla + intento`), sin tocar la partida oficial. Es el escalón 4. Costo bajo: los generadores de cada caso ya son independientes.

**8.5 Sin bloqueo, probado:** ningún escalón deshabilita «Siguiente caso». Se prueba en `.test.ts`: para cada caso y cada código, el estado tras la nota admite avanzar.

---

### 9. Economía

| Recurso | Cómo se mueve | Qué decisión cambia | Pasa al caso siguiente |
|---|---|---|---|
| **Credibilidad (C)** | Sube con frase bien armada, con el estudio bueno, con el número bien calculado; baja con la réplica | Frena publicar de más; si cae a 25 o menos, el caso siguiente tiene 2 fichas | Sí |
| **Lectores (L)** | Sube al publicar; baja al retener o con la frase tímida; el sorteo (c) del caso 5 cuesta 6 | Frena retener de más y empuja a decidir; a 25 o menos, 2 fichas | Sí |
| **Fichas de tiempo** | 3 por caso (2 si C o L ≤ 25); se gastan al abrir o al sacar tanda | Obliga a elegir qué mirar y qué dejar | **No**: se reponen cada caso |
| **Papeles abiertos** | Se guardan en el registro | Cambia qué piezas hay y qué evidencia vale | Solo para el registro (hábitos) |
| ~~Reputación, caja~~ | No existen en este tema | | Sobran: no cambiarían ninguna decisión que ya cambien C y L |

**Cada recurso cambia decisiones.** C lo hace porque su caída baja las fichas y porque la meta lo pide en 60; L también. Si uno solo importara, «publicar siempre» o «retener siempre» ganarían.

---

### 10. Dificultad

El orden de 3 a 7 se baraja, así que **la dificultad no sube con la posición**; sube con lo que cada caso pide y con lo que el propio alumno se hace:

| Palanca | Dónde |
|---|---|
| **Más datos**: 6 papeles por caso y nunca se abre todo | todos |
| **Datos que sobran**: 4 de los 6 son señuelos con fecha o cifra verosímil (en el caso 2, 2 señuelos caen en la ventana del cambio) | todos |
| **Datos que hay que conseguir**: el clave no está a la vista; en el caso 8 hacen falta **dos** | 2 al 8 |
| **Cuentas**: rango (2 números) en el 3, conteo de 60 filas en el 6, diferencia en el 7, comparar dos mediciones en el 5 | 3, 5, 6, 7 |
| **Eventos**: el castigo de 2 fichas al caer un medidor a 25; el colega que a veces acierta; el segundo turno del caso 5 un mes después | 5, 8 |
| **Práctica abierta**: sin la ayuda del paso 1 y con el archivo después de cualquier error | práctica |

---

### 11. Que ninguna estrategia gane sin entender

**11.1 Costo por los dos lados.** Cada decisión de abajo tiene un costo si se toma de más y otro si se toma de menos:
- Publicar de más: C −20 (casos 2, 3, 4, 6 en P o A), −10 (caso 7 en P con rótulo bueno).
- Retener de más: L −8 a −15 (casos 2, 3, 6, 7), 0/−10 (caso 4), 0/−4 (caso 8).
- Rediseñar de más (caso 7 en B): 0/−4. Rango ancho: 0/−2 y sin ganar. Esperar de más (caso 8): 0/−4. Elegir «la chica» siempre (caso 4): 50 % de −20.

**11.2 Sin prueba y error.** La consecuencia llega al cierre; la decisión sellada no se rehace; en la práctica abierta se rehace **con otro caso** (otra semilla). Los medidores no se mueven mientras se abre. En ninguna rama de la secc. 5 hay una pantalla donde el alumno vea el efecto de una decisión y pueda cambiarla.

**11.3 El número decide y no hay patrón fijo.** Enumeración de cada número que escribe el alumno:

| Número | Dónde | Qué cambia en el mundo |
|---|---|---|
| Las 3 respuestas del paso 1 | Paso 1 | **Nada** (único peaje, a propósito; ver P1.2) |
| `a` y `b` | Caso 3 | Cuatro niveles de efecto (R3) |
| `x` (cuánto subió) | Caso 5 | Seis niveles de efecto (R5.4 a R5.9) |
| `N` (conteo) | Caso 6 | −10 a C si falla, y entra en el titular |
| `x` (diferencia) | Caso 7 | Rótulo del gráfico: distinto efecto en R7.1 a R7.4 |

Total: 5 números de decisión (los 5 campos: `a`, `b`, `x`, `N`, `x`) y 3 de adorno. Ningún caso se decide eligiendo entre dos frases donde la prudente se nota sin calcular: las frases se arman con piezas que solo existen si abriste el papel (casos 2, 3-A y 6), y la «prudente» sin papel (`podrían`, G1 a G3) cuesta −8. **Patrón que se aprende:** el tipo no se repite (G7: ni «el último es aún no», ni «el grande es el malo» (50/50 en el caso 4), ni «un solo caso está bien»), y el clave cambia por versión. Las únicas constantes son el caso 2 y el 5, que son siempre problema porque son el primer golpe y la vergüenza.

**11.4 Valor intermedio que solo se encuentra calculando.** Caso 3: el rango bueno es el que cubre y no pasa de 1,2 h; escribir muy angosto arriesga (no cubre: −10/+4), muy ancho no gana (0/−2). Caso 5: la cuenta buena queda a ±1,0 de `ρ`, entre la subida bruta (muy lejos) y escribir 0 (solo vale con δ = 0).

**11.5 Estrategias perezosas.**

*Exactas a mano (probadas sin simulación):*
- **E-S1 «No abrir nada y publicar tal cual siempre»** (caso 3 y 6: tal cual; caso 4: siempre A; caso 5: opción (a) y un número cualquiera; caso 7: tal cual con `x` de la hoja; caso 8: financiar siempre; caso 2: tal cual): **pasa 0,0 %**. Prueba: C al final ≤ 56. En el caso 2 el efecto es −20 fijo. Para los casos 3, 6 y 7 las 10 tiradas de G7 dan sumas de C de 10, −20, −20, −20, −20, −30, 0, 0, −30, −30 (máximo 10). Sumando lo mejor posible del caso 4 (+10), el 5 (+4: acierto sin evidencia) y el 8 (+2): 50 − 20 + 10 + 10 + 4 + 2 = **56 < 60**. Con el tope en 0 el valor final es la suma de los aumentos que vienen después del punto más bajo, y todos los aumentos posibles juntos son 10 + 10 + 4 + 10 + 10 + 2 = 46 < 60. En ninguna ruta se alcanza 60.
- **E-S2 «Retener siempre»** (caso 4: ninguna; caso 8: esperar; caso 5: retener): **pasa 0,0 %**. Prueba: todos los efectos de «retener» en L son 0 o negativos (−8, −15, −10, −10, −6, −8, −15, 0 o −4), así que L ≤ 50 < 60.

*Pendientes de correr (las tablas de arriba cambiaron respecto a las que simuló la ficha, secc. 8, así que **hay que volver a correr toda esa tabla** con estas reglas antes del veredicto del crítico):*

| Estrategia | Qué hace | Hay que mirar |
|---|---|---|
| E-S3 | No abre papeles; siempre la opción intermedia (frase, `ninguna`, rango con 2 tandas ancho 1,2, rótulo con `x` de la hoja) | No pasa; cuánto le falta |
| E-S4 | Abre 3 al azar y, si no halla nada, publica | La ficha dio 22,0 %; reescribir con R2 a R8 |
| E-S5 | Abre 3 al azar y, si no halla nada, retiene | La ficha dio 22,4 % |
| E-S6 | Rediseña siempre en el caso 7 y, en lo demás, hace lo correcto | Pierde 10/10 en B |
| E-S7 | Siempre escribe 0 en el caso 5 | R5.8/R5.9 |
| E-S8 | Siempre esperar en el 8 y en lo demás hace lo correcto | Pierde en 2 de cada 3 |
| E-S9 | Copiar las decisiones de otro compañero (otra versión) | La ficha dio 0,5 % |
| E-S10 | Entender: acierto del clave p = 0,50, 0,65, 0,80, 0,95 | La ficha dio 12,5 / 32,9 / 64,6 / 94,8 % |

**Cota de quien entiende (exacta a mano):** con todo bien, C suma 8 + 8 + 8 + 12 + 8 + 8 + 12 = 64 (queda en 100 por el tope) y L suma 4 + 4 + 4 + 0 + 4 + 4 + 8 = 28 (queda en 78). Un error de «retener de más» le cuesta unos 12 puntos de L (de +4 a −8): con uno llega a 66 y pasa; con dos llega a 54 y no. Un error de «publicar de más» le cuesta 28 de C: con uno sigue por encima de 60; con dos, depende del orden por el tope. **La meta tolera un error, no tres:** premia haber entendido, no no haberse equivocado jamás.

**11.6 Un arreglo se vuelve a probar (regla 10).** Esta versión arregla tres hallazgos del aprendizaje (H1, H2, H3); cada arreglo se jugó **como alumno perezoso** antes de darlo por cerrado:
- H1 (rediseñar): probado «rediseñar siempre» (E-S6, secc. 11.5): en P iguala a lo correcto y en B pierde 10 de C y 10 de L; no gana.
- H2 (holgura): probado «rango de 1,2 centrado en la media de 2 tandas» (cubre 99,9 %, cuenta a mano). **Creaba una estrategia dominante nueva** (siempre ancho 1,2 con 2 tandas y nunca fallar), y se cerró con tres cosas: la puerta de 2 tandas, el nivel `flojo` para 1,2 a 2,0 y que la cifra de la agencia en P quede a más de 1,0 h de la media, de modo que «cifra de la agencia ± 0,6» sin mirar tandas no cubre.
- H3 (caso 8): probado «esperar siempre» (E-S8) y «poner cualquier papel como evidencia»: solo cuentan K1 y K2 puestos sobre la mesa, y poner señuelos da 0.

---

### 12. Qué queda registrado (sin puntaje)

Eventos que guarda la partida (se reconstruye todo desde ellos; el docente recalcula sin confiar en lo guardado):

| Evento | Datos |
|---|---|
| `p1.respuestas` | `propias: bool` (no los valores) |
| `p1.abrio` / `p1.ayudado` | papel, ficha gastada |
| `caso.entra` | caso, tipo, fichas, C, L |
| `abrir` | caso, papel, rol (clave, refuerzo, señuelo) |
| `tanda` | caso 3, índice, media |
| `escribir` | caso, campo, valor, correcto (sí/no/banda) |
| `armar` | caso, piezas |
| `evidencia` | caso 8, papeles puestos |
| `lector` | caso 7, antes y después |
| `sella` | caso, decisión, C/L aplicados, código `E…` si lo hay |
| `nota` | escalón visto |
| `archivo` | recorte abierto |
| `carta` | idea, orden |
| `cierre` | `mesaFija`, C, L |
| `practica` | caso, intento |

Con eso `registro-t1.ts` calcula, por idea, la clase de T1.5 (`descubrió solo`, `descubrió con pista`, `se dejó engañar`, `acierto sin evidencia`, `sobrecorrigió`), el escalón en que acertó, los hábitos (8.2) y el cambio de opinión (abrió en el caso siguiente el tipo de papel que había saltado). **Sin nube del paso 1:** solo `propias`. La página del docente muestra una línea por alumno con 8 casillas, como pide T1.5.

---

### 13. Qué hay que construir y en qué orden (etapa 6)

Cada pieza nueva, con su `.test.ts`; las pruebas fijan las propiedades de abajo.

| # | Pieza | Pruebas mínimas |
|---|---|---|
| 1 | `tipos.ts` (G7, G8, G9): sorteo de tipos, claves, 6 de 9, orden | Las 10 tiradas se cumplen; conteos P4 B4 A2 del caso 3; que la misma semilla da lo mismo |
| 2 | `medidores.ts` (G1, G2, G6) | Tope; umbral 25 baja a 2 fichas; mesa fija con 60 y 60 |
| 3 | `carpeta.ts` (G3, G10) | Gasto; reabrir no cuesta; con 3 de 6 hay clave con prob. 0,50 |
| 4 | `armador.ts` (M3) | Pieza clave solo existe con el papel abierto; 2 a 3 piezas |
| 5 | `reglas-t1.ts`: las tablas R2 a R8 como datos | Cada caso tiene todas sus filas; `E…` mapeados |
| 6 | `tandas.ts` | Cobertura 50 % y 75 % del rango mínimo-máximo con 2 y 3 tandas, 88,7 % y 97,5 % con holgura (la ficha ya los calculó); puerta de 2 tandas |
| 7 | `bienestar.ts` | Invariantes I1 a I4 del caso 5 en 1.000 versiones; que los 13 peores suban sin taller |
| 8 | `grafico.ts` y titular (casos 6 y 7) | `N` correcto; `x` correcto; sesgo del eje |
| 9 | `ayuda.ts` | Siempre se puede avanzar (8.5); un hábito se cumple con dos clases en dos casos |
| 10 | `registro-t1.ts` | Clasifica en las 5 clases; acierto sin evidencia en caso 8 con `e < 2` |
| 11 | Simulación de perezosos | Las estrategias de 11.5 con las tablas de esta sección |
| 12 | `guion-t1.ts` | `problemasDeTexto` sin voseo ni guiones largos |

**Lectura y tamaño de letra (regla del texto que se lee).** Esta entrega no dibuja ninguna pantalla: lo medible se mide en construcción. Se fija aquí lo que las pantallas nuevas deben cumplir: letra mínima de **6 px lógicos en el lienzo del boceto, que son unos 12 px en un celular de 375 px de ancho** (`MIN_LOGICO = 6` en `medir_legibilidad.py`); contraste mínimo 4.5 a 1. Con la paleta del boceto, calculado a mano con `(L1 + 0,05)/(L2 + 0,05)`: etiquetas de los tubos `#b8d4ff` sobre `#07060d` = 13,3 a 1; `#ffdc94` sobre `#07060d` = 15,3 a 1. Los demás textos se miden con el script. **Estados que `?medir=1` debe recorrer:** entrada de cada caso, papel abierto, tira de piezas, casilla numérica con teclado abierto, nota de la editora, carta dada vuelta. Los dos riesgos que ya ocurrieron (sello que tapa el titular, números que se pisan con «TIEMPO») se vigilan en la entrada y el cierre de cada caso.

---

### 14. Ajustes que este documento hace a la ficha (para que el crítico los mire)

| # | Ajuste | Por qué |
|---|---|---|
| 1 | Casos 6 y 7: la **hoja** (lista de 60 y hoja de datos) va **adjunta**, no entre los 6 papeles; la ficha tenía la lista de 60 y la hoja con la escala entre los 9 | Sin esa hoja no se puede escribir el número; los claves de 7 pasan a ser correo, captura y ficha técnica |
| 2 | Caso 3: puerta de 2 tandas, nivel `flojo`, tabla por tipo (R3) | H2 y la estrategia dominante nueva que crea una holgura sola |
| 3 | Caso 5: tres caminos con costos distintos, sesgo +2,5 en (b), bandas ±1,0, orden de reglas R5.3 a R5.9 | Que la regresión salga de una regla y que (a), (b) y (c) no se dominen |
| 4 | Caso 6: base de titular con `N` siempre; cuatro extensiones; `podrían` ≡ sin clave | H1 y que el número decida en toda rama |
| 5 | Caso 7: rótulo con `x` en toda publicación; tal cual en P baja a −10/+10 con rótulo correcto | H1 y el número que decide |
| 6 | Caso 8: poner papeles sobre la mesa; `e` escala el efecto; «financiar cuando aún no» = −15/+6 | H3 |
| 7 | Escalón 3 en la partida oficial al cumplirse un hábito (DEFECTO) | H5 |
| 8 | «Probar este caso con otras cifras» (DEFECTO) | Es el escalón 4; la ficha dejaba repetir «el juego» entero |
| 9 | Tablas de estrategias de la ficha, secc. 8: hay que volver a correrlas | Las tablas R2 a R8 cambiaron |

---

### 15. Avisos para otras partes

- **Narrativa:** escribir las pistas de T1.3 por código `E…`; los 6 recortes del archivo; los textos que faltan en las cartas (V3); los nombres de los papeles del caso 8 sin delatar; la línea de la editora en la puerta de las tandas, en el «¿sellar?» y en el cierre de la edición con y sin mesa fija.
- **Crítico:** mirar los 9 ajustes de la secc. 14 y correr las simulaciones de 11.5.
- **Construcción:** `reglas-t1.ts` es **datos**, no lógica suelta, para ajustar números tras la primera prueba sin tocar reglas; el umbral 60 y 25 y todos los efectos pueden cambiar después de probar con alumnos.
- **Código existente:** no se tocó `escalera.ts` ni nada de AIEF; el cambio de su tercer escalón sigue esperando el OK de Ronald.
- **Sonido:** el sonido de cada acción (papel, ficha, sello) queda para `07-sonido.md`.

---

### Lista de salida · Tema 1 · bucle v1

Conteos **a mano** en este documento (sin terminal en la tarea). Las comprobaciones de texto se hicieron con búsquedas sobre el archivo; sus resultados están en la última línea.

- ✔ **Bucles en tres escalas con flechas:** secc. 1.1, 1.2 (7 pasos numerados), 1.3. 3 de 3.
- ✔ **Catálogo con ficha por mecánica:** secc. 3, 14 filas M1 a M14; cada una con tipo, qué hace, contenido que la vuelve necesaria, cómo se ve y código. Tipos presentes: cálculo (M6, M9, M10), decisión (M2, M3, M7, M8, M10, M11), exploración (M1, M4, M14), minijuego (M5). 4 de 4.
- ✔ **Retroalimentación:** secc. 7.1 (acierta con evidencia, acierta sin evidencia, se equivoca, se traba: 4 filas) y escalera de 4 escalones en la secc. 8; ningún escalón bloquea (8.5).
- ✔ **Economía:** secc. 9, 4 recursos y 2 descartados con motivo; C y L cambian decisiones (cada uno baja las fichas a 2 al caer a 25).
- ✔ **Dificultad:** secc. 10, 6 palancas con dónde aplica.
- ✔ **Sin estrategia dominante:** 11.1 (costo por los dos lados); dos estrategias **exactas**: E-S1 (56 < 60, 10 tiradas sumadas una por una) y E-S2 (L ≤ 50). Las otras 8 (E-S3 a E-S10) **quedan especificadas y sin correr**: lo dice la cabecera, 11.5 y el aviso a crítico. **Esto no es un ✔ de simulación: es un ✔ de las dos pruebas exactas y de la especificación del resto.**
- ✔ **No se ajusta por prueba y error:** 11.2; los medidores no se mueven al abrir y la decisión sellada no se rehace (G4); 0 pantallas con consecuencia visible y decisión rehacible en la secc. 5.
- ✔ **El número decide:** 11.3 enumera los 8 números del tema: 5 deciden, 3 son de adorno (paso 1), y el paso 1 lo dice a propósito. Frases con piezas que solo existen abriendo el papel en 3 casos (2, 3-A y 6).
- ✔ **Cada subtema, su juego:** 8 mecánicas de caso distintas (M4, M5 + M6, M7, M8, M9, M10, M11, M3) y ninguna se estira a otro caso salvo M3 (frase por piezas) en los casos 2, 3-A y 6 y el tambor reutilizado del 3 en el sorteo del 5, ambos usos donde la pieza es la que mejor enseña.
- ✔ **Los 4 pendientes del aprendizaje cerrados:** (1) rediseñar (R7.3, R7.4, tabla 5.6) y piezas del titular (5.5); (2) holgura de 0,25 h (5.2); (3) caso 8 (5.7, H3); (4) escalera sin bloquear (secc. 8). 4 de 4.
- ✔ **Un arreglo se vuelve a probar:** 11.6, 3 arreglos con su prueba; el de H2 encontró y cerró una estrategia dominante nueva.
- ✔ **Tabla de reglas programable:** G1 a G12, P1.1 a P1.6, R2.1 a R8.8 (R2: 4, R3: 4 filas por tipo, R4: 5, R5: 9, R6: 6, R7: 5, R8: 8), V1 a V6; cada una con condición y efecto numérico.
- ✔ **Sin nota:** ningún efecto cuenta como puntaje (G6, secc. 12).
- ✔ **Cada alumno tiene su respuesta correcta:** G7 a G9: tipo de 3 casos, estudio bueno del 4, δ del 5 y tipo del 8 cambian la respuesta correcta; 120 órdenes y papeles por semilla.
- ✔ **Individual:** no hay careo ni juego en grupo; el colega «a ojo» es un personaje (R8, 5.7).
- ✔ **No manda a leer y no enseña software:** una búsqueda sobre el archivo de nombres de programas de estadística y de la frase «según el dossier» no halló ninguno en esta sección (salvo esta línea, que los nombra para decir que no están); «dossier» aparece solo en dos notas del equipo (secc. 3 sobre `escalera.ts` y caso 5), nunca en un texto del alumno.
- ✔ **Tuteo, sin guiones largos, sin voseo:** búsqueda del guion largo sobre el archivo: 1 hallazgo en esta sección (11.3), corregido; segunda búsqueda: 0 en la sección. Búsqueda de formas de voseo comunes (tenés, podés, vos, mirá, contá, elegí, abrí, sabés, querés, hacé, poné, usá, fijate): 0. No se corrió `buscar_voseo.py` (sin terminal): pendiente para quien lo tenga.
- ✔ **Legibilidad:** ✔ (no aplica la medición: esta entrega no dibuja pantallas). Se dejan fijados 6 px lógicos (12 px a 375), contraste 4.5 a 1 y 2 contrastes calculados a mano (13,3 y 15,3), más los 6 estados a medir (secc. 13).
- ✔ **Lo aprobado no se reabre:** ideas, forma elegida y aspecto A intactos; los 9 cambios de la secc. 14 se declaran como ajustes que el crítico revisa, no como decisiones tomadas.
- ✔ **Archivos tocados:** solo `docs/juego/gdd/02-bucle-y-mecanicas.md`, sección nueva al principio. La sección AIEF de abajo no se editó.

---

## AIEF · Tema 1 · versión 2 · 27-09-2026 · Etapa 3 rehecha: práctica que se ve, nota que no se tantea

**Por qué se rehace.** La etapa 2 rehízo el tema (`04` «AIEF · Tema 1 · versión 2», sobre todo A2.1,
A2.4 y A2.10) porque la v1 comprobaba y no enseñaba; y el crítico (`06`, 27-09) pidió 8 cambios
imprescindibles. Esta versión **reemplaza** B1.1, B1.6, B1.7 y B1.11 de la v1, y **ajusta** B1.3, B1.4,
B1.5 y B1.8. Lo que no se nombra aquí de la v1 sigue valiendo (queda abajo, como historia).

**Ajustes del 27-09 tras `06` v5** (revisión del papel de esta versión, hallazgos 1, 2 y 8):
- **Sin cuenta se juega sólo el ejemplo** (hallazgo 1, grave): nuevo punto **1 bis** de B2.10, al lado de
  la semilla. Regla completa ahí.
- **Página del manual «Calidad»** con los dos pisos y los dictámenes (hallazgo 2): nueva en B2.5, con cómo
  se usa en el dictamen. Aviso a narrativa en B2.11 (sólo pule el tono; el contenido de la regla es este).
- B2.3 (b) toma la línea de `05` N2.4 para cerrar el campo de NC: «Déjala por hoy. Decide con lo que
  tienes.» (hallazgo 8).

**Qué leí:** `04` A2.1 a A2.10, `06` (entrada del 27-09 sobre el Tema 1, hallazgos 1 a 12 y los 8
imprescindibles), `05` N1.2 a N1.4, mi v1, y en el código `tema1.ts`, `ventanilla.ts` y `guion-tema1.ts`.

**Palabras de oficio nuevas:**
- **Carpeta de práctica:** la primera de cada tipo; no da puntos y su ficha se da vuelta en el momento.
- **«Se adelanta el tiempo»:** un toque y la pantalla pasa las hojas del calendario; aparece la ficha de
  esa carpeta, con el color y el papel que lo avisaba resaltado. Es la consecuencia, sin texto de teoría.
- **Estrategia dominante:** una respuesta que, repetida siempre, gana sin entender. Hay que cerrarla.

### B2.1 Los tres bucles del Tema 1, versión 2

**El gesto (segundos):** igual que la v1: mirar un papel, tocar o escribir, el mundo responde. Nunca
«correcto, +10». Novedad: **ningún ✔ ni ✗ de una decisión se ve antes del cierre** (imprescindible 4).

**La carpeta tiene dos formas:**

```
PRÁCTICA (la primera de cada tipo, sin nota)
decides con lo que tienes → firmas → [toque] se adelanta el tiempo
  → la ficha se da vuelta YA: color + el papel que lo avisaba, resaltado
  → la jefa dice UNA línea y el manual suma la herramienta que faltaba
  → no se rehace: la siguiente carpeta es otra persona con otros números

CON NOTA
llega el cliente y dice su frase → abres la carpeta (un papel por pestaña)
  → escribes EL NÚMERO del paso (NC o valor de hoy)   ← se corrige ahí, escalera (a)(b)(c)
       └ un fallo después de (c): el cliente se cansa y se va (escalón d)
  → tocas el sello de la hoja de observación (sólo 1.2) ← no se corrige ahí
  → decides y firmas (dictamen o monto)                  ← no se corrige ahí, no se rehace
  → la carpeta se archiva boca abajo; pasa el siguiente
```

**La jornada:**

```
Llegada (Doña Rosa: regla cero completa, ficha verde al momento)          [ya existe]
→ 1.1 MOSTRADOR
    persona de práctica (Doña Nieves empuja una hoja) → se va conforme o sin respuesta
    → 3 personas con nota (en una, sorteada, Doña Nieves vuelve a sugerir)
    → Doña Teresa: «La nuestra es otra…»
→ 1.2 VENTANILLA
    carpeta de práctica: NC + aceptar/devolver; norma bien puesta, un pagaré en una pestaña
    → se adelanta el tiempo: «En marzo apareció esa deuda. No pagó.» (pagaré resaltado)
    → Doña Teresa, una línea; ENTRA la hoja de observación
    → 2 carpetas con nota: NC · sello · dictamen de 3 botones (una se queda, una se devuelve)
→ 1.3 VENTANILLA
    carpeta de práctica: el carpintero, sólo el monto, con la regla de ayer
    → se adelanta el tiempo: gris, «Se fue enfrente…»
    → Doña Teresa: «Desde hoy, la garantía se mira en bolivianos de hoy»; ENTRA la fórmula
    → 1 carpeta con nota: valor de hoy · monto (siempre contraoferta)
→ CIERRE: se da vuelta la pared (las con nota; las de práctica ya estaban vueltas, con su marca)
→ si algo falló: repaso con OTRAS carpetas del tipo que falló (sin prácticas) → hasta que salga bien
```

**La materia:** sin cambios (pared de fichas y manual que crece).

### B2.2 Diseño inverso (actualiza B1.2)

| Sabe hacer | Lo demuestra así | Si lo hace mal pasa esto |
|---|---|---|
| 1.1 Decir qué decide cada usuario y qué mira primero, y no dejarse llevar por quien preparó el balance | Sello y hoja a 3 personas sorteadas que no dicen quién son; ignora la sugerencia de Doña Nieves cuando no contesta | La persona se va sin respuesta; llega otra, con otro papel. Pista según el error |
| 1.2 Buscar la NC antes de aceptar una NIIF | Escribe el número de NC y dictamina contra la nota del contador | NC: se corrige ahí; pasado (c), el cliente se va. Dictamen: color al cierre, repaso |
| 1.2 y 1.3 Ver que cumplir la norma no alcanza (fundamental frente a mejora) | Sello de observación y dictamen de tres botones | Al cierre: rojo si aceptó un defecto fundamental; gris si observó o devolvió uno sano. El sello equivocado se nombra en la ficha |
| 1.3 Reexpresar y prestar con la regla nueva | Escribe el valor de hoy (I₀ distinto de 100) y el monto | Valor: se corrige ahí. Monto: color al cierre, repaso con otros números |

### B2.3 Las tres carpetas de práctica

Las tres usan números de la versión del alumno, **no dan puntos** y no se rehacen. Lo que el alumno hace
en ellas se guarda (Ronald lo ve en su hoja), pero no suma ni resta.

**(a) 1.1 · la primera persona.** Igual que una persona con nota (B2.4), con una diferencia: antes de que
selle, Doña Nieves se asoma desde el mostrador y señala una hoja («Dale esa, que salió linda»). La hoja
sugerida es **siempre una de las que esa persona no necesita** (sorteada entre las otras cuatro). Si la
entrega, la persona se va sin respuesta en el momento; si entrega la correcta, se va conforme. En 1.1 la
consecuencia ya era inmediata, así que esta práctica sólo agrega a Doña Nieves y quita la nota.

**(b) 1.2 · la de calidad (el pagaré).** Una carpeta completa de 1.2 con la norma **bien** puesta, entregada
a tiempo y prolija, y en una pestaña un **pagaré firmado** que el pasivo no muestra. La hoja de observación
todavía no existe: el dictamen es de dos botones, ACEPTAR o DEVOLVER.
- La NC se busca con la escalera, sin nota. Si falla una vez más después del escalón (c), Doña Teresa
  cierra el campo sin mostrar el número («Déjala por hoy. Decide con lo que tienes.», `05` N2.4; la de
  antes señalaba el pagaré) y se sigue al dictamen.
  Así la práctica no se traba y nunca se da la respuesta.
- Firmas → **se adelanta el tiempo**:
  - aceptó: rojo, «En marzo apareció esa deuda. No pagó.» y el pagaré resaltado;
  - devolvió: el color del buen rechazo (`bien-rechazado`), con el mismo pagaré resaltado y «Enfrente le
    prestaron. En marzo apareció esa deuda y dejó de pagarles». La idea se ve igual por los dos caminos.
- Doña Teresa, una línea: «Desde hoy, además de la norma, mira el resto de la carpeta.» Sube la hoja de
  observación por primera vez (hoja inferior) y el manual suma una línea: «La norma, en la operación
  marcada. La hoja de observación, en el resto» (`04` A2.7) y **la página «Calidad»** (B2.5), en el mismo
  momento, antes de la primera carpeta con nota.
- **Regla del sorteo:** el pagaré (deuda que falta en el pasivo, en forma de pagaré) no sale en las
  carpetas con nota de esa jornada. Pueden salir otros defectos o **otra redacción** del mismo tipo (la
  carta de cuota vencida, papel 3 de `05` N1.4), para que se reconozca la idea y no el papel (A2.8).

**(c) 1.3 · el carpintero con la regla de ayer.** El manual todavía tiene la regla de ayer (60 % del valor
en libros). La ficha muestra lado a lado **valor en libros · índice al comprar · índice de hoy**, con dos
barras si alcanza (B1.5), sin fórmula ni texto. Se escribe **sólo el monto**.
- Los números se sortean para que los tres caminos se distingan: 60 % de libros **<** tope con valor de
  hoy **<** lo que pide, todo por encima del mínimo, en múltiplos de Bs 100 (es contraoferta, como la
  carpeta con nota). Así:
  - regla de ayer → **gris**: «Se fue enfrente. La cooperativa le prestó más por la misma sierra»;
  - lo que pide → **rojo**: «No pudo pagar, y la sierra no alcanzó para cubrir el préstamo»;
  - el tope con valor de hoy (si alguien lo intuye) → verde, «Bien.»;
  - cualquier otro → el color que corresponda con su línea de hoy.
- Doña Teresa: «Desde hoy, la garantía se mira en bolivianos de hoy.» El manual suma la fórmula
  V × I₁ / I₀ y la regla del 60 % sobre ese valor.
- Índice de compra distinto de 100 también aquí: si la práctica usara 100, sembraría el atajo «dividir
  entre 100» justo antes de la carpeta con nota.

### B2.4 1.1 · El mostrador (ajusta B1.3; imprescindible 7)

Se mantiene todo B1.3 (sellos y hojas que no se gastan, persona que se va y llega otra, sin reintento sobre
la misma persona, tres bien atendidas para pasar), con estos cambios:

- **Nombres sorteados aparte del rol** (hallazgo 6 de `06`): cada persona toma un nombre de una lista común
  (sólo texto). El registro de Ronald guarda el rol al lado. Nada en pantalla dice el rol.
- **Seis sellos, cinco hojas** (hallazgo 7): el sello del banco queda como distractor; su hoja («liquidez y
  endeudamiento») sale de la lista porque el banco nunca llega a la fila y se pisaba con la del proveedor.
  Las cinco hojas van en lista vertical; los seis sellos en grilla de 2 × 3.
- **Doña Nieves sugiere** en una de las tres personas con nota (sorteada), igual que en la práctica.
  Entregar la hoja sugerida cuenta como falla, con su pista (`04` A2.6 punto 2).
- La frase 2 del inversionista (la tienda en Tolata) se reescribe sobre su propia plata (narrativa).
- **Pista (a) conectada con la práctica:** «Pasó lo mismo que con la primera persona».
- Sin «No es esa» ni reacción que confirme la opción: las reacciones de `05` N1.2 no dicen cuál era.

**Riesgo que se acepta:** la sugerencia de Doña Nieves siempre es equivocada, así que descarta una hoja de
cinco en una de tres personas. Es justo la idea del subtema (quien prepara no es neutral) y 1.1 pesa 15.

### B2.5 1.2 · Norma, observación y dictamen (reemplaza B1.6; ajusta B1.4; imprescindibles 3, 5 y 6)

**Qué ve y qué toca en cada carpeta con nota, en este orden (375×812):**
1. Frase del cliente arriba (fija); la carpeta en pestañas: operación marcada, nota del contador, un papel
   más (**siempre**, también en las sanas, `05` N1.4).
2. Escribe la **NC** (teclado numérico; la operación marcada queda fija arriba del campo). Se corrige ahí.
3. **Hoja de observación** (sube desde abajo, sin teclado): 7 sellos en grilla de 2 columnas, las 6
   características y «nada que observar», con el nombre y **sin** decir si es fundamental o de mejora.
4. **Dictamen:** ACEPTAR · ACEPTAR CON OBSERVACIÓN · DEVOLVER, en columna, botones de 48 px como mínimo.
5. Se archiva boca abajo. Ni ✔, ni color, ni frase que confirme.

**La NC con escalón (d)** (imprescindible 3): (a) consecuencia y pista según el error; (b) pista concreta;
(c) a leer págs. 8 a 10; **un fallo más: «Vuelvo otro día», el cliente se va**. La carpeta cuenta como
fallada (en la pared, gris: «se fue sin respuesta»), y el repaso trae otra operación. La pista (a) recuerda
la práctica cuando el error es el mismo («¿Te acuerdas de la carpeta de la mañana?»).

**Sin delatores** (imprescindible 5, B1.4 con el hallazgo 11 de `06`):
- Nota del contador de forma única: «Registrado según la [norma]. [Justificación].» Con NIIF, la única
  justificación es «Porque ninguna NC boliviana lo regula» (verdad en la bien hecha, error en la mal hecha).
  **«Como Bolivia ya adoptó las NIIF» sale de las notas** y queda sólo en frases del cliente (grupo B de
  `05` N1.3).
- Frase del cliente sorteada de su grupo, independiente del dictamen.
- Acierto de la NC neutro: «Bien.» (sin «así que la NIIF entra»).
- Flujo de efectivo en una de cada cuatro jornadas, con dos caras; en la cara «mal» el contador cita una NC
  claramente ajena, nunca la 1, 11 ni 14.

**El par de la jornada: una se queda, una se devuelve** (imprescindible 6), en orden sorteado:

| Carpeta | Norma | Papel más | Sello correcto | Dictamen |
|---|---|---|---|---|
| Se queda (una de dos formas) | bien | sano | nada que observar | aceptar |
| | bien | defecto de mejora | esa característica | aceptar con observación |
| Se devuelve (una de tres formas) | mal | sano | nada que observar | devolver |
| | mal | defecto de mejora | esa característica | devolver |
| | bien | defecto fundamental | esa característica | devolver |

Así el sello no delata el dictamen (salvo «fundamental → devolver», que es la idea misma), y ningún dictamen
repetido gana la jornada. **El papel 2 de `05` N1.4 (la fraternidad) sale**; el papel 1 (garantía con valor
viejo) sólo en repaso, porque anticipa 1.3.

**Página del manual «Calidad»** (ajuste del 27-09 tras `06` v5, hallazgo 2). Marcada **regla del juego**,
entra con la hoja de observación después de la práctica del pagaré. Texto completo, sin nada más:

> **Calidad**
> Fundamentales: relevancia y representación fiel.
> De mejora: comparabilidad, verificabilidad, oportunidad y comprensibilidad.
> En la hoja de observación, sella la que falla. Si no falla ninguna: «nada que observar».
> Norma mal: devuelve.
> Norma bien y defecto fundamental: devuelve.
> Norma bien y defecto de mejora: acepta con observación.
> Norma bien y nada que observar: acepta.

Los pisos salen del Marco Conceptual (dossier Tema 1, 1.3); los tres dictámenes son **regla de la agencia**
(adaptación: el dossier no dice cuándo se acepta con observación), como el reglamento de *Papers, Please*.
Se anota en `00` R3.2 para que Ronald la revise.

**Cómo se usa en el dictamen.** Lo que se juega es **ver cuál característica rompe el papel** (un balance
que llegó en julio es oportunidad; una deuda que no está en el pasivo es representación fiel) y **buscar la
NC**. El dictamen es la combinación de las dos cosas según la página, y ahí está el cruce que se equivoca el
que no mira ambas: norma mal con defecto de mejora es **devolver**, no «con observación». Los sellos de la
hoja siguen mostrando sólo el nombre (sin el piso): el piso se mira en el manual, a un toque. Quien leyó el
dossier y devolvería un balance de julio encuentra la regla escrita antes de la primera carpeta con nota,
así que el gris ya no castiga al que sabe: castiga al que no abrió el manual. No se agrega una práctica de
defecto de mejora (la jornada no crece); la ficha del cierre, si falló, nombra el sello y el dictamen
(«Llegó en julio: tocaba aceptar con observación»), sin porqué.

**Para que una carpeta salga bien hacen falta las tres cosas:** NC, sello y dictamen. **Al cierre** la
ficha nombra lo que no se vio, sin teoría: «El auditor anotó que no viste que el balance llegó en julio»;
«Llegó a tiempo, pero no decía la verdad». El repaso de 1.2 trae **una** carpeta nueva (se queda o se
devuelve, sorteado aparte), con otro defecto u otra redacción.

**Colores al cierre** (sin cambios frente a B1.6): aceptar (con o sin observación) un fundamental → rojo;
devolver u observar uno sano → gris; devolver uno de mejora con norma bien → gris; norma mal aceptada →
rojo, «El auditor del banco observó este balance: la operación la rige la NC N».

**Redacciones** (A2.3 cambio 6, necesario antes de que cuente para la nota): 2 o 3 por operación de 1.2,
operaciones para las NC que faltan, y 2 o 3 por papel de calidad. Lo escribe narrativa.

### B2.6 1.3 · Valor de hoy y monto (ajusta B1.5; imprescindibles 1 y 2)

- **Siempre contraoferta** en la carpeta con nota y en cada repaso: el tope (60 % del valor de hoy) queda
  entre el mínimo y lo que pide. El sí completo ya lo enseña Doña Rosa.
- **Tope en múltiplos de Bs 100:** se pide que el **valor de hoy sea múltiplo de Bs 500** (el 60 % de un
  múltiplo de 500 es múltiplo de 300, y por tanto de 100). Con eso el redondeo nunca decide un color.
- **Índice de compra distinto de 100** en la jornada y en la práctica (B1.5; tabla de errores de B1.5 sin
  cambios). La versión 0 de ejemplo sigue como hoy.
- **Regla del monto completa en el manual** (imprescindible 2), desde la Llegada: «Nunca prestes más de lo
  que pide. Si tu tope no llega a su mínimo, no le prestas (0). La agencia presta en múltiplos de Bs 100,
  hacia abajo.» Marcada **regla del juego**. Doña Teresa la dice en la Llegada con las tres cifras de Doña
  Rosa.
- El cliente dice «¡Gané Bs X!» (el ajuste leído como ganancia); prestar por su cifra sale rojo o gris al
  cierre (A2.2).
- **Valor de hoy con escalón (d)** como la NC (recomendado, no imprescindible: el espacio de respuestas es
  grande, pero así la regla es una sola para todo número que se corrige ahí).
- **La línea escrita al cliente sale** (A2.3 cambio 4). Pasa a la defensa (criterio 2 de A2.8). Los
  eventos viejos de esa línea se siguen leyendo; simplemente no se piden más.

### B2.7 Ritmo de la jornada en 375×812 (reemplaza B1.7)

| Parte | Gestos | Teclado | Texto para leer |
|---|---|---|---|
| Llegada | 3 «seguir» + 1 número | numérico | regla cero completa, en el manual |
| 1.1 | práctica 2 toques + 3 personas × 2 = **8 toques** (más si falla) | no | frase de cada persona |
| 1.2 práctica | 1 NC + 1 dictamen + 1 «se adelanta» | numérico | una línea de consecuencia, una de la jefa |
| 1.2 con nota | 2 NC + 2 × (sello + dictamen) = 2 números + 4 toques | numérico en la NC | frase, nota, un papel |
| 1.3 práctica | 1 número + 1 «se adelanta» | numérico | una línea de consecuencia, una de la jefa |
| 1.3 con nota | 2 números | numérico | frase del cliente |
| Cierre | 1 toque + pasar fichas | no | una línea por ficha |

Frente a la v1 con calidad: **2 números y 3 toques más** (las prácticas), **ninguna línea de texto**
(sale la del cliente) y los textos largos de `05` N1.5 cortados a una línea o a «Bien.». Queda del mismo
largo y se lee menos (`04` A2.4). Orden de recorte si aun así se siente larga: el de A2.4 (1.1 a dos
personas; después fundir su práctica con la primera con nota; nunca las prácticas de 1.2 y 1.3).

**Pantalla:** el manual y la hoja de observación son **hojas inferiores** (el botón atrás las cierra
primero); con el teclado abierto, la cifra que se usa queda fija arriba del campo (operación en 1.2;
libros, I₀ e I₁ en 1.3); los botones van en columna o en grilla de 2; nada depende de pasar el mouse. Se
mide en 375×812 y en horizontal antes de mostrarlo.

### B2.8 Nadie gana sin entender (actualiza B1.8)

| Perezoso | 1.1 | 1.2 | 1.3 |
|---|---|---|---|
| Probar números | no hay números | NC: pasado (c), el cliente se va y la carpeta cae | valor de hoy: pistas, y (d) recomendado |
| Mirar el ✔ | no hay ✔ | no hay ✔ ni color hasta el cierre | igual |
| Saber el patrón «una y una» | no aplica | sabe que una se devuelve, pero no cuál ni con qué sello; el sello cuenta | una sola carpeta |
| Siempre lo mismo | un sello acierta 1 de 6 | «devolver siempre» pierde la que se queda; «nada que observar» falla todo defecto | lo que pide → rojo siempre (contraoferta); regla de ayer → gris; mínimo o 0 → gris |
| Seguir a Doña Nieves | falla | no aplica | no aplica |
| Copiar | nombres, frases, orden sorteados | operación con 2 o 3 redacciones, nota, papel, orden | cliente, garantía, índices |
| Tantear con la práctica | la práctica no se rehace; la siguiente es otra persona | la práctica muestra el pagaré, no el dictamen de las con nota | la práctica tiene otros números |

**Pruebas que lo encierran (sobre la jornada del Tema 1 sola, no mezclada con el Tema 2):** en las 999
versiones, «lo que pide», «cero», «el mínimo», «la regla de ayer» y «el valor del cliente» no aciertan
nunca la carpeta con nota de 1.3; «siempre aceptar», «siempre devolver», «siempre con observación» y «el
patrón una y una adivinando la primera» no pasan 1.2 en más del 30 % de las versiones (con el sello
contando, bastante menos); el defecto de la práctica no se repite con el mismo papel en las carpetas con
nota; frase del cliente y justificación independientes del dictamen (B1.4).

### B2.9 Economía y registro

Economía sin cambios (B1.9): pared y cola, ningún recurso nuevo. **El registro que ve el alumno** muestra
qué firmó, sin ✔ ni ✗ de decisiones hasta el cierre. **El de Ronald** guarda por ítem: qué escribió o tocó,
en qué escalón acertó y, en 1.1, cuántas personas hicieron falta; así sirve para cualquier respuesta a la
pregunta abierta de `04` A2.5 y para la hoja de la defensa. Las prácticas se guardan marcadas como
práctica y no entran al puntaje.

### B2.10 Qué hay que construir o cambiar en el prototipo, en orden

**Antes de que Ronald lo pruebe** (los 8 imprescindibles de `06` más lo que pide la v2 de `04`):

1. **Semilla propia de AIEF y generación de carpetas guardada en la partida** (imprescindible 8). Va
   primero porque todo lo que sigue cambia el sorteo; una partida sin ese dato se lee con la generación de
   hoy, que se conserva al lado.

   **1 bis. Sin cuenta se juega sólo el ejemplo, y el número de versión no se ve** (ajuste del 27-09 tras
   `06` v5, hallazgo 1, grave). Va junto con la semilla porque toca cómo se elige la versión.
   - **Sin sesión:** siempre la versión 0 (caso de ejemplo, igual para todos), rotulada «Partida de
     ejemplo: no cuenta para la nota». `#v=N` se ignora. La versión 0 cumple las condiciones de B2.6
     (contraoferta, I₀ distinto de 100) para no sembrar el atajo del 100; como es la misma para todos y
     nunca da nota, no hay nada que copiar.
   - **Con sesión de alumno:** la versión sale sólo de su cuenta; `#v=N` se ignora y la pantalla **no
     muestra el número** («TUS DATOS: VERSIÓN N» sale). El número va en la hoja de Ronald.
   - **`#v=N` sólo para la cuenta de docente** (Ronald), para revisar la versión de un alumno.
   - **Guardado:** la partida de ejemplo se guarda con su propia clave, al lado de las de hoy (nombres
     estables), y **nunca se sube a una cuenta**. La partida local de un alumno lleva la marca de su
     cuenta: sólo esa se sube al volver la red (así sigue valiendo «se juega sin conexión y se guarda al
     volver»). Una partida local vieja sin marca no se borra, pero tampoco se sube como partida con nota.
   - **Prueba:** sin sesión, con cualquier `#v=`, las carpetas son las de la versión 0; con sesión de
     alumno, `#v=` no cambia nada; ningún texto de pantalla del alumno contiene su número de versión.
   - Igual en la web y en la app (la app carga el sitio publicado; no hay nada nativo que tocar).
   - **Qué queda:** un compañero con la cuenta y la clave del alumno puede jugar por él. Eso ya no es del
     juego sino de la cuenta; lo cubre la defensa oral.
2. **Ningún ✔ de decisiones a la vista del alumno antes del cierre** (imprescindible 4). Cambio chico en
   la pantalla y en `describir`.
3. **1.3 con nota siempre contraoferta, valor de hoy múltiplo de Bs 500** (condiciones nuevas en
   `versionValida` y `carpetaT13`), con **la prueba de perezosos sobre la jornada del Tema 1 sola**
   (imprescindible 1).
4. **Regla del monto completa** en la hoja del manual y en la Llegada (imprescindible 2).
5. **Escalón (d) de la NC**: pasado (c), el cliente se va y la carpeta cuenta como fallada; en la práctica,
   Doña Teresa cierra el campo sin dar el número (imprescindible 3). Mismo mecanismo para el valor de hoy.
6. **1.2 sin delatores**: nota de forma única sin «como Bolivia ya adoptó», frase del cliente sorteada
   aparte, acierto neutro, flujo 1 de cada 4 con dos caras, y su prueba de independencia (imprescindible 5).
7. **Hoja de observación y dictamen de tres botones**: el papel más en toda carpeta de 1.2, el evento del
   sello, el par «una se queda, una se devuelve», los colores, el sello nombrado en la ficha al cierre, el
   repaso de una carpeta; sin el papel 2 y con el papel 1 sólo en repaso (imprescindible 6).
8. **1.1 como el mostrador**: seis sellos y cinco hojas que no se gastan, personas y nombres sorteados
   aparte del rol, la cola que trae otra persona tras una falla, Doña Nieves en una sorteada, un evento
   nuevo con el viejo todavía leído (imprescindible 7).
9. **Las tres carpetas de práctica** con «se adelanta el tiempo» y la ficha que se da vuelta al momento;
   la hoja de observación entra **después** de la práctica de 1.2 y la fórmula **después** de la de 1.3;
   el pagaré excluido de las carpetas con nota de esa jornada (A2.1, A2.3 cambios 1 y 2).
10. **Textos**: cortar los de `04` A2.3 cambio 3 (lo escribe narrativa); pistas (a) que recuerdan la
    práctica; **quitar la línea al cliente** de 1.3.
11. **Índice de compra distinto de 100** en la jornada y en la práctica de 1.3, con los diagnósticos «restó
    los índices» e «ignoró el de compra» y «al revés» corregido (B1.5). El crítico lo dejó para después,
    pero la práctica de 1.3 de la v2 lo necesita para no sembrar el atajo del 100.
12. **Registro por ítem con escalón** (B2.9), y las prácticas marcadas aparte.
13. **Pruebas de B2.8** completas, y que una partida vieja se siga leyendo con el resultado que tenía.

**Antes de que cuente para la nota o lo juegue un curso en la app:**

14. **Redacciones**: 2 o 3 por operación de 1.2, operaciones para las NC que faltan, 2 o 3 por papel de
    calidad (A2.3 cambio 6; narrativa las escribe, construcción las carga).
15. **Celular**: manual y hoja de observación como hojas inferiores, botón atrás, cifras fijas con el
    teclado abierto, `/juego-aief` en la precarga sin red (`public/sw.js`), medición en 375×812.
16. **La hoja de Ronald para la defensa** con escalón y puntos por ítem (el puntaje se ajusta a lo que
    responda en `04` A2.5).

**Se reutiliza sin tocar:** lo que lista B1.11 (motor de montos y colores, `escalera.ts`, `partida.ts`,
`nube.ts`, `versionDeRepaso`, `avanceDe` con sus rondas, la pared, el `Mostrador`, el manual de las 14 NC).

### B2.11 Avisos para otras partes

- **`disenador-narrativo` (`05`):** las líneas de consecuencia de las tres prácticas (dos caminos en la de
  1.2, cuatro en la de 1.3), el pagaré, las líneas de Doña Nieves, la frase 2 del inversionista sin la
  tienda, la línea de Doña Teresa que cierra el campo de NC en la práctica, las redacciones del punto 14, y
  el corte de textos. La justificación «como Bolivia ya adoptó las NIIF» sale de las notas (N1.3).
  **27-09 tras `06` v5:** la página «Calidad» del manual está en B2.5; puedes pulir el tono, no la regla ni
  sumarle porqués. La línea que cierra el campo de NC queda la tuya («Déjala por hoy…»).
- **`adaptador-de-dossier` (`00` R3.2):** anotar como adaptación los tres dictámenes de la página
  «Calidad» (regla de la agencia, no del dossier).
- **Construcción:** B2.10 punto 1 bis (sin cuenta, sólo el ejemplo) toca `EscenaVentanilla.tsx`,
  `version-alumno.ts` y el guardado local (`leerLocal`); corren todas las pruebas.
- **`disenador-de-aprendizaje` (`04`):** nada cambia de A2.5. Aviso: la NC que se pierde por el escalón (d)
  hace caer la carpeta entera; conviene que el puntaje la cuente como acierto en el escalón de la carpeta
  de repaso donde salga bien (el registro lo permite).
- **`03` P3.3:** los pesos son los de `04` A2.5; la calidad pesa en 1.2, no en 1.3 (hallazgo 10 de `06`).
- **`critico-de-jugabilidad`:** revisar que las prácticas no se lean como escenas, la cara «devolvió» de la
  práctica de 1.2, el riesgo de Doña Nieves siempre equivocada, y el conteo de B2.7 ya construido en
  375×812.

---

## AIEF · Tema 1 · versión 1 · 27-09-2026 · Etapa 3 sobre el tema ya construido

**Aviso de etapa.** El Tema 1 se construyó el 27-09 saltándose las etapas 2 a 5 y 7
(`.claude/agents/LEEME.md`). La etapa 1 está (`00-adaptacion-aief.md` R3.1, R3.2 y R3.2-bis) y la 2
acaba de terminar (`04-aprendizaje.md`, «AIEF · Tema 1 · v1»). Esta es la 3, **sobre lo construido**:
dice cómo se juega lo que la 2 pidió demostrar, y qué hay que cambiar en el código para eso (sin
escribirlo). Nada de esto se construye hasta pasar por narrativa, crítico y tu aprobación.

**Qué leí:** `04-aprendizaje.md` (A1.1 a A1.5), `00-adaptacion-aief.md` (R3.1, R3.2, R3.2-bis),
`06-revisiones.md` (las dos revisiones de AIEF), `IDEA-JUEGO.md` §18 y §19, y el código:
`src/lib/juego/aief/tema1.ts`, `guion-tema1.ts`, `ventanilla.ts` y
`src/app/juego-aief/EscenaVentanilla.tsx`.

**Palabras de oficio de esta sección:**
- **Bucle (loop):** lo que el jugador hace una y otra vez. Se mira en tres escalas: el gesto (segundos),
  la carpeta, la jornada.
- **Gesto:** la acción física en la pantalla: tocar un sello, entregar una hoja, escribir un número.
- **Descarte:** acertar sacando las opciones que ya se usaron, sin saber por qué la que queda es la buena.
- **Tanteo:** acertar probando y mirando la respuesta del juego («rojo, bajo; gris, subo»).
- **Delator:** un detalle de la pantalla que dice la respuesta sin que haga falta entender (una frase que
  sólo aparece en los casos de «devolver»).
- **Hoja inferior (bottom sheet):** un panel que sube desde abajo, como el manual de hoy; el botón atrás
  lo cierra primero.

### B1.1 Los tres bucles del Tema 1

**El gesto (segundos):** mirar un papel → tocar o escribir → el mundo responde (la persona se va
conforme o molesta; el campo muestra «Bs 103.500» antes de firmar; la pista aparece). Nunca «correcto
+10 puntos».

**La carpeta (el core loop de la ventanilla, igual que hoy):**

```
llega el cliente y dice su frase
  → abres la carpeta (un papel por pestaña)
  → calculas o buscas EL NÚMERO del tema y lo escribes   ← se corrige ahí, con la escalera
  → [si Ronald aprueba] marcas la hoja de observación     ← no se corrige ahí
  → decides (aceptar / devolver, o el monto) y firmas     ← no se rehace
  → la carpeta se archiva; pasa el siguiente de la cola
```

**La jornada:**

```
la jefa abre (regla del día) → 1.1 en el mostrador (antes de abrir)
  → cola: 2 carpetas de 1.2 → hoja nueva del manual → 1 carpeta de 1.3 (el giro)
  → cierre: se da vuelta la pared → si algo falló, jornada de repaso con OTROS clientes
  → aprobado cuando la última carpeta de cada tipo sale bien
```

**La materia:** lo que se acumula de tema en tema es la pared de fichas (historia, no nota) y el manual
(cada tema suma una regla que choca con la anterior). No cambia en esta ronda.

### B1.2 Diseño inverso, con la mecánica que lo obliga

| Sabe hacer | Lo demuestra así | Si lo hace mal pasa esto |
|---|---|---|
| 1.1 Decir qué decisión toma cada usuario y qué mira primero (Cuadro 1, pág. 4) | Pone el **sello de decisión** y **entrega la hoja del balance** que esa persona mira primero, a personas que no dicen quién son | La persona se va sin lo que necesitaba y llega otra persona (otro usuario); pista según el error |
| 1.2 Buscar la NC antes de aceptar una NIIF (págs. 7 a 10) | Escribe el número de la NC; después acepta o devuelve comparando con la nota del contador, que **nunca delata** | NC mal: se corrige ahí. Dictamen mal: rojo o gris al cierre, repaso con otros clientes |
| 1.3 Reexpresar con I₀ distinto de 100, sin restar índices (pág. 14) | Escribe el valor de hoy con índices como 120 y 150; después el monto | Valor mal: no avanza, pista según el error (incluye «restaste los índices»). Monto mal: color al cierre, repaso |
| 1.3 calidad (si Ronald aprueba) | En la hoja de observación marca qué característica falla, y su dictamen sigue la jerarquía | Al cierre: el auditor observa (rojo) o el cliente se va (gris); repaso |

### B1.3 (a) 1.1 · El mostrador: sellos y hojas

**Qué cambia de fondo:** hoy son 3 personas fijas y 3 opciones con reintento (se gana por descarte en
tres toques). Pasa a ser **un gesto de ventanilla con dos partes, sobre personas sorteadas que no dicen
su rol**, sin reintento sobre la misma persona.

**Qué ve (375×812, sin teclado en todo 1.1):**
- Arriba, la persona (silueta en el mostrador) y su frase, que cuenta **qué le pasa**, no quién es
  («Me ofrecieron otro trabajo y quiero saber si esta empresa va a seguir»). La frase queda fija arriba
  mientras decide.
- Debajo, **el portasellos**: 6 sellos en una grilla de 2 × 3, uno por decisión del Cuadro 1 (las seis,
  también la del banco). Botones grandes, de al menos 48 px de alto, con el texto corto del Cuadro 1.
- Después de sellar, **el balance de la Ferretería San Isidro** como una carpeta con 6 hojas en una lista
  vertical (las de la columna «Qué mira primero» del Cuadro 1: liquidez y endeudamiento; rentabilidad y
  patrimonio; capacidad de pago de corto plazo; márgenes por línea; utilidad antes de impuestos;
  continuidad y resultados). Toca la hoja y **se la entregas**.

**Qué toca:** sello (1 toque) → hoja (1 toque). Dos toques por persona. Nada se arrastra.

**Cómo varía por alumno (A1.2 de `04`):** la versión sortea 3 de los 5 usuarios que no son el banco (10
combinaciones), su orden (6), la frase de cada uno (2 o 3 por usuario, las escribe el narrativo), el
orden de los sellos en la grilla y el de las hojas. La versión 0 queda como hoy (proveedor, socio que
piensa retirar su parte, inspectora del SIN), para el ejemplo.

**Por qué no se gana por descarte:** los sellos y las hojas **no se gastan**: quedan en el portasellos
para la persona siguiente. Con 6 sellos y 6 hojas siempre disponibles, cada persona es una de seis por
una de seis. El banco nunca viene a la fila, pero su sello está: es un distractor más.

**Qué pasa si se equivoca:** la persona reacciona en el mundo **sin decir cuál era**: «Con esto no
decido nada de lo mío» y se va (la silueta sale por la puerta). La pista va según el error (las de A1.3
de `04`, por ejemplo: sello del SIN a quien no es el SIN → «Ese papel también lo usan el banco y la
gerencia, no sólo Impuestos»; a la gerencia con sello de otro → «La gerencia prepara el balance y además
lo usa»). **No se rehace:** entra a la fila **otra persona**, otro usuario de los que no vinieron (es el
escalón (d), «otros números», puesto de entrada, como en las carpetas). Si ya pasaron los cinco, vuelve
uno con **otra frase**. Escalera: 1.ª falla, consecuencia y pista; 2.ª, pista concreta («pregúntate qué
va a hacer con el balance, no quién es»); 3.ª, a leer el Cuadro 1 (pág. 4) y págs. 5 y 6.

**Sello bien y hoja mal** cuenta como falla (la decisión sin saber qué mirar es la mitad del subtema),
con su propia pista: «La decisión es esa. Pero ¿qué parte del balance le contesta su pregunta?».

**Para pasar:** tres personas bien atendidas (sello y hoja), no hace falta que sea seguidas. Pesa 10 %
del registro del tema (propuesta de `04`). Cierra la jefa como hoy: «La nuestra es otra».

**Lo que un compañero puede pasarle:** «el proveedor decide si fía y mira la plata de corto plazo». Es
el concepto, que es lo que hay que aprender. No hay clave de letras que copiar.

**Riesgo que queda:** alguien que falla muchas veces puede ir juntando «a este no le va tal sello».
Llega tarde (la escalera ya lo mandó al Cuadro 1 en la 3.ª), el registro muestra cuántas personas hizo
falta y 1.1 pesa poco. Se acepta.

### B1.4 (b) 1.2 · Que nada delate el dictamen

Hoy hay **tres delatores**, no dos:

1. **La frase del cliente** (`diceClienteT12`): «Bolivia ya adoptó las NIIF» sólo sale cuando hay que
   devolver.
2. **La nota del contador** (`textoNota`): la nota mal hecha dice «Como Bolivia ya adoptó las NIIF…» y la
   bien hecha con NIIF dice «…porque ninguna NC boliviana lo regula». Quien lee sólo la justificación
   acierta sin buscar. Este no estaba en `04`.
3. **El flujo de efectivo**: aparece sólo en carpetas bien hechas (40 % de ellas), y el texto de acierto
   de la NC le dice «así que la NIIF entra como supletoria» antes de dictaminar.

**Cómo se juega sin delatores:**

- **La nota del contador tiene siempre la misma forma:** «Registrado según la [norma]. [Justificación].»
  La justificación se sortea **aparte** de si está bien o mal. En particular, la nota mal hecha con NIIF
  dice lo mismo que la bien hecha: **«porque ninguna NC boliviana lo regula»**. Eso es justo el error del
  subtema (el contador **supuso el vacío**), y sólo lo desmiente quien buscó la NC en el manual. La
  otra justificación («como Bolivia ya adoptó las NIIF») puede salir en cualquier nota que use NIIF,
  también en la del flujo, que está bien hecha.
- **La frase del cliente** se sortea de un grupo propio, **independiente de la nota**: las frases de «Qué
  NO se puede afirmar» de 1.2 (pág. 10) y frases neutras («Aquí tienes el balance que preparó mi
  contador»). Cada frase sale igual de seguido en carpetas para aceptar y para devolver. Las escribe el
  narrativo.
- **El texto de acierto de la NC queda neutro:** «Bien: la rige la NC 10» o «Bien: ninguna NC la
  regula». Sin «así que la NIIF entra». Comparar con la nota es trabajo del alumno.
- **El flujo de efectivo, como excepción y con dos caras.** Recomendado:
  - sale en **una de cada cuatro jornadas** más o menos, no en casi la mitad;
  - cuando sale, la mitad de las veces está bien hecho (NIC 7 supletoria) y la otra mitad **mal**: el
    contador cita una NC que no lo regula («Registrado según la NC 11»). Es la misma lógica de «NC
    equivocada» que ya existe; el alumno escribe 0 (ninguna NC lo rige) y devuelve, porque la nota no
    coincide.
  - **Alternativa más barata:** sólo bajar la frecuencia y dejarlo siempre bien hecho. Costo: quien lo ve
    dos veces aprende «flujo, aceptar» como patrón, aunque sea cierto.
  - Ojo para el crítico: la cara «mal» presenta como error citar una NC para el flujo. Es coherente con
    lo verificado en R3.2-bis (el flujo es el único vacío, NIC 7 supletoria, pág. 7), pero es una
    adaptación del juego y se marca así.

**Qué toca el alumno, igual que hoy:** escribe el número de NC (teclado numérico, campo fijo arriba del
teclado) y después dos botones, ACEPTAR o DEVOLVER (tres si entra la calidad, B1.6). El dictamen **no
se corrige ahí**: el color se ve al cierre.

**Prueba que lo encierra (para la etapa 6):** en las 999 versiones, para cada frase del cliente y cada
justificación de la nota, la proporción de «devolver» queda entre 35 % y 65 %; el flujo aparece en
ambos dictámenes; y «devolver si la nota dice NIIF» o «aceptar si el cliente no dice nada raro» no
aciertan una jornada completa en más del 30 % de las versiones.

### B1.5 (c) 1.3 · Índice de compra distinto de 100

**Qué ve:** la misma carpeta de hoy, con el índice de compra sorteado. En la franja de cifras que queda
fija arriba del campo (con el teclado abierto): **Sierra en libros · Índice al comprarla · Índice hoy**,
por ejemplo 80.000 · 120 · 150.

**Cómo varía:** desde la versión 1, el índice de compra **nunca es 100** en la jornada (se sortea, por
ejemplo, entre 105 y 130) y el de hoy sale de multiplicarlo por un factor limpio (1,10 a 1,40), con dos
condiciones: el índice de hoy es entero y el valor de hoy cae en múltiplos de Bs 100. La versión 0
(Don Julio, 100 y 115) queda igual, como ejemplo del dossier.

**Recomendado:** que I₀ = 100 no aparezca en la jornada. Si apareciera a veces, el atajo «dividir entre
100» acertaría justo ahí y el registro guardaría un acierto que no dice nada.

**Los errores del valor de hoy, con I₀ distinto de 100** (se corrigen en la carpeta, con la escalera):

| Error | Lo que escribe (ej. 80.000, 120 → 150) | Pista (tuteo) |
|---|---|---|
| Restó los índices y lo tomó como porcentaje | 80.000 × 1,30 = 104.000 | «Los índices no son porcentajes: de 120 a 150 son 30 puntos, pero no es un 30 %. Divide el de hoy entre el de compra.» |
| Ignoró el de compra (el hábito del 100) | 80.000 × 1,50 = 120.000 | «Dividiste el índice de hoy entre 100. Aquí la sierra se compró con el índice en 120: divide entre ese.» |
| Al revés | 80.000 × 120 / 150 = 64.000 | la de hoy («el valor tiene que subir») |
| Los de hoy: en libros, del cliente, por el índice sin dividir, sólo el ajuste, ya el 60 % | | las de hoy |

Correcto: 80.000 × 150 / 120 = **100.000**. Escalón «a leer»: pág. 14.

**Qué revisa la versión (para la etapa 6):** los montos de todos los errores del valor de hoy son
distintos entre sí y del correcto, con al menos Bs 1.000 de diferencia (que no se confundan a la vista
en un celular). Hoy el diagnóstico «al revés» calcula libros entre índice de hoy, que sólo es cierto
con I₀ = 100: hay que corregirlo.

**Opcional, barato (primero se ve, después se calcula):** en la ficha, las dos cifras de índice como dos
barras (120 y 150) con el tramo que subió marcado «30 puntos sobre 120». Se construye sólo si sobra;
no cambia la mecánica.

### B1.6 (d) Calidad de la información · **SI RONALD APRUEBA**

Se juega **sólo en las dos carpetas de 1.2**. En 1.3 no: ahí la característica que falla es siempre la
relevancia (el valor sin reexpresar), así que sería la misma respuesta para todos y se copiaría. La
relevancia queda en el texto de acierto del valor de hoy y en la defensa (criterio 3 de la rúbrica).

**Qué ve:** la carpeta de 1.2 trae, además de la operación y la nota, **un papel más** en una pestaña
(la portada del balance, una carta, el anexo de notas). En una de cada tres carpetas más o menos no hay
nada raro; en las otras, **un defecto sorteado** de la tabla de `04` A1.1, escrito como hecho en el papel,
no señalado: «Balance al 31-12-2025 · entregado el 20-07-2026» (oportunidad, mejora); una carta del
banco de enfrente que reclama una deuda que no está en el pasivo (representación fiel, fundamental); la
maquinaria «a valor de compra de 2016, sin ajustar» (relevancia, fundamental); y así.

**Qué toca (después de escribir la NC bien):**
1. **La hoja de observación** sube desde abajo: 7 sellos (las 6 características y «nada que observar»).
   Toca uno. Las etiquetas dicen el nombre de la característica **sin** decir si es fundamental o de
   mejora: esa jerarquía la tiene que traer el alumno.
2. **El dictamen, con tres botones:** ACEPTAR · ACEPTAR CON OBSERVACIÓN · DEVOLVER.

**La jerarquía se vuelve decisión:**

| Norma | Defecto | Dictamen correcto |
|---|---|---|
| mal | cualquiera | devolver |
| bien | fundamental | devolver (aunque la norma esté bien) |
| bien | de mejora | aceptar con observación |
| bien | ninguno | aceptar |

**Qué pasa si se equivoca:** nada se corrige ahí ni se rehace (siete sellos con respuesta inmediata
sería tanteo). Al cierre, en la pared: aceptar con una fundamental fallando → **rojo** («el auditor lo
observó: el balance no decía la verdad»); devolver o poner observación a uno sano → **gris** («el cliente
se ofendió y se fue»); aceptar con observación cuando fallaba una fundamental → **rojo** («llegó a
tiempo, pero ¿decía la verdad?», el Qué NO de 1.3). El sello de observación equivocado, aunque el dictamen
salga bien, manda ese tipo al repaso con su pista (lo que se evalúa es reconocer la característica).
Escalera en el repaso: pista según el sello → qué revisar («primero: ¿es relevante y dice la verdad?
Recién después, lo demás») → a leer págs. 12, 13 y 15.

**Choques a cuidar al sortear:** el defecto de comparabilidad («cambió el método de depreciación sin
explicarlo») no sale si la operación marcada es el cambio contable (NC 13), y el de verificabilidad no
puede tratar de la nota de la operación marcada (se mezclaría con 1.2): va sobre otra cifra del balance.
El narrativo escribe los papeles; los defectos salen de la tabla de `04`, y lo inventado se marca.

**Perezosos:** «nada que observar siempre» falla en dos de cada tres; «devolver siempre» pierde los
sanos y los de mejora; «con observación siempre» pierde los sanos, los mal normados y los fundamentales.

**Costo en el ritmo:** 2 toques más por carpeta de 1.2 (4 por jornada), sin teclado.

### B1.7 Ritmo de la jornada

Contado en pantallas y gestos, no en tiempo:

| Parte | Hoy | Propuesto | Con calidad |
|---|---|---|---|
| Llegada | 3 «seguir» + 1 número | igual | igual |
| 1.1 | 3 toques como mínimo | 6 toques como mínimo, sin teclado | igual |
| 1.2 (×2) | 1 número + 1 toque | igual | + 2 toques |
| 1.3 | 2 números + 1 línea | igual | igual |
| Cierre | 1 toque | igual | igual |

La jornada crece en 3 toques (7 con calidad) y **ninguna escritura**. No se agrega ninguna carpeta. Lo que
más alarga hoy es la línea libre al cliente de 1.3 (teclado de texto en el celular); se mantiene porque
es la evidencia para la defensa, pero conviene que el narrativo la acorte a una línea guiada («La misma
sierra, en bolivianos de hoy, vale…»). Queda a su criterio.

### B1.8 Nadie gana sin entender: los perezosos contra el Tema 1

| Perezoso | 1.1 | 1.2 | 1.3 |
|---|---|---|---|
| Descarte | Los sellos y hojas no se gastan: no sirve | Dos botones, pero una de cada carpeta de cada lado: 50 % por carpeta, 25 % la jornada, y el repaso trae otros | No hay opciones: se escribe |
| Tanteo | La persona se va; llega otra | El dictamen no se ve hasta el cierre y no se rehace | Valor: pistas, no colores. Monto: color al cierre, repaso con otros números |
| Leer el delator | Nadie dice su rol | Frase y nota independientes del dictamen | I₀ distinto de 100: el atajo del 100 falla |
| Copiar | Otras personas, frases, orden | Otra operación, nota, orden | Otros números e índices |
| Siempre lo mismo | Un solo sello: acierta 1 de 6 | Siempre aceptar o siempre devolver: pierde uno por jornada | Siempre lo que pide, cero o el mínimo: pierde (ya probado) |

### B1.9 Economía

En el Tema 1 no se agrega ningún recurso. La meta de colocación sigue fuera (con un solo crédito
delataría el monto: R3.2-bis, decisión 3). Lo que se mueve es la **pared** (historia, se ve al cierre) y
la **cola** (tensión sin reloj). Un recurso más (caja, reputación) no cambiaría ninguna decisión de este
tema, así que sobraría.

### B1.10 En el celular (375×812) y en la app

- **Sin teclado en 1.1 y en la calidad:** todo es tocar.
- **Con teclado (NC, valor de hoy, monto):** la franja de cifras que usa (operación marcada en 1.2;
  libros, I₀ e I₁ en 1.3) queda **fija arriba del campo**. Hoy la ficha va arriba del diálogo y con el
  teclado abierto se va de la pantalla: hay que medirlo.
- **Botón atrás:** cierra primero la hoja de observación o el manual, después la carpeta, y recién
  después pregunta si sales (sigue pendiente de la construcción del 27-09).
- **Grillas de 2 columnas** (sellos) y listas verticales (hojas del balance): nada de 6 botones en una fila.
- **Sin red:** cada gesto es un evento que se guarda en el teléfono como hoy; no cambia.

### B1.11 Qué hay que construir (etapa 6) y qué se reutiliza

**Se reutiliza sin tocar:** `escalera.ts`, `partida.ts`, `nube.ts`, `version-alumno.ts`; de
`ventanilla.ts`, `montoCorrecto`, `colorDelCierre`, `redondearAbajo100`, `REGLAS` y todo lo del Tema 2;
`reexpresar`; el cierre con la pared, el `Mostrador`, el manual con las 14 NC, `versionDeRepaso`,
`carpetasDeRonda` y la lógica de rondas de `avanceDe`; los textos del cierre y del repaso.

**Hay que construir o cambiar (todo suma):**

1. **Lo guardado se sigue leyendo (lo primero).** Cambiar cómo se sortean las carpetas cambia lo que vio
   quien ya jugó: `avanceDe` recalcularía sus colores con carpetas nuevas. Recomendado: la partida guarda
   **con qué generación de carpetas se jugó**; sin ese dato es la de hoy, que se conserva tal cual al
   lado de la nueva. Hoy es borrador y casi nadie jugó, pero la regla 4 de «Estructura» vale igual.
2. **1.1 (`tema1.ts`):** los 6 usuarios del Cuadro 1 con su decisión y su «qué mira primero»; el
   sorteo por versión (quiénes, orden, frase); un evento nuevo para «sello y hoja entregados a tal
   persona», con el evento `usuario` de hoy todavía leído; la cola de personas que sigue a una falla; el
   diagnóstico del error para la pista. En `guion-tema1.ts`, las frases por usuario (narrativo) y las
   pistas nuevas. En la pantalla, el portasellos y la carpeta de hojas en lugar de las tres opciones.
3. **1.2:** `textoNota` con forma única y justificación sorteada aparte; la frase del cliente sorteada
   de su propio grupo; `aciertoNC` neutro; la frecuencia del flujo y su cara «mal»; la prueba de
   independencia de B1.4.
4. **1.3 (`ventanilla.ts` y `tema1.ts`):** sortear el índice de compra; las reglas nuevas de
   `versionValida`; los diagnósticos «restó los índices» e «ignoró el de compra»; corregir «al revés»;
   la franja de cifras fija con el teclado abierto.
5. **Calidad, sólo si Ronald aprueba:** el defecto en la carpeta de 1.2, el evento de la observación, el
   tercer dictamen y sus colores, su diagnóstico para el repaso, y la hoja inferior.
6. **Pruebas:** los perezosos de B1.8 (con las nuevas variantes de 1.1 y 1.2), la independencia de los
   delatores, los errores de 1.3 distintos en las 999 versiones, y que una partida vieja se siga leyendo
   con el resultado que tenía.

### B1.12 Avisos para otras partes

- **`disenador-narrativo` (etapa 4):** frases por usuario de 1.1 (2 o 3 cada uno, sin decir su rol, más
  sus reacciones cuando se va conforme y cuando se va molesto sin delatar la respuesta); el grupo de
  frases de clientes de 1.2 independientes del dictamen; las justificaciones de la nota; si Ronald
  aprueba, los papeles con defecto; y ver si la línea al cliente de 1.3 se guía.
- **`disenador-de-aprendizaje`:** el tercer delator (la nota del contador) no estaba en A1.3: conviene
  sumarlo. Nada de lo propuesto cambia los pesos de A1.4.
- **`critico-de-jugabilidad` (etapa 5):** revisar la cara «mal» del flujo (adaptación del juego) y el
  riesgo de descarte a largo plazo en 1.1 (B1.3).
