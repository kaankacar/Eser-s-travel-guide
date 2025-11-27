import { GoogleGenAI, Chat } from "@google/genai";
import { AttractionResult, PlaceSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Model configuration for the Transport Bot
const transportModel = 'gemini-2.5-flash';
const transportSystemInstruction = `
You are a specialized travel assistant for Eser and her partner, traveling in Russia (Moscow and St. Petersburg) during the winter holidays.
Your specific domain is PUBLIC TRANSPORTATION and TRAINS.
- You are an expert on the Moscow Metro and St. Petersburg Metro.
- You know about inter-city trains like the Sapsan, Red Arrow (Krasnaya Strela), and Grand Express.
- You can explain how to buy tickets (RZD app, Yandex Go, Troika card in Moscow, Podorozhnik card in St. Pete).
- Keep answers practical, clear, and helpful for a tourist.
- If asked about something unrelated to transport, gently steer back to travel logistics or answer briefly but remind them you are the Transport Guide.
`;

// Model configuration for Attraction Finder
const attractionModel = 'gemini-2.5-flash';

let chatSession: Chat | null = null;

export const getTransportChat = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: transportModel,
      config: {
        systemInstruction: transportSystemInstruction,
      },
    });
  }
  return chatSession;
};

export const findNearbyAttractions = async (
  lat: number,
  lng: number
): Promise<AttractionResult> => {
  try {
    const response = await ai.models.generateContent({
      model: attractionModel,
      contents: `I am currently at latitude ${lat}, longitude ${lng} in Russia.
      Identify the top 3-5 best tourist attractions, historical sites, or festive holiday spots very close to me right now.
      Focus on places that look great in winter/New Year's time.
      Provide a brief, enthusiastic description for each.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: lat,
              longitude: lng,
            },
          },
        },
      },
    });

    const text = response.text || "I couldn't find any specific descriptions, but check the map links below.";
    
    // Extract grounding chunks for specific map links
    const places: PlaceSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    if (chunks) {
      chunks.forEach((chunk) => {
        if (chunk.web?.uri && chunk.web?.title) {
             // Sometimes maps grounding returns web chunks too, acceptable as fallback
             places.push({ title: chunk.web.title, uri: chunk.web.uri });
        } else if (chunk.maps?.placeId) {
            // Usually maps grounding puts the useful info in the text or separate metadata,
            // but recent API versions populate `maps` object in chunks.
            // We mainly look for the title and URI.
            if (chunk.maps.title && chunk.maps.uri) {
                 places.push({ title: chunk.maps.title, uri: chunk.maps.uri });
            }
        }
      });
    }

    // Deduplicate places based on URI
    const uniquePlaces = Array.from(new Map(places.map(item => [item.uri, item])).values());

    return {
      text,
      places: uniquePlaces,
    };
  } catch (error) {
    console.error("Error fetching attractions:", error);
    throw new Error("Failed to find attractions. Please try again.");
  }
};