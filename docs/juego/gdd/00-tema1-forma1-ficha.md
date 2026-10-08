# Tema 1 de Psicoestadística Descriptiva (Psicología): Forma 1 «La mesa de verificación», ficha corregida

> **Estado:** ELEGIDA por Ronald el 08-10-2026, con los arreglos del crítico (v12). Lista para que otros agentes la detallen. Autor: adaptador. Fecha: 08-10-2026.
> **Parte de:** las 8 ideas APROBADAS (`ideas-psicoestadistica-descriptiva-tema1.md`, no se reabren) y de `00-tema1-formas-de-juego.md` (Forma 1 original) corregida con la revisión v12 de `06-revisiones.md`.
> **Aquí no hay** referencias de otros juegos, arte, sonido ni motores. Eso viene después, cuando Ronald diga cómo siente esta forma.
> **Sin nota** en este tema (decidido; no se pregunta). Todo texto que ve el alumno va en tuteo y nunca manda a leer el dossier ni cita sus páginas. El juego no enseña software.
> Las cifras de esta ficha son **ejemplos de una versión**; cada alumno recibe otras (ver «Qué cambia de un alumno a otro») y ninguna reproduce las del dossier.

**Palabras de diseño de juegos, una línea cada una:**
- **Presupuesto de acciones:** tope de cosas que puedes hacer antes de decidir; no puedes hacerlo todo.
- **Medidor:** una barra visible que sube o baja según lo que decides (aquí hay dos).
- **Señuelo:** algo que parece útil y no destapa nada; sirve para que elegir cueste.
- **Estrategia dominante:** una forma de jugar que gana siempre sin pensar (lo que hay que impedir).
- **Versión por alumno:** cada alumno juega los mismos casos con otras cifras, otro orden y otra respuesta correcta.

---

## 1. Qué cambió respecto a la Forma 1 original

| Arreglo del crítico | Cómo queda |
|---|---|
| Menú fijo de 5 preguntas (era la lección) | **Carpeta de documentos** por caso: 6 papeles con nombres de cosas del mundo (un correo, un libro de registro, un acta), ninguno dice qué concepto es. Hay señuelos, y **cuál papel destapa el problema cambia de una versión a otra** (secc. 3) |
| Sin apuesta acumulada (el apurado publica y listo) | **Dos medidores que se empujan**: Credibilidad y Lectores (secc. 2). Publicar siempre y retener siempre se hunden por lados opuestos |
| Presupuesto sin número | **3 acciones por caso** (secc. 2). Un papel abierto gasta 1 |
| Casos 2, 4 y 5 con el mismo molde | Cada uno con una situación y un verbo propios: **un número que cae de golpe** (2), **elegir entre dos encuestas ya hechas** (4), **aconsejar y luego verificar tu propio consejo** (5) |
| El taller no estaba dentro de la redacción | El alumno **aconseja a quién llamar** al taller y un mes después **verifica su propia recomendación** |
| Arranque sin forma | **2 o 3 preguntas propias** con personaje de reserva por defecto; su número no cambia ningún caso |
| Revelación «rápida» con ocho nombres de golpe | **Ocho fichas boca abajo** que el alumno da vuelta; el nombre técnico sale solo para lo que hizo o no hizo |
| Ritmo de «publicar o retener» siete veces | Cada caso pide algo distinto al jugador (secc. 4); publicar, publicar con frase armada o retener no son botones iguales |

Se mantienen: el caso donde la afirmación **está bien**, la salida **«aún no se sabe»**, y que ningún papel diga «esto es un sesgo» hasta la revelación.

---

## 2. El mundo, los medidores y el presupuesto

**Mundo.** *La Pizarra*, suplemento de bienestar escolar de un diario regional. Tú eres el verificador nuevo de la mesa. Las afirmaciones llegan con tono de certeza (de colegios, agencias, otras redacciones) y la editora quiere saber si se publican. Los casos son de colegio y bienestar, el terreno de un psicólogo: la redacción es solo el lugar donde llega la afirmación.

**Presupuesto: 3 acciones por caso** (pantalla: tres fichas de tiempo antes del cierre de edición). Gasta 1 acción: abrir un papel de la carpeta; en el caso 3, sacar una tanda de la máquina; en el 8, abrir un papel. **No gasta**: leer la afirmación, armar la frase, publicar, retener. Si un medidor cae a 25 o menos, el caso siguiente tiene **2 acciones** (te quitan la firma o recortan la edición). Todo caso trae 6 papeles, así que **nunca puedes abrir todo**.
*Por qué 3:* con 6 papeles y un solo papel clave, abrir 3 al azar da con él la mitad de las veces (0,50, calculado en el `.py`); con 2 (castigado) bajaría a 0,33. Menos de 3 vuelve el caso una moneda, más de 3 deja abrir casi todo.

**Dos medidores** (empiezan en 50). Se empujan en sentido contrario: lo que atrae lectores cuesta credibilidad si estaba mal, y la prudencia da credibilidad pero cede lectores a la competencia.

| Situación del caso | Publicar tal cual | Publicar con tu frase armada | Retener |
|---|---|---|---|
| La afirmación **está bien** | Credibilidad +10, Lectores +10 | C 0, L +4 (tímido: la competencia llega antes) | C 0, L −15 |
| La afirmación **tiene un problema** | C −20, L +10 (réplica) | **Con el papel clave abierto:** C +8, L +4. **Sin abrirlo:** C −8, L +4 (tu frase no toca el hueco) | C +6, L −8 |
| **Aún no se sabe** | C −20, L +10 | Con el papel clave: C +8, L +4. Sin él: C −8, L +4 | C 0, L −10 |

Los casos 4, 5 y 8 usan la misma lógica con sus propias opciones (secc. 4). **Cierre de la edición:** si terminas con Credibilidad y Lectores en 60 o más, la editora te deja la mesa fija. No es nota; es el fin de la partida.

**Por qué la frase no es «la prudente»:** la frase se **arma con piezas** que solo existen si abriste el papel que las trae (una cifra, una fecha, quién respondió). Las piezas genéricas («según fuentes del colegio», «datos preliminares») suenan prudentes y no tocan el hueco: eso es «sin papel clave». Y cuando la afirmación está bien, la frase prudente cede lectores. Dónde se escribe un número, el número cambia lo que pasa (secc. 4).

---

## 3. Los documentos: carpeta con señuelos

**Cómo se arma una carpeta.** Cada caso tiene un **fondo de 9 papeles**; cada versión recibe **6**, en orden barajado.
- **Papel clave:** el que destapa el problema (o confirma que no lo hay). Hay **3 papeles del fondo que pueden ser el clave** y cada versión usa solo uno; los otros dos, ese día, dicen cosas banales. **Memorizar «el correo de dirección destapa» no sirve**: la próxima vez ese correo es señuelo.
- **Papel de refuerzo:** da una cifra o una fecha para la frase.
- **Señuelos (4):** papeles verosímiles que no destapan nada (la lista de docentes, el calendario, un acta de otro tema).
- Los nombres de los papeles son cosas del mundo; ninguno nombra un concepto de la materia.

**Un papel clave nunca explica.** Muestra el hecho («desde marzo solo se anotan denuncias con firma de un adulto») y el alumno saca la conclusión. Eso es lo que impide que sea cuestionario: no hay pregunta con opciones, hay un papel que se abre o no se abre.

---

## 4. Los pasos, caso por caso

Orden: **1 primero y 2 segundo y 8 último** son fijos; los casos 3, 4, 5, 6 y 7 se barajan por alumno (ver secc. 6). Cada paso y cada caso dice la **idea** que vive (de las 8 aprobadas).

### Paso 1 · «El primer encargo» (idea 1: los datos están en todas partes)

**Qué vive.** La editora te pide una cifra cotidiana: «¿cuántas horas duermen los de 4.º del colegio?». Antes de buscarla, la pantalla te hace **2 o 3 preguntas propias** («¿cuántas horas dormiste anoche?», «¿cuánto usaste el celular antes de dormir?», «¿cómo te fue ayer, de 0 a 100?»). **Por defecto responde un personaje de reserva (Dani)** con respuestas ya escritas; hay un botón «poner las mías». Luego buscas la cifra en el archivo del colegio: 6 papeles (el cuaderno de la enfermería, el registro de tardanzas, la encuesta anual de la secretaría, las notas, una lista de talleres, un acta de padres). **Dos de los seis ya traen horas de sueño**; cuáles son varía por versión. Sin medidores. Se gastan las mismas 3 acciones para que el alumno conozca el presupuesto sin costo.
**El asombro.** Al abrir el papel correcto ves la fila de ejemplo con las mismas tres preguntas que acabas de contestar, y una fecha de hace un año: **esa pregunta ya se hizo y nadie la leyó**.
**Regla de tu número:** lo que escribiste solo aparece en esa fila de ejemplo y en la revelación. **No entra en ninguna cifra de ningún caso** (el crítico probó que un número propio mueve la media del curso del orden de 1 punto de 100; por eso no se le pide al juego que dependa de él). No se envía a la nube: queda en su partida; solo se registra si usó datos propios o de reserva.
**Si lo haces mal:** no hay mal. Si no abres ninguno de los dos papeles con sueño, la editora dice «¿seguro que ahí no había nada?» una vez y te deja abrir otro sin costo.

### Caso 2 · «El colegio sin denuncias» (idea 2: alguien decidió qué contar) · siempre B

**Situación propia: un número que cae de golpe.** Llega una gráfica pequeña: denuncias de acoso por mes, que pasan de varias a **cero** este trimestre. Titular de la agencia: «Cero denuncias: el colegio es seguro». Es **siempre un caso con problema** (es el primero y debe pillarte desprevenido).
**Tu acción propia:** los papeles que abres se **clavan en un corcho por fecha**, así que ves si algo cambió justo antes del cero.
**Fondo de 9 papeles:** correo de la dirección a los tutores · libro de registro de la secretaría · reglamento de convivencia · informe del orientador · buzón anónimo del patio · acta de la reunión de padres · cuaderno de la enfermería · lista de tutores · calendario del trimestre.
**Clave posible (uno por versión):** (a) el correo: «desde marzo solo se registran denuncias firmadas por un adulto»; (b) el libro: la casilla «denuncia formal» ahora exige firma y las anotaciones libres se dejaron de copiar; (c) el informe del orientador: derivaciones por conflicto **subieron** el mismo trimestre.
**Refuerzo:** el buzón anónimo con más mensajes que antes. **Señuelos:** lista de tutores, calendario, acta de otro tema, cuaderno de la enfermería sin dato relevante.
**Frase para M:** piezas «las denuncias *registradas* bajaron a cero» + «desde marzo solo se registran con firma de un adulto» (solo si abriste el clave) + «no sabemos cuántos hechos hubo».
**Consecuencias:** publicar tal cual, llama una madre: a su hijo lo empujaron y «no se podía denunciar». Retener, la competencia publica «colegio seguro» y una semana después rectifica; se nota que esperaste. Frase armada con clave: la editora la pone en portada.
**Qué destapa:** no cambió lo que pasa, cambió la forma de contar. Nombre solo en la revelación.

### Caso 3 · «La cifra de los de 4.º» (idea 3: con pocos se habla de muchos)

**Situación propia: una máquina de tandas.** La afirmación dice «los de 4.º duermen 5,9 horas». Tienes el registro de 480 estudiantes y una **máquina que saca una tanda de 10 al azar** (1 acción cada una). Ves la media de cada tanda y que **cambian entre sí** sin que nadie mienta.
**Tu número (escribes dos):** el resumen se escribe como «entre __ y __ horas». El número decide: si el rango **cubre** la media real y mide **1,2 horas o menos**, es una buena frase (C +8, L +4); si **no cubre**, la réplica llega con otra tanda (C −10, L +4); si mide **más de 2,0 horas** («entre 3 y 9»), nadie se sorprende y nadie lo lee (C 0, L −2). Un solo número («5,9») **no es un rango**: no se acepta como frase, solo publicable «tal cual» con sus consecuencias.
**Cálculo de apoyo (en el `.py`):** con 3 tandas de 10, el rango mínimo a máximo cubre la media real en 75 %; con 2 tandas, 50 %; con 1 tanda no existe rango. Con 0,25 horas de holgura, 3 tandas cubren 97,5 % y 2 tandas 88,7 %. Por eso gastar acciones en tandas sirve, pero compite con abrir el papel clave.
**Fondo de 9 papeles:** ficha de cómo se obtuvo la afirmación (clave posible 1) · hoja del turno tarde (clave posible 2) · acta de la semana de exámenes (clave posible 3) · registro de asistencia · lista de talleres · encuesta de la app · cuaderno de la enfermería · informe del orientador · calendario.
**Tipos por versión:** *con problema* (la cifra salió de una tanda de 10 del turno tarde); *bien* (la ficha dice 150 al azar de los 480: «alrededor de 6,6» es publicable); *aún no se sabe* (9 respuestas en semana de exámenes).
**Qué destapa:** una cifra de pocos no es «la cifra»; en el caso bien, una cifra de muchos y bien elegida sí se puede decir con ± .

### Caso 4 · «Dos encuestas, un titular» (idea 4: importa quién responde) 

**Situación propia: elegir entre dos encuestas ya hechas.** No hay afirmación que verificar: hay **dos estudios** sobre el estrés de 4.º y debes publicar uno o ninguno. **A:** miles de respuestas, resultado alto. **B:** cientos, resultado más bajo. Resultados distintos entre sí.
**Tu acción propia:** abrir la **lista de quienes respondieron** de A y de B (dos papeles clave de los 6; basta con uno para saber de ese estudio). Opciones: publicar A, publicar B, ninguna.
**En esta versión los dos lados pueden ser el bueno:** en la mitad de las versiones **A es la buena** (la plataforma obligatoria del colegio, casi toda la matrícula) y **B la mala** (se aplicó solo en el club de apoyo). No hay un lado fijo («la chica siempre»).
**Consecuencia por opción:** elegir la buena de A: C +10, L +10; la buena de B: C +8, L +4; la mala de A: C −20, L +10; la mala de B: C −20, L +4; ninguna: C 0, L −10.
**Fondo de 9 papeles:** lista de quienes respondieron A · lista de quienes respondieron B · cómo se invitó a A · cómo se invitó a B · ficha técnica común · tabla de resultados · matrícula del colegio · mensajes de padres · acta del consejo.
**Qué destapa:** el tamaño no salva a quien deja fuera justo a quienes importaban. Nombre solo en la revelación.

### Caso 5 · «El taller de pausas» (idea 5: lo que mejora solo) · dos turnos, **la vergüenza de la regresión**

**Situación propia: aconsejas y luego verificas lo tuyo.** Es el único caso con dos turnos.
**Turno 1, aconsejas.** La dirección tiene **13 cupos** en un taller. Ves la hoja de bienestar de 60 estudiantes (puntajes de 0 a 100). Aconsejas a quién llamar: **(a)** los 13 de peor puntaje, **(b)** los 13 que se anotaron primero, **(c)** un sorteo entre los 26 de peor puntaje, 13 al taller y 13 que quedan de comparación. La opción (c) **cuesta 6 Lectores** (la dirección protesta: «¿por qué dejas a 13 sin ayuda?»). La editora, al principio, elogia la (a): «los que más lo necesitan».
**Turno 2, un mes después, verificas tu propio consejo.** La hoja nueva trae segunda medición. En la (a), **los 13 llamados subieron mucho**; ahí empieza la satisfacción. Tienes 3 acciones para abrir: segunda medición de los llamados · segunda medición de los demás (o del grupo de comparación en (c)) · el **colegio vecino sin taller** (solo si hiciste (a) o (b)) · asistencia al taller · calendario de exámenes · informe del tallerista.
**Tu número:** escribes «cuántos puntos subió por el taller». Si usas la subida bruta de los llamados, la réplica sale del vecino (en (a): «sus 13 peores subieron casi lo mismo sin taller»). Si en (a) restas lo que subieron «los demás» (que bajaron), el número sale **aún inflado** y también lo desmiente el vecino. Solo con el grupo del sorteo (c) el número cuenta. En la versión sin efecto real el número correcto es cercano a 0; en la versión con efecto pequeño, un número pequeño pero no 0.
**Por qué (c) no gana solo:** cuesta Lectores y, sin abrir el papel del grupo de comparación en el turno 2, el alumno publica un número sin comparar y recibe la réplica igual. Un alumno que ya sabe elige (c) y lo usa bien: es correcto que quien sabe se salte la lección.
**Fondo de 9 papeles (turno 2):** segunda medición de los llamados · de los demás · del grupo de comparación · colegio vecino · lista de asistencia al taller · calendario de exámenes · informe del tallerista · quejas de padres · acta de la dirección. Clave: según la opción elegida (vecino o grupo de comparación).
**Qué destapa:** quienes están peor suelen verse mejor la vez siguiente aunque no hagas nada; hace falta algo con qué comparar. **Aquí vive la vergüenza:** el alumno se felicita por su propio consejo y luego lo ve caer. Nombre solo en la revelación.

### Caso 6 · «El titular de los 480» (idea 6: lo que ves no es lo que concluyes)

**Situación propia: armar un titular con piezas y escribir una cuenta.** La editora quiere titular: «Uno de cada cuatro estudiantes del colegio duerme menos de 6 horas». La lista que trae la agencia tiene **60 medidos de los 480**.
**Tu número:** cuentas en la lista de 60 cuántos duermen menos de 6 horas y lo **escribes** (el conteo cambia de versión a versión). Si tu número no coincide con la lista, la réplica llega de inmediato («ese número no sale de tu hoja», C −10). Con el número bien, armas el titular con piezas: «De los 60 medidos, __ duermen menos de 6 horas» · «Uno de cada cuatro estudiantes del colegio…» · «…en 4.º B» · «podrían ser…».
**Fondo de 9 papeles:** cómo se eligieron los 60 (clave 1) · composición del colegio por curso (clave 2) · hoja de los 60 con horas · acta de la semana de exámenes (clave 3) · lista de inscritos · informe del orientador · encuesta de la app · calendario · lista de talleres.
**Tipos por versión:** *con problema* (los 60 son de un solo curso y el titular habla de los 480); *bien* (los 60 salieron por sorteo de los 480 y el papel lo dice: «aproximadamente uno de cada cuatro» es una buena apuesta); *aún no se sabe* (12 respuestas y semana de exámenes).
**Qué destapa:** una frase sobre lo medido y una frase sobre los que no viste son distintas apuestas. Nombre solo en la revelación.

### Caso 7 · «El gráfico de la agencia» (idea 7: un gráfico miente con datos verdaderos) · tipos: con problema o bien

**Situación propia: primero eres el lector.** Ves **antes de entrar a la mesa** el gráfico de dos talleres A y B (dos columnas) y decides en pocos segundos cuál recortar del presupuesto. Esa decisión queda **registrada** y no se juzga. Después, en la mesa, tienes el gráfico y la hoja de la agencia.
**Tu número:** escribes **cuántos puntos de diferencia** hay entre A y B según los datos de la hoja (no según cómo se ve). Con el número bien, publicas el gráfico tal cual, lo rediseñas con la base en cero, o retienes. Si escribes la diferencia que se ve y no la que dice la hoja, el lector escribe: «el mismo gráfico me hizo decidir otra cosa».
**Fondo de 9 papeles:** hoja de datos con la escala (clave 1) · correo de la agencia sobre cómo lo dibujaron (clave 2) · captura del gráfico original (clave 3) · lista de talleres · encuesta de la app · acta de padres · informe del orientador · calendario · lista de tutores.
**Tipos:** *con problema* (el eje empieza arriba de cero y una diferencia chica parece enorme); *bien* (el eje empieza en cero o la diferencia es grande de verdad). En *bien*, el mejor movimiento es publicar. (El caso 7 no tiene «aún no se sabe».)
**Qué destapa:** los datos eran verdaderos y el gráfico igual engañaba. Nombre solo en la revelación.

### Caso 8 · «La dirección decide» (idea 8: una decisión con datos le gana a la de «a ojo»)

**Situación propia: la reunión de dirección.** El director debe decidir si **financia** el taller para el año próximo. Un colega de la redacción propone decidirlo «a ojo, se ve que funciona». Tú llevas lo que verificaste (papeles). Opciones: **recomendar financiar**, **recomendar no financiar** o **esperar un trimestre más y medir mejor**.
**Papeles (3 acciones; hay 2 papeles clave y necesitas ambos para estar seguro):** resultados con grupo sin taller · tamaño de los grupos y tiempo medido · informe del tallerista · costos · quejas de padres · acta.
**Tipos por versión:** *financiar* (hay grupo de comparación grande y una diferencia clara); *no financiar* (la diferencia con comparación es casi cero); *aún no se sabe* (la diferencia aparece, pero con 9 contra 9 estudiantes).
**Consecuencia:** se ven **dos años**: el tuyo y el del colega «a ojo». El colega **a veces acierta** (en una de cada tres versiones propone justo lo correcto) y a veces no; no sirve llevarle la contraria siempre.
**Efecto en medidores:** decisión correcta C +12, L +8; «esperar» cuando no hacía falta C 0, L −4; financiar cuando no (C −20, L +6); no financiar cuando sí o cuando no se sabía (C −15 o −10, L −8 o −6).
**Qué destapa:** la decisión mejora cuando se apoya en lo que preguntaste en los casos anteriores, y a veces la buena respuesta es «todavía no se puede saber». Nombre solo en la revelación.

---

## 5. La revelación: ocho fichas que el alumno da vuelta

Al cerrar el caso 8 aparece sobre la mesa una fila de **ocho fichas boca abajo**, una por idea, en el orden en que jugó. No hay explicación previa y no se repite la edición. El alumno **da vuelta la ficha que quiera**:
- La ficha muestra **el momento exacto de ese caso** (el papel que abrió o el que no abrió) y debajo tres cosas: *lo que hiciste* («abriste el correo de dirección y viste el cambio», «publicaste con la cifra de una sola tanda»), *el nombre* (**operacionalizar**, **población y muestra**, **error no muestral**, **regresión a la media**, **estadística descriptiva e inferencial**, **eje truncado**, **grupo de control** y, para la ficha 1, que lo cotidiano ya era dato) y *qué habría pasado*.
- **El nombre técnico solo se dice para lo que el alumno hizo o dejó de hacer.** En los casos «bien» la ficha dice que esta vez no había problema y que reconocerlo también cuenta.
- La ficha de la idea 8 trae su condición: los datos bien recogidos y bien leídos le ganan al ojo, y a veces la buena respuesta es «aún no se sabe».
- **Cierre, cuando se dieron vuelta las ocho:** el camino. Cada ficha se une con el tema que enseña esa cosa a fondo (gráficos y escalas en el Tema 2; el resto en los temas siguientes de la materia, a asignar por la maqueta) con la frase «esto apenas empieza; cada pregunta que hiciste tiene su técnica».
- Si el alumno no da vuelta una ficha, queda registrado.

---

## 6. Qué cambia de un alumno a otro

Todo lo que se juega está generado, pero lo que cambia **no es solo el número, también la respuesta correcta**:

| Qué cambia | Cómo cambia |
|---|---|
| **Tipo de cada caso** | Caso 2 y caso 5 siempre tienen problema. En los casos 3, 6 y 7, cada versión mezcla *con problema*, *bien* y *aún no se sabe* (el 7 no lleva «aún no»): como mínimo uno *bien*, uno con problema, y a lo más uno *aún no*. El caso 4 es A bueno o B bueno al 50 %. El caso 8 es financiar, no financiar o aún no (1/3 cada uno). El caso 5 tiene o no efecto real pequeño. |
| **Qué papel destapa** | Cada caso tiene 3 papeles que pueden ser el clave y cada versión usa uno. |
| **Qué 6 papeles de 9** y su orden | Se sortean por versión, con el clave siempre dentro. |
| **Cifras** | Medias de sueño, conteos de la lista de 60, puntajes de la hoja de bienestar, tamaños de grupos, puntos de diferencia del gráfico. Ninguna coincide con las del dossier. |
| **Orden de los casos 3, 4, 5, 6 y 7** | Se baraja. El 1, el 2 y el 8 son fijos. |
| **Las cuentas que escribe** | El conteo del caso 6, la diferencia del caso 7, el rango del caso 3 y la mejora atribuible del caso 5 salen de **datos generados por versión**; cada alumno escribe otro número. |
| **Pieza de mundo** | Nombre del colegio, de los talleres, de la agencia y de Dani (personaje de reserva) cambian. |

*Copiar al compañero:* dos alumnos con versiones distintas tienen otro tipo en cada caso, otros papeles claves y otras cuentas. Lo copiado no sirve aunque coincida el número de caso.

**Práctica abierta:** el alumno puede repetir el juego con otra versión, sin que cuente. Solo registra que repitió.

---

## 7. Qué queda registrado (sin nota)

1. Por caso: **qué papeles abrió** (identificador, y si era clave, refuerzo o señuelo) y **cuáles dejó**.
2. Qué **decidió** (publicar, frase armada, retener; A, B o ninguna; financiar, no, esperar) y el **número que escribió**, con si era correcto.
3. Los **dos medidores** tras cada caso y si algún umbral (25) le bajó el presupuesto.
4. En cuáles **se dejó engañar** (publicó con problema sin el clave) y si en el caso siguiente **abrió el tipo de papel que antes saltó** (cambio de opinión observable, sin preguntárselo).
5. Si **vio** la ficha de cada idea y si completó el camino de cierre.
6. Si usó **datos propios o de reserva** en el paso 1 (solo eso, no los valores).
7. Su decisión del caso 7 como lector y cómo cambió al ver el dato.
8. Si **repitió** el juego y qué cambió.

Cada línea sirve a Ronald para ver **qué idea descubrió por sí mismo y cuál solo vio al revelarse**.

---

## 8. Estrategias perezosas: por qué ninguna gana

Cálculo: `scratchpad/forma1_estrategias.py`, corrido con `python -I` el 08-10-2026 sobre 20 000 versiones por estrategia (la misma lógica de tipos de la secc. 6, tablas de la secc. 2, meta 60 y 60). La salida está pegada en la sección «Salida del script» al final.

| Estrategia | Pasa la meta | Cómo se hunde |
|---|---|---|
| **Publicar siempre** | 0,0 % | Lectores a tope, Credibilidad en 6: cada réplica cuesta 20 |
| **Retener siempre** | 0,0 % | Credibilidad 65 pero Lectores en 3: la competencia se queda con todos |
| **No abrir nada y siempre frase / siempre la chica / siempre esperar** | 0,0 % | Sin el papel clave la frase no toca el hueco (C −8) |
| **Abrir 3 papeles al azar y, si no halla nada, publicar** | 22,0 % | Da con el clave la mitad de las veces; el resto cae. Pasa un caso de cada cinco: es azar, no habilidad |
| **Abrir 3 al azar y, si no halla nada, retener** | 22,4 % | Igual: queda en la zona en que alguna vez da con el clave |
| **Copiar al compañero** | 0,5 % | Otro tipo, otro clave y otra cuenta |
| **Entender** (supuesto: acierta el papel clave 80 % de las veces) | 68,9 % | Gana, pero no siempre: se equivoca de papel y paga |

Sensibilidad de quien entiende: si acierta el papel clave **50 %** pasa 12,5 %; **65 %**, 32,9 %; **80 %**, 64,6 %; **95 %**, 94,8 %. La meta premia acertar el papel, no solo desconfiar.
*Lo que el cálculo asume y se debe probar con alumnos:* que quien entiende acierta el papel clave 80 % (la proporción de aciertos se medirá en la partida de prueba; si es mucho menor, los señuelos son demasiado parecidos; si es 100 %, son obvios).

**Pruebas hechas a mano (no en el `.py`), con lo que corrige cada una:**
- **El patrón que se aprende una vez.** Ni «el grande siempre es el malo» (50/50 en el caso 4), ni «el último caso es siempre no se sabe» (caso 8 uniforme entre tres), ni «un solo caso está bien» (una o dos afirmaciones buenas, a veces con un «aún no» en el caso 3 o 6). El caso 2 siempre es problema y el 5 también: son las únicas constantes y son las dos que no pueden ser distintas (primer golpe; vergüenza).
- **Número de peaje y frase obvia.** Los cuatro números que escribe (rango del 3, conteo del 6, diferencia del 7, mejora del 5) **cambian la consecuencia** (secc. 4). La frase no se elige entre dos botones: se arma con piezas que solo están si abriste el papel. El rango del caso 3 exige haber gastado acciones en tandas.
- **Más cálculos (en el `.py`):** abrir 3 de 6 papeles al azar da con el clave 0,50 (un clave), 0,80 (caso 4, dos claves de los que basta uno) y 0,20 (caso 8, dos de los que se necesitan ambos).
- **Dominancia del sorteo (c) en el caso 5:** pagar 6 Lectores y usarlo bien da 68,9 %, no 100 %; sin el papel del grupo de comparación en el turno 2 la frase igual se cae.

---

## 9. Costo, y qué se reutiliza, despega y es nuevo

**Costo: medio.** No hay simulación del tiempo; la dificultad es escribir **8 casos × 9 papeles con 3 posibles claves** y los generadores de cifras con pruebas. Cálculo grueso: 8 casos y 72 papeles base.
- **Se reutiliza del motor** (nombres de `PIEZAS-COMUNES.md`, a confirmar por el agente que detalle): partidas, cuentas, versiones por alumno con semilla, registro, página del docente. No se copian personajes ni casos de otro juego.
- **Hay que despegar** de otra materia antes de usar: nada, si el generador por versión del motor ya recibe la materia como dato.
- **Nuevo:** pantalla de carpeta con papeles que se abren y gastan acciones; dos medidores y su regla; el corcho por fecha (caso 2); la máquina de tandas (caso 3); el armador de frases por piezas; la hoja con revisión en dos turnos (caso 5); las ocho fichas de revelación. El armador de frases por piezas y la carpeta sirven después a otros temas (Tema 6) y se hacen como motor.

---

## 10. Dónde vive cada idea (para el equipo)

| Idea | Dónde vive |
|---|---|
| 1 Datos en todas partes | Paso 1; ficha 1 |
| 2 Alguien decidió qué contar | Caso 2 (siempre problema) |
| 3 Con pocos se habla de muchos | Caso 3, tandas y rango |
| 4 Importa quién responde | Caso 4, dos encuestas |
| 5 Lo que mejora solo | Caso 5, aconsejas y verificas lo tuyo |
| 6 Lo que ves no es lo que concluyes | Caso 6, titular y conteo |
| 7 Un gráfico miente con datos verdaderos | Caso 7, lector primero |
| 8 Una decisión con datos le gana a la de «a ojo» | Caso 8, dirección decide; también sostenida por los medidores |

---

## 11. Riesgos y qué sigue dudoso

- **Que quien entiende acierte el papel clave menos de lo supuesto (80 %).** Si es 65 %, solo pasa un tercio: señuelos demasiado parecidos o demasiados claves ocultos. Se mide en la primera prueba con alumnos.
- **Cantidad de escritura:** 72 papeles de fondo. Versión mínima: casos 2, 4, 5 y la revelación, con 3 papeles claves cada uno; después se suman los demás.
- **El caso 5 es el más delicado:** el generador de la hoja de bienestar debe producir la regresión **a partir de una regla** y no pegada. Se prueba con un `.test.ts` que simule el sorteo (c) y el vecino.
- **El paso 1 y la privacidad:** se propone que el valor propio no se guarde en la nube; lo confirma quien detalle el motor.
- **El umbral de 60 y las consecuencias** de los medidores (25, 60) son números de este diseño; se pueden ajustar tras probarlo sin cambiar las reglas.

---

## Lista de salida

Conteos hechos con `scratchpad/forma1_estrategias.py` (estrategias, probabilidades y tandas) y `scratchpad/revisar_ficha_forma1.py` (texto de esta ficha).

- ✔ (1) Documentos con señuelos en vez de menú: secc. 3 y casos 2 a 8 (fondo de 9, 6 por versión, 3 claves posibles, 1 usado). El memorizador no gana: el clave cambia por versión.
- ✔ (2) Dos medidores con regla clara (tabla secc. 2) y presupuesto definido: 3 acciones por caso, 2 si un medidor cae a 25 o menos; el `.py` da 0,0 % a publicar siempre y a retener siempre.
- ✔ (3) Casos 2, 4 y 5 con situación y verbo propios: número que cae (2), elegir entre dos encuestas (4), aconsejar y verificar lo tuyo (5); también corcho (2), máquina de tandas (3), lector primero (7).
- ✔ (4) El taller dentro de la redacción (caso 5, dos turnos).
- ✔ (5) Arranque de 2 o 3 preguntas con personaje de reserva y opción de datos propios; el número propio no entra en ninguna cifra de caso (paso 1).
- ✔ (6) Ocho fichas boca abajo con el nombre técnico solo para lo que hizo o dejó de hacer, y cierre con el camino (secc. 5).
- ✔ (7) Casos «bien» y «aún no se sabe» se mantienen (secc. 6, tipos por versión; caso 8 uniforme entre tres).
- ✔ Cada paso, caso y documento dice qué idea de las 8 vive: pasos y casos 1 a 8 con su idea, y secc. 10.
- ✔ Pasos de principio a fin, documentos y señuelos, qué cambia de un alumno a otro (secc. 6), qué queda registrado sin nota (secc. 7), estrategias perezosas con cálculo (secc. 8).
- ✔ No es cuestionario bonito: ninguna pregunta con opciones; el alumno abre, arma, escribe y ve consecuencia (secc. 2 y 4).
- ✔ Estrategias perezosas probadas con `.py` guardado (nunca heredoc ni `python -c`); la salida se cita abajo. La prueba se repitió tras sumar el costo de 6 Lectores del sorteo (c) y quitar el «aún no» del caso 7.
- ✔ Sin software, sin mandar a leer el dossier, sin nota, sin arte, referencias ni sonido (el script de texto cuenta 0 de cada uno).
- ✔ Tuteo, sin guiones largos y sin voseo (el script de texto cuenta 0 y 0).
- ✔ Las ocho ideas no se reabren; ningún otro archivo del repositorio editado.
- ✔ Lo que es suposición está marcado: acierto del 80 % del papel clave, umbrales y la nube del paso 1 (secc. 8 y 11).

### Salida del script
Corrido el 08-10-2026 con `python -I forma1_estrategias.py`:

```
Presupuesto 3 acciones por caso (2 si un medidor <= 25); carpeta de 6 documentos
Prob. de dar con el documento clave abriendo 3 al azar: 1 clave 0.50 | 2 claves (caso 4) 0.80 | 2 claves necesarias (caso 8) 0.20
Meta: C >= 60 y L >= 60 al cierre. 20000 versiones por estrategia.

P         publicar siempre                                         pasa   0.0 % | C media   6.4 | L media 100.0
R         retener siempre                                          pasa   0.0 % | C media  65.4 | L media   2.6
M0        no abrir nada y siempre con matiz / la chica / esperar   pasa   0.0 % | C media  19.1 | L media  74.0
azarP     abrir 3 al azar; si no halla nada, publica               pasa  22.0 % | C media  42.1 | L media  98.5
azarR     abrir 3 al azar; si no halla nada, retiene               pasa  22.4 % | C media  84.9 | L media  41.6
copia     copiar las decisiones de un compañero (otra version)     pasa   0.5 % | C media  15.7 | L media  86.3
pensado   entender (supuesto: acierta el documento clave 80 %)     pasa  68.9 % | C media  98.8 | L media  67.4

quien acierta el documento clave con prob 0.50 pasa  12.5 %
quien acierta el documento clave con prob 0.65 pasa  32.9 %
quien acierta el documento clave con prob 0.80 pasa  64.6 %
quien acierta el documento clave con prob 0.95 pasa  94.8 %

tandas vistas 1: el rango minimo-maximo cubre la media real   0.0 % | con 0,25 h de holgura  53.2 % | ancho medio 0.00 h
tandas vistas 2: el rango minimo-maximo cubre la media real  49.8 % | con 0,25 h de holgura  88.7 % | ancho medio 0.39 h
tandas vistas 3: el rango minimo-maximo cubre la media real  75.3 % | con 0,25 h de holgura  97.5 % | ancho medio 0.59 h
```
Texto de esta ficha, con `python -I revisar_ficha_forma1.py`: guiones largos 0 | voseo 0 | jamovi, EViews, Excel, SPSS, «según el dossier», «lee el dossier» 0 | encabezados de paso o caso 1 a 8 (8) | 8 de 8 con su idea. «Sonido» aparece 2 veces, solo en las frases que dicen que aquí no hay.

(Las filas azarP y azarR superan el 20 % solo porque abrir 3 de 6 da con el clave la mitad de las veces; es el costo del azar y se vigila en la prueba con alumnos. Los porcentajes de quien «acierta con prob. X» usan la tabla sin las estrategias de arriba, por eso 64,6 % y 68,9 % difieren apenas.)
