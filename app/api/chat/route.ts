import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { servicesData, caseStudiesData, processData } from '@/data/site-content';

// REQUIRED: Ensures Netlify treats this as a dynamic route
export const dynamic = 'force-dynamic';

const systemInstruction = `You are a Helpful Partner at TEKGUYZ. Your tone is direct, warm, and helpful. No jargon. 
Reference SERVICES, CASE STUDIES, and PROCESS data to answer questions simply. 

SERVICES: ${JSON.stringify(servicesData)}
CASE STUDIES: ${JSON.stringify(caseStudiesData)}
PROCESS: ${JSON.stringify(processData)}`;

export async function POST(req: Request) {
  try {
    const { history } = await req.json();
    
    if (!history || !Array.isArray(history)) {
      return NextResponse.json({ error: 'Invalid history format' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("Missing GEMINI_API_KEY environment variable");
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
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
                  action: { type: Type.STRING, description: "The action identifier." }
                },
                required: ["label", "action"]
              }
            },
            autoAction: { 
              type: Type.STRING, 
              description: "Identifier for automatic UI transitions.",
              nullable: true 
            }
          },
          required: ["text"]
        }
      }
    });

    const responseText = response.text;

    if (!responseText) {
      throw new Error("Gemini returned an empty or undefined response.");
    }

    return NextResponse.json(JSON.parse(responseText));
    
  } catch (error) {
    console.error('Secure Chat Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI response' }, 
      { status: 500 }
    );
  }
}