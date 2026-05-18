import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  try {
    // Always fetch the key from process.env at the time of the request
    // to ensure we capture the key if it was just selected by the user.
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
        console.warn("API Key is missing. Please ensure it is selected in the environment.");
        return "AI 問答目前尚未設定 API Key，但作品分類與專案連結都可以直接瀏覽。";
    }

    // Initialize a fresh client for each request to avoid stale config
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    const text = response.text;
    return text || "I didn't receive a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 服務暫時無法連線，請先直接瀏覽頁面上的作品分類與專案介紹。";
  }
};
