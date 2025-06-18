"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Upload, Save, LogOut, User, FileText, Shield, Palette, Move } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { toast } from "sonner"

const backgroundPresets = [
  { id: "tech", name: "Tech Grid", variant: "tech" as const },
  { id: "business", name: "Business Lines", variant: "business" as const },
  { id: "creative", name: "Creative Shapes", variant: "creative" as const },
  { id: "minimal", name: "Minimal Dots", variant: "minimal" as const },
  { id: "geometric", name: "Geometric", variant: "geometric" as const },
  { id: "circuit", name: "Circuit Board", variant: "circuit" as const },
]

export default function SettingsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [profileData, setProfileData] = useState({
    username: "iamgopaul",
    name: "Josh Gopaul",
    email: "jgopa003@fiu.edu",
    phone: "1(954)643-8379",
    location: "Miami, Florida",
    title: "AI/ML & Full-Stack Developer",
    bio: "Computer Science graduate student specializing in AI/ML and full-stack development.",
    github: "https://github.com/iamgopaul",
    linkedin: "https://www.linkedin.com/in/iamgopaul",
    twitter: "https://x.com/iamgopaul/",
    instagram: "https://www.instagram.com/i.am.gopaul/",
    profileImage: "/images/profile.jpg",
    profileImagePosition: { x: 50, y: 50 }, // Center position
  })
  const [isSaving, setIsSaving] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [backgroundVariant, setBackgroundVariant] = useState<string>("tech")
  const [isDragging, setIsDragging] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
      setIsLoading(false)
      localStorage.setItem("currentUser", profileData.username)
    }
  }, [router, profileData.username])

  useEffect(() => {
    const savedBackground = localStorage.getItem("portfolioBackground")
    const savedVariant = localStorage.getItem("backgroundVariant")

    if (savedBackground) {
      setBackgroundImage(savedBackground)
    }
    if (savedVariant) {
      setBackgroundVariant(savedVariant)
    }

    // Load saved profile image position
    const savedImagePosition = localStorage.getItem("profileImagePosition")
    if (savedImagePosition) {
      try {
        const position = JSON.parse(savedImagePosition)
        setProfileData((prev) => ({
          ...prev,
          profileImagePosition: position,
        }))
      } catch (e) {
        console.error("Failed to parse saved image position", e)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("currentUser")
    router.push("/login")
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Save profile image position to localStorage
    localStorage.setItem("profileImagePosition", JSON.stringify(profileData.profileImagePosition))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSaving(false)
    toast.success("Profile updated successfully!")
  }

  const handleFileUpload = (type: "profile" | "resume" | "background") => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = type === "profile" || type === "background" ? "image/*" : ".pdf,.doc,.docx"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        console.log(`Uploading ${type} file:`, file.name)
        if (type === "profile") {
          const imageUrl = URL.createObjectURL(file)
          setProfileData({ ...profileData, profileImage: imageUrl })

          // Save the image URL to localStorage
          localStorage.setItem("profileImage", imageUrl)
        } else if (type === "background") {
          const imageUrl = URL.createObjectURL(file)
          setBackgroundImage(imageUrl)
          localStorage.setItem("portfolioBackground", imageUrl)
          localStorage.removeItem("backgroundVariant") // Clear preset when custom image is used
        }
      }
    }
    input.click()
  }

  const handleBackgroundPresetChange = (variant: string) => {
    setBackgroundVariant(variant)
    setBackgroundImage(null) // Clear custom image when preset is selected
    localStorage.setItem("backgroundVariant", variant)
    localStorage.removeItem("portfolioBackground")

    // Dispatch custom event to update background across the app
    window.dispatchEvent(new CustomEvent("backgroundChanged"))
  }

  const handleImagePositionChange = (axis: "x" | "y", value: number[]) => {
    setProfileData({
      ...profileData,
      profileImagePosition: {
        ...profileData.profileImagePosition,
        [axis]: value[0],
      },
    })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    updateImagePosition(e)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updateImagePosition(e)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const updateImagePosition = (e: React.MouseEvent) => {
    if (!imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setProfileData({
      ...profileData,
      profileImagePosition: {
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      },
    })
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
    <div className="container px-4 md:px-6 py-12 relative">
      <AnimatedBackground backgroundImage={backgroundImage} variant={backgroundVariant as any} />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter">Settings</h1>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <a href={`/${profileData.username}`} target="_blank" rel="noreferrer">
                View Portfolio
              </a>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and social links.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  {/* Profile Image with Position Controls */}
                  <div className="space-y-4">
                    <Label>Profile Picture</Label>
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="space-y-4">
                        <div className="relative">
                          <div
                            ref={imageRef}
                            className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-primary/20 cursor-crosshair"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                          >
                            <Image
                              src={profileData.profileImage || "/placeholder.svg"}
                              alt="Profile"
                              fill
                              className="object-cover"
                              style={{
                                objectPosition: `${profileData.profileImagePosition.x}% ${profileData.profileImagePosition.y}%`,
                              }}
                            />
                            {isDragging && (
                              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                <Move className="h-8 w-8 text-white" />
                              </div>
                            )}
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            className="absolute -bottom-2 -right-2 rounded-full"
                            onClick={() => handleFileUpload("profile")}
                          >
                            <Upload className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Click and drag on the image to reposition it within the frame
                        </p>
                      </div>

                      <div className="space-y-4 flex-1">
                        <div className="space-y-2">
                          <Label>Horizontal Position: {profileData.profileImagePosition.x.toFixed(0)}%</Label>
                          <Slider
                            value={[profileData.profileImagePosition.x]}
                            onValueChange={(value) => handleImagePositionChange("x", value)}
                            max={100}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Vertical Position: {profileData.profileImagePosition.y.toFixed(0)}%</Label>
                          <Slider
                            value={[profileData.profileImagePosition.y]}
                            onValueChange={(value) => handleImagePositionChange("y", value)}
                            max={100}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            setProfileData({
                              ...profileData,
                              profileImagePosition: { x: 50, y: 50 },
                            })
                          }
                        >
                          Reset to Center
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={profileData.username}
                        onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                        placeholder="e.g., iamgopaul"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        value={profileData.title}
                        onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                        placeholder="e.g., Full-Stack Developer"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub URL</Label>
                      <Input
                        id="github"
                        value={profileData.github}
                        onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn URL</Label>
                      <Input
                        id="linkedin"
                        value={profileData.linkedin}
                        onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter URL</Label>
                      <Input
                        id="twitter"
                        value={profileData.twitter}
                        onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram URL</Label>
                      <Input
                        id="instagram"
                        value={profileData.instagram}
                        onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Saving...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of your portfolio.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Background Style</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {backgroundPresets.map((preset) => (
                      <div
                        key={preset.id}
                        className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                          backgroundVariant === preset.variant && !backgroundImage
                            ? "border-primary bg-primary/5"
                            : "border-muted"
                        }`}
                        onClick={() => handleBackgroundPresetChange(preset.variant)}
                      >
                        <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded mb-2 overflow-hidden">
                          <div className="w-full h-full relative">
                            {preset.variant === "tech" && (
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                                <div className="grid grid-cols-4 gap-1 p-2 h-full opacity-50">
                                  {Array.from({ length: 16 }).map((_, i) => (
                                    <div key={i} className="bg-blue-400 rounded-sm" />
                                  ))}
                                </div>
                              </div>
                            )}
                            {preset.variant === "business" && (
                              <div className="absolute inset-0 bg-gradient-to-br from-slate-500/20 to-gray-500/20">
                                <div className="flex items-center justify-center h-full">
                                  <div className="space-y-1">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                      <div key={i} className="flex space-x-1">
                                        {Array.from({ length: 4 }).map((_, j) => (
                                          <div
                                            key={j}
                                            className="w-2 bg-slate-400 rounded-sm"
                                            style={{ height: `${(j + 1) * 4}px` }}
                                          />
                                        ))}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                            {preset.variant === "creative" && (
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                                <div className="flex items-center justify-center h-full space-x-2">
                                  <div className="w-3 h-3 bg-purple-400 rounded-full" />
                                  <div className="w-3 h-3 bg-pink-400 rotate-45" />
                                  <div className="w-3 h-3 bg-yellow-400 clip-triangle" />
                                </div>
                              </div>
                            )}
                            {preset.variant === "minimal" && (
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-gray-500/5">
                                <div className="flex items-center justify-center h-full space-x-3">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="w-1 h-1 bg-gray-400 rounded-full" />
                                  ))}
                                </div>
                              </div>
                            )}
                            {preset.variant === "geometric" && (
                              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/20">
                                <div className="flex items-center justify-center h-full space-x-2">
                                  <div className="w-4 h-4 border border-indigo-400 rotate-45" />
                                  <div className="w-3 h-3 border border-blue-400" />
                                </div>
                              </div>
                            )}
                            {preset.variant === "circuit" && (
                              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                                <div className="flex items-center justify-center h-full">
                                  <div className="grid grid-cols-3 gap-1">
                                    {Array.from({ length: 9 }).map((_, i) => (
                                      <div
                                        key={i}
                                        className={`w-1 h-1 ${
                                          i % 2 === 0 ? "bg-green-400" : "bg-transparent border border-green-400"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm font-medium text-center">{preset.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Custom Background Image</h3>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                    <div className="text-center space-y-4">
                      {backgroundImage ? (
                        <div className="relative">
                          <Image
                            src={backgroundImage || "/placeholder.svg"}
                            alt="Background preview"
                            width={300}
                            height={200}
                            className="mx-auto rounded-lg object-cover"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setBackgroundImage(null)
                              localStorage.removeItem("portfolioBackground")
                              handleBackgroundPresetChange("tech") // Reset to default
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                          <div>
                            <h4 className="text-lg font-semibold">Custom Background</h4>
                            <p className="text-muted-foreground">Upload an image to use as your website background</p>
                          </div>
                        </>
                      )}
                      <Button onClick={() => handleFileUpload("background")}>
                        <Upload className="mr-2 h-4 w-4" />
                        {backgroundImage ? "Change Background" : "Upload Background"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Document Management</CardTitle>
                <CardDescription>Upload and manage your resume and other documents.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center space-y-4">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <h3 className="text-lg font-semibold">Resume</h3>
                      <p className="text-muted-foreground">Upload your latest resume (PDF, DOC, DOCX)</p>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={() => handleFileUpload("resume")}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Resume
                      </Button>
                      <Button variant="outline" asChild>
                        <a href={`/${profileData.username}/resume`} target="_blank" rel="noreferrer">
                          Preview Current
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Change Password</h3>
                  <div className="grid grid-cols-1 gap-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                      <Input id="confirmNewPassword" type="password" />
                    </div>
                    <Button className="w-fit">Update Password</Button>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-lg font-semibold">Account Actions</h3>
                  <div className="space-y-2">
                    <Button variant="destructive" className="w-fit">
                      Delete Account
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      This action cannot be undone. This will permanently delete your account and remove your data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
