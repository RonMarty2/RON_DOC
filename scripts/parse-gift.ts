import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { 
  PreguntaQuiz, 
  OpcionQuiz, 
  ParejaQuiz, 
  BancoQuiz, 
  TipoPregunta 
} from '../src/lib/gamificacion/types';

// En caso de que se necesite __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ajusta esta ruta a tu estructura
const BASE_MATERIA_DIR = path.resolve(__dirname, '../../Psicoestadística Descriptiva');
const OUTPUT_DIR = path.resolve(__dirname, '../content/quizzes/psicoestadistica');

function readFiles(dir: string, ext: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      readFiles(fullPath, ext, fileList);
    } else if (fullPath.endsWith(ext)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function parseGiftFile(content: string, filename: string, temaNum: number): PreguntaQuiz[] {
  const questions: PreguntaQuiz[] = [];
  
  // Limpiar caracteres de escape de formato rtf o similares si los hubiera, pero GIFT usa \ para escapar
  // Separamos por preguntas. Las preguntas están separadas por líneas en blanco,
  // pero pueden contener líneas en blanco dentro. 
  // Mejor parsear buscando el patrón ::ID:: o leyendo bloque por bloque.
  
  let currentCategory = 'General';
  
  const blocks = content.split(/\n\s*\n/);
  
  for (let block of blocks) {
    block = block.trim();
    if (!block) continue;
    
    // Ignorar comentarios
    if (block.startsWith('//')) continue;
    
    // Categoría
    if (block.startsWith('$CATEGORY:')) {
      currentCategory = block.replace('$CATEGORY:', '').trim();
      continue;
    }
    
    // Es una pregunta
    if (block.includes('{') && block.includes('}')) {
      try {
        const q = parseQuestionBlock(block, filename, temaNum, currentCategory);
        if (q) questions.push(q);
      } catch (err) {
        console.warn(`[WARN] No se pudo parsear pregunta en ${filename}:\n${block}\nError: ${err}`);
      }
    }
  }
  
  return questions;
}

function parseQuestionBlock(block: string, filename: string, temaNum: number, category: string): PreguntaQuiz | null {
  // Extraer ID y Enunciado
  let id = `Q-${Math.random().toString(36).substring(2, 9)}`;
  let enunciadoStr = block;
  
  const idMatch = block.match(/^::(.*?)::/);
  if (idMatch) {
    id = idMatch[1].trim();
    enunciadoStr = block.substring(idMatch[0].length).trim();
  }
  
  const firstBrace = enunciadoStr.indexOf('{');
  const lastBrace = enunciadoStr.lastIndexOf('}');
  
  if (firstBrace === -1 || lastBrace === -1) return null;
  
  const enunciado = enunciadoStr.substring(0, firstBrace).trim();
  const optionsBlock = enunciadoStr.substring(firstBrace + 1, lastBrace).trim();
  
  // Determinar el tipo de pregunta
  if (optionsBlock === 'TRUE' || optionsBlock === 'FALSE' || optionsBlock === 'T' || optionsBlock === 'F' ||
      optionsBlock.startsWith('TRUE#') || optionsBlock.startsWith('FALSE#') || 
      optionsBlock.startsWith('T#') || optionsBlock.startsWith('F#')) {
    
    let isTrue = optionsBlock.startsWith('TRUE') || optionsBlock.startsWith('T');
    let feedback = undefined;
    
    const hashIndex = optionsBlock.indexOf('#');
    if (hashIndex !== -1) {
      feedback = optionsBlock.substring(hashIndex + 1).trim();
    }
    
    return {
      id,
      tipo: 'verdadero-falso',
      enunciado,
      respuestaVF: isTrue,
      feedbackGeneral: feedback,
      categoria: category,
      fuente: path.basename(filename),
      tema: temaNum
    };
  }
  
  // Emparejamiento
  if (optionsBlock.includes('->')) {
    const parejas: ParejaQuiz[] = [];
    const items = splitOptions(optionsBlock);
    
    for (const item of items) {
      if (item.startsWith('=')) {
        const parts = item.substring(1).split('->');
        if (parts.length === 2) {
          parejas.push({
            izquierda: parts[0].trim(),
            derecha: parts[1].trim()
          });
        }
      }
    }
    
    if (parejas.length > 0) {
      return {
        id,
        tipo: 'emparejamiento',
        enunciado,
        parejas,
        categoria: category,
        fuente: path.basename(filename),
        tema: temaNum
      };
    }
  }
  
  // Selección Múltiple (Múltiples respuestas) vs Opción Múltiple (Una respuesta)
  if (optionsBlock.includes('~%')) {
    // Selección múltiple
    const opciones: OpcionQuiz[] = [];
    const items = splitOptions(optionsBlock);
    
    for (let item of items) {
      item = item.trim();
      if (!item) continue;
      
      let isCorrect = false;
      let peso = 0;
      let text = item;
      
      if (text.startsWith('~')) {
        text = text.substring(1);
        const weightMatch = text.match(/^%([-\d.]+)%/);
        if (weightMatch) {
          peso = parseFloat(weightMatch[1]);
          text = text.substring(weightMatch[0].length).trim();
          if (peso > 0) isCorrect = true;
        }
      } else if (text.startsWith('=')) {
        isCorrect = true;
        peso = 100;
        text = text.substring(1);
      }
      
      let feedback = undefined;
      const hashIndex = text.indexOf('#');
      if (hashIndex !== -1) {
        feedback = text.substring(hashIndex + 1).trim();
        text = text.substring(0, hashIndex).trim();
      }
      
      opciones.push({
        texto: text,
        esCorrecta: isCorrect,
        peso,
        feedback
      });
    }
    
    return {
      id,
      tipo: 'seleccion-multiple',
      enunciado,
      opciones,
      categoria: category,
      fuente: path.basename(filename),
      tema: temaNum
    };
  }
  
  // Opción Múltiple
  const opciones: OpcionQuiz[] = [];
  const items = splitOptions(optionsBlock);
  
  for (let item of items) {
    item = item.trim();
    if (!item) continue;
    
    let isCorrect = false;
    let text = item;
    
    if (text.startsWith('=')) {
      isCorrect = true;
      text = text.substring(1);
    } else if (text.startsWith('~')) {
      isCorrect = false;
      text = text.substring(1);
    } else {
      continue; // No es una opción válida
    }
    
    let feedback = undefined;
    const hashIndex = text.indexOf('#');
    if (hashIndex !== -1) {
      feedback = text.substring(hashIndex + 1).trim();
      text = text.substring(0, hashIndex).trim();
    }
    
    opciones.push({
      texto: text,
      esCorrecta: isCorrect,
      feedback
    });
  }
  
  if (opciones.length > 0) {
    return {
      id,
      tipo: 'opcion-multiple',
      enunciado,
      opciones,
      categoria: category,
      fuente: path.basename(filename),
      tema: temaNum
    };
  }
  
  return null;
}

// Función auxiliar para separar opciones respetando escapes
function splitOptions(optionsBlock: string): string[] {
  const result: string[] = [];
  let current = '';
  let inEscape = false;
  
  for (let i = 0; i < optionsBlock.length; i++) {
    const char = optionsBlock[i];
    
    if (inEscape) {
      current += char;
      inEscape = false;
      continue;
    }
    
    if (char === '\\') {
      inEscape = true;
      // current += char; // dependiendiendo de si queremos mantener el escape o no
      continue;
    }
    
    if (char === '=' || char === '~') {
      if (current.trim()) {
        result.push(current.trim());
      }
      current = char;
    } else {
      current += char;
    }
  }
  
  if (current.trim()) {
    result.push(current.trim());
  }
  
  return result;
}

function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const report: Record<number, { files: number, questions: number, warnings: number }> = {};
  
  for (let tema = 1; tema <= 4; tema++) {
    report[tema] = { files: 0, questions: 0, warnings: 0 };
    
    let temaDir = path.join(BASE_MATERIA_DIR, `Tema ${tema}`);
    if (tema <= 3) {
      temaDir = path.join(temaDir, 'MD');
    }
    
    const giftFiles = readFiles(temaDir, '.gift').concat(readFiles(temaDir, '.txt'));
    
    let allQuestions: PreguntaQuiz[] = [];
    
    for (const file of giftFiles) {
      // Filtrar solo los .txt que contienen 'GIFT' en Tema 4
      if (file.endsWith('.txt') && !file.toLowerCase().includes('gift')) {
         continue;
      }
      
      const content = fs.readFileSync(file, 'utf-8');
      const questions = parseGiftFile(content, file, tema);
      allQuestions = allQuestions.concat(questions);
      report[tema].files++;
    }
    
    if (allQuestions.length > 0) {
      const banco: BancoQuiz = {
        materia: 'psicoestadistica',
        tema: tema,
        totalPreguntas: allQuestions.length,
        preguntas: allQuestions
      };
      
      fs.writeFileSync(
        path.join(OUTPUT_DIR, `tema-${tema}.json`),
        JSON.stringify(banco, null, 2),
        'utf-8'
      );
      
      report[tema].questions = allQuestions.length;
    }
  }
  
  console.log('=== REPORTE DE PARSEO GIFT ===');
  console.table(report);
}

main();
