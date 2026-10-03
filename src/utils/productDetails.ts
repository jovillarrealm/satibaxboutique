/**
 * Product Details Parsing & Formatting Utilities
 *
 * Extracts structured sections (Overview, Benefits, Usage instructions,
 * Ingredients, and Bundle items) from product description strings.
 */

export interface ParsedProductDetails {
  overview: string;
  benefits: string[];
  usageInstructions: string[];
  ingredients: string | null;
  bundleItems: string[];
}

/**
 * Deduplicated helper to parse markdown or bulleted list lines into clean string arrays.
 */
function parseListLines(rawText: string): string[] {
  return rawText
    .split('\n')
    .map((line) => line.replace(/^[•\-\*🌿\s]+/, '').trim())
    .filter((line) => line.length > 2 && !line.startsWith('**') && !line.startsWith('___'));
}

/**
 * Parses raw product description text to extract structured botanical cosmetic details.
 */
export function parseProductDetails(description?: string | null): ParsedProductDetails {
  if (!description || typeof description !== 'string') {
    return {
      overview: '',
      benefits: [],
      usageInstructions: [],
      ingredients: null,
      bundleItems: [],
    };
  }

  const cleanText = description.replace(/\r\n/g, '\n').trim();

  // 1. Ingredients extraction (INGREDIENTES: ... or Fórmula: ...)
  let ingredients: string | null = null;
  const ingredientsMatch = cleanText.match(
    /(?:^|\n)\s*(?:INGREDIENTES|Ingredientes|F\u00f3rmula INCI|INCI)[:\s]+([\s\S]+?)(?=(?:_{3,}|\n\s*\n\s*[A-ZÁÉÍÓÚ][a-záéíóú]+:|$))/i
  );
  if (ingredientsMatch && ingredientsMatch[1]) {
    ingredients = ingredientsMatch[1].trim();
  }

  // 2. Usage Instructions extraction (Modo de uso: ... or Modo de aplicación: ... or Usos:)
  let usageInstructions: string[] = [];
  const usageMatch = cleanText.match(
    /(?:^|\n)\s*(?:Modo de uso|Modo de aplicaci\u00f3n|Usos?|C\u00f3mo usar)[:\s]+([\s\S]+?)(?=(?:Beneficios|Propiedades|Indicado para|INGREDIENTES|Ingredientes|F\u00f3rmula|Incluye:|\*\*|\n\s*\n\s*[A-ZÁÉÍÓÚ][a-záéíóú]+:|_{3,}|$))/i
  );
  if (usageMatch && usageMatch[1]) {
    usageInstructions = parseListLines(usageMatch[1]);
  }

  // 3. Benefits extraction (Beneficios: ... or Propiedades: ... or Indicado para: ...)
  let benefits: string[] = [];
  const benefitsMatch = cleanText.match(
    /(?:^|\n)\s*(?:Beneficios|Propiedades|Indicado para)[:\s]+([\s\S]+?)(?=(?:Modo de uso|Usos?|INGREDIENTES|Ingredientes|F\u00f3rmula|Incluye:|\*\*|\n\s*\n\s*[A-ZÁÉÍÓÚ][a-záéíóú]+:|_{3,}|$))/i
  );
  if (benefitsMatch && benefitsMatch[1]) {
    benefits = parseListLines(benefitsMatch[1]);
  }

  // 4. Bundle Items extraction (Incluye: ...)
  let bundleItems: string[] = [];
  const includesMatch = cleanText.match(
    /(?:^|\n)\s*(?:Incluye|Contiene|El kit incluye)[:\s]+([\s\S]+?)(?=(?:Un kit|Perfecto para|Ideal para|\n\s*\n\s*[A-ZÁÉÍÓÚ][a-záéíóú]+:|_{3,}|$))/i
  );
  if (includesMatch && includesMatch[1]) {
    bundleItems = parseListLines(includesMatch[1]);
  }

  // 5. Overview extraction (introductory text before sections or headers)
  let overview = cleanText;
  const sectionSplitMatch = cleanText.match(
    /(?:^|\n)\s*(?:Modo de uso|Modo de aplicaci\u00f3n|Usos?|Beneficios|Propiedades|Indicado para|INGREDIENTES|Ingredientes|Incluye:)/i
  );

  if (sectionSplitMatch && sectionSplitMatch.index !== undefined && sectionSplitMatch.index > 0) {
    overview = cleanText.slice(0, sectionSplitMatch.index).trim();
  }

  // Clean overview from leading "¿Qué hace?" if present
  overview = overview.replace(/^¿Qué hace\?\s*/i, '').trim();

  return {
    overview: overview || cleanText,
    benefits,
    usageInstructions,
    ingredients,
    bundleItems,
  };
}

/**
 * Maps raw tags to formatted display labels.
 */
export function formatTagLabel(tag: string): string {
  const lower = tag.toLowerCase();
  if (lower === 'natural') return 'Natural';
  if (lower === 'vegano') return 'Vegano';
  if (lower === 'celiacosafe' || lower === 'celiaco-safe') return 'Celiaco-Safe';
  if (lower === 'kit-regalo') return 'Kit Regalo';
  if (lower === 'facial') return 'Facial';
  if (lower === 'corporal') return 'Corporal';
  if (lower === 'capilar') return 'Capilar';
  if (lower === 'aroma' || lower === 'aromaterapia') return 'Aromaterapia';
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}
