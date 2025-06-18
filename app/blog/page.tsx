import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"

export default function BlogPage() {
  // Sample blog posts data - in a real app, this would come from a database or CMS
  const blogPosts = [
    {
      id: 1,
      slug: "getting-started-with-nextjs",
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build modern web applications with Next.js, the React framework for production.",
      date: "2025-05-28",
      readTime: "5 min read",
      category: "Web Development",
      image: "/placeholder.svg?height=400&width=600&text=Next.js",
      tags: ["Next.js", "React", "JavaScript"],
    },
    {
      id: 2,
      slug: "mastering-tailwind-css",
      title: "Mastering Tailwind CSS",
      excerpt: "Discover how to create beautiful, responsive designs quickly with Tailwind CSS utility classes.",
      date: "2025-05-20",
      readTime: "7 min read",
      category: "CSS",
      image: "/placeholder.svg?height=400&width=600&text=Tailwind+CSS",
      tags: ["CSS", "Tailwind", "Design"],
    },
    {
      id: 3,
      slug: "building-ai-powered-applications",
      title: "Building AI-Powered Applications",
      excerpt: "Explore how to integrate AI capabilities into your web applications using modern tools and frameworks.",
      date: "2025-05-15",
      readTime: "10 min read",
      category: "Artificial Intelligence",
      image: "/placeholder.svg?height=400&width=600&text=AI+Applications",
      tags: ["AI", "Machine Learning", "Web Development"],
    },
    {
      id: 4,
      slug: "responsive-design-principles",
      title: "Responsive Design Principles",
      excerpt: "Learn the key principles for creating websites that work beautifully across all device sizes.",
      date: "2025-05-10",
      readTime: "6 min read",
      category: "Design",
      image: "/placeholder.svg?height=400&width=600&text=Responsive+Design",
      tags: ["Design", "CSS", "Mobile"],
    },
    {
      id: 5,
      slug: "state-management-in-react",
      title: "State Management in React",
      excerpt: "Compare different state management solutions in React and learn when to use each approach.",
      date: "2025-05-05",
      readTime: "8 min read",
      category: "React",
      image: "/placeholder.svg?height=400&width=600&text=React+State",
      tags: ["React", "JavaScript", "State Management"],
    },
    {
      id: 6,
      slug: "deploying-nextjs-on-vercel",
      title: "Deploying Next.js on Vercel",
      excerpt: "A step-by-step guide to deploying your Next.js application on Vercel for optimal performance.",
      date: "2025-04-28",
      readTime: "4 min read",
      category: "DevOps",
      image: "/placeholder.svg?height=400&width=600&text=Vercel+Deployment",
      tags: ["Next.js", "Vercel", "Deployment"],
    },
  ]

  // Group posts by category
  const categories = [...new Set(blogPosts.map((post) => post.category))]

  return (
    <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32 relative">
      <AnimatedBackground variant="creative" />
      <div className="space-y-12 relative z-10">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Blog</h1>
          <p className="max-w-[900px] text-gray-500 dark:text-gray-400">
            Thoughts, tutorials, and insights about web development, design, and technology.
          </p>
        </div>

        {/* Featured post */}
        <div className="rounded-lg border bg-card/80 backdrop-blur-sm shadow-sm overflow-hidden">
          <div className="md:grid md:grid-cols-2">
            <div className="relative h-64 md:h-full">
              <Image
                src={blogPosts[0].image || "/placeholder.svg"}
                alt={blogPosts[0].title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {blogPosts[0].category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {new Date(blogPosts[0].date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {blogPosts[0].readTime}
                  </span>
                </div>
                <h2 className="text-2xl font-bold">{blogPosts[0].title}</h2>
              </div>
              <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
              <div className="mt-auto">
                <Link href={`/blog/${blogPosts[0].slug}`}>
                  <Button>
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="rounded-full">
            All
          </Button>
          {categories.map((category) => (
            <Button key={category} variant="outline" className="rounded-full">
              {category}
            </Button>
          ))}
        </div>

        {/* Blog post grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(1).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-lg border bg-card/80 backdrop-blur-sm shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
