"use client";

import { useEffect } from "react";
import { conBase } from "@/lib/rutas";

/**
 * Registra el service worker para habilitar instalación PWA y offline.
 * Sólo se registra en producción y si el navegador lo soporta.
 *
 * Además, suprime el prompt nativo de instalación en escritorio:
 * Chrome/Edge en PC disparan `beforeinstallprompt` cuando la PWA es
 * instalable y muestran un banner / ícono en la barra. Llamando a
 * `preventDefault()` el navegador no muestra nada. En móvil dejamos
 * pasar el evento, así Chrome Android sigue ofreciendo "Instalar app"
 * y en iOS Safari el flujo es el mismo de siempre (no usa este evento).
 */
export function RegistroPWA() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detección de plataforma móvil. Si es escritorio, no permitimos que el
    // navegador muestre el prompt nativo de instalación.
    const ua = window.navigator.userAgent;
    const isMobile = /Mobi|Mobile|Android|iPhone|iPad|iPod/.test(ua);

    const bloquearPrompt = (e: Event) => e.preventDefault();
    if (!isMobile) {
      window.addEventListener("beforeinstallprompt", bloquearPrompt);
    }

    // El registro del service worker sigue activo en todas las plataformas
    // (no se toca la PWA en sí, sólo se oculta el prompt en desktop).
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      const url = conBase("/sw.js");
      const scope = conBase("/");
      navigator.serviceWorker.register(url, { scope }).catch((err) => {
        console.warn("[PWA] no pude registrar el service worker:", err);
      });
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener("beforeinstallprompt", bloquearPrompt);
      }
    };
  }, []);

  return null;
}
