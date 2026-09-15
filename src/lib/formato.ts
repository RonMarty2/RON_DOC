/** Montos como se escriben en Bolivia: punto de miles y coma decimal. Enteros sin decimales, salvo que se pidan. */
export function bs(x: number, decimales = Math.abs(x - Math.round(x)) < 0.005 ? 0 : 2): string {
  const [entero, dec] = Math.abs(x).toFixed(decimales).split(".");
  const signo = x < 0 && Number(Math.abs(x).toFixed(decimales)) !== 0 ? "−" : "";
  return signo + entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (dec ? `,${dec}` : "");
}

export function pct(x: number, decimales = 2): string {
  return `${bs(x * 100, decimales)}%`;
}

/** Para meter un número ya formateado dentro de $...$: KaTeX separa la coma si no va entre llaves y lee % como comentario. */
export function tex(s: string): string {
  return s.replace(/,/g, "{,}").replace(/%/g, "\\%").replace(/−/g, "-");
}
