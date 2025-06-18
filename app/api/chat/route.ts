import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Ensure OPENAI_API_KEY is set
    if (!process.env.OPENAI_API_KEY) {
      console.error("Missing OpenAI API key")
      return new Response("Missing API key", { status: 500 })
    }

    const response = await streamText({
      model: openai("gpt-4o"),
      messages: messages, // already includes system context from frontend
    })

    return response.toDataStreamResponse()
} catch (error: any) {
  console.error("Chat API error:", error)
  return new Response(
    JSON.stringify({ error: error?.message || "Unknown server error" }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" },
    }
  )
}


export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    return new Response(JSON.stringify({ reply: `Echo: ${messages[0].content}` }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: "Test failed" }), { status: 500 })
  }
}


}


