"use client";

import { useCallback, useEffect, useState } from "react";
import {
  alCambiarSesion,
  alumnoActual,
  entrarConGoogle,
  misCursos,
  nubeConfigurada,
  salir,
  type Alumno,
  type Curso,
} from "@/lib/juego/nube";

export type EstadoGuardado = "sin-cambios" | "guardando" | "guardado" | "error" | "entregada";

export interface Cuenta {
  /** "sin-nube": el deploy no trae Supabase y el juego funciona como antes, sólo en el navegador. */
  estado: "sin-nube" | "cargando" | "fuera" | "dentro";
  alumno: Alumno | null;
  cursos: Curso[];
  cursoId: string | null;
  elegirCurso: (id: string | null) => void;
}

const CLAVE_CURSO = "ron-doc-juego:curso";

function cursoRecordado(): string | null {
  try {
    return window.localStorage.getItem(CLAVE_CURSO);
  } catch {
    return null;
  }
}

/** Sesión del alumno y el curso donde cuenta la partida. */
export function useCuenta(): Cuenta {
  const [estado, setEstado] = useState<Cuenta["estado"]>(nubeConfigurada ? "cargando" : "sin-nube");
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursoId, setCursoId] = useState<string | null>(null);

  const leer = useCallback(async () => {
    try {
      const a = await alumnoActual();
      if (!a) {
        setAlumno(null);
        setCursos([]);
        setCursoId(null);
        setEstado("fuera");
        return;
      }
      const cs = await misCursos(a.id);
      const recordado = cursoRecordado();
      setAlumno(a);
      setCursos(cs);
      setCursoId(cs.find((c) => c.id === recordado)?.id ?? cs[0]?.id ?? null);
      setEstado("dentro");
    } catch {
      // Sin internet o Supabase caído: se juega como sin cuenta.
      setEstado("fuera");
    }
  }, []);

  useEffect(() => {
    if (!nubeConfigurada) return;
    let dejar: (() => void) | undefined;
    let vivo = true;
    void leer();
    void alCambiarSesion(() => void leer()).then((f) => (vivo ? (dejar = f) : f()));
    return () => {
      vivo = false;
      dejar?.();
    };
  }, [leer]);

  const elegirCurso = (id: string | null) => {
    setCursoId(id);
    try {
      if (id) window.localStorage.setItem(CLAVE_CURSO, id);
    } catch {
      // se elige de nuevo la próxima vez
    }
  };

  return { estado, alumno, cursos, cursoId, elegirCurso };
}

const AVISO: Record<EstadoGuardado, string> = {
  "sin-cambios": "",
  guardando: "Guardando en tu cuenta…",
  guardado: "Guardado en tu cuenta ✔",
  error: "No se pudo guardar en tu cuenta. Sigue en este celular; se vuelve a intentar solo en unos segundos y cuando vuelva la conexión.",
  entregada: "Escena entregada: tu docente ya la ve y no se puede cambiar.",
};

/** La franja de arriba: entrar con Google, en qué curso cuenta, y si se guardó. */
export function BarraCuenta({ cuenta, guardado }: { cuenta: Cuenta; guardado: EstadoGuardado }) {
  const [error, setError] = useState("");
  if (cuenta.estado === "sin-nube" || cuenta.estado === "cargando") return null;

  if (cuenta.estado === "fuera") {
    const entrar = () => {
      setError("");
      entrarConGoogle().catch(() => setError("No se pudo abrir el inicio con Google. Revisa tu conexión."));
    };
    return (
      <div className="juego-cuenta">
        <p className="juego-nota">
          Para que la escena cuente para tu nota, entra con la misma cuenta de Google que usas en SIMPRO. Sin entrar, puedes practicar
          con el caso del dossier.
        </p>
        <button type="button" className="juego-boton alt" onClick={entrar}>
          ENTRAR CON GOOGLE
        </button>
        {error && <p className="juego-pista">{error}</p>}
      </div>
    );
  }

  return (
    <div className="juego-cuenta">
      <p className="juego-nota">
        Juegas como <b>{cuenta.alumno?.nombre}</b>.{" "}
        {cuenta.cursos.length === 0 && "Todavía no estás inscrito en ningún curso: la partida se guarda en tu cuenta sin curso."}
      </p>
      {cuenta.cursos.length > 1 && (
        <label className="juego-nota">
          Curso:{" "}
          <select value={cuenta.cursoId ?? ""} onChange={(e) => cuenta.elegirCurso(e.target.value || null)}>
            {cuenta.cursos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </label>
      )}
      {cuenta.cursos.length === 1 && <p className="juego-nota">Curso: {cuenta.cursos[0].nombre}</p>}
      {AVISO[guardado] && <p className={guardado === "error" ? "juego-pista" : "juego-nota"}>{AVISO[guardado]}</p>}
      <button type="button" className="juego-enlace" onClick={() => void salir()}>
        Salir
      </button>
    </div>
  );
}
