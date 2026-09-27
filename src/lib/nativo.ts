/**
 * Lo que sólo existe dentro de la app de Android (Capacitor). Es el único archivo que habla con la
 * parte nativa: el resto del sitio pregunta `esApp()` y, si no es la app, sigue como en la web.
 *
 * La app carga el sitio publicado (capacitor.config.ts, server.url), y Capacitor le inyecta su puente
 * (`window.Capacitor`). En el navegador ese puente no existe y los plugins nunca se cargan: la web no
 * depende de la app (regla 8 de «Estructura» en CLAUDE.md).
 */

/** Dirección con la que Supabase devuelve al alumno a la app después de elegir su cuenta de Google.
 *  Tiene que estar en el AndroidManifest (intent-filter) y entre las Redirect URLs de Supabase. */
export const REGRESO_APP = "bo.ronmartinez.aula://login";

type Puente = { isNativePlatform?: () => boolean };

/** true sólo dentro de la app de Android. */
export function esApp(): boolean {
  if (typeof window === "undefined") return false;
  const puente = (window as { Capacitor?: Puente }).Capacitor;
  return Boolean(puente?.isNativePlatform?.());
}

/**
 * Abre `url` en el navegador del teléfono (Chrome Custom Tabs: Google no deja iniciar sesión dentro
 * de la vista web de una app) y avisa con la dirección de regreso cuando Android reabre la app con
 * `REGRESO_APP`. Devuelve la función para dejar de escuchar.
 */
export async function abrirFueraYEsperarRegreso(url: string, alVolver: (regreso: string) => void): Promise<() => void> {
  const [{ App }, { Browser }] = await Promise.all([import("@capacitor/app"), import("@capacitor/browser")]);
  const escucha = await App.addListener("appUrlOpen", ({ url: regreso }) => {
    if (!regreso.startsWith(REGRESO_APP)) return;
    void Browser.close().catch(() => {
      // en algunos teléfonos la pestaña ya se cerró sola
    });
    alVolver(regreso);
  });
  await Browser.open({ url });
  return () => void escucha.remove();
}
