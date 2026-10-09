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

import { useEffect, useRef } from "react";
import { conBase } from "@/lib/rutas";
import type { PoseJefa } from "@/lib/juego/psicoestadistica/guion-pantalla-t1";

export const ESCENA_ANCHO = 188;
export const ESCENA_ALTO = 150;

export type Emote = "alerta" | "duda" | "feliz" | null;

const IMG = (n: string) => conBase(`/juego/psicoestadistica/${n.startsWith("arte/") ? n : `prov_${n}`}.png`);
const POSE: Record<PoseJefa, string> = { brazos: "arte/jefa_neutral", cabeza: "arte/jefa_preocupada", pulgar: "arte/jefa_contenta" };

interface Api {
  poner: (o: { pose: PoseJefa; suena: boolean; daniCabecea: boolean; verJefa: boolean; verDani: boolean }) => void;
  destruir: () => void;
}

export function EscenaPixi({ pose, suena, daniCabecea, verJefa = true, verDani = true }: { pose: PoseJefa; suena: boolean; daniCabecea: boolean; verJefa?: boolean; verDani?: boolean }) {
  const caja = useRef<HTMLDivElement>(null);
  const api = useRef<Api | null>(null);
  const ultimo = useRef({ pose, suena, daniCabecea, verJefa, verDani });
  ultimo.current = { pose, suena, daniCabecea, verJefa, verDani };

  useEffect(() => {
    let vivo = true;
    (async () => {
      const PIXI = await import("pixi.js");
      if (!vivo || !caja.current) return;
      PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;
      const app = new PIXI.Application({ width: ESCENA_ANCHO, height: ESCENA_ALTO, backgroundColor: 0x07060d, antialias: false, resolution: 1 });
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
      mosaico("arte/pared_ladrillo", 0, 120);
      // La oficina de noche: ventana con la luna y las luces de la ciudad, reloj con estante de libros, pizarrón.
      sprite("arte/ventana_noche", 4, 6);
      sprite("arte/reloj_estante", 84, 8);
      sprite("arte/pizarron", 130, 10);
      const jefa = sprite(POSE[ultimo.current.pose], 118, 60);
      jefa.scale.set(2);
      mosaico("arte/escritorio_madera", 120, ESCENA_ALTO - 120);
      const telefono = sprite("arte/icono_telefono", 40, 92);
      sprite("arte/lampara_mesa", 6, 82);

      // La noche: un velo oscuro, y la luz de la lámpara y de la ventana por encima.
      const velo = new PIXI.Sprite(PIXI.Texture.WHITE);
      velo.width = ESCENA_ANCHO;
      velo.height = ESCENA_ALTO;
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
      const brillo = luz("luz", 24, 82, 1.2, 0xffc070, 0.55);
      luz("luz", 40, 30, 0.7, 0x6a86ff, 0.2);
      const motas = Array.from({ length: 18 }, (_, i) => {
        const m = new PIXI.Sprite(tex("mota"));
        m.blendMode = PIXI.BLEND_MODES.ADD;
        m.alpha = 0.6;
        m.x = 10 + ((i * 37) % 70);
        m.y = 70 + ((i * 23) % 50);
        app.stage.addChild(m);
        return { m, f: i * 0.9, v: 0.03 + (i % 5) * 0.012 };
      });

      let t0 = 0;
      app.ticker.add((delta) => {
        t0 += delta / 60;
        brillo.alpha = 0.5 + Math.sin(t0 * 3.1) * 0.03;
        for (const o of motas) {
          o.m.y -= o.v * delta;
          o.m.x += Math.sin(t0 * 0.8 + o.f) * 0.05 * delta;
          if (o.m.y < 60) o.m.y = 122;
        }
        const u = ultimo.current;
        telefono.x = u.suena ? 40 + (Math.sin(t0 * 40) > 0 ? 1 : -1) : 40;
        telefono.y = u.suena ? 92 + (Math.sin(t0 * 33) > 0 ? -1 : 0) : 92;
      });

      api.current = {
        poner: (o) => {
          jefa.texture = tex(POSE[o.pose]);
          jefa.visible = o.verJefa;
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
  }, []);

  useEffect(() => {
    api.current?.poner({ pose, suena, daniCabecea, verJefa, verDani });
  }, [pose, suena, daniCabecea, verJefa, verDani]);

  return (
    <div className="mesa-escena">
      <div ref={caja} />
    </div>
  );
}
