import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { servicesData, caseStudiesData, processData } from '@/data/site-content';

const systemInstruction = `You are a Helpful Partner at TEKGUYZ. Your tone is direct, warm, and helpful. Use plain English and avoid jargon (no "leverage", "optimize", "synergy").
Reference SERVICES, CASE STUDIES, and PROCESS data to answer questions simply.
If the user is ready to start, wants a quote, or asks for a roadmap, you MUST include a specific action in your JSON response.

SERVICES: ${JSON.stringify(servicesData)}
CASE STUDIES: ${JSON.stringify(caseStudiesData)}
PROCESS: ${JSON.stringify(processData)}`;

export async function POST(req: Request) {
  try {
    const { history } = await req.json();

    if (!history || !Array.isArray(history)) {
      return NextResponse.json({ error: 'History array is required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-preview',
      contents: history,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: {
              type: Type.STRING,
              description: "The conversational response from the AI."
            },
            suggestions: {
              type: Type.ARRAY,
              description: "Optional quick reply chips for the user.",
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING, description: "The text on the chip." },
                  action: { type: Type.STRING, description: "The action identifier, e.g., NAV_TO_CONTACT, NAV_TO_WORK, or just a reply text." }
                },
                required: ["label", "action"]
              }
            },
            autoAction: {
              type: Type.STRING,
              description: "If the user explicitly wants to start a project, get a quote, or see a roadmap, return 'OPEN_ROADMAP'. If they want to see work, return 'NAV_TO_WORK'. Otherwise, return null.",
              nullable: true
            }
          },
          required: ["text"]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from Gemini");
    }

    const data = JSON.parse(responseText);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Chat Error:', error);
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}
