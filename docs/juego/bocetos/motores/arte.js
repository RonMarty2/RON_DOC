/* Arte provisional compartido por las tres demos (mismo dibujo en todas, para comparar solo el motor).
   Todo se dibuja por código a 320x180 y se escala sin suavizar. No es el arte final. */
const ARTE = (() => {
  const W = 320, H = 180;
  const rng = (seed) => { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const lienzo = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
  const rgb = (s) => [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)];
  const mezcla = (a, b, t) => { const A = rgb(a), B = rgb(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`; };

  function cielo() {
    const c = lienzo(W, 120), g = c.getContext("2d");
    const paradas = [[0, "#14143a"], [0.45, "#3b2a68"], [0.72, "#c8506a"], [0.9, "#f08a5d"], [1, "#ffd9a0"]];
    for (let y = 0; y < 120; y++) {
      const t = y / 119; let i = 0; while (i < paradas.length - 2 && t > paradas[i + 1][0]) i++;
      const [t0, c0] = paradas[i], [t1, c1] = paradas[i + 1];
      const u = Math.min(1, Math.max(0, (t - t0) / (t1 - t0)));
      const paso = Math.round(u * 6) / 6;               // bandas, como en el pixel art de verdad
      g.fillStyle = mezcla(c0, c1, paso); g.fillRect(0, y, W, 1);
      if (Math.abs(u * 6 - Math.round(u * 6)) < 0.5 && y % 2 === 0) { g.fillStyle = mezcla(c0, c1, Math.min(1, paso + 1 / 6)); for (let x = (y / 2) % 2; x < W; x += 2) g.fillRect(x, y, 1, 1); }
    }
    const r = rng(7); for (let i = 0; i < 46; i++) { g.fillStyle = `rgba(255,255,255,${0.3 + r() * 0.6})`; g.fillRect(Math.floor(r() * W), Math.floor(r() * 62), 1, 1); }
    g.fillStyle = "#fff4cf"; g.beginPath(); g.arc(236, 104, 9, 0, 7); g.fill();
    g.fillStyle = "rgba(255,244,207,.35)"; g.beginPath(); g.arc(236, 104, 14, 0, 7); g.fill();
    return c;
  }

  function horizonte(seed, color, hmin, hmax, prob) {
    const c = lienzo(W + 40, 90), g = c.getContext("2d"), r = rng(seed);
    let x = 0;
    while (x < c.width) {
      const w = 10 + Math.floor(r() * 14), h = hmin + Math.floor(r() * (hmax - hmin)), y = 90 - h;
      g.fillStyle = color; g.fillRect(x, y, w, h);
      if (r() < 0.3) g.fillRect(x + (w >> 1), y - 6, 1, 6);
      for (let wy = y + 4; wy < 86; wy += 5) for (let wx = x + 3; wx < x + w - 3; wx += 4) if (r() < prob) { g.fillStyle = r() < 0.5 ? "#ffd27a" : "#ffe9b0"; g.fillRect(wx, wy, 2, 2); }
      x += w + (r() < 0.4 ? 2 : 0);
    }
    return c;
  }

  function suelo() {
    const c = lienzo(W, 68), g = c.getContext("2d");
    for (let y = 0; y < 68; y += 8) for (let x = 0; x < W; x += 8) { g.fillStyle = ((x + y) / 8) % 2 ? "#26403c" : "#2b4742"; g.fillRect(x, y, 8, 8); }
    g.fillStyle = "#4b4a62"; g.fillRect(0, 26, W, 6); g.fillRect(88, 0, 6, 68); g.fillRect(198, 0, 6, 68);
    g.fillStyle = "#e5d9a8"; for (let x = 4; x < W; x += 14) g.fillRect(x, 28, 7, 1);
    g.fillStyle = "#1c2f2c"; g.fillRect(0, 0, W, 2);
    return c;
  }

  function colegio(tinte) {
    const c = lienzo(18, 18), g = c.getContext("2d");
    g.fillStyle = "#d9b779"; g.fillRect(2, 8, 14, 9);
    g.fillStyle = tinte; for (let i = 0; i < 6; i++) g.fillRect(1 + i, 8 - i, 16 - 2 * i, 1);
    g.fillStyle = "#6b4a2e"; g.fillRect(8, 12, 3, 5);
    g.fillStyle = "#7fb7d6"; g.fillRect(4, 11, 2, 2); g.fillRect(13, 11, 2, 2);
    g.fillStyle = "#f4f1e6"; g.fillRect(9, 0, 1, 4); g.fillStyle = "#e0554a"; g.fillRect(10, 0, 3, 2);
    return c;
  }

  function cupula() {
    const c = lienzo(72, 64), g = c.getContext("2d");
    g.fillStyle = "#3a3558"; g.fillRect(8, 36, 56, 28); g.fillStyle = "#4d4872"; g.fillRect(8, 36, 56, 3);
    g.fillStyle = "#f7c874"; for (let x = 14; x < 60; x += 11) g.fillRect(x, 46, 5, 6);
    g.fillStyle = "#241f3c"; g.fillRect(30, 52, 12, 12);
    for (let y = 0; y < 26; y++) { const h = Math.sqrt(26 * 26 - (26 - y) * (26 - y)); g.fillStyle = y < 6 ? "#8a86bd" : y < 14 ? "#6f6ba6" : "#58548a"; g.fillRect(Math.round(36 - h), 36 - 26 + y, Math.round(h * 2), 1); }
    g.fillStyle = "#14122a"; g.fillRect(33, 10, 6, 26);
    g.save(); g.translate(40, 22); g.rotate(-0.7); g.fillStyle = "#b9c0e0"; g.fillRect(0, -3, 22, 6); g.fillStyle = "#e8ecff"; g.fillRect(0, -3, 22, 1); g.restore();
    return c;
  }

  function persona(ropa, pelo) {
    const c = lienzo(10, 18), g = c.getContext("2d");
    g.fillStyle = pelo; g.fillRect(2, 0, 6, 3); g.fillRect(1, 2, 1, 4);
    g.fillStyle = "#e9b48a"; g.fillRect(2, 3, 6, 5);
    g.fillStyle = "#2a1c18"; g.fillRect(3, 5, 1, 1); g.fillRect(6, 5, 1, 1);
    g.fillStyle = ropa; g.fillRect(1, 8, 8, 6); g.fillRect(0, 9, 1, 4); g.fillRect(9, 9, 1, 4);
    g.fillStyle = "#2f3552"; g.fillRect(2, 14, 3, 4); g.fillRect(5, 14, 3, 4);
    return c;
  }

  function mota() { const c = lienzo(5, 5), g = c.getContext("2d"); g.fillStyle = "rgba(255,240,180,.35)"; g.fillRect(1, 0, 3, 5); g.fillRect(0, 1, 5, 3); g.fillStyle = "#fff6c8"; g.fillRect(2, 2, 1, 1); return c; }

  function blob(d = 64) {
    const c = lienzo(d, d), g = c.getContext("2d"), r = d / 2, gr = g.createRadialGradient(r, r, 0, r, r, r);
    gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(0.55, "rgba(255,255,255,.9)"); gr.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = gr; g.fillRect(0, 0, d, d); return c;
  }

  function nubes() {
    const c = lienzo(W * 2, 80), g = c.getContext("2d"), r = rng(11);
    for (let i = 0; i < 90; i++) { const w = 10 + Math.floor(r() * 28), h = 4 + Math.floor(r() * 8); g.fillStyle = `rgba(215,225,245,${0.25 + r() * 0.3})`; g.fillRect(Math.floor(r() * (W * 2 - w)), Math.floor(r() * (80 - h)), w, h); }
    return c;
  }

  const COLEGIOS = [[40, 134, "#b5483b"], [112, 146, "#3f6fb0"], [150, 128, "#b5483b"], [214, 150, "#7a4fb0"], [262, 130, "#3f6fb0"], [64, 162, "#7a4fb0"], [236, 122, "#b5483b"], [296, 160, "#3f6fb0"]];
  return { W, H, cielo, horizonte, suelo, colegio, cupula, persona, mota, blob, nubes, COLEGIOS, rng, FRASE: "¿Cuántos duermen menos de 6 horas?" };
})();
