# El juego de RON_DOC — idea, decisiones y cómo retomarla

> Registrado el **2026-09-24** desde una sesión de Claude Code en la PC de Ronald (trabajando su
> sistema de materias en OneDrive). **Retomar en una sesión online sobre este repositorio.**
> **Esquema de la idea** (versión 1, 25-09): [`esquema.html`](./esquema.html), publicado para Ronald en https://claude.ai/artifact/9eusX4vS4LfCB1PLWkDt1Y (privado). Cuando la idea cambie, se actualiza ese archivo y se vuelve a publicar en la misma dirección.
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

## 9. Principio rector (26-09): juego con sabor a la materia

Ronald: *«Si bien el contenido base es el material o dossier de la materia, debe existir libertad
creativa o adaptativa para que se ajuste de mejor manera a un juego; eso debería primar. Necesito un
juego con sabor a esa materia, que se sienta que aprendemos mientras nos divertimos. No quiero una
materia con sabor a juego.»*

- Primero el juego; el aprendizaje va dentro de lo que se juega.
- El dossier es la **base de contenido** (conceptos, errores típicos, casos que inspiran), no un guion
  que se traspasa: se pueden cambiar el orden, las empresas, los personajes, las situaciones y los números.
- No se negocia: conceptos y cálculos correctos, desde funciones con pruebas; cada adaptación anota qué
  tema del dossier cubre, para que Ronald la revise.
- La regla 6 de las láminas ("los números de un caso no se inventan") **sigue valiendo para las láminas**,
  no para el juego.

## 10. Marco fijo, modalidad variable (26-09)

Ronald: *«Me da miedo que escoja un tipo de juego, modalidad, mecánica y lo mantenga para siempre;
puede que existan temas, subtemas que se ajusten de mejor manera a cierto tipo.»*

- Un **marco** da unidad: mundo, personaje, historia que avanza, registro para la nota.
- **Cada tema o subtema se juega con la modalidad que mejor lo enseña** (armar una línea de
  producción, entrevistar clientes, negociar, investigar papeles, apostar en el tiempo, administrar,
  un minijuego). Se elige tema por tema según el contenido.
- Referencias: los templos de *Zelda* (cada uno con su mecánica), los acertijos de *Professor Layton*,
  la colección de *WarioWare*.
- Consecuencia técnica: el código de escenas tiene que admitir modalidades distintas bajo el mismo
  marco (hoy la escena 1 es una sola modalidad; se generaliza cuando llegue la segunda).

## 11. Cómo se planifica (26-09)

Pedidos de Ronald en la conversación del 26-09, ya reglas de los siete agentes:

1. **Diseño inverso:** primero qué sabe hacer el alumno al terminar, cómo lo demuestra y qué pasa si lo
   hace mal; después el juego. Ronald: *«veo esto y no entiendo qué aprenderá».*
2. **Arco de la materia con inicio y fin**, cada etapa usando lo que produjo la anterior. En Proyectos II
   sale del mapa de ruta del dossier: semana 1 técnico I (4.1.1 a 4.1.4) → semana 2 técnico II y
   administrativo (4.1.5 a 4.1.7, 4.2) → semana 3 comercial y costos (4.3, entra el simulador) →
   semana 4 flujo y evaluación (4.4, 4.5) → semana 5 riesgo (4.6) → semana 6 integración. El producto
   final es el Capítulo 4 del proyecto del alumno.
3. **Dominio antes de avanzar**, sin dar la respuesta: consecuencia y pista según el error → pista
   concreta → leer la sección exacta del dossier → otros números. El registro guarda el escalón.
4. **Tipos de proyecto:** producción, comercio, servicios, agrícola y digital (las tablas "Lo mismo, en
   cada tipo de proyecto" del dossier). Hilo principal (Lácteos Valle Alto) más contraste con otros tipos.
5. **Decidir lo que el dossier ya responde** (por ejemplo, el tercer tanque cuesta Bs 52.000, como dice
   el dossier) y preguntar como mucho una cosa por ronda.
6. **Todo lo que se decide se vuelve regla de los agentes** en el mismo commit.

Decidido además, por defecto y sin objeción de Ronald: marco "La planta que levantas" (el alumno es el
socio técnico de Don Mario y arma la planta etapa por etapa); la escena de la planta pasa a la semana 2
con el precio del dossier; el proyecto propio del alumno,
después de probar el juego.

## 12. Por temas, sin tiempo (26-09)

Ronald: *«No quiero que me hables en semanas sino por temas, a menos que el dossier esté en semanas;
no quiero que le pongas temporalidad, como que se debe resolver en una o dos semanas; iniciarán
cuando les diga.»*

- El juego se organiza por **temas** (secciones del Capítulo 4, Marco propositivo, y sus subtemas).
  Las semanas sólo sirven para ubicar dónde está archivado cada dossier.
- **Sin duraciones ni plazos.** Cada tema se abre cuando Ronald lo habilita (en el código, un tema
  habilitado o no por el docente, no una fecha).
- El objetivo final de la materia: completar el Capítulo IV, Marco propositivo (4.1 técnico,
  4.2 administrativo, 4.3 comercial, 4.4 financiero, y lo que agregue el dossier: evaluación y riesgo).

## 13. Primero la maqueta, después el detalle; no todo tema es un juego (26-09)

Ronald: *«¿No sería mejor que comencemos planificando la maqueta general en base a los temas totales
del dossier, definir inicio y fin (uno que orqueste de excelente manera cada tema, que tenga sentido y
que use, de ser necesario, el tema anterior para el siguiente, así como proyectos sólo si es necesario
o se puede), luego de eso recién pasamos tema a tema, subtema a subtema, si es necesario un juego,
porque a veces no lo será?»*

1. **Maqueta general** de la materia entera: todos los temas, inicio y fin, un orden con sentido; un
   tema usa otro sólo cuando hace falta (también el contraste con otros tipos de proyecto).
2. Aprobada la maqueta, **tema por tema**: en cada subtema se decide si necesita un juego. Cuando sí,
   una ficha con el tipo de juego recomendado, por qué calza y la alternativa (lo que más le sirvió de
   la ronda 1).

