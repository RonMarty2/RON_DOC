"""Control de legibilidad de un boceto del juego (PixiJS).

Abre index.html?medir=1 en Chrome sin ventana, deja que la pagina recorra los estados del caso
y lee el resultado: textos mas chicos que el minimo, textos que se pisan entre si y textos fuera
de pantalla. Sale con codigo 1 si encuentra algo. Uso:  python medir_legibilidad.py [ruta\\index.html]
"""
import json, os, re, subprocess, sys, tempfile

CHROME = next((p for p in (r"C:\Program Files\Google\Chrome\Application\chrome.exe",
                           r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
                           r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe") if os.path.exists(p)), None)
if not CHROME:
    sys.exit("No encontre Chrome ni Edge.")

aqui = os.path.dirname(os.path.abspath(__file__))
html = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.path.join(aqui, "index.html")
url = "file:///" + html.replace("\\", "/") + "?medir=1"
with tempfile.TemporaryDirectory() as perfil:
    r = subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--use-gl=angle", "--use-angle=swiftshader",
                        "--enable-unsafe-swiftshader", "--user-data-dir=" + perfil, "--window-size=500,900",
                        "--virtual-time-budget=15000", "--dump-dom", url],
                       capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=120)
m = re.search(r'MEDICION(\{.*?\})\s*</pre>', r.stdout, re.S)
if not m:
    sys.exit("No salio la medicion (la pagina no cargo o no tiene el modo ?medir=1).")
res = json.loads(m.group(1).replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">"))
print("Minimo de letra: %s px logicos" % res["minimo_logico"])
for e in res["estados"]:
    marca = "OK " if not (e["chicos"] or e["pisados"] or e["fuera"]) else "MAL"
    print("[%s] %-20s %2d textos" % (marca, e["estado"], e["textos"]))
    for k, t in (("chicos", "muy chico"), ("pisados", "se pisan"), ("fuera", "fuera de pantalla")):
        for x in e[k]:
            print("      %s: %s" % (t, x))
print("RESULTADO:", "TODO LEGIBLE" if res["ok"] else "HAY PROBLEMAS")
sys.exit(0 if res["ok"] else 1)
