"use client";

/**
 * La oficina de noche («La redacción de noche», Dirección A), dibujada con PixiJS.
 *
 * Es solo lo que se VE y se mueve: la jefa, Dani, la luz de la lámpara con polvo, el teléfono que suena. Todo lo que el alumno
 * lee o toca (diálogos, papeles, botones, tubos) es HTML en `Mesa.tsx`, para que se lea bien, se pueda tocar con el dedo y
 * funcione con el lector de pantalla. El arte es el de la línea gráfica propia (`public/juego/psicoestadistica/arte/`); solo la luz y el polvo siguen siendo provisionales.
 *
 * PixiJS se carga recién cuando la escena aparece: el resto del sitio no paga su peso.
 */

import { useEffect, useRef, useState } from "react";
import { conBase } from "@/lib/rutas";
import type { PoseJefa } from "@/lib/juego/psicoestadistica/guion-pantalla-t1";
import { HUECOS_CIUDAD, ORDEN_VENTANITAS, amanecer, angulosReloj, posicionLuna, ventanitasEncendidas } from "@/lib/juego/psicoestadistica/hora-historia";

export const ESCENA_ANCHO = 188;
export const ESCENA_ALTO = 150;

export type Emote = "alerta" | "duda" | "feliz" | null;

const IMG = (n: string) => conBase(`/juego/psicoestadistica/${n.startsWith("arte/") ? n : `prov_${n}`}.png`);
const POSE: Record<PoseJefa, string> = { brazos: "arte/jefa_neutral", cabeza: "arte/jefa_preocupada", pulgar: "arte/jefa_contenta" };

interface Api {
  poner: (o: { pose: PoseJefa; suena: boolean; daniCabecea: boolean; verJefa: boolean; verDani: boolean; hora: number }) => void;
  destruir: () => void;
}

/** `hora`: minutos desde las 23:00 (0 a 390); ver `hora-historia.ts`. */
export function EscenaPixi({ pose, suena, daniCabecea, verJefa = true, verDani = true, hora = 0 }: { pose: PoseJefa; suena: boolean; daniCabecea: boolean; verJefa?: boolean; verDani?: boolean; hora?: number }) {
  const caja = useRef<HTMLDivElement>(null);
  const marco = useRef<HTMLDivElement>(null);
  const api = useRef<Api | null>(null);
  // La oficina llena todo el espacio de la pantalla (no solo una franja): el alto lógico sale de la forma del contenedor.
  const [alto, setAlto] = useState<number | null>(null);
  const ultimo = useRef({ pose, suena, daniCabecea, verJefa, verDani, hora });
  ultimo.current = { pose, suena, daniCabecea, verJefa, verDani, hora };

  useEffect(() => {
    const medir = () => {
      const r = marco.current?.getBoundingClientRect();
      if (!r || r.width === 0) return;
      const a = Math.max(ESCENA_ALTO, Math.round((ESCENA_ANCHO * r.height) / r.width / 4) * 4);
      setAlto((antes) => (antes === a ? antes : a));
    };
    medir();
    const o = typeof ResizeObserver !== "undefined" && marco.current ? new ResizeObserver(medir) : null;
    if (o && marco.current) o.observe(marco.current);
    return () => o?.disconnect();
  }, []);

  useEffect(() => {
    if (alto === null) return;
    let vivo = true;
    (async () => {
      const PIXI = await import("pixi.js");
      if (!vivo || !caja.current) return;
      PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;
      const app = new PIXI.Application({ width: ESCENA_ANCHO, height: alto, backgroundColor: 0x07060d, antialias: false, resolution: 1 });
      const vista = app.view as HTMLCanvasElement;
      vista.setAttribute("role", "img");
      vista.setAttribute("aria-label", "Oficina del Departamento de Orientación, de noche, con la jefa tras el escritorio, la ventana con la luna y la lámpara sobre el escritorio.");
      caja.current.appendChild(vista);

      const tex = (n: string) => PIXI.Texture.from(IMG(n));
      const sprite = (n: string, x: number, y: number) => {
        const s = new PIXI.Sprite(tex(n));
        s.position.set(x, y);
        app.stage.addChild(s);
        return s;
      };

      // Arte propio (línea gráfica EDG32): pared y escritorio son una pieza repetida; las figuras se dibujan al doble de tamaño.
      const mosaico = (n: string, y: number, alto: number) => {
        const m = new PIXI.TilingSprite(tex(n), ESCENA_ANCHO, alto);
        m.position.set(0, y);
        app.stage.addChild(m);
        return m;
      };
      // Encuadre: en un celular vertical la oficina es alta. El escritorio empieza al 45 % del alto; lo de la pared baja bajo los
      // medidores (franja de arriba); la jefa y lo del escritorio acompañan al escritorio. Con el alto de siempre (150) queda como antes.
      const alta = alto > ESCENA_ALTO;
      const suelo = alta ? Math.round(alto * 0.45) : 120;
      const dy = suelo - 120;
      const arriba = alta ? 54 : 0;
      mosaico("arte/pared_ladrillo", 0, suelo);
      // La oficina de noche: ventana con la luna y las luces de la ciudad, reloj con estante de libros, pizarrón.
      // Ventana viva por capas (hueco de 68×52 a 4,4 dentro del marco de 76×60): cielo, estrellas, luna, nube, ciudad con ventanitas.
      const VX = 4;
      const VY = 6 + arriba;
      const cielo = new PIXI.Container();
      cielo.position.set(VX + 4, VY + 4);
      const recorte = new PIXI.Graphics();
      recorte.beginFill(0xffffff).drawRect(VX + 4, VY + 4, 68, 52).endFill();
      app.stage.addChild(recorte);
      cielo.mask = recorte;
      app.stage.addChild(cielo);
      const enCielo = (n: string, x: number, y: number) => {
        const s = new PIXI.Sprite(tex(n));
        s.position.set(x, y);
        cielo.addChild(s);
        return s;
      };
      enCielo("arte/cielo_noche", 0, 0);
      const alba = enCielo("arte/cielo_alba", 0, 0);
      const estrellas = enCielo("arte/estrellas", 0, 0);
      const luna = enCielo("arte/luna", 50, 5);
      const nube = enCielo("arte/nube", -14, 12);
      nube.alpha = 0.6;
      enCielo("arte/ciudad_siluetas", 0, 32);
      const ventanitas = new PIXI.Graphics();
      ventanitas.position.set(0, 32);
      cielo.addChild(ventanitas);
      sprite("arte/ventana_marco", VX, VY);
      // Reloj con la hora exacta: la cara es un dibujo y las manecillas se pintan con código, pixel a pixel.
      sprite("arte/estante_libros", 84, 18 + arriba);
      sprite("arte/reloj_cara", 98, 6 + arriba);
      const manecillas = new PIXI.Graphics();
      app.stage.addChild(manecillas);
      const RX = 98 + 8;
      const RY = 6 + arriba + 8;
      const reducido = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      sprite("arte/pizarron", 130, 10 + arriba);
      const jefa = sprite(POSE[ultimo.current.pose], 118, 60 + dy);
      jefa.scale.set(2);
      mosaico("arte/escritorio_madera", suelo, alto - suelo);
      const telefono = sprite("arte/icono_telefono", 40, 92 + dy);
      sprite("arte/lampara_mesa", 6, 82 + dy);

      // La noche: un velo oscuro, y la luz de la lámpara y de la ventana por encima.
      const velo = new PIXI.Sprite(PIXI.Texture.WHITE);
      velo.width = ESCENA_ANCHO;
      velo.height = alto;
      velo.tint = 0x05040c;
      velo.alpha = 0.25;
      app.stage.addChild(velo);
      const luz = (n: string, x: number, y: number, escala: number, tinte: number, alfa: number) => {
        const t = tex(n);
        t.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
        const s = new PIXI.Sprite(t);
        s.anchor.set(0.5);
        s.position.set(x, y);
        s.scale.set(escala);
        s.tint = tinte;
        s.alpha = alfa;
        s.blendMode = PIXI.BLEND_MODES.ADD;
        app.stage.addChild(s);
        return s;
      };
      const brillo = luz("luz", 24, 82 + dy, 1.2, 0xffc070, 0.55);
      luz("luz", 40, 30 + arriba, 0.7, 0x6a86ff, 0.2);
      const motas = Array.from({ length: 18 }, (_, i) => {
        const m = new PIXI.Sprite(tex("mota"));
        m.blendMode = PIXI.BLEND_MODES.ADD;
        m.alpha = 0.6;
        m.x = 10 + ((i * 37) % 70);
        m.y = 70 + dy + ((i * 23) % 50);
        app.stage.addChild(m);
        return { m, f: i * 0.9, v: 0.03 + (i % 5) * 0.012 };
      });

      // La hora que se ve avanza sola hacia la que toca (con «reducir movimiento», salta de una vez).
      let horaVista = ultimo.current.hora;
      let ultimaDibujada = -1;
      let siguienteParpadeo = 3;
      const parpadeo = new Set<number>();
      const dibujarHora = (p: number) => {
        const a = amanecer(p);
        alba.alpha = a;
        estrellas.alpha = 1 - a;
        luna.alpha = 1 - 0.6 * a;
        const l = posicionLuna(p);
        luna.position.set(l.x, l.y);
        const n = ventanitasEncendidas(p);
        ventanitas.clear();
        ORDEN_VENTANITAS.forEach((h, i) => {
          if ((i < n) === parpadeo.has(h)) return;
          const [x, y] = HUECOS_CIUDAD[h];
          ventanitas.beginFill(a > 0.5 ? 0xfeae34 : 0xfee761).drawRect(x, y, 2, 2).endFill();
        });
        manecillas.clear();
        const ang = angulosReloj(p);
        const punta = (largo: number, rad: number, color: number) => {
          for (let r = 0; r <= largo; r++) manecillas.beginFill(color).drawRect(Math.round(RX + Math.cos(rad) * r), Math.round(RY + Math.sin(rad) * r), 1, 1).endFill();
        };
        punta(4, ang.hora, 0x3e2731);
        punta(6, ang.minuto, 0x181425);
        ultimaDibujada = p;
      };
      dibujarHora(horaVista);

      let t0 = 0;
      app.ticker.add((delta) => {
        t0 += delta / 60;
        const meta = ultimo.current.hora;
        if (horaVista !== meta) horaVista = reducido ? meta : horaVista + Math.sign(meta - horaVista) * Math.min(Math.abs(meta - horaVista), 40 * (delta / 60));
        if (!reducido) {
          nube.x = ((t0 * 1.2) % 96) - 14;
          if (t0 > siguienteParpadeo) {
            siguienteParpadeo = t0 + 3 + (Math.floor(t0 * 7) % 4);
            const n = ventanitasEncendidas(horaVista);
            const h = ORDEN_VENTANITAS[Math.max(0, Math.min(15, n - (Math.floor(t0) % 2)))];
            if (parpadeo.has(h)) parpadeo.delete(h);
            else parpadeo.add(h);
            ultimaDibujada = -1;
          }
        }
        if (horaVista !== ultimaDibujada) dibujarHora(horaVista);
        brillo.alpha = 0.5 + Math.sin(t0 * 3.1) * 0.03;
        for (const o of motas) {
          o.m.y -= o.v * delta;
          o.m.x += Math.sin(t0 * 0.8 + o.f) * 0.05 * delta;
          if (o.m.y < 60 + dy) o.m.y = 122 + dy;
        }
        const u = ultimo.current;
        telefono.x = u.suena ? 40 + (Math.sin(t0 * 40) > 0 ? 1 : -1) : 40;
        telefono.y = u.suena ? 92 + dy + (Math.sin(t0 * 33) > 0 ? -1 : 0) : 92 + dy;
      });

      api.current = {
        poner: (o) => {
          jefa.texture = tex(POSE[o.pose]);
          jefa.visible = o.verJefa;
          if (reducido) horaVista = o.hora;
        },
        destruir: () => {
          app.destroy(true, { children: true });
        },
      };
      api.current.poner(ultimo.current);
    })().catch(() => {
      // Sin PixiJS (o sin WebGL) la escena queda vacía y el juego se sigue jugando con el texto: no se corta.
    });
    return () => {
      vivo = false;
      api.current?.destruir();
      api.current = null;
    };
  }, [alto]);

  useEffect(() => {
    api.current?.poner({ pose, suena, daniCabecea, verJefa, verDani, hora });
  }, [pose, suena, daniCabecea, verJefa, verDani, hora]);

  return (
    <div className="mesa-escena" ref={marco}>
      <div ref={caja} />
    </div>
  );
}
