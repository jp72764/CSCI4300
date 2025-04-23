import { NextResponse } from "next/server";
import { getChatResponse } from "@/lib/openaiService";

export async function POST(req: Request) {
  const { prompt, role } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  const feedback = await getChatResponse(prompt, role || "general");

  return NextResponse.json({ feedback });
}
