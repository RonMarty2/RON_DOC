// Mide el boceto inmersivo: oficina libre, fuentes, botones, cortes. Uso: node medir_inmersiva_v23.mjs <carpeta_capturas>
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const out = process.argv[2];
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args:["--no-sandbox"] });
const p = await b.newPage({ viewport: { width: 1200, height: 5200 } });
await p.goto("file:///home/user/RON_DOC/docs/juego/bocetos/inmersiva/index.html");
const r = await p.evaluate(() => {
  const res = [];
  document.querySelectorAll(".frame").forEach((f, i) => {
    const fr = f.getBoundingClientRect(), W = fr.width, H = fr.height;
    const cov = [];
    for (const s of [".cabeza", ".hoja", ".dlg", ".fin"]) f.querySelectorAll(s).forEach(e => { const q = e.getBoundingClientRect(); cov.push({s, l:q.left-fr.left, t:q.top-fr.top, r:q.right-fr.left, b:q.bottom-fr.top}); });
    // pixel libre: rejilla
    let libre = 0, tot = 0, libreAlto = 0;
    for (let x = 0; x < W; x += 4) for (let y = 0; y < H; y += 4) { tot++; if (!cov.some(c => x>=c.l&&x<=c.r&&y>=c.t&&y<=c.b)) libre++; }
    // franja libre contigua mayor (alto) en columna central
    const colLibre = (x) => { let max=0,cur=0; for (let y=0;y<H;y+=2){ if(!cov.some(c=>x>=c.l&&x<=c.r&&y>=c.t&&y<=c.b)){cur+=2;max=Math.max(max,cur)}else cur=0 } return max; };
    // figuras (ventana, jefa, dani) tapadas
    const tap = {};
    for (const s of [".vent",".jefa",".dani",".carpeta"]) { const e=f.querySelector(s); if(!e) continue; const q=e.getBoundingClientRect(); const a=q.width*q.height; let t=0,n=0; for(let x=q.left;x<q.right;x+=3)for(let y=q.top;y<q.bottom;y+=3){n++; const xx=x-fr.left,yy=y-fr.top; if(cov.some(c=>xx>=c.l&&xx<=c.r&&yy>=c.t&&yy<=c.b))t++} tap[s]=Math.round(100*t/n)+"%"; }
    const chicos = [], bajos = [], cortes = [];
    f.querySelectorAll("*").forEach(e => {
      const cs = getComputedStyle(e); const txt = [...e.childNodes].some(n => n.nodeType===3 && n.textContent.trim());
      if (txt && parseFloat(cs.fontSize) < 12) chicos.push(e.textContent.trim().slice(0,20));
      if (e.tagName==="BUTTON") { const q=e.getBoundingClientRect(); if(q.height<44||q.width<44) bajos.push(e.textContent.trim().slice(0,20)+" "+Math.round(q.width)+"x"+Math.round(q.height)); }
      if (e.scrollHeight > e.clientHeight+2 && /auto|hidden/.test(cs.overflowY) && e.clientHeight>0) cortes.push(e.className+" scrollH="+e.scrollHeight+" cliH="+e.clientHeight);
      const q=e.getBoundingClientRect(); if(txt && (q.right>fr.right+1||q.bottom>fr.bottom+1||q.left<fr.left-1||q.top<fr.top-1)) cortes.push("fuera:"+e.textContent.trim().slice(0,20));
    });
    // hoja cuerpo desborda?
    const h=f.querySelector(".hoja"); const hh = h? Math.round(100*h.getBoundingClientRect().height/H):0;
    const cab=f.querySelector(".cabeza"); const ch=cab?Math.round(cab.getBoundingClientRect().height):0;
    res.push({i, W, H, libreArea: Math.round(100*libre/tot), libreContiguoAlto: Math.round(100*Math.max(colLibre(W*0.3),colLibre(W*0.6),colLibre(W*0.15))/H), hojaPct: hh, cabezaPx: ch, tapadas: tap, chicos, bajos, cortes});
  });
  return res;
});
for (const x of r) console.log(JSON.stringify(x));
const fr = await p.$$(".frame");
for (let i=0;i<fr.length;i++) await fr[i].screenshot({ path: `${out}/f${i}.png` });
await b.close();
