# Cuaderno de ejercicios — Unidad 2 (Probabilidad)

72 ejercicios, 8 por apartado (2.1 a 2.9), ordenados por dificultad.

## Los cinco niveles

| Nivel | Qué entrena |
|---|---|
| **N0 · Reconocer** | Vocabulario y distinciones. Sin cálculo. Existe para que nadie quede afuera en el primer minuto. |
| **N1 · Contar** | Identificar qué va arriba y qué abajo en la fracción. |
| **N2 · Una fórmula** | Aplicarla una vez, con números chicos y redondos. |
| **N3 · Datos reales** | Sobre las 200 fichas del servicio, las mismas de la Aula interactiva. |
| **N4 · Decidir** | Elegir la herramienta, detectar el error, interpretar para un caso. |

Reparto: 9 de N0, 18 de N1, 18 de N2, 18 de N3, 9 de N4.

## Los dos PDF

| Archivo | Para quién | Qué trae |
|---|---|---|
| `cuadernillo-estudiantes.pdf` | los estudiantes | Enunciados con espacio para resolver a mano, y las respuestas (sólo el resultado) al final. |
| `cuadernillo-docente.pdf` | vos | Enunciados con la solución paso a paso debajo de cada uno, sin espacios en blanco. |

## Cómo regenerarlos

```bash
./compilar.sh
```

Requiere `pdflatex`. En Ubuntu/Debian:

```bash
sudo apt-get install texlive-latex-recommended texlive-latex-extra \
                     texlive-lang-spanish texlive-fonts-recommended
```

## Cómo está armado

Un solo código fuente produce las dos versiones, así que **los enunciados no
se pueden desincronizar de sus soluciones**. Lo controlan dos interruptores
que se fijan en cada `cuadernillo-*.tex`:

```latex
\newif\ifdocente \docentetrue    % incluye la solución paso a paso
\newif\ifespacio \espaciofalse   % deja espacio para resolver a mano
```

| Archivo | Qué es |
|---|---|
| `preambulo.tex` | Estilo, colores por nivel, y las macros `\ejercicio`, `\solucion`, `\respuesta`. |
| `portada.tex` | Carátula, distinta según la versión. |
| `apartado-2-1.tex` … `apartado-2-9.tex` | **El contenido.** Es acá donde se edita o se agregan ejercicios. |
| `cuerpo.tex` | La lista de apartados que se incluyen. |
| `compilar.sh` | Genera los dos PDF (dos pasadas cada uno). |

### Agregar un ejercicio

En el archivo del apartado que corresponda:

```latex
\ejercicio{2}{Enunciado de la consigna.}
\espacioresolver[2.5cm]
\respuesta{El resultado corto, para la clave del final.}
\solucion{El desarrollo paso a paso.}
```

El número del ejercicio y la entrada en la clave de respuestas se generan
solos: no hay que numerar a mano ni mantener una lista de respuestas aparte.

### Armar una ficha de una sola clase

Comentá en `cuerpo.tex` los apartados que no correspondan y volvé a compilar.

## Los números

Todos los resultados de nivel 3 y 4 se calcularon contra
`content/aula-probabilidad/dataset.ts`, el mismo archivo que alimenta la Aula
interactiva. Si alguna vez cambia el dataset, hay que rehacer esos ejercicios:
los valores están escritos literalmente en el `.tex`, no se leen del archivo.

Valores de referencia: 200 fichas · 43 positivos en depresión · 21 en ansiedad ·
17 en ambos · 25 con diagnóstico confirmado · VP 22, FP 21, FN 3, VN 154 ·
sensibilidad y especificidad 0,88 · VPP 0,512 · prevalencia 0,125 ·
media 6,32 · desviación 4,64.
