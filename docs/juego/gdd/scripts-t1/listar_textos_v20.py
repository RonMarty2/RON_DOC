import json,os
d=os.path.dirname(os.path.abspath(__file__))
t=json.load(open(os.path.join(d,"..","..","..","..","src","lib","juego","psicoestadistica","orientacion-t1.json"),encoding="utf-8"))["textos"]
for k in ["A1","A2","B-bienv-1","J1","A3","A4","A5","B-hoja-1","J2","A6","B-arch1-1","J3","B-entr2-1","J4","J5","J6","A7"]:
    print(k,"|",t.get(k))
