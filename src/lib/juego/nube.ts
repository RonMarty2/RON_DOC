/**
 * Cuentas y partidas guardadas en Supabase: el mismo proyecto de SIMPRO (decidido por Ronald el
 * 25-09), así el alumno entra con la misma cuenta de Google y queda en los mismos cursos.
 *
 * Si el deploy no trae `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`, nada de esto se
 * carga y el juego sigue como antes: la partida sólo en el navegador (igual que el modo local de SIMPRO).
 * El cliente se importa recién cuando hace falta, para no sumarle peso al resto del sitio.
 *
 * Tabla: `juego_partidas` (docs/juego/supabase-juego-partidas.sql, migración 033 de SIMPRO).
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import { datosDeVersion } from "./planta";
import type { Entrada, Partida } from "./registro";

const URL_NUBE = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const CLAVE_NUBE = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const nubeConfigurada = Boolean(URL_NUBE && CLAVE_NUBE);

let cliente: Promise<SupabaseClient> | null = null;

function nube(): Promise<SupabaseClient> {
  if (!nubeConfigurada) throw new Error("Supabase sin configurar");
  cliente ??= import("@supabase/supabase-js").then(({ createClient }) =>
    createClient(URL_NUBE, CLAVE_NUBE, {
      // PKCE deja el código en ?code= y no toca el #v= con que se prueban las versiones.
      auth: { flowType: "pkce", persistSession: true, detectSessionInUrl: true, autoRefreshToken: true },
    }),
  );
  return cliente;
}

export interface Alumno {
  id: string;
  nombre: string;
}

export interface Curso {
  id: string;
  nombre: string;
}

/** Quién tiene la sesión abierta en este navegador, o null. */
export async function alumnoActual(): Promise<Alumno | null> {
  const sb = await nube();
  const { data } = await sb.auth.getSession();
  const user = data.session?.user;
  if (!user) return null;
  const { data: perfil } = await sb.from("perfiles").select("nombre, apellido").eq("id", user.id).maybeSingle();
  const delPerfil = [perfil?.nombre, perfil?.apellido].filter(Boolean).join(" ").trim();
  const meta = user.user_metadata ?? {};
  return { id: user.id, nombre: delPerfil || meta.full_name || meta.name || user.email || "Estudiante" };
}

/** Avisa cuando se entra o se sale (también al volver de Google). Devuelve la función para dejar de escuchar. */
export async function alCambiarSesion(avisar: () => void): Promise<() => void> {
  const sb = await nube();
  const { data } = sb.auth.onAuthStateChange((evento) => {
    if (evento === "SIGNED_IN" || evento === "SIGNED_OUT") avisar();
  });
  return () => data.subscription.unsubscribe();
}

/** Entra con Google y vuelve a esta misma página (debe estar entre las direcciones de regreso de Supabase). */
export async function entrarConGoogle() {
  const sb = await nube();
  const regreso = window.location.href.split(/[?#]/)[0];
  const { error } = await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: regreso } });
  if (error) throw error;
}

export async function salir() {
  const sb = await nube();
  await sb.auth.signOut();
}

/** Los cursos donde está inscrito, los activos primero. */
export async function misCursos(alumnoId: string): Promise<Curso[]> {
  const sb = await nube();
  const { data, error } = await sb
    .from("inscripciones")
    .select("curso_id, cursos(id, nombre, paralelo, estado)")
    .eq("estudiante_id", alumnoId);
  if (error || !data) return [];
  type Fila = { cursos: { id: string; nombre: string; paralelo: string | null; estado: string | null } | null };
  return (data as unknown as Fila[])
    .map((f) => f.cursos)
    .filter((c): c is NonNullable<Fila["cursos"]> => Boolean(c) && c!.estado !== "archivado")
    .sort((a, b) => Number(a.estado !== "activo") - Number(b.estado !== "activo"))
    .map((c) => ({ id: c.id, nombre: c.paralelo ? `${c.nombre} · ${c.paralelo}` : c.nombre }));
}

interface Fila {
  isla: string;
  escena: string;
  version: number;
  registro: unknown;
  terminada: boolean;
}

/** Convierte una fila de la tabla en partida; null si no tiene la forma esperada. */
export function partidaDeFila(f: Fila | null | undefined, version: number): Partida | null {
  if (!f || f.isla !== "proyectos" || f.escena !== "planta" || f.version !== version || !Array.isArray(f.registro)) return null;
  try {
    datosDeVersion(f.version);
  } catch {
    return null;
  }
  return { isla: "proyectos", escena: "planta", version: f.version, eventos: f.registro as Entrada[], terminada: Boolean(f.terminada) };
}

/** La partida guardada en la cuenta para ese curso (o sin curso), o null. */
export async function leerPartidaNube(alumnoId: string, cursoId: string | null, version: number): Promise<Partida | null> {
  const sb = await nube();
  let q = sb
    .from("juego_partidas")
    .select("isla, escena, version, registro, terminada")
    .eq("estudiante_id", alumnoId)
    .eq("isla", "proyectos")
    .eq("escena", "planta");
  q = cursoId ? q.eq("curso_id", cursoId) : q.is("curso_id", null);
  const { data, error } = await q.maybeSingle();
  if (error) throw error;
  return partidaDeFila(data as Fila | null, version);
}

/**
 * Guarda la partida en la cuenta. Una vez entregada (terminada) la base ya no deja cambiarla:
 * lo que ve el docente queda fijo.
 */
export async function guardarPartidaNube(alumnoId: string, cursoId: string | null, p: Partida) {
  const sb = await nube();
  const { error } = await sb.from("juego_partidas").upsert(
    {
      estudiante_id: alumnoId,
      curso_id: cursoId,
      isla: p.isla,
      escena: p.escena,
      version: p.version,
      registro: p.eventos,
      terminada: p.terminada,
    },
    { onConflict: "estudiante_id,curso_id,isla,escena" },
  );
  if (error) throw error;
}

// ── Para el docente ──────────────────────────────────────────────────────────
// Lo que deja leer la base: sus cursos (cursos.docente_id), las inscripciones y los perfiles de sus
// alumnos (políticas de SIMPRO) y las partidas de sus cursos (juego_partidas_docente_leer).

/** Los cursos que dicta, los activos primero. Filtra por docente: los cursos activos los ve cualquiera. */
export async function cursosQueDicta(docenteId: string): Promise<Curso[]> {
  const sb = await nube();
  const { data, error } = await sb.from("cursos").select("id, nombre, paralelo, estado").eq("docente_id", docenteId);
  if (error) throw error;
  return (data ?? [])
    .filter((c) => c.estado !== "archivado")
    .sort((a, b) => Number(a.estado !== "activo") - Number(b.estado !== "activo"))
    .map((c) => ({ id: c.id, nombre: c.paralelo ? `${c.nombre} · ${c.paralelo}` : c.nombre }));
}

export interface InscritoConPartida {
  estudianteId: string;
  nombre: string;
  email: string;
  partida: { version: number; registro: Entrada[]; terminada: boolean; actualizado: string } | null;
}

/** Cada inscrito del curso con su partida de la escena, o null si todavía no jugó. */
export async function partidasDelCurso(cursoId: string): Promise<InscritoConPartida[]> {
  const sb = await nube();
  const [inscritos, partidas] = await Promise.all([
    sb.from("inscripciones").select("estudiante_id, perfiles(nombre, apellido, email)").eq("curso_id", cursoId),
    sb
      .from("juego_partidas")
      .select("estudiante_id, version, registro, terminada, actualizado_en")
      .eq("curso_id", cursoId)
      .eq("isla", "proyectos")
      .eq("escena", "planta"),
  ]);
  if (inscritos.error) throw inscritos.error;
  if (partidas.error) throw partidas.error;
  type Perfil = { nombre: string | null; apellido: string | null; email: string | null } | null;
  const porAlumno = new Map((partidas.data ?? []).map((p) => [p.estudiante_id as string, p]));
  return (inscritos.data as unknown as { estudiante_id: string; perfiles: Perfil }[])
    .map((i) => {
      const p = porAlumno.get(i.estudiante_id);
      const nombre = [i.perfiles?.nombre, i.perfiles?.apellido].filter(Boolean).join(" ").trim();
      return {
        estudianteId: i.estudiante_id,
        nombre: nombre || i.perfiles?.email || "Sin nombre",
        email: i.perfiles?.email ?? "",
        partida: p && Array.isArray(p.registro)
          ? { version: p.version, registro: p.registro as Entrada[], terminada: Boolean(p.terminada), actualizado: p.actualizado_en }
          : null,
      };
    })
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}
