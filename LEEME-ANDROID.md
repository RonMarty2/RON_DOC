# Compilar la app para Android

El sitio ya está preparado para volverse una app nativa de Android. No hay
que reescribir nada: Capacitor envuelve el sitio exportado dentro de un
proyecto de Android Studio.

## Una sola vez: instalar lo necesario

1. **Android Studio** — descargalo de https://developer.android.com/studio
2. Al abrirlo por primera vez, dejá que instale el **SDK de Android** y el
   **JDK** que te ofrece por defecto.

## Cada vez que quieras generar la app

Desde la carpeta del proyecto, en la terminal:

```bash
npm run build:android
```

Ese comando hace tres cosas seguidas:
1. Compila el sitio a la carpeta `out/` **sin** el prefijo `/RON_DOC`
   (necesario: dentro de la app no hay ese prefijo).
2. Copia el sitio dentro del proyecto Android.
3. Sincroniza las dependencias nativas.

Después, para abrirlo en Android Studio:

```bash
npm run android:abrir
```

Se abre Android Studio con el proyecto cargado. Desde ahí:

- **Probar en el celular o emulador:** botón ▶ (Run).
- **Generar el APK para instalar:** menú `Build → Build Bundle(s) / APK(s) →
  Build APK(s)`. El archivo queda en
  `android/app/build/outputs/apk/debug/app-debug.apk`.
- **Generar el AAB para subir a Google Play:** `Build → Generate Signed Bundle
  / APK`, y seguí el asistente para crear tu clave de firma.

## Qué se puede cambiar y dónde

| Qué | Dónde |
|---|---|
| Nombre de la app | `android/app/src/main/res/values/strings.xml` |
| Identificador (`bo.ronmartinez.aula`) | `capacitor.config.ts` y luego `npx cap sync android` |
| Ícono de la app | Android Studio: clic derecho en `app` → `New → Image Asset` |
| Pantalla de inicio de la app | Es `out/index.html`. Si querés que abra directo en la Aula, ver abajo |

### Que la app abra directo en la Aula

En `capacitor.config.ts`, dentro de `server`, agregá:

```ts
server: {
  androidScheme: "https",
  url: undefined, // dejar así
},
```

y en `android/app/src/main/assets/capacitor.config.json` cambiá la ruta de
arranque — o más simple: creá un `out/index.html` que redirija. Decime y lo
dejo configurado.

## Importante

- La carpeta `android/` **sí** se versiona: contiene tu configuración,
  íconos y firma. Lo que no se versiona son los archivos web copiados
  (`android/app/src/main/assets/public`), porque se regeneran con
  `npm run build:android`.
- Si cambiás el contenido del sitio, **volvé a correr `npm run build:android`**
  antes de compilar en Android Studio. Si no, la app va a mostrar la versión
  vieja.
- El sitio web de GitHub Pages sigue funcionando igual. El prefijo `/RON_DOC`
  lo agrega solamente GitHub Actions al publicar; en tu computadora ningún
  build lo lleva. Por eso `build:android` fuerza el prefijo vacío: garantiza
  que la app nunca lo reciba, aunque algún día compiles desde un servidor.
