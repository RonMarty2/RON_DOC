# Mide el boceto docs/juego/bocetos/caras/index.html: pantallas, letras, botones, globos contra la jefa y la ventana, contrastes.
import sys, os, json
from playwright.sync_api import sync_playwright
URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8124/docs/juego/bocetos/caras/index.html"
OUT = sys.argv[2] if len(sys.argv) > 2 else "."
def lum(h):
    h = h.lstrip('#'); c = [int(h[i:i+2], 16)/255 for i in (0, 2, 4)]
    c = [x/12.92 if x <= .03928 else ((x+.055)/1.055)**2.4 for x in c]
    return .2126*c[0]+.7152*c[1]+.0722*c[2]
def cr(a, b):
    la, lb = sorted([lum(a), lum(b)], reverse=True); return (la+.05)/(lb+.05)
for a, b in [('#ece7f7','#1d1838'),('#2a2236','#f1e8cf'),('#ffcf7a','#1d1838'),('#5a3a14','#f1e8cf'),('#1a1410','#ffcf7a'),('#b4abd3','#0c0a1a')]:
    print('contraste', a, b, round(cr(a, b), 2))
JS = """
() => {
 const out = [];
 document.querySelectorAll('.col').forEach(col => {
   const cap = col.querySelector('.cap').innerText;
   const tel = col.querySelector('.tel').getBoundingClientRect();
   const esc = col.querySelector('.escena').getBoundingClientRect();
   const r = {cap, telW: tel.width, telH: tel.height, escH: esc.height, globos: [], chicos: [], botones: []};
   const imgs = [...col.querySelectorAll('.esc-in img')];
   col.querySelectorAll('.globo, .panel, .tag').forEach(g => {
     const b = g.getBoundingClientRect(); const fs = parseFloat(getComputedStyle(g.querySelector('p')||g).fontSize);
     r.globos.push({cls: g.className, top: b.top-esc.top, bottom: b.bottom-esc.top, left: b.left-esc.left, right: b.right-esc.left, h: b.height, fs});
   });
   col.querySelectorAll('*').forEach(e => { if (e.children.length==0 && e.innerText && e.innerText.trim()) { const fs=parseFloat(getComputedStyle(e).fontSize); if (fs<12) r.chicos.push([e.innerText.slice(0,20), fs]); }});
   col.querySelectorAll('.btn').forEach(e => { const b=e.getBoundingClientRect(); r.botones.push([e.innerText, Math.round(b.width), Math.round(b.height)]); });
   // jefa (editora) y jugador
   imgs.forEach(i => { const s=i.getAttribute('src')||''; if (s.includes('editora')) { const b=i.getBoundingClientRect(); r.jefa={top:b.top-esc.top,bottom:b.bottom-esc.top,left:b.left-esc.left,right:b.right-esc.left}; }});
   const cv = col.querySelector('.esc-in canvas'); if (cv) { const b=cv.getBoundingClientRect(); r.tu={top:b.top-esc.top,bottom:b.bottom-esc.top,left:b.left-esc.left,right:b.right-esc.left}; }
   const dn = imgs.find(i => (i.getAttribute('src')||'').includes('dani')); if (dn) { const b=dn.getBoundingClientRect(); r.dani={top:b.top-esc.top,bottom:b.bottom-esc.top,left:b.left-esc.left,right:b.right-esc.left}; }
   out.push(r);
 });
 return out;
}
"""
with sync_playwright() as p:
    br = p.chromium.launch(); pg = br.new_page(viewport={'width': 1300, 'height': 900})
    pg.goto(URL); pg.wait_for_timeout(2500)
    res = pg.evaluate(JS)
    for r in res: print(json.dumps(r, ensure_ascii=False))
    for i, c in enumerate(pg.query_selector_all('.col')):
        c.screenshot(path=os.path.join(OUT, f'pantalla_{i+1}.png'))
    br.close()
print('pantallas', len(res))
