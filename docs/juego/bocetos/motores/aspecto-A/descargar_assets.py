# -*- coding: utf-8 -*-
"""
Baja los paquetes gratis de Kenney (Pixel UI, Emotes, 1-Bit, Cursor Pixel) y PixiJS local,
VERIFICA la licencia de cada paquete leyendo su License.txt, y escribe:

    assets/kenney/<paquete>/...     (contenido del zip)
    assets/vendor/pixi-7.4.2.min.js (copia local de PixiJS, por si falla el CDN)
    kenney.js                       (las pocas piezas que usa index.html, en base64)
    LICENCIAS.md                    (que se bajo, de donde, con que licencia, que se uso)

Regla: si un paquete NO dice Creative Commons Zero / CC0 en su License.txt, no se usa
y LICENCIAS.md lo anota como RECHAZADO. Lo que no se pueda bajar queda anotado como NO BAJADO.

Uso:  python descargar_assets.py
"""
import base64
import datetime
import hashlib
import io
import json
import os
import re
import urllib.request
import zipfile

AQUI = os.path.dirname(os.path.abspath(__file__))
KENNEY = os.path.join(AQUI, "assets", "kenney")
VENDOR = os.path.join(AQUI, "assets", "vendor")
UA = {"User-Agent": "Mozilla/5.0 (RON_DOC boceto)"}

PAQUETES = [
    # nombre, paginas donde buscar el .zip (en orden)
    ("pixel-ui-pack", ["https://kenney.nl/assets/pixel-ui-pack", "https://opengameart.org/content/pixel-ui-pack-750-assets"]),
    ("emotes-pack", ["https://kenney.nl/assets/emotes-pack", "https://opengameart.org/content/emotes-pack"]),
    ("1-bit-pack", ["https://kenney.nl/assets/1-bit-pack"]),
    ("cursor-pixel-pack", ["https://kenney.nl/assets/cursor-pixel-pack", "https://opengameart.org/content/cursor-pixel-pack"]),
]


def pedir(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def buscar_zip(paginas):
    for pag in paginas:
        try:
            html = pedir(pag).decode("utf-8", "replace")
        except Exception as e:  # noqa
            print("  no abre", pag, e)
            continue
        links = re.findall(r'(?:href|src)=["\']([^"\']+\.zip)["\']', html)
        for l in links:
            if l.startswith("//"):
                l = "https:" + l
            elif l.startswith("/"):
                base = re.match(r"https?://[^/]+", pag).group(0)
                l = base + l
            return pag, l
    return None, None


def main():
    os.makedirs(KENNEY, exist_ok=True)
    os.makedirs(VENDOR, exist_ok=True)
    hoy = datetime.date.today().isoformat()
    filas = []
    usados = {}
    seleccion = {}

    # PixiJS local (respaldo del CDN)
    try:
        datos = pedir("https://cdn.jsdelivr.net/npm/pixi.js@7.4.2/dist/pixi.min.js")
        with open(os.path.join(VENDOR, "pixi-7.4.2.min.js"), "wb") as f:
            f.write(datos)
        pixi_nota = "PixiJS 7.4.2 (licencia MIT, jsDelivr), %d bytes, sha256 %s" % (len(datos), hashlib.sha256(datos).hexdigest()[:16])
    except Exception as e:  # noqa
        pixi_nota = "NO BAJADO: %s" % e

    for nombre, paginas in PAQUETES:
        print("==", nombre)
        pag, url = buscar_zip(paginas)
        if not url:
            filas.append((nombre, "NO BAJADO", "no encontre el enlace del zip en: " + ", ".join(paginas), "", 0))
            continue
        try:
            z = pedir(url)
            zf = zipfile.ZipFile(io.BytesIO(z))
        except Exception as e:  # noqa
            filas.append((nombre, "NO BAJADO", "fallo la descarga %s: %s" % (url, e), "", 0))
            continue
        licencia = ""
        for n in zf.namelist():
            if os.path.basename(n).lower() in ("license.txt", "licence.txt", "license.md", "license"):
                licencia = zf.read(n).decode("utf-8", "replace")
                break
        es_cc0 = bool(re.search(r"creative commons zero|cc0", licencia, re.I))
        if not es_cc0:
            filas.append((nombre, "RECHAZADO", "el zip no trae un License.txt que diga CC0 (%s)" % url, licencia[:200].replace("\n", " "), 0))
            continue
        destino = os.path.join(KENNEY, nombre)
        os.makedirs(destino, exist_ok=True)
        zf.extractall(destino)
        pngs = [n for n in zf.namelist() if n.lower().endswith(".png")]
        filas.append((nombre, "OK CC0", url, licencia.strip().split("\n")[0][:160], len(pngs)))
        usados[nombre] = [p for p in pngs]

    # seleccion de las pocas piezas que usa el boceto (por nombre; lo que no aparezca no se usa)
    def elegir(paquete, patrones, evitar=("sheet", "tilesheet", "spritesheet", "preview", "sample")):
        for p in usados.get(paquete, []):
            bajo = p.lower().replace("\\", "/")
            if any(e in bajo for e in evitar):
                continue
            if all(re.search(pt, bajo) for pt in patrones):
                return paquete, p
        return None

    deseadas = {
        "emote_alerta": ("emotes-pack", [r"pixel", r"exclamation(?!s)"]),
        "emote_feliz": ("emotes-pack", [r"pixel", r"(facehappy|face_happy|laugh)"]),
        "emote_triste": ("emotes-pack", [r"pixel", r"(facesad|face_sad|faceangry|sleep)"]),
        "emote_duda": ("emotes-pack", [r"pixel", r"question"]),
        "cursor": ("cursor-pixel-pack", [r"(pointer|hand|cursor)"]),
    }
    js = ["// Piezas de Kenney (CC0) usadas por index.html. Generado por descargar_assets.py", "window.KENNEY = {"]
    for clave, (paq, pats) in deseadas.items():
        r = elegir(paq, pats)
        if not r:
            seleccion[clave] = "no encontrada"
            continue
        ruta = os.path.join(KENNEY, paq, r[1])
        try:
            with open(ruta, "rb") as f:
                b = f.read()
        except Exception as e:  # noqa
            seleccion[clave] = "no se pudo leer: %s" % e
            continue
        seleccion[clave] = "%s/%s" % (paq, r[1])
        js.append('  "%s": "data:image/png;base64,%s",' % (clave, base64.b64encode(b).decode("ascii")))
    js.append("};")
    tmp = os.path.join(AQUI, "kenney.js.tmp")
    with open(tmp, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(js) + "\n")
    os.replace(tmp, os.path.join(AQUI, "kenney.js"))

    md = ["# Licencias del boceto La redaccion de noche (Direccion A)", "",
          "Generado por `descargar_assets.py` el %s. La licencia se LEE del `License.txt` de cada zip; si no dice CC0, el paquete se rechaza." % hoy, "",
          "## Paquetes de Kenney (https://kenney.nl)", "",
          "| Paquete | Estado | De donde | Primera linea de su License.txt | PNG |", "|---|---|---|---|---|"]
    for nombre, estado, origen, lic, n in filas:
        md.append("| %s | %s | %s | %s | %s |" % (nombre, estado, origen, lic, n))
    md += ["", "Todos los archivos de un paquete comparten su licencia (CC0: dominio publico, sin obligacion de dar credito; igual se agradece a Kenney).", "",
           "## Piezas de Kenney que usa `index.html`", ""]
    for k, v in seleccion.items():
        md.append("- `%s`: %s" % (k, v))
    md += ["", "Lo que NO se uso del todo: `pixel-ui-pack` y `1-bit-pack` se bajaron y estan en `assets/kenney/`, pero este boceto usa botones, tubos y fichas PROVISIONALES propios (ver abajo); se pueden cambiar por piezas de esos paquetes en la siguiente vuelta.", "",
           "## PixiJS", "", "- " + pixi_nota + ". Se carga del CDN `cdn.jsdelivr.net/npm/pixi.js@7.4.2` y, si falla, de `assets/vendor/`.", "",
           "## Arte PROVISIONAL propio (hecho por script)", "",
           "Todo `assets/provisional/*.png` y `arte-provisional.js` lo dibuja `generar_arte_provisional.py` (pixel art hecho por codigo). No viene de ningun otro juego ni paquete. Es PROVISIONAL: un artista lo reemplaza. Piezas: sala, mesa, lampara, cono de luz, carpeta, 6 papeles, hoja de lectura, tubos de tinta, fichas, titular, 3 botones, cubiculo, editora (3 poses), silueta de Dani, telefono, taza, polvo, sombra, etiqueta, sellos.", "",
           "## Fuente de letra", "", "- Press Start 2P (Google Fonts, licencia SIL OFL 1.1), cargada por CDN desde fonts.googleapis.com; si falla, cae a monospace.", ""]
    tmp = os.path.join(AQUI, "LICENCIAS.md.tmp")
    with open(tmp, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(md))
    os.replace(tmp, os.path.join(AQUI, "LICENCIAS.md"))
    print(json.dumps({"paquetes": [(f[0], f[1]) for f in filas], "seleccion": seleccion}, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
