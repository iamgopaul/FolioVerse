import { type NextRequest, NextResponse } from "next/server"

// Mock database for projects
const projects: any[] = [
  {
    id: 1,
    title: "Sepsis Prediction AI",
    description: "AI model using TensorFlow achieving 91% accuracy in predicting sepsis risk from blood test data.",
    technologies: ["Python", "TensorFlow", "Machine Learning"],
    github: "https://github.com/iamgopaul",
    demo: "#",
    author: "iamgopaul",
    authorName: "Josh Gopaul",
    createdAt: "2024-12-10T10:00:00Z",
    likes: 25,
    comments: [],
  },
]

export async function GET() {
  return NextResponse.json({ projects })
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, technologies, github, demo, author, authorName } = await request.json()

    const newProject = {
      id: Date.now(),
      title,
      description,
      technologies: technologies || [],
      github,
      demo,
      author,
      authorName,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    }

    projects.unshift(newProject)

    return NextResponse.json({ success: true, project: newProject })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create project" }, { status: 500 })
  }
}
