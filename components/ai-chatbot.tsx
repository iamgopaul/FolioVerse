"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, X, Send, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

const portfolioContext = `
  You are an AI assistant for FolioVerse, a platform where users create and showcase their portfolios. 
  You're currently helping users on Josh Gopaul's portfolio. Josh is a Computer Science graduate student
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
  
  You should be helpful, friendly, and knowledgeable about web development, AI/ML, Josh's specific projects and skills,
  and the FolioVerse platform. If asked about Josh's background, provide accurate information based on the context above.
  You can also help users understand how to use FolioVerse features like creating portfolios, customizing profiles, etc.
`

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      role: "assistant",
      content: "Hi there! I'm your AI assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen, isMinimized])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: portfolioContext },
            ...messages.map((msg) => ({ role: msg.role, content: msg.content })),
            { role: "user", content: input },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch response")
      }

      if (response.body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let done = false
        let text = ""

        while (!done) {
          const { value, done: doneReading } = await reader.read()
          done = doneReading
          if (value) {
            text += decoder.decode(value)
          }
        }

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: text,
        }

        setMessages((prev) => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {isOpen && (
        <div
          className={`fixed bottom-20 right-4 z-50 w-80 sm:w-96 rounded-lg shadow-lg bg-background border transition-all duration-300 ease-in-out ${
            isMinimized ? "h-14" : "h-[500px]"
          }`}
        >
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=AI" alt="AI Assistant" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">AI Assistant</div>
                {!isMinimized && (
                  <div className="text-xs text-muted-foreground">{isLoading ? "Typing..." : "Online"}</div>
                )}
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={toggleMinimize} className="h-8 w-8">
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <ScrollArea className="p-4 h-[calc(500px-120px)]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-75"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <form onSubmit={handleSubmit} className="p-3 border-t">
                <div className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="min-h-[40px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e)
                      }
                    }}
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      )}

      <Button onClick={toggleChat} className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 p-0 shadow-lg">
        <Bot className="h-6 w-6" />
      </Button>
    </>
  )
}
