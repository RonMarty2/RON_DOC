// Mide una lámina abierta en el navegador: recorre todas sus tarjetas y avisa
// si alguna necesita desplazarse por dentro, si la página se sale de costado o
// si una fórmula no se pudo dibujar. En la última tarjeta responde la práctica
// y pide varios ejercicios nuevos, que cambian de largo.
//
// Lo que no se puede probar sin navegador (el tamaño real de cada tarjeta) se
// mide con esto; lo demás lo revisa `src/app/laminas.test.tsx` en el deploy.
//
// Uso: abrir la lámina con el tamaño a medir (375×812 celular, 1366×768
// proyector) y pegar este archivo entero en la consola, o pasarlo a la
// herramienta de JavaScript del navegador de Claude Code. Devuelve un informe;
// "problemas" vacío significa que entra bien.
(async () => {
  const pausa = (ms) => new Promise((r) => setTimeout(r, ms));
  const tecla = (key) => window.dispatchEvent(new KeyboardEvent("keydown", { key }));
  const tarjeta = () => document.querySelector("article");
  const problemas = [];

  // Sin animaciones, para medir la tarjeta ya quieta.
  const estilo = document.createElement("style");
  estilo.textContent = "*,*::before,*::after{animation:none!important;transition:none!important}";
  document.head.append(estilo);

  function medir(donde) {
    const a = tarjeta();
    if (!a) return problemas.push(`${donde}: no hay tarjeta`);
    const sobra = a.scrollHeight - a.clientHeight;
    if (sobra > 1) problemas.push(`${donde}: se desplaza ${sobra}px por dentro`);
    if (document.documentElement.scrollWidth > innerWidth + 1) problemas.push(`${donde}: la página se sale de costado`);
    const rotas = a.querySelectorAll(".katex-error").length;
    if (rotas) problemas.push(`${donde}: ${rotas} fórmula(s) con error`);
  }

  tecla("Home");
  await pausa(300);
  const total = document.querySelectorAll('nav[aria-label="Tarjetas de la lámina"] button').length;
  for (let i = 0; i < total; i++) {
    if (i > 0) tecla("ArrowRight");
    await pausa(250);
    medir(`${i + 1}. ${tarjeta()?.querySelector("h2")?.textContent}`);
  }

  // Práctica: responder y pedir otro, varias veces.
  for (let ronda = 1; ronda <= 6; ronda++) {
    const opcion = [...tarjeta().querySelectorAll("button")].find((b) => !/Otro ejercicio/.test(b.textContent));
    if (!opcion) break;
    opcion.click();
    await pausa(250);
    medir(`práctica, ronda ${ronda} respondida`);
    const otro = [...tarjeta().querySelectorAll("button")].find((b) => /Otro ejercicio/.test(b.textContent));
    if (!otro) break;
    otro.click();
    await pausa(250);
    medir(`práctica, ronda ${ronda + 1}`);
  }

  estilo.remove();
  tecla("Home");
  return { lamina: location.pathname, pantalla: `${innerWidth}×${innerHeight}`, tarjetas: total, problemas };
})();
