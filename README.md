# RON_DOC — Sitio académico de Ronald Martínez Jiménez

Sitio web estático construido con **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4**, exportado a HTML y publicado en **GitHub Pages** vía GitHub Actions.

Contiene el material de las cuatro materias que dicto:

- 📊 Psicoestadística Descriptiva
- 💹 Administración Financiera
- 📈 Econometría II
- 💰 Matemática Financiera

Más una sección de **podcasts** (links a iVoox y YouTube) y una página **Sobre mí**.

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
  color: "azul",       // "azul" | "verde" | "morado" | "naranja"
  icono: "📘",
  temas: [],
}
```

3. Creá la carpeta `content/temas/mi-nueva-materia/`.
4. Listo: la materia aparecerá en la home y tendrá su propia página.

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
  icono: "🚀",
  tags: ["estadística"],
  anio: 2025,
}
```

Aparecerá en `/proyectos` y los primeros 3 también en la home.

### 7. Actualizar resumen de **tesis**

Editá `content/tesis.ts`:
- `TESIS_RESUMEN`: cantidad de tutorías, revisorías, año desde el que acompañás.
- `AREAS_TESIS`: bloques temáticos con conteo y descripción.
- `ENFOQUE_TUTORIA`: párrafos sobre cómo trabajás.

La página `/tesis` **no muestra** nombres de estudiantes ni instituciones, sólo cifras agregadas y áreas. Pensado a propósito para no invadir privacidad.

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

- **Colores de acento por materia**: ya están mapeados en `src/lib/colores.ts` (azul, verde, morado, naranja). Si necesitás otro, agregalo ahí.
- **Tipografías**: Inter (sans) y Source Serif (serif). Definidas en `src/app/globals.css` vía `@theme`.
- **Modo claro/oscuro**: toggle en el header; persistido en localStorage.
- **SEO**: cada página define su `Metadata` con `construirMetadata()` (`src/lib/seo.ts`).
