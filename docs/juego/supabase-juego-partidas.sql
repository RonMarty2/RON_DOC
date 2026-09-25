-- ============================================================================
-- BORRADOR (25-09-2026), todavía sin aplicar. Partidas del juego de RON_DOC.
--
-- Va en el proyecto de Supabase de SIMPRO (decidido por Ronald el 25-09: cuentas
-- con Supabase), para que el alumno use la misma cuenta, los mismos cursos y el
-- mismo inicio con Google. Las migraciones viven en simuladorPRO/supabase/migrations,
-- así que este archivo se copia allá con el número que siga (hoy sería 033) y se
-- aplica desde ese repo. Usa las funciones de 003_fix_rls_recursion.sql.
-- ============================================================================

CREATE TABLE IF NOT EXISTS juego_partidas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estudiante_id UUID NOT NULL DEFAULT auth.uid() REFERENCES perfiles(id) ON DELETE CASCADE,
  curso_id UUID REFERENCES cursos(id) ON DELETE SET NULL,
  isla TEXT NOT NULL,                 -- 'proyectos'
  escena TEXT NOT NULL,               -- 'planta'
  version INTEGER NOT NULL CHECK (version BETWEEN 0 AND 999),
  -- Cada número escrito, cada decisión y el argumento, en orden, con su hora.
  -- La página del docente recalcula todo con la versión: no confía en lo que dice acá.
  registro JSONB NOT NULL DEFAULT '[]'::jsonb,
  terminada BOOLEAN NOT NULL DEFAULT FALSE,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE NULLS NOT DISTINCT (estudiante_id, curso_id, isla, escena)
);

CREATE INDEX IF NOT EXISTS idx_juego_partidas_curso ON juego_partidas(curso_id);

ALTER TABLE juego_partidas ENABLE ROW LEVEL SECURITY;

-- El alumno ve y crea sólo las suyas, y sólo en cursos donde está inscrito (o sin curso).
CREATE POLICY juego_partidas_propias_leer ON juego_partidas
  FOR SELECT USING (estudiante_id = auth.uid());

CREATE POLICY juego_partidas_propias_crear ON juego_partidas
  FOR INSERT WITH CHECK (
    estudiante_id = auth.uid()
    AND (curso_id IS NULL OR public.esta_inscrito_en_curso(curso_id))
  );

-- Mientras no la entregue, puede seguir jugando; entregada, queda fija.
CREATE POLICY juego_partidas_propias_seguir ON juego_partidas
  FOR UPDATE USING (estudiante_id = auth.uid() AND NOT terminada)
  WITH CHECK (estudiante_id = auth.uid() AND (curso_id IS NULL OR public.esta_inscrito_en_curso(curso_id)));

-- El docente ve las partidas de sus cursos.
CREATE POLICY juego_partidas_docente_leer ON juego_partidas
  FOR SELECT USING (curso_id IS NOT NULL AND public.es_docente_del_curso(curso_id));

CREATE OR REPLACE FUNCTION public.juego_partidas_tocar()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.actualizado_en := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS juego_partidas_actualizado ON juego_partidas;
CREATE TRIGGER juego_partidas_actualizado BEFORE UPDATE ON juego_partidas
  FOR EACH ROW EXECUTE FUNCTION public.juego_partidas_tocar();
