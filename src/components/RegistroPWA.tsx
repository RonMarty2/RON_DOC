"use client";

import { useEffect } from "react";
import { conBase } from "@/lib/rutas";

/**
 * Registra el service worker para habilitar instalación PWA y offline.
 * Sólo se registra en producción y si el navegador lo soporta.
 */
export function RegistroPWA() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const url = conBase("/sw.js");
    const scope = conBase("/");

    navigator.serviceWorker.register(url, { scope }).catch((err) => {
      console.warn("[PWA] no pude registrar el service worker:", err);
    });
  }, []);

  return null;
}
