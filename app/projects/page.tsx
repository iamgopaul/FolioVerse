import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
      image: "/placeholder.svg?height=300&width=500&text=E-Commerce",
      tags: ["Next.js", "React", "Node.js", "MongoDB"],
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A productivity app for managing tasks, projects, and team collaboration with real-time updates.",
      image: "/placeholder.svg?height=300&width=500&text=Task+App",
      tags: ["React", "Firebase", "Tailwind CSS"],
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A personal portfolio website showcasing projects and skills with a modern, responsive design.",
      image: "/placeholder.svg?height=300&width=500&text=Portfolio",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "A weather application that provides current conditions and forecasts based on location.",
      image: "/placeholder.svg?height=300&width=500&text=Weather+App",
      tags: ["JavaScript", "API Integration", "CSS"],
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      id: 5,
      title: "Blog Platform",
      description: "A content management system for creating and managing blog posts with user authentication.",
      image: "/placeholder.svg?height=300&width=500&text=Blog+Platform",
      tags: ["Next.js", "PostgreSQL", "Auth.js"],
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      id: 6,
      title: "Recipe Finder",
      description: "An application for discovering recipes based on available ingredients and dietary preferences.",
      image: "/placeholder.svg?height=300&width=500&text=Recipe+Finder",
      tags: ["React", "API Integration", "Styled Components"],
      github: "https://github.com",
      demo: "https://demo.com",
    },
  ]

  return (
    <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32 relative">
      <AnimatedBackground variant="circuit" />
      <div className="space-y-12 relative z-10">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Projects</h1>
          <p className="max-w-[900px] text-gray-500 dark:text-gray-400">
            A collection of projects I've worked on, from web applications to design systems and open-source
            contributions.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-lg border bg-card/80 backdrop-blur-sm shadow-sm transition-all hover:shadow-md"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  width={500}
                  height={300}
                  alt={project.title}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-2">
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                  </Link>
                  <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                    <Button size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
