import { type NextRequest, NextResponse } from "next/server"

// This would be imported from a shared database file in a real app
const comments: any[] = []

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId, action } = await request.json() // action: 'like' or 'dislike'
    const commentId = Number.parseInt(params.id)

    const comment = comments.find((c) => c.id === commentId)
    if (!comment) {
      return NextResponse.json({ success: false, message: "Comment not found" }, { status: 404 })
    }

    // Remove from opposite array if exists
    if (action === "like") {
      comment.dislikedBy = comment.dislikedBy.filter((id: string) => id !== userId)
      if (comment.likedBy.includes(userId)) {
        comment.likedBy = comment.likedBy.filter((id: string) => id !== userId)
        comment.likes = Math.max(0, comment.likes - 1)
      } else {
        comment.likedBy.push(userId)
        comment.likes += 1
      }
    } else if (action === "dislike") {
      comment.likedBy = comment.likedBy.filter((id: string) => id !== userId)
      if (comment.dislikedBy.includes(userId)) {
        comment.dislikedBy = comment.dislikedBy.filter((id: string) => id !== userId)
        comment.dislikes = Math.max(0, comment.dislikes - 1)
      } else {
        comment.dislikedBy.push(userId)
        comment.dislikes += 1
      }
    }

    return NextResponse.json({ success: true, comment })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update comment" }, { status: 500 })
  }
}
