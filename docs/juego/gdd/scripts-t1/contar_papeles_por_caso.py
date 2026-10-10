import json,collections,os
p=os.path.join(os.path.dirname(__file__),"..","..","..","..","src","lib","juego","psicoestadistica","papeles-t1.json")
d=json.load(open(p,encoding="utf-8"))["papeles"]
c=collections.Counter(k.split("-")[0] for k in d)
print(dict(c)); 
for k,v in list(d.items())[:2]: print(k, str(v)[:200])
