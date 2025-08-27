import { UserInput, Recommendation } from './types';

import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
const token = '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';
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export async function fetchRecommendation(userInput: UserInput): Promise<Recommendation> {
  const client = ModelClient(endpoint, new AzureKeyCredential(token));

  const prompt = `
You are an expert software architect. Given the following user input, provide a detailed architecture recommendation in JSON format with fields: architecture, pros, cons, risks, recommendations, and toolSuggestions.

User Input:
${JSON.stringify(userInput, null, 2)}
`;

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "system", content: "You are a helpful & expert software architecture assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 1,
      top_p: 1,
      model: model
    }
  });

  if (!response.ok) throw new Error("Failed to fetch recommendation from OpenAI");
  const data = await response.json();

  const contentString = data.choices?.[0]?.message?.content;
  if (!contentString) throw new Error("No recommendation content found in response");

  try {
    return JSON.parse(contentString) as Recommendation;
  } catch (e) {
    throw new Error("Failed to parse recommendation JSON: " + (e as Error).message);
  }
}