# Agentes de RON_DOC

Los agentes de Claude Code del proyecto: un archivo `.md` por agente en esta carpeta, con su
cabecera (`name`, `description`, `tools`) y sus instrucciones. Los usan todas las sesiones, las de
la nube y las de la PC de Ronald, porque viajan con el repositorio.

## De dónde vienen (acordado el 2026-09-25)

Hay dos fuentes que se van a juntar:

- **Nube:** los que crea Claude en las sesiones en la nube, a medida que el trabajo los pide.
- **PC:** los que Ronald creó en la copia vieja de OneDrive
  (`C:\Users\lmigu\SynologyDrive\OneDrive\UNIFRANZ\1.MATERIAS\RON_DOC\.claude\agents\`), todavía
  sin subir. Esa copia está atrasada: **no hacer `git push` desde ahí**; copiar sólo los `.md` a un
  clon limpio (pasos en la bitácora, §7).

## Reglas para que no se pisen

1. **Un agente, un archivo, un nombre.** Antes de crear uno, mirar el registro de abajo: si ya hay
   uno que hace lo mismo, se mejora ese.
2. **Todo agente nuevo se anota en el registro** en el mismo commit: nombre, para qué sirve, origen
   (nube o PC) y fecha.
3. **Al traer los de la PC:** si un nombre choca con uno de la nube, no se reemplaza a ciegas. Se
   comparan los dos, se queda lo mejor de cada uno en un solo archivo y se anota en el registro
   qué se combinó. Ronald decide si hay duda.
4. **Nada privado:** sin claves, contraseñas ni rutas personales dentro de un agente (el
   repositorio es público).
5. La fusión termina cuando el registro dice lo mismo que hay en la PC: entonces la carpeta de
   OneDrive deja de ser fuente.

## Registro

| Agente | Para qué | Origen | Fecha | Notas |
|---|---|---|---|---|
| — | Todavía ninguno | — | — | Los de la PC están pendientes de subir |
