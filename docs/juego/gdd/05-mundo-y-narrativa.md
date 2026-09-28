# 05 · Mundo y narrativa

Agente: `disenador-narrativo`. Cada sección nueva va arriba, con su versión y fecha.

**Versión 2.1 · 27-09-2026**

## Decisiones pendientes de Ronald

**Ninguna nueva en esta ronda.** La única abierta del Tema 1 es la de `04` A2.5 (si la ayuda baja la
nota); los textos de abajo sirven con cualquiera de las dos respuestas.

1. ~~Giros del valle o castellano neutro~~ **Decidido por Ronald (27-09): castellano neutro con tuteo, sin
   giros regionales.** Todo lo de abajo ya está así.

Lo demás de esta sección queda como propuesta por defecto y pasa al `critico-de-jugabilidad` (etapa 5)
antes de mostrártelo.

---

## AIEF · Tema 1 · versión 2 · 27-09-2026 · Etapa 4 rehecha: que se vea, no que se explique

**Por qué se rehace.** La etapa 2 (`04` «Tema 1 · versión 2», A2.3 y A2.10) y la 3 (`02` «Tema 1 ·
versión 2», B2.3 y B2.11) cambiaron el tema: tres **carpetas de práctica** sin nota cuya consecuencia se
ve en el momento, y fuera todo texto que explique. Esta versión **reemplaza** N1.1 (Doña Teresa y los
momentos), N1.3 (justificación de la nota) y N1.5 (lista de cambios), **ajusta** N1.2 y N1.4, y **agrega**
lo que dicen los personajes en las prácticas y sus consecuencias. Lo que no se nombra aquí de la v1 sigue
valiendo.

**Ajustes del 27-09 tras `06` v5** (nada para Ronald): (1) las 15 frases de 1.1 reescritas en una tabla
(N2.3), cada una con una pista de hoja que sólo ella usa según el Cuadro 1 del dossier; salen «¿gana así
todos los años?» y «somos dos para atender», y otras tres que cruzaban hojas (hallazgo 3); (2) la página
«Calidad» del manual con el tono pulido, mismas reglas que `02` B2.5 (N2.4, hallazgo 2); (3) «plata» por
«dinero» y Don Rolando «de Potosí» (hallazgo 7).

**Qué leí:** `04` A2.1 a A2.10, `02` B2.1 a B2.11, `06` (revisión del Tema 1, hallazgos 5 a 12), mi v1, y
en el código `guion-tema1.ts` y `tema1.ts` (operaciones, `CLIENTES_T12`, `CLIENTES_T13`).

**La regla de escritura de esta versión, en una línea:** nadie en la agencia explica. Doña Teresa dice
**la regla**, nunca el porqué; el porqué ya lo mostró la consecuencia. Una consecuencia es **lo que le
pasó a alguien**, en una línea, con un hecho y sin teoría («No pagó», «Se fue enfrente»).

**Palabra de oficio nueva:**
- **Voz de pantalla (UI):** lo que dice el juego y no un personaje (un botón, un rótulo, «Jugar el tema
  siguiente»). Es el único lugar donde puede aparecer el docente o el tema, porque no es ficción.

### N2.1 Qué se quita

| Qué | Dónde estaba | Por qué sale |
|---|---|---|
| El recuerdo de 1985 («contábamos los billetes por bultos») y que Doña Teresa **justifique cada regla con algo que vivió** | N1.1 (ficha y momento 1.3), N1.5 #11 | Es un relato para leer. La regla nueva de 1.3 ya tiene motivo: el carpintero que se fue enfrente. Queda de ella un rasgo, en una frase (N2.2) |
| La explicación del auditor al abrir la jornada («el año pasado el auditor nos observó…») y la línea que anuncia la hoja de observación | N1.5 #10 | Es el porqué dicho de antemano. La hoja de observación entra **después** del pagaré (B2.3 b) |
| «Con el valor de libros habrías decidido con un número que ya no dice nada de hoy» | N1.5 #13 | Es una mini lección. No se agrega |
| La línea al cliente (libre o guiada) | `pideLinea`, N1.5 #15 | Sale del juego (A2.3 cambio 4); la pregunta pasa a la defensa |
| El resumen del final («ya sabes preguntar quién lee…») | `FINAL`, N1.5 #16 | Es un resumen de lección |
| «Es la misma sierra; sólo cambió la unidad de medida» y «así que la NIIF entra como supletoria» | `aciertoHoy`, `aciertoNC` | Explican. El acierto queda en «Bien.» |
| «Como Bolivia ya adoptó las NIIF» como justificación de la nota del contador | N1.3 | Decidido en `06` hallazgo 11: sale de las notas y queda sólo en frases del cliente (grupo B) |
| El papel 2 (el balance de la fraternidad) | N1.4 | Decidido en `06` hallazgo 5: se lee también como representación fiel |
| Nombres fijos por rol en 1.1 (Doña Elena siempre proveedora) | N1.2 | `06` hallazgo 6: se dicta entre compañeros. Ahora se sortean (N2.3) |

### N2.2 Personajes: lo que cambia

**Doña Teresa, jefa de agencia** (reemplaza su ficha de N1.1)

| | |
|---|---|
| Quién es | Unos cuarenta años detrás del mismo vidrio; empezó de cajera. Eso es todo lo que cuenta de sí misma, una vez, en la Llegada |
| Qué le importa | Que la pared no se llene de rojo **ni de gris**: perder un buen cliente con la cooperativa le duele igual que prestarle a uno que no paga |
| Cómo habla | Una línea por vez. Dice la regla o hace una pregunta. **Nunca dice por qué**: si el alumno necesita el porqué, lo vio pasar hace un minuto |
| Aparece en | Llegada, cierre de 1.1, apertura de la jornada, después de cada práctica (una línea), cierre |

Su única frase de personaje, en la Llegada: «Llevo cuarenta años detrás de este vidrio. Tú siéntate de
aquel lado.»

**Doña Nieves, Ferretería San Isidro** (ajusta N1.1). Ahora además **no es neutral**: quiere que su
ferretería se vea bien y empuja la hoja más linda. Nunca la que la persona necesita (B2.3 a). No se le
pone ningún texto que diga que eso está mal: se ve cuando la persona se va sin respuesta.

**Cliente de la práctica de 1.2: Doña Beatriz, Librería Mi Cuaderno** (nueva). Pide un crédito para
surtir la librería antes de que empiecen las clases. Trae su balance en regla y un pagaré que su balance no
muestra. Aparece sólo en esa práctica.

**Cliente de la práctica de 1.3: el carpintero con su sierra** (se mantiene, y ahora es **sólo** la
práctica). Nombre sorteado de `CLIENTES_T13` actual (Don Víctor, Doña Lidia, Don Rubén: la lista pasa a
ser sólo de la práctica). La carpeta con nota y los repasos traen **otro rubro y otra garantía** (N2.6), como
pide `04` A2.2.

### N2.3 1.1 · El mostrador: práctica y personas con nota

**Apertura** (reemplaza `ABRE_T11`, más corta que N1.5 #4): «Antes de abrir entra Doña Nieves, de la
Ferretería San Isidro, con su balance recién hecho. Detrás de ella, gente que se lo pidió. "Yo sé vender
clavos, no leer balances. ¿Me ayudas?"»

**Nombres, sorteados aparte del rol** (la versión elige cinco de la lista; el registro de Ronald guarda el
rol al lado). Van con su género, para la reacción «tranquila» o «tranquilo»:

| Mujeres | Hombres |
|---|---|
| Doña Elena · Doña Wilma · Doña Marta · Doña Julia | Don Hugo · Don Óscar · Don Fausto · Don Aurelio |

Evitan los nombres ya usados: Rosa, Teresa, Nieves, Beatriz, Mario (Proyectos II), Julio y Efraín (maqueta
de AIEF), Ramiro, Carmen, Silvia, Marcelo (1.2), Víctor, Lidia, Rubén (práctica de 1.3).

**Frases de cada persona** (ajuste del 27-09 tras `06` v5, hallazgo 3; **reemplazan las de N1.2**). Cada
frase trae una pista de su decisión y **una pista de la hoja**, que sólo esa persona usa (columna «Qué mira
primero» del Cuadro 1 del dossier). Ninguna dice quién es ni nombra la decisión; siguen valiendo las
palabras prohibidas de N1.2.

| Rol (sólo registro) · hoja | Pista de hoja, sólo suya | Frases |
|---|---|---|
| Inversionista · rentabilidad y patrimonio | «lo que puse», «me rinde», «cuánto vale hoy mi parte» | 1. «Hace cinco años puse mis ahorros en esta ferretería. Mi hermano dice que saque lo mío y me compre un minibús. Antes quiero saber cuánto me rinde lo que puse y cuánto vale hoy mi parte.» · 2. «Tengo una parte de la ferretería y me piden que ponga más dinero. Antes quiero ver si lo que ya puse me está rindiendo, y cuánto vale hoy.» · 3. «Fundé esta ferretería con Doña Nieves y la mitad es mía. ¿Sigo poniendo dinero o saco lo que me toca? Depende de cuánto me rinde y de cuánto vale hoy mi mitad.» |
| Proveedor · pago de corto plazo | «pagarme», «cobrar el mes que viene» | 1. «Cada mes les traigo cemento de la fábrica. Ahora me piden que les deje la carga y se la cobre el mes que viene. ¿Van a tener con qué pagarme?» · 2. «Les entrego clavos y tornillos desde hace años. El último pedido me lo pagaron tarde, y el que viene es el doble.» · 3. «Me encargaron veinte rollos de alambre para la siembra. Si se los dejo sin cobrar, ¿me van a poder pagar cuando vendan?» |
| Gerencia · márgenes por línea | comparar lo que se vende: «cuál de los dos nos deja más» | 1. «Cada mañana abro la tienda. Vendemos mucha pintura, pero no sé si con ella ganamos algo o sólo movemos dinero.» · 2. «Para diciembre tengo que elegir qué traer más, cemento o herramientas. Quiero saber cuál de los dos nos deja más por cada venta.» · 3. «Nos ofrecen una mezcladora para alquilarla a los constructores. La compraría la ferretería. Antes quiero ver si lo que ya alquilamos nos deja más que lo que vendemos.» |
| SIN · utilidad antes de impuestos | «lo que presentó», «antes de pagarle al Estado» | 1. «Traigo el formulario que la ferretería presentó en abril. Quiero ver si lo que pusieron ahí coincide con lo que dice su balance.» · 2. «Mi oficina revisa este mes a los comercios de la provincia. Según lo que presentó, la ferretería casi no ganó nada. Quiero ver cuánto ganó antes de pagarle al Estado.» · 3. «Tengo una orden de fiscalización con el nombre de la ferretería.» (la fácil: sale poco, como decía N1.2) |
| Empleado · continuidad y resultados del año | «este año», «seguir abierta» | 1. «Trabajo en el depósito hace ocho años. Me ofrecieron un puesto en una ferretería de Punata y tengo que responder el lunes. Antes quiero saber cómo le fue a esta tienda este año.» · 2. «Somos seis en la tienda y este año no hubo aumento. Doña Nieves dice que las ventas bajaron; quiero verlo con mis propios ojos antes de hablar con ella.» · 3. «Me ofrecieron otro trabajo, con menos sueldo pero seguro. Quiero saber si esta ferretería va a seguir abierta el año que viene.» |

**Prueba de «una sola hoja por frase»** (hecha frase por frase contra el Cuadro 1; va también como prueba
en la construcción, con la lista de pistas de la tabla):
- Ninguna pista se repite en otra fila: «año» como pregunta sólo en el empleado («hace cinco años» y «hace
  ocho años» son historia, no pregunta); «pagar» sólo en el proveedor (el SIN dice «pagarle al Estado», que
  es otra cosa y lleva su palabra «presentó»); «nos deja» sólo en la gerencia (el inversionista dice «me
  rinde»: lo suyo, no lo de la tienda).
- Salen las frases que cruzaban: «¿gana así todos los años?» (llevaba al empleado); «somos dos para atender»
  (llevaba a pagar un sueldo); «cuadro la caja» (llevaba al pago de corto plazo); «tiene el depósito lleno»
  (llevaba a inventarios); «la última palabra es mía» (sin pista de hoja).
- «Plata» sale de todas (castellano neutro, `06` hallazgo 7). Con nombres sorteados, la v1 ya no hace de
  Rodrigo el hijo de Doña Nieves.

**Doña Nieves empuja una hoja** (en la práctica y en una persona con nota, sorteada). Se asoma antes de que
selles; una de estas, sorteada:
- «Dale esa, que salió linda.»
- «Muéstrale esa, que ahí quedamos bien parados.»
- «Esa, esa. Es la que mejor se ve.»

**Consecuencias** (las reacciones de N1.2, sin cambios, más una de Doña Nieves):
- Se va conforme: «Con esto ya sé qué hacer. Gracias.» · «Justo lo que necesitaba ver.» · «Esto me
  contesta. Me voy tranquila.» (o «tranquilo»).
- Se va sin lo que necesitaba: «Con esto no decido nada de lo mío.» · «Esta hoja no me contesta lo que vine
  a preguntar.» · «Me voy igual que llegué.»
- **Sólo si entregaste la hoja que ella sugirió** y la persona se va sin respuesta, Doña Nieves, encogiéndose
  de hombros: «Pues a mí me parecía la más linda.» No dice nada más; el alumno une las dos cosas solo.

**Cierre de 1.1:** `CIERRA_T11` de la v1 («El mismo papel, cinco preguntas distintas. La nuestra es otra: si
le prestamos, cuánto y a qué tasa. Abramos la ventanilla.»), con el número de personas que salió en la
versión.

### N2.4 1.2 · La práctica del pagaré

**Apertura de la jornada** (reemplaza `ABRE_JORNADA`; sólo la regla, sin el auditor ni la hoja de
observación): «Hoy los clientes traen el balance que preparó su contador. Revisa la operación marcada:
primero la NC; la NIIF, sólo si ninguna NC la regula.»

**La carpeta de Doña Beatriz** (números de la versión, sin nota):
- Frase: del grupo A de N1.3 (por ejemplo, «Te traigo el balance del año. Lo necesito para el préstamo.»).
- Operación marcada y nota del contador **bien hechas** (una de las formas «nc-correcta»).
- Pestaña «Pasivo»: dos renglones, «Proveedores Bs A» y «Préstamo del Banco Kusi Bs B». Nada más.
- Pestaña «Papeles sueltos»: «PAGARÉ. Debo y pagaré a la orden de Fortunato Rojas la suma de Bs X, el 15 de
  marzo. Cliza, 10 de noviembre. Firmado: Beatriz …». Firmado antes del cierre del año, así que el pasivo al
  31 de diciembre tendría que mostrarlo. X, A y B salen de la versión.
- Dictamen de dos botones: ACEPTAR · DEVOLVER.

**Si falla la NC después del escalón (c)**, Doña Teresa cierra el campo sin el número: «Déjala por hoy.
Decide con lo que tienes.» (`02` B2.3 proponía «Mira el resto de la carpeta»: **lo cambio**, porque esa
frase señala el pagaré antes de firmar y le quita a la práctica justo lo que tiene que mostrar.)

**Se adelanta el tiempo** (la ficha se da vuelta con el pagaré resaltado):
- Aceptó, rojo: «En marzo apareció esa deuda. No pagó.»
- Devolvió, color de buen rechazo: «Enfrente le prestaron. En marzo apareció esa deuda y dejó de pagarles.»

**Doña Teresa, una línea:** «Desde hoy, además de la norma, mira el resto de la carpeta.» Sube la hoja de
observación y el manual suma: «La norma, en la operación marcada. La hoja de observación, en el resto.
Cada carpeta trae como mucho un defecto.»

**La página «Calidad» del manual** (ajuste del 27-09 tras `06` v5: tono pulido de `02` B2.5; **las reglas
son las mismas**, sin porqués). Entra junto con la hoja de observación:

> **Calidad** · regla de la agencia
> Fundamentales: relevancia y representación fiel.
> De mejora: comparabilidad, verificabilidad, oportunidad y comprensibilidad.
> En la hoja de observación, sella la que falla. Si no falla ninguna, sella «nada que observar».
> Si la norma está mal, devuelve.
> Si la norma está bien:
> · falla una fundamental: devuelve;
> · falla una de mejora: acepta con observación;
> · no falla ninguna: acepta.

### N2.5 1.2 · Carpetas con nota: redacciones para que no se copie

Hacen falta antes de que cuente para la nota (`02` B2.10 punto 14). Ningún texto dice el título de su NC
con las mismas palabras; todos son hechos de la empresa.

**Operaciones, dos o tres redacciones cada una** (la primera es la de hoy en `tema1.ts`):

| NC | Redacciones |
|---|---|
| 10 · arrendamientos (NIIF 16) | El local de la tienda es alquilado, con contrato a cinco años. · Usa un camión que no es suyo: lo tiene en *leasing*, con cuotas mensuales y opción de comprarlo al final. · Alquila una máquina tejedora por tres años, con cuota fija cada mes. |
| 8 · consolidación (NIIF 10) | La empresa es dueña de otra y presenta un solo balance de las dos juntas. · Tiene el 80 % de una distribuidora y presenta un balance con las cifras de las dos sumadas. · Compró el taller que le hacía los repuestos y ahora muestra todo en un solo balance. |
| 6 · diferencias de cambio (NIC 21) | Tiene una deuda en dólares y registró lo que subió al moverse el tipo de cambio. · Le debe en dólares a un proveedor de Chile y anotó la pérdida porque ahora necesita más bolivianos para pagarle. · Tiene ahorros en dólares y registró cuánto más valen en bolivianos desde que cambió la cotización. |
| 7 · inversiones permanentes (NIC 28) | Compró acciones de otra empresa para conservarlas muchos años. · Tiene el 30 % de una empresa de transporte y no piensa venderlo. · Compró una parte del molino que le vende la harina, para quedarse como socia por años. |
| 2 · hechos posteriores (NIC 10) | Se quemó un depósito después del cierre del año, antes de entregar el balance. · En enero, con el año ya cerrado, quebró su principal cliente y le quedó debiendo. · En febrero perdió un juicio que venía del año pasado; el balance todavía no estaba entregado. |
| 4 · revalorización técnica (NIC 16) | Un perito revalorizó la maquinaria de la empresa. · Hizo tasar su edificio por un perito y subió su valor en el balance. · Un ingeniero tasó de nuevo los camiones y el balance muestra el valor nuevo. |
| 3 · moneda constante (NIC 29) | Ajustó todo el balance por inflación. · Actualizó todas las cifras del balance con el índice de precios del año. · Rehízo el balance del año pasado en bolivianos de este año para compararlo. |
| 13 · cambios contables (NIC 8) | Cambió el método de depreciación respecto del año pasado. · Dejó de depreciar sus camiones en línea recta y pasó a hacerlo por kilómetro recorrido. |
| 0 · flujo de efectivo (NIC 7) | Presenta el estado de flujo de efectivo. · Agregó un estado que muestra cuánta plata entró y salió de caja en el año. · Suma un cuadro con lo que cobró y pagó en efectivo, separado por actividad. |
| **5 · industria minera** (NIIF 6), nueva | Una cooperativa minera anotó lo que gastó en buscar una veta nueva, antes de saber si rinde. · Una empresa minera registró lo que pagó por los estudios de un yacimiento de zinc. |
| **12 · más de un tipo de cambio** (NIC 21), nueva | Importa repuestos y en el año pagó sus dólares a dos cotizaciones: la oficial y la de las casas de cambio. · Exporta quinua y cobra en dólares; este año hubo dos cotizaciones y registró con una de ellas. |

**Notas para la construcción:**
- Las dos nuevas traen **cliente propio**, porque el rubro tiene que calzar: NC 5 con «Don Rolando,
  de Potosí, cooperativa minera» (dice de dónde viene: `06` v5, hallazgo 7); NC 12 con cualquier cliente de la lista que importe o exporte («Doña Silvia,
  panadería» no calza con la quinua: usar «Don Anselmo, exportadora de quinua» o «Don Gregorio, transporte»
  para los repuestos). NC confusa sugerida: la 5 con la 9 (la otra industria); la 12 con la 6.
- **NC 9 (petrolera) no la agrego:** una empresa petrolera pidiendo crédito en la agencia de Cliza no calza
  con el mundo. NC 1, 11 y 14 tampoco: son de presentación general (`06` hallazgo 11).
- Lo de NC 13 lleva dos, no tres: una tercera (un cambio de estimación) depende de lo que el dossier
  incluya en la NC 13, y no lo arriesgo.
- `CLIENTES_T12`: «Don Efraín, transporte» pasa a «Don Gregorio, transporte» y «Don Ramiro, ferretería» a
  «Don Ramiro, imprenta»; como ya existe «Don Marcelo, imprenta», este pasa a «Don Marcelo, lavandería»
  (sigue N1.5 #17).

**Papeles de calidad, dos o tres redacciones por defecto** (ajusta N1.4; montos y meses de la versión):

| Característica (piso) | Redacciones |
|---|---|
| Relevancia (fundamental; **sólo en repaso**) | Papel 1 de N1.4 (el galpón de 2009). · «Respaldo el crédito con mi terreno, que figura en el balance por Bs X, lo que pagué en 1998.» |
| Representación fiel (fundamental) | Papel 3 (carta de cuota vencida, sin deuda en el pasivo). · Contrato de compra de un camión a plazos, con doce cuotas por pagar; en el pasivo no figura. · Papel 4 (cuentas por cobrar de una empresa que cerró). · En activos, un camión por Bs X; en la carpeta, la denuncia policial de su robo, de octubre. **El pagaré no sale en las carpetas con nota de la jornada** (B2.3 b) |
| Oportunidad (mejora) | Papel 5 (solicitud de marzo, balance de julio). · Solicitud de octubre, para la campaña de Navidad; el balance que la respalda es el de hace casi dos años |
| Verificabilidad (mejora) | Papel 6 (inventarios «como el contador creyó conveniente»). · Nota de cuentas por cobrar: «Se dejó una reserva prudente para lo que no se cobre.» No dice cuánto ni cómo |
| Comparabilidad (mejora) | Papel 7 (fletes). · Este año las ventas se muestran sin IVA; el año pasado, con IVA. La columna anterior no se rehízo |
| Comprensibilidad (mejora) | Papel 8 (nota 7 ilegible). · El balance trae las cuentas sólo con códigos: «1.1.2.03 … Bs X», sin nombre. El cliente tampoco sabe qué son |
| Sanos | S1, S2 y S3 de N1.4. · S4: Nota de activos fijos: «Depreciados en línea recta, a las mismas tasas que el año pasado.» |

Con la operación de NC 13 (cambio de método) no sale S4 ni el papel 7, para que la carpeta no traiga dos
cambios que se confundan.

**Al cierre, la ficha nombra lo que no se vio** (una línea por caso; sin teoría):

| Caso | Línea |
|---|---|
| Norma mal aceptada | «El auditor del banco observó este balance: la operación la rige la NC N.» (N sale de la carpeta) |
| Aceptó con un defecto fundamental | Representación fiel: «Esa deuda existía y no estaba en el balance. No pagó.» o «Eso nunca se iba a cobrar. No pagó.» · Relevancia: «La garantía valía lo que costó hace años, no lo de hoy. No alcanzó.» |
| No vio un defecto de mejora | «El auditor anotó que el balance llegó en julio.» · «…que no se sabe cómo se valuó el inventario.» · «…que los dos años no se pueden comparar.» · «…que nadie supo qué decía la nota 7.» (el que corresponda a la redacción) |
| Observó o devolvió uno sano | «No había nada que observar. Se molestó y se fue enfrente.» |
| Sello equivocado, dictamen bien | La línea del defecto que sí tenía, igual que arriba |

### N2.6 1.3 · La práctica del carpintero y la carpeta con nota

**Antes de la práctica** (reemplaza `HOJA_NUEVA`; ya no hay hoja nueva: se juega con la regla de ayer):
«Última parte del día. Entra un carpintero con su sierra.»

**Lo que dice el carpintero** (una, sorteada; números de su carpeta):
- «Necesito Bs P para comprar madera. Te dejo mi sierra.»
- «Me salió un pedido grande de muebles. Con Bs P compro la madera, y la sierra queda de garantía.»

La ficha muestra libros, índice al comprar e índice de hoy, con sus dos barras (B2.3 c). Nadie comenta la
ficha.

**Se adelanta el tiempo:**

| Firmó | Color | Línea |
|---|---|---|
| Con la regla de ayer (60 % de libros) | gris | «Se fue enfrente. La cooperativa le prestó Bs T por la misma sierra.» |
| Lo que pide | rojo | «No pudo pagar. Remataron la sierra y no alcanzó para la deuda.» |
| El tope con valor de hoy | verde | «Pagó todas sus cuotas.» |
| Otro monto | el que dé el motor | la línea de `queFuePaso` que ya existe para ese color |

**Recomendado: la línea gris dice el monto T de la cooperativa** (el tope con el valor de hoy, redondeado,
sale de la versión). Es la consecuencia más clara posible: el alumno ve que por la misma sierra alguien
prestó más y puede preguntarse de dónde salió. No da puntos ni sirve para la carpeta con nota (otros
números). Alternativa: «le prestó más», sin cifra; se ve menos. Lo marco para el crítico.

**Doña Teresa, una línea:** «Desde hoy, la garantía se mira en bolivianos de hoy.» El manual suma la
fórmula y la regla del 60 % sobre ese valor.

**Carpeta con nota: otro rubro, otra garantía** (reemplaza `CLIENTES_T13` en la jornada y los repasos; el
mínimo de la ficha deja de decir «madera»):

| Cliente | Garantía | Su mínimo, en la ficha |
|---|---|---|
| Doña Paola, costura | una máquina de coser industrial | Cotización de la tela |
| Don Ernesto, panadería | un horno | Cotización de la harina |
| Doña Sonia, taller de motos | un compresor | Cotización de los repuestos |
| Don Teodoro, encuadernación | una guillotina de papel | Cotización del papel |

**Antes de la carpeta con nota** (sigue N1.5 #12): «Recuerda la hoja nueva de tu manual:».

**Lo que dice el cliente** (una, sorteada; sigue N1.5 #14 con la garantía de la carpeta): «Compré mi
[garantía] en Bs L y ahora vale Bs C. ¡Gané Bs G sin moverme!» (G = C menos L, calculado) · «Mi [garantía] rindió más que un
ahorro en el banco: de Bs L a Bs C.» · «Si hoy vendo mi [garantía] me pagan Bs C. Eso ya es ganancia, ¿no?»

Aciertos: «Bien.» (valor de hoy). Firma: sin reacción; el color se ve al cierre.

### N2.7 Cierre y final

- `CIERRE_BIEN`: «Buen día: todo lo que firmaste hoy se sostiene.» El «aprobado» va como voz de pantalla (un
  sello o un rótulo), no en boca de nadie.
- `CIERRE_REPASO`: sin cambios.
- `FINAL`: Doña Teresa: «Buen trabajo. Mañana te toca otra ventanilla.» Voz de pantalla debajo: «El tema
  siguiente se abre cuando tu docente lo habilite.»
- **Pistas del repaso que recuerdan la práctica** (A2.6 punto 1): regla de ayer, «Ayer usaste la regla de
  ayer, como con el carpintero: se fue enfrente.»; defecto fundamental aceptado, «Ayer aceptaste un balance
  que no decía todo. ¿Te acuerdas del pagaré?»; sano observado, «Ayer observaste un balance que no tenía
  nada que observar, y el cliente se fue.»; sello equivocado, «Ayer anotaste un problema que no era el de
  esa carpeta.»

### N2.8 La lista final: frases del juego actual a cambiar

Reemplaza N1.5. Sin tocar los archivos (etapa 6). En `guion-tema1.ts` salvo que se diga otra cosa.

| # | Dónde | Hoy | Queda | De |
|---|---|---|---|---|
| 1 | `PERSONA[p].nombre` | Nombre con el rol | Nombre sorteado de la lista de N2.3; el rol va a un campo que sólo lee `describir` | N1.5 #1, `06` h. 6 |
| 2 | `PERSONA` (dice, otraVez) | Tres roles, dos frases | Cinco roles, tres frases (la tabla de N2.3, que reemplaza las de N1.2) | N1.5 #5 |
| 3 | `ABRE_T11` | Tres personas llegan al banco | N2.3 apertura | N1.5 #4, más corta |
| 4 | Agregar | | Las tres frases de Doña Nieves que empuja y su línea de hombros (N2.3) | nueva |
| 5 | `AYUDA_T11.concreta[1]` | La clave de las tres personas | «Piensa qué va a hacer esa persona mañana con lo que lea: ¿cobrar algo, poner o sacar dinero, quedarse en su trabajo, decidir algo de la tienda?» | N1.5 #6 |
| 6 | `CIERRA_T11` | «…tres preguntas… otorgar o negar un crédito…» | N2.3 cierre | N1.5 v1 |
| 7 | `LLEGADA[0]` | «Bienvenido…» | «Te damos la bienvenida a la agencia de Cliza del Banco Kusi. Aquí decides cuánto prestarle a cada cliente.» | N1.5 #7 |
| 8 | `LLEGADA` (agregar) | | La frase de Doña Teresa de N2.2 y la de la cooperativa: «¿Ves la cooperativa de enfrente? Si le prestas de menos a un buen cliente, se va allá. Y si le prestas a uno que no puede pagar, vuelve aquí a no pagar.» | N1.5 #8 |
| 9 | `PARED_PRIMERA` | «Esa noche… pagó sus cuotas» | «Esta es la pared. Aquí adelantamos el tiempo: cada ficha te muestra cómo terminó el crédito. Doña Rosa pagó todas sus cuotas.» | N1.5 #9 |
| 10 | `ABRE_JORNADA` | La norma con explicación | N2.4 apertura (sólo la regla) | cambia N1.5 #10 |
| 11 | Agregar | | Práctica de 1.2: Doña Beatriz, sus pestañas, el pagaré, la línea que cierra la NC, las dos consecuencias, la línea de Doña Teresa y la del manual (N2.4) | nueva |
| 12 | `diceClienteT12` | «Bolivia ya adoptó» sólo en las para devolver | Grupos A, B y C de N1.3, sorteados aparte de la nota | N1.5 #2 |
| 13 | `textoNota` (`tema1.ts`) | «Como Bolivia ya adoptó las NIIF, lo registramos…» | Forma única «Registrado según la [norma]. [Justificación].»; con NIIF, sólo «Porque ninguna NC boliviana lo regula.» | `06` h. 11 |
| 14 | `aciertoNC` | «…así que la NIIF entra como supletoria.» | «Bien.» | N1.5 #3, más corto |
| 15 | `OPERACIONES` (`tema1.ts`) | Una redacción por operación, nueve operaciones | Las redacciones y las dos operaciones nuevas de N2.5 | nueva |
| 16 | `CLIENTES_T12` (`tema1.ts`) | Efraín transporte, Ramiro ferretería | N2.5 notas | N1.5 #17 |
| 17 | `PREGUNTA_DICTAMEN` | «¿Aceptas… o lo devuelves…?» | «¿Qué haces con este balance?» (los tres botones ya dicen las opciones) | nueva |
| 18 | `queFuePaso` (t12) | Dos caminos | Las líneas de cierre de N2.5, con aceptar con observación | nueva |
| 19 | `HOJA_NUEVA` | «…una hoja nueva del manual: reemplaza a la regla de ayer.» | N2.6 antes de la práctica | cambia N1.5 #11 (sin 1985) |
| 20 | Agregar | | Práctica de 1.3: frases del carpintero, las cuatro consecuencias, la línea de Doña Teresa (N2.6) | nueva |
| 21 | `RECUERDA_REGLA` | «Ahora un carpintero… la regla del Tema 1:» | «Recuerda la hoja nueva de tu manual:» | N1.5 #12 |
| 22 | `CLIENTES_T13` y `fichaT13` (`tema1.ts`) | Tres carpinterías; «Cotización de la madera» | Carpinterías sólo en la práctica; la tabla de N2.6 para la jornada y los repasos, con el mínimo de cada rubro | nueva |
| 23 | `diceClienteT13` | Una frase, con «sierra» | Tres frases con la garantía de la carpeta (N2.6) | N1.5 #14 |
| 24 | `aciertoHoy` | «Bien: la sierra vale hoy… sólo cambió la unidad…» | «Bien.» | A2.3 |
| 25 | `pideLinea` | La línea al cliente | **Se borra.** El evento `linea` se sigue leyendo en `describir` | A2.3 cambio 4 |
| 26 | `PISTA_REPASO` | Sin calidad ni recuerdo de la práctica | Las de N2.7 | A2.6 |
| 27 | `AYUDA_REPASO.t12.concreta[1]` | «Si coinciden… acéptalo. Si no, devuélvelo.» (casi la respuesta, y con dos botones) | «Compara la norma que citó con la que encontraste. Después mira el papel que sobra: ¿cambia lo que decides?» | nueva |
| 28 | `AYUDA_REPASO.t13.leer.donde` | «tu manual, la regla del Tema 1…» | «tu manual (la hoja nueva) y el dossier del Tema 1, pág. 14» | ficción |
| 29 | `CIERRE_BIEN` | «…Tema 1 aprobado.» | N2.7 | `06` h. 12 |
| 30 | `FINAL` | Resumen del tema y «el Tema 2» | N2.7 | cambia N1.5 #16 |

**Lo que no se toca:** `LUGAR`, `JEFA`, `LLEGADA[1]`, `practica` y `correccionPractica` (la Llegada de Doña
Rosa), `PISTA_NC`, `AYUDA_NC`, `PISTA_HOY`, `AYUDA_HOY`, `queFuePaso` de t13, `ABRE_REPASO`,
`CIERRE_REPASO`.

**Qué se rompe al cambiarlos:** todo son textos, salvo 15, 16 y 22, que cambian lo que se sortea (van
con la generación de carpetas guardada en la partida, `02` B2.10 punto 1, para que una partida vieja se lea
como se jugó). El 1 cambia lo que ve el docente si el rol no pasa a un campo aparte. El 25 no borra nada
guardado.

### N2.9 Avisos para otras partes

- **`disenador-de-bucle` (`02`):** cambio la línea que cierra el campo de NC en la práctica de 1.2 («Déjala
  por hoy. Decide con lo que tienes.» en lugar de «Mira el resto de la carpeta», que señalaba el pagaré). La
  carpeta con nota de 1.3 deja de ser una carpintería (la sierra queda para la práctica); la pista de B1.5
  que dice «la sierra» pasa a «la garantía».
- **`adaptador-de-dossier` (`00` R3.2):** Don Julio y su sierra siguen como historia; en el juego la sierra
  es la práctica y la carpeta con nota trae otro rubro. Cubre el mismo tema (1.3, reexpresión). Hay que
  anotarlo como adaptación.
- **`critico-de-jugabilidad`:** (1) si la línea gris con el monto de la cooperativa enseña o regala; (2) la
  línea de hombros de Doña Nieves, que no se lea como explicación; (3) NC 12 frente a NC 6, que es una
  distinción fina pero es la del dossier; (4) que ninguna consecuencia de las prácticas pase de una línea en
  375×812.
- **Construcción (etapa 6):** prueba de palabras prohibidas (N1.2) sobre las frases nuevas; que el pagaré
  no salga en las carpetas con nota; que S4 y el papel 7 no salgan con la operación de NC 13; los montos de
  la práctica de 1.2 (X, A, B) y la T de 1.3 desde la versión.

---

## AIEF · Tema 1 · versión 1 · 27-09-2026 · Etapa 4 sobre el tema ya construido

**Aviso de etapa.** El Tema 1 se construyó el 27-09 saltándose etapas. La 1 (ficha, `00-adaptacion-aief.md`
R3.2 y R3.2-bis), la 2 (`04-aprendizaje.md`) y la 3 (`02-bucle-y-mecanicas.md`) ya están. Esta es la 4,
**sobre lo construido**: quién aparece, qué dice y qué frases del código conviene cambiar (sin tocarlo).

**Decisión nueva de Ronald (27-09):** las características de calidad **entran al juego** con la hoja de
observación de B1.6. Por eso la parte 4 de abajo ya no va marcada «si Ronald aprueba». El plan completo
se le muestra en simple antes de construir.

**Qué leí:** `02` (B1.1 a B1.12), `04` (A1.1 a A1.5), `00-adaptacion-aief.md` (R3.1, R3.2, R3.2-bis y el
marco A), `IDEA-JUEGO.md` §19, `src/lib/juego/aief/guion-tema1.ts`, `tema1.ts`, la línea de
`EscenaVentanilla.tsx` que muestra el nombre de cada persona, y el dossier del Tema 1 (`.tex`, huella del
PDF `7cbe14e402f8`): Cuadro 1 (pág. 4), los tres «Qué NO se puede afirmar» (1.1, 1.2 y 1.3), los Errores
y el apartado 1.3 (págs. 12 a 16).

**Palabras de oficio de esta sección:**
- **Grupo de frases (pool):** varias frases que dicen lo mismo con otras palabras; la versión del alumno
  sortea cuál sale.
- **Romper la ficción:** cuando un texto del juego habla como el curso («Tema 1») y no como la agencia.
- **Palabra delatora:** una palabra que repite el texto de la respuesta (si la persona dice «contratar»,
  el sello «Invertir, contratar, fijar precios» se elige sin pensar).

### N1.1 El mundo del Tema 1

**La agencia de Cliza del Banco Kusi** (ficticio). Una casa antigua sobre la plaza, con una sola
ventanilla de créditos: la tuya. Detrás del vidrio, el escritorio de Doña Teresa. En la pared de tu lado,
un corcho vacío: **la pared**, donde va una ficha por cada crédito que firmas. En la puerta, un banco de
madera donde espera la cola. **Enfrente, cruzando la plaza, la cooperativa**: sin nombre, siempre con
gente. Es adonde se van los clientes que no atiendes bien, y adonde van a caer en mora los que no podían
pagar. La cooperativa tiene que aparecer en la Llegada, porque después la nombran los textos del cierre.

**El oficial (el alumno).** Recién llegado, sin nombre y **sin género**: nadie le dice «bienvenido» ni
«bienvenida». Lo tratan de tú.

**Ficha de personaje · Doña Teresa, jefa de agencia**

| | |
|---|---|
| Quién es | Unos cuarenta años en el banco, a punto de jubilarse. Empezó de cajera en 1985, en plena hiperinflación: «contábamos los billetes por bultos». |
| Qué le importa | Que la agencia no cierre y que la pared no se llene de rojo. Le molesta perder un buen cliente con la cooperativa de enfrente tanto como prestarle a uno que no paga. |
| Cómo habla | Frases cortas, sin tecnicismos, de pie junto a tu silla. Nunca te da la respuesta: te hace una pregunta o te manda al manual. |
| Para qué sirve en el juego | Abre cada jornada con la regla del día y la **justifica con algo que vivió**, para que ninguna regla caiga del cielo. Cierra con dos líneas. |
| Aparece en | Llegada, apertura de 1.1, apertura de la jornada, hoja nueva de 1.3, cierre, repaso. |

Su recuerdo de 1985 es el ejemplo comentado de 1.3 del dossier (la hiperinflación de 1984 y 1985, pág. 15)
puesto en boca de alguien. No da cifras: las cifras del dossier se quedan en el dossier.

**Ficha de personaje · Doña Nieves, dueña de la Ferretería San Isidro** (nueva, para 1.1)

| | |
|---|---|
| Quién es | Clienta de la agencia desde hace años. Su contador le acaba de entregar el balance del año. |
| Qué le pasa | Cinco personas le pidieron ese balance para cosas distintas y no sabe qué parte darle a cada una. |
| Cómo habla | Apurada y franca: «Yo sé vender clavos, no leer balances». |
| Por qué hace falta | Hoy la escena dice que tres personas llegan **al banco** a pedir el balance de un cliente. Un banco no reparte los papeles de sus clientes: un alumno de administración lo nota, y la escena parece salida de la nada. Con Doña Nieves, el balance es de ella y es ella quien lo entrega; tú la ayudas. |
| Aparece en | Sólo en 1.1. Si hay Tema 2 de la ferretería, puede volver. |

**Los cinco momentos, en orden de la historia**

| Momento | Día | Cómo se presenta (para que nada aparezca de la nada) |
|---|---|---|
| **Llegada** | Día 1 | Doña Teresa te muestra la ventanilla, el manual con la regla cero, la pared vacía y, por la ventana, la cooperativa de enfrente. Primera clienta: Doña Rosa y su moto. Al cerrar se da vuelta la pared: el juego adelanta el tiempo para que veas cómo terminó el crédito. |
| **1.1** | Día 2, antes de abrir | Doña Nieves entra antes que la cola, con su balance recién hecho y una fila de gente detrás que se lo pidió. Doña Teresa: «Ayúdala, que esto también es trabajo nuestro». Tú sellas qué va a decidir cada persona y le das la hoja que necesita. Cierra Doña Teresa con la decisión del banco. |
| **1.2** | Día 2, la cola | Doña Teresa abre la ventanilla y cuenta por qué se revisa la norma: el año pasado el auditor del banco observó balances que citaban normas que no correspondían. Desde la decisión nueva de Ronald, suma la hoja de observación: «Una norma bien puesta no garantiza que el balance diga la verdad». |
| **1.3** | Día 2, última carpeta | El giro. Doña Teresa trae la hoja nueva del manual y la justifica con 1985. Entra el carpintero con su sierra. |
| **Cierre** | Día 2, noche | Se da vuelta la pared. Doña Teresa dice dos líneas. Si algo falló, «mañana» es la jornada de repaso (Día 3 en adelante). |

### N1.2 Para 1.1: las cinco personas que no son el banco

Cada persona dice **qué le pasa**, nunca quién es ni qué va a decidir. **Nombre que ve el alumno: sólo el
nombre** («Doña Elena»), sin el rol. El rol va aparte, para el registro del docente (ver N1.5, cambio 4).

**Palabras que ninguna frase puede tener** (para una prueba en la construcción): los nombres de los roles
(inversionista, socio, accionista, proveedor, gerente, gerencia, SIN, Impuestos, fisco, inspector,
empleado) y las palabras de las decisiones del Cuadro 1 (aportar, retirar, capital, contado, 30 días,
invertir, contratar, fijar precios, verificar, base imponible, declarada, permanecer, negociar).

Nombres sugeridos (uno por rol, fijo por rol en todas las versiones para que el registro se lea fácil;
si se prefiere sortearlos también, son sólo texto): Don Hugo (inversionista), Doña Elena (proveedor),
Rodrigo (gerencia: el hijo de Doña Nieves, que maneja la tienda), la licenciada Aguilar (SIN), Wilma
(empleada).

**Inversionista** · decide aportar o retirar capital · mira rentabilidad sostenida y patrimonio
1. «Hace cinco años puse mis ahorros en esta ferretería, y cada diciembre me toca una parte de lo que gana. Mi hermano dice que saque lo mío y me compre un minibús.»
2. «Me ofrecen entrar con una parte del negocio si pongo plata para abrir otra tienda en Tolata. Antes quiero saber si esto gana de verdad, un año tras otro.»
3. «Fundé esta ferretería con Doña Nieves y la mitad es mía. Estoy pensando si sigo metiendo plata o si saco lo que me toca.»

**Proveedor** · decide vender al contado o a 30 días · mira capacidad de pago de corto plazo
1. «Cada mes les traigo cemento de la fábrica. Ahora me piden que les deje la carga y les cobre el mes que viene.»
2. «Les entrego clavos y tornillos desde hace años. El último pedido me lo pagaron tarde, y el que viene es el doble.»
3. «Me encargaron veinte rollos de alambre para la siembra. Si se los dejo sin cobrar, ¿me van a poder pagar cuando vendan?»

**Gerencia** · decide invertir, contratar, fijar precios · mira márgenes por línea de negocio
1. «Cada mañana abro la tienda y cuadro la caja. Vendemos mucha pintura, pero no sé si con ella ganamos algo o sólo movemos plata.»
2. «En diciembre la gente hace fila en el mostrador y somos dos para atender. Soy yo quien organiza la tienda, y no sé si nos alcanza para sumar a alguien.»
3. «Nos ofrecen una mezcladora para alquilarla a los constructores. La compraría la ferretería, y la última palabra es mía.»

**SIN** · decide verificar la base imponible declarada · mira utilidad antes de impuestos
1. «Traigo el formulario que la ferretería presentó en abril. Quiero ver si lo que pusieron ahí coincide con lo que dice su balance.»
2. «Mi oficina revisa este mes a los comercios de la provincia. Según sus papeles la ferretería casi no ganó nada, y tiene el depósito lleno.»
3. «Tengo una orden de fiscalización con el nombre de la ferretería.»

**Empleado** · decide permanecer o negociar condiciones · mira continuidad y resultados del periodo
1. «Trabajo en el depósito hace ocho años. Me ofrecieron un puesto en una ferretería de Punata y tengo que responder el lunes.»
2. «Somos seis en la tienda y este año no hubo aumento. Doña Nieves dice que las ventas bajaron; quiero verlo con mis propios ojos antes de hablar con ella.»
3. «Me ofrecieron otro trabajo, con menos sueldo pero seguro. Quiero saber si esta ferretería va a seguir abierta el año que viene.»

**Cómo se revisó que no se confundan:** «saco lo mío» (inversionista) no usa «quedarse», que sonaría a
empleado; la mezcladora dice «la compraría la ferretería», para que no suene a alguien que pone su plata;
el proveedor siempre habla de mercadería que entrega. **La frase 3 del SIN es la más fácil a propósito:**
conviene que la versión la saque poco (o sólo como segunda frase de B1.3, cuando vuelve una persona).

**Reacciones, iguales para todos** (se sortean; no dicen si fallaste en el sello o en la hoja, y no dicen
cuál era):
- Se va conforme: «Con esto ya sé qué hacer. Gracias.» · «Justo lo que necesitaba ver.» · «Esto me
  contesta. Me voy tranquila.» (o «tranquilo», según el personaje).
- Se va sin lo que necesitaba: «Con esto no decido nada de lo mío.» · «Esta hoja no me contesta lo que
  vine a preguntar.» · «Me voy igual que llegué.»

La pista que diferencia sello de hoja (B1.3: «La decisión es esa. Pero ¿qué parte del balance le contesta
su pregunta?») la da **el juego**, no la persona. Aviso para el crítico: esa pista confirma que el sello
estaba bien; es aceptable porque la persona ya se fue y la siguiente es otra.

**Doña Teresa cierra 1.1** (reemplaza a `CIERRA_T11`): «El mismo papel, cinco preguntas distintas. La
nuestra es otra: si le prestamos, cuánto y a qué tasa. Abramos la ventanilla.» (Si la versión trajo
tres personas, «tres preguntas»: el número sale del sorteo, no escrito a mano.)

### N1.3 Para 1.2: lo que dice el cliente, sin delatar el dictamen

Salen de los «Qué NO se puede afirmar» del dossier: 1.2 (pág. 10), 1.1 (pág. 5) y 1.3 (pág. 15). Cada
frase es algo que el cliente cree y que el dossier dice que **no** se puede afirmar; ninguna dice si el
balance está bien o mal. Para que no contradigan la nota del contador, van en tres grupos:

**Grupo A · con cualquier nota**

| Frase | De dónde sale |
|---|---|
| «Aquí tienes el balance que preparó mi contador.» | neutra |
| «Te traigo el balance del año. Lo necesito para el préstamo.» | neutra |
| «Mi contador me dijo que te lo entregue en mano.» | neutra |
| «Mi contador dice que lo que aprueba el CTNAC es ley, y él lo cumple al pie de la letra.» | 1.2, Qué NO 3 (y Error 2) |
| «Mi contador ya lo prepara para las normas nuevas del 2027. Más al día, imposible.» | 1.2, Qué NO 4 |
| «Está completito, no le falta ni una hoja.» | 1.1, Qué NO 4 (cumplir la forma no es ser confiable) |
| «Cumple todas las normas. Con eso ya sirve, ¿no?» | 1.3, Qué NO 1 |

**Grupo B · sólo si la nota cita una NIIF** (sale igual con la nota bien hecha del flujo y con la mal
hecha que cita la NIIF habiendo NC)

| Frase | De dónde sale |
|---|---|
| «Mi contador dice que Bolivia ya adoptó las NIIF, como Brasil y Argentina.» | 1.2, Qué NO 1 (y Error 1) |
| «Mi contador buscó y dice que para esto no hay norma boliviana.» | 1.2, Qué NO 2 |

**Grupo C · sólo si la nota cita una NC** (sale igual con la correcta y con la equivocada)

| Frase | De dónde sale |
|---|---|
| «Mi contador trabaja sólo con normas bolivianas. Dice que se las sabe de memoria.» | del juego |

**Excluida en las carpetas con defecto de oportunidad (N1.4):** «Te lo entregué a tiempo, antes que
nadie» (1.3, Qué NO 4). Con esa carpeta la frase delataría el sello. En las demás puede sumarse al grupo A.

**Justificación de la nota del contador** (la forma única de B1.4, «Registrado según la [norma].
[Justificación].»), también sorteada aparte del dictamen:
- Con NIIF: «Porque ninguna NC boliviana lo regula.» · «Como Bolivia ya adoptó las NIIF.»
- Con NC: «Por ser la norma boliviana vigente.» · sin justificación.

**Aviso para el crítico:** con la forma única, la nota bien hecha del flujo puede decir «como Bolivia ya
adoptó las NIIF», que es una afirmación falsa en una nota que el juego da por bien hecha. El tratamiento es
correcto aunque el contador razone mal. Conviene que el crítico diga si eso se sostiene en la defensa o si
esa justificación se limita a las notas mal hechas (a costa de volver a delatar).

### N1.4 La hoja de observación: los papeles de la carpeta de 1.2

Cada carpeta de 1.2 trae **siempre** un papel más (también las sanas; si sólo lo trajeran las que tienen
defecto, el papel mismo delataría). Está escrito como lo vería el oficial: un hecho en un papel, sin
señalar nada y sin la palabra de la característica.

| # | Lo que ve el oficial | Falla | Nivel | Dossier | Nota |
|---|---|---|---|---|---|
| 1 | Carta del cliente: «Ofrezco en garantía mi galpón, que vale Bs 150.000 según la minuta de compra de 2009.» No hay otro valor en la carpeta. | Relevancia | Fundamental | 1.3, ejemplo comentado y Qué NO 1 (pág. 15) | Es un papel del cliente, no una cifra del balance: así no choca con la NC 3 de 1.2. El monto sale de la versión |
| 2 | Para respaldar el crédito de su panadería, el cliente adjunta con orgullo el balance de la fraternidad de la entrada que él preside. | Relevancia | Fundamental | definición, pág. 13; glosario | Del juego, con humor. Pide al crítico que vea si alguien lo leería como representación fiel |
| 3 | Carta de otra entidad financiera: «Le recordamos su cuota vencida.» En el pasivo del balance no figura ninguna deuda con esa entidad. | Representación fiel | Fundamental | Enron (1.1, pág. 5) y definición, pág. 13 | Sin nombre de la entidad (no la cooperativa de enfrente, que es otra cosa en la historia) |
| 4 | En cuentas por cobrar: Bs 40.000 de «Transportes El Rápido». En la carpeta, un recorte del periódico: esa empresa cerró hace un año. | Representación fiel | Fundamental | pág. 13 y Error 2 de 1.3 (previsión por incobrables, pág. 16) | Del juego. El monto sale de la versión |
| 5 | Solicitud del cliente fechada en marzo: «Urgente, es para la siembra.» El balance que la respalda llegó recién en julio. | Oportunidad | Mejora | ejemplo inmediato, pág. 13 | Con esta carpeta no sale la frase «Te lo entregué a tiempo» |
| 6 | Nota de inventarios: «Valuados con el método que el contador creyó conveniente.» No dice cuál ni por qué. | Verificabilidad | Mejora | 1.2, Análisis metodológico, paso 4 (pág. 10) | Sobre inventarios, nunca sobre la operación marcada |
| 7 | Este año los fletes están dentro del costo de ventas; el año pasado iban aparte. La columna del año pasado no se rehízo. | Comparabilidad | Mejora | pág. 13 y glosario | Cambia el 04: el «cambió el método de depreciación sin explicarlo» es también un tema de la NC 13 y se mezcla con 1.2 |
| 8 | Nota 7: «Se procedió al reconocimiento del devengamiento diferido de partidas conexas conforme a criterio prudencial vigente.» El cliente te pregunta qué quiere decir. | Comprensibilidad | Mejora | glosario y pág. 13 | Del juego |

**Papeles sanos** (la carpeta sin defecto, «nada que observar»):
- S1: Portada: «Balance al 31 de diciembre. Entregado en marzo, junto con la solicitud.»
- S2: Carta del cliente: «Ofrezco en garantía mi camioneta. Adjunto el avalúo del perito, de este mes.»
- S3: Nota de inventarios: «Valuados al costo promedio ponderado, igual que el año pasado.»

**Dos avisos que salen de escribir los papeles:**
1. **Casi cualquier defecto se puede leer como una falla de alguna NC** (la NC 11 pide información
   esencial; la NC 13, explicar los cambios). Para que el alumno no dude entre el sello de la norma y el
   de la calidad, el manual tiene que decir en una línea: «La norma se revisa en la operación marcada.
   La hoja de observación, en el resto de la carpeta». Doña Teresa lo dice al abrir la jornada (N1.5).
2. **El papel 1 y la regla de 1.3 dicen lo mismo con otras palabras** (una garantía con un valor viejo no
   sirve). Es bueno: 1.2 lo siembra y 1.3 lo hace calcular. Pero si el papel 1 sale en la misma jornada,
   anticipa el giro. Recomendado: el papel 1 sólo en jornadas de repaso, no en la jornada principal.

### N1.5 Qué cambiar en `guion-tema1.ts` (y dos cosas de `tema1.ts`)

Sin tocar los archivos. Por orden de importancia:

| # | Dónde | Hoy | Propuesta | Por qué |
|---|---|---|---|---|
| 1 | `PERSONA[p].nombre` | «Doña Elena, le vende clavos y tornillos a la ferretería» | Sólo «Doña Elena»; el rol va a otro campo que lee sólo `describir` (registro del docente) | La pantalla lo muestra arriba de la frase (`EscenaVentanilla.tsx`, línea 285): **dice el rol**, que es la respuesta |
| 2 | `diceClienteT12` | «Bolivia ya adoptó las NIIF» sólo en las carpetas para devolver | El grupo de frases de N1.3, sorteado aparte de la nota | Delator de B1.4 y A1.3 |
| 3 | `aciertoNC` | «…así que la NIIF entra como supletoria.» | «Bien: la rige la NC 10.» / «Bien: ninguna NC la regula.» | Adelanta el dictamen (B1.4) |
| 4 | `ABRE_T11` | Tres personas llegan al banco pidiendo el balance de la ferretería | «Antes de abrir entra Doña Nieves, de la Ferretería San Isidro, con el balance que le acaba de entregar su contador. Detrás de ella, gente que se lo pidió. "Yo sé vender clavos, no leer balances. ¿Me ayudas a darle a cada uno lo que necesita?"» | Un banco no reparte los papeles de sus clientes; la escena parecía salida de la nada |
| 5 | `PERSONA` (dice, otraVez) | Tres personas fijas, dos frases | Las cinco de N1.2, tres frases cada una | Varía por alumno (regla del 27-09) |
| 6 | `AYUDA_T11.concreta[1]` | «El que vende quiere saber si le pagan; el socio…; el fisco…» | «Piensa qué va a hacer esa persona mañana con lo que lea: ¿cobrar algo, poner o sacar plata, quedarse en su trabajo, decidir algo de la tienda?» | Hoy es la clave de las tres personas fijas; con cinco al azar ya no sirve y la pista tiene que ser una pregunta |
| 7 | `LLEGADA[0]` | «Bienvenido a la agencia…» | «Te damos la bienvenida a la agencia de Cliza del Banco Kusi. Aquí decides cuánto prestarle a cada cliente.» | Sin género |
| 8 | `LLEGADA` (agregar una línea) | La cooperativa de enfrente no se presenta | «¿Ves la cooperativa de enfrente? Si le prestas de menos a un buen cliente, se va allá. Y si le prestas a uno que no puede pagar, vuelve aquí a no pagar.» | El cierre la nombra sin que nadie la haya presentado |
| 9 | `PARED_PRIMERA` | «Esa noche se da vuelta la pared… Doña Rosa pagó sus cuotas.» | «Esta es la pared. Aquí adelantamos el tiempo: cada ficha te muestra cómo terminó el crédito. Doña Rosa pagó todas sus cuotas.» | Nadie paga todas sus cuotas en una noche |
| 10 | `ABRE_JORNADA` (agregar) | Sólo la norma | «El año pasado el auditor del banco nos observó balances con normas que no correspondían. Desde entonces se revisa la operación marcada. Y mira el resto de la carpeta: hay defectos que se anotan y defectos que tumban un balance.» | Justifica la regla y presenta la hoja de observación sin decir la jerarquía, que tiene que traer el alumno |
| 11 | `HOJA_NUEVA` | «…una hoja nueva del manual: reemplaza a la regla de ayer.» | «Última carpeta del día. Antes, una hoja nueva del manual. Yo empecé de cajera en el 85, cuando los billetes se contaban por bultos. Desde entonces, aquí una garantía vale lo que valdría hoy, no lo que costó.» | La regla nueva tiene un motivo en la historia, y es el ejemplo del dossier (pág. 15) |
| 12 | `RECUERDA_REGLA` | «Recuerda la regla del Tema 1:» | «Recuerda la hoja nueva de tu manual:» | «Tema 1» rompe la ficción |
| 13 | `aciertoHoy` (agregar al final) | | «Con el valor de libros habrías decidido con un número que ya no dice nada de hoy.» | Nombra la relevancia sin decir la palabra: criterio 3 de la rúbrica |
| 14 | `diceClienteT13` | Una frase | Dos más, sorteadas, con los mismos números de la carpeta: «Mi sierra rindió más que un ahorro en el banco: de Bs X a Bs Y.» · «Si hoy vendo la sierra me pagan Bs Y. Eso ya es ganancia, ¿no?» | Todas salen del Qué NO 2 de 1.3; que no sea la misma frase para todos |
| 15 | `pideLinea` | Línea libre | Línea guiada: «Antes de que se vaya, termina la frase: "Tu sierra no te hizo ganar Bs X, porque…"» | Acorta el teclado de texto en el celular (B1.7) y deja evidencia comparable para la defensa |
| 16 | `FINAL` | «…quién lee un balance, con qué norma se hizo y en qué unidad de medida está.» | «…quién lee un balance, con qué norma se hizo, si dice la verdad y en qué unidad de medida está.» | Suma la calidad, que ahora entra |
| 17 | `CLIENTES_T12` (en `tema1.ts`) | «Don Efraín, transporte» y «Don Ramiro, ferretería» | «Don Gregorio, transporte» y «Don Ramiro, imprenta» (o cualquier rubro que no sea ferretería) | Don Efraín es el director de Los Cóndores de Cliza en la maqueta (Tema 4); y con la Ferretería San Isidro en 1.1, otra ferretería en 1.2 confunde |
| 18 | Tema 2.1 de la maqueta (no es código) | «doña Rosa, de una ferretería» | Otro nombre y otro rubro cuando se diseñe el Tema 2 | Doña Rosa ya es la clienta de la moto. Se cambia el Tema 2, que no está construido, y no el 1, que sí |

**Lo que no conviene tocar:** `LUGAR`, `JEFA`, `LLEGADA[1]` («Si no prestas, cierra; si prestas mal,
también»), `queFuePaso` y los textos del repaso: están bien y se leen en voz de Doña Teresa.

**Qué se rompe al cambiarlos:** los cambios 1 a 16 son textos, así que lo guardado no se pierde. El 1
cambia lo que ve el docente en el registro si `describir` sigue usando `nombre`: por eso el rol va a un
campo aparte. El 17 cambia el nombre del cliente de 1.2 en el registro de quien ya jugó (el nombre se
calcula, no se guarda); hoy es borrador y casi nadie jugó, así que es aceptable, pero se avisa.

### N1.6 Avisos para otras partes

- **`critico-de-jugabilidad` (etapa 5):** revisar que las frases de N1.2 no se confundan entre usuarios
  (sobre todo gerencia 3 con inversionista, y proveedor con banco); el papel 2 de N1.4 (¿relevancia o
  representación fiel?); la justificación «como Bolivia ya adoptó las NIIF» en una nota bien hecha
  (N1.3); y que los montos de los papeles 1 y 4 salgan de la versión.
- **Construcción (etapa 6):** una prueba que busque las palabras prohibidas de N1.2 en todas las frases;
  la prueba de independencia de B1.4 extendida a los grupos A, B y C de N1.3; el papel 1 de N1.4 sólo en
  repasos.
- **`disenador-de-aprendizaje`:** el defecto de comparabilidad del 04 (A1.1) cambia de «método de
  depreciación» a «fletes reclasificados» (N1.4, papel 7).
