import type { Materia } from "@/lib/types";

/**
 * CONFIGURACIÓN DE MATERIAS
 *
 * Aquí defines TODAS las materias y sus temas. El sitio se genera a partir
 * de este archivo + los MDX en content/temas/[slug-materia]/[archivoMdx].mdx.
 *
 * Un tema se publica recién cuando su MDX deja de decir [CONTENIDO PENDIENTE],
 * y una materia cuando tiene una herramienta o algún tema publicado
 * (src/lib/publicado.ts). Hasta entonces sólo se nombra como "en preparación".
 */
export const MATERIAS: Materia[] = [
  {
    slug: "psicoestadistica-inferencial",
    nombre: "Psicoestadística Inferencial",
    descripcion:
      "De la probabilidad a la inferencia: cómo se razona bajo incertidumbre en psicología, y por qué la intuición clínica falla justo donde más importa.",
    herramientas: [
      {
        href: "/aula-probabilidad",
        titulo: "Aula Interactiva de Probabilidad",
        descripcion:
          "Un cuestionario detecta el 88% de los casos reales y, aun así, la mitad de sus alarmas son falsas. El Aula recorre la Unidad 2 completa para que puedas calcular por qué.",
        destacados: [
          "11 apartados, del espacio muestral a la distribución normal",
          "200 fichas reales de estudiantes, con PHQ-9, GAD-7 y diagnóstico confirmado",
          "Preguntas de práctica con corrección y explicación de cada opción",
          "Sigue funcionando sin internet después de abrirla una vez",
        ],
      },
    ],
    temas: [],
  },
  {
    slug: "psicoestadistica",
    nombre: "Psicoestadística Descriptiva",
    descripcion:
      "Fundamentos de estadística aplicada a las ciencias del comportamiento: organización, descripción y análisis bivariado de datos.",
    temas: [
      {
        slug: "tipos-de-variables",
        titulo: "Tipos de variables y escalas de medición (Stevens)",
        resumen:
          "Clasificación de variables y las cuatro escalas de medición propuestas por Stevens.",
        archivoMdx: "tipos-de-variables",
      },
      {
        slug: "tablas-de-frecuencias",
        titulo: "Tablas de frecuencias e histogramas (Regla de Sturges)",
        resumen:
          "Construcción de tablas de frecuencias, intervalos de clase y representación gráfica con histogramas.",
        archivoMdx: "tablas-de-frecuencias",
      },
      {
        slug: "medidas-tendencia-central",
        titulo: "Medidas de tendencia central",
        resumen:
          "Media, mediana y moda: cálculo, propiedades y criterios para elegir cuál usar.",
        archivoMdx: "medidas-tendencia-central",
      },
      {
        slug: "correlacion-pearson",
        titulo: "Correlación de Pearson",
        resumen:
          "Estadística bivariada: medición del grado de asociación lineal entre dos variables cuantitativas.",
        archivoMdx: "correlacion-pearson",
      },
      {
        slug: "regresion-lineal-simple",
        titulo: "Regresión lineal simple (MCO)",
        resumen:
          "Ajuste de una recta por mínimos cuadrados ordinarios, interpretación de coeficientes y bondad de ajuste.",
        archivoMdx: "regresion-lineal-simple",
      },
    ],
  },
  {
    slug: "administracion-financiera",
    nombre: "Administración Financiera",
    descripcion:
      "Análisis de estados financieros, ratios, sistema Du Pont y flujos de fondos para la toma de decisiones empresariales.",
    temas: [
      {
        slug: "introduccion-estados-financieros",
        titulo: "Introducción al análisis de estados financieros",
        resumen:
          "Estructura y propósito del balance, estado de resultados y flujo de efectivo.",
        archivoMdx: "introduccion-estados-financieros",
      },
      {
        slug: "ratios-financieros",
        titulo: "Ratios financieros",
        resumen:
          "Indicadores de liquidez, actividad, endeudamiento y rentabilidad.",
        archivoMdx: "ratios-financieros",
      },
      {
        slug: "analisis-vertical-horizontal",
        titulo: "Análisis vertical y horizontal",
        resumen:
          "Comparación estructural y temporal de estados financieros.",
        archivoMdx: "analisis-vertical-horizontal",
      },
      {
        slug: "analisis-transversal-dupont",
        titulo: "Análisis transversal y sistema Du Pont",
        resumen:
          "Comparación entre empresas y descomposición del ROE en sus factores.",
        archivoMdx: "analisis-transversal-dupont",
      },
      {
        slug: "flujo-fondos-efectivo",
        titulo: "Flujo de fondos y flujo de efectivo",
        resumen:
          "Construcción e interpretación del flujo de fondos y del flujo de efectivo operativo.",
        archivoMdx: "flujo-fondos-efectivo",
      },
    ],
  },
  {
    slug: "econometria-ii",
    nombre: "Econometría II",
    descripcion:
      "Modelos de series de tiempo, no estacionariedad, multivariados y datos de panel.",
    temas: [
      {
        slug: "metodologia-box-jenkins",
        titulo: "Metodología Box-Jenkins (ARIMA)",
        resumen:
          "Identificación, estimación, diagnóstico y pronóstico siguiendo la metodología clásica.",
        archivoMdx: "metodologia-box-jenkins",
      },
      {
        slug: "modelos-arma-arima",
        titulo: "Modelos ARMA / ARIMA",
        resumen:
          "Procesos autorregresivos y de medias móviles para series univariadas.",
        archivoMdx: "modelos-arma-arima",
      },
      {
        slug: "modelos-no-estacionarios",
        titulo: "Modelos no estacionarios (VAR, VECM)",
        resumen:
          "Cointegración, vectores autorregresivos y modelos de corrección de error.",
        archivoMdx: "modelos-no-estacionarios",
      },
      {
        slug: "datos-de-panel",
        titulo: "Modelos de datos de panel",
        resumen:
          "Efectos fijos, efectos aleatorios y test de Hausman.",
        archivoMdx: "datos-de-panel",
      },
    ],
  },
  {
    slug: "matematica-financiera",
    nombre: "Matemática Financiera",
    descripcion:
      "Herramientas cuantitativas para la evaluación de operaciones financieras a lo largo del tiempo.",
    // Borradores hasta que Ronald las revise contra su dossier: para publicarlas, borrar `borrador: true`.
    herramientas: [
      {
        href: "/interes-compuesto",
        titulo: "Interés compuesto e inflación",
        descripcion: "Del interés simple a la tasa real: por qué el dinero crece sobre lo que ya creció, y cuánto se come la inflación.",
        tipo: "lamina",
        borrador: true,
      },
      {
        href: "/anualidades",
        titulo: "Cuotas iguales: cuánto valen hoy y al final",
        descripcion: "Valor futuro y presente de una anualidad, vencida o anticipada, y de dónde sale la cuota de un préstamo.",
        tipo: "lamina",
        borrador: true,
      },
      {
        href: "/amortizacion",
        titulo: "Tres formas de devolver un préstamo",
        descripcion: "Sistemas americano, alemán y francés con el mismo préstamo: por qué la cuota más baja no es la más barata.",
        tipo: "lamina",
        borrador: true,
      },
      {
        href: "/bonos",
        titulo: "Bonos: precio, rendimiento y duración",
        descripcion: "Cuánto vale hoy la promesa de un bono, por qué su precio baja cuando sube la tasa y cuánto sufre.",
        tipo: "lamina",
        borrador: true,
      },
      {
        href: "/depreciaciones",
        titulo: "Depreciaciones: cuatro formas de repartir una pérdida",
        descripcion: "Lineal, suma de dígitos, porcentaje fijo y fondo de amortización sobre la misma máquina.",
        tipo: "lamina",
        borrador: true,
      },
    ],
    temas: [
      {
        slug: "interes-compuesto-inflacion",
        titulo: "Interés compuesto e inflación",
        resumen:
          "Valor del dinero en el tiempo, tasa nominal vs. real, capitalización.",
        archivoMdx: "interes-compuesto-inflacion",
      },
      {
        slug: "anualidades",
        titulo: "Anualidades",
        resumen:
          "Valor presente y futuro de flujos uniformes; anualidades vencidas y anticipadas.",
        archivoMdx: "anualidades",
      },
      {
        slug: "amortizacion-fondos",
        titulo: "Amortización y fondos",
        resumen:
          "Sistemas de amortización (francés, alemán, americano) y constitución de fondos.",
        archivoMdx: "amortizacion-fondos",
      },
      {
        slug: "analisis-bonos",
        titulo: "Análisis de bonos",
        resumen:
          "Precio, rendimiento al vencimiento, duración y sensibilidad a la tasa.",
        archivoMdx: "analisis-bonos",
      },
      {
        slug: "depreciaciones",
        titulo: "Depreciaciones",
        resumen:
          "Métodos contables y financieros de depreciación de activos.",
        archivoMdx: "depreciaciones",
      },
    ],
  },
];

/** Devuelve la materia por slug (o `undefined`). */
export function obtenerMateria(slug: string): Materia | undefined {
  return MATERIAS.find((m) => m.slug === slug);
}

/** Devuelve el tema por slug dentro de una materia (o `undefined`). */
export function obtenerTema(slugMateria: string, slugTema: string) {
  const materia = obtenerMateria(slugMateria);
  if (!materia) return undefined;
  const tema = materia.temas.find((t) => t.slug === slugTema);
  if (!tema) return undefined;
  return { materia, tema };
}
