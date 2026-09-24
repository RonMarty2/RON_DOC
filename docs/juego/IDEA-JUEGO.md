# El juego de RON_DOC — idea, decisiones y cómo retomarla

> Registrado el **2026-09-24** desde una sesión de Claude Code en la PC de Ronald (trabajando su
> sistema de materias en OneDrive). **Retomar en una sesión online sobre este repositorio.**
> Muestra jugable de la escena 1: [`valle-escena.html`](./valle-escena.html) (abrir en el
> navegador; no está enlazada desde el sitio ni se compila).

## 1. Qué pidió Ronald

- Que RON_DOC, además de repositorio, sea **su plataforma de enseñanza-aprendizaje gamificada**,
  con cada materia como una **isla**.
- **Que cuente para la nota.**
- **No** el «jueguito clásico» de responder y sumar puntos: *«eso para mí no es juego, solo es un
  cuestionario más animado… quiero más»*. Pidió algo como **pixel art**.
- Vio la muestra y dijo: **«se ve genial»**. Pidió dejar el registro y retomarlo online.

## 2. La idea consolidada

**Un simulador de gestión con historia, en pixel art.** El estudiante es un consultor joven en un
valle inspirado en Cochabamba. Cada materia es un barrio o isla con clientes que tienen problemas
reales. **Lo que aprende es la forma de jugar**: si no sabe calcular, la empresa del personaje
pierde; el error tiene consecuencias en el mundo, y eso es lo que enseña.

| Isla | El estudiante… | La mecánica es el contenido |
|---|---|---|
| **Proyectos II** (primera) | asesora o abre un emprendimiento | el **motor de SIMPRO** que ya se está trayendo (§0 de la bitácora, `/simulador-proyectos`): invertir, producir, eventos (sequía, devaluación) |
| Inferencial | es el analista de un hospital o universidad | decide la muestra, calcula, decide si el tratamiento funciona |
| Econometría | pronostica para el mercado del valle | si pronostica mal, compra de más o se queda sin stock |
| Bolsa de Valores | administra el ahorro del pueblo | carteras y mercado que se mueve |

**Estructura de cada escena** (la muestra la tiene completa):

1. Un personaje plantea el problema (diálogo, pixel art).
2. **El estudiante calcula** (escribe el número, no elige entre opciones). Si se equivoca, la pista
   depende del error (sumó las máquinas, olvidó la eficiencia, etc.).
3. **Decide** (inversión, precio, muestra…).
4. **Consecuencia** un tiempo después, visible en el mundo y en los indicadores.
5. **Defensa:** escribe el argumento que defenderá en clase.

## 3. Cómo cuenta para la nota sin trampa (encaja con cómo evalúa Ronald)

- **Datos distintos por estudiante (versión)**, como sus exámenes multiversión y como la hoja
  `/practica-financiera` que ya genera versiones.
- **Registro de cada decisión y cada número** que el estudiante usó: el docente ve cómo razonó.
- **El jefe final de cada isla es la defensa oral o careo en clase**: la nota sale del caso más la
  defensa, no de puntos.

## 4. Tamaño (acordado empezar por el nivel 1)

| Nivel | Qué es | Esfuerzo |
|:-:|---|---|
| **1** | Escenas en pixel art con diálogos, pantallas de cálculo y decisión, consecuencias. En el celular, dentro de RON_DOC | semanas por isla |
| 2 | Mapa explorable (el personaje camina y entra a edificios) | meses |
| 3 | Mundo compartido: compañeros compiten en el mismo mercado | grande, sobre SIMPRO |

**Riesgos dichos a Ronald:** un juego se come el tiempo si no se limita (una isla, nivel 1,
probada con un curso real antes de seguir); el pixel art tiene que ser coherente (paquetes con
licencia libre o un dibujante; la muestra es un boceto hecho con código).

## 5. Decisiones pendientes de Ronald

1. **Cuentas de estudiante.** Para que cuente para la nota hace falta saber quién jugó y guardar el
   registro fuera del celular. Esto **choca con la decisión del 14-09** («progreso en el navegador,
   sin cuentas ni datos personales»). Opciones: cuentas solo para la parte evaluada (SIMPRO ya tiene
   Supabase, cursos y ranking), o un código de entrega que el estudiante manda con su registro.
2. **Primera isla:** recomendada **Proyectos II** (el motor de SIMPRO ya se está trayendo; el
   esfuerzo va a la historia y al arte). Alternativa: Inferencial (más material pedagógico listo).
3. **Arte:** paquetes libres o dibujante.

## 6. Material del que salen los casos (vive en OneDrive, no en este repo)

- El sistema de materias de Ronald: `…\UNIFRANZ\1.MATERIAS\` (agentes de dossier, evaluación, GIFT,
  con controles de calidad). Los casos del juego deben salir de ahí, verificados con script.
- La escena 1 usa **Lácteos Valle Alto** (empresa ficticia), del dossier de la Semana 1 de
  Proyectos II (`proyectos II\1_CONTENIDO\S1 - Cadena de valor y tamaño\`). Números de verdad:
  pasteurizador 300 L/h; fermentación 2 tanques de 200 L con ciclo de 8 h = 50 L/h (cuello de
  botella); envasadora 120 L/h; 16 h/día; eficiencia 0,90 → **720 L/día**. Envasadora automática
  (400 L/h, Bs 38.000) **no agrega ni un litro**; tercer tanque (Bs 45.000) → 75 L/h → **1.080
  L/día**. Margen Bs 4 por litro. La escena usa 860 pedidos/día (dato propio de la escena).
- Reglas del MEGAPROMPT de Ronald que aplican al juego: **§7.7 «todas las preguntas posibles»** y
  **§8.7 «primero se ve, después se calcula»**.

## 7. Aparte: la gamificación vieja (sin subir)

En la copia de OneDrive (`…\1.MATERIAS\RON_DOC\`, **20 commits atrás de `main`**) hay una
gamificación **nunca subida**: niveles («Novato» a «Iluminado»), 30 logros, misiones por tema
(Lectura → Quiz → Desafío → Jefe), racha y cuestionarios desde GIFT (`content/gamificacion/`,
`content/quizzes/`, `src/lib/gamificacion/`, `src/components/gamificacion/`, `src/app/perfil/`,
`scripts/parse-gift.ts`). Choca con el rediseño del 14-09 en 5 archivos y es el «cuestionario con
puntos» que Ronald descartó. **No se subió** (Ronald pidió solo el registro). Recomendación:
guardarla archivada y reusar solo piezas (racha, logros) si el juego las necesita. Hay además un
commit local con esos archivos en `C:\Users\lmigu\RON_DOC_trabajo`, rama `rescate-gamificacion`
(`b7dd4cb`), sin subir.

**No trabajar más RON_DOC dentro de OneDrive:** esa copia está vieja y el sincronizador y git se
pisan. El original es este repositorio.
