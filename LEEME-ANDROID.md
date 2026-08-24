# Instalar la app en el celular desde Android Studio

## La primera vez

1. **Android Studio → Clone Repository**
   (o `File → New → Project from Version Control`)

   URL: `https://github.com/RonMarty2/RON_DOC.git`

2. Cuando termine de clonar, abrí una terminal dentro de Android Studio
   (**Alt+F12**) y ejecutá una sola vez:

   ```
   npm install
   ```

   Esto instala las dependencias. Sin esto el Gradle sync falla —y te lo va a
   decir con ese mismo mensaje, no con un error críptico.

3. `File → Open` → elegí la subcarpeta **`RON_DOC/android`** → **Open**.

4. Esperá el *Gradle sync* (la primera vez tarda varios minutos).

5. Conectá el celular por USB, con **Depuración USB** activada.

6. **▶ Run** (`Shift+F10`).

Se instala y se abre sola.

## Cada vez que haya cambios

1. **Ctrl+T** — `Git → Update Project` (trae los cambios)
2. **▶ Run**

Nada más. El sitio se compila y se copia adentro de la app **solo**, como
parte de la compilación (tarea `construirSitioWeb` en `android/app/build.gradle`).

`npm install` sólo hace falta de nuevo si cambiaron las dependencias del
proyecto; si el sync te pide algo, te lo va a decir.

## Si algo sale mal

| Mensaje | Qué hacer |
|---|---|
| «Falta instalar las dependencias del proyecto» | `npm install` en la carpeta RON_DOC (Alt+F12) |
| `[Aula] AVISO: no se pudo compilar el sitio` | Instalá Node.js (nodejs.org). La app se instala igual, pero con el contenido anterior |
| La app se abre en blanco | Falta el contenido: `npm run build:android` y volvé a apretar ▶ |
| No aparece el celular en la lista | Depuración USB activada, y aceptá el diálogo «¿Permitir depuración?» en el teléfono |

## ¿Se actualiza sola en el celular?

**No.** El contenido viaja adentro del APK: cada cambio requiere volver a
instalar (Ctrl+T y ▶).

Si querés que se actualice sola, usá el sitio como **PWA**: abrilo en Chrome
en el celular y elegí «Agregar a pantalla de inicio». Queda con su ícono,
funciona sin internet y se actualiza sin hacer nada.

## Compilar un APK para repartir

`Build → Build Bundle(s)/APK(s) → Build APK(s)`
El archivo sale en `android/app/build/outputs/apk/debug/app-debug.apk`.

Para repartirlo conviene uno firmado: `Build → Generate Signed Bundle/APK`.
Antes de una versión nueva, subí `versionCode` y `versionName` en
`android/app/build.gradle`.
