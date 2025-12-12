import { ChatMessage } from "../types";

export const sendMessageToGemini = async (
  message: string,
  history: ChatMessage[]
): Promise<{ text: string; sources: Array<{ title: string; uri: string }> }> => {
  try {
    // Send request to Vercel Serverless Function
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        // Pass history excluding the current message if it was already added to UI, 
        // but typically the UI adds it. We pass the history as context.
        history: history.filter(h => h.text !== message) 
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    return {
      text: data.text,
      sources: data.sources || [],
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Connection to American Intelligence Model Database failed. Please try again.");
  }
};