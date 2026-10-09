"""Mide una pista cruda de Flow Music para decidir dónde cortar sus tramos (07-sonido.md S.6.5).

Uso:  python analizar_pista.py <archivo.wav> [bpm_esperado]
Imprime: duración, tempo medido, primer pulso, los silencios (huecos casi mudos, que es como Flow separa las secciones) y la
energía por compás. Guarda un espectrograma .png al lado del archivo. No modifica nada.

Claude no «oye» la pista: mide. Que suene bien lo decide el oído de Ronald.
Se corre con `python` (no `python -I`: librosa vive en el espacio del usuario).
"""
import os
import sys

import librosa
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 1
    ruta = sys.argv[1]
    bpm_esperado = float(sys.argv[2]) if len(sys.argv) > 2 else None
    y, sr = librosa.load(ruta, sr=None, mono=True)
    dur = len(y) / sr
    print(f"archivo: {os.path.basename(ruta)}  duración: {dur:.2f} s  sr: {sr}")

    tempo, pulsos = librosa.beat.beat_track(y=y, sr=sr, units="time")
    tempo = float(np.atleast_1d(tempo)[0])
    print(f"tempo medido: {tempo:.1f} BPM" + (f"  (esperado {bpm_esperado:g})" if bpm_esperado else ""))
    print(f"primer pulso: {pulsos[0]:.3f} s" if len(pulsos) else "sin pulsos detectados")

    salto = 512
    rms = librosa.feature.rms(y=y, hop_length=salto)[0]
    t = librosa.frames_to_time(np.arange(len(rms)), sr=sr, hop_length=salto)
    tope = float(np.percentile(rms, 95))
    mudo = rms < tope * 0.04
    huecos = []
    i = 0
    while i < len(mudo):
        if mudo[i]:
            j = i
            while j < len(mudo) and mudo[j]:
                j += 1
            if t[min(j, len(t) - 1)] - t[i] >= 0.35:
                huecos.append((float(t[i]), float(t[min(j, len(t) - 1)])))
            i = j
        else:
            i += 1
    print("silencios (≥0,35 s):", [f"{a:.2f}–{b:.2f}" for a, b in huecos] or "ninguno")

    bpm = bpm_esperado or tempo
    compas = 4 * 60.0 / bpm
    print(f"compás ≈ {compas:.3f} s con {bpm:.1f} BPM")
    n = int(dur // compas)
    energia = []
    for k in range(n):
        a, b = int(k * compas * sr), int((k + 1) * compas * sr)
        energia.append(float(np.sqrt(np.mean(y[a:b] ** 2))))
    e = np.array(energia)
    print("energía por compás (0–9):", "".join(str(min(9, int(10 * v / (e.max() + 1e-9)))) for v in e))

    plt.figure(figsize=(12, 4))
    S = librosa.amplitude_to_db(np.abs(librosa.stft(y, hop_length=1024)), ref=np.max)
    librosa.display.specshow(S, sr=sr, hop_length=1024, x_axis="time", y_axis="log")
    for a, b in huecos:
        plt.axvspan(a, b, color="red", alpha=0.25)
    plt.tight_layout()
    png = os.path.splitext(ruta)[0] + "-espectro.png"
    plt.savefig(png, dpi=80)
    print("espectrograma:", png)
    return 0


if __name__ == "__main__":
    import librosa.display  # noqa: F401  (se importa aquí para que el modo sin gráficos no lo exija)

    sys.exit(main())
