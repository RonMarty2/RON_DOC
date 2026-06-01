// Genera los íconos PNG de la PWA a partir de un SVG inline.
// Uso: node scripts/generar-iconos.mjs
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#g)"/>
  <text x="50%" y="54%"
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="'Source Serif 4','Source Serif Pro',Georgia,serif"
        font-size="320"
        font-weight="600"
        fill="#f8fafc"
        letter-spacing="-12">R</text>
  <circle cx="384" cy="384" r="36" fill="#3b82f6"/>
</svg>
`;

const salida = path.resolve("public/icons");
mkdirSync(salida, { recursive: true });

const tamanios = [
  { size: 192, nombre: "icon-192.png" },
  { size: 512, nombre: "icon-512.png" },
  { size: 180, nombre: "apple-touch-icon.png" },
  { size: 32, nombre: "favicon-32.png" },
];

for (const { size, nombre } of tamanios) {
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(path.join(salida, nombre));
  console.log(`✓ ${nombre} (${size}x${size})`);
}

// SVG maskable + monochrome para Android adaptive icons
writeFileSync(path.join(salida, "icon.svg"), svg.trim());
console.log("✓ icon.svg");
