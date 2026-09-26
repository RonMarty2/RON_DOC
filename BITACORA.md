# Bitácora · RON_DOC

> **Leer esto primero.** Qué es el sitio, en qué estado está, qué se decidió y qué sigue. Cada parte terminada se anota acá en el mismo commit.
>
> Cada materia tiene además su bitácora en `bitacoras/` (qué enseña cada lámina, números de verdad, decisiones de contenido).

**Última actualización:** 2026-09-25

---

## 0. En curso ahora (leer antes que nada)

> Regla pedida por Ronald: si se cortan los tokens, otra IA tiene que poder seguir desde acá sin rehacer nada. Antes de cada paso se actualiza esta lista, y se sube después de cada paso terminado. Al terminar el trabajo entero, pasa a §6 y esta sección queda vacía.

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

**Agentes (pendiente, cuando Ronald esté en la PC):** traer los de `…\1.MATERIAS\RON_DOC\.claude\agents\` sin empujar desde esa copia vieja: clonar limpio (`git clone https://github.com/RonMarty2/RON_DOC.git C:\Users\lmigu\RON_DOC_git`), copiar los `.md` a `.claude\agents\`, subir, y combinarlos con los de la nube según `.claude/agents/LEEME.md`.

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
