"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedBackground } from "@/components/animated-background"
import { Search, Filter, Loader2 } from "lucide-react"

// Sample portfolio data
const allPortfolios = [
  {
    id: 1,
    username: "iamgopaul",
    name: "Josh Gopaul",
    title: "AI/ML & Full-Stack Developer",
    bio: "Computer Science graduate student specializing in AI/ML and full-stack development.",
    avatar: "/images/profile.jpg",
    skills: ["Python", "TensorFlow", "React", "Next.js"],
  },
  {
    id: 2,
    username: "johndoe",
    name: "John Doe",
    title: "Frontend Developer",
    bio: "Passionate frontend developer with expertise in modern web technologies.",
    avatar: "/placeholder.svg?height=100&width=100&text=JD",
    skills: ["React", "Vue.js", "TypeScript", "CSS"],
  },
  {
    id: 3,
    username: "sarahsmith",
    name: "Sarah Smith",
    title: "Data Scientist",
    bio: "Data scientist focused on machine learning and predictive analytics.",
    avatar: "/placeholder.svg?height=100&width=100&text=SS",
    skills: ["Python", "R", "Machine Learning", "SQL"],
  },
  {
    id: 4,
    username: "alexjohnson",
    name: "Alex Johnson",
    title: "UX/UI Designer",
    bio: "Creating beautiful and functional user experiences for web and mobile applications.",
    avatar: "/placeholder.svg?height=100&width=100&text=AJ",
    skills: ["Figma", "Adobe XD", "UI Design", "User Research"],
  },
  {
    id: 5,
    username: "emilywong",
    name: "Emily Wong",
    title: "Backend Engineer",
    bio: "Specialized in building scalable backend systems and APIs.",
    avatar: "/placeholder.svg?height=100&width=100&text=EW",
    skills: ["Node.js", "Java", "MongoDB", "AWS"],
  },
  {
    id: 6,
    username: "michaelbrown",
    name: "Michael Brown",
    title: "Mobile Developer",
    bio: "Creating native and cross-platform mobile applications for iOS and Android.",
    avatar: "/placeholder.svg?height=100&width=100&text=MB",
    skills: ["React Native", "Swift", "Kotlin", "Firebase"],
  },
  {
    id: 7,
    username: "jessicapark",
    name: "Jessica Park",
    title: "DevOps Engineer",
    bio: "Automating infrastructure and streamlining deployment processes.",
    avatar: "/placeholder.svg?height=100&width=100&text=JP",
    skills: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
  },
  {
    id: 8,
    username: "davidlee",
    name: "David Lee",
    title: "Game Developer",
    bio: "Passionate about creating immersive gaming experiences with modern technologies.",
    avatar: "/placeholder.svg?height=100&width=100&text=DL",
    skills: ["Unity", "C#", "3D Modeling", "Game Design"],
  },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [portfolios, setPortfolios] = useState(allPortfolios)

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch()
  }

  // Search logic
  const performSearch = () => {
    setIsSearching(true)

    // Simulate a brief loading state
    setTimeout(() => {
      if (!searchQuery.trim()) {
        // If search is empty, show all portfolios
        setPortfolios(allPortfolios)
      } else {
        const query = searchQuery.toLowerCase().trim()

        // Check if query is an exact username match
        const exactUsernameMatch = allPortfolios.find((portfolio) => portfolio.username.toLowerCase() === query)

        if (exactUsernameMatch) {
          // If exact username match, only show that portfolio
          setPortfolios([exactUsernameMatch])
        } else {
          // Otherwise filter by name, username, title, bio, or skills
          const filtered = allPortfolios.filter(
            (portfolio) =>
              portfolio.name.toLowerCase().includes(query) ||
              portfolio.username.toLowerCase().includes(query) ||
              portfolio.title.toLowerCase().includes(query) ||
              portfolio.bio.toLowerCase().includes(query) ||
              portfolio.skills.some((skill) => skill.toLowerCase().includes(query)),
          )
          setPortfolios(filtered)
        }
      }
      setIsSearching(false)
    }, 500) // Short delay to show loading state
  }

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground variant="business" />
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Explore Portfolios</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover talented professionals and their amazing work in the FolioVerse community.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-4">
            <Input
              placeholder="Search by name, username, or skills..."
              className="flex-1 bg-card/80 backdrop-blur-sm border-border/50"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button type="submit" disabled={isSearching} className="bg-primary hover:bg-primary/90">
              {isSearching ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
              Search
            </Button>
          </div>
        </form>

        {/* Filter Bar */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm text-muted-foreground">
            Showing {portfolios.length} {portfolios.length === 1 ? "portfolio" : "portfolios"}
          </p>
          <Button variant="outline" size="sm" className="bg-card/80 backdrop-blur-sm border-border/50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Portfolio Grid */}
        {portfolios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {portfolios.map((portfolio) => (
              <Link key={portfolio.id} href={`/${portfolio.username}`} className="block group">
                <Card className="h-full hover:shadow-lg transition-all duration-200 group-hover:-translate-y-1 bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    {/* Avatar and Basic Info */}
                    <div className="flex items-center space-x-3 mb-4">
                      <Image
                        src={portfolio.avatar || "/placeholder.svg"}
                        alt={portfolio.name}
                        width={50}
                        height={50}
                        className="rounded-full object-cover border-2 border-primary/20"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate text-foreground">
                          {portfolio.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">@{portfolio.username}</p>
                      </div>
                    </div>

                    {/* Title */}
                    <p className="text-sm font-medium text-primary mb-3">{portfolio.title}</p>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{portfolio.bio}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {portfolio.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary/80 text-secondary-foreground backdrop-blur-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      {portfolio.skills.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{portfolio.skills.length - 3} more</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-2 text-foreground">No portfolios found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search terms or browse all portfolios.</p>
              <Button
                variant="outline"
                className="bg-card/80 backdrop-blur-sm border-border/50"
                onClick={() => {
                  setSearchQuery("")
                  setPortfolios(allPortfolios)
                }}
              >
                Clear Search
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
