def h(c):return tuple(int(c[i:i+2],16) for i in (1,3,5))
def L(c):
    f=lambda v:(v/255)/12.92 if v/255<=.03928 else (((v/255)+.055)/1.055)**2.4
    r,g,b=map(f,c);return .2126*r+.7152*g+.0722*b
def cr(a,b):
    x,y=sorted((L(a),L(b)),reverse=True);return (x+.05)/(y+.05)
def mix(a,b,t):return tuple(a[i]*t+b[i]*(1-t) for i in range(3))
texto=h("#ece7f7");mesa=h("#3b2a46");pared=h("#241c46");papel=(244,236,214)
for nombre,bg in (("mesa",mesa),("pared",pared),("pared clara arriba",h("#2b2146"))):
    fondo=mix(papel,bg,.10)
    print(nombre,"leido=no  texto/boton:",round(cr(texto,fondo),1))
    # leido: el boton entero a opacidad .5 sobre bg
    t2=mix(texto,bg,.5);f2=mix(fondo,bg,.5)
    print(nombre,"leido=si  texto/boton:",round(cr(t2,f2),2))
print("fichas tenue sobre mesa",round(cr(h("#b4abd3"),mesa),1))
