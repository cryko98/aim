import { GoogleGenAI } from "@google/genai";

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

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Server configuration error: API Key missing' });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Transform client history to API history format
    // We filter out the very last user message because we will send it as the active message
    // If the history includes the current message, we should slice it, but typical usage expects history to be past messages.
    // The client sends the new message separately.
    const apiHistory = history.map((msg: any) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const chatSession = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      },
      history: apiHistory,
    });

    const result = await chatSession.sendMessage({ message });
    const responseText = result.text;

    // Extract grounding sources
    const sources: Array<{ title: string; uri: string }> = [];
    const chunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri,
          });
        }
      });
    }

    const uniqueSources = sources.filter((v, i, a) => a.findIndex(t => (t.uri === v.uri)) === i);

    return res.status(200).json({ text: responseText, sources: uniqueSources });

  } catch (error: any) {
    console.error("API Error:", error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}