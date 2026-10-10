"use client";

/**
 * «La mesa de verificación» · Tema 1 de Psicoestadística Descriptiva · el Paso 1 y el Caso 2 (BORRADOR, arte provisional).
 *
 * Esta pantalla solo muestra y recoge lo que toca el alumno; las reglas, las cifras y los pagos vienen de
 * `src/lib/juego/psicoestadistica/` (con sus pruebas). Lo que lee el alumno es HTML (legible, táctil); la escena que se ve
 * es de PixiJS (`EscenaPixi.tsx`). La partida es el registro de eventos (se guarda en el navegador y se retoma repitiéndolos).
 */

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { sobre } from "@/lib/juego/psicoestadistica/ayuda";
import { paqueteT1, fechaAnio, type PaqueteT1 } from "@/lib/juego/psicoestadistica/cifras";
import { abrirCarpeta, abrirPapel, estaAbierto, fichasRestantes, type CarpetaAbierta } from "@/lib/juego/psicoestadistica/carpeta";
import {
  abrirEnPaso1,
  abrioSuenoPaso1,
  avanceDeEventos,
  entradaDeFrase2,
  fichasPaso1,
  fraseValida,
  papelesVistosPaso1,
  paso1Nuevo,
  piezasDisponibles2,
  PIEZAS_MAX,
  resolverDecision2,
  type Paso1Estado,
  type PiezaDeFrase,
} from "@/lib/juego/psicoestadistica/flujo-t1";
import * as G from "@/lib/juego/psicoestadistica/guion-pantalla-t1";
import { abrirCaso, anotarEfecto, cerrarCaso, medidoresIniciales } from "@/lib/juego/psicoestadistica/medidores";
import { numero, papelDe } from "@/lib/juego/psicoestadistica/papeles-t1";
import { ESCENA_T1, MARCA_BAJA, META_CIERRE, type EventoT1, type Medidores } from "@/lib/juego/psicoestadistica/reglas-t1";
import { resolverCaso2, type ResultadoCaso } from "@/lib/juego/psicoestadistica/respuestas";
import { semillaDeAlumno } from "@/lib/juego/psicoestadistica/version";
import { anotarEn, guardarPartidaDe, leerPartidaDe, partidaNuevaDe, type PartidaDe } from "@/lib/juego/partida";
import { VERSION_MAXIMA } from "@/lib/juego/planta";
import { useCuenta } from "../juego-proyectos/CuentaJuego";
import { conBase } from "@/lib/rutas";
import { minutosDeFase } from "@/lib/juego/psicoestadistica/hora-historia";
import { EscenaPixi } from "./EscenaPixi";
import { BotonSonido, useSonidoT1 } from "./sonido";

type Partida = PartidaDe<EventoT1, "psicoestadistica", "tema1">;
type Fase = "titulo" | "bienvenida" | "jefa" | "hoja" | "archivo1" | "asombro" | "cierre1" | "entrada2" | "archivo2" | "frase" | "confirma" | "reaccion" | "fin";
type Decision = "tal" | "frenar" | "frase";
type Quien = "jefa" | "dani" | "beto" | "madre" | "director" | "tu" | "narracion";

interface Linea {
  quien: Quien;
  texto: string;
  pose?: G.PoseJefa;
  suena?: boolean;
  tubos?: boolean;
}

const nuevaPartida = (v: number): Partida => partidaNuevaDe<EventoT1, "psicoestadistica", "tema1">(ESCENA_T1, v);
const CLAVE_SEMILLA = "ron-doc-juego:psicoestadistica:semilla-prueba";

function semillaDePrueba(nueva = false): number {
  try {
    const guardada = Number(window.localStorage.getItem(CLAVE_SEMILLA));
    if (!nueva && Number.isInteger(guardada) && guardada >= 1 && guardada <= VERSION_MAXIMA) return guardada;
    const s = 1 + Math.floor(Math.random() * VERSION_MAXIMA);
    window.localStorage.setItem(CLAVE_SEMILLA, String(s));
    return s;
  } catch {
    return 1 + Math.floor(Math.random() * VERSION_MAXIMA);
  }
}

const MESES = ["febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre"];
const COL2 = { minutos: "minutos de celular", animo: "ánimo del día" } as const;

function nombreDe(q: Quien, p: PaqueteT1): string {
  return { jefa: "La jefa", dani: p.version.textos.dani, beto: "Beto", madre: "Señora Quiroga (teléfono)", director: "Dirección (nota)", tu: "Tú", narracion: "" }[q];
}

// La cara (o el icono) de quien habla, de la línea gráfica propia. La narración no lleva cara.
export const CARA: Record<Exclude<Quien, "narracion" | "tu">, string> = {
  jefa: "jefa_retrato",
  dani: "dani_silueta",
  beto: "beto_retrato",
  madre: "icono_telefono",
  director: "icono_nota",
};

const CARA_JEFA: Record<G.PoseJefa, string> = { brazos: "jefa_retrato", cabeza: "jefa_preocupada", pulgar: "jefa_contenta" };

/** Qué dibujo de documento lleva un papel, según su nombre (arte propio, 40x50). Sin coincidencia queda el símbolo de texto. */
const DOC_POR_PALABRA: [RegExp, string][] = [
  [/acta/i, "doc_acta"], [/cuaderno/i, "doc_cuaderno"], [/informe/i, "doc_informe"], [/correo|mensaje/i, "doc_correo"],
  [/registro|tardanza/i, "doc_registro"], [/planilla|notas|encuesta/i, "doc_planilla"], [/lista|talleres/i, "doc_lista"], [/calendario/i, "doc_calendario"], [/oficio|nota de|carta/i, "doc_oficio"],
];
export const docDe = (nombre: string): string | null => DOC_POR_PALABRA.find(([r]) => r.test(nombre))?.[1] ?? null;

// ── Piezas chicas ────────────────────────────────────────────────────────────

function Dialogo({ lineas, p, onFin, onLinea, fin = "Seguir >" }: { lineas: Linea[]; p: PaqueteT1; onFin: () => void; onLinea?: (l: Linea) => void; fin?: string }) {
  const [i, setI] = useState(0);
  const aviso = useRef(onLinea);
  aviso.current = onLinea;
  useEffect(() => {
    aviso.current?.(lineas[i]);
  }, [i, lineas]);
  const l = lineas[i];
  const hayMas = i + 1 < lineas.length;
  return (
    <div className={`${l.quien === "tu" ? "mesa-dialogo tuyo" : "mesa-dialogo"} q-${l.quien}`} role="group" aria-label="Diálogo">
      <div className={l.quien === "narracion" || l.quien === "tu" ? "mesa-dlg" : "mesa-dlg con-cara"}>
        {l.quien !== "narracion" && l.quien !== "tu" && <img className="mesa-cara" src={conBase(`/juego/psicoestadistica/arte/${(l.quien === "jefa" && l.pose ? CARA_JEFA[l.pose] : CARA[l.quien])}.png`)} alt="" width={64} height={64} />}
        <div className="mesa-dlg-texto">
          {l.quien !== "narracion" && <div className="mesa-quien">{nombreDe(l.quien, p)}</div>}
          <p className={l.quien === "narracion" ? "mesa-narra" : undefined} aria-live="polite">
            {l.texto}
          </p>
        </div>
      </div>
      <button type="button" className="mesa-boton" onClick={() => (hayMas ? setI(i + 1) : onFin())}>
        {hayMas ? "Siguiente >" : fin}
      </button>
    </div>
  );
}

/** Una frase por renglón, con aire entre ellas: un bloque corrido de 3 o 4 frases cansa y no se entiende (Ronald 09-10). */
const enFrases = (texto: string): string[] => texto.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡«])/);

/** Lo que dice la jefa en pantalla, en citas cortas y separadas. */
function Cita({ texto }: { texto: string }) {
  const frases = enFrases(texto);
  return (
    <blockquote className="mesa-cita">
      {frases.map((f, i) => (
        <p key={i}>
          {i === 0 ? "«" : ""}
          {f}
          {i === frases.length - 1 ? "»" : ""}
        </p>
      ))}
    </blockquote>
  );
}

function Tubos({ m, objetivo }: { m: Medidores; objetivo?: string }) {
  const tubo = (nombre: string, v: number, rotulo: string) => (
    <div className="mesa-tubo">
      <div className="mesa-tubo-nombre">
        {nombre} <b>{v}</b>
      </div>
      <div className="mesa-tubo-vidrio" role="img" aria-label={`${nombre}: ${v} de 100. Marcas en ${MARCA_BAJA} y ${META_CIERRE}.`}>
        <div className={`mesa-tubo-tinta${v <= MARCA_BAJA ? " baja" : v >= META_CIERRE ? " meta" : ""}`} style={{ width: `${v}%` }} />
        <i className="peligro" style={{ left: `${MARCA_BAJA}%` }} />
        <i className="meta" style={{ left: `${META_CIERRE}%` }} />
      </div>
      <div className="mesa-tubo-marcas" aria-hidden="true">
        <span className="peligro" style={{ left: `${MARCA_BAJA}%` }}>{MARCA_BAJA} peligro</span>
        <span className="meta" style={{ left: `${META_CIERRE}%` }}>{META_CIERRE} meta</span>
      </div>
      <span className="mesa-solo-lector">{rotulo}</span>
    </div>
  );
  return (
    <div className="mesa-tubos">
      {tubo("Credibilidad", m.c, G.ROTULOS_TUBOS.c)}
      {tubo("Voz", m.voz, G.ROTULOS_TUBOS.voz)}
      {objetivo && <Objetivo texto={objetivo} />}
    </div>
  );
}

function Objetivo({ texto }: { texto: string }) {
  return <p className="mesa-objetivo">{texto}</p>;
}

/** Los papeles, sueltos sobre el escritorio: tarjetas compactas con nombre corto; leído = borde punteado y «✓ leído»; releer es gratis. */
function PapelesMesa({ ids, nombres, abiertos, fichas, total, notaInicial, sinPapeles, extra, onAbrir }: { ids: string[]; nombres: Record<string, string>; abiertos: readonly string[]; fichas: number; total: number; notaInicial?: string; sinPapeles?: string; extra: ReactNode; onAbrir: (id: string) => void }) {
  return (
    <div className="mesa-papeles">
      <div className="mesa-papeles-fila">
        <Fichas n={fichas} total={total} corto />
        {extra}
      </div>
      <p className="mesa-papeles-nota" aria-live="polite">{sinPapeles ?? (fichas <= 0 && ids.some((id) => !abiertos.includes(id)) ? G.PAPELES_MESA.sinFichas : abiertos.length > 0 ? G.PAPELES_MESA.releer : notaInicial)}</p>
      <ul className="mesa-papeles-lista">
        {ids.map((id) => {
          const abierto = abiertos.includes(id);
          const bloqueado = !abierto && fichas <= 0;
          return (
            <li key={id}>
              <button type="button" className={`mesa-pp${abierto ? " leido" : ""}${bloqueado ? " bloq" : ""}`} disabled={bloqueado} onClick={() => onAbrir(id)} aria-label={`${nombres[id]}${abierto ? " (ya leído, releer es gratis)" : bloqueado ? " (sin fichas)" : " (abrir cuesta 1 ficha)"}`}>
                {docDe(nombres[id]) ? <img src={conBase(`/juego/psicoestadistica/arte/${docDe(nombres[id])}.png`)} alt="" width={24} height={30} /> : <span aria-hidden="true">▭</span>}
                <span className="mesa-pp-nombre">{G.nombreCorto(nombres[id])}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Fichas({ n, total, corto }: { n: number; total: number; corto?: boolean }) {
  return (
    <div className="mesa-fichas" role="img" aria-label={`${G.ARCHIVO.rotuloFichas}. Te quedan ${n}`}>
      <span>{corto ? G.PAPELES_MESA.fichas : G.ARCHIVO.rotuloFichas}</span>
      {Array.from({ length: total }, (_, i) => (
        <i key={i} className={i < n ? "on" : "off"} />
      ))}
    </div>
  );
}

function Grafica({ p }: { p: PaqueteT1 }) {
  const { mesesGrafica, denuncias } = p.cifras.caso2;
  const tope = Math.max(...denuncias, 1);
  return (
    <figure className="mesa-grafica">
      <figcaption>Denuncias por mes</figcaption>
      <div className="mesa-barras">
        {mesesGrafica.map((m, i) => (
          <div key={m} className="mesa-barra">
            <b>{denuncias[i]}</b>
            <span style={{ height: `${Math.max(4, (denuncias[i] / tope) * 64)}px` }} />
            <em>{m}</em>
          </div>
        ))}
      </div>
    </figure>
  );
}

function Abanico({ ids, nombres, abiertos, sinFichas, onAbrir }: { ids: string[]; nombres: Record<string, string>; abiertos: readonly string[]; sinFichas: boolean; onAbrir: (id: string) => void }) {
  return (
    <ul className="mesa-abanico">
      {ids.map((id) => {
        const abierto = abiertos.includes(id);
        const bloqueado = !abierto && sinFichas;
        return (
          <li key={id}>
            <button type="button" className={`mesa-papel${abierto ? " abierto" : ""}`} disabled={bloqueado} onClick={() => onAbrir(id)} aria-label={`${nombres[id]}${abierto ? " (ya abierto)" : bloqueado ? " (sin fichas)" : " (abrir cuesta 1 ficha)"}`}>
              {docDe(nombres[id]) ? (
                <img className="mesa-doc" src={conBase(`/juego/psicoestadistica/arte/${docDe(nombres[id])}.png`)} alt="" width={32} height={40} />
              ) : (
                <span aria-hidden="true">{abierto ? "▤" : "▭"}</span>
              )}
              {nombres[id]}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Lector({ nombre, texto, onCerrar }: { nombre: string; texto: string; onCerrar: () => void }) {
  return (
    <div className="mesa-lector" role="dialog" aria-modal="true" aria-label={nombre}>
      <div className="mesa-hoja">
        <h3>{nombre}</h3>
        {enFrases(texto).map((f, i) => (
          <p key={i}>{f}</p>
        ))}
        <button type="button" className="mesa-boton" onClick={onCerrar} autoFocus>
          Cerrar &gt;
        </button>
      </div>
    </div>
  );
}

// ── La pantalla ──────────────────────────────────────────────────────────────

export function Mesa() {
  const cuenta = useCuenta();
  const alumnoId = cuenta.estado === "dentro" ? (cuenta.alumno?.id ?? null) : null;
  const [semilla, setSemilla] = useState(0);
  useEffect(() => {
    if (cuenta.estado === "cargando") return;
    setSemilla(alumnoId ? semillaDeAlumno(alumnoId) : semillaDePrueba());
  }, [cuenta.estado, alumnoId]);
  if (!semilla) return <p className="mesa-carga">Preparando la oficina…</p>;
  return <Juego key={semilla} semilla={semilla} esPrueba={!alumnoId} onOtraVersion={() => setSemilla(semillaDePrueba(true))} />;
}

function Juego({ semilla, esPrueba, onOtraVersion }: { semilla: number; esPrueba: boolean; onOtraVersion: () => void }) {
  const p = useMemo(() => paqueteT1(semilla), [semilla]);
  const hoy = useMemo(() => new Date(), []);
  const ids1 = useMemo(() => p.carpetas.porCaso[1].papeles.map((q) => q.id), [p]);
  const ids2 = useMemo(() => p.carpetas.porCaso[2].papeles.map((q) => q.id), [p]);
  const nombres = useMemo(() => {
    const r: Record<string, string> = {};
    for (const id of ids1) r[id] = papelDe(p, 1, id, { hoy }).nombre;
    for (const id of ids2) r[id] = papelDe(p, 2, id, { hoy }).nombre;
    return r;
  }, [p, hoy, ids1, ids2]);

  const [partida, setPartida] = useState<Partida>(() => leerPartidaDe<EventoT1, "psicoestadistica", "tema1">(ESCENA_T1, semilla) ?? nuevaPartida(semilla));
  useEffect(() => {
    if (partida.eventos.length > 0) guardarPartidaDe(partida);
  }, [partida]);
  const anota = useCallback((ev: EventoT1) => setPartida((x) => anotarEn(x, ev)), []);

  const [fase, setFase] = useState<Fase>("titulo");
  const [pideReinicio, setPideReinicio] = useState(false);
  const [pose, setPose] = useState<G.PoseJefa>("brazos");
  const [suena, setSuena] = useState(false);
  const [tubos, setTubos] = useState(false);
  const [intro1Hecha, setIntro1Hecha] = useState(false);
  const [intro2Hecha, setIntro2Hecha] = useState(false);
  const [verDecidir, setVerDecidir] = useState(false);
  const [med, setMed] = useState<Medidores>(medidoresIniciales());
  const [paso1, setPaso1] = useState<Paso1Estado>(() => paso1Nuevo(p));
  const [misDatos, setMisDatos] = useState<{ horas: number; minutos: number; animo: number } | null>(null);
  const [modoHoja, setModoHoja] = useState<"elige" | "dani" | "propias">("elige");
  const [campos, setCampos] = useState({ horas: "", minutos: "", animo: "" });
  const [revisar, setRevisar] = useState(false);
  const [leyendo, setLeyendo] = useState<{ caso: 1 | 2; id: string } | null>(null);
  const [avisoPend, setAvisoPend] = useState<"jefa-regala" | "dani-abre" | null>(null);
  const [extra, setExtra] = useState<{ lineas: Linea[]; alFin: () => void } | null>(null);
  const [asombroVisto, setAsombroVisto] = useState(false);
  const [asombroListo, setAsombroListo] = useState(false);
  const [caso, setCaso] = useState(() => abrirCaso(medidoresIniciales()));
  const [carpeta2, setCarpeta2] = useState<CarpetaAbierta>(() => abrirCarpeta(p.carpetas.porCaso[2], 3));
  const [elegidas, setElegidas] = useState<PiezaDeFrase[]>([]);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [resultado, setResultado] = useState<ResultadoCaso | null>(null);
  const [reaccion, setReaccion] = useState<G.ReaccionCaso2 | null>(null);
  const [reaccionFin, setReaccionFin] = useState(false);
  const [dormido, setDormido] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const [hayMas, setHayMas] = useState(false);
  const [campoEnfocado, setCampoEnfocado] = useState(false);
  const medirMas = useCallback(() => {
    const e = panel.current;
    setHayMas(Boolean(e && e.scrollHeight - e.scrollTop - e.clientHeight > 12));
  }, []);
  const [lineaJefa, setLineaJefa] = useState(0);

  // El panel empieza arriba en cada fase, y avisa si hay más abajo (el crítico v24: llegaba desplazado y sin señal).
  useEffect(() => {
    if (panel.current) panel.current.scrollTop = 0;
    medirMas();
  }, [fase, modoHoja, medirMas]);
  useEffect(() => {
    const e = panel.current;
    if (!e || typeof ResizeObserver === "undefined") return;
    const o = new ResizeObserver(medirMas);
    o.observe(e);
    for (const h of Array.from(e.children)) o.observe(h);
    return () => o.disconnect();
  }, [fase, modoHoja, extra, medirMas]);

  const ir = (f: Fase) => {
    setFase(f);
    setPose("brazos");
    setSuena(false);
  };
  const alLinea = (l: Linea) => {
    if (l.quien === "jefa") setLineaJefa(l.texto === G.JEFA_LLEGADA[0] ? 0 : 1);
    if (l.pose) setPose(l.pose);
    setSuena(Boolean(l.suena));
    if (l.tubos) setTubos(true);
  };

  // Dani cabecea si el alumno tarda (NT1.6, «Ambiente»): no habla, solo se mueve.
  useEffect(() => {
    setDormido(false);
    const t = setTimeout(() => setDormido(true), 25000);
    return () => clearTimeout(t);
  }, [fase, leyendo, paso1, carpeta2, elegidas]);
  const daniCabecea = dormido && (fase === "archivo1" || fase === "archivo2" || fase === "frase");
  // Papeles sueltos sobre el escritorio (paso 2 de la pantalla inmersiva): en `archivo1` y en `archivo2` antes de decidir.
  const intro1 = fase === "archivo1" && !intro1Hecha && papelesVistosPaso1(paso1).length === 0;
  const intro2 = fase === "archivo2" && !verDecidir && !intro2Hecha && carpeta2.abiertos.length === 0;
  const papelesVisibles = (fase === "archivo1" && !intro1) || (fase === "archivo2" && !verDecidir && !intro2);
  const objetivo = fase === "archivo1" ? G.OBJETIVO.archivo1 : fase === "archivo2" && !verDecidir ? G.OBJETIVO.archivo2 : fase === "archivo2" || fase === "frase" || fase === "confirma" ? G.OBJETIVO.decide : undefined;

  // ── retomar / empezar de nuevo ──
  const avance = useMemo(() => avanceDeEventos(p, partida.eventos), [p, partida.eventos]);
  const hayAvance = avance.fase !== "inicio";

  const empezarDeNuevo = (destino: Fase = "bienvenida") => {
    const limpia = nuevaPartida(semilla);
    guardarPartidaDe(limpia);
    setPartida(limpia);
    setPaso1(paso1Nuevo(p));
    setMisDatos(null);
    setModoHoja("elige");
    setTubos(false);
    setIntro1Hecha(false);
    setIntro2Hecha(false);
    setVerDecidir(false);
    setMed(medidoresIniciales());
    setAsombroVisto(false);
    setAsombroListo(false);
    setCarpeta2(abrirCarpeta(p.carpetas.porCaso[2], 3));
    setElegidas([]);
    setResultado(null);
    setReaccion(null);
    setReaccionFin(false);
    setPideReinicio(false);
    ir(destino);
  };

  const retomar = () => {
    setPaso1(avance.paso1);
    setMisDatos(avance.datos);
    setAsombroVisto(abrioSuenoPaso1(p, avance.paso1));
    setAsombroListo(abrioSuenoPaso1(p, avance.paso1));
    if (avance.fase === "archivo1") return ir("archivo1");
    const inicio = medidoresIniciales();
    const enCurso = abrirCaso(inicio);
    setTubos(true);
    setCaso(enCurso);
    let c = abrirCarpeta(p.carpetas.porCaso[2], enCurso.fichas);
    for (const id of avance.abiertos2) c = abrirPapel(c, id);
    setCarpeta2(c);
    if (avance.fase === "archivo2") {
      setMed(inicio);
      return ir("archivo2");
    }
    const r = resolverCaso2(p, avance.entrada2!);
    setResultado(r);
    setMed(cerrarCaso(anotarEfecto(enCurso, r.efecto)).medidores);
    ir("fin");
  };

  // ── Paso 1 ──
  const abrirP1 = (id: string) => {
    const r = abrirEnPaso1(p, paso1, id);
    if (r.estado !== paso1) {
      setPaso1(r.estado);
      anota({ tipo: "p1.abrio", papel: id, ficha: r.estado.carpeta.abiertos.length });
      if (r.aviso) setAvisoPend(r.aviso);
    }
    setLeyendo({ caso: 1, id });
  };

  const cerrarLector = () => {
    const era = leyendo;
    setLeyendo(null);
    if (!era) return;
    if (era.caso === 1) {
      if (avisoPend === "jefa-regala") {
        setAvisoPend(null);
        setExtra({ lineas: [{ quien: "jefa", texto: G.ARCHIVO.jefaSeguro }], alFin: () => setExtra(null) });
        return;
      }
      if (avisoPend === "dani-abre") {
        setAvisoPend(null);
        const papel = paso1.ayudado!;
        anota({ tipo: "p1.ayudado", papel });
        setExtra({
          lineas: [{ quien: "dani", texto: G.ARCHIVO.daniAbre }],
          alFin: () => {
            setExtra(null);
            setLeyendo({ caso: 1, id: papel });
          },
        });
        return;
      }
      if (abrioSuenoPaso1(p, paso1) && !asombroVisto) {
        setAsombroVisto(true);
        ir("asombro");
      }
    }
  };

  const datosHoy = misDatos ?? p.cifras.paso1.dani;
  const hojaValida = useMemo(() => {
    const h = Number(campos.horas.replace(",", "."));
    const m = Number(campos.minutos.replace(",", "."));
    const a = Number(campos.animo.replace(",", "."));
    return {
      horas: campos.horas.trim() !== "" && h >= 0 && h <= 14 && Number.isInteger(h * 2),
      minutos: campos.minutos.trim() !== "" && Number.isInteger(m) && m >= 0 && m <= 300,
      animo: campos.animo.trim() !== "" && Number.isInteger(a) && a >= 0 && a <= 100,
      valores: { horas: h, minutos: m, animo: a },
    };
  }, [campos]);

  // ── Caso 2 ──
  const entrarAlCaso2 = () => {
    const enCurso = abrirCaso(med);
    setCaso(enCurso);
    setCarpeta2(abrirCarpeta(p.carpetas.porCaso[2], enCurso.fichas));
    anota({ tipo: "caso.entra", caso: 2, casoTipo: p.version.tipos[2], fichas: enCurso.fichas, c: med.c, voz: med.voz });
    ir("entrada2");
  };

  const abrirP2 = (id: string) => {
    if (!estaAbierto(carpeta2, id)) {
      if (fichasRestantes(carpeta2) <= 0) return;
      setCarpeta2(abrirPapel(carpeta2, id));
      anota({ tipo: "abrir", caso: 2, papel: id, rol: p.carpetas.porCaso[2].papeles.find((q) => q.id === id)!.rol });
    }
    setLeyendo({ caso: 2, id });
  };

  const piezas2 = piezasDisponibles2(p, carpeta2.abiertos);
  const tocarPieza = (x: PiezaDeFrase) => {
    const ya = elegidas.some((e) => e.texto === x.texto);
    if (ya) setElegidas(elegidas.filter((e) => e.texto !== x.texto));
    else if (elegidas.length < PIEZAS_MAX) setElegidas([...elegidas, x]);
  };

  const sellar = () => {
    if (!decision) return;
    const abiertos = [...carpeta2.abiertos];
    const entrada = decision === "frase" ? entradaDeFrase2(p, abiertos, elegidas) : { abiertos, decision };
    const r = resolverDecision2(p, abiertos, decision === "frase" ? { frase: elegidas } : decision);
    if (decision === "frase") anota({ tipo: "armar", caso: 2, piezas: elegidas.map((e) => e.texto) });
    anota({ tipo: "entrada", caso: 2, entrada });
    anota({ tipo: "sella", caso: 2, decision: r.filas[0], efecto: r.efecto, codigo: r.codigoSobre ?? r.codigos[0] ?? null });
    if (r.sobre) anota({ tipo: "sobre", caso: 2, escalon: 2 });
    setMed(cerrarCaso(anotarEfecto(caso, r.efecto)).medidores);
    setResultado(r);
    setReaccion(G.reaccionCaso2(p, r));
    setReaccionFin(false);
    ir("reaccion");
  };

  const lineasReaccion: Linea[] = reaccion
    ? [{ quien: "tu" as const, texto: G.jugadorReaccion(p.version.textos.dani) }, ...reaccion.lineas].map((l) => ({ quien: l.quien, texto: l.texto, pose: l.quien === "jefa" ? reaccion.pose : undefined, suena: l.quien === "madre" }))
    : [];

  // El papel que decidía el informe: el clave que abrió, o si no abrió ninguno, el primero de su versión (B-fin-2 y B-fin-3).
  const clavesCaso2 = p.carpetas.porCaso[2].claves;
  const claveAbierta = clavesCaso2.find((id) => carpeta2.abiertos.includes(id));
  const abrioClaveFinal = claveAbierta !== undefined;
  const papelFinal = claveAbierta ?? clavesCaso2[0];

  const fichas1 = fichasPaso1(paso1);
  const total1 = paso1.carpeta.fichas;
  const lector = leyendo ? papelDe(p, leyendo.caso, leyendo.id, { hoy }) : null;
  const sueno1 = papelesVistosPaso1(paso1).find((id) => p.carpetas.porCaso[1].claves.includes(id));
  const papelesEnMesa =
    papelesVisibles && !leyendo ? (
      fase === "archivo1" ? (
        <PapelesMesa
          ids={ids1}
          nombres={nombres}
          abiertos={papelesVistosPaso1(paso1)}
          fichas={fichas1}
          total={total1}
          notaInicial={G.ARCHIVO.consigna}
          onAbrir={abrirP1}
          extra={
            asombroVisto ? (
              <button type="button" className="mesa-boton" onClick={() => ir("asombro")}>
                Ver lo que encontraste &gt;
              </button>
            ) : null
          }
        />
      ) : (
        <PapelesMesa
          ids={ids2}
          nombres={nombres}
          abiertos={carpeta2.abiertos}
          fichas={fichasRestantes(carpeta2)}
          total={carpeta2.fichas}
          sinPapeles={carpeta2.abiertos.length === 0 ? G.ARCHIVO2.sinPapeles : undefined}
          onAbrir={abrirP2}
          extra={
            <button type="button" className="mesa-boton" onClick={() => setVerDecidir(true)}>
              {G.PAPELES_MESA.decidir}
            </button>
          }
        />
      )
    ) : null;

  const sonido = useSonidoT1({
    fase,
    fichas: fase === "archivo1" ? fichas1 : fichasRestantes(carpeta2),
    hallado: abrioSuenoPaso1(p, paso1),
    medidorBajo: med.c <= MARCA_BAJA || med.voz <= MARCA_BAJA,
    lineaDeLaJefa: lineaJefa,
    pose,
    suena,
    daniCabecea,
    tubosVisibles: tubos,
    papelesAbiertos: paso1.carpeta.abiertos.length + carpeta2.abiertos.length,
    leyendo: leyendo?.id ?? null,
    hayAvisoDeAyuda: extra !== null,
    efecto: fase === "reaccion" && resultado ? resultado.efecto : null,
    medidores: med,
    hayTarjetaDeSobre: fase === "reaccion" && reaccionFin && Boolean(resultado?.sobre),
  });

  return (
    <div
      className="mesa"
      onClickCapture={sonido.alApretar}
      onFocusCapture={(e) => setCampoEnfocado((e.target as HTMLElement).tagName === "INPUT")}
      onBlurCapture={() => setCampoEnfocado(false)}
    >
      <BotonSonido activo={sonido.activo} disponible={sonido.disponible} alternar={sonido.alternar} />
      {fase !== "titulo" && (
        <div className="mesa-reinicio">
          {!pideReinicio ? (
            <button type="button" className="mesa-reiniciar" onClick={() => setPideReinicio(true)} aria-label="Empezar de cero: borra tu avance y vuelve al título">
              <span aria-hidden="true">&#8634;</span> De cero
            </button>
          ) : (
            <div className="mesa-reinicio-conf" role="alertdialog" aria-label="Empezar de cero">
              <span>¿Empezar de cero? Se pierde tu avance.</span>
              <button type="button" className="mesa-reiniciar" onClick={() => empezarDeNuevo("titulo")} autoFocus>
                Sí, de cero
              </button>
              <button type="button" className="mesa-reiniciar" onClick={() => setPideReinicio(false)}>
                No
              </button>
            </div>
          )}
        </div>
      )}
      <EscenaPixi hora={minutosDeFase(fase)} pose={pose} suena={suena} daniCabecea={daniCabecea} verJefa={fase !== "titulo" && fase !== "bienvenida"} verDani={fase !== "titulo" && fase !== "bienvenida" && fase !== "jefa"} />
      {!campoEnfocado && (tubos ? <Tubos m={med} objetivo={objetivo} /> : objetivo && <div className="mesa-tubos solo"><Objetivo texto={objetivo} /></div>)}
      {papelesEnMesa}

      <div className="mesa-panel" ref={panel} onScroll={medirMas}>
        {fase === "titulo" && (
          <section className="mesa-centro">
            <h1>{G.TITULO.principal}</h1>
            <p className="mesa-pequeno">{G.TITULO.pequeno}</p>
            {hayAvance && (
              <button type="button" className="mesa-boton" onClick={retomar}>
                Continuar donde quedé &gt;
              </button>
            )}
            <button type="button" className={hayAvance ? "mesa-boton sec" : "mesa-boton"} onClick={() => empezarDeNuevo()}>
              {hayAvance ? "Empezar de nuevo" : "Empezar >"}
            </button>
            <p className="mesa-prueba">{G.TITULO.prueba} Luz y polvo provisionales.</p>
          </section>
        )}

        {fase === "bienvenida" && <Dialogo key="b" p={p} lineas={[...G.BIENVENIDA.map((texto) => ({ quien: "narracion" as const, texto })), { quien: "tu" as const, texto: G.JUGADOR.bienvenida }]} onFin={() => ir("jefa")} onLinea={alLinea} />}

        {fase === "jefa" && <Dialogo key="j" p={p} lineas={[...G.JEFA_LLEGADA, ...G.ENCARGO].map((texto) => ({ quien: "jefa" as const, texto }))} onFin={() => ir("hoja")} onLinea={alLinea} />}

        {fase === "hoja" && (
          <section className="mesa-bloque">
            <h2>{G.HOJA.titulo}</h2>
            <Cita texto={G.HOJA.jefa} />
            <Cita texto={G.HOJA.presentaDani(p)} />
            <ol className="mesa-preguntas">
              {G.HOJA.preguntas.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
            {modoHoja === "elige" && (
              <div className="mesa-acciones">
                <button
                  type="button"
                  className="mesa-boton"
                  onClick={() => {
                    anota({ tipo: "p1.respuestas", propias: false });
                    setModoHoja("dani");
                  }}
                >
                  {G.HOJA.botonDani(p)}
                </button>
                <button type="button" className="mesa-boton sec" onClick={() => setModoHoja("propias")}>
                  {G.HOJA.botonPropias}
                </button>
              </div>
            )}
            {modoHoja === "dani" && <Dialogo key="d" p={p} lineas={[...G.daniResponde(p).map((texto) => ({ quien: "dani" as const, texto })), { quien: "tu" as const, texto: G.JUGADOR.archivo1 }]} onFin={() => ir("archivo1")} onLinea={alLinea} />}
            {modoHoja === "propias" && (
              <div className="mesa-dialogo tuyo">
                <div className="mesa-quien">Tú</div>
                <p>{G.JUGADOR.hoja}</p>
              </div>
            )}
            {modoHoja === "propias" && (
              <form
                className="mesa-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setRevisar(true);
                  if (!hojaValida.horas || !hojaValida.minutos || !hojaValida.animo) return;
                  setMisDatos(hojaValida.valores);
                  anota({ tipo: "p1.respuestas", propias: true, datos: hojaValida.valores });
                  ir("archivo1");
                }}
              >
                {(
                  [
                    ["horas", "Horas dormidas anoche (0 a 14, de media en media hora)", "decimal"],
                    ["minutos", "Minutos de celular antes de dormir (0 a 300)", "numeric"],
                    ["animo", "Cómo te fue ayer (0 a 100)", "numeric"],
                  ] as const
                ).map(([k, rotulo, modo]) => (
                  <label key={k}>
                    <span>{rotulo}</span>
                    <input value={campos[k]} inputMode={modo} onChange={(e) => {
                      sonido.sonarTecla();
                      setCampos({ ...campos, [k]: e.target.value });
                    }} aria-invalid={revisar && !hojaValida[k]} />
                    {revisar && !hojaValida[k] && <small role="alert">Revisa esta casilla.</small>}
                  </label>
                ))}
                <div className="mesa-acciones">
                  <button type="submit" className="mesa-boton">
                    Seguir &gt;
                  </button>
                  <button type="button" className="mesa-boton sec" onClick={() => setModoHoja("elige")}>
                    Atrás
                  </button>
                </div>
              </form>
            )}
          </section>
        )}

        {intro1 && <Dialogo key="a1" p={p} lineas={[G.ARCHIVO.jefa, G.ARCHIVO.consigna].map((texto) => ({ quien: "jefa" as const, texto }))} onFin={() => setIntro1Hecha(true)} onLinea={alLinea} fin="A los papeles >" />}

        {fase === "asombro" && sueno1 && (
          <section className="mesa-bloque">
            <h2>{G.ASOMBRO.titulo}</h2>
            {(() => {
              const d = p.cifras.paso1.papeles[sueno1];
              const hoyCol2 = d.col2 === "minutos" ? datosHoy.minutos : datosHoy.animo;
              return (
                <table className="mesa-tabla">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Horas dormidas</th>
                      <th scope="col">{COL2[d.col2]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">{misDatos ? G.ASOMBRO.filaHoy : G.ASOMBRO.filaDani(p)}</th>
                      <td>{numero(datosHoy.horas)}</td>
                      <td>{numero(hoyCol2)}</td>
                    </tr>
                    <tr>
                      <th scope="row">{G.ASOMBRO.filaArchivo(fechaAnio(hoy))}</th>
                      <td>{numero(d.horasAnt)}</td>
                      <td>{numero(d.col2Ant)}</td>
                    </tr>
                  </tbody>
                </table>
              );
            })()}
            {!asombroListo ? (
              <Dialogo key="a" p={p} lineas={G.ASOMBRO.jefa.map((texto) => ({ quien: "jefa" as const, texto, pose: "pulgar" as const }))} onFin={() => setAsombroListo(true)} onLinea={alLinea} />
            ) : (
              <button type="button" className="mesa-boton" onClick={() => ir("cierre1")}>
                Seguir &gt;
              </button>
            )}
          </section>
        )}

        {fase === "cierre1" && (
          <Dialogo
            key="c1"
            p={p}
            lineas={[
              ...G.CIERRE_PASO1.jefa.map((texto, i) => ({ quien: "jefa" as const, texto, tubos: i === 1 })),
              { quien: "beto" as const, texto: G.CIERRE_PASO1.beto },
            ]}
            onFin={entrarAlCaso2}
            onLinea={alLinea}
          />
        )}

        {fase === "entrada2" && (
          <section className="mesa-bloque">
            <h2>Caso 2 · {G.CASO2.titulo}</h2>
            <article className="mesa-informe">
              <h3>{G.CASO2.informe(p)}</h3>
              <small>{G.CASO2.firmaInforme}</small>
              <Grafica p={p} />
            </article>
            <Dialogo key="e2" p={p} lineas={[...G.CASO2.jefa.map((texto) => ({ quien: "jefa" as const, texto })), { quien: "tu" as const, texto: G.JUGADOR.entrada2 }]} onFin={() => ir("archivo2")} onLinea={alLinea} fin="A la carpeta >" />
          </section>
        )}

        {intro2 && <Dialogo key="a2" p={p} lineas={[G.ARCHIVO2.consigna].map((texto) => ({ quien: "jefa" as const, texto }))} onFin={() => setIntro2Hecha(true)} onLinea={alLinea} fin="A los papeles >" />}

        {((fase === "archivo2" && verDecidir) || fase === "frase" || fase === "confirma") && (
          <section className={`mesa-bloque${fase === "archivo2" ? " decide" : ""}`}>
            <h2 className={fase === "archivo2" ? "mesa-solo-lector" : undefined}>Caso 2 · {G.CASO2.titulo}</h2>
            <div className="mesa-corcho">
              <h3>Corcho</h3>
              {carpeta2.abiertos.length === 0 ? (
                <p className="mesa-pequeno">{G.ARCHIVO2.corchoVacio}</p>
              ) : (
                <ul>
                  {[...carpeta2.abiertos]
                    .sort((a, b) => MESES.indexOf(p.cifras.caso2.corcho[a]) - MESES.indexOf(p.cifras.caso2.corcho[b]))
                    .map((id) => (
                      <li key={id}>
                        <b>{p.cifras.caso2.corcho[id]}</b> · {nombres[id]}
                      </li>
                    ))}
                </ul>
              )}
              <p className="mesa-pequeno">{G.ARCHIVO2.corchoMirar}</p>
              <Grafica p={p} />
              <p className="mesa-pequeno">{G.ARCHIVO2.graficaMirar}</p>
            </div>

            {fase === "archivo2" && carpeta2.abiertos.length === 0 && <Cita texto={G.ARCHIVO2.sinPapeles} />}
            {fase === "archivo2" && (
              <div className="mesa-acciones decidir" role="group" aria-label="Qué haces con el informe">
                {(
                  [
                    ["tal", G.BOTONES_SELLO.tal, G.ARCHIVO2.explicaTal, () => { setDecision("tal"); setFase("confirma"); }],
                    ["frase", G.BOTONES_SELLO.frase, G.ARCHIVO2.explicaFrase, () => setFase("frase")],
                    ["frenar", G.BOTONES_SELLO.frenar, G.ARCHIVO2.explicaFrenar, () => { setDecision("frenar"); setFase("confirma"); }],
                  ] as const
                ).map(([id, rotulo, explica, alTocar]) => (
                  <button key={id} type="button" className="mesa-boton mesa-opcion-boton" aria-label={rotulo} aria-describedby={`explica-${id}`} onClick={alTocar}>
                    <span id={`explica-${id}`} className="mesa-opcion-txt">{explica}</span>
                  </button>
                ))}
              </div>
            )}

            {fase === "archivo2" && (
              <button type="button" className="mesa-boton sec" onClick={() => setVerDecidir(false)}>
                {G.PAPELES_MESA.volver}
              </button>
            )}

            {fase === "frase" && (
              <div className="mesa-frase">
                <h3>Tu frase para el informe</h3>
                <p className="mesa-pequeno">{G.FRASE.instruccion}</p>
                <p className="mesa-pequeno">{G.FRASE.cadaPapel}</p>
                <ul>
                  {piezas2.map((x) => {
                    const on = elegidas.some((e) => e.texto === x.texto);
                    return (
                      <li key={x.texto}>
                        <button type="button" className={`mesa-pieza${on ? " on" : ""}`} aria-pressed={on} disabled={!on && elegidas.length >= PIEZAS_MAX} onClick={() => tocarPieza(x)}>
                          {x.texto}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <p className="mesa-vista" aria-live="polite">
                  {elegidas.length ? `«${elegidas.map((e) => e.texto).join("; ")}»` : "Todavía no elegiste piezas."}
                </p>
                <div className="mesa-acciones">
                  <button
                    type="button"
                    className="mesa-boton"
                    disabled={!fraseValida(elegidas)}
                    onClick={() => {
                      setDecision("frase");
                      setFase("confirma");
                    }}
                  >
                    {G.FRASE.boton.replace("▸", ">")}
                  </button>
                  <button type="button" className="mesa-boton sec" onClick={() => { setVerDecidir(false); setFase("archivo2"); }}>
                    Volver a los papeles
                  </button>
                </div>
              </div>
            )}

          </section>
        )}

        {fase === "confirma" && (
          <div className="mesa-lector" role="alertdialog" aria-modal="true" aria-label={G.BOTONES_SELLO.confirmaTitulo}>
            <div className="mesa-confirma">
              {carpeta2.abiertos.length === 0 && <p className="mesa-aviso">{G.SIN_PAPELES_AL_FIRMAR}</p>}
              {carpeta2.abiertos.length > 0 && (
                <div className="mesa-dialogo tuyo">
                  <div className="mesa-quien">Tú</div>
                  <p>{G.JUGADOR.confirma}</p>
                </div>
              )}
              <p>{G.BOTONES_SELLO.confirmaTitulo}</p>
              <div className="mesa-acciones">
                {(() => {
                  // Sin papeles abiertos lo prudente es «Todavía no»: va primero y es el botón principal.
                  const sinPapeles = carpeta2.abiertos.length === 0;
                  const si = (
                    <button key="si" type="button" className={sinPapeles ? "mesa-boton sec" : "mesa-boton"} onClick={sellar} autoFocus={!sinPapeles}>
                      {G.BOTONES_SELLO.si}
                    </button>
                  );
                  const no = (
                    <button key="no" type="button" className={sinPapeles ? "mesa-boton" : "mesa-boton sec"} onClick={() => setFase(decision === "frase" ? "frase" : "archivo2")} autoFocus={sinPapeles}>
                      {G.BOTONES_SELLO.no}
                    </button>
                  );
                  return sinPapeles ? [no, si] : [si, no];
                })()}
              </div>
            </div>
          </div>
        )}

        {fase === "reaccion" && reaccion && (
          <section className="mesa-bloque">
            {!reaccionFin ? (
              <Dialogo key="r" p={p} lineas={lineasReaccion} onFin={() => setReaccionFin(true)} onLinea={alLinea} />
            ) : (
              <>
                {resultado && <p className="mesa-cambio">{G.cambioDeMedidores(resultado)}</p>}
                {reaccion.tarjetaDeAcuerdo && elegidas.length > 0 && (
                  <article className="mesa-tarjeta">
                    <h3>Acuerdo del consejo</h3>
                    <p>«{elegidas.map((e) => e.texto).join("; ")}»</p>
                  </article>
                )}
                {resultado?.sobre && (
                  <article className="mesa-tarjeta sobre">
                    <h3>Sobre de la jefa</h3>
                    <p>{sobre(resultado.sobre).texto}</p>
                  </article>
                )}
                <button type="button" className="mesa-boton" onClick={() => ir("fin")}>
                  Continuar &gt;
                </button>
              </>
            )}
          </section>
        )}

        {fase === "fin" && (
          <section className="mesa-centro">
            <h2>{G.FIN_DE_LA_PRUEBA.titulo}</h2>
            {G.cierreDeLaPrueba(med.c, med.voz, nombres[papelFinal], abrioClaveFinal).map((t) => (
              <p key={t} className="mesa-cambio">
                {t}
              </p>
            ))}
            <p>{G.FIN_DE_LA_PRUEBA.texto}</p>
            <div className="mesa-acciones">
              {esPrueba && (
                <button type="button" className="mesa-boton" onClick={onOtraVersion}>
                  Jugar otra versión (prueba)
                </button>
              )}
              <button type="button" className="mesa-boton sec" onClick={() => empezarDeNuevo()}>
                Repetir esta versión
              </button>
              <Link className="mesa-boton sec" href="/materias/psicoestadistica">
                Volver a la materia
              </Link>
            </div>
          </section>
        )}
      </div>

      {hayMas && fase !== "confirma" && !leyendo && !extra && (
        <button type="button" className="mesa-mas" onClick={() => panel.current?.scrollBy({ top: 160, behavior: "smooth" })} aria-label="Hay más abajo: desplazar">
          ▾ más
        </button>
      )}
      {lector && <Lector nombre={lector.nombre} texto={lector.texto} onCerrar={cerrarLector} />}
      {extra && (
        <div className="mesa-lector" role="dialog" aria-modal="true">
          <div className="mesa-hoja">
            <Dialogo key="x" p={p} lineas={extra.lineas} onFin={extra.alFin} onLinea={alLinea} />
          </div>
        </div>
      )}
    </div>
  );
}
