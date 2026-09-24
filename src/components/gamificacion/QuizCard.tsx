'use client';

import React, { useState } from 'react';
import type { PreguntaQuiz } from '@/lib/gamificacion/types';

interface QuizCardProps {
  pregunta: PreguntaQuiz;
  onAnswer: (esCorrecta: boolean, detalles: any) => void;
  mostrarFeedback: boolean;
  respondida: boolean;
}

export function QuizCard({ pregunta, onAnswer, mostrarFeedback, respondida }: QuizCardProps) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [selectedMultiple, setSelectedMultiple] = useState<Set<number>>(new Set());
  const [matches, setMatches] = useState<Record<number, string>>({}); // index -> right text

  const handleSingleSelect = (index: number) => {
    if (respondida) return;
    setSelectedOptionIndex(index);
    const esCorrecta = pregunta.opciones?.[index]?.esCorrecta || false;
    onAnswer(esCorrecta, { selectedIndex: index });
  };

  const handleMultipleSelectToggle = (index: number) => {
    if (respondida) return;
    const newSet = new Set(selectedMultiple);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setSelectedMultiple(newSet);
  };

  const submitMultiple = () => {
    if (respondida) return;
    let correct = true;
    let anyMissed = false;
    pregunta.opciones?.forEach((opt, idx) => {
      if (opt.esCorrecta && !selectedMultiple.has(idx)) {
        correct = false;
        anyMissed = true;
      }
      if (!opt.esCorrecta && selectedMultiple.has(idx)) correct = false;
    });
    onAnswer(correct, { selectedMultiple: Array.from(selectedMultiple) });
  };

  const handleMatchSelect = (leftIndex: number, rightValue: string) => {
    if (respondida) return;
    setMatches(prev => ({ ...prev, [leftIndex]: rightValue }));
  };

  const submitMatches = () => {
    if (respondida) return;
    let correct = true;
    pregunta.parejas?.forEach((pareja, idx) => {
      if (matches[idx] !== pareja.derecha) correct = false;
    });
    onAnswer(correct, { matches });
  };

  const renderOpcionMultiple = () => {
    return (
      <div className="flex flex-col gap-3 mt-6">
        {pregunta.opciones?.map((opcion, index) => {
          const isSelected = selectedOptionIndex === index;
          let statusClass = "border-slate-200 bg-white hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800";
          
          if (respondida) {
            if (opcion.esCorrecta) {
              statusClass = "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 dark:bg-emerald-900/20";
            } else if (isSelected && !opcion.esCorrecta) {
              statusClass = "border-red-500 bg-red-50 ring-1 ring-red-500 dark:bg-red-900/20";
            } else {
              statusClass = "border-slate-200 bg-slate-50 opacity-60 dark:border-slate-800 dark:bg-slate-900";
            }
          } else if (isSelected) {
            statusClass = "border-blue-500 bg-blue-50 ring-1 ring-blue-500 dark:bg-blue-900/20";
          }

          return (
            <button
              key={index}
              onClick={() => handleSingleSelect(index)}
              disabled={respondida}
              className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${statusClass}`}
            >
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                respondida && opcion.esCorrecta ? 'border-emerald-500 bg-emerald-500 text-white' :
                respondida && isSelected ? 'border-red-500 bg-red-500 text-white' :
                isSelected ? 'border-blue-500 bg-blue-500 text-white' : 'border-slate-300 dark:border-slate-600'
              }`}>
                {respondida && opcion.esCorrecta && "✓"}
                {respondida && isSelected && !opcion.esCorrecta && "✕"}
                {!respondida && isSelected && "•"}
              </div>
              <span className="text-slate-700 dark:text-slate-200">{opcion.texto}</span>
            </button>
          );
        })}
      </div>
    );
  };

  const renderVerdaderoFalso = () => {
    return (
      <div className="flex gap-4 mt-6">
        {[true, false].map((val) => {
          const isSelected = selectedOptionIndex === (val ? 1 : 0); // 1 for true, 0 for false purely as index mapping
          const isCorrect = pregunta.respuestaVF === val;
          let statusClass = "border-slate-200 bg-white hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800";
          
          if (respondida) {
            if (isCorrect) {
              statusClass = "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 dark:bg-emerald-900/20";
            } else if (isSelected && !isCorrect) {
              statusClass = "border-red-500 bg-red-50 ring-1 ring-red-500 dark:bg-red-900/20";
            } else {
              statusClass = "border-slate-200 bg-slate-50 opacity-60 dark:border-slate-800 dark:bg-slate-900";
            }
          } else if (isSelected) {
            statusClass = "border-blue-500 bg-blue-50 ring-1 ring-blue-500 dark:bg-blue-900/20";
          }

          return (
            <button
              key={val.toString()}
              onClick={() => {
                if(respondida) return;
                setSelectedOptionIndex(val ? 1 : 0);
                onAnswer(val === pregunta.respuestaVF, { selected: val });
              }}
              disabled={respondida}
              className={`flex-1 flex flex-col items-center justify-center gap-2 rounded-xl border p-6 transition-all ${statusClass}`}
            >
              <span className="text-2xl font-bold">{val ? "Verdadero" : "Falso"}</span>
            </button>
          );
        })}
      </div>
    );
  };

  const renderSeleccionMultiple = () => {
    return (
      <div className="flex flex-col gap-3 mt-6">
        {pregunta.opciones?.map((opcion, index) => {
          const isSelected = selectedMultiple.has(index);
          let statusClass = "border-slate-200 bg-white hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800";
          
          if (respondida) {
            if (opcion.esCorrecta) {
              statusClass = "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 dark:bg-emerald-900/20";
            } else if (isSelected && !opcion.esCorrecta) {
              statusClass = "border-red-500 bg-red-50 ring-1 ring-red-500 dark:bg-red-900/20";
            } else {
              statusClass = "border-slate-200 bg-slate-50 opacity-60 dark:border-slate-800 dark:bg-slate-900";
            }
          } else if (isSelected) {
            statusClass = "border-blue-500 bg-blue-50 ring-1 ring-blue-500 dark:bg-blue-900/20";
          }

          return (
            <button
              key={index}
              onClick={() => handleMultipleSelectToggle(index)}
              disabled={respondida}
              className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${statusClass}`}
            >
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border ${
                respondida && opcion.esCorrecta ? 'border-emerald-500 bg-emerald-500 text-white' :
                respondida && isSelected ? 'border-red-500 bg-red-500 text-white' :
                isSelected ? 'border-blue-500 bg-blue-500 text-white' : 'border-slate-300 dark:border-slate-600'
              }`}>
                {(isSelected || (respondida && opcion.esCorrecta)) && "✓"}
              </div>
              <span className="text-slate-700 dark:text-slate-200">{opcion.texto}</span>
            </button>
          );
        })}
        {!respondida && (
          <button
            onClick={submitMultiple}
            className="mt-4 rounded-xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            Confirmar Selección
          </button>
        )}
      </div>
    );
  };

  const renderEmparejamiento = () => {
    // Unique right options for the dropdowns
    const rightOptions = Array.from(new Set(pregunta.parejas?.map(p => p.derecha) || []));
    
    return (
      <div className="flex flex-col gap-4 mt-6">
        {pregunta.parejas?.map((pareja, index) => {
          const selectedVal = matches[index] || "";
          const isCorrect = respondida ? selectedVal === pareja.derecha : null;
          
          return (
            <div key={index} className="flex flex-col md:flex-row gap-4 items-center rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
              <div className="flex-1 font-medium text-slate-700 dark:text-slate-200">
                {pareja.izquierda}
              </div>
              <div className="flex-1 w-full relative">
                <select
                  value={selectedVal}
                  onChange={(e) => handleMatchSelect(index, e.target.value)}
                  disabled={respondida}
                  className={`w-full appearance-none rounded-lg border p-3 pr-10 outline-none transition-all ${
                    respondida && isCorrect === true ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-300' :
                    respondida && isCorrect === false ? 'border-red-500 bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-300' :
                    'border-slate-300 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-900'
                  }`}
                >
                  <option value="" disabled>Selecciona una opción...</option>
                  {rightOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {respondida && isCorrect !== null && (
                  <div className={`absolute right-3 top-1/2 -translate-y-1/2 font-bold ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                    {isCorrect ? '✓' : '✕'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {!respondida && (
          <button
            onClick={submitMatches}
            disabled={Object.keys(matches).length !== pregunta.parejas?.length}
            className="mt-4 rounded-xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            Confirmar Respuestas
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          {pregunta.tipo.replace('-', ' ')}
        </span>
        <h2 className="mt-4 font-serif text-2xl md:text-3xl font-medium text-slate-900 dark:text-white leading-relaxed">
          {pregunta.enunciado}
        </h2>
      </div>

      {pregunta.tipo === 'opcion-multiple' && renderOpcionMultiple()}
      {pregunta.tipo === 'verdadero-falso' && renderVerdaderoFalso()}
      {pregunta.tipo === 'seleccion-multiple' && renderSeleccionMultiple()}
      {pregunta.tipo === 'emparejamiento' && renderEmparejamiento()}

      {mostrarFeedback && pregunta.feedbackGeneral && respondida && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900/50 dark:bg-blue-950/30">
          <h4 className="flex items-center gap-2 font-bold text-blue-800 dark:text-blue-300">
            <span>💡</span> Feedback
          </h4>
          <p className="mt-2 text-sm text-blue-900 dark:text-blue-100">
            {pregunta.feedbackGeneral}
          </p>
        </div>
      )}
    </div>
  );
}
