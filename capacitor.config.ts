import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Configuración para empaquetar el sitio como app nativa de Android.
 *
 * MODELO: la app carga desde el sitio publicado (`server.url`), no desde los
 * archivos empaquetados. Eso es lo que hace que se actualice sola: al subir
 * cambios a GitHub, la app los muestra la próxima vez que se abre, sin
 * recompilar ni reinstalar nada.
 *
 * El respaldo sin internet lo da el service worker del propio sitio: la
 * primera apertura necesita conexión, y a partir de ahí queda todo guardado
 * en el teléfono y funciona sin señal.
 *
 * Se sigue empaquetando el sitio en /out (npm run build:android) porque es el
 * contenido con el que arranca si algún día se quita `server.url`, y porque
 * Capacitor exige que `webDir` exista.
 *
 * Para Android se compila SIN basePath (la copia local no vive bajo /RON_DOC).
 * De eso se encarga `build:android`.
 */
const config: CapacitorConfig = {
  appId: "bo.ronmartinez.aula",
  appName: "Aula de Probabilidad",
  webDir: "out",
  android: {
    // Deja que la app maneje el botón "atrás" del sistema.
    allowMixedContent: false,
  },
  server: {
    androidScheme: "https",
    /**
     * El sitio publicado. Cambiar esto por otra dirección —o comentarlo— hace
     * que la app vuelva a usar los archivos empaquetados y deje de
     * actualizarse sola.
     */
    url: "https://ronmarty2.github.io/RON_DOC",
  },
};

export default config;
