import { type NextRequest, NextResponse } from "next/server"

// Mock database for blog posts
const blogPosts: any[] = [
  {
    id: 1,
    title: "Getting Started with AI/ML",
    content: "A comprehensive guide to machine learning fundamentals...",
    excerpt: "Learn the basics of artificial intelligence and machine learning",
    author: "iamgopaul",
    authorName: "Josh Gopaul",
    createdAt: "2024-12-15T10:00:00Z",
    tags: ["AI", "Machine Learning", "Python"],
    likes: 15,
    comments: [],
  },
]

export async function GET() {
  return NextResponse.json({ posts: blogPosts })
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, excerpt, tags, author, authorName } = await request.json()

    const newPost = {
      id: Date.now(),
      title,
      content,
      excerpt,
      author,
      authorName,
      createdAt: new Date().toISOString(),
      tags: tags || [],
      likes: 0,
      comments: [],
    }

    blogPosts.unshift(newPost)

    return NextResponse.json({ success: true, post: newPost })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create post" }, { status: 500 })
  }
}
