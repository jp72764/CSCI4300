import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { resumeText } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a resume reviewer." },
        { role: "user", content: `Give feedback for this resume:\n\n${resumeText}` },
      ],
    });

    return NextResponse.json({ result: response.choices[0].message.content });
  } catch (err) {
    return NextResponse.json({ error: "Error getting feedback" }, { status: 500 });
  }
}
