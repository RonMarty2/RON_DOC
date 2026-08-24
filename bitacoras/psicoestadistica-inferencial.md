# Bitácora — Psicoestadística Inferencial

**Herramienta:** Aula Interactiva de Probabilidad (`/aula-probabilidad`)
**Unidad del dossier:** Unidad 2 — Probabilidad y distribución de probabilidad
**Fuente del material:** `TEMA 2 — DOSSIER.pdf` + `TEMA 2 — DIAPOSITIVAS.pdf` (subidos por el docente)
**Última actualización:** 2026-08-19 (Unidad 2 completa + revisión didáctica)

---

## Decisiones tomadas

| Fecha | Decisión | Por qué |
|---|---|---|
| 2026-08-17 | Reemplazar el dataset narrativo "Andrea" (60 estudiantes ficticios) por el dataset real PTSMU (200 estudiantes, PHQ-9/GAD-7/Dx confirmado) | Los números deben coincidir exactamente con el dossier real (sensibilidad 88%, VPP 51.2%), no con una historia paralela |
| 2026-08-17 | Construir la Aula en fases: 2.1–2.6 primero (fundamentos + Bayes), 2.7–2.9 después (distribuciones) | Evitar abarcar demasiado de una vez; el docente se trababa justo en el salto de fundamentos a Bayes |
| 2026-08-17 | Patrón fijo por módulo: ejemplo clásico (dados/cartas/urnas) → aplicado a psicología (dataset real) | Pedido explícito: "siempre estén donde deban estar, pero después uno aplicado a psicología" |
| 2026-08-18 | Sacar la guía de clase colapsable del inicio | El docente quiere entrar directo al contenido, sin nada antes |
| 2026-08-18 | Estructura estilo libro: Definición (corta, sin caja de color) → interactivo que la ejemplifica, repetido por cada término | "Debería ser como un libro: definir, después ejemplificar de manera interactiva" — para que también sirva a estudiantes que lo usan de forma autónoma, sin el docente presente |
| 2026-08-18 | Publicar directo a `main` en cada iteración visible | El docente revisa el avance desde el celular en tiempo real |
| 2026-08-19 | Materia propia **Psicoestadística Inferencial** (`/materias/psicoestadistica-inferencial`); la herramienta deja de colgar de Descriptiva | La herramienta es de Inferencial; Descriptiva tendrá su propia herramienta más adelante |
| 2026-08-19 | Agregar preámbulo **"El misterio"** como primera pestaña, con predicción obligatoria antes de revelar | Faltaba enganche: se entraba directo a "2.1 Espacio muestral" sin saber por qué importa. Equivocarse uno mismo pega más que leer el dato |
| 2026-08-19 | Agregar sección **"El caso"** entre el preámbulo y 2.1 | La herramienta usaba PHQ-9/GAD-7 en todos lados sin explicar nunca qué son |
| 2026-08-19 | Explicar tamizaje con la **analogía del detector de metales**, y hacer que el visitante **arme un puntaje** tocando los 9 ítems | Las siglas en inglés y la palabra "tamizaje" confunden. La analogía instala de entrada que las falsas alarmas son normales, no un defecto |
| 2026-08-19 | **Sacar** sensibilidad, especificidad y prevalencia de la introducción → van a 2.3 | Son tres fracciones con denominadores distintos que suenan parecidas: definirlas juntas y en abstracto es la causa principal de que se mezclen. En 2.3 la tabla hace visible cada denominador |
| 2026-08-19 | Evento seguro / imposible se descubren desde el armador de eventos (0 caras y 6 caras) | Enseñar los dos extremos de la escala manipulándolos, en vez de enunciarlos |
| 2026-08-19 | **Regenerar el dataset** para que además de la tabla de contingencia cumpla media 6.32 y desviación 4.64, incluya `expedienteCompleto` y datos de demanda semanal | 2.9 calcula z = (10 − 6.32)/4.64, y 2.8 necesita K = 9 expedientes incompletos y λ = 5 solicitudes/semana. El dataset anterior daba media 5.84 y sd 6.30: los apartados finales no habrían coincidido con el dossier |
| 2026-08-19 | **Mejora aplicada a todos los apartados: componente `Formula`** — notación simbólica y sustitución numérica lado a lado | Era un pedido anterior que nunca se había implementado. Ver los dos lados en paralelo evita que los símbolos queden de adorno |
| 2026-08-19 | **Mejora aplicada a todos los apartados: componente `Trampa`** — error común, por qué ocurre, cómo corregirlo | El dossier trae estas trampas en cada apartado y son de lo más valioso pedagógicamente; estaban ausentes |
| 2026-08-19 | **Mejora aplicada a todos los apartados: componente `Puente`** — qué queda abierto y hacia dónde sigue | Convierte una lista de temas sueltos en un hilo continuo. 2.9 cierra volviendo al misterio del inicio |
| 2026-08-19 | 2.3 usa un selector de preguntas que ilumina numerador y denominador en la tabla 2×2 | Es la forma de que sensibilidad, especificidad y VPP dejen de confundirse: se ve que comparten numerador y cambian de denominador |
| 2026-08-19 | 2.9 termina con un punto de corte movible que recalcula sensibilidad, especificidad, VPP, derivaciones, casos perdidos y falsas alarmas | Cierra el capítulo devolviendo la decisión al lector y reconectando todo lo construido desde 2.1 |
| 2026-08-19 | **Auditoría didáctica** tras revisión del docente: se veía genérico, poco didáctico, con términos usados sin explicar y fórmulas sin desarrollo | Diagnóstico verificado por conteo: µ y σ aparecían 11 veces sin definirse; «corrección de continuidad» aparecía sólo dentro de una trampa, advirtiendo sobre un procedimiento nunca enseñado; el ejemplo de aproximación normal a la binomial se había perdido entero |
| 2026-08-19 | Componente **`Desarrollo`**: la cuenta línea por línea, con explicación de cada movimiento, revelada de a un paso | Era el reclamo central: «fórmulas que se muestran pero no se ve el cálculo». Ej. en 2.4 faltaba justo el paso de expandir 43! sólo hasta 38! para cancelar |
| 2026-08-19 | Componente **`FormulaAnotada`**: cada parte de la fórmula etiquetada y explicada | En Bayes se ve cuál término es la prevalencia, cuál la sensibilidad y cuál el denominador que hay que construir |
| 2026-08-19 | Componente **`Termino`**: glosario en línea con subrayado punteado | Resuelve «hablas pero no explicas» sin interrumpir la lectura: µ, σ, Σ, e, equiprobable, criterio de referencia, etc. |
| 2026-08-19 | Componente **`Comprueba`**: 1–2 preguntas por apartado con corrección inmediata Y explicación de cada opción | Antes nadie producía nada: todo era «mirá cómo pasa». La recuperación activa es lo que fija el concepto, y sirve igual en clase que para quien estudia solo |
| 2026-08-19 | **Bloques temáticos con color** (Antes de empezar · Fundamentos · Herramientas de cálculo · El clímax · Distribuciones) + barra de progreso + pasos numerados | La navegación eran 11 píldoras sueltas sin jerarquía; no se veía el recorrido |
| 2026-08-19 | **Restaurada** la aproximación normal a la binomial en 2.9, con la corrección de continuidad explicada y comparada contra omitirla | Estaba en el dossier, se había perdido, y quedaba una trampa advirtiendo sobre un error de algo nunca enseñado |
| 2026-08-19 | Subir la práctica de 1 a **2–3 preguntas por apartado** (22 en total) | Una sola pregunta por apartado era poco para cubrir los distintos errores típicos. 2.3 y 2.6 llevan tres por ser el núcleo conceptual |
| 2026-08-19 | La tabla de esperanza y varianza de **2.7 pasa a ser interactiva**: los términos se calculan de a uno y la fila Σ se acumula a la vista | Era el único módulo con un cálculo mostrado ya resuelto. Ahora se ve que una Σ no es más que acumular un término por valor posible — y que mientras la suma de probabilidades no llegue a 1, falta un valor |
| 2026-08-19 | Corregir el mensaje del simulador de dado (y de la moneda y el tamizaje) **cuando hay pocas tiradas** | Con 1 tirada decía «la cara 1 salió más veces: 100%», que no significa nada y sugiere lo contrario de lo que se quiere enseñar. Ahora, por debajo de 30 tiradas, avisa que los porcentajes todavía no dicen nada y muestra la brecha entre la cara que más y la que menos salió, para que se vea achicarse al tirar más |
| 2026-08-19 | Componente **`Ejemplos` / `Ejemplo`**: cada definición ofrece ejemplos concretos a pedido, con un botón | Faltaba lo que el docente señaló: se definía un concepto y no se mostraba ningún caso, o se mostraba uno solo que había que extrapolar. Son 57 ejemplos en los 10 apartados; espacio muestral y eventos llevan los suyos con todos los elementos listados |
| 2026-08-19 | **Navegación compacta en móvil**: una sola píldora con el apartado actual y un desplegable | En Android el menú ocupaba media pantalla antes de llegar al contenido |
| 2026-08-19 | **`Termino` reposicionado con `position: fixed`**, y se cierra al desplazarse, al tocar fuera, al girar la pantalla o con Escape | En Android quedaba abierto al hacer scroll y se despegaba de la palabra |
| 2026-08-19 | **Proyecto listo para Android Studio** con Capacitor: `npm run build:android` y `npm run android:abrir`; carpeta `android/` versionada; instrucciones en `LEEME-ANDROID.md` | El sitio se va a distribuir además como app nativa. El build de Android fuerza el prefijo de ruta vacío, porque dentro de la app no existe `/RON_DOC` |
| 2026-08-19 | **Recordar el último apartado visitado** en el almacenamiento del navegador, con aviso al retomar y botón «empezar desde el inicio» | Para probar la herramienta había que navegar todo el recorrido cada vez. Arranca siempre en el preámbulo la primera vez (y así lo ve cualquier estudiante nuevo), pero al volver retoma donde se quedó |
| 2026-08-19 | **Auditoría de responsividad** para Android: se revisaron los 11 apartados buscando anchos fijos, tablas sin desplazamiento, grillas no responsivas y objetivos táctiles chicos | La herramienta se va a usar en celular y como app nativa, no sólo en proyector |
| 2026-08-19 | **El caso no conectaba con probabilidad.** Se agrega al cierre una sección que responde «¿y qué tiene que ver esto con probabilidad?»: las 200 fichas como grilla, tres preguntas que al tocarlas iluminan las fichas que cumplen, y el conteo resultante | Reclamo textual del docente: «hasta ahora no entiendo qué tiene que ver con probabilidades». Se explicaba el instrumento pero nunca se decía que **toda** probabilidad del capítulo es un conteo sobre esas fichas. La tercera pregunta da 22/43 = 51.2%, o sea el número del misterio |
| 2026-08-19 | **Regla nueva: ningún dato se usa sin haberse presentado en «El caso».** Se agregan tres bloques: los dos números del caso (2.400 de la universidad contra 200 fichas), el estado del expediente como cuarto dato de la ficha, y el segundo archivo con las solicitudes semanales | El docente detectó que el 2.400 aparecía de la nada y contradecía a las 200. La auditoría encontró el mismo error dos veces más: «expediente incompleto» y «solicitudes por semana» sólo existían en 2.8, sin ninguna presentación previa |
| 2026-08-19 | **BUG corregido: los simuladores se congelaban.** Dos causas: carrera de doble toque (el guard usaba estado asíncrono, así que dos toques arrancaban dos animaciones y se limpiaba el temporizador equivocado) y estrangulamiento de temporizadores en segundo plano (la bandera quedaba en true y los botones no volvían a habilitarse) | Reportado por el docente. La corrección es la misma en los tres: guard en un ref, id del temporizador en variable local, resultado decidido antes de animar y red de seguridad que cierra la tirada aunque el temporizador se pause |
| 2026-08-19 | **Panel de datos del caso** accesible desde cualquier apartado, con la tabla 2×2, los tres indicadores, la prevalencia y los parámetros de 2.9 | Dando clase había que volver atrás constantemente. La medición encontró una veintena de puntos donde un apartado remite a otro |
| 2026-08-19 | **La navegación deja de ser una barra pegajosa.** En pantallas de 1440px o más pasa a ser un riel vertical fijo a la derecha, en el margen que el contenido no usa; más angosto no queda nada fijo arriba y el menú se abre desde un botón flotante abajo a la izquierda | El docente: «me molesta mucho ese menú al bajar y subir». Eran cuatro filas de píldoras siguiendo el desplazamiento: unos 130px de alto permanentes, cerca del 15% de la pantalla de un portátil. El riel no roba alto y además hace más legible en qué punto del recorrido está uno |
| 2026-08-19 | **Diagnóstico de fondo: faltaba la explicación, no el contenido.** La secuencia de un apartado era definición → definición → interactivo, sin una sola línea que los uniera. El hilo había que inventarlo hablando | El docente lo describió como «sentía que no estaba bien explicado» sin poder señalar dónde. La estructura lo mostró: la herramienta entregaba las piezas, no la explicación |
| 2026-08-19 | Tres componentes nuevos aplicados a los diez apartados: **`Hilo`** (la frase que conecta un bloque con el siguiente), **`Cierre`** (la conclusión de cada interactivo escrita en palabras) e **`IndiceApartado`** (los pasos numerados, para saltar dentro sin desplazarse a ciegas). 33 bloques de prosa nuevos | Pedido explícito: «necesito que esté todo ahí, la explicación todo, yo leeré o me inspiraré en lo que dice para ampliar». La herramienta tiene que poder leerse de corrido |
| 2026-08-19 | **Orden corregido en ocho apartados**: la trampa con el error típico aparecía DESPUÉS de las preguntas de práctica | Se evaluaba antes de advertir. Además había dos preguntas seguidas sin nada en medio; ahora la trampa las separa |
| 2026-08-19 | **Analogía pedida: cada pregunta es un dado de cuatro caras**, y responder el cuestionario es tirar nueve y sumar | Conecta los dados de 2.1 con el cuestionario, y hace que el rango 0–27 se deduzca en vez de memorizarse. Incluye dónde se rompe la analogía: las caras de un dado son equiprobables y las opciones no |
| 2026-08-19 | Los **axiomas de 2.2 pasan a ser visuales**: una barra que representa el espacio muestral entero, partida en positivos y negativos, y cada axioma se demuestra señalando algo de esa barra | «No hay ejemplos visuales y/o interactivos». Eran tres párrafos de texto con una comprobación numérica al final |
| 2026-08-19 | **Regla del complemento sobre las fichas**: se elige el evento y con un botón se ve el complemento darse vuelta, cuadradito por cuadradito | «Muy general, no se entiende». El desarrollo simbólico solo no alcanzaba |
| 2026-08-19 | **2.3 gana un ejemplo numérico completo** con datos distintos (ensayo clínico de 100 pacientes): la tabla, y las tres probabilidades calculadas, incluida la condicional al revés | «No veo ejemplos numéricos». Los ejemplos eran sólo nombres de tablas posibles, sin un solo número |
| 2026-08-19 | **Diagrama de Venn para la independencia en 2.5**: los dos círculos mantienen su tamaño y sólo cambia cuánto se pisan, alternando entre lo observado y lo que se vería bajo independencia | «No veo diagramas de Venn, que se entiende muy bien con eso la dependencia/independencia». En el modo independiente P(B\|A) = 11,6% contra P(B) = 10,5% —casi iguales—; en el real, 39,5% contra 10,5% |
| 2026-08-19 | La pregunta de práctica de 2.1 decía «el servicio va a tamizar a los 2.400», lo que contradecía el caso (tamizó 200). Reformulada sobre las 200 fichas | Una pregunta de comprobación que contradice el material enseña el error en vez de corregirlo |
| 2026-08-19 | La ficha de ejemplo mostraba números pelados («0», «7») en una tabla. Se reemplaza por un **explorador de fichas** que interpreta cada valor en palabras y da el veredicto (acertó / falsa alarma / se escapó), con atajos a los cuatro casos posibles | «No entendí ese 0 y 7». Un número sin lectura no enseña nada |
| 2026-08-19 | El armador de eventos de 2.1 ahora **nombra la propiedad** del evento, no sólo enumera: {2,4,6} → «sale un número par»; {6} → «par y múltiplo de 3» | Pedido del docente. Enseña además la distinción entre describir por enumeración y por comprensión, y cuando el conjunto no responde a ninguna propiedad simple lo dice explícitamente |
| 2026-08-19 | **Error de diseño corregido en el histograma del tamizaje**: las casillas mostraban el conteo si era mayor que cero y el puntaje si era cero, así que los números significaban dos cosas distintas y era imposible distinguirlas. Ahora es un histograma de barras con el puntaje siempre abajo y el conteo arriba | «No entiendo este». Convivían en la misma grilla un «5» (cinco estudiantes) y un «13» (puntaje trece) sin forma de saber cuál era cuál |
| 2026-08-19 | Las **barras de distribución** (2.7 y 2.8) tenían `flex-1` sin mínimo: con n = 40 quedaban de 7,8 px en una pantalla de 360 px, ilegibles. Ahora tienen ancho mínimo y el gráfico se desplaza en horizontal | Era el peor problema de la auditoría: el gráfico principal de dos apartados quedaba inutilizable en celular |
| 2026-08-19 | Etiquetas de deslizador (`w-28`/`w-32`) **apiladas sobre el control en móvil** | Se comían un tercio del ancho y dejaban el deslizador sin recorrido útil |
| 2026-08-19 | Tabla 2×2 de 2.3 con celdas más chicas en móvil; fila de frecuencias del dado más angosta; botoneras con ajuste de línea | Ajustes para que nada quede al borde del desbordamiento en 360 px |
| 2026-08-19 | **Service worker desactivado dentro de la app nativa**, y se da de baja si quedó uno de una versión anterior | Dentro de la app los archivos ya viajan empaquetados: el service worker no aporta nada y su caché sobrevive a la actualización, con lo que serviría la versión vieja del contenido |
| 2026-08-19 | `viewportFit: "cover"` en el viewport | Para que el contenido llegue a los bordes en celulares con muesca |
| 2026-08-21 | **El riel de apartados ya no se decide con un punto de corte de ancho de ventana (`min-[1440px]`) sino midiendo el margen real** que sobra al costado de la columna de texto (`useHuecoRiel`). Si el hueco no alcanza para un riel legible, el riel no se dibuja y manda el botón flotante | «Se ve mal si alguien hace zoom, no es responsivo autoajustable». El punto de corte miraba la ventana, no el margen: a 1440 px el margen es de 208 px y el riel pedía 240, así que se dibujaba cortado contra el borde |
| 2026-08-21 | El umbral del riel está en `em` (14,5 em), no en píxeles, y el riel se **centra** en el hueco | Así también se adapta cuando el navegador agranda sólo el texto: con la letra grande la columna de contenido crece, el margen se achica y el riel se retira solo |
| 2026-08-21 | El riel y el menú flotante se dibujan con `createPortal` sobre `document.body` | `position: fixed` cambia de marco de referencia si cualquier contenedor tiene `transform` o `backdrop-filter`; en el portal la posición no depende de ningún ancestro |
| 2026-08-21 | **Desbordamiento horizontal de TODO el sitio en celular, corregido en el encabezado**: las cinco secciones más el nombre piden unos 570 px y una pantalla Android típica tiene 360. Ahora los enlaces viven en una tira que se desplaza sola | Medido: `scrollWidth` 516 contra 360 de ancho útil, en todas las páginas. Era la causa de fondo de la sensación de «no es responsivo»: la página entera se corría en horizontal |
| 2026-08-24 | **La escalera estaba invertida y se reconstruyó entera.** El capítulo abría pidiendo estimar P(depresión \| dio positivo) —la conclusión del apartado 2.6— y seguía con un módulo de 1.006 líneas que instalaba de golpe el tamizaje, el criterio de referencia, los cuatro campos de la ficha, las 200 fichas y un segundo archivo. El dado, el objeto más simple, aparecía tercero | «¿Por qué iniciamos con un ejemplo tan denso? ¿No deberías iniciar con sus partes individuales e ir complicando según entienda los conceptos?». Estaba armado como un reportaje (gancho → contexto → explicación); un libro necesita lo contrario, que el objeto crezca |
| 2026-08-24 | **Regla nueva y verificable: ningún dato aparece antes del apartado que lo usa.** Medido antes del cambio: el diagnóstico confirmado llegaba 2 apartados antes de hacer falta, el GAD-7 4 antes, el expediente y la demanda semanal 7 antes. Cuatro de los cinco objetos de datos estaban adelantados | Ahora el diagnóstico se presenta en 2.3, el GAD-7 en 2.5, el expediente y la demanda en 2.8. Hay una prueba automatizada que recorre los once apartados y falla si aparece un término antes de su módulo |
| 2026-08-24 | El preámbulo pasa de dos módulos densos («El misterio» + «El caso») a dos peldaños: **«Un dado y una pregunta»** (dado → pregunta de 4 opciones → dos preguntas → nueve → el puntaje) y **«Una ficha y un archivo»** (una ficha con UN dato → diez fichas contadas a mano → las 200) | La navegación misma muestra la escalera. Los títulos dicen qué hay adentro, en vez de anunciar un misterio |
| 2026-08-24 | `AnalogiaDados` saltaba de «una pregunta es un dado» directo a «tirá las nueve y sumá». Ahora el lector elige 1, 2 o 9 preguntas y ve crecer el rango: 0-3, 0-6, 0-27 | Ése era exactamente el peldaño faltante. Con dos preguntas además aparece que un total de 3 sale de cuatro maneras y un 6 de una sola — la primera pista del capítulo |
| 2026-08-24 | **El explorador de fichas ahora crece**: recibe qué campos ya fueron presentados (`campos={["phq9"]}` en el preámbulo, `["phq9","dx"]` en 2.3, `["phq9","gad7"]` en 2.5, `["phq9","expediente"]` en 2.8) | Es el mismo componente en los cuatro lugares. Ver la ficha llenarse enseña que el dato no estaba escondido: todavía no se necesitaba |
| 2026-08-24 | **El panel flotante 📌 también crece.** Mostraba la tabla 2×2, sensibilidad, especificidad, VPP y prevalencia desde el primer módulo | Filtraba la respuesta del capítulo entero desde la pantalla uno. Ahora la tabla y los indicadores aparecen desde 2.3, la ansiedad desde 2.5 y µ/σ desde 2.9 |
| 2026-08-24 | `PuenteALaProbabilidad` tenía tres preguntas y dos usaban el diagnóstico confirmado — una de ellas **calculaba el VPP** dentro del preámbulo. Reemplazadas por tres preguntas del mismo tipo contestables con el puntaje solo, incluida una que cambia el denominador | Conserva la lección (mismo procedimiento, distinto universo) sin adelantar el resultado de 2.6 |
| 2026-08-24 | El gancho queda como **promesa sin números** al abrir («hay un cuestionario que casi nunca falla y aun así se equivoca en casi la mitad de sus alarmas; al terminar vas a poder calcular por qué») y se paga explícitamente al abrir 2.6 | Decisión del docente. Sirve igual para enganchar en clase, pero no le pide a nadie que calcule algo que todavía no puede |
| 2026-08-24 | Los iconos del sitio usaban rutas relativas (`icons/favicon-32.png`), así que sólo cargaban en la portada: con `trailingSlash`, una página como `/aula-probabilidad/` los buscaba en su propia carpeta y daba 404. Ahora pasan por `conBase()` | Encontrado al auditar la consola del navegador durante esta reconstrucción |

## Estado actual — Unidad 2 COMPLETA

- [x] Dataset PTSMU (200 fichas) — 21/21 verificaciones contra el dossier
- [x] **Preámbulo "El misterio"** — la paradoja diagnóstica con predicción previa
- [x] **"El caso"** — qué es un tamizaje, armador de puntaje de 9 ítems, las 200 fichas
- [x] **2.1 Espacio muestral** — experimento aleatorio, S, punto muestral, evento simple/compuesto/seguro/imposible
- [x] **2.2 Tipos de probabilidad** — clásica, frecuentista, subjetiva; axiomas de Kolmogórov; regla del complemento
- [x] **2.3 Tablas de contingencia** — conjunta, marginal, condicional; **acá se definen** sensibilidad, especificidad y VPP con el denominador iluminado en la tabla
- [x] **2.4 Teoría combinatoria** — factorial, permutación vs. combinación con enumerador real; C(43,5) = 962,598
- [x] **2.5 Reglas básicas** — suma con diagrama de Venn, multiplicación, independencia verificada (4.5 esperados vs. 17 observados)
- [x] **2.6 Teorema de Bayes** — árbol de frecuencias naturales y deslizador de prevalencia; responde el misterio del inicio
- [x] **2.7 Variables aleatorias** — función de masa, esperanza y varianza término por término
- [x] **2.8 Distribuciones discretas** — binomial, Poisson e hipergeométrica, con el selector que pregunta cómo se generaron los conteos
- [x] **2.9 Distribución normal** — regla 68-95-99.7, puntuación z, y punto de corte movible que cierra el capítulo

Pendiente: Unidades 1, 3 y siguientes — hace falta el dossier de cada una.

## Números de verdad (no deben cambiar sin revisar el dossier)

- PHQ-9 positivo (≥10): 43/200 = 21.5%
- GAD-7 positivo (≥10): 21/200 = 10.5%
- Ambos positivos: 17/200 = 8.5%
- Prevalencia (Dx confirmado): 25/200 = 12.5%
- Sensibilidad = especificidad = 88.0%
- VPP = 51.2%
- C(43,5) = 962,598 · P(43,5) = 115,511,760
- Media PHQ-9 = 6.32 · desviación = 4.64 → z del corte = 0.79 → P(X≥10) = 0.214
- binomial(20, 5, 0.215) = 0.1887 · poisson(8, λ=5) = 0.0653 · hipergeom(43, 9, 6, 2) = 0.2739
- Expedientes incompletos entre los 43 positivos = 9 · demanda: 24 semanas, 121 solicitudes

## Componentes reutilizables ya construidos

Estos NO son específicos de esta materia — sirven para cualquier herramienta futura (Estadística Descriptiva, Econometría, etc.):

- `aleatorio.ts` — helpers de números al azar y simulación por lotes
- `BarraSim.tsx` — barra de convergencia con marca de valor teórico
- `Definicion` / `MiniHistoria` / `Formula` / `Frac` / `Trampa` / `Puente` (en `narrativa.tsx`) — el patrón completo del libro interactivo
- `AvatarMini.tsx` — avatar sobrio para grillas de personas
- `VotacionSimulada.tsx` — panel de votación de clase sin backend

## Pendiente / a decidir

- Personajes o nombres para futuros ejemplos aplicados (por ahora todo es "Estudiante #N", sin narrativa de personajes)
- Si Fase 2 (distribuciones) va en esta misma Aula o en una herramienta separada
