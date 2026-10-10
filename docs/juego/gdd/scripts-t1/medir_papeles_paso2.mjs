// Paso 2 (papeles sueltos): juega hasta los papeles del paso 1 y del caso 2, mide la oficina libre y saca capturas.
// Uso: node medir_papeles_paso2.mjs W H carpetaDeSalida   (con `next dev -p 3123` andando)
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const [W,H,out]=[+process.argv[2],+process.argv[3],process.argv[4]];
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: W, height: H }, hasTouch:true });
const errs=[]; p.on("pageerror",e=>errs.push(String(e))); p.on("console",m=>{if(m.type()==="error")errs.push(m.text())});
await p.goto("http://localhost:3123/juego-psicoestadistica/", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
const click=async s=>{const l=p.locator(s+":visible").first(); await l.click({timeout:3000}); await p.waitForTimeout(250)};
async function medir(tag){
  await p.waitForTimeout(700);
  const r=await p.evaluate(()=>{
    const R=s=>{const e=document.querySelector(s); if(!e) return null; const r=e.getBoundingClientRect(); return {t:Math.round(r.top),b:Math.round(r.bottom),h:Math.round(r.height)}};
    const pp=[...document.querySelectorAll('.mesa-pp')].map(e=>{const r=e.getBoundingClientRect();return {w:Math.round(r.width),h:Math.round(r.height)}});
    const small=[...document.querySelectorAll('.mesa *')].filter(e=>e.children.length===0&&e.textContent.trim()&&parseFloat(getComputedStyle(e).fontSize)<12).length;
    return {vh:innerHeight,tubos:R('.mesa-tubos'),papeles:R('.mesa-papeles'),panel:R('.mesa-panel'),n:pp.length,minw:Math.min(...pp.map(x=>x.w)),minh:Math.min(...pp.map(x=>x.h)),small,obj:document.querySelector('.mesa-objetivo')?.innerText};
  });
  const top=r.tubos?r.tubos.b:60; const bajo=(r.papeles||r.panel)?.t ?? r.vh; 
  console.log(JSON.stringify({tag,W,H,libre_px:bajo-top,libre_pct:Math.round(100*(bajo-top)/r.vh),...r}));
  await p.screenshot({path:`${out}/p2_${W}x${H}_${tag}.png`});
}
await click("button:has-text('Empezar >')");
for(let i=0;i<2;i++){await click("button:has-text('Siguiente >')").catch(()=>{});}
// intenta pasar los diálogos hasta la hoja
for(let i=0;i<12;i++){ if(await p.locator("button:has-text('Que responda')").count()) break; const n=p.locator("button:has-text('Siguiente >'):visible"); if(await n.count()) await n.first().click(); else { const s=p.locator("button:has-text('Seguir >'):visible"); if(await s.count()) await s.first().click(); } await p.waitForTimeout(200); }
await click("button:has-text('Que responda')");
for(let i=0;i<10 && !(await p.locator("button:has-text('A los papeles')").count());i++){ const n=p.locator("button:has-text('Siguiente >'):visible"); if(await n.count()) await n.first().click(); else { const s=p.locator("button:has-text('Seguir >'):visible"); if(await s.count()) await s.first().click(); } await p.waitForTimeout(200); }
await medir("intro1");
await click("button:has-text('A los papeles')");
await medir("papeles1");
// abre el papel clave hasta que aparezca el hallazgo
for(let i=0;i<4;i++){ if(await p.locator("button:has-text('Ver lo que encontraste')").count()||await p.locator("text=Archivo, ").count()) break;
  const pa=p.locator(".mesa-pp:not(.leido):not([disabled])").first(); if(!(await pa.count())) break; await pa.click(); await p.waitForTimeout(300); await medir("lector1"); for(let k=0;k<4 && await p.locator(".mesa-lector").count();k++){ await p.locator(".mesa-lector button").last().click().catch(()=>{}); await p.waitForTimeout(400);} }
await medir("papeles1_leidos");
// avanza hasta el caso 2
for(let i=0;i<60 && !(await p.locator("button:has-text('A los papeles')").count());i++){
  for(const s of ["button:has-text('Ver lo que encontraste')","button:has-text('Siguiente >')","button:has-text('Seguir >')","button:has-text('A la carpeta >')"]){const l=p.locator(s+":visible").first(); if(await l.count()){await l.click().catch(()=>{});break;}}
  await p.waitForTimeout(150);
}
await medir("intro2");
await click("button:has-text('A los papeles')");
await medir("papeles2");
await p.locator(".mesa-pp:not([disabled])").first().click(); await p.waitForTimeout(300);
for(let k=0;k<4 && await p.locator(".mesa-lector").count();k++){ await p.locator(".mesa-lector button").last().click().catch(()=>{}); await p.waitForTimeout(400);}
await medir("papeles2_leido");
await click("button:has-text('Decidir el informe')");
await medir("decidir");
console.log("errs",JSON.stringify(errs.slice(0,4)));
await b.close();
