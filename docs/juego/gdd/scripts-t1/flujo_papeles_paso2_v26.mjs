// v26: recorre el paso 2 (flujo, 0 fichas, 0 papeles, Todavia no, retomar) y mide donde quedan los botones de Decidir.
// Uso: node flujo_papeles_paso2_v26.mjs W H carpetaDeSalida  (con next dev -p 3123)
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const [W,H,out]=[+process.argv[2],+process.argv[3],process.argv[4]];
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"] });
const ctx = await b.newContext({ viewport: { width: W, height: H }, hasTouch:true });
const p = await ctx.newPage();
const log=(...a)=>console.log(...a);
const vis=s=>p.locator(s+":visible");
async function paso(){ for(const s of ["button:has-text('A los papeles')","button:has-text('Ver lo que encontraste')","button:has-text('Siguiente >')","button:has-text('Seguir >')","button:has-text('A la carpeta >')","button:has-text('Que responda')"]){const l=vis(s).first(); if(await l.count()){await l.click().catch(()=>{});return s}} return null }
async function hastaCaso2(){
  await p.goto("http://localhost:3123/juego-psicoestadistica/",{waitUntil:"networkidle"}); await p.waitForTimeout(1200);
  await vis("button:has-text('Empezar >')").first().click(); await p.waitForTimeout(200);
  let n=0;
  for(let i=0;i<80;i++){
    if(await vis(".mesa-pp").count()){ // papeles en pantalla
      if(await p.locator(".mesa-objetivo",{hasText:"cero"}).count()) return true;
      // paso 1: abrir hasta encontrar sueno
      const pa=vis(".mesa-pp:not(.leido):not([disabled])").first(); if(await pa.count()){await pa.click(); await p.waitForTimeout(250); for(let k=0;k<4&&await p.locator(".mesa-lector").count();k++){await p.locator(".mesa-lector button").last().click().catch(()=>{}); await p.waitForTimeout(250);} continue;}
    }
    await paso(); await p.waitForTimeout(150);
  }
  return false;
}
const ok=await hastaCaso2(); log("caso2 listo",ok);
const snap=async t=>{await p.waitForTimeout(500); await p.screenshot({path:`${out}/v26_${W}_${t}.png`})};
// 0 papeles: Decidir directo
await snap("papeles2_cero");
log("nota 0 papeles:", await p.locator(".mesa-papeles-nota").innerText());
await vis("button:has-text('Decidir el informe')").first().click(); await p.waitForTimeout(400);
const geo=async()=>p.evaluate(()=>{const pa=document.querySelector('.mesa-panel'); const bt=[...document.querySelectorAll('.mesa-opcion .mesa-boton')].map(e=>Math.round(e.getBoundingClientRect().top)); const r=pa.getBoundingClientRect(); return {panelTop:Math.round(r.top),panelBottom:Math.round(r.bottom),scrollH:pa.scrollHeight,clientH:pa.clientHeight,botonesTop:bt,vh:innerHeight, texto:pa.innerText.slice(0,260)}});
log("decidir 0 papeles", JSON.stringify(await geo()));
await snap("decidir_cero");
// Todavia no con 0 papeles
await vis(".mesa-opcion .mesa-boton").first().scrollIntoViewIfNeeded(); await vis(".mesa-opcion .mesa-boton").first().click(); await p.waitForTimeout(400);
log("confirma 0 papeles:", (await p.locator("[role=alertdialog]").last().innerText()).replace(/\n/g," | "));
await snap("confirma_cero");
await vis("button:has-text('Todavía no')").first().click().catch(async()=>{log("no hay 'Todavía no'; botones:", await p.locator("[role=alertdialog] button").allInnerTexts())});
await p.waitForTimeout(300);
log("tras Todavía no, hay corcho?", await p.locator(".mesa-corcho").count(), "hay papeles lista?", await p.locator(".mesa-papeles-lista").count());
await vis("button:has-text('Volver a los papeles')").first().click(); await p.waitForTimeout(300);
log("tras Volver, lista papeles:", await p.locator(".mesa-pp").count());
// abrir los 3 papeles
for(let i=0;i<3;i++){ await vis(".mesa-pp:not(.leido):not([disabled])").first().click(); await p.waitForTimeout(250); await snap("lector"+i); for(let k=0;k<4&&await p.locator(".mesa-lector").count();k++){await p.locator(".mesa-lector button").last().click().catch(()=>{}); await p.waitForTimeout(250);} }
log("nota con 0 fichas:", await p.locator(".mesa-papeles-nota").innerText(), "| bloqueados:", await p.locator(".mesa-pp.bloq").count(), "| disabled aria:", await p.locator(".mesa-pp.bloq").first().getAttribute("aria-label"));
await snap("cero_fichas");
// pulsa un bloqueado
await vis(".mesa-pp.bloq").first().click({force:true,timeout:2000}).catch(()=>log("bloqueado: no se puede pulsar"));
await snap("cero_fichas_pulsa");
// releer uno ya leido
await vis(".mesa-pp.leido").first().click(); await p.waitForTimeout(300); log("releer abre lector:", await p.locator(".mesa-lector").count());
for(let k=0;k<4&&await p.locator(".mesa-lector").count();k++){await p.locator(".mesa-lector button").last().click().catch(()=>{}); await p.waitForTimeout(250);}
// decidir con 3 papeles
await vis("button:has-text('Decidir el informe')").first().click(); await p.waitForTimeout(400);
log("decidir 3 papeles", JSON.stringify(await geo()));
await snap("decidir_tres");
// retomar a mitad: recargar
await p.reload({waitUntil:"networkidle"}); await p.waitForTimeout(1200);
log("tras recarga, botones:", (await p.locator("button:visible").allInnerTexts()).join(" | ").slice(0,300));
await snap("recarga");
const r=vis("button:has-text('Seguir')").first(); 
for(const t of ["Retomar","Seguir donde","Continuar"]){const l=vis(`button:has-text('${t}')`).first(); if(await l.count()){log("click",t); await l.click(); break;}}
await p.waitForTimeout(1500); await snap("retomada");
log("retomada: lista", await p.locator(".mesa-pp").count(), "leidos", await p.locator(".mesa-pp.leido").count(), "bloq", await p.locator(".mesa-pp.bloq").count(), "intro?", await p.locator(".mesa-dialogo").count(), "obj:", await p.locator(".mesa-objetivo").allInnerTexts());
await b.close();
