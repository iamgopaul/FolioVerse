import { NextRequest } from "next/server"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const systemPrompt = {
    role: "system",
    content: `
      You are a concise, professional AI assistant for FolioVerse.
      Answer questions clearly, briefly, and helpfully. Avoid long intros.
      Only mention Josh Gopaul or any other user background if asked. Keep replies to 1–2 sentences max.
    `
  }

  const chatMessages = [systemPrompt, ...messages]

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: chatMessages,
      max_tokens: 100,
    }),
  })

  if (!response.ok) {
    console.error("Groq API Error:", await response.text())
    return new Response(JSON.stringify({ error: "Failed to fetch from Groq" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  const data = await response.json()

  return new Response(data.choices[0].message.content, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  })
}






