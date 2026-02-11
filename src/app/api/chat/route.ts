import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { PORTFOLIO_CONTEXT } from "@/data/portfolioContext";

export async function POST(req: Request) {
    try {
        // Check for Groq API Key
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "API Key not configured. Please set GROQ_API_KEY in your environment variables." },
                { status: 500 }
            );
        }

        const { message, history } = await req.json();

        const groq = new Groq({ apiKey });

        // Transform history to Groq format (system message first, then history, then new user message)
        const messages = [
            { role: "system", content: PORTFOLIO_CONTEXT },
            ...history.map((msg: any) => ({
                role: msg.role === "model" ? "assistant" : msg.role, // Map 'model' to 'assistant' for Groq
                content: msg.parts ? msg.parts[0].text : msg.text // Handle both Gemini and plain text formats
            })),
            { role: "user", content: message }
        ];

        const chatCompletion = await groq.chat.completions.create({
            messages: messages as any,
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 300,
        });

        const text = chatCompletion.choices[0]?.message?.content || "";

        return NextResponse.json({ text });

    } catch (error) {
        console.error("Groq API Error:", error);
        return NextResponse.json(
            { error: "Failed to process request." },
            { status: 500 }
        );
    }
}
