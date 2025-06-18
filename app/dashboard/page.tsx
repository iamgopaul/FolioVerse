"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateBlogPost } from "@/components/create-blog-post"
import { CreateProject } from "@/components/create-project"
import { CommentSystem } from "@/components/comment-system"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, Code, MessageSquare } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [blogPosts, setBlogPosts] = useState([])
  const [projects, setProjects] = useState([])
  const [showCreateBlog, setShowCreateBlog] = useState(false)
  const [showCreateProject, setShowCreateProject] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
      fetchBlogPosts()
      fetchProjects()
    }
    setIsLoading(false)
  }, [router])

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch("/api/blogs")
      const data = await response.json()
      setBlogPosts(data.posts || [])
    } catch (error) {
      console.error("Failed to fetch blog posts:", error)
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      const data = await response.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <AnimatedBackground variant="tech" />
      <div className="mb-8 relative z-10">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Manage your blog posts, projects, and engage with the community</p>
      </div>

      <Tabs defaultValue="blogs" className="space-y-6 relative z-10">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="blogs" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Blog Posts
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Community
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blogs" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Your Blog Posts</h2>
            <Button onClick={() => setShowCreateBlog(!showCreateBlog)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>

          {showCreateBlog && (
            <CreateBlogPost
              onPostCreated={() => {
                setShowCreateBlog(false)
                fetchBlogPosts()
              }}
            />
          )}

          <div className="grid gap-6">
            {blogPosts.map((post: any) => (
              <Card key={post.id} className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    By {post.authorName} • {new Date(post.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CommentSystem postId={post.id} postType="blog" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Your Projects</h2>
            <Button onClick={() => setShowCreateProject(!showCreateProject)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>

          {showCreateProject && (
            <CreateProject
              onProjectCreated={() => {
                setShowCreateProject(false)
                fetchProjects()
              }}
            />
          )}

          <div className="grid gap-6">
            {projects.map((project: any) => (
              <Card key={project.id} className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>
                    By {project.authorName} • {new Date(project.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech: string) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mb-4">
                    {project.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                  <CommentSystem postId={project.id} postType="project" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          <h2 className="text-2xl font-semibold">Community Feed</h2>
          <p className="text-muted-foreground">
            Discover and engage with blog posts and projects from other community members
          </p>

          <div className="grid gap-6">
            {[...blogPosts, ...projects].map((item: any) => (
              <Card key={`${item.id}-${item.title}`} className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>
                    By {item.authorName} • {new Date(item.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.excerpt || item.description}</p>
                  <CommentSystem postId={item.id} postType={item.excerpt ? "blog" : "project"} />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
