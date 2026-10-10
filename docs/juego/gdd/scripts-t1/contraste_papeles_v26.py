# v26: contraste por pixeles (fondo = color mas frecuente de la region, texto = el mas lejano a el) en las capturas del paso 2.
import sys
from PIL import Image
from collections import Counter
def lum(c):
    f=lambda v:(v/255)/12.92 if v/255<=.03928 else (((v/255)+.055)/1.055)**2.4
    return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2])
def cr(a,b):
    x,y=sorted([lum(a),lum(b)],reverse=True); return (x+.05)/(y+.05)
def region(img,box,nombre):
    im=Image.open(img).convert("RGB").crop(box); px=list(im.getdata())
    bg=Counter(px).most_common(1)[0][0]
    # texto = pixel con mayor contraste contra bg entre los frecuentes (>=3 apariciones)
    cnt=Counter(px); cand=[c for c,n in cnt.items() if n>=3]
    tx=max(cand,key=lambda c:cr(c,bg))
    # peor caso: fondo mas claro frecuente
    bgs=[c for c,n in cnt.most_common(6)]; peor=min(cr(tx,b) for b in bgs)
    print(f"{nombre}: fondo {bg} texto {tx} contraste {cr(tx,bg):.2f}  (peor de 6 fondos: {peor:.2f})")
d=sys.argv[1]
region(f"{d}/412/p2_412x860_papeles1.png",(8,698,130,720),"nota 'releer es gratis' 412")
region(f"{d}/412/p2_412x860_papeles1.png",(10,676,110,692),"rotulo 'Fichas' 412")
region(f"{d}/375/p2_375x667_papeles2.png",(8,508,200,526),"nota 'Primero abre algun papel' 375")
region(f"{d}/f/v26_375_cero_fichas.png",(70,600,125,618),"nombre papel bloqueado 'Lista de tutores' (sin fichas)")
region(f"{d}/f/v26_375_cero_fichas.png",(70,570,125,584),"marca '✓ leido' fondo 375")
region(f"{d}/375/p2_375x667_papeles2.png",(12,200,360,226),"objetivo 375")
