// Anualidades: cuotas iguales R a tasa i por período durante n períodos. Vencida = al final de cada período.

function factorAnticipada(tasa: number, anticipada: boolean): number {
  return anticipada ? 1 + tasa : 1;
}

/** Valor futuro: VF = R·[(1+i)^n − 1]/i, por (1+i) si es anticipada. */
export function valorFuturoAnualidad(cuota: number, tasa: number, periodos: number, anticipada = false): number {
  const base = tasa === 0 ? cuota * periodos : (cuota * (Math.pow(1 + tasa, periodos) - 1)) / tasa;
  return base * factorAnticipada(tasa, anticipada);
}

/** Valor presente: VP = R·[1 − (1+i)^−n]/i, por (1+i) si es anticipada. */
export function valorPresenteAnualidad(cuota: number, tasa: number, periodos: number, anticipada = false): number {
  const base = tasa === 0 ? cuota * periodos : (cuota * (1 - Math.pow(1 + tasa, -periodos))) / tasa;
  return base * factorAnticipada(tasa, anticipada);
}

/** Cuota vencida que paga un valor presente: R = VP·i/[1 − (1+i)^−n]. Es la cuota del sistema francés. */
export function cuotaDesdeValorPresente(valorPresente: number, tasa: number, periodos: number): number {
  return tasa === 0 ? valorPresente / periodos : (valorPresente * tasa) / (1 - Math.pow(1 + tasa, -periodos));
}

/** Cuota vencida que junta un valor futuro: R = VF·i/[(1+i)^n − 1]. */
export function cuotaDesdeValorFuturo(valorFuturo: number, tasa: number, periodos: number): number {
  return tasa === 0 ? valorFuturo / periodos : (valorFuturo * tasa) / (Math.pow(1 + tasa, periodos) - 1);
}
