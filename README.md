# RON_DOC — Sitio académico de Ronald Martínez Jiménez

Sitio web estático construido con **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4**, exportado a HTML y publicado en **GitHub Pages** vía GitHub Actions.

Es el aula de las materias que dicto: un libro interactivo por materia. Hoy está publicada el **Aula Interactiva de Probabilidad** (Psicoestadística Inferencial); Psicoestadística Descriptiva, Administración Financiera, Econometría II y Matemática Financiera aparecen como "en preparación".

**Regla de publicación** (`src/lib/publicado.ts`): el sitio muestra sólo lo que tiene contenido real.

- Un **tema** se publica cuando su MDX deja de decir `[CONTENIDO PENDIENTE]`.
- Una **materia** se publica cuando tiene una herramienta o algún tema publicado.
- **Podcasts** y **tesis** aparecen en el menú cuando sus listas tienen datos.
- Lo que no cumple da 404 en vez de mostrar una plantilla vacía.

---

## 🚀 Cómo correrlo en local

Requisitos: Node.js 20+ y npm.

```bash
npm install
npm run dev
```

Abrí <http://localhost:3000>.

Para generar el sitio estático (lo mismo que hace el deploy):

```bash
npm run build
# salida en ./out/
```

---

## 📂 Estructura del contenido

```
content/
  materias.ts                       ← lista maestra de materias y temas
  podcasts.ts                       ← lista de podcasts
  temas/
    psicoestadistica/
      correlacion-pearson.mdx       ← contenido del tema en MDX
      ...
    administracion-financiera/...
    econometria-ii/...
    matematica-financiera/...

public/
  interactivos/                     ← HTMLs standalone embebidos vía iframe
    pearson_pizarra.html
    regresion_animada.html
  recursos/                         ← PDFs y archivos descargables
    psicoestadistica/...
    administracion-financiera/...
    ...
```

---

## ✍️ Cómo alimentar el contenido (sin tocar React)

### 1. Agregar una nueva **materia**

1. Abrí `content/materias.ts`.
2. Añadí un objeto al array `MATERIAS`:

```ts
{
  slug: "mi-nueva-materia",
  nombre: "Mi Nueva Materia",
  descripcion: "Una breve descripción.",
  temas: [],
}
```

3. Creá la carpeta `content/temas/mi-nueva-materia/`.
4. La materia aparece en la home como "en preparación"; pasa a tener su propia página cuando publica su primer tema o herramienta.

### 2. Agregar un **tema** a una materia

1. En `content/materias.ts`, dentro de `temas`, añadí:

```ts
{
  slug: "mi-tema",
  titulo: "Mi Tema",
  resumen: "Resumen para la tarjeta.",
  archivoMdx: "mi-tema",
}
```

2. Creá el archivo `content/temas/<slug-materia>/mi-tema.mdx` con el contenido.

El MDX soporta Markdown estándar (encabezados, listas, **negritas**, *cursivas*, citas, tablas, enlaces, código).

### 3. Agregar un **PDF** descargable

1. Copiá el archivo a `public/recursos/<slug-materia>/mi-archivo.pdf`.
2. En el tema, dentro de su entrada en `materias.ts`, añadí:

```ts
recursos: [
  {
    titulo: "Resumen de la unidad 1",
    archivo: "/recursos/psicoestadistica/mi-archivo.pdf",
    tamanio: "1.2 MB",
    descripcion: "Material complementario.",
    embebido: true,   // opcional: agrega botón "Previsualizar" con visor inline
  },
],
```

> Si querés enlazar un PDF directamente desde el cuerpo del MDX (no como recurso), usá una ruta absoluta tipo `[descargar](/recursos/psicoestadistica/mi-archivo.pdf)`. Funciona en local; en GitHub Pages el `basePath` se aplica automáticamente al hacer build.

### 4. Embeber un **interactivo HTML**

1. Arrastrá tu HTML standalone (con todos sus assets inline o relativos) a `public/interactivos/mi-interactivo.html`.
2. En el tema, añadí:

```ts
interactivos: [
  {
    src: "/interactivos/mi-interactivo.html",
    titulo: "Mi interactivo",
    descripcion: "Descripción corta.",
    alto: "640px",
  },
],
```

El componente `<Interactivo />` ya gestiona el iframe, el botón "pantalla completa" y el responsive.

### 5. Agregar un **podcast**

Abrí `content/podcasts.ts` y añadí:

```ts
{
  titulo: "Mi episodio",
  plataforma: "ivoox",     // "ivoox" | "youtube"
  url: "https://ivoox.com/...",
  descripcion: "Resumen corto.",
  fecha: "2025-06-01",
  duracion: "32 min",
}
```

### 6. Agregar un **proyecto / app externa**

Abrí `content/proyectos.ts` y añadí un objeto al array `PROYECTOS`:

```ts
{
  slug: "mi-app",
  titulo: "Mi App",
  descripcion: "Qué hace en 1-2 oraciones.",
  url: "https://mi-app.com/",
  estado: "en-linea",       // "en-linea" | "beta" | "en-desarrollo" | "archivado"
  tags: ["estadística"],
  anio: 2025,
}
```

Aparecerá en `/proyectos` y en la home.

### 7. Actualizar resumen de **tesis**

Editá `content/tesis.ts`:
- `TESIS_RESUMEN`: cantidad de tutorías, revisorías, año desde el que acompañás.
- `AREAS_TESIS`: bloques temáticos con conteo y descripción.
- `ENFOQUE_TUTORIA`: párrafos sobre cómo trabajás.

La página `/tesis` **no muestra** nombres de estudiantes ni instituciones, sólo cifras agregadas y áreas. Pensado a propósito para no invadir privacidad. Mientras tutorías y revisorías sumen 0, la página no se publica.

---

## 🌐 Deploy a GitHub Pages

1. Subí este repo a GitHub (instrucciones detalladas más abajo en este README).
2. En el repo, ir a **Settings → Pages** y configurar **Source: GitHub Actions**.
3. Cualquier push a `main` dispara el workflow `.github/workflows/deploy.yml`, que:
   - Hace `npm ci` y `npm run build`.
   - Inyecta el `basePath` correcto (`/RON_DOC`) automáticamente vía `actions/configure-pages`.
   - Crea `.nojekyll` en la salida.
   - Sube el artefacto y lo despliega a Pages.
4. La URL final será `https://<tu-usuario>.github.io/RON_DOC/`.

### Primer push (paso a paso)

```bash
cd RON_DOC
git init
git add .
git commit -m "Inicial: estructura del sitio"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/RON_DOC.git
git push -u origin main
```

Después: **Settings → Pages → Source = GitHub Actions** (una sola vez).

---

## 🎨 Personalización

- **Colores**: paleta de Axiom (papel, tinta y acento terracota) como variables en `src/app/globals.css`, con su versión oscura. Se usan con clases como `bg-papel`, `text-tinta`, `text-acento`.
- **Tipografías**: Atkinson Hyperlegible (texto) y Crimson Pro (títulos), cargadas en `src/app/layout.tsx`.
- **Modo claro/oscuro**: toggle en el header; persistido en localStorage.
- **SEO**: cada página define su `Metadata` con `construirMetadata()` (`src/lib/seo.ts`).
