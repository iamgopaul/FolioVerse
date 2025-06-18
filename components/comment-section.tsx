"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, MessageSquare, Flag, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

type Comment = {
  id: number
  author: {
    name: string
    avatar?: string
  }
  content: string
  date: string
  likes: number
  replies: Reply[]
}

type Reply = {
  id: number
  author: {
    name: string
    avatar?: string
  }
  content: string
  date: string
  likes: number
}

export function CommentSection({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const user = localStorage.getItem("currentUser")
    setIsAuthenticated(!!token)
    setCurrentUser(user)
  }, [])

  // In a real app, fetch comments from an API
  useEffect(() => {
    // Simulating API call to get comments
    const fetchComments = async () => {
      // This would be an API call in a real application
      const mockComments: Comment[] = [
        {
          id: 1,
          author: {
            name: "Alex Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content:
            "Great article! I've been using Next.js for a while now and it's definitely improved my development workflow.",
          date: "2025-05-29T14:30:00",
          likes: 5,
          replies: [
            {
              id: 101,
              author: {
                name: "Sarah Miller",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              content: "I agree! The new App Router is a game changer.",
              date: "2025-05-29T15:45:00",
              likes: 2,
            },
          ],
        },
        {
          id: 2,
          author: {
            name: "Michael Chen",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content:
            "Thanks for sharing these insights. I'm curious about how Next.js compares to other frameworks like Remix or Astro?",
          date: "2025-05-28T09:15:00",
          likes: 3,
          replies: [],
        },
      ]

      setComments(mockComments)
    }

    fetchComments()
  }, [postSlug])

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)

    // Simulate API call to post comment
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newCommentObj: Comment = {
      id: Date.now(),
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: newComment,
      date: new Date().toISOString(),
      likes: 0,
      replies: [],
    }

    setComments([newCommentObj, ...comments])
    setNewComment("")
    setIsSubmitting(false)
  }

  const handleReplySubmit = async (commentId: number) => {
    if (!replyContent.trim()) return

    setIsSubmitting(true)

    // Simulate API call to post reply
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newReply: Reply = {
      id: Date.now(),
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: replyContent,
      date: new Date().toISOString(),
      likes: 0,
    }

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        }
      }
      return comment
    })

    setComments(updatedComments)
    setReplyContent("")
    setReplyingTo(null)
    setIsSubmitting(false)
  }

  const handleLike = (commentId: number, isReply = false, replyId?: number) => {
    if (isReply && replyId) {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === replyId) {
              return { ...reply, likes: reply.likes + 1 }
            }
            return reply
          })
          return { ...comment, replies: updatedReplies }
        }
        return comment
      })
      setComments(updatedComments)
    } else {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 }
        }
        return comment
      })
      setComments(updatedComments)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

      {isAuthenticated ? (
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
              <AvatarFallback>{currentUser?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="mb-2 min-h-[100px]"
                required
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center">
          <div className="space-y-4">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold">Join the Conversation</h3>
              <p className="text-muted-foreground">
                Sign in to FolioVerse to leave comments and engage with the community.
              </p>
            </div>
            <div className="flex gap-2 justify-center">
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline">Create Account</Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-6 last:border-0">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{comment.author.name}</div>
                    <div className="text-sm text-muted-foreground">{formatDate(comment.date)}</div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Flag className="mr-2 h-4 w-4" />
                        Report
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-2">{comment.content}</div>
                <div className="flex gap-4 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(comment.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    {comment.likes > 0 && comment.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <MessageSquare className="mr-1 h-4 w-4" />
                    Reply
                  </Button>
                </div>

                {replyingTo === comment.id && (
                  <div className="mt-4 ml-6">
                    <Textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="mb-2"
                      required
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleReplySubmit(comment.id)} disabled={isSubmitting}>
                        {isSubmitting ? "Posting..." : "Post Reply"}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4 pl-6 border-l">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                          <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{reply.author.name}</div>
                              <div className="text-xs text-muted-foreground">{formatDate(reply.date)}</div>
                            </div>
                          </div>
                          <div className="mt-1 text-sm">{reply.content}</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(comment.id, true, reply.id)}
                            className="text-muted-foreground hover:text-foreground mt-1"
                          >
                            <ThumbsUp className="mr-1 h-3 w-3" />
                            {reply.likes > 0 && reply.likes}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
