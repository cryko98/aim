import { GoogleGenAI } from "@google/genai";
import { ChatMessage, GroundingChunk } from "../types";

const SYSTEM_INSTRUCTION = `
You are "American Intelligence Model" (Ticker: $AIM), a highly advanced, patriotic AI assistant for a Solana cryptocurrency project. 

Your personality:
- Professional, authoritative, yet approachable.
- Patriotic to the United States of America.
- Expert in US Law, The Constitution, Crypto Regulation (SEC, CFTC), and US Politics.
- Pro-Freedom, Pro-Innovation, Pro-Crypto.

Your mission:
- Provide accurate information about US news, laws, and how they affect the crypto market.
- Always maintain a tone that respects American values: Liberty, Independence, and Strength.
- If asked about the token, mention it is a Solana memecoin dedicated to the future of American tech dominance.

Formatting:
- Use Markdown for clarity (bolding key terms).
- Keep responses concise but comprehensive.
`;

let chatSession: any = null;

export const sendMessageToGemini = async (
  message: string,
  history: ChatMessage[]
): Promise<{ text: string; sources: Array<{ title: string; uri: string }> }> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing. Please check your environment configuration.");
    }

    const ai = new GoogleGenAI({ apiKey });

    // Initialize chat session if not exists
    if (!chatSession) {
      chatSession = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ googleSearch: {} }], // Enable Google Search for news/laws
        },
        history: history.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })),
      });
    }

    const result = await chatSession.sendMessage({ message });
    const responseText = result.text;

    // Extract grounding sources if available
    const sources: Array<{ title: string; uri: string }> = [];
    
    // Check for grounding metadata in the candidates
    const chunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] | undefined;
    
    if (chunks) {
      chunks.forEach((chunk) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri,
          });
        }
      });
    }

    // Deduplicate sources
    const uniqueSources = sources.filter((v, i, a) => a.findIndex(t => (t.uri === v.uri)) === i);

    return {
      text: responseText,
      sources: uniqueSources,
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Connection to American Intelligence Model Database failed. Please try again.");
  }
};