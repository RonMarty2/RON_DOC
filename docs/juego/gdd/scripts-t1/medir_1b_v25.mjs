// Mide la pantalla 1b del boceto inmersivo. Uso: node medir_1b_v25.mjs W H N_PAPELES [nombresLargos] [dialogo] salida.png
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const [W,H,N]=[+process.argv[2],+process.argv[3],+process.argv[4]]; const largos=process.argv[5]==="1"; const dlg=process.argv[6]==="1"; const out=process.argv[7];
const b=await chromium.launch({executablePath:"/opt/pw-browsers/chromium-1194/chrome-linux/chrome"});
const p=await b.newPage({viewport:{width:W,height:H},hasTouch:true});
await p.goto("file:///home/user/RON_DOC/docs/juego/bocetos/inmersiva/index.html");
await p.setViewportSize({width:W,height:H});
const r=await p.evaluate(({W,H,N,largos,dlg})=>{
  // reconstruye el marco 1b a tamaño real de pantalla (el boceto lo dibuja en un marco de 412x860)
  const h2=[...document.querySelectorAll('h2')].find(x=>x.textContent.startsWith('1b'));
  const fr=h2.nextElementSibling.querySelector('.frame.m');
  document.body.innerHTML='';document.body.style.padding='0';document.body.appendChild(fr);
  fr.style.width=W+'px';fr.style.height=H+'px';fr.style.border='0';
  const gr=fr.querySelector('.gr'); const base=[...gr.children];
  const names=null;
  while(gr.children.length<N) gr.appendChild(base[gr.children.length%6].cloneNode(true));
  while(gr.children.length>N) gr.lastChild.remove();
  if(names)[...gr.children].forEach((b,i)=>b.querySelector('span').textContent=names[i%9]);
  if(dlg){fr.insertAdjacentHTML('beforeend','<div class="dlg"><div class="fila2"><div class="cara">cara</div><div><div class="q">LA JEFA</div><p>Antes de firmarlo, averigua cómo se contó ese cero. Mira los papeles.</p></div></div><button class="bt">Siguiente ▸</button></div>');}
  const R=e=>{const r=e.getBoundingClientRect();return {t:Math.round(r.top),b:Math.round(r.bottom),l:Math.round(r.left),r:Math.round(r.right),w:Math.round(r.width),h:Math.round(r.height)}};
  const cab=R(fr.querySelector('.cabeza')), pap=R(fr.querySelector('.papeles'));
  const bts=[...fr.querySelectorAll('.pp')].map(R);
  const dec=R(fr.querySelector('.papeles > .bt'));
  const smalls=[...fr.querySelectorAll('*')].filter(e=>e.children.length===0&&e.textContent.trim()&&parseFloat(getComputedStyle(e).fontSize)<12).length;
  const jefa=R(fr.querySelector('.jefa')), mesa=R(fr.querySelector('.mesa'));
  const d=fr.querySelector('.dlg'); const dr=d&&R(d);
  const minh=Math.min(...bts.map(x=>x.h)), minw=Math.min(...bts.map(x=>x.w));
  const overflow=bts.some(x=>x.b>H||x.r>W)||dec.b>H;
  const spanOverflow=[...fr.querySelectorAll('.pp span')].filter(s=>s.scrollWidth>s.clientWidth+1).length;
  const lines=[...fr.querySelectorAll('.pp span')].map(s=>Math.round(s.getBoundingClientRect().height/ (parseFloat(getComputedStyle(s).lineHeight)||16)));
  return {H,cab,pap,dec,filas:[...new Set(bts.map(x=>x.t))].length,minh,minw,overflow,smalls,jefa,mesa,dlg:dr,maxLineas:Math.max(...lines),
   libre_px:pap.t-cab.b,libre_pct:Math.round(100*(pap.t-cab.b)/H),cabeza_pct:Math.round(100*cab.b/H),papeles_pct:Math.round(100*(H-pap.t)/H),
   jefaTapadaPorPapeles:jefa.b>pap.t, jefaTapadaPorDlg:dr?jefa.b>dr.t:false, libreConDlg:dr?Math.round(100*(dr.t-cab.b)/H):null,
   colores:{texto:getComputedStyle(fr.querySelector('.pp')).color,bg:'rgba(244,236,214,.10) sobre oficina'}};
},{W,H,N,largos,dlg});
console.log(JSON.stringify(r));
await p.screenshot({path:out});
await b.close();
