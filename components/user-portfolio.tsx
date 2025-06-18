"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  GraduationCap,
  Briefcase,
  Code,
  Settings,
} from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"

type UserData = {
  username: string
  name: string
  email: string
  phone: string
  location: string
  title: string
  bio: string
  profileImage: string
  profileImagePosition: { x: number; y: number }
  github?: string
  linkedin?: string
  twitter?: string
  instagram?: string
  skills: string[]
  education: Array<{
    degree: string
    institution: string
    period: string
    gpa?: string
  }>
  experience: Array<{
    title: string
    company: string
    period: string
    description: string
  }>
  projects: Array<{
    title: string
    description: string
    technologies: string[]
    github?: string
    demo?: string
  }>
}

export function UserPortfolio({ userData }: { userData: UserData }) {
  const [isOwner, setIsOwner] = useState(false)
  const [savedImagePosition, setSavedImagePosition] = useState(userData.profileImagePosition)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [backgroundVariant, setBackgroundVariant] = useState<string>("minimal")

  useEffect(() => {
    // Check if current user is the owner of this portfolio
    const token = localStorage.getItem("authToken")
    const currentUser = localStorage.getItem("currentUser")
    setIsOwner(token && currentUser === userData.username)

    // Load saved profile image position from localStorage
    const savedPosition = localStorage.getItem("profileImagePosition")
    if (savedPosition) {
      try {
        setSavedImagePosition(JSON.parse(savedPosition))
      } catch (e) {
        console.error("Failed to parse saved image position", e)
      }
    }

    // Load background settings for portfolio pages
    const savedBackground = localStorage.getItem("portfolioBackground")
    const savedVariant = localStorage.getItem("backgroundVariant")

    if (savedBackground) {
      setBackgroundImage(savedBackground)
    }
    if (savedVariant) {
      setBackgroundVariant(savedVariant)
    } else {
      // Use different variants for different users or set a default
      setBackgroundVariant("minimal")
    }
  }, [userData.username])

  return (
    <div className="flex flex-col min-h-screen relative">
      <AnimatedBackground backgroundImage={backgroundImage} variant={backgroundVariant as any} />
      <main className="flex-1 relative z-10">
        {/* Header Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Hi, I'm <span className="text-primary">{userData.name}</span>
                  </h1>
                  {isOwner && (
                    <Link href="/settings">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                  )}
                </div>
                <p className="text-lg text-primary font-medium">@{userData.username}</p>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">{userData.bio}</p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href={`/${userData.username}/contact`}>
                    <Button className="inline-flex h-10 items-center justify-center">
                      Contact Me
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/${userData.username}/projects`}>
                    <Button variant="outline" className="inline-flex h-10 items-center justify-center">
                      View Projects
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-4 mt-4">
                  {userData.github && (
                    <Link href={userData.github} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon">
                        <Github className="h-5 w-5" />
                      </Button>
                    </Link>
                  )}
                  {userData.linkedin && (
                    <Link href={userData.linkedin} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon">
                        <Linkedin className="h-5 w-5" />
                      </Button>
                    </Link>
                  )}
                  {userData.twitter && (
                    <Link href={userData.twitter} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon">
                        <Twitter className="h-5 w-5" />
                      </Button>
                    </Link>
                  )}
                  {userData.instagram && (
                    <Link href={userData.instagram} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon">
                        <Instagram className="h-5 w-5" />
                      </Button>
                    </Link>
                  )}
                  <Link href={`mailto:${userData.email}`}>
                    <Button variant="ghost" size="icon">
                      <Mail className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-3xl"></div>
                  <div className="relative w-full aspect-square overflow-hidden rounded-xl border-2 border-primary/20">
                    <Image
                      src={userData.profileImage || "/placeholder.svg"}
                      alt={userData.name}
                      fill
                      className="object-cover"
                      style={{
                        objectPosition: `${savedImagePosition.x}% ${savedImagePosition.y}%`,
                      }}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="w-full py-12 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="home" className="space-y-8">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="blog">Blog</TabsTrigger>
                <TabsTrigger value="resume">Resume</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="home" className="space-y-6">
                <div className="text-center space-y-6">
                  <div className="relative w-48 h-48 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl"></div>
                    <div className="relative w-full h-full overflow-hidden rounded-full border-2 border-primary/20">
                      <Image
                        src={userData.profileImage || "/placeholder.svg"}
                        alt={userData.name}
                        fill
                        className="object-cover"
                        style={{
                          objectPosition: `${savedImagePosition.x}% ${savedImagePosition.y}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold">{userData.name}</h2>
                    <p className="text-xl text-primary font-medium">{userData.title}</p>
                    <p className="text-muted-foreground max-w-2xl mx-auto">{userData.bio}</p>

                    <div className="flex justify-center gap-4 mt-6">
                      {userData.github && (
                        <Link href={userData.github} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <Github className="h-4 w-4 mr-2" />
                            GitHub
                          </Button>
                        </Link>
                      )}
                      {userData.linkedin && (
                        <Link href={userData.linkedin} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <Linkedin className="h-4 w-4 mr-2" />
                            LinkedIn
                          </Button>
                        </Link>
                      )}
                      <Link href={`mailto:${userData.email}`}>
                        <Button size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          Contact Me
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Featured Projects */}
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold mb-6">Featured Projects</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      {userData.projects.slice(0, 2).map((project, index) => (
                        <Card key={index} className="bg-card/80 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <CardDescription>{project.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              {project.github && (
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={project.github} target="_blank">
                                    <Github className="h-4 w-4 mr-2" />
                                    Code
                                  </Link>
                                </Button>
                              )}
                              {project.demo && (
                                <Button size="sm" asChild>
                                  <Link href={project.demo} target="_blank">
                                    Demo
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="about" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {userData.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {userData.education.map((edu, index) => (
                        <div key={index}>
                          <h4 className="font-semibold">{edu.degree}</h4>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          <p className="text-sm text-muted-foreground">{edu.period}</p>
                          {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {userData.projects.map((project, index) => (
                    <Card key={index} className="bg-card/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {project.github && (
                            <Button variant="outline" size="sm" asChild>
                              <Link href={project.github} target="_blank">
                                <Github className="h-4 w-4 mr-2" />
                                Code
                              </Link>
                            </Button>
                          )}
                          {project.demo && (
                            <Button size="sm" asChild>
                              <Link href={project.demo} target="_blank">
                                Demo
                              </Link>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="blog" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">Blog Posts</h2>
                  <p className="text-muted-foreground">Thoughts, tutorials, and insights from {userData.name}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Sample blog posts - in a real app, this would come from the user's blog data */}
                  <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Getting Started with AI/ML</CardTitle>
                      <CardDescription>
                        A beginner's guide to machine learning concepts and applications
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Exploring the fundamentals of artificial intelligence and machine learning, including key
                        concepts and practical applications...
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Dec 15, 2024</span>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Building Scalable Web Applications</CardTitle>
                      <CardDescription>Best practices for developing modern web applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Learn about the latest techniques and technologies for building robust, scalable web
                        applications...
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Dec 10, 2024</span>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center mt-8">
                  <Button variant="outline">View All Posts</Button>
                </div>
              </TabsContent>

              <TabsContent value="resume" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">Resume</h2>
                  <p className="text-muted-foreground">Download or view my complete professional resume</p>
                </div>

                <div className="max-w-2xl mx-auto">
                  <Card className="bg-card/80 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                      <div className="space-y-6">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-2">{userData.name} - Resume</h3>
                          <p className="text-muted-foreground">
                            Complete professional resume including education, experience, skills, and achievements.
                          </p>
                        </div>

                        <div className="flex gap-4 justify-center">
                          <Button>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            Download PDF
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href={`/${userData.username}/resume`}>
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              View Online
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Resume Summary */}
                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <Card className="bg-card/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <GraduationCap className="h-5 w-5" />
                          Education
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {userData.education.map((edu, index) => (
                          <div key={index} className="mb-3 last:mb-0">
                            <h4 className="font-medium">{edu.degree}</h4>
                            <p className="text-sm text-muted-foreground">{edu.institution}</p>
                            <p className="text-sm text-muted-foreground">{edu.period}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="bg-card/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Briefcase className="h-5 w-5" />
                          Experience
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {userData.experience.map((exp, index) => (
                          <div key={index} className="mb-3 last:mb-0">
                            <h4 className="font-medium">{exp.title}</h4>
                            <p className="text-sm text-muted-foreground">{exp.company}</p>
                            <p className="text-sm text-muted-foreground">{exp.period}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                <Card className="bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                    <CardDescription>Feel free to reach out for opportunities or collaborations.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <Link href={`mailto:${userData.email}`} className="hover:underline">
                        {userData.email}
                      </Link>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <span>{userData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>{userData.location}</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  )
}
