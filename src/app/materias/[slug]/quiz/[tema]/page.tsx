import fs from "node:fs";
import path from "node:path";
import { Suspense } from "react";
import { MATERIAS } from "@content/materias";
import QuizPageClient from "./QuizPageClient";

/**
 * Genera rutas estáticas SOLO para temas que tienen banco de preguntas JSON.
 */
export function generateStaticParams() {
  const params: { slug: string; tema: string }[] = [];
  const quizzesDir = path.join(process.cwd(), "content", "quizzes");

  for (const materia of MATERIAS) {
    const materiaQuizDir = path.join(quizzesDir, materia.slug);
    if (!fs.existsSync(materiaQuizDir)) continue;

    for (let i = 1; i <= materia.temas.length; i++) {
      const jsonPath = path.join(materiaQuizDir, `tema-${i}.json`);
      if (fs.existsSync(jsonPath)) {
        params.push({ slug: materia.slug, tema: String(i) });
      }
    }
  }

  return params;
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string; tema: string }>;
}) {
  const { slug, tema } = await params;

  // Cargar banco de preguntas en build time
  let bancoData = null;
  try {
    const rutaJson = path.join(
      process.cwd(),
      "content",
      "quizzes",
      slug,
      `tema-${tema}.json`
    );
    if (fs.existsSync(rutaJson)) {
      const contenido = fs.readFileSync(rutaJson, "utf-8");
      bancoData = JSON.parse(contenido);
    }
  } catch {
    // Sin preguntas para este tema
  }

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Cargando quiz...
          </p>
        </div>
      }
    >
      <QuizPageClient
        slugMateria={slug}
        temaNum={parseInt(tema, 10)}
        bancoData={bancoData}
      />
    </Suspense>
  );
}
