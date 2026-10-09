"use client";

/**
 * «La mesa de verificación» · Tema 1 de Psicoestadística Descriptiva · el Paso 1 y el Caso 2 (BORRADOR, arte provisional).
 *
 * Esta pantalla solo muestra y recoge lo que toca el alumno; las reglas, las cifras y los pagos vienen de
 * `src/lib/juego/psicoestadistica/` (con sus pruebas). Lo que lee el alumno es HTML (legible, táctil); la escena que se ve
 * es de PixiJS (`EscenaPixi.tsx`). La partida es el registro de eventos (se guarda en el navegador y se retoma repitiéndolos).
 */

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { EscenaPixi } from "./EscenaPixi";
import { BotonSonido, useSonidoT1 } from "./sonido";

type Partida = PartidaDe<EventoT1, "psicoestadistica", "tema1">;
type Fase = "titulo" | "bienvenida" | "jefa" | "hoja" | "archivo1" | "asombro" | "cierre1" | "entrada2" | "archivo2" | "frase" | "confirma" | "reaccion" | "fin";
type Decision = "tal" | "frenar" | "frase";
type Quien = "jefa" | "dani" | "beto" | "madre" | "director" | "narracion";

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
  return { jefa: "La jefa", dani: p.version.textos.dani, beto: "Beto", madre: "Señora Quiroga (teléfono)", director: "Dirección (nota)", narracion: "" }[q];
}

// La cara (o el icono) de quien habla, de la línea gráfica propia. La narración no lleva cara.
const CARA: Record<Exclude<Quien, "narracion">, string> = {
  jefa: "jefa_retrato",
  dani: "dani_silueta",
  beto: "beto_retrato",
  madre: "icono_telefono",
  director: "icono_nota",
};

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
    <div className="mesa-dialogo" role="group" aria-label="Diálogo">
      <div className={l.quien === "narracion" ? "mesa-dlg" : "mesa-dlg con-cara"}>
        {l.quien !== "narracion" && <img className="mesa-cara" src={conBase(`/juego/psicoestadistica/arte/${CARA[l.quien]}.png`)} alt="" width={64} height={64} />}
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

function Tubos({ m }: { m: Medidores }) {
  const tubo = (nombre: string, v: number, rotulo: string) => (
    <div className="mesa-tubo">
      <div className="mesa-tubo-nombre">
        {nombre} <b>{v}</b>
      </div>
      <div className="mesa-tubo-vidrio" role="img" aria-label={`${nombre}: ${v} de 100. Marcas en ${MARCA_BAJA} y ${META_CIERRE}.`}>
        <div className={`mesa-tubo-tinta${v <= MARCA_BAJA ? " baja" : v >= META_CIERRE ? " meta" : ""}`} style={{ width: `${v}%` }} />
        <i style={{ left: `${MARCA_BAJA}%` }} />
        <i style={{ left: `${META_CIERRE}%` }} />
      </div>
      <div className="mesa-tubo-rotulo">{rotulo}</div>
    </div>
  );
  return (
    <div className="mesa-tubos">
      {tubo("Credibilidad", m.c, G.ROTULOS_TUBOS.c)}
      {tubo("Voz", m.voz, G.ROTULOS_TUBOS.voz)}
    </div>
  );
}

function Fichas({ n, total }: { n: number; total: number }) {
  return (
    <div className="mesa-fichas" role="img" aria-label={`${G.ARCHIVO.rotuloFichas}. Te quedan ${n}`}>
      <span>{G.ARCHIVO.rotuloFichas}</span>
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
              <span aria-hidden="true">{abierto ? "▤" : "▭"}</span>
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
        <p>{texto}</p>
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
  const [pose, setPose] = useState<G.PoseJefa>("brazos");
  const [suena, setSuena] = useState(false);
  const [tubos, setTubos] = useState(false);
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
  const [lineaJefa, setLineaJefa] = useState(0);

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

  // ── retomar / empezar de nuevo ──
  const avance = useMemo(() => avanceDeEventos(p, partida.eventos), [p, partida.eventos]);
  const hayAvance = avance.fase !== "inicio";

  const empezarDeNuevo = () => {
    const limpia = nuevaPartida(semilla);
    guardarPartidaDe(limpia);
    setPartida(limpia);
    setPaso1(paso1Nuevo(p));
    setMisDatos(null);
    setModoHoja("elige");
    setTubos(false);
    setMed(medidoresIniciales());
    setAsombroVisto(false);
    setAsombroListo(false);
    setCarpeta2(abrirCarpeta(p.carpetas.porCaso[2], 3));
    setElegidas([]);
    setResultado(null);
    setReaccion(null);
    setReaccionFin(false);
    ir("bienvenida");
  };

  const retomar = () => {
    setPaso1(avance.paso1);
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
    ? reaccion.lineas.map((l) => ({ quien: l.quien, texto: l.texto, pose: l.quien === "jefa" ? reaccion.pose : undefined, suena: l.quien === "madre" }))
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
    <div className="mesa" onClickCapture={sonido.alApretar}>
      <BotonSonido activo={sonido.activo} disponible={sonido.disponible} alternar={sonido.alternar} />
      <EscenaPixi pose={pose} suena={suena} daniCabecea={daniCabecea} />
      {tubos && <Tubos m={med} />}

      <div className="mesa-panel">
        {fase === "titulo" && (
          <section className="mesa-centro">
            <h1>{G.TITULO.principal}</h1>
            <p className="mesa-pequeno">{G.TITULO.pequeno}</p>
            {hayAvance && (
              <button type="button" className="mesa-boton" onClick={retomar}>
                Continuar donde quedé &gt;
              </button>
            )}
            <button type="button" className={hayAvance ? "mesa-boton sec" : "mesa-boton"} onClick={empezarDeNuevo}>
              {hayAvance ? "Empezar de nuevo" : "Empezar >"}
            </button>
            <p className="mesa-prueba">{G.TITULO.prueba} Arte provisional.</p>
          </section>
        )}

        {fase === "bienvenida" && <Dialogo key="b" p={p} lineas={G.BIENVENIDA.map((texto) => ({ quien: "narracion" as const, texto }))} onFin={() => ir("jefa")} onLinea={alLinea} />}

        {fase === "jefa" && <Dialogo key="j" p={p} lineas={[...G.JEFA_LLEGADA, ...G.ENCARGO].map((texto) => ({ quien: "jefa" as const, texto }))} onFin={() => ir("hoja")} onLinea={alLinea} />}

        {fase === "hoja" && (
          <section className="mesa-bloque">
            <h2>{G.HOJA.titulo}</h2>
            <p className="mesa-jefa-dice">«{G.HOJA.jefa}»</p>
            <p className="mesa-jefa-dice">«{G.HOJA.presentaDani(p)}»</p>
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
            {modoHoja === "dani" && <Dialogo key="d" p={p} lineas={G.daniResponde(p).map((texto) => ({ quien: "dani" as const, texto }))} onFin={() => ir("archivo1")} onLinea={alLinea} />}
            {modoHoja === "propias" && (
              <form
                className="mesa-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setRevisar(true);
                  if (!hojaValida.horas || !hojaValida.minutos || !hojaValida.animo) return;
                  setMisDatos(hojaValida.valores);
                  anota({ tipo: "p1.respuestas", propias: true });
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

        {fase === "archivo1" && (
          <section className="mesa-bloque">
            <h2>El archivo del colegio</h2>
            <p className="mesa-jefa-dice">«{G.ARCHIVO.jefa}»</p>
            <p className="mesa-jefa-dice">«{G.ARCHIVO.consigna}»</p>
            <Fichas n={fichas1} total={total1} />
            <Abanico ids={ids1} nombres={nombres} abiertos={papelesVistosPaso1(paso1)} sinFichas={fichas1 <= 0} onAbrir={abrirP1} />
            {asombroVisto && (
              <button type="button" className="mesa-boton" onClick={() => ir("asombro")}>
                Ver lo que encontraste &gt;
              </button>
            )}
          </section>
        )}

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
            <Dialogo key="e2" p={p} lineas={G.CASO2.jefa.map((texto) => ({ quien: "jefa" as const, texto }))} onFin={() => ir("archivo2")} onLinea={alLinea} fin="A la carpeta >" />
          </section>
        )}

        {(fase === "archivo2" || fase === "frase" || fase === "confirma") && (
          <section className="mesa-bloque">
            <h2>Caso 2 · {G.CASO2.titulo}</h2>
            <p className="mesa-jefa-dice">«{G.ARCHIVO2.consigna}»</p>
            <Fichas n={fichasRestantes(carpeta2)} total={carpeta2.fichas} />
            <Abanico ids={ids2} nombres={nombres} abiertos={carpeta2.abiertos} sinFichas={fichasRestantes(carpeta2) <= 0} onAbrir={abrirP2} />
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

            {fase === "archivo2" && carpeta2.abiertos.length === 0 && <p className="mesa-jefa-dice">«{G.ARCHIVO2.sinPapeles}»</p>}

            {fase === "archivo2" && (
              <div className="mesa-acciones" role="group" aria-label="Qué haces con el informe">
                <div className="mesa-opcion">
                  <button
                    type="button"
                    className="mesa-boton"
                    onClick={() => {
                      setDecision("tal");
                      setFase("confirma");
                    }}
                  >
                    {G.BOTONES_SELLO.tal}
                  </button>
                  <p className="mesa-pequeno">{G.ARCHIVO2.explicaTal}</p>
                </div>
                <div className="mesa-opcion">
                  <button type="button" className="mesa-boton" onClick={() => setFase("frase")}>
                    {G.BOTONES_SELLO.frase}
                  </button>
                  <p className="mesa-pequeno">{G.ARCHIVO2.explicaFrase}</p>
                </div>
                <div className="mesa-opcion">
                  <button
                    type="button"
                    className="mesa-boton"
                    onClick={() => {
                      setDecision("frenar");
                      setFase("confirma");
                    }}
                  >
                    {G.BOTONES_SELLO.frenar}
                  </button>
                  <p className="mesa-pequeno">{G.ARCHIVO2.explicaFrenar}</p>
                </div>
              </div>
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
                  <button type="button" className="mesa-boton sec" onClick={() => setFase("archivo2")}>
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
              <p>{G.BOTONES_SELLO.confirmaTitulo}</p>
              <div className="mesa-acciones">
                <button type="button" className="mesa-boton" onClick={sellar} autoFocus>
                  {G.BOTONES_SELLO.si}
                </button>
                <button type="button" className="mesa-boton sec" onClick={() => setFase(decision === "frase" ? "frase" : "archivo2")}>
                  {G.BOTONES_SELLO.no}
                </button>
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
              <button type="button" className="mesa-boton sec" onClick={empezarDeNuevo}>
                Repetir esta versión
              </button>
              <Link className="mesa-boton sec" href="/materias/psicoestadistica">
                Volver a la materia
              </Link>
            </div>
          </section>
        )}
      </div>

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
