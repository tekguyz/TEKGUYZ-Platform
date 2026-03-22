import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { servicesData, caseStudiesData, processData } from '@/data/site-content';

const systemInstruction = `You are a Helpful Partner at TEKGUYZ. Your tone is direct, warm, and helpful. No jargon. 
Reference SERVICES, CASE STUDIES, and PROCESS data to answer questions simply. 
SERVICES: ${JSON.stringify(servicesData)}
CASE STUDIES: ${JSON.stringify(caseStudiesData)}
PROCESS: ${JSON.stringify(processData)}`;

export async function POST(req: Request) {
  try {
    const { history } = await req.json();
    
    // API KEY is pulled from the SERVER environment variable
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
            text: { type: Type.STRING },
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  action: { type: Type.STRING }
                },
                required: ["label", "action"]
              }
            },
            autoAction: { type: Type.STRING, nullable: true }
          },
          required: ["text"]
        }
      }
    });

    return NextResponse.json(JSON.parse(response.text));
  } catch (error) {
    console.error('Secure Chat Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}