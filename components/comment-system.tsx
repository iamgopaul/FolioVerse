"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, MessageSquare, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Comment {
  id: number
  content: string
  author: string
  authorName: string
  createdAt: string
  likes: number
  dislikes: number
  likedBy: string[]
  dislikedBy: string[]
  replies: Comment[]
  parentId?: number
}

interface CommentSystemProps {
  postId: number
  postType: "blog" | "project"
}

export function CommentSystem({ postId, postType }: CommentSystemProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)

  useEffect(() => {
    setCurrentUser(localStorage.getItem("currentUser"))
    fetchComments()
  }, [postId, postType])

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}&postType=${postType}`)
      const data = await response.json()
      setComments(data.comments || [])
    } catch (error) {
      console.error("Failed to fetch comments:", error)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !currentUser) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          author: currentUser,
          authorName: currentUser === "iamgopaul" ? "Josh Gopaul" : "User",
          postId,
          postType,
        }),
      })

      if (response.ok) {
        setNewComment("")
        fetchComments()
      }
    } catch (error) {
      console.error("Failed to submit comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitReply = async (parentId: number) => {
    if (!replyContent.trim() || !currentUser) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: replyContent,
          author: currentUser,
          authorName: currentUser === "iamgopaul" ? "Josh Gopaul" : "User",
          postId,
          postType,
          parentId,
        }),
      })

      if (response.ok) {
        setReplyContent("")
        setReplyingTo(null)
        fetchComments()
      }
    } catch (error) {
      console.error("Failed to submit reply:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLikeDislike = async (commentId: number, action: "like" | "dislike") => {
    if (!currentUser) return

    try {
      const response = await fetch(`/api/comments/${commentId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser, action }),
      })

      if (response.ok) {
        fetchComments()
      }
    } catch (error) {
      console.error("Failed to update comment:", error)
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    if (!currentUser) return

    try {
      const response = await fetch("/api/comments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId, author: currentUser }),
      })

      if (response.ok) {
        fetchComments()
      }
    } catch (error) {
      console.error("Failed to delete comment:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const CommentCard = ({ comment }: { comment: Comment }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={comment.authorName} />
            <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-sm">{comment.authorName}</span>
                <span className="text-xs text-muted-foreground ml-2">{formatDate(comment.createdAt)}</span>
              </div>

              {comment.author === currentUser && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDeleteComment(comment.id)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <p className="text-sm">{comment.content}</p>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLikeDislike(comment.id, "like")}
                className={`text-xs ${comment.likedBy?.includes(currentUser || "") ? "text-blue-600" : ""}`}
              >
                <ThumbsUp className="h-3 w-3 mr-1" />
                {comment.likes}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLikeDislike(comment.id, "dislike")}
                className={`text-xs ${comment.dislikedBy?.includes(currentUser || "") ? "text-red-600" : ""}`}
              >
                <ThumbsDown className="h-3 w-3 mr-1" />
                {comment.dislikes}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="text-xs"
              >
                <MessageSquare className="h-3 w-3 mr-1" />
                Reply
              </Button>
            </div>

            {replyingTo === comment.id && (
              <div className="mt-3 space-y-2">
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="text-sm"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleSubmitReply(comment.id)} disabled={isSubmitting}>
                    Reply
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (!currentUser) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Please log in to view and post comments.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Comments ({comments.length})</h3>

        <form onSubmit={handleSubmitComment} className="space-y-3">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}

        {comments.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  )
}
