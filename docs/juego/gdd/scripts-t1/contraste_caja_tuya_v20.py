# v20: contrastes de la caja verde del jugador y separacion figura/fondo de la escena (Paso 1).
import os
from PIL import Image
def lum(h):
    h=h.lstrip('#'); c=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    c=[x/12.92 if x<=.03928 else ((x+.055)/1.055)**2.4 for x in c]
    return .2126*c[0]+.7152*c[1]+.0722*c[2]
def cr(a,b):
    la,lb=lum(a),lum(b); 
    if la<lb: la,lb=lb,la
    return (la+.05)/(lb+.05)
caja="#1c3a34"
for n,c in [("texto normal (--m-texto)","#ece7f7"),("rotulo Tu, regla mesa-quien 2 (ambar)","#ffcf7a"),("rotulo Tu, regla 1 (no gana)","#9fe8d2"),("borde #6fd0b4 vs fondo pagina","#6fd0b4")]:
    print(f"{n}: {c} sobre {caja} = {cr(c,caja):.2f}")
print("borde caja vs fondo noche #0c0a1a:",round(cr("#6fd0b4","#0c0a1a"),2))
print("caja verde vs panel dialogo ajeno #1d1838:",round(cr("#1c3a34","#1d1838"),2))
A=os.path.join(os.path.dirname(os.path.abspath(__file__)),"..","..","..","..","public","juego","psicoestadistica","arte")
def pix(n):
    im=Image.open(os.path.join(A,n+".png")).convert("RGBA"); d={}
    for p in im.getdata():
        if p[3]: d[p[:3]]=d.get(p[:3],0)+1
    return d
def hx(t): return "#%02x%02x%02x"%t
pared=pix("pared_ladrillo"); print("pared:",[hx(k) for k in pared])
dani=pix("dani_silueta_fondo"); print("dani:",{hx(k):v for k,v in dani.items()})
for k in dani:
    print("dani",hx(k),"vs pared:",[round(cr(hx(k),hx(q)),2) for q in pared])
jefa=pix("jefa_neutral"); pelo=max(jefa,key=lambda k:-lum(hx(k)) if False else jefa[k])
print("jefa colores principales:",[hx(k) for k in sorted(jefa,key=lambda k:-jefa[k])[:6]])
for k in sorted(jefa,key=lambda k:-jefa[k])[:6]:
    print("jefa",hx(k),"min/max vs pared:",round(min(cr(hx(k),hx(q)) for q in pared),2),round(max(cr(hx(k),hx(q)) for q in pared),2))
