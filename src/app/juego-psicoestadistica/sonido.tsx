"use client";

/**
 * El sonido de la pantalla del Tema 1: engancha la música y los efectos de `07-sonido.md` S.6 a lo que la pantalla ya muestra.
 *
 * No toca las reglas del juego ni decide nada: solo REACCIONA a los cambios de estado de `Mesa.tsx` (fase, fichas, pose,
 * papeles abiertos…) y a los toques sobre los botones. Si el navegador no tiene Web Audio, o faltan los archivos de música,
 * todo esto no hace nada y el juego se juega igual.
 */

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { BOTONES_SELLO, FRASE, type PoseJefa } from "@/lib/juego/psicoestadistica/guion-pantalla-t1";
import {
  E01, E02, E03, E04_CLIC, E04_FIRMA, E05, E06, E07, E08, E09, E10, E11, E13, E14, ESCENA_AUDIO_T1, PLUCK_DE_CORCHO, SOPLO_DE_DANI,
  musicaDeFase, type EstadoParaMusica, type FaseT1,
} from "@/lib/juego/psicoestadistica/sonido-t1";
import { Motor, type GrupoDeEfecto } from "@/lib/juego/sonido/motor";
import type { Receta } from "@/lib/juego/sonido/receta";

let unico: Motor | null = null;
/** Un solo motor por pestaña, aunque la pantalla se vuelva a montar (por ejemplo al cambiar de versión). */
const motor = (): Motor => {
  if (!unico) {
    unico = new Motor(ESCENA_AUDIO_T1);
    // Diagnóstico: `window.__sonido()` en la consola dice si el audio está despierto, qué pista suena y a qué volumen.
    if (typeof window !== "undefined") (window as unknown as { __sonido?: () => unknown }).__sonido = () => unico?.estado();
  }
  return unico;
};

/** Qué efecto suena al apretar un botón, según su texto (los textos son los mismos del guion, no se repiten a mano). */
export function efectoDeBoton(texto: string, esPieza: boolean): Receta | "firma" | null {
  const t = texto.replace(/\s+/g, " ").trim();
  if (esPieza) return E14;
  if (t.startsWith(BOTONES_SELLO.tal)) return E04_CLIC("tal");
  if (t.startsWith(BOTONES_SELLO.frenar)) return E04_CLIC("frenar");
  if (t.startsWith(BOTONES_SELLO.frase) || t.startsWith(FRASE.boton.replace(/ ▸$/, ""))) return E04_CLIC("frase");
  if (t.startsWith(BOTONES_SELLO.si)) return "firma";
  if (/^(Atrás|Volver|Todavía no|Continuar|Jugar otra versión|Repetir|Poner las mías)/.test(t)) return E14;
  return null;
}

export interface EstadoDeSonido {
  fase: FaseT1;
  fichas: number;
  hallado: boolean;
  medidorBajo: boolean;
  lineaDeLaJefa: number;
  pose: PoseJefa;
  suena: boolean;
  daniCabecea: boolean;
  tubosVisibles: boolean;
  papelesAbiertos: number;
  leyendo: string | null;
  hayAvisoDeAyuda: boolean;
  /** Cambio de cada medidor al sellar (null si todavía no se selló), y los valores finales. */
  efecto: { c: number; voz: number } | null;
  medidores: { c: number; voz: number };
  hayTarjetaDeSobre: boolean;
}

export function useSonidoT1(e: EstadoDeSonido) {
  const [activo, setActivo] = useState(true);
  const [disponible, setDisponible] = useState(false);
  const aviso = useRef<{ parar: () => void } | null>(null);

  useEffect(() => {
    setActivo(motor().encendido);
    setDisponible(motor().disponible);
    // Las pistas se bajan desde que se abre la pantalla, sin esperar el primer toque: así la música no tarda.
    void motor().precargar().catch(() => undefined);
    // El primer toque despierta el audio del navegador (política de autoplay); también en la app de Android.
    const despertar = () => motor().desbloquear();
    window.addEventListener("pointerdown", despertar, { once: true });
    window.addEventListener("keydown", despertar, { once: true });
    return () => {
      window.removeEventListener("pointerdown", despertar);
      window.removeEventListener("keydown", despertar);
    };
  }, []);

  const sonar = useCallback((r: Receta, grupo: GrupoDeEfecto = "efectos") => motor().efecto(r, grupo), []);

  // Música: sigue la fase que se ve.
  const m: EstadoParaMusica = { fase: e.fase, fichas: e.fichas, hallado: e.hallado, medidorBajo: e.medidorBajo, lineaDeLaJefa: e.lineaDeLaJefa };
  const pedida = musicaDeFase(m);
  useEffect(() => {
    motor().musica({ escena: pedida.escena, capa: pedida.capa, relativo: pedida.relativo });
  }, [pedida.escena, pedida.capa, pedida.relativo]);

  // Papeles: abrir uno nuevo suena E01 y luego E02 (la ficha); releerlo, solo E01. En el caso 2 se cuelga en el corcho.
  const abiertos = useRef(e.papelesAbiertos);
  useEffect(() => {
    if (e.papelesAbiertos > abiertos.current) {
      window.setTimeout(() => sonar(E02), 90);
      if (e.fase === "archivo2" || e.fase === "frase") window.setTimeout(() => sonar(PLUCK_DE_CORCHO), 220);
    }
    abiertos.current = e.papelesAbiertos;
  }, [e.papelesAbiertos, e.fase, sonar]);
  useEffect(() => {
    if (e.leyendo) sonar(E01);
  }, [e.leyendo, sonar]);

  useEffect(() => {
    if (e.hayAvisoDeAyuda) sonar(E11, "avisos");
  }, [e.hayAvisoDeAyuda, sonar]);
  useEffect(() => {
    if (e.tubosVisibles) sonar(E10("sube"));
  }, [e.tubosVisibles, sonar]);
  useEffect(() => {
    if (e.daniCabecea) sonar(SOPLO_DE_DANI);
  }, [e.daniCabecea, sonar]);

  // «¿Firmar? Después no hay vuelta.»: una nota baja que se corta al responder.
  useEffect(() => {
    if (e.fase === "confirma") {
      aviso.current = sonar(E05, "avisos");
      return () => aviso.current?.parar();
    }
  }, [e.fase, sonar]);

  // La reacción: los tubos se mueven (un blip por tubo, y tres pitidos si un medidor llega a 25 o menos).
  useEffect(() => {
    if (e.fase !== "reaccion" || !e.efecto) return;
    const { c, voz } = e.efecto;
    const blip = (n: number) => (n > 0 ? E10("sube") : n < 0 ? E10("baja") : null);
    const a = blip(c);
    const b = blip(voz);
    if (a) sonar(a);
    if (b) window.setTimeout(() => sonar(b), 140);
    if (e.medidores.c <= 25 || e.medidores.voz <= 25) window.setTimeout(() => sonar(E10("alarma")), 320);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [e.fase, e.efecto]);

  // La pose de la jefa en la reacción: pulgar arriba o cabeza entre las manos (no en el asombro: ahí no suena acierto).
  useEffect(() => {
    if (e.fase !== "reaccion") return;
    if (e.pose === "pulgar") sonar(E08, "avisos");
    if (e.pose === "cabeza") sonar(E09, "avisos");
  }, [e.fase, e.pose, sonar]);

  // El teléfono de la madre: suena y la música baja un momento.
  useEffect(() => {
    if (!e.suena) return;
    sonar(E07, "avisos");
    motor().bajarMusica(0.2, 1.5);
  }, [e.suena, sonar]);

  // El sobre de la jefa cae.
  useEffect(() => {
    if (e.hayTarjetaDeSobre) sonar(E06, "avisos");
  }, [e.hayTarjetaDeSobre, sonar]);

  /** Se pone en el contenedor de la pantalla: elige el efecto del botón apretado según su texto. */
  const alApretar = useCallback(
    (ev: MouseEvent<HTMLElement>) => {
      motor().desbloquear();
      const boton = (ev.target as HTMLElement).closest("button");
      if (!boton) return;
      const r = efectoDeBoton(boton.textContent ?? "", boton.classList.contains("mesa-pieza"));
      if (r === "firma") {
        aviso.current?.parar();
        sonar(E04_FIRMA, "avisos");
      } else if (r) sonar(r);
    },
    [sonar],
  );

  const alternar = useCallback(() => {
    const nuevo = !motor().encendido;
    motor().desbloquear();
    motor().establecer(nuevo);
    setActivo(nuevo);
    if (nuevo) motor().efecto(E13);
  }, []);

  return { activo, disponible, alternar, alApretar, sonarTecla: () => sonar(E03) };
}

/** El botón de silencio: siempre visible, con área táctil de 44 px, y se esconde si el navegador no tiene audio. */
export function BotonSonido({ activo, disponible, alternar }: { activo: boolean; disponible: boolean; alternar: () => void }) {
  if (!disponible) return null;
  return (
    <button type="button" className="mesa-sonido" onClick={alternar} aria-pressed={activo} aria-label={activo ? "Sonido: sí. Toca para silenciar" : "Sonido: no. Toca para activar"}>
      <span aria-hidden="true">{activo ? "♪" : "✕"}</span>
      <span className="mesa-sonido-txt">{activo ? "Sonido" : "Mudo"}</span>
    </button>
  );
}
