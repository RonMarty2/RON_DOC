# 00 · Adaptación del dossier: Proyectos II

**Estado: en conversación (Ronda 1).** Agente: `adaptador-de-dossier`. Nada de esto está decidido:
son ideas para conversar. Ronald elige; recién después corren la visión, el bucle, el aprendizaje, el
mundo y la progresión.

**Próxima pregunta para Ronald:** de los tres marcos de la Ronda 1 (A: levantas tu propia planta;
B: consultor con un cliente distinto por tema; C: analista que revisa carpetas de proyectos), ¿cuál
te dan ganas de jugar? Las otras tres preguntas están al final de la ronda.

---

## Ronda 1 · versión 1 · 26-09-2026

**Con qué se trabajó:** el dossier de la **Semana 1 de 6** de Proyectos II ("Estudio técnico I: de la
cadena de valor a la maquinaria"), que Ronald subió a la conversación. No se copió al repositorio
(el repositorio es público): aquí sólo se resumen sus temas, se citan sus secciones y se usan los
números que hacen falta para hablar del juego. También se leyeron `IDEA-JUEGO.md` (§9 y §10),
`LEEME.md` del GDD, `01-vision.md` v2 (como antecedente, no como decisión), `06-revisiones.md` y la
escena que ya existe (`src/lib/juego/planta.ts` y `guion-planta.ts`).

**Aviso importante:** sólo hay una semana. Los marcos están pensados para **toda la materia** (las
seis semanas que el dossier anuncia en su mapa de ruta), pero lo que digo de las semanas 2 a 6 sale
sólo de ese mapa y es **supuesto**. El marco se afina cuando lleguen más semanas.

### Palabras de oficio de esta ronda

Cada una se explica una vez; el resto del documento las usa igual.

| Término | Qué quiere decir |
|---|---|
| **Propuesta** o *pitch* | Una idea de juego contada en una página para decidir si vale la pena hacerla. |
| **Marco** | Lo que da unidad a todo el juego: el mundo, quién eres, qué historia avanza, qué se guarda para la nota. No cambia de tema a tema. |
| **Modalidad** | La forma de jugar un tema concreto (armar, negociar, revisar papeles, administrar un mes…). Cambia de tema a tema. |
| **Género** | La familia de juegos a la que pertenece un marco; define qué haces la mayor parte del tiempo. |
| **Hub** (lugar central) | La pantalla a la que vuelves entre una modalidad y otra: la oficina, el lote, el escritorio. Es lo que hace que modalidades distintas se sientan el mismo juego. |
| **Bucle central** (*core loop*) | Lo que el jugador repite una y otra vez. |
| **Progresión** | Lo que cambia y se acumula a medida que avanzas (la planta que crece, los clientes que llegan). |
| **Punto de control** (*checkpoint*) | Un momento donde el juego guarda y, si hace falta, corrige el rumbo para que el error de ayer no arruine lo de mañana. |
| **Minijuego** | Una actividad corta con reglas propias dentro del juego. |
| **Versión mínima jugable** | Lo más chico que se puede construir y probar con un curso para saber si la idea funciona. |
| **Jefe final** | El desafío que cierra una etapa. Ya decidido: tu defensa oral. |

---

### 1. Esencia de la Semana 1

**De qué trata:** el alumno escribe la primera mitad del estudio técnico de **su propio proyecto**
(el Capítulo 4 de su tesis, secciones 4.1 a 4.1.4). El dossier lo enseña con una empresa ficticia,
Lácteos Valle Alto (yogur, Cochabamba), en cinco estaciones encadenadas: cada decisión se apoya en la
anterior, y todo termina en dos listas que en la semana 3 van al simulador (**insumos → costos** y
**equipos → inversión**).

#### Lo esencial (se aprende sí o sí)

| Tema del dossier | Qué tiene que **saber hacer** el alumno | Errores típicos que nombra el dossier |
|---|---|---|
| **Cadena de valor** (introducción del 4.1) | Separar actividades primarias y de apoyo; poner el costo por unidad de cada actividad; calcular el margen (precio menos costo de las actividades); **elegir una o dos** actividades donde el proyecto puede ganar y justificarlo; usar la cadena como índice del Capítulo 4 | Copiar la figura de Porter sin llenarla; poner ventaja en todas las cajas; creer que la actividad más cara es la más importante; creer que el margen es la ganancia; confundirla con el proceso productivo o con la cadena de suministro |
| **4.1.1 Localización** (factores ponderados) | Fijar y justificar pesos **antes** de calificar; comprobar que sumen 1; calcular el puntaje ponderado; encontrar el cambio de peso que daría vuelta la decisión | Contar factores ganados en lugar de ponderar; pesos que no suman 1; elegir el lugar y después acomodar los pesos; creer que el ganador es "objetivamente" el mejor |
| **4.1.2 Características del producto** (ficha técnica) | Describir el producto con datos medibles (presentación, composición, conservación, vida útil, normas) y saber qué decisión posterior depende de cada dato | Describir con adjetivos ("saludable, de calidad"); olvidar la vida útil; creer que la ficha es un trámite o que no hacen falta permisos |
| **4.1.3 Materias primas e insumos** (balance) | Receta por unidad **con merma** × producción del año = requerimiento; × precio = costo; comprobar que coincide con la cadena de valor; deducir cuántos proveedores hacen falta y cuándo | Calcular con la capacidad y no con la producción; olvidar el envase; quitar la merma "para ser exacto" |
| **4.1.4 Maquinaria y equipo** | Tabla de equipos con **capacidad necesaria, capacidad del equipo y precio cotizado**; incluir los equipos que no producen; justificar el tamaño (varios chicos o uno grande) | Cotizaciones sin capacidad; olvidar laboratorio, cámara o vehículo; "el más grande es el más seguro"; "una máquina más rápida siempre produce más" (esto último lo demuestra la semana 2) |

**La idea que atraviesa toda la semana:** *cada decisión se elige por lo que el proyecto necesita y
se defiende con un número*, no por gusto, por impresión ni por cuántas veces se gana.

#### Lo adaptable (el juego puede cambiarlo)

- La empresa (yogur), los socios, el galpón de Punata y los tres pueblos candidatos.
- Los números del caso: precio por litro, pesos y notas, receta y precios, cotizaciones. El juego
  puede usar otros (y cada alumno tendrá su versión), siempre desde funciones con pruebas.
- El orden interno: por ejemplo, el juego puede abrir con el lugar y dejar que la cadena de valor
  aparezca cuando el alumno ya conoce la empresa.
- Los tres casos de práctica del dossier (la cafetería de las hermanas, la tienda en línea de
  artesanías de Tarabuco, el taller de muebles de Quillacollo) son material listo para "otro cliente"
  o "otro tipo de proyecto".

#### Lo que conviene aclarar con Ronald antes de construir (hallado al leer)

1. **La escena de la planta es de la semana 2, no de la 1.** En este dossier, capacidad y cuello de
   botella son el 4.1.7 (semana 2). La semana 1 sólo lo anuncia: los tanques son "la etapa más lenta"
   y "una envasadora más rápida no agregaría ni un litro". `IDEA-JUEGO.md` §6 cita una carpeta vieja
   ("S1 · Cadena de valor y tamaño"); parece que el dossier se reordenó. También "subtema 1.3" ya no
   es capacidad: en este dossier el 4.1.3 es materias primas.
2. **El precio del tercer tanque no coincide.** La escena usa Bs 45.000 (la mitad de los Bs 90.000 de
   los dos tanques). El dossier pone el tercer tanque en Bs 52.000, comprado al terminar el año 4.
   El juego puede usar otros números (§9), pero conviene que sea una decisión y no un descuido.
3. **Una buena noticia:** el margen de Bs 4 por litro de la escena es el mismo que sale de la cadena
   de valor de la semana 1. En un marco que avanza semana a semana, el alumno llega a la escena de la
   planta sabiendo de dónde sale ese número.

---

### 2. Qué tiene de apasionante esta materia en la vida real

Proyectos II no es "llenar un capítulo": es **convertir una idea en algo que se puede construir y
convencer a alguien de que ponga la plata**. Las tensiones que la vuelven jugable:

- **Todo está encadenado.** Un producto mal descrito se arrastra a los insumos, de ahí a las
  máquinas, de ahí a la inversión y al flujo. En un juego eso es un efecto dominó: el error de hoy
  aparece tres pantallas después, como en *Papers, Please*.
- **Hay gente que empuja para su lado.** El socio que vive en Sacaba defiende Sacaba (está en el
  dossier). El vendedor ofrece la máquina más grande. Cada uno tiene un argumento que suena bien y
  está mal: descubrirlo es el placer del detective.
- **La plata es poca y se va en lo que no se ve.** La camioneta refrigerada es casi la mitad de la
  inversión en equipos; quien sólo mira la línea de producción la olvida.
- **Construir algo que crece.** Dos tanques con lugar para un tercero: la planta se diseña pensando en
  cómo va a crecer. Ver el galpón llenarse es una recompensa en sí misma.
- **Alguien va a preguntar "¿por qué?"** Un inversionista, un evaluador, el docente en la defensa. El
  dossier lo dice: la pregunta típica es "¿por qué este equipo y no uno más barato?".

**El gancho que sale de ahí:** *tus decisiones se sostienen solas o se caen, y alguien las va a poner
a prueba.*

---

### 3. Modalidad por tema (Semana 1)

Aquí manda el contenido, no el marco: cada tema pide un verbo distinto.

| Tema | Qué tiene que hacer el alumno | Modalidad que calza | Por qué | Alternativa |
|---|---|---|---|---|
| **Cadena de valor** | Descomponer, asignar costos, **elegir dónde competir** | **Seguir el litro:** el alumno acompaña un litro de leche desde la lechería hasta la heladera de la tienda; en cada parada escribe cuánto cuesta y ve cómo sube el valor. Al final tiene **sólo dos fichas de "ventaja"** para poner, y un rival pone las suyas | Hace ver el valor que se agrega paso a paso, y las dos fichas obligan a elegir (el error "ventaja en todo" se vuelve imposible) | **Espiar a la competencia:** visitar la planta de una marca grande y deducir dónde gana ella y dónde no puede ganarle |
| **4.1.1 Localización** | Poner pesos antes de mirar, ponderar, hallar el umbral | **Reunión de socios con sobre cerrado:** el alumno fija los pesos y los "sella" antes de ver las notas; recorre los tres pueblos juntando el dato de cada nota; calcula; y después enfrenta al socio de Sacaba ("gano en tres de cinco") | El sobre cerrado vuelve jugable la trampa de "acomodar los pesos después"; el socio convierte "contar victorias" en un rival de carne y hueso; el umbral es su respuesta ("tendrías que darle al mercado más de X") | **Viaje en flota por el valle:** un mapa donde cada pueblo se visita y da sus datos; más caro de dibujar |
| **4.1.2 Ficha técnica** | Pasar de adjetivos a datos medibles; saber qué depende de cada fila | **La ventanilla** (estilo *Papers, Please*): llegan fichas de productos (la del socio entusiasta, la de otros emprendedores) y el alumno sella "sirve" o "no sirve", y reescribe con datos la fila que falla. Una ficha sin vida útil que deja pasar vuelve después como yogur vencido en la cámara | Es un tema de **criterio**, no de cálculo: lo que se aprende es a reconocer qué se puede calcular y qué no | **El laboratorio:** el alumno arma el producto eligiendo presentación y vida útil, y ve qué cambia río abajo (cámara, reparto) |
| **4.1.3 Balance de insumos** | Receta con merma × producción; costo; proveedores | **La orden de compra del mes** (administrar un tramo corto): el alumno escribe cuánta leche, azúcar, pulpa, fermento y envases pedir; el juego "corre" el mes y muestra lo que pasa: si olvidó la merma falta leche el día 20; si calculó con la capacidad, la leche sobra y se pierde plata; si olvidó el envase, hay yogur sin botella | La consecuencia llega sola y se ve; el alumno aprende la fórmula porque la necesita para no quedar mal con la tienda | **La balanza:** minijuego de receta (pesar un litro de yogur), más corto y más escolar |
| **4.1.4 Maquinaria y equipo** | Capacidad necesaria contra la del equipo, cotizar, no olvidar los de apoyo, justificar el tamaño | **La feria de equipos con presupuesto:** vendedores con cotizaciones tentadoras; el alumno arma su tabla (necesito / ofrece / precio) y compra. Después llega un **evento**: un tanque en limpieza o en reparación, un pedido que hay que repartir en frío. Si eligió uno grande, la planta para; si olvidó la camioneta, no hay cómo entregar | Enseña que un equipo se elige por la capacidad que se necesita y por cómo falla o crece, no por cómo impresiona | **La escena de la planta que ya existe** (capacidad y cuello de botella), pero es contenido de la semana 2 (ver 1, aclaración 1) |

**Cómo encaja la escena que ya existe:** es la modalidad natural del **4.1.7 Capacidad (semana 2)**.
En cualquiera de los marcos de abajo deja de aparecer "de la nada": el alumno llega a ella después de
haber elegido el lugar, descrito el producto y comprado los tanques.

---

### 4. Tres marcos para toda la materia

Los tres admiten las cinco modalidades de arriba; lo que cambia es **quién eres, qué avanza y qué
se siente**.

#### Marco A · "La planta que levantas" (recomendado)

**Gancho:** *Tienes un lote vacío en el valle, un lechero con una receta y seis semanas para que un
inversionista diga que sí.*

**Género:** constructor con historia por capítulos (en inglés, *narrative builder*: un juego donde
construyes algo que se ve crecer, con una historia que avanza por capítulos). Referencias:
*Stardew Valley* (la granja que empieza con yuyos y crece con cada decisión tuya) y los templos de
*Zelda* (cada capítulo con su mecánica propia, dentro del mismo mundo).

**Quién eres:** el socio técnico que Don Mario, un lechero del valle con una receta de yogur de
frutilla, invita a armar el proyecto. Al principio no hay planta: hay una idea, un galpón apalabrado
y dos socios más con opiniones fuertes.

**El hub:** el lote. Empieza vacío. Cada tema terminado **deja algo visible**: el cartel del pueblo
elegido, la ficha pegada en la puerta, los sacos en el depósito, los tanques instalados, la camioneta.
Al lado, la **carpeta para el inversionista**, que se va llenando con una página por tema (es el
Capítulo 4 del alumno, en chico).

**Cómo cambia de un tema a otro:** siempre vuelves al lote; desde ahí sale la próxima tarea con su
modalidad (la reunión de socios, la ventanilla, la orden de compra, la feria). Cada capítulo termina
con el "cierre, grieta, promesa" que el propio dossier usa al pasar de una sección a otra: *la planta
va en Punata… pero todavía no sabemos qué sale de ella*. El dossier ya trae el hilo narrativo hecho.

**La materia entera (supuesto, desde el mapa de ruta):**

| Semana | Capítulo del juego | Modalidades que asoman |
|---|---|---|
| 1 | Los cimientos: dónde, qué, con qué, con qué máquinas | las cinco de la sección 3 |
| 2 | La planta arma su forma: acomodar los equipos en el galpón, el proceso, **la capacidad (la escena que ya existe)**, y el equipo humano | acomodar piezas (lay out), la escena de la planta, contratar |
| 3 | Salir a vender y saber cuánto cuesta | negociar con tiendas, fijar precio |
| 4 | El flujo: la carpeta entra al **simulador de SIMPRO** | administrar el tiempo, apostar |
| 5 | El riesgo: sequía, devaluación | eventos que obligan a recalcular |
| 6 | La ronda con el inversionista | ensayo de la defensa oral (jefe final) |

**Punto de control semanal** (para no castigar dos veces, como pidió la revisión del 26-09): al cerrar
cada semana, la socia contadora "revisa la carpeta" y la semana siguiente arranca con los números
correctos de la versión del alumno. La historia sí recuerda lo que hiciste ("menos mal que no
elegimos Sacaba"); los números no arrastran el error.

**Dos minutos jugados** (4.1.1, localización):

> Abres el juego y estás en el lote: tierra, un galpón de latón y Don Mario sentado en un balde. "Ya
> sabemos que la ventaja está en la leche fresca y el reparto frío. Ahora falta lo difícil: dónde."
> Entran los otros dos socios discutiendo. Julio vive en Sacaba y quiere la planta ahí; Rosa tiene un
> galpón apalabrado en Punata.
>
> Antes de que nadie diga nada, Don Mario pone un sobre en la mesa: "Primero decidimos qué nos
> importa. Después miramos los pueblos." Aparecen cinco factores (leche, alquiler, mercado, servicios,
> personal) y un reparto de 100 puntos. Pones 40 a la leche, 20 al alquiler, 20 al mercado, 10 y 10.
> Suma 100; el sobre se cierra con un sello rojo. Ya no lo puedes tocar.
>
> Ahora sí, el mapa del valle. Tocas Sacaba: Julio te muestra el mercado lleno de gente y el
> surtidor de gas. Tocas Punata: el camión lechero pasa por la puerta a las seis de la mañana. Cada
> cosa que ves te da una nota. Escribes los puntajes; Punata gana.
>
> Julio golpea la mesa: "¡Sacaba gana en tres de cinco!". Es verdad, y el juego te deja sentir que
> tiene razón un segundo. Entonces se abre la pregunta: "¿Cuánto tendría que pesar el mercado para
> que Sacaba empate?". Escribes el número. Julio lo lee, se rasca la cabeza: "Casi el doble… para una
> planta de yogur, no". En el lote aparece un cartel: *PUNATA*. En la carpeta, la página 4.1.1 queda
> escrita con tus pesos y tu umbral.

**Cómo aparece cada tema esencial:** cadena de valor = seguir el litro y poner las dos fichas de
ventaja (sin eso no sabes qué factor pesa más al elegir el lugar); localización = sobre cerrado y
socio de Sacaba; ficha técnica = la ventanilla, porque el registro sanitario no te recibe una ficha
con adjetivos; insumos = la orden de compra del primer mes; maquinaria = la feria, con el evento del
tanque en limpieza. El alumno aprende cada uno **porque sin él no avanza la planta**.

**Qué se adapta o se inventa:** Don Mario pasa de dueño de una planta que ya funciona (la escena de
hoy) a fundador que todavía no la tiene; se inventan los socios Julio y Rosa (el socio de Sacaba sí
está en el dossier); el reparto de 100 puntos en lugar de pesos que suman 1 (se muestra la equivalencia);
números con versión por alumno.

**Costo con lo que hay** (una persona con Claude, Next.js, Supabase, pixel art con código):
- **Lo caro:** el lote que crece (un dibujo que cambia por capas) y cinco modalidades distintas sólo
  en la semana 1. Cada modalidad nueva es código nuevo; ninguna existe todavía salvo la escena de la
  planta.
- **Lo que se reusa:** motor de versiones y pistas por error (`planta.ts`), registro, cuentas,
  página del docente, y el motor de SIMPRO para la semana 4.
- **Versión mínima jugable:** el lote + **dos** modalidades de la semana 1 (localización con sobre
  cerrado y feria de equipos) + las otras tres como escenas cortas de diálogo con un solo cálculo +
  la escena de la planta como cierre de la semana 2. Estimación honesta: varias semanas de trabajo.

**Riesgo principal:** que el lote se vuelva decorado (cosas que aparecen sin que importen). Remedio:
cada objeto del lote se usa después (la cámara de frío limita el pedido de insumos, los tanques son el
cuello de botella de la semana 2).

---

#### Marco B · "La consultora del valle"

**Gancho:** *Cada semana te llama alguien distinto con una idea: una cafetería, una tienda en línea,
un taller de muebles. Tú decides si se puede hacer y cómo.*

**Género:** juego de casos por episodios (en inglés, *episodic*: el juego se entrega en capítulos
cerrados, cada uno con su cliente). Referencias: *Professor Layton* (un pueblo que une acertijos de
formas muy distintas) y *Ace Attorney* (investigar y después defender). Es la evolución de lo que
proponía `01-vision.md` v2, ahora con modalidad variable.

**Quién eres:** el consultor recién llegado a una oficina chica del valle. Tu mentora te pasa los
encargos.

**El hub:** la oficina, con un corcho de clientes y el mapa del valle. Cada cliente atendido deja su
foto en el corcho y algo en el mapa (la cafetería abierta, el taller con cartel nuevo). Lo que avanza
es la reputación, contada en la historia: clientes nuevos que llegan "porque alguien te recomendó".

**La jugada que lo distingue:** **cada tema llega con otro tipo de proyecto**, que es justo lo que el
dossier repite en cada sección con su tabla "lo mismo en cada tipo de proyecto" (producción, comercio,
servicios, agrícola, digital). Semana 1, por ejemplo: la cadena de valor con la tienda en línea de
artesanías (que casi no tiene operaciones); la localización con la cafetería de las hermanas; la ficha
técnica y las máquinas con el taller de muebles de Quillacollo; los insumos con Lácteos Valle Alto.
Los tres primeros son los casos de práctica del propio dossier.

**Cómo cambia de un tema a otro:** siempre vuelves a la oficina; el cliente trae el problema y el
problema trae su modalidad. Lo que une es tu libreta y tu mentora.

**Dos minutos jugados** (4.1.1, con la cafetería):

> La puerta de la oficina se abre y entran dos hermanas hablando a la vez. Una quiere un local en la
> Heroínas: "¡pasa muchísima gente!". La otra, en Tiquipaya: "el alquiler es la mitad". Tu mentora te
> guiña un ojo desde su escritorio: "Tuyo".
>
> Antes de ir a ver locales, les pides que se pongan de acuerdo en qué les importa. Discuten, y el
> juego te deja moderar: cada hermana tira para su lado y tú repartes los pesos en la pizarra. Suman
> uno; la pizarra se congela.
>
> Sales a caminar. En la Heroínas cuentas gente pasando por minuto y no hay dónde estacionar; en Cala
> Cala hay un parqueo y un café de la competencia a media cuadra. Cada cosa que anotas es una nota.
> Vuelves, calculas, y el local con más gente no gana. La hermana de la Heroínas te mira ofendida:
> "¿Cómo que no, si gana en lo que más pesa?". Tienes que explicárselo con tu tabla. Si lo haces bien,
> su foto sube al corcho con una sonrisa; al día siguiente te llama su primo, que quiere abrir una
> lavandería.

**Cómo aparece cada tema esencial:** igual que en A, con las mismas modalidades, pero cada una sobre
otro negocio. Ventaja extra: el alumno practica **trasladar** cada método a otro tipo de proyecto,
que es lo que después hace con el suyo.

**Qué se adapta o se inventa:** los casos de práctica pasan a ser clientes con cara; se inventan
números donde el dossier no los da (la tienda en línea y el taller no traen cifras); Lácteos Valle
Alto queda como un cliente más.

**Costo:** más alto que A en arte e historia: **un negocio nuevo por tema** (dibujo, personajes,
llegada). Lo que ahorra: no hay un lote que crece ni continuidad que cuidar. **Versión mínima
jugable:** la oficina + dos clientes (la cafetería y el taller de muebles) + Don Mario en la semana 2
con la escena de la planta.

**Riesgo principal:** cada semana hay que volver a presentar una empresa nueva; si la llegada es
corta, vuelve la queja de "aparece de la nada". Y se pierde el encadenamiento (producto → insumos →
máquinas) que es la columna del dossier, porque cada tema pasa en otra empresa.

---

#### Marco C · "El comité del fondo"

**Gancho:** *Eres el analista más nuevo de un fondo que presta a emprendedores del valle. Te llegan
carpetas de proyectos y tu firma decide quién recibe la plata.*

**Género:** juego de inspección de documentos (en inglés, *document inspection game*: el trabajo es
revisar papeles contra reglas y encontrar lo que no cuadra). Referencia: *Papers, Please* (revisas
pasaportes; al día siguiente llega la multa por lo que dejaste pasar).

**Quién eres:** analista junior de un fondo ficticio (por ejemplo, "Fondo Tunari"). Sobre tu
escritorio se apilan carpetas: el Capítulo 4 de distintos emprendimientos.

**El hub:** el escritorio. Cada semana llegan carpetas más gruesas (primero sólo el estudio técnico,
después el comercial, al final el flujo). Lo que avanza: tu puesto en el fondo y, sobre todo, **las
consecuencias**: meses después ves qué pasó con los proyectos que aprobaste (la panadería que cerró
porque nadie cotizó la camioneta).

**La jugada que lo distingue:** las **trampas comunes** del dossier (dos por sección) son,
literalmente, el juego: pesos que no suman 1, fichas con adjetivos, balances hechos con la capacidad,
tablas de equipos sin capacidad, ventaja en todas las cajas. No basta con marcarlo: el analista
**devuelve la carpeta con la corrección escrita** (el número bien calculado).

**Cómo cambia de un tema a otro:** aquí las modalidades se acercan más entre sí (casi todo es
revisar), pero se pueden variar: una entrevista con el emprendedor, una visita al local para
comprobar una nota, una reunión del comité donde defiendes tu firma.

**Dos minutos jugados** (4.1.1 y 4.1.4):

> Es lunes. Sobre el escritorio, tres carpetas. Abres la primera: "Planta de yogur, Punata". Vas a la
> página de localización. Los pesos: 0,4, 0,3, 0,3 y 0,2. Tocas la calculadora de la esquina: suman
> 1,2. Pones el sello rojo sobre la tabla y el juego te pide que escribas cómo quedaría con pesos que
> sumen uno. La recalculas; el ganador cambia.
>
> Segunda carpeta: "Taller de muebles, Quillacollo". La tabla de equipos está impecable, con precios
> y cotizaciones. Algo falta y no sabes qué. Revisas la ficha técnica: "mesas a domicilio". Vuelves a
> la tabla: no hay vehículo. Sello rojo, y escribes cuánto sube la inversión con la camioneta que el
> emprendedor cotizó en un anexo.
>
> Tercera carpeta: todo parece bien. La apruebas. El juego salta: "Seis meses después". La carta de la
> tercera carpeta dice que les falta leche todas las semanas. Vuelves a abrirla: el balance no tenía
> merma. Tu jefa te mira por encima de los lentes: "Eso lo tenías que ver tú".

**Cómo aparece cada tema esencial:** cada tema es una página de la carpeta con su trampa. La cadena de
valor se revisa ("pusieron ventaja en las seis cajas"); la localización, la ficha, el balance y los
equipos, igual. El cálculo aparece al corregir.

**Qué se adapta o se inventa:** el fondo, la jefa, las carpetas (se escriben con errores sembrados a
propósito, uno por versión); los proyectos pueden ser de todos los tipos.

**Costo:** el más barato en arte (papeles y un escritorio, casi sin pixel art de escenas); el más caro
en escritura (cada carpeta necesita errores sembrados que cambien con la versión del alumno y se
prueben con script). **Versión mínima jugable:** el escritorio + tres carpetas de la semana 1 + el
"seis meses después".

**Riesgo principal:** **revisar no es lo mismo que construir.** El alumno se vuelve bueno encontrando
errores ajenos, pero la materia le pide escribir su propio capítulo. Y, si no se cuida, se parece a un
cuestionario de "encuentra el error". Remedio parcial: la corrección siempre se escribe, y la última
carpeta es la del propio alumno.

---

### 5. Mapa de cobertura

Dónde se aprende cada tema esencial en cada marco. Ningún tema queda afuera.

| Tema esencial | A · La planta que levantas | B · La consultora del valle | C · El comité del fondo |
|---|---|---|---|
| Cadena de valor: primarias y apoyo, costo por actividad, margen | Seguir el litro de tu propia empresa | Seguir el producto de la tienda en línea (sin operaciones) | Revisar una cadena "copiada de Porter" y llenarla |
| Cadena de valor: elegir dónde competir | Dos fichas de ventaja contra un rival | Dos fichas, con otro cliente | Sellar la carpeta con "ventaja en todo" |
| Localización: pesos antes, ponderar | Sobre cerrado en la reunión de socios | Pizarra congelada con las hermanas | Pesos que no suman 1 |
| Localización: umbral que da vuelta | Responderle a Julio (Sacaba) | Responderle a la hermana de la Heroínas | Defender la firma en el comité |
| Ficha técnica con datos medibles | La ventanilla del registro sanitario | Ficha de la mesa del taller | Ficha con adjetivos |
| Vida útil y lo que depende de cada fila | Yogur vencido si la dejaste pasar | Consecuencia en el taller | "Seis meses después" |
| Balance: receta con merma × producción | Orden de compra del primer mes | Orden de compra de Lácteos Valle Alto | Balance sin merma |
| Balance: producción, no capacidad; envase; proveedores | La leche que sobra o falta en el mes | Idem | Balance con la capacidad |
| Maquinaria: capacidad necesaria contra la del equipo | Feria de equipos | Feria con el taller (una combinada o dos separadas) | Tabla sin capacidades |
| Maquinaria: equipos que no producen | La camioneta que no compraste | El vehículo del taller | La carpeta sin camioneta |
| Maquinaria: varios chicos o uno grande | Evento: tanque en limpieza | Máquina combinada o separadas | Comité discute el tanque de 500 |
| Anticipo: la máquina más rápida sólo sirve en la etapa más lenta | Escena de la planta (semana 2) | Don Mario vuelve (semana 2) | Carpeta que pide la envasadora rápida |

---

### 6. Recomendación

**Marco A, "La planta que levantas"**, por tres razones:

1. **Es la forma de la materia.** Proyectos II es armar **un** proyecto de punta a punta en seis
   semanas, y el dossier lo enseña siguiendo **una** empresa con un hilo ("cierre, grieta, promesa")
   de sección a sección. El marco A no inventa la continuidad: la toma del dossier.
2. **Resuelve de raíz la crítica a la escena de la planta.** Cuando el alumno llega a la capacidad
   (semana 2), ya eligió el pueblo, escribió la ficha y compró los tanques. No puede aparecer de la
   nada porque la construyó él.
3. **Lo que deja se ve.** El lote que se llena y la carpeta que crece son la recompensa, sin puntos
   ni medallas, y la carpeta es el ensayo de su Capítulo 4 y de su defensa.

**De los otros dos, tomaría:** de B, un **encargo corto al final de cada semana** con otro tipo de
proyecto (los tres casos de práctica del dossier ya existen), para que el alumno traslade el método;
de C, la **ventanilla** como la modalidad de la ficha técnica y el "meses después" como forma de mostrar
consecuencias.

**Lo que costaría decidir A:** es el más caro de los tres en arte (el lote que crece) y obliga a
cuidar que el error de una semana no arruine la siguiente (el punto de control semanal). Si el costo
asusta, B con dos clientes es la versión más rápida de probar; C es la más barata en arte, pero la que
menos se parece a lo que el alumno tiene que hacer con su proyecto.

### 7. Preguntas para Ronald (Ronda 1)

1. **¿Qué marco te dan ganas de jugar?** A (levantas tu propia planta, recomendado), B (consultor con
   un cliente distinto por tema) o C (analista que revisa carpetas). También vale "A con algo de B".
2. **¿La escena de la planta pasa a la semana 2?** En tu dossier nuevo, capacidad y cuello de botella
   son el 4.1.7 (semana 2). Y el tercer tanque: ¿Bs 45.000 como en la escena o Bs 52.000 como en el
   dossier? (Responde "sí, 52.000" o lo que prefieras.)
3. **¿El juego toca el proyecto propio de cada alumno?** Por ejemplo, al cerrar cada semana, una
   pantalla "ahora con el tuyo" donde escribe su cadena de valor o sus pesos, que tú ves en el panel.
   O el juego se queda en su empresa y lo propio se trabaja en clase. (Sí / no / sólo algunas semanas.)
4. **¿Cuánto tiempo de juego por semana te parece bien?** Unos 20 minutos (dos modalidades jugadas y
   el resto en escenas cortas) o unos 40 (las cinco modalidades completas).

**Lo que me ayudaría para la Ronda 2:** el dossier de la semana 2 (o al menos su índice), para
confirmar dónde cae la escena de la planta y afinar el marco más allá de la semana 1.

### Lo que dijo Ronald

*(pendiente: se anota aquí con sus palabras cuando responda)*
