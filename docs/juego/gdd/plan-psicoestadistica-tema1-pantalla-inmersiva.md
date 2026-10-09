# Plan · Psicoestadística (Psicología) · Tema 1 · Pantalla inmersiva

Versión 1 · 09-10-2026 · Director de juego · **Solo diseño. No se ha programado nada.** Esta sesión no tuvo Bash: no se corrieron scripts ni se hizo commit (lo hace quien me llamó).
Boceto para mirar: `docs/juego/bocetos/inmersiva/index.html` (ábrelo en el navegador; cada pantalla va a 412×860 y a 1100×700).
Va junto con `plan-psicoestadistica-tema1-objetivo-y-causa.md` (APROBADO por Ronald el 09-10 con los tres ajustes del crítico v22: líneas bajo los botones que describen el acto y su costo sin decir cuál es la correcta; renglones con dos frases partidos; «cómo se contó» en lugar de «se sostiene», sin globos redundantes del objetivo; «Qué pasó» reemplaza el cuadro v16).

**Las tres líneas del oficio.** (1) Carrera: Psicología. (2) Oficio real: psicólogo de colegio que recibe informes y dice qué se puede afirmar. (3) Papel del jugador: psicólogo del Departamento de Orientación. Esta pantalla no cambia el papel.

**Lo que Ronald decidió (no se vuelve a preguntar).** Versión inmersiva: la oficina ocupa casi toda la pantalla y se ve siempre. Papeles, hoja, «Tu objetivo», medidores y «Qué pasó» son piezas encima de la oficina que se abren y se cierran, no una columna larga debajo. Motivo suyo: «mientras más texto, dejo de ver la escena de arriba; me gusta la ambientación».

---

## Decisiones pendientes de Ronald (una por tema, con mi recomendación)

1. **¿Dónde sale la caja de diálogo?** Hasta hoy la regla decía «arriba de la escena». Ahora arriba viven los medidores y tu objetivo. Recomiendo **abajo, en la franja del pulgar**, con la cara y el nombre de quien habla; tu respuesta, en caja de otro color y sin cara (como ya está decidido). La oficina queda arriba entera. Alternativa: dejarla arriba y los medidores abajo (el pulgar no alcanza los botones).
2. **¿Cómo se abren los papeles?** Recomiendo: la carpeta está sobre el escritorio de la oficina; al tocarla sube una hoja con los papeles y las fichas; al tocar un papel, la misma hoja muestra el papel con «Volver a la carpeta». Una sola hoja a la vez, nunca hojas apiladas. Alternativa más cara: que cada papel se vea como un objeto suelto sobre el escritorio.
3. **¿Los tres botones de decidir van en la misma hoja de papeles?** Recomiendo **no**: en la hoja de papeles queda un solo botón, «Decidir ▸», y los tres botones (cada uno con su línea) van en otra hoja. Así cada hoja cabe sin tapar la oficina.
4. **¿En computador, la hoja sube desde abajo o es un panel a la derecha?** Recomiendo **panel a la derecha de 440 px** (la oficina se ve entera a la izquierda). Alternativa: igual que en celular, centrada y más angosta.
5. **¿Con qué se empieza a construir?** Recomiendo el orden de la sección 5 (primero la estructura sin cambiar textos, después medidores, después hojas). Si prefieres ver todo junto de una vez, tarda más en probarse y es más fácil que algo se rompa.

---

## 1. Esquema de la pantalla

### Piezas fijas (siempre visibles, en todas las fases menos el título)

| Pieza | Dónde | Detalle |
|---|---|---|
| **Oficina** | Toda la pantalla, de fondo | Es la escena pixelada de hoy (ventana con la hora, jefa, Dani, luz). Ocupa el 100% del alto y se ve siempre. Lo importante de la historia (ventana, jefa, Dani) se dibuja en la **mitad de arriba**; el escritorio y la carpeta, abajo, pueden quedar tapados por una hoja. |
| **Medidores compactos** | Franja de arriba | Credibilidad y Voz **lado a lado** (dos columnas), con nombre y número, barra y **rótulo en cada marca**: «25 peligro» y «65 meta», letra de 12 px o más. Ocupan unos 60 px. Aparecen cuando hoy aparecen (desde el Caso 1). |
| **Tu objetivo** | Franja fija bajo los medidores | Una o dos líneas con borde ámbar. En el Caso 2: «Tu objetivo: saber cómo se contó el cero. Toca un papel para abrirlo; cada uno gasta una ficha.» En el Paso 1 usa su objetivo de hoy. Ocupan unos 50 px. Se ve siempre que haya papeles o una decisión. |
| **Sonido y «De cero»** | Esquinas, sobre la franja de arriba | Ya existen (44 px). Se mueven a la franja para no tapar los medidores. |

Las dos franjas juntas miden unos 110 a 120 px en un celular de 860 px de alto (14%). La oficina se ve detrás, con una capa oscura suave para que se lean.

### Las hojas (lo que aparece encima)

**Celular vertical 412×860.** Una hoja sube desde abajo y mide **como máximo el 58% del alto** (unos 500 px). Debajo queda como mínimo el 42% (unos 360 px) con la oficina, ya con una capa oscura suave. Tiene cabecera con título y una **✕ de 48 px**; el cuerpo se desplaza por dentro si es largo; abajo, una barra fija con los botones del pulgar (48 px o más de alto). La hoja se cierra con la ✕, con un toque en la oficina de arriba o con el **botón atrás** del celular.

**Computador 1100×700.** La hoja es un **panel a la derecha de 440 px**, a todo el alto. A la izquierda se ve la oficina entera (60% del ancho) con los medidores y «Tu objetivo» encima. Se cierra con la ✕, con la tecla Escape o tocando la oficina.

**Diálogos.** No son hojas: son una caja en la franja de abajo (alto máximo 35%), con la cara de quien habla y su nombre. Tu respuesta, en caja de otro color y sin cara. «Siguiente ▸» queda dentro de la caja, a la altura del pulgar. En computador la caja va abajo a la izquierda, bajo la oficina.

### Por fase

| Fase (`Mesa.tsx`) | Siempre se ve | Hoja o pieza encima | Botones del pulgar | Cómo se cierra |
|---|---|---|---|---|
| **titulo** | Oficina completa, sin franjas | Tarjeta de título al centro, arriba del tercio inferior | «Empezar» / «Continuar donde quedé» | Se va al empezar |
| **bienvenida, jefa** (diálogo) | Oficina y, si ya existen, medidores | Caja de diálogo abajo | «Siguiente ▸» en la caja | Al terminar la última línea |
| **hoja** (la hoja del encargo) | Oficina, medidores | Hoja con el encargo y el formulario del número | Barra fija: «Listo» | ✕ o botón atrás (si falta el número, avisa y no cierra; no se pierde lo escrito) |
| **archivo1** | Oficina, medidores, «Tu objetivo» | Hoja «Carpeta» con papeles y fichas; al tocar un papel, la misma hoja lo muestra | «Volver a la carpeta» / «Seguir ▸» | ✕ cierra la hoja y la carpeta sigue en el escritorio; el papel abierto cuenta como abierto |
| **asombro, cierre1** | Oficina | Caja de diálogo (jefa) | «Siguiente ▸» | Al terminar |
| **entrada2** | Oficina, medidores | Caja de diálogo (jefa y tu respuesta) y, junto al escritorio, el informe con el titular «CERO DENUNCIAS» como hoja plegada de una línea (toque la despliega) | «Siguiente ▸» | Al terminar |
| **archivo2 (papel abierto)** | Oficina, medidores, «Tu objetivo» | Hoja «Carpeta»; con un papel, esa hoja muestra el papel. El titular del informe queda en una línea fija arriba de la hoja | «Volver a la carpeta» y «Decidir ▸» | ✕ cierra la hoja; «Decidir» abre la hoja de decidir |
| **decidir** (tres botones) | Oficina, medidores, «Tu objetivo» | Hoja «Decidir el informe» con tres botones y su línea cada uno | Los tres botones, de 64 px | ✕ vuelve a la carpeta (no decide nada) |
| **frase** (si elige redactar) | Oficina, medidores | Hoja «Tu frase» con las piezas; la vista previa de la frase queda fija arriba de las piezas | «Firmar la frase ▸» y «Volver» | «Volver» regresa a decidir |
| **confirma** | Oficina | Hoja chica de 30%: «¿Firmar? Después no hay vuelta.» (o «No abriste ningún papel…») | «Sí, firmar» y «Volver» | «Volver» |
| **reaccion** | Oficina, medidores (se mueven en vivo) | Primero, las cajas de diálogo (jefa, madre por teléfono, nota del director); después la hoja **«Qué pasó»** con sus cinco renglones | «Continuar ▸» | «Continuar» (no se puede cerrar sin ver el cuadro: la ✕ lo cierra pero «Continuar» se mantiene en una barra) |
| **fin** | Oficina oscurecida, medidores | Tarjeta de cierre: frase de cierre, qué hiciste, el cero, aviso | «Volver al título» | Al tocar |

**Regla de la oficina visible:** con cualquier hoja abierta en celular queda libre al menos el 42% del alto; en computador, el 60% del ancho. Si una hoja necesita más (por ejemplo «Qué pasó» con renglones largos), **se desplaza por dentro**, nunca crece. Esto se mide (sección 3).

**Un detalle bueno:** en «Qué pasó» los medidores de arriba se mueven mientras el alumno lee el porqué. Hoy el cambio y su causa quedan lejos uno de otro; aquí están en la misma pantalla.

---

## 2. Cómo se conserva todo lo ya decidido

| Lo decidido | Cómo queda |
|---|---|
| Primera persona, sin personaje del jugador | La oficina es lo que ves. No hay figura tuya. Lo que dicen los demás, en caja con cara y nombre; lo tuyo, en caja de otro color y sin cara. Cambia solo la posición de la caja (decisión 1). |
| Nombres solo en el diálogo | Los rótulos de hojas y medidores no llevan nombres propios («Carpeta», «Decidir el informe», «Qué pasó»). Los nombres siguen en la caja de quien habla. |
| Una frase por renglón | Se mantiene en citas y en «Qué pasó» (cada renglón de 25 palabras o menos y, por el ajuste v22, partido si trae dos frases). |
| Rótulos en las marcas de los medidores | «25 peligro» y «65 meta» bajo cada barra, también en la versión compacta; se mide que no se pisen (a 190 px por barra, no se pisan). |
| «Reducir movimiento» | Las hojas aparecen sin deslizarse (solo cambio de opacidad o nada); la oficina y los medidores ya respetan la opción. Se agrega a las hojas con la misma consulta `prefers-reduced-motion`. |
| Ambiente vivo con la hora | No cambia: la ventana, la luna y las ventanitas dependen de `minutosDeFase`. Como ahora la oficina ocupa casi toda la pantalla, la ventana va en la mitad de arriba para no quedar tapada. |
| Música baja al leer | El hook `useSonidoT1` ya recibe `leyendo`; se amplía: con cualquier hoja abierta la música baja (mismo valor que hoy al leer un papel) y sube al cerrarla. Sin cortes de pista (regla de música completa). |
| App de Android | Todo táctil: toques de 44 px o más, nada de «pasar por encima». **Botón atrás** (Capacitor `App.addListener("backButton")`, en un solo archivo de enlace; en la web, el evento `popstate` con una entrada de historial por hoja): primero cierra la hoja abierta; sin hojas, comporta como hoy. **Teclado**: al escribir el número de la hoja del encargo, la hoja se acomoda sobre el teclado (`visualViewport` / `100dvh`) y el campo queda visible; los medidores se quedan arriba. **Rotación**: en horizontal pasa a la disposición ancha (panel a la derecha). Conexión: no cambia (todo es local). |
| Textos legibles | Letra de 12 px o más (la mesa usa 17 a 23 px en su fuente), contraste de 4,5 a 1 con los colores de `mesa.css`, nada pisado. Se mide con `medir_legibilidad.py` y captura a 375 px (sección 5). |
| Sin lección, sin software, sin citar el dossier | No cambia ningún texto. |

---

## 3. Riesgos, qué es barato y qué es caro

| Cosa | Costo | Nota |
|---|---|---|
| Oficina a pantalla completa de fondo (hoy es una pieza arriba) | **Medio** | Cambia el tamaño del lienzo de PixiJS (`EscenaPixi.tsx`): hoy ancho fijo con alto proporcional; hay que encuadrarlo para llenar el alto y centrar lo importante arriba. Hay que redibujar o reubicar piezas para que la ventana, la jefa y Dani caigan en la mitad de arriba. |
| Hojas como superposiciones con cabecera, ✕ y barra fija | **Barato** | Es CSS y un componente `Hoja` nuevo; hoy `.mesa-lector` ya hace una versión. Se reutiliza para todas las fases. |
| Medidores compactos lado a lado | **Barato** | Un componente nuevo con el mismo cálculo; se verifica que los rótulos no se pisen. |
| «Tu objetivo» como franja fija | **Barato** | Texto ya definido en el plan del Caso 2. |
| Botón atrás cierra la hoja | **Medio** | Hay que probarlo en el teléfono real, no solo en el navegador. Riesgo: salir del juego sin querer. Se resuelve con una entrada de historial por hoja abierta. |
| Teclado sobre la hoja del número | **Medio** | Se prueba en Android. Si falla, el campo del número queda en una hoja chica arriba del teclado. |
| Guardado de la fase | **Barato** | La fase se guarda igual; las hojas abiertas **no** se guardan (al volver, la hoja está cerrada). No se pierde nada que el alumno ya hizo. |
| Papeles como objetos sueltos sobre el escritorio | **Caro** | No se recomienda ahora (decisión 2). |
| Cámara que se mueve cuando se abre la hoja | **Caro** | No hace falta: si lo importante está en la mitad de arriba, la hoja no lo tapa. Queda como mejora si Ronald la quiere después. |
| Que se le pierda la escena al abrir una hoja en un celular chico (360×640) | **Riesgo** | A 640 px de alto, el 42% son 270 px: la ventana y la jefa aún caben. Se comprueba con una captura. |
| Que muchas capas oscuras apaguen el ambiente | **Riesgo** | La capa oscura se limita a un 35% y no cubre la ventana. Se mira en el navegador. |
| Textos más largos en la hoja de «Qué pasó» | **Riesgo** | Es el contenido más largo. Se desplaza por dentro y el botón «Continuar» queda fijo. |

---

## 4. Orden para construirlo, con cada paso subible y probable solo

Cada paso termina con `npm test` y `npx tsc --noEmit` en verde (mirando el código de salida), una captura a 375 px, la revisión de `critico-de-jugabilidad` y el navegador con la extensión; recién entonces se sube y se le muestra a Ronald.

1. **Estructura sin cambiar textos.** Componente `Hoja` (cabecera, ✕, barra fija, cierre con atrás, Escape y toque fuera) y oficina a pantalla completa de fondo. Se pasan a hojas las fases `hoja`, `archivo1`, `archivo2`, `frase`, `confirma`. Los textos no cambian. Prueba: se puede jugar de punta a punta igual que hoy.
2. **Medidores compactos y «Tu objetivo» fijo.** En todas las fases en que hoy hay medidores. Prueba: rótulos de las marcas visibles y sin pisarse a 375 px.
3. **Diálogos en la franja de abajo** (decisión 1) y reubicación de la ventana, la jefa y Dani en la mitad de arriba de la oficina.
4. **Hoja «Decidir» con los tres botones y su línea** (ajustes v22). Reemplaza los botones sueltos de `archivo2`.
5. **Hoja «Qué pasó»** con los cinco renglones, `quePasoCaso2`, `hechoClaveSana` y la pantalla final nueva (todo el plan aprobado del Caso 2). Los medidores se mueven al abrirla.
6. **Android:** botón atrás, teclado y rotación; música baja con hoja abierta. Se prueba en el teléfono.
7. **Pulido:** «reducir movimiento» en las hojas, mediciones finales con el script y la captura.

El paso 1 es el que más cambia el aspecto; si Ronald lo ve y no le gusta, se corrige antes de gastar tiempo en el resto.

---

## 5. Archivos y pruebas que se tocan

**Código (cuando Ronald apruebe este plan y el boceto):**
- `src/app/juego-psicoestadistica/Mesa.tsx`: la estructura se reorganiza (fases dentro de `Hoja` o `Dialogo`); medidores y «Tu objetivo» fuera del panel; una sola fuente de verdad para qué hoja está abierta.
- `src/app/juego-psicoestadistica/mesa.css`: capas (oficina de fondo, franjas fijas, hoja, caja de diálogo), reglas para 412 px y para pantalla ancha (`min-width: 700px`), `reduced-motion`.
- `src/app/juego-psicoestadistica/EscenaPixi.tsx`: lienzo a pantalla completa, encuadre con lo importante en la mitad de arriba (puede tocar `hora-historia.ts` solo si se mueven las posiciones de ventana; no cambia sus cálculos).
- Archivos nuevos: `Hoja.tsx`, `Medidores.tsx`, `AtrasHoja.ts` (el botón atrás de Android y el `popstate` de la web, en un solo archivo).
- `src/lib/juego/psicoestadistica/sonido-t1.ts` y `use-sonido-t1`: música baja con cualquier hoja abierta.
- Los textos del plan del Caso 2 (archivos de ese plan, sección 6) no cambian.

**Pruebas:**
- `Mesa.test.tsx`: en cada fase, la hoja correcta se abre y se cierra con ✕ y con Escape; el botón atrás cierra la hoja; «Tu objetivo» y los medidores están en todas las fases que corresponden; cerrar la hoja de papeles no pierde papeles abiertos ni fichas; la hoja del encargo no pierde el número escrito.
- Prueba nueva de las marcas: los rótulos «25 peligro» y «65 meta» existen en los medidores compactos.
- `sonido-t1.test.ts`: con una hoja abierta, el nivel de música baja y sube al cerrar.
- `npm test` completo y `npx tsc --noEmit`.
- Medición: `medir_legibilidad.py` (`?medir=1`) y capturas a 375 px y a 412 px de las cinco pantallas del boceto; comprobar que con la hoja más alta queda libre al menos el 42% del alto.
- Prueba a mano en el teléfono Android: atrás, teclado, rotación.

---

## Lista de salida (cómo se probó cada cosa)

| Regla | ✔/✘ | Cómo |
|---|---|---|
| Oficio de la carrera (tres líneas) | ✔ | a mano: arriba |
| Lo que Ronald decidió (oficina siempre visible, hojas encima, objetivo fijo, medidores compactos) | ✔ | a mano: secciones 1 y 2, boceto |
| Oficina visible al menos un tercio con hoja abierta | ✔ | a mano: 100% menos 58% de hoja = 42% de alto en celular; 60% del ancho en computador; se mide al construir |
| Cobertura de fases | ✔ | a mano: las 13 fases de `Fase` en `Mesa.tsx` están en la tabla (título, bienvenida, jefa, hoja, archivo1, asombro, cierre1, entrada2, archivo2, frase, confirma, reaccion, fin) más «decidir» como hoja nueva |
| Texto legible (12 px, 4,5 a 1) | ✔ a mano | el boceto usa 12 px como mínimo (rótulos de marcas) y los colores de `mesa.css`; no se corrió `medir_legibilidad.py` (sin Bash). Pendiente de correr al construir |
| Cada pantalla dice quién eres, objetivo, qué tocas y qué pasó | ✔ | a mano: «Tu objetivo» fijo, líneas bajo los botones, «Qué pasó» |
| Primera persona, nombres solo en el diálogo, sin personaje del jugador | ✔ | a mano: sección 2 |
| Tuteo, sin guiones largos, sin citar el dossier ni software | ✔ | a mano: releído |
| No hay referencias a otro juego de RON_DOC ni se repite aspecto | ✔ | a mano: se usa la oficina propia ya aprobada |
| Android: táctil, atrás, teclado | ✔ | a mano: sección 2; **se prueba en teléfono al construir** |
| Nota por alumno y pagos | ✔ | no cambia ninguna tabla ni versión |
| Bash / scripts | ✘ | no hubo Bash: nada contable lleva «script». Es de otra etapa (construcción), no del plan |
| Crítico de lo jugable | pendiente | se corre sobre el plan y el boceto antes de que Ronald los vea |
