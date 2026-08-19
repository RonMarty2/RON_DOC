"use client";

import { useEffect } from "react";
import { conBase } from "@/lib/rutas";

/**
 * Registra el service worker para habilitar instalación PWA y offline,
 * y administra las actualizaciones OTA (over-the-air):
 *
 * - Al abrir el sitio, llama `reg.update()` para buscar una versión nueva.
 * - Si encuentra un SW en estado `installed` y ya hay un controller activo,
 *   le manda `postMessage("SKIP_WAITING")` para que se active sin esperar.
 * - Cuando el controller cambia (nueva versión tomó control), recarga la
 *   página UNA sola vez (bandera `recargando`) para evitar bucles.
 *
 * También suprime el prompt nativo de instalación en escritorio (Chrome/Edge
 * disparan `beforeinstallprompt` en PC y mostrarían un banner).
 */
export function RegistroPWA() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // --- Suprimir el prompt nativo en desktop (mobile sigue igual) ---
    const ua = window.navigator.userAgent;
    const isMobile = /Mobi|Mobile|Android|iPhone|iPad|iPod/.test(ua);
    const bloquearPrompt = (e: Event) => e.preventDefault();
    if (!isMobile) {
      window.addEventListener("beforeinstallprompt", bloquearPrompt);
    }

    // --- Registro del service worker + OTA ---
    let recargando = false;

    // Recarga la página una única vez cuando el SW nuevo toma el control.
    const onControllerChange = () => {
      if (recargando) return;
      recargando = true;
      window.location.reload();
    };

    let regGuardada: ServiceWorkerRegistration | undefined;
    let onUpdateFound: (() => void) | undefined;

    // Dentro de la app nativa (Capacitor) los archivos ya viajan empaquetados,
    // así que el service worker no aporta nada y sí puede molestar: su caché
    // sobrevive a la actualización de la app y serviría la versión anterior.
    const enAppNativa =
      typeof window !== "undefined" &&
      ((window as { Capacitor?: unknown }).Capacitor !== undefined ||
        window.location.protocol === "capacitor:");

    const productionConSW =
      process.env.NODE_ENV === "production" &&
      "serviceWorker" in navigator &&
      !enAppNativa;

    // Si quedó un service worker de una versión anterior instalado dentro de
    // la app, se da de baja para que no siga respondiendo con caché vieja.
    if (enAppNativa && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => regs.forEach((r) => r.unregister()))
        .catch(() => {
          /* si falla, no hay nada que hacer */
        });
    }

    if (productionConSW) {
      navigator.serviceWorker.addEventListener(
        "controllerchange",
        onControllerChange
      );

      const url = conBase("/sw.js");
      const scope = conBase("/");

      navigator.serviceWorker
        .register(url, { scope })
        .then((reg) => {
          regGuardada = reg;

          // Pide activar inmediatamente si ya hay un SW esperando y hay un
          // controller actual (es una actualización, no la primera instalación).
          const activarEsperando = () => {
            if (reg.waiting && navigator.serviceWorker.controller) {
              reg.waiting.postMessage("SKIP_WAITING");
            }
          };

          // Caso 1: al registrar, puede ya haber un SW esperando.
          activarEsperando();

          // Caso 2: forzamos un chequeo de versión nueva al abrir la app.
          reg.update().catch(() => {});

          // Caso 3: aparece un SW nuevo durante la sesión.
          onUpdateFound = () => {
            const nuevoSW = reg.installing;
            if (!nuevoSW) return;
            nuevoSW.addEventListener("statechange", () => {
              if (nuevoSW.state === "installed") activarEsperando();
            });
          };
          reg.addEventListener("updatefound", onUpdateFound);
        })
        .catch((err) => {
          console.warn("[PWA] no pude registrar el service worker:", err);
        });
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener("beforeinstallprompt", bloquearPrompt);
      }
      if (productionConSW) {
        navigator.serviceWorker.removeEventListener(
          "controllerchange",
          onControllerChange
        );
        if (regGuardada && onUpdateFound) {
          regGuardada.removeEventListener("updatefound", onUpdateFound);
        }
      }
    };
  }, []);

  return null;
}
