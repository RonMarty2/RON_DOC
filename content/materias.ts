import type { Materia } from "@/lib/types";

/**
 * CONFIGURACIÓN DE MATERIAS
 *
 * Aquí defines TODAS las materias y sus temas. El sitio se genera a partir
 * de este archivo + los MDX en content/temas/[slug-materia]/[archivoMdx].mdx.
 *
 * Para agregar una materia: añade un objeto al array.
 * Para agregar un tema: añade una entrada a la lista `temas` y crea su archivo MDX.
 */
export const MATERIAS: Materia[] = [
  {
    slug: "psicoestadistica",
    nombre: "Psicoestadística Descriptiva",
    descripcion:
      "Fundamentos de estadística aplicada a las ciencias del comportamiento: organización, descripción y análisis bivariado de datos.",
    color: "azul",
    icono: "📊",
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
        interactivos: [
          {
            src: "/interactivos/pearson_pizarra.html",
            titulo: "Pizarra interactiva: correlación de Pearson",
            descripcion:
              "Manipulá los puntos para ver cómo cambia el coeficiente r en tiempo real.",
            alto: "640px",
          },
        ],
      },
      {
        slug: "regresion-lineal-simple",
        titulo: "Regresión lineal simple (MCO)",
        resumen:
          "Ajuste de una recta por mínimos cuadrados ordinarios, interpretación de coeficientes y bondad de ajuste.",
        archivoMdx: "regresion-lineal-simple",
        interactivos: [
          {
            src: "/interactivos/regresion_animada.html",
            titulo: "Regresión lineal animada",
            descripcion:
              "Animación del proceso de minimización de la suma de cuadrados de los residuos.",
            alto: "640px",
          },
        ],
      },
    ],
  },
  {
    slug: "administracion-financiera",
    nombre: "Administración Financiera",
    descripcion:
      "Análisis de estados financieros, ratios, sistema Du Pont y flujos de fondos para la toma de decisiones empresariales.",
    color: "verde",
    icono: "💹",
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
    color: "morado",
    icono: "📈",
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
    color: "naranja",
    icono: "💰",
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
