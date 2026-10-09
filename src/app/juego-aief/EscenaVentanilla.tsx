"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { bs } from "@/lib/formato";
import { ayudaVisible, escalonDe, type AyudaDePaso } from "@/lib/juego/escalera";
import * as g from "@/lib/juego/aief/guion-tema1";
import {
  ESCENA_TEMA1,
  FALLOS_HASTA_QUE_SE_VA,
  NORMAS,
  PRACTICA_CORRECTO,
  SEMILLA_VERSION,
  avanceDe,
  finalP13,
  practicaT12,
  practicaT13,
  revisarNC,
  revisarReexpresion,
  revisarT11,
  type Dictamen,
  type EventoTema1,
  type Rol,
  type Sello,
  type SelloCalidad,
} from "@/lib/juego/aief/tema1";
import type { Color } from "@/lib/juego/aief/ventanilla";
import { guardarPartidaNube, leerPartidaNubeDe } from "@/lib/juego/nube";
import { anotarEn, elegirPartida, guardarPartidaDe, leerPartidaDe, partidaNuevaDe, type PartidaDe } from "@/lib/juego/partida";
import { versionDeAlumno } from "@/lib/juego/version-alumno";
import { BarraCuenta, useCuenta, type EstadoGuardado } from "../juego-proyectos/CuentaJuego";
import { Mostrador } from "./Mostrador";

type Partida = PartidaDe<EventoTema1, "aief", "tema1-g2">;

const nueva = (v: number): Partida => partidaNuevaDe<EventoTema1, "aief", "tema1-g2">(ESCENA_TEMA1, v);
const leerLocal = (v: number) => leerPartidaDe<EventoTema1, "aief", "tema1-g2">(ESCENA_TEMA1, v);

/** "103.500", "103 500" o "103500" son ciento tres mil quinientos. */
const leerEntero = (s: string) => (/\d/.test(s) ? Number(s.replace(/\D/g, "")) : null);

const CLASE_COLOR: Record<Color, string> = { verde: "verde", "bien-rechazado": "verde", rojo: "rojo", gris: "gris", "no-le-servia": "gris" };

export function EscenaVentanilla({ fuentePixel }: { fuentePixel: string }) {
  const [version, setVersion] = useState(0);
  const [partida, setPartida] = useState<Partida>(() => nueva(0));
  const cuenta = useCuenta();
  const alumnoId = cuenta.estado === "dentro" ? (cuenta.alumno?.id ?? null) : null;
  const cursoId = cuenta.cursoId;
  const [guardado, setGuardado] = useState<EstadoGuardado>("sin-cambios");
  const pendiente = useRef(false);
  const ultima = useRef(partida);
  ultima.current = partida;
  const [reintento, setReintento] = useState(0);

  // Lo que no es evento (qué introducción ya vio): se vuelve a mostrar al recargar, y no importa.
  const [llegadaPaso, setLlegadaPaso] = useState(0);
  const [practicaMal, setPracticaMal] = useState("");
  const [abrio, setAbrio] = useState<Record<string, boolean>>({});
  const [selloT11, setSelloT11] = useState<Sello | null>(null);
  const [manual, setManual] = useState(false);
  const [texto, setTexto] = useState("");
  const [pista, setPista] = useState("");
  const [aviso, setAviso] = useState("");
  const campo = useRef<HTMLInputElement>(null);

  // Sin cuenta: siempre el ejemplo, que no cuenta para la nota. Con cuenta: su versión, sin mostrar el número.
  useEffect(() => {
    if (alumnoId) return;
    setGuardado("sin-cambios");
    pendiente.current = false;
    setVersion(0);
    setPartida(leerLocal(0) ?? nueva(0));
  }, [alumnoId]);

  useEffect(() => {
    if (!alumnoId) return;
    let vivo = true;
    const v = versionDeAlumno(alumnoId, SEMILLA_VERSION);
    const local = leerLocal(v);
    pendiente.current = false;
    setVersion(v);
    setPartida(local ?? nueva(v));
    setGuardado("sin-cambios");
    leerPartidaNubeDe<EventoTema1, "aief", "tema1-g2">(ESCENA_TEMA1, alumnoId, cursoId, v)
      .then((enNube) => {
        if (!vivo) return;
        // Lo jugado sin conexión, o mientras la nube respondía, no se pisa con la copia más vieja.
        const { partida: elegida, subir } = elegirPartida(ultima.current, enNube);
        if (!elegida) return;
        if (subir) {
          pendiente.current = true;
          setPartida({ ...elegida });
        } else if (enNube) {
          setPartida(enNube);
          guardarPartidaDe(enNube);
          setGuardado(enNube.terminada ? "entregada" : "guardado");
        }
      })
      .catch(() => vivo && setGuardado("error"));
    return () => {
      vivo = false;
    };
  }, [alumnoId, cursoId]);

  useEffect(() => {
    if (!alumnoId || !pendiente.current || partida.version === 0) return;
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
  const p = a.paso;

  // El aviso «el cliente se fue» dura hasta la siguiente acción del alumno, no más.
  const registrar = (e: EventoTema1, terminada = false) => {
    setAviso("");
    setPartida((x) => {
      const n = { ...anotarEn(x, e), ...(terminada ? { terminada: true } : {}) };
      guardarPartidaDe(n);
      pendiente.current = true;
      return n;
    });
  };

  // Cada paso nuevo empieza con el campo y la pista vacíos.
  const clavePaso = JSON.stringify([p.paso, "i" in p ? p.i : null, a.ronda, p.paso === "t12" ? [p.nc.bien, p.sello] : null, p.paso === "t13" ? p.hoy.bien : null]);
  useEffect(() => {
    setTexto("");
    setPista("");
    setSelloT11(null);
    campo.current?.focus();
  }, [clavePaso]);

  /** Anota el primer momento en que llegó al escalón concreto o al de leer. */
  const anotarAyuda = (paso: string, fallos: number, ayuda: AyudaDePaso) => {
    const e = escalonDe(fallos);
    if ((e === "concreta" && fallos === 2) || (e === "leer" && fallos === 3 && ayuda.leer)) registrar({ tipo: "ayuda", paso, escalon: e });
  };

  // ── acciones ───────────────────────────────────────────────────────────────
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
  };

  const entregarHoja = (hoja: Rol) => {
    if (p.paso !== "t11" || !selloT11) return;
    registrar({ tipo: "t11", i: p.i, sello: selloT11, hoja });
    const dx = revisarT11(p.persona, selloT11, hoja);
    if (!p.practica && dx !== "bien") anotarAyuda("1.1", p.fallos + 1, g.AYUDA_T11);
  };

  const enviarNcPractica = (ev: FormEvent) => {
    ev.preventDefault();
    if (p.paso !== "p12") return;
    const v = leerEntero(texto);
    if (v === null) return setPista("Escribe un número, o 0.");
    registrar({ tipo: "p12-nc", valor: v });
    const dx = revisarNC(practicaT12(version), v);
    if (dx !== "correcta") {
      setPista(g.PISTA_NC[dx]);
      setTexto("");
    }
  };

  const enviarNc = (ev: FormEvent) => {
    ev.preventDefault();
    if (p.paso !== "t12") return;
    const v = leerEntero(texto);
    if (v === null) return setPista("Escribe un número, o 0.");
    registrar({ tipo: "nc", ronda: a.ronda, i: p.i, valor: v });
    const dx = revisarNC(p.carpeta, v);
    if (dx === "correcta") return;
    const fallos = p.nc.fallos + 1;
    if (fallos >= FALLOS_HASTA_QUE_SE_VA) return setAviso(g.SE_FUE);
    setPista(g.PISTA_NC[dx]);
    setTexto("");
    anotarAyuda("1.2", fallos, g.AYUDA_NC);
  };

  const enviarHoy = (ev: FormEvent) => {
    ev.preventDefault();
    if (p.paso !== "t13") return;
    const v = leerEntero(texto);
    if (v === null) return setPista("Escribe un número.");
    registrar({ tipo: "reexpresion", ronda: a.ronda, i: p.i, valor: v });
    const dx = revisarReexpresion(p.carpeta, v);
    if (dx === "correcta") return;
    const fallos = p.hoy.fallos + 1;
    if (fallos >= FALLOS_HASTA_QUE_SE_VA) return setAviso(g.SE_FUE);
    setPista(g.PISTA_HOY[dx]);
    setTexto("");
    anotarAyuda("1.3", fallos, g.AYUDA_HOY);
  };

  const firmar = (ev: FormEvent) => {
    ev.preventDefault();
    const v = leerEntero(texto);
    if (v === null) return setPista("Escribe un monto, o 0 si no le prestas.");
    if (p.paso === "p13") registrar({ tipo: "p13-monto", valor: v });
    else if (p.paso === "t13") registrar({ tipo: "monto", ronda: a.ronda, i: p.i, valor: v });
  };

  // ── qué se muestra ─────────────────────────────────────────────────────────
  let quien = g.JEFA;
  let dice: ReactNode = "";
  let zona: ReactNode = null;
  let ficha: ReactNode = null;
  let pared: string[] = [];
  let enCola = 1;
  const abrir = (k: string) => setAbrio((x) => ({ ...x, [k]: true }));

  switch (p.paso) {
    case "llegada":
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
      break;

    case "pared":
      dice = g.PARED_PRIMERA;
      pared = ["verde"];
      zona = <Boton onClick={() => registrar({ tipo: "visto", que: "pared" })}>AL DÍA SIGUIENTE ▶</Boton>;
      break;

    case "t11": {
      enCola = 3;
      const per = p.persona;
      const ant = p.anterior;
      quien = per.nombre.toUpperCase();
      dice = g.frasePersona(per);
      zona = (
        <div className="grid gap-3">
          {p.i === 0 && <p className="juego-nota">{g.ABRE_T11}</p>}
          {ant && (
            <div className="juego-ayuda">
              <p>
                <b>{ant.persona.nombre}:</b> «{g.reaccionT11(ant.persona, ant.dx)}»
              </p>
              {ant.dx === "siguio-a-nieves" && <p>Doña Nieves: «{g.NIEVES_HOMBROS}»</p>}
              {p.i > 1 && ant.dx !== "bien" && <p className="juego-pista">{g.PISTA_T11[ant.dx]}</p>}
            </div>
          )}
          <Escalera fallos={p.fallos} ayuda={g.AYUDA_T11} quien="DOÑA TERESA TE AYUDA" />
          {per.sugiere && <p className="juego-nota">Doña Nieves se asoma: «{g.nievesEmpuja(per)}» y señala «{g.hoja(per.sugiere)}».</p>}
          {!selloT11 ? (
            <>
              <p className="juego-nota">{g.PREGUNTA_SELLO}</p>
              <div className="ventanilla-grilla">
                {a.mostrador.ordenSellos.map((s) => (
                  <button key={s} type="button" className="juego-opcion" onClick={() => setSelloT11(s)}>
                    <span>{g.decision(s)}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="juego-nota">
                Sello: <b>{g.decision(selloT11)}</b>. {g.PREGUNTA_HOJA}
              </p>
              <div className="juego-opciones">
                {a.mostrador.ordenHojas.map((h) => (
                  <button key={h} type="button" className="juego-opcion" onClick={() => entregarHoja(h)}>
                    <span>{g.hoja(h)}</span>
                  </button>
                ))}
              </div>
              <Boton alt onClick={() => setSelloT11(null)}>↺ CAMBIAR EL SELLO</Boton>
            </>
          )}
          {p.practica && <p className="juego-nota">Primera persona: es de práctica, no cuenta para la nota.</p>}
        </div>
      );
      break;
    }

    case "cierre-t11":
      dice = g.cierraT11(3);
      zona = <Boton onClick={() => registrar({ tipo: "visto", que: "t11" })}>ABRIR LA VENTANILLA ▶</Boton>;
      break;

    case "p12": {
      const pr = practicaT12(version);
      if (!abrio.jornada) {
        dice = g.ABRE_JORNADA;
        zona = <Boton onClick={() => abrir("jornada")}>ATENDER AL PRIMERO ▶</Boton>;
        break;
      }
      enCola = 4;
      quien = pr.cliente.toUpperCase();
      ficha = (
        <Carpeta
          operacion={g.operacionBeatriz(pr)}
          nota={g.notaBeatriz(pr)}
          pestañas={[
            { titulo: "Pasivo", lineas: g.pasivoBeatriz(pr) },
            { titulo: "Papeles sueltos", lineas: [g.pagareBeatriz(pr)] },
          ]}
          practica
        />
      );
      const cerrado = p.nc.fallos >= FALLOS_HASTA_QUE_SE_VA;
      if (!p.nc.bien && !cerrado) {
        dice = g.diceBeatriz(pr);
        zona = (
          <form onSubmit={enviarNcPractica} className="grid gap-3">
            <Campo etiqueta={g.PREGUNTA_NC} valor={texto} cambiar={setTexto} campo={campo} />
            <div className="juego-acciones">
              <Boton tipo="submit">ANOTAR LA NC ✔</Boton>
              <Boton alt onClick={() => setManual(true)}>📖 MANUAL</Boton>
            </div>
            <Pista texto={pista} />
            <Escalera fallos={p.nc.fallos} ayuda={g.AYUDA_NC} quien="DOÑA TERESA TE AYUDA" />
          </form>
        );
      } else {
        dice = cerrado ? g.CIERRA_CAMPO_NC : g.ACIERTO;
        zona = (
          <div className="grid gap-3">
            <p className="juego-nota">{g.PREGUNTA_DICTAMEN_PRACTICA}</p>
            <div className="juego-acciones">
              <Boton onClick={() => registrar({ tipo: "p12-dictamen", decision: "aceptar" })}>ACEPTAR</Boton>
              <Boton alt onClick={() => registrar({ tipo: "p12-dictamen", decision: "devolver" })}>DEVOLVER</Boton>
            </div>
          </div>
        );
      }
      break;
    }

    case "p12-consecuencia": {
      const pr = practicaT12(version);
      const color: Color = p.decision === "aceptar" ? "rojo" : "bien-rechazado";
      pared = [CLASE_COLOR[color]];
      quien = "SE ADELANTA EL TIEMPO";
      dice = g.consecuenciaBeatriz(p.decision);
      ficha = <Carpeta operacion={g.operacionBeatriz(pr)} nota={g.notaBeatriz(pr)} pestañas={[{ titulo: "Papeles sueltos", lineas: [g.pagareBeatriz(pr)], resaltar: true }]} practica />;
      zona = (
        <div className="grid gap-3">
          <p className="juego-dice">
            {g.JEFA.split(" · ")[0]}: «{g.JEFA_DESPUES_DEL_PAGARE}»
          </p>
          <p className="juego-nota">Tu manual suma una página: «Calidad».</p>
          <Boton onClick={() => registrar({ tipo: "visto", que: "p12" })}>SEGUIR ▶</Boton>
        </div>
      );
      break;
    }

    case "t12": {
      const c = p.carpeta;
      enCola = a.rondas[a.ronda].length - p.i;
      if (a.ronda > 0 && !abrio[`ronda${a.ronda}`]) {
        dice = g.ABRE_REPASO;
        zona = <IntroRepaso a={a} seguir={() => abrir(`ronda${a.ronda}`)} />;
        break;
      }
      quien = g.nombreCarpeta(c).toUpperCase();
      dice = g.diceClienteT12(c);
      ficha = <Carpeta operacion={g.operacionMarcada(c)} nota={g.notaDelContador(c)} pestañas={[{ titulo: "Otro papel de la carpeta", lineas: [g.papelDeLaCarpeta(c)] }]} />;
      if (!p.nc.bien) {
        zona = (
          <form onSubmit={enviarNc} className="grid gap-3">
            <Campo etiqueta={g.PREGUNTA_NC} valor={texto} cambiar={(v) => (setTexto(v), setAviso(""))} campo={campo} />
            <div className="juego-acciones">
              <Boton tipo="submit">ANOTAR LA NC ✔</Boton>
              <Boton alt onClick={() => setManual(true)}>📖 MANUAL</Boton>
            </div>
            <Pista texto={pista} />
            <Escalera fallos={p.nc.fallos} ayuda={g.AYUDA_NC} quien="DOÑA TERESA TE AYUDA" />
          </form>
        );
      } else if (!p.sello) {
        zona = (
          <div className="grid gap-3">
            <p className="juego-nota">
              {g.ACIERTO} {g.PREGUNTA_SELLO_CALIDAD}
            </p>
            <div className="ventanilla-grilla">
              {g.SELLOS_CALIDAD.map((s) => (
                <button key={s.sello} type="button" className="juego-opcion" onClick={() => registrar({ tipo: "sello", ronda: a.ronda, i: p.i, sello: s.sello as SelloCalidad })}>
                  <span>{s.texto}</span>
                </button>
              ))}
            </div>
            <Boton alt onClick={() => setManual(true)}>📖 MANUAL</Boton>
          </div>
        );
      } else {
        zona = (
          <div className="grid gap-3">
            <p className="juego-nota">{g.PREGUNTA_DICTAMEN}</p>
            <div className="grid gap-2">
              {(["aceptar", "observar", "devolver"] as Dictamen[]).map((d) => (
                <Boton key={d} alt={d !== "aceptar"} onClick={() => registrar({ tipo: "dictamen", ronda: a.ronda, i: p.i, decision: d })}>
                  {g.BOTON_DICTAMEN[d]}
                </Boton>
              ))}
            </div>
          </div>
        );
      }
      break;
    }

    case "p13": {
      const pr = practicaT13(version);
      if (!abrio.carpintero) {
        dice = g.ANTES_DEL_CARPINTERO;
        zona = <Boton onClick={() => abrir("carpintero")}>ATENDERLO ▶</Boton>;
        break;
      }
      quien = pr.carpintero.toUpperCase();
      dice = g.diceCarpintero(pr);
      ficha = <Cifras filas={g.fichaCarpintero(pr)} />;
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
      break;
    }

    case "p13-consecuencia": {
      const pr = practicaT13(version);
      const f = finalP13(pr, p.monto);
      pared = [CLASE_COLOR[f.color]];
      quien = "SE ADELANTA EL TIEMPO";
      dice = g.consecuenciaCarpintero(f.final, f.color, f.cooperativa);
      ficha = <Cifras filas={g.fichaCarpintero(pr)} />;
      zona = (
        <div className="grid gap-3">
          <p className="juego-dice">
            {g.JEFA.split(" · ")[0]}: «{g.JEFA_DESPUES_DEL_CARPINTERO}»
          </p>
          <p className="juego-nota">Tu manual suma una hoja nueva.</p>
          <Boton onClick={() => registrar({ tipo: "visto", que: "p13" })}>SEGUIR ▶</Boton>
        </div>
      );
      break;
    }

    case "t13": {
      const c = p.carpeta;
      enCola = a.rondas[a.ronda].length - p.i;
      if (a.ronda > 0 && a.rondas[a.ronda].length === 1 && !abrio[`ronda${a.ronda}`]) {
        dice = g.ABRE_REPASO;
        zona = <IntroRepaso a={a} seguir={() => abrir(`ronda${a.ronda}`)} />;
        break;
      }
      if (!abrio[`hoja${a.ronda}`]) {
        dice = g.RECUERDA_REGLA;
        zona = (
          <div className="grid gap-3">
            <Regla titulo="HOJA NUEVA · regla del juego" nueva lineas={[g.REGLA_NUEVA, g.REGLA_FORMULA]} />
            <Boton onClick={() => abrir(`hoja${a.ronda}`)}>ATENDER AL CLIENTE ▶</Boton>
          </div>
        );
        break;
      }
      quien = g.nombreCarpeta(c).toUpperCase();
      dice = g.diceClienteT13(c);
      ficha = <Cifras filas={g.fichaT13(c)} />;
      zona = !p.hoy.bien ? (
        <form onSubmit={enviarHoy} className="grid gap-3">
          <Campo etiqueta={g.PREGUNTA_HOY} valor={texto} cambiar={(v) => (setTexto(v), setAviso(""))} campo={campo} vista />
          <div className="juego-acciones">
            <Boton tipo="submit">CALCULAR ✔</Boton>
            <Boton alt onClick={() => setManual(true)}>📖 MANUAL</Boton>
          </div>
          <Pista texto={pista} />
          <Escalera fallos={p.hoy.fallos} ayuda={g.AYUDA_HOY} quien="DOÑA TERESA TE AYUDA" />
        </form>
      ) : (
        <form onSubmit={firmar} className="grid gap-3">
          <p className="juego-nota">{g.ACIERTO}</p>
          <Campo etiqueta={g.PREGUNTA_MONTO} valor={texto} cambiar={setTexto} campo={campo} vista />
          <div className="juego-acciones">
            <Boton tipo="submit">FIRMAR EL CRÉDITO ✔</Boton>
            <Boton alt onClick={() => setManual(true)}>📖 MANUAL</Boton>
          </div>
          <Pista texto={pista} />
        </form>
      );
      break;
    }

    case "cierre": {
      const aprueba = p.aRepasar.length === 0;
      pared = p.resultados.map((r) => CLASE_COLOR[r.color]);
      dice = g.ABRE_CIERRE;
      zona = (
        <div className="grid gap-3">
          <ul className="ventanilla-pared">
            {p.resultados.map((r, k) => (
              <li key={k} className={CLASE_COLOR[r.color]}>
                <b>{g.ETIQUETA_COLOR[r.color]}</b> · {g.nombreCarpeta(r.carpeta)}
                <span>{g.queFuePaso(r.carpeta, r.color, r.final)}</span>
              </li>
            ))}
          </ul>
          <p className="juego-dice">{aprueba ? g.CIERRE_BIEN : g.CIERRE_REPASO}</p>
          {aprueba && <p className="ventanilla-sello">{g.APROBADO}</p>}
          <Boton onClick={() => registrar({ tipo: "cierre", ronda: a.ronda }, aprueba)}>{aprueba ? "TERMINAR EL TEMA 1 ✔" : "CERRAR LA JORNADA ▶"}</Boton>
        </div>
      );
      break;
    }

    case "final":
      quien = g.JEFA;
      dice = g.FINAL;
      zona = (
        <div className="grid gap-2">
          <p className="ventanilla-sello">{g.APROBADO}</p>
          <p className="juego-nota">{g.FINAL_PANTALLA}</p>
          {version === 0 && (
            <Boton
              alt
              onClick={() => {
                const n = nueva(0);
                guardarPartidaDe(n);
                setPartida(n);
                setLlegadaPaso(0);
                setAbrio({});
              }}
            >
              ↺ JUGAR EL EJEMPLO DE NUEVO
            </Boton>
          )}
        </div>
      );
      break;
  }

  const ejemplo = version === 0;

  return (
    <div className="juego ventanilla" style={{ ["--juego-pixel" as string]: fuentePixel }}>
      <div className="juego-marco">
        <div className="juego-cabeza">
          <div>
            <h1>LA VENTANILLA</h1>
            <p className="juego-sub">Isla AIEF · {g.LUGAR} · Tema 1: el marco de la información financiera</p>
          </div>
          <span className="juego-chip" title={ejemplo ? "Entra con tu cuenta para jugar con tus propios datos" : "Cada estudiante recibe datos distintos"}>
            {ejemplo ? "PARTIDA DE EJEMPLO · NO CUENTA PARA LA NOTA" : "TUS DATOS"}
          </span>
        </div>

        <BarraCuenta cuenta={cuenta} guardado={guardado} />

        <div className="juego-pantalla">
          <Mostrador enCola={enCola} pared={pared} />
        </div>

        {ficha}

        <div className="juego-dialogo" aria-live="polite">
          {aviso && <p className="juego-pista">{aviso}</p>}
          <p className="juego-quien">{quien}</p>
          <p className="juego-dice">{dice}</p>
          <div>{zona}</div>
        </div>

        {manual ? (
          <section className="ventanilla-manual" aria-label="Manual de la agencia">
            <div className="juego-acciones" style={{ justifyContent: "space-between" }}>
              <h2>MANUAL DE LA AGENCIA</h2>
              <Boton alt onClick={() => setManual(false)}>CERRAR ✕</Boton>
            </div>
            <Regla titulo="REGLA CERO · regla del juego" tachada={a.manual.formula} lineas={[g.REGLA_CERO]} />
            <Regla titulo="EL MONTO · regla del juego" lineas={[g.REGLA_MONTO]} />
            {a.manual.formula && <Regla titulo="HOJA NUEVA · la reemplaza · regla del juego" nueva lineas={[g.REGLA_NUEVA, g.REGLA_FORMULA]} />}
            {p.paso !== "llegada" && (
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
            {a.manual.calidad && <Regla titulo="CALIDAD · regla de la agencia" lineas={[g.MANUAL_NORMA_Y_CALIDAD, ...g.PAGINA_CALIDAD]} />}
          </section>
        ) : (
          p.paso !== "llegada" && (
            <div className="juego-acciones">
              <Boton alt onClick={() => setManual(true)}>📖 ABRIR EL MANUAL</Boton>
            </div>
          )
        )}

        <section className="juego-registro" aria-label="Registro de decisiones">
          <h2>REGISTRO · lo ve el docente</h2>
          {partida.eventos.length === 0 ? (
            <p className="juego-nota">Todavía no hay decisiones.</p>
          ) : (
            <ol>
              {partida.eventos.map((e, i) => {
                const { texto: t, bien } = g.describir(version, a.rondas, e);
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
          Borrador para probar en clase. {ejemplo ? "Sin cuenta se juega el caso de ejemplo, igual para todos; se guarda sólo en este celular." : "El registro se guarda en tu cuenta y en este celular."} Las reglas de
          crédito y de calidad son del juego; las NC y el cálculo de reexpresión, del Tema 1 del dossier.
        </p>
      </div>
    </div>
  );
}

function IntroRepaso({ a, seguir }: { a: ReturnType<typeof avanceDe>; seguir: () => void }) {
  const tipos = [...new Set(a.rondas[a.ronda].map((c) => c.tipo))];
  return (
    <div className="grid gap-3">
      {tipos.map((t) => {
        const ayuda = ayudaVisible(a.fallosPorTipo[t], g.AYUDA_REPASO[t]);
        return (
          <div key={t} className="juego-ayuda">
            <p>{g.pistaRepaso(a.ultimoError[t])}</p>
            {ayuda.concreta.map((l) => (
              <p key={l}>{l}</p>
            ))}
            {ayuda.leer && <p className="juego-leer">📖 {ayuda.leer}</p>}
          </div>
        );
      })}
      <Boton onClick={seguir}>ATENDER AL PRIMERO ▶</Boton>
    </div>
  );
}

function Carpeta({
  operacion,
  nota,
  pestañas,
  practica,
}: {
  operacion: string;
  nota: string;
  pestañas: { titulo: string; lineas: string[]; resaltar?: boolean }[];
  practica?: boolean;
}) {
  return (
    <div className="ventanilla-carpeta">
      <p className="juego-quien">CARPETA{practica ? " · PRÁCTICA, SIN NOTA" : ""} · operación marcada</p>
      <p>{operacion}</p>
      <p className="ventanilla-nota">Nota del contador: «{nota}»</p>
      {pestañas.map((t) => (
        <div key={t.titulo} className={t.resaltar ? "ventanilla-pestana resaltada" : "ventanilla-pestana"}>
          <p className="juego-quien">{t.titulo.toUpperCase()}</p>
          {t.lineas.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

function Cifras({ filas }: { filas: { etiqueta: string; valor: string }[] }) {
  return (
    <div className="juego-ficha ventanilla-ficha">
      {filas.map((f) => (
        <div key={f.etiqueta}>
          <span className="n">{f.valor}</span>
          <span className="l">{f.etiqueta}</span>
        </div>
      ))}
    </div>
  );
}

function Regla({ titulo, lineas, nueva, tachada }: { titulo: string; lineas: string[]; nueva?: boolean; tachada?: boolean }) {
  return (
    <div className={`ventanilla-regla${nueva ? " nueva" : ""}${tachada ? " tachada" : ""}`}>
      <p className="juego-quien">{titulo}</p>
      {lineas.map((l) => (
        <p key={l}>{l}</p>
      ))}
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
  campo: React.RefObject<HTMLInputElement | null>;
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

function Escalera({ fallos, ayuda, quien }: { fallos: number; ayuda: AyudaDePaso; quien: string }) {
  const { concreta, leer } = ayudaVisible(fallos, ayuda);
  if (concreta.length === 0 && !leer) return null;
  return (
    <div className="juego-ayuda">
      <p className="juego-quien">{quien}</p>
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
