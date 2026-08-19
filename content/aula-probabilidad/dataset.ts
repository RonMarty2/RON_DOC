/**
 * Dataset "PTSMU" — Programa de Tamizaje en Salud Mental Universitaria.
 * 200 estudiantes tamizados con PHQ-9 (depresión) y GAD-7 (ansiedad),
 * diagnóstico confirmado por entrevista clínica y estado del expediente.
 *
 * FUENTE ÚNICA DE VERDAD de la herramienta Aula Interactiva de Probabilidad.
 * Generado con semilla fija para reproducir EXACTAMENTE los números del
 * dossier de Psicoestadística Inferencial — Unidad 2. NO modificar a mano:
 * todos los apartados (2.1 a 2.9) dependen de estos datos exactos.
 *
 * Verificado contra el dossier:
 *  - PHQ-9 positivo (≥10): 43/200 = 21.5%   ·  GAD-7 positivo: 21/200 = 10.5%
 *  - Positivos en ambos: 17/200 = 8.5%      ·  Prevalencia: 25/200 = 12.5%
 *  - Tabla PHQ-9 × Dx: VP=22 FP=21 FN=3 VN=154
 *  - Sensibilidad = especificidad = 88.0%   ·  VPP = 51.2%
 *  - PHQ-9: media = 6.32, desviación estándar = 4.64  (apartado 2.9)
 *  - Expedientes incompletos entre los 43 positivos: 9  (apartado 2.8)
 *
 * Nota sobre `expedienteCompleto`: el dossier sólo fija los 9 incompletos
 * entre los 43 positivos (los que usa el ejemplo hipergeométrico). El estado
 * de los 157 restantes se generó a la misma tasa, y no interviene en ningún
 * cálculo del temario.
 */

export interface Estudiante {
  id: number;
  /** Puntaje PHQ-9 (depresión), rango 0–27. */
  phq9: number;
  /** Puntaje GAD-7 (ansiedad), rango 0–21. */
  gad7: number;
  /** Diagnóstico confirmado por entrevista clínica (criterio de referencia). */
  dxConfirmado: boolean;
  /** Si el expediente del estudiante está completo. */
  expedienteCompleto: boolean;
}

/** Corte de tamizaje usado en ambos cuestionarios. */
export const CORTE_TAMIZAJE = 10;

export const ESTUDIANTES: Estudiante[] = [
  { id: 1, phq9: 0, gad7: 7, dxConfirmado: false, expedienteCompleto: false },
  { id: 2, phq9: 4, gad7: 5, dxConfirmado: false, expedienteCompleto: true },
  { id: 3, phq9: 2, gad7: 8, dxConfirmado: false, expedienteCompleto: true },
  { id: 4, phq9: 5, gad7: 4, dxConfirmado: false, expedienteCompleto: true },
  { id: 5, phq9: 1, gad7: 3, dxConfirmado: false, expedienteCompleto: true },
  { id: 6, phq9: 7, gad7: 0, dxConfirmado: false, expedienteCompleto: true },
  { id: 7, phq9: 8, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 8, phq9: 1, gad7: 1, dxConfirmado: false, expedienteCompleto: true },
  { id: 9, phq9: 3, gad7: 3, dxConfirmado: false, expedienteCompleto: true },
  { id: 10, phq9: 9, gad7: 3, dxConfirmado: false, expedienteCompleto: true },
  { id: 11, phq9: 8, gad7: 7, dxConfirmado: false, expedienteCompleto: true },
  { id: 12, phq9: 0, gad7: 1, dxConfirmado: false, expedienteCompleto: true },
  { id: 13, phq9: 9, gad7: 7, dxConfirmado: false, expedienteCompleto: true },
  { id: 14, phq9: 2, gad7: 7, dxConfirmado: false, expedienteCompleto: false },
  { id: 15, phq9: 15, gad7: 14, dxConfirmado: true, expedienteCompleto: true },
  { id: 16, phq9: 8, gad7: 1, dxConfirmado: false, expedienteCompleto: true },
  { id: 17, phq9: 4, gad7: 1, dxConfirmado: false, expedienteCompleto: true },
  { id: 18, phq9: 7, gad7: 2, dxConfirmado: false, expedienteCompleto: true },
  { id: 19, phq9: 0, gad7: 8, dxConfirmado: false, expedienteCompleto: true },
  { id: 20, phq9: 9, gad7: 2, dxConfirmado: false, expedienteCompleto: true },
  { id: 21, phq9: 9, gad7: 5, dxConfirmado: false, expedienteCompleto: true },
  { id: 22, phq9: 14, gad7: 2, dxConfirmado: false, expedienteCompleto: false },
  { id: 23, phq9: 3, gad7: 1, dxConfirmado: false, expedienteCompleto: false },
  { id: 24, phq9: 0, gad7: 9, dxConfirmado: false, expedienteCompleto: true },
  { id: 25, phq9: 1, gad7: 0, dxConfirmado: false, expedienteCompleto: false },
  { id: 26, phq9: 14, gad7: 16, dxConfirmado: false, expedienteCompleto: true },
  { id: 27, phq9: 2, gad7: 0, dxConfirmado: false, expedienteCompleto: true },
  { id: 28, phq9: 4, gad7: 3, dxConfirmado: false, expedienteCompleto: false },
  { id: 29, phq9: 20, gad7: 0, dxConfirmado: false, expedienteCompleto: false },
  { id: 30, phq9: 8, gad7: 3, dxConfirmado: false, expedienteCompleto: false },
  { id: 31, phq9: 0, gad7: 2, dxConfirmado: false, expedienteCompleto: true },
  { id: 32, phq9: 3, gad7: 9, dxConfirmado: false, expedienteCompleto: true },
  { id: 33, phq9: 16, gad7: 17, dxConfirmado: true, expedienteCompleto: true },
  { id: 34, phq9: 7, gad7: 4, dxConfirmado: false, expedienteCompleto: true },
  { id: 35, phq9: 9, gad7: 0, dxConfirmado: false, expedienteCompleto: false },
  { id: 36, phq9: 3, gad7: 0, dxConfirmado: false, expedienteCompleto: true },
  { id: 37, phq9: 5, gad7: 5, dxConfirmado: false, expedienteCompleto: false },
  { id: 38, phq9: 9, gad7: 1, dxConfirmado: false, expedienteCompleto: true },
  { id: 39, phq9: 5, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 40, phq9: 1, gad7: 1, dxConfirmado: false, expedienteCompleto: true },
  { id: 41, phq9: 5, gad7: 5, dxConfirmado: false, expedienteCompleto: true },
  { id: 42, phq9: 3, gad7: 8, dxConfirmado: false, expedienteCompleto: true },
  { id: 43, phq9: 16, gad7: 7, dxConfirmado: false, expedienteCompleto: true },
  { id: 44, phq9: 7, gad7: 7, dxConfirmado: false, expedienteCompleto: true },
  { id: 45, phq9: 4, gad7: 2, dxConfirmado: false, expedienteCompleto: true },
  { id: 46, phq9: 2, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 47, phq9: 1, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 48, phq9: 12, gad7: 4, dxConfirmado: true, expedienteCompleto: true },
  { id: 49, phq9: 2, gad7: 2, dxConfirmado: false, expedienteCompleto: true },
  { id: 50, phq9: 6, gad7: 15, dxConfirmado: false, expedienteCompleto: true },
  { id: 51, phq9: 2, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 52, phq9: 7, gad7: 4, dxConfirmado: false, expedienteCompleto: true },
  { id: 53, phq9: 6, gad7: 3, dxConfirmado: false, expedienteCompleto: false },
  { id: 54, phq9: 3, gad7: 1, dxConfirmado: false, expedienteCompleto: true },
  { id: 55, phq9: 5, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 56, phq9: 2, gad7: 8, dxConfirmado: true, expedienteCompleto: true },
  { id: 57, phq9: 13, gad7: 7, dxConfirmado: false, expedienteCompleto: true },
  { id: 58, phq9: 13, gad7: 13, dxConfirmado: true, expedienteCompleto: true },
  { id: 59, phq9: 8, gad7: 3, dxConfirmado: false, expedienteCompleto: false },
  { id: 60, phq9: 5, gad7: 5, dxConfirmado: false, expedienteCompleto: true },
  { id: 61, phq9: 0, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 62, phq9: 1, gad7: 4, dxConfirmado: false, expedienteCompleto: true },
  { id: 63, phq9: 6, gad7: 8, dxConfirmado: false, expedienteCompleto: true },
  { id: 64, phq9: 3, gad7: 1, dxConfirmado: false, expedienteCompleto: true },
  { id: 65, phq9: 3, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 66, phq9: 9, gad7: 7, dxConfirmado: false, expedienteCompleto: false },
  { id: 67, phq9: 0, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 68, phq9: 9, gad7: 19, dxConfirmado: false, expedienteCompleto: true },
  { id: 69, phq9: 7, gad7: 4, dxConfirmado: false, expedienteCompleto: true },
  { id: 70, phq9: 7, gad7: 4, dxConfirmado: false, expedienteCompleto: true },
  { id: 71, phq9: 9, gad7: 7, dxConfirmado: false, expedienteCompleto: true },
  { id: 72, phq9: 1, gad7: 1, dxConfirmado: false, expedienteCompleto: true },
  { id: 73, phq9: 9, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 74, phq9: 3, gad7: 2, dxConfirmado: false, expedienteCompleto: true },
  { id: 75, phq9: 9, gad7: 0, dxConfirmado: false, expedienteCompleto: true },
  { id: 76, phq9: 0, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 77, phq9: 9, gad7: 3, dxConfirmado: false, expedienteCompleto: true },
  { id: 78, phq9: 13, gad7: 11, dxConfirmado: false, expedienteCompleto: true },
  { id: 79, phq9: 10, gad7: 10, dxConfirmado: false, expedienteCompleto: true },
  { id: 80, phq9: 5, gad7: 6, dxConfirmado: false, expedienteCompleto: false },
  { id: 81, phq9: 3, gad7: 4, dxConfirmado: false, expedienteCompleto: true },
  { id: 82, phq9: 0, gad7: 5, dxConfirmado: false, expedienteCompleto: true },
  { id: 83, phq9: 5, gad7: 8, dxConfirmado: false, expedienteCompleto: true },
  { id: 84, phq9: 14, gad7: 17, dxConfirmado: true, expedienteCompleto: true },
  { id: 85, phq9: 7, gad7: 4, dxConfirmado: false, expedienteCompleto: true },
  { id: 86, phq9: 12, gad7: 3, dxConfirmado: true, expedienteCompleto: true },
  { id: 87, phq9: 0, gad7: 7, dxConfirmado: false, expedienteCompleto: true },
  { id: 88, phq9: 7, gad7: 2, dxConfirmado: false, expedienteCompleto: true },
  { id: 89, phq9: 10, gad7: 5, dxConfirmado: true, expedienteCompleto: false },
  { id: 90, phq9: 2, gad7: 7, dxConfirmado: false, expedienteCompleto: false },
  { id: 91, phq9: 5, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 92, phq9: 6, gad7: 9, dxConfirmado: false, expedienteCompleto: true },
  { id: 93, phq9: 1, gad7: 8, dxConfirmado: false, expedienteCompleto: false },
  { id: 94, phq9: 10, gad7: 11, dxConfirmado: false, expedienteCompleto: true },
  { id: 95, phq9: 15, gad7: 7, dxConfirmado: false, expedienteCompleto: true },
  { id: 96, phq9: 8, gad7: 3, dxConfirmado: false, expedienteCompleto: true },
  { id: 97, phq9: 3, gad7: 9, dxConfirmado: false, expedienteCompleto: false },
  { id: 98, phq9: 21, gad7: 9, dxConfirmado: false, expedienteCompleto: true },
  { id: 99, phq9: 8, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 100, phq9: 1, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 101, phq9: 9, gad7: 0, dxConfirmado: false, expedienteCompleto: true },
  { id: 102, phq9: 9, gad7: 2, dxConfirmado: false, expedienteCompleto: true },
  { id: 103, phq9: 6, gad7: 5, dxConfirmado: false, expedienteCompleto: true },
  { id: 104, phq9: 8, gad7: 1, dxConfirmado: false, expedienteCompleto: true },
  { id: 105, phq9: 11, gad7: 9, dxConfirmado: true, expedienteCompleto: true },
  { id: 106, phq9: 10, gad7: 0, dxConfirmado: false, expedienteCompleto: true },
  { id: 107, phq9: 2, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 108, phq9: 13, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 109, phq9: 8, gad7: 5, dxConfirmado: false, expedienteCompleto: false },
  { id: 110, phq9: 2, gad7: 8, dxConfirmado: false, expedienteCompleto: true },
  { id: 111, phq9: 13, gad7: 12, dxConfirmado: true, expedienteCompleto: false },
  { id: 112, phq9: 7, gad7: 5, dxConfirmado: false, expedienteCompleto: true },
  { id: 113, phq9: 4, gad7: 3, dxConfirmado: false, expedienteCompleto: true },
  { id: 114, phq9: 4, gad7: 3, dxConfirmado: false, expedienteCompleto: true },
  { id: 115, phq9: 5, gad7: 8, dxConfirmado: false, expedienteCompleto: true },
  { id: 116, phq9: 8, gad7: 8, dxConfirmado: false, expedienteCompleto: true },
  { id: 117, phq9: 5, gad7: 1, dxConfirmado: false, expedienteCompleto: true },
  { id: 118, phq9: 10, gad7: 4, dxConfirmado: false, expedienteCompleto: true },
  { id: 119, phq9: 14, gad7: 9, dxConfirmado: false, expedienteCompleto: true },
  { id: 120, phq9: 4, gad7: 8, dxConfirmado: false, expedienteCompleto: false },
  { id: 121, phq9: 3, gad7: 8, dxConfirmado: false, expedienteCompleto: true },
  { id: 122, phq9: 2, gad7: 4, dxConfirmado: false, expedienteCompleto: false },
  { id: 123, phq9: 0, gad7: 8, dxConfirmado: false, expedienteCompleto: false },
  { id: 124, phq9: 14, gad7: 8, dxConfirmado: false, expedienteCompleto: false },
  { id: 125, phq9: 7, gad7: 0, dxConfirmado: false, expedienteCompleto: false },
  { id: 126, phq9: 2, gad7: 0, dxConfirmado: false, expedienteCompleto: true },
  { id: 127, phq9: 2, gad7: 7, dxConfirmado: false, expedienteCompleto: true },
  { id: 128, phq9: 9, gad7: 1, dxConfirmado: false, expedienteCompleto: true },
  { id: 129, phq9: 6, gad7: 6, dxConfirmado: false, expedienteCompleto: false },
  { id: 130, phq9: 0, gad7: 9, dxConfirmado: false, expedienteCompleto: true },
  { id: 131, phq9: 7, gad7: 8, dxConfirmado: false, expedienteCompleto: true },
  { id: 132, phq9: 9, gad7: 9, dxConfirmado: false, expedienteCompleto: true },
  { id: 133, phq9: 0, gad7: 5, dxConfirmado: false, expedienteCompleto: false },
  { id: 134, phq9: 9, gad7: 19, dxConfirmado: true, expedienteCompleto: false },
  { id: 135, phq9: 1, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 136, phq9: 0, gad7: 7, dxConfirmado: false, expedienteCompleto: true },
  { id: 137, phq9: 4, gad7: 1, dxConfirmado: false, expedienteCompleto: true },
  { id: 138, phq9: 1, gad7: 9, dxConfirmado: false, expedienteCompleto: false },
  { id: 139, phq9: 5, gad7: 7, dxConfirmado: false, expedienteCompleto: true },
  { id: 140, phq9: 0, gad7: 0, dxConfirmado: false, expedienteCompleto: true },
  { id: 141, phq9: 5, gad7: 2, dxConfirmado: false, expedienteCompleto: false },
  { id: 142, phq9: 2, gad7: 5, dxConfirmado: false, expedienteCompleto: true },
  { id: 143, phq9: 5, gad7: 4, dxConfirmado: false, expedienteCompleto: false },
  { id: 144, phq9: 7, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 145, phq9: 5, gad7: 0, dxConfirmado: false, expedienteCompleto: true },
  { id: 146, phq9: 16, gad7: 4, dxConfirmado: true, expedienteCompleto: true },
  { id: 147, phq9: 15, gad7: 8, dxConfirmado: true, expedienteCompleto: true },
  { id: 148, phq9: 1, gad7: 9, dxConfirmado: false, expedienteCompleto: true },
  { id: 149, phq9: 5, gad7: 8, dxConfirmado: false, expedienteCompleto: true },
  { id: 150, phq9: 8, gad7: 5, dxConfirmado: false, expedienteCompleto: true },
  { id: 151, phq9: 12, gad7: 18, dxConfirmado: true, expedienteCompleto: true },
  { id: 152, phq9: 0, gad7: 0, dxConfirmado: false, expedienteCompleto: true },
  { id: 153, phq9: 12, gad7: 18, dxConfirmado: false, expedienteCompleto: false },
  { id: 154, phq9: 10, gad7: 2, dxConfirmado: true, expedienteCompleto: true },
  { id: 155, phq9: 8, gad7: 4, dxConfirmado: false, expedienteCompleto: true },
  { id: 156, phq9: 12, gad7: 1, dxConfirmado: true, expedienteCompleto: true },
  { id: 157, phq9: 1, gad7: 0, dxConfirmado: false, expedienteCompleto: true },
  { id: 158, phq9: 8, gad7: 9, dxConfirmado: false, expedienteCompleto: false },
  { id: 159, phq9: 7, gad7: 9, dxConfirmado: false, expedienteCompleto: true },
  { id: 160, phq9: 1, gad7: 1, dxConfirmado: false, expedienteCompleto: true },
  { id: 161, phq9: 11, gad7: 17, dxConfirmado: true, expedienteCompleto: true },
  { id: 162, phq9: 16, gad7: 19, dxConfirmado: false, expedienteCompleto: true },
  { id: 163, phq9: 12, gad7: 2, dxConfirmado: false, expedienteCompleto: false },
  { id: 164, phq9: 5, gad7: 7, dxConfirmado: false, expedienteCompleto: true },
  { id: 165, phq9: 3, gad7: 3, dxConfirmado: false, expedienteCompleto: false },
  { id: 166, phq9: 10, gad7: 9, dxConfirmado: true, expedienteCompleto: true },
  { id: 167, phq9: 4, gad7: 10, dxConfirmado: false, expedienteCompleto: false },
  { id: 168, phq9: 5, gad7: 9, dxConfirmado: false, expedienteCompleto: true },
  { id: 169, phq9: 12, gad7: 2, dxConfirmado: false, expedienteCompleto: true },
  { id: 170, phq9: 5, gad7: 9, dxConfirmado: false, expedienteCompleto: true },
  { id: 171, phq9: 3, gad7: 6, dxConfirmado: false, expedienteCompleto: true },
  { id: 172, phq9: 15, gad7: 2, dxConfirmado: true, expedienteCompleto: true },
  { id: 173, phq9: 4, gad7: 4, dxConfirmado: true, expedienteCompleto: false },
  { id: 174, phq9: 14, gad7: 14, dxConfirmado: true, expedienteCompleto: true },
  { id: 175, phq9: 7, gad7: 7, dxConfirmado: false, expedienteCompleto: true },
  { id: 176, phq9: 8, gad7: 8, dxConfirmado: false, expedienteCompleto: true },
  { id: 177, phq9: 0, gad7: 1, dxConfirmado: false, expedienteCompleto: true },
  { id: 178, phq9: 0, gad7: 1, dxConfirmado: false, expedienteCompleto: false },
  { id: 179, phq9: 14, gad7: 8, dxConfirmado: true, expedienteCompleto: true },
  { id: 180, phq9: 3, gad7: 1, dxConfirmado: false, expedienteCompleto: true },
  { id: 181, phq9: 1, gad7: 2, dxConfirmado: false, expedienteCompleto: true },
  { id: 182, phq9: 1, gad7: 8, dxConfirmado: false, expedienteCompleto: true },
  { id: 183, phq9: 4, gad7: 7, dxConfirmado: false, expedienteCompleto: true },
  { id: 184, phq9: 14, gad7: 15, dxConfirmado: false, expedienteCompleto: true },
  { id: 185, phq9: 13, gad7: 17, dxConfirmado: true, expedienteCompleto: true },
  { id: 186, phq9: 1, gad7: 2, dxConfirmado: false, expedienteCompleto: false },
  { id: 187, phq9: 9, gad7: 8, dxConfirmado: false, expedienteCompleto: true },
  { id: 188, phq9: 5, gad7: 5, dxConfirmado: false, expedienteCompleto: true },
  { id: 189, phq9: 8, gad7: 3, dxConfirmado: false, expedienteCompleto: true },
  { id: 190, phq9: 7, gad7: 7, dxConfirmado: false, expedienteCompleto: false },
  { id: 191, phq9: 9, gad7: 8, dxConfirmado: false, expedienteCompleto: true },
  { id: 192, phq9: 1, gad7: 7, dxConfirmado: false, expedienteCompleto: true },
  { id: 193, phq9: 1, gad7: 1, dxConfirmado: false, expedienteCompleto: true },
  { id: 194, phq9: 16, gad7: 2, dxConfirmado: true, expedienteCompleto: false },
  { id: 195, phq9: 5, gad7: 8, dxConfirmado: false, expedienteCompleto: true },
  { id: 196, phq9: 9, gad7: 7, dxConfirmado: false, expedienteCompleto: true },
  { id: 197, phq9: 11, gad7: 16, dxConfirmado: false, expedienteCompleto: true },
  { id: 198, phq9: 10, gad7: 3, dxConfirmado: true, expedienteCompleto: false },
  { id: 199, phq9: 2, gad7: 5, dxConfirmado: false, expedienteCompleto: true },
  { id: 200, phq9: 5, gad7: 5, dxConfirmado: false, expedienteCompleto: true },
]

/**
 * Solicitudes de atención recibidas por el servicio en 24 semanas
 * consecutivas. Suman 121, de modo que la tasa media es
 * 121/24 = 5.04 ≈ 5 solicitudes por semana (apartado 2.8, Poisson).
 */
export const DEMANDA_SEMANAL: number[] = [
  6, 6, 7, 7, 2, 8, 3, 2, 7, 4, 4, 5, 6, 6, 3, 7, 6, 6, 3, 4, 4, 7, 6, 2,
];

/**
 * Verdades pedagógicas que la herramienta DEBE reproducir exactamente
 * (calzan con el dossier de Psicoestadística Inferencial — Unidad 2).
 * Se usan en los asserts de `calculos.ts`.
 */
export const VERDADES = {
  total: 200,
  phq9Positivos: 43,
  gad7Positivos: 21,
  ambosPositivos: 17,
  dxConfirmados: 25,
  prevalencia: 25 / 200, // 12.5%
  VP: 22,
  FP: 21,
  FN: 3,
  VN: 154,
  sensibilidad: 22 / 25, // 88.0%
  especificidad: 154 / 175, // 88.0%
  vpp: 22 / 43, // 51.2%
  pUnion: 47 / 200, // P(PHQ+ ∪ GAD+) = 23.5%
  pGad7DadoPhq9: 17 / 43, // 39.5% — comorbilidad
  mediaPhq9: 6.32, // apartado 2.9
  desviacionPhq9: 4.64, // apartado 2.9
  expedientesIncompletosEnPositivos: 9, // apartado 2.8 (hipergeométrica)
  demandaTotal: 121, // 24 semanas
  lambdaDemanda: 5, // 121/24 ≈ 5.04
};
