# Bitácora · RON_DOC

> **Leer esto primero.** Qué es el sitio, en qué estado está, qué se decidió y qué sigue. Cada parte terminada se anota acá en el mismo commit.
>
> Cada materia tiene además su bitácora en `bitacoras/` (qué enseña cada lámina, números de verdad, decisiones de contenido).

**Última actualización:** 2026-09-14

---

## 1. Qué es

El aula de las materias que dicta el Mgr. Ronald Martínez Jiménez (Cochabamba): **un libro interactivo por materia**. Toma lo visual de Axiom y el motor financiero de SIMPRO (ver `FUENTES.md`).

- **Publicado:** `https://ronmarty2.github.io/RON_DOC/` (GitHub Pages, se despliega solo con cada push a `main`).
- **Stack:** Next.js 15 exportado a HTML estático, Tailwind 4, KaTeX, vitest. App Android con Capacitor (`LEEME-ANDROID.md`).

## 2. Cómo retomar

1. `git pull` (hay otra sesión trabajando en paralelo, ver §5).
2. Revisar si Axiom o SIMPRO cambiaron: protocolo en `FUENTES.md`.
3. Leer `CLAUDE.md` (reglas de formato, idioma y publicación).
4. Comandos:

   ```bash
   npm install
   npm run dev      # http://localhost:3000
   npm test         # motor de SIMPRO + fórmulas propias
   npm run build    # sitio estático en out/
   ```

   Para verlo en el navegador de Claude Code: la configuración `ron-doc` está en `Pagina personal/.claude/launch.json` (fuera del repo). No correr `next build` con `npm run dev` levantado: comparten `.next`.

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
| 2026-09-14 | La lámina retoma sola donde quedó, con un aviso para volver al inicio | Es lo que hace el Aula. Para proyectar en clase desde la misma computadora: el aviso, el primer punto o la tecla Inicio |

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
- *(este commit)* **Progreso del alumno** guardado en su navegador, sin cuentas (`src/lib/progreso.ts`, con pruebas): la lámina se abre en la tarjeta donde quedó, con el aviso "Seguiste donde quedaste · Volver a la primera tarjeta" en el lugar del pie; los puntos marcan las tarjetas ya vistas; los aciertos de la práctica se suman entre visitas; la lista de láminas muestra "Viste 9 de 12 tarjetas · 2 de 3 ejercicios bien" o "✓ Vista entera". Inicio y Fin del teclado (o del control de presentación) saltan a la primera y la última tarjeta. Si la lámina cambia de largo, no retoma. 173 pruebas.

## 7. Qué sigue

**Se puede hacer sin Ronald** (en este orden):

1. **Sin internet:** sumar las láminas a la precarga del service worker (`public/sw.js`, hoy sólo `/` y `/aula-probabilidad/`) cuando se publiquen.
2. **Control automático al publicar:** que el deploy falle si una página tiene fórmulas con error de KaTeX o una tarjeta desborda en 375×812 (hoy se mide a mano).
3. **Cuadernillo imprimible de Matemática Financiera**, con ejercicios de los mismos generadores y sus soluciones.
4. Rendimiento en celular de gama baja: las láminas cargan ~190 kB de JavaScript (KaTeX va en el cliente porque las tarjetas son interactivas).
5. Probar las láminas con un lector de pantalla real (TalkBack en Android): la accesibilidad se verificó por estructura, no escuchándola.

**Decisiones de Ronald que mejorarían mucho:** dominio propio (la dirección de GitHub Pages es difícil de recordar); contar visitas (requiere un servicio externo: decisión de privacidad); Aula en tarjetas o scroll.

**Cuando Ronald diga "publícalas":** en `content/materias.ts`, dentro de Matemática Financiera, borrar las cinco líneas `borrador: true,` y subir. Nada más: portada, página de la materia, sitemap e indexación se ajustan solos.

**Necesita a Ronald:**

- Revisar `/interes-compuesto`, `/anualidades`, `/amortizacion`, `/bonos` y `/depreciaciones` (notación, ejemplos, orden) y decir "publícalas".
- Pasar el dossier de la próxima materia.
- Probar una lámina proyectada en clase.
- Recompilar la app Android en Android Studio.
- Decidir si el Aula de Probabilidad pasa a tarjetas.
- Opcional: bio, podcasts reales, cifras de tesis.
