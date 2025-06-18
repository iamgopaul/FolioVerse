import { type NextRequest, NextResponse } from "next/server"

// Mock database for comments
const comments: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { content, author, authorName, postId, postType, parentId } = await request.json()

    const newComment = {
      id: Date.now(),
      content,
      author,
      authorName,
      postId,
      postType, // 'blog' or 'project'
      parentId: parentId || null, // for replies
      createdAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
      replies: [],
    }

    comments.push(newComment)

    return NextResponse.json({ success: true, comment: newComment })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create comment" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const postId = searchParams.get("postId")
  const postType = searchParams.get("postType")

  const postComments = comments.filter(
    (comment) => comment.postId === Number.parseInt(postId || "0") && comment.postType === postType,
  )

  return NextResponse.json({ comments: postComments })
}

export async function DELETE(request: NextRequest) {
  try {
    const { commentId, author } = await request.json()

    const commentIndex = comments.findIndex((comment) => comment.id === commentId && comment.author === author)

    if (commentIndex === -1) {
      return NextResponse.json({ success: false, message: "Comment not found or unauthorized" }, { status: 404 })
    }

    comments.splice(commentIndex, 1)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete comment" }, { status: 500 })
  }
}
