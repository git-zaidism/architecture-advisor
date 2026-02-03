import { UserInput, Recommendation } from '../types';

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'llama-3.1-8b-instant';

const getApiKey = (): string | null => {
  const key = import.meta.env.VITE_GROQ_API_KEY as string | undefined;
  return key && key.trim().length > 0 ? key : null;
};

const getModel = (): string => {
  const model = import.meta.env.VITE_GROQ_MODEL as string | undefined;
  return model && model.trim().length > 0 ? model : DEFAULT_MODEL;
};

const extractJson = (content: string): string => {
  const trimmed = content.trim();
  if (trimmed.startsWith('```')) {
    return trimmed.replace(/^```[a-zA-Z]*\n?/, '').replace(/```$/, '').trim();
  }
  return trimmed;
};

const validateRecommendation = (value: any): Recommendation => {
  if (!value || typeof value !== 'object') {
    throw new Error('Recommendation payload is not an object');
  }

  const allowed = new Set(['monolith', 'modular-monolith', 'microservices']);
  if (!allowed.has(value.architecture)) {
    throw new Error('Invalid architecture value');
  }

  const ensureArray = (input: any): string[] =>
    Array.isArray(input) ? input.filter((item) => typeof item === 'string') : [];

  return {
    architecture: value.architecture,
    score: Number.isFinite(value.score) ? value.score : 0,
    confidence: Number.isFinite(value.confidence) ? value.confidence : 0,
    reasoning: ensureArray(value.reasoning),
    pros: ensureArray(value.pros),
    cons: ensureArray(value.cons),
    risks: ensureArray(value.risks),
    recommendations: ensureArray(value.recommendations),
    toolSuggestions: ensureArray(value.toolSuggestions)
  };
};

export async function fetchRecommendation(userInput: UserInput): Promise<Recommendation> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Missing VITE_GROQ_API_KEY');
  }

  const prompt = [
    'You are an expert software architect.',
    'Return ONLY valid JSON. No markdown, no commentary.',
    'JSON schema:',
    '{',
    '  "architecture": "monolith" | "modular-monolith" | "microservices",',
    '  "score": number (0-100),',
    '  "confidence": number (0-100),',
    '  "reasoning": string[],',
    '  "pros": string[],',
    '  "cons": string[],',
    '  "risks": string[],',
    '  "recommendations": string[],',
    '  "toolSuggestions": string[]',
    '}',
    'User input:',
    JSON.stringify(userInput, null, 2)
  ].join('\n');

  const response = await fetch(GROQ_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: getModel(),
      messages: [
        { role: 'system', content: 'You are a helpful & expert software architecture assistant.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_completion_tokens: 900
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const contentString = data?.choices?.[0]?.message?.content;
  if (!contentString) {
    throw new Error('No recommendation content found in response');
  }

  try {
    const json = extractJson(contentString);
    return validateRecommendation(JSON.parse(json));
  } catch (e) {
    throw new Error('Failed to parse recommendation JSON: ' + (e as Error).message);
  }
}
