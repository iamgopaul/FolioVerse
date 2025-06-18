"use client"

import { useEffect, useState } from "react"
import { AnimatedBackground } from "@/components/animated-background"

export function CustomBackground() {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [backgroundVariant, setBackgroundVariant] = useState<string>("tech")

  useEffect(() => {
    const savedBackground = localStorage.getItem("portfolioBackground")
    const savedVariant = localStorage.getItem("backgroundVariant")

    if (savedBackground) {
      setBackgroundImage(savedBackground)
    }
    if (savedVariant) {
      setBackgroundVariant(savedVariant)
    }

    // Listen for background changes
    const handleStorageChange = () => {
      const newBackground = localStorage.getItem("portfolioBackground")
      const newVariant = localStorage.getItem("backgroundVariant")
      setBackgroundImage(newBackground)
      setBackgroundVariant(newVariant || "tech")
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("backgroundChanged", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("backgroundChanged", handleStorageChange)
    }
  }, [])

  return <AnimatedBackground backgroundImage={backgroundImage} variant={backgroundVariant as any} />
}
