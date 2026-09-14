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
| Aula de Probabilidad (Psicoestadística Inferencial, Unidad 2) | `/aula-probabilidad` | Publicada. Scroll, no tarjetas. Bitácora: `bitacoras/psicoestadistica-inferencial.md` |
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

## 5. Trabajo en paralelo

Otra sesión de Claude (desde claude.ai) trabaja en **`ejercicios/`** (cuadernillo LaTeX de la Unidad 2) y en la bitácora de Psicoestadística Inferencial. Sube por PR (#30, #31 del 14-sep).

- Antes de trabajar: `git pull`.
- No tocar `ejercicios/`, `bitacoras/psicoestadistica-inferencial.md` ni `src/components/aula-probabilidad/` sin necesidad: son su terreno.
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
- *(este commit)* Publicación de Matemática Financiera preparada: las cinco láminas están en `content/materias.ts` con `borrador: true`, que decide a la vez portada, página de materia, sitemap y `noindex`. Varias láminas se muestran como lista numerada (`ListaLaminas`). Probado quitando las marcas en local y vuelto a poner.

## 7. Qué sigue

**Se puede hacer sin Ronald** (en este orden):

1. Revisar la accesibilidad de las láminas con lector de pantalla y teclado (foco al cambiar de tarjeta, etiquetas de los deslizadores).
2. Revisar el rendimiento en celular de gama baja: las láminas cargan ~190 kB de JavaScript (KaTeX va en el cliente porque las tarjetas son interactivas).

**Cuando Ronald diga "publícalas":** en `content/materias.ts`, dentro de Matemática Financiera, borrar las cinco líneas `borrador: true,` y subir. Nada más: portada, página de la materia, sitemap e indexación se ajustan solos.

**Necesita a Ronald:**

- Revisar `/interes-compuesto`, `/anualidades`, `/amortizacion`, `/bonos` y `/depreciaciones` (notación, ejemplos, orden) y decir "publícalas".
- Pasar el dossier de la próxima materia.
- Probar una lámina proyectada en clase.
- Recompilar la app Android en Android Studio.
- Decidir si el Aula de Probabilidad pasa a tarjetas.
- Opcional: bio, podcasts reales, cifras de tesis.
