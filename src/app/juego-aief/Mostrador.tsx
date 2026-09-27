/**
 * La agencia en pixel art, dibujada con rectángulos en una grilla de 4 px (coordenadas calculadas, no a
 * ojo): la ventanilla con el cliente que se atiende, la cola detrás y la pared de fichas del cierre.
 */

const ANCHO = 320;
const ALTO = 120;
const PISO = 96;

const TONO: Record<string, string> = {
  verde: "#8fd694",
  rojo: "#ef6f6c",
  gris: "#a79fc8",
};

/** Una persona de 12 × 28 px parada en el piso, con la cabeza de otro color. */
function Persona({ x, cuerpo, cabeza = "#f2c9a0" }: { x: number; cuerpo: string; cabeza?: string }) {
  return (
    <g>
      <rect x={x + 2} y={PISO - 28} width={8} height={8} fill={cabeza} />
      <rect x={x} y={PISO - 20} width={12} height={14} fill={cuerpo} />
      <rect x={x + 1} y={PISO - 6} width={4} height={6} fill="#15122b" />
      <rect x={x + 7} y={PISO - 6} width={4} height={6} fill="#15122b" />
    </g>
  );
}

const ROPA = ["#f2a65a", "#6fa8dc", "#c27ba0", "#93c47d", "#e69138"];

export function Mostrador({ enCola, pared }: { enCola: number; pared: string[] }) {
  const fichas = Math.max(3, pared.length);
  const lado = 14;
  const paredX = 232;
  return (
    <svg viewBox={`0 0 ${ANCHO} ${ALTO}`} role="img" aria-label={`La ventanilla: ${enCola} clientes en la cola`} shapeRendering="crispEdges" style={{ display: "block", width: "100%", height: "auto" }}>
      <rect width={ANCHO} height={ALTO} fill="#221d40" />
      <rect y={PISO} width={ANCHO} height={ALTO - PISO} fill="#3a3266" />

      {/* la ventanilla: vidrio, cartel y mostrador; la jefa detrás */}
      <rect x={16} y={24} width={72} height={48} fill="#4a3f7a" />
      <rect x={20} y={28} width={64} height={40} fill="#15122b" />
      <rect x={28} y={12} width={48} height={10} fill="#f2a65a" />
      <rect x={32} y={16} width={40} height={2} fill="#15122b" />
      <rect x={44} y={46} width={8} height={8} fill="#f2c9a0" />
      <rect x={42} y={54} width={12} height={14} fill="#8e7cc3" />
      <rect x={8} y={68} width={88} height={10} fill="#f3eee4" />
      <rect x={8} y={78} width={88} height={PISO - 78} fill="#a79fc8" />

      {/* la cola: el primero en la ventanilla, los demás detrás */}
      {Array.from({ length: Math.min(enCola, 5) }, (_, k) => (
        <Persona key={k} x={104 + k * 22} cuerpo={ROPA[k % ROPA.length]} />
      ))}

      {/* la pared del cierre */}
      <rect x={paredX - 4} y={20} width={fichas * (lado + 4) + 4} height={lado + 28} fill="#15122b" />
      <rect x={paredX} y={24} width={fichas * (lado + 4) - 4} height={6} fill="#4a3f7a" />
      {Array.from({ length: fichas }, (_, k) => (
        <rect key={k} x={paredX + k * (lado + 4)} y={36} width={lado} height={lado} fill={pared[k] ? TONO[pared[k]] : "#3a3266"} />
      ))}
    </svg>
  );
}
