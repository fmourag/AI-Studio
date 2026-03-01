import { GoogleGenAI } from "@google/genai";
import { Channel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getChannelInsight(channel: Channel) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Forneça um resumo muito breve e envolvente de 2 frases sobre o canal de televisão "${channel.name}" de ${channel.country}. Mencione seu foco principal e por que é popular globalmente. Use um tom profissional, mas convidativo. Responda em Português do Brasil.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini error:", error);
    return channel.description || "A popular global streaming channel.";
  }
}

export async function recommendChannels(query: string, channels: Channel[]) {
  try {
    const channelNames = channels.map(c => c.name).join(", ");
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user is looking for: "${query}". Based on this list of available channels: [${channelNames}], recommend the top 3 most relevant channels. Return ONLY a comma-separated list of channel names.`,
    });
    return response.text?.split(",").map(name => name.trim()) || [];
  } catch (error) {
    console.error("Gemini error:", error);
    return [];
  }
}
