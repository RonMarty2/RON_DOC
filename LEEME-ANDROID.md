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

   > **Hace falta Node.js 22 o superior.** Comprobalo con `node -v`. Si tenés
   > una versión más vieja, descargá la LTS de <https://nodejs.org> y **cerrá y
   > volvé a abrir Android Studio** (si no, sigue usando la versión vieja).

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
| `The Capacitor CLI requires NodeJS >=22` | Actualizá Node desde nodejs.org y reiniciá Android Studio |
| La compilación falla diciendo «La app no tiene contenido adentro» | Seguí las instrucciones del propio mensaje: `npm install` y `npm run build:android` |
| La app se abre en blanco | Falta el contenido: `npm run build:android` y volvé a apretar ▶ |
| No aparece el celular en la lista | Depuración USB activada, y aceptá el diálogo «¿Permitir depuración?» en el teléfono |

## ¿Se actualiza sola en el celular?

**Sí.** La app carga desde el sitio publicado
(`https://ronmarty2.github.io/RON_DOC`, configurado en `capacitor.config.ts`
como `server.url`). Cuando se suben cambios a `main`, GitHub publica el sitio
y la app los muestra la próxima vez que se abre. No hay que recompilar ni
reinstalar.

Sin internet también funciona: el service worker guarda todo en el teléfono.
**La única excepción es la primera apertura después de instalarla**, que sí
necesita conexión — conviene abrirla una vez con WiFi antes de llevarla al
aula.

Sólo hay que volver a compilar e instalar cuando cambia la parte nativa: el
ícono, el nombre, los permisos, la versión de Capacitor. Para el contenido de
la Aula, nunca.

Si alguna vez conviene volver al modelo anterior (todo adentro del APK),
alcanza con comentar `url` en `capacitor.config.ts` y recompilar.

## Compilar un APK para repartir

`Build → Build Bundle(s)/APK(s) → Build APK(s)`
El archivo sale en `android/app/build/outputs/apk/debug/app-debug.apk`.

Para repartirlo conviene uno firmado: `Build → Generate Signed Bundle/APK`.
Antes de una versión nueva, subí `versionCode` y `versionName` en
`android/app/build.gradle`.
