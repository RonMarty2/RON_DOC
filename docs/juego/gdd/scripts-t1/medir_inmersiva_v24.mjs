import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const [W,H]=[Number(process.argv[2]),Number(process.argv[3])]; const out=process.argv[4];
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: W, height: H }, hasTouch:true });
const errs=[]; p.on("pageerror",e=>errs.push(String(e)));
await p.goto("http://localhost:3123/juego-psicoestadistica/", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
const seen=new Set();
async function medir(tag){
  const r=await p.evaluate(()=>{
    const R=s=>{const e=document.querySelector(s); if(!e) return null; const r=e.getBoundingClientRect(); return {t:Math.round(r.top),b:Math.round(r.bottom),l:Math.round(r.left),r:Math.round(r.right)}};
    const pn=document.querySelector('.mesa-panel');
    const small=[...document.querySelectorAll('.mesa *')].filter(e=>e.children.length===0&&e.textContent.trim()&&parseFloat(getComputedStyle(e).fontSize)<12).length;
    return {vh:innerHeight,mesa:R('.mesa'),panel:R('.mesa-panel'),tubos:R('.mesa-tubos'),sonido:R('.mesa-sonido'),cero:R('.mesa-reiniciar'),canvas:R('canvas'),
      scrollable:pn.scrollHeight>pn.clientHeight+2, sh:pn.scrollHeight, ch:pn.clientHeight, st:pn.scrollTop, small,
      txt:pn.innerText.slice(0,70).replace(/\n/g,' | ')};
  });
  const m=r.mesa, top=r.tubos?r.tubos.b:m.t; const libre=Math.max(0,r.panel.t-top);
  // jefa: canvas x 118..~150, y(60+dy)..; escala
  const c=r.canvas; const esc=c.r-c.l; 
  const sc=esc/160; const altoLog=(c.b-c.t)/sc; const suelo=altoLog>150?Math.round(altoLog*0.56):120; const dy=suelo-120;
  const jt=c.t+(60+dy)*sc, jb=jt+ 40*sc*1; // aprox 20x? px *2
  const ov=(a,b2)=>a&&b2&&!(a.r<=b2.l||a.l>=b2.r||a.b<=b2.t||a.t>=b2.b);
  const info={tag,libre_px:libre,libre_pct_vh:Math.round(100*libre/r.vh),libre_pct_mesa:Math.round(100*libre/(m.b-m.t)),panel_pct_mesa:Math.round(100*(r.panel.b-r.panel.t)/(m.b-m.t)),panelTop:r.panel.t,tubos:r.tubos&&[r.tubos.t,r.tubos.b],sonidoXtubos:ov(r.sonido,r.tubos),ceroXtubos:ov(r.cero,r.tubos),sonidoXcero:ov(r.sonido,r.cero),jefaY:[Math.round(jt),Math.round(jb)],jefaTapada:jb>r.panel.t,scroll:r.scrollable&&`${r.sh}>${r.ch} st=${r.st}`,small:r.small,txt:r.txt};
  console.log(JSON.stringify(info));
  await p.screenshot({path:`${out}/v24_${W}_${tag}.png`});
}
await medir("titulo");
const orden=[".mesa-lector button:has-text('Cerrar')",".mesa-confirma button:not(.sec)","button:has-text('Ver lo que encontraste')","button:has-text('Que responda')","button:has-text('Empezar >')","button:has-text('Siguiente >')","button:has-text('Seguir >')","button:has-text('A la carpeta >')","button:has-text('Continuar >')"];
let fin=false;
for(let i=0;i<200&&!fin;i++){
  if(await p.locator("button:has-text('Repetir esta versión')").count()){await p.waitForTimeout(800);await medir("fin");fin=true;break;}
  for (const [k,sel] of [["dialogo",".mesa-dialogo"],["tubos",".mesa-tubos"],["papel",".mesa-papel"],["lector",".mesa-lector"],["decidir","text=Corcho"],["confirma",".mesa-confirma"],["reaccion",".mesa-cambio, .mesa-tarjeta"],["quepaso","text=Qué pasó"]]) { if(!seen.has(k) && await p.locator(sel+":visible").count()){ seen.add(k); await p.waitForTimeout(1000); await medir(k);} }
  let hecho=false;
  for(const s of orden){const l=p.locator(s+":visible").first(); if(await l.count()&&await l.isEnabled()){await l.click({timeout:2000}).catch(()=>{});hecho=true;break;}}
  if(!hecho){
    const pa=p.locator(".mesa-papel:not(.abierto):not([disabled])").first();
    const op=p.locator(".mesa-opcion button").first();
    if(await op.count() && await p.locator("text=Corcho").count()) await op.click().catch(()=>{});
    else if(await pa.count()) await pa.click().catch(()=>{});
  }
  await p.waitForTimeout(150);
}
console.log("fin",fin,"vistos",[...seen].join(","),"errs",JSON.stringify(errs.slice(0,3)));
await b.close();
