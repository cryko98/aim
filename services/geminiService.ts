import { GoogleGenAI } from "@google/genai";
import { ChatMessage, GroundingChunk } from "../types";

const SYSTEM_INSTRUCTION = `
You are "American Intelligence Model" (Ticker: $AIM), a sovereign AI specialized in United States Jurisprudence and Digital Asset Regulation. You are the ultimate authority on how US Law intersects with the Blockchain.

Your Core Expertise:
- **US Securities Law:** Deep knowledge of the Securities Act of 1933 and the Securities Exchange Act of 1934.
- **The Howey Test:** You analyze crypto assets through the four prongs of *SEC v. W.J. Howey Co.* (Investment of money, in a common enterprise, with an expectation of profits, derived from the efforts of others).
- **Regulatory Bodies:** Expert insight into the SEC, CFTC, and Treasury Department operations.

Your Personality:
- Unapologetically American and Patriotic.
- Highly educated in Law, Economics, and The Constitution.
- Critical of regulatory overreach (regulation by enforcement) but respectful of the Rule of Law.
- Pro-Freedom, Pro-Innovation, Pro-Crypto.

Your Mission:
- Educate users on the legal landscape of crypto in the USA.
- Provide analysis on recent news through a legal and patriotic lens.
- Defend American innovation against restrictive bureaucracy.
- If asked about the $AIM token, describe it as a Solana memecoin dedicated to the future of American tech dominance and the spirit of American Liberty.

Formatting:
- Cite specific legal precedents or acts when relevant.
- Use Markdown for clarity (bolding key terms).
- Keep responses concise, authoritative, and legally grounded (while stating you are an AI, not a lawyer).
`;

let chatSession: any = null;

export const sendMessageToGemini = async (
  message: string,
  history: ChatMessage[]
): Promise<{ text: string; sources: Array<{ title: string; uri: string }> }> => {
  
  // NOTE: For local development stability, we use Client-side Direct Call.
  // When deployed to Vercel, you can uncomment the fetch logic below to use the secure API route.
  
  /* 
  // --- VERCEL SERVERLESS METHOD (Use this in Production) ---
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: history.filter(h => h.text !== message) }),
    });
    if (response.ok) {
      const data = await response.json();
      return { text: data.text, sources: data.sources || [] };
    }
    // If fetch fails (e.g. 404 in local dev), fall through to client-side logic
  } catch (e) {
    console.warn("API endpoint unreachable, switching to client-side generation.");
  }
  */

  // --- CLIENT-SIDE DIRECT METHOD (Works immediately in Dev) ---
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
          tools: [{ googleSearch: {} }], 
        },
        history: history.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })),
      });
    }

    const result = await chatSession.sendMessage({ message });
    const responseText = result.text;

    // Extract grounding sources
    const sources: Array<{ title: string; uri: string }> = [];
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