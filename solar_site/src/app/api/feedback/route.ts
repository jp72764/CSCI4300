console.log("🔥 /api/feedback route.ts file is loaded");

import { NextResponse } from "next/server";
import { getChatResponse } from "@/lib/openaiService";

export async function POST(req: Request) {
  try {
    const { prompt, role } = await req.json();
    console.log("📥 Received prompt:", prompt);

    if (!prompt) {
      console.error("❗ Missing prompt in request body");
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const feedback = await getChatResponse(prompt, role || "general");
    console.log("✅ OpenAI feedback:", feedback);

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("❌ Error in /api/feedback route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
