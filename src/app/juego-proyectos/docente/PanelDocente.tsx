"use client";

import { useCallback, useEffect, useState } from "react";
import {
  alCambiarSesion,
  alumnoActual,
  cursosQueDicta,
  entrarConGoogle,
  nubeConfigurada,
  partidasDelCurso,
  salir,
  type Alumno,
  type Curso,
  type InscritoConPartida,
} from "@/lib/juego/nube";
import { formatoCorrectos, lineaCorta, resumirPartida } from "@/lib/juego/resumen";

type Estado = "sin-nube" | "cargando" | "fuera" | "dentro" | "error";

const NOMBRE_OPCION = { envasadora: "A · envasadora", tanque: "B · tercer tanque", nada: "C · no invertir" } as const;

const hora = (iso: string) =>
  new Date(iso).toLocaleString("es-BO", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

export function PanelDocente() {
  const [estado, setEstado] = useState<Estado>(nubeConfigurada ? "cargando" : "sin-nube");
  const [docente, setDocente] = useState<Alumno | null>(null);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursoId, setCursoId] = useState<string | null>(null);
  const [filas, setFilas] = useState<InscritoConPartida[] | null>(null);
  const [abierto, setAbierto] = useState<string | null>(null);

  const leerSesion = useCallback(async () => {
    try {
      const d = await alumnoActual();
      if (!d) return setEstado("fuera");
      const cs = await cursosQueDicta(d.id);
      setDocente(d);
      setCursos(cs);
      setCursoId((actual) => (cs.some((c) => c.id === actual) ? actual : (cs[0]?.id ?? null)));
      setEstado("dentro");
    } catch {
      setEstado("error");
    }
  }, []);

  useEffect(() => {
    if (!nubeConfigurada) return;
    let dejar: (() => void) | undefined;
    let vivo = true;
    void leerSesion();
    void alCambiarSesion(() => void leerSesion()).then((f) => (vivo ? (dejar = f) : f()));
    return () => {
      vivo = false;
      dejar?.();
    };
  }, [leerSesion]);

  const cargarCurso = useCallback(async (id: string) => {
    setFilas(null);
    try {
      setFilas(await partidasDelCurso(id));
    } catch {
      setEstado("error");
    }
  }, []);

  useEffect(() => {
    if (estado === "dentro" && cursoId) void cargarCurso(cursoId);
  }, [estado, cursoId, cargarCurso]);

  if (estado === "sin-nube") {
    return <p className="text-tinta-media">Este sitio se compiló sin la conexión a Supabase: no hay partidas que mostrar.</p>;
  }
  if (estado === "cargando") return <p className="text-tinta-media">Cargando…</p>;
  if (estado === "error") {
    return (
      <p className="text-tinta-media">
        No se pudo leer la base. Revisa la conexión y vuelve a cargar la página (si el proyecto de Supabase se pausó, hay que
        reactivarlo desde su panel).
      </p>
    );
  }
  if (estado === "fuera") {
    return (
      <div className="grid gap-4">
        <p className="text-tinta-media">Entra con la cuenta de Google con la que dictas tus cursos en SIMPRO.</p>
        <button
          type="button"
          onClick={() => void entrarConGoogle()}
          className="w-fit rounded-full bg-acento px-5 py-2.5 text-sm font-semibold text-acento-texto hover:bg-acento-hover"
        >
          Entrar con Google
        </button>
      </div>
    );
  }

  const jugaron = filas?.filter((f) => f.partida) ?? [];
  const entregaron = jugaron.filter((f) => f.partida?.terminada);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-tinta-media">
        <span>
          Entraste como <b className="text-tinta">{docente?.nombre}</b>.
        </span>
        <button type="button" onClick={() => void salir()} className="text-acento underline">
          Salir
        </button>
      </div>

      {cursos.length === 0 ? (
        <p className="text-tinta-media">Esta cuenta no dicta ningún curso en SIMPRO. Los cursos se crean allá.</p>
      ) : (
        <>
          <label className="grid gap-1.5 text-sm font-semibold sm:max-w-md">
            Curso
            <select
              value={cursoId ?? ""}
              onChange={(e) => setCursoId(e.target.value)}
              className="rounded-lg border border-borde bg-tarjeta px-3 py-2 font-normal"
            >
              {cursos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </label>

          {filas === null ? (
            <p className="text-tinta-media">Cargando partidas…</p>
          ) : (
            <>
              <p className="text-tinta-media">
                {filas.length} inscritos · {jugaron.length} empezaron · {entregaron.length} entregaron.
              </p>
              <ul className="grid gap-3">
                {filas.map((f) => {
                  const r = f.partida
                    ? resumirPartida({ estudiante_id: f.estudianteId, version: f.partida.version, registro: f.partida.registro, terminada: f.partida.terminada })
                    : null;
                  const abiertaEsta = abierto === f.estudianteId;
                  return (
                    <li key={f.estudianteId} className="rounded-xl border border-borde bg-tarjeta">
                      <button
                        type="button"
                        onClick={() => setAbierto(abiertaEsta ? null : f.estudianteId)}
                        disabled={!r}
                        aria-expanded={abiertaEsta}
                        className="grid w-full gap-1 px-4 py-3 text-left disabled:cursor-default"
                      >
                        <span className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="font-semibold">{f.nombre}</span>
                          <span
                            className={
                              !r ? "text-sm text-tinta-tenue" : r.terminada ? "text-sm font-semibold text-ok" : "text-sm text-aviso"
                            }
                          >
                            {!r ? "No empezó" : r.terminada ? "Entregada" : "En curso"}
                          </span>
                        </span>
                        {r && <span className="text-sm text-tinta-media">{lineaCorta(r)}</span>}
                        {r && r.version !== r.versionEsperada && (
                          <span className="text-sm font-semibold text-error">
                            Ojo: jugó la versión {r.version}, pero a su cuenta le toca la {r.versionEsperada}.
                          </span>
                        )}
                      </button>
                      {r && abiertaEsta && (
                        <div className="grid gap-4 border-t border-borde px-4 py-4 text-sm">
                          <p className="text-tinta-media">
                            Versión {r.version}. Sus números correctos: {formatoCorrectos(r)}.
                            {f.partida && <> Última actividad el {hora(f.partida.actualizado)}</>}
                          </p>
                          {r.decisiones.length > 0 && (
                            <p>
                              <b>Decisiones:</b> {r.decisiones.map((o) => NOMBRE_OPCION[o]).join(" → ")}
                            </p>
                          )}
                          {r.argumento && (
                            <blockquote className="border-l-4 border-acento pl-3 italic">{r.argumento}</blockquote>
                          )}
                          <ol className="grid list-decimal gap-1 pl-5 text-tinta-media">
                            {r.lineas.map((l, i) => (
                              <li key={i}>
                                <span className="tabular-nums text-tinta-tenue">{hora(l.hora)}</span> {l.texto}
                                {l.bien && <span className="text-ok"> ✔</span>}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
