"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { bs } from "@/lib/formato";
import { ayudaVisible, escalonDe, type AyudaDePaso } from "@/lib/juego/escalera";
import * as g from "@/lib/juego/aief/guion-tema1";
import {
  ESCENA_TEMA1,
  NORMAS,
  PERSONAS,
  PRACTICA_CORRECTO,
  avanceDe,
  revisarNC,
  revisarReexpresion,
  type Dictamen,
  type EventoTema1,
  type Persona,
} from "@/lib/juego/aief/tema1";
import { VERSION_MAXIMA, type Color } from "@/lib/juego/aief/ventanilla";
import { guardarPartidaNube, leerPartidaNubeDe } from "@/lib/juego/nube";
import { anotarEn, guardarPartidaDe, leerPartidaDe, partidaNuevaDe, type PartidaDe } from "@/lib/juego/partida";
import { versionDeAlumno } from "@/lib/juego/version-alumno";
import { BarraCuenta, useCuenta, type EstadoGuardado } from "../juego-proyectos/CuentaJuego";
import { Mostrador } from "./Mostrador";

type Partida = PartidaDe<EventoTema1, "aief", "tema1">;

const nueva = (v: number): Partida => partidaNuevaDe<EventoTema1, "aief", "tema1">(ESCENA_TEMA1, v);
const leerLocal = (v: number) => leerPartidaDe<EventoTema1, "aief", "tema1">(ESCENA_TEMA1, v);

function versionDeLaDireccion(): number {
  const v = Number(new URLSearchParams(window.location.hash.slice(1)).get("v"));
  return Number.isInteger(v) && v >= 0 && v <= VERSION_MAXIMA ? v : 0;
}

/** "103.500", "103 500" o "103500" son ciento tres mil quinientos. */
const leerEntero = (s: string) => (/\d/.test(s) ? Number(s.replace(/\D/g, "")) : null);

/** El orden de las decisiones cambia con la persona y la versión: la correcta no cae siempre en A, B, C. */
const ordenOpciones = (version: number, k: number): Persona[] => {
  const giro = (version + 2 * k + 1) % PERSONAS.length;
  return [...PERSONAS.slice(giro), ...PERSONAS.slice(0, giro)];
};

const CLASE_COLOR: Record<Color, string> = {
  verde: "verde",
  "bien-rechazado": "verde",
  rojo: "rojo",
  gris: "gris",
  "no-le-servia": "gris",
};

export function EscenaVentanilla({ fuentePixel }: { fuentePixel: string }) {
  const [version, setVersion] = useState(0);
  const [partida, setPartida] = useState<Partida>(() => nueva(0));
  const cuenta = useCuenta();
  const alumnoId = cuenta.estado === "dentro" ? (cuenta.alumno?.id ?? null) : null;
  const cursoId = cuenta.cursoId;
  const [guardado, setGuardado] = useState<EstadoGuardado>("sin-cambios");
  const pendiente = useRef(false);
  const [reintento, setReintento] = useState(0);

  // Lo que no es evento (qué pantalla de introducción ya vio): se vuelve a mostrar al recargar.
  const [llegadaPaso, setLlegadaPaso] = useState(0);
  const [practicaMal, setPracticaMal] = useState("");
  const [vioPared, setVioPared] = useState(false);
  const [cerroT11, setCerroT11] = useState(false);
  const [abrioRonda, setAbrioRonda] = useState(-1);
  const [vioHoja, setVioHoja] = useState(-1);
  const [manual, setManual] = useState(false);
  const [texto, setTexto] = useState("");
  const [pista, setPista] = useState("");
  const [fallos, setFallos] = useState(0);
  const [fallosPersona, setFallosPersona] = useState<Partial<Record<Persona, number>>>({});
  const campo = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  const empezarCon = (v: number, guardada: Partida | null) => {
    pendiente.current = false;
    setVersion(v);
    setPartida(guardada ?? nueva(v));
  };

  useEffect(() => {
    if (alumnoId) return;
    setGuardado("sin-cambios");
    const leer = () => {
      const v = versionDeLaDireccion();
      empezarCon(v, leerLocal(v));
    };
    leer();
    window.addEventListener("hashchange", leer);
    return () => window.removeEventListener("hashchange", leer);
  }, [alumnoId]);

  useEffect(() => {
    if (!alumnoId) return;
    let vivo = true;
    const v = versionDeAlumno(alumnoId);
    const local = leerLocal(v);
    empezarCon(v, local);
    setGuardado("sin-cambios");
    leerPartidaNubeDe<EventoTema1, "aief", "tema1">(ESCENA_TEMA1, alumnoId, cursoId, v)
      .then((enNube) => {
        if (!vivo) return;
        if (enNube) {
          empezarCon(v, enNube);
          guardarPartidaDe(enNube);
          setGuardado(enNube.terminada ? "entregada" : "guardado");
        } else if (local && local.eventos.length > 0) {
          pendiente.current = true;
          setPartida({ ...local });
        }
      })
      .catch(() => vivo && setGuardado("error"));
    return () => {
      vivo = false;
    };
  }, [alumnoId, cursoId]);

  useEffect(() => {
    if (!alumnoId || !pendiente.current) return;
    const t = window.setTimeout(() => {
      pendiente.current = false;
      setGuardado("guardando");
      guardarPartidaNube(alumnoId, cursoId, partida)
        .then(() => setGuardado(partida.terminada ? "entregada" : "guardado"))
        .catch(() => {
          pendiente.current = true;
          setGuardado("error");
        });
    }, 600);
    return () => window.clearTimeout(t);
  }, [partida, alumnoId, cursoId, reintento]);

  useEffect(() => {
    if (guardado !== "error") return;
    const otraVez = () => setReintento((n) => n + 1);
    const t = window.setTimeout(otraVez, 15_000);
    window.addEventListener("online", otraVez);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("online", otraVez);
    };
  }, [guardado, reintento]);

  const a = avanceDe(version, partida.eventos);
  const carpeta = a.actual === null ? null : a.carpetas[a.actual];

  const registrar = (e: EventoTema1, terminada = false) =>
    setPartida((p) => {
      const n = { ...anotarEn(p, e), ...(terminada ? { terminada: true } : {}) };
      guardarPartidaDe(n);
      pendiente.current = true;
      return n;
    });

  const limpiar = () => {
    setTexto("");
    setPista("");
    setFallos(0);
  };

  const fallar = (mensaje: string, paso: string, ayuda: AyudaDePaso) => {
    setPista(mensaje);
    const n = fallos + 1;
    setFallos(n);
    const e = escalonDe(n);
    if ((e === "concreta" && n === 2) || (e === "leer" && n === 3 && ayuda.leer)) registrar({ tipo: "ayuda", paso, escalon: e });
    campo.current?.select();
  };

  // La carpeta cambia: el campo y la pista empiezan de cero.
  const claveCarpeta = `${a.ronda}:${a.actual}:${a.numeroBien}:${a.faltaLinea}`;
  useEffect(() => {
    limpiar();
    campo.current?.focus();
  }, [claveCarpeta]);

  // ── pasos ──────────────────────────────────────────────────────────────────
  const enviarPractica = (ev: FormEvent) => {
    ev.preventDefault();
    const v = leerEntero(texto);
    if (v === null) return setPista("Escribe un número.");
    if (v !== PRACTICA_CORRECTO) {
      setPracticaMal(g.correccionPractica(v));
      setTexto("");
      return;
    }
    registrar({ tipo: "llegada", monto: v });
    limpiar();
  };

  const elegirUsuario = (p: Persona, eligio: Persona) => {
    registrar({ tipo: "usuario", persona: p, eligio });
    if (eligio === p) return;
    const n = (fallosPersona[p] ?? 0) + 1;
    setFallosPersona({ ...fallosPersona, [p]: n });
    const e = escalonDe(n);
    if ((e === "concreta" && n === 2) || (e === "leer" && n === 3)) registrar({ tipo: "ayuda", paso: "1.1", escalon: e });
  };

  const enviarNC = (ev: FormEvent) => {
    ev.preventDefault();
    if (carpeta?.tipo !== "t12" || a.actual === null) return;
    const v = leerEntero(texto);
    if (v === null) return setPista("Escribe un número, o 0.");
    registrar({ tipo: "nc", ronda: a.ronda, i: a.actual, valor: v });
    const dx = revisarNC(carpeta, v);
    if (dx !== "correcta") fallar(g.PISTA_NC[dx], "1.2", g.AYUDA_NC);
  };

  const dictaminar = (d: Dictamen) => {
    if (a.actual === null) return;
    registrar({ tipo: "dictamen", ronda: a.ronda, i: a.actual, decision: d });
  };

  const enviarHoy = (ev: FormEvent) => {
    ev.preventDefault();
    if (carpeta?.tipo !== "t13" || a.actual === null) return;
    const v = leerEntero(texto);
    if (v === null) return setPista("Escribe un número.");
    registrar({ tipo: "reexpresion", ronda: a.ronda, i: a.actual, valor: v });
    const dx = revisarReexpresion(carpeta, v);
    if (dx !== "correcta") fallar(g.PISTA_HOY[dx], "1.3", g.AYUDA_HOY);
  };

  const firmar = (ev: FormEvent) => {
    ev.preventDefault();
    if (a.actual === null) return;
    const v = leerEntero(texto);
    if (v === null) return setPista("Escribe un monto, o 0 si no le prestas.");
    registrar({ tipo: "monto", ronda: a.ronda, i: a.actual, valor: v });
  };

  const enviarLinea = (ev: FormEvent) => {
    ev.preventDefault();
    const t = texto.trim();
    if (t.length < 20) return setPista("Escribe al menos una oración completa.");
    registrar({ tipo: "linea", ronda: a.ronda, texto: t.slice(0, 400) });
  };

  const cerrarJornada = () => {
    const aprueba = Boolean(a.resultados) && a.aRepasar.length === 0;
    registrar({ tipo: "cierre", ronda: a.ronda }, aprueba);
  };

  // ── qué se muestra ─────────────────────────────────────────────────────────
  let quien = g.JEFA;
  let dice: ReactNode = "";
  let zona: ReactNode = null;
  let ficha: ReactNode = null;
  const enT13 = carpeta?.tipo === "t13" && vioHoja === a.ronda;

  if (!a.llegada) {
    if (llegadaPaso < g.LLEGADA.length) {
      dice = g.LLEGADA[llegadaPaso];
      zona = (
        <Boton
          onClick={() => {
            if (llegadaPaso === g.LLEGADA.length - 1) setManual(true);
            setLlegadaPaso(llegadaPaso + 1);
          }}
        >
          SEGUIR ▶
        </Boton>
      );
    } else {
      dice = practicaMal || g.practica();
      zona = (
        <form onSubmit={enviarPractica} className="grid gap-3">
          <Campo etiqueta="¿Cuánto le prestas? (en Bs)" valor={texto} cambiar={setTexto} campo={campo} vista />
          <div className="juego-acciones">
            <Boton tipo="submit">FIRMAR ✔</Boton>
          </div>
          <Pista texto={pista} />
        </form>
      );
    }
  } else if (!vioPared && !partida.eventos.some((e) => e.tipo === "usuario")) {
    dice = g.PARED_PRIMERA;
    zona = <Boton onClick={() => setVioPared(true)}>AL DÍA SIGUIENTE ▶</Boton>;
  } else if (a.usuarios.length < PERSONAS.length) {
    const p = PERSONAS.find((x) => !a.usuarios.includes(x))!;
    const n = fallosPersona[p] ?? 0;
    quien = g.PERSONA[p].nombre.toUpperCase();
    dice = n === 0 ? g.PERSONA[p].dice : g.PERSONA[p].otraVez;
    zona = (
      <div className="grid gap-3">
        {a.usuarios.length === 0 && n === 0 && <p className="juego-nota">{g.ABRE_T11}</p>}
        {n > 0 && <p className="juego-pista">No es esa. Vuelve a la fila y te lo explica de otra forma.</p>}
        <p className="juego-nota">¿Qué decisión va a tomar con el balance?</p>
        <div className="juego-opciones">
          {ordenOpciones(version, PERSONAS.indexOf(p)).map((d, k) => (
            <button key={d} type="button" className="juego-opcion" onClick={() => elegirUsuario(p, d)}>
              <b>{"ABC"[k]}</b>
              <span>{g.decision(d)}</span>
            </button>
          ))}
        </div>
        <Escalera fallos={n} ayuda={g.AYUDA_T11} />
      </div>
    );
  } else if (!cerroT11 && a.ronda === 0 && a.actual === 0 && !a.numeroBien) {
    dice = g.CIERRA_T11;
    zona = <Boton onClick={() => setCerroT11(true)}>ABRIR LA VENTANILLA ▶</Boton>;
  } else if (partida.terminada || a.aprobado) {
    quien = "FIN DEL TEMA 1";
    dice = g.FINAL;
  } else if (a.resultados) {
    dice = g.ABRE_CIERRE;
    zona = (
      <div className="grid gap-3">
        <ul className="ventanilla-pared">
          {a.resultados.map((r, k) => (
            <li key={k} className={CLASE_COLOR[r.color]}>
              <b>{g.ETIQUETA_COLOR[r.color]}</b> · {g.nombreCarpeta(r.carpeta)}
              <span>{g.queFuePaso(r.carpeta, r.color)}</span>
            </li>
          ))}
        </ul>
        <p className="juego-dice">{a.aRepasar.length === 0 ? g.CIERRE_BIEN : g.CIERRE_REPASO}</p>
        <Boton onClick={cerrarJornada}>{a.aRepasar.length === 0 ? "TERMINAR EL TEMA 1 ✔" : "CERRAR LA JORNADA ▶"}</Boton>
      </div>
    );
  } else if (abrioRonda !== a.ronda && a.actual === 0 && !a.numeroBien) {
    dice = a.ronda === 0 ? g.ABRE_JORNADA : g.ABRE_REPASO;
    const tipos = [...new Set(a.carpetas.map((c) => c.tipo))];
    zona = (
      <div className="grid gap-3">
        {a.ronda > 0 &&
          tipos.map((t) => (
            <div key={t} className="juego-ayuda">
              <p>{g.pistaRepaso(a.ultimoError[t])}</p>
              {ayudaVisible(a.fallosPorTipo[t], g.AYUDA_REPASO[t]).concreta.map((l) => (
                <p key={l}>{l}</p>
              ))}
              {ayudaVisible(a.fallosPorTipo[t], g.AYUDA_REPASO[t]).leer && (
                <p className="juego-leer">📖 {ayudaVisible(a.fallosPorTipo[t], g.AYUDA_REPASO[t]).leer}</p>
              )}
            </div>
          ))}
        <Boton onClick={() => setAbrioRonda(a.ronda)}>ATENDER AL PRIMERO ▶</Boton>
      </div>
    );
  } else if (carpeta?.tipo === "t12") {
    quien = carpeta.cliente.toUpperCase();
    ficha = (
      <div className="ventanilla-carpeta">
        <p className="juego-quien">CARPETA · operación marcada</p>
        <p>{g.operacionMarcada(carpeta)}</p>
        <p className="ventanilla-nota">{g.notaDelContador(carpeta)}</p>
      </div>
    );
    if (!a.numeroBien) {
      dice = g.diceClienteT12(carpeta);
      zona = (
        <form onSubmit={enviarNC} className="grid gap-3">
          <Campo etiqueta={g.PREGUNTA_NC} valor={texto} cambiar={setTexto} campo={campo} />
          <div className="juego-acciones">
            <Boton tipo="submit">BUSCAR EN EL MANUAL ✔</Boton>
            <Boton alt onClick={() => setManual(true)}>📖 ABRIR EL MANUAL</Boton>
          </div>
          <Pista texto={pista} />
          <Escalera fallos={fallos} ayuda={g.AYUDA_NC} />
        </form>
      );
    } else {
      dice = g.aciertoNC(carpeta);
      zona = (
        <div className="grid gap-3">
          <p className="juego-nota">{g.PREGUNTA_DICTAMEN}</p>
          <div className="juego-acciones">
            <Boton onClick={() => dictaminar("aceptar")}>ACEPTAR EL BALANCE</Boton>
            <Boton alt onClick={() => dictaminar("devolver")}>DEVOLVERLO</Boton>
          </div>
        </div>
      );
    }
  } else if (carpeta?.tipo === "t13" && !enT13) {
    dice = a.ronda === 0 ? g.HOJA_NUEVA : g.RECUERDA_REGLA;
    zona = (
      <div className="grid gap-3">
        <div className="ventanilla-regla nueva">
          <p className="juego-quien">MANUAL · REGLA NUEVA · regla del juego</p>
          <p>{g.REGLA_NUEVA}</p>
        </div>
        <Boton onClick={() => setVioHoja(a.ronda)}>ATENDER AL CLIENTE ▶</Boton>
      </div>
    );
  } else if (carpeta?.tipo === "t13") {
    quien = carpeta.cliente.toUpperCase();
    ficha = (
      <div className="juego-ficha ventanilla-ficha">
        {g.fichaT13(carpeta).map((f) => (
          <div key={f.etiqueta}>
            <span className="n">{f.valor}</span>
            <span className="l">{f.etiqueta}</span>
          </div>
        ))}
      </div>
    );
    if (!a.numeroBien) {
      dice = g.diceClienteT13(carpeta);
      zona = (
        <form onSubmit={enviarHoy} className="grid gap-3">
          <Campo etiqueta={g.PREGUNTA_HOY} valor={texto} cambiar={setTexto} campo={campo} vista />
          <div className="juego-acciones">
            <Boton tipo="submit">CALCULAR ✔</Boton>
            <Boton alt onClick={() => setManual(true)}>📖 MANUAL</Boton>
          </div>
          <Pista texto={pista} />
          <Escalera fallos={fallos} ayuda={g.AYUDA_HOY} />
        </form>
      );
    } else if (!a.faltaLinea) {
      dice = g.aciertoHoy(carpeta);
      zona = (
        <form onSubmit={firmar} className="grid gap-3">
          <Campo etiqueta={g.PREGUNTA_MONTO} valor={texto} cambiar={setTexto} campo={campo} vista />
          <div className="juego-acciones">
            <Boton tipo="submit">FIRMAR EL CRÉDITO ✔</Boton>
            <Boton alt onClick={() => setManual(true)}>📖 MANUAL</Boton>
          </div>
          <Pista texto={pista} />
        </form>
      );
    } else {
      dice = g.pideLinea(carpeta);
      zona = (
        <form onSubmit={enviarLinea} className="grid gap-3">
          <textarea ref={campo} value={texto} onChange={(e) => setTexto(e.target.value)} maxLength={400} aria-label="Tu línea para el cliente" />
          <div className="juego-acciones">
            <Boton tipo="submit">ENTREGARLE LA CARPETA ✔</Boton>
          </div>
          <Pista texto={pista} />
        </form>
      );
    }
  }

  const reglaNuevaVista = a.ronda > 0 || vioHoja >= 0 || Boolean(a.resultados);
  const enCola = a.actual === null ? 0 : a.carpetas.length - a.actual;

  return (
    <div className="juego ventanilla" style={{ ["--juego-pixel" as string]: fuentePixel }}>
      <div className="juego-marco">
        <div className="juego-cabeza">
          <div>
            <h1>LA VENTANILLA</h1>
            <p className="juego-sub">Isla AIEF · {g.LUGAR} · Tema 1: el marco de la información financiera</p>
          </div>
          <span className="juego-chip" title="Cada estudiante recibe datos distintos">
            {version === 0 ? "CASO DE EJEMPLO" : `TUS DATOS: VERSIÓN ${version}`}
          </span>
        </div>

        <BarraCuenta cuenta={cuenta} guardado={guardado} />

        <div className="juego-pantalla">
          <Mostrador enCola={a.llegada ? enCola : 1} pared={a.resultados?.map((r) => CLASE_COLOR[r.color]) ?? (a.llegada && !vioPared ? ["verde"] : [])} />
        </div>

        {ficha}

        <div className="juego-dialogo" aria-live="polite">
          <p className="juego-quien">{quien}</p>
          <p className="juego-dice">{dice}</p>
          <div>{zona}</div>
        </div>

        {manual && (
          <section className="ventanilla-manual" aria-label="Manual de la agencia">
            <div className="juego-acciones" style={{ justifyContent: "space-between" }}>
              <h2>MANUAL DE LA AGENCIA</h2>
              <Boton alt onClick={() => setManual(false)}>CERRAR ✕</Boton>
            </div>
            <div className={reglaNuevaVista ? "ventanilla-regla tachada" : "ventanilla-regla"}>
              <p className="juego-quien">REGLA CERO · regla del juego</p>
              <p>{g.REGLA_CERO}</p>
            </div>
            {reglaNuevaVista && (
              <div className="ventanilla-regla nueva">
                <p className="juego-quien">REGLA DEL TEMA 1 · la reemplaza · regla del juego</p>
                <p>{g.REGLA_NUEVA}</p>
              </div>
            )}
            {a.llegada && (
              <>
                <p className="juego-quien">LAS 14 NORMAS DE CONTABILIDAD BOLIVIANAS (NC)</p>
                <ol className="ventanilla-normas">
                  {NORMAS.map(([n, t]) => (
                    <li key={n}>
                      <b>NC {n}</b> {t}
                    </li>
                  ))}
                </ol>
                <p className="juego-nota">Si ninguna NC regula la operación, recién entra la NIIF, como supletoria.</p>
              </>
            )}
          </section>
        )}

        {!manual && a.llegada && (
          <div className="juego-acciones">
            <Boton alt onClick={() => setManual(true)}>📖 ABRIR EL MANUAL</Boton>
          </div>
        )}

        <section className="juego-registro" aria-label="Registro de decisiones">
          <h2>REGISTRO · lo ve el docente</h2>
          {partida.eventos.length === 0 ? (
            <p className="juego-nota">Todavía no hay decisiones.</p>
          ) : (
            <ol>
              {partida.eventos.map((e, i) => {
                const { texto: t, bien } = g.describir(a.rondas, e);
                const hora = new Date(e.hora).toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" });
                return (
                  <li key={i}>
                    <span className="hora">{hora}</span> {t}
                    {bien === true && <span className="bien"> ✔</span>}
                  </li>
                );
              })}
            </ol>
          )}
        </section>

        <p className="juego-pie">
          Borrador para probar en clase.{" "}
          {cuenta.estado === "dentro" ? "El registro se guarda en tu cuenta y en este celular." : "Sin cuenta, el registro se guarda sólo en este celular."}{" "}
          Las reglas de crédito son del juego; las NC y el cálculo de reexpresión, del Tema 1 del dossier.
        </p>
      </div>
    </div>
  );
}

function Boton({ children, onClick, alt, tipo = "button" }: { children: ReactNode; onClick?: () => void; alt?: boolean; tipo?: "button" | "submit" }) {
  return (
    <button type={tipo} onClick={onClick} className={alt ? "juego-boton alt" : "juego-boton"}>
      {children}
    </button>
  );
}

function Campo({
  etiqueta,
  valor,
  cambiar,
  campo,
  vista,
}: {
  etiqueta: string;
  valor: string;
  cambiar: (v: string) => void;
  campo: React.RefObject<HTMLInputElement & HTMLTextAreaElement | null>;
  /** Muestra "Bs 20.000" mientras escribe, para firmar sin dudas. */
  vista?: boolean;
}) {
  const n = leerEntero(valor);
  return (
    <div className="grid gap-1.5">
      <label htmlFor="juego-respuesta" className="juego-nota">
        {etiqueta}
      </label>
      <div className="juego-acciones">
        <input id="juego-respuesta" ref={campo} value={valor} onChange={(e) => cambiar(e.target.value)} inputMode="numeric" autoComplete="off" />
        {vista && n !== null && <span className="ventanilla-vista">Bs {bs(n)}</span>}
      </div>
    </div>
  );
}

function Escalera({ fallos, ayuda }: { fallos: number; ayuda: AyudaDePaso }) {
  const { concreta, leer } = ayudaVisible(fallos, ayuda);
  if (concreta.length === 0 && !leer) return null;
  return (
    <div className="juego-ayuda">
      <p className="juego-quien">DOÑA TERESA TE AYUDA</p>
      {concreta.map((l) => (
        <p key={l}>{l}</p>
      ))}
      {leer && <p className="juego-leer">📖 {leer}</p>}
    </div>
  );
}

function Pista({ texto }: { texto: string }) {
  return texto ? <p className="juego-pista">{texto}</p> : null;
}
