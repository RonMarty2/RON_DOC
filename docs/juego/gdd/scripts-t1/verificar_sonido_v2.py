# -*- coding: utf-8 -*-
import os
import re

AQUI = os.path.dirname(os.path.abspath(__file__))
RUTA = os.path.join(os.path.dirname(AQUI), "07-sonido.md")
b = open(RUTA, "rb").read()
t = b.decode("utf-8")
print("bytes de control (no \\n ni \\r):", sum(1 for x in b if x < 32 and x not in (10, 13)))
print("CRLF:", t.count("\r\n"), "LF totales:", t.count("\n"))
print("guiones largos:", t.count("—"))
print("voseo:", len(re.findall(r"\b(tenés|podés|sos|vos|calculá|fijate|mirá|hacé|elegí)\b", t, re.I)))
print("hojas '### Hoja S':", len(re.findall(r"^### Hoja S", t, re.M)))
print("prompts:", len(re.findall(r"^> Instrumental 8-bit chiptune loop", t, re.M)))
print("filas E01-E13:", len(re.findall(r"^\| E\d\d \|", t, re.M)))
print("'Con una tanda' / 'todavía se puede':", t.count("una tanda no sabes"), t.count("todavía se puede"))
for hoja in re.split(r"(?=^### Hoja S)", t, flags=re.M)[1:]:
    nombre = hoja.split("\n")[0][:20]
    efe = re.search(r"4\. \*\*Efectos\.\*\*(.*)", hoja)
    print(nombre, "E06" in (efe.group(1) if efe else ""))
