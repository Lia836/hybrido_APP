
import { GoogleGenAI, Part } from "@google/genai";
import type { ResourceConfig } from "../components/ConfigurationPanel";

// FIX: Initialize GoogleGenAI with a configuration object containing the API key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function buildPrompt(config: ResourceConfig): string {
  let prompt = `**Instruction :** Agis en tant qu'ingénieur pédagogique expert. Crée une ressource éducative multimodale basée sur les spécifications suivantes. La réponse doit être en français.\n\n`;

  prompt += `**Sujet Principal :** ${config.topic}\n`;
  prompt += `**Type de Ressource :** ${config.resourceType}\n`;
  prompt += `**Niveau de la Taxonomie de Bloom :** ${config.bloomLevel}\n`;
  prompt += `**Public Cible :** ${config.audience}\n`;

  if (config.duration) prompt += `**Durée Estimée :** ${config.duration}\n`;
  if (config.style) prompt += `**Style/Ton :** ${config.style}\n`;
  if (config.languageLevel) prompt += `**Niveau Linguistique :** ${config.languageLevel}\n`;
  if (config.feedbackType) prompt += `**Type de Feedback (si applicable) :** ${config.feedbackType}\n`;

  if (config.file) {
    prompt += `\n**Contexte Additionnel (Fichier Fourni) :** Le contenu du fichier joint sert de base ou de référence pour la création de la ressource. Analyse-le et intègre-le de manière pertinente.\n`;
  }
  if (config.link) {
    prompt += `\n**Contexte Additionnel (Lien Web) :** Utilise les informations de l'URL suivante comme source d'inspiration ou de données : ${config.link}. Ne te contente pas de résumer, mais intègre les concepts clés dans la ressource à créer.\n`;
  }

  prompt += `\n**Format de Sortie Attendu :**\n`;
  prompt += `- La réponse doit être complète et prête à l'emploi, structurée en Markdown.\n`;
  prompt += `- Utilise des titres, des listes à puces, du gras, et des blocs de code si nécessaire pour une lisibilité maximale.\n`;
  prompt += `- Commence directement par le contenu de la ressource, sans phrases d'introduction superflues comme "Voici la ressource que vous avez demandée" ou des résumés de la demande.\n`;

  prompt += `\n**Génération :**\nMaintenant, génère la ressource demandée.\n`;

  return prompt;
}

export async function* generateResourceStream(config: ResourceConfig, signal: AbortSignal): AsyncGenerator<string> {
  // FIX: Use a recommended model for the task. 'gemini-2.5-flash' is suitable for complex text tasks.
  const modelName = 'gemini-2.5-flash';

  const prompt = buildPrompt(config);
  const parts: Part[] = [{ text: prompt }];

  if (config.file) {
    parts.push({
      inlineData: {
        mimeType: config.file.type,
        data: config.file.content,
      },
    });
  }

  const contents = { parts };
  
  // FIX: Use the recommended API `ai.models.generateContentStream` for streaming responses.
  const responseStream = await ai.models.generateContentStream({
    model: modelName,
    contents,
  });

  for await (const chunk of responseStream) {
    if (signal.aborted) {
      console.log("Stream abortion requested.");
      // The SDK stream doesn't have a method to cancel the underlying request.
      // Breaking the loop is the best client-side approach.
      return;
    }
    // FIX: Extract text content correctly from the streaming response chunk using the `.text` property.
    const text = chunk.text;
    if (text) {
      yield text;
    }
  }
}
