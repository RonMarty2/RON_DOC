import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Configuración para empaquetar el sitio como app nativa de Android.
 *
 * El sitio se exporta estático a /out (npm run build:android) y Capacitor
 * envuelve esa carpeta en un proyecto de Android Studio, dentro de /android.
 *
 * IMPORTANTE: para Android hay que compilar SIN basePath, porque la app no
 * se sirve desde /RON_DOC sino desde la raíz local. De eso se encarga el
 * script `build:android`, que fuerza NEXT_PUBLIC_BASE_PATH vacío.
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
  },
};

export default config;
