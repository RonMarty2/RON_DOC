"""Corta un tramo de una pista cruda de Flow Music y lo deja como mp3 liviano que se repite sin salto (07-sonido.md S.6.4 y S.6.5).

Uso:
  python cortar_tramo.py <crudo.wav> <inicio_s> <compases> <bpm> <salida.mp3> [--una-vez] [--fundido-ms 150]

 - El tramo dura exactamente `compases` compases a `bpm` (compás = 4 pulsos). El inicio se ajusta al pulso más cercano.
 - Para un bucle, el final se mezcla con el principio con un fundido cruzado de potencia constante (`--fundido-ms`, 150 por
   defecto): lo que suena después del final es el principio, así que al repetirse no hay salto.
 - Con `--una-vez` (el remate, la cola) no hay bucle: solo entrada y salida suaves de 30 ms y 250 ms.
 - Se mide el salto de volumen en el empalme (debe ser pequeño) y el pico; se iguala el volumen a -18 LUFS (todas las pistas
   suenan parecido, y el motor del juego pone el volumen final); sale mp3 estéreo a 96 kbps.
 - No hace nada con el archivo original. Imprime el resultado; que suene bien lo decide el oído de Ronald.

Se corre con `python` (no `python -I`). Los .py con rutas o barras se corren desde archivo, nunca por -c ni heredoc.
"""
import argparse
import os
import subprocess
import sys
import tempfile

import librosa
import numpy as np
import soundfile as sf

FFMPEG = os.environ.get("FFMPEG", r"C:\ffmpeg\bin\ffmpeg.exe")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("crudo")
    ap.add_argument("inicio", type=float)
    ap.add_argument("compases", type=int)
    ap.add_argument("bpm", type=float)
    ap.add_argument("salida")
    ap.add_argument("--una-vez", action="store_true")
    ap.add_argument("--fundido-ms", type=float, default=150.0)
    ap.add_argument("--buscar-hasta", type=float, default=0.0, help="busca el mejor inicio entre `inicio` y este segundo (por compases enteros)")
    a = ap.parse_args()

    y, sr = sf.read(a.crudo, always_2d=True)
    y = y.T.astype(np.float64)  # (canales, muestras)
    mono = y.mean(axis=0)
    compas = 4 * 60.0 / a.bpm
    largo = int(round(a.compases * compas * sr))

    # Ajusta el inicio al pulso más cercano (los pulsos se miden sobre la pista, no se suponen).
    _, pulsos = librosa.beat.beat_track(y=mono.astype(np.float32), sr=sr, units="time", start_bpm=a.bpm * 2)
    inicio = a.inicio if len(pulsos) == 0 else float(pulsos[int(np.argmin(np.abs(pulsos - a.inicio)))])
    xf = int(sr * a.fundido_ms / 1000)
    v50 = int(sr * 0.05)

    def salto_en(ini_s: float) -> float:
        k = int(round(ini_s * sr))
        if k + largo + xf > y.shape[1]:
            return 1e9
        fin = y[:, k + largo - v50 : k + largo]
        ini = y[:, k : k + v50]
        return abs(20 * np.log10((np.sqrt(np.mean(fin**2)) + 1e-9) / (np.sqrt(np.mean(ini**2)) + 1e-9)))

    if a.buscar_hasta > a.inicio and not a.una_vez:
        candidatos = [float(pulsos[int(np.argmin(np.abs(pulsos - (a.inicio + k * compas))))]) for k in range(int((a.buscar_hasta - a.inicio) / compas) + 1)] if len(pulsos) else [a.inicio]
        mejor = min(candidatos, key=salto_en)
        print(f"búsqueda: {len(candidatos)} candidatos, el mejor empieza en {mejor:.2f} s (salto {salto_en(mejor):.1f} dB; el pedido daba {salto_en(inicio):.1f} dB)")
        inicio = mejor
    i0 = int(round(inicio * sr))
    if i0 + largo + xf > y.shape[1]:
        print("ERROR: el tramo no cabe en la pista")
        return 1

    seg = y[:, i0 : i0 + largo + xf].copy()
    if a.una_vez:
        out = seg[:, :largo].copy()
        fi, fo = int(sr * 0.03), int(sr * 0.25)
        out[:, :fi] *= np.linspace(0, 1, fi)
        out[:, -fo:] *= np.linspace(1, 0, fo)
        salto = 0.0
    else:
        t = np.linspace(0, np.pi / 2, xf)
        sube, baja = np.sin(t), np.cos(t)  # potencia constante
        out = seg[:, :largo].copy()
        out[:, :xf] = seg[:, :xf] * sube + seg[:, largo : largo + xf] * baja
        # Salto en el empalme: diferencia de volumen entre el final y el principio, en ventanas de 50 ms.
        v = int(sr * 0.05)
        fin_rms = float(np.sqrt(np.mean(out[:, -v:] ** 2)))
        ini_rms = float(np.sqrt(np.mean(out[:, :v] ** 2)))
        salto = abs(20 * np.log10((fin_rms + 1e-9) / (ini_rms + 1e-9)))

    with tempfile.TemporaryDirectory() as tmp:
        wav = os.path.join(tmp, "tramo.wav")
        sf.write(wav, out.T.astype(np.float32), sr, subtype="FLOAT")
        os.makedirs(os.path.dirname(os.path.abspath(a.salida)), exist_ok=True)
        tmp_mp3 = a.salida + ".tmp.mp3"
        cmd = [FFMPEG, "-y", "-loglevel", "error", "-i", wav, "-af", "loudnorm=I=-18:TP=-1.5:LRA=11", "-ar", "44100", "-ac", "2", "-b:a", "96k", tmp_mp3]
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode != 0:
            print("ERROR de ffmpeg:", r.stderr[:300])
            return 1
        os.replace(tmp_mp3, a.salida)

    kb = os.path.getsize(a.salida) / 1024
    print(f"{os.path.basename(a.salida)}: inicio {inicio:.3f} s (pedido {a.inicio:.3f}), {a.compases} compases = {largo / sr:.2f} s, {kb:.0f} KB"
          + ("" if a.una_vez else f", salto en el empalme {salto:.1f} dB") + ("  [AVISO: supera 3 dB]" if salto > 3 else "") + ("  [AVISO: supera 400 KB]" if kb > 400 else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
