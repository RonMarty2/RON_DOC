/**
 * El motor de sonido (Web Audio), común a todos los juegos: música por escenas y capas con fundido cruzado, efectos
 * sintetizados desde `Receta`s, botón de silencio recordado y pausa en segundo plano.
 *
 * Reglas (07-sonido.md S.6.3 y S.6.4):
 *  - El audio solo arranca tras un toque del alumno (`desbloquear`).
 *  - Si algo falla (sin Web Audio, sin manifiesto, sin archivo) hay silencio y el juego sigue: nada de aquí lanza.
 *  - Silenciar corta música y efectos; se recuerda en `ron-doc-juego:sonido` (`si` / `no`).
 *  - La música y los efectos se pausan si la pestaña o la app pasa a segundo plano.
 *
 * No se puede probar sin navegador: lo que sí se prueba (leer el manifiesto, elegir la pista, las recetas) está en archivos
 * hermanos sin Web Audio. Este archivo se revisa escuchándolo.
 */

import { conBase } from "@/lib/rutas";
import { MANIFIESTO_VACIO, leerManifiesto, pistaDe, type Capa, type Manifiesto } from "./manifiesto";
import { duracionDe, type Receta } from "./receta";

export const CLAVE_SONIDO = "ron-doc-juego:sonido";

export type GrupoDeEfecto = "efectos" | "avisos";

export interface Pedida {
  escena: string | null;
  capa: Capa;
  /** Multiplica el volumen de la música (1 = normal, 0,6 = más baja). */
  relativo?: number;
}

export const leerPreferenciaDeSonido = (): boolean => {
  try {
    return window.localStorage.getItem(CLAVE_SONIDO) !== "no";
  } catch {
    return true;
  }
};

const guardarPreferenciaDeSonido = (activo: boolean) => {
  try {
    window.localStorage.setItem(CLAVE_SONIDO, activo ? "si" : "no");
  } catch {
    // sin lugar o bloqueado: se sigue, solo que no se recuerda
  }
};

type Ctx = AudioContext;
const crearContexto = (): Ctx | null => {
  try {
    const W = window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext };
    const C = W.AudioContext ?? W.webkitAudioContext;
    return C ? new C() : null;
  } catch {
    return null;
  }
};

export class Motor {
  private ctx: Ctx | null = null;
  private maestro: GainNode | null = null;
  private busMusica: GainNode | null = null;
  private busDucking: GainNode | null = null;
  private manifiesto: Manifiesto = MANIFIESTO_VACIO;
  private manifiestoListo: Promise<void> | null = null;
  private buffers = new Map<string, Promise<AudioBuffer | null>>();
  private ruido: AudioBuffer | null = null;
  private activoPref = true;
  private pedida: Pedida | null = null;
  private sonando: { id: string; fuente: AudioBufferSourceNode; ganancia: GainNode } | null = null;
  private aviso: { parar: () => void } | null = null;
  private reducirMovimiento = false;

  constructor(private readonly carpeta: string) {
    if (typeof window !== "undefined") {
      this.activoPref = leerPreferenciaDeSonido();
      try {
        this.reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      } catch {
        this.reducirMovimiento = false;
      }
      document.addEventListener("visibilitychange", () => (document.hidden ? void this.ctx?.suspend() : void this.reanudar()));
    }
  }

  /** Lo que está pasando con el audio, para diagnosticar sin oír (se puede leer desde la consola: `window.__sonido()`). */
  estado() {
    return {
      contexto: this.ctx ? this.ctx.state : "sin crear",
      encendido: this.activoPref,
      manifiestoPistas: Object.keys(this.manifiesto.pistas).length,
      pedida: this.pedida,
      sonando: this.sonando ? this.sonando.id : null,
      gananciaDeLaPista: this.sonando ? Number(this.sonando.ganancia.gain.value.toFixed(3)) : null,
      volumenDeMusica: this.busMusica ? Number(this.busMusica.gain.value.toFixed(3)) : null,
      maestro: this.maestro ? Number(this.maestro.gain.value.toFixed(3)) : null,
    };
  }

  /** ¿Este navegador sabe reproducir audio con Web Audio? Si no, el botón de silencio no se muestra. */
  get disponible(): boolean {
    if (typeof window === "undefined") return false;
    const W = window as unknown as { AudioContext?: unknown; webkitAudioContext?: unknown };
    return Boolean(W.AudioContext ?? W.webkitAudioContext);
  }

  get encendido(): boolean {
    return this.activoPref;
  }

  private async reanudar() {
    try {
      if (this.activoPref) await this.ctx?.resume();
    } catch {
      // sin permiso: se oirá tras el próximo toque
    }
  }

  /** Se llama dentro de un toque del alumno (el primero): crea el audio, lo despierta y baja el manifiesto. */
  desbloquear(): void {
    if (!this.disponible) return;
    if (!this.ctx) {
      this.ctx = crearContexto();
      if (!this.ctx) return;
      this.maestro = this.ctx.createGain();
      this.maestro.gain.value = this.activoPref ? 1 : 0;
      this.maestro.connect(this.ctx.destination);
      this.busDucking = this.ctx.createGain();
      this.busDucking.connect(this.maestro);
      this.busMusica = this.ctx.createGain();
      this.busMusica.gain.value = this.manifiesto.volumen.musica;
      this.busMusica.connect(this.busDucking);
    }
    void this.ctx.resume().catch(() => undefined);
    this.manifiestoListo ??= this.bajarManifiesto();
    void this.manifiestoListo.then(() => this.aplicarPedida());
  }

  private async bajarManifiesto() {
    try {
      const r = await fetch(conBase(`${this.carpeta}/manifiesto.json`), { cache: "no-cache" });
      if (!r.ok) return;
      this.manifiesto = leerManifiesto(await r.json());
      if (this.busMusica) this.busMusica.gain.value = this.manifiesto.volumen.musica;
    } catch {
      // sin manifiesto: no hay música, solo efectos
    }
  }

  /** Silenciar o activar: corta o devuelve todo el sonido y lo recuerda. */
  establecer(activo: boolean): void {
    this.activoPref = activo;
    guardarPreferenciaDeSonido(activo);
    if (this.maestro && this.ctx) this.maestro.gain.setTargetAtTime(activo ? 1 : 0, this.ctx.currentTime, 0.03);
    if (activo) void this.reanudar();
  }

  // ── Música ─────────────────────────────────────────────────────────────────

  private buffer(id: string, archivo: string): Promise<AudioBuffer | null> {
    let b = this.buffers.get(id);
    if (!b) {
      b = (async () => {
        try {
          // Se pide con `Range`: sin él, el servidor de prueba de Next entrega «204 vacío» a un fetch de audio (se vio el 09-10:
          // el manifiesto cargaba y ninguna pista sonaba). Con Range, GitHub Pages y el servidor de prueba entregan el archivo.
          const r = await fetch(conBase(`${this.carpeta}/${archivo}`), { headers: { Range: "bytes=0-" } });
          if (!(r.status === 200 || r.status === 206) || !this.ctx) return null;
          const datos = await r.arrayBuffer();
          if (datos.byteLength === 0) return null;
          return await this.ctx.decodeAudioData(datos);
        } catch {
          return null;
        }
      })().then((buf) => {
        // Un fallo no se recuerda: se vuelve a intentar la próxima vez que se pida esa pista.
        if (!buf) this.buffers.delete(id);
        return buf;
      });
      this.buffers.set(id, b);
    }
    return b;
  }

  /** Pide qué música tiene que sonar (escena y capa). Si todavía no se puede, queda pedida y suena apenas se pueda. */
  musica(p: Pedida): void {
    const igual = this.pedida && this.pedida.escena === p.escena && this.pedida.capa === p.capa && (this.pedida.relativo ?? 1) === (p.relativo ?? 1);
    this.pedida = p;
    if (!igual) this.aplicarPedida();
  }

  private aplicarPedida() {
    const ctx = this.ctx;
    const bus = this.busMusica;
    if (!ctx || !bus) return;
    const p = this.pedida;
    const elegida = p && p.escena ? pistaDe(this.manifiesto, p.escena, p.capa) : null;
    const fundido = this.reducirMovimiento ? 0.3 : 1;
    const relativo = p?.relativo ?? 1;

    if (!elegida) {
      this.cortarActual(fundido * 2);
      return;
    }
    const { id, pista } = elegida;
    if (this.sonando?.id === id) {
      this.sonando.ganancia.gain.setTargetAtTime(pista.volumen * relativo, ctx.currentTime, 0.2);
      return;
    }
    void this.buffer(id, pista.archivo).then((buf) => {
      // Mientras cargaba, el pedido pudo cambiar: se toca solo lo que sigue pedido.
      const vigente = this.pedida && this.pedida.escena && pistaDe(this.manifiesto, this.pedida.escena, this.pedida.capa)?.id === id;
      if (!buf || !vigente || !this.ctx || !this.busMusica) return;
      this.cortarActual(fundido);
      const fuente = this.ctx.createBufferSource();
      fuente.buffer = buf;
      fuente.loop = pista.bucle;
      const ganancia = this.ctx.createGain();
      ganancia.gain.value = 0;
      ganancia.gain.setTargetAtTime(pista.volumen * relativo, this.ctx.currentTime, fundido / 3);
      fuente.connect(ganancia).connect(this.busMusica);
      fuente.start();
      const mia = { id, fuente, ganancia };
      this.sonando = mia;
      if (!pista.bucle) {
        fuente.onended = () => {
          if (this.sonando === mia) {
            this.sonando = null;
            // Una pista que no es de bucle (el remate) termina y vuelve la calma de la escena.
            if (this.pedida) this.musica({ ...this.pedida, capa: "calma", relativo: 0.6 });
          }
        };
      }
    });
  }

  private cortarActual(segundos: number) {
    const s = this.sonando;
    if (!s || !this.ctx) return;
    this.sonando = null;
    s.fuente.onended = null;
    s.ganancia.gain.setTargetAtTime(0, this.ctx.currentTime, Math.max(0.05, segundos / 3));
    try {
      s.fuente.stop(this.ctx.currentTime + segundos + 0.2);
    } catch {
      // ya estaba detenida
    }
  }

  /** Baja la música a un factor de su volumen durante unos segundos (el teléfono de la madre). Con «reducir movimiento» no se mueve. */
  bajarMusica(factor: number, segundos: number): void {
    if (!this.ctx || !this.busDucking || this.reducirMovimiento) return;
    const t = this.ctx.currentTime;
    this.busDucking.gain.cancelScheduledValues(t);
    this.busDucking.gain.setTargetAtTime(factor, t, 0.08);
    this.busDucking.gain.setTargetAtTime(1, t + segundos, 0.2);
  }

  // ── Efectos ────────────────────────────────────────────────────────────────

  private bufferDeRuido(): AudioBuffer | null {
    if (!this.ctx) return null;
    if (!this.ruido) {
      const largo = this.ctx.sampleRate;
      const b = this.ctx.createBuffer(1, largo, this.ctx.sampleRate);
      const d = b.getChannelData(0);
      for (let i = 0; i < largo; i++) d[i] = Math.random() * 2 - 1;
      this.ruido = b;
    }
    return this.ruido;
  }

  /** Toca un efecto. Devuelve cómo pararlo. Un aviso nuevo corta el aviso anterior (nunca dos a la vez). */
  efecto(receta: Receta, grupo: GrupoDeEfecto = "efectos"): { parar: () => void } {
    const nada = { parar: () => undefined };
    const ctx = this.ctx;
    if (!ctx || !this.maestro || !this.activoPref) return nada;
    const volumen = this.manifiesto.volumen[grupo];
    const fuentes: AudioScheduledSourceNode[] = [];
    const salida = ctx.createGain();
    salida.connect(this.maestro);
    const t0 = ctx.currentTime + 0.01;
    try {
      for (const n of receta) {
        const g = ctx.createGain();
        const pico = (n.vol ?? 0.5) * volumen;
        const ini = t0 + n.inicio;
        g.gain.setValueAtTime(0.0001, ini);
        g.gain.linearRampToValueAtTime(pico, ini + Math.min(0.006, n.dur / 3));
        g.gain.exponentialRampToValueAtTime(0.0001, ini + n.dur);
        let f: AudioScheduledSourceNode;
        if (n.onda === "ruido") {
          const s = ctx.createBufferSource();
          s.buffer = this.bufferDeRuido();
          s.loop = true;
          f = s;
        } else {
          const o = ctx.createOscillator();
          o.type = n.onda;
          o.frequency.setValueAtTime(n.desde, ini);
          if (n.hasta !== undefined) o.frequency.linearRampToValueAtTime(n.hasta, ini + n.dur);
          f = o;
        }
        f.connect(g).connect(salida);
        f.start(ini);
        f.stop(ini + n.dur + 0.02);
        fuentes.push(f);
      }
    } catch {
      return nada;
    }
    const parar = () => {
      for (const f of fuentes) {
        try {
          f.stop();
        } catch {
          // ya terminó
        }
      }
      salida.disconnect();
    };
    if (grupo === "avisos") {
      this.aviso?.parar();
      this.aviso = { parar };
    }
    window.setTimeout(() => salida.disconnect(), (duracionDe(receta) + 0.2) * 1000);
    return { parar };
  }
}
