"""Control de la línea gráfica (docs/juego/ARTE-LINEA-GRAFICA.md): ¿cada PNG usa solo la paleta EDG32?

Uso:  python scripts/verificar_arte.py <archivo.png o carpeta> [--paleta-extra #rrggbb ...]
Para cada PNG dice: tamaño, cuántos colores distintos usa, cuántos están FUERA de la paleta, cuántos píxeles son semitransparentes
(alfa entre 1 y 254) y el porcentaje de píxeles fuera de paleta. Sale con código 1 si algún PNG no cumple.

No modifica nada. Busca todo a partir de lo que se le pasa (rutas por argumento).
"""
import os
import sys

from PIL import Image

EDG32 = """be4a2f d77643 ead4aa e4a672 b86f50 733e39 3e2731 a22633 e43b44 f77622 feae34 fee761 63c74d 3e8948 265c42 193c3e
124e89 0099db 2ce8f5 ffffff c0cbdc 8b9bb4 5a6988 3a4466 262b44 181425 ff0044 68386c b55088 f6757a e8b796 c28569""".split()
PALETA = {tuple(int(h[i : i + 2], 16) for i in (0, 2, 4)) for h in EDG32}


def revisar(ruta: str) -> dict:
    im = Image.open(ruta).convert("RGBA")
    w, h = im.size
    px = im.getdata()
    colores = {}
    semi = 0
    opacos = 0
    for r, g, b, a in px:
        if a == 0:
            continue
        if a < 255:
            semi += 1
        opacos += 1
        colores[(r, g, b)] = colores.get((r, g, b), 0) + 1
    fuera = {c: n for c, n in colores.items() if c not in PALETA}
    pixeles_fuera = sum(fuera.values())
    return {
        "archivo": os.path.basename(ruta),
        "tam": f"{w}x{h}",
        "colores": len(colores),
        "fuera": len(fuera),
        "pct_fuera": round(100 * pixeles_fuera / opacos, 1) if opacos else 0.0,
        "semitransparentes": semi,
    }


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    base = sys.argv[1]
    rutas = [base] if os.path.isfile(base) else sorted(os.path.join(base, f) for f in os.listdir(base) if f.lower().endswith(".png"))
    # Los efectos de luz (el cono de la lámpara, el brillo, las motas de polvo) llevan transparencia a propósito: no son sprites.
    rutas = [r for r in rutas if not any(k in os.path.basename(r).lower() for k in ("luz", "cono", "mota"))]
    malos = 0
    print(f"{'archivo':32s} {'tam':>8s} {'colores':>8s} {'fuera':>6s} {'%fuera':>7s} {'semitr.':>8s}")
    for r in rutas:
        d = revisar(r)
        ok = d["fuera"] == 0 and d["semitransparentes"] == 0
        malos += 0 if ok else 1
        print(f"{d['archivo']:32s} {d['tam']:>8s} {d['colores']:>8d} {d['fuera']:>6d} {d['pct_fuera']:>6.1f}% {d['semitransparentes']:>8d}  {'OK' if ok else 'NO CUMPLE'}")
    print(f"\n{len(rutas) - malos} de {len(rutas)} cumplen la línea gráfica")
    return 1 if malos else 0


if __name__ == "__main__":
    sys.exit(main())
