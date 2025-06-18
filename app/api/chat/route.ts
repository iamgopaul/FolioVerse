import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Add portfolio context to help the AI provide relevant responses
    const portfolioContext = `
      You are an AI assistant for Josh Gopaul's portfolio website. Josh is a Computer Science graduate student
      at Florida International University specializing in AI/ML and full-stack development. Here's his background:
      
      Education:
      - MSc Computer Science at FIU (2024-2026), Current GPA: 3.83
      - BSc Computer Science with Management at UWI (2020-2023), GPA: 3.36 (Upper Second-Class Honors)
      
      Experience:
      - IT Support Assistant at Gopaul and Company LTD (2023-2024)
      - Treasurer at UWI Computer Society (2022-2023)
      
      Skills: Python, Java, JavaScript, TypeScript, TensorFlow, PyTorch, React.js, Next.js, Node.js, AWS, Docker, PostgreSQL, MongoDB
      
      Notable Projects:
      - Sepsis Prediction AI: 91% accuracy using TensorFlow and Python
      - Job Matching Platform: Full-stack React.js/Node.js/PostgreSQL application
      - Java Platformer Games: 2D games using OOP principles
      
      Contact: jgopa003@fiu.edu, GitHub: iamgopaul, LinkedIn: iamgopaul
      
      You should be helpful, friendly, and knowledgeable about web development, AI/ML, and Josh's specific projects and skills.
      If asked about Josh's background, provide accurate information based on the context above.
    `

    // Prepend the context as a system message
    const augmentedMessages = [
      { role: "system", content: portfolioContext },
      ...messages,
    ]

    // ✅ Add await here!
    const result = await streamText({
      model: openai("gpt-4o"),
      messages: augmentedMessages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}

