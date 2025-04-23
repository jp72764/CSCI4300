import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getChatResponse(prompt: string, role: string): Promise<string> {
  try {
    console.log("🧠 Sending prompt to OpenAI:", prompt.slice(0, 200) + "...");

    const promptWithInstruction = `
You are an expert resume reviewer and strict hiring manager with years of experience.

Your job is to evaluate the resume below and provide constructive feedback. Prioritize the feedback of needing quantifiable results.
As your 2nd priority, Be as detailed as you can with the selected role.
Third, ensure that it is easy to follow and read, think of it of the perspective of the interviewer, they have other job responsibilties and applicants. 
Output **must follow this format exactly**:

Strengths:
1. ...
2. ...
3. ...

Areas for Improvement:
1. ...
2. ...
3. ...


Do not prefix sections with bullet points
Do not write “Suggestions for improvement” — only use “Areas for Improvement”
Always number each point like “1. ...”

Resume:
${prompt}
Role Target: ${role}
`;



    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: promptWithInstruction }],
    });


    return response.choices[0].message.content || "⚠️ No content returned";
  } catch (err: any) {
    console.error("❌ OpenAI API error:", err?.response?.status, err?.response?.data || err.message);
    throw err;
  }
}
