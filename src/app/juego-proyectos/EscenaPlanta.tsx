"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { bs } from "@/lib/formato";
import * as guion from "@/lib/juego/guion-planta";
import {
  VERSION_MAXIMA,
  consecuencia,
  datosDeVersion,
  revisarCapacidad,
  revisarCapacidadConCompra,
  revisarRecuperacion,
  type Opcion,
} from "@/lib/juego/planta";
import { guardarPartidaNube, leerPartidaNube } from "@/lib/juego/nube";
import { anotar, describir, guardarPartida, leerPartida, partidaNueva, type Evento, type Partida } from "@/lib/juego/registro";
import { versionDeAlumno } from "@/lib/juego/version-alumno";
import { BarraCuenta, useCuenta, type EstadoGuardado } from "./CuentaJuego";
import { LienzoPlanta } from "./LienzoPlanta";

type Paso = "saludo" | "capacidad" | "decidir" | "compra" | "mes" | "recuperacion" | "defensa" | "final";

const CONFIANZA: Record<Opcion, number> = { tanque: 5, nada: 2, envasadora: 1 };

/** Sin cuenta, "#v=417" elige la versión y sin eso va el caso del dossier. Con cuenta, la versión sale del id del alumno. */
function versionDeLaDireccion(): number {
  const v = Number(new URLSearchParams(window.location.hash.slice(1)).get("v"));
  return Number.isInteger(v) && v >= 0 && v <= VERSION_MAXIMA ? v : 0;
}

/** "1.080" o "1080" son mil ochenta; "3,1" o "3.1" en la recuperación son tres coma uno. */
const leerEntero = (s: string) => (/\d/.test(s) ? Number(s.replace(/\D/g, "")) : null);
const leerDecimal = (s: string) => {
  const n = Number(s.trim().replace(",", "."));
  return s.trim() && Number.isFinite(n) ? n : null;
};

export function EscenaPlanta({ fuentePixel }: { fuentePixel: string }) {
  const [version, setVersion] = useState(0);
  const d = datosDeVersion(version);
  const [partida, setPartida] = useState<Partida>(() => partidaNueva(0));
  const [paso, setPaso] = useState<Paso>("saludo");
  const [opcion, setOpcion] = useState<Opcion | null>(null);
  const [mesPasado, setMesPasado] = useState(false);
  const [pista, setPista] = useState("");
  const [fallos, setFallos] = useState(0);
  const [ayuda, setAyuda] = useState(false);
  const [recuperacionBien, setRecuperacionBien] = useState(false);
  const [texto, setTexto] = useState("");
  const campo = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const cuenta = useCuenta();
  const alumnoId = cuenta.estado === "dentro" ? (cuenta.alumno?.id ?? null) : null;
  const cursoId = cuenta.cursoId;
  const [guardado, setGuardado] = useState<EstadoGuardado>("sin-cambios");
  // Sólo se sube a la cuenta lo que hizo el alumno, no lo que se acaba de leer de ella.
  const pendiente = useRef(false);

  const empezarCon = (v: number, guardada: Partida | null) => {
    pendiente.current = false;
    setVersion(v);
    setPartida(guardada ?? partidaNueva(v));
    setPaso(guardada?.terminada ? "final" : "saludo");
    setOpcion(null);
    setMesPasado(false);
  };

  // La versión y la partida guardada se leen después de montar: el HTML del servidor es el de la versión 0.
  useEffect(() => {
    if (alumnoId) return;
    setGuardado("sin-cambios");
    const leer = () => {
      const v = versionDeLaDireccion();
      empezarCon(v, leerPartida(v));
    };
    leer();
    window.addEventListener("hashchange", leer);
    return () => window.removeEventListener("hashchange", leer);
  }, [alumnoId]);

  // Con cuenta: su versión, y la partida de su cuenta en ese curso (o la de este navegador si no hay).
  useEffect(() => {
    if (!alumnoId) return;
    let vivo = true;
    const v = versionDeAlumno(alumnoId);
    const local = leerPartida(v);
    empezarCon(v, local);
    setGuardado("sin-cambios");
    leerPartidaNube(alumnoId, cursoId, v)
      .then((enNube) => {
        if (!vivo) return;
        if (enNube) {
          empezarCon(v, enNube);
          guardarPartida(enNube);
          setGuardado(enNube.terminada ? "entregada" : "guardado");
        } else if (local && local.eventos.length > 0) {
          pendiente.current = true; // lo jugado en este navegador pasa a la cuenta
          setPartida({ ...local });
        }
      })
      .catch(() => vivo && setGuardado("error"));
    return () => {
      vivo = false;
    };
  }, [alumnoId, cursoId]);

  // Cada cambio del alumno se sube a su cuenta, agrupando los que llegan seguidos.
  // Si falla, queda pendiente y se reintenta con la próxima respuesta (no en bucle).
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
  }, [partida, alumnoId, cursoId]);

  const entregada = guardado === "entregada";

  useEffect(() => {
    if (["capacidad", "compra", "recuperacion", "defensa"].includes(paso)) campo.current?.focus();
  }, [paso]);

  const registrar = (e: Evento, cambios: Partial<Partida> = {}) =>
    setPartida((p) => {
      const nueva = { ...anotar(p, e), ...cambios };
      guardarPartida(nueva);
      pendiente.current = true;
      return nueva;
    });

  const ir = (p: Paso) => {
    setPaso(p);
    setPista("");
    setFallos(0);
    setAyuda(false);
    setTexto("");
  };

  const fallar = (mensaje: string) => {
    setPista(mensaje);
    setFallos((f) => f + 1);
    campo.current?.select();
  };

  // ── lo que muestra el tablero de arriba ────────────────────────────────────
  const c = opcion && mesPasado ? consecuencia(d, opcion) : null;
  const caja = d.cajaInicial - (c?.gasto ?? 0);
  const botellas = c?.capacidad ?? consecuencia(d, "nada").capacidad;
  const confianza = opcion && mesPasado ? CONFIANZA[opcion] : 3;

  // ── pasos ──────────────────────────────────────────────────────────────────
  const enviarCapacidad = (ev: FormEvent) => {
    ev.preventDefault();
    const v = leerEntero(texto);
    if (v === null) return setPista("Escribe un número.");
    registrar({ tipo: "capacidad", valor: v });
    const dx = revisarCapacidad(d, v);
    if (dx === "correcta") return ir("decidir");
    fallar(guion.PISTA_CAPACIDAD[dx]);
  };

  const decidir = (o: Opcion) => {
    setOpcion(o);
    registrar({ tipo: "decision", opcion: o });
    if (o === "nada") {
      setMesPasado(true);
      ir("mes");
    } else ir("compra");
  };

  const enviarCompra = (ev: FormEvent) => {
    ev.preventDefault();
    if (opcion !== "envasadora" && opcion !== "tanque") return;
    const v = leerEntero(texto);
    if (v === null) return setPista("Escribe un número.");
    registrar({ tipo: "compra", opcion, valor: v });
    const dx = revisarCapacidadConCompra(d, opcion, v);
    if (dx === "correcta") {
      setMesPasado(true);
      return ir("mes");
    }
    fallar(guion.PISTA_COMPRA[dx]);
  };

  const volverADecidir = () => {
    registrar({ tipo: "reintento" });
    setOpcion(null);
    setMesPasado(false);
    ir("decidir");
  };

  const enviarRecuperacion = (ev: FormEvent) => {
    ev.preventDefault();
    const v = leerDecimal(texto);
    if (v === null) return setPista("Escribe un número, por ejemplo 2,5.");
    registrar({ tipo: "recuperacion", valor: v });
    const dx = revisarRecuperacion(d, v);
    if (dx === "correcta") {
      setRecuperacionBien(true);
      setPista("");
      return;
    }
    fallar(guion.PISTA_RECUPERACION[dx]);
  };

  const enviarArgumento = (ev: FormEvent) => {
    ev.preventDefault();
    const t = texto.trim();
    if (t.length < 20) return setPista("Escribe al menos una oración completa: es lo que vas a defender.");
    registrar({ tipo: "argumento", texto: t.slice(0, 600) }, { terminada: true });
    ir("final");
  };

  const jugarDeNuevo = () => {
    if (entregada) return;
    const nueva = partidaNueva(version);
    guardarPartida(nueva);
    pendiente.current = true;
    setPartida(nueva);
    setOpcion(null);
    setMesPasado(false);
    setRecuperacionBien(false);
    ir("saludo");
  };

  let quien = guion.DON_MARIO;
  let dice = "";
  let zona: ReactNode = null;

  switch (paso) {
    case "saludo":
      dice = guion.saludo(d);
      zona = <Boton onClick={() => ir("capacidad")}>SEGUIR ▶</Boton>;
      break;

    case "capacidad":
      quien = "DON MARIO · te muestra la planta";
      dice = guion.MUESTRA_LA_PLANTA;
      zona = (
        <form onSubmit={enviarCapacidad} className="grid gap-3">
          <div className="juego-ficha">
            {guion.fichaMaquinas(d).map((f) => (
              <div key={f.etiqueta}>
                <span className="n">{f.valor}</span>
                <span className="l">{f.etiqueta}</span>
              </div>
            ))}
          </div>
          <p className="juego-nota">{guion.condicionesPlanta(d)}</p>
          <Campo etiqueta={guion.PREGUNTA_CAPACIDAD} valor={texto} cambiar={setTexto} campo={campo} unidad="botellas" />
          <div className="juego-acciones">
            <Boton tipo="submit">CALCULAR ✔</Boton>
            {fallos >= 2 && !ayuda && (
              <Boton
                alt
                onClick={() => {
                  setAyuda(true);
                  registrar({ tipo: "ayuda" });
                }}
              >
                PEDIR AYUDA AL SOCIO
              </Boton>
            )}
          </div>
          <Pista texto={pista} />
          {ayuda && (
            <div className="juego-ayuda">
              <p className="juego-quien">TU SOCIO</p>
              {guion.ayudaCapacidad(d).map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          )}
        </form>
      );
      break;

    case "decidir":
      dice = guion.aciertoCapacidad(d);
      zona = (
        <div className="juego-opciones">
          {guion.opciones(d).map((o) => (
            <button key={o.id} type="button" className="juego-opcion" onClick={() => decidir(o.id)}>
              <b>{o.letra}</b>
              <span>{o.texto}</span>
              <span className="precio">{o.precio}</span>
            </button>
          ))}
        </div>
      );
      break;

    case "compra":
      dice = opcion === "tanque" || opcion === "envasadora" ? guion.antesDeFirmar(opcion) : "";
      zona = (
        <form onSubmit={enviarCompra} className="grid gap-3">
          <Campo etiqueta={guion.PREGUNTA_COMPRA} valor={texto} cambiar={setTexto} campo={campo} unidad="botellas" />
          <div className="juego-acciones">
            <Boton tipo="submit">FIRMAR LA COMPRA ✔</Boton>
            <Boton alt onClick={volverADecidir}>↺ CAMBIAR DE DECISIÓN</Boton>
          </div>
          <Pista texto={pista} />
        </form>
      );
      break;

    case "mes":
      quien = "DON MARIO · un mes después";
      dice = opcion ? guion.despuesDeUnMes(d, opcion) : "";
      zona = (
        <div className="juego-acciones">
          {opcion === "tanque" ? (
            <Boton onClick={() => ir("recuperacion")}>¿CUÁNDO SE PAGA? ▶</Boton>
          ) : (
            <>
              <Boton onClick={() => ir("defensa")}>IR A LA DEFENSA ▶</Boton>
              <Boton alt onClick={volverADecidir}>↺ VOLVER A INTENTAR</Boton>
            </>
          )}
        </div>
      );
      break;

    case "recuperacion":
      quien = "DON MARIO · con la calculadora";
      dice = recuperacionBien ? guion.aciertoRecuperacion(d) : guion.preguntaRecuperacion(d);
      zona = recuperacionBien ? (
        <Boton onClick={() => ir("defensa")}>IR A LA DEFENSA ▶</Boton>
      ) : (
        <form onSubmit={enviarRecuperacion} className="grid gap-3">
          <Campo etiqueta={guion.PIDE_RECUPERACION} valor={texto} cambiar={setTexto} campo={campo} unidad="meses" decimal />
          <div className="juego-acciones">
            <Boton tipo="submit">CALCULAR ✔</Boton>
            {fallos >= 3 && (
              <Boton alt onClick={() => ir("defensa")}>
                SEGUIR SIN RESOLVERLO
              </Boton>
            )}
          </div>
          <Pista texto={pista} />
        </form>
      );
      break;

    case "defensa":
      quien = "TRIBUNAL · Defensa oral";
      dice = guion.preguntaDefensa(opcion ?? "nada");
      zona = (
        <form onSubmit={enviarArgumento} className="grid gap-3">
          <label htmlFor="juego-argumento" className="juego-nota">
            {guion.PIDE_ARGUMENTO}
          </label>
          <textarea
            id="juego-argumento"
            ref={campo}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="La envasadora no aumentaba la capacidad porque…"
            maxLength={600}
          />
          <div className="juego-acciones">
            <Boton tipo="submit">ENTREGAR ARGUMENTO ✔</Boton>
          </div>
          <Pista texto={pista} />
        </form>
      );
      break;

    case "final":
      quien = "FIN DE LA ESCENA 1";
      dice = guion.FINAL;
      zona = entregada ? null : (
        <Boton alt onClick={jugarDeNuevo}>
          ↺ JUGAR LA ESCENA DE NUEVO
        </Boton>
      );
      break;
  }

  return (
    <div className="juego" style={{ ["--juego-pixel" as string]: fuentePixel }}>
      <div className="juego-marco">
        <div className="juego-cabeza">
          <div>
            <h1>VALLE DE LOS PROYECTOS</h1>
            <p className="juego-sub">Isla Proyectos II · Barrio de la Producción · Escena 1: «La máquina que no alcanzaba»</p>
          </div>
          <span className="juego-chip" title="Cada estudiante recibe datos distintos">
            {version === 0 ? "CASO DEL DOSSIER" : `TUS DATOS: VERSIÓN ${version}`}
          </span>
        </div>

        <BarraCuenta cuenta={cuenta} guardado={guardado} />

        <div className="juego-tablero">
          <div className="juego-pantalla">
            <LienzoPlanta
              tanques={opcion === "tanque" && mesPasado ? d.tanques + 1 : d.tanques}
              envasadoraNueva={opcion === "envasadora" && mesPasado}
              velocidad={botellas / consecuencia(d, "nada").capacidad}
              fuente={fuentePixel}
            />
          </div>
          <div className="juego-hud">
            <Dato etiqueta="Caja de la empresa">Bs {bs(caja)}</Dato>
            <div className="juego-fila">
              <Dato etiqueta="Botellas / día" bien={botellas >= d.pedidosPorDia}>
                {bs(botellas)}
              </Dato>
              <Dato etiqueta="Pedidos / día">{bs(d.pedidosPorDia)}</Dato>
            </div>
            <Dato etiqueta="Confianza de Don Mario">
              <span aria-label={`${confianza} de 5`}>
                {"★".repeat(confianza)}
                <small>{"☆".repeat(5 - confianza)}</small>
              </span>
            </Dato>
          </div>
        </div>

        <div className="juego-dialogo" aria-live="polite">
          <p className="juego-quien">{quien}</p>
          <p className="juego-dice">{dice}</p>
          <div>{zona}</div>
        </div>

        <section className="juego-registro" aria-label="Registro de decisiones">
          <h2>REGISTRO DE DECISIONES · lo ve el docente</h2>
          {partida.eventos.length === 0 ? (
            <p className="juego-nota">Todavía no hay decisiones.</p>
          ) : (
            <ol>
              {partida.eventos.map((e, i) => {
                const { texto, bien } = describir(d, e);
                const hora = new Date(e.hora).toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" });
                return (
                  <li key={i}>
                    <span className="hora">{hora}</span> {texto}
                    {bien === true && <span className="bien"> ✔</span>}
                  </li>
                );
              })}
            </ol>
          )}
        </section>

        <p className="juego-pie">
          Borrador para probar en clase.{" "}
          {cuenta.estado === "dentro"
            ? "El registro se guarda en tu cuenta y en este navegador."
            : "Sin cuenta, el registro se guarda sólo en este navegador."}{" "}
          Números del caso:
          Semana 1 de Proyectos II, subtema 1.3 (versión 0); las demás versiones cambian los números con las mismas reglas.
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
  unidad,
  decimal,
}: {
  etiqueta: string;
  valor: string;
  cambiar: (v: string) => void;
  campo: React.RefObject<HTMLInputElement & HTMLTextAreaElement | null>;
  unidad: string;
  decimal?: boolean;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor="juego-respuesta" className="juego-nota">
        {etiqueta}
      </label>
      <input
        id="juego-respuesta"
        ref={campo}
        value={valor}
        onChange={(e) => cambiar(e.target.value)}
        inputMode={decimal ? "decimal" : "numeric"}
        autoComplete="off"
        placeholder={unidad}
      />
    </div>
  );
}

function Pista({ texto }: { texto: string }) {
  return texto ? <p className="juego-pista">{texto}</p> : null;
}

function Dato({ etiqueta, children, bien }: { etiqueta: string; children: ReactNode; bien?: boolean }) {
  return (
    <div className="juego-dato">
      <div className="et">{etiqueta}</div>
      <div className={bien ? "v ok" : "v"}>{children}</div>
    </div>
  );
}
