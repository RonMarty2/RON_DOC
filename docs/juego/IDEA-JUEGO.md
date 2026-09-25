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

## 5. Decisiones de Ronald (tomadas el 25-09: cuentas con Supabase, Proyectos II, arte con código, juego antes que el simulador; plan en §0 de la bitácora)

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

## 8. Revisión del 25-09 (sesión online): qué mejorar antes de construir

Se jugó la muestra leyendo su código. La idea se sostiene; lo que falta es esto, en orden:

1. **La versión es de adorno.** El chip dice «VERSIÓN 07 DE 32», pero los datos están fijos en
   el código. Para que cuente para la nota, los ritmos de las máquinas tienen que salir del número
   de versión con el mismo sorteo con semilla que ya usa `/practica-financiera`, con límites que
   conserven la lección: la fermentación siempre es el cuello de botella y la envasadora rápida
   nunca suma un litro. Cada versión se prueba con script, como los ejercicios de las láminas.
2. **Después de calcular, la decisión es de opción múltiple y ya está resuelta.** Quien calculó 720
   ya sabe que la envasadora no sirve. Mejor que antes de comprar tenga que **calcular la
   consecuencia**: con el tercer tanque salen 1.080 L/día, se venden los 860 pedidos (140 más por
   día × Bs 4 = Bs 560), unos Bs 14.560 al mes con 26 días, y los Bs 45.000 se recuperan en unos
   **3,1 meses**. Eso lleva la escena al período de recuperación y conecta con el motor de SIMPRO.
3. **Las pistas por error están escritas para una sola versión** (`v === 800`). Tienen que salir
   de la misma fórmula con los datos de cada versión (sumó máquinas, olvidó la eficiencia, tomó la
   envasadora).
4. **Números sólo desde funciones probadas** (regla de CLAUDE.md): capacidad, cuello de botella y
   recuperación en `src/lib/juego/` con su `.test.ts`, no dentro de la escena.
5. **Dentro del sitio**, la muestra usa fuentes de Google cargadas de internet: en el aula sin
   conexión se vería con la letra del sistema. Al pasarla a Next van con `next/font`, como el resto,
   y entran en la precarga. Los colores del pixel art quedan como excepción (igual que los colores
   de categoría de los gráficos), con su contraste medido.
6. **Detalles:** el registro vacío muestra un guion largo (regla 11); «Volver a intentar» borra la
   consecuencia de la mala decisión pero el registro la conserva, que es lo buscado.

**Recomendación para la decisión 1 (cuentas):** el **código de entrega**, porque no rompe la
decisión del 14-09. El registro se queda en el navegador; al terminar la escena se arma un código
(o un archivo) con la versión, los números escritos, la decisión y el argumento. El alumno lo manda
por donde ya entrega tareas y el docente lo pega en una página de revisión que **recalcula todo con
la versión** y muestra cómo razonó. Un código así se puede falsificar con paciencia; lo que lo hace
válido para la nota es la defensa oral, que ya es el jefe final. Las cuentas con Supabase quedan
para el nivel 3 (mercado compartido), donde sí hacen falta.

**Orden sugerido una vez que Ronald decida:** motor de escena y versiones (`src/lib/juego/`, con
pruebas) → escena 1 en `/juego/proyectos` como borrador → página de revisión del código de entrega →
probar con un curso → escena 2 («La cámara de frío que se llenó»). El simulador de §0 de la bitácora
sigue siendo la base de las escenas con VAN y TIR, así que conviene terminarlo en paralelo.
