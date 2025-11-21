import { GoogleGenAI } from "@google/genai";
import { Transaction, User } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBrewInsights = async (transactions: Transaction[], users: User[]) => {
  try {
    // Create a simplified context for the AI
    const context = `
      Je bent de AI assistent van BrewBuddy, een slimme bierkoelkast in een studentenhuis.
      Analyseer de volgende data en geef een grappig, kort inzicht (max 2 zinnen) of een waarschuwing over de voorraad/gebruik.
      Spreek Nederlands. Wees studentikoos.

      Gebruikers: ${users.map(u => u.name).join(', ')}
      Recente Transacties: ${transactions.slice(0, 10).map(t => `${t.userName} ${t.type === 'CONSUMPTION' ? 'pakte' : 'vulde aan'} ${t.amount} ${t.item}`).join(', ')}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: context,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching Gemini insight:", error);
    return "BrewBuddy is even te dronken om na te denken...";
  }
};